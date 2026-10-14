import json, collections
from playwright.sync_api import sync_playwright
BASE = "file:///tmp/claude-0/-home-claude/a3d432b7-bc61-5468-8412-2938cd20ead8/scratchpad/king/test.html"
JS = r"""
(N) => {
  window.__FAST = true; const K = window.__K; const used = {}; const errs = []; const generic = {};
  for (let g = 0; g < N; g++) for (const scen of 'ABCDEFGHJKLMPQRTUV') {
    try {
      K.S = K.fresh(); K.S.scen = scen; K.beginReign(); let guard = 0;
      while (K.S.phase !== 'end' && guard++ < 50) {
        const S = K.S;
        if (S.phase === 'event') { used[S.ev] = (used[S.ev] || 0) + 1; const sh = K.shown(); const ev = K.EV[S.ev]; if (typeof ev.title !== 'string') errs.push('title not string ' + S.ev); const txt = ev.text(); if (!txt || txt.includes('undefined') || txt.includes('NaN')) errs.push('bad text ' + S.ev); ev.choices().forEach((c, i) => { if (!c.label) errs.push('no label ' + S.ev + i); }); K.chooseEvent(sh[Math.floor(Math.random() * sh.length)]); if (S.phase === 'event') errs.push('choose failed ' + S.ev); }
        else if (S.phase === 'policy') { S.econ = K.ECON[Math.floor(Math.random() * 6)].id; S.picks = []; const ap = K.apPoints();
          for (const p of K.POL.filter(K.polVisible).sort(() => Math.random() - .5)) { if (S.done.some(d => d.id === p.id) || K.usedPoints() + p.cost > ap || K.lockReason(p, S.picks)) continue; S.picks.push(p.id); }
          K.runPolicies(); }
        else K.nextTurn();
      }
      const d = K.endData(); const f = K.fate(); if (!f || !f.t) errs.push(scen + ': no fate'); if (!d.top) errs.push(scen + ': no king'); const se = K.sillokEntries(); if (se.some(e => !e.date || e.lines.some(l => !l || l.includes('undefined') || l.includes('NaN')) || !e.sag || e.sag.includes('undefined'))) errs.push(scen + ': bad sillok ' + JSON.stringify(se).slice(0, 300));
      const gen = se.flatMap(e => e.lines).filter(l => l.includes("' 하였다.") || l.includes("'을(를) 펼쳤다.")); gen.forEach(l => { generic[l.slice(0, 40)] = (generic[l.slice(0, 40)] || 0) + 1; });
    } catch (e) { errs.push(scen + ': ' + e.message); }
  }
  return { used, errs: errs.slice(0, 8), nerr: errs.length, all: Object.keys(K.EV).filter(k => !used[k]), generic };
}
"""
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(); pe = []
    pg.on("pageerror", lambda e: pe.append(str(e)))
    pg.goto(BASE); pg.wait_for_timeout(300)
    r = pg.evaluate(JS, 60)
    print(json.dumps(r, ensure_ascii=False)); print(pe[:3]); b.close()
