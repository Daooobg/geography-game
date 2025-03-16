"use client";

import { useTranslation } from "@/lib/hooks/useTranslation";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";

export default function UserDisplay() {
  const { dictionary: t, username, email, lang } = useTranslation();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Check if the user is logged in
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    
    checkAuth();
    
    // Listener for authentication changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      setIsLoggedIn(!!session);
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("username"); // Remove username from localStorage
    router.push(`/${lang}/login`); // Redirect to login page
    router.refresh();
  };
  
  if (!isLoggedIn) {
    return (
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => router.push(`/${lang}/login`)}>
          {t.auth.login}
        </Button>
        <Button size="sm" onClick={() => router.push(`/${lang}/register`)}>
          {t.auth.register}
        </Button>
      </div>
    );
  }
  
  return (
    <div className="flex items-center gap-4">
      <div className="text-sm flex flex-col">
        {username && (
          <div className="font-medium">
            {t.common.welcome}, <span className="font-bold">{username}</span>
          </div>
        )}
        {email && (
          <div className="text-xs text-gray-500">{email}</div>
        )}
      </div>
      <Button size="sm" variant="outline" onClick={handleLogout}>
        {t.navigation.logout}
      </Button>
    </div>
  );
} 