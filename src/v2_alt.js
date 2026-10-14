  // ================= 나라마다 고유 정책 (조명받지 못한 실제 이야기 · 역사적 상상) =================
  // 핵심 정책보다 약하게 만들었어요. 대신 다른 정책과 함께 쓰면 '다른 역사' 결말로 이어질 수 있어요.
  const U5 = (o) => PP(Object.assign({ cat: "men", tags: [0, 0, 0], uniq: true }, o, { scen: [o.scen], run() { if (o.flag) S.flags[o.flag] = true; if (o.inc) addInc(o.inc); return R(o.eff, o.text, this.tags, { sl: o.sl }); } }));
  // 고구려
  U5({ id: "p_ondal", scen: "P", cat: "mil", name: "평민 출신 장수 쓰기", sub: "온달 이야기", kings: "평원왕 · 영양왕 무렵", cost: 1, eff: { def: 3, ppl: 2, har: -1 }, flag: "talent", tags: [0, 0.5, 0.5],
    note: "가난한 평민이었던 온달은 사냥 대회에서 이름을 떨쳐 장수가 되었어요. 신분이 낮아도 재주 있는 사람을 쓰는 왕이 돼요.",
    text: "출신을 묻지 않고 활 잘 쏘고 용감한 젊은이를 장수로 삼았어요. 귀족들은 수군거렸지만 백성들은 신이 났어요.", sl: "평민 장수가 첫 싸움에서 이기니, 귀족 장수들이 투구 끈을 고쳐 매며 헛기침을 하였다." });
  U5({ id: "p_navy", scen: "P", cat: "mil", name: "고구려 수군 키우기", sub: "광개토대왕의 수군 (396)", kings: "광개토대왕", cost: 2, eff: { def: 4, gold: 2 }, flag: "goNavy", tags: [0.2, 0.6, 0],
    note: "잘 알려지지 않았지만, 광개토대왕은 배를 타고 내려가 백제의 성 58곳을 빼앗았어요. 말 타는 나라 고구려가 바다로도 나아가요.",
    text: "압록강 하구에 배를 모아 수군을 꾸렸어요. 바다로도 군사와 물건을 옮길 수 있게 되었어요.", sl: "고구려 기병이 처음 배에 오르니, 말들이 멀미를 하여 갑판에 드러누웠다." });
  U5({ id: "p_damjing", scen: "P", cat: "cul", name: "담징을 바다 건너 왜에 보내기", sub: "담징 (610)", kings: "영양왕", cost: 1, eff: { cul: 4, kp: 1, gold: -2 }, flag: "damjing", tags: [-0.2, -0.7, 0],
    note: "고구려 승려 담징은 왜에 종이·먹 만드는 법과 그림을 전했어요(호류사 벽화 이야기). 칼이 아닌 붓으로 이름을 떨쳐요.",
    text: "학자이자 화가인 승려를 왜에 보내 종이와 먹 만드는 법을 가르쳤어요. 고구려의 이름이 바다 건너까지 높아졌어요.", sl: "담징이 왜에서 먹을 갈아 그림을 그리니, 왜 사람들이 먹 냄새를 맡으려 줄을 섰다." });
  // 백제
  U5({ id: "q_chiljido", scen: "Q", cat: "men", name: "칠지도를 만들어 왜에 보내기", sub: "칠지도 (369 무렵)", kings: "근초고왕", cost: 1, eff: { cul: 2, def: 2, gold: -1 }, flag: "waFriend", tags: [-0.3, 0.2, 0],
    note: "가지가 일곱 개 달린 신기한 칼을 만들어 왜왕에게 보냈어요. 지금도 일본 신사에 남아 있어요. 왜와 손을 잡게 돼요.",
    text: "가지가 일곱 개인 쇠칼에 금으로 글자를 새겨 왜왕에게 보냈어요. 왜가 백제와 가까워졌어요.", sl: "칠지도를 받은 왜왕이 칼 가지를 세다가 '여덟'이라 하니, 백제 사신이 웃음을 참았다." });
  U5({ id: "q_gayairon", scen: "Q", cat: "eco", name: "가야와 철 동맹 맺기", sub: "백제·가야·왜를 잇는 길", kings: "근초고왕", cost: 1, eff: { gold: 3, def: 2, har: -1 }, flag: "gayaIron", tags: [-0.2, 0.3, 0.2],
    note: "가야의 질 좋은 철을 받고 백제의 문물을 건네요. 백제-가야-왜를 잇는 길은 실제로 있었지만 잘 알려지지 않았어요.",
    text: "가야의 나라들과 약속을 맺어 쇠를 받고 비단과 책을 건넸어요. 백제 대장간마다 망치 소리가 커졌어요.", sl: "가야 쇠로 만든 낫이 어찌나 잘 드는지, 백제 농부가 벼를 베다 자기 그림자까지 벨 뻔하였다." });
  // 신라
  U5({ id: "r_ureuk", scen: "R", cat: "cul", name: "우륵과 가야금 받아들이기", sub: "우륵 (551)", kings: "진흥왕", cost: 1, eff: { cul: 4, har: 1, gold: -1 }, flag: "ureuk", tags: [-0.4, -0.6, 0],
    note: "나라가 기울던 가야에서 온 음악가 우륵을 받아들여 가야금을 배웠어요. 정복한 나라의 문화를 품어요.",
    text: "가야의 음악가 우륵에게 신라 젊은이들이 가야금을 배웠어요. '망한 나라의 음악'이라는 반대에도 왕은 '음악에는 죄가 없다' 했어요.", sl: "우륵이 가야금을 타니, 반대하던 신하가 발장단을 맞추다 들켰다." });
  U5({ id: "r_6du", scen: "R", cat: "men", name: "6두품 인재를 높은 자리에 쓰기", sub: "골품제를 넘어서기 (역사적 상상)", kings: "실제로는 이루지 못한 길", cost: 2, eff: { cul: 4, kp: 2, ppl: 2, har: -6 }, flag: "talent", tags: [0.2, -0.4, 0.6],
    note: "신라는 골품(신분)에 따라 오를 수 있는 벼슬이 정해져 있었어요. 최치원 같은 6두품 인재는 뜻을 펴지 못했어요. 진골 귀족이 크게 반발해요.",
    text: "6두품 학자들을 높은 벼슬에 올렸어요. 진골 귀족들은 크게 화를 냈지만, 실력 있는 사람들이 나랏일을 맡게 되었어요.", sl: "6두품 학자가 높은 벼슬 옷을 입으니, 옷자락이 길어 문턱에 걸려 넘어질 뻔하였다." });
  // 고려
  U5({ id: "t_daegwang", scen: "T", cat: "men", name: "발해 왕자 대광현 받아들이기", sub: "발해 유민 (934)", kings: "태조 왕건", cost: 1, eff: { def: 2, cul: 2, har: 1, gold: -3 }, flag: "balhae", tags: [-0.4, 0.2, 0.2],
    note: "거란에 무너진 발해의 왕자와 수만 명의 유민을 받아들여 '같은 고구려의 후손'으로 대했어요. 북진과 요동 되찾기에 힘이 돼요.",
    text: "발해의 왕자 대광현에게 왕씨 성을 내리고, 발해 사람들에게 땅과 집을 나눠 주었어요. 고구려를 잇는 두 나라가 하나가 되었어요.", sl: "발해 유민들이 개경에 오니, 그들이 부른 노래가 고구려 노래와 닮아 모두 눈시울을 붉혔다." });
  U5({ id: "t_seogyeong", scen: "T", cat: "mil", name: "서경(평양)을 북진 기지로 키우기", sub: "서경 개발", kings: "태조 왕건", cost: 2, eff: { def: 5, kp: 3, gold: -4 }, flag: "seogyeong", tags: [0.4, 0.6, 0],
    note: "폐허였던 평양을 '서경'으로 높이고 백성을 옮겨 살게 했어요. 북쪽으로 나아갈 발판이에요.",
    text: "평양에 성을 쌓고 백성을 옮겨 살게 해 서경으로 삼았어요. 북쪽으로 나아갈 발판이 생겼어요.", sl: "서경에 백성이 모이니, 대동강 뱃사공들이 하루에 열 번도 넘게 강을 건넜다." });
  U5({ id: "t_choe", scen: "T", cat: "men", name: "최승로의 시무 28조 듣기", sub: "시무 28조 (982)", kings: "성종 · 최승로", cost: 1, eff: { har: 3, cul: 2, kp: -1 }, flag: "choe", tags: [-0.5, -0.4, 0.2],
    note: "신하가 '나라를 위해 고쳐야 할 28가지'를 글로 올렸어요. 바른말을 듣는 왕이 돼요.",
    text: "신하가 올린 28가지 충고를 하나하나 읽고 받아들였어요. 신하들이 왕에게 바른말을 하게 되었어요.", sl: "시무 28조를 읽던 왕이 열여덟 번째에서 '이건 내 이야기로군' 하며 웃었다." });
  // 조선 세종
  U5({ id: "u_jaseok", scen: "U", cat: "cul", name: "노비 출신 장영실 발탁하기", sub: "자격루 (1434)", kings: "세종", cost: 2, eff: { cul: 5, kp: 1, gold: -3 }, flag: "talent", tags: [0, -0.6, 0.5],
    note: "관청 노비였던 장영실에게 벼슬을 주고 스스로 시각을 알리는 물시계(자격루)를 만들게 했어요. 과학 기구의 효과가 커져요.",
    text: "신분은 낮았지만 손재주가 뛰어난 장영실에게 벼슬을 주었어요. 종과 북이 저절로 울리는 물시계가 완성되었어요.", sl: "자격루의 인형이 처음 종을 치니, 구경하던 대신이 깜짝 놀라 따라 '땡' 하였다." });
  U5({ id: "u_hyangyak", scen: "U", cat: "ppl", name: "우리 땅 약초로 병 고치기", sub: "『향약집성방』 (1433)", kings: "세종", cost: 1, eff: { ppl: 3, cul: 2, gold: -2 }, flag: "hyangyak", tags: [-0.2, -0.5, 0.7],
    note: "비싼 중국 약재 대신 우리 산과 들의 약초로 병을 고치는 법을 모았어요. 잘 알려지지 않은 세종의 업적이에요.",
    text: "우리 땅에서 나는 약초 700여 가지와 처방을 책으로 모아 고을마다 나눠 주었어요.", sl: "약초 책이 나오니, 동네 할머니들이 뒷산 풀마다 이름을 붙이며 다녔다." });
  U5({ id: "u_nongsa", scen: "U", cat: "eco", name: "우리 땅에 맞는 농사법 책", sub: "『농사직설』 (1429)", kings: "세종 · 정초", cost: 2, eff: { ppl: 2, gold: 2 }, inc: 1, flag: "farmbook", tags: [0, -0.3, 0.6],
    note: "중국 농사책이 아니라 조선의 늙은 농부들에게 직접 물어 만든 농사책이에요. 매 시기 수입이 조금 늘어요.",
    text: "고을마다 늙은 농부들에게 농사 비법을 물어 책으로 엮었어요. 우리 땅과 날씨에 맞는 농사법이 퍼졌어요.", sl: "관리가 늙은 농부에게 비법을 물으니, 농부가 '비법은 부지런함'이라 하여 관리가 그대로 받아 적었다." });
  // 조선 영조
  U5({ id: "v_sinmungo", scen: "V", cat: "ppl", name: "신문고 다시 달기", sub: "신문고 (1771)", kings: "영조", cost: 1, eff: { ppl: 4, har: 1, kp: -2 }, flag: "sinmungo", tags: [-0.4, 0, 0.9],
    note: "억울한 백성이 북을 쳐서 왕에게 직접 알리는 신문고를 다시 달았어요. 왕이 궁궐 밖으로 나가 백성을 만나기도 했어요.",
    text: "궁궐 앞에 신문고를 다시 달았어요. 억울한 일을 당한 백성이 북을 치면 왕이 직접 사연을 들었어요.", sl: "신문고가 다시 걸리니, 첫날 북을 친 사람이 '이웃집 닭이 새벽마다 운다'고 하소연하였다." });
  U5({ id: "v_bukhak", scen: "V", cat: "eco", name: "청나라 수레와 벽돌 배우기", sub: "북학 (역사적 상상: 실제로는 정조 무렵)", kings: "박지원 · 박제가의 생각", cost: 2, eff: { gold: 3, cul: 3, har: -3 }, inc: 1, flag: "bukhak", tags: [0.1, -0.3, 0.3],
    note: "'오랑캐라도 배울 것은 배우자!' 실학자들의 주장을 일찍 받아들여 수레·벽돌·배를 들여와요. 명을 섬기던 신하들이 반발해요. 매 시기 수입이 조금 늘어요.",
    text: "청나라의 수레와 벽돌 굽는 법을 들여왔어요. 길이 넓어지고 물건이 빨리 오갔지만, '오랑캐를 따라 한다'는 반발도 컸어요.", sl: "수레가 한양 거리에 들어오니, 지게꾼들이 수레 뒤를 밀어 주며 '세상 편하다' 하였다." });
  // 임진왜란
  U5({ id: "e_hun", scen: "E", cat: "mil", name: "훈련도감 만들기", sub: "훈련도감 (1593)", kings: "선조 · 류성룡", cost: 2, eff: { def: 12, kp: 3, gold: -6 }, flag: "hun", tags: [0.4, 0.8, 0],
    note: "조총과 창, 활을 나누어 익히는 새 군대(삼수병)를 만들어 늘 훈련시켜요.",
    text: "포수·사수·살수로 나눈 새 군대를 만들고 월급을 주며 날마다 훈련시켰어요. 조총을 쏘는 조선 군사가 생겼어요.", sl: "훈련도감 포수들이 처음 조총을 쏘니, 연기에 눈이 매워 모두 눈물을 흘리며 웃었다." });
  U5({ id: "e_navy", scen: "E", cat: "mil", name: "판옥선과 거북선 더 만들기", sub: "조선 수군 키우기", kings: "선조 · 이순신", cost: 2, eff: { def: 12, ppl: 2, gold: -6 }, flag: "admiral", tags: [0.2, 0.8, 0.2],
    note: "바다에서 왜군의 보급로를 끊어요. 수군 장수를 믿은 것과 같아요.",
    text: "바닷가 고을마다 판옥선을 만들고 거북선을 더 띄웠어요. 왜군의 배가 서해로 올라오지 못하게 되었어요.", sl: "거북선이 새로 진수되니, 갯벌의 게들이 거북선을 따라 옆으로 줄지어 걸었다." });
  U5({ id: "e_gwak", scen: "E", cat: "mil", name: "의병장에게 벼슬 주기", sub: "곽재우 · 정문부 · 김천일", kings: "선조", cost: 1, eff: { def: 3, ppl: 2, kp: -1 }, flag: "uibyeong", tags: [-0.2, 0.5, 0.6],
    note: "관군보다 먼저 일어선 의병장들에게 벼슬과 무기를 주어요. 북쪽 함경도의 정문부처럼 잘 알려지지 않은 의병장도 많아요.",
    text: "스스로 일어선 의병장들에게 벼슬을 내리고 관군과 함께 싸우게 했어요. 고을마다 의병이 더 늘었어요.", sl: "붉은 옷을 입은 의병장이 나타나니, 왜군이 '하늘에서 내려온 장군'이라며 길을 돌아갔다." });
  // 병자호란
  U5({ id: "f_ganghwa", scen: "F", cat: "mil", name: "강화도에 수군과 피란처 마련", sub: "강화도 방어", kings: "인조", cost: 2, eff: { def: 4, kp: 1, gold: -4 }, flag: "ganghwa", tags: [0.2, 0.6, 0],
    note: "말 타는 청나라 군대는 바다를 건너기 어려워요. 강화도에 배와 군량을 미리 마련해 두어요.",
    text: "강화도에 성을 고치고 배와 군량을 쌓아 두었어요. 위급할 때 왕실과 백성이 피할 곳이 생겼어요.", sl: "강화도에 군량을 쌓으니, 섬 쥐들이 몰려와 곳간지기가 고양이 열 마리를 데려왔다." });
  PP({ id: "f_spy", scen: ["F"], cat: "men", name: "청나라에 밀정 보내기", sub: "역사적 상상", kings: "실제로는 하지 못한 일", cost: 1, gamble: true, risky: true, uniq: true, eff: { def: 4, kp: 2 }, fail: { har: -3, gold: -3 }, tags: [0.3, 0.3, 0],
    chance() { return S.st.cul >= 50 ? 0.55 : 0.4; },
    note: "모험! 청나라 군대가 언제, 어디로 올지 미리 알아내요. 문화 50 이상이면 말을 잘하는 밀정을 구하기 쉬워요.",
    run() { if (Math.random() < this.chance()) { S.flags.spyOk = true; return R({ def: 4, kp: 2 }, "밀정이 청나라 군대가 압록강이 얼면 쳐들어온다는 계획을 알아 왔어요! 미리 대비할 수 있게 되었어요.", this.tags, { sl: "밀정이 청나라 말로 장사꾼 흉내를 내니, 청나라 장수가 그에게 인삼 값을 깎아 달라 하였다." }); }
      return R({ har: -3, gold: -3 }, "밀정이 붙잡혀 청나라가 더 화를 냈어요.", this.tags, { ok: false, sl: "밀정이 청나라 말을 더듬다 붙잡히니, 청나라 장수가 '조선말이 더 낫겠다' 하였다." }); } });
  U5({ id: "f_sohyeon", scen: "F", cat: "cul", name: "세자에게 서양 학문 배우게 하기", sub: "소현 세자 (역사적 상상)", kings: "실제로는 이루지 못한 길", cost: 1, eff: { cul: 4, har: -1 }, flag: "westLearn", tags: [0, -0.6, 0.2],
    note: "소현 세자는 청나라에서 서양 선교사 아담 샬과 사귀며 천문학과 과학을 배웠어요. 실제로는 돌아온 지 두 달 만에 세상을 떠났어요.",
    text: "세자가 서양의 천문학·수학 책과 지구본을 들여와 신하들과 함께 공부했어요. 새로운 세상이 조금씩 보이기 시작했어요.", sl: "세자가 지구본을 돌리니, 늙은 대신이 '땅이 둥글면 아래 사람들은 왜 안 떨어지오' 하며 지구본 아래를 들여다보았다." });
  // 경신 대기근
  U5({ id: "k_guhwang", scen: "K", cat: "ppl", name: "흉년에 먹을 것 알려 주는 책 나누기", sub: "『신간구황촬요』 (1660)", kings: "현종 · 서원리", cost: 1, eff: { ppl: 3, cul: 1 }, flag: "farmbook", tags: [-0.1, -0.4, 0.8],
    note: "솔잎·도토리·칡뿌리처럼 흉년에 먹을 수 있는 것과 먹는 법을 한글로 적은 책을 고을마다 나눠요.",
    text: "흉년에 먹을 수 있는 풀과 열매, 먹는 법을 한글로 적은 책을 고을마다 나눠 주었어요. 글을 읽을 줄 아는 아이들이 어른들에게 읽어 주었어요.", sl: "구황 책을 읽은 아이가 '솔잎은 떫다'는 대목에서 어른보다 먼저 얼굴을 찡그렸다." });
  U5({ id: "k_hwalin", scen: "K", cat: "ppl", name: "활인서 넓혀 아픈 사람 돌보기", sub: "활인서", kings: "현종", cost: 1, eff: { ppl: 3, har: 1, gold: -3 }, flag: "hwalin", tags: [-0.3, -0.2, 0.9],
    note: "도성 밖에서 가난한 환자와 굶주린 사람을 돌보던 관청(활인서)을 넓혀요. 돌림병 피해가 줄어요.",
    text: "활인서에 의원과 약을 늘려 굶주림 끝에 병든 사람들을 돌보았어요.", sl: "활인서 의원이 하루에 죽을 백 그릇 끓이니, 솥바닥이 닳아 새 솥을 걸었다." });

  // ================= 위업이 없던 시대의 위업 =================
  const chose = (txt) => (S.log || []).some((L) => L.ev && L.ev.choice && L.ev.choice.includes(txt));
  Object.assign(FEATS, {
    E: [{ id: "e_navy", h: "龜", n: "바다를 지킨 조선 수군", d: "이순신이 이끈 조선 수군은 한산도 대첩 등에서 왜군의 보급로를 끊었어요(1592).", ok: () => !!S.flags.admiral, pols: ["e_navy"], hint: "수군 장수를 믿거나 판옥선·거북선 만들기" },
      { id: "e_hun", h: "訓", n: "훈련도감 설치", d: "류성룡의 건의로 1593년 조총·활·창을 나누어 익히는 새 군대를 만들었어요.", ok: () => has("e_hun"), pols: ["e_hun"] },
      { id: "e_win", h: "勝", n: "7년 전쟁을 이겨 냄", d: "관군·의병·수군·명나라 원군이 힘을 합쳐 1598년 왜군을 몰아냈어요.", ok: () => !!S.flags.warWon && S.turn >= 7 && S.st.def >= 65 && S.st.ppl >= 50, pols: [], hint: "큰 싸움에서 이기고, 7시기 이후 국방 65·민심 50 이상" }],
    F: [{ id: "f_fort", h: "城", n: "남한산성 고쳐 쌓기", d: "인조는 1624~1626년 남한산성을 크게 고쳐 쌓았어요. 병자호란 때 47일을 버틴 곳이에요.", ok: () => has("fortress"), pols: ["fortress"] },
      { id: "f_daedong", h: "稅", n: "대동법 넓히기", d: "인조 때 강원도, 효종 때 충청·전라도로 대동법이 넓어졌어요(김육).", ok: () => has("daedong"), pols: ["daedong"] },
      { id: "f_keep", h: "守", n: "삼전도의 굴욕 없이 나라 지키기", d: "실제로는 1637년 인조가 삼전도에서 청 황제에게 항복했어요. 이를 막아 내면 역사를 바꾼 거예요.", ok: () => !!S.flags.bigWin || (S.turn >= 8 && !S.flags.warLost && !S.flags.submit), pols: [], hint: "청을 물리치거나, 8시기까지 지지 않기" }],
    K: [{ id: "k_jin", h: "賑", n: "진휼청으로 백성 살리기", d: "현종은 진휼청을 세워 굶는 백성에게 죽과 곡식을 나눴어요.", ok: () => has("kjinhyul"), pols: ["kjinhyul"] },
      { id: "k_dd", h: "稅", n: "대동법 넓히기", d: "현종 때 전라도까지 대동법이 넓어져 백성의 세금 짐이 줄었어요(1662).", ok: () => has("daedong"), pols: ["daedong"] },
      { id: "k_survive", h: "興", n: "대기근을 이겨 낸 나라", d: "1670~1671년 100만 명 가까이 목숨을 잃은 대기근이었어요. 백성의 마음을 지키며 견뎌 내면 위업이에요.", ok: () => S.turn >= 8 && S.st.ppl >= 60 && S.st.har >= 45, pols: [], hint: "8시기 이후 민심 60·화합 45 이상" }],
    J: [{ id: "j_gwangmu", h: "光", n: "광무개혁", d: "대한 제국은 땅을 재 땅문서를 주고(광무 양전), 군대와 철도·전기를 새로 갖추었어요.", ok: () => has("survey") && (has("jarmy") || has("jrail")), pols: ["survey", "jarmy", "jrail"], hint: "광무 양전 + 신식 군대나 철도" },
      { id: "j_people", h: "民", n: "국민이 나선 애국 운동", d: "국채 보상 운동(1907)과 신문·학교를 세운 애국 계몽 운동으로 국민이 나라를 지키려 나섰어요.", ok: () => has("jdebt") && (has("jnews") || has("jschool")), pols: ["jdebt", "jnews", "jschool"], hint: "나라 빚 갚기 + 신문이나 민족 학교" },
      { id: "j_free", h: "復", n: "나라를 지키거나 되찾을 힘", d: "나라를 끝까지 지켜 내거나, 빼앗겼다면 임시 정부와 한국광복군으로 독립을 준비했어요(1919·1940).", ok: () => !!S.flags.kept || (has("jgov") && has("jcorps")), pols: ["jgov", "jcorps"], hint: "나라를 지키거나, 임시 정부 + 광복군" }],
    G: [{ id: "g_merit", h: "千", n: "실력으로 뽑은 천호 장수", d: "칭기즈 칸은 출신이 아니라 공으로 천 명·만 명의 대장을 뽑았어요(천호제).", ok: () => !!S.flags.merit, pols: [], hint: "쿠릴타이에서 '공을 세우면 대장으로'" },
      { id: "g_yam", h: "驛", n: "역참(잠) 세우기", d: "말을 갈아타는 역참을 이어 동쪽과 서쪽을 잇는 길을 열었어요.", ok: () => !!S.flags.yam, pols: [], hint: "끊어진 비단길에서 역참 세우기" },
      { id: "g_law", h: "法", n: "예케 자사크 (큰 법)", d: "칭기즈 칸은 모든 부족이 따르는 법을 정하고, 상인과 사신을 해치는 일을 엄하게 다스렸어요.", ok: () => has("law") || chose("상인을 해치는 자는"), pols: ["law"], hint: "법 세우기, 또는 상인을 지키는 법" }],
    H: [{ id: "h_tax", h: "稅", n: "귀족과 성직자에게도 세금", d: "프랑스 혁명은 세금을 내지 않던 귀족·성직자 때문에 시작되었어요. 왕이 먼저 고쳤다면 역사가 달라졌을지 몰라요.", ok: () => chose("귀족과 성직자에게도 세금"), pols: [], hint: "텅 빈 왕실 금고에서" },
      { id: "h_vote", h: "票", n: "사람 수대로 표 세기", d: "삼부회에서 신분이 아니라 사람 수대로 표를 세면 평민의 목소리가 커져요.", ok: () => chose("사람 수대로"), pols: [], hint: "삼부회에서" },
      { id: "h_rights", h: "權", n: "인권 선언 받아들이기", d: "1789년 '사람은 태어날 때부터 자유롭고 평등하다'는 인권 선언이 나왔어요.", ok: () => !!S.flags.rights, pols: [], hint: "바스티유가 무너진 뒤" }],
    L: [{ id: "l_unite", h: "盟", n: "모든 부족이 하나로", d: "쇼니족 지도자 테쿰세는 여러 부족을 하나로 묶어 땅을 지키려 했어요(1810년 무렵).", ok: () => !!S.flags.tecumseh, pols: [], hint: "젊은 지도자에게 전사들을 맡기기" },
      { id: "l_script", h: "字", n: "세쿼이아의 체로키 글자", d: "세쿼이아는 혼자서 체로키 말을 적는 글자를 만들었어요(1821). 몇 년 만에 부족 대부분이 글을 읽게 되었어요.", ok: () => !!S.flags.script, pols: ["lscript"] },
      { id: "l_court", h: "判", n: "법정에서 땅을 지킨 판결", d: "1832년 미국 대법원은 체로키 땅에 대한 권리를 인정했어요(우스터 대 조지아). 하지만 대통령은 판결을 따르지 않았어요.", ok: () => !!S.flags.courtWon, pols: ["lcourt"] }],
    M: [{ id: "m_quar", h: "隔", n: "40일 격리", d: "1377년 라구사(지금의 두브로브니크)는 처음으로 배를 격리하는 규칙을 만들었어요. '쿼런틴'이라는 말이 여기서 나왔어요.", ok: () => !!S.flags.quar || has("mquar"), pols: ["mquar"] },
      { id: "m_hosp", h: "醫", n: "병원과 의사 늘리기", d: "흑사병 뒤 도시마다 병원과 공중 보건 관리가 생겨났어요.", ok: () => has("mhosp"), pols: ["mhosp"] },
      { id: "m_free", h: "解", n: "농노 풀어 주기", d: "흑사병으로 일손이 줄자 농노가 자유로운 농민이 되는 길이 열렸어요.", ok: () => !!S.flags.freed || has("mfree"), pols: ["mfree"] }],
  });
  for (const k of ["E", "F", "K", "J", "G", "H", "L", "M"]) for (const f of FEATS[k]) for (const id of f.pols) if (P[id]) { P[id].featOf = P[id].featOf || {}; P[id].featOf[k] = f.n; }

  // ================= 다른 역사: 정책의 시너지로 실제보다 더 나은 결말 =================
  const ALTS = {
    P: [{ id: "p_mun", h: "文", t: "붓으로 천 년을 이은 고구려", l: "칼보다 붓을 앞세운 고구려예요. 태학에서 자란 인재들이 담징처럼 이웃 나라에 학문을 전하고, 외교로 큰 나라들과 평화를 맺었어요. 실제 고구려는 668년에 무너졌지만, 이 고구려는 천 년을 이어 갔을지도 몰라요.",
        ok: () => ["school", "scholars", "history", "p_damjing"].every(has) && S.st.cul >= 70, pols: ["school", "scholars", "history", "p_damjing"], need: "학교·학자·역사책·담징 + 문화 70" },
      { id: "p_sea", h: "海", t: "바다로 나간 고구려", l: "말 달리는 고구려가 수군을 키워 바닷길까지 쥐었어요. 땅과 바다로 물건이 오가며 곳간이 넘쳤어요. 실제로는 바다를 백제·신라에 내주었던 고구려의 다른 길이에요.",
        ok: () => has("p_navy") && has("trade") && S.st.gold >= 70, pols: ["p_navy", "trade"], need: "수군·무역 + 재정 70" }],
    Q: [{ id: "q_iron", h: "鐵", t: "철의 동맹으로 한성을 지킨 백제", l: "가야의 철과 왜의 군사, 백제의 문화가 하나로 묶였어요. 실제 백제는 475년 고구려에 한성을 빼앗기고 남쪽으로 내려갔지만, 이 백제는 한강을 끝까지 지켜 냈어요.",
        ok: () => ["q_gayairon", "q_chiljido", "trade"].every(has) && S.st.def >= 60, pols: ["q_gayairon", "q_chiljido", "trade", "fortress"], need: "가야 철 동맹·칠지도·바다 교역 + 국방 60" }],
    R: [{ id: "r_open", h: "才", t: "골품제를 넘어선 신라", l: "신분보다 실력으로 사람을 쓴 신라예요. 실제 신라는 골품제 때문에 최치원 같은 인재가 뜻을 펴지 못하고 쇠약해졌지만, 이 신라는 인재가 모여드는 나라가 되었어요.",
        ok: () => has("r_6du") && has("school") && S.st.har >= 55 && S.st.cul >= 65, pols: ["r_6du", "school", "har_council"], need: "6두품 등용·학교 + 화합 55·문화 65" },
      { id: "r_music", h: "樂", t: "가야와 하나 된 신라", l: "가야를 싸워서 빼앗지 않고 문화까지 품었어요. 가야금 소리가 신라 궁궐에 울리고, 가야 사람들이 신라를 제 나라처럼 여겼어요.",
        ok: () => has("r_ureuk") && ownsTerr("gaya") && S.st.har >= 60, pols: ["r_ureuk", "fortress", "r_gaya1", "r_gaya", "har_council"], need: "우륵·가야 통합 + 화합 60" }],
    T: [{ id: "t_bal", h: "渤", t: "발해를 품은 북방의 강국 고려", l: "발해 유민을 품고 서경을 키워 북쪽으로 힘차게 나아갔어요. 고구려-발해-고려가 하나로 이어진 강한 나라가 되었어요.",
        ok: () => has("t_daegwang") && has("t_seogyeong") && ownsTerr("gr_north") && S.st.def >= 55, pols: ["t_daegwang", "t_seogyeong", "t_north", "fortress"], need: "대광현·서경·북진 + 국방 55" },
      { id: "t_council", h: "議", t: "호족과 함께 다스린 고려", l: "왕 혼자가 아니라 호족·신하들과 의논하며 다스렸어요. 실제 고려 초에는 왕위를 둘러싼 다툼(왕규의 난)이 있었지만, 이 고려는 다툼 없이 하나로 뭉쳤어요.",
        ok: () => ["marriage", "hostage", "t_choe"].every(has) && S.st.har >= 62 && S.st.kp >= 50, pols: ["marriage", "hostage", "t_choe", "har_council"], need: "혼인·기인·시무 28조 + 화합 62·왕권 50" }],
    U: [{ id: "u_sci", h: "器", t: "과학 혁명의 조선", l: "장영실 같은 인재가 신분에 막히지 않고 끝까지 일했어요. 실제로 장영실은 가마 사고로 쫓겨났지만, 이 조선은 과학 기구와 농사책으로 세계 어디에도 뒤지지 않는 나라가 되었어요.",
        ok: () => ["u_jaseok", "science", "scholars", "u_nongsa"].every(has) && S.st.cul >= 75, pols: ["scholars", "u_jaseok", "science", "u_nongsa"], need: "장영실·과학 기구·집현전·농사직설 + 문화 75" }],
    V: [{ id: "v_north", h: "車", t: "북학으로 부강해진 조선", l: "실학자들의 생각을 일찍 받아들여 수레와 배, 벽돌을 들여왔어요. 상공업이 꽃피어 곳간이 가득 찼어요. 실제로는 오래 '오랑캐의 것'이라며 미뤄 둔 길이에요.",
        ok: () => has("v_bukhak") && has("trade") && S.st.gold >= 70, pols: ["v_bukhak", "trade"], need: "북학·무역 + 재정 70" },
      { id: "v_voice", h: "鼓", t: "백성의 목소리를 듣는 조선", l: "신문고를 울리면 왕이 직접 들었고, 군포도 줄었어요. 백성이 '우리 임금'이라 부르며 따르는 나라가 되었어요.",
        ok: () => has("v_sinmungo") && has("military_tax") && S.st.ppl >= 62 && S.st.har >= 50, pols: ["v_sinmungo", "military_tax", "tangpyeong"], need: "신문고·균역법 + 민심 62·화합 50" }],
    E: [{ id: "e_strong", h: "强", t: "전쟁 뒤 더 강해진 조선", l: "훈련도감과 의병, 면천으로 신분을 넘어 함께 싸운 조선이 전쟁 뒤 오히려 더 강해졌어요. 실제로는 전쟁 뒤 다시 옛 질서로 돌아가 병자호란을 맞았어요.",
        ok: () => ["e_hun", "e_gwak", "slaves"].every(has) && !!S.flags.warWon, pols: ["e_hun", "e_gwak", "slaves", "e_navy"], need: "훈련도감·의병장 벼슬·면천 + 전쟁 승리" }],
    F: [{ id: "f_wise", h: "智", t: "실리 외교로 전쟁을 피한 조선", l: "명과 청 사이에서 이름보다 실리를 택하고, 밀정으로 청의 움직임을 미리 알았어요. 삼전도의 굴욕 없이 나라를 지켰어요.",
        ok: () => has("alliance") && !!S.flags.spyOk && !S.flags.warLost && !S.flags.submit, pols: ["alliance", "f_spy", "fortress"], need: "화친 외교·밀정 성공 + 한 번도 지지 않기" },
      { id: "f_west", h: "球", t: "새 학문을 받아들인 조선", l: "세자가 들여온 서양 천문학과 과학을 나라가 함께 공부했어요. 실제로는 소현 세자가 일찍 세상을 떠나 이 길이 끊겼어요.",
        ok: () => has("f_sohyeon") && has("science") && S.st.cul >= 60, pols: ["f_sohyeon", "science", "school"], need: "세자의 서양 학문·과학 + 문화 60" }],
    K: [{ id: "k_none", h: "飯", t: "굶는 사람 없는 조선", l: "진휼청과 구황 책, 활인서가 함께 움직여 대기근 속에서도 마을마다 밥 짓는 연기가 끊이지 않았어요. 실제로는 100만 명 가까이 목숨을 잃었어요.",
        ok: () => ["kjinhyul", "k_guhwang", "relief"].every(has) && S.st.ppl >= 60, pols: ["kjinhyul", "k_guhwang", "relief", "k_hwalin"], need: "진휼청·구황 책·환곡 + 민심 60" }],
    J: [{ id: "j_modern", h: "新", t: "스스로 근대화에 성공한 대한 제국", l: "우리 은행과 민족 학교로 스스로 힘을 길러 나라를 지켜 냈어요. 실제로는 1910년 나라를 빼앗겼어요.",
        ok: () => !!S.flags.kept && ["jbank", "jschool"].every(has), pols: ["jbank", "jschool", "jarmy", "jmilitia"], need: "나라 지키기 + 우리 은행·민족 학교" }],
  };
  // 어려운 나라일수록 문턱이 조금 낮아요: ★2 평균 56·최저 42 … ★5 평균 50·최저 36
  const altGate = () => { const star = (SCEN[S.scen] && SCEN[S.scen].star) || 3; return { avg: 54 + (3 - star) * 2, min: 40 - (star - 3) * 2 }; };
  const DREAM_FLAGS = ["china", "manchu", "liaoBack", "waKing", "seaKing"];
  function altEnding() {
    if (S.over || !ALTS[S.scen]) return null;
    if (DREAM_FLAGS.some((f) => S.flags[f]) || (S.scen === "F" && S.flags.bigWin) || ownsTerr("zhongyuan") || ownsTerr("go_unify")) return null;
    const vals = statVals(), avg = avgOf(S.st), min = Math.min(...vals), star = (SCEN[S.scen] && SCEN[S.scen].star) || 3;
    if (avg < altGate().avg || min < altGate().min) return null;
    const a = ALTS[S.scen].find((x) => x.ok());
    return a ? { t: a.t, l: a.l, h: a.h, alt: true, big: true, id: a.id } : null;
  }
  for (const k of Object.keys(ALTS)) { const prev = FATE5[k]; FATE5[k] = (s, avg, min) => altEnding() || (prev ? prev(s, avg, min) : null); }
