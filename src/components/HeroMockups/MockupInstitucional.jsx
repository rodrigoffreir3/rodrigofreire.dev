import React from 'react';
import { Lock, ShieldCheck, Cpu, Layers, ArrowRight } from 'lucide-react';

/**
 * MockupInstitucional — SPEC-SITE-007 RF-1 (Mockup 2)
 * Site institucional de alta autoridade: estética sóbria, espaço em branco e pilares de serviço.
 */
export default function MockupInstitucional({ isActive = true }) {
  const animClass = isActive ? 'anim-active' : '';

  return (
    <div className={`hero-mockup-window mockup-type-institutional ${animClass}`} aria-hidden="true">
      {/* BLOCO 1: Barra do Navegador */}
      <div className="mockup-browser-bar mockup-anim-step-1">
        <div className="mockup-window-controls">
          <span className="mockup-dot mockup-dot-red" />
          <span className="mockup-dot mockup-dot-yellow" />
          <span className="mockup-dot mockup-dot-green" />
        </div>
        <div className="mockup-address-bar">
          <Lock size={14} className="mockup-address-lock" />
          <span className="mockup-address-url">empresa.com.br</span>
        </div>
        <div className="mockup-browser-actions">
          <span className="mockup-browser-icon-pill" />
        </div>
      </div>

      {/* ÁREA INTERNA INSTITUCIONAL */}
      <div className="mockup-inst-canvas">
        {/* BLOCO 2: Cabeçalho com 4 itens de menu */}
        <div className="mockup-inst-header mockup-anim-step-2">
          <div className="mockup-inst-logo">
            <span className="mockup-inst-badge">EMPRESA</span>
            <span className="mockup-inst-logoline" />
          </div>
          <div className="mockup-inst-nav">
            <span className="mockup-nav-item active" />
            <span className="mockup-nav-item" />
            <span className="mockup-nav-item" />
            <span className="mockup-nav-item" />
          </div>
          <div className="mockup-inst-cta-mini">Contato</div>
        </div>

        {/* BLOCO 3: Faixa de Destaque Corporativa */}
        <div className="mockup-inst-hero mockup-anim-step-3">
          <div className="mockup-inst-tag" />
          <div className="mockup-inst-title" />
          <div className="mockup-inst-subtitle" />
          <div className="mockup-inst-action-btn">
            Conhecer Soluções <ArrowRight size={14} />
          </div>
        </div>

        {/* BLOCO 4: Três Blocos de Serviços */}
        <div className="mockup-inst-services mockup-anim-step-4">
          <div className="mockup-service-card">
            <div className="mockup-service-icon">
              <ShieldCheck size={22} />
            </div>
            <div className="mockup-service-title" />
            <div className="mockup-service-line" />
            <div className="mockup-service-line short" />
          </div>

          <div className="mockup-service-card">
            <div className="mockup-service-icon">
              <Cpu size={22} />
            </div>
            <div className="mockup-service-title" />
            <div className="mockup-service-line" />
            <div className="mockup-service-line short" />
          </div>

          <div className="mockup-service-card">
            <div className="mockup-service-icon">
              <Layers size={22} />
            </div>
            <div className="mockup-service-title" />
            <div className="mockup-service-line" />
            <div className="mockup-service-line short" />
          </div>
        </div>

        {/* BLOCO 5: Rodapé Institucional com Contato */}
        <div className="mockup-inst-footer mockup-anim-step-5">
          <div className="mockup-inst-footer-left">
            <span className="mockup-inst-footer-badge" />
            <span className="mockup-inst-footer-text">Porto Velho · Atendimento Dedicado</span>
          </div>
          <div className="mockup-inst-footer-contact">Fale com um Especialista</div>
        </div>
      </div>
    </div>
  );
}
