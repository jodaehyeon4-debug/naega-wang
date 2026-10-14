  // ================= 역사 속 왕의 위업 =================
  // 실제 그 나라의 왕들이 오랜 세월에 걸쳐 이룬 일. 쉽게 되지 않게 여러 단계·조건을 걸고, 이루면 '위업 달성'으로 크게 기록해요.
  // 영조의 위업을 위한 정책
  PP({ id: "v_tangbi", scen: ["V"], cat: "men", name: "성균관 앞에 탕평비 세우기 (1742)", sub: "탕평 정치의 완성", kings: "영조", cost: 2, req: ["tangpyeong"], repeat: 2, eff: { har: 7, kp: 3, cul: 2 }, tags: [-0.6, -0.2, 0],
    lockIf: () => (S.flags.tangBi ? "이미 세웠어요" : null),
    note: "탕평책을 편 다음에 할 수 있어요. 왕권 55·화합 40 이상이어야 노론과 소론이 함께 받아들여요. 실패해도 2시기 뒤 다시 할 수 있어요.",
    run() {
      if (S.st.kp >= 55 && S.st.har >= 40) { S.flags.tangBi = S.turn; return R({ har: 7, kp: 3, cul: 2 }, "성균관 앞에 탕평비를 세웠어요. '두루 어울리고 편 가르지 않는 것이 군자의 마음'이라는 글을 새겼어요.", this.tags, { sl: "탕평비가 서니, 노론 선비와 소론 선비가 비석 앞에서 마주쳐 서로 먼저 가라며 한참을 양보하였다." }); }
      return R({ har: -5, kp: -2 }, "노론과 소론이 비석에 새길 글귀를 두고 또다시 다투었어요. 왕권과 화합을 더 다진 뒤 다시 해 보세요.", this.tags, { ok: false, sl: "비석 글귀를 두고 신하들이 다투니, 석공이 정을 든 채 사흘을 기다렸다." });
    } });
  PP({ id: "v_junchun", scen: ["V"], cat: "ppl", name: "청계천 바닥을 파내는 큰 공사 (1760)", sub: "준천", kings: "영조", cost: 3, repeat: 2, eff: { ppl: 9, cul: 3, har: 2, gold: -10 }, tags: [0.1, -0.2, 0.8],
    lockIf: () => (S.flags.junchun ? "이미 했어요" : null),
    note: "해마다 넘치던 개천을 깊게 파 홍수를 막아요. 재정 45·민심 45 이상이어야 끝까지 해낼 수 있어요. 일한 백성에게 품삯을 주어요.",
    run() {
      if (S.st.gold >= 45 && S.st.ppl >= 45) { S.flags.junchun = S.turn; return R({ ppl: 9, cul: 3, har: 2, gold: -10 }, "백성 21만 명이 57일 동안 개천 바닥을 파내 홍수를 막았어요. 일한 백성들은 품삯을 받았어요.", this.tags, { sl: "개천 바닥을 파내니, 그 흙으로 산이 생겨 아이들이 그 위에서 연을 날렸다." }); }
      return R({ gold: -6, ppl: -6 }, "곳간과 민심이 모자라 공사가 중간에 멈췄어요. 파다 만 흙더미만 남았어요.", this.tags, { ok: false, sl: "공사가 멈추니, 파다 만 개천에 개구리들만 신이 났다." });
    } });
  // 균역법: 양반의 반대를 넘어야 하는 개혁
  Object.assign(P.military_tax, { cost: 2, eff: { ppl: 14, def: -3, gold: -4 },
    note: "양반들이 크게 반대해요. 왕권이 55 이상이면 왕이 직접 궁궐 문 앞에서 백성의 뜻을 물어 밀어붙일 수 있어요(영조, 1750).",
    run() {
      if (S.st.kp >= 55) return R({ ppl: 14, def: -3, gold: -4 }, "왕이 궁궐 문 앞에 나가 백성의 뜻을 직접 물은 뒤, 군포를 2필에서 1필로 줄였어요. 모자란 돈은 어장세·결작으로 채웠어요.", this.tags);
      return R({ ppl: 8, def: -5, gold: -6, har: -5 }, "군포를 반으로 줄였지만, 양반들의 반대에 밀려 모자란 돈을 채울 방법을 다 마련하지 못했어요.", this.tags);
    } });

  const FEATS = {
    P: [{ id: "p_reform", h: "律", n: "소수림왕의 3대 개혁", d: "율령 반포·태학 세우기·불교 받아들이기(372~373년)로 나라의 틀을 새로 세웠어요.", ok: () => ["law", "school", "buddhism"].every(has), pols: ["law", "school", "buddhism"] },
      { id: "p_liao", h: "遼", n: "광개토대왕의 요동 차지", d: "광개토대왕은 후연과 여러 번 싸운 끝에 요동을 차지했어요(400년 무렵).", ok: () => ownsTerr("liaodong"), pols: ["p_west"] },
      { id: "p_han", h: "南", n: "장수왕의 한강 유역 차지", d: "장수왕은 도읍을 평양으로 옮긴 뒤 475년 백제의 한성을 무너뜨렸어요.", ok: () => ownsTerr("go_south"), pols: ["p_south"] }],
    Q: [{ id: "q_mahan", h: "馬", n: "근초고왕의 마한 정복", d: "근초고왕은 369년 무렵 남쪽 마한 땅을 거의 다 차지했어요.", ok: () => ownsTerr("mahan"), pols: ["q_south"] },
      { id: "q_pyeong", h: "平", n: "평양성 싸움 승리", d: "371년 근초고왕은 평양성을 공격해 고구려 고국원왕을 쓰러뜨렸어요.", ok: () => ownsTerr("hwanghae"), pols: ["q_north"] },
      { id: "q_sea", h: "海", n: "바다 건너 동진·왜와 교류", d: "백제는 동진과 교류하고 왜에 칠지도와 학자(아직기·왕인)를 보냈어요.", ok: () => has("trade") && (S.flags.ally || has("alliance")), pols: ["trade", "alliance"] }],
    R: [{ id: "r_law", h: "佛", n: "법흥왕의 율령 반포와 불교 공인", d: "법흥왕은 520년 율령을 반포하고, 이차돈의 순교 뒤 불교를 공인했어요(527년).", ok: () => has("law") && has("buddhism"), pols: ["law", "buddhism"] },
      { id: "r_gaya", h: "伽", n: "가야 통합", d: "법흥왕이 금관가야(532년)를, 진흥왕이 대가야(562년)를 아울렀어요. 30년이 걸린 일이에요.", ok: () => ownsTerr("gaya"), pols: ["r_gaya1", "r_gaya"], hint: "금관가야 → 대가야" },
      { id: "r_han", h: "漢", n: "진흥왕의 한강 차지", d: "진흥왕은 553년 한강 유역을 차지해 중국과 바로 오가는 길을 열었어요.", ok: () => ownsTerr("sl_han"), pols: ["r_han"] }],
    T: [{ id: "t_unify", h: "統", n: "후삼국 통일", d: "왕건은 신라를 평화롭게 받아들이고(935년), 일리천 싸움에서 후백제를 무너뜨렸어요(936년).", ok: () => ownsTerr("hb") && ownsTerr("sl_late"), pols: ["t_hb", "t_silla"] },
      { id: "t_hojok", h: "族", n: "호족을 하나로 묶기", d: "왕건은 여러 호족의 딸과 혼인하고 성씨를 내리며, 호족 자식을 도읍에 머물게 해 나라를 하나로 묶었어요.", ok: () => has("marriage") && has("hostage") && S.st.har >= 55, pols: ["marriage", "hostage"], hint: "혼인 정책·기인 제도를 펴고 화합 55 이상" },
      { id: "t_north", h: "北", n: "북진 정책", d: "왕건은 서경(평양)을 북진의 기지로 삼아 청천강까지 땅을 넓혔어요.", ok: () => ownsTerr("gr_north"), pols: ["t_north"] }],
    U: [{ id: "u_hangeul", h: "訓", n: "훈민정음 창제", d: "세종은 집현전 학자들과 함께 1443년 훈민정음을 만들고 1446년 온 나라에 펴냈어요.", ok: () => has("hangeul"), pols: ["scholars", "hangeul"] },
      { id: "u_border", h: "疆", n: "4군 6진 개척", d: "최윤덕·김종서가 16년(1433~1449년)에 걸쳐 여러 번 원정하고 백성을 옮겨 살게 해 이룬 일이에요.", ok: () => ownsTerr("j4gun") && ownsTerr("j6jin"), pols: ["u_4gun1", "u_4gun", "u_6jin1", "u_samin", "u_6jin"], hint: "4군 2단계 + 6진 3단계" },
      { id: "u_sci", h: "器", n: "과학 기구와 공법", d: "측우기·앙부일구를 만들고, 백성 17만 명에게 물어 세금 제도(공법)를 정했어요.", ok: () => has("science") && has("survey"), pols: ["science", "survey"] }],
    V: [{ id: "v_tang", h: "蕩", n: "탕평비를 세운 탕평 정치", d: "영조는 탕평책을 펴고 1742년 성균관 앞에 탕평비를 세웠어요.", ok: () => !!S.flags.tangBi, pols: ["tangpyeong", "v_tangbi"], hint: "탕평책 → 탕평비" },
      { id: "v_gyun", h: "均", n: "균역법", d: "영조는 1750년 백성이 내던 군포를 2필에서 1필로 줄였어요.", ok: () => has("military_tax"), pols: ["military_tax"] },
      { id: "v_jun", h: "川", n: "청계천 준천", d: "1760년 백성 21만 명이 57일 동안 청계천 바닥을 파내 홍수를 막았어요.", ok: () => !!S.flags.junchun, pols: ["v_junchun"] }],
  };
  const FEAT_BONUS = { kp: 3, cul: 2 };
  const featList = () => FEATS[S.scen] || [];
  // 정책 카드에 '왕의 위업' 표시
  for (const [sc, fs] of Object.entries(FEATS)) for (const f of fs) for (const id of f.pols) if (P[id]) { P[id].featOf = P[id].featOf || {}; P[id].featOf[sc] = f.n; }
  const featOfCard = (p) => (p.featOf && p.featOf[S.scen]) || null;
  function featCheck(L) {
    S.feats = S.feats || {};
    for (const f of featList()) if (!S.feats[f.id] && f.ok()) {
      S.feats[f.id] = S.turn;
      const delta = apply(FEAT_BONUS);
      (L.feat = L.feat || []).push({ id: f.id, delta });
    }
  }
  const featCount = () => featList().filter((f) => S.feats && S.feats[f.id]).length;
  function featStrip() {
    const fs = featList(); if (!fs.length) return "";
    return `<section class="panel featstrip"><b>역사 속 왕의 위업 ${featCount()}/${fs.length}</b><span class="sub">실제 왕들이 오랜 세월에 걸쳐 이룬 일이에요. 이루면 왕력 점수가 크게 올라요.</span>
      <div class="fchips">${fs.map((f) => { const t = S.feats && S.feats[f.id]; return `<span class="fchip ${t ? "on" : ""}"><i aria-hidden="true">${f.h}</i>${esc(f.n)}${t ? ` ✓` : f.hint ? ` <small>(${esc(f.hint)})</small>` : ""}</span>`; }).join("")}</div></section>`;
  }
  function featEntries(L) {
    return (L.feat || []).map((x) => { const f = featList().find((y) => y.id === x.id); return f ? `<div class="entry featok"><span class="h" aria-hidden="true">${f.h}</span><div><b>위업 달성! ${esc(f.n)}</b><p>${esc(f.d)} 역사 속 왕과 같은 일을 해냈어요.</p>${chips(x.delta)}</div></div>` : ""; }).join("");
  }
  function featPanel() {
    const fs = featList(); if (!fs.length) return "";
    const n = featCount();
    return `<section class="panel featend"><h2>역사 속 왕의 위업 ${n}/${fs.length}${n === fs.length ? " · 모두 이루었어요!" : ""}</h2>
      <ul>${fs.map((f) => { const t = S.feats && S.feats[f.id]; return `<li class="${t ? "on" : ""}"><span class="h" aria-hidden="true">${f.h}</span><div><b>${esc(f.n)}</b> ${t ? `<span class="chip up">${t}시기에 이룸</span>` : `<span class="chip">이루지 못함</span>`}<p>${esc(f.d)}</p></div></li>`; }).join("")}</ul></section>`;
  }
