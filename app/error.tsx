"use client";

import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  useEffect(() => {
    console.error("Mentora page error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl text-center">
        <p className="text-sm font-semibold tracking-wide text-slate-500">
          Mentora
        </p>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
          うまく読み込めませんでした
        </h1>

        <p className="mt-4 leading-8 text-slate-600">
          一時的な問題が発生している可能性があります。
          もう一度お試しください。
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            もう一度試す
          </button>

          <button
            type="button"
            onClick={() => {
              window.location.href = "/";
            }}
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            トップへ戻る
          </button>
        </div>
      </div>
    </main>
  );
}