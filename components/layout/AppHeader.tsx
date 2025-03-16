"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { ModeToggle } from "../layout/ModeToggle";
import LanguageSwitcher from "../layout/LanguageSwitcher";
import UserDisplay from "@/components/auth/UserDisplay";

export default function AppHeader() {
  const { dictionary: t, lang } = useTranslation();

  return (
    <header className="border-b">
      <div className="container flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-4">
          <Link href={`/${lang}`} className="font-medium text-lg">
            {t.game.title}
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href={`/${lang}`} className="text-sm font-medium">
              {t.navigation.home}
            </Link>
            <Link href={`/${lang}/game`} className="text-sm font-medium">
              {t.navigation.game}
            </Link>
            <Link href={`/${lang}/dashboard`} className="text-sm font-medium">
              {t.navigation.dashboard}
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <UserDisplay />
          <LanguageSwitcher />
          <ModeToggle />
          <Button asChild variant="outline" size="sm">
            <Link href={`/${lang}/login`}>{t.auth.login}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
} 