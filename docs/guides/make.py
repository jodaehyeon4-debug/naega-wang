from hwpx import HwpxDocument
MM = 283.465
F = "맑은 고딕"
RED, INK, MUTE, SKY = "#B9352A", "#1C2427", "#59665F", "#24496A"
d = HwpxDocument.new()
d.page.set_margins(left=int(15*MM), right=int(15*MM), top=int(12*MM), bottom=int(10*MM), header=0, footer=0)
W = int(180*MM)

FIRST = [True]
def para(text_runs, size=12, **kw):
    if FIRST[0]:
        FIRST[0] = False; p = d.paragraphs[0]
    else:
        p = d.add_paragraph("", include_run=False)
    for t in text_runs:
        if isinstance(t, str): t = (t, {})
        p.add_run(t[0], font=F, size=t[1].get("size", size), bold=t[1].get("bold", False), color=t[1].get("color", INK))
    return p
def cellp(cell, runs, size=12, first=True):
    ps = cell.paragraphs
    p = ps[0] if first and ps else cell.add_paragraph("")
    if first and ps:
        for r in list(p.runs): r.remove() if hasattr(r, "remove") else None
    for t in runs:
        if isinstance(t, str): t = (t, {})
        p.add_run(t[0], font=F, size=t[1].get("size", size), bold=t[1].get("bold", False), color=t[1].get("color", INK))
    return p
def margins(t):
    for r in range(t.row_count):
        for c in range(t.column_count):
            try: t.cell(r, c).set_margins(left=int(2*MM), right=int(2*MM), top=int(1.2*MM), bottom=int(1.2*MM))
            except Exception: pass
def heading(txt):
    para([(txt, {"size": 15, "bold": True, "color": RED})])

# 제목
para([("왕BTI", {"size": 26, "bold": True, "color": RED}), ("  학생 설명서", {"size": 18, "bold": True})])
para([("내가 왕이라면, 나는 어떤 왕일까? 30년 동안 나라를 다스리고, 역사 속 나와 닮은 왕을 찾아요.", {"size": 11.5, "color": MUTE})])
t = d.add_table(1, 2, width=W)
t.set_column_widths([22, 78]); margins(t)
t.set_cell_shading(0, 0, "#F3E3D3")
cellp(t.cell(0, 0), [("게임 주소", {"bold": True})])
cellp(t.cell(0, 1), [("https://jodaehyeon4-debug.github.io/naegawang/", {"bold": True, "color": SKY, "size": 12})])

heading("① 시작하기")
t = d.add_table(2, 3, width=W); t.set_column_widths([1, 1, 1]); margins(t)
for i, h in enumerate(["1. 이름 정하기", "2. 나라 고르기", "3. 다스림 원칙 고르기"]):
    t.set_cell_shading(0, i, "#E6EEF5"); cellp(t.cell(0, i), [(h, {"bold": True})])
for i, b in enumerate(["왕의 이름과 나라 이름을 써요. 별명도 좋아요.", "★이 적을수록 쉬워요. 처음에는 ★★ 나라부터 해 봐요.", "가장 중요하게 여길 것 3가지를 골라요. 끝나면 실제 결과와 비교해요."]):
    cellp(t.cell(1, i), [(b, {"size": 11.5})])

heading("② 한 시기(3년)마다 할 일 — 10시기 동안 되풀이해요")
t = d.add_table(2, 4, width=W); t.set_column_widths([1, 1, 1, 1]); margins(t)
for i, h in enumerate(["1. 사건에 답하기", "2. 나라 살림 정하기", "3. 정책 카드 담기", "4. 결과 확인하기"]):
    t.set_cell_shading(0, i, "#E6EEF5"); cellp(t.cell(0, i), [(h, {"bold": True})])
for i, b in enumerate(["나라에 일어난 일에 어떻게 할지 골라요.", "세금을 어떻게 걷을지 하나를 골라요.", "국정 힘(●)만큼 카드를 담아요. 위에서부터 차례로 실행돼요.", "실록을 읽고 능력치가 어떻게 바뀌었는지 살펴요."]):
    cellp(t.cell(1, i), [(b, {"size": 11.5})])

heading("③ 나라의 힘 6가지")
t = d.add_table(2, 6, width=W); t.set_column_widths([1]*6); margins(t)
for i, (h, b) in enumerate([("王 왕권", "왕의 명령이 잘 따라지는 힘"), ("和 화합", "신하·귀족과 사이좋은 정도"), ("民 민심", "백성이 왕을 믿는 마음"), ("財 재정", "나라 곳간의 곡식과 돈"), ("兵 국방", "나라를 지키는 군사의 힘"), ("文 문화", "학문·문화·기술의 수준")]):
    t.set_cell_shading(0, i, "#F3E3D3"); cellp(t.cell(0, i), [(h, {"bold": True})])
    cellp(t.cell(1, i), [(b, {"size": 11})])
para([("※ 하나라도 0이 되면 그 자리에서 나라가 무너져요! 낮아진 힘부터 챙겨요.", {"bold": True, "color": RED, "size": 11.5})])

heading("④ 잘 다스리는 꿀팁")
for b in ["'모험' 선택지에는 성공 확률이 적혀 있어요. 성공하면 크게 얻고, 실패하면 크게 잃어요.",
          "정책 카드의 주황색 글씨를 꼭 읽어요. 먼저 해야 하는 정책과 조건이 적혀 있어요.",
          "같은 선택만 되풀이하면 효과가 줄어들어요. '안 가 본 길'에도 도전해 봐요.",
          "쓰지 않은 국정 힘은 다음 시기로 넘어가요(최대 2개)."]:
    para([("• ", {"bold": True, "color": RED}), (b, {})])

heading("⑤ 다스림이 끝나면")
para([("나라의 운명, 역사책이 붙인 이름, ", {}), ("나와 가장 닮은 왕(왕BTI)", {"bold": True}), ("이 공개돼요. '결과 카드 저장'으로 사진을, 'PDF 저장'으로 실록까지 내려받을 수 있어요.", {})])

heading("생각해 보기")
t = d.add_table(2, 2, width=W); t.set_column_widths([30, 70]); margins(t)
for i, q in enumerate(["내가 가장 잘한 선택은?", "다시 한다면 바꾸고 싶은 선택은?"]):
    t.set_cell_shading(i, 0, "#E6EEF5"); cellp(t.cell(i, 0), [(q, {"bold": True})])
    t.cell(i, 1).set_size(height=int(20*MM))
d.save_to_path("왕BTI_학생용_설명서.hwpx")
print("saved")
