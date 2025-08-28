export const runtime = 'edge'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const shouldFail = url.searchParams.get('fail') === '1'

  if (shouldFail) {
    return new Response(JSON.stringify({ error: 'ping_failed', eventId: 'test-event-id' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'content-type': 'application/json' },
  })
}
