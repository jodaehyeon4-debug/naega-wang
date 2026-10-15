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
def heading(txt):
    para([(txt, {"size": 13, "bold": True, "color": RED})])
def tbl(rows, widths, head=True, size=S10, shade="#E6EEF5", hcol=None):
    t = d.add_table(len(rows), len(rows[0]), width=W); t.set_column_widths(widths); margins(t)
    for r, row in enumerate(rows):
        for c, v in enumerate(row):
            hd = (head and r == 0) or (hcol is not None and c == hcol)
            if hd: t.set_cell_shading(r, c, shade)
            cellp(t.cell(r, c), [(v, {"bold": hd, "size": size})])
    return t
def bullet(b, size=S10):
    if isinstance(b, str): b = [b]
    para([("• ", {"bold": True, "color": RED, "size": size})] + [(x if isinstance(x, tuple) else (x, {"size": size})) for x in b])

# ===== 1쪽 =====
para([("왕BTI", {"size": 22, "bold": True, "color": RED}), ("  교사용 가이드", {"size": 16, "bold": True}), ("   5학년 역사 의사결정 시뮬레이션", {"size": 11, "color": MUTE})])
tbl([["게임 주소", "https://jodaehyeon4-debug.github.io/naega-wang/"],
     ["준비", "1인 1기기(태블릿·노트북, 크롬 권장). 설치·회원 가입 없음. 한 판 20~30분(10시기)."],
     ["개인 정보", "학생 이름은 기기 브라우저에만 저장되고 어디에도 전송되지 않아요. 명예의 전당도 기기별로 따로 쌓여요."]], [16, 84], head=False, hcol=0, shade="#F3E3D3")

heading("① 게임 한눈에 보기")
bullet("한 시기(3년)마다 ‘사건에 답하기 → 나라 살림 정하기 → 정책 카드 담기(국정 힘 2개 안팎) → 실록 확인’을 10번 되풀이해요.")
bullet("능력치 6가지(왕권·화합·민심·재정·국방·문화) 중 하나라도 0이 되면 나라가 무너져요. 균형이 곧 전략이에요.")
bullet("끝나면 나라의 운명, 시호, 닮은 왕(왕BTI), 7등급 티어(S 천하제일 대왕~F 무너진 나라의 왕), 실록 PDF가 나와요.")
tbl([["묶음", "나라(★ 난이도)", "추천 대상"],
     ["우리 역사 (지도 有)", "백제 346★2 · 고구려 371★4 · 신라 514★3 · 고려 918★3 · 조선 1418(세종)★2 · 조선 1592(임진왜란)★4 · 조선 1627(병자호란)★4 · 조선 1670(경신 대기근)★5 · 조선 1724(영조)★4 · 대한 제국 1897★5", "단원 진도에 맞춰 지정"],
     ["상상 속 나라", "흩어진 호족·작은 나라·지친 나라·전성기 나라 (★2~3)", "첫 판 연습용"],
     ["세계사 (지도 有)", "몽골 1206★3 · 프랑스 혁명 1789★4 · 아메리카 원주민★5 · 흑사병 잉글랜드★5", "심화·비교"]], [17, 63, 20], size=10)

heading("② 수업 흐름 예시 (40분 × 2차시)")
tbl([["차시", "활동", "교사 발문·지도 포인트"],
     ["1차시 도입 5′", "‘내가 왕이라면 가장 먼저 무엇을 할까?’ 다스림 원칙 3가지를 미리 적기", "원칙은 게임 첫 화면에서도 고르며, 끝에 실제 결과와 비교돼요."],
     ["1차시 전개 30′", "상상 나라(★2)로 연습 1판 → 배운 시대 나라 1판 시작", "‘왜 그 카드를 골랐니? 무엇을 잃었니?’ 기회비용을 말로 하게 해요."],
     ["1차시 정리 5′", "결과 카드·티어 공유(같은 기기 명예의 전당 확인)", "점수보다 ‘가장 아찔한 순간’을 이야기해요."],
     ["2차시 전개 25′", "같은 나라 다시 하기 또는 다른 시대 나라 도전", "1판과 무엇을 바꿨는지, 결과가 어떻게 달라졌는지 비교"],
     ["2차시 정리 15′", "실록 PDF·결과 카드로 ‘생각해 보기’ 작성, 패들렛 공유", "실제 역사와 내 역사의 같은 점·다른 점 찾기"]], [16, 42, 42], size=10)

heading("③ 형성평가 포인트: 핵심 정책 (학생에게는 알려 주지 않아요)")
para([("시대마다 교과서에서 배우는 ‘나라 발전의 열쇠’ 정책은 그 나라에서 좋은 효과 1.4배, 나쁜 효과 0.6배로 숨은 가산이 있어요. 화면에는 표시되지 않으므로, 학생이 이 정책을 먼저 고른다면 ‘배운 내용을 근거로 판단했다’는 증거가 돼요.", {"size": S10})])
tbl([["나라", "핵심 정책 (카드 이름 기준)"],
     ["고구려·백제·신라", "율령 반포, 관등(관리 등급) 정하기, 불교 받아들이기 + 고구려 태학 / 백제 바다 교역 / 신라 화랑도"],
     ["고려 918", "호족과 혼인·사성, 기인 제도, 과거제, 노비안검법, 12목 지방관, 국자감"],
     ["조선 1418(세종)", "집현전(학자 모으기), 훈민정음, 과학 기구, 공법(백성에게 물어 세금 정하기)"],
     ["조선 중·후기", "임진왜란: 훈련도감·판옥선과 거북선 / 병자호란: 대동법 / 경신 대기근: 대동법·환곡·진휼청 / 영조: 탕평책·균역법"],
     ["대한 제국", "광무 양전·지계, 신식 군대, 신문, 국채 보상 운동, 민족 학교, 의병 · (국권 피탈 뒤) 임시 정부, 광복군, 독립군 기지, 조선어 학회, 민족 교육, 물산 장려 운동"]], [20, 80], size=10)

