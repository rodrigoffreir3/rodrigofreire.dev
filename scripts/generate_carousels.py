import os
import sys
import json
import base64
import subprocess
from pathlib import Path

# Diretórios
BASE_DIR = Path("/home/rodrigo-freire/Downloads/rodrigofreire.dev")
POSTS_OUTPUT_DIR = BASE_DIR / "instagram-posts"
POSTS_OUTPUT_DIR.mkdir(exist_ok=True)

# Carrega imagens em base64
with open(BASE_DIR / "public" / "logo-rfd.png", "rb") as f:
    LOGO_DARK_B64 = base64.b64encode(f.read()).decode("utf-8")

with open(BASE_DIR / "public" / "logo-rfd-white.png", "rb") as f:
    LOGO_WHITE_B64 = base64.b64encode(f.read()).decode("utf-8")

with open(BASE_DIR / "public" / "foto_perfil.jpeg", "rb") as f:
    AVATAR_B64 = base64.b64encode(f.read()).decode("utf-8")

def get_slide_html(slide_data, theme="dark", current_slide=1, total_slides=4):
    is_dark = (theme == "dark")
    logo_b64 = LOGO_WHITE_B64 if is_dark else LOGO_DARK_B64
    bg_color = "#070709" if is_dark else "#FCFCFB"
    text_color = "#FFFFFF" if is_dark else "#000000"
    body_color = "#b8bcc4" if is_dark else "#2C3437"
    pill_bg = "rgba(53, 51, 205, 0.25)" if is_dark else "#3533cd"
    pill_text = "#a5a3ff" if is_dark else "#ffffff"
    pill_border = "1px solid rgba(53, 51, 205, 0.6)" if is_dark else "none"
    glow_opacity = "0.45" if is_dark else "0.14"
    card_bg = "rgba(255, 255, 255, 0.04)" if is_dark else "#FFFFFF"
    card_border = "1px solid rgba(53, 51, 205, 0.3)" if is_dark else "1px solid rgba(53, 51, 205, 0.18)"
    card_shadow = "none" if is_dark else "0 14px 38px rgba(0, 0, 0, 0.04)"
    hl_bg = "rgba(53, 51, 205, 0.16)" if is_dark else "rgba(53, 51, 205, 0.07)"
    hl_border = "1.5px solid #3533cd"
    footer_border = "rgba(255, 255, 255, 0.12)" if is_dark else "rgba(0, 0, 0, 0.08)"
    footer_text = "#717885" if is_dark else "#5A626A"
    highlight_text_color = "#5350fa" if is_dark else "#3533cd"
    badge_str = f"{current_slide:02d} / {total_slides:02d}"

    slide_type = slide_data.get("type", "content")
    tag = slide_data.get("tag", "RODRIGO FREIRE TECH")
    title = slide_data.get("title", "")
    subtitle = slide_data.get("subtitle", "")
    body = slide_data.get("body", "")
    highlight_label = slide_data.get("highlight_label", "Ganho Concreto")
    highlight_text = slide_data.get("highlight_text", "")
    swipe_text = slide_data.get("swipe_text", "Arraste para o lado →" if current_slide < total_slides else "Salve para consultar")
    photo_b64 = AVATAR_B64 if slide_data.get("show_photo") else None

    # Render do Miolo do Slide
    content_html = ""
    if slide_type == "cover":
        photo_html = ""
        if photo_b64:
            photo_html = f"""
            <div class="photo-frame">
              <img src="data:image/jpeg;base64,{photo_b64}" class="photo-img">
            </div>
            """
        content_html = f"""
        <div class="content cover-content">
          {photo_html}
          <div class="tag-pill">{tag}</div>
          <h1 class="cover-title">{title}</h1>
          <p class="subtitle cover-subtitle">{subtitle}</p>
        </div>
        """
    elif slide_type == "content":
        hl_html = ""
        if highlight_text:
            hl_html = f"""
            <div class="highlight-box">
              <div class="highlight-title">{highlight_label}</div>
              <div class="highlight-desc">{highlight_text}</div>
            </div>
            """
        card_html = ""
        if body:
            card_html = f"""
            <div class="card">
              <div class="card-text">{body}</div>
            </div>
            """
        sub_html = f'<p class="subtitle">{subtitle}</p>' if subtitle else ''
        content_html = f"""
        <div class="content">
          <div class="tag-pill">{tag}</div>
          <h1>{title}</h1>
          {sub_html}
          {card_html}
          {hl_html}
        </div>
        """
    elif slide_type == "cta":
        content_html = f"""
        <div class="content cta-content">
          <div class="tag-pill">{tag}</div>
          <h1 style="margin-bottom: 24px;">{title}</h1>
          <p class="subtitle" style="margin-bottom: 36px;">{subtitle}</p>
          
          <div class="cta-box">
            <div class="cta-icon">💬</div>
            <div class="cta-heading">Atendimento Direto no WhatsApp</div>
            <div class="cta-desc">{body}</div>
            <div class="cta-action">Link na Bio: @rodrigofreire.dev</div>
          </div>
        </div>
        """

    return f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap" rel="stylesheet">
