# Potlucky Monorepo (Edge/Serverless-first)

## Structure

- apps/
  - web/ – Next.js 15 приложение с Edge runtime
- packages/
  - ui/ – базовые UI-хелперы (shadcn/ui)
  - config/ – фичефлаги и env-хелперы
  - contracts/ – схемы и контракты API (позже: zod + openapi)
  - types/ – общие типы
- infra/ – скрипты и (позже) CI/infra

## Environment

### Required public env (build will fail if missing)

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

### Database env (for migrations/seeds)

```
SUPABASE_DB_URL=postgresql://postgres:password@host:5432/postgres?sslmode=require
SUPABASE_SERVICE_ROLE=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Feature flags (optional, default=false)

```
ONLINE_ORDERING_V1=false
ORDER_QUEUE_V1=false
AI_ADVISOR_V1=false
```

## Database Commands

- `pnpm drizzle:generate` - Generate migrations from schema
- `pnpm drizzle:push` - Apply migrations to database
- `pnpm db:seed` - Seed database with test data
- `pnpm db:rls` - Apply RLS policies
- `pnpm test:rls` - Run RLS e2e tests

## RLS & Auth

- RLS включён на organizations/profiles/memberships.
- Функция `auth_profile_id()` (SECURITY DEFINER) — безопасно вычисляет профиль по JWT.
- Триггер `on_auth_user_created` создаёт профиль при регистрации.
- В рантайме используются только anon-ключи; все доступы контролируются RLS.
- Для сидов/тестов необходим `SUPABASE_SERVICE_ROLE`.

### Auth check (локально)

```bash
# ENV
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_DB_URL=...
SUPABASE_SERVICE_ROLE=...

# сиды/rls (если ещё не выполняли)
pnpm drizzle:generate && pnpm drizzle:push
pnpm db:rls && pnpm db:seed

# токен Alice
node scripts/get-token-alice.mjs

# запрос к защищённому роуту
curl -H "Authorization: Bearer <TOKEN>" http://localhost:3000/api/me | jq
```

### Sentry check

1. Установи переменные: SENTRY_DSN (и в CI — AUTH_TOKEN/ORG/PROJECT).
2. Локально: `pnpm --filter @potlucky/web dev`
3. Открой: /api/ping?fail=1 → 500 и вернёт { error, eventId }.
4. Проверь событие в Sentry (тег runtime=edge, request_id если включён).

```bash
# локально
source scripts/setup-sentry-env.sh
pnpm --filter @potlucky/web build
pnpm --filter @potlucky/web dev
curl -s localhost:3000/api/ping
curl -s "localhost:3000/api/ping?fail=1"
```

## Commands

- `pnpm -w build|dev|lint|typecheck|test`
- `pnpm validate:packages`

## Rules

- Contracts-first, mocks-first, feature flags.
- Один пакет = один артефакт (cjs+esm+d.ts).
- Никаких прямых обращений к process.env вне @potlucky/config.
