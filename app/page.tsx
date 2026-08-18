"use client";

import {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import "katex/dist/katex.min.css";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    role: "assistant",
    content: `こんにちは、Mentoraです。

勉強、仕事、生活、これからのこと。
うまく言葉にできなくても大丈夫です。

今気になっていることから、一緒に整理してみましょう。`,
  },
];

const SUGGESTIONS = [
  "勉強をやり直したいけれど、何から始めればいい？",
  "最近やる気が出なくて、何も進められない",
  "これからの仕事や進路について整理したい",
  "今日やることを一緒に決めてほしい",
];

/**
 * OpenAIが
 *
 * \( ... \)
 * \[ ... \]
 *
 * のLaTeX記法を返した場合でも、
 * remark-math が確実に認識できるよう
 *
 * $ ... $
 * $$ ... $$
 *
 * に変換する。
 */
function normalizeMath(text: string): string {
  return text
    .replace(/\\\[((?:.|\n)*?)\\\]/g, (_, expression) => {
      return `\n$$\n${expression.trim()}\n$$\n`;
    })
    .replace(/\\\(((?:.|\n)*?)\\\)/g, (_, expression) => {
      return `$${expression.trim()}$`;
    });
}

function MentoraMessage({ content }: { content: string }) {
  const normalized = normalizeMath(content);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        h1: ({ children }) => (
          <h1 className="mb-3 mt-5 text-xl font-bold">
            {children}
          </h1>
        ),

        h2: ({ children }) => (
          <h2 className="mb-3 mt-5 text-lg font-bold">
            {children}
          </h2>
        ),

        h3: ({ children }) => (
          <h3 className="mb-2 mt-4 text-base font-bold">
            {children}
          </h3>
        ),

        p: ({ children }) => (
          <p className="my-2 leading-7">{children}</p>
        ),

        ul: ({ children }) => (
          <ul className="my-3 list-disc space-y-1 pl-6">
            {children}
          </ul>
        ),

        ol: ({ children }) => (
          <ol className="my-3 list-decimal space-y-1 pl-6">
            {children}
          </ol>
        ),

        li: ({ children }) => (
          <li className="leading-7">{children}</li>
        ),

        strong: ({ children }) => (
          <strong className="font-bold text-slate-900">
            {children}
          </strong>
        ),

        blockquote: ({ children }) => (
          <blockquote className="my-3 border-l-4 border-slate-300 pl-4 text-slate-600">
            {children}
          </blockquote>
        ),

        code: ({ children }) => (
          <code className="rounded bg-slate-200 px-1.5 py-0.5 text-[0.9em]">
            {children}
          </code>
        ),
      }}
    >
      {normalized}
    </ReactMarkdown>
  );
}

export default function Home() {
  const [messages, setMessages] =
    useState<Message[]>(INITIAL_MESSAGES);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  async function sendMessage(text?: string) {
    const content = (text ?? input).trim();

    if (!content || isLoading) {
      return;
    }

    setError("");

    const userMessage: Message = {
      role: "user",
      content,
    };

    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          messages: nextMessages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ??
            "Mentoraとの通信に失敗しました。"
        );
      }

      const assistantMessage: Message = {
        role: "assistant",

        content:
          data.message ??
          "うまく回答を作れませんでした。もう一度試してみてください。",
      };

      setMessages((previous) => [
        ...previous,
        assistantMessage,
      ]);
    } catch (err) {
      console.error(err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Mentoraとの通信中に問題が発生しました。"
        );
      }
    } finally {
      setIsLoading(false);

      setTimeout(() => {
        textareaRef.current?.focus();
      }, 0);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage();
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();
      void sendMessage();
    }
  }

  function resetConversation() {
    if (isLoading) return;

    setMessages(INITIAL_MESSAGES);
    setInput("");
    setError("");

    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  }

  const showSuggestions = messages.length === 1;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-5 sm:px-6 sm:py-8">
        {/* Header */}
        <header className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-lg font-bold text-white shadow-sm">
              M
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                Mentora
              </h1>

              <p className="text-xs text-slate-500 sm:text-sm">
                あなたと一緒に考えるAIメンター
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={resetConversation}
            disabled={isLoading}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
          >
            最初から
          </button>
        </header>

        {/* Chat */}
        <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-7 sm:py-7">
            <div className="mx-auto max-w-3xl space-y-5">
              {messages.map((message, index) => {
                const isUser = message.role === "user";

                return (
                  <div
                    key={`${message.role}-${index}`}
                    className={`flex ${
                      isUser
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[90%] rounded-3xl px-4 py-3 text-sm leading-7 sm:max-w-[82%] sm:px-5 sm:py-4 sm:text-[15px] ${
                        isUser
                          ? "rounded-br-md bg-slate-900 text-white"
                          : "rounded-bl-md border border-slate-100 bg-slate-50 text-slate-800"
                      }`}
                    >
                      {isUser ? (
                        <div className="whitespace-pre-wrap break-words">
                          {message.content}
                        </div>
                      ) : (
                        <div className="mentora-markdown break-words">
                          <MentoraMessage
                            content={message.content}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Suggestions */}
              {showSuggestions && (
                <div className="pt-3">
                  <p className="mb-3 text-center text-xs text-slate-400">
                    例えば、こんなことを相談できます
                  </p>

                  <div className="grid gap-2 sm:grid-cols-2">
                    {SUGGESTIONS.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        disabled={isLoading}
                        onClick={() =>
                          void sendMessage(suggestion)
                        }
                        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm leading-6 text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Loading */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-3xl rounded-bl-md border border-slate-100 bg-slate-50 px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                      </div>

                      <span className="text-sm text-slate-500">
                        Mentoraが考えています…
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="border-t border-red-100 bg-red-50 px-4 py-3 sm:px-7">
              <div className="mx-auto max-w-3xl text-sm text-red-700">
                {error}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-slate-100 bg-white px-3 py-3 sm:px-6 sm:py-5">
            <form
              onSubmit={handleSubmit}
              className="mx-auto max-w-3xl"
            >
              <div className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-100">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(event) =>
                    setInput(event.target.value)
                  }
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                  rows={1}
                  maxLength={3000}
                  placeholder="Mentoraに話してみる..."
                  className="max-h-40 min-h-[44px] flex-1 resize-none bg-transparent px-3 py-2.5 text-sm leading-6 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-60 sm:text-[15px]"
                />

                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="flex h-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                >
                  送信
                </button>
              </div>

              <div className="mt-2 flex items-center justify-between px-1 text-[11px] text-slate-400">
                <span>
                  Enterで送信・Shift + Enterで改行
                </span>

                <span>
                  {input.length} / 3000
                </span>
              </div>
            </form>

            {/* Products */}
            <div className="mx-auto mt-4 max-w-3xl border-t border-slate-100 pt-4">
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-400">
                <span>
                  学び直し・学習支援
                  <strong className="ml-1 font-medium text-slate-600">
                    WritePilot
                  </strong>
                </span>

                <span className="hidden sm:inline">
                  •
                </span>

                <span>
                  心の整理・相談
                  <strong className="ml-1 font-medium text-slate-600">
                    Kokorone
                  </strong>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-2 pb-1 pt-4 text-center text-[11px] leading-5 text-slate-400">
          Mentoraは、あなたの考えを整理するためのAIメンターです。
          <br className="sm:hidden" />
          医療・法律などの専門的な判断を代替するものではありません。
        </footer>
      </div>
    </main>
  );
}