import React from 'react';
import { 
  Lock, LayoutDashboard, Package, ShoppingCart, Users, Settings, 
  TrendingUp, PackageCheck, AlertCircle, CheckCircle2, Plus 
} from 'lucide-react';

/**
 * MockupErp — SPEC-SITE-007 RF-1 (Mockup 5)
 * Sistema ERP & Painel Integrado: gestão centralizada, indicadores gráficos e tabela operacional.
 */
export default function MockupErp({ isActive = true }) {
  const animClass = isActive ? 'anim-active' : '';

  return (
    <div className={`hero-mockup-window mockup-type-erp ${animClass}`} aria-hidden="true">
      {/* BLOCO 1: Barra do Navegador */}
      <div className="mockup-browser-bar mockup-anim-step-1">
        <div className="mockup-window-controls">
          <span className="mockup-dot mockup-dot-red" />
          <span className="mockup-dot mockup-dot-yellow" />
          <span className="mockup-dot mockup-dot-green" />
        </div>
        <div className="mockup-address-bar">
          <Lock size={14} className="mockup-address-lock" />
          <span className="mockup-address-url">painel.empresa.interno</span>
        </div>
        <div className="mockup-browser-actions">
          <span className="mockup-browser-icon-pill" />
        </div>
      </div>

      {/* CORPO DO ERP: MENU LATERAL + CONTEÚDO */}
      <div className="mockup-erp-layout">
        {/* Barra Lateral de 5 Itens */}
        <aside className="mockup-erp-sidebar mockup-anim-step-2">
          <div className="mockup-erp-nav-item active">
            <LayoutDashboard size={16} />
            <span className="mockup-erp-nav-line" />
          </div>
          <div className="mockup-erp-nav-item">
            <Package size={16} />
            <span className="mockup-erp-nav-line" />
          </div>
          <div className="mockup-erp-nav-item">
            <ShoppingCart size={16} />
            <span className="mockup-erp-nav-line" />
          </div>
          <div className="mockup-erp-nav-item">
            <Users size={16} />
            <span className="mockup-erp-nav-line" />
          </div>
          <div className="mockup-erp-nav-item">
            <Settings size={16} />
            <span className="mockup-erp-nav-line" />
          </div>
        </aside>

        {/* Área Principal de Dados */}
        <main className="mockup-erp-main">
          {/* Cabeçalho do Painel com Botão de Ação */}
          <div className="mockup-erp-header mockup-anim-step-2">
            <div className="mockup-erp-title-group">
              <span className="mockup-erp-heading">Painel de Operações</span>
              <span className="mockup-erp-sub">Visão Geral Integrada</span>
            </div>
            <div className="mockup-erp-cta-btn">
              <Plus size={14} />
              <span>Novo Registro</span>
            </div>
          </div>

          {/* Linha de 4 Cartões de Indicador (KPIs) */}
          <div className="mockup-erp-kpi-grid mockup-anim-step-3">
            <div className="mockup-erp-kpi-card">
              <div className="mockup-kpi-header">
                <TrendingUp size={15} className="mockup-kpi-icon blue" />
              </div>
              <div className="mockup-kpi-bar" />
              <div className="mockup-kpi-bar short" />
            </div>

            <div className="mockup-erp-kpi-card">
              <div className="mockup-kpi-header">
                <PackageCheck size={15} className="mockup-kpi-icon green" />
              </div>
              <div className="mockup-kpi-bar" />
              <div className="mockup-kpi-bar short" />
            </div>

            <div className="mockup-erp-kpi-card">
              <div className="mockup-kpi-header">
                <AlertCircle size={15} className="mockup-kpi-icon yellow" />
              </div>
              <div className="mockup-kpi-bar" />
              <div className="mockup-kpi-bar short" />
            </div>

            <div className="mockup-erp-kpi-card">
              <div className="mockup-kpi-header">
                <CheckCircle2 size={15} className="mockup-kpi-icon blue" />
              </div>
              <div className="mockup-kpi-bar" />
              <div className="mockup-kpi-bar short" />
            </div>
          </div>

          {/* Tabela com Cabeçalho e Quatro Linhas de Dados Simulados */}
          <div className="mockup-erp-table-wrap mockup-anim-step-4">
            <div className="mockup-erp-table-head">
              <span className="mockup-th" style={{ width: '22%' }} />
              <span className="mockup-th" style={{ width: '38%' }} />
              <span className="mockup-th" style={{ width: '20%' }} />
              <span className="mockup-th" style={{ width: '12%' }} />
            </div>

            <div className="mockup-erp-table-body">
              <div className="mockup-erp-row">
                <span className="mockup-td-status green" />
                <span className="mockup-td" style={{ width: '35%' }} />
                <span className="mockup-td" style={{ width: '18%' }} />
                <span className="mockup-td-pill" />
              </div>

              <div className="mockup-erp-row">
                <span className="mockup-td-status blue" />
                <span className="mockup-td" style={{ width: '42%' }} />
                <span className="mockup-td" style={{ width: '22%' }} />
                <span className="mockup-td-pill" />
              </div>

              <div className="mockup-erp-row">
                <span className="mockup-td-status green" />
                <span className="mockup-td" style={{ width: '30%' }} />
                <span className="mockup-td" style={{ width: '16%' }} />
                <span className="mockup-td-pill" />
              </div>

              <div className="mockup-erp-row">
                <span className="mockup-td-status gray" />
                <span className="mockup-td" style={{ width: '38%' }} />
                <span className="mockup-td" style={{ width: '20%' }} />
                <span className="mockup-td-pill" />
              </div>
            </div>
          </div>

          {/* Rodapé do ERP */}
          <div className="mockup-erp-footer mockup-anim-step-5">
            <span className="mockup-erp-footer-dot" />
            <span className="mockup-erp-footer-text">Base de dados sincronizada em tempo real</span>
          </div>
        </main>
      </div>
    </div>
  );
}
