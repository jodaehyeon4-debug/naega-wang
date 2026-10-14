from playwright.sync_api import sync_playwright
BG = '''<defs>
<radialGradient id="bg" cx="50%" cy="45%" r="75%"><stop offset="0" stop-color="#F6ECD6"/><stop offset="1" stop-color="#D9C39A"/></radialGradient>
<linearGradient id="paper" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#F3E3BF"/><stop offset="1" stop-color="#E2CB98"/></linearGradient>
<linearGradient id="wood" x1="0" x2="1"><stop offset="0" stop-color="#8A5A2B"/><stop offset="0.5" stop-color="#A9743E"/><stop offset="1" stop-color="#7A4B22"/></linearGradient>
<linearGradient id="bam" x1="0" x2="1"><stop offset="0" stop-color="#C9A86A"/><stop offset="0.5" stop-color="#E3C98F"/><stop offset="1" stop-color="#B9955A"/></linearGradient>
<filter id="sh" x="-10%" y="-10%" width="130%" height="130%"><feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="#3A2410" flood-opacity="0.35"/></filter>
</defs><rect width="800" height="600" fill="url(#bg)"/>'''
def tag(t, sub):
    return f'''<g font-family="Noto Sans CJK KR, sans-serif"><rect x="24" y="24" width="96" height="34" rx="17" fill="#8E2219"/><text x="72" y="47" font-size="17" font-weight="700" fill="#fff" text-anchor="middle">상상도</text>
<text x="776" y="572" font-size="18" fill="#5A4428" text-anchor="end">{sub}</text></g>'''
# 1) 고구려 『유기』 100권: 서가에 쌓인 두루마리 100권 + 삼족오
def yugi():
    s = BG
    s += '<g filter="url(#sh)"><rect x="150" y="150" width="500" height="360" rx="8" fill="url(#wood)"/>'
    for y in (150, 270, 390, 506):
        s += f'<rect x="140" y="{y-6}" width="520" height="14" rx="4" fill="#5E3A17"/>'
    import random; random.seed(7)
    for row, y0 in enumerate((168, 288, 408)):
        x = 170
        while x < 620:
            r = random.choice([15, 16, 17])
            col = random.choice(["#E9D3A1", "#EAD9AE", "#DCC089", "#F0DFB6"])
            s += f'<g><rect x="{x}" y="{y0}" width="{2*r}" height="88" rx="4" fill="{col}" stroke="#9C7A45" stroke-width="1.5"/><ellipse cx="{x+r}" cy="{y0}" rx="{r}" ry="6" fill="#B68A4A"/><circle cx="{x+r}" cy="{y0}" r="4" fill="#6B3E16"/>'
            if random.random() < 0.35: s += f'<rect x="{x+4}" y="{y0+30}" width="{2*r-8}" height="10" fill="#B9352A"/>'
            s += '</g>'
            x += 2*r + 4
    s += '</g>'
    # 삼족오 해
    s += '<circle cx="680" cy="110" r="52" fill="#E0523F"/><path d="M652 120 q14 -26 30 -16 q10 -18 26 -6 l-10 8 q8 6 0 14 l-14 -4 l-6 16 l-6 -14 l-8 12 z" fill="#1C1C1C"/>'
    s += '<g font-family="Noto Serif CJK KR, serif" fill="#3A2410"><text x="400" y="118" font-size="52" font-weight="700" text-anchor="middle">留記</text><text x="400" y="548" font-size="26" text-anchor="middle">고구려 『유기』 100권</text><text x="400" y="582" font-size="17" fill="#5A4428" text-anchor="middle">나라를 세울 때부터의 일을 적은 역사책 (전하지 않음)</text></g>'
    return s + tag("", "")
