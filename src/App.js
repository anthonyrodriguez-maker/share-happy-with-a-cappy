import { useState, useMemo } from "react";

const STORES = [
  { store_num: "336862", short: "7450 Barrington Rd, Hanover Park", network: "TRG", dm: "Lilia Segura", rm: "Christopher Boyd" },
  { store_num: "340608", short: "782 W Oakton St, Des Plaines", network: "TRG", dm: "Lilia Segura", rm: "Karla Rocha" },
  { store_num: "346510", short: "9629 White Settlement Rd, Ft Worth", network: "GRG", dm: "Sidd Patel", rm: "Ashley Hammons" },
  { store_num: "350093", short: "650 Uptown Blvd, Cedar Hill", network: "GRG", dm: "Sidd Patel", rm: "Evelyn Cervantes" },
  { store_num: "351985", short: "9230 Potranco Rd, SA", network: "OMALA", dm: "Chris Pena", rm: "Andrew Meyer" },
  { store_num: "352495", short: "735 Wilshire Blvd, Burleson", network: "GRG", dm: "Sidd Patel", rm: "Chanel Johnson" },
  { store_num: "353655", short: "121 W Ogden Ave, Westmont", network: "TRG", dm: "Katherine Cruz", rm: "Lilah Ford" },
  { store_num: "355680", short: "7272 Culebra Rd, SA", network: "OMALA", dm: "Bryce Cedio", rm: "Abilene Dominguez" },
  { store_num: "355681", short: "214 W Bandera Rd, Boerne", network: "OMALA", dm: "Tiffany Thompson", rm: "Joshua Stephens" },
  { store_num: "355784", short: "1921 W Algonquin Rd, Rolling Meadows", network: "TRG", dm: "Katherine Cruz", rm: "Matilda (Maty) Guzman" },
  { store_num: "357201", short: "21715 W I-10, SA", network: "OMALA", dm: "Chris Pena", rm: "Juanita (Crystal) Tapia" },
  { store_num: "357649", short: "2250 Clear Creek Rd, Killeen", network: "VRG", dm: "Christy Elliott", rm: "Jennifer Greenwood" },
  { store_num: "357958", short: "1701 Hewitt Dr, Waco", network: "VRG", dm: "Christy Elliott", rm: "Robert Thomas" },
  { store_num: "358035", short: "529 E Knights Way, Harker Hts", network: "VRG", dm: "Christy Elliott", rm: "Florgelyn (Flor) Holstrom" },
  { store_num: "358705", short: "11330 Potranco Rd, SA", network: "OMALA", dm: "Tiffany Thompson", rm: "Eufracio (Foz) Rivera" },
  { store_num: "359496", short: "1516 S Fort Hood St, Killeen", network: "VRG", dm: "Christy Elliott", rm: "Sean Kennedy" },
  { store_num: "359644", short: "12061 FM 2154, College Sta", network: "VRG", dm: "Christy Elliott", rm: "Lydia Robertson" },
  { store_num: "359888", short: "801 Sidney Baker St, Kerrville", network: "VRG", dm: "Bryce Cedio", rm: "Tyree Williams" },
  { store_num: "362644", short: "5170 Lake Ridge Pkwy, Grand Prairie", network: "GRG", dm: "Sidd Patel", rm: "Erica Morante" },
  { store_num: "362967", short: "7451 W Adams Ave, Temple", network: "VRG", dm: "Christy Elliott", rm: "Katherine Trace" },
  { store_num: "363024", short: "2406 E Business 190, Copperas Cove", network: "VRG", dm: "Christy Elliott", rm: "Cadge Clayton" },
  { store_num: "363086", short: "627 Bandera Rd, SA", network: "OMALA", dm: "Chris Pena", rm: "Sophia Alexander" },
  { store_num: "363236", short: "4501 S Collins St, Arlington", network: "GRG", dm: "Sidd Patel", rm: "Karla Garcia" },
  { store_num: "363238", short: "310 S Clark Rd, Duncanville", network: "GRG", dm: "Sidd Patel", rm: "Sandro Castro" },
  { store_num: "363902", short: "14048 Culebra Rd, SA", network: "OMALA", dm: "Tiffany Thompson", rm: "Kyla Rosa" },
];

