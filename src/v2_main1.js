  // ================= 상태 =================
  const KEY = "king-game-v2";
  let S = null;
  const UI = { cat: "all", msg: null };
  const GOAL_BONUS = [6, 4, 2];
  function fresh() {
    return { v: 2, phase: "start", king: "", nation: "", scen: "A", goals: ["ppl", "kp", "def"], turn: 1,
      st: {}, start: {}, low: {}, done: [], flags: {}, used: [], log: [], tags: [], picks: [], econ: "normal", econUsed: {}, inc: 0, saved: 0,
      ev: null, evRes: null, over: null, overAt: null, tyr: 0, end: null, revealed: false };
  }
  function load() { try { const r = localStorage.getItem(KEY); const s = r ? JSON.parse(r) : null; return s && s.v === 2 ? s : null; } catch (e) { return null; } }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* 저장 안 됨 */ } }
  S = load() || fresh();

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const clamp = (v) => Math.max(0, Math.min(100, Math.round(v)));
  const has = (id) => S.done.some((d) => d.id === id && d.ok !== false);
  const tried = (id) => S.done.some((d) => d.id === id);
  const jong = (w) => { const c = String(w).charCodeAt(String(w).length - 1) - 0xac00; return c >= 0 && c <= 11171 ? c % 28 : 0; };
  const jo = (w, a, b) => w + (jong(w) ? a : b);
  // 숫자 뒤 "이에요/예요": 일·삼·육·칠·팔·십·백으로 끝나면 받침이 있어요
  const numIe = (n) => `${n}${[0, 1, 3, 6, 7, 8].includes(Math.abs(n) % 10) ? "이에요" : "예요"}`;
  const NATION = () => (SCEN[S.scen] && SCEN[S.scen].nation) || S.nation.trim() || "푸른 나라";
  const TITLE = () => (SCEN[S.scen] && SCEN[S.scen].title) || "왕";
  const KING = () => (S.king.trim() ? `${S.king.trim()} ${TITLE()}` : `새 ${TITLE()}`);
  const ERA_E = ["1592년 4월", "1592년 여름", "1592년 가을", "1593년", "1597년", "1598년 겨울", "1600~1605년", "1606~1610년", "1611~1615년", "1616~1620년"];
  const ERA_F = ["1625년 무렵", "1630년 무렵", "1636년 봄", "1636년 겨울", "1637~1640년", "1641~1645년", "1646~1650년", "1651~1655년", "1656~1660년", "1661~1665년"];
  const ERA_H = ["1789년 봄", "1789년 5월", "1789년 7월", "1792년", "1795년", "1797년", "1799년", "1802년", "1805년", "1808년"];
  const era = (t) => (t > 10 ? extEra(t) : ERAS[S.scen] ? ERAS[S.scen][t - 1] : S.scen === "E" ? ERA_E[t - 1] : S.scen === "F" ? ERA_F[t - 1] : S.scen === "G" ? `${1206 + (t - 1) * 3}년 무렵` : S.scen === "H" ? ERA_H[t - 1] : eraText(t));
  const WORLD = () => "GHLM".includes(S.scen);

  function apply(d) {
    const out = {};
    for (const k in d) {
      if (!d[k]) continue;
      const b = S.st[k]; let nv = b + d[k];
      // 65를 넘는 부분은 조금만 오름 (높을수록 올리기 어려움)
      if (d[k] > 0 && nv > 65) nv = Math.max(b, 65) + (nv - Math.max(b, 65)) * 0.4;
      S.st[k] = clamp(nv);
      const diff = S.st[k] - b; if (diff) out[k] = diff;
      S.low[k] = Math.min(S.low[k] ?? 100, S.st[k]);
    }
    return out;
  }
  const R = (d, text, tags, more) => Object.assign({ d, text, tags: tags || [0, 0, 0] }, more || {});
