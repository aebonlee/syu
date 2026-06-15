import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// 드림아이티비즈 공유 Supabase 프로젝트 (anon key는 공개키 — 정적 배포용 fallback)
// .env 로 덮어쓸 수 있음: VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY
const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://hcmgdztsgjvzcyxyayaj.supabase.co'
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjbWdkenRzZ2p2emN5eHlheWFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0MzU4ODcsImV4cCI6MjA4NzAxMTg4N30.gznaPzY1l8qDAPsEyYNR9KS7f7VqS3xaw-_2HTSwSZw'

/** 이 사이트의 Supabase 테이블 접두사 */
export const DB_PREFIX = 'syu_'

/** 접두사가 적용된 테이블명 */
export const TABLES = {
  profiles: `${DB_PREFIX}profiles`,
} as const

let client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (!client) {
    client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        flowType: 'pkce',
        detectSessionInUrl: true,
        autoRefreshToken: true,
        persistSession: true,
        storageKey: 'syu-auth',
      },
    })
  }
  return client
}

export default getSupabase
