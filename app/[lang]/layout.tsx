import '../globals.css'
import { Inter } from 'next/font/google'
import { locales } from '@/middleware'
import { Locale } from '@/lib/i18n/types'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { ThemeProvider } from '../../components/theme-provider'
import { LanguageProvider } from '../../lib/i18n/LanguageProvider'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

// Генериране на алтернативни езици за SEO
export function generateAlternates() {
  return locales.map((locale) => ({
    hrefLang: locale,
    href: `/${locale}`,
  }))
}

export async function generateMetadata({ params }: { params: { lang: Locale } }) {
  const { lang } = await params;
  const dictionary = getDictionary(lang)
  
  // Remove complex structures that can cause serialization problems
  return {
    title: dictionary.game.title,
    description: 'A game to test your geography knowledge',
    alternates: {
      canonical: `/${lang}`,
      // Премахваме сложните структури, които могат да причинят проблеми
      languages: { 
        'bg': '/bg',
        'en': '/en',
        'es': '/es'
      },
    },
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  const { lang } = await params;
  
  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider lang={lang}>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
} 