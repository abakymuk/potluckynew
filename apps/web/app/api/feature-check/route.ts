export const runtime = 'edge'

export async function GET() {
  try {
    // Простая проверка feature flag через переменную окружения
    const isOnlineOrderingEnabled = process.env.ONLINE_ORDERING_V1 === 'true'
    
    if (!isOnlineOrderingEnabled) {
      return new Response('Not Found', { status: 404 })
    }
    
    return new Response(JSON.stringify({ feature: 'ONLINE_ORDERING_V1', enabled: true }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  } catch {
    // Fallback if config is not available during build
    return new Response('Not Found', { status: 404 })
  }
}
