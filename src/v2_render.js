  // ================= 그리기 =================
  const statBox = (x, v, ch) => `<div class="stat ${v < 15 ? "danger" : v < 25 ? "low" : ""} ${ch ? "flash" : ""}" title="${esc(x.d)}"><span class="seal">${x.h}</span><span class="n">${x.n}</span><span class="v">${v}</span><span class="meter"><i style="width:${v}%"></i></span></div>`;
  function renderBar(before) {
    const bar = $("bar");
    if (S.phase === "start" || S.phase === "end") { bar.hidden = true; bar.innerHTML = ""; return; }
    bar.hidden = false;
    bar.innerHTML = `<div class="who"><b>${esc(NATION())}</b><span>${esc(KING())} · ${S.turn}/${TURNS}시기 (${esc(era(S.turn))})</span><span class="inc">${esc(SN.gold)} 수입 매 시기 +${4 + S.inc}</span><button type="button" class="btn small" id="btnNew">새 게임</button></div>
      <div class="stats">${ST.map((x) => statBox(x, S.st[x.k], before && before[x.k] !== S.st[x.k])).join("")}</div>`;
  }
  const chips = (d) => Object.keys(d || {}).length ? `<div class="chips">${ST.filter((x) => d[x.k]).map((x) => `<span class="chip ${d[x.k] > 0 ? "up" : "down"}">${x.n} ${d[x.k] > 0 ? "+" : ""}${d[x.k]}</span>`).join("")}</div>` : `<div class="chips"><span class="chip">변화 없음</span></div>`;
  const arrows = (v) => { const n = Math.abs(v) >= 12 ? 3 : Math.abs(v) >= 7 ? 2 : 1; return (v > 0 ? "▲" : "▼").repeat(n); };
  const signed = (v) => (v > 0 ? `+${v}` : `${v}`);
  const timeline = () => `<div class="timeline" style="grid-template-columns:repeat(${TURNS},1fr)" aria-label="재위 ${TURNS}시기 중 ${S.turn}시기">${Array.from({ length: TURNS }, (_, i) => `<span class="${i + 1 < S.turn ? "done" : i + 1 === S.turn ? "on" : ""}"></span>`).join("")}</div>`;
  const stars = (n) => (n > 5 ? `<span class="stars hell" aria-label="어려움 ${n}">${"★".repeat(n)}</span>` : `<span class="stars" aria-label="어려움 ${n}">${"★".repeat(n)}<i>${"★".repeat(5 - n)}</i></span>`);

  function irworobongdo() {
    // 일월오봉도: 가운데 큰 봉우리를 사이에 두고 오른쪽에 붉은 해, 왼쪽에 흰 달
    const peaks = [[60, 230, 175], [190, 300, 120], [300, 420, 70], [410, 520, 120], [540, 660, 175]];
    return `<svg class="screen" viewBox="0 0 720 260" role="img" aria-label="일월오봉도를 본뜬 그림: 해와 달, 다섯 봉우리">
      <rect width="720" height="260" fill="var(--sky)" opacity="0.18"/>
      <circle cx="590" cy="70" r="30" fill="var(--sun)"/>
      <circle cx="130" cy="70" r="28" fill="var(--moon)" stroke="var(--line)" stroke-width="2"/>
      ${peaks.map(([l, r, top], i) => { const m = (l + r) / 2; return `<path d="M${l - 40} 225 L${m} ${top} L${r + 40} 225 Z" fill="var(--peak)" opacity="${0.75 + (i % 2) * 0.15}"/><path d="M${m - 12} ${top + 16} L${m} ${top} L${m + 12} ${top + 16}" fill="none" stroke="var(--moon)" stroke-width="5" stroke-linecap="round"/>`; }).join("")}
      ${[40, 680].map((x) => `<rect x="${x - 4}" y="150" width="8" height="70" fill="var(--sun)" opacity=".85"/><circle cx="${x}" cy="150" r="22" fill="var(--peak)"/><circle cx="${x - 14}" cy="168" r="15" fill="var(--peak)"/><circle cx="${x + 14}" cy="168" r="15" fill="var(--peak)"/>`).join("")}
      ${[0, 1, 2].map((r) => `<path d="M0 ${228 + r * 11} ${Array.from({ length: 19 }, (_, i) => `Q ${i * 40 + 20} ${222 + r * 11} ${i * 40 + 40} ${228 + r * 11}`).join(" ")}" fill="none" stroke="var(--wave)" stroke-width="4"/>`).join("")}
    </svg>`;
  }

  function renderStart() {
    const sel = (i) => `<label class="gsel"><span class="no">${i + 1}</span><span class="sub">${["가장 중요하게 여길 것", "두 번째로 중요한 것", "세 번째로 중요한 것"][i]}</span>
      <select id="goal${i}" data-goal="${i}">${ST.map((x) => `<option value="${x.k}" ${S.goals[i] === x.k ? "selected" : ""}>${x.h} ${x.n} — ${esc(x.d)}</option>`).join("")}</select><b class="bonus">즉위 교서 +${GOAL_BONUS[i]}</b></label>`;
    return `<section class="hero">
      ${irworobongdo()}
      <h1>왕BTI</h1>
      <p class="lead"><b>내가 왕이라면, 나는 어떤 왕일까?</b> 왕의 의자 뒤에는 해와 달, 다섯 봉우리를 그린 병풍(일월오봉도)이 놓였어요. 오늘부터 여러분이 그 앞에 앉아 30년 동안 나라를 다스려요. 어떤 정책을 먼저 펼칠지, 무엇을 미룰지에 따라 나라의 운명이 바뀌어요. 다스림이 끝나면 역사 속 어떤 왕과 가장 닮았는지 공개돼요.</p>
    </section>
    <section class="panel"><h2>1. 왕과 나라의 이름</h2>
      <div class="row"><label class="field"><span class="sub">왕의 이름</span><input id="kingName" maxlength="10" placeholder="예: 해솔" value="${esc(S.king)}"></label>
      <label class="field"><span class="sub">나라 이름 (상상 속 나라에서만 써요)</span><input id="nationName" maxlength="10" placeholder="예: 푸른 나라" value="${esc(S.nation)}"></label></div></section>
    <section class="panel"><h2>2. 어떤 나라의 왕이 될까요?</h2>
      <p class="sub">★이 많을수록 어려워요. ★★★★ 나라는 첫 시기부터 큰 위기가 기다리고, ★★★★★ 나라는 역사 속에서 가장 혹독했던 때예요. 같은 나라도 판마다 다른 사건과 선택지가 나와요.</p>
      ${[["우리 역사 속 나라 · 지도와 함께", (v) => v.real], ["상상 속 나라 · 이름 없는 왕국", (v) => !v.world && !v.real], ["세계사 속 나라", (v) => v.world]].map(([gname, gf]) => `<h3 class="sgroup">${gname}</h3>
      <div class="scens">${Object.entries(SCEN).filter(([, v]) => gf(v)).sort((x, y) => (x[1].year || 0) - (y[1].year || 0)).map(([k, v]) => `<button type="button" class="scen ${v.war || k === "F" ? "warlike" : ""} ${v.warn ? "hellcard" : ""}" data-scen="${k}" aria-pressed="${S.scen === k}">
        <span class="sh"><b>${esc(v.name)}</b>${stars(v.star)}</span>
        <span class="tags">${v.strong ? `<span class="tag good">처음부터 강한 나라</span>` : ""}${v.war ? `<span class="tag war">전쟁 중</span>` : ""}${k === "F" ? `<span class="tag war">전쟁 직전</span>` : ""}${k === "G" ? `<span class="tag world">정복과 통일</span>` : ""}${k === "H" ? `<span class="tag war">혁명 직전</span>` : ""}${v.tag ? `<span class="tag ${v.tag[0]}">${esc(v.tag[1])}</span>` : ""}</span>
        ${v.warn ? `<span class="hellwarn">⚠ ${esc(v.warn)}</span>` : ""}<span>${esc(v.text)}</span>
        <span class="mini">${ST.map((x) => `<i>${x.h}<b>${v.st[x.k]}</b></i>`).join("")}</span>
        <small>${esc(v.like)}${v.done.length ? ` · 이미 있는 제도: ${v.done.map((d) => P[d].name).join(", ")}` : ""}</small></button>`).join("")}</div>`).join("")}</section>
    <section class="panel"><h2>3. 나의 다스림 원칙</h2>
      <p class="sub">무엇을 가장 중요하게 여길지 골라요. 왕위에 오르는 날 원칙을 담은 글(즉위 교서)을 내려 고른 능력치가 조금 올라가요. 게임이 끝나면 처음 다짐과 실제 결과를 비교해요.</p>
      <div class="gsels">${[0, 1, 2].map(sel).join("")}</div></section>
    <section class="panel"><h2>게임 방법</h2>
      <ol class="qs"><li>한 시기(3년)마다 먼저 <b>나라에 일어난 일</b>에 답해요.</li>
        <li>그다음 <b>나라 살림 방법</b>을 하나 고르고, <b>국정 힘</b>만큼 정책 카드를 골라 <b>실행할 순서</b>를 정해요. 쓰지 않은 국정 힘은 다음 시기로 넘어가요(최대 2).</li>
        <li>정책에는 먼저 해야 하는 정책, 함께하면 좋은 정책, 때를 잘 맞춰야 하는 정책이 있어요. 카드의 주황색 글씨를 꼭 읽어요.</li>
        <li><b>능력치 하나라도 0이 되면 그 자리에서 나라가 무너져요!</b> 역사 속 실제로 있었던 최악의 순간이 펼쳐져요.</li>
        <li>10시기(30년)를 버티면 나라의 운명, 역사책이 붙인 이름(묘호), 나와 닮은 왕이 공개돼요.</li></ol>
      <div class="row"><button type="button" class="btn go" id="btnStart">왕위에 오르기</button></div></section>`;
  }

  function renderEvent() {
    const ev = EV[S.ev];
    const base = ev.base ? Object.entries(ev.base()).filter(([, v]) => v) : [];
    return watchBox() + `<section class="era"><h2>${S.turn}시기 · ${esc(era(S.turn))}</h2><span class="t">나라에 일어난 일</span></section>${timeline()}<div class="${hasMap() ? "evgrid" : ""}">${mapPanel("지도 · 이번에 일어난 일")}
    <section class="panel"><div class="event"><div class="bigseal ${S.ev === "breach" || S.ev === "weakking" || S.ev === "revolt" || S.ev === "empty" || S.ev === "rebel" ? "alarm" : ""}" aria-hidden="true">${ev.h}</div><div style="display:grid;gap:10px;min-width:0">
      <h3>${esc(ev.title)}</h3><p class="txt">${esc(ev.text())}</p>${base.length ? `<p class="sub">이 일로 이미 피해가 생겼어요: ${base.map(([k, v]) => `${SN[k]} ${v}`).join(", ")}</p>` : ""}
      <div class="choices">${(() => { const all = ev.choices(); return shown().map((i) => [all[i], i]).filter(([c]) => c); })().map(([c, i]) => `<button type="button" class="choice ${c.risk ? "gamble" : ""}" data-choice="${i}">${c.risk || freshChoice(i) ? `<span class="badges">${c.risk ? `<span class="riskb">모험 · 성공 확률 약 ${Math.round(c.risk * 100)}%</span>` : ""}${freshChoice(i) ? `<span class="newb">안 가 본 길</span>` : ""}</span>` : ""}<b>${esc(c.label)}</b>${c.hint ? `<small>${esc(c.hint)}</small>` : ""}</button>`).join("")}</div></div></div></section></div>`;
  }

  function advice() {
    const a = [], s = S.st;
    const danger = ST.filter((x) => s[x.k] < 15);
    if (danger.length) a.push(`위험! ${danger.map((x) => `${x.n} ${s[x.k]}`).join(", ")} — 0이 되면 그 즉시 나라가 무너져요.`);
    const low = ST.filter((x) => s[x.k] >= 15 && s[x.k] < 30).map((x) => x.n);
    if (low.length) a.push(`${jo(low.join(", "), "이", "가")} 낮아요. 그대로 두면 위기 사건이 일어날 수 있어요.`);
    if (!"EFGHJKLM".includes(S.scen) && S.turn === 4) a.push("다음 시기에 큰 나라가 쳐들어온다는 소문이 있어요. 국방을 살펴 두세요.");
    if (S.scen === "G" && S.turn === 2) a.push("서쪽의 큰 나라와 사이가 나빠지고 있다는 소문이 있어요. 군대를 살펴 두세요.");
    if (S.scen === "G" && S.turn === 4) a.push("장수들이 더 먼 정복을 꿈꾸고 있어요. 국방이 50 아래면 정복 전쟁이 위험해요.");
    if (S.scen === "H" && S.turn === 1) a.push("금고와 민심이 바닥 가까이에 있어요! 둘 중 하나라도 0이 되면 그 즉시 나라가 무너져요.");
    if (S.scen === "H" && S.turn === 3) a.push("이웃 왕국들이 군대를 모으고 있어요. 국방을 키우거나 시민의 마음을 얻어 두세요.");
    if (S.scen === "H" && S.turn === 5) a.push("전투마다 이기는 젊은 장군의 소문이 들려요.");
    if (S.scen === "F" && S.turn === 2) a.push("다음 시기에 북쪽의 새 나라가 무리한 요구를 해 올 거라는 소문이 있어요. 성과 군대를 살펴 두세요.");
    if (S.scen === "E" && S.turn === 4) a.push("일본군이 다시 쳐들어올 준비를 한다는 소문이 있어요. 국방을 키워 두세요.");
    if (ADV5[S.scen]) a.push(...ADV5[S.scen](S.turn).filter(Boolean));
    if (S.turn === 7 && !"JKLM".includes(S.scen)) a.push("하늘의 기운이 심상치 않아요. 큰 재난에 대비해 곳간과 민심을 챙겨 두세요.");
    if (s.gold < 10) a.push("곳간이 거의 비어 이번 시기에 쓸 수 있는 국정 힘이 줄었어요. '세금 더 걷기'나 '장터 열기'로 곳간을 채워요. '무역선 띄우기'는 크게 벌 수도, 잃을 수도 있어요.");
    if (s.gold >= 75) a.push("곳간이 넉넉해 이번 시기에는 국정 힘이 하나 더 있어요.");
    if (S.saved) a.push(`지난 시기에 아껴 둔 국정 힘 ${S.saved}개가 더해졌어요.`);
    if (!has("law") && S.turn <= 3 && S.scen !== "L") a.push("나라의 틀(율령)이 없으면 할 수 없는 정책이 많아요.");
    if (S.tyr >= 3) a.push("신하들 사이에 왕이 너무 무섭다는 말이 돌아요. 역사책에 어떻게 남을지 생각해 보세요.");
    if (s.kp < 30 && !has("purge") && polVisible(P.purge)) a.push("왕권이 낮을 때 숙청을 하면 반란이 일어날 수 있어요.");
    return a.slice(0, 5);
  }

  function renderPolicy() {
    const ap = apPoints(), used = usedPoints(), errs = queueErrors();
    const ev = S.evRes, adv = advice(), pj = projection();
    const list = POL.filter((p) => polVisible(p) && (UI.cat === "all" || p.cat === UI.cat));
    return watchBox() + `<section class="era"><h2>${S.turn}시기 · ${esc(era(S.turn))}</h2><span class="t">살림과 정책 고르기</span></section>${timeline()}${featStrip()}
    <section class="result ${ev.risk ? (ev.ok ? "won" : "lost") : ""}">${ev.risk ? `<span class="dice">${ev.ok ? "모험 성공!" : "모험 실패…"}</span>` : ""}<b>${esc(ev.title)} — ${esc(ev.choice)}</b><p>${esc(ev.text)}</p>${chips(ev.delta)}</section>
    ${adv.length ? `<section class="advice"><b>신하의 조언</b><ul>${adv.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></section>` : ""}
    <section class="panel"><div class="ap"><h2>이번 시기 나라 살림</h2><span class="sub">국정 힘이 들지 않아요. 하나를 골라요.</span></div>
      <div class="econ" role="radiogroup" aria-label="나라 살림 방법">${ECON.map((e) => `<label class="eopt ${S.econ === e.id ? "on" : ""} ${e.risk ? "gamble" : ""}"><input type="radio" name="econ" value="${e.id}" ${S.econ === e.id ? "checked" : ""}><b>${esc(e.name)}</b>${e.risk ? `<span class="riskb">성공 확률 약 ${Math.round(e.chance() * 100)}%</span><span class="sub">성공하면</span>` : ""}<span class="chips">${Object.keys(e.d).length ? ST.filter((x) => e.d[x.k]).map((x) => `<span class="chip ${e.d[x.k] > 0 ? "up" : "down"}">${x.n} ${signed(e.d[x.k])}</span>`).join("") : `<span class="chip">변화 없음</span>`}</span>${e.risk ? `<span class="sub">실패하면</span><span class="chips">${ST.filter((x) => e.fail[x.k]).map((x) => `<span class="chip down">${x.n} ${signed(e.fail[x.k])}</span>`).join("")}</span>` : ""}</label>`).join("")}</div></section>
    <section class="panel"><div class="ap"><h2>이번 시기에 펼칠 정책</h2><span class="pips" aria-label="국정 힘 ${ap} 중 ${used} 사용">${Array.from({ length: ap }, (_, i) => `<i class="${i < used ? "on" : ""}"></i>`).join("")}</span><span class="sub">국정 힘 ${used}/${ap}${S.saved ? ` (아껴 둔 힘 ${S.saved} 포함)` : ""}</span></div>
      <p class="sub">위에서부터 차례로 실행돼요. 먼저 해야 하는 정책을 위에 두세요. 남긴 국정 힘은 다음 시기로 넘어가요(최대 2).</p>
      ${S.picks.length ? `<div class="queue">${S.picks.map((id, i) => `<div class="qi ${errs[id] ? "err" : ""}"><span class="no">${i + 1}</span><span><b>${esc(P[id].name)}</b> <span class="sub">힘 ${P[id].cost}</span>${errs[id] ? `<br><span class="warn">${esc(errs[id])}</span>` : ""}</span><span class="row"><button type="button" class="btn small" data-qup="${i}" ${i === 0 ? "disabled" : ""} aria-label="위로">▲</button><button type="button" class="btn small" data-qdn="${i}" ${i === S.picks.length - 1 ? "disabled" : ""} aria-label="아래로">▼</button><button type="button" class="btn small" data-pick="${id}">빼기</button></span></div>`).join("")}</div>` : `<p class="sub">아래 카드를 눌러 정책을 담아요.</p>`}
      ${pj.zero.length ? `<p class="danger-note">이대로 하면 ${jo(pj.zero.map((k) => SN[k]).join(", "), "이", "가")} 0 아래로 떨어질 수 있어요! 0이 되면 그 즉시 나라가 무너져요.</p>` : pj.low.length ? `<p class="warn-note">이대로 하면 ${pj.low.map((k) => `${SN[k]} 약 ${pj.st[k]}`).join(", ")}까지 떨어져요. 조심하세요.</p>` : ""}
      ${UI.msg ? `<p class="warn-note">${esc(UI.msg)}</p>` : ""}
      <div class="row"><button type="button" class="btn go" id="btnRun" ${Object.keys(errs).length ? "disabled" : ""}>${S.picks.length ? "이 순서로 실행하기" : "정책 없이 이번 시기 보내기"}</button></div></section>
    ${mapPanel("지도 · 우리 군대가 갈 길")}
    <section class="tabs" role="group" aria-label="정책 종류">${[["all", "전체"], ...Object.entries(CATS).map(([k, v]) => [k, `${v.h} ${v.n}`])].map(([k, n]) => `<button type="button" data-cat="${k}" aria-pressed="${UI.cat === k}">${esc(n)}</button>`).join("")}</section>
    <section class="cards">${list.map((p) => policyCard(p)).join("")}</section>`;
  }
  function policyCard(p) {
    const c = CATS[p.cat];
    const done = !!usedUp(p), picked = S.picks.indexOf(p.id);
    const lock = done ? null : lockReason(p, S.picks.slice(0, picked >= 0 ? picked : S.picks.length));
    const d = S.done.find((x) => x.id === p.id);
    return `<button type="button" class="card ${done ? "done" : ""} ${!done && picked < 0 && lock ? "locked" : ""}" style="--cc:${c.c}" data-pick="${p.id}" aria-pressed="${picked >= 0}" aria-disabled="${done}">
      <span class="top"><span class="cat" aria-hidden="true">${c.h}</span><span>${p.legend ? `<span class="ifb legend">전설의 히든 정책!</span>` : ""}${p.uniq ? `<span class="ifb uniq">숨은 역사</span>` : ""}${featOfCard(p) ? `<span class="ifb feat">왕의 위업 · ${esc(featOfCard(p))}</span>` : ""}${p.ifs ? `<span class="ifb ${p.ultra ? "ultra" : ""}">${p.ultra ? "만약에? · 초모험" : "만약에? · 역사적 상상"}</span>` : ""}<h4>${esc(p.name)}</h4><span class="who">${esc(p.sub)} · ${esc(p.kings)}${WORLD() && p.w ? `<br><span class="wex">세계: ${esc(p.w)}</span>` : ""}</span></span><span class="cost pips" aria-label="국정 힘 ${p.cost}">${Array.from({ length: p.cost }, () => `<i class="on"></i>`).join("")}</span></span>
      <span class="eff">${Object.entries(p.eff).filter(([, v]) => v).map(([k, v]) => `<span>${SN[k]} <b class="${v > 0 ? "u" : "d"}">${arrows(v)}</b></span>`).join("")}${p.inc ? `<span class="incb">매 시기 수입 <b class="u">+${p.inc}</b></span>` : ""}${p.risky && !p.gamble ? `<span><b class="d">실패할 수도</b></span>` : ""}</span>
      ${p.gamble ? `<span class="riskb">모험 · 성공 확률 약 ${Math.round(p.chance() * 100)}%</span><span class="eff fail">실패하면 ${Object.entries(p.fail).map(([k, v]) => `<span>${SN[k]} <b class="d">${arrows(v)}</b></span>`).join("")}</span>` : ""}
      ${p.note ? `<span class="note">${esc(p.note)}</span>` : ""}
      ${done ? `<span class="badge">${d && d.by === "start" ? "✓ 처음부터 있던 제도예요" : `${d && d.ok === false ? "✕" : "✓"} ${d ? d.turn : ""}시기에 ${d && d.ok === false ? "시도했어요" : "했어요"}`}</span>` : picked >= 0 ? `<span class="badge">${picked + 1}번째로 실행</span>` : lock ? `<span class="lock">${esc(lock)}</span>` : ""}
    </button>`;
  }

  function logEntries(L) {
    return `<div class="entry"><span class="h" aria-hidden="true">${L.ev.h}</span><div><b>${esc(L.ev.title)}</b> <span class="sub">${esc(L.ev.choice)}</span><p>${esc(L.ev.text)}</p>${chips(L.ev.delta)}</div></div>
      ${L.econ ? `<div class="entry ${L.econ.risk && !L.econ.ok ? "fail" : ""}" style="--cc:var(--bronze)"><span class="h" aria-hidden="true">財</span><div><b>나라 살림: ${esc(L.econ.name)}</b>${L.econ.risk ? ` <span class="chip ${L.econ.ok ? "up" : "down"}">${L.econ.ok ? "성공" : "실패"}</span>` : ""}<p>${esc(L.econ.text)}</p>${chips(L.econ.delta)}</div></div>` : ""}
      ${L.res.map((r) => { const p = P[r.id]; return `<div class="entry ${r.ok ? "" : "fail"}" style="--cc:${CATS[p.cat].c}"><span class="h" aria-hidden="true">${CATS[p.cat].h}</span><div><b>${esc(p.name)}</b>${r.ok ? "" : ` <span class="chip down">실패</span>`}<p>${esc(r.text)}</p>${chips(r.delta)}</div></div>`; }).join("")}
      ${treasureEntries(L)}${featEntries(L)}
      ${L.econ && !L.res.length && !L.cut ? `<p class="sub">이번 시기에는 새 정책 없이 힘을 아꼈어요.</p>` : ""}
      ${L.drift ? `<div class="entry"><span class="h" aria-hidden="true">年</span><div><b>세월의 흐름</b><p>${esc(L.driftParts.join(" · "))}</p>${chips(L.drift)}</div></div>` : ""}`;
  }
  function renderResult() {
    const L = S.log[S.log.length - 1];
    const gained = S.terr && S.terrTurn ? S.terr.filter((x) => !S.terrTurn.includes(x)) : [], lostT = S.terr && S.terrTurn ? S.terrTurn.filter((x) => !S.terr.includes(x)) : [];
    const chg = gained.length || lostT.length ? mapPanel(`지도 · ${[gained.length ? `${jo(gained.map((x) => TNAME[x] || x).join(", "), "을", "를")} 얻었어요` : "", lostT.length ? `${jo(lostT.map((x) => TNAME[x] || x).join(", "), "을", "를")} 잃었어요` : ""].filter(Boolean).join(" · ")}`, { arrows: [], gain: gained }) : "";
    return watchBox() + `<section class="era"><h2>${S.turn}시기의 실록</h2><span class="t">${esc(era(S.turn))}</span></section>${timeline()}${chg}
    <section class="sillok">${logEntries(L)}
      ${L.warn.length ? `<div class="warnbox">${L.warn.map((w) => `<p>${esc(w)}</p>`).join("")}</div>` : ""}
      ${S.saved ? `<p class="sub">남긴 국정 힘 ${S.saved}개는 다음 시기로 넘어가요.</p>` : ""}
    </section>
    <div class="row"><button type="button" class="btn go" id="btnNext">${S.turn >= TURNS ? "나라의 운명 보기" : `${S.turn + 1}시기로`}</button></div>`;
  }

  function renderEnd() {
    const f = fate(), r = S.end.rec, m = endData(), a = m.a, ty = typeName(a), top = m.top;
    const realRank = ST.map((x) => x.k).sort((p, q) => S.st[q] - S.st[p]);
    const agree = agreeCount(), ach = S.over ? [] : achievements(), epi = epilogue();
    const AX = [["힘", "왕권", "화", "화합"], ["칼", "군사", "붓", "학문"], ["민", "백성", "법", "제도"], ["빠", "단숨에", "차", "차근차근"]];
    const O = S.over ? overInfo() : null;
    const years = S.over ? `${S.overAt.turn}시기(${era(S.overAt.turn)})에 끝난 다스림` : `${"EFHJKLM".includes(S.scen) ? "다스림" : "30년"}`;
    return `<section class="fate panel ${f.bad ? "bad" : ""} ${f.big ? "big" : ""} ${O ? "over" : ""}"><div class="row" style="justify-content:space-between"><p class="sub">${esc(NATION())} · ${esc(KING())}의 ${esc(years)}</p><button type="button" class="btn small" id="btnNew">새 게임</button></div>
      <div class="fhead"><span class="fseal" aria-hidden="true">${f.h}</span><h1>${esc(f.t)}</h1></div>${f.alt ? `<p><span class="ifb alt">다른 역사 · 정책의 조합이 만든 결말</span></p>` : ""}
      <p class="flead">${esc(f.l)}</p>
      ${O ? `<p class="sub">${esc(S.overAt.where)} ${esc(jo(SN[S.over], "이", "가"))} 0이 되었어요.</p><div class="histbox"><b>역사 속에서 실제로 있었던 일</b><p>${esc(O.hist)}</p></div>` : ""}
      <div class="stats">${ST.map((x) => statBox(x, S.st[x.k])).join("")}</div>
      <div class="row exportrow"><button type="button" class="btn go" id="btnCard">결과 카드 사진으로 저장</button><button type="button" class="btn" id="btnPdf">실록까지 PDF로 저장</button><span class="sub">사진(PNG)은 결과 카드 한 장, PDF는 결과 카드·실록·생각 적기 쪽이 함께 들어 있어요.</span></div></section>
    ${!S.over && !S.ext && !"GHLMY".includes(S.scen) && !S.flags.lost ? `<section class="panel morebox"><h2>조금만 더?</h2><p>아쉬운가요? 왕자가 나라를 물려받아 <b>10시기(30년)를 더</b> 다스릴 수 있어요. 지금 능력치와 땅을 그대로 이어받고, 국정 힘이 하나 늘어요. 선왕의 실수를 바로잡는 선택지, 처음 보는 사건, 전설 같은 이야기가 기다려요. '만약에?' 모험의 성공 확률도 올라가요.</p><button type="button" class="btn go" id="btnMore">다음 왕으로 10시기 더 다스리기</button></section>` : ""}${S.ext ? `<p class="sub">${esc(S.ext.king1)} 왕(${esc(S.ext.tier1 || "")}등급 ${S.ext.score1 ?? ""}점)에 이어 ${esc(KING())}까지, 두 왕의 60년 기록이에요.</p>` : ""}
    ${tierPanel()}
    ${featPanel()}
    ${treasurePanel()}
    ${hasMap() && S.terr0 ? `<section class="panel"><h2>${esc(NATION())}의 땅은 어떻게 바뀌었을까?</h2><div class="mapduo"><figure>${mapSVG({ terr: S.terr0 })}<figcaption>처음 (${esc(era(1))})</figcaption></figure><figure>${mapSVG({ terr: S.terr, gain: S.terr.filter((x) => !S.terr0.includes(x)) })}<figcaption>${S.over ? "무너질 때" : "다스림을 마칠 때"}${S.terr.length > S.terr0.length ? ` · 새로 얻은 땅 ${S.terr.length - S.terr0.length}곳` : ""}</figcaption></figure></div><p class="sub">지도의 경계는 교과서 지도를 바탕으로 한 대략적인 모습이에요.</p></section>` : ""}
    <section class="two">
      <div class="record ${r.kind}"><p class="sub">후대의 역사책은 이렇게 적었어요</p><span class="stamp">${esc(r.stamp)}</span>
        <p class="myo"><span class="sub">${WORLD() ? "역사책이 붙인 별명" : "역사책이 붙인 이름"}</span><b>${esc(r.myo)}</b><span class="sub">${esc(r.myoD)}</span></p>
        <h2>${esc(r.t)}</h2><p>${esc(r.l)}</p>
        ${ach.length ? `<div class="achs" aria-label="업적">${ach.map(([h, n]) => `<span class="ach"><i>${h}</i>${esc(n)}</span>`).join("")}</div>` : ""}
        ${r.today ? `<p class="today"><b>${O ? "이렇게 했다면" : "다시 생각해 보기"}</b> ${esc(r.today)}</p>` : ""}
        ${epi ? `<p class="today"><b>그 뒤의 이야기</b> ${esc(epi)}</p>` : ""}</div>
      <div class="panel"><p class="sub">나의 다스림 유형</p><span class="code">${esc(ty.code)}</span><h2>${esc(ty.full)}</h2>
        <div class="axes">${AX.map((x, i) => `<div class="axis"><span class="l"><b class="${a[i] >= 0 ? "on" : ""}">${x[0]}</b> ${x[1]}</span><span class="track"><span class="dot" style="left:${50 - a[i] * 50}%"></span></span><span><b class="${a[i] < 0 ? "on" : ""}">${x[2]}</b> ${x[3]}</span></div>`).join("")}</div>
        <p class="sub">힘·화: 왕의 힘을 키웠나, 신하와 함께했나 / 칼·붓: 군사를 키웠나, 학문을 키웠나 / 민·법: 백성을 먼저 챙겼나, 나라의 제도를 먼저 세웠나 / 빠·차: 큰 개혁을 앞쪽 시기에 몰아서 했나, 차근차근 했나</p></div>
    </section>
    <section class="panel" id="kingPanel"><div class="row" style="justify-content:space-between"><p class="sub">역사 속에서 나와 가장 닮은 왕</p><button type="button" class="btn small" id="btnReplay">공개 장면 다시 보기</button></div>
      <div class="kingcard"><div class="kport">${portrait(top.k)}</div><div style="display:grid;gap:6px;min-width:0;align-content:start"><span class="pct">${m.pct}%</span><h2>${esc(top.k.era)} ${esc(top.k.n)}</h2><p>${esc(top.k.bio)}</p>
        <p class="sub">같은 정책: ${top.same.length ? top.same.map((x) => esc(sigName(x))).join(", ") : "없음 — 다스림의 방향이 닮았어요"}</p></div></div>
      ${m.specials.map((sp) => `<div class="warnbox kingcard small"><div class="kport">${portrait(sp, "dim")}</div><div><b>그리고 역사 기록으로는… ${esc(sp.era)} ${esc(sp.n)}</b><p>${esc(sp.bio)}</p></div></div>`).join("")}
      <div class="others"><p class="sub">다음으로 닮은 왕</p>${m.ranked.slice(1, 5).map((x) => `<div><span>${esc(x.k.era)} <b>${esc(x.k.n)}</b></span><span>${likePct(x.score)}%</span><span class="bar2"><i style="width:${likePct(x.score)}%"></i></span></div>`).join("")}</div>
      <p class="sub">그림은 어진(왕의 초상화)의 모습을 본떠 새로 그린 상상화예요. 실제 어진이 남아 있는 왕은 조선의 태조, 영조, 철종 등 몇 명뿐이에요.</p></section>
    ${chartPanel()}
    <section class="panel"><h2>처음 다짐과 실제 결과</h2>
      <div class="tbl"><table><thead><tr><th>다짐한 순위</th><th>원칙</th><th>마지막 수치</th><th>실제 순위</th></tr></thead><tbody>${S.goals.map((k, i) => `<tr><td>${i + 1}</td><td>${SN[k]}</td><td>${S.st[k]}</td><td>${realRank.indexOf(k) + 1}위</td></tr>`).join("")}</tbody></table></div>
      <p>다짐한 세 가지 중 <b>${agree}가지</b>가 실제로도 가장 높은 세 가지 안에 들었어요. ${agree >= 2 ? "다짐한 대로 다스렸어요." : "다짐과 실제 다스림이 달랐어요. 무엇 때문이었을까요?"}</p></section>
    ${sillokBook()}
    <section class="panel"><h2>돌아보기</h2><ol class="qs">
      ${O ? `<li>${esc(jo(SN[S.over], "이", "가"))} 0이 되기 전에 어떤 신호가 있었나요? 어느 시기에 무엇을 바꾸었다면 막을 수 있었을까요?</li>` : `<li>정책의 순서를 바꾸었다면 결과가 어떻게 달라졌을까요? (예: 숙청 → 학자 모으기, 혼인 → 지방관)</li>`}
      <li>나와 닮은 왕이 실제로 한 정책 가운데, 내가 하지 않은 것은 무엇인가요? 그 왕은 왜 그 정책을 골랐을까요?</li>
      <li>실록에 적힌 내 모습과 실제 나의 선택은 같았나요? 역사책을 쓰는 사람에 따라 무엇이 달라질까요?</li></ol>
      <div class="row"><button type="button" class="btn ink" id="btnAgain">다시 왕위에 오르기</button></div></section>`;
  }

  function chartPanel() {
    const H = S.hist || [];
    if (H.length < 2) return "";
    const W = 220, HH = 86, px = 10, py = 12;
    const X = (t) => px + (W - 2 * px) * (t / TURNS), Y = (v) => py + (HH - 2 * py) * (1 - v / 100);
    const label = (t) => (t === 0 ? "시작" : `${t}시기`);
    const cells = ST.map((x) => {
      const vals = H.map((h) => h.st[x.k]), last = vals.length - 1, lo = Math.min(...vals), loI = vals.indexOf(lo);
      const pts = vals.map((v, i) => `${X(H[i].t).toFixed(1)},${Y(v).toFixed(1)}`).join(" ");
      return `<figure class="spark"><figcaption><span class="seal sm" aria-hidden="true">${x.h}</span><span>${x.n}</span><b>${vals[last]}</b><span class="sub">${signed(vals[last] - vals[0])}</span></figcaption>
        <svg viewBox="0 0 ${W} ${HH}" role="img" aria-label="${x.n}: 시작 ${vals[0]}, 마지막 ${vals[last]}, 가장 낮았을 때 ${lo}">
          <rect x="${px}" y="${Y(15).toFixed(1)}" width="${W - 2 * px}" height="${(Y(0) - Y(15)).toFixed(1)}" class="sp-danger"/>
          <line x1="${px}" x2="${W - px}" y1="${Y(50)}" y2="${Y(50)}" class="sp-mid"/>
          <polyline points="${pts}" class="sp-line"/>
          ${lo < 25 && loI !== last ? `<circle cx="${X(H[loI].t)}" cy="${Y(lo)}" r="3.5" class="sp-low"/><text x="${X(H[loI].t)}" y="${Math.max(10, Y(lo) - 7)}" class="sp-lab">${lo}</text>` : ""}
          <circle cx="${X(H[last].t)}" cy="${Y(vals[last])}" r="4.5" class="sp-end"/>
          ${vals.map((v, i) => `<circle cx="${X(H[i].t)}" cy="${Y(v)}" r="10" class="sp-hit"><title>${label(H[i].t)} ${x.n} ${v}</title></circle>`).join("")}
        </svg></figure>`;
    }).join("");
    const km = keyMoments();
    const mom = (row, good) => row && (good ? row.total > 0 : row.total < 0) ? `<div class="moment ${good ? "good" : "bad"}"><span class="sub">${good ? "가장 빛난 순간" : "가장 아찔한 순간"}</span><b>${row.L.turn}시기 · ${esc(row.L.ev.title)}</b><p>${esc(row.L.ev.choice)}${row.L.res.length ? ` → ${row.L.res.map((x) => esc(P[x.id].name)).join(", ")}` : ""}</p><span class="chip ${good ? "up" : "down"}">이 시기 변화를 모두 합치면 ${signed(row.total)}</span></div>` : "";
    return `<section class="panel"><h2>나라 살림이 걸어온 길</h2><p class="sub">시기마다 능력치가 어떻게 바뀌었는지 보여 줘요. 붉은 띠는 위험(15 아래), 점선은 50이에요. 점에 마우스를 올리면 그 시기의 값이 보여요.</p>
      <div class="sparks">${cells}</div>
      ${km ? `<div class="moments">${mom(km.best, true)}${mom(km.worst, false)}</div>` : ""}
      <details class="real"><summary>숫자로 보기</summary><div class="tbl"><table><thead><tr><th>시기</th>${ST.map((x) => `<th>${x.n}</th>`).join("")}</tr></thead><tbody>${H.map((h) => `<tr><td>${label(h.t)}</td>${ST.map((x) => `<td>${h.st[x.k]}</td>`).join("")}</tr>`).join("")}</tbody></table></div></details></section>`;
  }
  function sillokBook() {
    const ents = sillokEntries();
    return `<section class="panel sbook"><div class="sb-head"><h2>『${esc(NATION())} 실록』</h2><p class="sub">사관들이 조금(많이) 부풀려 적은 기록이에요. 실제로 고른 것은 맨 아래에서 볼 수 있어요.</p></div>
      <ol class="sb">${ents.map((e) => `<li class="${e.cut ? "cut" : ""}"><span class="sb-date"><b>${e.turn}시기</b>${esc(e.date)}</span><div class="sb-body">${e.lines.map((l) => `<p>${esc(l)}</p>`).join("")}<p class="sagwan">${esc(e.sag)}</p></div></li>`).join("")}</ol>
      <p class="sb-close">${esc(SL_CLOSE[S.end.rec.kind] || SL_CLOSE.style)}</p>
      <details class="real"><summary>실제로 고른 것 보기</summary><div class="tl">${S.log.map((L) => `<div class="p"><b>${L.turn}시기</b><span>${esc(L.ev.title)}: ${esc(L.ev.choice)}${L.econ ? ` · 살림: ${esc(L.econ.name)}` : ""}${L.res.length ? ` · 정책: ${L.res.map((x) => P[x.id].name + (x.ok ? "" : "(실패)")).join(" → ")}` : ""}${L.cut ? " · <strong>나라가 무너짐</strong>" : ""}</span></div>`).join("")}</div></details></section>`;
  }
  function render(before) {
    relabel();
    if (window.__FAST) return;
    renderBar(before);
    const app = $("app");
    if (S.phase === "start") app.innerHTML = renderStart();
    else if (S.phase === "event") app.innerHTML = renderEvent();
    else if (S.phase === "policy") app.innerHTML = renderPolicy();
    else if (S.phase === "result") { app.innerHTML = renderResult(); trAuto(); }
    else app.innerHTML = renderEnd();
  }

  function newGame() {
    const g = S.goals, k = S.king, n = S.nation, sc = S.scen;
    stopReveal();
    S = fresh(); S.goals = g; S.king = k; S.nation = n; S.scen = sc;
    UI.cat = "all"; UI.msg = null;
    closeLayer(); save(); render(); window.scrollTo({ top: 0 });
  }
  function askNew() {
    if (S.phase === "end") return newGame();
    $("layer").innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="newTitle"><div class="modal">
      <h2 id="newTitle">새 게임을 시작할까요?</h2>
      <p>지금 ${esc(NATION())}의 ${S.turn}시기까지 다스린 기록이 모두 지워져요. 왕과 나라 이름, 다스림 원칙은 그대로 남아요.</p>
      <div class="row"><button type="button" class="btn" id="btnNewNo">계속 다스리기</button><button type="button" class="btn go" id="btnNewYes">새 게임 시작</button></div>
    </div></div>`;
    $("btnNewNo").focus();
  }
  function closeLayer() { $("layer").innerHTML = ""; }
  function beginReign() {
    const sc = SCEN[S.scen];
    S.st = { ...sc.st };
    S.goals.forEach((k, i) => { S.st[k] = clamp(S.st[k] + GOAL_BONUS[i]); });
    S.start = { ...S.st }; S.low = { ...S.st }; S.hist = [{ t: 0, st: { ...S.st } }];
    S.done = sc.done.map((id) => ({ id, turn: 0, ok: true, by: "start" })); S.turn = 1; terrInit();
    startTurn(); window.scrollTo({ top: 0 });
  }

  // ================= 조작 =================
  document.addEventListener("click", (e) => {
    const t = e.target.closest("button");
    if (!t) return;
    const d = t.dataset;
    if (t.id === "btnSkip") { if (RV && RV.final) { RV.final(false); if (!RV.fx) { RV.fx = fxStart($("fx")); RV.fx.paper(80); } } return; }
    if (t.id === "btnSound") { soundOn = !soundOn; try { localStorage.setItem(SND_KEY, soundOn ? "on" : "off"); } catch (er) { /* 무시 */ } t.setAttribute("aria-pressed", soundOn); t.textContent = soundOn ? "소리 켬" : "소리 끔"; if (soundOn) tone(660, 0, 0.15, "triangle", 0.1); return; }
    if (t.id === "btnRvDone") return closeReveal();
    if (t.id === "btnReplay") return startReveal();
    if (t.id === "btnCard") return exportFile("png");
    if (t.id === "btnPdf") return exportFile("pdf");
    if (t.id === "btnSaveClose") return closeLayer();
    if (d.scen) { S.scen = d.scen; save(); render(); return; }
    if (t.id === "btnStart") return beginReign();
    if (d.choice) return chooseEvent(+d.choice);
    if (d.cat) { UI.cat = d.cat; render(); return; }
    if (d.pick) { if (t.getAttribute("aria-disabled") === "true") return; return togglePick(d.pick); }
    if (d.qup) { const i = +d.qup; [S.picks[i - 1], S.picks[i]] = [S.picks[i], S.picks[i - 1]]; save(); render(); return; }
    if (d.qdn) { const i = +d.qdn; [S.picks[i + 1], S.picks[i]] = [S.picks[i], S.picks[i + 1]]; save(); render(); return; }
    if (t.id === "btnRun") return runPolicies();
    if (t.id === "btnNext") return nextTurn();
    if (t.id === "btnAgain") return newGame();
    if (t.id === "btnNew") return askNew();
    if (t.id === "btnNewNo") return closeLayer();
    if (t.id === "btnMore") { $("layer").innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="moreTitle"><div class="modal"><h2 id="moreTitle">다음 왕의 이름은?</h2><p>${esc(KING())}의 뒤를 이을 왕의 이름을 지어 주세요. 비워 두면 '${esc(S.king.trim() || "이름 없는")} 2세'가 돼요.</p><input id="moreName" class="inp" maxlength="12" placeholder="새 왕의 이름"><div class="row"><button type="button" class="btn" id="btnNewNo">그만하기</button><button type="button" class="btn go" id="btnMoreGo">즉위식 올리기</button></div></div></div>`; $("moreName").focus(); return; }
    if (t.id === "btnMoreGo") { const nm = $("moreName").value; closeLayer(); stopReveal(); return extendReign(nm); }
    if (t.id === "btnNewYes") return newGame();
  });
  document.addEventListener("change", (e) => {
    const t = e.target;
    if (t.dataset && t.dataset.goal !== undefined) {
      const i = +t.dataset.goal, v = t.value, j = S.goals.indexOf(v);
      if (j >= 0 && j !== i) S.goals[j] = S.goals[i];
      S.goals[i] = v; save(); render(); const el = $("goal" + i); if (el) el.focus(); return;
    }
    if (t.name === "econ") { S.econ = t.value; save(); const y = window.scrollY; render(); window.scrollTo({ top: y }); const r = document.querySelector(`input[name="econ"][value="${S.econ}"]`); if (r) r.focus({ preventScroll: true }); }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape" || !$("layer").innerHTML) return;
    if ($("reveal")) closeReveal(); else if ($("tropen")) trDone(); else closeLayer();
  });
  document.addEventListener("input", (e) => {
    if (e.target.id === "kingName") { S.king = e.target.value; save(); }
    if (e.target.id === "nationName") { S.nation = e.target.value; save(); }
  });

  render();
  if (S.phase === "end" && !S.revealed) startReveal();
