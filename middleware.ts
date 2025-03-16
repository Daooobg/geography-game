import { NextRequest, NextResponse } from 'next/server'
import { Locale } from '@/lib/i18n/types'

// Поддържани езици
export const locales = ['bg', 'en', 'es'] as const

// Език по подразбиране
export const defaultLocale = 'bg'

// Функция за извличане на езика от пътя на URL
function getLocale(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Проверка дали текущият път вече включва локал
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  
  if (pathnameHasLocale) return pathname.split('/')[1]

  // Проверка в заглавията на заявката
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim())
      .find(lang => {
        const prefix = lang.substring(0, 2)
        return locales.includes(prefix as Locale)
      })
    
    if (preferredLocale) return preferredLocale.substring(0, 2)
  }

  // Връщане на език по подразбиране
  return defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Пропускане на статични файлове
  if (
    [
      '/favicon.ico',
      '/logo.png',
      '/manifest.json',
      '/robots.txt',
      '/sitemap.xml',
    ].includes(pathname) ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/img/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Проверка дали URL-то вече включва локал
  const pathnameIsMissingLocale = locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Пренасочване, ако URL-то няма локал
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    
    // Създаване на ново URL с локал
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    )
  }
}

// Нова конфигурация, използваща новия формат
export const matcher = [
  // Пропускане на всички вътрешни пътища (_next)
  '/((?!_next/static|_next/image|favicon.ico).*)',
] 