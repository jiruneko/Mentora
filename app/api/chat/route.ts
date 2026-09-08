import { auth } from "@/auth";
import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { buildMentoraInstructions } from "@/lib/mentora/mentora-instructions";

export const runtime = "nodejs";

/**
 * 1メッセージあたりの最大文字数。
 *
 * 極端に大きな入力による
 * ・APIコスト増大
 * ・レスポンス遅延
 * ・想定外の負荷
 * を防ぐために制限する。
 */
const MAX_MESSAGE_LENGTH = 4000;

/**
 * ブラウザから受け取れる会話履歴の最大件数。
 *
 * 実際にOpenAIへ送信するのは
 * この中から最新12件。
 */
const MAX_MESSAGES = 50;

const chatRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z
          .string()
          .trim()
          .min(1, "メッセージが空です。")
          .max(
            MAX_MESSAGE_LENGTH,
            "メッセージが長すぎます。"
          ),
      })
    )
    .min(1, "メッセージを入力してください。")
    .max(
      MAX_MESSAGES,
      "会話履歴が長すぎます。"
    ),
});

export async function POST(
  request: NextRequest
) {
  // --------------------------------
  // Authentication
  // --------------------------------

  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      {
        error:
          "Mentoraを利用するにはログインが必要です。",
      },
      {
        status: 401,
      }
    );
  }

  // --------------------------------
  // Environment variables
  // --------------------------------

  const apiKey =
    process.env.OPENAI_API_KEY;

  const model =
    process.env.OPENAI_MODEL;

  if (!apiKey) {
    console.error(
      "OPENAI_API_KEY is not configured."
    );

    return NextResponse.json(
      {
        error:
          "AIの設定が完了していません。",
      },
      {
        status: 500,
      }
    );
  }

  if (!model) {
    console.error(
      "OPENAI_MODEL is not configured."
    );

    return NextResponse.json(
      {
        error:
          "AIモデルの設定が完了していません。",
      },
      {
        status: 500,
      }
    );
  }

  // --------------------------------
  // Request body
  // --------------------------------

  let rawBody: unknown;

  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        error:
          "リクエストの形式が正しくありません。",
      },
      {
        status: 400,
      }
    );
  }

  const parsed =
    chatRequestSchema.safeParse(
      rawBody
    );

  if (!parsed.success) {
    const message =
      parsed.error.issues[0]
        ?.message ??
      "メッセージの形式が正しくありません。";

    return NextResponse.json(
      {
        error: message,
      },
      {
        status: 400,
      }
    );
  }

  // --------------------------------
  // Conversation history
  // --------------------------------

  /**
   * 現段階では会話履歴をDB保存せず、
   * ブラウザから送られた会話を利用する。
   *
   * OpenAIへ渡す履歴は
   * 最新12件に限定する。
   */
  const recentMessages =
    parsed.data.messages
      .slice(-12)
      .map((message) => ({
        role: message.role,
        content: message.content,
      }));

  // --------------------------------
  // Mentora context
  // --------------------------------

  const userContext = {
    userName:
      session.user.name ??
      undefined,
  };

  // --------------------------------
  // OpenAI client
  // --------------------------------

  const openai = new OpenAI({
    apiKey,
    maxRetries: 2,
    timeout: 30_000,
  });

  // --------------------------------
  // OpenAI Responses API
  // --------------------------------

  try {
    const response =
      await openai.responses.create({
        model,
        instructions:
          buildMentoraInstructions(
            userContext
          ),
        input: recentMessages,
      });

    const answer =
      response.output_text?.trim();

    if (!answer) {
      console.error(
        "OpenAI returned an empty response.",
        {
          responseId:
            response.id,
          userId:
            session.user.id,
        }
      );

      return NextResponse.json(
        {
          error:
            "Mentoraが回答を作れませんでした。もう一度お試しください。",
        },
        {
          status: 502,
        }
      );
    }

    // --------------------------------
    // Response
    // --------------------------------

    return NextResponse.json({
      message: answer,
    });
  } catch (error) {
    if (
      error instanceof
      OpenAI.APIError
    ) {
      console.error(
        "OpenAI API error:",
        {
          status:
            error.status,
          message:
            error.message,
          userId:
            session.user.id,
        }
      );
    } else {
      console.error(
        "Mentora API unexpected error:",
        error
      );
    }

    return NextResponse.json(
      {
        error:
          "Mentoraとの通信中に問題が発生しました。少し時間を置いて、もう一度お試しください。",
      },
      {
        status: 502,
      }
    );
  }
}