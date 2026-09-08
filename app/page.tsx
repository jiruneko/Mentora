"use client";

import Link from "next/link";
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

type ChatApiResponse = {
  message?: string;
  error?: string;
};

const VISITED_KEY = "mentora-has-visited";

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

const FEATURES = [
  {
    number: "01",
    title: "学びたいことを整理する",
    description:
      "勉強をやり直したい、資格を取りたい、新しいことを学びたい。ぼんやりした気持ちからでも、何を学ぶか一緒に整理します。",
  },
  {
    number: "02",
    title: "悩みや目標を言葉にする",
    description:
      "何に困っているのか自分でもよく分からない。そんな状態でも大丈夫です。対話しながら、一つずつ考えを言葉にしていきます。",
  },
  {
    number: "03",
    title: "次の一歩を見つける",
    description:
      "大きな目標をいきなり達成する必要はありません。今のあなたにできる、小さく具体的な一歩を一緒に考えます。",
  },
];

const FOR_WHOM = [
  {
    title: "学び直したい",
    description:
      "英語や数学などをもう一度学びたいけれど、どこから始めればいいか分からない方へ。",
  },
  {
    title: "進路や仕事に迷っている",
    description:
      "これから何をしたいのか、どんな選択肢があるのかを一度整理したい方へ。",
  },
  {
    title: "なかなか行動に移せない",
    description:
      "やりたいことはあるけれど、考えが散らかってしまって最初の一歩が決められない方へ。",
  },
  {
    title: "まず誰かに話してみたい",
    description:
      "いきなり人に相談するのは少し重い。まずは気軽に、自分のペースで考えを話したい方へ。",
  },
];

