import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import GameContainer from "@/components/game/GameContainer";

export default async function PlayPage() {
  const supabase = createServerComponentClient({ cookies });
  
  const { data: { session } } = await supabase.auth.getSession();
  
  return (
    <div className="container max-w-4xl mx-auto py-10 px-4">
      <GameContainer userId={session?.user?.id} />
    </div>
  );
} 