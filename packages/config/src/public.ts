import { PublicEnvSchema } from './schema'
import type { FeatureFlags } from './flags'

/**
 * Функция для валидации public env
 */
export const validatePublicEnv = () => {
  const parsed = PublicEnvSchema.safeParse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    ONLINE_ORDERING_V1: process.env.ONLINE_ORDERING_V1,
    ORDER_QUEUE_V1: process.env.ORDER_QUEUE_V1,
    AI_ADVISOR_V1: process.env.AI_ADVISOR_V1,
  })

  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')
    throw new Error(
      `[config] Public env validation failed: ${issues}. ` +
        `Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.`,
    )
  }

  return parsed.data
}

/**
 * Next.js встраивает process.env.* на этапе сборки.
 * В edge/runtime это тоже работает, но ПРИ УСЛОВИИ, что переменные помечены корректно.
 * Здесь валидируем public env единожды при инициализации модуля.
 */
const envPublic = validatePublicEnv()

export { envPublic }

export const flags: FeatureFlags = {
  ONLINE_ORDERING_V1: !!envPublic.ONLINE_ORDERING_V1,
  ORDER_QUEUE_V1: !!envPublic.ORDER_QUEUE_V1,
  AI_ADVISOR_V1: !!envPublic.AI_ADVISOR_V1,
}

/** Простой флаг-чекер. Позже добавим стратегии per-tenant/user. */
export const isEnabled = (flag: keyof typeof flags) => !!flags[flag]

/** Helper для получения Sentry DSN */
export const getSentryDsn = () => envPublic.NEXT_PUBLIC_SENTRY_DSN ?? process.env.SENTRY_DSN ?? ''
