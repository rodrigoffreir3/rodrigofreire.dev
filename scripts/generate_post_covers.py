import os
import subprocess
import html
from PIL import Image

POSTS = [
    {
        "slug": "vendo-bem-instagram-preciso-site",
        "title": "Vendo bem no Instagram, ainda preciso de site?",
        "badge": "E-COMMERCE & NEGÓCIOS LOCAIS",
        "desc": "A dúvida real de quem já vende bem nas redes sociais em Porto Velho: quando site próprio vale a pena, quando não vale e como proteger sua carteira de clientes."
    },
    {
        "slug": "agi-didatico",
        "title": "Jensen Huang anunciou a chegada da AGI com o GPT-6 Astra: o que os dados realmente mostram",
        "badge": "INTELIGÊNCIA ARTIFICIAL & BENCHMARKS",
        "desc": "Separamos o que é marketing do fabricante de chips do que os testes independentes de trabalho de valor econômico real comprovam."
    },
    {
        "slug": "ia-fisica",
        "title": "IA física: todo mundo citou a frase do Jensen Huang, quase ninguém falou do que tá por trás dela",
        "badge": "DEEP TECH & SISTEMAS EMBARCADOS",
        "desc": "Entenda o que a IA física realmente exige em termos de hardware, determinismo temporal e engenharia de baixo nível no chão de fábrica."
    },
    {
        "slug": "energia-ia-ociosa",
        "title": "Quanto de energia uma IA gasta enquanto não faz nada?",
        "badge": "FINOPS & EFICIÊNCIA ENERGÉTICA",
        "desc": "Servidores de inferência passam a maior parte do tempo esperando. Medição no silício real (RAPL e NVML) revela por que o gasto em baixa carga é 12x maior."
    },
    {
        "slug": "a-vaga-nao-e-mais-pra-quem-escreve-codigo",
        "title": "A vaga não é mais pra quem escreve código. É pra quem sabe o que a IA fez depois",
        "badge": "MERCADO & CARREIRA EM TI",
        "desc": "Empresas pararam de perguntar o que a IA consegue fazer e passaram a perguntar quem vai auditar e conter o que ela fez em produção."
    },
    {
        "slug": "acordos-bilionarios-chips-ia-mercado-ti",
        "title": "Bilhões em chips de IA: o que isso tem a ver com o seu emprego de dev",
        "badge": "HARDWARE & NUVEM CORPORATIVA",
        "desc": "Amazon, Meta, Samsung e SK Hynix fecharam contratos que somam trilhões de dólares. O mapa de onde estarão as novas vagas técnicas de infraestrutura."
    },
    {
        "slug": "guardrails-agentes-ia",
        "title": "O agente de IA não desobedeceu. Ele obedeceu bem demais — e achou o buraco que ninguém viu",
        "badge": "SEGURANÇA & CONTENÇÃO EM RING 0",
        "desc": "Análise de incidente real onde modelos violaram isolamento. Por que regras de perímetro falham e a contenção no nível de syscalls é necessária."
    },
    {
        "slug": "custo-por-token",
        "title": "Sua empresa mede o gasto de IA em dólares por mês. O número que importa está escondido no kernel",
        "badge": "OBSERVABILIDADE & EBPF",
        "desc": "Por que o custo real por token é tão difícil de obter e como construir uma correlação temporal no escalonador do Linux."
    },
    {
        "slug": "anatomia-c2",
        "title": "Seu antivírus confia no steamcommunity.com. Esse foi o ponto cego que 1.980 sites pagaram",
        "badge": "SEGURANÇA DA INFORMAÇÃO & C2",
        "desc": "Campanha de malware que usou comentários da Steam como canal de comando. Por que defesas tradicionais perdem para a esteganografia e como o comportamento salva."
    },
    {
        "slug": "assimetria-reversa",
        "title": "Bloquear o invasor na hora foi o pior conselho que eu segui",
        "badge": "CYBER DECEPTION & HADES",
        "desc": "Por que o bloqueio imediato é o feedback perfeito para treinar um invasor, e como a decepção ativa e asfixia de recursos derrotam ameaças modernas."
    }
]

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800;900&family=Inter:wght@400;500;600&display=swap');
    
    * {{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }}
    
    body {{
      width: 1200px;
      height: 630px;
      background-color: #060609;
      background-image: 
        radial-gradient(circle at 88% 18%, rgba(53, 51, 205, 0.42) 0%, transparent 55%),
        radial-gradient(circle at 10% 88%, rgba(53, 51, 205, 0.25) 0%, transparent 45%),
        linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 100%);
      color: #ffffff;
      font-family: 'Plus Jakarta Sans', sans-serif;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 64px 75px;
      position: relative;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }}

    .grid-bg {{
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background-size: 38px 38px;
      background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
      pointer-events: none;
      z-index: 1;
    }}

    .content {{
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: space-between;
    }}

    .header-row {{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }}

    .brand-group {{
      display: flex;
      align-items: center;
      gap: 16px;
    }}

    .brand-logo {{
      width: 48px;
      height: 48px;
      object-fit: contain;
      filter: drop-shadow(0 0 16px rgba(53, 51, 205, 0.6));
    }}

    .brand-text {{
      font-size: 20px;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: #ffffff;
    }}

    .brand-badge {{
      background: rgba(53, 51, 205, 0.28);
      border: 1px solid rgba(53, 51, 205, 0.55);
      color: #9d9fff;
      font-size: 13px;
      font-weight: 700;
      padding: 6px 14px;
      border-radius: 999px;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }}

    .main-body {{
      margin: auto 0;
    }}

    .category-pill {{
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #cbd5e1;
      font-size: 13px;
      font-weight: 700;
      padding: 5px 14px;
      border-radius: 999px;
      margin-bottom: 20px;
      letter-spacing: 0.04em;
    }}

    .category-dot {{
      width: 7px;
      height: 7px;
      background-color: #3533cd;
      border-radius: 50%;
      box-shadow: 0 0 8px #3533cd;
    }}

    h1 {{
      font-size: {font_size}px;
      font-weight: 900;
      line-height: 1.16;
      letter-spacing: -0.03em;
      margin-bottom: 16px;
      max-width: 1050px;
      background: linear-gradient(180deg, #FFFFFF 30%, #C4C8D8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }}

    p.subtext {{
      font-family: 'Inter', sans-serif;
      font-size: 19px;
      line-height: 1.5;
      color: #94a3b8;
      max-width: 980px;
    }}

    .footer-row {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 22px;
    }}

    .footer-author {{
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      font-weight: 600;
      color: #cbd5e1;
      display: flex;
      align-items: center;
      gap: 8px;
    }}

    .domain-url {{
      font-size: 17px;
      font-weight: 700;
      color: #8f92ff;
      letter-spacing: -0.01em;
    }}
  </style>
</head>
<body>
  <div class="grid-bg"></div>
  <div class="content">
    
    <div class="header-row">
      <div class="brand-group">
        <img src="file:///home/rodrigo-freire/Downloads/rodrigofreire.dev/public/logo-rfd-white.png" class="brand-logo" alt="RFD Logo">
        <div class="brand-text">RODRIGO FREIRE · BLOG</div>
      </div>
      <div class="brand-badge">{badge}</div>
    </div>

    <div class="main-body">
      <div class="category-pill">
        <div class="category-dot"></div>
        Artigo Técnico & Análise Independente
      </div>
      <h1>{title}</h1>
      <p class="subtext">{desc}</p>
    </div>

    <div class="footer-row">
      <div class="footer-author">
        <span>Por Rodrigo Freire</span>
        <span style="opacity: 0.4">•</span>
        <span>Porto Velho — RO</span>
      </div>
      <div class="domain-url">
        rodrigofreire.dev.br/blog/{slug}
      </div>
    </div>

  </div>
</body>
</html>
"""

def generate_covers():
    logo_path = "/home/rodrigo-freire/Downloads/rodrigofreire.dev/public/logo-rfd-white.png"
    output_dir = "/home/rodrigo-freire/Downloads/rodrigofreire.dev/public/images/posts"
    os.makedirs(output_dir, exist_ok=True)
    temp_html = "/tmp/post-cover-template.html"
    temp_png = "/tmp/post-cover-raw.png"

    for p in POSTS:
        slug = p["slug"]
        title = html.escape(p["title"])
        badge = html.escape(p["badge"])
        desc = html.escape(p["desc"])
        
        # Ajustar tamanho da fonte dinamicamente pelo tamanho do título
        title_len = len(p["title"])
        if title_len > 90:
            font_size = 40
        elif title_len > 70:
            font_size = 44
        elif title_len > 50:
            font_size = 48
        else:
            font_size = 52

        rendered_html = HTML_TEMPLATE.format(
            title=title,
            badge=badge,
            desc=desc,
            slug=slug,
            font_size=font_size
        )

        with open(temp_html, "w", encoding="utf-8") as f:
            f.write(rendered_html)

        cmd = [
            "google-chrome",
            "--headless=new",
            "--hide-scrollbars",
            "--window-size=1200,630",
            f"--screenshot={temp_png}",
            temp_html
        ]
        subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

        # Otimizar com Pillow para ~120-180kB mantendo alta nitidez
        im = Image.open(temp_png)
        im_p = im.convert("P", palette=Image.ADAPTIVE, colors=256)
        
        dest_png = os.path.join(output_dir, f"{slug}.png")
        im_p.save(dest_png, optimize=True)
        size_kb = os.path.getsize(dest_png) / 1024
        print(f"✅ Capa gerada: {slug}.png ({size_kb:.1f} KB)")

if __name__ == "__main__":
    generate_covers()
