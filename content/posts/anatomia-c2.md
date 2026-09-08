---
title: "Seu antivírus confia no steamcommunity.com. Esse foi o ponto cego que 1.980 sites pagaram"
date: 2026-06-26
draft: false
tags: ["Security", "C2", "WordPress", "Steganography", "Behavioral-Detection"]
description: "Uma campanha de malware infectou quase dois mil sites WordPress usando comentários da Steam como canal de comando. O que me assustou não foi a técnica — foi perceber quantas das minhas próprias defesas teriam deixado passar."
---

# Seu antivírus confia no steamcommunity.com. Esse foi o ponto cego que 1.980 sites pagaram

*Por Rodrigo Freire — Pesquisa e Desenvolvimento em Deep Tech*

Quando li sobre a campanha de malware Steam→WordPress pela primeira vez, minha reação não foi "que técnica avançada". Foi um desconforto mais incômodo: **quantas das defesas que eu mesmo confiava teriam deixado isso passar batido?**

A resposta foi humilhante. Quase todas.

Em julho de 2025, pesquisadores começaram a rastrear uma campanha que infectou cerca de 1.980 sites WordPress. O que fez ela circular pela imprensa de segurança não foi o volume — foi o canal de comando e controle: comentários de perfil da Steam, com instruções escondidas dentro de caracteres Unicode invisíveis. Vale destrinchar isso, porque a lição vale para qualquer um que ache que "tem antivírus, está protegido".

## A genialidade está em não brilhar

Cada etapa dessa campanha foi desenhada para parecer rotina absoluta.

**O ponto de entrada é mundano.** Não há exploit exótico. Credenciais de admin roubadas, acesso FTP comprometido, um plugin vulnerável. Nada que chame atenção — e é justamente por isso que funciona em escala.

**A persistência é discreta.** Plantado o pé inicial, instala-se um backdoor PHP que se mantém por cookie e aceita comandos via POST. Mesmo uma limpeza superficial deixa o caminho de volta aberto.

**O comando vem de onde ninguém olha.** Aqui está a sacada. Em vez de telefonar para um servidor do atacante — que seria pego por reputação de domínio — o site comprometido busca uma página pública de perfil da Steam. O comentário parece arte ASCII inofensiva. Escondidos entre os caracteres visíveis estão seis caracteres Unicode invisíveis, mapeados para bits. Decodificados, reconstroem uma URL.

**A entrega se disfarça de biblioteca.** A URL aponta para um JavaScript externo com nome de biblioteca legítima, tipo `lodash.core.min.js`, injetado em todas as páginas do site, atingindo cada visitante.

## Por que minhas defesas favoritas falhariam

Foi aqui que o desconforto virou aprendizado. Olha por que cada camada tradicional perde:

**Reputação de domínio não serve para nada aqui.** O servidor comprometido conversa com `steamcommunity.com`, um dos domínios mais confiáveis da internet. Nenhuma blocklist vai sinalizar isso. O atacante terceirizou o canal de comando para uma plataforma que ninguém ousa bloquear. Toda a minha confiança em listas de reputação evaporou nesse parágrafo.

**Assinatura de arquivo é frágil por design.** O payload está cifrado e ofuscado em camadas, com identificadores aleatórios e código-isca. A regra que casa com a string de hoje não casa com a variante de amanhã. Antivírus por assinatura está sempre um passo atrás.

**O canal não é tráfego anômalo — é esteganografia.** Os caracteres invisíveis não disparam filtro de spam nem moderação. Gente posta arte ASCII com Unicode o tempo todo. O payload viaja escondido dentro do que parece conteúdo normal.

A conclusão que me incomodou: **toda defesa que pergunta "esse indicador é conhecidamente ruim?" perde aqui.** Porque o indicador foi projetado, do início ao fim, para parecer bom.

## O que sobra quando o "ruim conhecido" não funciona

Se você não pode confiar em domínio, nem em assinatura, nem em filtro de conteúdo, o que sobra?

Sobra o comportamento. A pergunta muda de "esse arquivo é malicioso?" para "esse processo está fazendo algo que um site WordPress saudável jamais faria?". Um servidor web que de repente decodifica caracteres Unicode invisíveis de um perfil da Steam e injeta JavaScript externo em todas as páginas não tem assinatura ruim conhecida — mas tem um comportamento absurdo para o que ele deveria ser.

É uma mudança de eixo inteira: parar de catalogar o que é ruim e começar a entender o que é normal, para que o anormal salte aos olhos sozinho. Detecção por comportamento não precisa ter visto o ataque antes. Ela precisa saber como a vida normal se parece.

## Onde isso também tem limite

Para ser honesto: detecção comportamental não é mágica. Ela gera falsos positivos quando o "normal" é mal definido, exige aprender a linha de base de cada ambiente, e um atacante paciente pode se mover devagar o suficiente para parecer normal. Não substitui as outras camadas — soma a elas. Quem vende qualquer abordagem de segurança como solução única está vendendo, não ensinando.

## O que eu levei para casa

Essa campanha me curou de uma preguiça intelectual: a de achar que segurança é manter listas atualizadas do que é ruim. As listas têm valor, mas elas só pegam o que já é conhecido. O ataque que importa é o que foi desenhado especificamente para parecer bom — e contra esse, a única pergunta que ainda funciona é sobre comportamento, não sobre identidade.

Se você cuida de um WordPress, de um servidor, de qualquer coisa exposta: vale o exercício honesto que eu fiz. Pega as suas defesas atuais, uma por uma, e pergunta se elas pegariam um ataque que conversa com um domínio confiável, muda de assinatura todo dia, e se esconde dentro de conteúdo que parece normal. Se a resposta te deixar desconfortável, ótimo. Foi assim que eu comecei a estudar isso a sério.
