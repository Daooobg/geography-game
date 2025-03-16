import { createServerClient } from '@supabase/ssr'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UserStats from "@/components/dashboard/UserStats";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function DashboardPage() {
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
    redirect('/login');
  }
  
  return (
    <div className="container max-w-4xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Табло с резултати</h1>
        <Button asChild>
          <Link href="/play">Играй сега</Link>
        </Button>
      </div>
      
      <UserStats userId={session.user.id} />
    </div>
  );
} 