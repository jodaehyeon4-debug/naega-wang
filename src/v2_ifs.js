  // ================= 만약에? 역사적 상상력 선택지 =================
  // 실제 역사에서는 일어나지 않았거나 일부만 일어난 일. 성공 확률은 그 시대의 현실적인 가능성을 생각해 정했어요.
  Object.assign(REG, {
    go_unify: ring(GO475_S, [[130.1, 36.0], [130.1, 34.9], [128.9, 34.6], [127.3, 33.9], [125.5, 33.9], [125.4, 36.6], [126.2, 37.15]]),
    yoseo: ring([[121.6, 40.4], [120.5, 39.8], [119.2, 39.2], [118.5, 39.3], [118.3, 40.4], [118.8, 41.5], [119.5, 42.5], [120.8, 43.2], [122.5, 43.6], [124.3, 43.4]], RVS(LIAO).slice(1)),
    zhongyuan: [[113, 34.6], [118.2, 34.6], [119.3, 35.6], [119.0, 37.2], [118.0, 38.4], [118.5, 39.3], [118.3, 40.4], [118.8, 41.5], [117.5, 42.6], [113, 42.6]],
    wa_kyushu: [[129.5, 33.0], [129.9, 33.7], [130.6, 34.1], [131.2, 34.1], [131.8, 33.7], [131.8, 32.6], [130.3, 32.4], [129.6, 32.6]],
    shandong: [[119.2, 35.9], [121.0, 36.2], [122.9, 36.8], [122.9, 37.6], [120.8, 38.0], [119.4, 37.4]],
    sr_unify: ring(GO371_S, [[128.6, 39.3], [130.2, 37.9], [130.1, 34.9], [128.9, 34.6], [127.3, 33.9], [125.5, 33.9], [124.3, 37.5], [124.2, 38.3]]),
    gr_6ju: ring(YALU.slice(0, iY(5) + 1), [[126.3, 40.4]], RVS(cut(GRN_N, 0, iS(3))), [[124.6, 39.5]]),
    manchu: ring(YALU, TUMEN.slice(1), [[131.2, 42.8], [130.5, 44.0], [128.5, 44.6], [126.5, 44.6], [124.8, 43.5], [124.3, 42.3], [124.6, 41.0], [124.1, 40.2]]),
    tsushima: [[129.1, 34.05], [129.55, 34.05], [129.55, 34.75], [129.1, 34.75]],
    wa_west: [[130.85, 33.9], [130.85, 34.45], [131.4, 34.5], [131.9, 34.8], [132.6, 35.35], [133.48, 35.62], [133.48, 34.35], [132.3, 34.12], [131.7, 33.92], [131.0, 33.85]],
  });
  Object.assign(TNAME, { go_unify: "한반도 남쪽 끝까지", yoseo: "요서", zhongyuan: "중원", wa_kyushu: "왜 땅(규슈)", shandong: "산둥 반도", sr_unify: "대동강 남쪽 온 땅", gr_6ju: "강동 6주", manchu: "만주", tsushima: "대마도", wa_west: "왜 땅(혼슈 서쪽)" });
  Object.assign(RLAB, { zhongyuan: [116.3, 38.6], yoseo: [120.3, 41.2], wa_kyushu: [130.7, 33.3], wa_west: [132.3, 34.75], shandong: [121.0, 37.0], gr_6ju: [125.2, 40.1] });
  // 땅이 넓어지면 지도도 넓게 보여 줘요
  MAPS.P.wide = { ids: ["yoseo", "zhongyuan"], view: [111.5, 33.4, 132.2, 45.9] };
  MAPS.Q.wide = { ids: ["wa_kyushu", "shandong", "wa_west"], view: [118.6, 32.4, 133.5, 40.6] };
  MAPS.R.wide = { ids: ["go_core", "liaodong"], view: [121.4, 33.4, 131.6, 43.8] };
  MAPS.U.wide = { ids: ["manchu"], view: [122.6, 33.4, 132.6, 45.0] };
  MAPS.T.wide = { ids: ["liaodong", "gr_6ju"], view: [121.2, 33.4, 131.2, 42.4] };
  MAPS.P.labels.push(["중원(중국 한가운데)", [117.6, 38.3]], ["후연·북위(중국)", [117.6, 41.6], "zhongyuan"]);
  MAPS.Q.labels.push(["산둥 반도", [121.0, 37.15]], ["동진(중국)", [117.6, 35.6]]);
  MAPS.T.labels.push(["요동", [123.0, 41.2]]);
  MAPS.U.labels.push(["만주", [127.5, 44.0]]);

  // 확률 = 기본 + 갖춘 조건마다 더하기 (최대값까지)
  function IfPol(o) {
    // 확률 등급: 초모험 20%대 · 모험 30~35% · 쉬운 모험 55%까지 (기본, 최고)
    const TG = { p_china: [0.02, 0.22], r_manchu: [0.03, 0.24], u_manchu: [0.03, 0.25], t_liao: [0.03, 0.26],
      p_unify: [0.1, 0.32], p_yoseo: [0.12, 0.35], q_sd: [0.1, 0.32], r_unify: [0.12, 0.35], r_tang: [0.12, 0.35], u_tsu2: [0.12, 0.33],
      q_wa: [0.22, 0.5], q_wajeong: [0.02, 0.22], q_sea: [0.25, 0.55], t_hub: [0.28, 0.55], t_seohee: [0.25, 0.55] }[o.id];
    if (TG) {
      const [b, t] = TG, extra = o.ultra ? 0.01 : 0, sum = o.bonus.reduce((a, x) => a + x[2], 0);
      const k = (t - b - extra * o.bonus.length) / sum;
      o.bonus = o.bonus.map(([l, c, add]) => [l, c, Math.max(1, Math.round(add * k * 100)) / 100 + extra]);
      o.base = b; o.max = Math.round((b + o.bonus.reduce((a, x) => a + x[2], 0)) * 100) / 100;
    }
    if (o.ultra) o.cost = 4;
    const chance = () => Math.min(o.max + extBonus(o.ultra), o.base + extBonus(o.ultra) + o.bonus.reduce((acc, [, c, add]) => acc + (c() ? add : 0), 0));
    PP({ id: o.id, scen: [o.scen], cat: o.cat || "mil", name: o.name, sub: o.sub, kings: o.kings || "실제 역사와 다른 길", cost: o.cost, eff: o.eff, fail: o.fail, inc: o.inc, gamble: true, risky: true, strong: true, ifs: true, ultra: o.ultra, tags: o.tags || [0.6, 1, 0], dir: o.dir,
      chance,
      lockIf: () => { if (o.regions && o.regions.every(ownsTerr)) return "이미 이루었어요"; return o.need ? o.need() : null; },
      get note() {
        const pct = (v) => `${Math.round(v * 100)}%`;
        return `${o.note} 성공 확률은 기본 ${pct(o.base)}` + o.bonus.map(([lab, c, add]) => ` · ${lab} +${pct(add)}${c() ? "✓" : ""}`).join("") + ` (가장 높아도 ${pct(o.max)}). ✓는 이미 갖춘 조건이에요.` + (extBonus(o.ultra) ? ` 조금만 더 보너스 +${pct(extBonus(o.ultra))}!` : "");
      },
      run() {
        if (Math.random() < chance()) {
          (o.regions || []).forEach(gainTerr); if (o.inc) addInc(o.inc); if (o.onWin) o.onWin(); S.flags.conquered = S.flags.conquered || !!o.regions;
          return R(o.eff, o.winText, this.tags, { sl: o.slWin });
        }
        S.flags.warLost = S.flags.warLost || !!o.war;
        const lost = []; for (let i = 0; i < (o.loseLand || 0); i++) { const l = loseTerr(); if (l) lost.push(TNAME[l] || l); }
        return R(o.fail, o.failText + (lost.length ? ` ${jo(lost.join(", "), "을", "를")} 빼앗겼어요.` : ""), this.tags, { ok: false, sl: o.slFail });
      } });
  }

  // ---------- 고구려 ----------
  IfPol({ id: "p_unify", scen: "P", name: "남쪽 끝까지 내려가 삼국 통일", sub: "고구려의 삼국 통일", cost: 3, war: true, regions: ["go_unify"],
    need: () => (ownsTerr("go_south") ? null : "먼저 한강 유역을 차지해야 해요"),
    base: 0.18, max: 0.55, bonus: [["국방 65 이상", () => S.st.def >= 65, 0.12], ["신라를 구한 적 있음", () => S.flags.sillaSaved, 0.1], ["동맹", () => S.flags.ally || has("alliance"), 0.06], ["민심 55 이상", () => S.st.ppl >= 55, 0.06], ["화랑 같은 젊은 인재 무리", () => has("hwarang"), 0.03]],
    eff: { kp: 10, gold: 12, def: -4, har: -6, ppl: -4 }, inc: 3, fail: { def: -16, ppl: -8, kp: -6 }, loseLand: 1,
    dir: { from: [127.1, 37.52], to: [128.6, 35.4], label: "삼국 통일" },
    note: "실제로 삼국을 통일한 나라는 신라였어요. 백제·신라·가야가 힘을 합쳐 막을 거예요.",
    winText: "백제와 신라, 가야가 모두 고구려의 깃발 아래 들어왔어요! 만주에서 남해 바닷가까지 하나의 나라가 되었어요. (실제 역사에는 없던 상상의 이야기예요.)",
    failText: "남쪽의 세 나라가 힘을 합쳐 고구려군을 크게 무찔렀어요.",
    slWin: "고구려 깃발이 남해 바닷가에 꽂히니, 바닷가 게들이 옆으로 걸으며 절을 하였다.", slFail: "남쪽 세 나라가 한꺼번에 덤비니, 고구려 장수가 어느 쪽부터 막을지 고르다 투구가 돌아갔다." });
  IfPol({ id: "p_yoseo", scen: "P", name: "요하를 건너 요서로", sub: "서쪽으로 더 멀리", cost: 3, war: true, regions: ["yoseo"],
    need: () => (ownsTerr("liaodong") ? null : "먼저 요동을 차지해야 해요"),
    base: 0.25, max: 0.6, bonus: [["국방 65 이상", () => S.st.def >= 65, 0.12], ["재정 50 이상", () => S.st.gold >= 50, 0.08], ["후연과의 큰 싸움에서 이김", () => S.flags.warWon, 0.08], ["북쪽 기병과 동맹", () => S.flags.ally, 0.07]],
    eff: { gold: 10, def: 4, kp: 6, ppl: -5 }, inc: 2, fail: { def: -14, gold: -8, ppl: -5 }, loseLand: 1,
    dir: { from: [123.17, 41.27], to: [120.3, 41.2], label: "요서 원정" },
    note: "요서는 중국으로 들어가는 길목이에요. 중원으로 가려면 먼저 이곳이 필요해요.",
    winText: "요하를 건너 요서 땅을 차지했어요! 이제 중국 한가운데(중원)로 가는 길이 열렸어요.",
    failText: "요하를 건너자마자 중국 군대에게 둘러싸였어요.",
    slWin: "고구려군이 요하를 건너니, 강물이 놀라 반대로 흐를 뻔하였다.", slFail: "요하를 건너던 말들이 물살에 밀려 고구려 쪽으로 되돌아왔다." });
  IfPol({ id: "p_china", scen: "P", name: "중원 진출: 황제의 나라를 꿈꾸다", sub: "나라 전체를 건 원정", cost: 3, war: true, ultra: true, regions: ["zhongyuan"],
    need: () => (!ownsTerr("yoseo") ? "먼저 요서를 차지해야 해요" : S.st.def < 65 || S.st.gold < 55 ? "대비가 모자라요: 국방 65·재정 55 이상이어야 떠날 수 있어요" : null),
    base: 0.04, max: 0.32, bonus: [["국방 80 이상", () => S.st.def >= 80, 0.07], ["재정 70 이상", () => S.st.gold >= 70, 0.05], ["왕권 70 이상", () => S.st.kp >= 70, 0.05], ["화합 60 이상", () => S.st.har >= 60, 0.03], ["민심 60 이상", () => S.st.ppl >= 60, 0.03], ["동맹", () => S.flags.ally || has("alliance"), 0.03], ["국경에 성 쌓기", () => has("fortress"), 0.02]],
    eff: { kp: 15, gold: 25, cul: 10, ppl: -8, def: -6 }, inc: 5, fail: { def: -30, ppl: -15, gold: -20, kp: -10 }, loseLand: 2,
    onWin: () => { S.flags.china = true; }, dir: { from: [120.3, 41.2], to: [117.0, 39.3], label: "중원으로!" },
    note: "초모험! 실제로는 수나라·당나라가 백만 대군으로 고구려에 쳐들어왔고, 고구려는 성을 지키며 막아 냈어요. 거꾸로 중원을 차지하려면 나라 전체를 걸어야 해요. 실패하면 나라가 무너질 수도 있어요.",
    winText: "삼족오 깃발을 단 철갑 기병이 만리장성을 넘었어요! 중원의 도시들이 고구려에 항복하고, 동쪽과 서쪽을 아우르는 대제국이 탄생했어요. (실제 역사에는 없던 상상의 이야기예요.)",
    failText: "중원의 끝없는 대군과 낯선 땅에 고구려군이 크게 무너졌어요. 살아 돌아온 군사가 얼마 되지 않았어요.",
    slWin: "고구려 기병이 만리장성 앞에 이르니, 성벽 위 병사들이 삼족오 깃발을 보고 '해에서 까마귀가 내려왔다'며 엎드렸다.", slFail: "중원 원정군이 돌아오지 않으니, 국내성 어머니들이 압록강 가에서 사흘 밤을 기다렸다." });

  // ---------- 백제 ----------
  IfPol({ id: "q_wa", scen: "Q", name: "바다 건너 왜 땅에 백제 마을 세우기", sub: "백제의 왜 진출", cost: 2, regions: ["wa_kyushu"],
    base: 0.3, max: 0.7, bonus: [["바다 무역 길 열기", () => has("trade"), 0.15], ["왜와 동맹·교류", () => S.flags.ally || S.flags.waFriend, 0.12], ["문화 50 이상", () => S.st.cul >= 50, 0.08], ["재정 50 이상", () => S.st.gold >= 50, 0.05]],
    eff: { gold: 10, cul: 6, def: 2 }, inc: 2, fail: { gold: -10, def: -6, ppl: -3 },
    dir: { from: [127.1, 37.52], to: [130.6, 33.4], label: "왜로", bend: 0.25 },
    note: "실제로 백제 사람들은 왜에 건너가 글과 불교, 집 짓는 기술을 전했어요(아스카 문화). 왜 땅을 직접 다스렸다는 것은 상상이에요.",
    winText: "백제 배들이 규슈에 닿아 마을을 세웠어요! 백제의 기술과 왜의 바다 물건이 오가는 다리가 되었어요. (상상의 이야기예요.)",
    failText: "왜의 호족들이 백제 사람들을 반기지 않았고, 배 여러 척이 폭풍에 가라앉았어요.",
    slWin: "백제 마을이 규슈에 서니, 왜 사람들이 백제 말로 '안녕하시오'를 배우느라 혀를 굴렸다.", slFail: "왜로 가던 배가 폭풍을 만나, 사공이 돛대를 껴안고 사흘을 버텼다." });
  IfPol({ id: "q_wajeong", scen: "Q", name: "왜 정벌: 바다 건너 왜를 다스리다", sub: "나라 전체를 건 바다 원정", cost: 3, war: true, ultra: true, regions: ["wa_west"],
    need: () => (!ownsTerr("wa_kyushu") ? "먼저 왜 땅(규슈)에 백제 마을을 세워야 해요" : S.st.def < 60 || S.st.gold < 55 ? "대비가 모자라요: 국방 60·재정 55 이상이어야 떠날 수 있어요" : null),
    base: 0.02, max: 0.3, bonus: [["국방 80 이상", () => S.st.def >= 80, 0.07], ["재정 70 이상", () => S.st.gold >= 70, 0.05], ["바다 무역 길 열기", () => has("trade"), 0.05], ["왕권 70 이상", () => S.st.kp >= 70, 0.04], ["화합 60 이상", () => S.st.har >= 60, 0.03], ["산둥 거점", () => ownsTerr("shandong"), 0.03]],
    eff: { kp: 14, gold: 20, cul: 6, ppl: -8, def: -6 }, inc: 4, fail: { def: -28, ppl: -14, gold: -18, kp: -10 }, loseLand: 2,
    onWin: () => { S.flags.waKing = true; }, dir: { from: [130.6, 33.6], to: [132.4, 34.8], label: "왜 정벌", bend: 0.2 },
    note: "초모험! 실제 백제는 왜와 사이좋게 지내며 칠지도를 보내고 글(왕인)·불교·기술을 전해 주었어요. 바다 건너 큰 땅을 군대로 다스리려면 배와 식량을 끝없이 보내야 해서 매우 어려워요. 실패하면 나라가 무너질 수도 있어요.",
    winText: "백제 수군 천 척이 왜의 바다를 건넜어요! 왜의 호족들이 백제 왕을 '대왕'으로 받들고, 바다 양쪽을 다스리는 해상 대제국이 되었어요. (실제 역사에는 없던 상상의 이야기예요.)",
    failText: "낯선 바다와 왜 호족들의 연합군에 크게 졌어요. 돌아온 배가 얼마 되지 않았어요.",
    slWin: "백제 배가 왜 땅에 닿으니, 왜 호족들이 칠지도를 받들고 나와 '이 칼을 보내 준 나라'라며 절하였다.", slFail: "왜 정벌군이 돌아오지 않으니, 한성 나루에서 어머니들이 등불을 띄워 보냈다." });
  IfPol({ id: "q_sd", scen: "Q", name: "바다 건너 중국 산둥 반도에 거점 세우기", sub: "백제의 중국 진출", cost: 3, war: true, regions: ["shandong"],
    base: 0.18, max: 0.5, bonus: [["바다 무역 길 열기", () => has("trade"), 0.1], ["국방 55 이상", () => S.st.def >= 55, 0.1], ["황해도를 차지함", () => ownsTerr("hwanghae"), 0.06], ["재정 55 이상", () => S.st.gold >= 55, 0.06]],
    eff: { gold: 12, cul: 5, kp: 5, def: -3 }, inc: 2, fail: { def: -12, gold: -8 }, loseLand: 1,
    dir: { from: [126.6, 37.4], to: [121.2, 37.1], label: "산둥으로" },
    note: "옛 중국 역사책에 백제가 바다 건너 땅을 가졌다는 기록이 있지만, 학자마다 생각이 달라요.",
    winText: "백제 수군이 서해를 건너 산둥 반도에 깃발을 꽂았어요! 서해가 '백제의 바다'가 되었어요. (상상의 이야기예요.)",
    failText: "중국 군대가 바닷가에서 기다리고 있었어요.",
    slWin: "백제 배가 산둥에 닿으니, 그곳 어부들이 백제 그물이 더 촘촘하다며 감탄하였다.", slFail: "산둥 바닷가에 내리자마자 중국 군사들이 나타나, 백제군이 배로 도로 뛰어올랐다." });
  IfPol({ id: "q_sea", scen: "Q", cat: "eco", name: "동아시아 바닷길의 왕국", sub: "바다를 잇는 백제", cost: 2, tags: [0.2, 0, 0.3],
    need: () => (ownsTerr("wa_kyushu") || ownsTerr("shandong") ? null : "먼저 왜 땅이나 산둥 반도에 거점이 있어야 해요"), lockIfDone: true,
    base: 0.4, max: 0.85, bonus: [["왜 땅 거점", () => ownsTerr("wa_kyushu"), 0.15], ["산둥 거점", () => ownsTerr("shandong"), 0.15], ["바다 무역 길 열기", () => has("trade"), 0.1]],
    eff: { gold: 15, cul: 8 }, inc: 5, fail: { gold: -10, def: -4 }, onWin: () => { S.flags.seaKing = true; },
    dir: { from: [126.6, 36.0], to: [129.0, 33.2], label: "바닷길", bend: 0.3 },
    note: "중국·백제·왜를 잇는 바닷길을 백제가 쥐는 꿈이에요.",
    winText: "중국 비단, 백제의 금동 공예, 왜의 은이 백제 배를 타고 오갔어요! 백제가 동아시아 바다의 중심이 되었어요.",
    failText: "해적과 폭풍 때문에 바닷길이 자꾸 끊겼어요.",
    slWin: "백제 배들이 바다를 오가니, 갈매기들이 백제 배만 따라다녔다.", slFail: "바닷길에 해적이 들끓어, 상인들이 배 대신 소달구지를 탔다." });

  // ---------- 신라 ----------
  IfPol({ id: "r_unify", scen: "R", name: "당과 손잡고 삼국 통일", sub: "삼국 통일 전쟁", kings: "태종 무열왕 · 문무왕", cost: 3, war: true, regions: ["sr_unify"],
    need: () => (ownsTerr("sl_han") ? null : "먼저 한강 유역을 차지해야 해요 (중국과 오갈 바닷길)"),
    base: 0.3, max: 0.7, bonus: [["동맹(당나라)", () => S.flags.ally || has("alliance"), 0.15], ["화랑도", () => has("hwarang"), 0.1], ["국방 60 이상", () => S.st.def >= 60, 0.1], ["가야를 차지함", () => ownsTerr("gaya"), 0.05]],
    eff: { kp: 10, gold: 10, def: 2, ppl: -4 }, inc: 3, fail: { def: -14, har: -6, ppl: -4 }, onWin: () => { S.flags.unified = true; },
    dir: { from: [129.21, 35.84], to: [126.2, 38.8], label: "통일 전쟁" },
    note: "실제로 신라는 당나라와 손잡고 백제(660)와 고구려(668)를 무너뜨렸어요.",
    winText: "백제와 고구려를 무너뜨리고 대동강 남쪽을 하나로 묶었어요(삼국 통일)! 하지만 당나라가 이 땅까지 넘보기 시작했어요.",
    failText: "백제와 고구려의 저항에 통일 전쟁이 멈췄어요.",
    slWin: "삼국이 하나가 되니, 김유신 장군이 말에서 내려 땅에 입을 맞추었다.", slFail: "통일 전쟁이 멈추니, 화랑들이 칼을 닦으며 다음을 기약하였다." });
  IfPol({ id: "r_tang", scen: "R", name: "당나라 군대까지 몰아내기", sub: "나당 전쟁 (매소성·기벌포)", kings: "문무왕", cost: 2, war: true,
    need: () => (S.flags.unified ? (S.flags.tangOut ? "이미 이루었어요" : null) : "먼저 삼국을 통일해야 해요"),
    base: 0.35, max: 0.8, bonus: [["국방 65 이상", () => S.st.def >= 65, 0.15], ["민심 55 이상", () => S.st.ppl >= 55, 0.1], ["화합 55 이상", () => S.st.har >= 55, 0.1], ["화랑도", () => has("hwarang"), 0.05]],
    eff: { kp: 10, def: 6, ppl: 6 }, fail: { kp: -12, def: -10, gold: -6 }, onWin: () => { S.flags.tangOut = true; },
    dir: { from: [127.0, 37.9], to: [125.5, 39.4], label: "당군 몰아내기" },
    note: "실제로 신라는 매소성(675)·기벌포(676) 싸움에서 당나라 군대를 몰아냈어요.",
    winText: "매소성과 기벌포에서 당나라 대군을 무찔렀어요! 한반도에서 당나라 군대가 물러갔어요.",
    failText: "당나라가 평양에 관청(안동 도호부)을 두고 신라를 간섭하기 시작했어요.",
    slWin: "매소성에서 당나라 말 3만 필을 빼앗으니, 신라 마구간이 모자라 들판에 풀어 놓았다.", slFail: "당나라 관리가 금성에 와서 신라 왕에게 이래라저래라 하였다." });
  IfPol({ id: "r_manchu", scen: "R", name: "고구려의 옛 땅 만주까지", sub: "나라 전체를 건 원정", cost: 3, war: true, ultra: true, regions: ["go_core", "liaodong"],
    need: () => (!S.flags.tangOut ? "먼저 당나라 군대를 몰아내야 해요" : S.st.def < 65 || S.st.gold < 55 ? "대비가 모자라요: 국방 65·재정 55 이상이어야 떠날 수 있어요" : null),
    base: 0.05, max: 0.3, bonus: [["국방 80 이상", () => S.st.def >= 80, 0.07], ["재정 70 이상", () => S.st.gold >= 70, 0.05], ["화합 60 이상", () => S.st.har >= 60, 0.05], ["민심 60 이상", () => S.st.ppl >= 60, 0.04], ["화랑도", () => has("hwarang"), 0.03]],
    eff: { kp: 12, gold: 15, def: -6, ppl: -8 }, inc: 4, fail: { def: -28, ppl: -12, gold: -18, kp: -8 }, loseLand: 1, onWin: () => { S.flags.manchu = true; },
    dir: { from: [126.0, 38.8], to: [126.2, 41.2], label: "만주로" },
    note: "초모험! 실제로 고구려의 옛 땅 만주에는 고구려 유민 대조영이 발해를 세웠어요(698). 신라가 이 땅까지 차지하려면 당나라·말갈과 모두 싸워야 해요.",
    winText: "신라 군대가 압록강을 넘어 고구려의 옛 땅까지 되찾았어요! 한반도와 만주를 아우르는 나라가 되었어요. (상상의 이야기예요.)",
    failText: "추운 만주 벌판에서 말갈과 당나라 군대에 둘러싸여 크게 졌어요.",
    slWin: "신라 깃발이 압록강을 넘으니, 강 건너 고구려 유민들이 옛 노래를 부르며 맞이하였다.", slFail: "만주 원정군이 눈보라에 갇히니, 군사들이 서로 등을 맞대고 '금성 봄바람'을 그리워하였다." });

  // ---------- 고려 ----------
  IfPol({ id: "t_hub", scen: "T", cat: "eco", name: "벽란도를 동아시아 무역 허브로", sub: "국제 무역항 벽란도", kings: "고려 문종 무렵", cost: 2, tags: [0.1, -0.2, 0.3],
    need: () => (S.flags.hub ? "이미 이루었어요" : null),
    base: 0.45, max: 0.9, bonus: [["바다 무역 길 열기", () => has("trade"), 0.15], ["문화 50 이상", () => S.st.cul >= 50, 0.1], ["나라 돈(화폐)", () => has("coin"), 0.1], ["후삼국 통일", () => ownsTerr("hb") && ownsTerr("sl_late"), 0.1]],
    eff: { gold: 10, cul: 8 }, inc: 4, fail: { gold: -8, har: -2 }, onWin: () => { S.flags.hub = true; },
    dir: { from: [126.55, 37.97], to: [121.0, 37.0], label: "송·아라비아로", bend: 0.15 },
    note: "실제로 개경 가까운 벽란도에는 송나라·일본·아라비아 상인까지 드나들었어요. 'Korea(코리아)'라는 이름이 이때 서양에 알려졌어요.",
    winText: "벽란도에 송나라 비단, 아라비아의 향료와 유리, 일본의 은이 모여들었어요! 고려가 동아시아 무역의 중심이 되었어요.",
    failText: "해적이 들끓어 외국 상인들이 발길을 돌렸어요.",
    slWin: "벽란도에 아라비아 상인이 오니, 개경 아이들이 처음 보는 낙타 그림을 따라 그렸다.", slFail: "벽란도에 배가 뜸하니, 항구 국밥집 주인이 하품만 하였다." });
  IfPol({ id: "t_seohee", scen: "T", cat: "men", name: "담판으로 강동 6주 얻기", sub: "서희의 외교 담판 (993)", kings: "고려 성종 · 서희", cost: 2, regions: ["gr_6ju"], tags: [0.2, -0.4, 0],
    need: () => (ownsTerr("gr_north") ? null : "먼저 청천강까지 북쪽 땅을 넓혀야 해요"),
    base: 0.35, max: 0.85, bonus: [["문화 50 이상", () => S.st.cul >= 50, 0.15], ["왕권 50 이상", () => S.st.kp >= 50, 0.1], ["발해 유민을 받아들임", () => S.flags.balhae, 0.1], ["국방 55 이상", () => S.st.def >= 55, 0.1]],
    eff: { kp: 6, def: 6, cul: 4 }, inc: 1, fail: { kp: -6, def: -6, gold: -6 },
    dir: { from: [126.0, 39.9], to: [125.2, 40.3], label: "담판" },
    note: "실제로 서희는 거란 장수 소손녕과의 말싸움(담판)만으로 압록강 가의 강동 6주를 얻었어요.",
    winText: "'고려는 고구려를 이은 나라다!' 말 한마디로 강동 6주를 얻어 압록강까지 땅을 넓혔어요.",
    failText: "담판이 깨져 거란군이 쳐들어왔어요.",
    slWin: "서희가 담판을 마치니, 거란 장수가 고개를 끄덕이며 '말로는 못 당하겠다' 하였다.", slFail: "담판 자리에서 서로 목소리를 높이다, 찻잔만 세 개 깨졌다." });
  IfPol({ id: "t_liao", scen: "T", name: "고구려의 옛 땅 요동 되찾기", sub: "북진의 끝", cost: 3, war: true, ultra: true, regions: ["liaodong"],
    need: () => (!ownsTerr("gr_6ju") ? "먼저 강동 6주를 얻어야 해요" : S.st.def < 62 || S.st.gold < 50 ? "대비가 모자라요: 국방 62·재정 50 이상이어야 떠날 수 있어요" : null),
    base: 0.08, max: 0.38, bonus: [["국방 75 이상", () => S.st.def >= 75, 0.08], ["재정 65 이상", () => S.st.gold >= 65, 0.05], ["발해 유민을 받아들임", () => S.flags.balhae, 0.06], ["벽란도 무역 허브", () => S.flags.hub, 0.05], ["화합 60 이상", () => S.st.har >= 60, 0.04]],
    eff: { kp: 12, gold: 14, ppl: -6, def: -4 }, inc: 3, fail: { def: -26, ppl: -12, gold: -14, kp: -8 }, loseLand: 1, onWin: () => { S.flags.liaoBack = true; },
    dir: { from: [124.6, 40.2], to: [123.17, 41.27], label: "요동으로" },
    note: "초모험! 실제로 고려 말 최영 장군은 요동 정벌을 준비했지만, 이성계가 위화도에서 군대를 돌려(1388) 이루어지지 않았어요. 거란·여진과 모두 맞서야 해요.",
    winText: "압록강을 건너 요동성까지 되찾았어요! 고구려를 이었다는 고려의 꿈이 이루어졌어요. (상상의 이야기예요.)",
    failText: "요동 벌판에서 거란의 철기병에게 크게 졌어요.",
    slWin: "고려군이 요동성에 들어가니, 성벽의 옛 고구려 글씨를 보고 장수들이 눈물을 흘렸다.", slFail: "요동 원정군이 무너지니, 압록강 나루터에 빈 배만 묶여 있었다." });

  // ---------- 조선 세종 ----------
  IfPol({ id: "u_tsu2", scen: "U", cat: "men", name: "대마도를 조선 땅으로", sub: "대마도 편입", cost: 2, regions: ["tsushima"],
    need: () => (S.flags.tsushima ? null : "먼저 대마도를 정벌해야 해요"),
    base: 0.3, max: 0.7, bonus: [["국방 60 이상", () => S.st.def >= 60, 0.12], ["바다 무역 허락(왜관)", () => S.inc >= 3, 0.08], ["민심 55 이상", () => S.st.ppl >= 55, 0.08], ["문화 55 이상", () => S.st.cul >= 55, 0.06]],
    eff: { def: 6, gold: 6, kp: 4 }, inc: 1, fail: { def: -6, gold: -6, har: -2 },
    dir: { from: [129.04, 35.1], to: [129.3, 34.4], label: "대마도" },
    note: "실제로 대마도주는 조선의 벼슬을 받고 조선과 무역했지만, 땅은 일본에 남았어요.",
    winText: "대마도 사람들이 조선 백성이 되기로 했어요! 왜구가 크게 줄고 남쪽 바다가 평화로워졌어요. (상상의 이야기예요.)",
    failText: "대마도 사람들이 일본 본토의 도움을 받아 맞섰어요.",
    slWin: "대마도가 조선 땅이 되니, 대마도 고양이들이 부산포 생선 장수를 따라다녔다.", slFail: "대마도에 관리를 보냈으나, 관리가 배멀미로 사흘을 누워 있었다." });
  IfPol({ id: "u_manchu", scen: "U", name: "만주로 북진: 여진 땅을 넘어", sub: "나라 전체를 건 원정", cost: 3, war: true, ultra: true, regions: ["manchu"],
    need: () => (!(ownsTerr("j4gun") && ownsTerr("j6jin")) ? "먼저 4군과 6진을 개척해야 해요" : S.st.def < 65 || S.st.gold < 55 ? "대비가 모자라요: 국방 65·재정 55 이상이어야 떠날 수 있어요" : null),
    base: 0.06, max: 0.34, bonus: [["국방 80 이상", () => S.st.def >= 80, 0.07], ["재정 70 이상", () => S.st.gold >= 70, 0.05], ["과학 기구(신기전·화포 같은 무기)", () => has("science"), 0.05], ["왕권 70 이상", () => S.st.kp >= 70, 0.04], ["민심 60 이상", () => S.st.ppl >= 60, 0.03]],
    eff: { kp: 12, gold: 12, def: -6, ppl: -8 }, inc: 3, fail: { def: -26, ppl: -12, gold: -16, kp: -8 }, loseLand: 1, onWin: () => { S.flags.manchu = true; },
    dir: { from: [128.5, 42.2], to: [127.5, 44.0], label: "만주로" },
    note: "초모험! 실제 조선은 압록강·두만강을 국경으로 삼고 만주로 가지 않았어요. 여진의 여러 부족과 명나라까지 맞서야 해요.",
    winText: "신기전과 화포를 앞세운 조선군이 만주 벌판으로 나아갔어요! 고구려의 옛 땅이 다시 우리 땅이 되었어요. (상상의 이야기예요.)",
    failText: "만주의 추위와 여진 기병의 반격에 크게 졌어요.",
    slWin: "신기전 백 발이 하늘을 가르니, 여진 기병의 말들이 불꽃놀이인 줄 알고 멈춰 섰다.", slFail: "만주 원정군이 눈 속에 갇히니, 김종서 장군이 '때가 아니었다' 하며 수염의 고드름을 떼었다." });

  // ---------- 결말 ----------
  { const P0 = FATE5.P, Q0 = FATE5.Q, R0 = FATE5.R, T0 = FATE5.T, U0 = FATE5.U;
    FATE5.P = (s, avg, min) => { if (ownsTerr("zhongyuan")) return { t: "중원을 차지한 고구려 대제국", l: "만주와 한반도, 중국 한가운데까지 다스리는 대제국이 되었어요. 실제 역사에서는 없던 일이에요. 실제 고구려는 수·당의 백만 대군을 막아 낸 나라로 기억돼요.", h: "帝", big: true }; if (ownsTerr("go_unify")) return { t: "삼국을 하나로 묶은 고구려", l: "만주에서 남해 바닷가까지 하나의 나라가 되었어요. 실제로 삼국을 통일한 나라는 신라였어요.", h: "統", big: true }; return P0(s, avg, min); };
    FATE5.Q = (s, avg, min) => { if (S.flags.waKing) return { t: "바다 건너 왜까지 다스린 백제 해상 제국", l: "한강에서 왜의 바다까지 백제의 깃발이 휘날렸어요. 실제 역사에서는 없던 일이에요. 실제 백제는 왜에 문화를 전해 준 스승 같은 나라로 기억돼요.", h: "帝", big: true }; if (S.flags.seaKing || (ownsTerr("wa_kyushu") && ownsTerr("shandong"))) return { t: "동아시아 바다를 다스린 백제", l: "중국과 왜를 잇는 바닷길을 백제가 쥐었어요. 백제의 배와 문화가 바다 건너 곳곳으로 퍼졌어요.", h: "海", big: true }; return Q0(s, avg, min); };
    FATE5.R = (s, avg, min) => { if (S.flags.manchu) return { t: "만주까지 아우른 통일 신라", l: "삼국을 통일하고 고구려의 옛 땅 만주까지 되찾았어요. 실제로 그 땅에는 발해가 세워졌어요.", h: "帝", big: true }; if (S.flags.unified && S.flags.tangOut) return { t: "삼국을 통일한 신라", l: "백제와 고구려를 아우르고 당나라 군대까지 몰아냈어요(676). 실제 역사 그대로, 신라가 삼국 통일을 이루었어요.", h: "統", big: true }; if (S.flags.unified) return { t: "당나라의 간섭을 받는 통일 신라", l: "삼국은 하나가 되었지만 당나라가 한반도를 넘보고 있어요.", h: "統" }; return R0(s, avg, min); };
    FATE5.T = (s, avg, min) => { if (S.flags.liaoBack && ownsTerr("hb")) return { t: "고구려의 옛 땅을 되찾은 고려", l: "후삼국을 통일하고 요동까지 되찾아 '고구려를 잇는다'는 꿈을 이루었어요. 실제 역사에서는 이루지 못한 꿈이에요.", h: "麗", big: true }; if (S.flags.hub && ownsTerr("hb") && ownsTerr("sl_late")) return { t: "동아시아 무역의 중심, 통일 고려", l: "후삼국을 통일하고 벽란도를 국제 무역항으로 키웠어요. 송·일본·아라비아 상인들이 고려를 찾았어요.", h: "商", big: true }; return T0(s, avg, min); };
    FATE5.U = (s, avg, min) => { if (S.flags.manchu) return { t: "만주까지 뻗은 조선", l: "압록강·두만강을 넘어 만주까지 나아갔어요. 실제 조선은 두 강을 국경으로 삼았어요.", h: "帝", big: true }; return U0(s, avg, min); };
  }
