import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useAuthStore } from '../store/authStore' 

export function useAuth() {
  const { session, user } = useAuthStore()
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const login = async (email, password) => {
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    
    if (error) {
      setError(error.message)
      setLoading(false)
      return { success: false, error }
    }
    
    setLoading(false)
    return { success: true }
  }

  const register = async (email, password, fullName) => {
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return { success: false, error }
    }

    setLoading(false)
    return { success: true }
  }

  const logout = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signOut()
    if (error) setError(error.message)
    setLoading(false)
  }

  return {
    session,
    user,
    // UI local states
    loading,
    error,
    // Actions
    login,
    register,
    logout
  }
}