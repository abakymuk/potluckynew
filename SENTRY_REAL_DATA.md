# Реальные данные Sentry для Potlucky

## Переменные окружения

```bash
# Sentry Configuration
SENTRY_DSN=https://02713f753f9d4facd8fd7d7500f5874a@o4509919839387648.ingest.us.sentry.io/4509919845285888
SENTRY_AUTH_TOKEN=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
SENTRY_ORG=dosta-corp
SENTRY_PROJECT=4509919845285888
NEXT_PUBLIC_SENTRY_DSN=https://02713f753f9d4facd8fd7d7500f5874a@o4509919839387648.ingest.us.sentry.io/4509919845285888
```

## Информация о проекте

- **Organization**: dosta-corp
- **Organization ID**: 4509919839387648
- **Project ID**: 4509919845285888
- **DSN**: https://02713f753f9d4facd8fd7d7500f5874a@o4509919839387648.ingest.us.sentry.io/4509919845285888
- **Auth Token**: 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

## Быстрая настройка

```bash
# Экспорт переменных
source scripts/setup-sentry-env.sh

# Сборка и запуск
pnpm --filter @potlucky/web build
pnpm --filter @potlucky/web dev

# Тестирование
curl -s "http://localhost:3000/api/ping?fail=1"
```

## Что было настроено Sentry Wizard

Sentry Wizard создал современную конфигурацию с использованием:

- **instrumentation.js** - основной файл инициализации для сервера и Edge
- **instrumentation-client.js** - инициализация для клиента
- **next.config.mjs** - конфигурация Next.js с Sentry
- **.env.sentry-build-plugin** - auth token для загрузки source maps

### Новые возможности

- **Session Replay** - запись сессий пользователей
- **Performance Monitoring** - мониторинг производительности
- **Logs** - отправка логов в Sentry
- **Tunnel Route** - обход блокировщиков рекламы через `/monitoring`
- **Source Maps** - автоматическая загрузка source maps

## Sentry Dashboard

- **URL**: https://us.sentry.io/organizations/dosta-corp/projects/
- **Project**: 4509919845285888

## Тестирование

1. Запустите приложение с переменными Sentry
2. Вызовите ошибку: `curl -s "http://localhost:3000/api/ping?fail=1"`
3. Проверьте ошибку в Sentry Dashboard
4. Ошибка должна появиться с тегом `runtime=edge` и `eventId`

## CI/CD

Для GitHub Actions добавьте эти переменные в Secrets:

- `SENTRY_AUTH_TOKEN`
- `SENTRY_ORG`
- `SENTRY_PROJECT`
- `SENTRY_DSN`
- `NEXT_PUBLIC_SENTRY_DSN`
