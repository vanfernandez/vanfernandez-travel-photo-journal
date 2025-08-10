// Docs: open-meteo.com
const ENDPOINT = 'https://api.open-meteo.com/v1/forecast';

export async function getCurrentWeather(lat, lon) {
  const url = `${ENDPOINT}?latitude=${lat}&longitude=${lon}&current_weather=true`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Weather fetch failed');
  const data = await res.json();
  return data.current_weather; // { temperature, windspeed, winddirection, weathercode, time }
}

// Map Open-Meteo WMO codes to a simple icon + label
export function codeToIcon(code) {
  // very small set for the demo
  if ([0].includes(code)) return { emoji: '☀️', label: 'Clear' };
  if ([1, 2, 3].includes(code)) return { emoji: '⛅️', label: 'Clouds' };
  if ([45, 48].includes(code)) return { emoji: '🌫️', label: 'Fog' };
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return { emoji: '🌧️', label: 'Rain' };
  if ([71, 73, 75, 85, 86].includes(code)) return { emoji: '❄️', label: 'Snow' };
  if ([95, 96, 99].includes(code)) return { emoji: '⛈️', label: 'Storm' };
  return { emoji: '🌤️', label: 'Weather' };
}
