// =============================================================================
// RODRIGO FREIRE TECH · DADOS CORPORATIVOS & CATÁLOGO DE SOLUÇÕES EMPRESARIAIS
// =============================================================================

export const DEFAULT_HOME_SETTINGS = {
  bg_image_url: "",
  bg_image_size: "cover",
  bg_image_repeat: "no-repeat",
  overlay_color: "rgba(11, 74, 79, 0.08)",
  
  hero_char_url: "",
  hero_char_position: "bottom-right",
  hero_char_size: "380px",
  hero_char_opacity: 1.0,
  
  secondary_bg_url: "",
  secondary_bg_position: "bottom-center",
  secondary_bg_size: "100%",
  secondary_bg_opacity: 0.9,
  
  content_has_border: true,
  content_border_color: "rgba(11, 74, 79, 0.14)",
  content_bg_color: "rgba(248, 250, 252, 0.78)",
  content_blur_level: 20,
  content_border_radius: "24px",
  
  // Paleta SaaS Moderno
  primary_color: "#0B4A4F",       // Dark Teal (Profundo e sério)
  accent_color: "#00F5D4",        // Cyan Teal Neon (Ação / Destaque)
  bg_page: "#F8FAFC",             // Off-White / Gelo
  bg_page_subtle: "#E2E8F0",      // Cinza UI
  text_heading_color: "#0F172A",  // Azul da Noite
  text_body_color: "#334155"
};

export const DEFAULT_PROFILE = {
  full_name: "Rodrigo Freire",
  company_name: "Rodrigo Freire Tech",
  tagline: "Software de Gestão Empresarial, Inteligência Artificial e Automação de Processos",
  lead_bio: "Elimine o caos das planilhas e a perda invisível de margem. Oferecemos ERP integrado, frente de caixa com PIX, automações com IA e bots de WhatsApp com linguagem natural para sua empresa crescer com visão de dono.",
  about_text: "Somos uma empresa de engenharia de software e tecnologia focada em resolver os gargalos reais de negócios comerciais, industriais e de serviços. Desenvolvemos soluções completas: do ERP de gestão com controle rigoroso de estoque e emissão fiscal à vanguarda da inteligência artificial generativa aplicada a atendimentos 24/7 e automação de rotinas.",
  whatsapp_number: "5569992782919",
  inpi_record: "INPI Nº 512025006506-0",
  avatar_url: "",
  email: "contato@rodrigofreire.dev",
  github_url: "https://github.com/rodrigoffreir3",
  linkedin_url: ""
};

