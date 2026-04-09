const MLB_API_BASE = 'https://statsapi.mlb.com/api/v1';

export async function fetchTeamStats(teamId, group) {
  const year = new Date().getFullYear();
  const url = `${MLB_API_BASE}/teams/${teamId}/stats?stats=season&group=${group}&season=${year}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${group} stats: ${res.status}`);
  const data = await res.json();
  return data.stats?.[0]?.splits?.[0]?.stat ?? null;
}

export async function fetchTeam(teamId) {
  const res = await fetch(`${MLB_API_BASE}/teams/${teamId}`);
  if (!res.ok) throw new Error(`Failed to fetch team: ${res.status}`);
  const data = await res.json();
  return data.teams?.[0] ?? null;
}

export async function fetchStandings() {
  const year = new Date().getFullYear();
  const res = await fetch(`${MLB_API_BASE}/standings?leagueId=103,104&season=${year}&hydrate=team`);
  if (!res.ok) throw new Error(`Failed to fetch standings: ${res.status}`);
  return res.json();
}

export function findTeamStanding(standingsData, teamId) {
  for (const record of standingsData.records ?? []) {
    for (const entry of record.teamRecords ?? []) {
      if (entry.team.id === teamId) return entry;
    }
  }
  return null;
}

export async function fetchSchedule(date) {
  const dateStr = formatDate(date);
  const url = `${MLB_API_BASE}/schedule?sportId=1&date=${dateStr}&hydrate=linescore,team`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch schedule: ${res.status}`);
  const data = await res.json();
  return data.dates?.[0]?.games ?? [];
}

export async function fetchRoster(teamId) {
  const year = new Date().getFullYear();
  const url = `${MLB_API_BASE}/teams/${teamId}/roster?rosterType=active&season=${year}&hydrate=person`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch roster: ${res.status}`);
  const data = await res.json();
  const roster = data.roster ?? [];
  roster.sort((a, b) => (parseInt(a.jerseyNumber) || 999) - (parseInt(b.jerseyNumber) || 999));
  return roster;
}

export async function fetchTeamSchedule(teamId) {
  const year = new Date().getFullYear();
  const url = `${MLB_API_BASE}/schedule?sportId=1&season=${year}&teamId=${teamId}&hydrate=linescore,team`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch team schedule: ${res.status}`);
  const data = await res.json();
  const games = (data.dates ?? []).flatMap(d => d.games ?? []);
  games.sort((a, b) => new Date(a.gameDate) - new Date(b.gameDate));
  return games;
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
  const abbrevMap = {
    'az': 'ari',
    'kc': 'kc',
    'sf': 'sf',
    'tb': 'tb',
    'wsh': 'wsh',
  };
  const espnAbbr = abbrevMap[abbrev] ?? abbrev;
  return `https://a.espncdn.com/i/teamlogos/mlb/500/${espnAbbr}.png`;
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
