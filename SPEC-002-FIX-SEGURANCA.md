# SPEC-002-FIX-SEGURANCA — Correção crítica de escalação de privilégio

**Status:** fechada, bloqueante. Não fazer deploy em produção com o estado
atual do banco enquanto este item não for corrigido — a falha já está
ativa em qualquer ambiente onde a migração 001 tenha sido aplicada.

---

## Item 1 (crítico, corrigir primeiro e sozinho) — Fechar a escalação de privilégio

### Correção no banco — nova migração

Criar `supabase/migrations/002_fix_rls_privilege_escalation.sql`:

```sql
-- Corrige políticas que davam escrita a qualquer autenticado, não só admin.
DROP POLICY IF EXISTS "Admin pode alterar home_settings" ON public.home_settings;
DROP POLICY IF EXISTS "Admin pode alterar profile_settings" ON public.profile_settings;
DROP POLICY IF EXISTS "Admin pode alterar projects" ON public.projects;
DROP POLICY IF EXISTS "Admin pode alterar posts" ON public.posts;
DROP POLICY IF EXISTS "Admin pode gerenciar perfis" ON public.profiles;

-- Função auxiliar: verifica se o usuário autenticado tem role admin ou editor.
CREATE OR REPLACE FUNCTION public.is_admin_or_editor()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('admin', 'editor')
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

CREATE POLICY "Admin/editor pode alterar home_settings" ON public.home_settings
  FOR ALL USING (public.is_admin_or_editor());
CREATE POLICY "Admin/editor pode alterar profile_settings" ON public.profile_settings
  FOR ALL USING (public.is_admin_or_editor());
CREATE POLICY "Admin/editor pode alterar projects" ON public.projects
  FOR ALL USING (public.is_admin_or_editor());
CREATE POLICY "Admin/editor pode alterar posts" ON public.posts
  FOR ALL USING (public.is_admin_or_editor());

-- Perfis: só o próprio admin gerencia (não qualquer autenticado).
CREATE POLICY "Admin gerencia perfis" ON public.profiles
  FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );

-- Gatilho: toda conta nova nasce como 'visitor', nunca sem linha em profiles.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'visitor');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Seu próprio usuário precisa ser promovido manualmente uma vez, depois de
-- rodar esta migração. Rodar manualmente no SQL Editor do Supabase,
-- substituindo pelo seu e-mail real de login:
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'SEU_EMAIL_AQUI';
```

**Não pular a linha final** (`UPDATE ... SET role = 'admin'`) — sem ela,
depois desta correção nem você mesmo consegue editar o site, porque o
gatilho registra todo mundo como `visitor` por padrão, inclusive você.

### Correção no frontend — `src/hooks/useRole.js`

Remover o fallback perigoso. Ausência de linha em `profiles` deixa de
significar admin e passa a significar `visitor` (fail closed, não fail
open):

```diff
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single()

        if (!error && data?.role) {
          setRole(data.role)
        } else {
-         // Se autenticado sem role no banco, atribui admin para o dono logado
-         setRole('admin')
+         // Fail closed: sem role definido, trata como visitante.
+         setRole('visitor')
        }
      } catch {
-       setRole('admin')
+       setRole('visitor')
      } finally {
        setLoading(false)
      }
```

### CA-1
1. Rodar a migração 002 e o `UPDATE` de promoção manual.
2. Criar uma segunda conta de teste (e-mail diferente do seu) via
   `supabase.auth.signUp()` no console do navegador.
3. Logar com essa conta de teste e confirmar que **não** consegue acessar
   `/adm` (`ProtectedRoute` redireciona pro login).
4. Com essa mesma conta de teste, tentar via console do navegador:
   `await supabase.from('posts').update({ title: 'hack' }).eq('id', 1)`
   — deve retornar erro de RLS, **não** deve alterar a linha.
5. Logar com sua conta real (promovida a admin) e confirmar que o painel
   `/adm` continua funcionando normalmente.

---

## Item 2 — Registrar a decisão de arquitetura que superou a SPEC-001

A SPEC-001 dizia explicitamente "manter Hugo, sem banco de dados". Essa
decisão foi conscientemente revertida (reaproveitamento da arquitetura do
projeto Kaminari), mas isso nunca foi registrado em lugar nenhum — quem
olhar a SPEC-001 hoje vai achar que ela ainda vale.

**Ação:** adicionar ao topo da SPEC-001 uma nota de superação:

```markdown
> **NOTA DE SUPERAÇÃO (adicionar data)**: a decisão de manter Hugo estático
> (seção 2.1) foi revertida. O site foi reconstruído em React + Vite +
> Supabase, reaproveitando a arquitetura do projeto Kaminari, por decisão
> explícita do Rodrigo. Ver SPEC-002-FIX-SEGURANCA para a correção de
> segurança que essa mudança exigiu.
```

## Item 3 (baixa prioridade) — Remover pastas mortas do Hugo

Apagar `layouts/`, `assets/`, `static/`, `content/`, `archetypes/`,
`themes/` do repositório, já que o site não usa mais Hugo. Fazer isso
**depois** do item 1 estar corrigido e validado — não misturar limpeza com
correção de segurança no mesmo commit.

---

## Definição de Pronto

- [ ] Migração 002 aplicada em produção
- [ ] Conta do Rodrigo promovida a `admin` manualmente
- [ ] `useRole.js` corrigido (fail closed)
- [ ] CA-1 confirmado com conta de teste de verdade, não só leitura de código
- [ ] SPEC-001 com nota de superação registrada
- [ ] Pastas mortas do Hugo removidas (após o item 1 validado)
