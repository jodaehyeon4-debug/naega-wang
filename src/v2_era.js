  // ================= 시대에 맞는 정책 이름과 이야기 =================
  // 같은 정책이라도 나라와 시대에 따라 그 시대의 제도·인물·말로 바꾸어 보여 줘요. 효과(숫자)는 그대로예요.
  // 찾는 순서: 시나리오 고유(P, Q, …) → 시대(sam, gor, jo1, jo2, dh, dh2)
  const ERA_OF = () => ({ W: "sam", P: "sam", Q: "sam", R: "sam", T: "gor", U: "jo1", E: "jo2", F: "jo2", K: "jo2", V: "jo2", J: S.flags && S.flags.lost ? "dh2" : "dh" })[S.scen] || null;
  const hasAny = (...ids) => ids.some(has);
  const ERA_TXT = {
    // ---------- 삼국 (고구려·백제·신라) ----------
    sam: {
      local: { sub: "지방에 관리 보내기", note: "매 시기 세금 수입이 늘어요. 지방 귀족·족장과 미리 친해져 두면(혼인 동맹) 반발이 줄어요.",
        text: () => (hasAny("marriage", "hostage") ? "미리 지방 귀족들과 가까워진 덕분에, 왕이 보낸 관리를 크게 막지 않았어요. 세금도 제대로 걷히기 시작했어요." : "왕이 보낸 관리가 지방을 다스리자 세금이 잘 걷혔어요. 하지만 자기 땅을 다스리던 지방 족장들이 크게 화가 났어요."),
        sl: "왕이 지방마다 관리를 보냈다. 지방 족장들이 새 관리를 보고 '어디서 굴러온 돌이냐'며 수군거렸다." },
      marriage: { name: "힘센 귀족 가문과 혼인 동맹", sub: "왕비 가문 정하기", note: "귀족들이 왕실과 한 가족처럼 되지만, 왕비의 친척(외척)이 힘을 키울 수 있어요.",
        text: "힘센 귀족 가문에서 왕비를 맞아들였어요. 그 가문이 왕의 든든한 편이 되었어요.", sl: "왕이 힘센 귀족 가문과 혼인하였다. 잔칫날 두 가문 어른들이 서로 상석을 권하다 해가 졌다." },
      purge: { sub: "귀족 반란 정리", kings: "고국천왕 · 신문왕" },
      taxcut: { sub: "세금을 덜어 주는 어진 정치", kings: "삼국의 어진 왕들", text: "백성에게서 세금을 지나치게 걷지 않기로 했어요. 백성들은 기뻐했지만 나라 곳간은 줄었어요." },
      relief: { kings: "고구려 고국천왕 · 을파소 (194)" },
      capital: { sub: "도읍 옮기기", note: "돈이 많이 들어요. 재정이 30보다 적을 때 하면 백성이 크게 힘들어해요." },
      fortress: { sub: "산성 쌓기", kings: "삼국의 왕들" },
      alliance: { sub: "외교 · 동맹" },
      scholars: { note: "왕권이 안정된 뒤(숙청 뒤)에 하면 더 좋아요.", text: () => (S.flags.cleared ? "왕권이 안정된 덕분에, 학자들이 다툼 걱정 없이 마음껏 연구했어요." : "뛰어난 학자들을 모아 글과 학문을 가르치고 나라의 일을 연구하게 했어요.") },
      festival: { sub: "하늘에 올리는 나라 제사" },
      hwarang: { sub: "젊은 무사 무리 키우기", kings: "삼국의 왕들 (신라의 화랑도처럼)" },
      har_council: { name: "귀족들과 함께 정하는 큰 회의", sub: "귀족 회의", kings: "삼국의 귀족 회의" },
      har_hunt: { kings: "삼국의 왕들" },
    },
    P: {
      law: { kings: "소수림왕 (373)" }, rank: { sub: "관등 정하기 (대대로·태대형…)", kings: "고구려의 왕들" },
      local: { sub: "지방관 보내기 (욕살·처려근지)", kings: "고구려의 왕들" },
      marriage: { kings: "고국천왕 (연나부에서 왕비를 맞음)" },
      capital: { kings: "장수왕 (평양 천도, 427)" },
      fortress: { sub: "산성 쌓기 (환도산성·오녀산성)", kings: "고구려의 왕들", text: "험한 산마다 돌로 성을 쌓고 군사를 두었어요. 적이 쳐들어와도 성에 들어가 오래 버틸 수 있게 되었어요." },
      hwarang: { name: "젊은이에게 글과 활 가르치기", sub: "경당", kings: "고구려 (마을마다 경당)", text: "마을마다 경당을 지어, 결혼하기 전의 젊은이들이 밤낮으로 글을 읽고 활쏘기를 익히게 했어요.", sl: "경당에서 젊은이들이 활을 쏘니, 과녁 옆 까치집이 이사를 갔다." },
      alliance: { kings: "장수왕 (북위·남조와 동시에 외교)" },
      trade: { sub: "중국 남북조와 교류", kings: "장수왕 · 문자명왕", text: () => (S.st.def >= 40 ? "중국 남쪽과 북쪽 나라 모두에 사신과 상인을 보냈어요. 고구려의 말과 담비 가죽이 비단과 책으로 바뀌어 돌아왔어요." : "교역 길을 열었지만 길목의 도적과 해적 때문에 물건이 자주 사라졌어요.") },
      festival: { name: "하늘에 제사 지내는 큰 축제", sub: "동맹 (10월)", kings: "고구려", text: "10월이 되자 온 나라 사람들이 모여 하늘에 제사를 지내고 노래하고 춤추었어요(동맹).", fail: "제삿날 큰비가 쏟아져 제단이 무너졌어요. 젖은 음식만 산더미처럼 남았어요.", sl: "동맹 제사가 열리니, 국내성 사람들이 사흘 내내 춤추다 신발 밑창이 닳았다.", slFail: "동맹 날 장대비가 쏟아지니, 제사 음식이 떠내려가 물고기들이 배를 불렸다." },
      buddhism: { kings: "소수림왕 (372, 순도가 불경을 전함)" },
      history: { sub: "『유기』 · 『신집』", kings: "고구려 (영양왕 때 이문진이 『신집』)" },
      school: { sub: "태학 (372)", kings: "소수림왕" },
      scholars: { sub: "태학 박사 모으기", kings: "소수림왕 · 영양왕 (이문진)" },
      har_council: { name: "제가 회의 열기", sub: "고구려의 귀족 회의", kings: "고구려" },
      har_hunt: { name: "낙랑 언덕 사냥 대회", sub: "해마다 3월 3일", kings: "고구려 (온달이 이름을 떨친 대회)" },
    },
    Q: {
      law: { kings: "고이왕 · 근초고왕" }, rank: { sub: "6좌평 16관등 · 공복", kings: "고이왕 (260)" },
      local: { sub: "지방관 보내기 (담로 · 방령)", kings: "백제의 왕들" },
      marriage: { kings: "근초고왕 (진씨 가문에서 왕비를 맞음)" },
      capital: { kings: "문주왕 (웅진, 475) · 성왕 (사비, 538)" },
      fortress: { sub: "토성 쌓기 (풍납토성·몽촌토성)", kings: "백제의 왕들", text: "한강 가에 흙을 다져 크고 튼튼한 성을 쌓았어요. 적이 쳐들어와도 막기 쉬워졌어요." },
      hwarang: { sub: "젊은 무사 무리 키우기", kings: "백제의 왕들" },
      alliance: { kings: "비유왕 (나제 동맹, 433) · 근초고왕 (동진·왜)" },
      trade: { sub: "동진·왜와 바다 교역", kings: "근초고왕", text: () => (S.st.def >= 40 ? "백제의 배가 동진과 왜를 오가며 비단·쇠·책을 실어 날랐어요. 백제가 바다 교역의 중심이 되었어요." : "바닷길을 열었지만 해적이 자주 나타나 배들이 마음 놓고 오가지 못했어요.") },
      canal: { sub: "김제 벽골제 (330)", kings: "비류왕", note: "모험! 성공하면 논에 물을 대기 쉬워져 매 시기 수입 +3, 실패하면 공사에 지친 백성이 크게 원망해요. 재정 40, 민심 50 이상이면 성공하기 쉬워요." },
      festival: { sub: "하늘과 땅에 올리는 제사", kings: "백제" },
      buddhism: { kings: "침류왕 (384, 마라난타가 불교를 전함)" },
      history: { sub: "『서기』", kings: "근초고왕 (박사 고흥)" },
      school: { sub: "박사 제도", kings: "근초고왕 (박사 고흥)" },
      scholars: { sub: "박사 모으기 (오경박사)", kings: "근초고왕 · 무령왕", text: () => "박사들을 모아 글과 학문을 가르쳤어요. 백제의 박사들은 바다 건너 왜에도 학문을 전했어요(아직기·왕인)." },
      har_council: { name: "정사암 회의 열기", sub: "백제의 귀족 회의", kings: "백제", text: "재상을 뽑을 때 귀족들이 정사암에 모여 함께 정했어요. 귀족들이 왕과 한마음이 되었어요." },
      har_hunt: { kings: "백제의 왕들 (사냥과 활쏘기)" },
    },
    R: {
      law: { kings: "법흥왕 (520)" }, rank: { sub: "17관등 · 공복", kings: "법흥왕" },
      local: { sub: "주·군에 관리 보내기 (군주)", kings: "지증왕 (이사부를 군주로)" },
      marriage: { kings: "신라 왕실 (김씨 왕과 박씨 왕비)" },
      hostage: { sub: "상수리 제도", kings: "통일 신라", name: "지방 세력의 자식을 도읍에 머물게 하기",
        text: "지방 세력의 자식을 도읍 금성에 머물게 했어요. 지방 세력이 함부로 움직이기 어려워졌지만, 자식을 보낸 집안들은 서운해했어요.", sl: "지방 세력의 자식들이 금성에 오니, 처음 본 첨성대 앞에서 입을 다물지 못하였다." },
      capital: { kings: "신문왕 (달구벌 천도를 꿈꿈)" },
      fortress: { sub: "산성 쌓기 (명활산성·삼년산성)", kings: "자비 마립간 · 진흥왕" },
      hwarang: { sub: "화랑도", kings: "진흥왕" },
      alliance: { kings: "눌지왕 (나제 동맹) · 김춘추 (나당 동맹)" },
      trade: { sub: "한강 하류 당항성", kings: "진흥왕", text: () => (S.st.def >= 40 ? "당항성 항구에서 중국으로 가는 배가 떠났어요. 신라가 중국과 바로 오가며 물건과 문화를 들여왔어요." : "항구를 열었지만 고구려·백제가 바닷길을 막아 배들이 자주 돌아왔어요.") },
      festival: { name: "한가위 큰 잔치", sub: "가배", kings: "유리 이사금", text: "여자들이 두 편으로 나뉘어 한 달 동안 길쌈 솜씨를 겨룬 뒤, 8월 보름에 온 나라가 함께 노래하고 춤추었어요(가배).", fail: "잔칫날 장대비가 쏟아져 길쌈한 옷감이 다 젖었어요.", sl: "가배 날 진 편이 술과 음식을 내니, 이긴 편보다 진 편이 더 신나게 춤추었다.", slFail: "가배 날 비가 쏟아지니, 길쌈한 옷감이 빨래처럼 축 늘어졌다." },
      buddhism: { kings: "법흥왕 (527, 이차돈의 순교)" },
      history: { sub: "『국사』", kings: "진흥왕 (거칠부, 545)" },
      school: { sub: "국학", kings: "신문왕 (682)" },
      scholars: { sub: "학자 모으기", kings: "진흥왕 (거칠부) · 신문왕 (설총)" },
      har_council: { name: "화백 회의 열기", sub: "신라의 귀족 회의 (만장일치)", kings: "신라", text: "귀족들이 화백 회의에 모여 한 사람도 빠짐없이 찬성할 때까지 의논해 정했어요. 귀족들이 한마음이 되었어요." },
      har_hunt: { kings: "신라 (화랑과 함께)" },
    },
    // ---------- 고려 ----------
    gor: {
      rank: { sub: "관리의 옷 색 정하기 (공복)", kings: "광종 (960)" },
      local: { sub: "12목에 지방관 (983)", kings: "성종", sl: "왕이 12목에 관리를 보냈다. 호족들이 새 관리를 보고 '어디서 굴러온 돌이냐'며 수군거렸다." },
      exam: { sub: "과거제 (958, 쌍기의 건의)", kings: "광종" },
      capital: { sub: "도읍 옮기기", kings: "태조 왕건 (철원 → 송악, 919)" },
      hwarang: { name: "광군 조직하기", sub: "거란에 대비한 30만 군대 (947)", kings: "정종", text: "농민들을 모아 30만 광군을 꾸리고 무예를 익히게 했어요. 북쪽 거란에 맞설 준비를 했어요.", sl: "광군 30만이 훈련하니, 개경 들판의 메뚜기들이 놀라 모두 남쪽으로 날아갔다." },
      fortress: { sub: "천리장성 (1033~1044)", kings: "덕종 · 정종", text: "압록강에서 동해안까지 천 리에 걸쳐 성을 쌓았어요. 거란과 여진이 쉽게 넘어오지 못하게 되었어요." },
      disband: { sub: "호족의 군대 줄이기", kings: "광종", text: () => "힘센 호족들이 거느리던 군사를 나라 군대로 합쳤어요. 이제 군사를 움직일 수 있는 사람은 왕뿐이에요.", fail: "호족들이 군사를 내놓지 않고 거세게 반발했어요. 왕의 힘이 아직 모자랐어요." },
      alliance: { sub: "중국 여러 나라와 외교", kings: "태조 왕건 (후당·오월)" },
      purge: { sub: "공신 숙청", kings: "광종" },
      relief: { sub: "흑창 · 의창", kings: "태조 왕건 · 성종" },
      coin: { sub: "건원중보 (996)", kings: "성종 · 숙종 (해동통보)" },
      trade: { sub: "벽란도", kings: "고려 (송·아라비아 상인)" },
      canal: { sub: "벽골제 고쳐 쌓기", kings: "현종 · 인종" },
      buddhism: { name: "불교를 나라의 중심으로 삼기", sub: "훈요 10조 · 연등회", kings: "태조 왕건", text: () => "절을 세우고 연등회를 나라의 행사로 삼았어요. 사람들이 같은 믿음으로 묶이고, 불교 문화가 꽃피었어요.", note: "왕권이 40보다 낮으면 절을 세우는 일을 두고 호족들이 다투어요." },
      history: { sub: "실록 · 『삼국사기』", kings: "현종 (7대 실록) · 인종 (김부식, 1145)" },
      school: { sub: "국자감 (992)", kings: "성종" },
      scholars: { sub: "보문각 · 청연각", kings: "예종", note: "왕권이 안정된 뒤(숙청 뒤)에 하면 더 좋아요(광종의 개혁 뒤처럼)." },
      science: { name: "하늘과 날씨를 살피는 관청", sub: "사천대 · 개경 첨성대", kings: "고려", text: () => (S.flags.talent ? "신분이 낮았던 천문 기술자가 앞장서 별과 날씨를 살폈어요. 씨 뿌릴 때를 정확히 알려 농사가 훨씬 잘되었어요." : "사천대를 두어 별과 날씨를 살피고 농사철을 알렸어요."), sl: "사천대 관리가 밤새 별을 세다가 새벽에 해가 뜨자 '하나 늘었다' 하였다." },
      har_council: { name: "도병마사 회의 열기", sub: "고려의 큰 회의", kings: "고려" },
      har_hunt: { name: "신하들과 함께하는 격구 대회", sub: "격구 (말 타고 공 치기)", kings: "고려의 왕들", text: () => "왕과 신하들이 말을 타고 막대로 공을 치며 하루를 보냈어요. 경기보다 웃음이 더 많았어요!", fail: "하루 종일 비가 내려 격구장은 진흙탕이 되고, 모두 감기에 걸렸어요.", sl: "격구 대회가 열리니, 왕이 친 공이 신하의 모자를 맞혀 모두 배를 잡고 웃었다.", slFail: "격구 날 장대비가 내리니, 말들이 진흙탕에서 미끄러져 엉덩방아를 찧었다." },
    },
    // ---------- 조선 전기 (세종) ----------
    jo1: {
      local: { note: "매 시기 세금 수입이 늘어요." },
      alliance: { name: "명과 사대, 이웃과 교린", sub: "사대 교린 외교", kings: "세종", text: "큰 나라 명과는 예를 갖추어 지내고, 일본·여진과는 이웃으로 사귀었어요. 전쟁 때 도움을 받을 수 있게 되었지만 명의 눈치를 보게 되었어요." },
      purge: { kings: "태종 (외척 민씨 형제 정리)" },
      fortress: { sub: "북쪽 국경에 성 쌓기 (행성)", kings: "세종" },
      taxcut: { sub: "세금 덜어 주기", kings: "세종" },
      relief: { sub: "의창 · 구휼", kings: "세종" },
      coin: { sub: "조선통보 (1423)", kings: "세종", text: () => (S.st.ppl >= 40 ? "구리로 조선통보를 만들어 장터에서 쓰게 했어요. 물건 사고팔기가 편해지고 세금 걷기도 쉬워졌어요." : "조선통보를 만들었지만 백성들이 믿지 않아 여전히 쌀과 무명으로 사고팔았어요."), sl: "조선통보가 처음 나오니, 장터 사람들이 동전을 깨물어 보고 '쌀보다 딱딱하다' 하였다." },
      trade: { name: "왜와 무역하는 항구 열기", sub: "삼포 개항 · 계해약조 (1443)", kings: "세종", text: () => (S.st.def >= 40 ? "부산포·제포·염포 세 항구를 열어 정해진 곳에서만 왜와 무역하게 했어요. 왜구가 줄고 물건이 오갔어요." : "항구를 열었지만 수군이 약해 왜구가 다시 나타났어요."), sl: "삼포에 왜관이 서니, 대마도 상인들이 조선 엿을 사 가며 이가 붙었다." },
      canal: { sub: "저수지·제방 쌓기", kings: "태종 · 세종 (벽골제 고쳐 쌓기)" },
      festival: { name: "어르신들을 모시는 큰 잔치", sub: "양로연", kings: "세종 (신분을 가리지 않고 초대)", text: "80세가 넘은 어르신이라면 양반이든 천민이든 모두 궁궐 잔치에 초대했어요. 온 나라가 왕의 마음을 칭찬했어요.", fail: "잔칫날 장대비가 쏟아져 음식이 모두 젖고, 어르신들이 감기에 걸렸어요.", note: "모험! 날씨가 좋으면 온 나라가 하나가 되고, 날씨가 궂으면 돈만 날려요.", sl: "양로연에 초대받은 노비 할아버지가 왕이 따라 준 술잔을 받고 눈물을 훔쳤다.", slFail: "양로연 날 비가 쏟아지니, 어르신들이 차일 아래 모여 젊은 시절 이야기로 밤을 새웠다." },
      history: { sub: "실록 · 『고려사』", kings: "세종 · 문종" },
      har_council: { name: "의정부 대신들과 함께 정하기", sub: "의정부 서사제 (1436)", kings: "세종" },
      har_hunt: { name: "신하들과 함께하는 강무", sub: "강무 (임금의 사냥 훈련)", kings: "세종" },
    },
    // ---------- 조선 중기·후기 ----------
    jo2: {
      local: { sub: "지방관 보내기 (수령)", note: "매 시기 세금 수입이 늘어요." },
      purge: { sub: "환국 · 숙청", kings: "숙종 (환국)" },
      fortress: { sub: "성 고쳐 쌓기" },
      taxcut: { sub: "세금 덜어 주기", kings: "조선의 왕들" },
      relief: { sub: "환곡 · 진휼", kings: "조선의 왕들" },
      survey: { name: "땅을 다시 재어 세금 고르게 하기", sub: "양전", kings: "인조 (갑술양전, 1634) · 숙종", text: () => "온 나라의 땅을 다시 재어 숨겨진 땅을 찾아내고, 땅의 크기와 좋고 나쁨에 따라 세금을 고르게 매겼어요.", sl: "양전 관리들이 줄자로 논을 재니, 논두렁의 개구리들이 자기 집도 재 달라며 울었다." },
      coin: { sub: "상평통보", kings: "인조 · 효종 · 숙종" },
      trade: { sub: "청·일본과 무역 (만상·내상·왜관)", kings: "조선 후기 상인들", text: () => (S.st.def >= 40 ? "의주의 만상과 동래의 내상이 청나라·일본과 무역을 크게 벌였어요. 인삼과 비단, 은이 오갔어요." : "무역을 허락했지만 국경과 바다가 어지러워 이익이 줄었어요."), sl: "만상이 청나라 비단을 싣고 오니, 한양 아낙들이 비단 한 필에 사흘 동안 수다를 떨었다." },
      canal: { sub: "저수지·제방 정비 (제언)", kings: "제언사" },
      festival: { name: "어르신들을 모시는 큰 잔치", sub: "양로연", kings: "조선의 왕들", text: "나이 많은 어르신들을 궁궐로 모셔 잔치를 열었어요. 온 나라가 효를 높이는 왕을 칭찬했어요.", fail: "잔칫날 장대비가 쏟아져 음식이 모두 젖었어요.", sl: "양로연에서 백 살 어르신이 춤을 추니, 젊은 신하들이 따라 하다 허리를 삐끗하였다.", slFail: "양로연 날 비가 쏟아지니, 떡이 눅눅해져 어르신들이 숟가락으로 떠 드셨다." },
      history: { sub: "실록 · 『국조보감』", kings: "조선의 왕들" },
      scholars: { sub: "홍문관 · 규장각", kings: "숙종 · 정조" },
      science: { sub: "농사 기술 되살리기", kings: "조선 후기 왕들" },
      tangpyeong: { kings: "숙종 (박세채의 건의) · 영조 · 정조" },
      daedong: { kings: "광해군 (1608) · 김육" },
      har_council: { name: "비변사 회의 열기", sub: "조선의 큰 회의", kings: "조선 중기·후기" },
      har_hunt: { name: "신하들과 함께하는 강무", sub: "강무 (임금의 사냥 훈련)", kings: "조선의 왕들" },
    },
    E: {
      fortress: { name: "산성과 읍성 고쳐 쌓기", sub: "성 고쳐 쌓기", kings: "선조 · 류성룡", text: "무너진 산성과 고을의 성을 고쳐 쌓고 군사를 두었어요. 왜군이 쳐들어와도 버티기 쉬워졌어요." },
      alliance: { name: "명나라에 구원군 청하기", sub: "명의 원군", kings: "선조 · 이항복", text: "명나라에 사신을 보내 구원군을 청했어요. 명군이 압록강을 건너왔지만, 명군 장수들의 요구를 들어주느라 눈치를 보게 되었어요." },
      slaves: { name: "공을 세운 노비 풀어 주기", sub: "면천 (곡식을 바치거나 공을 세우면)", kings: "선조", note: "싸우겠다는 사람과 나라 곡식이 늘어요. 노비를 잃는 양반들이 크게 반발해요.", text: "곡식을 바치거나 전쟁에서 공을 세운 노비를 양인으로 올려 주었어요. 싸우겠다는 사람이 늘었지만 양반들은 크게 반발했어요.", sl: "면천첩을 받은 노비가 첩을 품에 안고 잠들었다." },
      trade: { sub: "중강 개시 (1593, 명과의 국경 시장)", kings: "선조" },
      history: { sub: "『징비록』", kings: "류성룡", text: "전쟁의 잘못을 되풀이하지 않도록 겪은 일을 꼼꼼히 적어 책으로 남겼어요(『징비록』). 백성과 신하들이 지난 일을 돌아보게 되었어요." },
      science: { name: "무기와 농사 기술 되살리기", sub: "비격진천뢰 · 농서", kings: "선조 · 이장손", text: () => "새 무기(비격진천뢰)를 만들고, 전쟁으로 망가진 논밭을 살리는 농사 책을 펴냈어요.", sl: "비격진천뢰가 터지니, 왜군이 하늘에서 떨어진 박이 깨진 줄 알고 놀라 달아났다." },
      coin: { sub: "동전 다시 쓰기", kings: "선조 · 인조" },
      survey: { kings: "선조 (전쟁 뒤 땅 다시 재기)" },
    },
    F: {
      fortress: { name: "남한산성 고쳐 쌓기", sub: "남한산성 (1624~1626)", kings: "인조 · 이서", text: "도읍 가까운 남한산성을 크게 고쳐 쌓고 군량을 쌓아 두었어요. 위급할 때 들어가 버틸 곳이 생겼어요." },
      alliance: { name: "명과의 의리 지키며 청과 화친", sub: "외교", kings: "인조 · 최명길", text: "명과의 의리를 지키면서도 후금(청)과 형제의 약속을 맺어 전쟁을 피하려 했어요. 두 나라 사이에서 눈치를 보게 되었어요." },
      daedong: { sub: "대동법 넓히기 (강원도, 1623)", kings: "인조 · 김육" },
      trade: { sub: "중강·회령 개시 (청과의 국경 시장)", kings: "인조" },
      science: { name: "서양 달력과 새 기술 배우기", sub: "시헌력 (1653)", kings: "인조 · 효종 · 김육", text: () => "청나라를 통해 서양의 달력(시헌력)과 새 기술을 배워 농사철을 더 정확히 알게 되었어요.", sl: "서양 달력을 받아 든 관리가 날짜를 세다가 '하루가 어디 갔느냐' 하였다." },
      coin: { sub: "상평통보 (1633)", kings: "인조" },
    },
    K: {
      relief: { sub: "진휼청 (굶는 백성 구하기)", kings: "현종" },
      daedong: { sub: "대동법 넓히기 (전라도, 1662)", kings: "현종 · 김육" },
      scholars: { name: "나라를 바꿀 학자 모으기", sub: "실학 (유형원 『반계수록』, 1670)", kings: "현종 무렵" },
      fortress: { sub: "강화도 돈대 쌓기", kings: "현종 · 숙종" },
      science: { name: "서양 달력과 새 기술 배우기", sub: "시헌력", kings: "효종 · 현종", text: () => "서양의 달력(시헌력)과 새 기술을 받아들여 농사철을 더 정확히 알게 되었어요.", sl: "서양 달력을 받아 든 관리가 날짜를 세다가 '하루가 어디 갔느냐' 하였다." },
    },
    V: {
      purge: { kings: "숙종 (환국) · 영조 (신임옥사 정리)" },
      fortress: { sub: "도읍 둘레 성 고쳐 쌓기 (탕춘대성)", kings: "숙종 · 영조" },
      survey: { kings: "숙종 (경자양전, 1720)" },
      history: { sub: "『동국문헌비고』 (1770)", kings: "영조" },
      scholars: { sub: "홍문관 · 규장각", kings: "영조 · 정조" },
      science: { name: "측우기 다시 만들기", sub: "측우기 (1770)", kings: "영조", text: () => (S.flags.talent ? "신분이 낮았던 기술자가 앞장서 세종 때의 측우기를 다시 만들었어요. 비의 양을 재어 농사가 훨씬 잘되었어요." : "세종 때의 측우기를 다시 만들어 고을마다 비의 양을 재게 했어요.") },
      relief: { sub: "환곡 바로잡기 · 진휼", kings: "영조" },
      tangpyeong: { kings: "영조 (1724~)" },
      har_hunt: { name: "신하들과 함께하는 큰 활쏘기", sub: "대사례 (1743)", kings: "영조", text: () => "성균관에서 왕과 신하들이 함께 활을 쏘며 예를 다졌어요. 노론과 소론이 한자리에서 웃었어요!", fail: "활쏘기 날 비바람이 불어 화살이 엉뚱한 데로 날아갔어요. 서로 탓하다 끝났어요.", sl: "대사례에서 왕의 화살이 과녁에 꽂히니, 노론과 소론이 함께 '명중이오!' 하고 외쳤다.", slFail: "대사례 날 바람이 불어 화살이 구경꾼 갓에 꽂히니, 노론과 소론이 서로 상대 편 화살이라 우겼다." },
    },
    // ---------- 대한 제국 (나라를 빼앗기기 전) ----------
    dh: {
      // 대한 제국이 처음부터 가진 제도: 갑오개혁(1894)·을미개혁(1895)으로 바뀐 모습
      law: { name: "근대식 법 세우기", sub: "홍범 14조 (1895)", kings: "고종", note: "나라를 새롭게 바꾸겠다는 14가지 약속을 세상에 알렸어요." },
      rank: { name: "새 관청과 관리 제도", sub: "갑오개혁의 관제", kings: "고종" },
      local: { name: "13도 지방 제도", sub: "지방 제도 개편 (1896)", kings: "고종", note: "지방을 13도로 새로 나누어 관리를 보냈어요." },
      exam: { name: "과거제 대신 새 관리 뽑기", sub: "과거제 폐지 (1894)", kings: "고종", note: "과거 시험 대신 새 학문을 익힌 사람을 관리로 뽑았어요." },
      slaves: { name: "신분제 없애기", sub: "갑오개혁 (1894)", kings: "고종", note: "양반과 천민의 구분, 노비 제도를 법으로 없앴어요." },
      coin: { name: "근대 화폐 쓰기", sub: "백동화 · 신식 화폐", kings: "고종" },
      daedong: { name: "세금을 돈으로 내기", sub: "갑오개혁 (1894)", kings: "고종", note: "쌀과 옷감 대신 돈으로 세금을 내게 했어요." },
      school: { name: "근대 학교 세우기", sub: "육영 공원 · 한성 사범 학교", kings: "고종" },
      hangeul: { name: "한글을 나라 글자로", sub: "국문 (1894)", kings: "고종 · 주시경", note: "나라의 공문서를 한글(국문)로 쓰기 시작했어요." },
      alliance: { name: "열강의 힘 빌리기", sub: "러시아·미국과 외교", kings: "고종", text: "러시아·미국 공사관에 사람을 보내 일본을 막아 달라고 청했어요. 일본을 견제할 수 있었지만, 열강들이 그 대가로 더 많은 이권을 요구했어요.", sl: "황제의 밀사가 공사관을 드나드니, 공사관 문지기가 밀사 얼굴을 외워 인사를 먼저 하였다." },
      taxcut: { name: "탐관오리 벌주고 세금 덜기", sub: "동학 농민군의 요구 받아들이기", kings: "고종", text: "백성을 괴롭히던 관리들을 벌주고 억지로 걷던 세금을 없앴어요. 백성들은 기뻐했지만 나라 곳간은 줄었어요.", sl: "탐관오리가 쫓겨나니, 고을 사람들이 그 집 대문에 '잘 가시오' 하고 크게 써 붙였다." },
      relief: { name: "굶는 백성 돕기", sub: "혜민원 (1901)", kings: "고종", text: "흉년이 들자 혜민원을 세워 굶는 백성에게 곡식을 나누고 병든 사람을 돌보았어요.", sl: "혜민원 앞에 줄이 길어지니, 줄 선 아이들이 앞사람 등에 대고 글자 놀이를 하였다." },
      survey: { name: "땅을 재고 땅문서 나눠 주기", sub: "광무 양전 · 지계 (1898~1904)", kings: "고종 (광무개혁)", note: "땅 주인을 분명히 해 외국인이 땅을 함부로 사들이지 못하게 해요. 매 시기 수입이 늘어요.", text: () => "온 나라의 땅을 재고, 땅 주인에게 나라가 보증하는 땅문서(지계)를 나눠 주었어요. 세금이 고르게 걷히고, 외국인이 우리 땅을 함부로 사들이지 못하게 되었어요.", sl: "땅문서를 받은 농부가 문서를 장롱 깊숙이 넣고는 하루에 세 번씩 꺼내 보았다." },
      trade: { name: "개항장에 우리 상회 세우기", sub: "인천·부산·원산 개항장", kings: "고종", note: "매 시기 수입이 크게 늘어요. 국방이 40보다 낮으면 외국 상인들에게 밀려 이익이 줄어요.", text: () => (S.st.def >= 40 ? "개항장에 우리 상회와 회사를 세워 외국 상인들과 겨루었어요. 쌀과 콩을 팔고 옷감과 석유를 사들였어요." : "개항장을 열었지만 일본·청나라 상인들이 장사를 휩쓸어 우리 상인들의 몫이 줄었어요."), sl: "개항장에 석유 등잔이 들어오니, 밤에도 장부를 쓰던 상인이 밤새 웃음을 감추지 못하였다." },
      history: { name: "나라를 일깨우는 역사책 펴내기", sub: "애국 계몽 역사책 (『을지문덕전』 등)", kings: "신채호 · 장지연", text: "을지문덕·이순신 같은 영웅의 이야기를 책으로 펴냈어요. 사람들이 '우리도 나라를 지킬 수 있다'는 자신감을 갖게 되었어요.", sl: "『을지문덕전』을 읽은 아이들이 막대기를 들고 살수 대첩 놀이를 하였다." },
      science: { name: "새 기술 배우기", sub: "유학생 보내기 · 상공 학교 (1899)", kings: "고종", note: "매 시기 수입이 늘어요.", text: () => "외국에 유학생을 보내고 상공 학교를 세워 기계와 전기, 공장 짓는 기술을 배웠어요.", sl: "상공 학교 학생이 처음 전구에 불을 켜니, 구경하던 할머니가 촛불을 끄고 절을 하였다." },
      har_council: { name: "만민 공동회 열기", sub: "독립 협회 (1898)", kings: "서재필 · 이상재", note: "백성과 관리가 함께 나랏일을 토론해요. 다툼이 심할수록(화합 35 미만) 효과가 커져요. 3시기마다 다시 열 수 있지만, 되풀이하면 효과가 줄어요.", text: () => "종로 거리에 관리와 백성이 함께 모여 나랏일을 토론했어요. 서로의 생각을 듣고 한마음이 되었어요.", sl: "만민 공동회에서 백정 박성춘이 연설하니, 양반들도 귀 기울여 들었다." },
    },
    // ---------- 나라를 빼앗긴 뒤 (독립운동) ----------
    dh2: {
      alliance: { name: "연합국과 손잡기", sub: "중국 정부·미국의 도움", kings: "김구 · 이승만", text: "중국 정부와 연합국에 독립을 도와 달라고 청했어요. 함께 싸울 힘을 얻었지만 강대국들의 눈치를 보게 되었어요.", sl: "임시 정부가 연합국과 손잡으니, 광복군 막사에 처음 보는 깡통 음식이 들어왔다." },
      history: { name: "우리 역사 지키기", sub: "『한국통사』 · 『조선상고사』", kings: "박은식 · 신채호", text: "일제가 우리 역사를 깎아내릴 때, 역사학자들이 우리 역사의 자랑스러운 모습을 책으로 펴냈어요. '나라는 형체이고 역사는 정신'이라고 했어요.", sl: "역사책을 몰래 돌려 읽으니, 책장이 닳아 마지막 쪽은 손으로 다시 베껴 썼다." },
    },
  };
  // 시대에 맞지 않는 정책은 감춰요
  const ERA_HIDE = { P: ["slaves", "disband", "hostage"], Q: ["slaves", "disband", "hostage"], R: ["slaves", "disband"], T: ["survey"],
    U: ["marriage", "hostage", "tangpyeong", "military_tax", "daedong"],
    E: ["conquest", "hwarang", "capital", "voyage", "buddhism", "marriage", "hostage", "disband", "tangpyeong", "daedong", "military_tax", "festival", "hangeul"],
    F: ["conquest", "hwarang", "capital", "voyage", "buddhism", "marriage", "hostage", "disband", "military_tax", "hangeul", "slaves"],
    K: ["hangeul", "military_tax"], V: ["marriage", "hostage"], J: ["har_hunt"] };
  for (const [k, ids] of Object.entries(ERA_HIDE)) if (SCEN[k]) SCEN[k].hide = [...new Set([...(SCEN[k].hide || []), ...ids])];

  let ERA_BASE = null;
  // 조금만 더(v2_ext.js)에서는 새 시대의 이름이 맨 위에 덮여요
  const eraTxt = (id) => { const x = extTxt(id), e = ERA_OF(); if (!e) return x; const a = ERA_TXT[e] && ERA_TXT[e][id], b = ERA_TXT[S.scen] && ERA_TXT[S.scen][id]; return a || b || x ? Object.assign({}, a, b, x) : null; };
  function eraApply() {
    if (!ERA_BASE) {
      ERA_BASE = {};
      const ids = new Set([...Object.values(ERA_TXT).flatMap((o) => Object.keys(o)), ...extIds()]);
      for (const id of ids) {
        const p = P[id]; if (!p) continue;
        ERA_BASE[id] = { name: p.name, sub: p.sub, kings: p.kings, note: Object.getOwnPropertyDescriptor(p, "note") };
        const orig = p.run;
        p.run = function (...a) {
          const r = orig.apply(this, a), o = eraTxt(id);
          if (o && r) {
            const ok = r.ok !== false;
            if (ok && o.text) r.text = typeof o.text === "function" ? o.text(r) : o.text;
            if (!ok && o.fail) r.text = o.fail;
            if (ok && o.sl) r.sl = o.sl; if (!ok && o.slFail) r.sl = o.slFail;
          }
          return r;
        };
      }
    }
    for (const [id, b] of Object.entries(ERA_BASE)) {
      const p = P[id], o = eraTxt(id) || {};
      p.name = o.name || b.name; p.sub = o.sub || b.sub; p.kings = o.kings || b.kings;
      if (o.note) Object.defineProperty(p, "note", { value: o.note, writable: true, configurable: true, enumerable: true });
      else if (b.note) Object.defineProperty(p, "note", b.note); else delete p.note;
    }
    coreApply();
  }

  // ================= 대한 제국만의 정책 =================
  const jPre2 = () => !(S.flags && S.flags.lost), jPost2 = () => !!(S.flags && S.flags.lost);
  PP({ id: "jschool", scen: ["J"], phase: jPre2, cat: "cul", name: "민족 학교 세우기", sub: "신민회 · 대성학교 · 오산학교 (1907~)", kings: "안창호 · 이승훈", cost: 2, eff: { cul: 10, ppl: 5, gold: -5 }, tags: [-0.2, -0.8, 0.5],
    note: "애국 계몽 운동! 나라를 지킬 힘은 배움에서 나온다며 곳곳에 학교를 세워요.",
    run() { return R({ cul: 10, ppl: 5, gold: -5 }, "'힘을 길러야 나라를 지킨다'며 전국에 학교 수천 곳이 세워졌어요. 학생들이 우리 역사와 새 학문을 함께 배웠어요.", this.tags, { sl: "오산학교 학생들이 운동장에서 체조를 하니, 지나가던 갓 쓴 선비가 따라 팔을 휘둘렀다." }); } });
  PP({ id: "jmilitia", scen: ["J"], phase: jPre2, cat: "mil", name: "의병 돕기", sub: "을미·을사·정미의병", kings: "유인석 · 신돌석 · 민긍호", cost: 2, eff: { def: 9, ppl: 5, gold: -6 }, tags: [0.2, 0.8, 0.4],
    note: "전국에서 일어난 의병에게 무기와 식량을 보내요. 나라를 빼앗길 위기 때 힘이 돼요.",
    run() { S.flags.militiaJ = true; return R({ def: 9, ppl: 5, gold: -6 }, "양반 유생부터 평민·해산된 군인까지 의병이 되어 일본군과 싸웠어요. 고을 사람들이 몰래 쌀과 짚신을 보냈어요.", this.tags, { sl: "평민 의병장 신돌석이 산을 넘나드니, 일본군이 '태백산 호랑이'라 부르며 산길을 피하였다." }); } });
  PP({ id: "jgate", scen: ["J"], phase: jPre2, cat: "men", name: "독립문 세우기", sub: "독립 협회 (1897)", kings: "서재필 · 독립 협회", cost: 1, eff: { har: 5, cul: 3, kp: 2, gold: -4 }, tags: [-0.4, -0.3, 0.3],
    note: "온 나라 사람들이 돈을 모아 '우리는 독립국'이라는 뜻을 담은 문을 세워요.",
    run() { return R({ har: 5, cul: 3, kp: 2, gold: -4 }, "황태자부터 시장 상인까지 돈을 모아, 청나라 사신을 맞던 영은문 자리에 독립문을 세웠어요.", this.tags, { sl: "독립문이 완성되니, 지나가던 아이들이 문 아래를 몇 번이나 오가며 '독립!' 하고 외쳤다." }); } });
  PP({ id: "jbank", scen: ["J"], phase: jPre2, cat: "eco", name: "우리 은행 세우기", sub: "대한천일은행 (1899)", kings: "고종 · 우리 상인들", cost: 2, eff: { gold: 3, kp: 2 }, inc: 1, tags: [0.2, -0.2, 0.2],
    note: "우리 상인에게 돈을 빌려줘 외국 은행에 맞서요. 매 시기 수입이 늘어요.",
    run() { addInc(1); return R({ gold: 3, kp: 2 }, "황실과 우리 상인들이 돈을 모아 은행을 세웠어요. 우리 상인들이 일본 은행에 기대지 않고 장사 밑천을 빌릴 수 있게 되었어요.", this.tags, { sl: "우리 은행이 문을 여니, 첫 손님인 엿장수가 엿판을 맡기려다 거절당하였다." }); } });
  PP({ id: "jdokdo", scen: ["J"], phase: jPre2, cat: "law", name: "울릉도·독도를 우리 땅으로 알리기", sub: "대한 제국 칙령 제41호 (1900)", kings: "고종", cost: 1, eff: { kp: 3, cul: 3, def: 1 }, tags: [0.4, 0.2, 0],
    lockIf: () => (S.flags.dokdo ? "이미 알렸어요" : null),
    note: "울릉도를 군으로 높이고, 독도(석도)까지 다스린다고 관보에 실어 세계에 알려요.",
    run() { S.flags.dokdo = true; return R({ kp: 3, cul: 3, def: 1 }, "울릉도를 울도군으로 높이고, 울도 군수가 독도(석도)까지 다스린다고 관보에 실었어요. 동해의 섬들이 우리 땅임을 법으로 분명히 했어요.", this.tags, { sl: "칙령이 관보에 실리니, 독도 바위 위의 강치들이 큰 소리로 울었다." }); } });
  PP({ id: "jgando", scen: ["J"], phase: jPre2, cat: "men", name: "간도에 관리 보내기", sub: "간도 관리사 (1903)", kings: "고종 · 이범윤", cost: 1, gamble: true, risky: true, eff: { kp: 3, ppl: 3, def: 2 }, fail: { kp: -2, gold: -3 }, tags: [0.4, 0.4, 0],
    chance() { return S.st.def >= 40 ? 0.6 : 0.45; },
    note: "모험! 두만강 건너 간도에 사는 우리 백성을 지키러 관리를 보내요. 국방이 40 이상이면 청나라의 반발을 이겨 내기 쉬워요.",
    run() { if (Math.random() < this.chance()) return R({ kp: 3, ppl: 3, def: 2 }, "간도에 사는 우리 백성 수만 명이 '나라가 우리를 잊지 않았다'며 기뻐했어요. 관리사가 백성을 보호하고 세금을 걷었어요.", this.tags, { sl: "간도 관리사가 도착하니, 간도 농부들이 대한 제국 깃발을 논두렁마다 꽂았다." });
      return R({ kp: -2, gold: -3 }, "청나라 관리들이 거세게 반발해 관리사가 힘을 쓰지 못했어요.", this.tags, { ok: false, sl: "간도 관리사가 청나라 관리와 말다툼을 하다, 통역이 지쳐 먼저 잠들었다." }); } });
  PP({ id: "jchild", scen: ["J"], phase: jPost2, cat: "cul", name: "어린이날 만들기", sub: "색동회 (1923)", kings: "방정환", cost: 1, eff: { ppl: 4, cul: 3, har: 2, gold: -3 }, tags: [-0.3, -0.6, 0.7],
    note: "'어린이를 내려다보지 말고 쳐다보아 주시오.' 아이들이 나라의 내일이라며 어린이날을 만들어요.",
    run() { return R({ ppl: 4, cul: 3, har: 2, gold: -3 }, "방정환이 '어린이'라는 말을 널리 쓰고 어린이날을 만들었어요. 아이들이 잡지 『어린이』를 돌려 읽으며 꿈을 키웠어요.", this.tags, { sl: "어린이날 행사에 모인 아이들이 노래를 부르니, 순사가 따라 부르다 헛기침을 하였다." }); } });
  PP({ id: "jpatriot", scen: ["J"], phase: jPost2, cat: "mil", name: "한인 애국단 만들기", sub: "윤봉길 의거 (1932)", kings: "김구 · 윤봉길", cost: 2, gamble: true, risky: true, eff: { kp: 6, ppl: 6, gold: 4 }, fail: { def: -6, gold: -5, kp: -3 }, tags: [0.4, 0.7, 0.2],
    chance() { return S.flags.govt ? 0.5 : 0.35; },
    note: "모험! 성공하면 세계가 독립운동에 주목하고 중국이 임시 정부를 돕기 시작해요. 임시 정부가 있으면 성공하기 쉬워요.",
    run() { if (Math.random() < this.chance()) return R({ kp: 6, ppl: 6, gold: 4 }, "윤봉길의 의거 소식이 세계에 퍼지자 중국 지도자가 '중국 백만 대군도 못 한 일을 한 청년이 해냈다'며 임시 정부를 돕기 시작했어요.", this.tags, { sl: "의거 소식을 들은 중국 사람들이 임시 정부 청사 앞에 쌀가마를 쌓아 놓고 갔다." });
      return R({ def: -6, gold: -5, kp: -3 }, "계획이 미리 새어 나가 일본 경찰의 감시가 더 심해졌어요.", this.tags, { ok: false, sl: "일본 경찰이 거리마다 검문을 하니, 독립운동가들이 하루에 옷을 세 번씩 갈아입었다." }); } });

  // ================= 나라의 기틀이 되는 핵심 정책 =================
  // 교과서에서 그 시대 발전의 열쇠로 배우는 정책. 다른 정책보다 언제나 효과가 커요.
  const CORE = {
    P: ["law", "rank", "buddhism", "school"], Q: ["law", "rank", "buddhism", "trade"], R: ["law", "rank", "buddhism", "hwarang"],
    T: ["marriage", "hostage", "exam", "slaves", "local", "school"],
    U: ["scholars", "hangeul", "science", "survey"], V: ["tangpyeong", "military_tax"], E: ["e_hun", "e_navy"], F: ["daedong"], K: ["daedong", "relief", "kjinhyul"],
    J: ["survey", "jarmy", "jnews", "jdebt", "jschool", "jmilitia", "jgov", "jcorps", "jbase", "jword", "jedu", "jbuy"],
  };
  const isCore = (p) => { const L = extCore() || CORE[S.scen]; return !!(L && L.includes(p.id)); };
  // 핵심 정책은 좋은 효과는 크게(×1.4), 나쁜 효과는 작게(×0.6) 나타나요.
  const coreScale = (d) => { const o = {}; for (const [k, v] of Object.entries(d || {})) o[k] = v > 0 ? Math.round(v * 1.4) : Math.round(v * 0.6); return o; };
  const CORE_BASE = {};
  for (const id of new Set(Object.values(CORE).flat())) {
    const p = P[id]; if (!p) continue;
    CORE_BASE[id] = p.eff;
    const orig = p.run;
    p.run = function (...a) { const r = orig.apply(this, a); if (r && isCore(this)) r.d = coreScale(r.d); return r; };
  }
  function coreApply() { for (const [id, e] of Object.entries(CORE_BASE)) P[id].eff = isCore(P[id]) ? coreScale(e) : e; }
