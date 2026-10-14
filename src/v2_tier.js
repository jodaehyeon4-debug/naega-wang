  // ================= 화합을 키우는 정책 =================
  PP({ id: "har_council", cat: "men", name: "신하·호족과 함께 정하는 큰 회의", sub: "화백 회의 · 도병마사 · 비변사처럼", kings: "신라 · 고려 · 조선", cost: 1, repeat: 3, eff: { har: 8, kp: -3, cul: 1 }, tags: [-0.8, -0.2, 0],
    get note() { return `다툼이 심할수록(화합 35 미만) 효과가 커져요(화합 +5). 3시기마다 다시 열 수 있지만, 되풀이하면 효과가 줄어요.${S.st.har < 35 ? " 지금 효과가 커요!" : ""}`; },
    run() { const n = S.done.filter((d) => d.id === "har_council").length, k = n === 0 ? 1 : n === 1 ? 0.75 : 0.5, big = S.st.har < 35;
      return R({ har: Math.round((8 + (big ? 5 : 0)) * k), kp: -3, cul: 1 }, (big ? "다툼에 지친 신하들이 오랜만에 한자리에 모여 마음을 풀었어요! " : "") + "나랏일을 왕 혼자 정하지 않고 신하·호족과 함께 의논해 정했어요.", this.tags,
        { sl: ["큰 회의가 열리니, 서로 등 돌렸던 신하들이 같은 상에서 국밥을 먹었다.", "또 회의가 열리니, 신하들이 이번엔 자리 다툼 없이 앉았다.", "회의가 거듭되니, 신하들이 서로의 버릇을 다 알게 되었다."][Math.min(n, 2)] }); } });
  PP({ id: "har_hunt", cat: "men", name: "신하들과 함께하는 큰 사냥 대회", sub: "강무 · 사냥 대회", kings: "고구려 · 조선", cost: 1, repeat: 4, gamble: true, risky: true, eff: { har: 10, kp: 2, def: 1 }, fail: { har: -4, gold: -5 }, tags: [-0.4, 0.4, 0],
    chance() { return Math.min(0.85, 0.6 + (S.st.def >= 50 ? 0.1 : 0) + (S.st.kp >= 50 ? 0.1 : 0)); },
    note: "모험! 잘되면 신하들과 크게 가까워져요(고구려는 해마다 낙랑 언덕에서 사냥 대회를 열어 인재를 뽑았어요). 국방·왕권이 50 이상이면 확률이 올라요. 4시기마다 다시 열 수 있어요.",
    run() { if (Math.random() < this.chance()) return R({ har: 10, kp: 2, def: 1 }, "왕과 신하들이 함께 말을 달리고 활을 쏘며 하루를 보냈어요. 사냥감보다 웃음이 더 많았어요!", this.tags, { sl: "사냥 대회가 열리니, 왕이 잡은 꿩 한 마리를 신하들이 서로 자기 화살이라 우겼다." });
      return R({ har: -4, gold: -5 }, "하루 종일 비가 내려 사냥은커녕 모두 감기에 걸렸어요.", this.tags, { ok: false, sl: "사냥 대회 날 장대비가 내리니, 신하들이 천막 안에서 재채기만 하였다." }); } });

  // ================= 왕BTI 티어표: 그래서 1등이 누구야? =================
  const TIERS = [
    { g: "S", n: "천하제일 대왕", min: 82, d: "역사책 첫 장에 실릴 왕" },
    { g: "A", n: "역사에 빛나는 성군", min: 72, d: "오래도록 본받을 왕" },
    { g: "B", n: "이름을 떨친 군주", min: 63, d: "자기만의 색깔이 뚜렷한 왕" },
    { g: "C", n: "나라를 지켜 낸 임금", min: 54, d: "무난하게 나라를 이끈 왕" },
    { g: "D", n: "고생 많았던 임금", min: 45, d: "어려움 속에서 버틴 왕" },
    { g: "E", n: "아슬아슬 버틴 임금", min: 30, d: "나라가 무너질 뻔한 왕" },
    { g: "F", n: "무너진 나라의 왕", min: -1, d: "나라가 무너졌거나 폭군으로 기록된 왕" },
  ];
  const HOF_KEY = "king-hof-v1";
  const hofLoad = () => { try { const r = JSON.parse(localStorage.getItem(HOF_KEY) || "[]"); return Array.isArray(r) ? r : []; } catch (e) { return []; } };
  function kingScore() {
    const s = S.st, avg = avgOf(s), min = Math.min(...statVals());
    const gained = S.terr && S.terr0 ? S.terr.filter((x) => !S.terr0.includes(x)).length : 0;
    const dream = ["china", "manchu", "liaoBack", "seaKing", "waKing", "kept", "stayed"].filter((f) => S.flags[f]).length;
    const star = (SCEN[S.scen] && SCEN[S.scen].star) || 3;
    let sc = avg + Math.min(6, achievements().length) * 1.5 + (min >= 45 ? 3 : 0) + (agreeCount() >= 2 ? 3 : 0) + Math.min(8, gained * 2) + dream * 8 + (S.flags.warWon ? 2 : 0) + (altEnding() ? 5 : 0) + treasureScore() + featCount() * 3 + (featList().length && featCount() === featList().length ? 3 : 0) + (star - 3) * 3 - S.tyr * 3;
    // 조금만 더: 두 왕의 점수를 합쳐 평균 (선왕 점수 + 지금 점수)
    if (S.ext && S.ext.score1 != null) sc = (sc + S.ext.score1) / 2 - 2;
    if (S.over) sc = Math.min(sc, 40) - 10 + (S.overAt ? S.overAt.turn * 2 : 0);
    // 무너졌거나 폭군으로 기록되면 F 등급이라, 버텨 낸 왕보다 점수가 높지 않게 해요
    if (S.over || (S.end && S.end.rec && S.end.rec.kind === "tyrant")) sc = Math.min(sc, 29); else sc = Math.max(sc, 30);
    return Math.max(0, Math.min(100, Math.round(sc)));
  }
  function tierOf(score, rec) {
    if (S.over || (rec && rec.kind === "tyrant")) return TIERS[6];
    return TIERS.find((t) => t.min >= 0 && score >= t.min) || TIERS[5];
  }
  function tierSave() {
    const score = kingScore(), t = tierOf(score, S.end.rec);
    S.end.score = score; S.end.tier = t.g;
    const list = hofLoad();
    list.push({ name: S.king.trim() || "이름 없는 왕", nation: NATION(), scen: SCEN[S.scen] ? SCEN[S.scen].name : "", score, tier: t.g, style: S.end.rec.stamp, at: Date.now() });
    list.sort((a, b) => b.score - a.score);
    try { localStorage.setItem(HOF_KEY, JSON.stringify(list.slice(0, 60))); } catch (e) { /* 저장 안 됨 */ }
  }
  function tierPanel() {
    if (!S.end) return "";
    const score = S.end.score ?? kingScore(), me = S.end.tier || tierOf(score, S.end.rec).g;
    const hof = hofLoad(), mine = (h) => h.at && S.end && Math.abs(h.score - score) < 0.5 && h.name === (S.king.trim() || "이름 없는 왕") && h.tier === me;
    let meShown = false;
    const rows = TIERS.map((t) => {
      const ppl = hof.filter((h) => h.tier === t.g).slice(0, 8).map((h) => { const isMe = !meShown && mine(h); if (isMe) meShown = true; return `<span class="tchip ${isMe ? "me" : ""}" title="${esc(h.nation)} · ${esc(h.scen)}">${esc(h.name)} <b>${h.score}</b></span>`; }).join("");
      return `<div class="trow t${t.g} ${t.g === me ? "on" : ""}"><span class="tg">${t.g}</span><div class="tbody"><b>${esc(t.n)}</b> <span class="sub">${esc(t.d)}${t.min > 0 ? ` · ${t.min}점 이상` : ""}</span><div class="tchips">${ppl}</div></div></div>`;
    }).join("");
    const top = hof.slice(0, 5).map((h, i) => `<li><span class="rk">${i + 1}</span><b>${esc(h.name)}</b><span class="sub">${esc(h.nation)} · ${esc(h.style || "")}</span><span class="rs">${h.tier} · ${h.score}점</span></li>`).join("");
    const T = TIERS.find((t) => t.g === me);
    return `<section class="panel tierpanel"><div class="tierhead"><div><p class="sub">왕BTI 티어표 · 그래서 몇 등급일까?</p><h2><span class="tbig t${me}">${me}</span> ${esc(T.n)}</h2><p class="sub">왕력 점수 <b class="tscore">${score}점</b> · ${esc(S.end.rec.stamp)}</p></div>
      <p class="sub tnote">왕력 점수 = 여섯 능력치 평균 + 업적 + 고르게 키운 정도 + 처음 다짐 지키기 + 넓힌 땅 + '만약에?' 성공 + 나라의 어려움(★) − 폭정</p></div>
      <div class="tierlist">${rows}</div>
      ${top ? `<div class="hof"><b>이 기기 명예의 전당</b><ol>${top}</ol><p class="sub">이 기기에서 다스림을 마친 왕들의 기록이에요. 같은 기기로 플레이한 친구들끼리 비교할 수 있어요.</p></div>` : ""}</section>`;
  }
