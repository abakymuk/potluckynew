#!/bin/bash

echo "🔧 Настройка переменных Sentry для Potlucky"
echo "============================================"
echo ""

# Экспортируем переменные Sentry
export SENTRY_DSN="https://02713f753f9d4facd8fd7d7500f5874a@o4509919839387648.ingest.us.sentry.io/4509919845285888"
export SENTRY_AUTH_TOKEN="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"
export SENTRY_ORG="dosta-corp"
export SENTRY_PROJECT="4509919845285888"
export NEXT_PUBLIC_SENTRY_DSN="https://02713f753f9d4facd8fd7d7500f5874a@o4509919839387648.ingest.us.sentry.io/4509919845285888"

echo "✅ Переменные Sentry экспортированы:"
echo "   SENTRY_DSN: ${SENTRY_DSN}"
echo "   SENTRY_ORG: ${SENTRY_ORG}"
echo "   SENTRY_PROJECT: ${SENTRY_PROJECT}"
echo "   NEXT_PUBLIC_SENTRY_DSN: ${NEXT_PUBLIC_SENTRY_DSN}"
echo ""

echo "🚀 Теперь запустите:"
echo "   pnpm --filter @potlucky/web dev"
echo ""
echo "🧪 Протестируйте отправку ошибки:"
echo "   curl -s 'http://localhost:3000/api/ping?fail=1'"
echo ""
echo "📊 Проверьте ошибки в Sentry Dashboard:"
echo "   https://us.sentry.io/organizations/dosta-corp/projects/"
echo ""
echo "💡 Для постоянной настройки создайте файл apps/web/.env.local с этими переменными"
