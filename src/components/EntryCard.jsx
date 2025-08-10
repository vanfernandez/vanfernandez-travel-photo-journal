import { Link } from 'react-router-dom';
export default function EntryCard({entry}){
  const date=new Date(entry.dateISO).toLocaleDateString(undefined,{weekday:'short',day:'numeric',month:'short',year:'numeric'});
  return (
    <Link to={`/entry/${entry.id}`} className="entry-card card">
      <div className="entry-head"><div className="pill">{entry.mood}</div><div className="entry-date">{date}</div></div>
      <div className="entry-media"><img src={entry.image} alt={entry.caption}/></div>
      <div className="entry-body"><h3 className="entry-title">{entry.caption}</h3>{entry.location && <div className="entry-sub">{entry.location}</div>}</div>
    </Link>
  );
}
