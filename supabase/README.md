# syu — Supabase 설정 (인증 · 챗봇)

## 1. 테이블

SQL Editor에서 실행:

- `schema.sql` — `syu_profiles` (구글/카카오 로그인 프로필 + RLS)
- `settings.sql` — `syu_settings` (API 키 보관, **클라이언트 읽기 차단**)

## 2. 챗봇 API 키 등록

`settings.sql`의 INSERT 문에서 값을 실제 키로 교체 후 실행:

```sql
insert into public.syu_settings (key, value) values
  ('SOLAR_API_KEY',  'up_실제키'),
  ('OPENAI_API_KEY', 'sk-실제키')
on conflict (key) do update set value = excluded.value, updated_at = now();
```

> 키는 RLS로 보호되어 브라우저에서 읽을 수 없습니다. Edge Function(service_role)만 읽습니다.

## 3. 챗봇 Edge Function 배포

```bash
# Supabase CLI 로그인 후 (최초 1회)
supabase login
supabase link --project-ref hcmgdztsgjvzcyxyayaj

# 함수 배포
supabase functions deploy syu-chat --project-ref hcmgdztsgjvzcyxyayaj
```

- `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` 는 Edge Function 런타임에 자동 주입됩니다(별도 설정 불필요).
- 프런트(`ChatWidget`)는 `supabase.functions.invoke('syu-chat', …)`로 호출합니다.

## 4. 동작 확인

- 사이트 우측 하단 채팅 버튼 → 질문 입력
- 헤더의 **Solar / OpenAI** 토글로 프로바이더 전환
- 모델: Solar `solar-pro2`, OpenAI `gpt-4o-mini` (필요 시 `functions/syu-chat/index.ts`에서 변경)

## 참고

- Solar(Upstage) 엔드포인트: `https://api.upstage.ai/v1/chat/completions` (OpenAI 호환)
- 모델/엔드포인트는 Upstage 콘솔 기준으로 바뀔 수 있으니 호출 실패 시 함수에서 조정하세요.
