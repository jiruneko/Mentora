import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      {children}
    </div>
  );
}