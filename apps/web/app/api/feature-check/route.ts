export const runtime = 'edge'
import { isEnabled } from '@potlucky/config'

export async function GET() {
  if (!isEnabled('ONLINE_ORDERING_V1')) {
    return new Response('Not Found', { status: 404 })
  }
  return new Response(JSON.stringify({ feature: 'ONLINE_ORDERING_V1', enabled: true }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  })
}
