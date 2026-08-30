import { createClient } from '@supabase/supabase-js'

let supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
if (supabaseUrl.includes('=')) {
  supabaseUrl = supabaseUrl.split('=').pop().trim()
}
supabaseUrl = supabaseUrl.trim().replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '')

if (supabaseUrl && !supabaseUrl.startsWith('http://') && !supabaseUrl.startsWith('https://')) {
  supabaseUrl = `https://${supabaseUrl}`
}

let supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''
if (supabaseAnonKey.includes('=')) {
  supabaseAnonKey = supabaseAnonKey.split('=').pop().trim()
}
supabaseAnonKey = supabaseAnonKey.trim()

export const isSupabaseConfigured = 
  Boolean(supabaseUrl) && 
  Boolean(supabaseAnonKey) && 
  (supabaseUrl.startsWith('http://') || supabaseUrl.startsWith('https://')) &&
  !supabaseUrl.includes('placeholder-project') &&
  !supabaseAnonKey.includes('placeholder-anon-key')

const finalUrl = isSupabaseConfigured ? supabaseUrl : 'https://placeholder-project.supabase.co'
const finalKey = isSupabaseConfigured ? supabaseAnonKey : 'placeholder-anon-key'

export const supabase = createClient(finalUrl, finalKey)
