import { useState, useEffect, useRef } from "react";

const DS={bg:"#FFFFF0",copper:"#C78F56",dark:"#1a1a1a",gray:"#595959",lgray:"#999999",glass:"rgba(0,0,0,0.03)",glassBorder:"rgba(0,0,0,0.1)",glassHL:"rgba(0,0,0,0.15)",white:"#fff",black:"#0a0a0a",success:"#1A8754",red:"#c0392b",cardBg:"#F5EEE2",copperBg:"rgba(199,143,86,.08)",copperLight:"#E8C9A0"};
const G="linear-gradient(160deg,#0a0a0a 0%,#1a1a2e 50%,#0a0a0a 100%)";
const mono="'Roboto Mono',monospace",serif="'Playfair Display',serif",sans="'Montserrat',sans-serif";

function R({children,delay=0,style={}}){const ref=useRef(null);const[v,setV]=useState(false);useEffect(()=>{const el=ref.current;if(!el)return;const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){setV(true);o.disconnect()}},{threshold:.12});o.observe(el);return()=>o.disconnect()},[]);return<div ref={ref} style={{opacity:v?1:0,transform:v?"translateY(0)":"translateY(28px)",transition:"opacity .7s cubic-bezier(.16,1,.3,1) "+delay+"s, transform .7s cubic-bezier(.16,1,.3,1) "+delay+"s",willChange:"opacity,transform",...style}}>{children}</div>}
function Lbl({children,style={}}){return<span style={{fontFamily:mono,fontSize:11,fontWeight:400,letterSpacing:3,color:DS.gray,textTransform:"uppercase",display:"block",...style}}>{children}</span>}
function Glass({children,style={}}){return<div style={{background:DS.glass,backdropFilter:"blur(25px)",WebkitBackdropFilter:"blur(25px)",border:"1px solid "+DS.glassBorder,borderTopColor:DS.glassHL,borderRadius:20,boxShadow:"0 8px 32px rgba(0,0,0,.05),inset 0 0 0 1px rgba(0,0,0,.05)",...style}}>{children}</div>}
function Num({n,dark}){return<span style={{fontFamily:sans,fontSize:14,fontWeight:700,color:dark?DS.copperLight:DS.copper,display:"inline-block",width:36,height:36,lineHeight:"36px",textAlign:"center",borderRadius:10,background:dark?"rgba(255,255,255,.08)":DS.copperBg}}>{n}</span>}
function Pill({children,color=DS.copper}){return<span style={{fontFamily:mono,fontSize:9,fontWeight:400,letterSpacing:2,textTransform:"uppercase",color:DS.white,background:color,padding:"5px 14px",borderRadius:20,display:"inline-block"}}>{children}</span>}
function DkCard({children,style={},accent}){return<div style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:16,padding:"20px 24px",borderLeft:accent?"3px solid "+accent:undefined,...style}}>{children}</div>}
function Card({children,style={},accent}){return<div style={{background:DS.cardBg,borderRadius:20,padding:"24px 28px",border:"1px solid rgba(0,0,0,.06)",borderTop:accent?"3px solid "+accent:undefined,boxShadow:"0 4px 24px rgba(0,0,0,.03)",...style}}>{children}</div>}
function Divider(){return<div style={{width:48,height:2,background:DS.copper,margin:"40px 0"}}/>}
function Sld({value,onChange,min,max,step=1,label,valLabel,color=DS.copper,style={}}){const pct=((value-min)/(max-min))*100;return<div style={style}><div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontFamily:mono,fontSize:10,letterSpacing:2,color:DS.lgray,textTransform:"uppercase"}}>{label}</span><span style={{fontFamily:serif,fontSize:18,fontStyle:"italic",color}}>{valLabel||String(value)}</span></div><input type="range" min={min} max={max} step={step} value={value} onChange={e=>onChange(Number(e.target.value))} style={{width:"100%",height:6,borderRadius:3,background:"linear-gradient(to right,"+color+" "+pct+"%,rgba(150,150,150,.2) "+pct+"%)",WebkitAppearance:"none",appearance:"none",cursor:"pointer",outline:"none"}}/></div>}

const sec={minHeight:"100vh",padding:"clamp(80px,10vh,120px) clamp(24px,5vw,80px)",display:"flex",flexDirection:"column",justifyContent:"center",position:"relative"};
const secT={minHeight:"100vh",padding:"clamp(100px,12vh,140px) clamp(24px,5vw,80px) clamp(80px,10vh,120px)",display:"flex",flexDirection:"column",justifyContent:"flex-start",position:"relative"};
const NAV=[{id:"cover",l:"COVER"},{id:"why",l:"THE WHY"},{id:"target",l:"TARGET"},{id:"how",l:"HOW IT WORKS"},{id:"pricing",l:"PRICING"},{id:"savings",l:"SAVINGS"},{id:"breakeven",l:"BREAK EVEN"},{id:"whycade",l:"WHY CADE"},{id:"ffs",l:"FFS MODEL"},{id:"rollout",l:"ROLLOUT"},{id:"close",l:"CLOSE"}];
const fmt=n=>"$"+Math.round(n/1e6*10)/10+"M";
const fK=n=>n>=1e6?fmt(n):"$"+(n/1000).toFixed(0)+"K";
const fD=n=>n>=1000?"$"+(n/1000).toFixed(n>=10000?0:1)+"K":"$"+n;

