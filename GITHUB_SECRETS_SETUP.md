# GitHub Secrets Setup для CI/CD

## Обязательные Secrets

Добавьте следующие secrets в GitHub репозиторий:
**Settings → Secrets and variables → Actions → Secrets**

### Vercel Configuration
- `VERCEL_TOKEN`: `nJa66MeNInmmUtyfpSkS96pS`
- `VERCEL_ORG_ID`: `team_HGb8HwCT7uFX5El8pg5826eU`
- `VERCEL_PROJECT_ID`: `prj_Nt3392RzHMdCyxPEJwD6n5AMIrnl`

### Supabase Configuration
- `SUPABASE_DB_URL_PREVIEW`: `https://cqmuozdqbqjbipinxcpk.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Anon key для Supabase (для сборки)

## Переменные окружения (Variables)

Добавьте в **Settings → Secrets and variables → Actions → Variables**:

### Supabase URLs (для сборки)
- `NEXT_PUBLIC_SUPABASE_URL`: `https://wnqzzplxfoutblsksvud.supabase.co`

## Опциональные Secrets (Sentry)

Если настроена Sentry:
- `SENTRY_DSN`: DSN для Sentry
- `SENTRY_AUTH_TOKEN`: Auth token для Sentry
- `SENTRY_ORG`: Организация Sentry
- `SENTRY_PROJECT`: Проект Sentry

## Как добавить Secrets

1. Перейдите в ваш GitHub репозиторий
2. Нажмите **Settings**
3. В левом меню выберите **Secrets and variables → Actions**
4. Нажмите **New repository secret** для каждого секрета
5. Введите имя и значение секрета
6. Нажмите **Add secret**

## Проверка настройки

После добавления всех secrets, создайте тестовый PR и проверьте, что:
1. Workflow запускается автоматически
2. Все проверки проходят успешно
3. В PR появляется комментарий с URL превью
4. Миграции применяются к preview базе данных
