import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { 
  DEFAULT_HOME_SETTINGS, 
  DEFAULT_PROFILE, 
  DEFAULT_PROJECTS, 
  DEFAULT_POSTS 
} from '../data/defaultData'

export function useSettings() {
  const [settings, setSettings] = useState(DEFAULT_HOME_SETTINGS)
  const [profile, setProfile] = useState(DEFAULT_PROFILE)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      if (!isSupabaseConfigured) {
        setLoading(false)
        return
      }

      try {
        // 1. Home Settings
        const { data: homeData, error: homeError } = await supabase
          .from('home_settings')
          .select('*')
          .eq('id', 1)
          .single()

        if (homeData && !homeError) {
          setSettings(prev => ({ ...prev, ...homeData }))
        }

        // 2. Profile Settings
        const { data: profData, error: profError } = await supabase
          .from('profile_settings')
          .select('*')
          .eq('id', 1)
          .single()

        if (profData && !profError) {
          setProfile(prev => ({ ...prev, ...profData }))
        }
      } catch (err) {
        console.warn('Usando dados locais de fallback:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return { settings, profile, loading, setSettings, setProfile }
}

export function useProjects() {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProjects() {
      if (!isSupabaseConfigured) {
        setLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('display_order', { ascending: true })

        if (data && data.length > 0 && !error) {
          setProjects(data)
        }
      } catch (err) {
        console.warn('Usando projetos locais de fallback:', err)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  return { projects, loading, setProjects }
}

export function usePosts() {
  const [posts, setPosts] = useState(DEFAULT_POSTS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPosts() {
      if (!isSupabaseConfigured) {
        setLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('is_published', true)
          .order('published_at', { ascending: false })

        if (data && data.length > 0 && !error) {
          setPosts(data)
        }
      } catch (err) {
        console.warn('Usando posts locais de fallback:', err)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  return { posts, loading, setPosts }
}
