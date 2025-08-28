# Potlucky - Edge/Serverless-first Scaffold

Современный монорепозиторий для создания масштабируемых веб-приложений с использованием Next.js 15, Supabase, Drizzle ORM и Sentry.

## 🚀 Технологии

- **Frontend**: Next.js 15 (App Router, Edge Runtime)
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Drizzle ORM
- **Authentication**: Supabase Auth (Edge SSR)
- **Observability**: Sentry (Error tracking, Performance monitoring, Session replay)
- **Styling**: Tailwind CSS v4.1.12
- **UI Components**: shadcn/ui
- **Monorepo**: pnpm workspaces + Turbo
- **Type Safety**: TypeScript 5.6.0
- **Testing**: Vitest

## 📁 Структура проекта

```
potluckynew/
├── apps/
│   └── web/                 # Next.js 15 приложение
│       ├── app/            # App Router
│       ├── components/     # UI компоненты
│       ├── lib/           # Утилиты и конфигурация
│       └── tests/         # Тесты
├── packages/
│   ├── config/            # Конфигурация и feature flags
│   ├── ui/               # Общие UI компоненты
│   ├── contracts/        # Типы и контракты
│   └── types/           # Общие типы
├── infra/
│   ├── db/              # База данных (Drizzle + миграции)
│   ├── ci/              # CI/CD конфигурация
│   └── scripts/         # Скрипты
└── scripts/             # Утилитарные скрипты
```

## 🛠 Установка и запуск

### Предварительные требования

- Node.js 18+
- pnpm 9+
- PostgreSQL (или Supabase)

### Установка

```bash
# Клонирование репозитория
git clone https://github.com/abakymuk/potluckynew.git
cd potluckynew

# Установка зависимостей
pnpm install

# Настройка переменных окружения
cp apps/web/env.example apps/web/.env.local
```

### Переменные окружения

Создайте файл `apps/web/.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Sentry (опционально)
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
SENTRY_AUTH_TOKEN=your_sentry_auth_token
SENTRY_ORG=your_sentry_org
SENTRY_PROJECT=your_sentry_project

# Feature Flags
NEXT_PUBLIC_FEATURE_NEW_UI=false
NEXT_PUBLIC_FEATURE_BETA=true
```

### Запуск

```bash
# Разработка
pnpm dev

# Сборка
pnpm build

# Тесты
pnpm test

# Линтинг
pnpm lint

# Проверка типов
pnpm typecheck
```

## 🗄 База данных

### Настройка Supabase

1. Создайте проект в [Supabase](https://supabase.com)
2. Получите URL и ключи из настроек проекта
3. Добавьте их в `.env.local`

### Миграции

```bash
# Генерация миграций
pnpm drizzle:generate

# Применение миграций
pnpm drizzle:push

# Сид данных
pnpm db:seed

# Применение RLS политик
pnpm db:rls
```

## 🔐 Аутентификация

Проект использует Supabase Auth с Edge SSR:

- Автоматическое создание профилей при регистрации
- Row Level Security (RLS) для защиты данных
- Middleware для передачи контекста пользователя
- Защищенные API маршруты

### Тестирование аутентификации

```bash
# Получение токена для Alice
node scripts/get-token-alice.mjs

# Тестирование защищенного API
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:3000/api/me
```

## 📊 Наблюдаемость (Sentry)

### Настройка Sentry

1. Создайте проект в [Sentry](https://sentry.io)
2. Получите DSN и auth token
3. Добавьте их в `.env.local`

### Тестирование

```bash
# Экспорт переменных Sentry
source scripts/setup-sentry-env.sh

# Запуск приложения
pnpm dev

# Тестирование ошибок
curl "http://localhost:3000/api/ping?fail=1"
```

### Тестовая страница

Откройте http://localhost:3000/sentry-example-page для тестирования различных типов ошибок.

## 🧪 Тестирование

```bash
# Все тесты
pnpm test

# E2E тесты RLS
pnpm test:rls

# Тесты конфигурации
pnpm --filter @potlucky/config test
```

## 📋 Выполненные задачи

- ✅ **T0.0**: Настройка pnpm/Turbo монорепозитория
- ✅ **T0.1**: Next.js 15 приложение с Edge API
- ✅ **T0.2**: Валидация переменных окружения и feature flags
- ✅ **T0.3**: Интеграция Supabase + Drizzle ORM
- ✅ **T0.4**: Row Level Security + автоматические профили
- ✅ **T0.5**: Edge аутентификация с Supabase SSR
- ✅ **T0.6**: Наблюдаемость с Sentry + OTEL трейсинг

## 🔗 Полезные ссылки

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Drizzle ORM](https://orm.drizzle.team)
- [Sentry Documentation](https://docs.sentry.io)
- [shadcn/ui](https://ui.shadcn.com)

## 📄 Лицензия

MIT
