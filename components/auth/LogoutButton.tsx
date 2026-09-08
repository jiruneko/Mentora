import { signOut } from "@/auth";

export default function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server";

        await signOut({
          redirectTo: "/",
        });
      }}
    >
      <button
        type="submit"
        className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
      >
        ログアウト
      </button>
    </form>
  );
}