function SavingsCalc(){
  const[htn,setHtn]=useState(2000);const[dia,setDia]=useState(1500);const[copd,setCopd]=useState(1500);
  const[hR,setHR]=useState(3);const[dR,setDR]=useState(2);const[cR,setCR]=useState(2);
  const pm=50,tot=htn+dia+copd,ac=tot*pm*12,hs=htn*pm*12*hR,ds=dia*pm*12*dR,cs=copd*pm*12*cR,ts=hs+ds+cs,roi=ac>0?(ts/ac):0,net=ts-ac;
  const items=[{l:"HYPERTENSION",v:htn,sv:setHtn,r:hR,sr:setHR,sav:hs},{l:"DIABETES",v:dia,sv:setDia,r:dR,sr:setDR,sav:ds},{l:"COPD",v:copd,sv:setCopd,r:cR,sr:setCR,sav:cs}];
  return(<div style={{maxWidth:740}}>
    <div style={{display:"flex",flexWrap:"wrap",gap:20,marginBottom:32}}>
      {items.map((x,i)=><div key={i} style={{flex:"1 1 220px",minWidth:200}}><Card style={{padding:"20px 24px"}}><Lbl style={{color:DS.copper,fontSize:9,marginBottom:16}}>{x.l}</Lbl><Sld value={x.v} onChange={x.sv} min={0} max={5000} step={100} label="Patients" valLabel={x.v.toLocaleString()}/><div style={{marginTop:12}}><Sld value={x.r} onChange={x.sr} min={1} max={5} step={0.5} label="ROI" valLabel={x.r+":1"} color={DS.success}/></div><div style={{fontFamily:serif,fontSize:28,fontStyle:"italic",color:DS.dark,marginTop:16,textAlign:"center"}}>{fK(x.sav)}</div><div style={{fontFamily:mono,fontSize:9,color:DS.lgray,textAlign:"center",letterSpacing:2,marginTop:4}}>PROJECTED SAVINGS</div></Card></div>)}
    </div>
    <div style={{display:"flex",flexWrap:"wrap",gap:16}}>
      <div style={{flex:"1 1 160px",textAlign:"center",background:DS.dark,borderRadius:16,padding:"20px 16px"}}><div style={{fontFamily:serif,fontSize:"clamp(32px,5vw,48px)",fontStyle:"italic",color:DS.copper,lineHeight:1}}>{fmt(ts)}</div><div style={{fontFamily:mono,fontSize:9,color:DS.lgray,letterSpacing:2,marginTop:8}}>TOTAL SAVINGS</div></div>
      <div style={{flex:"1 1 120px",textAlign:"center",background:DS.dark,borderRadius:16,padding:"20px 16px"}}><div style={{fontFamily:serif,fontSize:"clamp(32px,5vw,48px)",fontStyle:"italic",color:DS.white,lineHeight:1}}>{roi.toFixed(1)}x</div><div style={{fontFamily:mono,fontSize:9,color:DS.lgray,letterSpacing:2,marginTop:8}}>BLENDED ROI</div></div>
      <div style={{flex:"1 1 120px",textAlign:"center",background:DS.dark,borderRadius:16,padding:"20px 16px"}}><div style={{fontFamily:serif,fontSize:"clamp(32px,5vw,48px)",fontStyle:"italic",color:DS.success,lineHeight:1}}>{fmt(net)}</div><div style={{fontFamily:mono,fontSize:9,color:DS.lgray,letterSpacing:2,marginTop:8}}>NET SAVINGS</div></div>
    </div>
    <div style={{fontFamily:sans,fontSize:11,color:DS.lgray,marginTop:16,textAlign:"center"}}>{tot.toLocaleString()} members at ${pm} PMPM = {fK(ac)} annual program cost</div>
  </div>);
}