<style>
  * {{ margin: 0; padding: 0; box-sizing: border-box; }}
  body {{
    width: 1080px;
    height: 1350px;
    background: {bg_color};
    color: {text_color};
    font-family: 'Inter', sans-serif;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 75px 70px;
  }}
  .bg-glow {{
    position: absolute;
    top: -120px;
    right: -120px;
    width: 780px;
    height: 780px;
    background: radial-gradient(circle, rgba(53, 51, 205, {glow_opacity}) 0%, transparent 68%);
    z-index: 0;
  }}
  .header {{
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }}
  .logo-area {{
    display: flex;
    align-items: center;
    gap: 16px;
  }}
  .logo-img {{
    width: 46px;
    height: 46px;
    border-radius: 12px;
    box-shadow: 0 4px 14px rgba(53, 51, 205, 0.25);
  }}
  .logo-text {{
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0.5px;
    color: {text_color};
  }}
  .slide-badge {{
    font-size: 15px;
    font-weight: 700;
    padding: 8px 18px;
    background: {pill_bg};
    border: {pill_border};
    border-radius: 100px;
    color: {pill_text};
    letter-spacing: 1px;
  }}
  .content {{
    position: relative;
    z-index: 1;
    margin: auto 0;
  }}
  .cover-content {{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }}
  .cta-content {{
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }}
  .photo-frame {{
    width: 250px;
    height: 250px;
    border-radius: 50%;
    border: 4px solid #3533cd;
    box-shadow: 0 16px 40px rgba(53, 51, 205, 0.35), 0 0 0 8px rgba(53, 51, 205, 0.12);
    overflow: hidden;
    margin: 0 auto 32px auto;
  }}
  .photo-img {{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }}
  .tag-pill {{
    display: inline-block;
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: {pill_text};
    background: {pill_bg};
    border: {pill_border};
    padding: 7px 18px;
    border-radius: 8px;
    margin-bottom: 24px;
  }}
  h1 {{
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 52px;
    line-height: 1.22;
    font-weight: 800;
    color: {text_color};
    margin-bottom: 22px;
    letter-spacing: -1px;
  }}
  .cover-title {{
    font-size: 60px;
    line-height: 1.18;
    margin-bottom: 26px;
  }}
  span.highlight {{
    color: {highlight_text_color};
  }}
  p.subtitle {{
    font-size: 24px;
    line-height: 1.6;
    color: {body_color};
    margin-bottom: 28px;
  }}
  .cover-subtitle {{
    font-size: 26px;
    max-width: 900px;
  }}
  .card {{
    background: {card_bg};
    border: {card_border};
    border-radius: 22px;
    box-shadow: {card_shadow};
    padding: 36px 40px;
    margin-bottom: 22px;
  }}
  .card-text {{
    font-size: 23px;
    line-height: 1.62;
    color: {body_color};
  }}
  .highlight-box {{
    background: {hl_bg};
    border: {hl_border};
    border-radius: 18px;
    padding: 26px 32px;
  }}
  .highlight-title {{
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 17px;
    font-weight: 700;
    color: {highlight_text_color};
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 8px;
  }}
  .highlight-desc {{
    font-size: 22px;
    line-height: 1.5;
    font-weight: 600;
    color: {text_color};
  }}
  .cta-box {{
    width: 100%;
    max-width: 860px;
    background: {card_bg};
    border: 2px solid {highlight_text_color};
    box-shadow: 0 16px 44px rgba(53, 51, 205, 0.15);
    border-radius: 26px;
    padding: 44px 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }}
  .cta-icon {{
    font-size: 48px;
    margin-bottom: 16px;
  }}
  .cta-heading {{
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 30px;
    font-weight: 800;
    color: {text_color};
    margin-bottom: 14px;
  }}
  .cta-desc {{
    font-size: 21px;
    line-height: 1.6;
    color: {body_color};
    margin-bottom: 26px;
    max-width: 680px;
  }}
  .cta-action {{
    display: inline-block;
    background: #3533cd;
    color: #ffffff;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 700;
    font-size: 20px;
    padding: 16px 36px;
    border-radius: 12px;
    letter-spacing: 0.5px;
    box-shadow: 0 8px 24px rgba(53, 51, 205, 0.4);
  }}
  .footer {{
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid {footer_border};
    padding-top: 26px;
  }}
  .handle {{
    font-size: 17px;
    font-weight: 600;
    color: {footer_text};
  }}
  .swipe {{
    font-size: 17px;
    font-weight: 700;
    color: {highlight_text_color};
  }}
</style>
</head>
<body>
  <div class="bg-glow"></div>
  <div class="header">
    <div class="logo-area">
      <img src="data:image/png;base64,{logo_b64}" class="logo-img">
      <span class="logo-text">RODRIGOFREIRE.DEV</span>
    </div>
    <div class="slide-badge">{badge_str}</div>
  </div>
  {content_html}
  <div class="footer">
    <div class="handle">@rodrigofreire.dev · Porto Velho</div>
    <div class="swipe">{swipe_text}</div>
  </div>
</body>
</html>"""

def render_post(post_info):
    folder_name = post_info["folder"]
    theme = post_info.get("theme", "dark")
    slides = post_info["slides"]
    caption = post_info["caption"]
    
    post_dir = POSTS_OUTPUT_DIR / folder_name
    post_dir.mkdir(exist_ok=True)
    
    print(f"\n=======================================================")
    print(f"Gerando Post: {folder_name} (Tema: {theme})")
    print(f"=======================================================")
    
    total = len(slides)
    for idx, slide in enumerate(slides, start=1):
        html_code = get_slide_html(slide, theme=theme, current_slide=idx, total_slides=total)
        html_file = post_dir / f"slide-{idx:02d}.html"
        png_file = post_dir / f"slide-{idx:02d}.png"
        
        with open(html_file, "w", encoding="utf-8") as f:
            f.write(html_code)
            
        subprocess.run([
            "google-chrome",
            "--headless=new",
            "--no-sandbox",
            f"--screenshot={png_file}",
            "--window-size=1080,1350",
            "--hide-scrollbars",
            f"file://{html_file.resolve()}"
        ], check=True)
        
        # Remove arquivo html temporario para deixar apenas as imagens png e legenda
        html_file.unlink(missing_ok=True)
        print(f"✓ {png_file.name} gerado com sucesso.")
        
    with open(post_dir / "LEGENDA.md", "w", encoding="utf-8") as f:
        f.write(caption)
    print(f"✓ LEGENDA.md gerada com sucesso.")

# =============================================================================
# DEFINIÇÃO DOS 9 POSTS (GRADE 3x3 DO FEED)
# =============================================================================

ALL_POSTS = [
    # -------------------------------------------------------------------------
    # POST 01: Vendo bem no Instagram, ainda preciso de site? (Tema: Dark)
    # -------------------------------------------------------------------------
    {
        "folder": "post-01-vendo-bem-instagram-preciso-site",
        "theme": "dark",
        "slides": [
            {
                "type": "cover",
                "tag": "OPINIÃO HONESTA · SEM JARGÃO",
                "title": "Vendo bem no Instagram... <br><span class=\"highlight\">ainda preciso de site?</span>",
                "subtitle": "Uma conversa franca sobre quando vale a pena, quando NÃO vale, e a venda silenciosa que você pode estar perdendo todos os dias."
            },
            {
                "type": "content",
                "tag": "PONTO 01 · TRANSPARÊNCIA",
                "title": "Às vezes você <br><span class=\"highlight\">NÃO precisa mesmo.</span>",
                "subtitle": "Ferramenta boa é a que resolve uma dor real. Se não tem problema, não jogue dinheiro fora.",
                "body": "Se o seu cliente é sempre o mesmo público, que já te segue, já confia em você e compra no Pix pelo direct sem atrito, site nenhum vai vender mais do que isso. Se a operação já roda leve, gastar com site agora é vaidade.",
                "highlight_label": "Regra Prática",
                "highlight_text": "Só invista em solução se existir um gargalo que esteja travando o seu faturamento."
            },
            {
                "type": "content",
                "tag": "PONTO 02 · A DOR OCULTA",
                "title": "A venda que some <br><span class=\"highlight\">em silêncio.</span>",
                "subtitle": "Cliente novo ou compras de maior valor quase nunca fecham só pelo direct.",
                "body": "Antes de soltar um Pix maior ou comprar pela primeira vez, o cliente pesquisa seu nome no Google. Se só acha perfil de rede social, parte desconfia. E o pior: ele compra no concorrente que tem site (mesmo cobrando mais caro) só pela segurança.",
                "highlight_label": "O Prejuízo Invisível",
                "highlight_text": "Venda que nunca chegou não aparece na planilha de perdas, mas sangra o seu caixa."
            },
            {
                "type": "content",
                "tag": "PONTO 03 · SEGURANÇA",
                "title": "O Instagram é um <br><span class=\"highlight\">terreno alugado.</span>",
                "subtitle": "O que acontece com o seu comércio se o aplicativo sair do ar amanhã?",
                "body": "Se o algoritmo mudar, a conta for suspensa ou a rede cair, toda a sua lista de clientes desaparece. Você não tem o contato direto de quem compra, tem apenas seguidores emprestados.",
                "highlight_label": "Com Site Próprio",
                "highlight_text": "O WhatsApp e o histórico de compras do cliente são SEUS. Segurança para a vida da empresa."
            },
            {
                "type": "cta",
                "tag": "RESUMO PRÁTICO",
                "title": "O site não substitui o Instagram. <br><span class=\"highlight\">Ele soma.</span>",
                "subtitle": "Você continua atraindo pelo Instagram, mas fecha as vendas de maior valor com segurança e sem pagar comissão para ninguém.",
                "body": "Quer entender se o seu negócio em Porto Velho já está na hora de ter um site próprio simples e direto? Me chama no WhatsApp e eu te dou uma resposta honesta."
            }
        ],
        "caption": """Vendo bem no Instagram... ainda preciso de site? 🤔

