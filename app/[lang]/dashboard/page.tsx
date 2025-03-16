import { createServerClient } from '@supabase/ssr'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UserStats from "@/components/dashboard/UserStats";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function DashboardPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const { lang } = await params;
  const dictionary = getDictionary(lang);
  
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
    
    if (!session) {
      redirect(`/${lang}/login`);
    }
    
    return (
      <div className="container max-w-4xl mx-auto py-10 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{dictionary.navigation.dashboard}</h1>
          <Button asChild>
            <Link href={`/${lang}/game`}>{dictionary.game.start}</Link>
          </Button>
        </div>
        
        <UserStats userId={session.user.id} />
      </div>
    );
  } catch (error) {
    console.error('Error in Dashboard page:', error);
    return (
      <div className="container max-w-4xl mx-auto py-10 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{dictionary.navigation.dashboard}</h1>
          <Button asChild>
            <Link href={`/${lang}/game`}>{dictionary.game.start}</Link>
          </Button>
        </div>
        
        <div className="p-4 bg-red-100 text-red-800 rounded">
          {dictionary.common.error}
        </div>
      </div>
    );
  }
}