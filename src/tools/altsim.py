import json, sys, collections
from playwright.sync_api import sync_playwright
BASE = "file:///home/claude/naega-wang/src/test.html"
GAME = r"""
([st, scen, N]) => {
  window.__FAST = true;
  const K = window.__K;
  const out = [];
  const val = (S) => { const v = K.ST.map((x) => S.st[x.k]); return v.reduce((a, b) => a + Math.min(b, 72), 0) + 2.5 * Math.min(...v) - (S.over ? 1000 : 0); };
  const pickEvGreedy = () => {
    const S0 = JSON.stringify(K.S); const sh = K.shown(); let best = sh[0], bv = -1e9;
    for (const i of sh) { let tot = 0; for (let r = 0; r < 2; r++) { K.S = JSON.parse(S0); K.chooseEvent(i); tot += val(K.S); } if (tot > bv) { bv = tot; best = i; } }
    K.S = JSON.parse(S0); return best;
  };
  const econGreedy = (S) => {
    const s = S.st;
    if (s.gold < 25 && s.ppl >= 35) return "more";
    if (s.gold < 40 && s.har >= 30) return "market";
    if (s.ppl < 35 && s.gold >= 35) return "less";
    if (s.gold < 50) return "thrift";
    return s.ppl < 55 && s.gold > 55 ? "less" : "normal";
  };
  for (let g = 0; g < N; g++) {
    K.S = K.fresh(); const S = K.S; S.scen = scen; S.goals = st.goals || ["ppl", "kp", "def"]; K.beginReign();
    let guard = 0;
    while (K.S.phase !== "end" && guard++ < 50) {
      const S = K.S;
      if (S.phase === "event") {
        const cs = K.EV[S.ev].choices(), sh = K.shown(); let i = 0;
        if (st.ev === "random") i = sh[Math.floor(Math.random() * sh.length)];
        else if (st.ev === "greedy") i = pickEvGreedy();
        else { const re = new RegExp(st.ev); i = sh.find((j) => re.test(cs[j].label)); if (i === undefined) i = st.evFallback === "greedy" ? pickEvGreedy() : sh[Math.floor(Math.random() * sh.length)]; }
        K.chooseEvent(i); continue;
      }
      if (S.phase === "policy") {
        // 살림
        if (st.econ === "random") S.econ = K.ECON[Math.floor(Math.random() * K.ECON.length)].id;
        else if (st.econ === "greedy") S.econ = econGreedy(S);
        else S.econ = st.econ || "normal";
        // 정책
        let pref;
        const avail = K.POL.filter((p) => K.polVisible(p) && !K.lockReason(p, []));
        if (st.pol === "random") pref = avail.map((p) => p.id).sort(() => Math.random() - 0.5);
        else if (st.pol === "greedy") {
          const w = (k) => Math.max(0.15, (68 - S.st[k]) / 18);
          const left = 10 - S.turn;
          const sc = (p) => (Object.entries(p.eff).reduce((a, [k, v]) => a + v * w(k), 0) + (p.inc || 0) * left * 0.6 * w("gold")) / p.cost + Math.random() * 0.6;
          pref = avail.sort((a, b) => sc(b) - sc(a)).map((p) => p.id);
        } else if (st.pol === "feat") {
          const w = (k) => Math.max(0.15, (68 - S.st[k]) / 18), left = 10 - S.turn;
          const sc = (p) => (Object.entries(p.eff).reduce((a, [k, v]) => a + v * w(k), 0) + (p.inc || 0) * left * 0.6 * w("gold")) / p.cost + Math.random() * 0.6;
          const fp = (st.altIdx !== undefined ? K.ALTS[scen][st.altIdx].pols : ((st.fp || {})[scen] || [])).filter((id) => K.P[id] && K.polVisible(K.P[id]) && !K.lockReason(K.P[id], []));
          pref = fp.concat(avail.filter((p) => !fp.includes(p.id)).sort((a, b) => sc(b) - sc(a)).map((p) => p.id));
          if (fp.length && K.P[fp[0]].cost > K.apPoints()) pref = [];
        } else { pref = st.pol.slice(); if (st.fill) pref.push(...avail.map((p) => p.id).filter((x) => !pref.includes(x)).sort(() => Math.random() - 0.5)); }
        S.picks = [];
        const ap = K.apPoints();
        for (const id of pref) {
          if (S.done.some((d) => d.id === id) || S.picks.includes(id)) continue;
          const p = K.P[id];
          if (!p || !K.polVisible(p)) continue;
          if (K.usedPoints() + p.cost > ap) continue;
          if (K.lockReason(p, S.picks)) continue;
          if (st.safe) { S.picks.push(id); const pj = K.projection(); if (pj.zero.length || pj.low.length) { S.picks.pop(); continue; } } else S.picks.push(id);
          if (st.pol === "random" && Math.random() < 0.15) break;
        }
        K.runPolicies(); continue;
      }
      if (S.phase === "result") { K.nextTurn(); continue; }
    }
    const S2 = K.S, f = K.fate(), m = K.endData();
    const vals = K.ST.map((x) => S2.st[x.k]);
    out.push({ alt: (K.altEnding() || {}).id || null, done: S2.done.map(d=>d.turn+":"+d.id+(d.ok===false?"X":"")).join(" "), feats: Object.keys(S2.feats || {}), score: S2.end.score, tier: S2.end.tier, over: S2.over, overT: S2.overAt && S2.overAt.turn, fate: f.t, stamp: S2.end.rec.stamp, kind: S2.end.rec.kind, myo: S2.end.rec.myo, king: m.top.k.n, pct: m.pct, avg: Math.round(vals.reduce((a, b) => a + b, 0) / 6), min: Math.min(...vals), st: S2.st, tyr: S2.tyr, inc: S2.inc, low: S2.low });
  }
  return out;
}
"""

import json
STRATS = {
  "random": dict(ev="random", econ="random", pol="random"),
  "greedy": dict(ev="greedy", econ="greedy", pol="greedy", safe=True),
}
N = int(sys.argv[1]); scens = sys.argv[2]
with sync_playwright() as p:
    b = p.chromium.launch(executable_path="/opt/pw-browsers/chromium"); pg = b.new_page(); errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto(BASE); pg.evaluate("localStorage.clear()"); pg.reload(); pg.wait_for_timeout(300)
    for sc in scens:
        alts = pg.evaluate("(sc)=>(window.__K.ALTS[sc]||[]).map(a=>a.id)", sc)
        line = {}
        for nm, st in STRATS.items():
            res = pg.evaluate(GAME, [st, sc, N])
            c = collections.Counter(r["alt"] for r in res)
            line[nm] = {a: round(100 * c[a] / N, 1) for a in alts}
            line[nm]["_feat3"] = round(100 * sum(1 for r in res if len(r["feats"]) >= 3) / N, 1)
        for i, a in enumerate(alts):
            st = dict(ev="random", econ="greedy", pol="feat", safe=True, altIdx=i)
            res = pg.evaluate(GAME, [st, sc, N])
            line.setdefault("target", {})[a] = round(100 * sum(1 for r in res if r["alt"] == a) / N, 1)
        print(sc, json.dumps(line, ensure_ascii=False), flush=True)
    print("errors", errs[:3])
    b.close()
