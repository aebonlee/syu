-- ============================================================
-- syu · 삼육대학교 생성형 AI 특강 — Supabase 스키마
-- 접두사(prefix): syu_
-- 공유 프로젝트(hcmgdztsgjvzcyxyayaj)에서 다른 사이트와 충돌하지 않도록
-- 모든 테이블은 syu_ 접두사를 사용합니다.
-- Supabase Dashboard → SQL Editor 에 붙여넣어 실행하세요.
-- ============================================================

-- 1) 회원 프로필 테이블 (구글/카카오 OAuth 가입 시 자동 생성)
create table if not exists public.syu_profiles (
  id            uuid primary key references auth.users (id) on delete cascade,
  email         text,
  name          text,
  avatar_url    text,
  provider      text,                       -- 'google' | 'kakao' | 'email'
  signup_domain text,                       -- 가입 도메인 (syu.dreamitbiz.com)
  role          text default 'member',      -- 'member' | 'admin'
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

comment on table public.syu_profiles is '삼육대 AI 특강 회원 프로필 (구글/카카오 로그인)';

-- 2) Row Level Security 활성화
alter table public.syu_profiles enable row level security;

-- 3) 정책: 본인 프로필만 조회/수정/생성 가능
drop policy if exists "syu_profiles_select_own" on public.syu_profiles;
create policy "syu_profiles_select_own"
  on public.syu_profiles for select
  using (auth.uid() = id);

drop policy if exists "syu_profiles_insert_own" on public.syu_profiles;
create policy "syu_profiles_insert_own"
  on public.syu_profiles for insert
  with check (auth.uid() = id);

drop policy if exists "syu_profiles_update_own" on public.syu_profiles;
create policy "syu_profiles_update_own"
  on public.syu_profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- 4) updated_at 자동 갱신 트리거
create or replace function public.syu_set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists syu_profiles_updated_at on public.syu_profiles;
create trigger syu_profiles_updated_at
  before update on public.syu_profiles
  for each row execute function public.syu_set_updated_at();

-- ============================================================
-- [선택] 신규 가입 시 프로필 자동 생성 (앱에서도 생성하지만 안전망)
-- ============================================================
create or replace function public.syu_handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.syu_profiles (id, email, name, avatar_url, provider, signup_domain)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'nickname'),
    coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture'),
    coalesce(new.raw_app_meta_data->>'provider', 'email'),
    'syu.dreamitbiz.com'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- 주의: auth.users 트리거는 공유 프로젝트 전역에 영향을 줄 수 있으므로
-- 필요 시에만 활성화하세요. (앱 레벨에서 이미 syu_profiles upsert 처리 중)
-- drop trigger if exists syu_on_auth_user_created on auth.users;
-- create trigger syu_on_auth_user_created
--   after insert on auth.users
--   for each row execute function public.syu_handle_new_user();
