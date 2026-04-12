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
  - PBP tab features: simplified play descriptions, per-play out count, score with team logos, scoring play green highlight + green description text + green scoring team score number, half-inning quick-nav sidebar (always 18 slots, empty halves show a dash, paginated with ↑/↓ arrows for extra innings with inning range labels e.g. "10–11")
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
- Scoring plays: green background highlight + green left border tab + green description text + green score number for the scoring team (no per-team colors)
- Out count comes from `play.count.outs`; score from `play.result.awayScore` / `play.result.homeScore`
- Each play div gets `id="pbp-play-{atBatIndex}"` for nav scroll targeting
- Quick-nav sidebar: always renders all 18 half-inning slots (T1/B1…T9/B9); halves with no plays show a `–` dash; dots are green if the half-inning contains a scoring play
- Nav sidebar dots scroll to the `pbp-half-header` element using `scrollIntoView`; `scroll-margin-top: 48px` on `.pbp-half-header` clears the sticky inning header
- Nav sidebar is a fixed 600px flex column; regular innings rows stretch to fill (`flex: 1`); extra innings rows use a fixed `calc(600px / 18)` height to match
- Extra innings pagination: ↓ arrow shows range label (e.g. "10–11"), ↑ arrow shows "1–9"; arrows overflow outside the nav box
- PBP scrollbar: hidden until hover, fades in as a thin grey bar (option 1 style)
