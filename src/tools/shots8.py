# 독립 실행 파일: 끝까지 플레이 후 PNG/PDF 내려받기 확인
from playwright.sync_api import sync_playwright
BASE = "file:///tmp/claude-0/-home-claude/a3d432b7-bc61-5468-8412-2938cd20ead8/scratchpad/king/dist/index.html"
with sync_playwright() as p:
    b = p.chromium.launch(); errs = []
    ctx = b.new_context(accept_downloads=True, viewport={"width": 1280, "height": 900})
    pg = ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto(BASE); pg.evaluate("localStorage.clear()"); pg.reload(); pg.wait_for_timeout(300)
    pg.fill("#kingName", "해솔"); pg.click('[data-scen="B"]'); pg.click("#btnStart"); pg.wait_for_timeout(100)
    for t in range(40):
        if pg.query_selector("#btnRvDone") or pg.query_selector("#btnSkip"):
            break
        if pg.query_selector('.choice'):
            pg.click('.choice'); pg.wait_for_timeout(80)
        if pg.query_selector("#btnRun"):
            pg.click("#btnRun"); pg.wait_for_timeout(80)
        if pg.query_selector("#btnNext"):
            pg.click("#btnNext"); pg.wait_for_timeout(80)
    pg.wait_for_timeout(500)
    if pg.query_selector("#btnSkip"): pg.click("#btnSkip"); pg.wait_for_timeout(300)
    if pg.query_selector("#btnRvDone"): pg.click("#btnRvDone"); pg.wait_for_timeout(300)
    for bid in ["#btnCard", "#btnPdf"]:
        with pg.expect_download(timeout=15000) as d:
            pg.click(bid)
        dl = d.value; print(bid, dl.suggested_filename); dl.save_as("dist_test_" + dl.suggested_filename.split(".")[-1] + "." + dl.suggested_filename.split(".")[-1])
    print("errors", errs); b.close()
