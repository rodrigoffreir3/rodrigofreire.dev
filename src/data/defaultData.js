// =============================================================================
// RODRIGO FREIRE TECH · DADOS CORPORATIVOS & CATÁLOGO DE SOLUÇÕES EMPRESARIAIS
// =============================================================================

export const DEFAULT_HOME_SETTINGS = {
  bg_image_url: "",
  bg_image_size: "cover",
  bg_image_repeat: "no-repeat",
  overlay_color: "transparent",
  
  hero_char_url: "",
  hero_char_position: "bottom-right",
  hero_char_size: "380px",
  hero_char_opacity: 1.0,
  
  secondary_bg_url: "",
  secondary_bg_position: "bottom-center",
  secondary_bg_size: "100%",
  secondary_bg_opacity: 0.9,
  
  content_has_border: false,
  content_border_color: "rgba(11, 74, 79, 0.12)",
  content_bg_color: "rgba(252, 252, 251, 0.65)",
  content_blur_level: 24,
  content_border_radius: "24px",
  
  // Paleta SaaS Moderno Crystal Glass
  primary_color: "#0B4A4F",       // Dark Teal (Profundo e sério)
  accent_color: "#00F5D4",        // Cyan Teal Neon (Ação / Destaque)
  bg_page: "#FCFCFB",             // Claude Chat Warm White
  bg_page_subtle: "#F0EFEA",      // Cinza Quente UI
  text_heading_color: "#0F172A",  // Azul da Noite
  text_body_color: "#3F4E50"
};

export const DEFAULT_PROFILE = {
  full_name: "Rodrigo Freire",
  company_name: "Rodrigo Freire Tech",
  tagline: "Desenvolvimento de Sistemas e Automações com Inteligência Artificial",
  lead_bio: "Elimine o caos das planilhas e a perda invisível de margem. Oferecemos ERP integrado, frente de caixa com PIX dinâmico, automações com IA e bots de WhatsApp com linguagem natural para sua empresa crescer com visão de dono.",
  about_text: "Somos uma empresa de soluções em tecnologia focada em resolver os gargalos reais de negócios comerciais, industriais e de serviços. Desenvolvemos soluções completas: do sistema de gestão com controle rigoroso de estoque e emissão fiscal à vanguarda da inteligência artificial aplicada ao atendimento 24 horas e automação de tarefas rotineiras.",
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
    a: "Diferente dos bots antigos baseados em 'menu numérico', nosso bot utiliza inteligência artificial avançada para entender qualquer pergunta digitada ou gravada em áudio pelo cliente. Ele é conectado de forma segura ao seu banco de dados para consultar estoque, enviar código PIX, emitir 2ª via de boleto ou agendar serviços 24 horas por dia."
  },
  {
    q: "Preciso trocar de computador ou comprar servidores caros?",
    a: "Não. Nossas soluções operam com tecnologia moderna em nuvem com alta disponibilidade e baixo consumo de máquina. Computadores convencionais de balcão ou escritório rodam perfeitamente."
  },
  {
    q: "E se a internet cair, consigo continuar vendendo no PDV?",
    a: "Sim! Nosso módulo de frente de caixa e força de vendas possui modo de contingência offline, permitindo emitir pedidos e registrar vendas que são sincronizadas automaticamente assim que o sinal retorna."
  },
  {
    q: "Como solicito uma demonstração ou orçamento?",
    a: "Basta clicar em qualquer botão de 'Solicitar Diagnóstico' ou 'Falar no WhatsApp'. Você conversará diretamente com nossa equipe que entenderá seu segmento e montará uma proposta personalizada sem compromisso."
  }
];

