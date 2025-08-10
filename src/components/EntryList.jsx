import EntryCard from './EntryCard.jsx';
export default function EntryList({entries}){
  if(entries.length===0) return <p className="muted center">No entries yet. Add your first memory.</p>;
  return <div className="entry-list">{entries.map(e=><EntryCard key={e.id} entry={e}/>)}</div>;
}
