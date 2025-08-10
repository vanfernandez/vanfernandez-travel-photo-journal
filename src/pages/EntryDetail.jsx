import { useNavigate, useParams } from 'react-router-dom';
import { loadEntries, saveEntries } from '../lib/storage.js';

export default function EntryDetail(){
  const {id}=useParams(); const nav=useNavigate();
  const entries=loadEntries(); const entry=entries.find(e=>e.id===id);
  if(!entry) return (<div className="shell"><p className="muted">Entry not found.</p><button className="secondary-btn" onClick={()=>nav('/')}>Back</button></div>);

  const date=new Date(entry.dateISO).toLocaleDateString(undefined,{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  function del(){ saveEntries(entries.filter(e=>e.id!==id)); nav('/'); }

  return (
    <div className="shell">
      <button className="back-link" onClick={()=>nav('/')}>← Journal</button>
      <div className="detail card">
        <div className="detail-head"><div className="pill">{entry.mood}</div><div className="detail-date">{date}</div></div>
        <h2 className="detail-title">{entry.caption}</h2>
        {entry.location && <div className="detail-sub">{entry.location}</div>}
        <div className="detail-media"><img src={entry.image} alt={entry.caption}/></div>
        <div className="detail-actions"><button className="danger-btn" onClick={del}>Delete</button></div>
      </div>
    </div>
  );
}
