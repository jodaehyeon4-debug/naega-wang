  // ================= 역사 속 '아쉬운 왕' (2026-10-15) =================
  // 왕력 티어가 C~F일 때는 닮은 왕을 이 목록에서 골라요. 나라를 어렵게 만든 실제 왕의 이야기와 '배울 점'을 함께 보여 줘요.
  // weak: 그 왕 때 무너진 능력치 — 내 판에서 가장 낮은(또는 0이 된) 능력치와 맞으면 크게 닮았다고 봐요.
  const BAD_KINGS = [
    { id: "bongsang", n: "봉상왕", hz: "烽上王", era: "고구려", v: [0.8, 0.2, -0.6, 0.5], sig: ["purge", "f:bigpalace"], weak: ["ppl", "har", "def"], pt: { hat: "gogu", robe: "#5B3A55", beard: "mustache", item: "none", brow: "fierce", frown: true },
      bio: "숙부와 동생을 의심해 죽였어요. 선비족 모용외가 거듭 쳐들어오고 흉년으로 백성이 굶주리는데도 열다섯 살 넘은 백성을 모두 불러 궁궐을 고쳤어요. 재상 창조리가 말렸지만 듣지 않았고, 결국 신하들이 왕을 몰아냈어요.",
      lesson: "백성이 굶을 때 왕의 일은 궁궐이 아니라 곳간을 여는 일이에요." },
    { id: "gaero", n: "개로왕", hz: "蓋鹵王", era: "백제", v: [0.5, -0.3, -0.5, 0.6], sig: ["capital", "fortress", "f:bigpalace"], weak: ["gold", "ppl", "def"], pt: { hat: "baekje", robe: "#4F3A6B", beard: "full", item: "none", frown: true },
      bio: "고구려에서 온 승려 도림과 바둑을 두며, 그의 말에 따라 성과 궁궐을 크게 고치는 공사를 벌였어요. 곳간이 비고 백성이 지친 틈에 장수왕의 군대가 쳐들어와 한성이 무너지고 왕도 목숨을 잃었어요(475). 도림은 장수왕이 보낸 첩자였어요.",
      lesson: "그럴듯한 말일수록 누가, 왜 하는 말인지 따져 봐야 해요." },
    { id: "uija", n: "의자왕", hz: "義慈王", era: "백제", v: [0.6, 0.6, -0.4, 0.4], sig: ["conquest", "purge", "f:bigpalace"], weak: ["def", "har"], pt: { hat: "baekje", robe: "#5A2E5E", beard: "full", item: "none", frown: true },
      bio: "왕이 된 뒤 신라의 성 40여 개를 빼앗을 만큼 용맹했어요. 하지만 말년에는 사치에 빠지고, 바른말을 한 신하 성충을 옥에 가두었어요. 660년 나당 연합군이 쳐들어와 사비성이 무너지며 백제는 멸망했어요.",
      lesson: "처음에 잘했다고 끝까지 잘하는 것은 아니에요. 바른말을 막으면 위험이 보이지 않아요." },
    { id: "gyeongae", n: "경애왕", hz: "景哀王", era: "신라", v: [-0.3, -0.4, -0.4, -0.3], sig: [], weak: ["def", "kp"], pt: { hat: "silla", robe: "#6E4A3A", beard: "goatee", item: "none", frown: true },
      bio: "후삼국의 혼란 속에서 신라는 이미 힘을 잃어 가고 있었어요. 927년 견훤의 후백제군이 경주에 들이닥쳤을 때 왕은 포석정에 있었고, 끝내 목숨을 잃었어요. 『삼국사기』는 잔치를 벌이던 중이었다고 적었지만, 제사를 지내고 있었다는 해석도 있어요.",
      lesson: "나라를 지킬 힘은 위기가 오기 전에 길러 두어야 해요." },
    { id: "gungye", n: "궁예", hz: "弓裔", era: "후고구려(태봉)", v: [1, 0.5, -0.4, 0.8], sig: ["purge", "capital", "conquest"], weak: ["har", "ppl"], pt: { hat: "goryeo", robe: "#4A2A2A", beard: "full", item: "none", brow: "fierce", frown: true },
      bio: "후고구려를 세워 한때 한반도 중부를 차지했어요. 그러나 스스로 미륵불이라 하며, 사람의 마음을 꿰뚫어 본다는 '관심법'으로 신하와 가족까지 해쳤어요. 결국 신하들이 왕건을 왕으로 세우고 궁예를 몰아냈어요(918).",
      lesson: "힘으로 세운 나라도 사람의 마음을 잃으면 하루아침에 무너져요." },
    { id: "uijong", n: "의종", hz: "毅宗", era: "고려", v: [-0.1, -0.9, -0.3, -0.2], sig: ["school", "buddhism", "f:bigpalace"], weak: ["def", "har"], pt: { hat: "goryeo", robe: "#8A6A3A", beard: "goatee", item: "scroll", frown: true },
      bio: "정자와 연못을 꾸미고 문신들과 시를 짓는 잔치를 즐기며, 무신들을 푸대접했어요. 1170년 분노한 무신들이 정변을 일으켜 왕을 몰아냈고, 그 뒤 100년 동안 무신이 나라를 다스렸어요.",
      lesson: "문화와 국방, 한쪽 신하와 다른 쪽 신하 — 균형이 깨지면 나라가 흔들려요." },
    { id: "injo", n: "인조", hz: "仁祖", era: "조선", v: [0.3, -0.1, -0.6, 0.3], sig: ["f:ally", "purge"], weak: ["def", "gold"], pt: { hat: "ikseon", robe: "#8E2A22", beard: "full", item: "none", frown: true },
      bio: "반정으로 왕이 되었지만, 새로 일어난 후금(청)의 힘을 얕보았어요. 정묘호란과 병자호란을 잇달아 겪고, 남한산성에서 47일을 버티다 삼전도에서 청 황제에게 머리를 숙였어요.",
      lesson: "바깥 세상이 어떻게 바뀌는지 읽지 못하면 큰 대가를 치러요." },
    { id: "cheoljong", n: "철종", hz: "哲宗", era: "조선", v: [-0.8, -0.3, 0.1, -0.6], sig: [], weak: ["kp", "ppl"], pt: { hat: "ikseon", robe: "#9A3A2E", beard: "mustache", item: "none" },
      bio: "강화도에서 농사를 짓던 왕족이 하루아침에 왕이 되어 '강화 도령'이라 불렸어요. 실제 권력은 세도 가문이 쥐어 왕은 뜻을 펴지 못했고, 탐관오리에 시달린 백성들이 1862년 곳곳에서 들고일어났어요.",
      lesson: "왕이 힘을 잃으면, 그 빈자리를 차지한 사람들이 백성을 괴롭히기도 해요." },
    // ---------- 세계 ----------
    { id: "liushan", n: "유선(촉한 후주)", hz: "劉禪", era: "촉한", world: true, home: "Y", v: [-0.7, -0.3, -0.1, -0.5], sig: [], weak: ["kp", "def"], pt: { hat: "myeon", robe: "#3A3A5A", trim: "#8A2A2A", beard: "none", item: "none" },
      bio: "유비의 아들로, 제갈량이 살아 있을 때는 나라 일을 그에게 맡겼어요. 제갈량이 죽은 뒤 환관 황호를 가까이했고, 263년 위나라 군대가 오자 싸우지 않고 항복했어요. 낙양에서 '이곳이 즐거워 촉 생각이 나지 않는다'고 말해 '낙불사촉'이라는 말이 생겼어요.",
      lesson: "좋은 신하가 있어도, 그 뜻을 이어 갈 왕의 의지가 없으면 나라를 지킬 수 없어요." },
    { id: "john", n: "존 왕", hz: "존", era: "잉글랜드", world: true, home: "M", v: [0.6, 0.4, -0.5, 0.4], sig: ["conquest", "purge"], weak: ["har", "gold"], pt: { hat: "crown", hair: "curly", hairColor: "#4A2E1A", robe: "#7A2A2A", beard: "full", item: "none", belt: false, frown: true },
      bio: "프랑스에 있던 땅을 대부분 잃고, 전쟁 비용을 대려고 세금을 마구 걷었어요. 화가 난 귀족들이 들고일어나 1215년 왕의 힘을 법으로 묶는 '마그나 카르타(대헌장)'에 도장을 찍게 했어요. 그 뒤 잉글랜드에는 '존'이라는 이름의 왕이 다시 나오지 않았어요.",
      lesson: "왕도 법 위에 있지 않아요. 오늘날 민주주의의 씨앗이 이 실패에서 자랐어요." },
    Object.assign({}, SPECIAL.louis16, { home: "H", v: [-0.3, -0.2, -0.3, -0.4], sig: ["f:bigpalace"], weak: ["gold", "ppl"],
      lesson: "개혁은 미룰수록 더 어려워져요. 나라 빚과 백성의 굶주림은 기다려 주지 않아요." }),
  ];
  const BAD_TIERS = ["C", "D", "E", "F"];
  function matchBadKings(a) {
    const mine = mineSet(), s = S.st, keys = ST.map((x) => x.k).sort((p, q) => s[p] - s[q]);
    const low1 = S.over && keys.includes(S.over) ? S.over : keys[0], low2 = keys.find((k) => k !== low1);
    return BAD_KINGS.filter(kingPool).map((k) => {
      const dist = Math.sqrt(k.v.reduce((t, v, i) => t + (v - a[i]) ** 2, 0));
      const same = k.sig.filter((x) => mine.has(x));
      const weak = k.weak.includes(low1) ? 1 : k.weak.includes(low2) ? 0.5 : 0;
      const bonus = (sameEra(k) ? 0.12 : 0) + ([].concat(k.home || []).includes(S.scen) ? 0.08 : 0) + ((WORLD() || S.scen === "Y") && k.world ? 0.12 : 0);
      return { k, score: 0.4 * (1 - dist / 4) + 0.25 * (same.length / (k.sig.length + 1)) + 0.35 * weak + bonus, same };
    }).sort((x, y) => y.score - x.score);
  }
  { const ed0 = endData; endData = function () {
    const d = ed0();
    if (!S.end || !BAD_TIERS.includes(S.end.tier)) return d;
    const ranked = matchBadKings(d.a), top = ranked[0];
    // 폭군 기록으로 이미 보여 주는 왕(연산군·루이 16세 등)과 겹치면 빼요
    const specials = d.specials.filter((sp) => sp.id !== top.k.id);
    return Object.assign(d, { ranked, top, pct: likePct(top.score), specials, bad: true });
  }; }
