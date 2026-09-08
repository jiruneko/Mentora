import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl text-center">
        <p className="text-sm font-semibold tracking-wide text-slate-500">
          404
        </p>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
          ページが見つかりません
        </h1>

        <p className="mt-4 leading-8 text-slate-600">
          お探しのページは、移動または削除されたか、
          URLが正しくない可能性があります。
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            トップへ戻る
          </Link>
        </div>
      </div>
    </main>
  );
}