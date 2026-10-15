  // ================= 실제 역사 속 정책 15개 (2026-10-15) =================
  // 국방 카드가 '숫자만 오르는 일반 카드'뿐이라는 문제를 풀려고, 카드마다 고를 이유(지속·싸움 힘·연결·딜레마·다음 왕)를 하나씩 넣었어요.
  // 효율은 모두 그 나라 핵심 정책보다 낮게(coreaudit.py로 확인).
  const N15_POW = { p_sanseong: 5, u_hwapo: 4, e_jincheon: 5, v_suseong: 4 };
  { const mp0 = myPow; myPow = function () { let b = mp0(); for (const [id, v] of Object.entries(N15_POW)) if (has(id)) b += v; if (has("j_mugwan") && has("jarmy")) b += 5; if (has("q_ajik") && (has("alliance") || S.flags.ally)) b += 3; return b; }; }

  // 1. 고구려: 평지성과 산성
  PP({ id: "p_sanseong", scen: ["P"], cat: "mil", name: "평지성과 산성을 짝으로", sub: "국내성 + 환도산성", kings: "고구려의 왕들", cost: 2, eff: { def: 8, gold: -4 }, tags: [0.2, 0.8, 0],
    note: "평소에는 평지의 성에서 살고, 적이 오면 뒤쪽 산성으로 들어가 버텨요. 이 정책을 펴면 앞으로 모든 싸움에서 우리 힘 +5.",
    run() { return R({ def: 8, gold: -4 }, "국내성 뒤 산마루에 환도산성을 고쳐 쌓았어요. 적이 오면 백성과 군사가 산성으로 올라가 버틸 수 있어요.", this.tags, { sl: "산성에 곡식 창고를 채우니, 국내성 아이들이 산성까지 누가 먼저 오르나 내기를 하였다." }); } });
  // 2. 백제: 아직기·왕인
  PP({ id: "q_ajik", scen: ["Q"], cat: "cul", uniq: true, name: "왜에 학자 보내기", sub: "아직기 · 왕인 (일본 기록에 전함)", kings: "근초고왕 · 근구수왕", cost: 1, eff: { cul: 5, har: 2, gold: -2 }, tags: [-0.2, -0.6, 0.3],
    note: "백제 학자가 왜에 건너가 한자와 『논어』·『천자문』을 가르쳤다고 일본 기록에 전해요. 이웃 나라와 손잡기를 했다면 싸움에서 우리 힘 +3, 왜와 관련된 '만약에?' 확률 +5%.",
    run() { return R({ cul: 5, har: 2, gold: -2 }, "백제의 학자가 바다를 건너 왜의 왕자에게 글을 가르쳤어요. 왜의 귀족들이 백제를 스승의 나라로 여기게 되었어요.", this.tags, { sl: "왕인이 천자문을 펼치니, 왜의 왕자가 첫 글자 '天'을 하늘 보듯 올려다보았다." }); } });
  for (const id of ["q_wa", "q_wajeong"]) { const p = P[id]; if (p && p.chance) { const c0 = p.chance.bind(p); p.chance = function () { return Math.min(0.95, c0() + (has("q_ajik") ? 0.05 : 0)); }; } }
  // 3. 신라: 병부
  PP({ id: "r_byeongbu", scen: ["R"], cat: "mil", name: "병부 설치: 군사를 맡는 관청", sub: "법흥왕 (517)", kings: "법흥왕", cost: 2, eff: { def: 7, kp: 4, har: -3 }, tags: [0.6, 0.7, 0],
    note: "군사 일을 전담하는 관청을 두어요. 귀족이 거느리던 군사가 왕의 명령을 따르게 돼요. 율령·관등과 함께 '나라의 틀' 세 가지가 갖춰지면 왕권 +3이 더해져요.",
    run() { const full = has("law") && has("rank"); return R(full ? { def: 7, kp: 7, har: -3 } : { def: 7, kp: 4, har: -3 }, (full ? "율령·관등·병부까지, 나라의 틀이 모두 갖춰졌어요! " : "") + "군사를 맡는 관청 병부를 두었어요. 귀족들의 군사가 왕의 깃발 아래 모이기 시작했어요.", this.tags, { sl: "병부의 첫 장부에 군사 이름을 적으니, 귀족들이 제 군사 이름을 찾느라 장부를 뒤적였다." }); } });
  // 4. 신라: 순수비 (땅을 2곳 넘게 얻었거나 '조금만 더'에서)
  PP({ id: "r_sunsu", scen: ["R"], ext: true, cat: "men", name: "순수비 세우기", sub: "진흥왕 · 창녕·북한산·황초령·마운령", kings: "진흥왕", cost: 1, eff: { kp: 4, ppl: 3 }, tags: [0.5, 0.2, 0.3],
    phase: () => (S.ext && S.turn > 10) || terrCount() >= 2,
    note: "새로 얻은 땅을 왕이 직접 돌아보고 비석을 세워요. 얻은 땅이 있는 동안 매 시기 민심 +1.",
    run() { return R({ kp: 4, ppl: 3 }, "왕이 새 땅을 돌아보며 비석을 세웠어요. 새로 신라 백성이 된 사람들이 왕을 직접 보고 마음을 놓았어요.", this.tags, { sl: "북한산 꼭대기에 비석이 서니, 한강의 뱃사공들이 노를 멈추고 올려다보았다." }); } });
  // 5. 고려: 만부교 사건 (보복 침입이 한 번 와요)
  PP({ id: "t_manbu", scen: ["T"], cat: "mil", name: "만부교의 낙타: 거란과 끊기", sub: "태조 (942)", kings: "태조 왕건", cost: 1, eff: { kp: 4, def: 3, har: 1 }, tags: [0.6, 0.6, 0],
    note: "딜레마! '발해를 멸망시킨 나라'와 끊어 위엄을 세워요. 대신 다음 시기에 거란이 보복하러 쳐들어와요(국방 -8, 국방 50 이상이면 -3).",
    run() { S.flags.khitan = S.turn; return R({ kp: 4, def: 3, har: 1 }, "거란 사신을 섬으로 보내고, 선물로 온 낙타 50마리를 만부교 아래 매어 두었어요. 거란이 크게 화를 냈어요.", this.tags, { sl: "만부교 아래 낙타들이 울부짖으니, 개경 사람들이 처음 보는 짐승을 구경하러 다리에 몰려들었다." }); } });
  // 6. 고려: 훈요 10조 ('조금만 더'에서 다음 왕에게 효과)
  PP({ id: "t_hunyo", scen: ["T"], cat: "law", name: "훈요 10조 남기기", sub: "태조 (943)", kings: "태조 왕건", cost: 1, fromTurn: 7, eff: { har: 4 }, tags: [0.2, 0, 0.3],
    note: "후손에게 남기는 열 가지 가르침이에요. '조금만 더'로 다음 왕이 즉위하면, 선왕이 가장 많이 펼친 정책 종류의 능력치 +6.",
    run() { return R({ har: 4 }, "왕이 '불교를 받들고, 서경을 중히 여기고, 백성의 세금을 가볍게 하라'는 열 가지 가르침을 남겼어요.", this.tags, { sl: "훈요를 받아 적은 신하가 열 번째 조목을 쓰고 붓을 내려놓으니, 왕이 '하나 더 생각나면 부르겠다' 하였다." }); } });
  { const xr0 = extendReign; extendReign = function (name) {
    let bonus = null;
    if (has("t_hunyo")) { const cnt = {}; for (const d of S.done) { const p = P[d.id]; if (p && d.turn <= 10) cnt[p.cat] = (cnt[p.cat] || 0) + 1; } const top = Object.entries(cnt).sort((a, b) => b[1] - a[1])[0]; const map = { law: "kp", mil: "def", men: "har", ppl: "ppl", eco: "gold", cul: "cul" }; if (top) bonus = map[top[0]]; }
    xr0(name);
    if (bonus) { S.st[bonus] = clamp(S.st[bonus] + 6); S.flags.hunyoBonus = bonus; save(); render(); }
  }; }
  // 7. 세종: 화포와 신기전
  PP({ id: "u_hwapo", scen: ["U"], cat: "mil", name: "화포와 신기전 만들기", sub: "『총통등록』 (1448)", kings: "세종 · 문종", cost: 2, eff: { def: 8, cul: 2, gold: -4 }, tags: [0.2, 0.8, 0.1],
    note: "화포를 고쳐 만들고 불화살 신기전을 개량해요. '과학 기구'를 이미 펼쳤다면 국방 +4가 더해지고, 앞으로 모든 싸움에서 우리 힘 +4.",
    run() { const sci = has("science"); return R(sci ? { def: 12, cul: 2, gold: -4 } : { def: 8, cul: 2, gold: -4 }, (sci ? "과학 기구를 만들던 장인들이 솜씨를 보태 화포가 훨씬 멀리 나갔어요! " : "") + "화포 만드는 법을 책으로 정리하고, 한꺼번에 수십 발이 날아가는 신기전을 만들었어요.", this.tags, { sl: "신기전 백 발이 한꺼번에 날아오르니, 구경하던 신하들이 갓을 붙잡고 엎드렸다." }); } });
  // 8. 임진왜란: 비격진천뢰
  PP({ id: "e_jincheon", scen: ["E"], cat: "mil", name: "비격진천뢰", sub: "이장손 · 경주성 탈환 (1592)", kings: "선조 · 박진", cost: 2, eff: { def: 9, gold: -4 }, tags: [0.2, 0.9, 0],
    note: "날아가서 터지는 폭탄이에요. 앞으로 모든 싸움에서 우리 힘 +5.",
    run() { return R({ def: 9, gold: -4 }, "성 안으로 날아든 쇠공이 한참 뒤에 터지자, 왜군이 놀라 경주성을 버리고 달아났어요.", this.tags, { sl: "왜군이 굴러 온 쇠공을 신기하게 들여다보는 사이, 쇠공이 '쾅' 하고 터졌다." }); } });
  // 9. 임진왜란: 공명첩 (두 번째부터 신분 질서가 흔들려요)
  PP({ id: "e_gongmyeong", scen: ["E"], cat: "eco", name: "공명첩 팔기", sub: "이름 칸이 빈 벼슬 임명장", kings: "선조", cost: 1, repeat: 3, eff: { gold: 12, kp: -3, har: -4 }, tags: [0.2, 0, -0.2],
    note: "딜레마! 곡식을 바친 사람에게 이름만 적으면 되는 벼슬 문서를 줘요. 두 번째로 펴면 '신분 질서가 흔들림'이 붙어 매 시기 화합 -1. 3시기마다 다시 할 수 있어요.",
    run() { const n = S.done.filter((d) => d.id === "e_gongmyeong").length; if (n >= 1) S.flags.gongmyeong = true; return R({ gold: 12, kp: -3, har: -4 }, n >= 1 ? "또 공명첩을 팔자, '돈만 있으면 양반'이라는 말이 퍼졌어요. 신분 질서가 흔들리기 시작했어요." : "공명첩을 팔아 군량을 마련했어요. 곡식 창고가 다시 찼어요.", this.tags, { sl: "공명첩을 산 부자가 갓을 새로 맞추니, 갓 가게 주인이 '요즘 손님이 늘었다' 하였다." }); } });
  // 10. 병자호란: 나선정벌
  PP({ id: "f_naseon", scen: ["F"], cat: "mil", name: "나선정벌: 조총 부대 원정", sub: "효종 (1654·1658)", kings: "효종 · 변급 · 신유", cost: 2, fromTurn: 9, gamble: true, risky: true, eff: { def: 10, kp: 6 }, fail: { def: -6, gold: -4 }, tags: [0.5, 0.9, 0],
    chance() { return Math.min(0.85, 0.65 + (has("f_ganghwa") || has("mil_tunjeon") ? 0.1 : 0)); },
    note: "모험! 청의 요청으로 조선 조총 부대가 흑룡강까지 가서 러시아군을 물리쳐요. 강화도 수군이나 둔전이 있으면 확률 +10%.",
    run() { if (Math.random() < this.chance()) return R({ def: 10, kp: 6 }, "조선 조총 부대가 흑룡강에서 러시아군을 크게 이겼어요! 북벌을 꿈꾸며 기른 군대가 실력을 보였어요.", this.tags, { sl: "흑룡강가에 조선 조총 소리가 울리니, 러시아 배들이 강을 거슬러 달아났다." }); return R({ def: -6, gold: -4 }, "먼 길에 지친 군사들이 병에 걸려 큰 싸움 없이 돌아왔어요.", this.tags, { ok: false, sl: "흑룡강의 모기떼가 러시아군보다 무서웠다." }); } });
  // 11. 병자호란: 중강 개시
  PP({ id: "f_market", scen: ["F"], cat: "eco", name: "청과 국경 장터 열기", sub: "중강 개시 (1646) · 회령 개시", kings: "인조", cost: 1, fromTurn: 5, inc: 1, eff: { gold: 6, kp: -3 }, tags: [0.1, -0.2, 0.3],
    note: "딜레마! 압록강 중강과 두만강 회령에 청과 거래하는 장터를 열어요. 매 시기 수입 +1, 대신 '오랑캐와 장사라니' 하는 선비들의 반발로 왕권이 줄어요.",
    run() { addInc(1); return R({ gold: 6, kp: -3 }, "국경 장터에 소와 소금, 청나라 비단이 오갔어요. 선비들은 혀를 찼지만 곳간은 넉넉해졌어요.", this.tags, { sl: "중강 장터에서 조선 소 한 마리가 청나라 비단 세 필과 바뀌니, 소 주인이 비단을 소 등에 덮어 주었다." }); } });
  // 12. 경신 대기근: 금위영 (세월의 흐름 국방 감소를 줄여요)
  PP({ id: "k_geumwi", scen: ["K"], cat: "mil", name: "금위영 설치로 5군영 완성", sub: "숙종 (1682)", kings: "숙종", cost: 2, eff: { def: 6, gold: -3 }, tags: [0.4, 0.8, 0],
    note: "훈련도감·어영청·총융청·수어청에 금위영까지, 한양을 지키는 다섯 군영이 갖춰져요. 앞으로 '세월의 흐름' 국방 감소가 매 시기 1 줄어요.",
    run() { return R({ def: 6, gold: -3 }, "다섯 군영이 도성을 나누어 지키게 되었어요. 군사들이 늘 훈련하니 성과 무기가 덜 낡았어요.", this.tags, { sl: "다섯 군영의 깃발이 도성 네 문과 궁궐에 나란히 서니, 한양 아이들이 깃발 색깔로 편을 갈라 놀았다." }); } });
  // 13. 경신 대기근: 청나라 쌀 (재정이 30 아래일 때만)
  PP({ id: "k_qingrice", scen: ["K"], cat: "ppl", name: "청나라 쌀 들여오기", sub: "을병 대기근 때 (1698)", kings: "숙종", cost: 1, eff: { ppl: 9, gold: 3, kp: -4, har: -3 }, tags: [-0.2, 0, 0.6],
    lockIf: () => (S.st.gold >= 30 ? "곳간(재정)이 30보다 적을 때만 할 수 있어요" : null),
    note: "딜레마! 굶주린 백성을 위해 청나라 쌀을 배로 들여와요. 실제로는 이보다 뒤인 을병 대기근(1695~96) 무렵의 일이에요. 재정이 30보다 적을 때만 할 수 있어요.",
    run() { return R({ ppl: 9, gold: 3, kp: -4, har: -3 }, "청나라 쌀을 실은 배가 들어와 굶주린 마을에 밥 짓는 연기가 올랐어요. '오랑캐의 쌀을 먹다니' 하는 선비들의 한숨도 함께 올랐어요.", this.tags, { sl: "쌀배가 닿은 포구에서 아이들이 흘린 쌀알을 한 톨씩 주워 담았다." }); } });
  // 14. 영조: 수성윤음
  PP({ id: "v_suseong", scen: ["V"], cat: "mil", name: "도성을 백성과 함께 지키기", sub: "수성윤음 (1751)", kings: "영조", cost: 2, eff: { def: 6, ppl: 4, har: 3, gold: -4 }, tags: [0.2, 0.7, 0.5],
    note: "'전쟁이 나도 도성을 버리지 않겠다'고 선언하고, 군영과 백성이 구역을 나눠 한양을 지켜요. 앞으로 모든 싸움에서 우리 힘 +4.",
    run() { return R({ def: 6, ppl: 4, har: 3, gold: -4 }, "왕이 '임진년과 병자년처럼 도성을 버리는 일은 다시 없다'고 선언했어요. 백성들이 저마다 맡은 성벽 구역을 돌보기 시작했어요.", this.tags, { sl: "성벽마다 동네 이름을 새긴 돌이 박히니, 백성들이 제 동네 성벽을 제집 담장처럼 쓸었다." }); } });
  // 15. 대한 제국: 무관학교
  PP({ id: "j_mugwan", scen: ["J"], cat: "mil", name: "대한 제국 무관학교", sub: "1898년", kings: "고종", cost: 2, eff: { def: 7, cul: 3, gold: -4 }, tags: [0.3, 0.8, 0.2],
    phase: () => !(S.flags && S.flags.lost),
    note: "나라의 장교를 기르는 학교예요. '신식 군대'와 함께면 싸움에서 우리 힘 +5. 이곳 출신들이 뒷날 의병과 독립군이 되어, 나라를 빼앗긴 뒤 '독립군 기지'·'광복군'의 좋은 효과가 20% 커져요.",
    run() { return R({ def: 7, cul: 3, gold: -4 }, "무관학교 생도들이 서양식 전술과 우리 역사를 함께 배웠어요.", this.tags, { sl: "무관학교 졸업식 날, 생도들이 받은 칼을 높이 들자 햇빛이 한꺼번에 번쩍였다." }); } });
  for (const id of ["jbase", "jcorps"]) { const p = P[id]; if (!p) continue; const r0 = p.run; p.run = function (...a) { const r = r0.apply(this, a); if (r && has("j_mugwan") && r.ok !== false) { for (const k of Object.keys(r.d)) if (r.d[k] > 0) r.d[k] = Math.round(r.d[k] * 1.2); r.text += " 무관학교 출신 장교들이 앞장섰어요!"; } return r; }; }

  // 지속 효과: 세월의 흐름에 더해요
  function n15Drift(dr, parts) {
    if (has("r_sunsu") && terrCount() >= 1) { dr.ppl += 1; parts.push("순수비를 세운 땅의 백성이 신라를 따름 (민심 +1)"); }
    if (S.flags.khitan && S.flags.khitan === S.turn - 1) { const hit = S.st.def >= 50 ? 3 : 8; dr.def -= hit; parts.push(`화가 난 거란이 보복하러 국경을 넘음 (국방 -${hit})`); }
    if (S.flags.gongmyeong) { dr.har -= 1; parts.push("공명첩으로 신분 질서가 흔들림 (화합 -1)"); }
    if (has("k_geumwi")) { dr.def += 1; parts.push("5군영이 늘 훈련함 (국방 감소 1 줄어듦)"); }
  }
  { const w0 = treasureDrift; treasureDrift = function (drift, parts) { w0(drift, parts); n15Drift(drift, parts); }; }

  // ================= 병자호란 ★4.5: 더 혹독하게 =================
  // 정묘호란(1627) 직후라 곳간과 군대가 이미 지쳐 있어요. 청의 요구는 전쟁 뒤에도 끝나지 않아요.
  if (SCEN.F) {
    SCEN.F.star = 4.5;
    SCEN.F.st = { kp: 36, har: 34, ppl: 42, gold: 34, def: 34, cul: 50 };
    SCEN.F.text += " 정묘호란을 막 겪어 곳간과 군대가 지쳐 있고, 전쟁이 끝나도 청나라의 요구는 계속돼요.";
  }
  { const ep0 = enemyPow; enemyPow = function () { return S.scen === "F" ? 78 - (S.flags.talk ? 6 : 0) : ep0(); }; }
  { const f0 = DRIFT5.F; DRIFT5.F = (dr, parts, L) => {
    if (f0) f0(dr, parts, L);
    if (S.turn <= 4) { dr.gold -= 2; parts.push("가도의 명나라 군대와 후금이 번갈아 군량을 요구함 (재정 -2)"); }
    else if (S.flags.warLost || S.flags.submit) { dr.gold -= 3; dr.kp -= 1; parts.push("청나라에 바치는 세폐와 끌려간 사람들의 몸값 (재정 -3, 왕권 -1)"); }
    else if (S.flags.reject || S.flags.warWon) { dr.def -= 2; parts.push("다시 쳐들어올 청나라에 맞서 국경을 지킴 (국방 -2)"); }
  }; }