Toda semana tem alguém aqui em Porto Velho vendendo muito bem no Instagram e no TikTok. Recebe pedido no direct, combina no WhatsApp, manda o Pix e entrega. Funciona!

Aí alguém pergunta: "você não tem site?", e a resposta sincera é "pra quê, se já tô vendendo assim?".

A verdade que ninguém te conta é que, às vezes, você NÃO precisa mesmo. Se seu público é o mesmo e já compra sem hesitar, gastar com site é jogar dinheiro fora.

Mas tem uma hora que a rede social sozinha começa a te custar caro:
1. O cliente que vai fazer uma compra de maior valor busca seu nome no Google antes de pagar. Se só acha perfil, desconfia e vai pro concorrente que tem site.
2. O Instagram é terreno alugado. Se o algoritmo mudar ou sua conta cair, sua lista de clientes vai junto.

Com um site simples, o cliente compra com confiança e o contato dele é SEU.

💡 Quer uma avaliação sincera se a sua loja já precisa de um site ou se ainda pode esperar?
👉 Manda uma mensagem no WhatsApp pelo link da bio! Atendimento direto, sem enrolação.

#portovelho #rondonia #comerciopvh #empreendedorismo #vendasinstagram #tecnologiaamigavel #rodrigofreiretech"""
    },

    # -------------------------------------------------------------------------
    # POST 02: Suporte Técnico & Estabilidade Empresarial (Tema: Light)
    # -------------------------------------------------------------------------
    {
        "folder": "post-02-socorro-tecnico",
        "theme": "light",
        "slides": [
            {
                "type": "cover",
                "tag": "SUPORTE DE TI EMPRESARIAL · PORTO VELHO",
                "title": "Operação travada? <br><span class=\"highlight\">TI ágil para sua empresa não parar.</span>",
                "subtitle": "Estabilidade técnica para seus caixas, computadores e rede comercial. Atendimento profissional direto com quem resolve."
            },
            {
                "type": "content",
                "tag": "O IMPACTO NO COMÉRCIO",
                "title": "Instabilidade técnica custa <br><span class=\"highlight\">clientes e credibilidade.</span>",
                "subtitle": "Quando o sistema do caixa oscila ou a rede cai, o cliente não espera.",
                "body": "Falhas intermitentes, lentidão no fechamento e impressoras travando desgastam sua equipe e afastam quem está pronto para pagar. No comércio, cada minuto de balcão parado queima vendas e passa insegurança.",
                "highlight_label": "A Realidade do Varejo",
                "highlight_text": "Equipamento instável não é mero detalhe técnico: é perda silenciosa de faturamento diário."
            },
            {
                "type": "content",
                "tag": "SOLUÇÃO PROFISSIONAL",
                "title": "Resposta técnica rápida: <br><span class=\"highlight\">remoto imediato ou presencial.</span>",
                "subtitle": "Diagnóstico preciso da causa raiz, sem enrolação e sem jargões vazios.",
                "body": "Acesso remoto seguro em minutos para resolver urgências de sistema, ou atendimento presencial na sua empresa em Porto Velho para restabelecer computadores e redes. Orçamento transparente e explicado com clareza antes de qualquer intervenção.",
                "highlight_label": "Padrão de Atendimento",
                "highlight_text": "Zero terceirização, zero protocolo engessado. Você fala direto com o especialista."
            },
            {
                "type": "cta",
                "tag": "CONTINUIDADE DO NEGÓCIO",
                "title": "Mantenha a infraestrutura <br><span class=\"highlight\">do seu negócio funcionando.</span>",
                "subtitle": "Sua operação não pode ser refém de falhas técnicas imprevistas.",
                "body": "Precisa de suporte ágil para seus caixas, computadores ou rede comercial? Me envie uma mensagem no WhatsApp. Diagnóstico rápido e atendimento pontual."
            }
        ],
        "caption": """Sua operação comercial não pode parar por instabilidade de TI. 🖥️⚡

No comércio e nas empresas de Porto Velho, quando o computador do caixa trava, a rede oscila ou a impressora fiscal não responde, o prejuízo é imediato: filas se formam, a equipe fica estressada e o cliente vai embora insatisfeito.

Você não precisa de protocolos demorados de suporte corporativo e nem de atendimentos improvisados que não resolvem a causa raiz.

Ofereço suporte de TI ágil e profissional direto para empresas:
✅ Diagnóstico técnico rápido e preciso da infraestrutura
✅ Acesso remoto seguro e imediato para destravar emergências
✅ Atendimento presencial na sua empresa em Porto Velho
✅ Manutenção preventiva e corretiva para caixas, PCs e rede
✅ Orçamento prévio e transparente, sem termos técnicos vazios

Estabilidade técnica é o que garante que seu cliente pague e saia satisfeito.

💡 Salve este post para ter um contato de confiança ou chame agora pelo link da bio para avaliar a TI da sua empresa!

#suporteti #tiportovelho #portovelho #pvh #gestaoempresarial #infraestruturati #rodrigofreiretech #comerciopvh"""
    },

    # -------------------------------------------------------------------------
    # POST 03: TikTok Shop vs Loja Online Própria (Tema: Dark)
    # -------------------------------------------------------------------------
    {
        "folder": "post-03-tiktok-shop-vs-loja-propria",
        "theme": "dark",
        "slides": [
            {
                "type": "cover",
                "tag": "ESTRATÉGIA DE VENDAS ONLINE",
                "title": "TikTok Shop vs Loja Própria: <br><span class=\"highlight\">qual o melhor para você?</span>",
                "subtitle": "Vender por impulso no app ou estruturar sua própria base? Entenda as diferenças reais para tomar a melhor decisão."
            },
            {
                "type": "content",
                "tag": "PRINCIPAIS DIFERENÇAS",
                "title": "Descoberta e Conversão vs <br><span class=\"highlight\">Controle e Margens.</span>",
                "subtitle": "Entenda o que muda na prática entre os dois modelos.",
                "body": "<strong>Descoberta e Conversão:</strong> O TikTok Shop encurta o caminho entre ver o vídeo e comprar com checkout nativo no app. O e-commerce próprio depende de levar tráfego qualificado para fora das redes.<br><br><strong>Controle e Margens:</strong> No TikTok Shop você paga comissões maiores e joga sob as regras do algoritmo. Na loja própria você controla as regras, margens e o pós-venda.<br><br><strong>Estratégia de Afiliados:</strong> O TikTok facilita parcerias nativas com criadores. Na loja própria, exige ferramentas externas.",
                "highlight_label": "Diferença Fundamental",
                "highlight_text": "No app você converte por impulso e conveniência; no site próprio você constrói valor de marca e controle."
            },
            {
                "type": "content",
                "tag": "QUAL ESCOLHER?",
                "title": "O canal ideal para cada <br><span class=\"highlight\">estratégia de negócio.</span>",
                "subtitle": "Não existe 'melhor ou pior' absoluto: existe o foco do seu momento.",
                "body": "<strong>TikTok Shop é ideal se:</strong><br>Seu produto é altamente visual, com forte apelo de demonstração, potencial viral ou se você aposta em lives e vídeos curtos frequentes para vender.<br><br><strong>E-commerce Próprio é indispensável se:</strong><br>Você quer construir marca no longo prazo, ter a lista de clientes para recompra e não depender das políticas de nenhuma plataforma de terceiros.",
                "highlight_label": "Visão Estratégica",
                "highlight_text": "Vendas por impulso geram caixa imediato; clientes fiéis geram faturamento previsível."
            },
            {
                "type": "content",
                "tag": "A MELHOR ESTRATÉGIA",
                "title": "O modelo complementar: <br><span class=\"highlight\">una a força dos dois.</span>",
                "subtitle": "Você não precisa escolher apenas um canal de vendas.",
                "body": "Em vez de tratar como concorrentes, muitos negócios usam ambos de forma complementar:<br><br>O <strong>TikTok Shop</strong> atua como um <strong>canal de aquisição rápida</strong>, aproveitando o momento de empolgação do consumidor. O <strong>e-commerce próprio</strong> cuida da <strong>retenção, relacionamento duradouro e compras recorrentes</strong> com margem máxima.",
                "highlight_label": "O Ciclo Híbrido",
                "highlight_text": "Use o app para atrair novos compradores e fidelize no seu site próprio com margem cheia."
            },
            {
                "type": "cta",
                "tag": "ESTRUTURA DE VENDAS",
                "title": "Pronto para estruturar <br><span class=\"highlight\">as suas vendas online?</span>",
                "subtitle": "Integração profissional entre redes sociais e loja própria sob medida.",
                "body": "Quer planejar a estratégia ideal para a sua empresa em Porto Velho e ter um e-commerce próprio ágil, seguro e sem complicações? Fale direto comigo no WhatsApp pelo link da bio."
            }
        ],
        "caption": """TikTok Shop ou Loja Online Própria: onde vale mais a pena vender? 🛍️📲

Não existe "melhor ou pior" absoluto: o TikTok Shop e o e-commerce próprio têm propostas diferentes e funcionam muito bem quando você entende a lógica de cada um.

🔍 Principais Diferenças:
1. Descoberta e Conversão: O TikTok Shop reduz a distância entre ver o produto e comprar com um checkout nativo no app. O e-commerce próprio depende de levar tráfego para fora das redes sociais para converter.
2. Controle e Margens: No TikTok Shop, você paga comissões mais altas e joga sob as regras do algoritmo. Na loja própria, você controla as regras, as margens e a experiência de pós-venda.
3. Estratégia de Afiliados: O TikTok Shop facilita parcerias com criadores com seu programa nativo de afiliados. No e-commerce tradicional, gerenciar afiliados exige mais esforço e ferramentas externas.

🎯 Qual Escolher?
• TikTok Shop: Ideal se o seu produto é altamente visual, viral ou se você aposta em lives e vídeos curtos para vender.
• E-commerce Próprio: Indispensável se você quer construir marca no longo prazo, ter a lista de clientes para recompra e não depender de nenhuma plataforma de terceiros.

💡 A Melhor Estratégia:
Em vez de escolher apenas um, muitos negócios usam os dois de forma complementar: o TikTok Shop funciona como canal de aquisição rápida, enquanto o e-commerce próprio cuida da retenção e do relacionamento duradouro com o cliente.

Quer estruturar uma loja própria rápida, segura e sob medida para a sua empresa em Porto Velho?
👉 Mande uma mensagem no WhatsApp pelo link da bio!

#tiktokshop #ecommerce #lojavirtual #marketingdigital #portovelho #rondonia #vendasdigitais #rodrigofreiretech"""
    },

    # -------------------------------------------------------------------------
    # POST 04: Modernização da operação com sistemas fáceis e amigáveis (Tema: Light)
    # -------------------------------------------------------------------------
    {
        "folder": "post-04-modernizacao-operacao",
        "theme": "light",
        "slides": [
            {
                "type": "cover",
                "tag": "TECNOLOGIAS AMIGÁVEIS",
                "title": "Seus funcionários brigam com <br><span class=\"highlight\">o sistema todo dia?</span>",
                "subtitle": "A bandeira que ergo: sistemas simples e amigáveis para acabar com filas e aumentar o lucro."
            },
            {
                "type": "content",
                "tag": "O PROBLEMA",
                "title": "Telas confusas e lentidão <br><span class=\"highlight\">custam muito caro.</span>",
                "subtitle": "Software difícil não é sinônimo de software completo: é prejuízo.",
                "body": "Sistema cheio de atalhos incompreensíveis, telas cheias de botões que ninguém usa e atendente com medo de errar a nota. Isso gera filas enormes, estresse no balcão e perda de clientes.",
                "highlight_label": "Mude o Paradigma",
                "highlight_text": "Tecnologia não tem que ser complicada. Se exige semanas de treinamento, o software está errado."
            },
            {
                "type": "content",
                "tag": "A SOLUÇÃO",
                "title": "Sistemas que conversam <br><span class=\"highlight\">fácil com a sua equipe.</span>",
                "subtitle": "Ferramentas intuitivas que qualquer colaborador opera no primeiro dia.",
                "body": "Modernizo a operação da sua empresa implementando sistemas ágeis, limpos e sem botões desnecessários. O atendimento flui rápido, o caixa não trava e o cliente é atendido com velocidade.",
                "highlight_label": "Ganho Concreto",
                "highlight_text": "Fim das filas, equipe motivada e atendimento rápido que bota mais dinheiro no caixa."
            },
            {
                "type": "cta",
                "tag": "SIMPLICIDADE DE SISTEMAS",
                "title": "Vamos descomplicar a <br><span class=\"highlight\">operação da sua loja?</span>",
                "subtitle": "Tenha um sistema que ajuda a sua equipe em vez de atrapalhar.",
                "body": "Me conte no WhatsApp onde a sua equipe está perdendo tempo hoje. Encontro e implemento a solução mais amigável e rápida para o seu negócio."
            }
        ],
        "caption": """Seus colaboradores perdem tempo brigando com telas confusas que ninguém entende? 🤯

Quando o cliente fica esperando em fila por conta de sistema lento ou difícil de mexer, ele não vai reclamar do software: ele vai reclamar da sua loja e não volta mais.

A bandeira que ergo é a SIMPLICIDADE DE SISTEMAS. 🚩
Sou empenhado em mudar o paradigma de que tecnologia tem que ser complicada.

Eu modernizo a operação do seu comércio em Porto Velho implementando sistemas amigáveis:
⚡ Fáceis de entender por qualquer colaborador no 1º dia
⚡ Telas limpas, sem botões desnecessários
⚡ Atendimento rápido que acaba com filas no balcão
⚡ Mais agilidade na rotina e mais dinheiro no caixa

Chega de sofrer com sistema que atrapalha o seu trabalho.
👉 Chame no WhatsApp pelo link da bio e vamos simplificar a sua empresa!

#sistemascomerciais #tecnologiaamigavel #gestaoempresarial #portovelho #pvh #produtividade #rodrigofreiretech"""
    },

    # -------------------------------------------------------------------------
    # POST 05: Automação de tarefas manuais e repetitivas (Tema: Dark)
    # -------------------------------------------------------------------------
    {
        "folder": "post-05-automacao-tarefas",
        "theme": "dark",
        "slides": [
            {
                "type": "cover",
                "tag": "ECONOMIA DE TEMPO",
                "title": "Quanto tempo você perde <br><span class=\"highlight\">copiando dados na mão?</span>",
                "subtitle": "Tarefas chatas e repetitivas que roubam horas da sua equipe podem ser feitas em segundos com 1 clique."
            },
            {
                "type": "content",
                "tag": "O PROBLEMA",
                "title": "O trabalho manual que <br><span class=\"highlight\">esgota a sua equipe.</span>",
                "subtitle": "Digitar as mesmas informações todo dia em planilhas diferentes.",
                "body": "Copiar pedidos do WhatsApp para planilha, conferir relatórios linha por linha e preencher cadastros repetidos. Esse trabalho mecânico rouba a energia do seu time e é o principal gerador de erros humanos.",
                "highlight_label": "O Custo Real",
                "highlight_text": "Horas pagas de colaboradores desperdiçadas em tarefas que um computador faz em 2 segundos."
            },
            {
                "type": "content",
                "tag": "A SOLUÇÃO",
                "title": "Rotinas automáticas <br><span class=\"highlight\">com um único clique.</span>",
                "subtitle": "O computador fazendo o trabalho braçal para você focar no cliente.",
                "body": "Crio rotinas e scripts sob medida no seu computador para cruzar dados, atualizar tabelas e gerar relatórios automaticamente. Tarefas que demoravam 2 horas passam a rodar num piscar de olhos.",
                "highlight_label": "Ganho Prático",
                "highlight_text": "Horas livres no expediente para sua equipe focar no que dá dinheiro: atender bem e vender mais."
            },
            {
                "type": "cta",
                "tag": "DESCOMPLIQUE A ROTINA",
                "title": "Pronto para eliminar as <br><span class=\"highlight\">tarefas chatas do dia?</span>",
                "subtitle": "Deixe o trabalho repetitivo no piloto automático com total segurança.",
                "body": "Me conte qual é a tarefa mais demorada e repetitiva da sua empresa hoje. Vamos colocar ela para rodar automaticamente!"
            }
        ],
        "caption": """Você ou seus colaboradores perdem horas copiando dados de um lugar para o outro? ⏳

Preencher as mesmas planilhas todo dia, copiar pedidos na mão, conferir relatórios linha por linha... além de ser um trabalho chato e cansativo, é a maior fonte de erros e retrabalho no comércio.

Eu crio rotinas automáticas no seu computador para executar essas tarefas em poucos segundos com um único clique.

O que a automação faz pela sua empresa:
🚀 Cruza dados e preenche relatórios sem erro humano
🚀 Economiza de 1 a 3 horas diárias da equipe
🚀 Libera seus colaboradores para o que importa: atender o cliente e vender

Seja honesto: o que você faria com 2 horas a mais no seu dia?
👉 Manda uma mensagem no WhatsApp pelo link da bio e vamos automatizar isso!

#automacao #produtividade #gestaodetempo #portovelho #negocioslocais #rodrigofreiretech"""
    },

    # -------------------------------------------------------------------------
    # POST 06: Proteção de dados e cópia de segurança / Backup (Tema: Light)
    # -------------------------------------------------------------------------
    {
        "folder": "post-06-protecao-backup",
        "theme": "light",
        "slides": [
            {
                "type": "cover",
                "tag": "CÓPIA DE SEGURANÇA",
                "title": "Se o seu computador queimar hoje, <br><span class=\"highlight\">o que acontece amanhã?</span>",
                "subtitle": "Histórico de vendas, notas fiscais, clientes: você recupera tudo em minutos ou perde a história da empresa?"
            },
            {
                "type": "content",
                "tag": "O RISCO REAL",
                "title": "Confiar em um único <br><span class=\"highlight\">equipamento é perigoso.</span>",
                "subtitle": "Queda de raio, pane de disco, vírus de resgate ou simples desgaste físico.",
                "body": "Discos rígidos quebram sem aviso prévio. Se a máquina principal do seu caixa ou do escritório pifar hoje e não houver cópia de segurança, anos de relatórios e contabilidade somem para sempre.",
                "highlight_label": "O Prejuízo",
                "highlight_text": "Perder o histórico financeiro e fiscal pode custar multas pesadas e meses de dor de cabeça."
            },
            {
                "type": "content",
                "tag": "A SOLUÇÃO",
                "title": "Backup diário e automático <br><span class=\"highlight\">sem você precisar lembrar.</span>",
                "subtitle": "A tranquilidade de trabalhar com a certeza de que tudo está salvo.",
                "body": "Configuro rotinas de cópia automática que rodam em segundo plano todos os dias, salvando suas informações em local protegido e criptografado na nuvem ou em disco isolado.",
                "highlight_label": "Tranquilidade Total",
                "highlight_text": "Se o computador estragar amanhã, você compra outro e recupera tudo em poucos minutos."
            },
            {
                "type": "cta",
                "tag": "PROTEJA SEUS DADOS",
                "title": "Não espere a máquina pifar <br><span class=\"highlight\">para pensar em backup.</span>",
                "subtitle": "Segurança de dados rápida, silenciosa e sem mensalidades abusivas.",
                "body": "Fale comigo no WhatsApp. Deixo a rotina de proteção da sua loja 100% configurada e testada esta semana."
            }
        ],
        "caption": """Se o computador principal da sua loja queimar ou for infectado por vírus amanhã, o que você perde? 💾⚠️

Muitos comerciantes em Porto Velho só pensam em backup depois que o disco rígido estala e a máquina não liga mais. Aí já é tarde: anos de notas fiscais, cadastro de clientes e controle financeiro vão embora.

Eu configuro rotinas de backup automáticas para a sua empresa:
🔒 Seus dados são copiados todos os dias em segundo plano
🔒 Você não precisa lembrar de salvar nada na mão
🔒 Se qualquer equipamento estragar, recuperamos tudo em minutos
🔒 Zero prejuízo financeiro e zero perda de histórico

Não espere a dor de cabeça acontecer para se proteger.
👉 Chame no WhatsApp pelo link da bio e deixe seus dados seguros hoje mesmo!

#backup #segurancadedados #portovelho #gestaoempresarial #suporteti #rodrigofreiretech"""
    },

    # -------------------------------------------------------------------------
    # POST 07: Diagnóstico da operação e solução sob medida (Tema: Dark)
    # -------------------------------------------------------------------------
    {
        "folder": "post-07-solucao-sob-medida",
        "theme": "dark",
        "slides": [
            {
                "type": "cover",
                "tag": "SOLUÇÃO SOB MEDIDA",
                "title": "Cansado de pagar caro por <br><span class=\"highlight\">sistemas que não atendem?</span>",
                "subtitle": "Por que forçar seu comércio a se adaptar a um software genérico se a tecnologia pode se adaptar a você?"
            },
            {
                "type": "content",
                "tag": "O PROBLEMA",
                "title": "A dor de fazer gambiarras <br><span class=\"highlight\">para o negócio rodar.</span>",
                "subtitle": "Sistemas de prateleira cobram mensalidades caras por funções que você nunca usa.",
                "body": "Toda empresa tem uma peculiaridade no atendimento ou no estoque. Softwares genéricos engessam a sua operação e forçam você a inventar anotações no caderno ou controles improvisados para tapar buracos.",
                "highlight_label": "O Resultado",
                "highlight_text": "Você paga caro todo mês e continua perdendo tempo com gargalos que o sistema não resolve."
            },
            {
                "type": "content",
                "tag": "A SOLUÇÃO",
                "title": "Examino onde está doendo <br><span class=\"highlight\">e entrego a solução exata.</span>",
                "subtitle": "Sem intermediários: diagnóstico no seu balcão e foco no problema real.",
                "body": "Não empurro sistemas de terceiros com comissão: eu analiso a operação real da sua empresa em Porto Velho e desenvolvo ou configuro a ferramenta exata que resolve o gargalo de vez.",
                "highlight_label": "Ganho Sob Medida",
                "highlight_text": "Uma ferramenta que fala a língua da sua loja, fácil de usar e sem mensalidades abusivas."
            },
            {
                "type": "cta",
                "tag": "DIAGNÓSTICO REAL",
                "title": "Vamos descobrir onde a <br><span class=\"highlight\">sua operação está travando?</span>",
                "subtitle": "Uma conversa franca e objetiva sobre como destravar o seu comércio.",
                "body": "Agende um diagnóstico comigo no WhatsApp. Conte onde está o gargalo e vamos desenhar a solução ideal para a sua empresa."
            }
        ],
        "caption": """Sua empresa tem um gargalo que nenhum programa de mercado consegue resolver direito? 🛠️

A maioria dos sistemas prontos cobra mensalidades caras por 100 ferramentas que você nunca vai usar, e na hora que você precisa de um ajuste simples para a rotina da sua loja, dizem que "o sistema não faz isso". Aí você é forçado a fazer gambiarras para trabalhar.

Eu não empurro softwares engessados de terceiros:
🔍 Examino a operação real da sua empresa aqui em Porto Velho
🎯 Identifico exatamente onde está doendo no dia a dia
⚙️ Desenvolvo ou implemento a solução sob medida para a sua necessidade

Um sistema feito para falar a língua da sua loja, fácil de usar por qualquer funcionário e sem mensalidades absurdas.

Vamos bater um papo sobre a sua operação?
👉 Me chame no WhatsApp pelo link da bio!

#sistemasobmedida #softwareempresarial #portovelho #pvh #tecnologiasamigaveis #rodrigofreiretech"""
    },

    # -------------------------------------------------------------------------
    # POST 08: Apresentação Pessoal: Quem é Rodrigo Freire? (Tema: Light)
    # -------------------------------------------------------------------------
    {
        "folder": "post-08-apresentacao-rodrigo-freire",
        "theme": "light",
        "slides": [
            {
                "type": "cover",
                "tag": "QUEM SOU EU · PORTO VELHO",
                "show_photo": True,
                "title": "Prazer, sou o <br><span class=\"highlight\">Rodrigo Freire.</span>",
                "subtitle": "Tecnologias amigáveis, sistemas simples e atendimento presencial sem intermediários no comércio de Porto Velho."
            },
            {
                "type": "content",
                "tag": "FORMAÇÃO & LGPD",
                "title": "Direito + Tecnologia: <br><span class=\"highlight\">uma combinação incomum.</span>",
                "subtitle": "O que você ganha com a união entre a área jurídica e o desenvolvimento?",
                "body": "Sou graduado em Direito e estou em formação em Análise e Desenvolvimento de Sistemas (ADS). Pode parecer uma combinação inusitada, mas ela entrega um diferencial raro: <strong>domínio prático da LGPD</strong> para proteger o cadastro de clientes da sua empresa contra vazamentos e multas, somado a contratos transparentes, rigor técnico e cumprimento estrito de prazos.",
                "highlight_label": "Segurança Jurídica & Técnica",
                "highlight_text": "Tecnologia com conformidade legal: seus sistemas blindados contra riscos e passivos."
            },
            {
                "type": "content",
                "tag": "PROPÓSITO DE MARCA",
                "title": "A simplicidade de sistemas <br><span class=\"highlight\">é a bandeira que ergo.</span>",
                "subtitle": "Tecnologia boa é aquela que conversa fácil com a sua empresa.",
                "body": "Também desenvolvo tecnologia própria com registro oficial no INPI (Nº 512025006506-0). Sou empenhado em mudar o paradigma de que tecnologia precisa ser complicada. Construo ferramentas amigáveis que qualquer atendente aprende no primeiro olhar.",
                "highlight_label": "Foco no Resultado",
                "highlight_text": "Sistemas amigáveis geram agilidade no atendimento e colocam mais dinheiro no seu caixa."
            },
            {
                "type": "cta",
                "tag": "ATENDIMENTO DIRETO",
                "title": "Você fala direto com <br><span class=\"highlight\">quem resolve.</span>",
                "subtitle": "Sem intermediários, sem robôs e sem protocolos burocráticos.",
                "body": "Moro aqui em Porto Velho e atendo tanto presencialmente na sua empresa quanto à distância. Salve este post e mande uma mensagem no WhatsApp para conversar sobre a sua operação!"
            }
        ],
        "caption": """Prazer, sou o Rodrigo Freire! 👋

Moro aqui em Porto Velho e desenvolvo soluções de tecnologia, sistemas e suporte técnico sob medida para empresários e comerciantes da nossa cidade.

Minha trajetória traz uma união que muitos acham curiosa: sou graduado em Direito e estou em formação em Análise e Desenvolvimento de Sistemas (ADS).

O que essa combinação incomum significa para a sua empresa na prática?
🛡️ Domínio prático da LGPD: sistemas e bancos de dados implementados com proteção real às informações de clientes, evitando multas e vazamentos
📜 Rigor contratual e orçamentos 100% transparentes antes de qualquer serviço
⏱️ Cumprimento estrito de prazos acordados
🔒 Sigilo profissional e confidencialidade absoluta
💡 Explicação sempre em português claro, sem jargões para inflar preços

Ergo a bandeira das TECNOLOGIAS AMIGÁVEIS: software e suporte existem para simplificar sua vida e fazer seu comércio faturar mais, sem dor de cabeça.

Você fala direto comigo no WhatsApp e, quando necessário, vou até o seu balcão resolver.

Gostou? Salve este post para ter um parceiro de tecnologia confiável e me chame no WhatsApp pelo link da bio!

#portovelho #rondonia #pvh #lgpd #direitotecnologia #tecnologiaamigavel #rodrigofreiretech #empreendedorismo"""
    },

    # -------------------------------------------------------------------------
    # POST 09: Como funciona na prática (3 Passos Honestos) (Tema: Dark)
    # -------------------------------------------------------------------------
    {
        "folder": "post-09-como-funciona-passo-a-passo",
        "theme": "dark",
        "slides": [
            {
                "type": "cover",
                "tag": "SEM BUROCRACIA",
                "title": "Como funciona o atendimento <br><span class=\"highlight\">comigo na prática?</span>",
                "subtitle": "Três passos simples e transparentes do primeiro contato no WhatsApp até a sua empresa rodando em paz."
            },
            {
                "type": "content",
                "tag": "PASSO 01 & 02",
                "title": "Do primeiro contato <br><span class=\"highlight\">ao orçamento fechado.</span>",
                "subtitle": "Sem protocolo demorado e sem surpresa na conta.",
                "body": "<strong>01. Conversa no WhatsApp:</strong> Você me manda uma mensagem contando o que está acontecendo no seu computador, caixa ou sistema.<br><br><strong>02. Orçamento claro antes de começar:</strong> Analiso a situação e passo o valor fechado e prazo antes de mexer em qualquer coisa. Você aprova e não tem surpresa na conta.",
                "highlight_label": "Transparência Total",
                "highlight_text": "Você sabe exatamente o que será feito e quanto vai custar antes do início."
            },
            {
                "type": "content",
                "tag": "PASSO 03",
                "title": "Problema resolvido com <br><span class=\"highlight\">explicação em português.</span>",
                "subtitle": "Nada de jargões difíceis para parecer complicado.",
                "body": "Executo o conserto ou a configuração do sistema, testo junto com você no balcão e mostro na prática o que foi feito para a sua empresa seguir trabalhando com tranquilidade e sem atrito.",
                "highlight_label": "Atendimento Local",
                "highlight_text": "Presencialmente no seu balcão em Porto Velho ou acesso remoto imediato."
            },
            {
                "type": "cta",
                "tag": "DESCOMPLIQUE HOJE",
                "title": "Tem algo travando no <br><span class=\"highlight\">seu comércio hoje?</span>",
                "subtitle": "Não espere o problema virar perda de faturamento.",
                "body": "Fale diretamente comigo pelo WhatsApp. Conte o que está acontecendo e eu respondo com a solução mais rápida para a sua empresa não ficar parada."
            }
        ],
        "caption": """Como funciona para resolver um problema com a TI da sua empresa? 🤝

Quem tem comércio em Porto Velho já se frustrou abrindo chamado em empresa de fora: fila de atendimento, protocolos demorados e dias esperando sem resposta enquanto o caixa da loja tá parado.

Comigo o processo é direto, simples e transparente em 3 passos:

1️⃣ Conversa rápida no WhatsApp: Você me conta o que está acontecendo no seu computador, impressora ou sistema. Sem formulários longos.
2️⃣ Orçamento claro antes de começar: Passo o valor exato e o prazo antes de mexer em qualquer coisa. Sem sustos na conta final.
3️⃣ Problema resolvido com explicação simples: Conserto, testo no balcão junto com você e explico em português claro o que foi feito.

Sem robôs, sem intermediários. Você fala direto com quem resolve.

Precisa destravar algo no seu comércio hoje?
👉 Clique no link da bio e me chame no WhatsApp!

#portovelho #suportetecnico #comerciopvh #rondonia #atendimentodireto #rodrigofreiretech"""
    }
]

