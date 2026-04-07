const MLB_API_BASE = 'https://statsapi.mlb.com/api/v1';

export async function fetchSchedule(date) {
  const dateStr = formatDate(date);
  const url = `${MLB_API_BASE}/schedule?sportId=1&date=${dateStr}&hydrate=linescore`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch schedule: ${res.status}`);
  const data = await res.json();
  return data.dates?.[0]?.games ?? [];
}

export function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function displayDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function groupGamesByState(games) {
  const groups = { Final: [], Live: [], Preview: [] };
  for (const game of games) {
    const state = game.status?.abstractGameState;
    if (state in groups) groups[state].push(game);
  }
  return groups;
}

export function getGameTime(game) {
  const iso = game.gameDate;
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

export function getLogoUrl(abbrev) {
  return `https://a.espncdn.com/i/teamlogos/mlb/500/${abbrev.toLowerCase()}.png`;
}

export function getInningDisplay(game) {
  const ls = game.linescore;
  if (!ls) return '';
  const half = ls.inningHalf ?? '';
  const ordinal = ls.currentInningOrdinal ?? '';
  if (!ordinal) return '';
  const abbr = half.toLowerCase().startsWith('bot') ? 'Bot' : 'Top';
  return `${abbr} ${ordinal}`;
}
