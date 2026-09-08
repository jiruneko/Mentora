"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    const email = String(formData.get("email") ?? "");
    const password = String(
      formData.get("password") ?? ""
    );

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(
          "メールアドレスまたはパスワードが正しくありません"
        );
        return;
      }

      router.push("/chat");
      router.refresh();
    } catch {
      setError(
        "ログイン処理中にエラーが発生しました"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium text-emerald-700">
          Mentora
        </p>

        <h1 className="text-2xl font-bold text-slate-900">
          おかえりなさい
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          Mentoraにログインして続きを始めましょう。
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
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
            autoComplete="current-password"
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-emerald-700 px-4 py-3 font-medium text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "ログイン中..." : "ログイン"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        はじめての方は{" "}
        <Link
          href="/signup"
          className="font-medium text-emerald-700 hover:underline"
        >
          アカウントを作成
        </Link>
      </p>
      <a href="/privacy">
  プライバシーポリシー
</a>
    </div>
  );
}