const STEPS = [
  {
    number: "STEP 1",
    title: "アカウントを作る",
    description:
      "まずは無料でアカウントを作成します。すでにアカウントをお持ちの方は、そのままログインできます。",
  },
  {
    number: "STEP 2",
    title: "今のことを話す",
    description:
      "文章がまとまっていなくても構いません。気になっていることを、そのままMentoraに話してください。",
  },
  {
    number: "STEP 3",
    title: "次の一歩を決める",
    description:
      "Mentoraとの対話を通して、悩みや目標を整理し、今日からできる小さな一歩を一緒に決めます。",
  },
];

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
          <h1 className="mb-3 mt-5 text-xl font-bold">{children}</h1>
        ),

        h2: ({ children }) => (
          <h2 className="mb-3 mt-5 text-lg font-bold">{children}</h2>
        ),

        h3: ({ children }) => (
          <h3 className="mb-2 mt-4 text-base font-bold">{children}</h3>
        ),

        p: ({ children }) => (
          <p className="my-2 leading-7">{children}</p>
        ),

        ul: ({ children }) => (
          <ul className="my-3 list-disc space-y-1 pl-6">{children}</ul>
        ),

        ol: ({ children }) => (
          <ol className="my-3 list-decimal space-y-1 pl-6">{children}</ol>
        ),

        li: ({ children }) => (
          <li className="leading-7">{children}</li>
        ),

        strong: ({ children }) => (
          <strong className="font-bold text-slate-900">{children}</strong>
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

function AuthButtons({
  compact = false,
}: {
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/login"
          className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
        >
          ログイン
        </Link>

        <Link
          href="/signup"
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          無料で始める
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Link
        href="/signup"
        className="rounded-2xl bg-slate-900 px-7 py-4 text-center text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-700"
      >
        無料でMentoraを始める
      </Link>

      <Link
        href="/login"
        className="rounded-2xl border border-slate-200 bg-white px-7 py-4 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        すでにアカウントをお持ちの方
      </Link>
    </div>
  );
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorStatus, setErrorStatus] = useState<number | null>(null);

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const chatRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    try {
      const hasVisited = window.localStorage.getItem(VISITED_KEY);

      if (hasVisited) {
        return;
      }

      window.localStorage.setItem(VISITED_KEY, "true");
    } catch {
      // localStorage が使えない環境でもサービスは継続する
    }
  }, []);

  useEffect(() => {
    const container = messagesContainerRef.current;

    if (!container) {
      return;
    }

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  function focusTextarea(delay = 0) {
    window.setTimeout(() => {
      textareaRef.current?.focus({
        preventScroll: true,
      });
    }, delay);
  }

  function scrollToChat() {
    chatRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    focusTextarea(500);
  }

  async function sendMessage(text?: string) {
    const content = (text ?? input).trim();

    if (!content || isLoading) {
      return;
    }

    setError("");
    setErrorStatus(null);

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

      let data: ChatApiResponse = {};

      try {
        data = (await response.json()) as ChatApiResponse;
      } catch {
        data = {};
      }

      if (!response.ok) {
        const errorMessage =
          data.error ?? "Mentoraとの通信に失敗しました。";

        setErrorStatus(response.status);

        if (response.status === 400) {
          setError(errorMessage);
          return;
        }

        if (response.status === 401) {
          setError(
            "Mentoraを利用するにはログインが必要です。アカウントをお持ちでない方は無料で登録できます。"
          );
          return;
        }

        if (response.status === 429) {
          setError(
            data.error ??
              "現在アクセスが集中しています。少し時間を置いてから、もう一度お試しください。"
          );
          return;
        }

        console.error("Mentora API error:", {
          status: response.status,
          message: errorMessage,
        });

        setError(errorMessage);

        return;
      }

      const answer = data.message?.trim();

      if (!answer) {
        setErrorStatus(502);

        setError(
          "Mentoraが回答を作れませんでした。もう一度お試しください。"
        );

        return;
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: answer,
      };

      setMessages((previous) => [...previous, assistantMessage]);

      setError("");
      setErrorStatus(null);
    } catch (networkError) {
      console.error("Mentora network error:", networkError);

      setErrorStatus(null);

      setError(
        "Mentoraに接続できませんでした。通信環境を確認して、もう一度お試しください。"
      );
    } finally {
      setIsLoading(false);
      focusTextarea();
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    void sendMessage();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
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
    if (isLoading) {
      return;
    }

    setMessages(INITIAL_MESSAGES);
    setInput("");
    setError("");
    setErrorStatus(null);

    focusTextarea();
  }

  const showSuggestions = messages.length === 1;
  const needsLogin = errorStatus === 401;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white">
              M
            </div>

            <div>
              <p className="text-base font-bold tracking-tight">
                Mentora
              </p>

              <p className="hidden text-[11px] text-slate-400 sm:block">
                あなたと一緒に考えるAIメンター
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <nav className="hidden items-center gap-1 lg:flex">
              <a
                href="#about"
                className="px-3 py-2 text-sm text-slate-500 transition hover:text-slate-900"
              >
                できること
              </a>

              <a
                href="#for-whom"
                className="px-3 py-2 text-sm text-slate-500 transition hover:text-slate-900"
              >
                こんな方へ
              </a>

              <a
                href="#how-to-use"
                className="px-3 py-2 text-sm text-slate-500 transition hover:text-slate-900"
              >
                使い方
              </a>

              <button
                type="button"
                onClick={scrollToChat}
                className="px-3 py-2 text-sm text-slate-500 transition hover:text-slate-900"
              >
                チャット
              </button>
            </nav>

            <AuthButtons compact />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-100">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-32">
          <div>
            <div className="mb-6 inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600">
              AI × 学び × 次の一歩
            </div>

            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.15]">
              一人で考え込まず、
              <br />
              一緒に整理してみよう。
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg sm:leading-9">
              Mentora（メントラ）は、
              学び、仕事、生活、これからのことを
              一緒に整理するAIメンターです。
              <br className="hidden sm:block" />
              まだ答えが決まっていなくても大丈夫。
              今のあなたにできる一歩から考えていきます。
            </p>

            <div className="mt-9">
              <AuthButtons />
            </div>

            <button
              type="button"
              onClick={scrollToChat}
              className="mt-5 text-sm font-medium text-slate-500 underline decoration-slate-300 underline-offset-4 transition hover:text-slate-900"
            >
              まずMentoraの画面を見てみる
            </button>

            <p className="mt-5 text-xs leading-6 text-slate-400">
              Mentoraのご利用には無料アカウントが必要です。
            </p>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-4 shadow-xl shadow-slate-200/40 sm:p-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-5">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 font-bold text-white">
                    M
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Mentora
                    </p>

                    <p className="text-xs text-slate-400">
                      AIメンター
                    </p>
                  </div>
                </div>

                <div className="rounded-3xl rounded-bl-md bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-700">
                  こんにちは。
                  <br />
                  今、一番気になっていることは何ですか？
                  <br />
                  まとまっていなくても大丈夫ですよ。
                </div>

                <div className="ml-auto mt-4 max-w-[85%] rounded-3xl rounded-br-md bg-slate-900 px-5 py-4 text-sm leading-7 text-white">
                  勉強をやり直したいけど、
                  何から始めればいいか分からなくて……
                </div>

                <div className="mt-4 rounded-3xl rounded-bl-md bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-700">
                  いいですね。
                  <br />
                  まずは「何を学び直したいか」と
                  「なぜ学びたいと思ったか」から
                  一緒に整理してみましょう。
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Mentora can do */}
      <section
        id="about"
        className="scroll-mt-24 bg-slate-50 py-20 sm:py-28"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.22em] text-slate-400">
              WHAT YOU CAN DO
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Mentoraでできること
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">
              すぐに正解を出すことではなく、
              今の状況を一緒に整理し、
              あなた自身が次へ進める状態をつくることを
              Mentoraは大切にしています。
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {FEATURES.map((feature) => (
              <article
                key={feature.number}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <p className="text-xs font-bold tracking-[0.18em] text-slate-400">
                  {feature.number}
                </p>

                <h3 className="mt-5 text-xl font-bold">
                  {feature.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* For whom */}
      <section
        id="for-whom"
        className="scroll-mt-24 py-20 sm:py-28"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-xs font-bold tracking-[0.22em] text-slate-400">
                FOR YOU
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                こんな方へ
              </h2>

              <p className="mt-5 text-base leading-8 text-slate-600">
                「こんなことで相談していいのかな」
                と思う必要はありません。
                <br />
                Mentoraは、まだ考えがまとまっていないところから
                一緒に始めます。
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-3xl border border-slate-200 bg-slate-200 sm:grid-cols-2">
              {FOR_WHOM.map((item) => (
                <article
                  key={item.title}
                  className="bg-white p-7 sm:p-8"
                >
                  <div className="mb-5 h-2 w-2 rounded-full bg-slate-900" />

                  <h3 className="text-lg font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How to use */}
      <section
        id="how-to-use"
        className="scroll-mt-24 bg-slate-900 py-20 text-white sm:py-28"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.22em] text-slate-400">
              HOW TO USE
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              使い方は、とてもシンプルです。
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-300">
              難しい操作はありません。
              無料アカウントを作り、
              今考えていることを話すところから始められます。
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {STEPS.map((step) => (
              <article
                key={step.number}
                className="rounded-3xl border border-slate-700 bg-slate-800/60 p-7"
              >
                <p className="text-xs font-bold tracking-[0.18em] text-slate-400">
                  {step.number}
                </p>

                <h3 className="mt-5 text-xl font-bold">
                  {step.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {step.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/signup"
              className="inline-flex rounded-2xl bg-white px-7 py-4 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              無料アカウントを作る
            </Link>
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="border-b border-slate-100 bg-white py-20 sm:py-24">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-2xl">
              <p className="text-xs font-bold tracking-[0.22em] text-slate-400">
                SUPPORT
              </p>

              <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
                話して終わりではありません。
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                Mentoraで考えを整理したあと、
                もっと学びたいときは
                <strong className="font-semibold text-slate-900">
                  {" "}
                  WritePilot
                </strong>
                へ。
                心のことをもう少し深く相談したいときは
                <strong className="font-semibold text-slate-900">
                  {" "}
                  Kokorone
                </strong>
                へ。
                必要な支援へつながる入口としてMentoraを使えます。
              </p>
            </div>

            <button
              type="button"
              onClick={scrollToChat}
              className="mt-7 shrink-0 rounded-2xl bg-slate-900 px-7 py-4 text-sm font-semibold text-white transition hover:bg-slate-700 lg:mt-0"
            >
              Mentoraを見てみる
            </button>
          </div>
        </div>
      </section>

      {/* Chat */}
      <section
        ref={chatRef}
        id="chat"
        className="scroll-mt-20 bg-[#f4f9f8] py-20 sm:py-28"
      >
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <p className="text-xs font-bold tracking-[0.22em] text-[#6f948d]">
              TALK WITH MENTORA
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              今のことから、話してみませんか？
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              きれいな文章にする必要はありません。
              思いついたことを、そのまま入力してください。
            </p>
          </div>

          {/* Auth notice */}
          <div className="mx-auto mb-6 max-w-3xl rounded-2xl border border-[#cddfdb] bg-white px-5 py-4 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold text-slate-900">
                  Mentoraの利用にはログインが必要です
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  初めての方は無料アカウントを作成してください。
                </p>
              </div>

              <div className="flex gap-2">
                <Link
                  href="/login"
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  ログイン
                </Link>

                <Link
                  href="/signup"
                  className="rounded-xl bg-[#315e58] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#274e49]"
                >
                  無料で登録
                </Link>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-[#cddfdb] bg-white shadow-xl shadow-slate-200/40">
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-[#dce9e6] bg-[#f8fbfa] px-4 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#315e58] text-sm font-bold text-white">
                  M
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Mentora
                  </h3>

                  <p className="text-xs text-[#718b86]">
                    あなたと一緒に考えるAIメンター
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={resetConversation}
                disabled={isLoading}
                className="rounded-xl border border-[#cddfdb] bg-white px-3 py-2 text-xs font-medium text-[#56736e] transition hover:bg-[#f4f9f8] disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
              >
                最初から
              </button>
            </div>

            {/* Messages */}
            <div
              ref={messagesContainerRef}
              className="h-[520px] overflow-y-auto bg-[#fcfefe] px-4 py-6 sm:px-7 sm:py-7"
            >
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
                            ? "rounded-br-md bg-[#315e58] text-white"
                            : "rounded-bl-md border border-[#dce9e6] bg-[#eef6f4] text-slate-800"
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

                {showSuggestions && (
                  <div className="pt-3">
                    <p className="mb-3 text-center text-xs text-[#829e99]">
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
                          className="rounded-2xl border border-[#cddfdb] bg-white px-4 py-3 text-left text-sm leading-6 text-slate-700 shadow-sm transition hover:border-[#91b5ae] hover:bg-[#f4f9f8] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="rounded-3xl rounded-bl-md border border-[#dce9e6] bg-[#eef6f4] px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          <span className="h-2 w-2 animate-bounce rounded-full bg-[#6f948d] [animation-delay:-0.3s]" />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-[#6f948d] [animation-delay:-0.15s]" />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-[#6f948d]" />
                        </div>

                        <span className="text-sm text-[#5f7773]">
                          Mentoraが考えています…
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="border-t border-red-100 bg-red-50 px-4 py-5 sm:px-7">
                <div className="mx-auto max-w-3xl">
                  <p className="text-sm leading-6 text-red-700">
                    {error}
                  </p>

                  {needsLogin && (
                    <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                      <Link
                        href="/login"
                        className="rounded-xl border border-red-200 bg-white px-4 py-2.5 text-center text-sm font-semibold text-red-700 transition hover:bg-red-50"
                      >
                        ログイン
                      </Link>

                      <Link
                        href="/signup"
                        className="rounded-xl bg-red-700 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-red-800"
                      >
                        無料アカウントを作る
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="border-t border-[#dce9e6] bg-[#f8fbfa] px-3 py-4 sm:px-6 sm:py-5">
              <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-3xl"
              >
                <div className="flex items-end gap-2 rounded-2xl border border-[#abcac4] bg-white p-2 shadow-sm transition focus-within:border-[#5f8f87] focus-within:ring-4 focus-within:ring-[#dcece8]">
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(event) => {
                      setInput(event.target.value);

                      if (error) {
                        setError("");
                        setErrorStatus(null);
                      }
                    }}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    rows={1}
                    maxLength={3000}
                    placeholder="Mentoraに話してみる..."
                    className="max-h-40 min-h-[44px] flex-1 resize-none bg-transparent px-3 py-2.5 text-sm leading-6 text-slate-800 outline-none placeholder:text-[#8da6a1] disabled:cursor-not-allowed disabled:opacity-60 sm:text-[15px]"
                  />

                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="flex h-11 shrink-0 items-center justify-center rounded-xl bg-[#315e58] px-5 text-sm font-semibold text-white transition hover:bg-[#274e49] disabled:cursor-not-allowed disabled:bg-[#dbe5e3] disabled:text-[#8fa29e]"
                  >
                    {isLoading ? "送信中" : "送信"}
                  </button>
                </div>

                <div className="mt-2 flex items-center justify-between px-1 text-[11px] text-[#8ba09c]">
                  <span>
                    Enterで送信・Shift + Enterで改行
                  </span>

                  <span>
                    {input.length} / 3000
                  </span>
                </div>
              </form>
            </div>
          </div>

          <p className="mt-5 text-center text-[11px] leading-6 text-slate-400">
            Mentoraは、あなたの考えを整理するためのAIメンターです。
            <br className="sm:hidden" />
            医療・法律などの専門的な判断を代替するものではありません。
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6">
          <p className="text-xs font-bold tracking-[0.22em] text-slate-400">
            START FROM HERE
          </p>

          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
            最初の一歩は、
            <br className="sm:hidden" />
            話してみることから。
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
            まだ目標が決まっていなくても、
            うまく言葉にできなくても大丈夫です。
            <br />
            無料アカウントを作って、
            Mentoraと一緒に今のところから始めましょう。
          </p>

          <div className="mx-auto mt-8 flex max-w-xl flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="rounded-2xl bg-slate-900 px-8 py-4 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-700"
            >
              無料で始める
            </Link>

            <Link
              href="/login"
              className="rounded-2xl border border-slate-200 bg-white px-8 py-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              ログイン
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-bold">
                Mentora
              </p>

              <p className="mt-1 text-xs text-slate-400">
                あなたと一緒に考えるAIメンター
              </p>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
              <Link
                href="/login"
                className="transition hover:text-slate-900"
              >
                ログイン
              </Link>

              <Link
                href="/signup"
                className="transition hover:text-slate-900"
              >
                新規登録
              </Link>

              <Link
                href="/privacy"
                className="transition hover:text-slate-900"
              >
                プライバシーポリシー
              </Link>

              <Link
                href="/terms"
                className="transition hover:text-slate-900"
              >
                利用規約
              </Link>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-200 pt-5">
            <p className="text-xs leading-6 text-slate-400">
              © 2026 合同会社Webuild
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}