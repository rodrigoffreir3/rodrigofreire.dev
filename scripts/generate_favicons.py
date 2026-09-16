#!/usr/bin/env python3
import sys
from pathlib import Path
from PIL import Image, ImageFilter, ImageEnhance

ROOT_DIR = Path(__file__).resolve().parent.parent
SRC_PATH = ROOT_DIR / 'public' / 'RODRIGO.FREIRE (250 x 250 px).png'
PUBLIC_DIR = ROOT_DIR / 'public'

if not SRC_PATH.exists():
    print(f'Error: {SRC_PATH} does not exist')
    sys.exit(1)

src = Image.open(SRC_PATH).convert('RGBA')
bbox = src.getbbox() # (14, 72, 232, 180)
cropped = src.crop(bbox)
cw, ch = cropped.size

def generate_size(size):
    if size == 16:
        target_w = 16
        pad_y = (16 - int(ch * (16 / cw))) // 2
        gamma = 0.40
        c_boost = 1.25
        sharp_r, sharp_p = 0.7, 170
    elif size == 32:
        target_w = 30
        pad_y = (32 - int(ch * (target_w / cw))) // 2
        gamma = 0.45
        c_boost = 1.20
        sharp_r, sharp_p = 0.9, 150
    elif size == 48:
        target_w = 44
        pad_y = (48 - int(ch * (target_w / cw))) // 2
        gamma = 0.55
        c_boost = 1.15
        sharp_r, sharp_p = 1.0, 130
    elif size == 96:
        target_w = 88
        pad_y = (96 - int(ch * (target_w / cw))) // 2
        gamma = 0.70
        c_boost = 1.10
        sharp_r, sharp_p = 1.0, 110
    elif size == 180:
        target_w = 160
        pad_y = (180 - int(ch * (target_w / cw))) // 2
        gamma = 0.85
        c_boost = 1.05
        sharp_r, sharp_p = 1.0, 90
    elif size == 192:
        target_w = 172
        pad_y = (192 - int(ch * (target_w / cw))) // 2
        gamma = 0.85
        c_boost = 1.05
        sharp_r, sharp_p = 1.0, 90
    else: # 512
        target_w = 460
        pad_y = (512 - int(ch * (target_w / cw))) // 2
        gamma = 0.95
        c_boost = 1.0
        sharp_r, sharp_p = 0, 0

    target_h = int(ch * (target_w / cw))
    resized = cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)
    r, g, b, a = resized.split()
    
    lut_a = []
    for v in range(256):
        if v < 8:
            lut_a.append(0)
        else:
            b_val = int(255 * ((v / 255.0) ** gamma))
            lut_a.append(min(255, b_val))
    a_boost = a.point(lut_a)
    
    rgb = Image.merge('RGB', (r, g, b))
    if c_boost != 1.0:
        enh_c = ImageEnhance.Contrast(rgb)
        rgb = enh_c.enhance(c_boost)
    if sharp_p > 0:
        rgb = rgb.filter(ImageFilter.UnsharpMask(radius=sharp_r, percent=sharp_p, threshold=1))
    
    rs, gs, bs = rgb.split()
    opt = Image.merge('RGBA', (rs, gs, bs, a_boost))
    
    canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    x = (size - target_w) // 2
    y = pad_y
    canvas.paste(opt, (x, y), opt)
    return canvas

def main():
    print('🎨 Gerando favicons otimizados a partir de RODRIGO.FREIRE (250 x 250 px).png...')
    im16 = generate_size(16)
    im32 = generate_size(32)
    im48 = generate_size(48)
    im96 = generate_size(96)
    im180 = generate_size(180)
    im192 = generate_size(192)
    im512 = generate_size(512)

    im16.save(PUBLIC_DIR / 'favicon-16x16.png', 'PNG')
    im32.save(PUBLIC_DIR / 'favicon-32x32.png', 'PNG')
    im48.save(PUBLIC_DIR / 'favicon-48x48.png', 'PNG')
    im96.save(PUBLIC_DIR / 'favicon-96x96.png', 'PNG')
    im180.save(PUBLIC_DIR / 'apple-touch-icon.png', 'PNG')
    im192.save(PUBLIC_DIR / 'favicon-192x192.png', 'PNG')
    im512.save(PUBLIC_DIR / 'icon-512.png', 'PNG')

    im48.save(
        PUBLIC_DIR / 'favicon.ico',
        format='ICO',
        sizes=[(16, 16), (32, 32), (48, 48)],
        append_images=[im16, im32]
    )
    print('✅ Favicons gerados com sucesso em public/!')

if __name__ == '__main__':
    main()
