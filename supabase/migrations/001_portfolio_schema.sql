-- =============================================================================
-- RODRIGO FREIRE · PORTFOLIO & CMS SCHEMA (MIGRATION 001)
-- =============================================================================

-- 1. Tabela de Configurações de Estilo da Home (Multi-layer Canvas, Glassmorphism, Cores)
CREATE TABLE IF NOT EXISTS public.home_settings (
    id SERIAL PRIMARY KEY,
    -- Camada 1: Background Base
    bg_image_url TEXT DEFAULT '',
    bg_image_size TEXT DEFAULT 'cover', -- 'cover', 'contain', '400px', 'auto'
    bg_image_repeat TEXT DEFAULT 'no-repeat', -- 'no-repeat', 'repeat', 'repeat-x', 'repeat-y'
    overlay_color TEXT DEFAULT 'rgba(9, 13, 22, 0.75)', -- cor com opacidade
    
    -- Camada 2: Elemento Decorativo Flutuante (PNGs, Nuvens, Stickers)
    hero_char_url TEXT DEFAULT '',
    hero_char_position TEXT DEFAULT 'bottom-right', -- 'bottom-right', 'bottom-left', 'center-bottom', 'top-right', 'top-left'
    hero_char_size TEXT DEFAULT '380px',
    hero_char_opacity NUMERIC(3,2) DEFAULT 1.0,
    hero_char_z_index INT DEFAULT 1,
    
    -- Camada 2B: Elemento Decorativo Secundário (ex: nuvens inferiores)
    secondary_bg_url TEXT DEFAULT '',
    secondary_bg_position TEXT DEFAULT 'bottom-center',
    secondary_bg_size TEXT DEFAULT '100%',
    secondary_bg_opacity NUMERIC(3,2) DEFAULT 0.9,
    
    -- Camada 3: Controle do Container Central de Conteúdo
    content_has_border BOOLEAN DEFAULT TRUE,
    content_border_color TEXT DEFAULT 'rgba(255, 255, 255, 0.12)',
    content_bg_color TEXT DEFAULT 'rgba(17, 24, 39, 0.62)',
    content_blur_level INT DEFAULT 20, -- em pixels (0 a 40)
    content_border_radius TEXT DEFAULT '24px',
    
    -- Cores Globais & Acentos
    primary_color TEXT DEFAULT 'rgba(37, 99, 235, 1)',
    accent_color TEXT DEFAULT 'rgba(96, 165, 250, 1)',
    text_heading_color TEXT DEFAULT 'rgba(248, 250, 252, 1)',
    text_body_color TEXT DEFAULT 'rgba(148, 163, 184, 1)',
    
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Inserir registro inicial da home_settings se não existir
INSERT INTO public.home_settings (
    id, bg_image_url, bg_image_size, bg_image_repeat, overlay_color,
    hero_char_url, hero_char_position, hero_char_size,
    content_has_border, content_border_color, content_bg_color, content_blur_level,
    primary_color, accent_color
) VALUES (
    1, '', 'cover', 'no-repeat', 'rgba(9, 13, 22, 0.75)',
    '', 'bottom-right', '380px',
    TRUE, 'rgba(255, 255, 255, 0.12)', 'rgba(17, 24, 39, 0.62)', 20,
    'rgba(37, 99, 235, 1)', 'rgba(96, 165, 250, 1)'
) ON CONFLICT (id) DO NOTHING;

-- 2. Tabela de Perfil / Informações do Rodrigo
CREATE TABLE IF NOT EXISTS public.profile_settings (
    id SERIAL PRIMARY KEY,
    full_name TEXT DEFAULT 'Rodrigo Freire',
    tagline TEXT DEFAULT 'Engenharia de software, inteligência artificial e plataformas de alto desempenho.',
    lead_bio TEXT DEFAULT 'Ajudo empresas e empreendedores a transformar requisitos complexos em plataformas web modernas, automações com IA, aplicativos e infraestruturas seguras e escaláveis.',
    about_text TEXT DEFAULT 'Sou desenvolvedor de software e pesquisador com atuação em plataformas web modernas, inteligência artificial aplicada e sistemas de baixo nível no kernel do Linux. Minha abordagem de trabalho une rigor técnico de engenharia com foco direto no resultado de negócio.',
    whatsapp_number TEXT DEFAULT '5569992782919',
    inpi_record TEXT DEFAULT 'INPI Nº 512025006506-0',
    avatar_url TEXT DEFAULT '',
    email TEXT DEFAULT 'contato@rodrigofreire.dev',
    github_url TEXT DEFAULT 'https://github.com/rodrigoffreir3',
    linkedin_url TEXT DEFAULT '',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

INSERT INTO public.profile_settings (id, full_name, tagline, whatsapp_number)
VALUES (1, 'Rodrigo Freire', 'Engenharia de software, inteligência artificial e plataformas de alto desempenho.', '5569992782919')
ON CONFLICT (id) DO NOTHING;

-- 3. Tabela de Projetos (Cases de Engenharia)
CREATE TABLE IF NOT EXISTS public.projects (
    id SERIAL PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    badge TEXT DEFAULT 'Case Study · Deep Tech',
    summary TEXT NOT NULL,
    problem_description TEXT DEFAULT '',
    technical_details TEXT DEFAULT '',
    cover_image TEXT DEFAULT '',
    hero_image TEXT DEFAULT '',
    gallery JSONB DEFAULT '[]'::jsonb,
    tags TEXT[] DEFAULT '{}',
    github_url TEXT DEFAULT '',
    live_url TEXT DEFAULT '',
    is_featured BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Tabela de Artigos do Blog
CREATE TABLE IF NOT EXISTS public.posts (
    id SERIAL PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    content_markdown TEXT NOT NULL,
    cover_image TEXT DEFAULT '',
    tags TEXT[] DEFAULT '{}',
    published_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Tabela de Perfis de Usuários (para Controle de Roles no CMS)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    role TEXT DEFAULT 'visitor' CHECK (role IN ('admin', 'editor', 'visitor')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Habilitar Row Level Security (RLS)
ALTER TABLE public.home_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Políticas de Leitura Pública
CREATE POLICY "Leitura pública de home_settings" ON public.home_settings FOR SELECT USING (true);
CREATE POLICY "Leitura pública de profile_settings" ON public.profile_settings FOR SELECT USING (true);
CREATE POLICY "Leitura pública de projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Leitura pública de posts publicados" ON public.posts FOR SELECT USING (is_published = true OR auth.role() = 'authenticated');
CREATE POLICY "Usuário pode ver seu próprio perfil" ON public.profiles FOR SELECT USING (auth.uid() = id);

-- Políticas de Modificação Apenas para Administradores Autenticados
CREATE POLICY "Admin pode alterar home_settings" ON public.home_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin pode alterar profile_settings" ON public.profile_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin pode alterar projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin pode alterar posts" ON public.posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin pode gerenciar perfis" ON public.profiles FOR ALL USING (auth.role() = 'authenticated');
