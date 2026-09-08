"use client";

import { useEffect } from "react";

type GlobalErrorProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function GlobalError({
  error,
  reset,
}: GlobalErrorProps) {
  useEffect(() => {
    console.error(
      "Mentora global error:",
      error
    );
  }, [error]);

  return (
    <html lang="ja">
      <body>
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-16">
          <div className="w-full max-w-xl rounded-2xl bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-semibold tracking-wide text-slate-500">
              Mentora
            </p>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
              問題が発生しました
            </h1>

            <p className="mt-4 leading-8 text-slate-600">
              Mentoraを正常に表示できませんでした。
              少し時間を置いてから、もう一度お試しください。
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
      </body>
    </html>
  );
}