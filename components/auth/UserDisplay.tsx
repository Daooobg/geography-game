"use client";

import { useState, useEffect } from 'react'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import { Button } from '@/components/ui/button'
import { User, AuthChangeEvent, Session } from '@supabase/supabase-js'
import { getSupabaseClient } from '@/lib/supabase'

export default function UserDisplay() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { dictionary } = useLanguage()

  useEffect(() => {
    const supabase = getSupabaseClient();
    
    async function getUser() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setLoading(false)
      }
    }

    getUser()

    // Setup listener for authentication changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, currentUser: Session | null) => {
        setUser(currentUser?.user || null)
      }
    )

    // Cleanup on component unmount
    return () => {
      subscription.unsubscribe()
    }
  }, []) // Removed dependency on supabase.auth

  const handleSignOut = async () => {
    const supabase = getSupabaseClient();
    try {
      await supabase.auth.signOut()
      setUser(null)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (loading) {
    return <div className="text-sm opacity-70">{dictionary.common.loading}</div>
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex items-center gap-3">
      <div className="text-sm">
        {user.user_metadata?.username || user.email}
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={handleSignOut}
        className="text-sm"
      >
        {dictionary.navigation.logout}
      </Button>
    </div>
  )
} 