def generate_master_readme():
    readme_content = """# Grade de Lançamento do Instagram — Rodrigo Freire Tech (@rodrigofreire.dev)

Planejamento visual e conceitual baseado no [BRAND-GUIDE.md](../BRAND-GUIDE.md), estruturado em **grade 3x3** (9 posts) para preencher o feed de lançamento com padrão de marca profissional, reconhecível e alternância elegante entre preto e branco.

---

## 📱 Mosaico da Grade 3x3 no Perfil

```
┌──────────────────────────┬──────────────────────────┬──────────────────────────┐
│ POST 07 [PRETO / DARK]   │ POST 08 [BRANCO / LIGHT] │ POST 09 [PRETO / DARK]   │
│ Solução Sob Medida       │ Apresentação Pessoal     │ Como Funciona na Prática │
│ (Diagnóstico da Dor)     │ (Foto Real + Formação)   │ (3 Passos Transparentes) │
├──────────────────────────┼──────────────────────────┼──────────────────────────┤
│ POST 04 [BRANCO / LIGHT] │ POST 05 [PRETO / DARK]   │ POST 06 [BRANCO / LIGHT] │
│ Tecnologias Amigáveis    │ Automação de Tarefas     │ Cópia de Dados / Backup  │
│ (Simplicidade de Sistema)│ (Economia de Tempo)      │ (Proteção Contra Panes)  │
├──────────────────────────┼──────────────────────────┼──────────────────────────┤
│ POST 01 [PRETO / DARK]   │ POST 02 [BRANCO / LIGHT] │ POST 03 [PRETO / DARK]   │
│ Vendo bem no Instagram,  │ Socorro Técnico e Caixa  │ Site Próprio de Vendas   │
│ ainda preciso de site?   │ (Conserto Local PVH)     │ (Mais Lucro e Confiança) │
└──────────────────────────┴──────────────────────────┴──────────────────────────┘
```

> **Ordem de Postagem Sugerida:**
> No Instagram, os posts mais antigos ficam embaixo e os mais recentes em cima.
> Para a grade ficar exatamente no arranjo acima:
> 1. Comece postando o **Post 01** (inferior esquerdo), depois o **02** e o **03**.
> 2. Em seguida, poste a linha do meio: **04**, **05** e **06**.
> 3. Por fim, poste a linha do topo: **07**, **08** (sua foto de apresentação em destaque central) e **09**.

---

## 📂 Pastas e Conteúdos Gerados

Cada pasta contém todos os slides exportados em **PNG de alta resolução (1080x1350 - proporção 4:5 vertical do Instagram)**, além do arquivo `LEGENDA.md` com o texto formatado e hashtags prontas para publicação:

1. `post-01-vendo-bem-instagram-preciso-site/` (5 slides)
2. `post-02-socorro-tecnico/` (4 slides)
3. `post-03-site-vendas/` (4 slides)
4. `post-04-modernizacao-operacao/` (4 slides)
5. `post-05-automacao-tarefas/` (4 slides)
6. `post-06-protecao-backup/` (4 slides)
7. `post-07-solucao-sob-medida/` (4 slides)
8. `post-08-apresentacao-rodrigo-freire/` (4 slides - inclui sua foto oficial circular)
9. `post-09-como-funciona-passo-a-passo/` (4 slides)

---

## 🎨 Princípios do BRAND-GUIDE Aplicados

- **Cores Oficiais:** Base em Preto Profundo (`#070709`) alternada com Branco Quente (`#FCFCFB`), destacadas pela luz do Azul Elétrico (`#3533cd` / `#5350fa`).
- **Tipografia:** Títulos em *Plus Jakarta Sans* com pesos fortes (Bold/ExtraBold) e corpo de texto em *Inter* com entrelinha arejada para leitura confortável em telas de smartphones.
- **Monograma Fixo:** Selo oficial RFD vetorizado no topo esquerdo de todos os slides, garantindo reconhecimento instantâneo de autoria.
- **Tom de Voz:** Português coloquial, sem jargões de desenvolvedor, abrindo sempre pela dor real do empresário e destacando o ganho prático em agilidade e faturamento.
"""
    with open(POSTS_OUTPUT_DIR / "README.md", "w", encoding="utf-8") as f:
        f.write(readme_content)
    print("✓ README.md mestre da grade gerado com sucesso.")

if __name__ == "__main__":
    for post in ALL_POSTS:
        render_post(post)
    generate_master_readme()
    print("\n🎉 TODOS OS 9 CARROSSÉIS FORAM GERADOS COM SUCESSO!")
