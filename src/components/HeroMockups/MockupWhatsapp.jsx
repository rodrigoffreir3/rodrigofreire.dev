import React from 'react';
import { Bot, Phone, MoreVertical, Send, CheckCheck } from 'lucide-react';

/**
 * MockupWhatsapp — SPEC-SITE-007 RF-1 (Mockup 4)
 * Automação de WhatsApp: tela de smartphone, mensagens alternadas, respostas rápidas e digitação contínua.
 */
export default function MockupWhatsapp({ isActive = true }) {
  const animClass = isActive ? 'anim-active' : '';

  return (
    <div className={`hero-mockup-window mockup-type-whatsapp ${animClass}`} aria-hidden="true">
      {/* Moldura do Celular */}
      <div className="mockup-phone-frame">
        {/* Notch / Barra Superior do Celular */}
        <div className="mockup-phone-notch-bar">
          <span className="mockup-phone-time">09:41</span>
          <div className="mockup-phone-speaker" />
          <div className="mockup-phone-icons">
            <span className="mockup-phone-dot" />
          </div>
        </div>

        {/* BLOCO 1: Cabeçalho do Chat WhatsApp */}
        <div className="mockup-wa-header mockup-anim-step-1">
          <div className="mockup-wa-contact">
            <div className="mockup-wa-avatar">
              <Bot size={16} />
            </div>
            <div className="mockup-wa-info">
              <span className="mockup-wa-name">Atendimento Automático</span>
              <span className="mockup-wa-status">
                <span className="mockup-wa-status-dot" /> Online agora
              </span>
            </div>
          </div>
          <div className="mockup-wa-actions">
            <Phone size={15} className="mockup-wa-action-icon" />
            <MoreVertical size={15} className="mockup-wa-action-icon" />
          </div>
        </div>

        {/* ÁREA DE CONVERSA (CHAT THREAD) */}
        <div className="mockup-wa-canvas">
          {/* Tag de Data */}
          <div className="mockup-wa-date-pill">Hoje</div>

          {/* BLOCO 2: Mensagem Recebida do Cliente (Esquerda) */}
          <div className="mockup-wa-bubble inbound mockup-anim-step-2">
            <div className="mockup-wa-line" style={{ width: '85%' }} />
            <div className="mockup-wa-line short" style={{ width: '55%' }} />
            <span className="mockup-wa-timestamp">09:40</span>
          </div>

          {/* BLOCO 3: Resposta Automática da Empresa (Direita) */}
          <div className="mockup-wa-bubble outbound mockup-anim-step-3">
            <div className="mockup-wa-line white" style={{ width: '90%' }} />
            <div className="mockup-wa-line white" style={{ width: '70%' }} />
            <div className="mockup-wa-meta">
              <span className="mockup-wa-timestamp white">09:40</span>
              <CheckCheck size={13} className="mockup-wa-check" />
            </div>
          </div>

          {/* BLOCO 4: Segunda Resposta com 3 Botões Rápidos (Direita) */}
          <div className="mockup-wa-bubble outbound options-card mockup-anim-step-4">
            <div className="mockup-wa-line white" style={{ width: '80%' }} />
            <div className="mockup-wa-quick-options">
              <div className="mockup-wa-option-btn">
                <span className="mockup-wa-opt-dot" />
                <span className="mockup-wa-opt-text">Ver catálogo de produtos</span>
              </div>
              <div className="mockup-wa-option-btn">
                <span className="mockup-wa-opt-dot" />
                <span className="mockup-wa-opt-text">Horários de atendimento</span>
              </div>
              <div className="mockup-wa-option-btn">
                <span className="mockup-wa-opt-dot" />
                <span className="mockup-wa-opt-text">Falar com atendente</span>
              </div>
            </div>
            <div className="mockup-wa-meta">
              <span className="mockup-wa-timestamp white">09:41</span>
              <CheckCheck size={13} className="mockup-wa-check" />
            </div>
          </div>

          {/* BLOCO 5: Indicador de Digitando Ativo */}
          <div className="mockup-wa-typing-indicator mockup-anim-step-5">
            <span className="mockup-typing-dot dot-1" />
            <span className="mockup-typing-dot dot-2" />
            <span className="mockup-typing-dot dot-3" />
          </div>
        </div>

        {/* Barra de Entrada / Digitação */}
        <div className="mockup-wa-input-bar">
          <div className="mockup-wa-input-pill">
            <span className="mockup-wa-placeholder" />
          </div>
          <div className="mockup-wa-send-btn">
            <Send size={14} />
          </div>
        </div>
      </div>
    </div>
  );
}
