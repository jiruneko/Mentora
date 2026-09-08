import { auth } from "@/auth";
import MentoraChat from "@/components/mentora/MentoraChat";

export default async function ChatPage() {
  const session = await auth();

  return (
    <MentoraChat
      userName={
        session?.user?.name ??
        session?.user?.email
      }
    />
  );
}