# ===== 2쪽 =====
d.add_paragraph("", include_run=False, pageBreak="1")
heading("④ 숨은 요소 (교사만 알고, 탐구 동기로 활용)")
tbl([["요소", "내용", "활용 팁"],
     ["역사 속 왕의 위업", "나라마다 3개. 예) 세종: 훈민정음·4군 6진·과학과 공법. 4군 6진은 원정→사민 정책→6진 완성처럼 여러 단계라 쉽게 끝나지 않아요. 정책 화면 위에 ‘위업 0/3’으로 보여요.", "‘실제 세종은 4군 6진에 16년이 걸렸대. 너는 몇 시기 걸렸니?’"],
     ["다른 역사 결말", "핵심 정책 대신 숨은 역사 정책을 조합하면 실제보다 나은 결말이 나와요. 예) 붓으로 천 년을 이은 고구려, 골품제를 넘어선 신라, 발해를 품은 고려, 과학 혁명의 조선. 우연히는 0~7%, 노리고 하면 10~50%.", "‘실제 역사는 왜 그렇게 되지 않았을까?’ 원인과 결과 탐구로 연결"],
     ["전설의 히든 정책", "정해진 정책 3~4개와 조건이 맞을 때만 나타나는 카드(100판 중 1~6판). 예) 하늘을 나는 비거, 영국 사신과 증기 기관. ‘실제 역사에는 없던 일’로 표시돼요.", "발견한 학생이 조건을 추리해 발표하게 하면 효과적"],
     ["만약에? 선택지", "중원 진출·왜 정벌 같은 역사적 상상. 성공 확률 2~55%가 화면에 보이며, 초모험은 국력 4개가 들어요.", "‘가능성 20%에 나라를 걸겠니?’ 위험 판단 토론"]], [16, 56, 28], size=10)

heading("⑤ 결과를 평가 자료로 쓰기")
bullet([("관찰: ", {"bold": True, "size": S10}), ("핵심 정책을 언제 골랐는지, 낮아진 능력치를 어떻게 회복했는지, ‘모험’ 확률을 보고 판단했는지 살펴요.", {"size": S10})])
bullet([("산출물: ", {"bold": True, "size": S10}), ("결과 카드(PNG)는 운명·티어·닮은 왕, 실록 PDF는 시기별 선택과 실제로 고른 것 전체를 담고 있어 포트폴리오에 바로 쓸 수 있어요.", {"size": S10})])
bullet([("결과 화면의 ‘처음 다짐과 실제 결과’", {"bold": True, "size": S10}), ("는 원칙과 행동이 일치했는지 성찰하는 데 좋아요.", {"size": S10})])
bullet([("티어는 ", {"bold": True, "size": S10}), ("평균 능력치·업적·위업·난이도(★)를 합친 왕력 점수예요. 어려운 나라일수록 가산이 있어 ★5에서 C등급이 ★2의 A등급만큼 의미 있어요.", {"size": S10})])

heading("⑥ IB PYP 연계 발문")
tbl([["핵심 개념", "발문 예시"],
     ["원인(인과)", "그 시기에 나라가 흔들린 까닭은 어떤 선택 때문이었나요? 실제 역사에서도 같은 일이 있었나요?"],
     ["관점", "백성·신하·이웃 나라 입장에서 내 선택은 어떻게 보였을까요?"],
     ["책임", "‘왕권은 올랐지만 민심이 내려간’ 선택을 다시 한다면 어떻게 하겠어요?"],
     ["변화", "같은 나라를 두 번 했을 때 결과가 달라진 까닭은 무엇인가요?"]], [18, 82], size=10)

heading("⑦ 자주 묻는 질문")
bullet([("새로 고침하면? ", {"bold": True, "size": S10}), ("진행 상황이 기기에 저장돼 이어서 할 수 있어요. 다른 기기로 옮기면 처음부터예요.", {"size": S10})])
bullet([("운이 너무 큰가요? ", {"bold": True, "size": S10}), ("모험 선택지와 사건 일부만 확률이에요. 효율적으로 다스리면 거의 무너지지 않고, 아무렇게나 고르면 어려운 나라(★4~5)는 3~5판 중 1판꼴로 무너져요.", {"size": S10})])
bullet([("실제 역사와 다른 내용은? ", {"bold": True, "size": S10}), ("상상 결과에는 ‘실제 역사에는 없던 상상의 이야기예요’라는 문장과 함께 실제 역사가 나란히 적혀요. 실록은 재미를 위해 과장된 기록임을 미리 알려 주세요.", {"size": S10})])
bullet([("정답을 물어보면? ", {"bold": True, "size": S10}), ("‘교과서에서 그 왕이 한 일을 떠올려 봐’로 되돌려 주세요. 핵심 정책 표시는 일부러 없앴어요.", {"size": S10})])
d.save_to_path("왕BTI_교사용_가이드.hwpx")
print("saved")
