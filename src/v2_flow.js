  // ================= 흐름 =================
  const ZERO_ORDER = ["ppl", "kp", "def", "gold", "har", "cul"];
  const zeroStat = () => ZERO_ORDER.find((k) => S.st[k] <= 0) || null;
  function snap() { (S.hist = S.hist || []).push({ t: S.turn, st: { ...S.st } }); }
  function overNow(k, where, L) {
    if (L) S.log.push(L);
    snap();
    S.over = k; S.overAt = { turn: S.turn, where };
    finish();
  }
  function startTurn() {
    relabel();
    S.terrTurn = S.terr ? S.terr.slice() : null; S.ev = pickEvent(); S.used.push(S.ev); S.evShow = showChoices(S.ev); S.evSeen = SEEN.ev[S.ev] || 0; SEEN.ev[S.ev] = S.evSeen + 1; seenSave(); S.evRes = null; S.picks = []; S.econ = "normal"; S.phase = "event"; UI.msg = null; save(); render();
  }
  function chooseEvent(i) {
    const ev = EV[S.ev];
    const c = ev.choices()[i];
    if (!c || (S.evShow && !S.evShow.includes(i))) return;
    SEEN.ch[S.ev + ":" + i] = (SEEN.ch[S.ev + ":" + i] || 0) + 1; seenSave();
    const before = { ...S.st };
    const sum = ev.base ? { ...ev.base() } : {};
    const r = c.run();
    for (const k in r.d) sum[k] = (sum[k] || 0) + r.d[k];
    const delta = apply(sum);
    S.tags.push({ v: r.tags, w: 0.6 });
    S.evRes = { title: ev.title, h: ev.h, choice: c.label, text: r.text, delta, ok: r.ok !== false, key: S.ev === "f4" && S.flags.submit ? "f4s" : S.ev, ci: i, risk: c.risk || 0, sl: r.sl || null };
    const z = zeroStat();
    if (z) return overNow(z, `'${ev.title}' 사건에서 '${c.label}'을(를) 고른 뒤`, { turn: S.turn, ev: S.evRes, econ: null, res: [], drift: null, warn: [], cut: true });
    S.phase = "policy"; UI.cat = "all"; UI.msg = null;
    save(); render(before);
  }
  function apPoints() {
    return Math.max(1, 2 + (S.ext && S.turn > 10 ? 1 : 0) + (S.turn === 1 ? 1 : 0) + S.saved + (S.st.gold >= 75 ? 1 : 0) - (S.st.gold < 10 ? 1 : 0));
  }
  const usedPoints = () => S.picks.reduce((a, x) => a + P[x].cost, 0);
  // 되풀이할 수 있는 정책은 몇 시기가 지나면 다시 할 수 있어요
  function usedUp(p) {
    if (!tried(p.id)) return null;
    if (!p.repeat) return "이미 했어요";
    const last = Math.max(...S.done.filter((d) => d.id === p.id).map((d) => d.turn));
    const left = p.repeat - (S.turn - last);
    return left > 0 ? `${left}시기 뒤에 다시 할 수 있어요` : null;
  }
  function lockReason(p, order) {
    { const u = usedUp(p); if (u) return u; }
    if (p.lockIf) { const w = p.lockIf(); if (w) return w; }
    const before = order || [];
    const ok = (id) => has(id) || before.includes(id);
    if (p.req && !p.req.every(ok)) return `먼저 '${p.req.map((r) => P[r].name).join("', '")}'이(가) 필요해요`;
    if (p.reqAny && !p.reqAny.some(ok)) return `먼저 '${p.reqAny.map((r) => P[r].name).join("' 또는 '")}'이(가) 필요해요`;
    return null;
  }
  function queueErrors() {
    const errs = {};
    S.picks.forEach((id, i) => { const why = lockReason(P[id], S.picks.slice(0, i)); if (why) errs[id] = why + (S.picks.slice(i + 1).some((x) => (P[id].req || P[id].reqAny || []).includes(x)) ? " — 순서를 바꿔 보세요" : ""); });
    return errs;
  }
  function togglePick(id) {
    const i = S.picks.indexOf(id);
    if (i >= 0) S.picks.splice(i, 1);
    else {
      if (usedUp(P[id])) return;
      if (usedPoints() + P[id].cost > apPoints()) { UI.msg = "이번 시기의 국정 힘이 모자라요. 다른 정책을 빼거나 다음 시기로 미뤄요. 남긴 힘은 다음 시기로 넘어가요(최대 2)."; render(); return; }
      const lk = lockReason(P[id], S.picks);
      if (lk) { UI.msg = `'${P[id].name}': ${lk}.`; render(); return; }
      S.picks.push(id);
    }
    UI.msg = null; save(); render();
  }
  // 대략의 예상: 살림 방법 + 고른 정책의 기본 효과
  function projection() {
    const st = { ...S.st };
    const add = (d) => { for (const k in d) st[k] = Math.max(-99, Math.min(100, st[k] + d[k])); };
    const E = ECON.find((e) => e.id === S.econ) || ECON[0];
    const worst = (a, b) => { const o = { ...a }; for (const k in b || {}) o[k] = Math.min(o[k] || 0, b[k]); return o; };
    add(E.risk ? worst(E.d, E.fail) : E.d);
    for (const id of S.picks) add(P[id].gamble ? worst(P[id].eff, P[id].fail) : P[id].eff);
    return { st, zero: ST.filter((x) => st[x.k] <= 0).map((x) => x.k), low: ST.filter((x) => st[x.k] > 0 && st[x.k] < 12).map((x) => x.k) };
  }
  function runPolicies() {
    relabel();
    if (Object.keys(queueErrors()).length) return;
    const before = { ...S.st };
    const ap = apPoints(), used = usedPoints();
    const E = ECON.find((e) => e.id === S.econ) || ECON[0];
    const L = { turn: S.turn, ev: S.evRes, econ: null, res: [], drift: null, warn: [], ap, used };
    // 1) 이번 시기 살림
    S.econUsed[E.id] = (S.econUsed[E.id] || 0) + 1;
    const eok = E.risk ? Math.random() < E.chance() : true;
    const dyn = E.dyn ? E.dyn() : null;
    const ed = apply(dyn ? dyn.d : eok ? E.d : E.fail);
    if (E.id !== "normal") S.tags.push({ v: E.tags, w: 0.35 });
    if (E.id === "more" && (S.econUsed.more === 5 || S.econUsed.more === 8)) { S.tyr += 1; L.warn.push("세금을 너무 자주 더 걷어 '백성을 쥐어짜는 왕'이라는 소문이 돌아요."); }
    L.econ = { id: E.id, name: E.name, text: dyn ? dyn.text : eok ? E.text : E.failText, delta: ed, ok: eok, risk: !!E.risk };
    let z = zeroStat();
    if (z) { L.cut = true; return overNow(z, `살림 방법 '${E.name}'을(를) 고른 뒤`, L); }
    // 2) 정책을 차례로
    for (const id of S.picks) {
      const p = P[id];
      const r = p.run();
      const delta = apply(r.d);
      const ok = r.ok !== false;
      S.done.push({ id, turn: S.turn, ok });
      if (p.tyr) S.tyr += p.tyr;
      S.tags.push({ v: r.tags, w: 1 });
      L.res.push({ id, text: r.text, delta, ok, sl: r.sl || null, treasure: r.treasure || null });
      z = zeroStat();
      if (z) { L.cut = true; return overNow(z, `'${p.name}' 정책을 펼친 뒤`, L); }
    }
    S.saved = Math.min(2, Math.max(0, ap - used));
    // 3) 세월의 흐름
    const drift = { gold: 4 + S.inc, def: -3, ppl: -2, kp: -1 };
    const parts = ["기본 세금 +4"];
    if (S.inc) parts.push(`제도·장사 수입 +${S.inc}`);
    if (S.st.ppl >= 60) { drift.gold += 2; parts.push("민심이 좋아 세금이 잘 걷힘 +2"); }
    if (S.st.ppl < 30) { drift.gold -= 3; L.warn.push("민심이 낮아 세금이 잘 걷히지 않아요 (재정 -3)."); }
    if (S.st.def >= 70) { drift.gold -= 2; parts.push("큰 군대를 먹이는 비용 -2"); }
    if (S.st.gold >= 75) { drift.gold -= 3; parts.push("넘치는 곳간을 관리들이 몰래 빼돌림 -3"); }
    const DT = SCEN[S.scen] && SCEN[S.scen].driftText, DP = (typeof DT === "function" ? DT() : DT) || ["성과 무기가 낡음", "백성이 조금씩 지침", "왕의 위엄도 조금씩 느슨해짐"];
    parts.push(`${DP[0]} (${SN.def} -3)`, `${DP[1]} (${SN.ppl} -2)`, `${DP[2]} (${SN.kp} -1)`);
    if (S.st.har < 30) { drift.kp = (drift.kp || 0) - 3; L.warn.push(`${SN.har}이 낮아 명령이 잘 따라지지 않아요 (${SN.kp} -3).`); }
    if (S.st.kp >= 80 && S.st.har < 30) { drift.har = (drift.har || 0) - 2; L.warn.push(`모두가 지도자를 두려워해 바른말을 하지 않아요 (${SN.har} -2).`); }
    if (DRIFT5[S.scen]) DRIFT5[S.scen](drift, parts, L);
    if (has("school")) { drift.cul = (drift.cul || 0) + 1; parts.push("나라 학교에서 인재가 자람 (문화 +1)"); }
    watchDrift(drift, parts); treasureDrift(drift, parts);
    if (S.ext && S.turn > 10) { drift.def -= 1; drift.ppl -= 1; drift.har -= 1; parts.push("오래된 나라의 피로 (국방·민심·화합 -1)"); }
    if (S.flags.debt) { drift.gold -= 2; parts.push("빌린 돈의 이자 -2"); }
    if (S.scen === "E" && S.turn <= 5) {
      const strong = S.st.def >= 55;
      drift.gold -= strong ? 1 : 3; drift.ppl -= strong ? 1 : 3;
      L.warn.push(strong ? "전쟁이 계속되지만 군대가 튼튼해 피해가 적어요 (재정 -1, 민심 -1)." : "전쟁이 계속되어 논밭이 짓밟혀요 (재정 -3, 민심 -3). 국방이 55 이상이면 피해가 줄어요.");
    }
    L.drift = apply(drift); L.driftParts = parts;
    z = zeroStat();
    if (z) { L.cut = true; return overNow(z, "세월이 흐르는 동안", L); }
    for (const x of ST) if (S.st[x.k] < 15) L.warn.push(`위험! ${jo(x.n, "이", "가")} ${S.st[x.k]}밖에 남지 않았어요. 0이 되면 그 자리에서 나라가 무너져요.`);
    worldTerr(); featCheck(L);
    S.log.push(L); snap();
    S.picks = []; S.phase = "result";
    save(); render(before);
  }
  function nextTurn() {
    if (S.turn >= TURNS) return finish();
    S.turn += 1; startTurn(); window.scrollTo({ top: 0 });
  }

  // ================= 0이 되면: 역사 속 최악의 순간 =================
  const OVERS = {
    kp: { h: "廢", stamp: "폐위", t: "왕위에서 쫓겨나다",
      story: "왕의 말을 따르는 신하가 한 명도 남지 않았어요. 힘센 귀족들이 모여 회의를 열고, 왕을 자리에서 끌어내린 뒤 새 왕을 세웠어요.",
      hist: "신라 진지왕은 귀족들에게 4년 만에 왕위에서 쫓겨났어요. 조선의 연산군과 광해군도 신하들이 일으킨 반정으로 쫓겨나 '임금'이 아닌 '군'으로 불렸어요.",
      tip: "율령, 관리 등급, 지방관 보내기처럼 왕의 힘을 세우는 제도를 미리 갖추어 두세요. 왕권이 20보다 낮아지면 위험 신호예요." },
    har: { h: "裂", stamp: "분열", t: "나라가 조각조각 갈라지다",
      story: "신하와 호족이 모두 왕에게 등을 돌렸어요. 지방의 힘센 호족들이 저마다 '내가 이 땅의 주인이다'라며 성을 쌓고 군사를 모아 따로 나라를 세웠어요.",
      hist: "신라 말에는 귀족들이 왕 자리를 두고 싸우는 동안 지방 호족들이 힘을 키웠어요. 결국 견훤은 후백제를, 궁예는 후고구려를 세워 나라가 셋으로 갈라졌어요(후삼국 시대).",
      tip: "혼인 정책, 탕평책, 화랑도처럼 신하·호족과 손잡는 정책으로 화합을 지켜 주세요. 숙청은 화합을 크게 깎아요." },
    ppl: { h: "亂", stamp: "민란", t: "백성이 들고일어나다",
      story: "더는 참을 수 없게 된 백성들이 낫과 괭이를 들고 관청으로 몰려갔어요. 봉기의 불길이 전국으로 번져 나라가 걷잡을 수 없는 혼란에 빠졌어요.",
      hist: "신라 진성여왕 때 원종과 애노가 세금 독촉에 맞서 일어났고, 조선 순조 때는 홍경래가 평안도에서 난을 일으켰어요. 1862년에는 진주를 시작으로 전국 70여 곳에서 농민들이 일어났어요(임술 농민 봉기).",
      tip: "진대법, 세금을 알맞게 걷기, 균역법처럼 백성의 짐을 덜어 주는 정책을 잊지 마세요. '세금 더 걷기'를 자주 고르면 민심이 계속 떨어져요." },
    gold: { h: "空", stamp: "파탄", t: "곳간이 텅 비다",
      story: "곳간에 쌀 한 톨, 동전 한 닢 남지 않았어요. 관리에게 줄 녹봉도, 군사에게 먹일 밥도 없자 관리들은 일을 그만두고 군사들은 흩어졌어요. 나라가 아무 일도 할 수 없게 되었어요.",
      hist: "신라 진성여왕 때(889년)는 곳간이 비어 세금을 거칠게 독촉하다가 전국에서 반란이 일어났어요. 고려 말에도 나라에 곡식이 모자라 관리들에게 녹봉을 제대로 주지 못했어요.",
      tip: "'곳간 채우기' 정책(화폐, 대동법, 무역)과 매 시기 살림 방법으로 재정을 챙기세요. 매 시기 수입이 늘어나는 정책은 일찍 할수록 오래 도움이 돼요." },
    def: { h: "陷", stamp: "함락", t: "도읍이 함락되다",
      story: "성벽은 무너지고 지킬 군사도 없다는 소식이 이웃 나라에 전해졌어요. 적군이 한꺼번에 쳐들어와 도읍을 빼앗았어요.",
      hist: "백제 개로왕은 고구려에서 보낸 승려 도림의 꾀에 넘어가 궁궐과 성을 크게 짓느라 나라 힘을 다 써 버렸어요. 475년 장수왕이 쳐들어오자 도읍 한성이 함락되고 개로왕은 목숨을 잃었어요.",
      tip: "성 쌓기, 화랑도, 동맹으로 국방을 지켜 주세요. 국방은 매 시기 조금씩 낡아요." },
    cul: { h: "焚", stamp: "암흑", t: "배움의 불이 꺼지다",
      story: "학교는 문을 닫고 책을 읽는 사람이 사라졌어요. 나라를 이끌 인재도, 새로운 기술도 나오지 않아 나라가 점점 뒤처졌어요.",
      hist: "연산군은 나라의 최고 학교인 성균관을 놀이터로 바꾸었어요. 자신을 비판하는 한글 글이 나붙자 한글 책을 불태우고 한글을 쓰지 못하게 했어요.",
      tip: "나라 학교, 역사책, 학자 모으기로 문화를 지켜 주세요." },
  };

  const COUP = { h: "反", stamp: "반정", t: "반정이 일어나다",
    story: "왕을 두려워하던 신하들이 몰래 힘을 모아 군사를 일으켰어요. 하룻밤 사이에 궁궐이 포위되고, 왕은 자리에서 끌려 내려와 먼 섬으로 쫓겨났어요.",
    hist: "연산군은 바른말을 하는 신하들을 두 번의 사화로 죽이고 벌했어요. 결국 1506년 신하들이 중종반정을 일으켜 연산군을 강화도 옆 교동도로 쫓아냈어요.",
    tip: "숙청과 엄한 벌로 왕권은 높아지지만, 화합이 바닥나면 신하들이 등을 돌려요. 탕평책이나 혼인 정책으로 신하들의 마음을 붙잡아 두세요." };
  // 화합이 0일 때, 왕이 무섭게 다스렸다면 후삼국 대신 반정이 일어나요
  // 세계사 나라에서는 그 나라의 역사로 바뀌는 0 엔딩
  const OVERS_W = {
    G: {
      har: { h: "散", stamp: "분열", t: "부족들이 다시 흩어지다",
        story: "부족장들이 칸의 깃발을 내리고 저마다 초원으로 흩어졌어요. 초원은 다시 부족끼리 싸우는 땅이 되었어요.",
        hist: "칭기즈 칸이 나타나기 전 몽골 초원은 여러 부족이 끝없이 싸우던 곳이었어요. 칭기즈 칸이 죽은 뒤에도 제국은 결국 여러 나라(울루스)로 나뉘었어요.",
        tip: "혼인 정책, 탕평책, 부족장과 나누어 다스리기로 화합을 지켜 주세요. 힘으로만 누르면 부족들이 떠나요." },
      def: { h: "陷", stamp: "함락", t: "초원의 다른 부족에게 무너지다",
        story: "지킬 군사가 사라지자 이웃 부족과 나라들이 한꺼번에 쳐들어왔어요. 칸의 천막은 불타고 부족들은 뿔뿔이 흩어졌어요.",
        hist: "칭기즈 칸(테무친)의 아버지가 다른 부족에게 해를 입은 뒤, 어린 테무친의 가족은 부족에게 버림받아 초원을 떠돌아야 했어요. 힘이 없으면 초원에서 살아남기 어려웠어요.",
        tip: "정복 전쟁을 하면 국방이 줄어요. 화랑도·성 쌓기·동맹으로 군대를 다시 채워 두세요." },
    },
    H: {
      ppl: { h: "革", stamp: "혁명", t: "프랑스 혁명: 왕정이 무너지다",
        story: "분노한 시민들이 궁전으로 몰려가 왕을 끌어내렸어요. 나라는 왕이 없는 '공화국'이 되었어요.",
        hist: "1789년 바스티유 습격으로 시작된 프랑스 혁명은 1792년 왕정을 없애고 공화국을 세웠어요. 루이 16세와 왕비 마리 앙투아네트는 이듬해 목숨을 잃었어요.",
        tip: "이 나라는 처음부터 민심이 낮아요. 삼부회와 인권 선언에서 시민의 편에 서고, 세금 덜 걷기·진대법으로 빵값 걱정을 덜어 주세요." },
      gold: { h: "破", stamp: "파산", t: "왕실이 파산하다",
        story: "빚을 갚을 돈도, 군인에게 줄 월급도 없어졌어요. 은행가들은 더 이상 돈을 빌려주지 않았고 나라가 멈춰 섰어요.",
        hist: "프랑스는 미국 독립 전쟁을 돕고 궁전 살림에 큰돈을 쓰느라 1788년에는 빚 이자만 나라 수입의 절반에 이르렀어요. 돈을 마련하려고 연 삼부회가 혁명의 시작이 되었어요.",
        tip: "귀족에게도 세금을 걷거나 궁전 살림을 줄여 금고부터 채워 주세요. 빚을 또 빌리면 매 시기 이자가 나가요." },
      kp: { h: "廢", stamp: "폐위", t: "왕이 이름만 남다",
        story: "왕의 말을 따르는 사람이 아무도 없어, 의회와 장군들이 나랏일을 모두 가져갔어요.",
        hist: "프랑스 혁명 뒤 1792년 왕정이 폐지되었고, 1799년 나폴레옹이 쿠데타로 권력을 잡은 뒤 1804년 스스로 황제가 되었어요.",
        tip: "장군에게 군대를 몽땅 맡기면 왕권이 흔들려요. 왕권을 지킬 제도와 신하들의 마음을 함께 챙겨 주세요." },
    },
  };
  const overInfo = () => (OVERS_W[S.scen] && OVERS_W[S.scen][S.over]) || (S.over === "har" && (S.tyr >= 3 || S.st.kp >= 65) ? COUP : OVERS[S.over]);

  // ================= 결말 =================
  const statVals = () => ST.map((x) => S.st[x.k]);
  const avgOf = (o) => ST.reduce((a, x) => a + o[x.k], 0) / ST.length;
  const bestKey = () => ST.map((x) => x.k).sort((a, b) => S.st[b] - S.st[a])[0];
  const worstKey = () => ST.map((x) => x.k).sort((a, b) => S.st[a] - S.st[b])[0];
  const BA = { kp: "왕의 명령은 바로 섰지만", har: "신하들은 한마음이지만", ppl: "백성은 웃고 있지만", gold: "곳간은 든든하지만", def: "성벽은 튼튼하지만", cul: "문화는 꽃피었지만" };
  const WB = { kp: "왕의 힘은 약한 나라", har: "신하들은 다투는 나라", ppl: "백성은 지친 나라", gold: "곳간은 빈 나라", def: "국경은 위태로운 나라", cul: "배움은 부족한 나라" };
  const WL = { kp: "왕의 명령이 지방까지 닿지 않아, 힘센 집안들이 제멋대로 굴어요.", har: "조정에서는 날마다 다툼이 끊이지 않아요.", ppl: "백성들은 지친 얼굴로 한숨을 쉬어요.", gold: "곳간이 비어 큰일이 생기면 손쓸 돈이 없어요.", def: "국경의 성이 낡아 이웃 나라가 호시탐탐 노리고 있어요.", cul: "책을 읽는 사람이 적어 새로운 생각이 잘 나오지 않아요." };
  function fate() {
    const s = S.st, vals = statVals(), avg = avgOf(s), min = Math.min(...vals), best = bestKey(), worst = worstKey();
    if (S.over) { const O = overInfo(); return { t: O.t, l: O.story, bad: true, h: O.h, over: true }; }
    if (FATE5[S.scen]) { const r5 = FATE5[S.scen](s, avg, min); if (r5) return r5; }
    if (S.scen === "E") {
      if (S.flags.warWon && avg >= 50) return { t: "7년 전쟁을 이겨 낸 나라", l: "바다에서는 수군이, 땅에서는 의병과 관군이 나라를 지켜 냈어요. 잿더미 위에서 나라가 다시 힘차게 일어섰어요.", h: "勝", big: true };
      if (S.flags.warWon || (S.flags.admiral && avg >= 45)) return { t: "폐허를 딛고 다시 선 나라", l: "전쟁의 상처는 깊었지만 끝내 나라를 지켜 냈어요. 백성들은 무너진 마을을 하나씩 다시 세웠어요.", h: "興" };
      if (s.ppl < 35 || avg < 40) return { t: "상처투성이로 살아남은 나라", l: "나라는 겨우 이어졌지만 백성의 삶은 무너졌어요. 전쟁의 상처가 오래도록 아물지 않을 거예요.", h: "傷", bad: true };
      return { t: "전쟁을 버텨 낸 나라", l: "큰 승리는 없었지만 7년의 전쟁을 끝까지 버텨 냈어요. 이제 나라를 다시 세울 차례예요.", h: "守" };
    }
    if (S.scen === "F") {
      if (S.flags.bigWin) return { t: "청나라 대군을 물리친 기적", l: "아무도 이길 수 없다던 청나라 군대를 몰아냈어요! 역사에 없던 기적 같은 승리로 기록될 거예요.", h: "勝", big: true };
      if (S.flags.warLost && avg >= 50) return { t: "치욕을 딛고 일어선 나라", l: "삼전도의 굴욕을 겪었지만, 왕과 백성이 이를 악물고 나라를 다시 세웠어요.", h: "忍" };
      if (S.flags.warLost) return { t: "삼전도의 눈물", l: "왕이 적에게 머리를 숙인 슬픔이 나라를 덮었어요. 수많은 백성이 포로로 끌려갔어요.", h: "淚", bad: true };
      if (S.flags.warWon) return { t: "성을 지켜 낸 나라", l: "추위와 굶주림 속에서도 끝까지 버텨 청나라 군대를 돌려보냈어요.", h: "守", big: avg >= 55 };
      if (S.flags.submit) return { t: "굴욕을 견디며 지킨 평화", l: "자존심을 굽혀 전쟁을 피했어요. 백성은 살았지만, 선비들은 오래도록 그날을 부끄러워했어요.", h: "忍" };
    }
    if (S.scen === "G") {
      if (S.flags.conquered && S.flags.warWon && avg >= 50) return { t: "세상에서 가장 넓은 제국", l: "말발굽이 닿는 곳마다 깃발이 꽂혔어요. 동쪽 바다에서 서쪽 유럽 가까이까지, 세상에서 가장 넓은 나라가 되었어요.", h: "帝", big: true };
      if (S.flags.yam && avg >= 50) return { t: "비단길을 다스린 초원의 제국", l: "역참과 비단길로 동쪽과 서쪽이 이어졌어요. 상인과 학자, 기술자들이 제국을 가로질러 오갔어요.", h: "驛", big: true };
      if (s.har < 30) return { t: "다시 갈라질 듯한 초원", l: "칸이 살아 있는 동안은 버텼지만, 부족장들은 벌써 저마다 딴생각을 하고 있어요.", h: "散", bad: true };
    }
    if (S.scen === "H") {
      if (S.flags.coup) return { t: "장군에게 넘어간 나라", l: "나라의 진짜 주인은 장군이 되었어요. 실제로 나폴레옹은 1804년 스스로 황제가 되었어요.", h: "將", bad: true };
      if (S.flags.traitor) return { t: "적과 손잡은 왕", l: "이웃 나라의 도움으로 자리는 지켰지만, 시민들은 왕을 '배신자'라고 불렀어요.", h: "背", bad: true };
      if (S.flags.fled) return { t: "도망치다 붙잡힌 왕", l: "나라를 버리려 했다는 소문은 끝내 사라지지 않았어요. 시민들은 더 이상 왕을 믿지 않았어요.", h: "逃", bad: true };
      if (S.flags.rights && avg >= 50) return { t: "시민과 손잡은 왕", l: "왕이 시민의 권리를 인정하고 헌법에 따라 다스리는 나라가 되었어요. 실제 프랑스에서는 이루지 못했지만, 영국처럼 왕과 의회가 함께 다스리는 길이에요.", h: "憲", big: true };
      if (S.flags.warWon && avg >= 45) return { t: "혁명의 불길을 이겨 낸 왕국", l: "빵값 폭동과 이웃 나라의 군대를 모두 이겨 냈어요. 프랑스 역사와는 다른 길을 걸은 왕국이에요.", h: "守" };
    }
    if (S.scen === "D" && avg < avgOf(S.start) - 6) return { t: "무너져 버린 전성기", l: "물려받은 전성기를 지키지 못했어요. 백제 의자왕처럼 처음에는 크게 칭찬받다가 끝이 좋지 않았던 왕도 있어요.", h: "落", bad: true };
    if (min >= 60) return { t: "태평성대", l: "왕권과 화합, 민심과 곳간, 국방과 문화가 모두 고르게 자랐어요. 백성들은 배를 두드리며 노래했어요. 이 시대는 오래도록 '살기 좋았던 때'로 기억될 거예요.", h: "平", big: true };
    if (S.flags.conquered && s.def >= 65 && s.kp >= 60) return { t: "대륙을 호령한 대제국", l: "넓어진 땅과 강한 군대로, 이웃 나라들이 우리 나라 이름만 들어도 고개를 숙여요.", h: "帝", big: true };
    if (s.cul >= 75 && s.ppl >= 55) return { t: "문화의 황금시대", l: "학문과 기술, 예술이 활짝 꽃피었어요. 이 시대에 만든 책과 발명품이 수백 년 뒤까지 전해질 거예요.", h: "文", big: true };
    if (s.kp >= 80 && (s.har < 35 || s.ppl < 40)) return { t: "누구도 거스를 수 없는 철의 왕국", l: "왕의 명령은 하늘과 같지만, 신하와 백성은 숨죽여 살아요. 왕이 떠나면 큰 혼란이 올지도 몰라요.", h: "鐵", bad: true };
    if (s.har >= 75 && s.kp < 35) return { t: "귀족들의 나라", l: "신하들과는 사이가 좋지만, 정작 나라를 움직이는 건 힘센 집안들이에요. 왕은 점점 허수아비가 되어 가요.", h: "臣", bad: true };
    if (s.gold >= 80 && s.def < 40) return { t: "황금 곳간, 얇은 성벽", l: "곳간은 금은보화로 넘치지만 지킬 군대가 약해요. 이웃 나라들이 군침을 흘리고 있어요.", h: "金", bad: true };
    if (s.ppl >= 80) return { t: "백성이 노래하는 나라", l: "백성들이 왕을 부모처럼 따르고, 마을마다 웃음소리가 넘쳐요.", h: "民", big: avg >= 55 };
    if (s.def >= 80) return { t: "철옹성의 나라", l: "쇠로 만든 항아리처럼 튼튼한 성벽 덕분에 어떤 적도 감히 넘보지 못해요.", h: "城" };
    if (s.gold >= 80) return { t: "곳간이 넘치는 부자 나라", l: "장터는 북적이고 곳간은 넘쳐요. 이웃 나라 상인들도 몰려와요.", h: "富" };
    if (s.cul >= 80) return { t: "학문의 나라", l: "책 읽는 소리가 끊이지 않는 나라가 되었어요.", h: "學" };
    if (min < 15) return { t: "벼랑 끝에서 살아남은 나라", l: `${jo(SN[worst], "이", "가")} 겨우 ${s[worst]}만 남았어요. 조금만 더 갔다면 나라가 무너졌을 거예요. 아슬아슬하게 버텨 낸 30년이었어요.`, h: "危", bad: true };
    const RISE = { kp: "왕의 깃발 아래 하나 된 나라", har: "모두가 한마음으로 뭉친 나라", ppl: "백성이 믿고 따르는 나라", gold: "곳간이 든든한 떠오르는 강국", def: "누구도 넘보지 못하는 강국", cul: "학문이 꽃피기 시작한 나라" };
    if (avg >= 55) return { t: RISE[best], l: `나라의 힘이 해마다 커져 이웃 나라들이 우리를 눈여겨보기 시작했어요. 특히 ${jo(SN[best], "이", "가")} ${s[best]}까지 올라 나라의 자랑이 되었어요.`, h: "昇" };
    if (avg >= 42) return { t: `${BA[best]} ${WB[worst]}`, l: `${SN[best]} ${s[best]}, 나라의 자랑이에요. 하지만 ${WL[worst]}`, h: ST.find((x) => x.k === best).h };
    return { t: "폭풍 속의 나라", l: "여기저기서 문제가 터져 나라가 크게 흔들려요. 다음 왕에게 무거운 짐이 남았어요.", h: "嵐", bad: true };
  }
  function achievements() {
    const a = [], s = S.st, min = Math.min(...statVals());
    if (["law", "rank", "local", "exam"].every(has)) a.push(["制", "나라의 틀 완성"]);
    if (S.flags.conquered) a.push(["拓", "영토 확장"]);
    if (S.flags.warWon || S.flags.bigWin) a.push(["勝", "큰 전쟁 승리"]);
    if (S.flags.admiral) a.push(["海", "바다의 장수를 믿음"]);
    if (has("hangeul")) a.push(["訓", "새 글자 창제"]);
    if (has("science")) a.push(["器", "과학 기구 발명"]);
    if (S.flags.talent) a.push(["才", "신분을 넘은 인재 등용"]);
    if (has("daedong") || has("survey")) a.push(["稅", "세금 개혁"]);
    if (S.inc >= 8) a.push(["財", "마르지 않는 곳간"]);
    if (has("tangpyeong")) a.push(["和", "탕평"]);
    if (s.ppl >= 75) a.push(["民", "백성의 사랑"]);
    if (S.flags.heir === "wise") a.push(["嗣", "어진 후계자"]);
    if (!S.over && min >= 55) a.push(["平", "태평성대"]);
    return a;
  }
  const agreeCount = () => { const rk = ST.map((x) => x.k).sort((p, q) => S.st[q] - S.st[p]).slice(0, 3); return S.goals.filter((k) => rk.includes(k)).length; };
  const strongCount = () => S.done.filter((d) => d.ok !== false && !d.by && P[d.id] && P[d.id].strong).length;
  const MYO = { kp: ["태", "太", "나라의 기틀을 크게 세운"], har: ["영", "英", "여러 신하를 고르게 품은"], ppl: ["인", "仁", "백성을 어질게 보살핀"],
    gold: ["성", "成", "나라 살림을 알차게 이룬"], def: ["무", "武", "나라를 굳세게 지킨"], cul: ["문", "文", "학문과 문화를 빛낸"] };
  function record(f) {
    const s = S.st, avg = avgOf(s), min = Math.min(...statVals());
    const nm = S.king.trim();
    const gun = nm ? `${nm}군` : "이름 없는 군";
    if (S.over) {
      if ((S.over === "kp" || S.over === "har") && S.tyr >= 4) return { kind: "tyrant", stamp: "폭군", myo: gun, myoD: "왕위에서 쫓겨나 '임금'이 아닌 '군'으로 불려요", t: "반정으로 쫓겨난 폭군", l: "신하들이 반정을 일으켜 왕을 몰아냈어요. 실록은 왕을 '군'이라 낮추어 부르며 잘못을 하나하나 적었어요.", today: "연산군처럼, 바른말을 막고 신하를 거듭 벌한 왕은 결국 혼자가 되었어요.", special: ["yeonsan", "nero"] };
      if (S.tyr >= 5) return { kind: "tyrant", stamp: "폭군", myo: "려종(厲宗)", myoD: "'사납게 다스린 임금'이라는 뜻이에요", t: "나라를 무너뜨린 폭군", l: "나라가 무너지던 날, 사람들은 왕의 거친 다스림을 원망했어요. 실록은 왕을 '두려움으로 다스리다 나라를 잃은 폭군'으로 적었어요.", today: "엄한 벌과 무거운 세금이 쌓이면 사람의 마음이 떠나요. 어느 선택에서 멈췄어야 했을까요?", special: ["yeonsan", "nero"] };
      const O = overInfo();
      const out = S.over === "kp" || O === COUP;
      return { kind: "over", stamp: O.stamp, myo: out ? gun : "애종(哀宗)", myoD: out ? "왕위에서 쫓겨나 '임금'이 아닌 '군'으로 불려요" : "'슬픈 시대의 임금'이라는 뜻이에요", t: `${S.overAt.turn}시기에 멈춘 다스림`, l: "실록은 나라가 무너지던 날을 짧고 무겁게 적었어요.", today: O.tip };
    }
    if (S.tyr >= 5 && (s.har <= 25 || s.ppl <= 30)) return { kind: "tyrant", stamp: "폭군", myo: "려종(厲宗)", myoD: "'사납게 다스린 임금'이라는 뜻이에요", t: "폭군으로 기록되다", l: "왕은 끝까지 자리를 지켰지만, 다음 시대의 역사책은 왕을 '두려움으로 다스린 폭군'으로 적었어요.", today: "숙청과 탄압을 거듭하면 나라가 강해져도 사람의 마음을 잃어요. 여러분의 선택 가운데 무엇이 이런 기록을 낳았을까요?", special: ["yeonsan", "nero"] };
    if (S.flags.neutral && s.ppl >= 50 && s.har < 40 && Math.random() < 0.5) return { kind: "wronged", stamp: "폐주", myo: gun, myoD: "반정으로 쫓겨나 '군'으로 불려요", t: "반정으로 쫓겨난 왕", l: "백성을 위하고 전쟁을 피하려 애썼지만, 큰 나라를 섬기지 않았다고 화가 난 신하들이 반정을 일으켰어요. 실록은 왕을 '폐주'로 적었어요.", today: "오늘날 역사학자들은 이 왕의 실리 외교와 세금 개혁을 다시 평가하기도 해요. 역사는 누가 쓰느냐에 따라 달라질 수 있어요.", special: "gwanghae" };
    if (avg >= 52 && s.har < 25 && Math.random() < 0.35) return { kind: "wronged", stamp: "억울한 기록", myo: "애종(哀宗)", myoD: "신하들이 '슬픈 일이 많았던 임금'이라는 이름을 붙였어요", t: "잘했지만 나쁘게 기록되다", l: "나라는 잘 다스려졌지만, 왕과 사이가 나빴던 신하들이 실록을 쓰면서 왕의 잘못만 크게 적었어요.", today: "실록은 왕이 아니라 사관과 신하들이 썼어요. 기록을 읽을 때는 '누가, 왜 썼을까?'를 함께 생각해야 해요." };
    const ach = achievements();
    const score = avg + Math.min(6, ach.length) * 1.5 - S.tyr * 3 + (agreeCount() >= 2 ? 3 : 0) + (min >= 45 ? 3 : 0);
    const bk = bestKey();
    let c = MYO[bk];
    if (min >= 55) c = ["세", "世", "온 세상을 고르게 이끈"];
    else if (S.flags.conquered && s.def >= 60) c = ["광", "光", "땅을 넓혀 이름을 빛낸"];
    const isJo = f.big || (["A", "B", "G"].includes(S.scen) && strongCount() >= 4) || ("EFGH".includes(S.scen) && (S.flags.warWon || S.flags.bigWin)) || ("JKLM".includes(S.scen) && avg >= 52 && min >= 35);
    const myo = `${c[0]}${isJo ? "조" : "종"}(${c[1]}${isJo ? "祖" : "宗"})`;
    const myoD = `'${c[2]} 임금'이라는 뜻이에요.` + (isJo ? " 나라를 새로 일으키거나 큰 위기를 이겨 낸 왕에게는 '종' 대신 '조'를 붙였어요." : "");
    if (score >= 75 && min >= 46 && S.tyr <= 2) return { kind: "great", stamp: "대왕", myo, myoD, t: `${c[0]}${isJo ? "조" : "종"}대왕으로 기록되다`, l: "후대 사람들은 왕의 이름 뒤에 '대왕'을 붙여 불렀어요. 역사책 첫머리에 왕의 이야기가 가장 크게 실렸어요." };
    if (score >= 66 && min >= 35 && S.tyr <= 3) return { kind: "good", stamp: "성군", myo, myoD, t: "어진 임금으로 기록되다", l: "실록은 왕을 '백성을 아끼고 신하와 뜻을 모은 임금'으로 적었어요. 오래도록 본받을 임금으로 이름이 남았어요." };
    // 가장 뚜렷한 다스림 방향으로 별명을 붙여요
    const ax = axes(), di = [0, 1, 2].sort((p, q) => Math.abs(ax[q]) - Math.abs(ax[p]))[0];
    const STY = [
      [["강력한 군주", "왕의 명령 하나로 나라 전체가 움직이게 만든 강력한 군주로 기록되었어요. 왕 앞에서 감히 고개를 드는 신하가 없었어요."], ["화합의 군주", "신하·호족과 손잡고 힘을 모아 나라를 이끈 임금으로 기록되었어요. 혼자보다 함께를 택한 왕이었어요."]],
      [["정복 군주", "칼과 말로 나라의 힘을 키운 임금으로 기록되었어요. 이웃 나라들은 왕의 이름만 들어도 긴장했어요."], ["학자 군주", "신하들과 밤새 토론하며 학문을 아낀 임금으로 기록되었어요. 왕이 남긴 책들이 오래도록 읽혔어요."]],
      [["애민 군주", "무엇보다 백성의 밥과 옷을 먼저 걱정한 임금으로 기록되었어요. 백성들은 왕을 '어버이 같은 임금'이라 불렀어요."], ["개혁 군주", "낡은 것을 과감히 바꾸고 새 제도를 세운 개혁 군주로 기록되었어요. 반대도 많았지만 나라의 틀이 바뀌었어요."]],
    ][di][ax[di] >= 0 ? 0 : 1];
    if (score >= 50) return { kind: "style", stamp: STY[0], myo, myoD, t: `${STY[0]}로 기록되다`, l: STY[1] };
    return { kind: "hard", stamp: "고난의 임금", myo, myoD, t: "폭풍 속에서 나라를 지킨 임금", l: "어려운 일이 끊이지 않았지만, 왕은 끝까지 나라를 놓지 않았어요. 실록은 그 고생을 한 줄 한 줄 적었어요." };
  }
  // 세계사 나라: 묘호 대신 별명
  function worldize(r) {
    if (!WORLD()) return r;
    // 세계사 나라의 폭군 기록에는 세계사 인물만 함께 보여 줘요
    if (r.special) r.special = [].concat(r.special).filter((x) => x !== "yeonsan" && x !== "gwanghae");
    const G = S.scen === "G" || S.scen === "L", s = S.st, avg = avgOf(s), min = Math.min(...statVals());
    const unit = S.scen === "L" ? "대추장" : G ? "칸" : "왕";
    if (r.myo.endsWith("군") || r.kind === "wronged" && r.stamp === "폐주") return Object.assign(r, { myo: G ? `쫓겨난 ${unit}` : "폐위된 왕", myoD: "자리에서 쫓겨난 " + unit + "으로 기록되었어요." });
    if (r.myo.startsWith("애종")) return Object.assign(r, { myo: `비운의 ${unit}`, myoD: "'슬픈 운명을 맞은 " + unit + "'이라는 별명이에요." });
    if (r.myo.startsWith("려종")) return Object.assign(r, { myo: G ? `공포의 ${unit}` : "공포왕", myoD: "'두려움으로 다스린 " + unit + "'이라는 별명이에요. 러시아의 이반 4세도 '공포의 이반(뇌제)'이라고 불렸어요." });
    const WE = { kp: ["철혈", "강철 같은"], har: ["화합", "화합의"], ppl: ["자애", "자애로운"], gold: ["부유", "부유한"], def: ["용맹", "용맹한"], cul: ["현명", "현명한"] };
    let w = WE[bestKey()];
    if (min >= 55) w = ["평화", "평화의"]; else if (S.flags.conquered && s.def >= 60) w = ["정복", "정복의"];
    let myo = G ? `${w[1]} ${unit}` : `${w[0]}왕`;
    if (!G && S.flags.rights && avg >= 50) myo = "시민왕";
    const myoD = S.scen === "L" ? "원주민 부족에서는 '앉은 황소(시팅 불)', '미친 말(크레이지 호스)'처럼 그 사람의 모습과 성격을 담은 이름을 지어 불렀어요. 후대 사람들이 붙인 별명이에요." : G ? "몽골에서는 '칭기즈 칸'처럼 칸에게 큰 이름을 붙였어요. 후대 사람들이 붙인 별명이에요." : "유럽에서는 '정복왕 윌리엄', '사자왕 리처드'처럼 왕에게 별명을 붙였어요." + (myo === "시민왕" ? " 실제로 1830년 프랑스의 루이 필리프가 '시민왕'으로 불렸어요." : "");
    Object.assign(r, { myo, myoD });
    if (r.kind === "great") Object.assign(r, { stamp: G ? `위대한 ${unit}` : "대제", t: G ? `위대한 ${unit}으로 기록되다` : "대제로 기록되다", l: S.scen === "L" ? "후대 사람들은 노래와 이야기로 위대한 대추장의 이름을 전했어요." : G ? "후대 사람들은 '대칸'이라 부르며 초원의 노래로 이름을 전했어요." : "후대 사람들은 이름 뒤에 '대제(위대한 왕)'를 붙여 불렀어요." });
    else if (r.kind === "good") Object.assign(r, { t: G ? `어진 ${unit}으로 기록되다` : "어진 왕으로 기록되다", l: "역사책은 백성을 아끼고 신하와 뜻을 모은 " + unit + "으로 적었어요." });
    return r;
  }
  function epilogue() {
    if (S.over) return null;
    const avg = avgOf(S.st);
    if (S.flags.sohyeon) return "새 학문을 배워 온 세자가 갑자기 세상을 떠났어요. 소현세자처럼, 그가 왕이 되었다면 나라가 어떻게 달라졌을지는 아무도 몰라요.";
    if (S.flags.sado) return "영조와 사도세자처럼, 엄한 아버지와 마음이 다친 아들 사이에 비극이 일어났어요. 이 일은 왕의 기록에 오래 남았어요.";
    if (S.flags.heir === "wise") return avg >= 50 ? "어진 세자가 왕위를 이어 아버지가 다진 나라를 더욱 빛냈어요. 태종 다음의 세종처럼요." : "어진 세자가 왕위를 이었어요. 무거운 짐을 물려받았지만, 백성들은 새 왕에게 희망을 걸었어요.";
    if (S.flags.heir === "abroad") return "새 학문을 아는 왕이 즉위해 먼 나라의 책과 기술을 받아들이기 시작했어요.";
    if (S.flags.heir === "strict") return "엄하게 자란 세자는 단단하고 꼼꼼한 왕이 되었어요.";
    if (S.flags.heir === "eldest") return "맏아들이 무난하게 왕위를 이었어요.";
    return null;
  }
  function finish() {
    relabel(); SEEN.games = (SEEN.games || 0) + 1; seenSave();
    const f = fate();
    const rec = worldize(record(f));
    if (S.scen === "H" && (S.over || S.flags.fled || S.flags.traitor)) rec.special = [].concat(rec.special || [], "louis16");
    S.end = { rec };
    tierSave();
    S.phase = "end"; S.revealed = false; save(); render(); window.scrollTo({ top: 0 });
    startReveal();
  }
