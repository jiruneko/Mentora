export default function Loading() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6 py-16">
      <div className="text-center">
        <div
          className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-slate-700"
          aria-hidden="true"
        />

        <p className="mt-4 text-sm text-slate-600">
          読み込んでいます...
        </p>
      </div>
    </main>
  );
}