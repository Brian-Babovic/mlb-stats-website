const NAV_LINKS = [
  {
    label: 'Home',
    href: '/',
    match: 'index',
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><polyline points="9 21 9 12 15 12 15 21"/></svg>`,
  },
  {
    label: 'Schedule',
    href: '/pages/schedule',
    match: 'schedule',
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  },
  {
    label: 'Standings',
    href: '/pages/standings',
    match: 'standings',
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/></svg>`,
  },
  {
    label: 'Teams',
    href: '/pages/teams',
    match: 'teams',
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  },
];

// ── Theme ──────────────────────────────────────────────────────────────────

function isDark() {
  return document.documentElement.getAttribute('data-theme') === 'dark';
}

function applyTheme(dark) {
  if (dark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  localStorage.setItem('theme', dark ? 'dark' : 'light');
  document.dispatchEvent(new CustomEvent('themechange', { detail: { dark } }));

  const thumb = document.getElementById('theme-toggle-thumb');
  if (thumb) thumb.textContent = dark ? '☽' : '☀';
}

// ── Sidebar init ───────────────────────────────────────────────────────────

export function initSidebar() {
  const filename = location.pathname.split('/').pop().replace('.html', '') || 'index';

  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';
  sidebar.id = 'sidebar';
  sidebar.innerHTML = `
    <div class="sidebar__header">
      <span class="sidebar__title">MLB Stats</span>
    </div>
    <nav class="sidebar__nav">
      ${NAV_LINKS.map(({ label, href, match, icon }) => `
        <a href="${href}" class="sidebar__link${filename === match ? ' sidebar__link--active' : ''}">
          <span class="sidebar__icon">${icon}</span>
          ${label}
        </a>
      `).join('')}
    </nav>
    <div class="sidebar__footer">
      <button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode">
        <span class="theme-toggle__track">
          <span class="theme-toggle__thumb" id="theme-toggle-thumb">${isDark() ? '☽' : '☀'}</span>
        </span>
      </button>
    </div>
  `;

  document.body.prepend(sidebar);

  document.getElementById('theme-toggle').addEventListener('click', () => applyTheme(!isDark()));
}
