---
title: "Anatomia de um C2 invisível: como o malware Steam→WordPress engana a detecção tradicional"
date: 2026-06-26
draft: false
tags: ["Security", "Imunno", "C2", "WordPress", "Steganography", "Behavioral-Detection"]
description: "Entenda a cadeia de ataque da campanha de malware Steam→WordPress que usa esteganografia e caracteres Unicode invisíveis para evadir detecção tradicional."
---

# Anatomia de um C2 invisível: como o malware Steam→WordPress engana a detecção tradicional (e como detê-lo por comportamento)

*Por Imunno System*

Em julho de 2025, pesquisadores da GoDaddy Security começaram a rastrear uma campanha que, em poucos meses, infectou cerca de 1.980 sites WordPress. O detalhe que fez essa campanha circular pela imprensa de segurança não foi o volume — foi a engenhosidade do canal de Comando e Controle (C2): comentários de perfil da Steam, com instruções escondidas dentro de caracteres Unicode invisíveis.

Este artigo decompõe a cadeia de ataque, explica *por que* ela escapa das defesas convencionais, e mostra como uma arquitetura de detecção baseada em comportamento — em vez de assinatura — muda o jogo. Vou ser franco também sobre onde cada abordagem tem limites, incluindo a nossa.

## A cadeia de ataque, em camadas

O brilho dessa campanha está em não brilhar. Cada etapa foi desenhada para parecer rotina.

**1. Comprometimento inicial.** Não há um exploit único. A análise aponta para vetores conhecidos e mundanos: credenciais de admin roubadas, acesso FTP/SFTP comprometido, um plugin ou tema vulnerável, ou compromisso de cadeia de suprimentos. Nada exótico — e é justamente por isso que funciona em escala.

**2. O backdoor PHP.** Plantado o pé inicial, o malware instala um backdoor server-side capaz de modificar arquivos PHP do site. Ele se mantém com autenticação por cookie e aceita comandos via POST. Esse é o ponto de persistência: mesmo uma limpeza superficial deixa o caminho de volta aberto.

**3. O C2 esteganográfico.** Aqui está a inovação. Em vez de telefonar para um servidor controlado pelo atacante — que seria flagrado por reputação de domínio — o WordPress comprometido busca uma página de perfil público da Steam. O texto do comentário parece arte ASCII inofensiva. Escondidos entre os caracteres visíveis, porém, estão seis caracteres Unicode invisíveis (zero-width non-joiner, zero-width joiner, e variantes de "invisible" operator) mapeados para bits. Decodificados, eles reconstroem uma URL.

**4. A injeção.** A URL aponta para um JavaScript hospedado externamente, disfarçado de biblioteca legítima — nomes como `lodash.core.min.js`. Esse script é injetado em todas as páginas públicas do site, atingindo cada visitante. O payload ainda usa AES-256-CTR com derivação de chave PBKDF2 e HMAC, o que dá ao operador controle criptograficamente protegido sobre o conteúdo.

## Por que a detecção tradicional falha

Pare e observe o que torna essa campanha resistente:

**Reputação de domínio não ajuda.** O servidor comprometido conversa com `steamcommunity.com` — um dos domínios mais confiáveis da internet. Nenhuma blocklist vai sinalizar isso. O atacante terceirizou sua infraestrutura de C2 para uma plataforma que ninguém ousa bloquear.

**Assinaturas de arquivo são frágeis.** O payload real está cifrado e ofuscado em múltiplas camadas, com identificadores randomizados e código-isca. Uma regra que casa com a string de hoje não casa com a variante de amanhã.

**O canal é stego, não tráfego anômalo.** Os caracteres Unicode invisíveis não disparam filtros de spam nem moderação — usuários postam arte ASCII com Unicode o tempo todo. O payload viaja escondido dentro do que parece conteúdo normal.

Em resumo: toda defesa que pergunta *"esse indicador é conhecidamente ruim?"* perde. O indicador foi projetado para parecer bom.

## A pergunta certa: causalidade, não assinatura

