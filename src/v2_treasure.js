  // ================= 걸작과 보물: 나라의 문화유산 만들기 =================
  // '걸작 만들기' 정책을 펼치면 보물 상자가 열리고, 그 나라의 실제 문화유산 하나가 완성돼요.
  // 등급: 보통(문화 +8) · 희귀(+12) · 전설(+18, 민심·화합도 올라요). 걸작마다 매 시기 문화 +1 (최대 +3).
  const TR = {
    go: [["광개토대왕릉비", "비석", "414년, 장수왕이 아버지의 업적을 새긴 6m가 넘는 비석"], ["무용총 수렵도", "벽화", "말 탄 사람들이 활로 사냥하는 고분 벽화"], ["강서대묘 사신도", "벽화", "청룡·백호·주작·현무를 그린 고분 벽화"], ["연가7년명 금동여래입상", "불상", "고구려에서 만든 글씨가 새겨진 금동 불상"], ["『유기』 100권", "역사서", "고구려 초기에 쓴 역사책"], ["안악 3호분 행렬도", "벽화", "250여 명이 줄지어 가는 고분 벽화"]],
    bj: [["백제 금동대향로", "공예", "부여 능산리에서 나온, 신선 세계를 새긴 향로"], ["서산 마애여래삼존상", "불상", "'백제의 미소'라 불리는 바위 부처"], ["칠지도", "공예", "가지가 일곱 개 달린 쇠칼, 왜에 보낸 선물"], ["무령왕릉 금제 관장식", "공예", "불꽃 모양의 금 관장식"], ["정림사지 오층 석탑", "탑", "부여에 서 있는 백제의 석탑"], ["미륵사지 석탑", "탑", "익산에 있는 우리나라에서 가장 오래되고 큰 석탑"], ["『서기』", "역사서", "근초고왕 때 고흥이 쓴 역사책"]],
    sl: [["첨성대", "과학", "선덕 여왕 때 세운 별을 보는 대"], ["황룡사 9층 목탑", "탑", "높이 80m에 이르렀다는 나무 탑"], ["천마총 금관", "공예", "나뭇가지·사슴뿔 모양의 신라 금관"], ["천마도", "그림", "말다래에 그린 하늘을 나는 말"], ["성덕대왕 신종", "종", "'에밀레종'으로도 불리는 큰 종"], ["석굴암 본존불", "불상", "돌을 깎아 만든 동굴 사원의 부처"], ["불국사 다보탑", "탑", "화려한 모양의 돌탑"], ["『국사』", "역사서", "진흥왕 때 거칠부가 쓴 역사책"]],
    gr: [["상감 청자", "공예", "무늬를 파고 흙을 메워 구운 비취색 도자기"], ["팔만대장경", "책", "몽골 침입 때 8만 장이 넘는 나무판에 새긴 불경"], ["『직지심체요절』", "책", "현재 남아 있는 가장 오래된 금속 활자 책"], ["『삼국사기』", "역사서", "김부식이 쓴 삼국의 역사책"], ["부석사 무량수전", "건축", "배흘림기둥이 아름다운 나무 건물"], ["나전칠기 경함", "공예", "자개를 붙여 만든 반짝이는 상자"], ["수월관음도", "그림", "고려 불화의 대표 작품"]],
    js1: [["『훈민정음 해례본』", "책", "새 글자를 만든 까닭과 원리를 풀어 쓴 책"], ["『조선왕조실록』", "역사서", "왕마다 날마다 일어난 일을 적은 기록"], ["자격루", "과학", "종과 북이 저절로 울리는 물시계"], ["앙부일구", "과학", "솥 모양의 해시계"], ["혼천의", "과학", "해·달·별의 움직임을 재는 기구"], ["측우기", "과학", "비의 양을 재는 기구"], ["『농사직설』", "책", "우리 땅에 맞는 농사법 책"], ["종묘 제례악", "음악", "왕실 조상에게 올리는 제사 음악"]],
    js2: [["『동의보감』", "책", "허준이 쓴 우리 의학 백과사전(1610)"], ["백자 달항아리", "공예", "보름달처럼 둥근 흰 항아리"], ["정선의 「인왕제색도」", "그림", "우리 산천을 직접 보고 그린 진경산수화(1751)"], ["『징비록』", "역사서", "류성룡이 임진왜란을 돌아보며 쓴 기록"], ["『반계수록』", "책", "유형원이 나라를 바꿀 방법을 쓴 실학 책"], ["『속대전』", "책", "영조 때 새로 고친 법전"], ["판소리 춘향가", "음악", "소리꾼이 북장단에 맞춰 부르는 이야기 노래"], ["대동여지도의 밑그림", "지도", "온 나라를 걸어 그린 지도의 시작"]],
    dh: [["독립문", "건축", "'우리는 독립국'이라는 뜻을 담은 문(1897)"], ["『독립신문』", "책", "한글로 펴낸 첫 민간 신문(1896)"], ["덕수궁 석조전", "건축", "대한 제국의 서양식 궁궐 건물"], ["환구단", "건축", "황제가 하늘에 제사 지내던 곳"], ["대한 제국 애국가", "음악", "1902년에 만든 나라의 노래"], ["『조선말 큰사전』 원고", "책", "조선어 학회가 지켜 낸 우리말 사전"]],
    mg: [["『몽골비사』", "역사서", "칭기즈 칸의 이야기를 담은 몽골의 역사책"], ["파이자(통행증)", "공예", "제국 어디든 지나갈 수 있는 금패"], ["카라코룸 은나무 분수", "공예", "음료가 흘러나오는 은으로 만든 나무"], ["역참 지도", "지도", "말을 갈아타는 길을 그린 지도"]],
    fr: [["『인권 선언』", "책", "사람은 자유롭고 평등하다는 선언(1789)"], ["『백과전서』", "책", "세상의 지식을 모은 큰 사전"], ["『나폴레옹 법전』", "책", "모든 시민이 법 앞에 평등한 법전"], ["루브르 박물관", "건축", "왕궁을 모두의 박물관으로 바꾸다"]],
    na: [["체로키 문자 신문", "책", "세쿼이아의 글자로 펴낸 신문(1828)"], ["윈터 카운트", "그림", "버펄로 가죽에 해마다 그린 그림 달력"], ["토템 폴", "공예", "부족의 이야기를 새긴 큰 나무 기둥"], ["깃털 머리 장식", "공예", "용감한 일을 할 때마다 깃털을 더해요"]],
    en: [["『캔터베리 이야기』", "책", "초서가 영어로 쓴 이야기 모음"], ["고딕 대성당", "건축", "뾰족한 탑과 스테인드글라스의 성당"], ["채색 필사본", "책", "금빛 그림을 그려 넣은 손글씨 책"], ["장궁(긴 활)", "공예", "크레시 전투를 이긴 긴 활"]],
    shu: [["「출사표」", "책", "제갈량이 북벌을 떠나며 황제에게 올린 글"], ["목우유마", "과학", "제갈량이 만들었다는 군량 나르는 수레"], ["촉 비단(촉금)", "공예", "촉 땅에서 짠 이름난 비단"], ["무후사", "건축", "제갈량을 기리는 사당"]],
  };
  const TR_OF = { P: "go", Q: "bj", W: "bj", R: "sl", T: "gr", U: "js1", E: "js2", F: "js2", K: "js2", V: "js2", J: "dh", A: "gr", B: "sl", C: "js2", D: "go", G: "mg", H: "fr", L: "na", M: "en", Y: "shu" };
  const trList = () => TR[TR_OF[S.scen]] || TR.gr;
  const TR_RANK = [{ r: "전설", c: "legend", d: { cul: 18, ppl: 4, har: 4 } }, { r: "희귀", c: "rare", d: { cul: 12, har: 2 } }, { r: "보통", c: "common", d: { cul: 8 } }];
  function makeTreasure(boost) {
    S.treasures = S.treasures || [];
    const left = trList().filter((x) => !S.treasures.some((t) => t.n === x[0]));
    if (!left.length) return null;
    const pick = left[Math.floor(Math.random() * left.length)];
    const pl = 0.1 + (has("scholars") ? 0.05 : 0) + (S.st.cul >= 60 ? 0.05 : 0) + (boost || 0), pr = 0.3;
    const x = Math.random(), rk = x < pl ? TR_RANK[0] : x < pl + pr ? TR_RANK[1] : TR_RANK[2];
    const t = { n: pick[0], k: pick[1], d: pick[2], r: rk.r, c: rk.c, turn: S.turn };
    S.treasures.push(t);
    return { t, d: rk.d };
  }
  const trCount = () => (S.treasures || []).length;
  PP({ id: "masterwork", cat: "cul", name: "나라의 걸작 만들기", get sub() { return S && S.scen ? trList().slice(0, 3).map((x) => x[0]).join(" · ") + " …" : "문화유산"; }, kings: "그 시대의 장인과 학자들", cost: 2, repeat: 2, scen: Object.keys(SCEN), phase: () => trCount() < trList().length,
    eff: { cul: 8, gold: -4 }, tags: [0, -0.8, 0.2],
    get note() { const n = S && S.treasures ? S.treasures.length : 0; return `보물 상자를 열어 이 나라의 실제 문화유산 하나를 완성해요(${n}/${trList().length}). 보통·희귀·전설 중 무엇이 나올지 몰라요! 걸작마다 매 시기 문화 +1. 학자를 모았거나 문화 60 이상이면 전설이 더 잘 나와요. 2시기마다 다시 할 수 있어요.`; },
    run() {
      const m = makeTreasure(0);
      if (!m) return R({ cul: 3 }, "더 만들 걸작이 없어요. 장인들이 옛 걸작을 손질했어요.", this.tags);
      const d = Object.assign({ gold: -4 }, m.d);
      return R(d, `${m.t.r} 걸작 완성! ${m.t.n}: ${m.t.d}.`, this.tags, { treasure: m.t, sl: `${m.t.n}이(가) 완성되니, 구경하러 온 사람들의 줄이 궁궐 문까지 이어졌다.` });
    } });
  // 조금만 더의 '나라의 걸작 짓기'는 전설이 더 잘 나와요
  if (P.x_wonder) { const ow = P.x_wonder.run; P.x_wonder.run = function () { const r = ow.call(this); const m = makeTreasure(0.25); if (m) { r.treasure = m.t; r.text += ` 보물 상자에서 ${m.t.r} 걸작 「${m.t.n}」이(가) 나왔어요!`; } return r; }; }
  function treasureDrift(drift, parts) { const n = Math.min(3, trCount()); if (n) { drift.cul = (drift.cul || 0) + n; parts.push(`걸작을 보러 사람들이 모여듦 (문화 +${n})`); } }
  const CHEST = `<svg class="chest" viewBox="0 0 120 100" aria-hidden="true"><g class="lid"><path d="M10 40 Q60 6 110 40 L110 46 L10 46 Z" fill="#8E2219"/><rect x="54" y="30" width="12" height="16" rx="2" fill="#F2C14E"/></g><rect x="10" y="46" width="100" height="46" rx="4" fill="#A8432B"/><rect x="10" y="58" width="100" height="6" fill="#F2C14E"/><rect x="52" y="52" width="16" height="18" rx="3" fill="#F2C14E"/><circle cx="60" cy="61" r="3" fill="#8E2219"/></svg>`;
  function treasureEntries(L) {
    return (L.res || []).filter((r) => r.treasure).map((r) => { const t = r.treasure; return `<div class="trbox ${t.c}"><div class="trchest">${CHEST}<span class="glow"></span></div><div class="tritem"><span class="trr">${esc(t.r)} 걸작</span><b>${esc(t.n)}</b><span class="sub">${esc(t.k)} · ${esc(t.d)}</span></div></div>`; }).join("");
  }
  function treasurePanel() {
    const ts = S.treasures || []; const all = trList();
    if (!ts.length) return "";
    return `<section class="panel trpanel"><h2>${esc(NATION())}의 보물 창고 <span class="sub">${ts.length}/${all.length}</span></h2>
      <div class="trgrid">${all.map((x) => { const t = ts.find((y) => y.n === x[0]); return t ? `<div class="trcard ${t.c}"><span class="trr">${esc(t.r)}</span><b>${esc(t.n)}</b><span class="sub">${esc(t.k)} · ${t.turn}시기</span></div>` : `<div class="trcard locked"><span class="trr">?</span><b>아직 만들지 못한 걸작</b><span class="sub">${esc(x[1])}</span></div>`; }).join("")}</div></section>`;
  }
  const treasureScore = () => { const ts = S.treasures || []; return Math.min(4, ts.length) + ts.filter((t) => t.c === "legend").length * 2; };
