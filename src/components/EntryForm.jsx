import { useRef, useState } from 'react';
const moods=['Happy','Calm','Excited','Tired','Neutral'];

export default function EntryForm({onAdd}){
  const [caption,setCaption]=useState('');
  const [location,setLocation]=useState('');
  const [mood,setMood]=useState('Neutral');
  const [imageData,setImageData]=useState(null);
  const fileRef=useRef();

  function handleFile(e){
    const f=e.target.files?.[0]; if(!f) return;
    const r=new FileReader(); r.onload=()=>setImageData(r.result); r.readAsDataURL(f);
  }
  function submit(e){
    e.preventDefault(); if(!imageData||!caption.trim()) return;
    const now=new Date();
    onAdd({
      id:Date.now().toString(),
      caption:caption.trim(),
      location:location.trim(),
      mood,image:imageData,
      dateISO:now.toISOString(),
      dateKey:now.toISOString().slice(0,10)
    });
    setCaption(''); setLocation(''); setMood('Neutral'); setImageData(null);
    if(fileRef.current) fileRef.current.value='';
  }

  return (
    <form className="entry-form card" onSubmit={submit}>
      <div className="form-row">
        <input type="file" accept="image/*" onChange={handleFile} ref={fileRef}/>
        {imageData && <img src={imageData} alt="" className="preview" />}
      </div>
      <input className="input" type="text" placeholder="Write a caption" value={caption} onChange={e=>setCaption(e.target.value)}/>
      <input className="input" type="text" placeholder="Add a location" value={location} onChange={e=>setLocation(e.target.value)}/>
      <div className="mood-row">
        {moods.map(m=>(
          <button type="button" key={m} onClick={()=>setMood(m)} className={`chip ${mood===m?'chip-active':''}`}>{m}</button>
        ))}
      </div>
      <button className="primary-btn" type="submit">Add entry</button>
    </form>
  );
}
