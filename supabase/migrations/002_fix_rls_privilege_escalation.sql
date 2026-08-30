-- =============================================================================
-- SPEC-002-FIX-SEGURANCA: Correção de RLS e Escalação de Privilégio (Migration 002)
-- =============================================================================

-- 1. Corrige políticas que davam escrita a qualquer autenticado, não só admin.
DROP POLICY IF EXISTS "Admin pode alterar home_settings" ON public.home_settings;
DROP POLICY IF EXISTS "Admin pode alterar profile_settings" ON public.profile_settings;
DROP POLICY IF EXISTS "Admin pode alterar projects" ON public.projects;
DROP POLICY IF EXISTS "Admin pode alterar posts" ON public.posts;
DROP POLICY IF EXISTS "Admin pode gerenciar perfis" ON public.profiles;
DROP POLICY IF EXISTS "Admin gerencia perfis" ON public.profiles;
DROP POLICY IF EXISTS "Usuário pode ver seu próprio perfil" ON public.profiles;
DROP POLICY IF EXISTS "Usuário lê seu próprio perfil" ON public.profiles;
DROP POLICY IF EXISTS "Admin/editor pode alterar home_settings" ON public.home_settings;
DROP POLICY IF EXISTS "Admin/editor pode alterar profile_settings" ON public.profile_settings;
DROP POLICY IF EXISTS "Admin/editor pode alterar projects" ON public.projects;
DROP POLICY IF EXISTS "Admin/editor pode alterar posts" ON public.posts;
DROP POLICY IF EXISTS "Admin pode gerenciar todos os perfis" ON public.profiles;

-- 2. Funções auxiliares SECURITY DEFINER (rodam como superuser para evitar recursão infinita no RLS)
CREATE OR REPLACE FUNCTION public.is_admin_or_editor()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('admin', 'editor')
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- 3. Aplica políticas restritas a tabelas de conteúdo
CREATE POLICY "Admin/editor pode alterar home_settings" ON public.home_settings
  FOR ALL USING (public.is_admin_or_editor());

CREATE POLICY "Admin/editor pode alterar profile_settings" ON public.profile_settings
  FOR ALL USING (public.is_admin_or_editor());

CREATE POLICY "Admin/editor pode alterar projects" ON public.projects
  FOR ALL USING (public.is_admin_or_editor());

CREATE POLICY "Admin/editor pode alterar posts" ON public.posts
  FOR ALL USING (public.is_admin_or_editor());

-- 4. Políticas na tabela PROFILES (Sem recursão infinita)
-- Qualquer usuário autenticado pode ler SEU PRÓPRIO perfil
CREATE POLICY "Usuário lê seu próprio perfil" ON public.profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

-- Apenas o administrador pode inserir, atualizar ou excluir perfis
CREATE POLICY "Admin pode gerenciar todos os perfis" ON public.profiles
  FOR ALL TO authenticated
  USING (public.is_admin());

-- 5. Gatilho: toda conta nova nasce como 'visitor', nunca sem linha em profiles.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'visitor')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Sincroniza usuários existentes
INSERT INTO public.profiles (id, email, role)
SELECT id, email, 'visitor' FROM auth.users
ON CONFLICT (id) DO NOTHING;