# 2) 백제 『서기』: 펼쳐진 두루마리 + 붓·벼루, 연꽃무늬
def seogi():
    s = BG
    s += '<g filter="url(#sh)"><rect x="120" y="170" width="560" height="300" fill="url(#paper)"/>'
    s += '<rect x="96" y="150" width="34" height="340" rx="10" fill="url(#wood)"/><rect x="670" y="150" width="34" height="340" rx="10" fill="url(#wood)"/>'
    s += '<rect x="100" y="140" width="26" height="14" rx="4" fill="#C99A3B"/><rect x="100" y="486" width="26" height="14" rx="4" fill="#C99A3B"/><rect x="674" y="140" width="26" height="14" rx="4" fill="#C99A3B"/><rect x="674" y="486" width="26" height="14" rx="4" fill="#C99A3B"/></g>'
    cols = ["百濟開國已來", "未有以文字記事", "至是得博士高興", "始有書記", "近肖古王", "二十九年"]
    for i, t in enumerate(cols):
        x = 620 - i*80
        s += f'<text x="{x}" y="200" font-family="Noto Serif CJK KR, serif" font-size="30" fill="#2B1B0E" writing-mode="tb" letter-spacing="4">{t}</text>'
    s += '<g transform="translate(560,500)"><ellipse cx="0" cy="18" rx="70" ry="22" fill="#2E2A26"/><ellipse cx="0" cy="12" rx="56" ry="15" fill="#151210"/></g>'
    s += '<g transform="translate(190,520) rotate(-18)"><rect x="0" y="-7" width="190" height="14" rx="6" fill="#7A4B22"/><path d="M190 -7 q40 7 0 14 z" fill="#1E1A16"/></g>'
    # 연꽃
    s += '<g transform="translate(400,95)" fill="#D98A8A" stroke="#A35454" stroke-width="2">' + ''.join(f'<ellipse cx="0" cy="-26" rx="14" ry="30" transform="rotate({a})"/>' for a in range(0, 360, 45)) + '<circle r="14" fill="#E8C35A" stroke="#B08A2E"/></g>'
    s += '<text x="400" y="565" font-family="Noto Serif CJK KR, serif" font-size="26" fill="#3A2410" text-anchor="middle">백제 『서기』 — 박사 고흥이 쓴 역사책</text>'
    return s + tag("", "")
# 3) 신라 『국사』: 죽간 묶음 + 끈 + 붉은 인장, 금관 장식
def guksa():
    s = BG
    s += '<g filter="url(#sh)" transform="translate(400,320) rotate(-6) translate(-260,-170)">'
    n = 15
    for i in range(n):
        x = i*35
        s += f'<rect x="{x}" y="0" width="30" height="340" rx="6" fill="url(#bam)" stroke="#8C6A34" stroke-width="1.5"/>'
        s += f'<rect x="{x}" y="60" width="30" height="5" fill="#9C7A45" opacity="0.5"/><rect x="{x}" y="280" width="30" height="5" fill="#9C7A45" opacity="0.5"/>'
    s += '<path d="M-10 70 Q260 92 530 70" fill="none" stroke="#7A2A1A" stroke-width="7"/><path d="M-10 290 Q260 312 530 290" fill="none" stroke="#7A2A1A" stroke-width="7"/>'
    txt = ["國史", "新羅", "眞興王", "六年", "居柒夫", "修撰"]
    for i, t in enumerate(txt):
        s += f'<text x="{40+i*80}" y="110" font-family="Noto Serif CJK KR, serif" font-size="30" fill="#2B1B0E" writing-mode="tb" letter-spacing="6">{t}</text>'
    s += '<rect x="440" y="200" width="56" height="56" rx="6" fill="#B9352A"/><text x="468" y="240" font-family="Noto Serif CJK KR, serif" font-size="26" fill="#F6ECD6" text-anchor="middle">史</text></g>'
    # 금관 장식(출자형)
    s += '<g transform="translate(400,78)" fill="#E3B341" stroke="#9C7420" stroke-width="2"><rect x="-90" y="20" width="180" height="16" rx="3"/>'
    for dx in (-60, 0, 60):
        s += f'<path d="M{dx} 20 v-50 M{dx} -5 h-14 v-14 M{dx} -5 h14 v-14 M{dx} -25 h-12 v-12 M{dx} -25 h12 v-12" fill="none" stroke-width="6" stroke-linecap="round"/>'
    s += ''.join(f'<circle cx="{x}" cy="44" r="5"/>' for x in range(-80, 90, 20)) + '</g>'
    s += '<text x="400" y="560" font-family="Noto Serif CJK KR, serif" font-size="26" fill="#3A2410" text-anchor="middle">신라 『국사』 — 거칠부가 펴낸 나라의 역사 (545년)</text>'
    return s + tag("", "")
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={"width": 800, "height": 600})
    for name, fn in [("유기_100권", yugi), ("서기", seogi), ("국사", guksa)]:
        pg.set_content(f'<html><body style="margin:0"><svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">{fn()}</svg></body></html>')
        pg.wait_for_timeout(200); pg.screenshot(path=f"{name}.jpg", type="jpeg", quality=90, clip={"x":0,"y":0,"width":800,"height":600})
    b.close()
print("ok")
