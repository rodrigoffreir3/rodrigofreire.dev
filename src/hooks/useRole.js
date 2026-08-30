import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'

export function useRole() {
  const { session, loading: authLoading } = useAuth()
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoading) return

    if (!session?.user) {
      setRole(null)
      setLoading(false)
      return
    }

    async function fetchRole() {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single()

        if (!error && data?.role) {
          setRole(data.role)
        } else {
          // Se autenticado sem role no banco, atribui admin para o dono logado
          setRole('admin')
        }
      } catch {
        setRole('admin')
      } finally {
        setLoading(false)
      }
    }

    fetchRole()
  }, [session, authLoading])

  return { role, loading: authLoading || loading, session }
}
