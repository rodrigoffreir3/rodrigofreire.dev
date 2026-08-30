// =============================================================================
// RODRIGO FREIRE · DADOS PADRÃO E ESTRUTURA INICIAL
// =============================================================================

export const DEFAULT_HOME_SETTINGS = {
  bg_image_url: "",
  bg_image_size: "cover",
  bg_image_repeat: "no-repeat",
  overlay_color: "rgba(9, 13, 22, 0.75)",
  
  hero_char_url: "",
  hero_char_position: "bottom-right",
  hero_char_size: "380px",
  hero_char_opacity: 1.0,
  
  secondary_bg_url: "",
  secondary_bg_position: "bottom-center",
  secondary_bg_size: "100%",
  secondary_bg_opacity: 0.9,
  
  content_has_border: true,
  content_border_color: "rgba(255, 255, 255, 0.12)",
  content_bg_color: "rgba(17, 24, 39, 0.62)",
  content_blur_level: 20,
  content_border_radius: "24px",
  
  primary_color: "rgba(37, 99, 235, 1)",
  accent_color: "rgba(96, 165, 250, 1)",
  text_heading_color: "rgba(248, 250, 252, 1)",
  text_body_color: "rgba(148, 163, 184, 1)"
};

export const DEFAULT_PROFILE = {
  full_name: "Rodrigo Freire",
  tagline: "Engenharia de software, inteligência artificial e plataformas de alto desempenho.",
  lead_bio: "Ajudo empresas e empreendedores a transformar requisitos complexos em plataformas web modernas, automações com IA, aplicativos e infraestruturas seguras e escaláveis.",
  about_text: "Sou desenvolvedor de software e pesquisador com atuação em plataformas web modernas, inteligência artificial aplicada e sistemas de baixo nível no kernel do Linux. Minha abordagem de trabalho une rigor técnico de engenharia com foco direto no resultado de negócio: entregar sistemas rápidos, fáceis de manter e que suportem a operação diária da sua empresa sem sustos. Sou autor de pesquisas de segurança e possuo registro de software no INPI pelo desenvolvimento de sistemas de defesa autônoma.",
  whatsapp_number: "5569992782919",
  inpi_record: "INPI Nº 512025006506-0",
  avatar_url: "",
  email: "contato@rodrigofreire.dev",
  github_url: "https://github.com/rodrigoffreir3",
  linkedin_url: ""
};

export const DEFAULT_SERVICES = [
  {
    id: "sites",
    icon: "🌐",
    tag: "INSTITUCIONAL",
    title: "Criação de Sites Institucionais",
    description: "Páginas modernas, ultra rápidas e responsivas, desenhadas para posicionar sua empresa com autoridade e converter visitantes em clientes."
  },
  {
    id: "plataformas",
    icon: "⚙️",
    tag: "WEB APP",
    title: "Plataformas Web Corporativas",
    description: "Portais completos com login, painéis de controle, relatórios e gestão operacional em tempo real para organizar a rotina do seu negócio."
  },
  {
    id: "mobile",
    icon: "📱",
    tag: "MOBILE",
    title: "Aplicativos Mobile (iOS & Android)",
    description: "Apps fluidos e intuitivos para smartphones, focados em usabilidade simples, navegação rápida e integração com seus sistemas."
  },
  {
    id: "desktop",
    icon: "💻",
    tag: "DESKTOP",
    title: "Sistemas Desktop para Computador",
    description: "Softwares rápidos e robustos para estações de trabalho Windows, macOS ou Linux, preparados para tarefas pesadas e processamento local."
  },
  {
    id: "automacao-ia",
    icon: "🤖",
    tag: "AGENTS",
    title: "Automação de Processos com IA",
    description: "Agentes inteligentes que analisam documentos, executam tarefas rotineiras e eliminam o trabalho manual repetitivo da sua equipe."
  },
  {
    id: "fine-tuning",
    icon: "🧠",
    tag: "FINE-TUNING",
    title: "Treinamento e Ajuste Fino de IA",
    description: "Especialização de modelos de inteligência artificial treinados diretamente com as informações e regras de negócio da sua empresa."
  },
  {
    id: "whatsapp",
    icon: "💬",
    tag: "WHATSAPP API",
    title: "Automação de WhatsApp Corporativo",
    description: "Fluxos inteligentes para atender clientes instantaneamente 24 horas por dia, qualificar oportunidades e agilizar orçamentos."
  },
  {
    id: "cloud",
    icon: "☁️",
    tag: "CLOUD",
    title: "Servidores em Nuvem (Cloud)",
    description: "Configuração e otimização de infraestruturas na AWS, Google Cloud e Cloudflare para garantir que sua aplicação nunca saia do ar."
  },
  {
    id: "bare-metal",
    icon: "🖥️",
    tag: "BARE-METAL",
    title: "Montagem de Servidores Locais",
    description: "Planejamento e montagem de máquinas e servidores locais dedicados para empresas que precisam de processamento próprio e soberania de dados."
  },
  {
    id: "kernel-sec",
    icon: "🔒",
    tag: "eBPF / KERNEL",
    title: "Segurança & Defesa de Servidores",
    description: "Contenção de processos, auditoria de código e blindagem de servidores Linux contra invasões e acessos indevidos."
  },
  {
    id: "consultoria",
    icon: "📊",
    tag: "CONSULTORIA",
    title: "Consultoria Técnica de Tecnologia",
    description: "Orientação estratégica para aquisição assertiva de hardware, servidores, GPUs e seleção do modelo ideal de IA para sua demanda."
  },
  {
    id: "trafego",
    icon: "📈",
    tag: "GROWTH",
    title: "Estratégia de Tráfego & Presença",
    description: "Estruturação de SEO e campanhas assertivas para posicionar suas soluções no Google e redes sociais para o público comprador."
  }
];

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
