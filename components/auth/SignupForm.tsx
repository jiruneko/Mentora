"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  signup,
  type SignupState,
} from "@/actions/auth";

const initialState: SignupState = {
  success: false,
  message: "",
};

export default function SignupForm() {
  const router = useRouter();

  const [state, formAction, pending] = useActionState(
    signup,
    initialState
  );

  useEffect(() => {
    if (!state.success) {
      return;
    }

    const timer = window.setTimeout(() => {
      router.push("/login");
    }, 600);

    return () => window.clearTimeout(timer);
  }, [state.success, router]);

  return (
    <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium text-emerald-700">
          Mentora
        </p>

        <h1 className="text-2xl font-bold text-slate-900">
          アカウントを作成
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          Mentoraをあなた専用の学習・生活支援メンターとして利用できます。
        </p>
      </div>

      <form action={formAction} className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            お名前
          </label>

          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            メールアドレス
          </label>

          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            パスワード
          </label>

          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />

          <p className="mt-2 text-xs text-slate-500">
            8文字以上で入力してください。
          </p>
        </div>

        {state.message && (
          <div
            className={`rounded-xl px-4 py-3 text-sm ${
              state.success
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {state.message}
          </div>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-xl bg-emerald-700 px-4 py-3 font-medium text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending
            ? "作成しています..."
            : "アカウントを作成"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        すでにアカウントをお持ちですか？{" "}
        <Link
          href="/login"
          className="font-medium text-emerald-700 hover:underline"
        >
          ログイン
        </Link>
      </p>
    </div>
  );
}