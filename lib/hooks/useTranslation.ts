"use client"

import { useLanguage } from "@/lib/i18n/LanguageProvider"
import { useState, useEffect } from "react"
import { getSupabaseClient } from "@/lib/supabase"
import { User } from "@supabase/supabase-js"

/**
 * Custom hook for managing translations and user profile
 */
export function useTranslation() {
  const { lang, dictionary } = useLanguage()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  
  useEffect(() => {
    async function getUser() {
      try {
        const supabase = getSupabaseClient()
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          setUser(user)
          setUsername(user.user_metadata?.username || null)
          setEmail(user.email || null)
        }
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [])

  // Return serializable values with proper types
  return {
    t: dictionary,
    dictionary,
    lang,
    username,
    email,
    user,
    loading
  }
} 