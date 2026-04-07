const NAV_LINKS = [
  {
    label: 'Home',
    href: '../index.html',
    match: 'index',
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><polyline points="9 21 9 12 15 12 15 21"/></svg>`,
  },
  {
    label: 'Schedule',
    href: 'schedule.html',
    match: 'schedule',
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
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

  const thumb = document.getElementById('theme-toggle-thumb');
  if (thumb) thumb.textContent = dark ? '☽' : '☀';
}

// ── Sidebar + toggle init ──────────────────────────────────────────────────

export function initSidebar() {
  const filename = location.pathname.split('/').pop().replace('.html', '') || 'index';

  // ── Overlay ────────────────────────────────────────────────────────────
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  overlay.id = 'sidebar-overlay';

  // ── Sidebar panel ──────────────────────────────────────────────────────
  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';
  sidebar.id = 'sidebar';
  sidebar.setAttribute('aria-hidden', 'true');
  sidebar.innerHTML = `
    <div class="sidebar__header">
      <span class="sidebar__title">Menu</span>
      <button class="sidebar__close" id="sidebar-close" aria-label="Close menu">&#x2715;</button>
    </div>
    <nav class="sidebar__nav">
      ${NAV_LINKS.map(({ label, href, match, icon }) => `
        <a href="${href}" class="sidebar__link${filename === match ? ' sidebar__link--active' : ''}">
          <span class="sidebar__icon">${icon}</span>
          ${label}
        </a>
      `).join('')}
    </nav>
  `;

  document.body.prepend(sidebar, overlay);

  // ── Nav bar controls ───────────────────────────────────────────────────
  const navBar = document.querySelector('.nav-bar');
  if (navBar) {
    // Hamburger
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.id = 'menu-btn';
    hamburger.setAttribute('aria-label', 'Open menu');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.innerHTML = `<span></span><span></span><span></span>`;
    navBar.prepend(hamburger);
    hamburger.addEventListener('click', openSidebar);

    // Theme toggle
    const toggle = document.createElement('button');
    toggle.className = 'theme-toggle';
    toggle.id = 'theme-toggle';
    toggle.setAttribute('aria-label', 'Toggle dark mode');
    toggle.innerHTML = `
      <span class="theme-toggle__track">
        <span class="theme-toggle__thumb" id="theme-toggle-thumb">${isDark() ? '☽' : '☀'}</span>
      </span>`;
    navBar.append(toggle);
    toggle.addEventListener('click', () => applyTheme(!isDark()));
  }

  // ── Sidebar open / close ───────────────────────────────────────────────
  function openSidebar() {
    sidebar.classList.add('sidebar--open');
    overlay.classList.add('sidebar-overlay--visible');
    document.body.classList.add('body--sidebar-open');
    sidebar.setAttribute('aria-hidden', 'false');
    document.getElementById('menu-btn')?.setAttribute('aria-expanded', 'true');
  }

  function closeSidebar() {
    sidebar.classList.remove('sidebar--open');
    overlay.classList.remove('sidebar-overlay--visible');
    document.body.classList.remove('body--sidebar-open');
    sidebar.setAttribute('aria-hidden', 'true');
    document.getElementById('menu-btn')?.setAttribute('aria-expanded', 'false');
  }

  document.getElementById('sidebar-close').addEventListener('click', closeSidebar);
  overlay.addEventListener('click', closeSidebar);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSidebar(); });
}