// 12 SERVIÇOS & SOLUÇÕES CORPORATIVAS
export const DEFAULT_SERVICES = [
  {
    id: "sistema-erp",
    category: "erp",
    icon: "LayoutDashboard",
    tag: "GESTÃO INTEGRADA",
    title: "Sistema ERP para Gestão Empresarial",
    short_desc: "Visão de dono em tempo real: vendas, estoque, compras e financeiro em um só ecossistema.",
    description: "Centralize faturamento, contas a pagar/receber, compras, fornecedores e indicadores vitais. Diga adeus às planilhas desconexas e ganhe previsibilidade para tomar decisões com dados consolidados.",
    price_tag: "Sob Consulta",
    highlights: ["Indicadores em tempo real", "Controle de margem de lucro", "Multi-filiais e relatórios"]
  },
  {
    id: "pdv-pix",
    category: "pdv",
    icon: "Zap",
    tag: "FRENTE DE CAIXA",
    title: "PDV com PIX Dinâmico & TEF Integrado",
    short_desc: "Venda rápida no balcão: código de barras, TEF e QR Code PIX gerado diretamente na tela.",
    description: "Acelere a fila do caixa. O QR Code PIX é gerado no monitor com valor exato, sem o operador digitar valores na maquininha. Confirmação instantânea do recebimento na tela e baixa automática.",
    price_tag: "Sob Consulta",
    highlights: ["QR Code dinâmico na tela", "Sem digitação de maquininha", "Compatível com balanças e leitores"]
  },
  {
    id: "emissor-fiscal",
    category: "fiscal",
    icon: "FileText",
    tag: "FISCAL COMPLETO",
    title: "Emissor Fiscal Automatizado (NF-e / NFC-e / MDF-e)",
    short_desc: "Emissão simplificada e sem dor de cabeça, em conformidade com as exigências da SEFAZ.",
    description: "Emita notas fiscais de venda (NFC-e), notas grandes (NF-e), notas de frete e transporte (MDF-e) e notas de serviço (NFS-e). Armazenamento em nuvem dos arquivos XML e envio direto para contabilidade.",
    price_tag: "Sob Consulta",
    highlights: ["NF-e, NFC-e, NFS-e e MDF-e", "Conexão direta SEFAZ", "Envio automático para o contador"]
  },
  {
    id: "estoque-balanco",
    category: "erp",
    icon: "Boxes",
    tag: "LOGÍSTICA & ESTOQUE",
    title: "Controle e Balanço Inteligente de Estoque",
    short_desc: "Evite perdas e produtos vencidos: ponto de pedido, código de barras e inventário ágil.",
    description: "Monitore entrada e saída com leitor, controle lotes e validades, crie etiquetas personalizadas para gôndolas e receba alertas de reposição antes que o produto falte para o cliente.",
    price_tag: "Sob Consulta",
    highlights: ["Controle de validade por lote", "Geração de etiquetas de código de barras", "Alerta de estoque mínimo"]
  },
  {
    id: "gestao-financeira",
    category: "erp",
    icon: "TrendingUp",
    tag: "FINANCEIRO",
    title: "Gestão Financeira & Conciliação Bancária",
    short_desc: "Fluxo de caixa diário, dedução automática de taxas de cartão e DRE simplificado.",
    description: "Saiba exatamente para onde vai cada centavo. Faça conciliação bancária, emita boletos integrados sem entrar no portal do banco e acompanhe vendas à vista, a prazo e inadimplência.",
    price_tag: "Sob Consulta",
    highlights: ["Dedução real de taxas de cartão", "Emissão de boletos bancários", "Previsão de fluxo de caixa"]
  },
  {
    id: "food-service",
    category: "segmento",
    icon: "UtensilsCrossed",
    tag: "FOOD SERVICE",
    title: "Comanda Digital & Gestão para Restaurantes",
    short_desc: "Do celular do garçom direto para o display da cozinha, sem papel solto e sem confusão.",
    description: "Gerencie mesas, comandas individuais e delivery. O garçom lança o pedido no smartphone, a cozinha recebe na tela ou na impressora térmica e o caixa fecha a mesa com agilidade e divisão de contas.",
    price_tag: "Sob Consulta",
    highlights: ["Comanda mobile por mesa", "Painel KDS para cozinha", "Fechamento parcial de contas"]
  },
  {
    id: "logistica-romaneio",
    category: "erp",
    icon: "Truck",
    tag: "DISTRIBUIÇÃO",
    title: "Romaneio de Carga & Roteirização de Entregas",
    short_desc: "Controle de expedição, montagem de cargas e força de vendas externa para distribuidoras.",
    description: "Organize pedidos por rota, gere romaneios consolidados e acompanhe a equipe externa de vendedores com app de vendas offline que sincroniza pedidos assim que encontra conexão.",
    price_tag: "Sob Consulta",
    highlights: ["Força de vendas no celular", "Organização por roteiro de entrega", "Emissão em lote de faturas"]
  },
  {
    id: "ponto-eletronico",
    category: "rh",
    icon: "Clock",
    tag: "RH & PONTO",
    title: "Ponto Digital com Selfie e Geolocalização GPS",
    short_desc: "Controle de jornada moderno sem relógio físico caro, conforme a Portaria 671 do MTE.",
    description: "Registro de ponto rápido pelo navegador ou smartphone com foto selfie e validação de localização geográfica. Relatórios automáticos de horas extras, banco de horas, intervalos e faltas.",
    price_tag: "Sob Consulta",
    highlights: ["Portaria 671 MTE homologada", "Foto com anti-fraude e GPS", "Espelho de ponto para contabilidade"]
  },
  {
    id: "loja-virtual",
    category: "software",
    icon: "ShoppingCart",
    tag: "E-COMMERCE",
    title: "Loja Virtual & Catálogo Digital Integrado",
    short_desc: "Seus produtos na internet com estoque, preços e pedidos sincronizados ao seu ERP.",
    description: "Venda online 24h sem risco de vender produto que já acabou na loja física. Catálogo interativo com checkout transparente, cálculo de frete e envio do pedido direto para expedição.",
    price_tag: "Sob Consulta",
    highlights: ["Estoque sincronizado em tempo real", "Checkout PIX e Cartão", "Catálogo responsivo mobile"]
  },
  {
    id: "software-demanda",
    category: "software",
    icon: "Code2",
    tag: "SOB MEDIDA",
    title: "Desenvolvimento de Software & Aplicativos Sob Demanda",
    short_desc: "Sistemas web exclusivos, portais corporativos e apps mobile para processos únicos.",
    description: "Quando nenhum software pronto do mercado atende à particularidade da sua operação, nossa equipe de engenharia desenha a arquitetura, prototipa, programa e integra a solução feita sob medida para você.",
    price_tag: "Sob Consulta",
    highlights: ["Arquitetura escalável em nuvem", "APIs e integrações com legados", "Apps nativos iOS & Android"]
  },
  {
    id: "ia-automacao",
    category: "ia",
    icon: "BrainCircuit",
    tag: "INOVAÇÃO & IA",
    title: "Automação e Treinamento de Inteligência Artificial",
    short_desc: "Agentes autônomos para rotinas operacionais e capacitação in-company em IA generativa.",
    description: "Implementamos agentes de IA que leem notas, conferem contratos, processam documentos e cruzam dados sem intervenção humana. Oferecemos também treinamento prático para sua equipe extrair produtividade máxima de ferramentas de IA.",
    price_tag: "Sob Consulta",
    highlights: ["Agentes de triagem de dados", "Fine-tuning com regras do seu negócio", "Treinamentos práticos in-company"]
  },
  {
    id: "whatsapp-bot-nlp",
    category: "ia",
    icon: "Bot",
    tag: "IA CONVERSACIONAL",
    title: "WhatsApp Bot com Linguagem Natural (NLP)",
    short_desc: "Atendimento humanizado 24/7 com IA que entende o cliente, consulta o ERP e vende.",
    description: "Esqueça robôs travados que só aceitam números ('digite 1 para...'). Nosso bot com inteligência artificial compreende mensagens em texto ou áudio, consulta estoque, emite 2ª via de boletos, agenda reuniões e fecha vendas.",
    price_tag: "Sob Consulta",
    highlights: ["Conversação natural como humano", "Integração profunda ao banco de dados", "Transbordo suave para atendentes"]
  }
];

