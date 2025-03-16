import { createServerClient } from '@supabase/ssr'
import { cookies } from "next/headers";
import GameContainer from "@/components/game/GameContainer";
import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function GamePage({
  params,
}: {
  params: { lang: Locale };
}) {
  const { lang } = await params;
  const dictionary = getDictionary(lang);
  console.log(`Game page loaded for language: ${lang}`);
  
  try {
    const cookieStore = await cookies()
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
        },
      }
    )
    
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;
    
    return (
      <div className="container max-w-4xl mx-auto py-10 px-4">
        <GameContainer userId={userId} />
      </div>
    );
  } catch (error) {
    console.error('Error in Game page:', error);
    return (
      <div className="container max-w-4xl mx-auto py-10 px-4">
        <div className="p-4 bg-red-100 text-red-800 rounded mb-4">
          {dictionary.common.error}
        </div>
        <GameContainer userId={undefined} />
      </div>
    );
  }
} 