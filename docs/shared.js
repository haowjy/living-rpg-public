/* ============================================================
   shared.js — Living Story Sandbox RPG
   Theme toggle, markdown loading, hash routing, nav highlighting
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     Page registry — order matches nav
     ---------------------------------------------------------- */
  var PAGES = [
    { slug: 'home',               title: 'Home',               desc: 'The pitch' },
    { slug: 'game-vision',        title: 'Game Vision',        desc: 'World, combat, progression' },
    { slug: 'how-it-works',       title: 'How It Works',       desc: 'Agent architecture and systems' },
    { slug: 'world-generation',   title: 'World Generation',   desc: 'Chunk-based procedural worlds' },
    { slug: 'insight-spellcraft', title: 'Insight Spellcraft', desc: 'Make spells from your story' },
    { slug: 'roadmap',            title: 'Roadmap',            desc: 'V0, V1, and how to build this' }
  ];

  var DEFAULT_PAGE = 'home';

  /* ----------------------------------------------------------
     DOM references
     ---------------------------------------------------------- */
  var navListEl       = document.getElementById('nav-list');
  var contentEl       = document.getElementById('content');
  var themeToggleEl   = document.getElementById('theme-toggle');
  var hamburgerEl     = document.getElementById('hamburger');
  var sidebarEl       = document.getElementById('sidebar');
  var overlayEl       = document.getElementById('sidebar-overlay');

  /* ----------------------------------------------------------
     Theme toggle
     ---------------------------------------------------------- */
  function getStoredTheme() {
    try { return localStorage.getItem('lss-theme'); }
    catch (e) { return null; }
  }

  function setTheme(mode) {
    document.documentElement.classList.toggle('dark', mode === 'dark');
    try { localStorage.setItem('lss-theme', mode); }
    catch (e) { /* localStorage unavailable */ }
  }

  function initTheme() {
    var stored = getStoredTheme();
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }

  function toggleTheme() {
    var isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'light' : 'dark');
  }

  /* ----------------------------------------------------------
     Build nav
     ---------------------------------------------------------- */
  function buildNav() {
    var frag = document.createDocumentFragment();
    PAGES.forEach(function (page) {
      var li = document.createElement('li');
      li.className = 'nav-item';

      var a = document.createElement('a');
      a.className = 'nav-link';
      a.href = '#' + page.slug;
      a.setAttribute('data-page', page.slug);

      var titleSpan = document.createElement('span');
      titleSpan.className = 'nav-title';
      titleSpan.textContent = page.title;
      a.appendChild(titleSpan);

      if (page.desc) {
        var descSpan = document.createElement('span');
        descSpan.className = 'nav-desc';
        descSpan.textContent = page.desc;
        a.appendChild(descSpan);
      }

      a.addEventListener('click', function (e) {
        /* Let hash change naturally, but close mobile nav */
        closeMobileNav();
      });

      li.appendChild(a);
      frag.appendChild(li);
    });
    navListEl.appendChild(frag);
  }

  /* ----------------------------------------------------------
     Nav highlighting
     ---------------------------------------------------------- */
  function highlightNav(slug) {
    var links = navListEl.querySelectorAll('.nav-link');
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      if (link.getAttribute('data-page') === slug) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    }
  }

  /* ----------------------------------------------------------
     Mobile sidebar
     ---------------------------------------------------------- */
  function openMobileNav() {
    sidebarEl.classList.add('open');
    overlayEl.classList.add('open');
    hamburgerEl.setAttribute('aria-expanded', 'true');
  }

  function closeMobileNav() {
    sidebarEl.classList.remove('open');
    overlayEl.classList.remove('open');
    hamburgerEl.setAttribute('aria-expanded', 'false');
  }

  function toggleMobileNav() {
    if (sidebarEl.classList.contains('open')) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  }

  /* ----------------------------------------------------------
     Markdown loading
     ---------------------------------------------------------- */
  var pageCache = {};

  function slugToFile(slug) {
    return 'pages/' + slug + '.md';
  }

  function showLoading() {
    contentEl.innerHTML = '<div class="loading-spinner">Loading...</div>';
  }

  function showError(slug, err) {
    var isFileProtocol = window.location.protocol === 'file:';
    var msg = '<div class="error-message">' +
      '<h2>Could not load page</h2>' +
      '<p>Failed to load <code>' + slugToFile(slug) + '</code>.</p>';

    if (isFileProtocol) {
      msg += '<p>You are viewing this from <code>file://</code>. Most browsers block local file requests for security. To fix this, run a local server:</p>' +
        '<pre><code>cd ' + (window.location.pathname.replace(/\/[^/]*$/, '') || '.') + '\npython3 -m http.server 8000</code></pre>' +
        '<p>Then open <code>http://localhost:8000</code> in your browser.</p>';
    } else {
      msg += '<p>The markdown file may not exist yet, or there was a network error.</p>';
    }

    if (err) {
      msg += '<p style="font-size:13px;color:var(--ink-muted)">Error: ' + escapeHtml(String(err)) + '</p>';
    }

    msg += '</div>';
    contentEl.innerHTML = msg;
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function renderMarkdown(md) {
    if (typeof marked === 'undefined') {
      return '<p>Markdown renderer (marked.js) failed to load.</p>';
    }
    return marked.parse(md);
  }

  function loadPage(slug) {
    highlightNav(slug);
    document.title = getTitleForSlug(slug) + ' · Living Story Sandbox RPG';

    if (pageCache[slug]) {
      contentEl.innerHTML = '<div class="prose">' + renderMarkdown(pageCache[slug]) + '</div>';
      window.scrollTo(0, 0);
      return;
    }

    showLoading();

    fetch(slugToFile(slug))
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.text();
      })
      .then(function (md) {
        pageCache[slug] = md;
        contentEl.innerHTML = '<div class="prose">' + renderMarkdown(md) + '</div>';
        window.scrollTo(0, 0);
      })
      .catch(function (err) {
        showError(slug, err);
      });
  }

  function getTitleForSlug(slug) {
    for (var i = 0; i < PAGES.length; i++) {
      if (PAGES[i].slug === slug) return PAGES[i].title;
    }
    return slug;
  }

  /* ----------------------------------------------------------
     Hash routing
     ---------------------------------------------------------- */
  function getSlugFromHash() {
    var hash = window.location.hash.replace(/^#/, '');
    if (!hash) return DEFAULT_PAGE;
    /* Validate that slug is known */
    for (var i = 0; i < PAGES.length; i++) {
      if (PAGES[i].slug === hash) return hash;
    }
    return hash; /* allow unknown slugs — will show error if file doesn't exist */
  }

  function onHashChange() {
    var slug = getSlugFromHash();
    loadPage(slug);
  }

  /* ----------------------------------------------------------
     Init
     ---------------------------------------------------------- */
  function init() {
    initTheme();
    buildNav();

    /* Theme toggle */
    themeToggleEl.addEventListener('click', toggleTheme);

    /* Mobile nav */
    hamburgerEl.addEventListener('click', toggleMobileNav);
    overlayEl.addEventListener('click', closeMobileNav);

    /* Close mobile nav on Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sidebarEl.classList.contains('open')) {
        closeMobileNav();
      }
    });

    /* Hash routing */
    window.addEventListener('hashchange', onHashChange);

    /* Set initial hash if none */
    if (!window.location.hash) {
      window.location.hash = '#' + DEFAULT_PAGE;
    } else {
      onHashChange();
    }
  }

  /* Wait for DOM */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