// SEGMENTOS DE MERCADO ATENDIDOS
export const DEFAULT_SEGMENTS = [
  {
    id: "panificadoras",
    title: "Padarias & Confeitarias",
    desc: "Controle de ficha técnica de receitas, perdas de insumos, balcão ágil com PIX e encomendas antecipadas."
  },
  {
    id: "construcao",
    title: "Materiais de Construção",
    desc: "Orçamentos técnicos para obras, romaneio de carga por canteiro, crediário próprio e emissão de notas fiscais."
  },
  {
    id: "restaurantes",
    title: "Bares & Restaurantes",
    desc: "Comanda digital por mesa, integração direta com telão da cozinha, divisão de contas e controle de delivery."
  },
  {
    id: "supermercados",
    title: "Supermercados & Mercados",
    desc: "Frente de caixa rápida com leitor de código de barras, balança integrada, controle de validade e TV de ofertas."
  },
  {
    id: "roupas",
    title: "Lojas de Roupas & Calçados",
    desc: "Controle por grade (cor, tamanho e modelo), etiquetas de código de barras, promoções e crediário da loja."
  },
  {
    id: "distribuidoras",
    title: "Atacados & Distribuidoras",
    desc: "Força de vendas externa no celular, romaneio e rotas de entrega, múltiplos estoques e faturamento em lote."
  },
  {
    id: "oficinas",
    title: "Oficinas Mecânicas & Autopeças",
    desc: "Ordem de serviço completa por placa/veículo, histórico de manutenções, peças aplicadas e comissão de mecânicos."
  },
  {
    id: "farmacias",
    title: "Farmácias & Cosméticos",
    desc: "Controle rigoroso de lote e data de validade, venda ágil no balcão e conferência de entradas via XML de compra."
  }
];

