const days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
export default function WeekStrip(){
  const idx=new Date().getDay();
  return (
    <div className="week-strip card">
      {days.map((d,i)=>(
        <button key={d} className={`chip ${i===idx?'chip-active':''}`} type="button">{d}</button>
      ))}
    </div>
  );
}
