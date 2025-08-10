function calcStreak(entries){
  const set=new Set(entries.map(e=>e.dateKey)); let s=0; let d=new Date();
  for(;;){ const k=d.toISOString().slice(0,10); if(set.has(k)){ s+=1; d.setDate(d.getDate()-1);} else break; }
  return s;
}
function Stat({label,value}){ return(<div className="stat"><div className="stat-value">{value}</div><div className="stat-label">{label}</div></div>);}
export default function StatsRow({entries}){
  const days=new Set(entries.map(e=>e.dateKey)).size;
  const best=calcStreak(entries);
  return (<div className="stats-row card"><Stat label="Best streak" value={best}/><Stat label="Entries" value={entries.length}/><Stat label="Days" value={days}/></div>);
}
