import { withSentryConfig } from '@sentry/nextjs'
import type { NextConfig } from 'next'

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  experimental: { staleTimes: { dynamic: 0 } },
  /* config options here */
}

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  // автоматическая загрузка sourcemaps во время next build
  silent: true,
  widenClientFileUpload: true,
})
