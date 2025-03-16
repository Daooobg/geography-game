import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/auth/LogoutButton";

export default async function Navbar() {
  const supabase = createServerComponentClient({ cookies });
  
  const { data: { session } } = await supabase.auth.getSession();

  return (
    <header className="border-b bg-background">
      <div className="container max-w-4xl mx-auto py-4 px-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">Географска Игра</Link>
        
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/play">Играй</Link>
          </Button>
          
          {session ? (
            <>
              <Button variant="ghost" asChild>
                <Link href="/dashboard">Табло</Link>
              </Button>
              <LogoutButton />
            </>
          ) : (
            <Button asChild>
              <Link href="/login">Вход</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
} 