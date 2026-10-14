  // ================= 역사 속 왕 18명 =================
  // v: [힘/화, 칼/붓, 민/법, 빠/차] · sig: 대표 정책 ("f:"는 사건에서 고른 길) · pt: 어진풍 그림 재료
  const KINGS = [
    { id: "sosurim", n: "소수림왕", hz: "小獸林王", era: "고구려", v: [0.2, -0.6, -0.8, -0.6], sig: ["law", "buddhism", "school"], pt: { hat: "gogu", robe: "#6B3F7A", beard: "mustache", item: "scroll" },
      bio: "율령을 반포하고 불교를 받아들이고 태학을 세웠어요. 나라 안을 단단히 다져, 뒤이은 광개토대왕 때 고구려 전성기의 바탕을 만들었어요." },
    { id: "gwanggaeto", n: "광개토대왕", hz: "廣開土大王", era: "고구려", v: [0.6, 0.95, -0.2, 0.7], sig: ["conquest", "fortress", "hwarang"], pt: { hat: "gogu", robe: "#A3342B", beard: "full", item: "sword", armor: true, brow: "fierce" },
      bio: "만주와 한강 북쪽까지 영토를 크게 넓혔어요. 신라를 도와 왜를 물리치기도 했어요." },
    { id: "jangsu", n: "장수왕", hz: "長壽王", era: "고구려", v: [0.7, 0.5, -0.4, -0.2], sig: ["capital", "conquest", "alliance"], pt: { hat: "gogu", robe: "#4E4A8B", beard: "long", white: true, item: "castle" },
      bio: "평양으로 도읍을 옮기고 남쪽으로 내려가 한강 유역을 차지했어요. 중국의 여러 나라와 외교도 능숙하게 했어요. 98세까지 살아 '장수왕'이라 불려요." },
    { id: "geunchogo", n: "근초고왕", hz: "近肖古王", era: "백제", v: [0.5, 0.6, -0.2, 0.3], sig: ["conquest", "history", "trade", "alliance"], pt: { hat: "baekje", robe: "#6A3D7C", beard: "full", item: "ship" },
      bio: "마한을 정복하고 고구려를 공격했으며, 바다 건너 중국·왜와 활발히 교류했어요. 역사책 『서기』를 펴냈어요." },
    { id: "beopheung", n: "법흥왕", hz: "法興王", era: "신라", v: [0.5, -0.3, -0.9, 0.1], sig: ["law", "rank", "buddhism"], pt: { hat: "silla", robe: "#7A3E6E", beard: "goatee", item: "lotus" },
      bio: "율령을 반포하고 관리의 옷 색깔을 정했으며, 이차돈의 순교 뒤 불교를 공인했어요." },
    { id: "jinheung", n: "진흥왕", hz: "眞興王", era: "신라", v: [0.4, 0.7, -0.3, 0.4], sig: ["hwarang", "conquest", "history", "buddhism"], pt: { hat: "silla", robe: "#B0402F", beard: "none", item: "stele" },
      bio: "화랑도를 정비하고 한강 유역을 차지해 순수비를 세웠어요. 역사책 『국사』를 펴냈어요." },
    { id: "muyeol", n: "태종 무열왕", hz: "太宗武烈王", era: "신라", v: [-0.3, 0.5, -0.2, 0.2], sig: ["alliance", "conquest", "f:ally"], pt: { hat: "silla", robe: "#2F5D8A", beard: "mustache", item: "scroll" },
      bio: "김춘추라는 이름으로 더 유명해요. 당나라와 손잡는 외교로 백제를 무너뜨리고 삼국 통일의 길을 열었어요." },
    { id: "sinmun", n: "신문왕", hz: "神文王", era: "통일 신라", v: [0.9, -0.3, -0.7, 0.7], sig: ["purge", "school", "local"], pt: { hat: "silla", robe: "#8A2F3A", beard: "goatee", item: "flute", brow: "fierce" },
      bio: "장인 김흠돌의 반란을 계기로 귀족을 숙청하고, 국학을 세우고 9주 5소경으로 지방을 정비했어요. 피리 하나로 나라의 걱정을 잠재운다는 '만파식적' 이야기가 전해져요." },
    { id: "gogukcheon", n: "고국천왕", hz: "故國川王", era: "고구려", v: [0.1, -0.2, 0.9, -0.3], sig: ["relief", "taxcut", "f:talent"], pt: { hat: "gogu", robe: "#7A5A2B", beard: "full", item: "rice", smile: true },
      bio: "농부 출신 을파소를 재상으로 뽑고, 흉년에 곡식을 빌려주는 진대법을 만들었어요." },
    { id: "wanggeon", n: "태조 왕건", hz: "太祖", era: "고려", v: [-0.9, 0, 0.5, -0.5], sig: ["marriage", "hostage", "taxcut", "buddhism"], pt: { hat: "goryeo", robe: "#B88A2A", beard: "full", item: "seal", smile: true },
      bio: "호족과 혼인하고 성씨를 내려 하나로 묶었어요. 세금을 알맞게 걷고 북쪽 땅을 되찾으려 했어요." },
    { id: "gwangjong", n: "광종", hz: "光宗", era: "고려", v: [0.9, -0.2, 0.2, 0.4], sig: ["slaves", "exam", "purge"], pt: { hat: "goryeo", robe: "#A8742A", beard: "mustache", item: "exam", brow: "fierce" },
      bio: "노비안검법으로 억울한 노비를 풀어 주고, 과거제로 실력 있는 관리를 뽑아 호족의 힘을 줄였어요." },
    { id: "seongjong", n: "성종", hz: "成宗", era: "고려", v: [0.3, -0.7, -0.8, -0.5], sig: ["local", "school", "coin"], pt: { hat: "goryeo", robe: "#9A6A2E", beard: "goatee", item: "scroll" },
      bio: "최승로의 시무 28조를 받아들여 유교 정치를 펴고, 12목에 지방관을 보냈어요. 우리 역사 최초의 쇠돈인 건원중보를 만들었어요." },
    { id: "taejong", n: "태종 이방원", hz: "太宗", era: "조선", v: [1, 0.2, -0.6, 0.9], sig: ["purge", "disband"], pt: { hat: "ikseon", robe: "#B3261E", beard: "full", item: "sword", brow: "fierce" },
      bio: "공신과 외척을 정리하고 개인 군대를 없애 왕권을 다졌어요. 맏아들 대신 충녕대군(세종)을 세자로 세웠어요." },
    { id: "sejong", n: "세종", hz: "世宗", era: "조선", v: [-0.2, -0.9, 0.8, -0.6], sig: ["scholars", "hangeul", "science", "survey", "fortress", "f:talent"], pt: { hat: "ikseon", robe: "#B3261E", beard: "full", item: "book", smile: true },
      bio: "집현전 학자들과 훈민정음을 만들고, 노비 출신 장영실과 측우기 같은 과학 기구를 만들었어요. 백성 17만 명에게 세금 제도를 묻고, 4군 6진으로 국경을 지켰어요." },
    { id: "hyojong", n: "효종", hz: "孝宗", era: "조선", v: [0.5, 0.9, -0.1, 0.3], sig: ["fortress", "daedong", "f:bukbeol", "hwarang"], pt: { hat: "ikseon", robe: "#B3261E", beard: "full", item: "bow", brow: "fierce" },
      bio: "병자호란 때 청나라에 인질로 끌려갔다 돌아와, 치욕을 갚겠다며 군대를 기르는 북벌을 준비했어요. 김육의 건의로 대동법을 넓히기도 했어요." },
    { id: "sukjong", n: "숙종", hz: "肅宗", era: "조선", v: [0.8, 0, 0.1, 0.2], sig: ["coin", "daedong", "purge"], pt: { hat: "ikseon", robe: "#B3261E", beard: "mustache", item: "coin" },
      bio: "상평통보를 널리 쓰게 하고 대동법을 전국으로 넓혔어요. 신하들의 무리를 여러 번 갈아 치우며(환국) 왕권을 강하게 지켰어요." },
    { id: "yeongjo", n: "영조", hz: "英祖", era: "조선", v: [-0.6, -0.3, 0.8, -0.3], sig: ["tangpyeong", "military_tax"], pt: { hat: "ikseon", robe: "#B3261E", beard: "long", item: "bowl" },
      bio: "탕평책으로 여러 붕당을 고르게 쓰고, 균역법으로 백성의 군포 부담을 반으로 줄였어요. 여러 재료를 고루 섞은 '탕평채'라는 음식 이야기도 전해져요." },
    { id: "jeongjo", n: "정조", hz: "正祖", era: "조선", v: [0.4, -0.7, 0.3, 0.3], sig: ["tangpyeong", "scholars", "capital"], pt: { hat: "ikseon", robe: "#B3261E", beard: "full", item: "castle" },
      bio: "규장각을 세워 젊은 학자를 키우고 수원 화성을 쌓아 새 도시를 만들었어요. 탕평책을 이어 갔어요." },
    // ---------- 세계의 왕 ----------
    { id: "alexander", n: "알렉산드로스 대왕", hz: "알렉산드로스", era: "마케도니아", world: true, v: [0.45, 0.6, -0.2, 0.3], sig: ["conquest", "capital", "school"], pt: { hat: "diadem", hair: "curly", hairColor: "#8A5A2B", robe: "#9C2F2F", beard: "none", item: "sword", armor: true },
      bio: "스무 살에 왕이 되어 그리스에서 이집트, 페르시아를 지나 인도 가까이까지 정복했어요. 정복한 곳마다 '알렉산드리아'라는 도시를 세워, 그리스 문화와 동방 문화가 섞인 헬레니즘 문화를 퍼뜨렸어요." },
    { id: "genghis", n: "칭기즈 칸", hz: "成吉思汗", era: "몽골 제국", world: true, v: [0.5, 0.5, -0.25, 0.1], home: "G", sig: ["conquest", "law", "trade", "hostage", "f:yam", "f:merit"], pt: { hat: "fur", robe: "#2F5D8A", collar: "deel", beard: "long", item: "bow", brow: "fierce" },
      bio: "서로 싸우던 초원의 부족들을 하나로 묶어 몽골 제국을 세웠어요. 법(예케 자사크)을 만들고, 말을 갈아타며 달리는 역참으로 넓은 땅을 이었어요. 부족장의 아들들을 곁에 두는 친위대(케식)로 부족들을 붙잡아 두었어요." },
    { id: "qinshihuang", n: "진시황", hz: "秦始皇", era: "진나라(중국)", world: true, v: [0.75, 0.35, -0.6, 0.4], sig: ["conquest", "law", "coin", "fortress", "local", "purge"], pt: { hat: "myeon", robe: "#1E1E28", trim: "#B3261E", beard: "full", item: "wall", brow: "fierce" },
      bio: "중국을 처음으로 하나로 통일하고 '황제'라는 이름을 처음 썼어요. 화폐와 글자, 길이·무게의 단위를 하나로 맞추고 만리장성을 이었어요. 하지만 책을 불태우고 학자들을 묻은 '분서갱유'와 무거운 공사로 원망을 사, 그가 죽고 얼마 안 되어 나라가 무너졌어요." },
    { id: "napoleon", n: "나폴레옹", hz: "나폴레옹", era: "프랑스", world: true, v: [0.6, 0.4, -0.4, 0.2], home: "H", sig: ["conquest", "law", "school", "exam", "f:code"], pt: { hat: "bicorne", robe: "#1F2F5A", collar: "coat", beard: "none", item: "sword", belt: false },
      bio: "프랑스 혁명 뒤 군인으로 이름을 떨치고 스스로 황제가 되었어요. 유럽의 많은 땅을 정복했고, 모든 시민이 법 앞에 평등하다는 '나폴레옹 법전'을 만들었어요. 러시아 원정에 실패한 뒤 먼 섬으로 쫓겨났어요." },
    { id: "elizabeth", n: "엘리자베스 1세", hz: "엘리자베스", era: "영국", world: true, v: [-0.3, 0.1, 0.15, -0.5], sig: ["trade", "tangpyeong", "scholars"], pt: { female: true, hat: "crown", hair: "redf", hairColor: "#B5542A", robe: "#7A1F3D", collar: "ruff", beard: "none", item: "ship", belt: false },
      bio: "가톨릭과 개신교의 다툼을 누그러뜨리고, 바다로 나가 무역을 키웠어요. 스페인의 무적함대를 물리쳐 영국을 바다의 강자로 만들었고, 셰익스피어 같은 작가들이 활약한 문화의 황금기를 열었어요." },
    { id: "louis14", n: "루이 14세", hz: "루이14세", era: "프랑스", world: true, v: [0.7, 0.1, -0.5, -0.2], home: "H", sig: ["capital", "hostage", "rank", "f:bigpalace"], pt: { hat: "crown", hair: "wig", hairColor: "#3A2618", robe: "#1F3F8A", collar: "ermine", deco: "lis", beard: "mustache", item: "sun", belt: false },
      bio: "'태양왕'이라 불린 프랑스의 왕이에요. 화려한 베르사유 궁전을 짓고 힘센 귀족들을 궁전에 모여 살게 해 왕의 힘을 키웠어요. 하지만 잦은 전쟁과 사치로 나라 빚이 크게 늘어, 훗날 프랑스 혁명의 씨앗이 되었어요." },
  ];
  const SPECIAL = {
    nero: { id: "nero", n: "네로 황제", hz: "네로", era: "로마 제국", world: true, pt: { hat: "laurel", hair: "curly", hairColor: "#5B3A1E", robe: "#5E2A6E", collar: "toga", beard: "neck", item: "lyre", frown: true, belt: false },
      bio: "바른말을 하는 스승과 신하의 말을 듣지 않고 제멋대로 다스린 로마 황제예요. 로마에 큰불이 난 뒤 그 자리에 화려한 '황금 궁전'을 지어 원망을 샀고, 죄 없는 사람들에게 불을 낸 죄를 뒤집어씌웠어요. 결국 원로원이 그를 '나라의 적'으로 선언했어요." },
    louis16: { id: "louis16", n: "루이 16세", hz: "루이16세", era: "프랑스", world: true, pt: { hat: "none", hair: "wig", hairColor: "#E4DED2", robe: "#1F3F8A", collar: "ermine", deco: "lis", beard: "none", item: "none", belt: false },
      bio: "나라 빚이 산더미처럼 쌓였을 때 왕이 되었어요. 개혁을 하려 했지만 귀족들의 반대에 부딪혔고, 1789년 프랑스 혁명이 일어났어요. 몰래 나라 밖으로 빠져나가려다 붙잡혔고, 결국 왕정이 무너진 뒤 목숨을 잃었어요." },
    yeonsan: { id: "yeonsan", n: "연산군", hz: "燕山君", era: "조선", pt: { hat: "ikseon", robe: "#5E1A16", beard: "mustache", item: "none", brow: "fierce", frown: true },
      bio: "신하들을 두 번의 큰 사화로 죽이고, 바른말을 하는 기관을 없앴어요. 결국 신하들이 중종반정을 일으켜 왕위에서 쫓겨났고, '임금(조·종)'이 아닌 '군'으로 불리게 되었어요." },
    gwanghae: { id: "gwanghae", n: "광해군", hz: "光海君", era: "조선", pt: { hat: "ikseon", robe: "#6B2A22", beard: "goatee", item: "scroll" },
      bio: "임진왜란 뒤 나라를 다시 세우고, 명과 후금 사이에서 중립 외교를 펴고, 대동법을 시작했어요. 하지만 인조반정으로 쫓겨나 '군'으로 기록되었어요. 오늘날에는 그의 외교와 개혁을 다시 평가하기도 해요." },
  };

  function axes() {
    const sum = [0, 0, 0], abs = [0, 0, 0];
    for (const t of S.tags) for (let i = 0; i < 3; i++) { sum[i] += t.v[i] * t.w; abs[i] += Math.abs(t.v[i] * t.w); }
    const a = sum.map((s, i) => (abs[i] ? s / abs[i] : 0));
    // 4번째 축: 큰 개혁을 앞쪽 시기(1~4)에 몰아서 했는가
    let early = 0, late = 0;
    for (const d of S.done) { const p = P[d.id]; if (!p || !p.strong || d.by) continue; if (d.turn <= 4) early += p.cost; else late += p.cost; }
    a.push(early + late ? (early - late) / (early + late) : -0.4);
    return a.map((x) => Math.max(-1, Math.min(1, x)));
  }
  function mineSet() {
    const m = new Set(S.done.filter((d) => d.ok !== false).map((d) => d.id));
    for (const k in S.flags) if (S.flags[k]) m.add("f:" + k);
    if (S.flags.conquered) m.add("conquest");
    return m;
  }
  // 한국사 나라에서는 한국의 왕만, 세계사 나라(촉한 포함)에서는 모든 왕이 후보예요
  const kingPool = (k) => WORLD() || S.scen === "Y" || !k.world;
  function matchKings(a) {
    const mine = mineSet();
    // 한국사 나라에서는 한국의 왕만 닮은 왕 후보가 돼요
    return KINGS.filter(kingPool).map((k) => {
      const dist = Math.sqrt(k.v.reduce((s, v, i) => s + (v - a[i]) ** 2, 0));
      const axisSim = 1 - dist / 4;
      const same = k.sig.filter((x) => mine.has(x));
      const ov = same.length / (k.sig.length + 1);
      // 세계사 나라에서는 세계의 왕, 그 나라와 이어진 왕이 조금 더 잘 나와요
      const bonus = (WORLD() && k.world ? 0.05 : 0) + ([].concat(k.home || []).includes(S.scen) ? 0.05 : 0);
      return { k, score: 0.55 * axisSim + 0.45 * ov + bonus, same };
    }).sort((x, y) => y.score - x.score);
  }
  const likePct = (score) => Math.max(1, Math.min(99, Math.round(40 + 60 * score)));
  const sigName = (x) => (x.startsWith("f:") ? { "f:talent": "신분이 낮은 인재 쓰기", "f:bukbeol": "북벌 준비", "f:ally": "큰 나라와 동맹", "f:bigpalace": "화려한 궁궐 짓기", "f:yam": "역참 세우기", "f:merit": "실력으로 장수 뽑기", "f:code": "평등한 법전 만들기", "f:hague": "헤이그 특사 보내기", "f:protest": "세계에 부당함 알리기" }[x] || x : P[x].name);
  function typeName(a) {
    const core = a[0] >= 0 ? (a[1] >= 0 ? "정복 군주" : "개혁 군주") : (a[1] >= 0 ? "연합 군주" : "학자 군주");
    const adj1 = a[2] >= 0 ? "백성을 먼저 살피는" : "나라의 틀을 다지는";
    const adj2 = a[3] >= 0 ? "단숨에 밀어붙이는" : "차근차근 쌓아 가는";
    const code = [a[0] >= 0 ? "힘" : "화", a[1] >= 0 ? "칼" : "붓", a[2] >= 0 ? "민" : "법", a[3] >= 0 ? "빠" : "차"].join("·");
    return { core, full: `${adj1}, ${adj2} ${core}`, code };
  }
  function endData() {
    const a = axes(), ranked = matchKings(a), top = ranked[0];
    const r = S.end.rec;
    const specials = (r.special ? [].concat(r.special) : []).map((id) => SPECIAL[id]).filter(Boolean);
    return { a, ranked, top, pct: likePct(top.score), specials };
  }

  // ================= 어진풍 그림 =================
  function shade(hex, f) {
    const n = parseInt(hex.slice(1), 16); let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    const m = (c) => Math.round(f < 0 ? c * (1 + f) : c + (255 - c) * f);
    return `rgb(${m(r)},${m(g)},${m(b)})`;
  }
  function laurel(color) {
    let out = "";
    for (const side of [-1, 1]) for (let i = 0; i < 7; i++) {
      const t = i / 6, x = 100 + side * (4 + 22 * Math.sin(t * 1.35)), y = 84 + 16 * (1 - Math.cos(t * 1.35)) ;
      const rot = side * (20 + t * 60);
      out += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="6" ry="2.6" fill="${color}" stroke="${shade(color, -0.35)}" stroke-width=".6" transform="rotate(${rot.toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
    }
    return out;
  }
  function hatSVG(t) {
    switch (t) {
      case "ikseon": return `<path d="M80 80 Q78 60 92 60 Q99 62 98 78 Z" fill="#151515"/><path d="M120 80 Q122 60 108 60 Q101 62 102 78 Z" fill="#151515"/><path d="M84 74 Q86 64 93 65 M116 74 Q114 64 107 65" stroke="#3A3A3A" stroke-width="1.5" fill="none"/>
      <path d="M73 101 Q71 74 100 72 Q129 74 127 101 Z" fill="#1E1E1E"/><rect x="72" y="94" width="56" height="9" rx="3" fill="#2E2E2E"/><path d="M80 82 Q100 76 120 82" stroke="#3A3A3A" stroke-width="2" fill="none"/>`;
      case "gogu": return `<path d="M90 74 Q78 48 70 22 Q84 42 94 70 Z" fill="#7A4E2D"/><path d="M110 74 Q122 48 130 22 Q116 42 106 70 Z" fill="#7A4E2D"/>
      <path d="M92 72 Q80 46 71 24 M108 72 Q120 46 129 24" stroke="#C9A227" stroke-width="1.2" fill="none"/>
      ${[0, 1, 2, 3].map((i) => `<path d="M${86 - i * 4} ${62 - i * 9} l-7 1 M${114 + i * 4} ${62 - i * 9} l7 1" stroke="#7A4E2D" stroke-width="1.6"/>`).join("")}
      <path d="M76 100 Q78 70 100 64 Q122 70 124 100 Z" fill="#EDE4CF" stroke="#B89B5E" stroke-width="1.5"/><rect x="75" y="92" width="50" height="8" rx="2" fill="#C9A227"/>`;
      case "baekje": return `<path d="M82 82 Q66 58 78 34 Q82 50 88 42 Q86 56 90 52 Q90 68 86 80 Z" fill="#E0AE3C" stroke="#9A7420"/><path d="M118 82 Q134 58 122 34 Q118 50 112 42 Q114 56 110 52 Q110 68 114 80 Z" fill="#E0AE3C" stroke="#9A7420"/>
      <path d="M75 101 Q75 72 100 70 Q125 72 125 101 Z" fill="#1E1E1E"/><rect x="74" y="94" width="52" height="8" rx="3" fill="#2E2E2E"/>`;
      case "silla": {
        const posts = [84, 100, 116].map((x) => `<path d="M${x} 92 V54 M${x - 8} 84 V72 H${x + 8} V84 M${x - 8} 72 V62 M${x + 8} 72 V62" stroke="#E2B33C" stroke-width="3.6" fill="none" stroke-linecap="round"/><circle cx="${x}" cy="52" r="3" fill="#E2B33C"/>`).join("");
        const jade = [78, 90, 110, 122].map((x, i) => `<circle cx="${x}" cy="${66 + (i % 2) * 8}" r="2.6" fill="#2E8B57"/>`).join("");
        return `${posts}${jade}<rect x="73" y="88" width="54" height="11" rx="2" fill="#E2B33C" stroke="#9A7420"/>
        ${[78, 86, 94, 102, 110, 118].map((x) => `<circle cx="${x + 3}" cy="93.5" r="1.8" fill="#FFF3C4"/>`).join("")}
        <path d="M74 98 V136 M126 98 V136" stroke="#E2B33C" stroke-width="2"/><circle cx="74" cy="139" r="3.4" fill="#2E8B57"/><circle cx="126" cy="139" r="3.4" fill="#2E8B57"/>`;
      }
      case "goryeo": return `<path d="M75 101 L77 62 Q100 50 123 62 L125 101 Z" fill="#23233A"/>
      ${[84, 92, 100, 108, 116].map((x) => `<path d="M${x} 99 V${60 - Math.abs(100 - x) * 0.15}" stroke="#C9A227" stroke-width="1.4"/>`).join("")}
      <rect x="74" y="94" width="52" height="8" rx="2" fill="#C9A227"/><circle cx="100" cy="80" r="5" fill="#E2B33C" stroke="#9A7420"/>`;
      // ---------- 세계의 관 ----------
      case "diadem": return `<path d="M75 97 Q100 87 125 97" stroke="#E2B33C" stroke-width="4.5" fill="none" stroke-linecap="round"/><circle cx="100" cy="91.5" r="3.4" fill="#C8332B" stroke="#9A7420"/><path d="M124 97 l8 10 M124 97 l3 13" stroke="#E2B33C" stroke-width="2"/>`;
      case "laurel": return laurel("#4F8A3A");
      case "fur": return `<path d="M76 98 Q76 66 100 58 Q124 66 124 98 Z" fill="#2F4F7A"/><path d="M100 58 V92 M88 64 Q92 80 92 94 M112 64 Q108 80 108 94" stroke="#C9A227" stroke-width="1.2" fill="none"/>
      <path d="M100 58 l-3.5 -9 h7 z" fill="#C8332B"/><path d="M97 49 h6" stroke="#C8332B" stroke-width="2"/>
      <path d="M68 101 Q68 87 100 85 Q132 87 132 101 Q132 107 100 105 Q68 107 68 101 Z" fill="#7A5230"/>
      ${[72, 79, 86, 93, 100, 107, 114, 121, 128].map((x) => `<path d="M${x} ${96 + Math.abs(100 - x) * 0.05} l1.5 -6" stroke="#A4774A" stroke-width="1.6" stroke-linecap="round"/>`).join("")}`;
      case "myeon": return `<path d="M77 101 Q77 76 100 74 Q123 76 123 101 Z" fill="#1E1E1E"/><rect x="76" y="94" width="48" height="8" rx="2" fill="#B3261E"/>
      <path d="M58 70 L142 70 L138 63 L62 63 Z" fill="#1E1E1E"/><rect x="58" y="70" width="84" height="3" fill="#B3261E"/>
      ${[63, 72, 81, 90, 110, 119, 128, 137].map((x) => `<path d="M${x} 73 V98" stroke="#5B3A1E" stroke-width=".8"/>${[0, 1, 2, 3].map((j) => `<circle cx="${x}" cy="${78 + j * 6}" r="1.9" fill="${j % 2 ? "#2E8B57" : "#C8332B"}"/>`).join("")}`).join("")}`;
      case "bicorne": return `<path d="M44 97 Q54 66 100 62 Q146 66 156 97 Q128 84 100 86 Q72 84 44 97 Z" fill="#141414"/><path d="M44 97 Q72 84 100 86 Q128 84 156 97" stroke="#C9A227" stroke-width="1.8" fill="none"/>
      <circle cx="130" cy="78" r="6" fill="#2F4F9A"/><circle cx="130" cy="78" r="4" fill="#F4F4F4"/><circle cx="130" cy="78" r="2" fill="#C8332B"/>`;
      case "crown": return `<path d="M80 93 Q80 70 100 65 Q120 70 120 93 Z" fill="#9C1F2B"/>
      <path d="M76 91 L79 76 L86 86 L93 72 L100 84 L107 72 L114 86 L121 76 L124 91 Z" fill="#E2B33C" stroke="#9A7420" stroke-width="1"/>
      <rect x="76" y="89" width="48" height="9" rx="2" fill="#E2B33C" stroke="#9A7420"/>
      <circle cx="86" cy="93.5" r="2.2" fill="#2E8B57"/><circle cx="100" cy="93.5" r="2.6" fill="#C8332B"/><circle cx="114" cy="93.5" r="2.2" fill="#2F4F9A"/>
      <path d="M100 56 V66 M95.5 60 H104.5" stroke="#E2B33C" stroke-width="2.4" stroke-linecap="round"/>`;
      default: return "";
    }
  }
  function beardSVG(t, hair) {
    const mus = `<path d="M87 131 Q94 126 100 129.5 Q106 126 113 131 Q106 133.5 100 132 Q94 133.5 87 131 Z" fill="${hair}"/><path d="M87.5 131 q-3 3 -4 8 M112.5 131 q3 3 4 8" stroke="${hair}" stroke-width="1.6" fill="none" stroke-linecap="round"/>`;
    if (t === "mustache") return mus;
    if (t === "goatee") return mus + `<path d="M95 141 Q100 156 105 141 Z" fill="${hair}"/>`;
    if (t === "full") return mus + `<path d="M83 128 Q84 156 100 163 Q116 156 117 128 Q112 141 100 142 Q88 141 83 128 Z" fill="${hair}"/>`;
    if (t === "long") return mus + `<path d="M83 128 Q82 168 100 188 Q118 168 117 128 Q112 141 100 142 Q88 141 83 128 Z" fill="${hair}"/><path d="M95 150 Q100 170 100 182 M105 150 Q102 168 100 182" stroke="${shade("#888888", 0.2)}" stroke-width="0.8" fill="none" opacity=".5"/>`;
    if (t === "neck") return `<path d="M78 122 Q82 150 100 154 Q118 150 122 122" stroke="${hair}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    return "";
  }
  // 머리카락: back = 얼굴 뒤(어깨까지 내려오는 머리), front = 이마 위
  function hairSVG(p, which) {
    const c = p.hairColor || (p.white ? "#E9E5DB" : "#2A1D17"), d = shade(c, -0.25);
    const curls = (pts, r) => pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" stroke="${d}" stroke-width=".8"/>`).join("");
    if (p.hair === "curly") return which === "front" ? curls([[78, 100], [84, 92], [92, 88], [100, 87], [108, 88], [116, 92], [122, 100], [76, 110], [124, 110]], 6.5) : "";
    if (p.hair === "wig") {
      if (which === "back") { const col = []; for (let i = 0; i < 7; i++) { col.push([66 - (i % 2) * 3, 100 + i * 12], [134 + (i % 2) * 3, 100 + i * 12]); } return curls(col, 10); }
      return curls([[80, 96], [88, 88], [100, 85], [112, 88], [120, 96], [74, 106], [126, 106]], 8);
    }
    if (p.hair === "redf") {
      if (which === "back") return curls([[72, 104], [128, 104], [70, 116], [130, 116]], 8);
      return curls([[80, 100], [88, 94], [96, 92], [104, 92], [112, 94], [120, 100]], 5.5);
    }
    return which === "front" ? "" : "";
  }
  function itemSVG(t, robe) {
    switch (t) {
      case "book": return `<g transform="translate(76 208) rotate(-4)"><rect width="48" height="32" rx="2" fill="#2F5D8A"/><rect x="3" y="3" width="42" height="26" fill="#F4EBD5"/>${[9, 15, 21, 27, 33, 39].map((x) => `<path d="M${x} 7 V25" stroke="#7A6A55" stroke-width="1"/>`).join("")}<path d="M24 3 V29" stroke="#2F5D8A" stroke-width="2"/></g>`;
      case "sword": return `<path d="M97 166 L100 158 L103 166 V232 H97 Z" fill="#D5DAE1" stroke="#8C949E"/><rect x="86" y="230" width="28" height="6" rx="2" fill="#C9A227"/><rect x="96" y="236" width="8" height="14" fill="#5B3A1E"/>`;
      case "scroll": return `<rect x="70" y="214" width="60" height="18" rx="2" fill="#F4EBD5" stroke="#8A6A3A"/><rect x="64" y="212" width="8" height="22" rx="4" fill="#8A5A2B"/><rect x="128" y="212" width="8" height="22" rx="4" fill="#8A5A2B"/>${[80, 88, 96, 104, 112, 120].map((x) => `<path d="M${x} 217 V229" stroke="#7A6A55" stroke-width="1.2"/>`).join("")}`;
      case "flute": return `<rect x="54" y="216" width="92" height="8" rx="4" fill="#7FA35A" stroke="#4F7A35"/>${[70, 86, 102, 118].map((x) => `<circle cx="${x}" cy="220" r="1.8" fill="#2F4A1F"/>`).join("")}${[62, 94, 126].map((x) => `<path d="M${x} 216 V224" stroke="#4F7A35" stroke-width="1.5"/>`).join("")}`;
      case "coin": return `<circle cx="100" cy="221" r="17" fill="#C9A227" stroke="#8A6A12" stroke-width="2"/><circle cx="100" cy="221" r="13" fill="none" stroke="#8A6A12" stroke-width="1"/><rect x="94" y="215" width="12" height="12" fill="${robe}" stroke="#8A6A12"/>`;
      case "castle": return `<g transform="translate(138 206)"><path d="M6 20 L20 8 L34 20 Z" fill="#3A3A3A"/><rect x="10" y="20" width="20" height="8" fill="#B3261E"/><rect x="0" y="27" width="40" height="18" fill="#A39883"/>${[0, 8, 16, 24, 32].map((x) => `<rect x="${x}" y="24" width="5" height="4" fill="#A39883"/>`).join("")}<path d="M15 45 V37 Q20 31 25 37 V45 Z" fill="#3A2A1A"/></g>`;
      case "ship": return `<g transform="translate(136 204)"><rect x="20" y="0" width="2.5" height="32" fill="#5B3A1E"/><path d="M22.5 2 L42 26 L22.5 26 Z" fill="#F4EBD5" stroke="#8A6A3A"/><path d="M2 32 L46 32 L38 44 L10 44 Z" fill="#6E4A2A"/><path d="M0 48 q6 -4 12 0 t12 0 t12 0 t12 0" stroke="#5B8DB8" stroke-width="2" fill="none"/></g>`;
      case "lotus": return `<g transform="translate(100 224)">${[-50, -25, 0, 25, 50].map((r) => `<ellipse cx="0" cy="-8" rx="6" ry="13" fill="#F2A7B8" stroke="#C7607A" transform="rotate(${r})"/>`).join("")}<ellipse cx="0" cy="4" rx="16" ry="4" fill="#5E9A5A"/></g>`;
      case "stele": return `<g transform="translate(144 190)"><path d="M0 12 L15 2 L30 12 Z" fill="#6E6E66"/><rect x="3" y="12" width="24" height="46" fill="#97978C"/>${[8, 13, 18, 23].map((x) => `<path d="M${x} 17 V52" stroke="#6E6E66" stroke-width="1" stroke-dasharray="3 2"/>`).join("")}</g>`;
      case "rice": return `<g transform="translate(140 210)"><path d="M6 40 Q0 16 14 8 L28 8 Q42 16 36 40 Z" fill="#D9C8A0" stroke="#9A8A60"/><path d="M12 9 Q21 4 30 9" stroke="#8A5A2B" stroke-width="3" fill="none"/>${[[16, 22], [24, 26], [20, 32], [28, 18]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="1.6" ry="2.6" fill="#F7EFD8"/>`).join("")}</g>`;
      case "seal": return `<rect x="86" y="216" width="28" height="20" rx="2" fill="#C9A227" stroke="#8A6A12"/><path d="M88 216 Q90 202 100 202 Q110 202 112 216 Z" fill="#D9B13A" stroke="#8A6A12"/><circle cx="96" cy="208" r="1.5" fill="#5B3A1E"/><rect x="92" y="222" width="16" height="9" fill="none" stroke="#8A1E16" stroke-width="1.5"/>`;
      case "exam": return `<g transform="translate(74 206) rotate(-6)"><rect width="44" height="34" fill="#F7F1E1" stroke="#9A8A60"/>${[8, 15, 22, 29, 36].map((x) => `<path d="M${x} 5 V29" stroke="#2A1D17" stroke-width="1.3" stroke-dasharray="4 2"/>`).join("")}</g><path d="M128 200 L114 236" stroke="#5B3A1E" stroke-width="3"/><path d="M114 236 l-2 6 l5 -4 z" fill="#1E1E1E"/>`;
      case "bowl": return `<path d="M80 214 h40 Q118 238 100 240 Q82 238 80 214 Z" fill="#EFE8DA" stroke="#8A7A5A"/>${[["#F4F1E8", 86], ["#2E7D4F", 93], ["#C8332B", 100], ["#E9B824", 107], ["#2B2B2B", 114]].map(([c, x]) => `<rect x="${x - 3}" y="208" width="6" height="7" rx="1.5" fill="${c}" stroke="#8A7A5A" stroke-width=".5"/>`).join("")}`;
      case "bow": return `<path d="M148 188 Q186 220 148 252" stroke="#5B3A1E" stroke-width="4" fill="none"/><path d="M148 188 V252" stroke="#DDD6C6" stroke-width="1"/><path d="M140 220 H178" stroke="#7A5A2B" stroke-width="2"/><path d="M178 220 l-6 -3 v6 z" fill="#5B5B5B"/>`;
      case "wall": return `<g transform="translate(130 206)"><path d="M0 44 L0 30 L18 24 L18 38 Z" fill="#B8A07A"/><path d="M18 38 L18 24 L48 30 L48 44 Z" fill="#A38B66"/>${[2, 8, 14].map((x) => `<rect x="${x}" y="${27 - x * 0.33}" width="3.5" height="4" fill="#B8A07A"/>`).join("")}${[22, 30, 38, 44].map((x) => `<rect x="${x}" y="${21 + (x - 18) * 0.2}" width="3.5" height="4" fill="#A38B66"/>`).join("")}<rect x="12" y="10" width="14" height="18" fill="#9A8460"/><path d="M10 11 L19 3 L28 11 Z" fill="#3A3A3A"/><path d="M0 37 L18 31 L48 37" stroke="#7A6648" stroke-width=".8" fill="none"/></g>`;
      case "sun": return `<g transform="translate(100 221)">${Array.from({ length: 12 }, (_, i) => `<path d="M0 -24 L4 -15 L-4 -15 Z" fill="#E9B824" transform="rotate(${i * 30})"/>`).join("")}<circle r="14" fill="#F2C14E" stroke="#B8860B" stroke-width="1.5"/><circle cx="-4.5" cy="-3" r="1.6" fill="#8A5A12"/><circle cx="4.5" cy="-3" r="1.6" fill="#8A5A12"/><path d="M-5 4 q5 4 10 0" stroke="#8A5A12" stroke-width="1.6" fill="none"/></g>`;
      case "lyre": return `<g transform="translate(144 196)"><path d="M4 6 Q-2 40 16 46 Q34 40 28 6" stroke="#C9A227" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M4 12 H28" stroke="#8A6A12" stroke-width="3"/>${[10, 14, 18, 22].map((x) => `<path d="M${x} 12 V42" stroke="#F4EBD5" stroke-width=".9"/>`).join("")}<rect x="9" y="42" width="14" height="6" rx="2" fill="#8A6A12"/></g>`;
      default: return "";
    }
  }
  function collarSVG(p, robe, dark) {
    switch (p.collar) {
      case "ruff": return `<ellipse cx="100" cy="160" rx="40" ry="13" fill="#F7F3EA" stroke="#CFC7B4"/>${Array.from({ length: 14 }, (_, i) => `<path d="M${64 + i * 5.5} ${154 + Math.abs(i - 6.5) * 0.6} l2 10" stroke="#D8D0BE" stroke-width="1"/>`).join("")}`;
      case "coat": return `<path d="M84 160 L100 196 L116 160 Z" fill="#F4F1E8"/><path d="M84 160 L94 200 M116 160 L106 200" stroke="#C9A227" stroke-width="2"/>
        <ellipse cx="54" cy="176" rx="16" ry="6" fill="#E2B33C" transform="rotate(-25 54 176)"/><ellipse cx="146" cy="176" rx="16" ry="6" fill="#E2B33C" transform="rotate(25 146 176)"/>
        ${[0, 1, 2, 3, 4].map((i) => `<path d="M${42 + i * 5} ${182 + i * 2} v8 M${158 - i * 5} ${182 + i * 2} v8" stroke="#C9A227" stroke-width="1.6"/>`).join("")}
        ${[204, 216, 228, 240].map((y) => `<circle cx="96" cy="${y}" r="2" fill="#E2B33C"/><circle cx="104" cy="${y}" r="2" fill="#E2B33C"/>`).join("")}`;
      case "toga": return `<path d="M54 184 Q96 196 148 252 L124 252 Q92 214 48 198 Z" fill="#F1EADB" stroke="#D3C8B2"/><path d="M84 162 L100 186 L116 162" fill="none" stroke="#F1EADB" stroke-width="6"/>`;
      case "ermine": return `<path d="M26 252 C28 198 54 172 82 163 L118 163 C146 172 172 198 174 252 L150 252 C146 214 130 198 100 194 C70 198 54 214 50 252 Z" fill="#F7F3EA" stroke="#D8D0BE"/>
        ${[[40, 230], [52, 205], [70, 186], [130, 186], [148, 205], [160, 230], [44, 246], [156, 246], [88, 176], [112, 176]].map(([x, y]) => `<path d="M${x} ${y} l-2 5 h4 z" fill="#1E1E1E"/>`).join("")}
        <path d="M86 163 L100 182 L114 163" fill="none" stroke="#F4F1E8" stroke-width="5"/>`;
      case "deel": return `<path d="M84 162 Q108 184 130 208" stroke="#C9A227" stroke-width="7" fill="none"/><path d="M84 162 Q108 184 130 208" stroke="${shade(robe, 0.35)}" stroke-width="3" fill="none"/><path d="M84 162 L100 172 L116 162" fill="none" stroke="#F4F1E8" stroke-width="3"/>`;
      case "joseon": return `<path d="M78 162 Q100 190 122 162" fill="none" stroke="${dark}" stroke-width="7"/><path d="M83 162 Q100 182 117 162" fill="none" stroke="#F4F1E8" stroke-width="3"/>`;
      default: return `<path d="M82 162 L100 198 L118 162" fill="none" stroke="${p.trim || dark}" stroke-width="8"/><path d="M85 162 L100 192 L115 162" fill="none" stroke="#F4F1E8" stroke-width="3"/>`;
    }
  }
  function portrait(k, cls) {
    const p = k.pt, uid = k.id + Math.floor(Math.random() * 1e6);
    const skin = p.female ? "#F6E1CF" : "#F1D0AE", skinS = "#D9A982", ink = "#2A1D17";
    const robe = p.robe, dark = shade(robe, -0.3);
    const hair = p.hairColor || (p.white ? "#E9E5DB" : "#2A1D17");
    const light = ["#E9E5DB", "#E4DED2"].includes(hair);
    const joseon = p.hat === "ikseon";
    const chars = [...k.hz];
    const lw = chars.length > 5 ? 12 : 14, step = lw + 3;
    const bg = joseon
      ? `<circle cx="158" cy="52" r="11" fill="#C8332B"/><circle cx="62" cy="52" r="10" fill="#FBF8F0" stroke="#D8CDB4"/>
         <path d="M16 200 L46 118 L76 200 Z M124 200 L154 118 L184 200 Z" fill="#3F7F64" opacity=".85"/><path d="M40 200 L74 132 L108 200 Z M92 200 L126 132 L160 200 Z" fill="#2C6A57" opacity=".75"/>`
      : k.world
        ? `<path d="M14 200 H186 V253 H14 Z" fill="#D8C49C" opacity=".35"/>${[[150, 60], [56, 160], [158, 150]].map(([x, y]) => `<path d="M${x} ${y} q6 -8 14 -2 q6 -8 14 0 q8 2 4 8 h-30 q-6 -2 -2 -6z" fill="#E2D2B0" opacity=".7"/>`).join("")}`
        : `${[[40, 70], [150, 90], [60, 150], [150, 160]].map(([x, y]) => `<path d="M${x} ${y} q6 -8 14 -2 q6 -8 14 0 q8 2 4 8 h-30 q-6 -2 -2 -6z" fill="#E2D2B0" opacity=".7"/>`).join("")}`;
    const browC = light ? "#9A9488" : p.hairColor && !p.female ? shade(p.hairColor, -0.2) : ink;
    const brow = p.female
      ? `<path d="M86 106 q5 -3 10 -1 M104 105 q5 -2 10 1" stroke="${shade(hair, -0.2)}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`
      : p.brow === "fierce"
        ? `<path d="M83 103 L96 108 M117 103 L104 108" stroke="${browC}" stroke-width="3.4" stroke-linecap="round"/>`
        : `<path d="M84 106 q6 -4 12 -1 M104 105 q6 -3 12 1" stroke="${browC}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    const eyes = p.smile
      ? `<path d="M86 116 q5 -4 10 0 M104 116 q5 -4 10 0" stroke="${ink}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`
      : `<path d="M86 115 q5 -2.5 10 0 M104 115 q5 -2.5 10 0" stroke="${ink}" stroke-width="2.4" fill="none" stroke-linecap="round"/><circle cx="91" cy="115.5" r="1.6" fill="${ink}"/><circle cx="109" cy="115.5" r="1.6" fill="${ink}"/>${p.female ? `<path d="M85 113 l-2 -2 M115 113 l2 -2" stroke="${ink}" stroke-width="1.2"/>` : ""}`;
    const mouth = p.female ? `<path d="M95 135 q5 3 10 0 q-5 -2 -10 0 Z" fill="#C0392B"/>`
      : p.frown ? `<path d="M93 137 q7 -4 14 0" stroke="#8A3A2A" stroke-width="2" fill="none" stroke-linecap="round"/>`
        : p.smile ? `<path d="M93 135 q7 5 14 0" stroke="#8A3A2A" stroke-width="2" fill="none" stroke-linecap="round"/>`
          : `<path d="M94 136 q6 1.5 12 0" stroke="#8A3A2A" stroke-width="2" fill="none" stroke-linecap="round"/>`;
    const dragon = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#D9A93A" stroke="#8A5A12" stroke-width="1.5"/><path d="M${cx - r * 0.5} ${cy + r * 0.2} q${r * 0.3} ${-r * 0.7} ${r * 0.7} ${-r * 0.3} t${r * 0.2} ${r * 0.6} q${-r * 0.4} ${r * 0.4} ${-r * 0.7} 0" stroke="#8A5A12" stroke-width="1.4" fill="none"/><circle cx="${cx + r * 0.35}" cy="${cy - r * 0.45}" r="${r * 0.12}" fill="#B3261E"/>`;
    const robeDeco = joseon ? dragon(100, 205, 15) + dragon(57, 190, 9) + dragon(143, 190, 9)
      : p.deco === "lis" ? [[64, 214], [80, 204], [120, 204], [136, 214], [100, 238], [70, 240], [130, 240]].map(([x, y]) => `<path d="M${x} ${y - 5} q-3 4 0 8 q3 -4 0 -8 M${x - 4} ${y} q2 -1 4 2 q2 -3 4 -2" stroke="#E2B33C" stroke-width="1.4" fill="none"/>`).join("")
        : `<path d="M44 215 Q100 205 156 215" stroke="${shade(robe, 0.25)}" stroke-width="3" fill="none"/>`;
    const armor = p.armor ? `<g fill="none" stroke="#C9A227" stroke-width="1.3">${[176, 186, 196].map((y, j) => [0, 1, 2, 3].map((i) => `<path d="M${46 + i * 8 + j * 2} ${y} q4 5 8 0 M${122 + i * 8 - j * 2} ${y} q4 5 8 0"/>`).join("")).join("")}</g>` : "";
    const sideburn = p.female || p.hair === "wig" || p.hair === "curly" ? "" : `<path d="M76.5 98 Q75 112 78 121 M123.5 98 Q125 112 122 121" stroke="${hair}" stroke-width="4" fill="none"/>`;
    const belt = p.belt === false ? "" : `<rect x="50" y="232" width="100" height="8" rx="3" fill="#C9A227"/>${[60, 76, 92, 108, 124, 140].map((x) => `<rect x="${x}" y="233.5" width="6" height="5" rx="1" fill="#F4EBD5" opacity=".8"/>`).join("")}`;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 270" width="200" height="270" class="portrait ${cls || ""}" role="img" aria-label="${esc(k.n)}의 모습을 상상해 그린 어진풍 그림">
      <defs><linearGradient id="silk${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F7EDD6"/><stop offset="1" stop-color="#E6D2AC"/></linearGradient></defs>
      <rect x="6" y="9" width="188" height="252" rx="2" fill="#6E4A2A"/>
      <rect x="14" y="17" width="172" height="236" fill="url(#silk${uid})"/>
      <g opacity=".95">${bg}</g>
      <path d="M26 252 C28 196 52 170 80 161 L120 161 C148 170 172 196 174 252 Z" fill="${robe}"/>
      ${robeDeco}${armor}${belt}
      <path d="M48 253 Q66 222 100 226 Q134 222 152 253 Z" fill="${dark}"/>
      <rect x="91" y="140" width="18" height="24" fill="${skinS}"/>
      ${collarSVG(joseon ? { ...p, collar: "joseon" } : p, robe, dark)}
      ${hairSVG(p, "back")}
      <ellipse cx="75" cy="118" rx="4.5" ry="8" fill="${skin}"/><ellipse cx="125" cy="118" rx="4.5" ry="8" fill="${skin}"/>
      <ellipse cx="100" cy="115" rx="${p.female ? 23 : 25}" ry="30" fill="${skin}"/>
      ${sideburn}
      <circle cx="86" cy="127" r="5" fill="#E88A7A" opacity="${p.female ? 0.35 : 0.22}"/><circle cx="114" cy="127" r="5" fill="#E88A7A" opacity="${p.female ? 0.35 : 0.22}"/>
      ${brow}${eyes}
      <path d="M100 116 L97 127 Q100 129 103 127" stroke="${skinS}" stroke-width="2" fill="none" stroke-linecap="round"/>
      ${mouth}${beardSVG(p.beard, hair)}
      ${hairSVG(p, "front")}
      ${hatSVG(p.hat)}
      ${itemSVG(p.item, robe)}
      <rect x="22" y="24" width="21" height="${chars.length * step + 9}" rx="2" fill="#B3261E" stroke="#7A1A12"/>
      ${chars.map((ch, i) => `<text x="32.5" y="${24 + lw + 3 + i * step}" text-anchor="middle" font-size="${lw}" font-weight="700" fill="#FFF3D6" font-family="'Hahmlet','Noto Serif KR','Batang',serif">${esc(ch)}</text>`).join("")}
      <rect x="0" y="0" width="200" height="12" rx="6" fill="#4A2F1A"/><rect x="0" y="258" width="200" height="12" rx="6" fill="#4A2F1A"/>
      <circle cx="4" cy="6" r="5" fill="#C9A227"/><circle cx="196" cy="6" r="5" fill="#C9A227"/><circle cx="4" cy="264" r="5" fill="#C9A227"/><circle cx="196" cy="264" r="5" fill="#C9A227"/>
    </svg>`;
  }
