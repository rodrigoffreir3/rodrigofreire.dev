import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Cpu, 
  Layers, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  MessageSquare, 
  Laptop, 
  Code2, 
  Bot, 
  GraduationCap, 
  Compass, 
  Radio, 
  MonitorCheck, 
  Award,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import SEO from '../components/SEO';
import { DEFAULT_PROFILE } from '../data/defaultData';

export default function ArtifexLabs({ profile }) {
  const currentProfile = profile || DEFAULT_PROFILE;
  const phone = (currentProfile?.whatsapp_number ? String(currentProfile.whatsapp_number).replace(/\D/g, '') : '') || '5569992782919';
  
  const whatsappDemoUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    'Olá Rodrigo! Vi a apresentação do Artifex Labs no seu site e gostaria de agendar uma aula demonstrativa presencial de 45 minutos no laboratório do nosso colégio aqui em Porto Velho.'
  )}`;

  const whatsappGeneralUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    'Olá Rodrigo! Sou coordenador/diretor pedagógico em Porto Velho e gostaria de tirar dúvidas sobre o Artifex Labs para a nossa escola.'
  )}`;

  const courseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    'name': 'Programa de Robótica Educacional & Physical AI com Artifex Labs',
    'description': 'Plataforma pedagógica e currículo de robótica educacional e inteligência artificial física para colégios de Porto Velho, RO. Simulação física no navegador, programação em blocos e Python real, e Digital Twin com placas ESP32.',
    'provider': {
      '@type': 'Person',
      'name': 'Rodrigo Freire',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Porto Velho',
        'addressRegion': 'RO',
        'addressCountry': 'BR'
      }
    }
  };

  const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'Artifex Labs',
    'description': 'Plataforma de robótica educacional, simulação física 2D e Digital Twin bidirecional a 20Hz executada 100% no navegador via WebAssembly.',
    'applicationCategory': 'EducationalApplication',
    'operatingSystem': 'Web, Windows, Linux, macOS',
    'author': {
      '@type': 'Person',
      'name': 'Rodrigo Freire'
    }
  };

  return (
    <div className="portfolio-container" style={{ maxWidth: '1040px', margin: '0 auto', padding: '2.5rem 1.5rem 6rem' }}>
      <SEO
        title="Artifex Labs · Robótica Educacional & Physical AI com Rodrigo Freire em Porto Velho"
        description="Plataforma de robótica educacional e Digital Twin sem custos abusivos de kits. 100% no navegador, da lógica visual ao Python real com ESP32 para colégios de Porto Velho, RO."
        canonicalPath="/artifex-labs"
        jsonLd={[courseJsonLd, softwareJsonLd]}
      />

      {/* NAVEGAÇÃO DE RETORNO */}
      <div style={{ marginBottom: '1.75rem' }}>
        <Link to="/projetos" className="back-link-corp">
          <ArrowLeft size={16} /> Voltar para projetos
        </Link>
      </div>

      {/* ============================================================
          1. HERO INSTITUCIONAL PARA ESCOLAS DE PORTO VELHO
          ============================================================ */}
      <header style={{ marginBottom: '3.5rem' }}>
        <div className="section-tag-pill" style={{ marginBottom: '1.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
          <Sparkles size={13} color="#3533cd" />
          <span>Robótica Educacional & Physical AI · Porto Velho, RO</span>
        </div>

        <h1 style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', 
          fontWeight: '400', 
          lineHeight: '1.12', 
          letterSpacing: '-0.02em', 
          marginBottom: '1.5rem', 
          color: 'var(--color-brand-ink)' 
        }}>
          A plataforma de robótica e inteligência física que o seu colégio pode adotar amanhã.
        </h1>

        <p style={{ 
          fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', 
          color: 'var(--text-body)', 
          lineHeight: '1.65', 
          marginBottom: '2rem',
          maxWidth: '880px'
        }}>
          Sem a armadilha de kits comerciais de R$ 5.000 que quebram na primeira semana e ficam trancados no armário. 
          Sem instalar softwares pesados nos computadores da escola. O <strong>Artifex Labs</strong> leva o laboratório inteiro 
          para o navegador: da lógica visual introdutória até o <strong>Python profissional</strong> conectado a microcontroladores 
          reais ESP32 por <em>Gêmeo Digital (Digital Twin)</em>.
        </p>

        {/* CHIPS DE VALIDAÇÃO IMEDIATA */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', marginBottom: '2.5rem' }}>
          {[
            '100% no navegador (WebAssembly)',
            'Zero peças queimadas (Sim-to-Real)',
            'Da Folha de Eventos ao Python real',
            'Digital Twin com ESP32 a 20Hz',
            'Alinhado às competências da BNCC',
            'Professor e criador residente em Porto Velho'
          ].map((chip, idx) => (
            <span key={idx} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.35rem 0.85rem',
              borderRadius: '999px',
              fontSize: '0.85rem',
              fontWeight: '500',
              background: 'var(--surface-level-1-bg)',
              border: '1px solid var(--surface-level-1-border)',
              color: 'var(--text-body)'
            }}>
              <CheckCircle2 size={13} color="#3533cd" /> {chip}
            </span>
          ))}
        </div>

        {/* BOTÕES DE AÇÃO PRINCIPAL */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          <a
            href={whatsappDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="corp-btn-accent"
            style={{ fontSize: '1rem', padding: '0.85rem 1.85rem' }}
          >
            <MessageSquare size={18} />
            Agendar aula demonstrativa gratuita no seu colégio
          </a>

          <a
            href="#diferenciais"
            className="corp-btn-outline-glass"
            style={{ fontSize: '0.95rem' }}
          >
            Ver diferenciais e grade pedagógica
          </a>
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
          * Demonstração prática presencial de 45 minutos no laboratório de informática do seu colégio em Porto Velho, sem custo ou compromisso.
        </p>
      </header>

      {/* ============================================================
          2. O PROBLEMA REAL DO ENSINO DE ROBÓTICA NAS ESCOLAS
          ============================================================ */}
      <section style={{ marginBottom: '5rem' }}>
        <div className="section-head-center" style={{ textAlign: 'left', marginBottom: '2rem' }}>
          <span className="corp-badge" style={{ marginBottom: '0.75rem' }}>O Cenário Atual</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: 'var(--color-brand-ink)', marginBottom: '0.75rem' }}>
            Por que a robótica tradicional costuma frustrar escolas, pais e alunos?
          </h2>
          <p style={{ color: 'var(--text-body)', lineHeight: '1.6', maxWidth: '800px' }}>
            A maior parte das escolas particulares e programas extracurriculares em Porto Velho tenta implantar robótica com modelos importados que geram três gargalos imediatos:
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div style={{
            background: 'var(--surface-level-1-bg)',
            border: '1px solid var(--surface-level-1-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1.75rem',
            boxShadow: 'var(--surface-level-1-shadow)'
          }}>
            <div style={{ color: '#dc2626', marginBottom: '1rem' }}>
              <XCircle size={28} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--color-brand-ink)', marginBottom: '0.65rem' }}>
              Kits caríssimos e peças que quebram
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: '1.6' }}>
              Kits de marcas famosas custam milhares de reais por bancada. Quando um sensor queima por inversão de polaridade ou uma engrenagem quebra, a bancada fica inutilizada pelo resto do semestre. A escola gasta fortunas com reposição ou engaveta o projeto.
            </p>
          </div>

          <div style={{
            background: 'var(--surface-level-1-bg)',
            border: '1px solid var(--surface-level-1-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1.75rem',
            boxShadow: 'var(--surface-level-1-shadow)'
          }}>
            <div style={{ color: '#dc2626', marginBottom: '1rem' }}>
              <XCircle size={28} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--color-brand-ink)', marginBottom: '0.65rem' }}>
              Bloqueios da TI da escola
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: '1.6' }}>
              Softwares de robótica tradicionais exigem instalação de drivers USB, IDEs pesadas de mais de 2GB e permissões de administrador que a equipe de TI da escola raramente libera. O resultado são aulas interrompidas por telas de erro e máquinas lentas.
            </p>
          </div>

          <div style={{
            background: 'var(--surface-level-1-bg)',
            border: '1px solid var(--surface-level-1-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1.75rem',
            boxShadow: 'var(--surface-level-1-shadow)'
          }}>
            <div style={{ color: '#dc2626', marginBottom: '1rem' }}>
              <XCircle size={28} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--color-brand-ink)', marginBottom: '0.65rem' }}>
              Pedagogia infantilizada que não prepara
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: '1.6' }}>
              Muitos programas prendem alunos do 7º ao 9º ano em quebra-cabeças visuais que parecem joguinhos infantis. O aluno perde o interesse porque não vê relação com a programação real usada em vestibulares, inteligência artificial e no mercado de engenharia.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          3. TABELA COMPARATIVA DIRETA: ARTIFEX LABS VS. OUTROS
          ============================================================ */}
      <section id="diferenciais" style={{ marginBottom: '5.5rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span className="corp-badge" style={{ marginBottom: '0.75rem' }}>Comparativo Rigoroso</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: 'var(--color-brand-ink)', marginBottom: '0.75rem' }}>
            Artifex Labs vs. Modelos Tradicionais de Robótica Escolar
          </h2>
          <p style={{ color: 'var(--text-body)', lineHeight: '1.6' }}>
            Compare lado a lado o que a sua instituição ganha em economia, robustez e resultado de aprendizado:
          </p>
        </div>

        <div style={{ 
          background: 'var(--surface-level-1-bg)', 
          border: '1px solid var(--surface-level-1-border)', 
          borderRadius: 'var(--radius-md)', 
          overflowX: 'auto',
          boxShadow: 'var(--surface-level-1-shadow)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '650px', fontSize: '0.92rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--surface-level-1-border)', background: 'var(--bg-page-subtle)' }}>
                <th style={{ padding: '1.1rem 1.25rem', fontWeight: '700', color: 'var(--color-brand-ink)', width: '25%' }}>Critério</th>
                <th style={{ padding: '1.1rem 1.25rem', fontWeight: '700', color: '#dc2626', width: '37.5%' }}>Kits Importados & Franquias</th>
                <th style={{ padding: '1.1rem 1.25rem', fontWeight: '700', color: 'var(--color-brand-blue)', width: '37.5%', background: 'rgba(53, 51, 205, 0.05)' }}>Artifex Labs (Rodrigo Freire)</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  criterio: 'Custo inicial por bancada',
                  tradicional: 'R$ 3.000 a R$ 6.000 por kit + reposição contínua.',
                  artifex: 'Zero custo de licença proprietária. Placas físicas acessíveis (ESP32 de R$ 35).'
                },
                {
                  criterio: 'Requisitos de computador',
                  tradicional: 'IDEs pesadas, drivers proprietários e permissão de admin.',
                  artifex: 'Roda 100% no navegador (Chrome/Edge/Firefox), sem instalar nada.'
                },
                {
                  criterio: 'Risco de quebra de componentes',
                  tradicional: 'Alto. Erro de fiação queima componentes e paralisa a aula.',
                  artifex: 'Zero. O aluno simula tudo com física real antes de tocar no hardware.'
                },
                {
                  criterio: 'Linguagem de programação',
                  tradicional: 'Geralmente blocos proprietários fechados ou C++ prolixo.',
                  artifex: 'Dual: Folha de Eventos lógica + Python profissional com Monaco Editor.'
                },
                {
                  criterio: 'Fidelidade física do simulador',
                  tradicional: 'Animações estáticas pré-programadas ou sem inércia.',
                  artifex: 'Motor de física 2D real (Matter.js) e Raycasting de sonar HC-SR04.'
                },
                {
                  criterio: 'Conexão Sim-to-Real',
                  tradicional: 'Desconexão entre o desenho na tela e a placa de bancada.',
                  artifex: 'Digital Twin bidirecional a 20Hz: o sensor físico reflete na tela em tempo real.'
                },
                {
                  criterio: 'Suporte & Docência',
                  tradicional: 'Instrutor de franquia que apenas segue a apostila.',
                  artifex: 'O próprio criador da ferramenta ministra as aulas e resolve qualquer adaptação presencialmente.'
                }
              ].map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--surface-level-1-border)' }}>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: '600', color: 'var(--color-brand-ink)' }}>{row.criterio}</td>
                  <td style={{ padding: '1rem 1.25rem', color: '#4b5563' }}>{row.tradicional}</td>
                  <td style={{ padding: '1rem 1.25rem', color: 'var(--color-brand-ink)', fontWeight: '500', background: 'rgba(53, 51, 205, 0.02)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem' }}>
                      <CheckCircle2 size={16} color="#3533cd" style={{ shrink: 0, marginTop: '2px' }} />
                      <span>{row.artifex}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ============================================================
          4. OS 4 PILARES DA PLATAFORMA ARTIFEX LABS
          ============================================================ */}
      <section style={{ marginBottom: '5.5rem' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <span className="corp-badge" style={{ marginBottom: '0.75rem' }}>Engenharia & Pedagogia</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: 'var(--color-brand-ink)', marginBottom: '0.75rem' }}>
            Como a tecnologia do Artifex Labs funciona em sala de aula
          </h2>
          <p style={{ color: 'var(--text-body)', lineHeight: '1.6', maxWidth: '820px' }}>
            Construído sobre padrões abertos de alta performance (WebAssembly, MicroPython, Matter.js e WebSockets), o Artifex Labs resolve a transição perfeita entre o pensamento lógico e o robô físico:
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '1.75rem' }}>
          
          {/* PILAR 1 */}
          <div style={{
            background: 'var(--surface-level-1-bg)',
            border: '1px solid var(--surface-level-1-border)',
            borderRadius: 'var(--radius-md)',
            padding: '2rem',
            boxShadow: 'var(--surface-level-1-shadow)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ 
              width: '44px', 
              height: '44px', 
              borderRadius: '10px', 
              background: 'rgba(53, 51, 205, 0.08)', 
              color: '#3533cd', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              marginBottom: '1.25rem' 
            }}>
              <Compass size={22} />
            </div>
            <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#3533cd', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
              Pilar 01 · Simulação Fiel
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-brand-ink)', marginBottom: '0.75rem' }}>
              Física 2D Real e Sensores de Sonar Calibrados
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: '1.65', flex: 1 }}>
              O robô virtual não se move por animações falsas: ele opera sobre um motor de física com cálculo de massa, atrito, inércia e colisão. O sensor ultrassônico HC-SR04 projeta feixes de raycasting que calculam a distância exata em centímetros até a parede da arena, ensinando geometria e física aplicada na prática.
            </p>
          </div>

          {/* PILAR 2 */}
          <div style={{
            background: 'var(--surface-level-1-bg)',
            border: '1px solid var(--surface-level-1-border)',
            borderRadius: 'var(--radius-md)',
            padding: '2rem',
            boxShadow: 'var(--surface-level-1-shadow)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ 
              width: '44px', 
              height: '44px', 
              borderRadius: '10px', 
              background: 'rgba(53, 51, 205, 0.08)', 
              color: '#3533cd', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              marginBottom: '1.25rem' 
            }}>
              <Code2 size={22} />
            </div>
            <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#3533cd', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
              Pilar 02 · Progressão Cognitiva
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-brand-ink)', marginBottom: '0.75rem' }}>
              Programação Dupla: Da Folha de Eventos ao Python Real
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: '1.65', flex: 1 }}>
              O aluno dos anos iniciais programa através de uma <em>Folha de Eventos</em> visual (estilo Construct 3), aprendendo condições (se obstáculo &lt; 20cm) e ações (gire motores a 180°). Com um clique, ele pode ver o código correspondente em <strong>Python puro</strong> no Editor Monaco, aprendendo sintaxe profissional no seu próprio ritmo.
            </p>
          </div>

          {/* PILAR 3 */}
          <div style={{
            background: 'var(--surface-level-1-bg)',
            border: '1px solid var(--surface-level-1-border)',
            borderRadius: 'var(--radius-md)',
            padding: '2rem',
            boxShadow: 'var(--surface-level-1-shadow)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ 
              width: '44px', 
              height: '44px', 
              borderRadius: '10px', 
              background: 'rgba(53, 51, 205, 0.08)', 
              color: '#3533cd', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              marginBottom: '1.25rem' 
            }}>
              <Radio size={22} />
            </div>
            <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#3533cd', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
              Pilar 03 · Hardware Real
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-brand-ink)', marginBottom: '0.75rem' }}>
              Digital Twin Bidirecional a 20Hz & Consciência de Estado
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: '1.65', flex: 1 }}>
              A plataforma se conecta via USB à placa microcontroladora ESP32 física. Quando o aluno aproxima a mão do sensor real na bancada, o robô na tela reage instantaneamente. O motor conta com classificador de estado físico (SPEC-022) que registra transições (IDLE, MOVING, UNKNOWN) e ensina telemetria industrial de ponta.
            </p>
          </div>

          {/* PILAR 4 */}
          <div style={{
            background: 'var(--surface-level-1-bg)',
            border: '1px solid var(--surface-level-1-border)',
            borderRadius: 'var(--radius-md)',
            padding: '2rem',
            boxShadow: 'var(--surface-level-1-shadow)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ 
              width: '44px', 
              height: '44px', 
              borderRadius: '10px', 
              background: 'rgba(53, 51, 205, 0.08)', 
              color: '#3533cd', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              marginBottom: '1.25rem' 
            }}>
              <ShieldCheck size={22} />
            </div>
            <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#3533cd', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
              Pilar 04 · Robustez de Sala
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-brand-ink)', marginBottom: '0.75rem' }}>
              Sandbox em WebAssembly com AST Guard
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: '1.65', flex: 1 }}>
              O Python executa no computador do aluno através de WebAssembly (Pyodide WASM), sem enviar dados para a nuvem. Caso o aluno cometa um erro clássico de novato — como um laço infinito <code>while True: pass</code> —, o módulo <strong>AST Guard</strong> intercepta a árvore de código e impede o travamento da máquina escolar.
            </p>
          </div>

        </div>
      </section>

      {/* ============================================================
          5. GRADE PEDAGÓGICA PRONTA (ALINHADA À BNCC)
          ============================================================ */}
      <section id="grade-pedagogica" style={{ marginBottom: '5.5rem' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <span className="corp-badge" style={{ marginBottom: '0.75rem' }}>Planejamento Escolar Anual</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: 'var(--color-brand-ink)', marginBottom: '0.75rem' }}>
            Grade Curricular Alinhada à Base Nacional Comum Curricular (BNCC)
          </h2>
          <p style={{ color: 'var(--text-body)', lineHeight: '1.6', maxWidth: '850px' }}>
            O programa atende integralmente às <strong>Competências Gerais 4, 5 e 7 da BNCC</strong> (Pensamento Científico, Crítico e Criativo; Cultura Digital; e Argumentação com base em fatos e dados), dividido em trilhas adaptáveis para a realidade do seu colégio:
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          
          {/* TRILHA FUNDAMENTAL II */}
          <div style={{
            background: 'var(--surface-level-1-bg)',
            border: '1px solid var(--surface-level-1-border)',
            borderRadius: 'var(--radius-md)',
            padding: '2.2rem',
            boxShadow: 'var(--surface-level-1-shadow)'
          }}>
            <div style={{ display: 'inline-block', padding: '0.35rem 0.85rem', borderRadius: '6px', background: 'var(--bg-page-subtle)', fontWeight: '700', fontSize: '0.85rem', color: 'var(--color-brand-ink)', marginBottom: '1.25rem' }}>
              Ensino Fundamental II · 6º ao 9º Ano
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--color-brand-ink)', marginBottom: '1rem' }}>
              Trilha de Alfabetização Lógica & Robôs Autônomos
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Foco no desenvolvimento do pensamento computacional, decomposição de problemas e conceitos fundamentais de física e matemática aplicadas:
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                {
                  bim: '1º Bimestre',
                  desc: 'Fundamentos de Sensores e Atuadores: como o computador enxerga o mundo físico (analógico vs. digital).'
                },
                {
                  bim: '2º Bimestre',
                  desc: 'Lógica com a Folha de Eventos: criação do primeiro robô virtual com desvio automático de obstáculos em arena 2D.'
                },
                {
                  bim: '3º Bimestre',
                  desc: 'Robôs Móveis e Cinemática: controle de velocidade proporcional PWM e algoritmo de robô seguidor de linha.'
                },
                {
                  bim: '4º Bimestre',
                  desc: 'Transição Sim-to-Real: primeiros passos com a placa física ESP32 acendendo LEDs e lendo sensores de ultrassom reais.'
                }
              ].map((item, idx) => (
                <li key={idx} style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start', fontSize: '0.9rem', lineHeight: '1.55' }}>
                  <span style={{ fontWeight: '700', color: '#3533cd', shrink: 0, marginTop: '1px' }}>{item.bim}:</span>
                  <span style={{ color: 'var(--text-body)' }}>{item.desc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* TRILHA ENSINO MÉDIO */}
          <div style={{
            background: 'var(--surface-level-1-bg)',
            border: '1px solid var(--surface-level-1-border)',
            borderRadius: 'var(--radius-md)',
            padding: '2.2rem',
            boxShadow: 'var(--surface-level-1-shadow)'
          }}>
            <div style={{ display: 'inline-block', padding: '0.35rem 0.85rem', borderRadius: '6px', background: 'var(--bg-page-subtle)', fontWeight: '700', fontSize: '0.85rem', color: 'var(--color-brand-ink)', marginBottom: '1.25rem' }}>
              Ensino Médio · 1ª à 3ª Série
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--color-brand-ink)', marginBottom: '1rem' }}>
              Trilha de Engenharia, Python & Inteligência Artificial Física
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Preparação real para vestibulares, olimpíadas de robótica (OBR), cursos de tecnologia e mercado de engenharia:
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                {
                  bim: '1º Bimestre',
                  desc: 'Python Puro no Editor Monaco: variáveis, laços de repetição, funções e modelagem matemática do robô.'
                },
                {
                  bim: '2º Bimestre',
                  desc: 'MicroPython e Arquitetura de Sistemas Embarcados: pinagem GPIO, interrupções e conversão analógico-digital (ADC).'
                },
                {
                  bim: '3º Bimestre',
                  desc: 'Digital Twin e Telemetria a 20Hz: sincronização em tempo real de hardware físico com o modelo virtual via WebSockets.'
                },
                {
                  bim: '4º Bimestre',
                  desc: 'Physical AI & Projeto Maker Final: desenvolvimento de veículo autônomo com máquina de estados finitos (State Classifier).'
                }
              ].map((item, idx) => (
                <li key={idx} style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start', fontSize: '0.9rem', lineHeight: '1.55' }}>
                  <span style={{ fontWeight: '700', color: '#3533cd', shrink: 0, marginTop: '1px' }}>{item.bim}:</span>
                  <span style={{ color: 'var(--text-body)' }}>{item.desc}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* ============================================================
          6. QUEM MINISTRA AS AULAS (AUTORIDADE DE RODRIGO FREIRE)
          ============================================================ */}
      <section style={{ 
        background: 'var(--bg-page-subtle)', 
        border: '1px solid var(--surface-level-1-border)', 
        borderRadius: 'var(--radius-lg)', 
        padding: '3rem 2.2rem', 
        marginBottom: '5.5rem' 
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
          
          <div>
            <span className="corp-badge" style={{ marginBottom: '0.75rem' }}>Docência & Responsabilidade</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.3rem', color: 'var(--color-brand-ink)', lineHeight: '1.2', marginBottom: '1.25rem' }}>
              Quem ensina é quem construiu a ferramenta.
            </h2>
            <p style={{ fontSize: '0.98rem', color: 'var(--text-body)', lineHeight: '1.65', marginBottom: '1.25rem' }}>
              Ao contratar um professor tradicional de robótica, o colégio fica vulnerável quando o kit quebra ou a apostila da franquia não funciona. Com <strong>Rodrigo Freire</strong>, sua escola conta com um profissional que domina a engenharia do hardware ao software:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <CheckCircle2 size={18} color="#3533cd" style={{ shrink: 0, marginTop: '3px' }} />
                <span style={{ fontSize: '0.92rem', color: 'var(--text-body)' }}>
                  <strong>Graduação em Direito & Cursando Análise de Sistemas:</strong> base jurídica que garante absoluto rigor ético, conformidade com a LGPD no trato com dados de alunos e postura pedagógica madura.
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <CheckCircle2 size={18} color="#3533cd" style={{ shrink: 0, marginTop: '3px' }} />
                <span style={{ fontSize: '0.92rem', color: 'var(--text-body)' }}>
                  <strong>Registro INPI de Programa de Computador Nº 512025006506-0:</strong> propriedade intelectual reconhecida e histórico comprovado de desenvolvimento de sistemas complexos.
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <CheckCircle2 size={18} color="#3533cd" style={{ shrink: 0, marginTop: '3px' }} />
                <span style={{ fontSize: '0.92rem', color: 'var(--text-body)' }}>
                  <strong>Residente em Porto Velho (RO):</strong> presença presencial diária na instituição, sem intermediários remotos ou filas de atendimento.
                </span>
              </div>
            </div>

            <Link to="/sobre" style={{ color: '#3533cd', fontWeight: '600', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none' }}>
              Conhecer biografia completa de Rodrigo Freire <ChevronRight size={15} />
            </Link>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '240px',
              height: '240px',
              borderRadius: '24px',
              overflow: 'hidden',
              margin: '0 auto 1.25rem',
              border: '2px solid rgba(0,0,0,0.08)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}>
              <img
                src={currentProfile?.avatar_url || '/foto_perfil.jpeg'}
                alt="Rodrigo Freire"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/foto_perfil.jpeg';
                }}
              />
            </div>
            <div style={{ fontWeight: '700', fontSize: '1.2rem', color: 'var(--color-brand-ink)' }}>Rodrigo Freire</div>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Criador do Artifex Labs · Porto Velho, RO</div>
          </div>

        </div>
      </section>

      {/* ============================================================
          7. PERGUNTAS FREQUENTES DE DIRETORES E COORDENADORES (FAQ)
          ============================================================ */}
      <section style={{ marginBottom: '5.5rem' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <span className="corp-badge" style={{ marginBottom: '0.75rem' }}>Dúvidas Comuns</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: 'var(--color-brand-ink)', marginBottom: '0.75rem' }}>
            Perguntas Frequentes da Coordenação Pedagógica
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {[
            {
              p: 'Quais computadores a nossa escola precisa ter no laboratório de informática?',
              r: 'Qualquer computador comum (Windows, Linux ou Mac) que possua um navegador moderno instalado (Google Chrome, Microsoft Edge ou Mozilla Firefox). Como o Artifex Labs roda 100% no navegador via WebAssembly, ele não requer placas de vídeo dedicadas nem computadores caros.'
            },
            {
              p: 'A equipe de TI da escola precisa liberar senhas de administrador ou instalar drivers?',
              r: 'Não. Para a simulação em tela, nenhuma instalação é necessária. Para os módulos com conexão física ao microcontrolador ESP32, a comunicação é feita através do protocolo padrão WebSerial nativo dos navegadores, sem exigir privilégios de administrador ou intervenções complexas de rede.'
            },
            {
              p: 'O colégio precisa comprar kits caros antes de contratar as aulas?',
              r: 'Não! O primeiro semestre letivo pode ser ministrado inteiramente com simulação digital de alta fidelidade no Artifex Labs, garantindo aprendizado sem nenhum investimento inicial em peças físicas. Para as aulas práticas de bancada física, utilizamos placas microcontroladoras ESP32 que custam uma fração minúscula (cerca de R$ 35) dos kits de robótica tradicionais.'
            },
            {
              p: 'Como funciona a aula demonstrativa gratuita presencial?',
              r: 'Vou pessoalmente até o seu colégio em Porto Velho com uma bancada física montada do Artifex Labs. Em 45 minutos, demonstro para a direção, coordenação ou para uma turma de alunos como o simulador responde a comandos de código e como o gêmeo digital conversa com a placa física em tempo real.'
            }
          ].map((faq, idx) => (
            <div key={idx} style={{
              background: 'var(--surface-level-1-bg)',
              border: '1px solid var(--surface-level-1-border)',
              borderRadius: 'var(--radius-md)',
              padding: '1.5rem 1.75rem',
              boxShadow: 'var(--surface-level-1-shadow)'
            }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--color-brand-ink)', marginBottom: '0.65rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <HelpCircle size={18} color="#3533cd" style={{ shrink: 0, marginTop: '2px' }} />
                <span>{faq.p}</span>
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: '1.65', margin: 0, paddingLeft: '1.65rem' }}>
                {faq.r}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          8. CARD DE FECHAMENTO COM CTA PARA COORDENADORES
          ============================================================ */}
      <section style={{
        background: '#000000',
        borderRadius: 'var(--radius-lg)',
        padding: '3.5rem 2.5rem',
        color: '#FFFFFF',
        textAlign: 'center',
        boxShadow: '0 8px 30px rgba(0,0,0,0.18)'
      }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '0.45rem', 
          padding: '0.35rem 0.95rem', 
          borderRadius: '999px', 
          background: 'rgba(255,255,255,0.12)', 
          fontSize: '0.82rem', 
          fontWeight: '600', 
          marginBottom: '1.5rem',
          letterSpacing: '0.04em',
          textTransform: 'uppercase'
        }}>
          <Sparkles size={13} color="#93c5fd" /> Demonstração Presencial em Porto Velho
        </div>

        <h2 style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', 
          fontWeight: '400', 
          lineHeight: '1.18', 
          marginBottom: '1.25rem',
          color: '#FFFFFF'
        }}>
          Veja o Artifex Labs funcionando ao vivo no laboratório do seu colégio.
        </h2>

        <p style={{ 
          fontSize: '1.1rem', 
          color: 'rgba(255,255,255,0.85)', 
          lineHeight: '1.65', 
          maxWidth: '750px', 
          margin: '0 auto 2.5rem' 
        }}>
          Agende uma apresentação prática de 45 minutos. Levo a bancada com microcontroladores ESP32 e mostro na prática 
          como os seus alunos vão programar robôs reais sem dor de cabeça e com o padrão pedagógico que a sua escola merece.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.25rem' }}>
          <a
            href={whatsappDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.55rem',
              background: '#FFFFFF',
              color: '#000000',
              fontFamily: 'var(--font-heading)',
              fontWeight: '700',
              fontSize: '1rem',
              padding: '0.9rem 2rem',
              borderRadius: 'var(--radius-pill)',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
              transition: 'all 0.2s ease'
            }}
          >
            <MessageSquare size={18} />
            Agendar demonstração via WhatsApp
          </a>

          <a
            href={`mailto:${currentProfile?.email || 'contato@rodrigofreire.dev'}?subject=${encodeURIComponent('Demonstração Artifex Labs no Colégio')}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.55rem',
              background: 'transparent',
              color: '#FFFFFF',
              border: '1px solid rgba(255,255,255,0.3)',
              fontFamily: 'var(--font-heading)',
              fontWeight: '600',
              fontSize: '0.95rem',
              padding: '0.9rem 1.85rem',
              borderRadius: 'var(--radius-pill)',
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}
          >
            Contato por E-mail
          </a>
        </div>
      </section>

    </div>
  );
}
