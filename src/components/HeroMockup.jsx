import React from 'react';
import { Lock, ShoppingCart, Image as ImageIcon } from 'lucide-react';

/**
 * HeroMockup — SPEC-SITE-005-C
 * Ilustração animada em CSS puro de uma plataforma / loja virtual sendo montada bloco a bloco.
 * 
 * Regras estritas de honestidade:
 * - Domínio genérico e fictício (sualoja.com.br)
 * - Zero marcas, nomes ou dados de clientes reais
 * - Zero métricas ou valores monetários reais (linhas gráficas sem números)
 * - aria-hidden="true" para leitores de tela
 * - Suporte completo a prefers-reduced-motion
 */
export default function HeroMockup() {
  return (
    <div className="hero-mockup-wrapper" aria-hidden="true">
      <div className="hero-mockup-window">
        {/* BLOCO 1: Barra de Janela do Navegador */}
        <div className="mockup-browser-bar mockup-anim-step-1">
          <div className="mockup-window-controls">
            <span className="mockup-dot mockup-dot-red" />
            <span className="mockup-dot mockup-dot-yellow" />
            <span className="mockup-dot mockup-dot-green" />
          </div>
          <div className="mockup-address-bar">
            <Lock size={14} className="mockup-address-lock" />
            <span className="mockup-address-url">sualoja.com.br</span>
          </div>
          <div className="mockup-browser-actions">
            <span className="mockup-browser-icon-pill" />
          </div>
        </div>

        {/* ÁREA INTERNA DA LOJA */}
        <div className="mockup-store-canvas">
          {/* BLOCO 2: Cabeçalho da Loja */}
          <div className="mockup-store-header mockup-anim-step-2">
            <div className="mockup-store-logo">
              <span className="mockup-logo-badge">LOJA</span>
              <span className="mockup-logo-line" />
            </div>
            <div className="mockup-store-nav">
              <span className="mockup-nav-item active" />
              <span className="mockup-nav-item" />
            </div>
            <div className="mockup-store-cart">
              <ShoppingCart size={19} />
              <span className="mockup-cart-badge" />
            </div>
          </div>

          {/* BLOCO 3: Vitrine / Hero Banner da Loja */}
          <div className="mockup-store-hero mockup-anim-step-3">
            <div className="mockup-hero-copy">
              <span className="mockup-wireframe-tag" />
              <div className="mockup-wireframe-title" />
              <div className="mockup-wireframe-sub" />
              <div className="mockup-store-cta">Comprar</div>
            </div>
            <div className="mockup-hero-media">
              <ImageIcon size={38} className="mockup-media-icon" />
            </div>
          </div>

          {/* BLOCO 4: Grade de Três Produtos */}
          <div className="mockup-products-grid mockup-anim-step-4">
            <div className="mockup-product-card">
              <div className="mockup-product-thumb">
                <ImageIcon size={24} className="mockup-thumb-icon" />
              </div>
              <div className="mockup-product-title-bar" />
              <div className="mockup-product-price-bar" />
            </div>

            <div className="mockup-product-card">
              <div className="mockup-product-thumb">
                <ImageIcon size={24} className="mockup-thumb-icon" />
              </div>
              <div className="mockup-product-title-bar" />
              <div className="mockup-product-price-bar" />
            </div>

            <div className="mockup-product-card">
              <div className="mockup-product-thumb">
                <ImageIcon size={24} className="mockup-thumb-icon" />
              </div>
              <div className="mockup-product-title-bar" />
              <div className="mockup-product-price-bar" />
            </div>
          </div>

          {/* BLOCO 5: Rodapé de Checkout Seguro */}
          <div className="mockup-checkout-bar mockup-anim-step-5">
            <div className="mockup-checkout-trust">
              <Lock size={16} className="mockup-trust-icon" />
              <span className="mockup-trust-label">Pagamento Seguro</span>
            </div>
            <div className="mockup-checkout-btn">Finalizar Pedido</div>
          </div>
        </div>
      </div>
    </div>
  );
}
