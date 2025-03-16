"use client";

import { useTranslation } from "@/lib/hooks/useTranslation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Language switching component
export default function LanguageSwitcher() {
  const pathname = usePathname();
  const { lang } = useTranslation();
  
  // Language options with flags
  const languages = [
    { code: 'bg', name: 'Български', flag: '/img/flags/bg.svg' },
    { code: 'en', name: 'English', flag: '/img/flags/gb.svg' },
    { code: 'es', name: 'Español', flag: '/img/flags/es.svg' },
  ];
  
  // Find the currently selected language
  const selectedLanguage = languages.find(l => l.code === lang) || languages[0];
  
  // Функция за промяна на пътя за различен език
  const getPathForLocale = (locale: string) => {
    const segments = pathname.split('/');
    
    // Ако текущият път има локал в първия сегмент, заменяме го
    if (['bg', 'en', 'es'].includes(segments[1])) {
      segments[1] = locale;
    } else {
      // Иначе добавяме локала в началото
      segments.splice(1, 0, locale);
    }
    
    return segments.join('/');
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 px-2 py-1 flex items-center gap-2">
          <div className="relative w-5 h-3">
            <Image 
              src={selectedLanguage.flag} 
              alt={selectedLanguage.name}
              fill
              priority
              sizes="20px"
              className="rounded object-cover"
            />
          </div>
          <span>{selectedLanguage.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {languages.map(language => (
          <DropdownMenuItem 
            key={language.code}
            asChild
          >
            <Link
              href={getPathForLocale(language.code)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="relative w-5 h-3">
                <Image 
                  src={language.flag} 
                  alt={language.name}
                  fill
                  sizes="20px"
                  className="rounded object-cover"
                />
              </div>
              <span>{language.name}</span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 