function BreakEvenCalc(){
  const[cost,setCost]=useState(13000);const[prev,setPrev]=useState(5);
  const mo=250000,pan=5000,po=Math.ceil(mo/cost),pp=((po/pan)*100).toFixed(1);
  const sv=Math.round((prev/100)*pan*cost*12),ac=mo*12,nt=sv-ac;
  const marks=[{l:"CADE Model",v:13000,c:DS.copper},{l:"AHRQ Avg",v:16300,c:DS.copperLight},{l:"Circulatory",v:17700,c:"#fff"},{l:"Respiratory",v:16400,c:DS.lgray}];
  const pcts=[1,3,5,7,10,15];
  return(<div style={{maxWidth:740}}>
    <div style={{display:"flex",flexWrap:"wrap",gap:20,marginBottom:24}}>
      <div style={{flex:"1 1 400px",minWidth:300}}>
        <DkCard style={{padding:"28px"}}>
          <Lbl style={{color:DS.copper,fontSize:9,marginBottom:16}}>AVERAGE INPATIENT COST</Lbl>
          <Sld value={cost} onChange={setCost} min={8000} max={80000} step={1000} label="Slide to adjust" valLabel={"$"+cost.toLocaleString()} color={DS.copperLight}/>
          <div style={{display:"flex",gap:8,marginTop:16,flexWrap:"wrap"}}>
            {marks.map((m,i)=><button key={i} onClick={()=>setCost(m.v)} style={{fontFamily:mono,fontSize:8,letterSpacing:1,color:m.c,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",borderRadius:6,padding:"4px 10px",cursor:"pointer",textTransform:"uppercase"}}>{m.l}: ${(m.v/1000).toFixed(1)}K</button>)}
          </div>
          <div style={{marginTop:24,display:"flex",gap:20,alignItems:"center",justifyContent:"center"}}>
            <div style={{textAlign:"center"}}><div style={{fontFamily:serif,fontSize:56,fontStyle:"italic",color:DS.copperLight,lineHeight:1}}>{po}</div><div style={{fontFamily:mono,fontSize:9,color:DS.lgray,letterSpacing:2,marginTop:6}}>PATIENTS TO KEEP OUT</div></div>
            <div style={{textAlign:"center"}}><div style={{fontFamily:serif,fontSize:56,fontStyle:"italic",color:"#fff",lineHeight:1}}>{pp}%</div><div style={{fontFamily:mono,fontSize:9,color:DS.lgray,letterSpacing:2,marginTop:6}}>OF 5,000 PANEL</div></div>
          </div>
          <div style={{background:"rgba(199,143,86,.12)",border:"1px solid rgba(199,143,86,.3)",borderRadius:10,padding:"14px 16px",marginTop:20}}>
            <p style={{fontFamily:sans,fontSize:12,color:DS.copperLight,lineHeight:1.6,margin:0}}>Our model uses <strong style={{color:"#fff"}}>$13,000</strong> per event. AHRQ 2023 data shows the actual average is <strong style={{color:"#fff"}}>$16,300</strong> with 11% YOY growth. Ultra-conservative.</p>
          </div>
        </DkCard>
      </div>
      <div style={{flex:"1 1 280px",minWidth:240}}>
        <DkCard style={{padding:"28px"}}>
          <Lbl style={{color:DS.copper,fontSize:9,marginBottom:16}}>WHAT IF WE PREVENT...?</Lbl>
          <Sld value={prev} onChange={setPrev} min={1} max={15} step={0.5} label="% prevented" valLabel={prev+"%"} color={DS.success}/>
          <div style={{textAlign:"center",marginTop:20}}><div style={{fontFamily:serif,fontSize:44,fontStyle:"italic",color:DS.success,lineHeight:1}}>${(sv/1e6).toFixed(1)}M</div><div style={{fontFamily:mono,fontSize:9,color:DS.lgray,letterSpacing:2,marginTop:6}}>ANNUAL SAVINGS</div></div>
          <div style={{textAlign:"center",marginTop:16}}><div style={{fontFamily:serif,fontSize:32,fontStyle:"italic",color:nt>0?DS.success:DS.red,lineHeight:1}}>{nt>0?"+":""}${(nt/1e6).toFixed(1)}M</div><div style={{fontFamily:mono,fontSize:9,color:DS.lgray,letterSpacing:2,marginTop:6}}>NET AFTER PROGRAM COST</div></div>
          <div style={{marginTop:20,display:"flex",flexDirection:"column",gap:4}}>
            {pcts.map(p=>{const s2=Math.round((p/100)*pan*cost*12);const n2=s2-ac;const w=Math.min(100,Math.max(8,(s2/15e6)*100));return<div key={p} style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontFamily:mono,fontSize:9,color:DS.lgray,width:28,textAlign:"right"}}>{p}%</span><div style={{flex:1,height:16,background:"rgba(255,255,255,.06)",borderRadius:4,overflow:"hidden"}}><div style={{width:w+"%",height:"100%",background:n2>0?DS.success:DS.copper,borderRadius:4,transition:"width .3s"}}/></div><span style={{fontFamily:mono,fontSize:9,color:n2>0?DS.success:DS.lgray,width:50}}>${(s2/1e6).toFixed(1)}M</span></div>})}
          </div>
          <div style={{fontFamily:mono,fontSize:9,color:DS.lgray,marginTop:8,textAlign:"center"}}>RPM benchmark: 50% reduction. We need {pp}%.</div>
        </DkCard>
      </div>
    </div>
  </div>);
}

function FFSCalc(){
  const[vol,setVol]=useState(1000);const[dual,setDual]=useState(50);const[up,setUp]=useState(10);
  const br=90,bc=62,dp=Math.round(vol*(dual/100)),sp=vol-dp;
  const tr=sp*br+dp*(br+bc),mc=Math.round(tr*(up/100)),cs=Math.round(tr*0.45),pk=tr-cs-mc,ma=mc*12;
  const flow=[{l:"Provider bills insurance (CMS allowable)",v:"~$120-160",s:"Billed under provider NPI"},{l:"Provider pays MDX (program fee)",v:up+"% cut",s:"MDX enablement fee"},{l:"Provider keeps their share",v:"~45%",s:"Zero clinical work required"},{l:"MDX pays CADE (service fee)",v:"~45%",s:"Devices, monitoring, staffing"},{l:"MDX keeps their margin",v:fD(mc)+"/mo",s:"Passive recurring revenue"}];
  return(<div style={{maxWidth:740}}>
    <div style={{display:"flex",flexWrap:"wrap",gap:20,marginBottom:24}}>
      <div style={{flex:"1 1 340px",minWidth:280}}>
        <Card style={{padding:"24px 28px"}}><Lbl style={{color:DS.copper,fontSize:9,marginBottom:16}}>ADJUST THE MODEL</Lbl>
          <Sld value={vol} onChange={setVol} min={100} max={5000} step={100} label="FFS Patient Volume" valLabel={vol.toLocaleString()}/>
          <div style={{marginTop:14}}><Sld value={dual} onChange={setDual} min={0} max={100} step={5} label="Dual Enrollment (RPM+CCM)" valLabel={dual+"%"} color={DS.success}/></div>
          <div style={{marginTop:14}}><Sld value={up} onChange={setUp} min={5} max={25} step={1} label="MDX Program Fee" valLabel={up+"%"} color={DS.copperLight}/></div>
        </Card>
      </div>
      <div style={{flex:"1 1 340px",minWidth:280}}>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div style={{background:DS.dark,borderRadius:16,padding:"20px",textAlign:"center"}}><div style={{fontFamily:serif,fontSize:"clamp(36px,5vw,52px)",fontStyle:"italic",color:DS.copper,lineHeight:1}}>{fD(mc)}</div><div style={{fontFamily:mono,fontSize:9,color:DS.lgray,letterSpacing:2,marginTop:6}}>MDX MONTHLY REVENUE</div><div style={{fontFamily:sans,fontSize:11,color:DS.lgray,marginTop:4}}>${(ma/1000).toFixed(0)}K annually</div></div>
          <div style={{display:"flex",gap:12}}>
            <div style={{flex:1,background:DS.cardBg,borderRadius:12,padding:"16px",textAlign:"center",border:"1px solid rgba(0,0,0,.06)"}}><div style={{fontFamily:serif,fontSize:24,fontStyle:"italic",color:DS.dark}}>{fD(pk)}</div><div style={{fontFamily:mono,fontSize:8,color:DS.lgray,letterSpacing:1,marginTop:4}}>PROVIDER KEEPS/MO</div></div>
            <div style={{flex:1,background:DS.cardBg,borderRadius:12,padding:"16px",textAlign:"center",border:"1px solid rgba(0,0,0,.06)"}}><div style={{fontFamily:serif,fontSize:24,fontStyle:"italic",color:DS.dark}}>{fD(cs)}</div><div style={{fontFamily:mono,fontSize:8,color:DS.lgray,letterSpacing:1,marginTop:4}}>CADE FEE/MO</div></div>
          </div>
        </div>
      </div>
    </div>
    <Lbl style={{color:DS.copper,fontSize:9,marginBottom:8}}>HOW THE MONEY FLOWS</Lbl>
    <div style={{display:"flex",flexDirection:"column",gap:2,maxWidth:600}}>
      {flow.map((r,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",background:i%2===0?DS.cardBg:DS.bg,borderRadius:i===0?"12px 12px 0 0":i===4?"0 0 12px 12px":"0"}}><div><span style={{fontFamily:sans,fontSize:12,fontWeight:600,color:DS.dark}}>{r.l}</span><br/><span style={{fontFamily:sans,fontSize:10,color:DS.lgray}}>{r.s}</span></div><span style={{fontFamily:serif,fontSize:18,fontStyle:"italic",color:DS.copper,flexShrink:0,marginLeft:12}}>{r.v}</span></div>)}
    </div>
  </div>);
}

export default function MDXPitch(){
  const[active,setActive]=useState("cover");
  const[activeIdx,setActiveIdx]=useState(0);
  const[hovered,setHovered]=useState(false);
  useEffect(()=>{const obs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){setActive(e.target.id);const idx=NAV.findIndex(n=>n.id===e.target.id);if(idx>=0)setActiveIdx(idx)}})},{threshold:.2});NAV.forEach(n=>{const el=document.getElementById(n.id);if(el)obs.observe(el)});return()=>obs.disconnect()},[]);
  const go=id=>{const el=document.getElementById(id);if(el)el.scrollIntoView({behavior:"smooth"})};
  const goPrev=()=>{if(activeIdx>0)go(NAV[activeIdx-1].id)};
  const goNext=()=>{if(activeIdx<NAV.length-1)go(NAV[activeIdx+1].id)};
  const atTop=activeIdx===0,atBottom=activeIdx===NAV.length-1;
  const currentLabel=(NAV[activeIdx]||{}).l||"";
  const Chev=({up,disabled,onClick})=>(<button onClick={onClick} style={{background:"none",border:"none",cursor:disabled?"default":"pointer",padding:"8px 12px",opacity:disabled?0.15:0.5,transition:"opacity .3s",display:"flex",alignItems:"center",justifyContent:"center"}} onMouseEnter={e=>{if(!disabled)e.currentTarget.style.opacity="1"}} onMouseLeave={e=>{if(!disabled)e.currentTarget.style.opacity=".5"}}><svg width="14" height="8" viewBox="0 0 14 8" fill="none" style={{transform:up?"rotate(180deg)":"none"}}><path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button>);

  const spendData=[{l:"Circulatory (HTN, Heart Attack)",v:234,h:true},{l:"Prevention & Basic Care",v:207,h:false},{l:"Musculoskeletal",v:170,h:false},{l:"Respiratory (COPD, Asthma)",v:144,h:true},{l:"Endocrine (Diabetes)",v:126,h:true},{l:"Nervous System",v:120,h:false},{l:"Cancers",v:116,h:false}];
  const conditions=[{name:"Hypertension",roi:"3:1 ROI",stat:"74%",sl:"achieved BP control",src:"AHA / Geisinger 2024",d:"Uncontrolled blood pressure drives stroke, kidney disease, and cardiac events."},{name:"Diabetes",roi:"2:1 ROI",stat:"59%",sl:"fewer hospitalizations",src:"U of Michigan 2026",d:"Glucose monitoring and proactive coaching reduce hospitalizations and ER utilization."},{name:"COPD",roi:"2:1 ROI",stat:"50%",sl:"readmission reduction",src:"Medical Economics 2024",d:"Remote monitoring catches deterioration early -- before it becomes a $30K hospitalization."}];
  const steps=[{n:"01",t:"Identify",d:"We analyze your claims data to identify the 5,000 highest-risk members across hypertension, diabetes, and COPD."},{n:"02",t:"Enroll",d:"Devices ship directly to members' homes. Setup, education, and verbal consent handled by phone. No WiFi. No app."},{n:"03",t:"Monitor",d:"Licensed clinical staff review readings 24/7. Escalation protocols trigger provider alerts before emergencies. No AI calls."},{n:"04",t:"Report",d:"Monthly dashboards show utilization changes, engagement rates, and documented savings against baseline."}];
  const tiers=[{label:"HIT TARGET ROI",head:"We keep the full $50/member fee",d:"2:1 diabetes, 3:1 hypertension. You get the savings. We get paid in full.",c:DS.success},{label:"EXCEED TARGET ROI",head:"Full fee + 10% of excess savings",d:"We share the upside. MDX keeps 90% of every dollar saved above target.",c:DS.copper},{label:"FALL BELOW TARGET ROI",head:"We pay back $5 per member",d:"We return $25,000 to MDX. Our downside is real.",c:DS.red}];
  const diffs=[{t:"Zero-Touch Enrollment",d:"We handle all member outreach, consent, device fulfillment, and setup. Your team does nothing."},{t:"Licensed Clinical Staff",d:"NPs, RNs, MAs review readings. Human judgment closes the gap between a bad reading and a bad outcome."},{t:"No AI Calling. Ever.",d:"Every patient interaction is a real person. Some RPM companies automate with AI. We never will."},{t:"Local Hawaii Staff",d:"Dedicated clinical team on the ground. Korean-speaking clinicians. Additional native languages in progress."},{t:"Risk-Shared Accountability",d:"The only vendor proposing to put our fee at risk. Incentives structurally aligned with yours."},{t:"FDA-Approved, CMS Compliant",d:"Every device FDA approved. DME and CGM licensing held directly. Ships within 48 hours."}];
  const timeline=[{tag:"WEEK 1-2",t:"Data Access + Population Analysis",d:"MDX provides claims data. CADE identifies 5,000 highest-risk members."},{tag:"WEEK 3-4",t:"Contracting + Enrollment Plan",d:"Risk-share finalized. Baseline documented. FFS provider outreach begins."},{tag:"WEEK 5-6",t:"Member Outreach Begins",d:"CADE clinical team calls and enrolls. Devices ship within 48 hours."},{tag:"MONTH 2",t:"Full Monitoring Active",d:"First cohort enrolled. Escalation protocols live. First report delivered."},{tag:"MONTH 6",t:"Interim ROI Review",d:"Halfway review against baseline. Savings documented. Risk-share previewed."},{tag:"MONTH 12",t:"Annual Settlement + Renewal",d:"Full reconciliation. Risk-share applied. Year two terms discussed."}];
  const team=[{name:"Dylan",title:"Director of Sales",items:["Leads commercial relationship and program structure","Oversees rollout and risk-share terms"]},{name:"Colin Smith",title:"Hawaii Account Executive",items:["Day-to-day MDX point of contact","Manages enrollment coordination and reporting","Leads monthly performance reviews"]}];

  return(
    <div style={{fontFamily:sans,background:DS.bg,color:DS.dark,height:"100vh",overflowY:"auto",position:"relative"}}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=Montserrat:wght@400;500;600;700&family=Roboto+Mono:wght@400&display=swap" rel="stylesheet"/>
      <div style={{position:"fixed",top:"-20%",right:"-15%",width:600,height:600,borderRadius:"50%",background:"rgba(199,143,86,.06)",filter:"blur(90px)",pointerEvents:"none",zIndex:0}}/>

      {/* Nav */}
      <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} style={{position:"fixed",bottom:28,left:"50%",transform:"translateX(-50%)",zIndex:100,display:"flex",alignItems:"center",background:"rgba(255,255,240,.85)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderRadius:40,border:"1px solid rgba(0,0,0,.06)",boxShadow:"0 2px 20px rgba(0,0,0,.06)",overflow:"hidden",transition:"all .4s ease"}}>
        <Chev up disabled={atTop} onClick={goPrev}/>
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"6px 4px",minWidth:hovered?160:48,transition:"min-width .4s ease",overflow:"hidden",justifyContent:"center"}}>
          <span style={{fontFamily:mono,fontSize:11,color:DS.copper,letterSpacing:1,flexShrink:0}}>{String(activeIdx).padStart(2,"0")}</span>
          <span style={{fontFamily:mono,fontSize:9,color:DS.lgray,letterSpacing:2,textTransform:"uppercase",whiteSpace:"nowrap",maxWidth:hovered?140:0,opacity:hovered?1:0,transition:"all .4s ease"}}>{currentLabel}</span>
          <span style={{fontFamily:mono,fontSize:11,color:"rgba(0,0,0,.2)",flexShrink:0,opacity:hovered?1:0,transition:"opacity .3s"}}>/ {String(NAV.length-1).padStart(2,"0")}</span>
        </div>
        <Chev disabled={atBottom} onClick={goNext}/>
      </div>

      {/* 00 COVER */}
      <section id="cover" style={{...sec,textAlign:"center",alignItems:"center"}}>
        <R delay={.05}><div style={{display:"flex",alignItems:"center",gap:24,justifyContent:"center",marginBottom:12}}><img src="https://imagedelivery.net/qJvpJU9hpeX3lEcmqZfcwg/ea71bdc8-b2c0-4c20-b8a2-e702a7164900/public" alt="CADE" style={{height:40,objectFit:"contain"}}/><span style={{fontFamily:mono,fontSize:11,color:DS.lgray,letterSpacing:2}}>+</span><img src="https://imagedelivery.net/qJvpJU9hpeX3lEcmqZfcwg/b76e915a-61f7-4ab5-71f1-6405e911c800/public" alt="MDX" style={{height:40,objectFit:"contain"}}/></div></R>
        <R delay={.1}><Lbl style={{fontSize:10,letterSpacing:5}}>CONNECTED CARE</Lbl></R>
        <R delay={.2}><h1 style={{fontFamily:serif,fontSize:"clamp(36px,5.5vw,64px)",fontStyle:"italic",color:DS.dark,lineHeight:1.05,margin:"16px 0 8px"}}>Measured. Managed.<br/><span style={{color:DS.copper}}>Shared risk.</span></h1></R>
        <R delay={.3}><p style={{fontFamily:sans,fontSize:16,color:DS.gray}}>A Value-Based Care Proposal</p></R>
        <R delay={.4}><Divider/></R>
        <R delay={.5}><div><Lbl style={{color:DS.lgray,fontSize:9,marginBottom:8}}>PREPARED FOR</Lbl><img src="https://imagedelivery.net/qJvpJU9hpeX3lEcmqZfcwg/b76e915a-61f7-4ab5-71f1-6405e911c800/public" alt="MDX Hawaii" style={{height:48,objectFit:"contain",marginBottom:8}}/><div style={{fontFamily:sans,fontSize:13,color:DS.lgray,marginTop:4}}>85,000 Members - Insurance Payor - Hawaii</div><div style={{display:"flex",gap:8,justifyContent:"center",marginTop:12,flexWrap:"wrap"}}><Pill color={DS.dark}>Value-Based Risk Share</Pill><Pill color={DS.dark}>Fee-for-Service</Pill><Pill color={DS.copper}>20+ Chronic Conditions</Pill></div></div></R>
        <div style={{position:"absolute",bottom:32}}><Lbl style={{fontSize:9,color:DS.lgray}}>CONFIDENTIAL - APRIL 2026</Lbl></div>
      </section>

      {/* 01 WHY */}
      <section id="why" style={{...sec,background:G}}>
        <R><Num n="01" dark/></R>
        <R delay={.1}><Lbl style={{color:DS.lgray,marginTop:16}}>THE PROBLEM</Lbl></R>
        <R delay={.15}><h2 style={{fontFamily:serif,fontSize:"clamp(28px,4.5vw,52px)",fontStyle:"italic",color:DS.white,lineHeight:1.1,margin:"12px 0 28px",maxWidth:700}}>Your highest-cost patients are the least <span style={{color:DS.copper}}>monitored</span></h2></R>
        <R delay={.25}><p style={{fontFamily:sans,fontSize:15,color:DS.lgray,lineHeight:1.8,maxWidth:640,marginBottom:28}}>Across your 85,000 member panel, a small population of chronically ill patients drives an outsized share of total claims spend. They cycle through ERs and hospitalizations not because their conditions are unmanageable -- but because nothing monitors them between visits.</p></R>
        <R delay={.35}><Lbl style={{color:DS.copper,fontSize:9,marginBottom:14}}>U.S. HEALTH SPENDING BY DISEASE CATEGORY</Lbl>
          <div style={{maxWidth:600}}>{spendData.map((d,i)=>{const w=Math.round((d.v/234)*100);return<div key={i} style={{display:"flex",alignItems:"center",gap:12,marginBottom:6}}><span style={{fontFamily:sans,fontSize:10,color:d.h?DS.copperLight:DS.lgray,width:200,textAlign:"right",flexShrink:0}}>{d.l}</span><div style={{flex:1,height:20,background:"rgba(255,255,255,.06)",borderRadius:4,overflow:"hidden"}}><div style={{width:w+"%",height:"100%",background:d.h?DS.copper:"rgba(255,255,255,.12)",borderRadius:4}}/></div><span style={{fontFamily:mono,fontSize:10,color:d.h?DS.copperLight:DS.lgray,width:50}}>${d.v}B</span></div>})}<div style={{fontFamily:sans,fontSize:11,color:DS.lgray,marginTop:12}}>The three conditions we monitor = <strong style={{color:DS.copperLight}}>$504B in annual spending</strong>. Source: Kaiser Family Foundation.</div></div>
        </R>
        <R delay={.5}><Glass style={{padding:"20px 28px",borderLeft:"3px solid "+DS.copper,marginTop:24,maxWidth:660,background:"rgba(255,255,255,.04)"}}><p style={{fontFamily:serif,fontSize:18,fontStyle:"italic",color:DS.white,lineHeight:1.5,margin:0}}>"5% of patients account for 50% of healthcare costs. Those 5% are exactly who we built this program for."</p></Glass></R>
      </section>

      {/* 02 TARGET */}
      <section id="target" style={secT}>
        <R><Num n="02"/></R>
        <R delay={.1}><Lbl style={{marginTop:16}}>TARGET POPULATION</Lbl></R>
        <R delay={.15}><h2 style={{fontFamily:serif,fontSize:"clamp(28px,4.5vw,48px)",fontStyle:"italic",color:DS.dark,lineHeight:1.1,margin:"12px 0 24px",maxWidth:700}}>5,000 of your <span style={{color:DS.copper}}>most expensive</span> members</h2></R>
        <R delay={.2}><p style={{fontFamily:sans,fontSize:14,color:DS.gray,lineHeight:1.8,maxWidth:640,marginBottom:24}}>Identified by claims data, risk scores, and utilization history. Three target conditions, three evidence-backed outcomes.</p></R>
        <div style={{display:"flex",flexWrap:"wrap",gap:14,maxWidth:740}}>{conditions.map((c,i)=><R key={i} delay={.2+i*.1} style={{flex:"1 1 220px",minWidth:200}}><Card accent={DS.copper} style={{height:"100%"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}><h3 style={{fontFamily:serif,fontSize:20,fontStyle:"italic",color:DS.dark,margin:0}}>{c.name}</h3><Pill color={DS.success}>{c.roi}</Pill></div><div style={{fontFamily:serif,fontSize:40,fontStyle:"italic",color:DS.copper,lineHeight:1}}>{c.stat}</div><div style={{fontFamily:sans,fontSize:12,fontWeight:600,color:DS.dark,marginTop:4}}>{c.sl}</div><div style={{fontFamily:mono,fontSize:8,color:DS.lgray,letterSpacing:1,marginTop:2}}>{c.src}</div><p style={{fontFamily:sans,fontSize:12,color:DS.gray,lineHeight:1.6,marginTop:10}}>{c.d}</p></Card></R>)}</div>
      </section>

      {/* 03 HOW */}
      <section id="how" style={{...sec,background:G}}>
        <R><Num n="03" dark/></R>
        <R delay={.1}><Lbl style={{color:DS.lgray,marginTop:16}}>THE PROCESS</Lbl></R>
        <R delay={.15}><h2 style={{fontFamily:serif,fontSize:"clamp(28px,4.5vw,48px)",fontStyle:"italic",color:DS.white,lineHeight:1.1,margin:"12px 0 28px",maxWidth:700}}>Continuous care,<br/>zero <span style={{color:DS.copper}}>gaps</span></h2></R>
        <R delay={.2}><p style={{fontFamily:sans,fontSize:14,color:DS.lgray,lineHeight:1.8,maxWidth:640,marginBottom:28}}>CADE deploys remote monitoring devices directly to enrolled members. Our clinical team watches the data so nothing falls through the cracks.</p></R>
        <div style={{display:"flex",flexWrap:"wrap",gap:16,maxWidth:740}}>{steps.map((s,i)=><R key={i} delay={.2+i*.1} style={{flex:"1 1 320px",minWidth:260}}><DkCard accent={DS.copper}><span style={{fontFamily:serif,fontSize:28,fontStyle:"italic",color:DS.copper}}>{s.n}</span><h3 style={{fontFamily:serif,fontSize:18,fontStyle:"italic",color:DS.white,margin:"8px 0 6px"}}>{s.t}</h3><p style={{fontFamily:sans,fontSize:12,color:DS.lgray,lineHeight:1.6,margin:0}}>{s.d}</p></DkCard></R>)}</div>
      </section>

      {/* 04 PRICING + RISK */}
      <section id="pricing" style={{...secT,background:DS.copperBg}}>
        <R><Num n="04"/></R>
        <R delay={.1}><Lbl style={{marginTop:16}}>PRICING + RISK SHARE</Lbl></R>
        <R delay={.15}><h2 style={{fontFamily:serif,fontSize:"clamp(28px,4.5vw,48px)",fontStyle:"italic",color:DS.dark,lineHeight:1.1,margin:"12px 0 24px",maxWidth:700}}>Simple. Flat.<br/><span style={{color:DS.copper}}>Fully aligned.</span></h2></R>
        <R delay={.2}><p style={{fontFamily:sans,fontSize:14,color:DS.gray,lineHeight:1.8,maxWidth:640,marginBottom:24}}>One fee. Everything included. And our fee is tied directly to your savings.</p></R>
        <div style={{display:"flex",flexWrap:"wrap",gap:20,maxWidth:740}}>
          <R delay={.3} style={{flex:"1 1 280px",minWidth:240}}><div style={{textAlign:"center",marginBottom:20}}><div style={{fontFamily:serif,fontSize:"clamp(64px,9vw,96px)",fontStyle:"italic",color:DS.dark,lineHeight:1}}>$50</div><Lbl style={{color:DS.copper,marginTop:8}}>PER MEMBER / MONTH / ALL-IN</Lbl></div></R>
          <R delay={.4} style={{flex:"1 1 380px",minWidth:300}}><Lbl style={{color:DS.copper,fontSize:9,marginBottom:12}}>THREE OUTCOMES. THREE TIERS.</Lbl><div style={{display:"flex",flexDirection:"column",gap:10}}>{tiers.map((t,i)=><Glass key={i} style={{padding:"16px 20px",borderLeft:"3px solid "+t.c}}><Lbl style={{color:t.c,fontSize:8,marginBottom:4}}>{t.label}</Lbl><h3 style={{fontFamily:serif,fontSize:16,fontStyle:"italic",color:DS.dark,margin:"0 0 4px"}}>{t.head}</h3><p style={{fontFamily:sans,fontSize:11,color:DS.gray,lineHeight:1.5,margin:0}}>{t.d}</p></Glass>)}</div></R>
        </div>
      </section>

      {/* 05 SAVINGS */}
      <section id="savings" style={secT}>
        <R><Num n="05"/></R>
        <R delay={.1}><Lbl style={{marginTop:16}}>SAVINGS CALCULATOR</Lbl></R>
        <R delay={.15}><h2 style={{fontFamily:serif,fontSize:"clamp(28px,4.5vw,48px)",fontStyle:"italic",color:DS.dark,lineHeight:1.1,margin:"12px 0 24px",maxWidth:700}}>Model the <span style={{color:DS.copper}}>savings</span></h2></R>
        <R delay={.2}><p style={{fontFamily:sans,fontSize:14,color:DS.gray,lineHeight:1.8,maxWidth:640,marginBottom:28}}>Adjust patient volume and ROI targets per condition. Projections update in real time.</p></R>
        <SavingsCalc/>
      </section>

      {/* 06 BREAK EVEN */}
      <section id="breakeven" style={{...secT,background:G}}>
        <R><Num n="06" dark/></R>
        <R delay={.1}><Lbl style={{color:DS.lgray,marginTop:16}}>BREAK-EVEN ANALYSIS</Lbl></R>
        <R delay={.15}><h2 style={{fontFamily:serif,fontSize:"clamp(28px,4.5vw,48px)",fontStyle:"italic",color:DS.white,lineHeight:1.1,margin:"12px 0 28px",maxWidth:700}}>The minimum bar to<br/><span style={{color:DS.copper}}>break even</span></h2></R>
        <R delay={.2}><p style={{fontFamily:sans,fontSize:14,color:DS.lgray,lineHeight:1.8,maxWidth:640,marginBottom:28}}>MDX pays $250K/month for 5,000 members. To justify every dollar through avoided inpatient stays alone -- here is how low the bar is.</p></R>
        <BreakEvenCalc/>
      </section>

      {/* 07 WHY CADE */}
      <section id="whycade" style={secT}>
        <R><Num n="07"/></R>
        <R delay={.1}><Lbl style={{marginTop:16}}>WHY CADE</Lbl></R>
        <R delay={.15}><h2 style={{fontFamily:serif,fontSize:"clamp(28px,4.5vw,48px)",fontStyle:"italic",color:DS.dark,lineHeight:1.1,margin:"12px 0 24px",maxWidth:700}}>Remote monitoring is crowded.<br/>Here is what <span style={{color:DS.copper}}>separates us.</span></h2></R>
        <div style={{display:"flex",flexWrap:"wrap",gap:16,maxWidth:700,marginBottom:24}}>{[{n:"30K+",l:"Live patients"},{n:"20+",l:"Conditions"},{n:"12yr",l:"Experience"},{n:"0",l:"Recoupments"}].map((s,i)=><R key={i} delay={.2+i*.08} style={{flex:"1 1 140px",minWidth:120,textAlign:"center"}}><div style={{fontFamily:serif,fontSize:"clamp(28px,4vw,44px)",fontStyle:"italic",color:DS.copper,lineHeight:1}}>{s.n}</div><div style={{fontFamily:mono,fontSize:9,letterSpacing:2,color:DS.lgray,textTransform:"uppercase",marginTop:6}}>{s.l}</div></R>)}</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:12,maxWidth:740}}>{diffs.map((d,i)=><R key={i} delay={.3+i*.06} style={{flex:"1 1 340px",minWidth:280}}><Card accent={DS.copper} style={{height:"100%"}}><h3 style={{fontFamily:serif,fontSize:16,fontStyle:"italic",color:DS.dark,margin:"0 0 6px"}}>{d.t}</h3><p style={{fontFamily:sans,fontSize:12,color:DS.gray,lineHeight:1.6,margin:0}}>{d.d}</p></Card></R>)}</div>
        <R delay={.6}><Lbl style={{color:DS.copper,fontSize:9,marginTop:28,marginBottom:12}}>YOUR TEAM</Lbl><div style={{display:"flex",flexWrap:"wrap",gap:12,maxWidth:740}}>{team.map((p,i)=><Card key={i} style={{flex:"1 1 320px",minWidth:260}}><div style={{display:"flex",gap:16,alignItems:"center",marginBottom:12}}><div style={{width:48,height:48,borderRadius:"50%",background:DS.copperBg,border:"2px solid "+DS.copper,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontFamily:serif,fontSize:20,fontStyle:"italic",color:DS.copper}}>{p.name[0]}</span></div><div><div style={{fontFamily:serif,fontSize:18,fontStyle:"italic",color:DS.dark}}>{p.name}</div><div style={{fontFamily:sans,fontSize:11,color:DS.lgray}}>{p.title}</div></div></div>{p.items.map((it,j)=><div key={j} style={{display:"flex",gap:8,marginBottom:4}}><span style={{color:DS.copper,flexShrink:0}}>--</span><span style={{fontFamily:sans,fontSize:12,color:DS.gray}}>{it}</span></div>)}</Card>)}</div></R>
      </section>

      {/* 08 FFS */}
      <section id="ffs" style={secT}>
        <R><Num n="08"/></R>
        <R delay={.1}><Lbl style={{marginTop:16}}>FEE-FOR-SERVICE MODEL</Lbl></R>
        <R delay={.15}><h2 style={{fontFamily:serif,fontSize:"clamp(28px,4.5vw,48px)",fontStyle:"italic",color:DS.dark,lineHeight:1.1,margin:"12px 0 24px",maxWidth:700}}>A second path:<br/><span style={{color:DS.copper}}>passive revenue</span></h2></R>
        <R delay={.2}><p style={{fontFamily:sans,fontSize:14,color:DS.gray,lineHeight:1.8,maxWidth:640,marginBottom:28}}>MDX introduces Connected Care to its provider network. Providers bill. MDX earns a cut off the top. CADE handles the rest.</p></R>
        <FFSCalc/>
      </section>

      {/* 09 ROLLOUT */}
      <section id="rollout" style={{...secT,background:DS.copperBg}}>
        <R><Num n="09"/></R>
        <R delay={.1}><Lbl style={{marginTop:16}}>ROLLOUT PLAN</Lbl></R>
        <R delay={.15}><h2 style={{fontFamily:serif,fontSize:"clamp(28px,4.5vw,48px)",fontStyle:"italic",color:DS.dark,lineHeight:1.1,margin:"12px 0 24px",maxWidth:700}}>From agreement to<br/><span style={{color:DS.copper}}>active monitoring</span></h2></R>
        <div style={{display:"flex",flexDirection:"column",gap:10,maxWidth:660}}>{timeline.map((s,i)=><R key={i} delay={.15+i*.06}><div style={{display:"flex",gap:16,alignItems:"flex-start"}}><Pill color={i>=3?DS.copper:DS.dark}>{s.tag}</Pill><div><h3 style={{fontFamily:serif,fontSize:16,fontStyle:"italic",color:DS.dark,margin:"0 0 4px"}}>{s.t}</h3><p style={{fontFamily:sans,fontSize:12,color:DS.gray,lineHeight:1.6,margin:0}}>{s.d}</p></div></div></R>)}</div>
      </section>

      {/* 10 CLOSE */}
      <section id="close" style={{...sec,background:G,textAlign:"center",alignItems:"center"}}>
        <R><h2 style={{fontFamily:serif,fontSize:"clamp(36px,6vw,64px)",fontStyle:"italic",color:DS.white,lineHeight:1.05,margin:"0 0 16px"}}>Let's put 5,000 members<br/>on a better <span style={{color:DS.copper}}>path</span></h2></R>
        <R delay={.2}><p style={{fontFamily:sans,fontSize:15,color:DS.lgray,maxWidth:440,lineHeight:1.7}}>We are ready to run the numbers against your actual claims data and build a tailored baseline. The risk is shared from day one.</p></R>
        <R delay={.3}><Divider/></R>
        <R delay={.4}><img src="https://imagedelivery.net/qJvpJU9hpeX3lEcmqZfcwg/ea71bdc8-b2c0-4c20-b8a2-e702a7164900/public" alt="CADE" style={{height:44,objectFit:"contain",marginBottom:8,filter:"brightness(0) invert(1)"}}/></R>
        <R delay={.45}><div style={{fontFamily:sans,fontSize:12,color:DS.lgray}}>Value-Based - Risk-Shared - Results-Driven</div></R>
        <R delay={.55}><div style={{marginTop:32}}><Lbl style={{color:DS.lgray,fontSize:9}}>CONFIDENTIAL - APRIL 2026</Lbl></div></R>
      </section>
    </div>
  );
}
