import re, sys
import os
D = os.path.dirname(os.path.abspath(__file__)) + "/"
r = lambda f: open(D + f, encoding="utf-8").read()
css = r("v1_css.css")
light_add = " --bronze: #8A5A2B; --hanji: #F7F0DE;\n  --rv-bg: #1A0D0A; --rv-glow: #4A1A12; --rv-ink: #F6EBD6; --rv-gold: #F2C14E; --rv-red: #E0523F; --door: #8E2219;\n"
dark_add = " --bronze: #D49A61; --hanji: #221D15;\n    --rv-bg: #1A0D0A; --rv-glow: #4A1A12; --rv-ink: #F6EBD6; --rv-gold: #F2C14E; --rv-red: #E0523F; --door: #8E2219;\n"
# :root 블록
css = css.replace("  --moon: #FFFFFF; --wave: #9DB6C6;\n", "  --moon: #FFFFFF; --wave: #9DB6C6;\n " + light_add, 1)
n = css.count("--moon: #F2F5F3; --wave: #3B5869;\n")
assert n == 2, n
css = css.replace("--moon: #F2F5F3; --wave: #3B5869;\n", "--moon: #F2F5F3; --wave: #3B5869;\n   " + dark_add)
css = css.replace("/* 어좌 뒤 일월오봉도: 해(주홍)·달·다섯 봉우리(석록)·물결(군청). 위에는 늘 보이는 나라 살림판, 아래는 시기마다 바뀌는 국정 화면. */",
  "/* 어좌 뒤 일월오봉도: 해(주홍)·달·다섯 봉우리(석록)·물결(군청). 위에는 늘 보이는 나라 살림판, 아래는 시기마다 바뀌는 국정 화면. 닮은 왕 공개 장면은 밤의 궁궐(늘 어두운 배경)에 오방색 꽃가루. */")
css += r("v2_add.css")
js = "\n".join([r("v2_data.js"), r("v2_main1.js"), r("v2_pol.js"), r("v2_ev.js"), r("v2_ev2.js"), r("v2_variety.js"), r("v2_flow.js"), r("v2_kings.js"), r("v2_sillok.js"), r("v2_scen5.js"), r("v2_mapdata.js"), r("v2_map.js"), r("v2_mapworld_data.js"), r("v2_mapworld.js"), r("v2_real.js"), r("v2_ifs.js"), r("v2_late.js"), r("v2_feat.js"), r("v2_alt.js"), r("v2_legend.js"), r("v2_hell.js"), r("v2_more.js"), r("v2_treasure.js"), r("v2_trinfo.js"), r("v2_era.js"), r("v2_patch.js"), r("v2_tier.js"), r("v2_reveal.js"), r("v2_export.js"), r("v2_render.js")])
head = '''<title>왕BTI</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hahmlet:wght@500;700;800&family=Gowun+Dodum&display=swap" media="print" onload="this.media='all'">
'''
body = '''
<div class="wrap">
  <div class="bar" id="bar" hidden></div>
  <main id="app"></main>
</div>
<div id="layer"></div>
<div id="toast" class="toast" role="status" aria-live="polite" hidden></div>
'''
out = head + "<style>" + css + "</style>\n" + body + "\n<script>\n(() => {\n" + js + "\n})();\n</script>\n"
open(D + "king.html", "w", encoding="utf-8").write(out)
open(D + "game.js", "w", encoding="utf-8").write("(() => {\n" + js + "\n})();\n")
# 시험용
test = out.replace("  render();\n  if (S.phase === \"end\" && !S.revealed) startReveal();",
  "  window.__K = { POL, P, EV, ECON, SCEN, ST, KINGS, get S() { return S; }, set S(v) { S = v; }, SPECIAL, portrait, render, fresh, SL_EV, SL_POL, sillokEntries, drawCard, drawSillokPages, buildPdf, canvasJpeg, apPoints, lockReason, chooseEvent, runPolicies, nextTurn, beginReign, togglePick, usedPoints, endData, fate, typeName, axes, startReveal, projection, newGame, shown, polVisible, isCore, altEnding, ALTS, FEATS, extendReign, SEEN: () => SEEN, relabel, KPREP, jPow, lPow, mapSVG, MAPS, terrInit, kingScore };\n  render();\n  if (S.phase === \"end\" && !S.revealed) startReveal();")
assert test != out
open(D + "test.html", "w", encoding="utf-8").write('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>' + test + '</body></html>')
# 배포용 독립 실행 파일 (어느 웹 호스팅에 올려도 동작)
import os
os.makedirs(D + "dist", exist_ok=True)
standalone = ('<!doctype html>\n<html lang="ko">\n<head>\n<meta charset="utf-8">\n'
  '<meta name="viewport" content="width=device-width,initial-scale=1">\n'
  '<meta name="description" content="초등 5학년 역사 의사결정 게임 - 왕BTI, 내가 왕이라면 나는 어떤 왕일까?">\n'
  + head + "<style>" + css + "</style>\n</head>\n<body>" + body
  + "\n<script>\n(() => {\n" + js + "\n})();\n</script>\n</body>\n</html>\n")
open(D + "dist/index.html", "w", encoding="utf-8").write(standalone)
print("built", len(out))
