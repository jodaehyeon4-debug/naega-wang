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



S10 = 10.5
HD = "/tmp/claude-0/-home-claude/a3d432b7-bc61-5468-8412-2938cd20ead8/scratchpad/king/howto/"
def heading(txt, size=13.5):
    para([(txt, {"size": size, "bold": True, "color": RED})])
def tbl(rows, widths, head=True, size=S10, shade="#E6EEF5", hcol=None):
    t = d.add_table(len(rows), len(rows[0]), width=W); t.set_column_widths(widths); margins(t)
    for r, row in enumerate(rows):
        for c, v in enumerate(row):
            hd = (head and r == 0) or (hcol is not None and c == hcol)
            if hd: t.set_cell_shading(r, c, shade)
            cellp(t.cell(r, c), [(v, {"bold": hd, "size": size, "color": RED if (hcol == 0 and c == 0 and not head) else INK})])
    return t
def nums(items, size=S10):
    tbl([[["①","②","③","④","⑤"][i], x] for i, x in enumerate(items)], [6, 94], head=False, hcol=0, shade="#F6E2DF", size=size)
def pic(name, w):
    d.add_picture(open(HD + name, "rb").read(), "png", width_mm=w, align="CENTER")
def brk():
    d.add_paragraph("", include_run=False, pageBreak="1")
def bullet(b, size=S10):
    para([("• ", {"bold": True, "color": RED, "size": size})] + [(x if isinstance(x, tuple) else (x, {"size": size})) for x in (b if isinstance(b, list) else [b])])

# ===== 1쪽 =====
para([("왕BTI", {"size": 22, "bold": True, "color": RED}), ("  게임하는 법", {"size": 17, "bold": True}), ("   학생·선생님 함께 보기", {"size": 11, "color": MUTE})])
tbl([["게임 주소", "https://jodaehyeon4-debug.github.io/naega-wang/   (설치·가입 없이 바로 시작, 한 판 20~30분)"]], [16, 84], head=False, hcol=0, shade="#F3E3D3")
heading("한 판의 흐름")
tbl([["시작", "한 시기(3년)마다 4단계 → 10번 되풀이 (30년)", "끝"],
     ["이름·나라·원칙 정하기", "① 사건에 답하기 → ② 나라 살림 정하기 → ③ 정책 카드 담기 → ④ 실록(결과) 읽기", "운명·닮은 왕·티어 공개"]], [20, 60, 20], size=10.5)
heading("시작하기: 이름 → 나라 → 다스림 원칙")
pic("h1.png", 140)
nums(["왕 이름을 쓰고, 어떤 나라의 왕이 될지 골라요. ‘우리 역사 속 나라’는 연도 순서로 놓여 있어요.",
      "★이 적을수록 쉬워요. 처음에는 ★★ 나라(백제, 조선 1418년)나 ‘상상 속 나라’로 연습해 보세요.",
      "카드 아래 숫자는 처음 능력치예요(王 왕권, 和 화합, 民 민심, 財 재정, 兵 국방, 文 문화). 그 아래로 내려가 ‘다스림 원칙’ 3가지를 고르고 시작해요."])
heading("꼭 알아 둘 규칙 5가지")
bullet([("능력치 6개 중 하나라도 0이 되면 ", {"size": S10}), ("그 자리에서 나라가 무너져요.", {"bold": True, "size": S10, "color": RED}), (" 가장 낮은 능력치부터 챙겨요.", {"size": S10})])
bullet("매 시기 ‘세월의 흐름’으로 국방·민심·왕권이 조금씩 저절로 줄어요. 가만히 있으면 나라가 약해져요.")
bullet("정책 카드는 ‘국정 힘’(● 동그라미)만큼만 담을 수 있어요. 쓰지 않은 힘은 다음 시기로 넘어가요(최대 2개).")
bullet("‘모험’ 선택지는 성공 확률이 적혀 있어요. 성공하면 크게 얻고, 실패하면 크게 잃어요.")
bullet("같은 선택을 되풀이하면 효과가 줄어요. ‘안 가 본 길’ 표시가 붙은 선택지에도 도전해 보세요.")

