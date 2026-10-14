  // ================= 결과 카드 그림과 PDF =================
  const CARD = { bg: "#F4EAD3", paper: "#FBF5E6", ink: "#2A1D17", muted: "#6B5B4B", red: "#B3261E", gold: "#B8862B", wood: "#6E4A2A", green: "#2C6A57", line: "#D9C9A8" };
  const FD = "'Hahmlet', 'Noto Serif KR', 'Batang', serif", FB = "'Gowun Dodum', 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif";
  // 한 줄 너비에 맞춰 줄을 나눠요 (띄어쓰기에서 먼저 끊고, 긴 낱말은 글자 단위로)
  function wrapLines(g, text, maxW) {
    const out = []; let line = "";
    for (const word of String(text).split(" ")) {
      const tryLine = line ? line + " " + word : word;
      if (g.measureText(tryLine).width <= maxW) { line = tryLine; continue; }
      if (line) out.push(line);
      if (g.measureText(word).width <= maxW) { line = word; continue; }
      line = "";
      for (const ch of word) { if (g.measureText(line + ch).width > maxW) { out.push(line); line = ch; } else line += ch; }
    }
    if (line) out.push(line);
    return out;
  }
  function drawWrapped(g, text, x, y, maxW, lh, maxLines) {
    let lines = wrapLines(g, text, maxW);
    if (maxLines && lines.length > maxLines) { lines = lines.slice(0, maxLines); lines[maxLines - 1] = lines[maxLines - 1].replace(/.{0,2}$/, "…"); }
    lines.forEach((l, i) => g.fillText(l, x, y + i * lh));
    return y + lines.length * lh;
  }
  function loadSvg(svg) {
    return new Promise((res) => {
      const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
      const img = new Image();
      img.onload = () => { res(img); setTimeout(() => URL.revokeObjectURL(url), 1000); };
      img.onerror = () => res(null);
      img.src = url;
    });
  }
  async function fontsReady() { try { if (document.fonts && document.fonts.ready) await document.fonts.ready; } catch (e) { /* 기본 글꼴로 그려요 */ } }
  async function drawCard() {
    await fontsReady();
    const W = 1080, H = 1350, c = document.createElement("canvas"); c.width = W; c.height = H;
    const g = c.getContext("2d"), m = endData(), f = fate(), r = S.end.rec, ty = typeName(m.a);
    g.fillStyle = CARD.wood; g.fillRect(0, 0, W, H);
    g.fillStyle = CARD.paper; g.fillRect(28, 28, W - 56, H - 56);
    g.strokeStyle = CARD.red; g.lineWidth = 3; g.strokeRect(46, 46, W - 92, H - 92);
    g.textBaseline = "alphabetic";
    // 머리
    g.fillStyle = CARD.red; g.font = `800 30px ${FD}`; g.fillText("왕BTI · 나는 어떤 왕일까?", 76, 104);
    g.fillStyle = CARD.muted; g.font = `24px ${FB}`; g.textAlign = "right";
    g.fillText(`${NATION()} · ${KING()} · ${SCEN[S.scen].name}`, W - 76, 104); g.textAlign = "left";
    // 나라의 운명
    g.fillStyle = f.bad ? CARD.red : f.big ? CARD.gold : CARD.green; g.fillRect(76, 136, 104, 104);
    g.fillStyle = "#FFFFFF"; g.font = `800 64px ${FD}`; g.textAlign = "center"; g.fillText(f.h, 128, 212); g.textAlign = "left";
    g.fillStyle = CARD.muted; g.font = `22px ${FB}`; g.fillText(S.over ? `${S.overAt.turn}시기에 멈춘 나라의 운명` : "EFH".includes(S.scen) ? "다스림이 끝난 뒤 나라의 운명" : "30년 뒤 나라의 운명", 204, 160);
    g.fillStyle = f.bad && S.over ? CARD.red : CARD.ink; g.font = `800 54px ${FD}`;
    let y = drawWrapped(g, f.t, 204, 218, W - 290, 62, 2);
    g.fillStyle = CARD.ink; g.font = `25px ${FB}`;
    y = drawWrapped(g, f.l, 76, Math.max(y + 16, 288), W - 152, 36, 2);
    // 닮은 왕 그림
    const top = Math.min(Math.max(y + 10, 380), 410);
    const img = await loadSvg(portrait(m.top.k));
    if (img) g.drawImage(img, 76, top, 260, 351);
    g.fillStyle = CARD.muted; g.font = `22px ${FB}`; g.fillText("나와 가장 닮은 왕", 76, top + 384);
    g.fillStyle = CARD.red; g.font = `800 30px ${FD}`; g.textAlign = "right"; g.fillText(`${m.pct}%`, 336, top + 386); g.textAlign = "left";
    g.fillStyle = CARD.ink; g.font = `800 32px ${FD}`; drawWrapped(g, m.top.k.n, 76, top + 426, 262, 38, 2);
    // 역사책 기록
    const rx = 380, rw = W - rx - 76;
    g.save(); g.translate(rx + 8, top + 8); g.rotate(-0.05);
    g.font = `800 40px ${FD}`; const sw = g.measureText(r.stamp).width + 40;
    if (["great", "tyrant", "over", "wronged"].includes(r.kind)) { g.fillStyle = r.kind === "great" ? CARD.gold : CARD.red; g.fillRect(0, 0, sw, 64); g.fillStyle = "#FFFFFF"; }
    else { g.strokeStyle = CARD.red; g.lineWidth = 5; g.strokeRect(0, 0, sw, 64); g.fillStyle = CARD.red; }
    g.fillText(r.stamp, 20, 47); g.restore();
    g.fillStyle = CARD.muted; g.font = `22px ${FB}`; g.fillText(WORLD() ? "역사책이 붙인 별명" : "역사책이 붙인 이름", rx, top + 116);
    g.fillStyle = CARD.ink; g.font = `800 50px ${FD}`; let ry = drawWrapped(g, r.myo, rx, top + 172, rw, 56, 2);
    g.fillStyle = CARD.ink; g.font = `700 28px ${FD}`; ry = drawWrapped(g, r.t, rx, ry + 16, rw, 36, 2);
    // 업적
    const ach = S.over ? [] : achievements();
    let ax = rx, ay = ry + 18; g.font = `22px ${FB}`;
    for (const [h, n] of ach) {
      g.font = `22px ${FB}`;
      const wch = g.measureText(n).width + 58;
      if (ax + wch > rx + rw) break;
      g.fillStyle = "#F1E2BE"; g.fillRect(ax, ay, wch, 38); g.fillStyle = CARD.gold; g.beginPath(); g.arc(ax + 19, ay + 19, 14, 0, Math.PI * 2); g.fill();
      g.fillStyle = "#FFFFFF"; g.font = `800 17px ${FD}`; g.textAlign = "center"; g.fillText(h, ax + 19, ay + 25); g.textAlign = "left";
      g.fillStyle = CARD.ink; g.font = `22px ${FB}`; g.fillText(n, ax + 42, ay + 27); ax += wch + 10;
    }
    if (ach.length) ay += 60;
    g.fillStyle = CARD.muted; g.font = `22px ${FB}`; g.fillText("나의 다스림 유형", rx, ay + 14);
    g.fillStyle = CARD.red; g.font = `800 34px ${FD}`; g.fillText(ty.code, rx, ay + 56);
    g.fillStyle = CARD.ink; g.font = `24px ${FB}`; drawWrapped(g, ty.full, rx, ay + 94, rw, 32, 2);
    // 능력치 막대
    const sy = top + 490;
    ST.forEach((x, i) => {
      const col = i % 2, row = Math.floor(i / 2), bx = 76 + col * 470, by = sy + row * 54, v = S.st[x.k];
      g.fillStyle = CARD.red; g.fillRect(bx, by, 38, 38); g.fillStyle = "#FFFFFF"; g.font = `800 24px ${FD}`; g.textAlign = "center"; g.fillText(x.h, bx + 19, by + 29); g.textAlign = "left";
      g.fillStyle = CARD.ink; g.font = `24px ${FB}`; g.fillText(x.n, bx + 50, by + 28);
      g.fillStyle = "#E8DCC2"; g.fillRect(bx + 120, by + 13, 250, 14);
      g.fillStyle = v < 15 ? CARD.red : CARD.green; g.fillRect(bx + 120, by + 13, 250 * v / 100, 14);
      g.fillStyle = CARD.ink; g.font = `800 26px ${FB}`; g.textAlign = "right"; g.fillText(String(v), bx + 424, by + 29); g.textAlign = "left";
    });
    // 실록 한 줄
    const ent = sillokEntries(), km = keyMoments();
    const pickE = km ? ent.find((e) => e.turn === (S.over ? S.overAt.turn : km.best.L.turn)) : ent[0];
    const line = pickE ? pickE.lines[pickE.lines.length > 1 && pickE.turn === 1 ? 1 : 0] : "";
    const by0 = sy + 3 * 54 + 14;
    g.fillStyle = "#F1E6CC"; g.fillRect(76, by0, W - 152, H - 96 - by0);
    g.fillStyle = CARD.red; g.font = `800 24px ${FD}`; g.fillText(`『${NATION()} 실록』 ${pickE ? pickE.date : ""}`, 100, by0 + 40);
    g.fillStyle = CARD.ink; g.font = `24px ${FD}`; const ly = drawWrapped(g, line, 100, by0 + 78, W - 200, 34, 2);
    if (pickE) { g.fillStyle = CARD.muted; g.font = `21px ${FD}`; drawWrapped(g, pickE.sag, 100, ly + 6, W - 200, 30, 2); }
    g.fillStyle = CARD.muted; g.font = `18px ${FB}`; g.fillText("그림은 어진의 모습을 본떠 새로 그린 상상화예요.", 76, H - 62);
    return c;
  }
  // 실록 PDF 쪽들 (A4, 150dpi)
  async function drawSillokPages() {
    await fontsReady();
    const W = 1240, H = 1754, M = 110, pages = [];
    let g, y, pageNo = 0;
    const newPage = (title) => {
      const c = document.createElement("canvas"); c.width = W; c.height = H; g = c.getContext("2d"); pageNo += 1;
      g.fillStyle = "#FBF6EA"; g.fillRect(0, 0, W, H);
      g.strokeStyle = CARD.red; g.lineWidth = 3; g.strokeRect(60, 60, W - 120, H - 120); g.lineWidth = 1; g.strokeRect(72, 72, W - 144, H - 144);
      g.fillStyle = CARD.red; g.font = `800 44px ${FD}`; g.fillText(title, M, 150);
      g.fillStyle = CARD.muted; g.font = `24px ${FB}`; g.textAlign = "right"; g.fillText(`${NATION()} · ${KING()}`, W - M, 150); g.textAlign = "left";
      g.strokeStyle = CARD.line; g.beginPath(); g.moveTo(M, 176); g.lineTo(W - M, 176); g.stroke();
      g.fillStyle = CARD.muted; g.font = `20px ${FB}`; g.textAlign = "center"; g.fillText(String(pageNo), W / 2, H - 86); g.textAlign = "left";
      y = 230; pages.push(c);
    };
    const need = (lines) => { if (y + lines > H - 140) newPage(`『${NATION()} 실록』 (이어서)`); };
    newPage(`『${NATION()} 실록』`);
    g.fillStyle = CARD.muted; g.font = `24px ${FB}`; y = drawWrapped(g, "사관들이 조금(많이) 부풀려 적은 기록이에요. 실제로 고른 것은 게임 화면의 '실제로 고른 것 보기'에서 확인해요.", M, y, W - 2 * M, 34) + 26;
    const BW = W - 2 * M - 40;
    for (const e of sillokEntries()) {
      g.font = `27px ${FD}`;
      const body = e.lines.map((l) => wrapLines(g, l, BW).length).reduce((a, b) => a + b, 0);
      g.font = `25px ${FD}`;
      const sag = wrapLines(g, e.sag, BW).length;
      need(56 + body * 40 + sag * 36 + 40);
      g.fillStyle = CARD.red; g.font = `800 28px ${FD}`; g.fillText(`${e.turn}시기 · ${e.date}`, M, y); y += 46;
      g.fillStyle = CARD.ink; g.font = `27px ${FD}`;
      for (const l of e.lines) y = drawWrapped(g, l, M + 40, y, BW, 40);
      g.fillStyle = e.cut ? CARD.red : CARD.wood; g.font = `${e.cut ? "800 " : ""}25px ${FD}`; y = drawWrapped(g, e.sag, M + 40, y + 4, BW, 36);
      y += 30;
    }
    const close = SL_CLOSE[S.end.rec.kind] || SL_CLOSE.style;
    g.font = `800 27px ${FD}`; need(wrapLines(g, close, W - 2 * M).length * 40 + 40);
    g.fillStyle = CARD.ink; y = drawWrapped(g, close, M, y + 10, W - 2 * M, 40) + 20;
    // 생각 적기
    newPage("생각 적기");
    const f = fate(), r = S.end.rec, m = endData();
    g.fillStyle = CARD.ink; g.font = `26px ${FB}`;
    for (const t of [`나라의 운명: ${f.t}`, `역사책의 기록: ${r.stamp} · ${r.myo}`, `나와 가장 닮은 왕: ${m.top.k.era} ${m.top.k.n} (${m.pct}%)`, `능력치: ${ST.map((x) => `${x.n} ${S.st[x.k]}`).join(" · ")}`]) y = drawWrapped(g, t, M, y, W - 2 * M, 38) + 6;
    y += 30;
    const qs = [S.over ? `${SN[S.over]}이(가) 0이 되기 전에 어떤 신호가 있었나요? 무엇을 바꾸었다면 막을 수 있었을까요?` : "정책의 순서를 바꾸었다면 결과가 어떻게 달라졌을까요?",
      "나와 닮은 왕이 실제로 한 정책 가운데 내가 하지 않은 것은 무엇인가요? 그 왕은 왜 그 정책을 골랐을까요?",
      "실록에 적힌 내 모습과 실제 나의 선택은 같았나요? 기록하는 사람에 따라 무엇이 달라질까요?"];
    qs.forEach((q, i) => {
      g.fillStyle = CARD.red; g.font = `800 28px ${FD}`; g.fillText(`${i + 1}.`, M, y);
      g.fillStyle = CARD.ink; g.font = `27px ${FB}`; y = drawWrapped(g, q, M + 44, y, W - 2 * M - 44, 38) + 12;
      g.strokeStyle = CARD.line; g.lineWidth = 2;
      for (let k = 0; k < 4; k++) { y += 58; g.beginPath(); g.moveTo(M + 44, y); g.lineTo(W - M, y); g.stroke(); }
      y += 56;
    });
    return pages;
  }
  function canvasJpeg(c) {
    const b64 = c.toDataURL("image/jpeg", 0.9).split(",")[1], bin = atob(b64), out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return { bytes: out, w: c.width, h: c.height };
  }
  // 그림(JPEG)만 담은 간단한 PDF를 직접 만들어요
  function buildPdf(pages) {
    const enc = new TextEncoder(), chunks = [], offs = []; let len = 0;
    const push = (x) => { const b = typeof x === "string" ? enc.encode(x) : x; chunks.push(b); len += b.length; };
    const obj = (n, parts) => { offs[n] = len; push(`${n} 0 obj\n`); [].concat(parts).forEach(push); push("\nendobj\n"); };
    push("%PDF-1.4\n"); push(new Uint8Array([0x25, 0xe2, 0xe3, 0xcf, 0xd3, 0x0a]));
    const n = pages.length, PW = 595.28, PH = 841.89, PM = 24;
    obj(1, "<< /Type /Catalog /Pages 2 0 R >>");
    obj(2, `<< /Type /Pages /Kids [${pages.map((_, i) => `${3 + 3 * i} 0 R`).join(" ")}] /Count ${n} >>`);
    pages.forEach((p, i) => {
      const s = Math.min((PW - 2 * PM) / p.w, (PH - 2 * PM) / p.h), w = p.w * s, h = p.h * s, x = (PW - w) / 2, y = (PH - h) / 2;
      obj(3 + 3 * i, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PW} ${PH}] /Resources << /XObject << /Im${i} ${5 + 3 * i} 0 R >> >> /Contents ${4 + 3 * i} 0 R >>`);
      const cs = `q ${w.toFixed(2)} 0 0 ${h.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)} cm /Im${i} Do Q`;
      obj(4 + 3 * i, `<< /Length ${cs.length} >>\nstream\n${cs}\nendstream`);
      obj(5 + 3 * i, [`<< /Type /XObject /Subtype /Image /Width ${p.w} /Height ${p.h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${p.bytes.length} >>\nstream\n`, p.bytes, "\nendstream"]);
    });
    const xref = len, size = 3 + 3 * n;
    push(`xref\n0 ${size}\n0000000000 65535 f \n`);
    for (let k = 1; k < size; k++) push(`${String(offs[k]).padStart(10, "0")} 00000 n \n`);
    push(`trailer\n<< /Size ${size} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`);
    return new Blob(chunks, { type: "application/pdf" });
  }
  const fileBase = () => `${NATION()}_${S.king.trim() || "왕"}_${S.over ? "멈춘다스림" : S.ext ? "60년" : "30년"}`.replace(/[\\/:*?"<>|\s]+/g, "_");
  let toastT = 0;
  function toast(msg) { const t = $("toast"); if (!t) return; t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => { t.hidden = true; }, 3200); }
  async function getDownloads() { try { return window.claude && typeof window.claude.use === "function" ? await window.claude.use("downloads") : null; } catch (e) { return null; } }
  function saveFallback(blob, kind, previewUrl) {
    const url = URL.createObjectURL(blob);
    $("layer").innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="saveTitle"><div class="modal wide">
      <h2 id="saveTitle">${kind === "png" ? "결과 카드" : "결과 PDF"}</h2>
      <p>이 화면에서는 바로 저장할 수 없어요. ${kind === "png" ? "아래 그림을 길게 누르거나 오른쪽 단추로 눌러 '이미지 저장'을 골라 주세요." : "아래 결과 카드를 길게 누르거나 오른쪽 단추로 눌러 저장해 주세요."}</p>
      <img class="savepreview" src="${previewUrl || url}" alt="결과 카드 그림">
      <div class="row"><a class="btn" href="${url}" download="${esc(fileBase())}.${kind}">파일로 받기</a><button type="button" class="btn go" id="btnSaveClose">닫기</button></div>
    </div></div>`;
    $("btnSaveClose").focus();
  }
  function directDownload(blob, name) {
    try {
      const url = URL.createObjectURL(blob), a = document.createElement("a");
      a.href = url; a.download = name; a.style.display = "none";
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
      return true;
    } catch (e) { return false; }
  }
  async function exportFile(kind) {
    const btn = $(kind === "png" ? "btnCard" : "btnPdf");
    const label = btn ? btn.textContent : "";
    if (btn) { btn.disabled = true; btn.textContent = "만드는 중…"; }
    try {
      const card = await drawCard();
      let blob, preview = null;
      if (kind === "png") blob = await new Promise((res) => card.toBlob(res, "image/png"));
      else {
        const pages = [card, ...(await drawSillokPages())].map(canvasJpeg);
        blob = buildPdf(pages);
        preview = card.toDataURL("image/jpeg", 0.85);
      }
      const dl = await getDownloads();
      if (dl) {
        try { await dl.save({ filename: `${fileBase()}.${kind}`, data: blob }); toast(kind === "png" ? "결과 카드를 저장했어요." : "PDF를 저장했어요."); return; }
        catch (e) {
          const code = e && e.code;
          if (code === "declined") { toast("저장을 취소했어요."); return; }
          if (code === "rate_limited") { toast("잠시 뒤에 다시 눌러 주세요."); return; }
        }
      }
      if (!window.claude && directDownload(blob, `${fileBase()}.${kind}`)) { toast(kind === "png" ? "결과 카드를 내려받았어요." : "PDF를 내려받았어요."); return; }
      saveFallback(blob, kind, preview);
    } catch (e) {
      toast("파일을 만들지 못했어요. 다시 한 번 눌러 주세요.");
    } finally { if (btn) { btn.disabled = false; btn.textContent = label; } }
  }
