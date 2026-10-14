  // ================= 매 판마다 새로운 선택지 =================
  // 이 기기에서 지난 판들에 본 사건·고른 선택지를 기억해, 덜 본 사건과 안 골라 본 선택지가 더 자주 나오게 해요.
  const SEEN_KEY = "king-seen-v1";
  function seenLoad() {
    try { const r = JSON.parse(localStorage.getItem(SEEN_KEY) || "null"); if (r && r.ev && r.ch) return r; } catch (e) { /* 무시 */ }
    return { ev: {}, ch: {}, games: 0 };
  }
  let SEEN = seenLoad();
  function seenSave() { try { localStorage.setItem(SEEN_KEY, JSON.stringify(SEEN)); } catch (e) { /* 저장 안 됨 */ } }
  // 같은 종류의 선택을 이번 판에 몇 번 했는지 (되풀이할수록 효과가 줄어요)
  const again = (k) => { S.kinds = S.kinds || {}; const n = S.kinds[k] || 0; S.kinds[k] = n + 1; return n; };
  function wpick(items, w) {
    const ws = items.map(w), tot = ws.reduce((a, b) => a + b, 0);
    let r = Math.random() * tot;
    for (let i = 0; i < items.length; i++) { r -= ws[i]; if (r <= 0) return items[i]; }
    return items[items.length - 1];
  }
  // 사건마다 보여 줄 선택지 고르기: pick 개수만큼, 안 골라 본 선택지를 더 자주
  function showChoices(id) {
    const ev = EV[id], all = ev.choices();
    const idx = all.map((c, i) => i).filter((i) => !all[i].when || all[i].when());
    const n = ev.pick || idx.length;
    if (idx.length <= n) return idx;
    const out = idx.filter((i) => all[i].keep);
    let rest = idx.filter((i) => !all[i].keep);
    const w = (j) => (all[j].risk ? 0.9 : 1) / (1 + 1.5 * (SEEN.ch[id + ":" + j] || 0));
    while (out.length < n && rest.length) { const i = wpick(rest, w); out.push(i); rest = rest.filter((j) => j !== i); }
    // 모험 선택지만 남거나, 모험이 둘을 넘지 않게
    const risky = out.filter((i) => all[i].risk);
    if (risky.length > 2 || risky.length === out.length) {
      const safe = rest.filter((j) => !all[j].risk);
      if (safe.length) { out.splice(out.indexOf(risky[risky.length - 1]), 1, safe[Math.floor(Math.random() * safe.length)]); }
    }
    return out.sort((a, b) => a - b);
  }
  const shown = () => S.evShow || EV[S.ev].choices().map((c, i) => i);
  // 지난 판에서 이 사건을 만난 적이 있는데, 이 선택지는 한 번도 안 골랐다면 '새 길'
  const freshChoice = (i) => S.evSeen > 0 && !SEEN.ch[S.ev + ":" + i];
  function poolOk(id) {
    const e = EV[id];
    if (!e) return false;
    if (e.kr && WORLD()) return false;
    if (e.not && e.not.includes(S.scen)) return false;
    if (e.need && !e.need()) return false;
    return true;
  }
  // 정책 카드: 나라(시나리오)에 맞는 것만
  function polVisible(p) {
    if (p.fromTurn && S.turn < p.fromTurn && S.phase !== "start") return false;
    const sc = SCEN[S.scen] || {};
    if (p.scen) return p.scen.includes(S.scen) && (!p.phase || p.phase());
    const o = sc.only && sc.only();
    if (o) return o.includes(p.id);
    return !(sc.hide || []).includes(p.id);
  }
