# MLB Stats Website

A vanilla HTML/CSS/JS baseball stats site with no framework and no build step. Data is pulled live from the free MLB Stats API (`statsapi.mlb.com`).

## Running locally

```bash
node server.js
```

Then open `http://localhost:3000`.

## Stack

- Plain HTML, CSS, JS (ES modules)
- Node.js dev server (`server.js`) serving files from `src/`
- MLB Stats API for all data
- No dependencies, no build step

## Project structure

```
src/
  index.html              # Home page
  pages/
    schedule.html         # Daily schedule with date nav
    standings.html        # Division standings + playoff picture tabs
    teams.html            # Stub
    team.html             # Team page (schedule, roster, hitting, pitching tabs)
    player.html           # Stub
    game.html             # Game page (finished games only so far)
  components/
    sidebar.js            # Persistent sidebar + dark/light theme toggle
  utils/
    api.js                # All MLB API fetch functions
  styles/
    main.css              # All styles, light + dark theme via CSS variables
```

## What's been built

- **Home** — hero + nav cards
- **Schedule** — day-by-day game cards, live/final/upcoming sections, date navigation
- **Standings** — division standings tab (6 divisions, 1 per row) + playoff picture tab (all teams per league, division winners + wild card)
- **Team page** — header with logo/record/streak, offense/defense stat cards, tabs: Schedule / Roster / Hitting (sortable) / Pitching (sortable) / Advanced (stub)
- **Game page (finished games)** — header with scores, 4 tabs: PBP (built) / Game (stub) / Away team (stub) / Home team (stub)
  - PBP tab features: simplified play descriptions, per-play out count, score with team logos, scoring play green highlight, half-inning quick-nav sidebar (18 dots, paginated for extra innings)
- **Sidebar** — links to Home, Schedule, Standings, Teams; dark/light toggle

## What's next

- Game page: **Game tab** (linescore/box score)
- Game page: **Away/Home team tabs** (player stats for that game)
- Game page: live and upcoming game support
- **Teams page** — browse all 30 teams
- **Player page** — individual player stats and info

## Interactions

- When asked for a **git message**, respond with the full command: `git commit -m "message"` with an appropriate message reflecting the recent work

## Conventions

- All API calls go through `src/utils/api.js`
- Styles all live in `src/styles/main.css` — no scoped or component CSS
- Sidebar is injected via `initSidebar()` from `sidebar.js` — every page calls it
- Dark mode uses `[data-theme="dark"]` on `<html>`, persisted in localStorage
- Team logos from ESPN CDN via `getLogoUrl(abbrev)` in `api.js`
- Player headshots from `img.mlbstatic.com`

## PBP conventions

- Play descriptions use `simplifyDesc(event, rbi)` in `game.html` — maps `play.result.event` to short labels; hits get `N-run` prefix, walks/HBP/sac flies get `N-RBI` prefix
- Scoring plays use a fixed green highlight for all teams (no per-team colors)
- Out count comes from `play.count.outs`; score from `play.result.awayScore` / `play.result.homeScore`
- Each play div gets `id="pbp-play-{atBatIndex}"` for nav scroll targeting
- Quick-nav sidebar: 18 half-inning dots (T1/B1…), paginated with ↑/↓ arrows for extra innings; Bottom halves have a border/gap separator between full innings
