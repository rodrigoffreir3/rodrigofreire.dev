import React, { useState } from 'react';
import { DEFAULT_SERVICES } from '../data/defaultData';
import {
  Wrench,
  ShoppingCart,
  FileSpreadsheet,
  Zap,
  ShieldCheck,
  CheckCircle2,
  MessageSquare,
  ArrowRight,
  ArrowDown,
  MapPin,
  Clock,
  Send
} from 'lucide-react';

const ICON_MAP = {
  Wrench,
  ShoppingCart,
  FileSpreadsheet,
  Zap,
  ShieldCheck,
  CheckCircle2
};

export default function Home({ profile }) {
  const phone = (profile?.whatsapp_number ? String(profile.whatsapp_number).replace(/\D/g, '') : '') || '5569992782919';

  // Formulário simplificado de contato / socorro
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    empresa: '',
    problema: ''
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const text = `Olá Rodrigo! Vim pelo seu site e preciso de ajuda com um problema:\n\n*Nome:* ${formData.nome}\n*WhatsApp:* ${formData.whatsapp}\n*Empresa/Comércio:* ${formData.empresa || 'Não informado'}\n*O que está acontecendo:* ${formData.problema}`;
    const targetUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    const win = window.open(targetUrl, '_blank', 'noopener,noreferrer');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = targetUrl;
    }
  };

  return (
    <div className="home-enterprise-wrapper">

      {/* ============================================================
         BLOCO 1: ABERTURA (ACIMA DA DOBRA) — FOCO NA DOR REAL
         ============================================================ */}
      <section className="corp-hero-enterprise" id="inicio">
        <div className="hero-enterprise-inner" style={{ gridTemplateColumns: '1fr', maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
          <div className="hero-enterprise-copy" style={{ alignItems: 'center' }}>
            
            <div className="hero-pill-badge" style={{ margin: '0 auto 1.5rem' }}>
              <MapPin size={14} />
              <span>Atendimento em Porto Velho · Presencial e Remoto</span>
            </div>

            <h1 className="hero-enterprise-title" style={{ fontSize: 'clamp(2.1rem, 4.5vw, 3.4rem)', lineHeight: '1.2', marginBottom: '1.5rem' }}>
              Seu sistema travou, o computador do caixa não liga ou aquele problema que ninguém resolve <span className="highlight-cyan">já virou rotina?</span>
            </h1>

            <p className="hero-enterprise-desc" style={{ fontSize: '1.2rem', lineHeight: '1.7', maxWidth: '780px', margin: '0 auto 2rem', color: 'var(--text-body)' }}>
              Eu atendo aqui em Porto Velho, falo direto com você no WhatsApp, sem atendente intermediário, sem call center e sem chamado que desaparece.
            </p>

            <div className="hero-pain-chips-row" style={{ justifyContent: 'center', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
              <span className="hero-pain-chip-item">✓ Atendimento em Porto Velho</span>
              <span className="hero-pain-chip-item">✓ Orçamento claro antes de começar</span>
              <span className="hero-pain-chip-item">✓ Explicação simples em português</span>
              <span className="hero-pain-chip-item">✓ Resposta rápida no WhatsApp</span>
            </div>

            <div className="hero-actions-row" style={{ justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href={`https://wa.me/${phone}?text=${encodeURIComponent('Olá Rodrigo! Vi seu site e preciso de ajuda com um problema no meu comércio/computador.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="corp-btn-accent"
                style={{ fontSize: '1.05rem', padding: '0.9rem 2rem' }}
              >
                <MessageSquare size={18} /> Falar com Rodrigo no WhatsApp
              </a>

              <a href="#servicos" className="corp-btn-outline-glass" style={{ fontSize: '1.05rem', padding: '0.9rem 1.8rem' }}>
                Ver o que eu resolvo <ArrowDown size={16} />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================
         BLOCO 2: O QUE EU RESOLVO (6 SERVIÇOS PRÁTICOS)
         ============================================================ */}
      <section className="section-services-catalog" id="servicos" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="section-head-center">
          <span className="section-tag-pill">Serviços em Porto Velho</span>
          <h2 className="section-title-large">O que eu resolvo no dia a dia da sua empresa</h2>
          <p className="section-desc-subtle">
            Sem empurrar coisas caras que você não precisa. Serviços diretos e pontuais para destravar o seu comércio e deixar você trabalhar em paz.
          </p>
        </div>

        <div className="services-catalog-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
          {DEFAULT_SERVICES.map((service) => {
            const IconComponent = ICON_MAP[service.icon] || Wrench;
            const message = service.whatsapp_msg || `Olá Rodrigo! Gostaria de conversar sobre: ${service.title}`;

            return (
              <div key={service.id} className="service-card-liquid" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="service-card-header">
                  <div className="service-icon-wrapper">
                    <IconComponent size={22} />
                  </div>
                  <span className="service-card-tag">{service.tag}</span>
                </div>

                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--text-heading)' }}>
                  {service.title}
                </h3>

                {/* Dor */}
                <div style={{ marginBottom: '0.85rem' }}>
                  <p style={{ fontSize: '0.94rem', color: 'var(--text-body)', lineHeight: '1.6', margin: 0 }}>
                    <strong style={{ color: '#ef4444' }}>O problema: </strong>
                    {service.pain}
                  </p>
                </div>

                {/* Solução */}
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ fontSize: '0.94rem', color: 'var(--text-body)', lineHeight: '1.6', margin: 0 }}>
                    <strong style={{ color: 'var(--color-dark-teal)' }}>O que eu faço: </strong>
                    {service.solution}
                  </p>
                </div>

                {/* Ganho Concreto */}
                <div style={{ marginTop: 'auto', padding: '0.85rem 1rem', background: 'rgba(0, 245, 212, 0.08)', borderRadius: '12px', border: '1px solid rgba(0, 245, 212, 0.2)', marginBottom: '1.25rem' }}>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-heading)', lineHeight: '1.5', margin: 0 }}>
                    <strong>Ganho concreto: </strong>
                    {service.gain}
                  </p>
                </div>

                <div className="service-card-footer" style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--color-gray-ui)' }}>
                  <a
                    href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="service-btn-contact"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    Pedir ajuda com isso <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================
         BLOCO 3: POR QUE EU, E NÃO O SUPORTE QUE VOCÊ JÁ TENTOU
         ============================================================ */}
      <section className="section-pains-container" id="diferenciais" style={{ paddingTop: '5rem', paddingBottom: '5rem', background: 'var(--color-off-white)' }}>
        <div className="section-head-center">
          <span className="section-tag-pill">Diferenciais Reais</span>
          <h2 className="section-title-large">Por que me chamar em vez de esperar pelo suporte comum?</h2>
          <p className="section-desc-subtle">
            Quem tem comércio em Porto Velho conhece a dor de abrir chamado em empresa de fora e ficar dias esperando uma resposta enquanto a fila do caixa só aumenta.
          </p>
        </div>

        <div className="pains-grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2.5rem' }}>
          
          <div className="pain-card-item" style={{ borderColor: 'rgba(11, 74, 79, 0.15)', background: '#FFFFFF' }}>
            <div className="service-icon-wrapper" style={{ marginBottom: '1rem' }}>
              <MessageSquare size={22} color="var(--color-dark-teal)" />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem' }}>Atendimento direto comigo</h3>
            <p style={{ fontSize: '0.92rem', lineHeight: '1.6', color: 'var(--text-body)' }}>
              Você fala direto com a pessoa que faz o serviço e resolve o problema. Sem atendentes intermediários, sem protocolo demorado e sem precisar explicar a mesma história dez vezes para pessoas diferentes.
            </p>
          </div>

          <div className="pain-card-item" style={{ borderColor: 'rgba(11, 74, 79, 0.15)', background: '#FFFFFF' }}>
            <div className="service-icon-wrapper" style={{ marginBottom: '1rem' }}>
              <MapPin size={22} color="var(--color-dark-teal)" />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem' }}>Presença local em Porto Velho</h3>
            <p style={{ fontSize: '0.92rem', lineHeight: '1.6', color: 'var(--text-body)' }}>
              Moro e atendo aqui na cidade. Se o problema não puder ser resolvido pelo computador à distância, eu me desloco até o seu estabelecimento para resolver pessoalmente no seu balcão.
            </p>
          </div>

          <div className="pain-card-item" style={{ borderColor: 'rgba(11, 74, 79, 0.15)', background: '#FFFFFF' }}>
            <div className="service-icon-wrapper" style={{ marginBottom: '1rem' }}>
              <CheckCircle2 size={22} color="var(--color-dark-teal)" />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem' }}>Falo a sua língua</h3>
            <p style={{ fontSize: '0.92rem', lineHeight: '1.6', color: 'var(--text-body)' }}>
              Nada de palavras complicadas para parecer difícil. Eu explico em português claro o que estragou, por que aconteceu e o que fiz para consertar, para você entender exatamente o que está pagando.
            </p>
          </div>

          <div className="pain-card-item" style={{ borderColor: 'rgba(11, 74, 79, 0.15)', background: '#FFFFFF' }}>
            <div className="service-icon-wrapper" style={{ marginBottom: '1rem' }}>
              <Clock size={22} color="var(--color-dark-teal)" />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem' }}>Menos tempo de loja parada</h3>
            <p style={{ fontSize: '0.92rem', lineHeight: '1.6', color: 'var(--text-body)' }}>
              Comércio não pode esperar dias por socorro. Meu foco é fazer seu computador, impressora ou planilha voltarem a funcionar o mais rápido possível para você não perder faturamento.
            </p>
          </div>

        </div>
      </section>

      {/* ============================================================
         BLOCO 4: COMO FUNCIONA NA PRÁTICA (3 PASSOS HONESTOS)
         ============================================================ */}
      <section className="section-methodology-bg" id="como-funciona" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="methodology-inner">
          <div className="section-head-center">
            <span className="section-tag-pill">Sem Burocracia</span>
            <h2 className="section-title-large">Como funciona para resolver o seu problema</h2>
            <p className="section-desc-subtle">
              Três passos simples e transparentes do primeiro contato até o serviço entregue.
            </p>
          </div>

          <div className="methodology-grid-steps" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            
            <div className="method-step-card" style={{ background: '#FFFFFF', padding: '2rem', borderRadius: '18px' }}>
              <div className="step-num-badge">01</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Conversa no WhatsApp</h3>
              <p style={{ fontSize: '0.93rem', lineHeight: '1.6', color: 'var(--text-body)' }}>
                Você me manda uma mensagem contando o que está acontecendo no seu computador, impressora, planilha ou na loja. É rápido e sem burocracia.
              </p>
            </div>

            <div className="method-step-card" style={{ background: '#FFFFFF', padding: '2rem', borderRadius: '18px' }}>
              <div className="step-num-badge">02</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Orçamento claro antes de começar</h3>
              <p style={{ fontSize: '0.93rem', lineHeight: '1.6', color: 'var(--text-body)' }}>
                Eu analiso a situação e passo para você o valor exato do serviço e o prazo necessário antes de mexer em qualquer coisa. Você aprova e não tem surpresa na conta.
              </p>
            </div>

            <div className="method-step-card" style={{ background: '#FFFFFF', padding: '2rem', borderRadius: '18px' }}>
              <div className="step-num-badge">03</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Problema resolvido com explicação</h3>
              <p style={{ fontSize: '0.93rem', lineHeight: '1.6', color: 'var(--text-body)' }}>
                Executo o conserto ou a configuração, testo junto com você e mostro o que foi feito para a sua empresa seguir trabalhando com tranquilidade.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================
         BLOCO 5: CHAMADA FINAL & FORMULÁRIO SIMPLIFICADO
         ============================================================ */}
      <section className="section-diagnostic-contact" id="contato" style={{ paddingTop: '5rem', paddingBottom: '6rem' }}>
        <div className="diagnostic-contact-inner" style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div>
            <span className="section-tag-pill">Atendimento Direto</span>
            <h2 className="section-title-large">Vamos resolver aquele problema do seu comércio hoje?</h2>
            <p className="section-desc-subtle" style={{ marginBottom: '1.75rem' }}>
              Fale diretamente comigo pelo WhatsApp. Conte o que está acontecendo e eu respondo com o que pode ser feito para resolver.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-dark-teal)', fontWeight: '600' }}>
                <CheckCircle2 size={18} /> Atendimento em Porto Velho e região
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-dark-teal)', fontWeight: '600' }}>
                <CheckCircle2 size={18} /> Você fala direto com o Rodrigo, sem robôs
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-dark-teal)', fontWeight: '600' }}>
                <CheckCircle2 size={18} /> Orçamento justo e sem compromisso
              </div>
            </div>

            <a
              href={`https://wa.me/${phone}?text=${encodeURIComponent('Olá Rodrigo! Gostaria de tirar uma dúvida sobre um serviço para o meu comércio.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="corp-btn-accent"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 1.8rem' }}
            >
              <MessageSquare size={18} /> Chamar no WhatsApp Agora
            </a>
          </div>

          <form onSubmit={handleFormSubmit} className="diagnostic-form-glass">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', color: 'var(--text-heading)' }}>
              Ou deixe sua mensagem rápida
            </h3>

            <div className="form-group-item">
              <label className="form-label-corp">Seu Nome</label>
              <input
                type="text"
                required
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                placeholder="Ex: Carlos Oliveira"
                className="form-input-corp"
              />
            </div>

            <div className="form-group-item">
              <label className="form-label-corp">Seu WhatsApp com DDD</label>
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
              <label className="form-label-corp">Nome da sua Loja ou Empresa (opcional)</label>
              <input
                type="text"
                value={formData.empresa}
                onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                placeholder="Ex: Mercadinho Avenida"
                className="form-input-corp"
              />
            </div>

            <div className="form-group-item">
              <label className="form-label-corp">O que está acontecendo? (Descreva o problema)</label>
              <textarea
                required
                rows={3}
                value={formData.problema}
                onChange={(e) => setFormData({ ...formData, problema: e.target.value })}
                placeholder="Ex: O computador do caixa está travando toda hora quando tento imprimir nota..."
                className="form-input-corp"
                style={{ resize: 'vertical' }}
              />
            </div>

            <button type="submit" className="corp-btn-accent" style={{ width: '100%', marginTop: '0.5rem', justifyContent: 'center' }}>
              <Send size={16} /> Enviar Mensagem no WhatsApp
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
