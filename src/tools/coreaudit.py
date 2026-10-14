from playwright.sync_api import sync_playwright
U="file:///home/claude/naega-wang/src/test.html"
JS="""([sc,lost])=>{window.__FAST=true;const K=window.__K; K.S=K.fresh(); K.S.scen=sc; K.S.goals=["def","kp","cul"]; K.beginReign(); if(lost) K.S.flags.lost=true; K.relabel();
 const val=(e)=>Object.values(e||{}).reduce((a,v)=>a+(v>0?v:0.6*v),0);
 const out=K.POL.filter(p=>K.polVisible(p)&&!K.S.done.some(d=>d.id===p.id)&&!p.dir&&!p.ifs).map(p=>{let v=p.gamble?(p.chance()*val(p.eff)+(1-p.chance())*val(p.fail)):val(p.eff); v+= (p.inc||0)*3; return {id:p.id,name:p.name,core:K.isCore(p),v:Math.round(v/p.cost*10)/10}});
 return out.sort((a,b)=>b.v-a.v)}"""
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/opt/pw-browsers/chromium"); pg=b.new_page(); pg.goto(U); pg.wait_for_timeout(400)
    for sc,lost in [("P",0),("Q",0),("R",0),("T",0),("U",0),("V",0),("E",0),("F",0),("K",0),("J",0),("J",1)]:
        r=pg.evaluate(JS,[sc,lost])
        cores=[x for x in r if x["core"]]; minc=min([x["v"] for x in cores], default=None)
        above=[f'{x["id"]}:{x["v"]}' for x in r if not x["core"] and minc is not None and x["v"]>=minc]
        print(sc+("*" if lost else ""), "CORE", " ".join(f'{x["id"]}:{x["v"]}' for x in cores), "| >=minCore:", " ".join(above))
    b.close()