# ===== 2쪽 =====
brk()
heading("① 사건에 답하기")
pic("h2.png", 118)
nums(["맨 위 나라 살림판: 지금 능력치예요. 게임 내내 보여요. 막대가 짧아지면 위험 신호!",
      "지금이 몇 번째 시기인지, 실제 역사로는 몇 년 무렵인지 알려 줘요(10시기까지).",
      "지도: 우리 땅(붉은색)과 이웃 나라, 쳐들어오는 길(화살표)을 보여 줘요. 땅을 얻거나 잃으면 지도도 바뀌어요.",
      "선택지 하나를 눌러요. 싸움 선택지에는 ‘우리 힘 대 적의 힘’이 적혀 있어요. 우리 힘이 같거나 크면 이겨요."])
para([("※ 우리 힘은 국방을 중심으로, 성 쌓기·동맹 같은 정책이 있으면 더 커져요.", {"size": 10, "color": MUTE})])

# ===== 3쪽 =====
brk()
heading("② 나라 살림 정하기 (국정 힘이 들지 않아요)")
pic("h3.png", 115)
nums(["세금을 어떻게 걷을지 하나를 골라요. 재정(곳간)을 채우면 민심이 줄고, 민심을 챙기면 재정이 줄어요.",
      "‘모험’ 살림은 성공 확률과 성공·실패했을 때의 결과가 함께 적혀 있어요."])
heading("③ 정책 카드 담기")
pic("h4.png", 132)
nums(["카드 오른쪽 위 동그라미 수 = 필요한 국정 힘이에요.",
      "▲는 오르는 능력치, ▼는 내려가는 능력치예요. 화살표가 많을수록 크게 바뀌어요.",
      "주황색 글씨는 조건과 꿀팁이에요. ‘먼저 ○○이 필요해요’, ‘국방이 40보다 낮으면 효과가 줄어요’ 같은 내용이니 꼭 읽어요.",
      "흐리게 보이는 카드는 이미 한 정책이에요(처음부터 있던 제도 포함)."])
pic("h5.png", 120)
nums(["담은 카드와 남은 국정 힘이 보여요.", "▲▼로 순서를 바꿔요. 위에서부터 차례로 실행되니, 먼저 해야 하는 정책을 위에 둬요.", "‘이 순서로 실행하기’를 누르면 이번 시기가 끝나요."])

# ===== 4쪽 =====
brk()
heading("④ 실록 읽기: 이번 시기에 무슨 일이 있었을까?")
pic("h6.png", 118)
nums(["사건에서 고른 선택과 결과", "나라 살림 결과", "펼친 정책의 결과(실패하면 ‘실패’ 표시)", "세월의 흐름: 저절로 바뀐 것과 그 까닭. 왜 줄었는지 여기서 확인해요."])
para([("※ 조건이 있는 정책을 펼쳤다면, 화면 오른쪽 아래에 ‘주의!’ 알림이 떠서 조건을 잊지 않게 도와줘요.", {"size": 10, "color": MUTE})])
heading("다스림이 끝나면")
pic("h7.png", 72)
nums(["나라의 운명과 역사책이 붙인 이름, 마지막 능력치가 나와요. 아래로 내리면 ‘나와 가장 닮은 왕(왕BTI)’도 공개돼요.",
      "‘결과 카드 사진으로 저장’(PNG), ‘실록까지 PDF로 저장’으로 내려받아 패들렛에 올리거나 인쇄해요.",
      "왕BTI 티어표: 왕력 점수로 S~F 7등급이 매겨지고, 같은 기기에서 한 친구들과 순위를 비교해요."])
heading("선생님께", 12)
bullet("처음 10분은 ‘상상 속 나라(★2)’로 함께 1시기를 진행하며 ①~④를 짚어 주면 이후 혼자서도 잘 해요.")
bullet("막히는 학생에게는 ‘가장 낮은 능력치가 뭐니? 그걸 올리는 카드는?’ 두 질문이면 충분해요.")
d.save_to_path("왕BTI_게임하는_법.hwpx")
print("saved")
