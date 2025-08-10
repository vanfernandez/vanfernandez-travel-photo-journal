import { useEffect, useRef, useState } from 'react';
import TopBar from '../components/TopBar.jsx';
import WeekStrip from '../components/WeekStrip.jsx';
import StatsRow from '../components/StatsRow.jsx';
import QuoteCard from '../components/QuoteCard.jsx';
import EntryForm from '../components/EntryForm.jsx';
import EntryList from '../components/EntryList.jsx';
import ProfileDialog from '../components/ProfileDialog.jsx';
import { loadEntries, saveEntries } from '../lib/storage.js';
import { loadProfile, saveProfile } from '../lib/profile.js';

export default function Home() {
  const [entries, setEntries] = useState(() => loadEntries());
  const [showForm, setShowForm] = useState(false);
  const [profile, setProfile] = useState(() => loadProfile() || { name: 'Van', avatar: null });
  const [profileOpen, setProfileOpen] = useState(false);
  const formRef = useRef(null);

  // persist entries only
  useEffect(() => { saveEntries(entries); }, [entries]);

  function addEntry(e) {
    setEntries(prev => [e, ...prev]);
    setShowForm(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleToggleForm() {
    setShowForm(prev => {
      const next = !prev;
      if (!prev) setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
      return next;
    });
  }

  // Save profile safely; fall back to name-only if avatar is too large
  function handleSaveProfile(next) {
    const safe = next ?? { name: 'Van', avatar: null };

    if (!saveProfile(safe)) {
      alert('That photo is too large to store. I saved your name only.');
      const nameOnly = { name: safe.name, avatar: null };
      saveProfile(nameOnly);
      setProfile(nameOnly);
    } else {
      setProfile(safe);
    }

    setProfileOpen(false);
  }

  return (
    <div className="shell">
      <TopBar
        name={profile?.name || 'Van'}
        avatar={profile?.avatar || null}
        onEditProfile={() => setProfileOpen(true)}
      />

      <WeekStrip />
      <StatsRow entries={entries} />
      <QuoteCard />

      <button
        className="cta-large"
        type="button"
        onClick={handleToggleForm}
        aria-expanded={showForm}
        aria-controls="entry-form"
      >
        {showForm ? 'Hide entry form' : 'How are you feeling today?'}
      </button>

      {showForm && (
        <div id="entry-form" ref={formRef}>
          <EntryForm onAdd={addEntry} />
        </div>
      )}

      <h2 className="section-title">Today</h2>
      <EntryList entries={entries} />
      <div style={{ height: '64px' }} />

      <ProfileDialog
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
      />
    </div>
  );
}
