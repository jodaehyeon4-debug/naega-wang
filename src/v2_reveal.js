  // ================= 소리 (북 · 징 · 편경 느낌) =================
  const SND_KEY = "king-sound";
  let soundOn = (() => { try { return localStorage.getItem(SND_KEY) !== "off"; } catch (e) { return true; } })();
  let AC = null;
  function actx() {
    if (!soundOn) return null;
    try { AC = AC || new (window.AudioContext || window.webkitAudioContext)(); if (AC.state === "suspended") AC.resume(); return AC; } catch (e) { return null; }
  }
  function tone(f, at, dur, type, vol) {
    const a = actx(); if (!a) return;
    const t = a.currentTime + at, o = a.createOscillator(), g = a.createGain();
    o.type = type || "sine"; o.frequency.setValueAtTime(f, t);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol || 0.2, t + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + dur + 0.05);
  }
  function drum(at, vol) {
    const a = actx(); if (!a) return;
    const t = a.currentTime + at, len = Math.floor(a.sampleRate * 0.16), buf = a.createBuffer(1, len, a.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 2;
    const src = a.createBufferSource(), f = a.createBiquadFilter(), g = a.createGain();
    src.buffer = buf; f.type = "lowpass"; f.frequency.value = 260; g.gain.value = vol || 0.5;
    src.connect(f); f.connect(g); g.connect(a.destination); src.start(t);
    tone(68, at, 0.22, "sine", (vol || 0.5) * 0.6);
  }
  function gong(at) { [[98, 0.32, 3.6], [147, 0.12, 3], [196, 0.1, 2.6], [262, 0.06, 2.2], [393, 0.035, 1.6]].forEach(([f, v, d]) => tone(f, at, d, "sine", v)); }
  function chime(at) { [523, 587, 698, 784, 880, 1047].forEach((f, i) => tone(f, at + i * 0.08, 0.7, "triangle", 0.09)); }
  function tick() { tone(1300 + Math.random() * 400, 0, 0.035, "square", 0.025); }
  function drumRoll(total) { let t = 0, gap = 0.26; while (t < total) { drum(t, 0.25 + 0.35 * (t / total)); t += gap; gap = Math.max(0.05, gap * 0.86); } }

  // ================= 불꽃과 오방색 꽃가루 =================
  function fxStart(canvas) {
    const ctx = canvas.getContext("2d"), dpr = Math.min(2, window.devicePixelRatio || 1);
    let W = 0, H = 0, raf = 0, alive = true;
    const parts = [];
    const COLORS = ["#1F5FA8", "#C8332B", "#E9B824", "#F4F1E8", "#2E7D4F", "#FFD86B"];
    const size = () => { W = canvas.clientWidth; H = canvas.clientHeight; canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    size(); window.addEventListener("resize", size);
    const burst = (x, y, n) => { for (let i = 0; i < n; i++) { const a = Math.random() * Math.PI * 2, v = 2 + Math.random() * 6; parts.push({ k: "s", x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 50 + Math.random() * 40, t: 0, c: COLORS[i % COLORS.length], r: 1.5 + Math.random() * 2.2 }); } };
    const paper = (n) => { for (let i = 0; i < n; i++) parts.push({ k: "p", x: Math.random() * W, y: -10 - Math.random() * H * 0.5, vx: (Math.random() - 0.5) * 1.6, vy: 1.4 + Math.random() * 2.4, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3, w: 7 + Math.random() * 7, h: 4 + Math.random() * 4, c: COLORS[Math.floor(Math.random() * COLORS.length)], life: 420, t: 0 }); };
    const frame = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i]; p.t++;
        if (p.k === "s") { p.vx *= 0.97; p.vy = p.vy * 0.97 + 0.08; p.x += p.vx; p.y += p.vy; const a = Math.max(0, 1 - p.t / p.life); ctx.globalAlpha = a; ctx.fillStyle = p.c; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); }
        else { p.x += p.vx + Math.sin(p.t / 18) * 0.6; p.y += p.vy; p.rot += p.vr; ctx.globalAlpha = 1; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.c; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore(); }
        if (p.t > p.life || p.y > H + 20) parts.splice(i, 1);
      }
      ctx.globalAlpha = 1;
      if (alive || parts.length) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return { burst, paper, get W() { return W; }, get H() { return H; }, stop() { alive = false; parts.length = 0; cancelAnimationFrame(raf); window.removeEventListener("resize", size); ctx.clearRect(0, 0, W, H); } };
  }

  // ================= 닮은 왕 공개 =================
  let RV = null;
  function stopReveal() {
    if (!RV) return;
    RV.timers.forEach(clearTimeout); clearInterval(RV.count);
    if (RV.fx) RV.fx.stop();
    RV = null;
  }
  function closeReveal() {
    stopReveal(); closeLayer();
    if (!S.revealed) { S.revealed = true; save(); }
    const kp = $("kingPanel"); if (kp) kp.scrollIntoView({ block: "start" });
  }
  function startReveal() {
    if (window.__FAST || !S.end) return;
    stopReveal();
    const m = endData(), k = m.top.k;
    const reduce = false; // 학교 PC는 '애니메이션 끄기'가 켜진 경우가 많아, 연출은 늘 재생해요(건너뛰기 가능)
    const names = KINGS.map((x) => x.n);
    $("layer").innerHTML = `<div class="reveal" id="reveal" role="dialog" aria-modal="true" aria-labelledby="rvTitle">
      <canvas class="fx" id="fx" aria-hidden="true"></canvas><div class="rays" aria-hidden="true"></div>
      <div class="rv-tools"><button type="button" class="rv-btn" id="btnSound" aria-pressed="${soundOn}">${soundOn ? "소리 켬" : "소리 끔"}</button><button type="button" class="rv-btn" id="btnSkip">건너뛰기</button></div>
      <div class="rv-stage">
        <p class="rv-top" id="rvTitle">역사 속에서 나와 가장 닮은 왕은…</p>
        <div class="rv-frame">
          <div class="rv-portrait">${portrait(k)}</div>
          <div class="door l" aria-hidden="true"></div><div class="door r" aria-hidden="true"></div>
          <div class="rv-roul" id="rvRoul" aria-hidden="true">?</div>
        </div>
        <div class="rv-name"><span class="rv-era">${esc(k.era)}</span><b class="rv-stamp">${esc(k.n)}</b></div>
        <p class="rv-pct"><b id="rvPct">0</b>% 닮았어요!</p>
        <div class="rv-more">
          <p class="rv-bio">${esc(k.bio)}</p>
          ${m.top.same.length ? `<p class="rv-same">나와 같은 정책: ${m.top.same.map((x) => `<span>${esc(sigName(x))}</span>`).join("")}</p>` : `<p class="rv-same">같은 정책은 없지만, 다스림의 방향이 꼭 닮았어요.</p>`}
          ${m.specials.length ? `<div class="rv-twist"><b>그런데… 역사책은 이렇게 적었어요</b><span>${esc(jo(m.specials.map((sp) => sp.n).join(" · "), "과", "와"))} 닮은 왕</span></div>` : ""}
          <button type="button" class="btn go" id="btnRvDone">내 결과 자세히 보기</button>
        </div>
      </div></div>`;
    const el = $("reveal"), roul = $("rvRoul");
    RV = { timers: [], count: 0, fx: null };
    const at = (ms, fn) => RV.timers.push(setTimeout(fn, ms));
    const countUp = (dur) => { const t0 = performance.now(); const pe = $("rvPct"); RV.count = setInterval(() => { const x = Math.min(1, (performance.now() - t0) / dur); pe.textContent = Math.round(m.pct * (1 - (1 - x) ** 3)); if (x >= 1) clearInterval(RV.count); }, 30); };
    const final = (instant) => {
      RV.timers.forEach(clearTimeout); RV.timers = [];
      el.classList.add("p1", "p2", "p3", "p4"); if (instant) el.classList.add("instant");
      roul.textContent = k.n; $("rvPct").textContent = m.pct; clearInterval(RV.count);
      const d = $("btnRvDone"); if (d) d.focus({ preventScroll: true });
    };
    if (reduce) { final(true); return; }
    $("btnSkip").focus();
    // 1) 이름 돌림판 + 북소리
    drumRoll(2.5);
    let i = Math.floor(Math.random() * names.length), gap = 55, t = 0;
    const spin = () => { roul.textContent = names[i++ % names.length]; tick(); t += gap; gap *= 1.11; if (t < 2300) at(gap, spin); else { roul.textContent = k.n; el.classList.add("p1"); } };
    spin();
    // 2) 궁궐 문이 열리고 징 소리, 불꽃
    at(2900, () => {
      el.classList.add("p2"); gong(0);
      RV.fx = fxStart($("fx"));
      const fx = RV.fx;
      fx.burst(fx.W * 0.5, fx.H * 0.38, 90);
      at(380, () => fx.burst(fx.W * 0.22, fx.H * 0.3, 60));
      at(700, () => fx.burst(fx.W * 0.78, fx.H * 0.3, 60));
      at(500, () => fx.paper(140));
    });
    // 3) 이름 도장 쾅! + 숫자
    at(3700, () => { el.classList.add("p3"); drum(0, 0.9); chime(0.15); countUp(1100); });
    // 4) 설명과 단추
    at(4900, () => { el.classList.add("p4"); const d = $("btnRvDone"); if (d) d.focus({ preventScroll: true }); if (m.specials.length) at(900, () => { drum(0, 0.7); drum(0.18, 0.7); }); });
    RV.final = final;
  }
