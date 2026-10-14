  // ================= 지도 =================
  // 경도·위도 → 그림 좌표 (해안선 자료와 같은 투영)
  let MB = { w: 110, e: 133.5, s: 32.3, n: 46.2 }, MCOS = Math.cos(39.5 * Math.PI / 180), MK = 1000 / ((MB.e - MB.w) * MCOS);
  // 지도마다 다른 해안선·투영 (세계사 지도)
  const GEO = { korea: { w: 110, e: 133.5, s: 32.3, n: 46.2, cos: Math.cos(39.5 * Math.PI / 180), land: LAND } };
  function geoUse(name) { const g = GEO[name || "korea"]; if (!g.land) g.land = LAND; MB = { w: g.w, e: g.e, s: g.s, n: g.n }; MCOS = g.cos || Math.cos(((g.s + g.n) / 2) * Math.PI / 180); MK = 1000 / ((MB.e - MB.w) * MCOS); LAND = g.land; }
  const PJ = ([lo, la]) => [(lo - MB.w) * MCOS * MK, (MB.n - la) * MK];
  const ptsPath = (pts, close) => "M" + pts.map((p) => PJ(p).map((v) => v.toFixed(1)).join(" ")).join("L") + (close ? "Z" : "");
  // 선을 부드럽게: 점 사이를 캐트멀-롬 곡선으로 촘촘히 채워요 (맞닿는 경계가 똑같이 그려지도록 선마다 미리 계산)
  function smooth(pts, n) {
    n = n || 6; const out = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
      for (let k = 0; k < n; k++) {
        const t = k / n, t2 = t * t, t3 = t2 * t;
        out.push([0, 1].map((j) => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3)));
      }
    }
    out.push(pts[pts.length - 1]);
    return out;
  }
  const RVS = (a) => a.slice().reverse();
  const cut = (a, i, j) => a.slice(i, j === undefined ? undefined : j + 1);
  const ring = (...parts) => [].concat(...parts);
  // ---- 강 (하구 → 상류) ----
  const YALU0 = [[124.35, 39.85], [124.55, 40.05], [124.85, 40.3], [125.1, 40.45], [125.35, 40.62], [125.65, 40.82], [125.95, 40.95], [126.2, 41.08], [126.5, 41.3], [126.75, 41.55], [126.95, 41.7], [127.2, 41.55], [127.5, 41.45], [127.8, 41.6], [128.08, 41.98]];
  const TUMEN0 = [[128.08, 41.98], [128.3, 42.05], [128.6, 42.12], [128.9, 42.3], [129.2, 42.45], [129.5, 42.75], [129.75, 42.98], [130.0, 42.9], [130.25, 42.75], [130.45, 42.55], [130.6, 42.4], [130.7, 42.3]];
  const LIAO0 = [[122.1, 40.75], [122.25, 40.95], [122.45, 41.15], [122.6, 41.35], [122.75, 41.6], [122.85, 41.85], [123.0, 42.1], [123.2, 42.35], [123.4, 42.6], [123.7, 42.85], [124.0, 43.1], [124.3, 43.4]];
  const NAK0 = [[128.95, 35.08], [128.8, 35.3], [128.6, 35.45], [128.47, 35.6], [128.42, 35.85], [128.38, 36.1], [128.35, 36.35], [128.42, 36.6], [128.6, 36.85], [128.85, 37.0]];
  const S6 = (a) => smooth(a, 6);
  const YALU = S6(YALU0), TUMEN = S6(TUMEN0), LIAO = S6(LIAO0);
  const iY = (k) => k * 6; // 원래 점 k번째의 위치 (촘촘하게 만든 뒤)
  // ---- 경계선 ----
  const GO371_W = S6([[124.1, 39.9], [124.2, 40.3], [124.05, 40.7], [124.2, 41.1], [124.45, 41.5], [124.6, 41.9], [124.85, 42.3], [125.1, 42.7], [125.4, 43.0]]);
  const GO_N = S6([[125.4, 43.0], [125.9, 43.2], [126.5, 43.25], [127.1, 43.05], [127.6, 42.75], [127.9, 42.35], [128.08, 41.98]]);
  const LD_CAP = S6([[124.3, 43.4], [124.8, 43.25], [125.4, 43.0]]);
  const GN_N = S6([[124.3, 43.4], [124.2, 44.0], [124.9, 44.8], [126.2, 45.3], [127.8, 45.3], [129.2, 44.9], [130.5, 44.3], [131.4, 43.6], [131.6, 42.9]]);
  const GO371_S = S6([[124.75, 38.1], [125.1, 38.3], [125.45, 38.4], [125.8, 38.45], [126.15, 38.55], [126.5, 38.7], [126.85, 38.85], [127.15, 39.0], [127.45, 39.15]]);
  const GO475_S = S6([[126.7, 37.05], [126.95, 36.97], [127.25, 36.9], [127.6, 36.85], [127.95, 36.9], [128.2, 36.9], [128.43, 36.86], [128.7, 36.7], [128.95, 36.5], [129.2, 36.3], [129.45, 36.1]]);
  const SOBAEK0 = [[128.43, 36.86], [128.2, 36.8], [128.07, 36.78], [128.0, 36.5], [128.0, 36.22], [127.85, 36.0], [127.75, 35.86], [127.72, 35.6], [127.73, 35.34], [127.75, 35.1], [127.75, 34.9]];
  const SOB = S6(SOBAEK0); // 죽령 → 조령(2) → 추풍령(4) → 덕유산(6) → 지리산(8) → 남해(10)
  const BJ_N = S6([[126.15, 37.75], [126.45, 37.85], [126.7, 37.95], [127.0, 38.05], [127.3, 38.08], [127.55, 37.95]]);
  const BJ_E = S6([[127.55, 37.95], [127.65, 37.65], [127.78, 37.35], [127.9, 37.1], [128.07, 36.78]]);
  const BJ_S = S6([[126.55, 36.0], [126.8, 36.05], [127.1, 36.05], [127.4, 36.0], [127.75, 35.86]]);
  const NAK = S6(NAK0);
  const GAYA_N = S6([[128.0, 36.22], [128.2, 36.15], [128.38, 36.1]]); // 추풍령 → 낙동강(5)
  const SL514_N = S6([[128.43, 36.86], [128.75, 37.0], [129.0, 37.2], [129.2, 37.45]]);
  const HAN_N = S6([[126.15, 37.75], [126.45, 37.85], [126.7, 37.95], [127.0, 38.05], [127.3, 38.08], [127.55, 37.95], [127.9, 38.05], [128.2, 37.95], [128.45, 37.7]]);
  const HAN_E = S6([[128.45, 37.7], [128.6, 37.4], [128.55, 37.1], [128.43, 36.86]]);
  const NE_W = S6([[128.45, 37.7], [128.3, 38.1], [128.0, 38.6], [127.6, 39.1], [127.25, 39.5], [127.2, 39.9], [127.6, 40.15], [128.2, 40.3], [128.7, 40.35]]);
  const GR918_N = S6([[124.95, 39.15], [125.5, 39.25], [126.0, 39.3], [126.5, 39.3], [127.0, 39.2], [127.45, 39.15]]);
  const GRN_N = S6([[125.3, 39.62], [125.7, 39.72], [126.2, 39.95], [126.7, 40.15], [127.2, 40.05], [127.6, 39.85]]);
  const HB_N = S6([[126.5, 36.3], [126.85, 36.45], [127.2, 36.55], [127.5, 36.45], [127.8, 36.4], [128.0, 36.22]]);
  const HB_E = S6([[128.0, 36.22], [128.15, 36.0], [128.28, 35.7], [128.35, 35.4], [128.5, 35.15], [128.6, 34.9]]);
  const SLL_N = S6([[128.0, 36.22], [128.3, 36.45], [128.7, 36.72], [129.05, 36.85], [129.45, 36.9]]);
  const JC_N = S6([[126.2, 41.08], [126.5, 40.95], [126.85, 40.98], [127.3, 41.08], [127.8, 41.25], [128.2, 41.4], [128.7, 41.55], [129.2, 41.62], [129.6, 41.62], [129.9, 41.55]]);
  const J4_E = S6([[128.08, 41.98], [128.15, 41.7], [128.2, 41.4]]);
  const iS = (k) => k * 6;
  // 바다 쪽 꼭짓점은 해안선으로 잘리니 대충 바다에 두면 돼요
  const RLAB = { go_core: [127.0, 40.3], liaodong: [123.2, 40.8], go_north: [127.0, 44.0], go_south: [127.6, 37.7], bj_core: [127.0, 36.95], mahan: [126.9, 35.25], hwanghae: [125.8, 38.2], sl_core: [128.95, 36.25], gaya: [128.05, 35.4], sl_han: [127.3, 37.45], sl_ne: [128.2, 38.6], gr_core: [127.7, 38.45], hb: [127.0, 35.5], sl_late: [128.95, 35.9], gr_north: [126.4, 39.65], js_core: [127.7, 38.6] };
  const REG = {
    go_core: ring(GO371_W, GO_N.slice(1), TUMEN.slice(1), [[131.2, 42.0], [130.0, 40.6], [128.6, 39.3]], RVS(GO371_S), [[124.2, 38.3], [123.8, 39.4]]),
    liaodong: ring(LIAO, LD_CAP.slice(1), RVS(GO371_W).slice(1), [[123.8, 39.4], [122.4, 38.7], [121.4, 38.6], [121.6, 40.4]]),
    go_north: ring(LD_CAP, GO_N.slice(1), TUMEN.slice(1), RVS(GN_N)),
    go_south: ring(GO371_S, [[128.6, 39.3], [130.2, 37.9], [130.0, 36.1]], RVS(GO475_S), [[126.0, 36.9], [124.3, 37.5], [124.2, 38.3]]),
    bj_core: ring(BJ_N, BJ_E.slice(1), cut(SOB, iS(2), iS(6)).slice(1), RVS(BJ_S).slice(1), [[125.8, 36.1], [125.5, 37.3], [125.9, 37.7]]),
    mahan: ring(BJ_S, cut(SOB, iS(6)).slice(1), [[127.2, 33.9], [125.6, 33.9], [125.5, 35.9]]),
    hwanghae: ring(cut(GO371_S, 0, iS(5)), [[127.0, 38.45]], [[127.3, 38.08]], RVS(cut(BJ_N, 0, iS(4))).slice(1), [[125.6, 37.5], [124.3, 37.6], [124.3, 38.1]]),
    sl_core: ring(SL514_N, [[130.1, 37.5], [130.1, 34.9], [129.2, 34.85]], NAK.slice(0, iS(5) + 1), RVS(GAYA_N).slice(1), RVS(cut(SOB, 0, iS(4))).slice(1)),
    gaya: ring(GAYA_N, RVS(NAK.slice(0, iS(5) + 1)).slice(1), [[128.9, 34.85], [128.3, 34.4], [127.75, 34.5]], RVS(cut(SOB, iS(4))).slice(1)),
    bj6: ring(cut(GO475_S, 0, iS(4)), cut(SOB, iS(2)), [[127.3, 33.9], [125.5, 33.9], [125.4, 36.6], [126.2, 37.15]]),
    sl_han: ring(HAN_N, HAN_E.slice(1), RVS(GO475_S).slice(iS(4)), [[126.3, 37.0], [125.9, 37.5]]),
    sl_ne: ring(NE_W, [[129.6, 40.0], [130.3, 38.0], [129.9, 37.5], [129.2, 37.45]], RVS(SL514_N).slice(1), RVS(HAN_E).slice(1)),
    usan: [[130.75, 37.42], [130.98, 37.42], [130.98, 37.58], [130.75, 37.58]],
    gr_core: ring(GR918_N, [[128.4, 39.0], [129.9, 37.8], [130.1, 36.9]], RVS(SLL_N).slice(1), RVS(HB_N).slice(1), [[125.8, 36.3], [124.6, 37.4], [124.4, 38.7]]),
    hb: ring(HB_N, HB_E.slice(1), [[127.4, 34.0], [125.5, 33.9], [125.5, 36.2]]),
    sl_late: ring(SLL_N, [[130.1, 36.9], [130.1, 34.95], [128.95, 34.75]], RVS(HB_E).slice(1)),
    gr_north: ring(GRN_N, [[128.3, 39.6]], RVS(GR918_N), [[124.5, 39.3], [124.8, 39.7]]),
    js_core: ring(YALU.slice(0, iY(7) + 1), JC_N.slice(1), [[130.6, 41.0], [130.3, 37.0], [129.35, 35.0], [128.75, 34.4], [126.5, 32.9], [124.0, 33.0], [123.9, 39.6]]),
    j4gun: ring(YALU.slice(iY(7)), J4_E.slice(1), RVS(cut(JC_N, 0, iS(5))).slice(1)),
    j6jin: ring(TUMEN, [[131.1, 42.0], [130.4, 41.4]], RVS(cut(JC_N, iS(5))), RVS(J4_E).slice(1)),
    // 이웃 나라의 넓은 땅 (가장자리를 흐리게 그려요)
    china_w: ring([[114, 35.5], [120.9, 37.9], [121.5, 39.2], [121.7, 40.5]], LIAO, [[124.3, 44.5], [123.5, 47], [114, 47]]),
    china_ming: ring([[114, 35.5], [120.9, 37.9], [123.9, 39.6]], [YALU[0]], [[124.6, 41.0], [124.9, 42.4], [124.3, 44.5], [123.5, 47], [114, 47]]),
    north_far: ring(RVS(GN_N), [[124.3, 43.4], [123.5, 47], [134, 47], [134, 43.0]]),
    north_yalu: ring([[123.9, 39.6]], YALU, TUMEN.slice(1), [[131.0, 42.0], [134, 43.0], [134, 47], [123.5, 47], [124.3, 44.5], [124.9, 42.4], [124.6, 41.0]]),
    north_gr: ring([[123.9, 39.6], [124.5, 39.3]], GRN_N, [[128.4, 40.2], [131.0, 42.0], [134, 43.0], [134, 47], [123.5, 47], [124.3, 44.5], [124.9, 42.4], [124.6, 41.0]]),
    go_big: ring([[121, 38.5], [124.2, 38.3]], GO371_S, [[131.0, 42.0], [134, 43.0], [134, 47], [121, 47]]),
    go_big475: ring([[121, 38.5], [124.3, 37.5], [126.2, 37.15]], GO475_S.slice(0, iS(6) + 1), SL514_N.slice(1), [[130.0, 37.6], [131.0, 42.0], [134, 43.0], [134, 47], [121, 47]]),
    japan: [[129.4, 31], [134, 31], [134, 36.5], [131.5, 35.2], [129.8, 33.9], [129.1, 34.2]],
  };
  // 산줄기 (작은 산 모양을 줄지어 그려요)
  const RANGES = [
    S6([[128.08, 41.98], [128.0, 41.3], [127.6, 40.6], [127.3, 40.0], [127.5, 39.3], [127.9, 38.7], [128.3, 38.15], [128.65, 37.7], [128.95, 37.3], [128.75, 36.95], [128.43, 36.86], [128.0, 36.5], [127.8, 36.0], [127.73, 35.34]]),
    S6([[127.6, 40.6], [127.0, 40.45], [126.6, 40.1]]),
    S6([[127.5, 37.9], [127.2, 37.4], [127.0, 36.9]]),
  ];
  const PEAKS = [["백두산", [128.08, 41.99]], ["한라산", [126.53, 33.36]]];
  const SEAS = [["동해", [130.6, 38.7]], ["서해(황해)", [124.4, 36.6]], ["남해", [127.6, 34.1]]];
  const RIVERS = [YALU, TUMEN, LIAO, NAK,
    S6([[125.15, 38.7], [125.45, 38.9], [125.75, 39.03], [126.05, 39.2], [126.3, 39.4], [126.55, 39.6], [126.75, 39.8]]), // 대동강
    S6([[125.45, 39.55], [125.7, 39.65], [126.0, 39.85], [126.3, 40.05], [126.6, 40.25]]), // 청천강
    S6([[126.6, 37.72], [126.8, 37.62], [126.98, 37.55], [127.2, 37.53], [127.35, 37.53], [127.55, 37.45], [127.75, 37.3], [127.95, 37.15], [128.2, 37.2], [128.45, 37.3]]), // 한강
    S6([[127.35, 37.53], [127.45, 37.75], [127.6, 37.95], [127.75, 38.1], [127.95, 38.3]]), // 북한강
    S6([[126.68, 37.75], [126.85, 37.9], [127.0, 38.0], [127.15, 38.15], [127.3, 38.35]]), // 임진강
    S6([[126.7, 36.0], [126.91, 36.28], [127.12, 36.46], [127.35, 36.45], [127.5, 36.3], [127.55, 36.05], [127.6, 35.85]]), // 금강
    S6([[126.4, 34.8], [126.6, 35.0], [126.75, 35.15], [126.9, 35.15], [127.0, 35.3]]), // 영산강
    S6([[127.75, 34.95], [127.65, 35.2], [127.5, 35.4], [127.3, 35.55], [127.25, 35.75]]), // 섬진강
    S6([[127.9, 42.2], [127.5, 42.6], [127.2, 43.0], [126.9, 43.4], [126.6, 43.8], [126.2, 44.2], [125.7, 44.7], [126.0, 45.2], [126.6, 45.6]]), // 송화강
  ];
  // 나라별 지도: 보이는 범위, 이웃 땅(주인), 우리 땅(처음), 도시, 이름표
  const OWN = { 마한: "#6E9C84", 고구려: "#B85C4A", 백제: "#5F86B5", 신라: "#C99A3B", 가야: "#7FA77A", 후백제: "#5F86B5", 고려: "#2C6A57", 중국: "#9A8FB0", 명: "#9A8FB0", 청: "#9A8FB0", 일본: "#B98A8A", 여진: "#8C9C88", 북방: "#8C9C88", 거란: "#8C9C88" };
  const MAPS = {
    P: { view: [119, 34.6, 132.2, 45.9], start: ["go_core"], me: "고구려",
      others: [["china_w", "중국", "far"], ["north_far", "북방", "far"], ["japan", "일본", "far"], ["go_north", "북방"], ["liaodong", "중국"], ["hwanghae", "백제"], ["bj_core", "백제"], ["mahan", "백제"], ["sl_core", "신라"], ["gaya", "가야"]],
      labels: [["후연(중국)", [120.9, 42.0], "yoseo"], ["부여·말갈", [126.3, 44.5]], ["백제", [126.9, 36.1]], ["신라", [129.0, 36.2]], ["가야", [128.0, 35.2]]],
      cities: [["국내성", [126.19, 41.12], true], ["평양성", [125.75, 39.03]], ["요동성", [123.17, 41.27]], ["한성", [127.1, 37.52]], ["부여성", [125.3, 43.9]]] },
    Q: { view: [123.6, 33.4, 131.0, 40.4], start: ["bj_core"], me: "백제",
      others: [["china_w", "중국", "far"], ["japan", "일본", "far"], ["go_big", "고구려"], ["hwanghae", "고구려"], ["mahan", "마한"], ["sl_core", "신라"], ["gaya", "가야"]],
      labels: [["고구려", [126.6, 40.0]], ["마한", [126.6, 35.0]], ["신라", [129.0, 36.2]], ["가야", [128.0, 35.2]], ["왜", [130.6, 33.6]]],
      cities: [["한성", [127.1, 37.52], true], ["평양성", [125.75, 39.03]], ["치양", [126.0, 38.2]], ["금성(경주)", [129.21, 35.84]]] },
    R: { view: [123.8, 33.4, 131.4, 41.0], start: ["sl_core"], me: "신라",
      others: [["japan", "일본", "far"], ["go_big475", "고구려"], ["bj6", "백제"], ["gaya", "가야"]],
      labels: [["고구려", [126.8, 39.6]], ["백제", [126.6, 35.6]], ["가야", [128.0, 35.2]], ["우산국", [130.85, 37.75]], ["왜", [130.6, 33.6]]],
      cities: [["금성(경주)", [129.21, 35.84], true], ["사비", [126.91, 36.28]], ["관산성", [127.57, 36.31]], ["국원성(충주)", [127.93, 36.99]]] },
    T: { view: [123.4, 33.4, 131.2, 41.4], start: ["gr_core"], me: "고려",
      others: [["china_w", "중국", "far"], ["north_gr", "거란", "far"], ["japan", "일본", "far"], ["gr_north", "북방"], ["hb", "후백제"], ["sl_late", "신라"]],
      labels: [["발해 → 거란", [125.6, 40.8]], ["후백제", [126.9, 35.5]], ["신라", [129.0, 36.0]]],
      cities: [["개경", [126.55, 37.97], true], ["서경(평양)", [125.75, 39.03]], ["완산주(전주)", [127.15, 35.82]], ["금성(경주)", [129.21, 35.84]], ["공산(대구)", [128.6, 35.95]], ["고창(안동)", [128.73, 36.57]]] },
    U: { view: [123.4, 33.4, 132.0, 43.6], start: ["js_core"], me: "조선",
      others: [["china_ming", "명", "far"], ["japan", "일본", "far"], ["north_yalu", "여진"], ["j4gun", "여진"], ["j6jin", "여진"]],
      labels: [["여진", [128.6, 43.2]], ["명나라", [123.0, 41.6]], ["대마도", [129.3, 34.2]], ["일본", [131.3, 33.6]]],
      cities: [["한양", [126.98, 37.57], true], ["평양", [125.75, 39.03]], ["경원", [130.3, 42.6]], ["여연", [126.5, 41.35]], ["부산포", [129.04, 35.1]]] },
  };
  // 조선 시대 나라들: 같은 땅, 다른 이웃
  const JS_FULL = ["js_core", "j4gun", "j6jin"];
  for (const k of ["E", "F", "K", "V", "J"]) MAPS[k] = { view: [123.0, 33.0, 132.2, 43.6], start: JS_FULL.slice(), me: k === "J" ? "대한 제국" : "조선",
    others: [["china_ming", k === "E" ? "명" : "청", "far"], ["japan", "일본", "far"], ["north_yalu", k === "J" ? "청" : "여진"]],
    labels: [[k === "J" ? "청·러시아" : k === "F" ? "후금 → 청" : k === "E" ? "명나라" : "청나라", [124.6, 42.6]], ["일본", [131.3, 33.6]]],
    cities: [["한양", [126.98, 37.57], true], ["평양", [125.75, 39.03]], ["의주", [124.4, 40.2]], ["부산", [129.04, 35.1]]].concat(k === "F" ? [["남한산성", [127.18, 37.48]], ["강화도", [126.45, 37.72]]] : k === "E" ? [["한산도", [128.48, 34.75]], ["행주산성", [126.82, 37.6]]] : k === "J" ? [["청산리", [128.9, 42.6]]] : k === "V" ? [["청주", [127.49, 36.64]]] : []) };

  const hasMap = () => !!MAPS[S.scen];
  function terrInit() { if (MAPS[S.scen]) { S.terr = MAPS[S.scen].start.slice(); S.terr0 = S.terr.slice(); S.gain = []; } else { S.terr = null; } }
  function gainTerr(id) { if (!S.terr) return; if (!S.terr.includes(id)) { S.terr.push(id); (S.gain = S.gain || []).push(id); } }
  function loseTerr() { if (!S.terr) return null; const extra = S.terr.filter((x) => !(S.terr0 || []).includes(x)); const id = extra[extra.length - 1]; if (id) { S.terr = S.terr.filter((x) => x !== id); return id; } return null; }
  const ownsTerr = (id) => !!(S.terr && S.terr.includes(id));
  const TNAME = { liaodong: "요동", go_north: "부여·말갈 땅", go_south: "한강 유역", mahan: "마한 땅", hwanghae: "황해도", gaya: "가야", sl_han: "한강 유역", sl_ne: "동해안 북쪽", usan: "우산국", hb: "후백제 땅", sl_late: "신라 땅", gr_north: "청천강 남쪽", j4gun: "4군", j6jin: "6진" };

  // 지도 그리기. arrows: [{ from:[lo,la], to:[lo,la], kind:"enemy"|"ours"|"plan", label }]
  let MAPN = 0;
  function mapSVG(o) {
    const M = MAPS[S.scen]; if (!M) return "";
    geoUse(M.geo);
    o = o || {};
    const id = "m" + (++MAPN);
    const terr0 = o.terr || S.terr || M.start, inV = (p) => p[0] >= M.view[0] && p[0] <= M.view[2] && p[1] >= M.view[1] && p[1] <= M.view[3];
    const wide = M.wide && (M.wide.ids.some((x) => terr0.includes(x)) || (o.arrows || []).some((ar) => !inV(ar.to) || !inV(ar.from)));
    const [lo0, la0, lo1, la1] = wide ? M.wide.view : M.view, a = PJ([lo0, la1]), b = PJ([lo1, la0]);
    const vb = [a[0], a[1], b[0] - a[0], b[1] - a[1]].map((v) => v.toFixed(0)).join(" ");
    const terr = o.terr || S.terr || M.start, gain = o.gain || [];
    const fs = M.geo ? (b[0] - a[0]) / 30 : Math.max(13, (b[0] - a[0]) / 34), msc = M.geo ? Math.min(1, (b[0] - a[0]) / 400) : 1;
    const lab = (t, p, cls) => { const [x, y] = PJ(p); return `<text class="ml ${cls || ""}" x="${x.toFixed(0)}" y="${y.toFixed(0)}" font-size="${(cls === "big" ? fs * 1.25 : cls === "sm" ? fs * 0.82 : fs).toFixed(0)}">${esc(t)}</text>`; };
    let s = `<svg class="map" style="--mk:${msc.toFixed(2)}" viewBox="${vb}" role="img" aria-label="${esc(M.me)} 주변 지도"><defs><clipPath id="${id}c"><path d="${LAND}"/></clipPath>
      <marker id="${id}e" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="var(--map-enemy)"/></marker>
      <marker id="${id}o" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="var(--map-ours)"/></marker></defs>
      <rect x="${a[0]}" y="${a[1]}" width="${b[0] - a[0]}" height="${b[1] - a[1]}" fill="var(--map-sea)"/><path d="${LAND}" fill="var(--map-land)"/><g clip-path="url(#${id}c)">`;
    // 이웃 나라: 먼 땅은 가장자리를 흐리게, 가까운 나라는 또렷하게
    const fill = (own) => `color-mix(in srgb, ${OWN[own] || "#8C8C8C"} 30%, var(--map-land))`;
    const far = M.others.filter((x) => x[2] === "far" && !terr.includes(x[0])), near = M.others.filter((x) => x[2] !== "far" && !terr.includes(x[0]));
    s += `<filter id="${id}b" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="${(fs * 0.9).toFixed(1)}"/></filter><g filter="url(#${id}b)">${far.map(([rid, own]) => `<path d="${ptsPath(REG[rid], true)}" style="fill:${fill(own)}"/>`).join("")}</g>`;
    s += near.map(([rid, own]) => `<path d="${ptsPath(REG[rid], true)}" style="fill:${fill(own)}"/>`).join("");
    s += `<g class="nbline">${near.map(([rid]) => `<path d="${ptsPath(REG[rid], true)}"/>`).join("")}</g>`;
    // 우리 땅: 테두리를 먼저 굵게 그리고 그 위에 칠해서, 우리 땅끼리 맞닿은 안쪽 선은 감춰요
    s += `<g class="mine-edge">${terr.map((rid) => `<path d="${ptsPath(REG[rid], true)}"/>`).join("")}</g>`;
    s += terr.map((rid) => `<path d="${ptsPath(REG[rid], true)}" class="mine ${gain.includes(rid) ? "gain" : ""}"/>`).join("");
    s += `</g><path d="${LAND}" fill="none" stroke="var(--map-coast)" stroke-width="1.1" stroke-linejoin="round"/>`;
    if (!M.geo) for (const r of RIVERS) s += `<path d="${ptsPath(r)}" fill="none" stroke="var(--map-river)" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>`;
    // 산줄기
    const mk = fs * 0.32; let mt = "";
    if (!M.geo) for (const rg of RANGES) { let acc = 99; for (let i = 1; i < rg.length; i++) { const [x0, y0] = PJ(rg[i - 1]), [x1, y1] = PJ(rg[i]); acc += Math.hypot(x1 - x0, y1 - y0); if (acc >= mk * 2.6) { acc = 0; if (x1 < a[0] || x1 > b[0] || y1 < a[1] || y1 > b[1]) continue; mt += `M${(x1 - mk).toFixed(1)} ${(y1 + mk * 0.55).toFixed(1)}L${x1.toFixed(1)} ${(y1 - mk * 0.6).toFixed(1)}L${(x1 + mk).toFixed(1)} ${(y1 + mk * 0.55).toFixed(1)}`; } } }
    s += `<path d="${mt}" class="mrange"/>`;
    if (!M.geo) for (const [n, p] of PEAKS) { const [x, y] = PJ(p); if (x < a[0] || x > b[0] || y < a[1] || y > b[1]) continue; s += `<path d="M${(x - mk * 1.4).toFixed(1)} ${(y + mk).toFixed(1)}L${x.toFixed(1)} ${(y - mk * 1.2).toFixed(1)}L${(x + mk * 1.4).toFixed(1)} ${(y + mk).toFixed(1)}Z" class="mpeak"/>` + lab(n, [p[0] + 0.15, p[1] - 0.12], "sm pk"); }
    if (!M.geo) for (const [n, p] of SEAS) { const [x, y] = PJ(p); if (x < a[0] || x > b[0] || y < a[1] || y > b[1]) continue; s += `<text class="ml sea" x="${x.toFixed(0)}" y="${y.toFixed(0)}" font-size="${(fs * 0.95).toFixed(0)}">${esc(n)}</text>`; }
    // 이름표
    for (const [t, p, hideIf] of M.labels) if (!(hideIf && terr.includes(hideIf))) s += lab(t, p);
    const meAt = terr.length && RLAB[terr[0]] ? PJ(RLAB[terr[0]]) : null;
    // 도시
    for (const [n, p, cap] of M.cities) { const [x, y] = PJ(p); s += cap ? `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(fs * 0.42).toFixed(1)}" class="mcap"/><circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(fs * 0.18).toFixed(1)}" fill="var(--map-ink)"/>` : `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(fs * 0.22).toFixed(1)}" class="mcity"/>`; s += lab(n, [p[0] + 0.12, p[1] + 0.1], "sm"); }
    // 화살표
    for (const ar of o.arrows || []) {
      const [x1, y1] = PJ(ar.from), [x2, y2] = PJ(ar.to), mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, bend = ar.bend ?? 0.18;
      const cx = mx - dy * bend, cy = my + dx * bend, en = ar.kind === "enemy";
      s += `<path d="M${x1.toFixed(0)} ${y1.toFixed(0)}Q${cx.toFixed(0)} ${cy.toFixed(0)} ${x2.toFixed(0)} ${y2.toFixed(0)}" class="marrow ${ar.kind || "ours"}" marker-end="url(#${id}${en ? "e" : "o"})"/>`;
      if (ar.label) s += `<text class="ml arl ${en ? "en" : "ou"}" x="${(x1 * 0.6 + cx * 0.4).toFixed(0)}" y="${(y1 * 0.6 + cy * 0.4 - fs * 0.4).toFixed(0)}" font-size="${(fs * 0.9).toFixed(0)}">${esc(ar.label)}</text>`;
    }
    if (meAt) s += `<text class="ml big me" x="${meAt[0].toFixed(0)}" y="${meAt[1].toFixed(0)}" font-size="${(fs * 1.25).toFixed(0)}">${esc(o.meName || NATION())}</text>`;
    return s + `</svg>`;
  }
  // 이번 사건·고른 정책에서 나오는 화살표
  function mapArrows() {
    const out = [];
    const ev = S.ev && EV[S.ev];
    if (ev && ev.arrows && S.phase === "event") out.push(...ev.arrows());
    if (S.phase === "policy") for (const id of S.picks) if (P[id] && P[id].dir) out.push(Object.assign({ kind: "plan" }, P[id].dir));
    return out;
  }
  function mapPanel(title, opt) {
    if (!hasMap()) return "";
    const ar = (opt && opt.arrows) || mapArrows();
    const legend = `<span class="mleg"><i class="lg-me"></i>우리 땅</span>${ar.some((x) => x.kind === "enemy") ? `<span class="mleg"><i class="lg-en"></i>쳐들어오는 길</span>` : ""}${ar.some((x) => x.kind !== "enemy") ? `<span class="mleg"><i class="lg-ou"></i>우리 군대가 갈 길</span>` : ""}${(opt && opt.gain && opt.gain.length) ? `<span class="mleg"><i class="lg-gain"></i>새로 얻은 땅</span>` : ""}`;
    return `<details class="panel mappanel" ${UI.mapClosed ? "" : "open"}><summary><b>${esc(title || "지도")}</b> <span class="sub">${legend}</span></summary>${mapSVG({ arrows: ar, gain: opt && opt.gain, terr: opt && opt.terr })}<p class="sub mnote">${S.phase === "policy" && !ar.length ? "'○○ 정복', '○○ 차지하기' 같은 정책 카드를 담으면 우리 군대가 갈 길이 파란 화살표로 그려져요. " : ""}지도의 경계는 교과서 지도를 바탕으로 한 대략적인 모습이에요.</p></details>`;
  }
