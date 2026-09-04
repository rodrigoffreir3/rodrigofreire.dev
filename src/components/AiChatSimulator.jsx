import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, CheckCheck, Sparkles, RefreshCw, User } from 'lucide-react';

const INITIAL_MESSAGES = [
  {
    sender: 'bot',
    text: 'Olá! Sou o Assistente Inteligente da RF Tech. Como posso ajudar sua empresa hoje?',
    time: '10:00'
  },
  {
    sender: 'user',
    text: 'Vocês têm o sistema para restaurante com comanda no celular e tela na cozinha?',
    time: '10:01'
  },
  {
    sender: 'bot',
    text: 'Sim! Nosso módulo Food Service conecta o celular do garçom diretamente ao painel KDS da cozinha e à impressora de pedidos. Sem papel e sem erro de lançamento. Deseja agendar uma demonstração rápida?',
    time: '10:01'
  }
];

const PRESET_CONVERSATIONS = {
  estoque: [
    { sender: 'user', text: 'Tem o produto em estoque na filial centro?', time: '10:03' },
    { sender: 'bot', text: 'Consultando o ERP em tempo real... 🔍 Temos 18 unidades disponíveis na filial Centro e 45 no depósito principal! Deseja reservar?', time: '10:03' }
  ],
  boleto: [
    { sender: 'user', text: 'Pode me mandar a 2ª via do boleto deste mês?', time: '10:04' },
    { sender: 'bot', text: 'Localizei sua fatura nº 8492. O código de barras e o QR Code PIX já foram gerados. Vencimento: amanhã. Posso enviar o PDF?', time: '10:04' }
  ],
  ia: [
    { sender: 'user', text: 'Como a inteligência artificial ajuda no atendimento da minha loja?', time: '10:05' },
    { sender: 'bot', text: 'Eu compreendo mensagens em texto ou áudio natural, tiro dúvidas de catálogo, qualifico o cliente e integro com seu ERP para registrar vendas 24 horas por dia!', time: '10:05' }
  ]
};

export default function AiChatSimulator() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const newMsg = {
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Resposta inteligente simulada
    setTimeout(() => {
      let botReply = "Entendido! O nosso sistema integra essa rotina diretamente ao seu fluxo de trabalho. Deseja que um consultor entre em contato para detalhar?";
      
      const lower = text.toLowerCase();
      if (lower.includes('preço') || lower.includes('quanto custa') || lower.includes('valor')) {
        botReply = "Nossos planos são modulares conforme o tamanho da sua operação. Você pode começar com o essencial e expandir conforme cresce!";
      } else if (lower.includes('estoque') || lower.includes('produto')) {
        botReply = "O módulo de estoque monitora saldo mínimo, validade e ponto de reposição com alerta automático no seu WhatsApp!";
      } else if (lower.includes('nota') || lower.includes('fiscal')) {
        botReply = "Nosso emissor fiscal gera NF-e, NFC-e e MDF-e em segundos com envio automático dos XMLs para a contabilidade.";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: botReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 1200);
  };

  const loadPreset = (key) => {
    const preset = PRESET_CONVERSATIONS[key];
    if (!preset) return;
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, ...preset]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="ai-chat-simulator-card">
      {/* Header do Chat */}
      <div className="ai-chat-header">
        <div className="ai-chat-avatar">
          <Bot size={22} color="#00F5D4" />
          <span className="online-dot" />
        </div>
        <div className="ai-chat-info">
          <strong>Assistente IA Corporativo</strong>
          <span><Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} />Online 24/7 · Linguagem Natural (NLP)</span>
        </div>
        <button
          onClick={() => setMessages(INITIAL_MESSAGES)}
          className="ai-chat-reset-btn"
          title="Reiniciar Simulação"
        >
          <RefreshCw size={14} />
        </button>
      </div>

      {/* Sugestões Rápidas */}
      <div className="ai-chat-presets">
        <span>Testar cenários:</span>
        <button onClick={() => loadPreset('estoque')} type="button">📦 Consulta de Estoque</button>
        <button onClick={() => loadPreset('boleto')} type="button">📄 2ª Via de Fatura</button>
        <button onClick={() => loadPreset('ia')} type="button">🤖 Atendimento 24/7</button>
      </div>

      {/* Corpo de Mensagens */}
      <div className="ai-chat-body">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`ai-chat-bubble ${msg.sender === 'user' ? 'bubble-user' : 'bubble-bot'}`}
          >
            <div className="bubble-content">
              <p>{msg.text}</p>
              <div className="bubble-meta">
                <span>{msg.time}</span>
                {msg.sender === 'user' && <CheckCheck size={14} className="bubble-check" />}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="ai-chat-bubble bubble-bot typing-bubble">
            <span className="typing-dot" />
            <span className="typing-dot" />
            <span className="typing-dot" />
          </div>
        )}
        <div ref={chatBottomRef} />
      </div>

      {/* Input de Mensagem */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="ai-chat-input-bar"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Digite uma mensagem para simular a IA..."
          className="ai-chat-input"
        />
        <button
          type="submit"
          className="ai-chat-send-btn"
          disabled={!inputText.trim()}
          aria-label="Enviar"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