// AS 5 DORES DO EMPRESÁRIO
export const DEFAULT_PAINS = [
  {
    title: "Estoque Desregulado",
    desc: "Comprar produto que já tem em excesso ou perder vendas porque o item em alta acabou sem ninguém perceber."
  },
  {
    title: "Caixa sem Visão Real",
    desc: "Vender muito no mês, mas chegar no fechamento sem saber para onde o dinheiro foi ou qual o lucro líquido real."
  },
  {
    title: "Atendimento Lento no WhatsApp",
    desc: "Clientes esperando horas por uma resposta comercial ou orçamentos simples enquanto a concorrência responde em 1 minuto."
  },
  {
    title: "Retrabalho com Notas e Tributos",
    desc: "Horas perdidas redigitando notas fiscais, medo de multas da SEFAZ ou confusão no fechamento contábil mensal."
  },
  {
    title: "Processos Amarrados em Planilhas",
    desc: "Depender de planilhas de Excel que corrompem, desatualizam ou que só uma pessoa da empresa sabe mexer."
  }
];

// 4 PASSOS DA METODOLOGIA
export const DEFAULT_STEPS = [
  {
    step: "01",
    title: "Diagnóstico da Operação",
    desc: "Mapeamos como sua empresa compra, vende, estoca, atende e fecha o financeiro para identificar os vazamentos de receita."
  },
  {
    step: "02",
    title: "Parametrização & Implantação",
    desc: "Configuramos o ERP e os módulos na medida da sua empresa, importando seus produtos, clientes e tabelas de preço."
  },
  {
    step: "03",
    title: "Capacitação da Equipe",
    desc: "Treinamos seus colaboradores no balcão, no estoque, no financeiro e no atendimento para dominarem o sistema na rotina."
  },
  {
    step: "04",
    title: "Acompanhamento & Evolução",
    desc: "Suporte consultivo e contínuo para garantir que seus indicadores estejam sempre precisos e seu negócio pronto para crescer."
  }
];

// PERGUNTAS FREQUENTES (FAQ)
export const DEFAULT_FAQS = [
  {
    q: "Como funciona a implantação do sistema na minha empresa?",
    a: "Nossa equipe realiza uma implantação assistida: mapeamos seu fluxo, migramos seus cadastros existentes (produtos, fornecedores, clientes), configuramos o ambiente e treinamos seus funcionários presencialmente ou por vídeo chamada dedicada."
  },
  {
    q: "O que é o WhatsApp Bot com Linguagem Natural e como ele se conecta ao ERP?",
    a: "Diferente dos bots antigos baseados em 'menu numérico', nosso bot utiliza inteligência artificial avançada (LLMs) para entender qualquer pergunta digitada ou gravada em áudio pelo cliente. Ele é conectado via API segura ao seu banco de dados para consultar estoque, enviar código PIX, emitir 2ª via de boleto ou agendar serviços 24 horas por dia."
  },
  {
    q: "Preciso trocar de computador ou comprar servidores caros?",
    a: "Não. Nossas soluções operam com tecnologia web moderna em nuvem com alta disponibilidade e baixo consumo de máquina. Computadores convencionais de balcão ou escritório rodam perfeitamente."
  },
  {
    q: "E se a internet cair, consigo continuar vendendo no PDV?",
    a: "Sim! Nosso módulo de frente de caixa e força de vendas possui modo de contingência offline, permitindo emitir pedidos e registrar vendas que são sincronizadas automaticamente assim que o sinal retorna."
  },
  {
    q: "Como solicito uma demonstração ou orçamento?",
    a: "Basta clicar em qualquer botão de 'Solicitar Diagnóstico' ou 'Falar no WhatsApp'. Você conversará diretamente com nossa equipe técnica que entenderá seu segmento e montará uma proposta personalizada sem compromisso."
  }
];

