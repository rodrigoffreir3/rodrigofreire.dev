---
title: "CreareLabs"
description: "Plataforma completa para ensino, prototipagem e desenvolvimento de hardware, circuitos e sistemas embarcados direto pelo navegador."
layout: "project-single"
badge: "Hardware, IoT & Simulação"
hero_image: "/images/projetos/creare-labs/creare-hero.png"
github_url: ""
whatsapp_message: "Olá Rodrigo! Vi o CreareLabs no seu portfólio e gostaria de entender como criar uma plataforma similar para a minha empresa ou instituição."

gallery:
  - image: "/images/projetos/creare-labs/creare-hero.png"
    caption: "Área de trabalho com simulador de hardware e editor de código"
  - image: "/images/projetos/creare-labs/creare-simulador.png"
    caption: "Simulação de circuito com resposta instantânea de sensores"
  - image: "/images/projetos/creare-labs/creare-comissionamento-esp32.png"
    caption: "Comissionamento e gravação de firmware no ESP32 via WebSerial"
  - image: "/images/projetos/creare-labs/creare-editor-blocos.png"
    caption: "Programação visual por blocos com geração em tempo real para C++ e Python"

problem_description: >
  Quem já tentou aprender eletrônica ou ensinar automação conhece o tamanho da dor de cabeça. São dezenas de fios, peças que queimam com facilidade, cabos com defeito e programas gigantes que demoram horas pra instalar e configurar no computador.


  O CreareLabs nasceu pra transformar o navegador de internet em um laboratório completo de eletrônica. Você monta o circuito na tela, simula o comportamento dos sensores sem risco de queimar componentes e programa usando blocos visuais ou código puro. Quando o projeto tá pronto e validado, você conecta a plaquinha física na porta USB do computador e clica em gravar. O site faz tudo sozinho, sem pedir pra baixar driver nenhum.

technical_details: >
  ### Engenharia da Plataforma e Execução no Navegador


  O CreareLabs combina tecnologias modernas da web para proporcionar uma experiência de hardware em tempo real:


  * **Execução Client-Side com Pyodide (WebAssembly):** Toda a lógica dos componentes e simulações roda localmente no navegador do usuário via WASM. Isso elimina custo de infraestrutura de servidores de computação e garante resposta instantânea sem lag de rede.


  * **Comissionamento Nativo WebSerial e Web Bluetooth:** Comunicação direta entre o navegador e chips ESP32/ESP8266. O usuário grava firmwares compilados, envia parâmetros de rede Wi-Fi e lê telemetria de sensores em tempo real através de portas seriais e conexões sem fio seguras.


  * **Editor de Código Monaco & Engine de Blocos:** Ambiente de desenvolvimento com syntax highlighting, autocompletion e validação estática para Python e C++, sincronizado bidirecionalmente com uma folha de eventos e blocos lógicos.


  * **Ponte de Renderização 3D e Eventos:** Simulação de sensores de temperatura, umidade, movimento e atuadores com feedback visual de corrente, tensão e estados lógicos.
---