// CASES DE SUCESSO (LINGUAGEM 100% EMPRESARIAL, SEM JARGÃO TÉCNICO E SEM IMAGENS MOCK)
export const DEFAULT_PROJECTS = [
  {
    id: 1,
    slug: "imunno-system",
    title: "Imunno System",
    badge: "Blindagem de Dados & Defesa Empresarial",
    summary: "Sistema de defesa autônoma que bloqueia invasões e tentativas de roubo de dados comerciais em tempo real, sem interromper as vendas ou a rotina da sua empresa.",
    problem_description: "Empresas sofrem tentativas constantes de invasão para roubo de dados de clientes, chantagem ou sequestro de sistemas. Antivírus comuns costumam agir tarde demais, depois que a operação já foi paralisada.",
    technical_details: "O sistema atua como um escudo preventivo 24 horas por dia. Ao identificar qualquer movimentação suspeita, ele desvia o invasor imediatamente para um ambiente falso com dados fictícios, garantindo que suas contas bancárias, clientes e segredos de negócio permaneçam 100% protegidos.",
    cover_image: "",
    hero_image: "",
    gallery: [],
    tags: ["Segurança Empresarial", "Proteção de Dados", "Continuidade de Negócio", "Defesa Ativa"],
    github_url: "https://github.com/rodrigoffreir3",
    live_url: "",
    is_featured: true,
    display_order: 1
  },
  {
    id: 2,
    slug: "creare-labs",
    title: "CreareLabs",
    badge: "Capacitação Operacional & Simulação Digital",
    summary: "Plataforma prática para treinamento de equipes e simulação de automações comerciais direto pelo navegador, sem necessidade de instalar programas ou configurações demoradas.",
    problem_description: "Treinar novos funcionários em processos operacionais e máquinas inteligentes costuma exigir equipamentos caros, técnicos dedicados e muito tempo gasto com computadores travando.",
    technical_details: "Permite que qualquer colaborador pratique rotinas e simule o funcionamento de processos industriais e comerciais em qualquer computador simples com internet, acelerando o aprendizado e reduzindo erros no dia a dia da empresa.",
    cover_image: "",
    hero_image: "",
    gallery: [],
    tags: ["Treinamento de Equipes", "Simulação Interativa", "Produtividade", "Redução de Erros"],
    github_url: "https://github.com/rodrigoffreir3",
    live_url: "",
    is_featured: true,
    display_order: 2
  },
  {
    id: 3,
    slug: "syscallcage",
    title: "SysCallCage",
    badge: "Governança & Controle de Automações",
    summary: "Cofre digital que define regras inegociáveis para robôs e rotinas automáticas, garantindo que nenhum sistema execute pagamentos indevidos ou altere dados sem permissão.",
    problem_description: "Ao adotar automações digitais e inteligência artificial, muitos donos de empresas temem que um erro do sistema ou comando equivocado faça pagamentos errados ou apague registros fiscais cruciais.",
    technical_details: "Cria uma jaula de segurança em torno de cada automação. O robô só consegue executar estritamente o que foi aprovado pela diretoria, bloqueando desvios instantaneamente e gerando relatórios de conformidade para auditoria.",
    cover_image: "",
    hero_image: "",
    gallery: [],
    tags: ["Governança de Automação", "Prevenção de Fraudes", "Auditoria de Processos", "Segurança Financeira"],
    github_url: "https://github.com/rodrigoffreir3/syscallcage",
    live_url: "",
    is_featured: false,
    display_order: 3
  },
  {
    id: 4,
    slug: "kernel-wsl2-bpf-plus",
    title: "Estabilidade Operacional Contínua",
    badge: "Infraestrutura de Alto Desempenho",
    summary: "Estruturação de estações de trabalho e sistemas para eliminar travamentos, lentidão de computadores e garantir fluidez contínua na operação comercial.",
    problem_description: "Sistemas lentos e computadores travando causam estresse nos funcionários, demora no atendimento aos clientes e perda direta de vendas no balcão.",
    technical_details: "Otimização profunda do ambiente de trabalho da empresa para que sistemas de atendimento, bancos de dados e ferramentas operacionais rodem sem engasgos com resposta instantânea.",
    cover_image: "",
    hero_image: "",
    gallery: [],
    tags: ["Velocidade Operacional", "Estabilidade de Sistemas", "Eficiência no Atendimento", "Zero Travamentos"],
    github_url: "https://github.com/rodrigoffreir3",
    live_url: "",
    is_featured: false,
    display_order: 4
  },
  {
    id: 5,
    slug: "greentoken",
    title: "GreenToken — Auditoria & Redução de Custos",
    badge: "Auditoria Financeira & Corte de Desperdícios",
    summary: "Raio-X financeiro dos custos de servidores e tecnologia, identificando exatamente onde sua empresa está gastando dinheiro com serviços ociosos.",
    problem_description: "Empresas pagam mensalidades caras de servidores na nuvem e sistemas digitais todo mês sem entender exatamente para onde o dinheiro está indo ou onde é possível economizar.",
    technical_details: "Mede o consumo real de cada serviço em tempo real e calcula o custo exato por processo executado, permitindo que a diretoria corte custos desnecessários sem afetar a qualidade do serviço.",
    cover_image: "",
    hero_image: "",
    gallery: [],
    tags: ["Redução de Despesas", "Auditoria Financeira", "Eficiência de Custos", "Previsibilidade de Gastos"],
    github_url: "https://github.com/rodrigoffreir3",
    live_url: "",
    is_featured: false,
    display_order: 5
  },
  {
    id: 6,
    slug: "appfitness",
    title: "AppFitness — Fidelização & Retenção de Clientes",
    badge: "Plataforma de Fidelização & Gestão de Alunos",
    summary: "Aplicativo móvel focado em experiência do cliente e combate ao cancelamento, aumentando a recorrência e o faturamento de centros de treinamento e estúdios.",
    problem_description: "A alta evasão de clientes e a falta de acompanhamento próximo reduzem a receita mensal de academias, estúdios e serviços por assinatura.",
    technical_details: "Oferece uma experiência simples e acolhedora no celular do aluno para acompanhar seus resultados, enquanto os gestores recebem relatórios de frequência para resgatar clientes antes que eles decidam cancelar o plano.",
    cover_image: "",
    hero_image: "",
    gallery: [],
    tags: ["Fidelização de Clientes", "Receita Recorrente", "Engajamento", "Combate ao Cancelamento"],
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
    title: "O Custo Invisível da Tecnologia: Como a Eficiência Define o Lucro",
    description: "Entenda como o desperdício de processamento e servidores ociosos pode estar drenando a margem de lucro da sua operação digital.",
    published_at: "2026-08-30",
    tags: ["Gestão Financeira", "Eficiência", "Redução de Custos", "Inovação"],
    cover_image: "",
    content_markdown: `Muitos empresários olham apenas para o faturamento bruto, mas esquecem que a eficiência dos processos internos é o que realmente determina quanto sobra no caixa no fim do mês.

### O Desperdício Invisível

Comprar ferramentas digitais em excesso e manter servidores ociosos é como deixar luzes acesas em um galpão vazio 24 horas por dia. O segredo da escala lucrativa está em enxugar o desperdício computacional.`
  },
  {
    id: 2,
    slug: "a-vaga-nao-e-mais-pra-quem-escreve-codigo",
    title: "Como a Inteligência Artificial Está Redefinindo a Produtividade nas Empresas",
    description: "Por que as empresas líderes estão automatizando o atendimento e a digitação manual para focar seus colaboradores no relacionamento com o cliente.",
    published_at: "2026-08-25",
    tags: ["Produtividade", "Inteligência Artificial", "Atendimento", "Gestão"],
    cover_image: "",
    content_markdown: `O tempo de colocar funcionários para redigitar notas, copiar dados de planilhas ou responder 'qual é o PIX da loja' acabou.

### Onde está o foco do seu time?

Colaboradores devem focar em vender, acolher clientes e negociar. Todo o trabalho repetitivo pode e deve ser conduzido por automações inteligentes integradas ao seu banco de dados.`
  }
];
