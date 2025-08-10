const KEY = 'tpj_entries_v1';
export function loadEntries() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; }
}
export function saveEntries(entries) {
  localStorage.setItem(KEY, JSON.stringify(entries));
}
