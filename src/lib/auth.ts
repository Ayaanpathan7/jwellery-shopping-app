import { createClient } from '@supabase/supabase-js'

// Handle missing environment variables during build
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

const supabase = createClient(supabaseUrl, supabaseKey)

export interface UserSession {
  id: string
  email: string
  isAuthenticated: boolean
}

// Generate anonymous user ID for guests
export function getAnonymousUserId(): string {
  if (typeof window === 'undefined') return 'anonymous'
  
  let anonymousId = localStorage.getItem('luna_gems_anonymous_id')
  if (!anonymousId) {
    anonymousId = 'anon_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
    localStorage.setItem('luna_gems_anonymous_id', anonymousId)
  }
  return anonymousId
}

// Get current user session
export async function getCurrentUser(): Promise<UserSession> {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (session?.user) {
      return {
        id: session.user.id,
        email: session.user.email || '',
        isAuthenticated: true
      }
    }
    
    // Return anonymous user for guests
    return {
      id: getAnonymousUserId(),
      email: '',
      isAuthenticated: false
    }
  } catch (error) {
    console.error('Error getting current user:', error)
    return {
      id: getAnonymousUserId(),
      email: '',
      isAuthenticated: false
    }
  }
}

// Simple email/password sign up
export async function signUp(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    
    if (error) throw error
    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// Simple email/password sign in
export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) throw error
    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// Sign out
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// Listen to auth state changes
export function onAuthStateChange(callback: (session: any) => void) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session)
  })
}

export { supabase }
