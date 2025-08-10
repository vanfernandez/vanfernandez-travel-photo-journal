import { useEffect, useState } from 'react';
import { getCurrentWeather, codeToIcon } from '../lib/weather.js';

export default function WeatherBadge() {
  const [state, setState] = useState({ loading: true });

  useEffect(() => {
    let cancelled = false;

    function fromCache() {
      try {
        const raw = localStorage.getItem('tpj_weather_v1');
        if (!raw) return null;
        const obj = JSON.parse(raw);
        // cache for 20 minutes
        if (Date.now() - obj.ts > 20 * 60 * 1000) return null;
        return obj.data;
      } catch { return null; }
    }

    async function load(lat, lon) {
      try {
        const data = await getCurrentWeather(lat, lon);
        if (cancelled) return;
        localStorage.setItem('tpj_weather_v1', JSON.stringify({ ts: Date.now(), data }));
        setState({ loading: false, data });
      } catch (e) {
        if (cancelled) return;
        setState({ loading: false, error: 'Weather unavailable' });
      }
    }

    const cached = fromCache();
    if (cached) { setState({ loading: false, data: cached }); return; }

    if (!navigator.geolocation) {
      setState({ loading: false, error: 'No location' });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => load(pos.coords.latitude, pos.coords.longitude),
      () => setState({ loading: false, error: 'Location denied' }),
      { enableHighAccuracy: false, timeout: 8000 }
    );

    return () => { cancelled = true; };
  }, []);

  if (state.loading) {
    return (
      <div className="weather">
        <div className="weather-icon skeleton" />
        <span className="weather-text">Loading…</span>
      </div>
    );
  }

  if (state.error || !state.data) {
    return (
      <div className="weather">
        <div className="weather-icon" aria-hidden>🌤️</div>
        <span className="weather-text" title={state.error || ''}>—</span>
      </div>
    );
  }

  const { temperature, weathercode } = state.data;
  const { emoji, label } = codeToIcon(weathercode);

  return (
    <div className="weather" title={label}>
      <div className="weather-icon" aria-hidden>{emoji}</div>
      <span className="weather-text">{Math.round(temperature)}°</span>
    </div>
  );
}
