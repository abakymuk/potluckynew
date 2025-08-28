import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  { auth: { persistSession: false } },
)

const { data, error } = await supabase.auth.signInWithPassword({
  email: 'alice@example.com',
  password: 'Passw0rd!',
})

if (error) {
  console.error('Error:', error.message)
  process.exit(1)
}

console.log(data.session.access_token)
