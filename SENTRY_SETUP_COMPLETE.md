# ✅ Sentry Setup Complete

## Что было сделано

### 1. Запуск Sentry Wizard
```bash
npx @sentry/wizard@latest -i nextjs --saas --org dosta-corp --project potluckynew
```

### 2. Созданные файлы
- **instrumentation.js** - инициализация Sentry для сервера и Edge
- **instrumentation-client.js** - инициализация для клиента
- **next.config.mjs** - конфигурация Next.js с Sentry
- **.env.sentry-build-plugin** - auth token для source maps

### 3. Обновленные файлы
- **scripts/setup-sentry-env.sh** - обновлен с новым auth token
- **SENTRY_REAL_DATA.md** - обновлена документация

### 4. Новые возможности
- ✅ **Session Replay** - запись сессий пользователей
- ✅ **Performance Monitoring** - мониторинг производительности  
- ✅ **Logs** - отправка логов в Sentry
- ✅ **Tunnel Route** - обход блокировщиков через `/monitoring`
- ✅ **Source Maps** - автоматическая загрузка source maps
- ✅ **Error Tracking** - отслеживание ошибок с eventId

### 5. Тестирование
```bash
# Успешный build
pnpm --filter @potlucky/web build

# Запуск dev сервера
pnpm --filter @potlucky/web dev

# Тест отправки ошибки
curl -s "http://localhost:3000/api/ping?fail=1"
# Ответ: {"error": "ping_failed", "eventId": "ffbb0fd83b7948b4b2a809e898ecb5bc"}
```

## Sentry Dashboard
- **URL**: https://us.sentry.io/organizations/dosta-corp/projects/
- **Project**: potluckynew
- **Auth Token**: Обновлен через Sentry Wizard

## Следующие шаги
1. Проверить ошибки в Sentry Dashboard
2. Настроить алерты и уведомления
3. Настроить окружения (development, staging, production)
4. Добавить пользовательский контекст и теги

## Важные замечания
- ✅ Старые конфигурационные файлы (`sentry.*.config.ts`) удалены
- ✅ Используется современный подход с `instrumentation.js`
- ✅ Auth token автоматически добавлен в `.gitignore`
- ✅ Создана тестовая страница `/sentry-example-page` для проверки ошибок
- ✅ Удалены лишние файлы Sentry Wizard (папка `pages/`, старые конфигурации)

## Оставшиеся файлы Sentry

После очистки в проекте остались только необходимые файлы:

### Корень проекта:
- `.env.sentry-build-plugin` - auth token для source maps
- `scripts/setup-sentry-env.sh` - скрипт для экспорта переменных

### apps/web:
- `instrumentation.js` - инициализация Sentry для сервера/Edge
- `instrumentation-client.js` - инициализация для клиента
- `app/sentry-example-page/page.tsx` - тестовая страница

### Конфигурация:
- `next.config.mjs` - конфигурация Next.js с Sentry

## Тестовая страница

Создана страница `/sentry-example-page` с кнопками для тестирования:

- **Trigger JavaScript Error** - синхронная ошибка
- **Trigger Undefined Function Error** - вызов несуществующей функции
- **Trigger Async Error** - асинхронная ошибка
- **Send Manual Event** - отправка пользовательского сообщения

### Проверка работы

1. Откройте http://localhost:3000/sentry-example-page
2. Нажмите любую кнопку для тестирования ошибок
3. Проверьте Sentry Dashboard: https://us.sentry.io/organizations/dosta-corp/projects/
