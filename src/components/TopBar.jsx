import WeatherBadge from './WeatherBadge.jsx';

export default function TopBar({ name, avatar, onEditProfile }) {
  const date = new Date().toLocaleDateString(undefined, {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
  });

  return (
    <header className="topbar card">
      <div className="topbar-row">
        <div>
          <div className="kicker" style={{ display:'flex', alignItems:'center', gap:8 }}>
            <WeatherBadge />
            <span>{date}</span>
          </div>
          <h1 className="greeting">Good afternoon, {name}</h1>
        </div>

        <button
          type="button"
          className="avatar-btn"
          onClick={onEditProfile}
          aria-label="Edit profile"
        >
          {avatar
            ? <img src={avatar} alt="" className="avatar-img" />
            : <div className="avatar" aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}