const WEEKLY_RESULTS = [
  { label: "Week ending 6/13", data: {"336862":120,"340608":91,"346510":37,"350093":1,"351985":13,"352495":3,"353655":18,"355680":11,"355681":5,"355784":78,"357201":10,"357649":7,"357958":6,"358035":8,"358705":37,"359496":12,"359644":1,"359888":17,"362644":9,"362967":7,"363024":14,"363086":12,"363236":7,"363238":1,"363902":3} },
  { label: "Week ending 6/20", data: {"336862":103,"340608":59,"346510":31,"350093":1,"351985":27,"352495":2,"353655":25,"355680":7,"355681":1,"355784":80,"357201":6,"357649":5,"357958":8,"358035":3,"358705":44,"359496":18,"359644":8,"359888":13,"362644":12,"362967":8,"363024":4,"363086":7,"363236":3,"363238":1,"363902":1} },
  { label: "Week ending 6/27", data: {"336862":121,"340608":78,"346510":27,"350093":3,"351985":21,"352495":4,"353655":20,"355680":14,"355681":5,"355784":75,"357201":8,"357649":5,"357958":10,"358035":13,"358705":51,"359496":11,"359644":7,"359888":19,"362644":12,"362967":16,"363024":15,"363086":11,"363236":7,"363238":0,"363902":12} },
  { label: "Week ending 7/4",  data: {"336862":124,"340608":96,"346510":19,"350093":6,"351985":18,"352495":2,"353655":26,"355680":13,"355681":5,"355784":105,"357201":11,"357649":13,"357958":10,"358035":9,"358705":37,"359496":9,"359644":2,"359888":22,"362644":15,"362967":17,"363024":14,"363086":7,"363236":4,"363238":0,"363902":5} },
  { label: "Week ending 7/11", data: {"336862":97,"340608":80,"346510":20,"350093":3,"351985":20,"352495":2,"353655":25,"355680":10,"355681":9,"355784":82,"357201":6,"357649":25,"357958":7,"358035":6,"358705":34,"359496":11,"359644":3,"359888":15,"362644":16,"362967":11,"363024":10,"363086":8,"363236":7,"363238":2,"363902":7} },
  { label: "Week ending 7/18", data: {"336862":123,"340608":122,"346510":23,"350093":6,"351985":26,"352495":3,"353655":25,"355680":15,"355681":5,"355784":73,"357201":6,"357649":10,"357958":4,"358035":14,"358705":43,"359496":14,"359644":9,"359888":12,"362644":12,"362967":12,"363024":8,"363086":15,"363236":4,"363238":8,"363902":8} },
];

const NET_COLORS = { GRG: "#EC762F", VRG: "#2C6FAC", OMALA: "#1D9E75", TRG: "#8B3FA8" };

function computeGoals(weekIdx) {
  const goals = {};
  STORES.forEach(s => {
    const lookback = WEEKLY_RESULTS.slice(Math.max(0, weekIdx - 5), weekIdx);
    const vals = lookback.map(w => w.data[s.store_num]).filter(v => v !== undefined);
    if (!vals.length) { goals[s.store_num] = { avg:0, g5:0, g10:0 }; return; }
    const avg = Math.round(vals.reduce((a,b)=>a+b,0)/vals.length);
    goals[s.store_num] = { avg, g5: Math.round(avg*1.05), g10: Math.round(avg*1.10) };
  });
  return goals;
}

function getStatus(val, g5, g10) {
  if (val === undefined || val === null) return "pending";
  if (g5 === 0 && g10 === 0) return "pending";
  const n = Number(val);
  if (n >= g10) return "gold";
  if (n >= g5)  return "green";
  if (n >= g5 * 0.97) return "close";
  return "miss";
}