// CASES & PROJETOS DO PORTFÓLIO
export const DEFAULT_PROJECTS = [
  {
    id: 1,
    slug: "imunno-system",
    title: "Imunno System",
    badge: "Segurança & IA · INPI 512025006506-0",
    summary: "Sistema imunológico para servidores Linux que neutraliza ataques e invasões em tempo real. Utiliza a arquitetura HADES para isolar o atacante em um labirinto de dados falsos sem alertá-lo da detecção.",
    problem_description: "Servidores em nuvem sofrem varreduras e tentativas de invasão a cada segundo. Os antivírus e firewalls tradicionais costumam agir tarde demais ou apenas derrubam conexões, permitindo que invasores continuem tentando outras brechas. O Imunno System resolve isso interceptando as chamadas suspeitas direto no Kernel Linux via eBPF e redirecionando o invasor para uma cópia falsa e monitorada do sistema.",
    technical_details: "Desenvolvido com Golang e sondas de baixo nível eBPF (Ring 0) acopladas ao kernel Linux. A telemetria é transmitida via gRPC para um coletor assíncrono que processa anomalias com algoritmos de Isolation Forest. Quando uma ameaça atinge o limiar crítico, o processo é enjaulado em cgroups v2 e conectado à arquitetura de decepção HADES.",
    cover_image: "/images/projetos/imunno-system/imunno-hero.png",
    hero_image: "/images/projetos/imunno-system/imunno-hero.png",
    gallery: [
      { image: "/images/projetos/imunno-system/imunno-dashboard.png", caption: "Painel de telemetria e estado da frota" },
      { image: "/images/projetos/imunno-system/imunno-arquitetura.png", caption: "Pipeline de coleta e processamento gRPC" },
      { image: "/images/projetos/imunno-system/imunno-alerta-tempo-real.png", caption: "Alerta em tempo real e contenção de processos" }
    ],
    tags: ["eBPF Ring 0", "Golang gRPC", "Cgroups v2", "Machine Learning"],
    github_url: "https://github.com/rodrigoffreir3",
    live_url: "",
    is_featured: true,
    display_order: 1
  },
  {
    id: 2,
    slug: "creare-labs",
    title: "CreareLabs",
    badge: "Hardware & IoT · WebAssembly",
    summary: "Plataforma interativa para ensino e desenvolvimento de eletrônica. Permite simular circuitos na web com WebAssembly e gravar placas ESP32 via cabo USB ou Bluetooth sem instalar programas no computador.",
    problem_description: "Aprender robótica e programar placas de hardware costuma exigir a instalação de drivers complicados, softwares pesados e configurações que travam computadores simples de escolas e estudantes. O CreareLabs roda 100% no navegador sem instalar absolutamente nada.",
    technical_details: "Construído com React, TypeScript e WebAssembly (Pyodide) para execução isolada de código Python no cliente. A comunicação física com placas ESP32 e microcontroladores utiliza as APIs modernas de WebSerial e WebBluetooth do navegador, com geração de código visual via Monaco Editor e Blockly.",
    cover_image: "/images/projetos/creare-labs/creare-hero.png",
    hero_image: "/images/projetos/creare-labs/creare-hero.png",
    gallery: [
      { image: "/images/projetos/creare-labs/creare-simulador.png", caption: "Simulador de circuitos com execução Pyodide" },
      { image: "/images/projetos/creare-labs/creare-comissionamento-esp32.png", caption: "Gravação e configuração via WebSerial" },
      { image: "/images/projetos/creare-labs/creare-editor-blocos.png", caption: "Editor visual de blocos com geração de código" }
    ],
    tags: ["WebAssembly", "WebSerial API", "ESP32 / BLE", "Monaco Editor"],
    github_url: "https://github.com/rodrigoffreir3",
    live_url: "",
    is_featured: true,
    display_order: 2
  },
  {
    id: 3,
    slug: "syscallcage",
    title: "SysCallCage",
    badge: "Segurança no Kernel · Rust",
    summary: "Ferramenta de contenção no kernel do Linux para agentes de IA e processos autônomos. Impede acessos indevidos a arquivos e conexões de rede não autorizadas em tempo real.",
    problem_description: "Agentes de inteligência artificial autônomos que executam código no servidor representam um risco caso sejam induzidos a rodar comandos maliciosos. O SysCallCage cria uma jaula preventiva no kernel, bloqueando chamadas perigosas antes que sejam executadas.",
    technical_details: "Desenvolvido em Rust utilizando a biblioteca Aya para carregar programas BPF LSM (Linux Security Module). Intercepta chamadas de sistema no ponto de entrada e aplica regras determinísticas em microssegundos com zero overhead de CPU.",
    cover_image: "/images/projetos/syscallcage/syscallcage-hero.png",
    hero_image: "/images/projetos/syscallcage/syscallcage-hero.png",
    gallery: [
      { image: "/images/projetos/syscallcage/syscallcage-terminal-doctor.png", caption: "Diagnóstico e validação de segurança no kernel" },
      { image: "/images/projetos/syscallcage/syscallcage-modo-sync.png", caption: "Modo síncrono preventivo com bloqueio em Ring 0" }
    ],
    tags: ["Rust", "BPF LSM", "Aya Framework", "Zero-Overhead"],
    github_url: "https://github.com/rodrigoffreir3/syscallcage",
    live_url: "",
    is_featured: false,
    display_order: 3
  },
  {
    id: 4,
    slug: "kernel-wsl2-bpf-plus",
    title: "Kernel WSL2 BPF Plus",
    badge: "Engenharia de Kernel · Microsoft WSL2",
    summary: "Kernel Linux customizado para Windows (WSL2) com suporte a BPF LSM compilado direto da fonte oficial da Microsoft, permitindo testes avançados de segurança no Windows.",
    problem_description: "Por padrão, o kernel Linux distribuído pela Microsoft no Windows WSL2 vem com módulos avançados de segurança LSM desativados, impossibilitando testes locais com eBPF LSM sem criar máquinas virtuais pesadas.",
    technical_details: "Compilação automatizada da árvore oficial WSL2-Linux-Kernel com as flags CONFIG_BPF_LSM, CONFIG_SECURITY_BPF e CONFIG_DEBUG_INFO_BTF habilitadas via Clang/LLVM.",
    cover_image: "/images/projetos/kernel-wsl2-bpf-plus/kernel-hero.png",
    hero_image: "/images/projetos/kernel-wsl2-bpf-plus/kernel-hero.png",
    gallery: [
      { image: "/images/projetos/kernel-wsl2-bpf-plus/kernel-doctor-lsm-ativo.png", caption: "BPF LSM ativo no WSL2" },
      { image: "/images/projetos/kernel-wsl2-bpf-plus/kernel-build-terminal.png", caption: "Build reprodutível da fonte oficial Microsoft" }
    ],
    tags: ["Linux Kernel", "WSL2", "BPF LSM", "CONFIG_BPF_LSM"],
    github_url: "https://github.com/rodrigoffreir3",
    live_url: "",
    is_featured: false,
    display_order: 4
  },
  {
    id: 5,
    slug: "greentoken",
    title: "GreenToken",
    badge: "FinOps & IA · Observabilidade",
    summary: "Monitor de consumo energético e FinOps para servidores de IA. Mede a energia gasta em Joules e Watts nos sensores da CPU e GPU para calcular o custo exato por token gerado.",
    problem_description: "Empresas gastam milhares de dólares em servidores de inteligência artificial sem saber exatamente quanta energia e custo financeiro cada requisição ou modelo consome em tempo real.",
    technical_details: "Mede o consumo lendo registradores MSR via Intel/AMD RAPL e a biblioteca NVML da NVIDIA em Rust. Associa os Joules consumidos ao fluxo de tokens gerados e expõe métricas em tempo real para painéis de FinOps.",
    cover_image: "/images/projetos/greentoken/greentoken-hero.png",
    hero_image: "/images/projetos/greentoken/greentoken-hero.png",
    gallery: [
      { image: "/images/projetos/greentoken/greentoken-dashboard-metrica.png", caption: "Métricas de custo e consumo em Joules por token" },
      { image: "/images/projetos/greentoken/greentoken-grafico-consumo.png", caption: "Curva de consumo energético granular RAPL/NVML" }
    ],
    tags: ["Intel/AMD RAPL", "NVIDIA NVML", "Rust", "AI FinOps"],
    github_url: "https://github.com/rodrigoffreir3",
    live_url: "",
    is_featured: false,
    display_order: 5
  },
  {
    id: 6,
    slug: "appfitness",
    title: "AppFitness",
    badge: "Plataforma SaaS · Liquid Glass",
    summary: "Plataforma web para gestão de treinos e acompanhamento físico com interface mobile-first, foco em velocidade de carregamento e navegação ergonômica para alunos e treinadores.",
    problem_description: "Muitos aplicativos de academia são lentos, poluídos e difíceis de usar com uma mão durante o treino. O AppFitness foi projetado com ergonomia mobile-first e interface translúcida Liquid Glass para navegação instantânea.",
    technical_details: "Desenvolvido em React 19, TypeScript e Vite com design tokens otimizados para 60fps em smartphones, persistência offline com PWA e controle de treinos em tempo real.",
    cover_image: "/images/projetos/appfitness/appfitness-hero.png",
    hero_image: "/images/projetos/appfitness/appfitness-hero.png",
    gallery: [
      { image: "/images/projetos/appfitness/appfitness-landing-mobile.png", caption: "Experiência mobile-first fluida a 60fps" },
      { image: "/images/projetos/appfitness/appfitness-dashboard-treinador.png", caption: "Dashboard do treinador para gestão de alunos" }
    ],
    tags: ["React 19", "TypeScript", "Vite", "PWA"],
    github_url: "https://github.com/rodrigoffreir3",
    live_url: "",
    is_featured: false,
    display_order: 6
  }
];

