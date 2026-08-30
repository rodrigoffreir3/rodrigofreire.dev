import { createClient } from '@supabase/supabase-js'

let supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
if (supabaseUrl.includes('=')) {
  supabaseUrl = supabaseUrl.split('=').pop().trim()
}
if (!supabaseUrl.startsWith('http://') && !supabaseUrl.startsWith('https://')) {
  supabaseUrl = 'https://placeholder-project.supabase.co'
}

let supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''
if (supabaseAnonKey.includes('=')) {
  supabaseAnonKey = supabaseAnonKey.split('=').pop().trim()
}
if (!supabaseAnonKey) {
  supabaseAnonKey = 'placeholder-anon-key'
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
