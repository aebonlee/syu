-- ============================================================
-- syu_settings — API 키 등 서버 전용 설정 (접두사 syu_)
-- 챗봇(Edge Function syu-chat)이 service_role로만 읽습니다.
-- RLS 활성화 + 정책 없음 → anon/authenticated 클라이언트는 절대 읽을 수 없음.
-- Supabase Dashboard → SQL Editor 에서 실행하세요.
-- ============================================================

create table if not exists public.syu_settings (
  key        text primary key,
  value      text,
  updated_at timestamptz default now()
);

comment on table public.syu_settings is 'syu 서버 전용 설정 (API 키 등). service_role만 접근.';

alter table public.syu_settings enable row level security;
-- 정책을 만들지 않습니다 → 클라이언트(anon/authenticated) 읽기/쓰기 모두 차단.
-- service_role(Edge Function)은 RLS를 우회하므로 정상 동작합니다.

-- ── API 키 등록 (값을 실제 키로 교체 후 실행) ──────────────
insert into public.syu_settings (key, value) values
  ('SOLAR_API_KEY',  'up_xxxxxxxxxxxxxxxxxxxxx'),
  ('OPENAI_API_KEY', 'sk-xxxxxxxxxxxxxxxxxxxxx')
on conflict (key) do update set value = excluded.value, updated_at = now();
