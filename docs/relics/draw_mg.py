# 몽골 『몽골비사』 상상도: 실로 꿰맨 책(몽골말을 한자 소리로 적은 형태) + 푸른 늑대와 하늘
import os, re
from playwright.sync_api import sync_playwright
D = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(D, "draw.py"), encoding="utf-8").read()
exec(src[:src.index("# 1)")])  # BG, tag 재사용
def mongol():
    s = BG
    # 하늘(텡그리)과 초원 언덕
    s += '<rect x="0" y="0" width="800" height="230" fill="#7FA7C9" opacity="0.55"/><path d="M0 230 Q200 170 400 215 T800 200 V260 H0 Z" fill="#9DB27A" opacity="0.7"/>'
    s += '<circle cx="110" cy="80" r="34" fill="#F6ECD6" opacity="0.9"/>'
    # 언덕 위 푸른 늑대(하울링)
    s += '<g transform="translate(560,135) scale(1.25)" fill="#4E6A85"><path d="M0 60 Q-8 44 8 40 Q18 38 28 44 L38 18 Q44 0 58 -8 L66 -36 L64 -54 L72 -44 L80 -50 L98 -66 L94 -54 L86 -44 L82 -34 L78 -18 L80 10 L84 60 L74 60 L70 22 L62 32 L60 60 Z"/></g>'
    # 펼친 책
    s += '<g filter="url(#sh)"><path d="M140 260 L398 248 L398 500 L140 512 Z" fill="url(#paper)" stroke="#A88A55" stroke-width="2"/><path d="M402 248 L660 260 L660 512 L402 500 Z" fill="url(#paper)" stroke="#A88A55" stroke-width="2"/>'
    s += '<rect x="396" y="246" width="8" height="256" fill="#8C6A34"/></g>'
    for y in (300, 380, 460):
        s += f'<line x1="140" y1="{y}" x2="132" y2="{y}" stroke="#7A2A1A" stroke-width="4"/>'
    cols_r = ["成吉思合罕訥", "忽札兀兒", "孛兒帖赤那"]
    gl_r = ["칭기스 칸의", "근원은", "푸른 늑대"]
    for i, t in enumerate(cols_r):
        x = 610 - i * 78
        s += f'<text x="{x}" y="285" font-family="Noto Serif CJK KR, serif" font-size="28" fill="#2B1B0E" writing-mode="tb" letter-spacing="3">{t}</text>'
        s += f'<text x="{x+26}" y="285" font-family="Noto Sans CJK KR, sans-serif" font-size="12" fill="#8E2219" writing-mode="tb">{gl_r[i]}</text>'
    s += '<text x="300" y="285" font-family="Noto Serif CJK KR, serif" font-size="34" fill="#2B1B0E" writing-mode="tb" letter-spacing="8">元朝秘史</text>'
    s += '<rect x="200" y="410" width="54" height="54" rx="6" fill="#B9352A"/><text x="227" y="448" font-family="Noto Serif CJK KR, serif" font-size="26" fill="#F6ECD6" text-anchor="middle">秘</text>'
    s += '<text x="400" y="555" font-family="Noto Serif CJK KR, serif" font-size="26" fill="#3A2410" text-anchor="middle">몽골 『몽골비사』 — 칭기즈 칸 집안의 이야기</text>'
    s += '<text x="400" y="584" font-family="Noto Sans CJK KR, sans-serif" font-size="15" fill="#5A4428" text-anchor="middle">몽골말을 한자 소리로 받아 적은 모습 (원래 글은 전하지 않음)</text>'
    return s + tag("", "")
with sync_playwright() as p:
    b = p.chromium.launch(executable_path="/opt/pw-browsers/chromium"); pg = b.new_page(viewport={"width": 800, "height": 600})
    pg.set_content(f'<html><body style="margin:0"><svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">{mongol()}</svg></body></html>')
    pg.wait_for_timeout(200); pg.screenshot(path=os.path.join(D, "몽골비사.jpg"), type="jpeg", quality=90, clip={"x": 0, "y": 0, "width": 800, "height": 600})
    b.close()
print("ok")
