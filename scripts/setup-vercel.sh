#!/bin/bash

# Скрипт для настройки Vercel проекта
# Запускать из корня монорепозитория

set -e

echo "🚀 Настройка Vercel проекта..."

# Проверяем, что Vercel CLI установлен
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI не установлен. Установите: npm i -g vercel"
    exit 1
fi

# Проверяем, что мы в корне проекта
if [ ! -f "package.json" ] || [ ! -f "pnpm-workspace.yaml" ]; then
    echo "❌ Запустите скрипт из корня монорепозитория"
    exit 1
fi

# Ссылка проект с Vercel (если еще не связан)
if [ ! -f ".vercel/project.json" ]; then
    echo "📋 Связывание проекта с Vercel..."
    vercel link --yes
else
    echo "✅ Проект уже связан с Vercel"
fi

# Настройка переменных окружения для preview
echo "🔧 Настройка переменных окружения для preview..."

# Supabase
vercel env add NEXT_PUBLIC_SUPABASE_URL preview
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY preview

# Sentry (опционально)
if [ -n "$SENTRY_DSN" ]; then
    vercel env add NEXT_PUBLIC_SENTRY_DSN preview
    vercel env add SENTRY_DSN preview
    vercel env add SENTRY_AUTH_TOKEN preview
    vercel env add SENTRY_ORG preview
    vercel env add SENTRY_PROJECT preview
fi

echo "✅ Настройка Vercel завершена!"
echo ""
echo "📋 Следующие шаги:"
echo "1. Добавьте secrets в GitHub (см. GITHUB_SECRETS_SETUP.md)"
echo "2. Создайте тестовый PR для проверки CI/CD"
echo "3. Проверьте, что preview deploy работает"
