export const runtime = 'edge'

import * as Sentry from '@sentry/nextjs'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const shouldFail = url.searchParams.get('fail') === '1'

  if (shouldFail) {
    try {
      throw new Error('Ping failure (forced)')
    } catch (e) {
      const eventId = Sentry.captureException(e)
      return new Response(JSON.stringify({ error: 'ping_failed', eventId }), {
        status: 500,
        headers: { 'content-type': 'application/json' },
      })
    }
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'content-type': 'application/json' },
  })
}