const STATUS_META = {
  gold:    { label:"🏆 +10%",  bg:"#FFF9E6", border:"#F4C430", text:"#7A5800" },
  green:   { label:"✅ Goal",  bg:"#E8F8F2", border:"#1D9E75", text:"#0F6E56" },
  close:   { label:"🔶 Close", bg:"#FFF4EC", border:"#EC762F", text:"#7A3200" },
  miss:    { label:"❌ Miss",  bg:"#FFF0F0", border:"#E24B4A", text:"#7A1F1F" },
  pending: { label:"— TBD",   bg:"#F5F5F5", border:"#ddd",    text:"#999"    },
};

const sel = {
  padding:"8px 14px", borderRadius:8, border:"2px solid #E5006D",
  fontSize:13, fontWeight:700, color:"#E5006D", background:"#fff",
  cursor:"pointer", outline:"none", WebkitAppearance:"none", appearance:"none",
  backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23E5006D' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
  backgroundRepeat:"no-repeat", backgroundPosition:"right 10px center", paddingRight:32
};

export default function App() {
  const last = WEEKLY_RESULTS.length - 1;
  const [weekIdx, setWeekIdx]     = useState(last);
  const [posterIdx, setPosterIdx] = useState(last);
  const [view, setView]           = useState("leaderboard");
  const [network, setNetwork]     = useState("ALL");

  const goals  = useMemo(() => computeGoals(weekIdx),  [weekIdx]);
  const pGoals = useMemo(() => computeGoals(posterIdx), [posterIdx]);

  const withStatus = useMemo(() => STORES.map(s => {
    const val    = WEEKLY_RESULTS[weekIdx].data[s.store_num];
    const g      = goals[s.store_num] || {avg:0,g5:0,g10:0};
    const status = getStatus(val, g.g5, g.g10);
    const pct    = (val !== undefined && g.avg) ? Math.round(((val-g.avg)/g.avg)*100) : null;
    return {...s, val, status, pct, ...g};
  }), [weekIdx, goals]);

  const networks = Array.from(new Set(STORES.map(s => s.network)));
  const filtered = network==="ALL" ? withStatus : withStatus.filter(s=>s.network===network);
  const sorted   = [...filtered].sort((a,b)=>{
    const o={gold:0,green:1,close:2,miss:3,pending:4};
    if(o[a.status]!==o[b.status]) return o[a.status]-o[b.status];
    return (Number(b.val)||0)-(Number(a.val)||0);
  });

  const hitting = withStatus.filter(s=>s.status==="gold"||s.status==="green");
  const gold    = withStatus.filter(s=>s.status==="gold");

  const posterStores = useMemo(() => STORES.map(s=>{
    const val=WEEKLY_RESULTS[posterIdx].data[s.store_num];
    const g=pGoals[s.store_num]||{avg:0,g5:0,g10:0};
    return {...s,val,status:getStatus(val,g.g5,g.g10),...g};
  }).filter(s=>s.status==="gold"||s.status==="green")
    .sort((a,b)=>a.status===b.status?(Number(b.val)-Number(a.val)):(a.status==="gold"?-1:1)),
  [posterIdx, pGoals]);

  return (
    <div style={{fontFamily:"Arial,sans-serif",maxWidth:900,margin:"0 auto",paddingBottom:48}}>

      <div style={{background:"linear-gradient(135deg,#E5006D 0%,#003DA5 100%)",padding:"24px 28px 22px",borderRadius:"0 0 16px 16px",marginBottom:24}}>
        <div style={{fontSize:26,fontWeight:900,color:"#fff",lineHeight:1.1}}>🥤 Share Happy with a Cappy</div>
        <div style={{fontSize:13,color:"rgba(255,255,255,0.8)",marginTop:4}}>Weekly Cappy Blast unit leaderboard · {STORES.length} stores · Goals = rolling 5-wk avg +5% / +10%</div>
        <div style={{display:"flex",gap:10,marginTop:18,flexWrap:"wrap"}}>
          {[{label:"Hitting Goal",val:`${hitting.length}/${STORES.length}`,accent:"#fff"},{label:"Gold (+10%)",val:gold.length,accent:"#F4C430"},{label:"On Goal (+5%)",val:hitting.length-gold.length,accent:"#7AE6B0"}].map(p=>(
            <div key={p.label} style={{background:"rgba(0,0,0,0.2)",borderRadius:8,padding:"8px 16px"}}>
              <div style={{fontSize:22,fontWeight:900,color:p.accent}}>{p.val}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.75)"}}>{p.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{display:"flex",gap:8,padding:"0 16px",marginBottom:22}}>
        {[["leaderboard","📊 Leaderboard"],["poster","🎉 Winner Poster"]].map(([v,label])=>(
          <button key={v} onClick={()=>setView(v)} style={{padding:"9px 20px",borderRadius:8,border:"none",cursor:"pointer",fontWeight:700,fontSize:13,background:view===v?"#E5006D":"#f0f0f0",color:view===v?"#fff":"#444"}}>{label}</button>
        ))}
      </div>

      {view==="leaderboard" && (
        <div style={{padding:"0 16px"}}>
          <div style={{display:"flex",gap:12,marginBottom:18,flexWrap:"wrap",alignItems:"center"}}>
            <select value={weekIdx} onChange={e=>setWeekIdx(Number(e.target.value))} style={sel}>
              {WEEKLY_RESULTS.map((w,i)=><option key={i} value={i}>{w.label}</option>)}
            </select>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {["ALL", ...networks].map(n=>(
                <button key={n} onClick={()=>setNetwork(n)} style={{padding:"7px 14px",borderRadius:6,fontWeight:700,fontSize:12,cursor:"pointer",border:`2px solid ${network===n?(NET_COLORS[n]||"#555"):"#ddd"}`,background:network===n?(NET_COLORS[n]||"#555"):"#fff",color:network===n?"#fff":"#555"}}>{n==="ALL"?"All":n}</button>
              ))}
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {sorted.map((s,idx)=>{
              const m=STATUS_META[s.status];
              return (
                <div key={s.store_num} style={{display:"flex",alignItems:"center",gap:10,background:m.bg,border:`1.5px solid ${m.border}`,borderRadius:10,padding:"10px 14px"}}>
                  <div style={{width:28,textAlign:"center",fontSize:13,fontWeight:900,color:"#bbb",flexShrink:0}}>{s.status!=="pending"?`#${idx+1}`:"—"}</div>
                  <div style={{width:10,height:10,borderRadius:"50%",background:NET_COLORS[s.network],flexShrink:0}}/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontWeight:700,fontSize:13,color:"#222",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{s.short}</div>
                    <div style={{fontSize:11,color:"#888",marginTop:1}}>{s.network} · RM {s.rm} · DM {s.dm}</div>
                    <div style={{fontSize:11,color:"#888",marginTop:1}}>5wk avg: {s.avg.toLocaleString()} · Goal: {s.g5.toLocaleString()}–{s.g10.toLocaleString()}</div>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0,minWidth:60}}>
                    <div style={{fontSize:18,fontWeight:900,color:m.text}}>{s.val!==undefined?Number(s.val).toLocaleString():"—"}</div>
                    {s.pct!==null&&<div style={{fontSize:11,fontWeight:700,color:s.pct>=0?"#1D9E75":"#E24B4A"}}>{s.pct>=0?"+":""}{s.pct}% vs avg</div>}
                  </div>
                  <div style={{fontSize:11,fontWeight:700,padding:"3px 8px",borderRadius:5,flexShrink:0,background:m.border+"22",color:m.text}}>{m.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {view==="poster" && (
        <div style={{padding:"0 16px"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20,flexWrap:"wrap"}}>
            <div style={{fontWeight:700,fontSize:13,color:"#444"}}>Generate poster for:</div>
            <select value={posterIdx} onChange={e=>setPosterIdx(Number(e.target.value))} style={sel}>
              {WEEKLY_RESULTS.map((w,i)=><option key={i} value={i}>{w.label}</option>)}
            </select>
          </div>
          <div style={{background:"linear-gradient(160deg,#1a002e 0%,#003DA5 55%,#E5006D 100%)",borderRadius:16,padding:"36px 28px 32px",color:"#fff",boxShadow:"0 8px 32px rgba(0,0,0,0.25)"}}>
            <div style={{textAlign:"center",marginBottom:28}}>
              <div style={{fontSize:44,marginBottom:6}}>🥤</div>
              <div style={{fontSize:11,letterSpacing:4,fontWeight:700,color:"#FF6FB1",textTransform:"uppercase",marginBottom:6}}>Share Happy with a Cappy</div>
              <div style={{fontSize:28,fontWeight:900,lineHeight:1.1}}>{WEEKLY_RESULTS[posterIdx].label} — Champions</div>
              <div style={{fontSize:13,color:"rgba(255,255,255,0.6)",marginTop:6}}>Stores hitting their rolling Cappy Blast unit goals</div>
            </div>
            {posterStores.length===0 ? (
              <div style={{textAlign:"center",color:"rgba(255,255,255,0.4)",padding:"32px 0",fontSize:14}}>No results available for this week yet.</div>
            ):(
              <>
                {posterStores.filter(s=>s.status==="gold").length>0&&(
                  <div style={{marginBottom:20}}>
                    <div style={{fontSize:11,fontWeight:700,letterSpacing:3,color:"#F4C430",textTransform:"uppercase",marginBottom:10}}>🏆 Gold Tier — +10% or better</div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:8}}>
                      {posterStores.filter(s=>s.status==="gold").map(s=>(
                        <div key={s.store_num} style={{background:"rgba(244,196,48,0.15)",border:"1.5px solid #F4C430",borderRadius:10,padding:"12px 14px"}}>
                          <div style={{fontSize:13,fontWeight:800,color:"#F4C430",lineHeight:1.3}}>{s.short}</div>
                          <div style={{fontSize:11,color:"rgba(255,255,255,0.5)",marginTop:2}}>{s.network} · RM {s.rm}</div>
                          <div style={{fontSize:10,color:"rgba(255,255,255,0.4)"}}>DM {s.dm}</div>
                          <div style={{fontSize:22,fontWeight:900,color:"#fff",marginTop:6}}>{Number(s.val).toLocaleString()} <span style={{fontSize:11,color:"#F4C430"}}>units</span></div>
                          <div style={{fontSize:11,color:"#F4C430",fontWeight:700,marginTop:2}}>Goal was {s.g10.toLocaleString()} ✓</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {posterStores.filter(s=>s.status==="green").length>0&&(
                  <div>
                    <div style={{fontSize:11,fontWeight:700,letterSpacing:3,color:"#7AE6B0",textTransform:"uppercase",marginBottom:10}}>✅ Goal Tier — +5% or better</div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(175px,1fr))",gap:8}}>
                      {posterStores.filter(s=>s.status==="green").map(s=>(
                        <div key={s.store_num} style={{background:"rgba(29,158,117,0.15)",border:"1.5px solid #1D9E75",borderRadius:10,padding:"12px 14px"}}>
                          <div style={{fontSize:13,fontWeight:800,color:"#7AE6B0",lineHeight:1.3}}>{s.short}</div>
                          <div style={{fontSize:11,color:"rgba(255,255,255,0.5)",marginTop:2}}>{s.network} · RM {s.rm}</div>
                          <div style={{fontSize:10,color:"rgba(255,255,255,0.4)"}}>DM {s.dm}</div>
                          <div style={{fontSize:20,fontWeight:900,color:"#fff",marginTop:6}}>{Number(s.val).toLocaleString()} <span style={{fontSize:11,color:"#7AE6B0"}}>units</span></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
            <div style={{textAlign:"center",marginTop:28,fontSize:11,color:"rgba(255,255,255,0.3)"}}>Anthony Rodriguez, VP Operations</div>
          </div>
        </div>
      )}
    </div>
  );
}
