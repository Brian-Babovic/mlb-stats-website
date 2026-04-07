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

export function initSidebar() {
  const filename = location.pathname.split('/').pop().replace('.html', '') || 'index';

  // ── Overlay ──────────────────────────────────────────────────────────────
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  overlay.id = 'sidebar-overlay';

  // ── Sidebar panel ────────────────────────────────────────────────────────
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

  // ── Hamburger button ─────────────────────────────────────────────────────
  const navBar = document.querySelector('.nav-bar');
  if (navBar) {
    const btn = document.createElement('button');
    btn.className = 'hamburger';
    btn.id = 'menu-btn';
    btn.setAttribute('aria-label', 'Open menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = `<span></span><span></span><span></span>`;
    navBar.prepend(btn);
    btn.addEventListener('click', openSidebar);
  }

  // ── Open / close ─────────────────────────────────────────────────────────
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
