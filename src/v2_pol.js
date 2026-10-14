  // ================= 정책 28가지 =================
  // tags: [힘(+)/화합(-), 칼(+)/붓(-), 백성(+)/나라틀(-)]
  const addInc = (n) => { S.inc = (S.inc || 0) + n; };
  const POL = [
    // 나라의 틀
    { id: "law", w: "칭기즈 칸(예케 자사크) · 나폴레옹(법전)", cat: "law", name: "율령 반포", sub: "나라의 법을 글로 정해 알리기", kings: "소수림왕 · 법흥왕", cost: 2,
      eff: { kp: 10, har: 4, gold: 3, cul: 3 }, tags: [0.4, -0.2, -1], strong: true,
      note: "일찍 할수록 좋아요. 관리 등급·지방관·과거제는 율령이 있어야 할 수 있어요.",
      run() { const early = S.turn <= 3; return R({ kp: 10 + (early ? 3 : 0), har: 4, gold: 3, cul: 3 }, early ? "나라 초기에 법을 세우니 모든 일의 기준이 생겼어요. 귀족들도 법에 따라 움직이기 시작했어요." : "법을 글로 정해 알렸어요. 이제 왕의 명령이 법이라는 틀을 따라 전해져요.", this.tags); } },
    { id: "rank", cat: "law", name: "관리 등급과 옷 색 정하기", sub: "관등제 · 공복 제정", kings: "법흥왕", cost: 1, req: ["law"],
      eff: { kp: 7, har: -3, cul: 2 }, tags: [0.6, -0.2, -0.8],
      run() { return R({ kp: 7, har: -3, cul: 2 }, "관리의 등급을 정하고 등급마다 옷 색을 다르게 했어요. 높은 귀족도 왕이 정한 질서 안으로 들어왔어요.", this.tags); } },
    { id: "local", w: "진시황(군현제)", cat: "law", name: "지방에 관리 보내기", sub: "지방관 파견 (12목 · 9주 5소경)", kings: "고려 성종 · 신문왕", cost: 2, req: ["law"],
      eff: { kp: 10, gold: 6, har: -10 }, tags: [0.7, 0, -0.8], strong: true, inc: 1,
      note: "매 시기 세금 수입이 늘어요. 호족과 미리 친해져 두면(혼인·기인 제도) 반발이 줄어요.",
      run() { const soft = has("marriage") || has("hostage"); addInc(1); return R({ kp: 10, gold: 6, har: soft ? -4 : -10 }, soft ? "미리 호족들과 친해 둔 덕분에, 왕이 보낸 관리를 호족들이 크게 막지 않았어요. 세금도 제대로 걷히기 시작했어요." : "왕이 보낸 관리가 지방을 다스리자 세금이 잘 걷혔어요. 하지만 자기 땅을 빼앗긴 호족들이 크게 화가 났어요.", this.tags); } },
    { id: "exam", w: "중국 수나라·당나라(과거제)", cat: "law", name: "시험으로 관리 뽑기", sub: "과거제", kings: "광종", cost: 2, req: ["law"],
      eff: { kp: 7, cul: 7, har: -5 }, tags: [0.5, -0.6, -0.5],
      note: "나라 학교가 있으면 실력 있는 사람이 더 많이 뽑혀요.",
      run() { const sc = has("school"); return R({ kp: 7, cul: 7 + (sc ? 5 : 0), har: -5 }, sc ? "학교에서 공부한 젊은이들이 시험에 붙어 관리가 되었어요. 집안보다 실력으로 뽑힌 관리들은 왕을 따랐어요." : "집안이 아니라 시험 실력으로 관리를 뽑았어요. 귀족 집안들은 불만이었지만 왕의 편이 늘었어요.", this.tags); } },
    { id: "capital", w: "알렉산드로스(알렉산드리아) · 루이 14세(베르사유)", cat: "law", name: "도읍 옮기기 · 새 도시 세우기", sub: "천도 · 신도시 건설", kings: "장수왕 · 조선 태조 · 정조", cost: 3,
      eff: { kp: 14, gold: -10, har: -6, def: 6, cul: 4 }, tags: [0.8, 0.2, -0.4], strong: true,
      note: "돈이 많이 들어요. 재정이 30보다 적을 때 하면 백성이 크게 힘들어해요.",
      run() { const poor = S.st.gold < 30; return R({ kp: 14, gold: -10, har: -6, def: 6, cul: 4, ppl: poor ? -10 : 0 }, poor ? "새 도읍을 세웠지만 곳간이 비어 있어 백성들이 공사에 끌려가 고생했어요. 옛 귀족들의 힘은 크게 줄었어요." : "옛 귀족들이 모여 사는 도읍을 떠나 새 도읍을 세웠어요. 왕을 중심으로 나라가 새로 짜였어요.", this.tags); } },
    // 힘과 군사
    { id: "conquest", w: "알렉산드로스 · 칭기즈 칸 · 나폴레옹", cat: "mil", name: "영토 넓히기", sub: "정복 전쟁", kings: "광개토대왕 · 근초고왕 · 진흥왕", cost: 3,
      eff: { def: 4, gold: 12, kp: 8, ppl: -5 }, tags: [0.5, 1, 0], strong: true, risky: true, inc: 2,
      note: "실패할 수 있어요! 국방이 높고 화랑도·동맹이 있으면 이기기 쉬워요. 이기면 매 시기 수입이 늘어요.",
      run() {
        const pow = S.st.def + (has("hwarang") ? 8 : 0) + (has("alliance") || S.flags.ally ? 10 : 0) + Math.round(S.st.kp * 0.2);
        if (pow >= 60) { S.flags.conquered = true; addInc(2); return R({ def: 4, gold: 12, kp: 8, ppl: -5 }, `군대가 이웃 나라의 땅을 차지했어요(우리 힘 ${pow}). 넓은 땅에서 곡식과 세금이 들어오고, 왕의 이름이 널리 알려졌어요.`, this.tags); }
        S.flags.warLost = true;
        return R({ def: -14, gold: -10, ppl: -10, kp: -4 }, `전쟁에서 졌어요(우리 힘 ${pow}, 이기려면 60 이상). 많은 군사를 잃고, 백성들은 전쟁 비용에 시달렸어요.`, this.tags, { ok: false });
      } },
    { id: "hwarang", w: "스파르타의 소년 훈련", cat: "mil", name: "젊은 인재 무리 키우기", sub: "화랑도 정비", kings: "진흥왕", cost: 1,
      eff: { def: 6, har: 2, cul: 2, gold: -4 }, tags: [0, 0.7, -0.2],
      run() { return R({ def: 6, har: 2, cul: 2, gold: -4 }, "귀족 집안 젊은이들이 함께 무술과 학문을 익히며 나라를 위해 싸우기로 맹세했어요.", this.tags); } },
    { id: "fortress", w: "진시황(만리장성)", cat: "mil", name: "국경에 성 쌓기", sub: "천리장성 · 4군 6진", kings: "세종 · 고구려", cost: 2,
      eff: { def: 14, gold: -6, ppl: -2 }, tags: [0.1, 0.7, 0.3],
      run() { return R({ def: 14, gold: -6, ppl: -2 }, "국경을 따라 성을 쌓고 군사를 두었어요. 쳐들어오는 적을 막기가 쉬워졌어요.", this.tags); } },
    { id: "disband", cat: "mil", name: "개인 군대 없애기", sub: "사병 혁파", kings: "조선 태종", cost: 2,
      eff: { kp: 12, def: 6, har: -10 }, tags: [0.9, 0.4, -0.3], strong: true, risky: true, tyr: 1,
      note: "왕권이 45보다 낮으면 실패할 수 있어요.",
      run() {
        if (S.st.kp >= 45) return R({ kp: 12, def: 6, har: -10 }, "공신과 왕족들이 따로 거느리던 군대를 모두 나라 군대로 합쳤어요. 이제 군사를 움직일 수 있는 사람은 왕뿐이에요.", this.tags);
        return R({ kp: -6, har: -10, def: 2 }, "공신들이 군대를 내놓지 않고 거세게 반발했어요. 왕의 힘이 아직 모자랐어요.", this.tags, { ok: false });
      } },
    { id: "alliance", w: "클레오파트라와 로마", cat: "mil", name: "강한 이웃 나라와 손잡기", sub: "외교 · 동맹", kings: "김춘추(태종 무열왕) · 장수왕", cost: 1,
      eff: { def: 8, kp: -3, gold: -3 }, tags: [-0.4, 0.4, 0],
      run() { S.flags.ally = true; return R({ def: 8, kp: -3, gold: -3 }, "큰 나라에 사신을 보내 손을 잡았어요. 전쟁 때 도움을 받을 수 있게 되었지만, 큰 나라의 눈치를 보게 되었어요.", this.tags); } },
    // 신하와 호족
    { id: "marriage", w: "칭기즈 칸(혼인 동맹)", cat: "men", name: "호족과 혼인하고 성씨 내려 주기", sub: "혼인 정책 · 사성 정책", kings: "고려 태조 왕건", cost: 1,
      eff: { har: 11, kp: -5 }, tags: [-1, 0, 0],
      note: "호족이 한 가족처럼 되지만, 왕비의 친척(외척)이 힘을 키울 수 있어요.",
      run() { return R({ har: 11, kp: -5 }, "힘센 호족의 딸들과 혼인하고 공을 세운 호족에게 왕의 성씨를 내려 주었어요. 호족들이 왕을 한 가족처럼 여기기 시작했어요.", this.tags); } },
    { id: "hostage", w: "칭기즈 칸(케식) · 루이 14세(베르사유에 모인 귀족)", cat: "men", name: "호족 자식을 도읍에 머물게 하기", sub: "기인 제도 · 사심관 제도", kings: "고려 태조 왕건", cost: 1,
      eff: { kp: 7, har: -2 }, tags: [0.2, 0, -0.5],
      run() { return R({ kp: 7, har: -2 }, "호족의 자식을 도읍에 머물게 하고, 지방 일은 그 지역 출신 관리에게 책임지게 했어요. 호족들이 함부로 움직이기 어려워졌지만, 자식을 보낸 호족들은 서운해했어요.", this.tags); } },
    { id: "purge", w: "진시황(분서갱유)", cat: "men", name: "공신과 외척 정리하기", sub: "숙청", kings: "조선 태종 · 광종 · 신문왕", cost: 2,
      eff: { kp: 18, har: -15, ppl: -3 }, tags: [1, 0.1, -0.2], strong: true, risky: true, tyr: 2,
      note: "왕권이 크게 오르지만 신하들이 두려워해요. 숙청 뒤의 학문 정책은 효과가 커져요. 자주 하면 폭군이 될 수 있어요.",
      run() {
        const weak = S.st.kp < 30; S.flags.cleared = true;
        if (weak) S.flags.rebelRisk = true;
        return R({ kp: 18, har: -15, ppl: -3 }, weak ? "힘센 공신들을 몰아냈지만, 남은 귀족들이 몰래 모여 반란을 꾀하기 시작했어요." : "왕을 위협하던 공신과 외척을 몰아냈어요. 아무도 왕의 자리를 넘보지 못하게 되었지만, 신하들은 왕을 두려워하게 되었어요.", this.tags);
      } },
    { id: "slaves", cat: "men", name: "억울한 노비 풀어 주기", sub: "노비안검법", kings: "고려 광종", cost: 2,
      eff: { gold: 8, kp: 8, ppl: 6, har: -15 }, tags: [0.6, 0, 0.6], strong: true, inc: 1,
      note: "세금 내는 백성이 늘어 매 시기 수입이 늘어요. 호족이 크게 반발할 수 있어요.",
      run() { S.flags.petition = "slaves"; addInc(1); return R({ gold: 8, kp: 8, ppl: 6, har: -15 }, "억울하게 노비가 된 사람들을 다시 양인으로 돌려놓았어요. 세금을 내는 백성이 늘었고, 노비를 많이 거느리던 호족의 힘은 줄었어요.", this.tags); } },
    { id: "tangpyeong", w: "엘리자베스 1세(종교 다툼 누그러뜨리기)", cat: "men", name: "여러 무리를 고르게 쓰기", sub: "탕평책", kings: "영조 · 정조", cost: 2, reqAny: ["exam", "rank"],
      eff: { har: 12, kp: 3, gold: -3 }, tags: [-0.8, -0.2, -0.2],
      note: "관리 제도(관리 등급이나 과거제)가 있어야 할 수 있어요.",
      run() { return R({ har: 12, kp: 3, gold: -3 }, "어느 한 편만 쓰지 않고 여러 무리의 신하를 고르게 썼어요. 신하들의 다툼이 줄고, 모두 왕을 중심으로 모였어요.", this.tags); } },
    // 백성 살피기
    { id: "taxcut", cat: "ppl", name: "세금을 알맞게 걷기", sub: "취민유도", kings: "고려 태조 왕건", cost: 1,
      eff: { ppl: 12, gold: -8 }, tags: [-0.2, 0, 1],
      run() { return R({ ppl: 12, gold: -8 }, "백성에게서 세금을 지나치게 걷지 않기로 했어요(수확의 10분의 1). 백성들은 기뻐했지만 나라 곳간은 줄었어요.", this.tags); } },
    { id: "relief", w: "로마 제국(곡식 나눠 주기)", cat: "ppl", name: "흉년에 곡식 빌려주기", sub: "진대법", kings: "고구려 고국천왕", cost: 1,
      eff: { ppl: 9, gold: -5 }, tags: [0, 0, 1],
      note: "가뭄·홍수 같은 재난이 와도 피해가 줄어요.",
      run() { return R({ ppl: 9, gold: -5 }, "봄에 곡식을 빌려주고 가을에 갚게 하는 제도를 만들었어요. 굶는 백성이 크게 줄었어요.", this.tags); } },
    { id: "survey", cat: "ppl", name: "백성에게 물어 세금 정하기", sub: "공법 여론 조사", kings: "세종", cost: 2,
      eff: { ppl: 9, gold: 5, har: -3 }, tags: [-0.3, -0.3, 0.8], inc: 1,
      note: "왕권이 튼튼할 때(숙청 뒤 등) 하면 더 좋아요.",
      run() { const c = S.flags.cleared || S.st.kp >= 60; addInc(1); return R({ ppl: 9 + (c ? 4 : 0), gold: 5, har: c ? 0 : -3 }, "새 세금 제도를 만들기 전에 백성 17만 명에게 찬성과 반대를 물었어요. 땅의 좋고 나쁨과 풍년·흉년에 따라 세금을 다르게 했어요.", this.tags); } },
    { id: "military_tax", cat: "ppl", name: "군대 의무 줄여 주기", sub: "균역법", kings: "영조", cost: 1,
      eff: { ppl: 10, def: -5, gold: -4 }, tags: [-0.1, -0.2, 1],
      run() { return R({ ppl: 10, def: -5, gold: -4 }, "군대에 가는 대신 내던 옷감(군포)을 반으로 줄여 주었어요. 백성의 짐이 가벼워졌지만 군대 살림은 빠듯해졌어요.", this.tags); } },
    // 곳간 채우기
    { id: "coin", w: "진시황(화폐 통일)", cat: "eco", name: "나라 돈(화폐) 만들어 쓰기", sub: "건원중보 · 해동통보 · 상평통보", kings: "고려 성종 · 조선 숙종", cost: 2,
      eff: { gold: 3, cul: 2 }, tags: [0.3, -0.2, -0.3], inc: 2,
      note: "매 시기 수입이 늘어요. 민심이 40보다 낮으면 사람들이 새 돈을 믿지 않아 효과가 줄어요.",
      run() { if (S.st.ppl >= 40) { addInc(2); return R({ gold: 3, cul: 2 }, "구리로 나라 돈을 만들어 장터에서 쓰게 했어요. 물건 사고팔기가 편해지고 세금 걷기도 쉬워졌어요(상평통보처럼).", this.tags); } addInc(1); return R({ gold: 3, cul: 1 }, "나라 돈을 만들었지만 백성들이 믿지 않아 여전히 쌀과 옷감으로 사고팔았어요(고려의 해동통보처럼).", this.tags); } },
    { id: "daedong", cat: "eco", name: "특산물 대신 쌀로 세금 내기", sub: "대동법", kings: "광해군 · 조선 숙종", cost: 2,
      eff: { ppl: 10, gold: 4, har: -6 }, tags: [0.1, 0, 0.8], inc: 1,
      note: "매 시기 수입이 늘어요. 땅이 많은 양반들이 반대해요. 화합이 낮으면 반대가 더 거세요.",
      run() { const hard = S.st.har < 35; S.flags.daedong = true; addInc(1); return R({ ppl: 10, gold: 4, har: hard ? -10 : -6 }, hard ? "지방 특산물 대신 땅 크기에 따라 쌀로 세금을 내게 했어요. 백성은 크게 기뻐했지만, 땅 부자 양반들의 반대가 아주 거셌어요." : "지방 특산물 대신 땅 크기에 따라 쌀로 세금을 내게 했어요. 땅 없는 백성의 짐이 크게 줄었어요.", this.tags); } },
    { id: "trade", w: "칭기즈 칸(비단길 역참) · 엘리자베스 1세", cat: "eco", name: "바다 무역 길 열기", sub: "청해진 · 벽란도", kings: "근초고왕 · 장보고와 흥덕왕", cost: 2,
      eff: { gold: 3, cul: 3 }, tags: [0, 0.1, 0.2], inc: 3,
      note: "매 시기 수입이 크게 늘어요. 국방이 40보다 낮으면 해적 때문에 이익이 줄어요.",
      run() { if (S.st.def >= 40) { addInc(3); return R({ gold: 3, cul: 3 }, "바닷가에 큰 무역항을 열고 해적을 막았어요(장보고의 청해진처럼). 먼 나라의 배들이 드나들며 물건과 문화가 오갔어요.", this.tags); } addInc(1); return R({ gold: 2, cul: 2 }, "무역항을 열었지만 해적이 자주 나타나 배들이 마음 놓고 오가지 못했어요.", this.tags); } },
    { id: "voyage", cat: "eco", name: "먼 바다 탐험대 보내기", sub: "대항해", kings: "명나라 영락제(정화의 원정) · 스페인 이사벨 1세(콜럼버스)", w: "정화의 대원정 · 콜럼버스의 항해", cost: 2, risky: true, gamble: true,
      eff: { gold: 16, cul: 6 }, fail: { gold: -10, def: -4, ppl: -3 }, tags: [0.2, 0.3, 0], inc: 2,
      chance() { return Math.min(0.85, 0.5 + (has("trade") ? 0.15 : 0) + (S.st.def >= 50 ? 0.1 : 0)); },
      note: "모험! 성공하면 보물과 새 무역 길(매 시기 수입 +2)을 얻고, 실패하면 배와 사람을 잃어요. 바다 무역 길을 열었거나 국방이 50 이상이면 성공하기 쉬워요.",
      run() { if (Math.random() < this.chance()) { addInc(2); return R({ gold: 16, cul: 6 }, "탐험대가 먼 바다 끝에서 처음 보는 나라를 찾아냈어요! 향신료와 보물을 가득 싣고 돌아왔어요.", this.tags); } return R({ gold: -10, def: -4, ppl: -3 }, "탐험대가 큰 폭풍을 만나 배 여러 척을 잃었어요. 돌아온 선원들이 바다 괴물을 봤다며 벌벌 떨었어요.", this.tags, { ok: false }); } },
    { id: "canal", cat: "eco", name: "큰 운하·저수지 공사", sub: "대규모 물길 공사", kings: "김제 벽골제 · 수 양제(대운하)", w: "수 양제의 대운하", cost: 3, risky: true, gamble: true, strong: true,
      eff: { ppl: 8, kp: 4, gold: -8 }, fail: { ppl: -12, gold: -12, har: -4 }, tags: [0.6, 0, 0.4], inc: 3,
      chance() { return Math.min(0.85, 0.55 + (S.st.gold >= 40 ? 0.1 : 0) + (S.st.ppl >= 50 ? 0.1 : 0)); },
      note: "모험! 성공하면 농사와 물건 나르기가 쉬워져 매 시기 수입 +3, 실패하면 공사에 지친 백성이 크게 원망해요. 재정 40, 민심 50 이상이면 성공하기 쉬워요.",
      run() { if (Math.random() < this.chance()) { addInc(3); return R({ ppl: 8, kp: 4, gold: -8 }, "거대한 물길이 완성되었어요! 논밭에 물이 넘치고 배들이 곡식을 싣고 오갔어요.", this.tags); } return R({ ppl: -12, gold: -12, har: -4 }, "공사가 몇 년째 끝나지 않아 백성들이 지쳐 쓰러졌어요(수나라는 대운하 공사로 원망을 사 무너졌어요).", this.tags, { ok: false }); } },
    // 학문과 문화
    { id: "festival", cat: "cul", name: "온 나라 큰 축제 열기", sub: "팔관회 · 연등회", kings: "고려 태조 왕건", cost: 1, risky: true, gamble: true,
      eff: { ppl: 8, cul: 4, har: 3 }, fail: { gold: -10, ppl: -3 }, tags: [-0.3, -0.4, 0.5],
      chance() { return 0.65; },
      note: "모험! 날씨가 좋으면 온 나라가 하나가 되고, 날씨가 궂으면 돈만 날려요.",
      run() { if (Math.random() < this.chance()) return R({ ppl: 8, cul: 4, har: 3 }, "등불 수천 개가 밤하늘을 밝히고 온 나라가 노래하고 춤추었어요(팔관회·연등회처럼).", this.tags); return R({ gold: -10, ppl: -3 }, "축제 날 장대비가 쏟아져 등불이 모두 꺼졌어요. 젖은 떡만 산더미처럼 남았어요.", this.tags, { ok: false }); } },
    { id: "buddhism", w: "아소카왕(불교) · 콘스탄티누스 대제(크리스트교 공인)", cat: "cul", name: "새 종교 받아들이기", sub: "불교 수용 · 공인", kings: "소수림왕 · 법흥왕", cost: 2,
      eff: { cul: 8, har: 6, ppl: 3, gold: -5 }, tags: [0.2, -0.6, -0.3],
      note: "왕권이 40보다 낮으면 귀족들이 반대해요(이차돈의 순교처럼).",
      run() {
        if (S.st.kp >= 40) return R({ cul: 8, har: 6, ppl: 3, gold: -5 }, "새 종교를 나라가 받아들였어요. 사람들이 같은 믿음으로 묶이고, 절과 불상을 만들며 문화가 꽃피었어요.", this.tags);
        return R({ cul: 6, har: -8, ppl: 3, kp: 4, gold: -4 }, "귀족들이 새 종교를 거세게 반대했어요. 한 신하가 목숨을 걸고 믿음을 보인 뒤에야 겨우 받아들여졌어요(이차돈의 순교처럼).", this.tags);
      } },
    { id: "history", cat: "cul", name: "나라의 역사책 펴내기", sub: "『서기』 · 『국사』", kings: "근초고왕 · 진흥왕", cost: 1,
      eff: { cul: 5, har: 2, kp: 2, gold: -3 }, tags: [0.2, -0.6, -0.3],
      run() { return R({ cul: 5, har: 2, kp: 2, gold: -3 }, `${NATION()}의 역사를 책으로 펴냈어요. 백성과 신하들이 우리 나라에 자부심을 갖게 되었어요.`, this.tags); } },
    { id: "school", w: "나폴레옹(리세)", cat: "cul", name: "나라 학교 세우기", sub: "태학 · 국학 · 국자감", kings: "소수림왕 · 신문왕 · 고려 성종", cost: 2,
      eff: { cul: 12, har: 2, gold: -5 }, tags: [0.1, -0.8, -0.4],
      note: "학자 모으기·과학 기구는 학교가 있어야 할 수 있어요.",
      run() { return R({ cul: 12, har: 2, gold: -5 }, "나라에서 학교를 세워 젊은이들에게 학문을 가르쳤어요. 나라를 이끌 인재가 자라기 시작했어요.", this.tags); } },
    { id: "scholars", w: "프톨레마이오스 왕(알렉산드리아 도서관)", cat: "cul", name: "뛰어난 학자 모으기", sub: "집현전 · 규장각", kings: "세종 · 정조", cost: 2, req: ["school"],
      eff: { cul: 12, kp: 3, gold: -5 }, tags: [0, -0.9, -0.1],
      note: "숙청으로 왕권이 안정된 뒤에 하면 더 좋아요(태종 뒤의 세종처럼).",
      run() { const c = S.flags.cleared; return R({ cul: 12 + (c ? 4 : 0), kp: 3, gold: -5 }, c ? "앞선 정치로 왕권이 안정된 덕분에, 학자들이 다툼 걱정 없이 마음껏 연구했어요." : "뛰어난 학자들을 모아 나라의 일을 연구하게 했어요.", this.tags); } },
    { id: "hangeul", cat: "cul", name: "백성을 위한 새 글자 만들기", sub: "훈민정음", kings: "세종", cost: 3, req: ["scholars"],
      eff: { cul: 15, ppl: 12, har: -6, gold: -4 }, tags: [-0.1, -0.8, 0.9],
      note: "왕권이 60 이상이거나 숙청 뒤라면 신하들의 반대를 이겨 낼 수 있어요.",
      run() {
        const strong = S.st.kp >= 60 || S.flags.cleared;
        if (!strong) S.flags.petition = "hangeul";
        return R({ cul: 15, ppl: 12, har: strong ? 0 : -6, gold: -4 }, strong ? "누구나 쉽게 배울 수 있는 새 글자를 만들었어요. 반대하는 신하도 있었지만 왕의 뜻을 꺾지 못했어요." : "누구나 쉽게 배울 수 있는 새 글자를 만들었어요. 하지만 몇몇 신하가 크게 반대하는 글(상소)을 올렸어요.", this.tags);
      } },
    { id: "science", cat: "cul", name: "농사를 돕는 과학 기구", sub: "측우기 · 해시계 · 물시계", kings: "세종", cost: 2, req: ["school"],
      eff: { gold: 3, ppl: 5, cul: 4 }, tags: [0, -0.6, 0.6], inc: 1,
      note: "농사가 잘되어 매 시기 수입이 늘어요. 신분이 낮아도 재주 있는 사람을 썼다면 효과가 커져요.",
      run() { const t = S.flags.talent; addInc(t ? 2 : 1); return R({ gold: 3 + (t ? 4 : 0), ppl: 5, cul: 4 }, t ? "신분이 낮았던 기술자가 앞장서 비의 양과 시간을 재는 기구를 만들었어요. 농사가 훨씬 잘되었어요." : "비의 양과 시간을 재는 기구를 만들어 농사에 썼어요.", this.tags); } },
  ];
  const P = Object.fromEntries(POL.map((p) => [p.id, p]));
