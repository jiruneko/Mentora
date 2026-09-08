import { redirect } from "next/navigation";

import { auth } from "@/auth";
import LoginForm from "@/components/auth/LoginForm";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/chat");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <LoginForm />
    </main>
  );
}