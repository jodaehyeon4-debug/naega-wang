import json, sys, collections
from playwright.sync_api import sync_playwright
BASE = "file:///tmp/claude-0/-home-claude/a3d432b7-bc61-5468-8412-2938cd20ead8/scratchpad/king/test.html"
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
          const fp = (st.fp[scen] || []).filter((id) => K.P[id] && K.polVisible(K.P[id]) && !K.lockReason(K.P[id], []));
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
    out.push({ feats: Object.keys(S2.feats || {}), score: S2.end.score, tier: S2.end.tier, over: S2.over, overT: S2.overAt && S2.overAt.turn, fate: f.t, stamp: S2.end.rec.stamp, kind: S2.end.rec.kind, myo: S2.end.rec.myo, king: m.top.k.n, pct: m.pct, avg: Math.round(vals.reduce((a, b) => a + b, 0) / 6), min: Math.min(...vals), st: S2.st, tyr: S2.tyr, inc: S2.inc, low: S2.low });
  }
  return out;
}
"""
S = {
  "feat": dict(ev="greedy", econ="greedy", pol="feat", safe=True, fp={
     "P": ["fortress","law","school","buddhism","p_north","p_west","p_south"],
     "Q": ["q_south","fortress","alliance","trade","q_north"],
     "R": ["law","buddhism","alliance","fortress","r_gaya","r_han"],
     "T": ["marriage","hostage","har_council","fortress","t_silla","t_hb","t_north"],
     "U": ["fortress","scholars","u_4gun1","u_6jin1","hangeul","u_4gun","u_samin","u_6jin","science","survey"],
     "V": ["tangpyeong","military_tax","v_tangbi","v_junchun","har_council"]}),
  "hellW": dict(ev="성충을 풀어|흥수의 말대로|계백에게|남은 힘|무너진 성|흩어진", evFallback="greedy", econ="greedy", pol=["alliance","fortress"], fill=True, safe=True, goals=["def","har","ppl"]),
  "hellY": dict(ev="화친하고|물러나 강가|제갈량에게|칠종칠금|조운과 위연|강유와 함께|장완", evFallback="greedy", econ="greedy", pol=["fortress","alliance"], fill=True, safe=True, goals=["def","har","ppl"]),
  "random":   dict(ev="random", econ="random", pol="random"),
  "randNorm": dict(ev="random", econ="normal", pol="random"),
  "greedy":   dict(ev="greedy", econ="greedy", pol="greedy", safe=True),
  "greedyR":  dict(ev="random", econ="greedy", pol="greedy", safe=True),
  "tyrant":   dict(ev="벌한다|잡아들여|군대를 보내|맹세|평소처럼|한쪽 편|엄하게|정리한다|의심|관군에|경계", econ="more", pol=["purge","disband","capital","conquest","rank","local","exam","slaves"], fill=True),
  "sejong":   dict(ev="창고|설득|터놓고|고르게|의원|어질고|벼슬|덜어|품삯", evFallback="greedy", econ="thrift", pol=["school","scholars","science","hangeul","survey","fortress","relief","law","exam"], fill=False, goals=["cul","ppl","def"]),
  "wanggeon": dict(ev="친해|고르게|설득|창고|덜어|용서", evFallback="greedy", econ="normal", pol=["marriage","hostage","taxcut","buddhism","relief","law","local","alliance","history"], fill=False, goals=["har","ppl","kp"]),
  "conqueror":dict(ev="맞서|정비|공격|수군|먼저", evFallback="greedy", econ="more", pol=["hwarang","alliance","fortress","conquest","law","capital","history"], fill=True, goals=["def","kp","gold"]),
  "merchant": dict(ev="허락|판다|무역|장터|세금만", evFallback="greedy", econ="market", pol=["coin","trade","daedong","law","local","survey","school","science"], fill=True, goals=["gold","ppl","cul"]),
  "people":   dict(ev="창고|덜어|세금을 크게|의원|품삯", evFallback="greedy", econ="less", pol=["relief","taxcut","military_tax","survey","daedong","school","science"], fill=False, goals=["ppl","har","cul"]),
}
names = sys.argv[1].split(",") if len(sys.argv) > 1 else list(S)
N = int(sys.argv[2]) if len(sys.argv) > 2 else 20
scens = sys.argv[3] if len(sys.argv) > 3 else "ABCDEF"
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(); errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto(BASE); pg.evaluate("localStorage.clear()"); pg.reload(); pg.wait_for_timeout(300)
    for name in names:
        st = S[name]
        print(f"===== {name}")
        allk = collections.Counter(); allstamp = collections.Counter(); allf = collections.Counter()
        for sc in scens:
            res = pg.evaluate(GAME, [st, sc, N])
            ov = collections.Counter(r["over"] for r in res if r["over"])
            fates = collections.Counter(r["fate"] for r in res)
            stamps = collections.Counter(r["stamp"] for r in res)
            kings = collections.Counter(r["king"] for r in res)
            allk.update(kings); allstamp.update(stamps); allf.update(fates)
            avg = sum(r["avg"] for r in res) / len(res)
            ovT = [r["overT"] for r in res if r["over"]]
            print(f" [{sc}] over {sum(ov.values())}/{len(res)} {dict(ov)} T{sorted(ovT)[:8]} | avg {avg:.0f} | inc {sum(r['inc'] for r in res)/len(res):.1f}")
            print("     fate:", dict(fates.most_common(6)))
            print("     stamp:", dict(stamps.most_common(6)))
            print("     king:", dict(kings.most_common(4)))
            print("     feats:", dict(collections.Counter(f for r in res for f in r["feats"])), "avgN", round(sum(len(r["feats"]) for r in res)/len(res),2))
            print("     tier:", dict(collections.Counter(r["tier"] for r in res).most_common()), "score avg", round(sum(r["score"] for r in res)/len(res)))
        print(" ALL kings:", dict(allk.most_common(8)))
        print(" ALL fates:", dict(allf.most_common(14)))
        print(" ALL stamps:", dict(allstamp.most_common(8)))
    print("errors", errs[:5])
    b.close()
