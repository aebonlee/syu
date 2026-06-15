import {
  createContext, useContext, useEffect, useState, useCallback, type ReactNode,
} from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { getSupabase, TABLES } from '../lib/supabase'

export interface Profile {
  id: string
  email: string
  name: string
  avatar_url: string | null
  provider: string
  signup_domain: string | null
}

interface AuthValue {
  user: User | null
  profile: Profile | null
  loading: boolean
  isLoggedIn: boolean
  signInWithGoogle: () => Promise<void>
  signInWithKakao: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  // 프로필 조회 + OAuth 첫 로그인 시 자동 생성 (syu_profiles)
  const syncProfile = useCallback(async (authUser: User | null) => {
    if (!authUser) {
      setProfile(null)
      return
    }
    const supabase = getSupabase()
    const meta = authUser.user_metadata || {}
    const baseProfile: Profile = {
      id: authUser.id,
      email: authUser.email || meta.email || '',
      name: meta.full_name || meta.name || meta.nickname || (authUser.email?.split('@')[0] ?? '사용자'),
      avatar_url: meta.avatar_url || meta.picture || null,
      provider: authUser.app_metadata?.provider || 'email',
      signup_domain: window.location.hostname,
    }

    try {
      const { data: existing } = await supabase
        .from(TABLES.profiles)
        .select('*')
        .eq('id', authUser.id)
        .maybeSingle()

      if (existing) {
        setProfile(existing as Profile)
      } else {
        const { data: inserted } = await supabase
          .from(TABLES.profiles)
          .insert(baseProfile)
          .select()
          .single()
        setProfile((inserted as Profile) ?? baseProfile)
      }
    } catch {
      // 테이블 미존재/RLS 등으로 실패해도 로그인 자체는 유지
      setProfile(baseProfile)
    }
  }, [])

  useEffect(() => {
    const supabase = getSupabase()
    let mounted = true

    supabase.auth.getSession().then(({ data }: { data: { session: Session | null } }) => {
      if (!mounted) return
      setUser(data.session?.user ?? null)
      syncProfile(data.session?.user ?? null).finally(() => mounted && setLoading(false))
    })

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return
      setUser(session?.user ?? null)
      syncProfile(session?.user ?? null)
    })

    return () => {
      mounted = false
      sub.subscription.unsubscribe()
    }
  }, [syncProfile])

  const signInWithGoogle = useCallback(async () => {
    await getSupabase().auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + '/' },
    })
  }, [])

  const signInWithKakao = useCallback(async () => {
    await getSupabase().auth.signInWithOAuth({
      provider: 'kakao',
      options: { redirectTo: window.location.origin + '/' },
    })
  }, [])

  const signOut = useCallback(async () => {
    await getSupabase().auth.signOut({ scope: 'local' })
    setUser(null)
    setProfile(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user, profile, loading,
        isLoggedIn: !!user,
        signInWithGoogle, signInWithKakao, signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
