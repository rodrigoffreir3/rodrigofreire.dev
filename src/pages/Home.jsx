import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  DEFAULT_SERVICES,
  DEFAULT_SEGMENTS,
  DEFAULT_PAINS,
  DEFAULT_STEPS,
  DEFAULT_FAQS,
  DEFAULT_SOLUTIONS_STRIP
} from '../data/defaultData';
import AiChatSimulator from '../components/AiChatSimulator';
import {
  LayoutDashboard,
  Zap,
  FileText,
  Boxes,
  TrendingUp,
  UtensilsCrossed,
  Truck,
  Clock,
  ShoppingCart,
  Code2,
  BrainCircuit,
  Bot,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';

const ICON_MAP = {
  LayoutDashboard,
  Zap,
  FileText,
  Boxes,
  TrendingUp,
  UtensilsCrossed,
  Truck,
  Clock,
  ShoppingCart,
  Code2,
  BrainCircuit,
  Bot
};

export default function Home({ profile, projects = [], posts = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Formulário de diagnóstico
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    empresa: '',
    segmento: 'varejo',
    dor_principal: 'estoque'
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const phone = profile?.whatsapp_number || '5569992782919';
    const text = `Olá! Gostaria de solicitar um diagnóstico gratuito para minha empresa.\n\n*Nome:* ${formData.nome}\n*Empresa:* ${formData.empresa}\n*Segmento:* ${formData.segmento}\n*Principal Desafio:* ${formData.dor_principal}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const filteredServices = selectedCategory === 'todos'
    ? DEFAULT_SERVICES
    : DEFAULT_SERVICES.filter((s) => s.category === selectedCategory);

  const phone = profile?.whatsapp_number || '5569992782919';

  return (
    <div className="home-enterprise-wrapper">

      {/* ============================================================
         1. HERO EXECUTIVO HIGH-TECH COM APPLE LIQUID GLASS
         ============================================================ */}
      <section className="corp-hero-enterprise" id="inicio">
        <div className="hero-enterprise-inner">
          <div className="hero-enterprise-copy">
            <div className="hero-pill-badge">
              <Sparkles size={14} />
              <span>Soluções Empresariais Integradas + IA Aplicada</span>
            </div>

            <h1 className="hero-enterprise-title">
              Controle total da sua operação. Da gestão de estoque ao <span className="highlight-cyan">atendimento com IA</span>.
            </h1>

            <p className="hero-enterprise-desc">
              {profile?.lead_bio || "Elimine o caos de planilhas soltas e perdas invisíveis de receita. Implementamos sistemas ERP completos, frente de caixa com PIX dinâmico e agentes de inteligência artificial sob medida."}
            </p>

            <div className="hero-pain-chips-row">
              <span className="hero-pain-chip-item">Estoque sem furos</span>
              <span className="hero-pain-chip-item">Caixa com lucro real</span>
              <span className="hero-pain-chip-item">Atendimento IA 24/7</span>
              <span className="hero-pain-chip-item">Notas fiscais sem travar</span>
            </div>

            <div className="hero-actions-row">
              <a href="#diagnostico" className="corp-btn-accent">
                🚀 Solicitar Diagnóstico Gratuito
              </a>
              <a href="#ia-spotlight" className="corp-btn-outline-glass">
                Ver Simulação de IA →
              </a>
              <a
                href={`https://wa.me/${phone}?text=${encodeURIComponent('Olá! Gostaria de conhecer as soluções para minha empresa.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="corp-btn-outline-glass"
              >
                <MessageSquare size={16} /> WhatsApp Direto
              </a>
            </div>

            <div className="hero-metrics-bar">
              <div className="hero-metric-item">
                <strong>12+</strong>
                <span>Módulos Integrados</span>
              </div>
              <div className="hero-metric-item">
                <strong>100%</strong>
                <span>Implantação Assistida</span>
              </div>
              <div className="hero-metric-item">
                <strong>24/7</strong>
                <span>Automação com IA</span>
              </div>
            </div>
          </div>

          {/* Visual Hero Mockup */}
          <div className="hero-visual-card">
            <div className="hero-screen-header">
              <span className="screen-dot dot-red" />
              <span className="screen-dot dot-yellow" />
              <span className="screen-dot dot-green" />
              <small style={{ color: 'var(--text-muted)', marginLeft: 'auto', fontSize: '0.72rem', fontWeight: 600 }}>
                painel-executivo.rftech.app
              </small>
            </div>

            <div className="hero-kpi-grid">
              <div className="kpi-card">
                <small>Faturamento Hoje</small>
                <strong>R$ 14.820,00</strong>
                <span>▲ 18.4% vs semana anterior</span>
              </div>
              <div className="kpi-card">
                <small>Estoque & Reposição</small>
                <strong>98.2% Regular</strong>
                <span>0 rupturas críticas</span>
              </div>
              <div className="kpi-card">
                <small>PIX no PDV</small>
                <strong>312 Transações</strong>
                <span>Confirmação em 1.4s</span>
              </div>
              <div className="kpi-card">
                <small>WhatsApp Bot IA</small>
                <strong>84 Leads Atendidos</strong>
                <span>24/7 sem fila de espera</span>
              </div>
            </div>

            <div className="hero-security-status-bar">
              <div className="hero-security-status-left">
                <ShieldCheck size={18} color="var(--color-cyan-teal)" />
                <span>Conexão Segura SEFAZ & Banco Central</span>
              </div>
              <span className="hero-security-status-badge">ONLINE</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
         2. FAIXA DE SOLUÇÕES RÁPIDAS (STRIP)
         ============================================================ */}
      <section className="solutions-strip-bar">
        <div className="solutions-strip-inner">
          {DEFAULT_SOLUTIONS_STRIP.map((item, idx) => (
            <a key={idx} href={item.href || "#catalogo"} className="strip-item-chip">
              <strong>{item.title}</strong>
              <span>{item.desc}</span>
            </a>
          ))}
        </div>
      </section>

      {/* ============================================================
         3. DORES DO CLIENTE (ONDE VOCÊ PERDE DINHEIRO E CONTROLE)
         ============================================================ */}
      <section className="section-pains-container">
        <div className="section-head-center">
          <span className="section-tag-pill">Diagnóstico Operacional</span>
          <h2 className="section-title-large">Onde sua empresa está perdendo dinheiro agora?</h2>
          <p className="section-desc-subtle">
            Problemas invisíveis na rotina comercial corroem a sua margem de lucro e geram retrabalho diário para você e sua equipe.
          </p>
        </div>

        <div className="pains-grid-cards">
          {DEFAULT_PAINS.map((pain) => (
            <div key={pain.id} className="pain-card-item">
              <div className="pain-icon-cross">✕</div>
              <h3>{pain.title}</h3>
              <p>{pain.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
         4. METODOLOGIA EM 4 PASSOS
         ============================================================ */}
      <section className="section-methodology-bg">
        <div className="methodology-inner">
          <div className="section-head-center">
            <span className="section-tag-pill">
              Metodologia de Sucesso
            </span>
            <h2 className="section-title-large">
              4 passos para sair do improviso e assumir o controle total
            </h2>
            <p className="section-desc-subtle">
              Não vendemos apenas software solto. Acompanhamos sua equipe em cada etapa para garantir resultados práticos.
            </p>
          </div>

          <div className="methodology-grid-steps">
            {DEFAULT_STEPS.map((step) => (
              <div key={step.step} className="method-step-card">
                <div className="step-num-badge">{step.step}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
         5. CATÁLOGO DE MÓDULOS & SOLUÇÕES (FILTRÁVEL)
         ============================================================ */}
      <section className="section-services-catalog" id="catalogo">
        <div className="section-head-center">
          <span className="section-tag-pill">Soluções Corporativas</span>
          <h2 className="section-title-large">Módulos especializados para cada rotina do seu negócio</h2>
          <p className="section-desc-subtle">
            Arquitetura modular e integrada: comece resolvendo a dor mais urgente e adicione novos módulos conforme sua empresa cresce.
          </p>
        </div>

        {/* Filtros de Categoria */}
        <div className="catalog-filter-tabs">
          <button
            onClick={() => setSelectedCategory('todos')}
            className={`catalog-tab-btn ${selectedCategory === 'todos' ? 'active' : ''}`}
          >
            Todos os Módulos
          </button>
          <button
            onClick={() => setSelectedCategory('erp')}
            className={`catalog-tab-btn ${selectedCategory === 'erp' ? 'active' : ''}`}
          >
            Gestão & ERP
          </button>
          <button
            onClick={() => setSelectedCategory('pdv')}
            className={`catalog-tab-btn ${selectedCategory === 'pdv' ? 'active' : ''}`}
          >
            Frente de Caixa (PDV)
          </button>
          <button
            onClick={() => setSelectedCategory('ia')}
            className={`catalog-tab-btn ${selectedCategory === 'ia' ? 'active' : ''}`}
          >
            Inteligência Artificial ✨
          </button>
          <button
            onClick={() => setSelectedCategory('fiscal')}
            className={`catalog-tab-btn ${selectedCategory === 'fiscal' ? 'active' : ''}`}
          >
            Fiscal & Tributário
          </button>
          <button
            onClick={() => setSelectedCategory('software')}
            className={`catalog-tab-btn ${selectedCategory === 'software' ? 'active' : ''}`}
          >
            Sob Medida & Apps
          </button>
        </div>

        {/* Grid de Serviços */}
        <div className="services-catalog-grid">
          {filteredServices.map((service) => {
            const IconComponent = ICON_MAP[service.icon] || LayoutDashboard;
            return (
              <div key={service.id} className="service-card-liquid">
                <div className="service-card-header">
                  <div className="service-icon-wrapper">
                    <IconComponent size={24} />
                  </div>
                  <span className="service-card-tag">{service.tag}</span>
                </div>

                <h3>{service.title}</h3>
                <p>{service.description}</p>

                {service.highlights && (
                  <ul className="service-highlights-list">
                    {service.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}

                <div className="service-card-footer">
                  <span className="service-price-label">{service.price_tag}</span>
                  <a
                    href={`https://wa.me/${phone}?text=${encodeURIComponent(`Olá! Tenho interesse no módulo: ${service.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="service-btn-contact"
                  >
                    Detalhes <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================
         6. DESTAQUE ESPECIAL: AUTOMAÇÃO COM IA & WHATSAPP BOT COM SIMULADOR
         ============================================================ */}
      <section className="section-ai-spotlight" id="ia-spotlight">
        <div className="ai-spotlight-inner">
          <div className="ai-spotlight-copy">
            <span className="section-tag-pill">
              Inovação Exclusiva
            </span>
            <h2>Atendimento 24/7 e Automação de Processos com Inteligência Artificial</h2>
            <p>
              Substitua robôs arcaicos por agentes de IA com compreensão de linguagem natural. Seu cliente envia áudios ou textos livres e a IA consulta o estoque, envia o código PIX e registra o pedido no seu ERP em tempo real.
            </p>

            <div className="ai-features-checks">
              <div className="ai-feature-row">
                <div className="ai-feature-icon-badge">✓</div>
                <div>
                  <strong>Compreensão Contextual Profunda (NLP)</strong>
                  <span>Entende gírias, erros de digitação e mensagens de áudio sem menus travados.</span>
                </div>
              </div>
              <div className="ai-feature-row">
                <div className="ai-feature-icon-badge">✓</div>
                <div>
                  <strong>Conexão em Tempo Real com o Banco de Dados</strong>
                  <span>Verifica saldo de produtos, tabela de preços e limite de crédito na hora.</span>
                </div>
              </div>
              <div className="ai-feature-row">
                <div className="ai-feature-icon-badge">✓</div>
                <div>
                  <strong>Treinamento Corporativo In-Company</strong>
                  <span>Capacitamos seu time operacional para extrair eficiência máxima de IAs generativas.</span>
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/${phone}?text=${encodeURIComponent('Olá! Quero conhecer a automação com Inteligência Artificial e WhatsApp Bot para minha empresa.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="corp-btn-accent"
            >
              🚀 Quero um WhatsApp Bot de IA para minha Empresa
            </a>
          </div>

          {/* Simulador Interativo */}
          <div className="ai-spotlight-demo">
            <AiChatSimulator />
          </div>
        </div>
      </section>

      {/* ============================================================
         7. SEGMENTOS ATENDIDOS
         ============================================================ */}
      <section className="section-segments-container" id="segmentos">
        <div className="section-head-center">
          <span className="section-tag-pill">Soluções por Ramo de Atuação</span>
          <h2 className="section-title-large">Tecnologia adaptada ao dia a dia do seu segmento</h2>
          <p className="section-desc-subtle">
            Cada tipo de negócio possui particularidades fiscais, operacionais e de balcão. Nossos sistemas já vêm configurados para sua área.
          </p>
        </div>

        <div className="segments-grid-cards">
          {DEFAULT_SEGMENTS.map((seg) => (
            <div key={seg.id} className="segment-card-item">
              <h3>{seg.title}</h3>
              <p>{seg.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
         8. TRANSPARÊNCIA & PLANO BASE DE ENTRADA
         ============================================================ */}
      <section className="section-pricing-base">
        <div className="pricing-base-card">
          <span className="pricing-badge-pill">Estrutura Transparente</span>
          <h2 style={{ fontSize: '2rem', color: 'var(--text-heading)', marginBottom: '0.75rem' }}>
            Comece com o essencial e escale com segurança
          </h2>
          <p style={{ color: 'var(--text-body)', fontSize: '0.95rem' }}>
            Implantação com migração de dados, configuração inicial do banco e treinamento dedicado para toda a sua equipe.
          </p>

          <div className="pricing-features-grid">
            <div className="pricing-feature-check">Cadastro de produtos e clientes</div>
            <div className="pricing-feature-check">Frente de caixa (PDV) rápido</div>
            <div className="pricing-feature-check">Emissão integrada de NF-e e NFC-e</div>
            <div className="pricing-feature-check">Controle financeiro de contas</div>
            <div className="pricing-feature-check">Relatórios de faturamento e lucro</div>
            <div className="pricing-feature-check">Suporte técnico consultivo</div>
          </div>

          <a href="#diagnostico" className="corp-btn-accent pricing-cta-btn">
            Solicitar Proposta para Minha Empresa
          </a>
        </div>
      </section>

      {/* ============================================================
         9. PERGUNTAS FREQUENTES (FAQ COM ACORDEÃO)
         ============================================================ */}
      <section className="section-faq-container" id="faq">
        <div className="section-head-center">
          <span className="section-tag-pill">Tire suas dúvidas</span>
          <h2 className="section-title-large">Perguntas Frequentes</h2>
          <p className="section-desc-subtle">
            Tudo o que você precisa saber antes de contratar seu sistema ou automação com IA.
          </p>
        </div>

        <div className="faq-accordion-list">
          {DEFAULT_FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className="faq-item-accordion">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                  className="faq-summary-btn"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {isOpen && (
                  <div className="faq-answer-body">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================
         10. DIAGNÓSTICO GRATUITO & CONTATO DIRETO
         ============================================================ */}
      <section className="section-diagnostic-contact" id="diagnostico">
        <div className="diagnostic-contact-inner">
          <div>
            <span className="section-tag-pill">Comece Agora</span>
            <h2 className="section-title-large">Solicite um Diagnóstico Gratuito da sua Operação</h2>
            <p className="section-desc-subtle" style={{ marginBottom: '1.5rem' }}>
              Nossos especialistas entram em contato pelo WhatsApp para entender o volume da sua loja, identificar onde ocorrem perdas e sugerir os módulos exatos para sua empresa crescer.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-dark-teal)', fontWeight: '600' }}>
                <CheckCircle2 size={18} /> Sem compromisso ou custos ocultos
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-dark-teal)', fontWeight: '600' }}>
                <CheckCircle2 size={18} /> Atendimento ágil e direto pelo WhatsApp
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-dark-teal)', fontWeight: '600' }}>
                <CheckCircle2 size={18} /> Plano de implantação sob medida para seu tamanho
              </div>
            </div>
          </div>

          <form onSubmit={handleFormSubmit} className="diagnostic-form-glass">
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem' }}>Preencha para receber o contato</h3>

            <div className="form-group-item">
              <label className="form-label-corp">Seu Nome Completo</label>
              <input
                type="text"
                required
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                placeholder="Ex: João da Silva"
                className="form-input-corp"
              />
            </div>

            <div className="form-group-item">
              <label className="form-label-corp">WhatsApp com DDD</label>
              <input
                type="tel"
                required
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                placeholder="(69) 99999-9999"
                className="form-input-corp"
              />
            </div>

            <div className="form-group-item">
              <label className="form-label-corp">Nome da sua Empresa</label>
              <input
                type="text"
                value={formData.empresa}
                onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                placeholder="Ex: Supermercado Central"
                className="form-input-corp"
              />
            </div>

            <div className="form-group-item">
              <label className="form-label-corp">Segmento Principal</label>
              <select
                value={formData.segmento}
                onChange={(e) => setFormData({ ...formData, segmento: e.target.value })}
                className="form-select-corp"
              >
                <option value="varejo">Comércio & Lojas em Geral</option>
                <option value="padaria">Padaria / Confeitaria</option>
                <option value="restaurante">Restaurante / Bar / Food</option>
                <option value="supermercado">Supermercado / Mercearia</option>
                <option value="distribuidora">Distribuidora / Atacado</option>
                <option value="construcao">Material de Construção</option>
                <option value="oficina">Oficina Mecânica / Autopeças</option>
                <option value="servicos">Prestação de Serviços / Outros</option>
              </select>
            </div>

            <button type="submit" className="corp-btn-accent" style={{ width: '100%', marginTop: '0.5rem' }}>
              Solicitar Diagnóstico via WhatsApp 🚀
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
