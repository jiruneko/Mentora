import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

import { buildMentoraInstructions } from "@/lib/mentora/mentora-instructions";
import type { MentoraMessage } from "@/lib/types";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type ChatRequest = {
  messages?: MentoraMessage[];
};

function isValidMessage(
  value: unknown
): value is MentoraMessage {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return false;
  }

  const message = value as Record<string, unknown>;

  return (
    (message.role === "user" ||
      message.role === "assistant") &&
    typeof message.content === "string"
  );
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
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

    const model = process.env.OPENAI_MODEL;

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

    const body =
      (await request.json()) as ChatRequest;

    if (
      !Array.isArray(body.messages) ||
      body.messages.length === 0
    ) {
      return NextResponse.json(
        {
          error:
            "メッセージを入力してください。",
        },
        {
          status: 400,
        }
      );
    }

    const messages = body.messages.filter(
      isValidMessage
    );

    if (messages.length === 0) {
      return NextResponse.json(
        {
          error:
            "有効なメッセージがありません。",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * MVPではDBを持たないため、
     * ブラウザから渡された直近の会話だけを利用する。
     *
     * 会話が長くなりすぎるのを防ぐため
     * 最新12件まで。
     */
    const recentMessages = messages
      .slice(-12)
      .map((message) => ({
        role: message.role,
        content: message.content.slice(0, 4000),
      }));

    const response =
      await openai.responses.create({
        model,

        instructions:
          buildMentoraInstructions(),

        input: recentMessages,
      });

    const answer =
      response.output_text?.trim();

    if (!answer) {
      console.error(
        "OpenAI returned an empty response."
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

    return NextResponse.json({
      message: answer,
    });
  } catch (error) {
    console.error(
      "Mentora API error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Mentoraとの通信中に問題が発生しました。少し時間を置いて、もう一度お試しください。",
      },
      {
        status: 500,
      }
    );
  }
}