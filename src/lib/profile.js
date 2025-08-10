// profile.js
const KEY = 'tpj_profile_v1';

export function loadProfile() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : { name: 'Van', avatar: null };
  } catch {
    return { name: 'Van', avatar: null };
  }
}

export function saveProfile(profile) {
  try {
    localStorage.setItem(KEY, JSON.stringify(profile));
    return true;
  } catch (e) {
    console.warn('saveProfile failed', e);
    return false;
  }
}