A mudança de paradigma é parar de perguntar *"este artefato é malicioso?"* e começar a perguntar *"este comportamento deveria estar acontecendo, dado o contexto?"*.

Aplicado a essa campanha, três comportamentos se destacam — independentemente de como o payload é cifrado:

**1. Modificação de arquivo PHP por origem inesperada.** O backdoor reescreve arquivos PHP. Um agente que mantém o hash SHA-256 de cada arquivo PHP/JS e detecta a divergência no momento da modificação não se importa com o *conteúdo* da mudança — ele detecta *que houve* mudança não autorizada. Em produção, arquivos de core do WordPress não mudam sozinhos.

**2. Linhagem de processo web→shell.** Se o backdoor executa comandos do sistema, o processo que os roda é filho do `php-fpm` ou do servidor web. Um motor de causalidade que rastreia a árvore pai→filho identifica o padrão `nginx → bash` ou `php-fpm → sh` como o que ele é: execução remota de código quase nunca legítima em um servidor de produção.

**3. Conexão outbound para domínio fora do baseline.** Aqui está o ponto mais interessante. Um servidor WordPress típico não faz requisições HTTP de saída para `steamcommunity.com` durante o carregamento de página. Não importa que a Steam seja confiável — o que importa é que *este servidor* nunca fez isso antes. Detecção por desvio de baseline de comportamento de rede pega exatamente o que a reputação de domínio deixa passar.

É essa a tese do Imunno System: defender servidores web Linux pela **causalidade e pelo comportamento**, contendo a ameaça via cgroups (limitando o processo suspeito a 1% de CPU em vez de matá-lo e arriscar derrubar o serviço legítimo junto).

## Onde até a detecção comportamental tem limites — sendo honesto

Seria desonesto vender comportamento como bala de prata. Vamos aos limites reais:

**O C2 esteganográfico em si é difícil de pegar no fio.** Detectar os caracteres Unicode invisíveis exige inspeção de conteúdo de arquivo procurando por code points específicos (U+200C, U+200D, U+2061–U+2064 em densidade anômala). É factível — é detecção de conteúdo, não de comportamento — mas é uma capacidade que precisa ser explicitamente construída. Não cai de graça do modelo de causalidade. No nosso roadmap, isso é uma fase planejada, não um recurso que já entregamos.

**Detecção de baseline de rede sofre com cold start.** Um servidor recém-monitorado não tem baseline. O período de aprendizado é uma janela de cegueira parcial, e atacantes pacientes podem se misturar ao tráfego durante ela.

**Modificação de arquivo via caminho legítimo é zona cinzenta.** Se o backdoor escreve através de um processo que *legitimamente* edita arquivos (um plugin de atualização automática, por exemplo), separar o sinal do ruído fica difícil sem contexto adicional.

Nenhuma camada única resolve. O que funciona é a sobreposição: integridade de arquivo + causalidade de processo + baseline de rede + inspeção de conteúdo, onde a falha de uma é coberta pela outra.

## O que tirar disso

Essa campanha é um lembrete de que a fronteira da defesa não está em ter a maior blocklist. Está em entender o que é *normal* para um servidor específico e detectar o desvio — porque o atacante moderno trabalha duro para que cada indicador isolado pareça inofensivo.

Para quem opera servidores WordPress hoje: revise arquivos PHP/JS modificados recentemente, procure por conexões de saída para domínios inesperados (mesmo os "confiáveis"), e desconfie de qualquer processo shell cujo pai seja o servidor web. E se você foi infectado, restaure de um backup limpo conhecido — o backdoor persiste.

---

*O Imunno System é um EDR de borda para servidores web Linux, focado em detecção comportamental contra webshells, comprometimento de arquivos e abuso de processos. Documentação e arquitetura: github.com/rodrigoffreir3/imunno-pitch*

*Referências técnicas: relatório original da GoDaddy Security sobre a campanha; cobertura do BleepingComputer e Security Affairs (junho de 2026).*
