import { useEffect, useRef, useState } from 'react';

export default function ProfileDialog({ open = false, onClose = () => {}, profile = {}, onSave = () => {} }) {
  const [name, setName] = useState(profile?.name || 'Van');
  const [avatar, setAvatar] = useState(profile?.avatar || null);
  const fileRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    setName(profile?.name || 'Van');
    setAvatar(profile?.avatar || null);

    function onEsc(e) { if (e.key === 'Escape') onClose(); }
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [open, profile, onClose]);

  function handleFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setAvatar(r.result);
    r.readAsDataURL(f);
  }

  function handleSaveClick() {
    const next = { name: (name || '').trim() || 'Van', avatar: avatar || null };
    onSave(next);      // parent will persist + update UI
    onClose();         // close the dialog
  }

  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal card" onClick={(e) => e.stopPropagation()}>
        <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Edit profile</h3>

        <div className="profile-row">
          {avatar
            ? <img src={avatar} alt="" className="avatar-lg" />
            : <div className="avatar-lg placeholder" />}
          <div>
            <input type="file" accept="image/*" onChange={handleFile} ref={fileRef} style={{ marginBottom: 8 }} />
            <button type="button" className="secondary-btn" onClick={() => { setAvatar(null); if (fileRef.current) fileRef.current.value = ''; }}>
              Remove photo
            </button>
          </div>
        </div>

        <input
          className="input"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="dialog-actions">
          <button type="button" className="secondary-btn" onClick={onClose}>Cancel</button>
          <button type="button" className="primary-btn" onClick={handleSaveClick}>Save</button>
        </div>
      </div>
    </div>
  );
}
