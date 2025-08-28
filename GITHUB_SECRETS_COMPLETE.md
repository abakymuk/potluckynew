# GitHub Secrets - Полный список для копирования

## Secrets (Settings → Secrets and variables → Actions → Secrets)

### Vercel Configuration
```
VERCEL_TOKEN=nJa66MeNInmmUtyfpSkS96pS
VERCEL_ORG_ID=team_HGb8HwCT7uFX5El8pg5826eU
VERCEL_PROJECT_ID=prj_Nt3392RzHMdCyxPEJwD6n5AMIrnl
```

### Supabase Configuration
```
SUPABASE_DB_URL_PREVIEW=https://cqmuozdqbqjbipinxcpk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InducXp6cGx4Zm91dGJsc2tzdnVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzNTI2OTUsImV4cCI6MjA3MTkyODY5NX0.xKBvnarYHs3qAV1ug5HVNBdfiERMOGv23gCZWYfvFtk
```

### Sentry Configuration (опционально)
```
SENTRY_DSN=https://02713f753f9d4facd8fd7d7500f5874a@o4509919839387648.ingest.us.sentry.io/4509919845285888
SENTRY_AUTH_TOKEN=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
SENTRY_ORG=dosta-corp
SENTRY_PROJECT=potluckynew
```

## Variables (Settings → Secrets and variables → Actions → Variables)

### Supabase URLs
```
NEXT_PUBLIC_SUPABASE_URL=https://wnqzzplxfoutblsksvud.supabase.co
```

### Sentry DSN
```
NEXT_PUBLIC_SENTRY_DSN=https://02713f753f9d4facd8fd7d7500f5874a@o4509919839387648.ingest.us.sentry.io/4509919845285888
```

## Инструкция по добавлению

1. Перейдите в GitHub репозиторий → Settings → Secrets and variables → Actions
2. Для каждого секрета:
   - Нажмите "New repository secret"
   - Введите имя (например, `VERCEL_TOKEN`)
   - Введите значение
   - Нажмите "Add secret"
3. Для переменных:
   - Перейдите на вкладку "Variables"
   - Нажмите "New repository variable"
   - Введите имя и значение

## Проверка настройки

После добавления всех secrets создайте тестовый PR и проверьте:
- ✅ Workflow запускается автоматически
- ✅ Все проверки проходят успешно
- ✅ В PR появляется комментарий с URL превью
- ✅ Миграции применяются к preview базе данных