// ARTIGOS TÉCNICOS & BLOG
export const DEFAULT_POSTS = [
  {
    id: 1,
    slug: "ia-fisica",
    title: "A IA é Física: O Que Ninguém Te Conta Sobre o Custo Real dos Modelos",
    description: "Por trás de cada prompt e token gerado existe silício aquecendo, água evaporando e energia física sendo drenada da rede elétrica.",
    published_at: "2026-08-30",
    tags: ["Inteligência Artificial", "Hardware", "FinOps", "Eficiência"],
    cover_image: "/images/projetos/greentoken/greentoken-hero.png",
    content_markdown: `Quando a gente abre uma interface de chat e recebe uma resposta em dois segundos, é fácil esquecer que aquele texto não veio do éter. Ele veio de transistores de 3 nanômetros comutando a bilhões de ciclos por segundo, consumindo centenas de watts e gerando calor físico que precisa ser dissipado com galões de água em data centers.

### O Custo Invisível do Token

O mercado fala muito sobre o custo da API por milhão de tokens, mas quase ninguém mede o **custo termodinâmico**. Cada modelo tem uma curva de eficiência de acordo com a arquitetura:

1. **Modelos Densos**: Ativam todos os parâmetros a cada token gerado, mantendo a GPU em consumo máximo contínuo.
2. **Modelos Mixture of Experts (MoE)**: Roteiam o processamento apenas para os especialistas relevantes, reduzindo o calor e o consumo por inferência.

### Por que a Engenharia de Software Precisa Olhar pro Hardware

Não adianta construir agentes autônomos incríveis se o custo de computação torna a operação inviável. A observabilidade precisa descer até o hardware: ler registradores MSR de CPU, telemetria NVML de GPU e calcular se cada automação realmente compensa o consumo energético que gera.`
  },
  {
    id: 2,
    slug: "a-vaga-nao-e-mais-pra-quem-escreve-codigo",
    title: "A Vaga Não É Mais Pra Quem Escreve Código: O Novo Papel do Engenheiro",
    description: "Com IAs gerando código boilerplate em segundos, o valor do desenvolvedor migrou para arquitetura de sistemas, auditoria de segurança e resolução de problemas reais.",
    published_at: "2026-08-25",
    tags: ["Carreira", "Engenharia de Software", "IA", "Mercado"],
    cover_image: "/images/projetos/syscallcage/syscallcage-hero.png",
    content_markdown: `Escrever loops, estruturas CRUD e layouts básicos virou commodity. Qualquer modelo de linguagem moderno cospe 200 linhas de código funcional em menos de 10 segundos.

### Onde está o valor real agora?

1. **Arquitetura & Confiabilidade**: Saber como as peças se conectam, onde estão os pontos únicos de falha e como o sistema se comporta sob estresse.
2. **Segurança e Baixo Nível**: Entender o que acontece no sistema operacional quando o código roda. Como garantir que um agente de IA não comprometa o servidor?
3. **Visão de Negócio**: Traduzir requisitos confusos em softwares objetivos que gerem receita e economizem tempo de pessoas reais.`
  },
  {
    id: 3,
    slug: "acordos-bilionarios-chips-ia-mercado-ti",
    title: "Acordos Bilionários de Chips de IA e o Impacto no Mercado de TI",
    description: "A corrida armamentista por capacidade computacional e como a escassez de silício define o futuro das startups e grandes empresas.",
    published_at: "2026-08-20",
    tags: ["Mercado", "Semicondutores", "IA", "Infraestrutura"],
    cover_image: "/images/projetos/imunno-system/imunno-hero.png",
    content_markdown: `A geopolítica da tecnologia hoje não é sobre software livre versus proprietário. É sobre quem tem acesso físico às fundições de semicondutores e energia barata para alimentar clusters de servidores.

As grandes empresas estão garantindo contratos de fornecimento de energia nuclear e megawatts dedicados para manter suas operações de IA ativas. Para quem desenvolve produtos, a chave para os próximos anos será **eficiência**: fazer mais com modelos menores, locais e especializados.`
  }
];
