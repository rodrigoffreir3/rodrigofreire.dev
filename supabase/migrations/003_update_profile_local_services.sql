-- =============================================================================
-- SPEC-SITE-003: Atualização do Perfil para Serviços de TI Autônomos (Migration 003)
-- Atualiza a linha id=1 da tabela profile_settings com o novo posicionamento de Porto Velho
-- =============================================================================

UPDATE public.profile_settings
SET 
  full_name = 'Rodrigo Freire',
  tagline = 'Serviços de TI e Informática · Porto Velho',
  lead_bio = 'Seu sistema travou, o computador do caixa não liga ou aquele problema que ninguém resolve virou rotina? Eu atendo aqui em Porto Velho, direto com você, sem call center e sem enrolação.',
  about_text = 'Sou profissional de tecnologia em Porto Velho, formado em Direito e cursando Análise e Desenvolvimento de Sistemas. Presto serviços de informática, computadores e internet direto com você, sem conversa difícil e com foco em deixar seu comércio funcionando.',
  avatar_url = '/foto_perfil.jpeg',
  inpi_record = 'Registro INPI Nº 512025006506-0',
  whatsapp_number = '5569992782919',
  updated_at = NOW()
WHERE id = 1;
