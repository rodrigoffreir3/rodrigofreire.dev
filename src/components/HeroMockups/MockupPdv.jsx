import React from 'react';
import { Store, Receipt, Check, ShoppingBag, Coffee, Package, Tag, Box, Sparkles } from 'lucide-react';

/**
 * MockupPdv — SPEC-SITE-007 RF-1 (Mockup 3)
 * Ponto de Venda (PDV) comercial: interface de tela cheia, agilidade de caixa e comanda gráfica.
 */
export default function MockupPdv({ isActive = true }) {
  const animClass = isActive ? 'anim-active' : '';

  return (
    <div className={`hero-mockup-window mockup-type-pdv ${animClass}`} aria-hidden="true">
      {/* BLOCO 1: Cabeçalho de Aplicativo Comercial (Sem navegador) */}
      <div className="mockup-pdv-appbar mockup-anim-step-1">
        <div className="mockup-pdv-brand">
          <div className="mockup-pdv-icon-badge">
            <Store size={16} />
          </div>
          <div className="mockup-pdv-title-group">
            <span className="mockup-pdv-station">Caixa 01 · Loja Modelo</span>
            <span className="mockup-pdv-sub">Terminal de Alta Velocidade</span>
          </div>
        </div>
        <div className="mockup-pdv-status-badge">
          <span className="mockup-pdv-status-dot" />
          <span>Caixa Aberto</span>
        </div>
      </div>

      {/* ÁREA INTERNA: GRID DE PRODUTOS + COMANDA LATERAL */}
      <div className="mockup-pdv-body">
        {/* BLOCO 2: Grade de 6 Botões Rápidos de Balcão */}
        <div className="mockup-pdv-catalog mockup-anim-step-2">
          <div className="mockup-pdv-search-bar">
            <span className="mockup-pdv-search-line" />
          </div>

          <div className="mockup-pdv-products-grid">
            <div className="mockup-pdv-product-btn">
              <Package size={20} className="mockup-pdv-btn-icon" />
              <span className="mockup-pdv-btn-title" />
              <span className="mockup-pdv-btn-price" />
            </div>

            <div className="mockup-pdv-product-btn active">
              <ShoppingBag size={20} className="mockup-pdv-btn-icon" />
              <span className="mockup-pdv-btn-title" />
              <span className="mockup-pdv-btn-price" />
            </div>

            <div className="mockup-pdv-product-btn">
              <Coffee size={20} className="mockup-pdv-btn-icon" />
              <span className="mockup-pdv-btn-title" />
              <span className="mockup-pdv-btn-price" />
            </div>

            <div className="mockup-pdv-product-btn">
              <Tag size={20} className="mockup-pdv-btn-icon" />
              <span className="mockup-pdv-btn-title" />
              <span className="mockup-pdv-btn-price" />
            </div>

            <div className="mockup-pdv-product-btn">
              <Box size={20} className="mockup-pdv-btn-icon" />
              <span className="mockup-pdv-btn-title" />
              <span className="mockup-pdv-btn-price" />
            </div>

            <div className="mockup-pdv-product-btn">
              <Sparkles size={20} className="mockup-pdv-btn-icon" />
              <span className="mockup-pdv-btn-title" />
              <span className="mockup-pdv-btn-price" />
            </div>
          </div>
        </div>

        {/* BLOCOS 3, 4 e 5: Comanda Lateral Gráfica e Botão Finalizar */}
        <div className="mockup-pdv-sidebar">
          {/* Cabeçalho da comanda */}
          <div className="mockup-pdv-ticket-header mockup-anim-step-3">
            <Receipt size={16} />
            <span>Comanda Eletrônica</span>
          </div>

          {/* 3 Linhas de Itens Adicionados (Bloco 4) */}
          <div className="mockup-pdv-ticket-items mockup-anim-step-4">
            <div className="mockup-ticket-row">
              <span className="mockup-ticket-bullet" />
              <span className="mockup-ticket-name" />
              <span className="mockup-ticket-value" />
            </div>
            <div className="mockup-ticket-row">
              <span className="mockup-ticket-bullet" />
              <span className="mockup-ticket-name short" />
              <span className="mockup-ticket-value" />
            </div>
            <div className="mockup-ticket-row">
              <span className="mockup-ticket-bullet" />
              <span className="mockup-ticket-name mid" />
              <span className="mockup-ticket-value" />
            </div>

            <div className="mockup-ticket-divider" />

            {/* Linhas de Totalização Gráfica */}
            <div className="mockup-ticket-total-row">
              <span className="mockup-ticket-total-label">Total:</span>
              <span className="mockup-ticket-total-bar" />
            </div>
          </div>

          {/* Botão de Finalização (Bloco 5) */}
          <div className="mockup-pdv-action-wrap mockup-anim-step-5">
            <div className="mockup-pdv-checkout-btn">
              <Check size={18} />
              <span>Finalizar Venda</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
