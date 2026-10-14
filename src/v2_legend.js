  // ================= 조건을 지켜야 하는 정책: 잊지 않게 알려 줘요 =================
  const WATCH = [
    { id: "trade", k: "def", v: 40, pen: { gold: -2 }, why: "외국 상인·해적에게 밀려 무역 이익이 줄어듦" },
    { id: "jrail", k: "def", v: 30, pen: { gold: -2 }, why: "일본이 철도를 마음대로 씀" },
    { id: "coin", k: "ppl", v: 40, pen: { gold: -1 }, why: "백성이 나라 돈을 믿지 않음" },
  ];
  const watchOn = () => WATCH.filter((w) => P[w.id] && S.done.some((d) => d.id === w.id && d.ok !== false && d.by !== "start"));
  function watchDrift(drift, parts) {
    for (const w of watchOn()) if (S.st[w.k] < w.v) for (const [k, x] of Object.entries(w.pen)) { drift[k] = (drift[k] || 0) + x; parts.push(`${w.why} (${SN[k]} ${x})`); }
  }
  function watchBox() {
    const ws = watchOn().filter((w) => S.st[w.k] < w.v + 10);
    if (!ws.length || S.phase === "start" || S.phase === "end") return "";
    return `<aside class="watch" role="status">${ws.map((w) => { const low = S.st[w.k] < w.v; return `<p class="${low ? "low" : ""}"><b>${low ? "이미 효과가 약해졌어요!" : "주의!"}</b> ${SN[w.k]} ${S.st[w.k]} · ${w.v}보다 낮아지면 '${esc(P[w.id].name)}'의 효과가 약해져요.</p>`; }).join("")}</aside>`;
  }

  // ================= 전설의 히든 정책 =================
  // 몇 가지 정책을 함께 펼쳐 조건이 맞을 때만 몰래 나타나요. 100판에 5판쯤 볼 수 있어요.
  const LEG = (o) => PP({ id: o.id, scen: [o.scen], cat: o.cat || "law", name: o.name, sub: o.sub, kings: "전설 · 실제 역사에는 없던 일", cost: 2, eff: o.eff, inc: o.inc, legend: true, tags: [0.3, 0.3, 0.3],
    phase: () => { const ok = !S.done.some((d) => d.id === o.id) && o.need(); if (ok) S.flags["leg_" + o.id] = true; return ok || S.done.some((d) => d.id === o.id); },
    note: o.note, run() { if (o.inc) addInc(o.inc); return R(o.eff, o.text, this.tags, { sl: o.sl }); } });
  LEG({ id: "lg_p", scen: "P", cat: "mil", name: "삼족오 철갑 기병대", sub: "해·바다·땅을 모두 쥔 기병", need: () => ["p_ondal", "p_navy", "fortress"].every(has) && S.st.def >= 55, eff: { def: 25, kp: 10, gold: 5 },
    note: "평민 장수·수군·산성이 하나로 이어지자 전설의 부대가 나타났어요!", text: "말과 사람 모두 쇠 갑옷을 두른 기병 만 명이 배를 타고 바다를 건너 적의 뒤를 쳤어요. 이웃 나라들이 고구려 깃발만 보면 성문을 닫았어요.", sl: "철갑 기병이 달리니 땅이 울려, 이웃 나라 우물물이 출렁였다." });
  LEG({ id: "lg_q", scen: "Q", cat: "cul", name: "동아시아 최고의 금동 공방", sub: "백제 금동대향로의 비밀", need: () => ["q_chiljido", "trade", "buddhism"].every(has) && S.st.cul >= 72, eff: { cul: 20, gold: 15 }, inc: 4,
    note: "칠지도의 쇠 기술·바다 교역·불교 예술이 만나 전설의 공방이 열렸어요!", text: "백제 장인들이 만든 금동 향로와 불상이 중국·왜·멀리 서역까지 팔려 나갔어요. 바다 건너 나라들이 백제 장인을 모셔 가려고 줄을 섰어요.", sl: "금동 향로에 불을 피우니, 향 연기가 다섯 악사 모양으로 피어올랐다." });
  LEG({ id: "lg_r", scen: "R", cat: "men", name: "화랑 천 명의 대연합", sub: "황룡사 9층 목탑 아래의 맹세", need: () => ["hwarang", "buddhism", "r_ureuk"].every(has) && S.st.har >= 68, eff: { har: 20, def: 15, cul: 5 },
    note: "화랑·불교·가야의 음악이 하나가 되자 전설의 맹세가 이루어졌어요!", text: "온 나라의 화랑 천 명이 9층 목탑 아래 모여 가야금 소리에 맞춰 나라를 지키기로 맹세했어요. 귀족도 백성도 한마음이 되었어요.", sl: "화랑 천 명이 한꺼번에 '맹세!'를 외치니, 목탑 꼭대기 풍경이 저절로 울렸다." });
  LEG({ id: "lg_t", scen: "T", cat: "eco", name: "아라비아 나침반 함대", sub: "벽란도에 온 서역 항해사", need: () => (!!S.flags.hub || has("t_daegwang")) && ["trade", "coin"].every(has) && S.st.gold >= 65, eff: { gold: 25, def: 10, cul: 5 }, inc: 5,
    note: "무역 허브 벽란도·화폐·바닷길이 만나자 아라비아 항해사가 비밀을 전해요!", text: "아라비아 항해사가 나침반과 별 보는 법을 전해 주었어요. 고려 배들이 인도양까지 나아가 향신료를 싣고 돌아왔어요.", sl: "고려 배가 인도에서 돌아오니, 개경 사람들이 처음 맛본 후추에 재채기를 백 번 하였다." });
  LEG({ id: "lg_u", scen: "U", cat: "cul", name: "하늘을 나는 비거(飛車)", sub: "장영실의 마지막 발명", need: () => ["u_jaseok", "science", "scholars"].every(has) && S.st.cul >= 72, eff: { cul: 20, def: 15, kp: 5 },
    note: "장영실·과학 기구·집현전이 모두 갖추어지자 전설의 발명품이 나타나요!", text: "장영실이 바람을 타고 하늘을 나는 수레(비거)를 만들었어요. 집현전 학자들이 설계도를 책으로 남겼어요.", sl: "비거가 경복궁 위를 날자, 세종이 '이제 하늘의 비도 가까이서 재겠구나' 하며 웃었다." });
  LEG({ id: "lg_v", scen: "V", cat: "eco", name: "영국 사신과 증기 기관 들여오기", sub: "한양 지하철 · 증기선 함대", need: () => ["v_bukhak", "trade", "coin"].every(has) && S.st.gold >= 75, eff: { gold: 25, cul: 15, kp: 10, har: -10, ppl: -5 }, inc: 5,
    note: "북학·무역·화폐가 모두 갖추어지자 바다 건너 영국 사신이 찾아왔어요! 힘은 엄청나지만 다른 나라를 넘보는 제국의 길이에요.", text: "영국 사신이 가져온 증기 기관으로 한양 땅 밑에 철길을 놓고 증기선 함대를 띄웠어요. 조선이 아시아의 공업 강국이 되어 다른 나라를 넘보기 시작했어요. 하지만 낯선 변화에 놀란 사람들의 불만도 컸어요.", sl: "한양 땅 밑으로 증기 기차가 달리니, 종로 두더지들이 이사를 갔다." });
  LEG({ id: "lg_e", scen: "E", cat: "mil", name: "물속을 다니는 거북선", sub: "전설의 잠수 거북선", need: () => ["e_navy", "e_hun", "e_gwak", "science"].every(has) && S.st.def >= 65, eff: { def: 30, ppl: 5 },
    note: "수군·훈련도감·새 기술이 만나자 전설의 배가 바다 밑에서 떠올랐어요!", text: "물속으로 숨었다가 왜군 배 바로 아래에서 떠오르는 거북선이 나타났어요. 왜군 배들이 바다에 나오지 못하게 되었어요.", sl: "거북선이 물속에서 떠오르니, 왜군 장수가 '바다가 거북을 낳았다' 하며 노를 던졌다." });
  LEG({ id: "lg_f", scen: "F", cat: "mil", name: "강화도 비밀 굴과 홍이포", sub: "청군도 모르는 길", need: () => ["f_ganghwa", "fortress"].every(has) && !!S.flags.spyOk && S.st.def >= 50, eff: { def: 30, kp: 10 },
    note: "강화도·남한산성·밀정이 모두 갖추어지자 전설의 비밀이 열렸어요!", text: "남한산성에서 강화도까지 이어진 비밀 굴로 군량과 서양식 대포(홍이포)를 옮겼어요. 청나라 군대가 어디를 쳐야 할지 몰라 헤맸어요.", sl: "비밀 굴에서 홍이포 소리가 울리니, 청나라 말들이 귀를 막고 주저앉았다." });
  LEG({ id: "lg_k", scen: "K", cat: "ppl", name: "백 년 먼저 온 고구마와 감자", sub: "바다 건너 온 구황 작물", need: () => ["k_guhwang", "trade", "kjinhyul"].every(has) && S.st.ppl >= 55, eff: { ppl: 25, gold: 15 }, inc: 3,
    note: "구황 책·무역·진휼청이 이어지자 바다 건너 신기한 작물이 들어왔어요! (실제로 고구마는 1763년에 들어왔어요.)", text: "가뭄에도 잘 자라는 고구마와 감자가 백 년 먼저 들어와 온 나라에 퍼졌어요. 흉년이 들어도 굶는 사람이 사라졌어요.", sl: "고구마를 처음 구운 날, 온 마을 아이들이 입가가 까매지도록 먹었다." });
  LEG({ id: "lg_j", scen: "J", cat: "mil", name: "대한 제국 비행선 함대", sub: "경성 하늘의 비행선", need: () => ["jrail", "jarmy", "jbank"].every(has) && S.st.gold >= 55, eff: { def: 25, kp: 10, cul: 10 },
    note: "철도·신식 군대·우리 은행이 모두 갖추어지자 전설의 함대가 하늘에 떴어요!", text: "우리 은행의 돈과 철도 기술로 거대한 비행선을 띄웠어요. 하늘에서 국경을 지키니 어느 나라도 함부로 넘보지 못했어요.", sl: "비행선이 경성 하늘에 뜨니, 장터 사람들이 고개를 들다 갓이 모두 뒤로 넘어갔다." });
