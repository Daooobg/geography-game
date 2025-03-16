"use client"

import React, { createContext, useContext, ReactNode, useMemo } from 'react'
import { Locale } from './types'
import { getDictionary } from './dictionaries'

type LanguageContextType = {
  lang: Locale
  dictionary: ReturnType<typeof getDictionary>
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

type LanguageProviderProps = {
  children: ReactNode
  lang: Locale
}

export function LanguageProvider({ children, lang }: LanguageProviderProps) {
  const dictionary = useMemo(() => getDictionary(lang), [lang])
  
  const contextValue = useMemo(() => ({
    lang,
    dictionary
  }), [lang, dictionary])

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  )
} 