/**
 * ODYL Health — shared UI helpers (Phase 1 prototype)
 * No backend; persona data in localStorage only.
 */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'odyl_persona';
  var LOCK_RETURN_KEY = 'odyl_lock_return';

  /** Demo-only STI panel when a persona has no recorded tests (signup / empty profile). */
  var SAMPLE_TEST_RESULTS = [
    { type: 'Chlamydia', result: 'Negative', date: '2026-03-18', location: 'Chase Brexton' },
    { type: 'Gonorrhea', result: 'Negative', date: '2026-03-18', location: 'Chase Brexton' },
    { type: 'HIV', result: 'Negative', date: '2026-02-04', location: 'IWantTheKit' },
    { type: 'Syphilis', result: 'Negative', date: '2026-02-04', location: 'IWantTheKit' }
  ];

  function getPersonaTests(persona) {
    if (persona && persona.tests && persona.tests.length > 0) return persona.tests;
    return SAMPLE_TEST_RESULTS;
  }

  /** Normalize STI name for profile lookup (e.g. "HSV-1" → "hsv-1"). */
  function normalizeStiKey(name) {
    return String(name || '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ');
  }

  /**
   * Short educational blurbs for prototype (not clinical advice).
   * Keys use normalized names from test panels.
   */
  var STI_PROFILES = {
    chlamydia: {
      title: 'Chlamydia',
      about:
        'Chlamydia is a common bacterial STI. Many people have no symptoms, so testing is the most reliable way to know your status.',
      symptoms:
        'When present, symptoms can include burning with urination, discharge, or pelvic discomfort. Infections can also be silent.',
      transmission:
        'Spread through vaginal, anal, or oral sex without consistent barrier protection. Regular screening and partner treatment help reduce spread.',
      testing:
        'Usually diagnosed with a urine sample or swab. It is treatable with antibiotics prescribed by a clinician—complete the full course even if you feel better.'
    },
    gonorrhea: {
      title: 'Gonorrhea',
      about:
        'Gonorrhea is a bacterial STI that can affect the genitals, rectum, and throat. Like chlamydia, it may cause no obvious symptoms.',
      symptoms:
        'Possible discharge, painful urination, sore throat (pharyngeal infection), or rectal irritation. Untreated infection can lead to complications.',
      transmission:
        'Passed through sexual contact involving infected mucous membranes. Condoms and routine testing reduce risk.',
      testing:
        'Detected via swab or urine NAAT testing. Antibiotic treatment is effective; follow-up testing may be recommended based on local resistance patterns.'
    },
    hiv: {
      title: 'HIV',
      about:
        'HIV affects the immune system. With modern care, people living with HIV can stay healthy; early diagnosis matters.',
      symptoms:
        'Acute infection may feel like flu; long-term untreated HIV weakens immunity. Many people have no symptoms for years.',
      transmission:
        'Transmitted through blood, semen, vaginal fluids, rectal fluids, and breast milk during sex or sharing injection equipment. PrEP/PEP and condoms are key prevention tools.',
      testing:
        'Blood or oral-fluid antibody/antigen tests, sometimes with RNA confirmation. Rapid tests give quick results; window periods vary by test type.'
    },
    syphilis: {
      title: 'Syphilis',
      about:
        'Syphilis is a bacterial infection that progresses in stages if untreated. It is curable with antibiotics when caught early.',
      symptoms:
        'A painless sore (chancre), rash, swollen lymph nodes, or later-stage organ involvement. Some stages have minimal symptoms.',
      transmission:
        'Spread through direct contact with a syphilis sore during sex. Condoms reduce but do not eliminate risk if sores are outside covered areas.',
      testing:
        'Blood tests look for antibodies. Treatment is penicillin or alternatives per clinician guidance; partners may need evaluation too.'
    },
    'hepatitis b': {
      title: 'Hepatitis B',
      about:
        'Hepatitis B is a liver infection caused by HBV. It can be acute or chronic; vaccination prevents new infections.',
      symptoms:
        'May include fatigue, nausea, abdominal pain, jaundice, or none at all, especially early on.',
      transmission:
        'Spread through blood, semen, and other body fluids—including sexual contact and shared needles. Vaccination is highly protective.',
      testing:
        'Blood panels check antigens, antibodies, and viral load. Care ranges from monitoring to antiviral therapy depending on chronicity.'
    },
    'hepatitis c': {
      title: 'Hepatitis C',
      about:
        'Hepatitis C is a bloodborne liver infection, now curable for most people with short oral medication courses.',
      symptoms:
        'Often none for years; chronic infection may cause fatigue or liver-related signs late in disease.',
      transmission:
        'Primarily blood exposure (e.g., shared injection equipment). Sexual transmission is less common than for bacterial STIs but possible in some contexts.',
      testing:
        'Blood antibody screening followed by RNA confirmation if positive. Direct-acting antivirals cure the infection in most cases.'
    },
    'hsv-1': {
      title: 'HSV-1 (oral herpes)',
      about:
        'HSV-1 usually causes oral cold sores but can also infect the genitals through oral sex. It is very common and lifelong.',
      symptoms:
        'Tingling or burning followed by blisters/ulcers that heal. Outbreak frequency varies widely between people.',
      transmission:
        'Skin-to-skin contact, including kissing and oral sex, especially during outbreaks or prodrome. Barriers reduce but do not fully eliminate risk.',
      testing:
        'Swab PCR during symptoms is most accurate; blood antibody tests show past exposure but do not pinpoint site of infection.'
    },
    'hsv-2': {
      title: 'HSV-2 (genital herpes)',
      about:
        'HSV-2 typically affects the genital area. It is a chronic viral infection managed with clinician support.',
      symptoms:
        'Painful blisters, ulcers, itching, or flu-like symptoms with first outbreak; many people have mild or unrecognized symptoms.',
      transmission:
        'Spread through genital skin-to-skin contact. Daily suppressive therapy and condoms can lower transmission risk.',
      testing:
        'PCR swab from a lesion is best when active; type-specific blood IgG tests help clarify status when swabs are not available.'
    },
    hpv: {
      title: 'HPV',
      about:
        'Human papillomavirus includes many strains; some affect genital warts risk and some are linked to certain cancers over time.',
      symptoms:
        'Often asymptomatic. Some strains cause warts; high-risk types usually have no symptoms until screening finds cell changes.',
      transmission:
        'Very common through intimate skin-to-skin contact. Vaccination before exposure prevents the highest-risk types for many people.',
      testing:
        'Cervical screening (Pap/HPV co-test) per guidelines; anal screening may be advised for some people. Warts are diagnosed by exam.'
    },
    trichomoniasis: {
      title: 'Trichomoniasis',
      about:
        '“Trich” is a parasitic STI caused by Trichomonas vaginalis. It is treatable with prescription medication.',
      symptoms:
        'Discharge, odor, itching, or burning urination are common but not universal—especially in partners who may not notice symptoms.',
      transmission:
        'Passed during sex. All partners should be treated to prevent ping-pong reinfection.',
      testing:
        'NAAT on urine or swab is standard. Oral antibiotics resolve the infection; avoid sex until treatment is completed per clinician advice.'
    }
  };

  function getStiProfile(stiName) {
    var key = normalizeStiKey(stiName);
    if (STI_PROFILES[key]) return STI_PROFILES[key];
    return {
      title: stiName || 'STI',
      about:
        'This panel shows a lab result category. For personalized meaning and next steps, talk with a clinician or testing counselor.',
      symptoms: 'Symptoms depend on the specific infection and may be absent.',
      transmission: 'Transmission routes vary by organism; use barriers and testing strategies your clinician recommends.',
      testing: 'Follow-up testing or confirmatory tests may be suggested depending on the assay and your history.'
    };
  }

  /** Peer-facing handle for sharing (distinct from User_ID in product copy). */
  function getPeerHandle(persona) {
    if (!persona) return '';
    if (persona.ODYL_Handle && String(persona.ODYL_Handle).trim()) return String(persona.ODYL_Handle).trim();
    if (persona.Alias && String(persona.Alias).trim()) return String(persona.Alias).trim();
    return persona.First_Name || 'ODYL user';
  }

  function canLogMenstrualCycle(persona) {
    if (!persona) return false;
    if (persona.Menstrual_Logging === true) return true;
    if (persona.Menstrual_Logging === false) return false;
    var bio = String(persona.Bio_Sex || '').toLowerCase();
    if (bio === 'female') return true;
    var g = String(persona.Gender || '').toLowerCase();
    return g === 'female';
  }

  var SHARE_REGISTRY_KEY = 'odyl_share_registry';
  var INBOX_PREFIX = 'odyl_inbox_';
  var MAX_INBOX_MS = 30 * 24 * 60 * 60 * 1000;

  function readShareRegistry() {
    try {
      var raw = localStorage.getItem(SHARE_REGISTRY_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function writeShareRegistry(obj) {
    localStorage.setItem(SHARE_REGISTRY_KEY, JSON.stringify(obj));
  }

  /**
   * @param {object} persona sender
   * @param {{ recipientContact: string, tests: object[], displayHandle: string, ttlMs: number }} opts
   */
  function createShareBundle(persona, opts) {
    var token =
      's' +
      Date.now().toString(36) +
      Math.random()
        .toString(36)
        .substring(2, 10);
    var now = Date.now();
    var reg = readShareRegistry();
    reg[token] = {
      senderUserId: persona.User_ID,
      senderHandle: opts.displayHandle,
      tests: opts.tests,
      recipientContact: opts.recipientContact,
      createdAt: now,
      expiresAt: now + opts.ttlMs,
      inboxExpiresAt: now + Math.min(opts.ttlMs, MAX_INBOX_MS)
    };
    writeShareRegistry(reg);
    var path = 'shared-results.html?t=' + encodeURIComponent(token);
    var url = path;
    try {
      if (typeof window !== 'undefined' && window.location) {
        url = new URL(path, window.location.href).href;
      }
    } catch (e2) {}
    return { token: token, path: path, url: url };
  }

  function getShareBundle(token) {
    if (!token) return null;
    var reg = readShareRegistry();
    var b = reg[token];
    if (!b) return null;
    if (Date.now() > b.expiresAt) {
      delete reg[token];
      writeShareRegistry(reg);
      return null;
    }
    return b;
  }

  function appendInboxForUser(userId, entry) {
    if (!userId) return;
    var key = INBOX_PREFIX + userId;
    var list = [];
    try {
      list = JSON.parse(localStorage.getItem(key) || '[]');
    } catch (e) {
      list = [];
    }
    list.unshift(entry);
    localStorage.setItem(key, JSON.stringify(list));
  }

  function getInboxForUser(userId) {
    var key = INBOX_PREFIX + userId;
    var list = [];
    try {
      list = JSON.parse(localStorage.getItem(key) || '[]');
    } catch (e) {
      list = [];
    }
    var cutoff = Date.now() - MAX_INBOX_MS;
    return list.filter(function (item) {
      return item.receivedAt && item.receivedAt >= cutoff;
    });
  }

  function getPersona() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function setPersona(p) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  }

  function clearPersona() {
    localStorage.removeItem(STORAGE_KEY);
  }

  function requirePersona() {
    if (!getPersona()) {
      window.location.href = 'login.html';
      return null;
    }
    return getPersona();
  }

  function logout() {
    clearPersona();
    window.location.href = 'login.html';
  }

  function goLock() {
    try {
      sessionStorage.setItem(LOCK_RETURN_KEY, getLockReturnPage());
    } catch (e) {}
    window.location.href = 'lock.html';
  }

  function goProfile() {
    window.location.href = 'profile.html';
  }

  function getLockReturnPage() {
    var parts = window.location.pathname.split('/').filter(Boolean);
    var last = parts.length ? parts[parts.length - 1] : 'index.html';
    if (!last || last.indexOf('.html') === -1) last = 'index.html';
    return last;
  }

  var iconGradSeq = 0;

  function svgWrap(content, size) {
    size = size || 56;
    var gid = 'odyl-g-' + ++iconGradSeq;
    var defs =
      '<defs><linearGradient id="' +
      gid +
      '" x1="0%" y1="0%" x2="100%" y2="100%">' +
      '<stop offset="0%" stop-color="#ffb347"/><stop offset="100%" stop-color="#e0783a"/></linearGradient></defs>';
    var body = content.split('#odyl-icon-grad').join('#' + gid);
    return (
      '<svg class="odyl-icon-svg" xmlns="http://www.w3.org/2000/svg" width="' +
      size +
      '" height="' +
      size +
      '" viewBox="0 0 64 64" aria-hidden="true">' +
      defs +
      body +
      '</svg>'
    );
  }

  var Icons = {
    lock: function () {
      return svgWrap(
        '<rect x="22" y="28" width="20" height="18" rx="3" fill="url(#odyl-icon-grad)"/><path d="M24 28V22a8 8 0 0116 0v6" fill="none" stroke="#c45a1a" stroke-width="2.5" stroke-linecap="round"/>'
      );
    },
    gear: function () {
      return svgWrap(
        '<circle cx="32" cy="32" r="22" fill="url(#odyl-icon-grad)"/><circle cx="32" cy="32" r="10" fill="#fff8f3" stroke="#c45a1a" stroke-width="1.5"/><path stroke="#c45a1a" stroke-width="2.5" stroke-linecap="round" fill="none" d="M32 12v6M32 46v6M12 32h6M46 32h6M19 19l4 4M41 41l4 4M41 19l-4 4M19 41l-4 4"/>'
      );
    },
    doorExit: function () {
      return svgWrap(
        '<rect x="14" y="14" width="22" height="36" rx="2" fill="url(#odyl-icon-grad)"/><rect x="18" y="18" width="14" height="28" fill="#fff5ee"/><path fill="#c45a1a" d="M44 22h8v20h-8v-6h4V28h-4v-6z"/>'
      );
    },
    calendar: function () {
      return svgWrap(
        '<rect x="12" y="16" width="40" height="38" rx="4" fill="url(#odyl-icon-grad)"/><path fill="#fff" fill-opacity=".2" d="M12 24h40v4H12z"/><path fill="none" stroke="#c45a1a" stroke-width="2" d="M22 12v8M42 12v8"/><path fill="#fff" d="M22 34h6v6h-6v-6zm10 0h6v6h-6v-6zm10 0h6v6h-6v-6z"/><path fill="#c45a1a" d="M28 28l2 2 4-4" stroke="#fff" stroke-width="1.5"/>'
      );
    },
    mapPin: function () {
      return svgWrap(
        '<path fill="url(#odyl-icon-grad)" d="M32 10c-7 0-12 5-12 12 0 10 12 28 12 28s12-18 12-28c0-7-5-12-12-12zm0 16a6 6 0 110-12 6 6 0 010 12z"/>'
      );
    },
    clipboard: function () {
      return svgWrap(
        '<rect x="16" y="14" width="32" height="42" rx="2" fill="url(#odyl-icon-grad)"/><rect x="24" y="10" width="16" height="8" rx="2" fill="#c45a1a"/><path fill="#fff" fill-opacity=".2" d="M20 22h24v4H20z"/><path fill="#fff" d="M22 30h12v2H22zm0 6h16v2H22zm0 6h20v2H22z"/>'
      );
    },
    heartHands: function () {
      return svgWrap(
        '<path fill="url(#odyl-icon-grad)" d="M32 20c-4-6-14-4-14 6 0 8 14 18 14 18s14-10 14-18c0-10-10-12-14-6z"/><path fill="#c45a1a" d="M18 38c2 4 6 6 10 8 4-2 8-4 10-8z"/>'
      );
    },
    book: function () {
      return svgWrap(
        '<path fill="url(#odyl-icon-grad)" d="M14 12h18v40H14c-2 0-4-2-4-4V16c0-2 2-4 4-4zm36 0H32v40h18c2 0 4-2 4-4V16c0-2-2-4-4-4z"/><path fill="#fff" fill-opacity=".25" d="M18 18h10v2H18zm0 6h8v2H18zm18-6h10v2H36zm0 6h8v2H36z"/>'
      );
    },
    chat: function () {
      return svgWrap(
        '<path fill="url(#odyl-icon-grad)" d="M10 14h44v28H24l-8 8v-8h-6V14z"/><circle cx="22" cy="28" r="3" fill="#fff"/><circle cx="32" cy="28" r="3" fill="#fff"/><circle cx="42" cy="28" r="3" fill="#fff"/>'
      );
    },
    medal: function () {
      return svgWrap(
        '<rect x="22" y="8" width="20" height="24" rx="2" fill="url(#odyl-icon-grad)"/><path fill="#c45a1a" d="M32 32l-8 8v-8h16v8z"/><circle cx="32" cy="28" r="6" fill="#fff"/>',
        40
      );
    },
    home: function () {
      return svgWrap(
        '<path fill="url(#odyl-icon-grad)" d="M32 12L12 28v24h14V38h12v14h14V28L32 12z"/>',
        48
      );
    },
    survey: function () {
      return svgWrap(
        '<circle cx="32" cy="32" r="22" fill="url(#odyl-icon-grad)"/><path fill="#fff" d="M22 28h20v-4H22v4zm0 8h8v-4h-8v4zm0 8h8v-4h-8v4zm12-16h8v20h-8V28z"/>',
        48
      );
    },
    plane: function () {
      return svgWrap(
        '<path fill="url(#odyl-icon-grad)" d="M54 10L10 30l16 14 4 16 10-12 10 8z"/>',
        48
      );
    },
    envelope: function () {
      return svgWrap(
        '<rect x="8" y="18" width="48" height="32" rx="4" fill="url(#odyl-icon-grad)"/><path fill="#fff" fill-opacity=".2" d="M8 22l24 16 24-16"/><path fill="#c45a1a" d="M26 28h12v12H26z"/>',
        48
      );
    }
  };

  function currentHtmlFile() {
    var p = window.location.pathname || '';
    var seg = p.split('/').filter(Boolean);
    var last = seg.length ? seg[seg.length - 1] : 'index.html';
    if (!last || last.indexOf('.html') === -1) last = 'index.html';
    return last;
  }

  function renderDesktopNav() {
    var items = [
      { href: 'index.html', label: 'Home' },
      { href: 'calendar.html', label: 'Calendar' },
      { href: 'results.html', label: 'Results' },
      { href: 'survey.html', label: 'RiskCheck' }
    ];
    var page = currentHtmlFile();
    return (
      '<nav class="desktop-nav" aria-label="Main navigation">' +
      items
        .map(function (item) {
          var active = item.href === page ? ' desktop-nav-link--active' : '';
          return '<a href="' + item.href + '" class="desktop-nav-link' + active + '">' + item.label + '</a>';
        })
        .join('') +
      '</nav>'
    );
  }

  function renderSidebarMarkup() {
    var items = [
      { href: 'index.html', label: 'Home', icon: Icons.home },
      { href: 'calendar.html', label: 'Calendar', icon: Icons.calendar },
      { href: 'results.html', label: 'Results', icon: Icons.clipboard },
      { href: 'survey.html', label: 'RiskCheck', icon: Icons.survey },
      { href: 'locator.html', label: 'Health Locator', icon: Icons.mapPin },
      { href: 'education.html', label: 'Education', icon: Icons.book },
      { href: 'support.html', label: 'Support', icon: Icons.heartHands },
      { href: 'lumi.html', label: 'LUMI.AI', icon: Icons.chat },
      { href: 'rewards.html', label: 'Rewards', icon: Icons.medal },
      { href: 'profile.html', label: 'Profile', icon: Icons.gear }
    ];
    var page = currentHtmlFile();
    return (
      '<div class="desktop-sidebar-brand">ODYL</div>' +
      '<p class="desktop-sidebar-tag">Health</p>' +
      '<nav class="desktop-sidebar-nav" aria-label="Main navigation">' +
      items
        .map(function (item) {
          var act = item.href === page ? ' sidebar-link--active' : '';
          return (
            '<a href="' +
            item.href +
            '" class="sidebar-link' +
            act +
            '"><span class="sidebar-link-icon">' +
            item.icon() +
            '</span><span class="sidebar-link-label">' +
            item.label +
            '</span></a>'
          );
        })
        .join('') +
      '</nav>'
    );
  }

  var desktopShellMq = null;

  function ensureDesktopShell() {
    if (typeof document === 'undefined' || !document.body) return;
    if (!desktopShellMq) {
      desktopShellMq = window.matchMedia('(min-width: 768px)');
      if (desktopShellMq.addEventListener) {
        desktopShellMq.addEventListener('change', ensureDesktopShell);
      } else if (desktopShellMq.addListener) {
        desktopShellMq.addListener(ensureDesktopShell);
      }
    }
    var fr = document.querySelector('.phone-frame');
    var isLock = fr && fr.classList.contains('pin-lock-page');
    var wants = desktopShellMq.matches && fr && !isLock;
    var aside = document.getElementById('odyl-desktop-sidebar');

    if (wants) {
      document.body.classList.add('odyl-desktop');
      if (!aside) {
        aside = document.createElement('aside');
        aside.id = 'odyl-desktop-sidebar';
        aside.className = 'desktop-sidebar';
        aside.setAttribute('aria-label', 'Main navigation');
        fr.parentNode.insertBefore(aside, fr);
      }
      aside.innerHTML = renderSidebarMarkup();
    } else {
      document.body.classList.remove('odyl-desktop');
      if (aside) aside.remove();
    }
  }

  /**
   * Shared app header: lock → lock.html, settings (gear) → profile.html.
   * @param {'home'|'sub'|'login'} variant — reserved for future layout tweaks
   * @param {{ right?: 'gear'|'none' }} options — default right control is settings; use 'none' to hide
   */
  function renderHeader(variant, options) {
    options = options || {};
    var right = Object.prototype.hasOwnProperty.call(options, 'right') ? options.right : 'gear';
    var rightHtml = '';
    if (right === 'gear') {
      rightHtml =
        '<div class="header-gear-wrap">' +
        '<button type="button" class="header-icon-btn" id="odyl-gear-btn" aria-label="Settings menu" aria-expanded="false" aria-haspopup="true">' +
        Icons.gear() +
        '</button>' +
        '<div class="header-gear-dropdown" id="odyl-gear-dropdown" role="menu" hidden>' +
        '<a href="profile.html" class="header-gear-item" role="menuitem">Profile</a>' +
        '<button type="button" class="header-gear-item" role="menuitem" data-odyl-switch-profile>Switch profile</button>' +
        '</div>' +
        '</div>';
    } else {
      rightHtml = '<span class="header-icon-btn header-icon-btn--spacer" aria-hidden="true"></span>';
    }

    return (
      '<header class="app-header-bar">' +
      '<div class="app-header">' +
      '<a href="lock.html" class="header-icon-btn" data-odyl-lock aria-label="Lock screen">' +
      Icons.lock() +
      '</a>' +
      '<span class="logo">ODYL</span>' +
      renderDesktopNav() +
      rightHtml +
      '</div></header>'
    );
  }

  function bindLogoutButtons(root) {
    root = root || document;
    root.querySelectorAll('[data-odyl-logout]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        logout();
      });
    });
  }

  var gearDocListenersBound = false;

  function bindGearMenu(root) {
    var wrap = root.querySelector('.header-gear-wrap');
    if (!wrap) return;
    var btn = wrap.querySelector('#odyl-gear-btn');
    var menu = wrap.querySelector('#odyl-gear-dropdown');
    var switchBtn = wrap.querySelector('[data-odyl-switch-profile]');
    if (!btn || !menu) return;

    function setOpen(open) {
      menu.hidden = !open;
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(menu.hidden);
    });

    if (switchBtn) {
      switchBtn.addEventListener('click', function () {
        clearPersona();
        window.location.href = 'login.html';
      });
    }

    if (!gearDocListenersBound) {
      gearDocListenersBound = true;
      document.addEventListener('click', function (e) {
        if (e.target.closest && e.target.closest('.header-gear-wrap')) return;
        var m = document.getElementById('odyl-gear-dropdown');
        var b = document.getElementById('odyl-gear-btn');
        if (m && !m.hidden) {
          m.hidden = true;
          if (b) b.setAttribute('aria-expanded', 'false');
        }
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          var m = document.getElementById('odyl-gear-dropdown');
          var b = document.getElementById('odyl-gear-btn');
          if (m && !m.hidden) {
            m.hidden = true;
            if (b) b.setAttribute('aria-expanded', 'false');
          }
        }
      });
    }
  }

  function bindLockLink(root) {
    var link = root.querySelector('[data-odyl-lock]');
    if (!link) return;
    link.addEventListener('click', function (e) {
      e.preventDefault();
      try {
        sessionStorage.setItem(LOCK_RETURN_KEY, getLockReturnPage());
      } catch (err) {}
      window.location.href = 'lock.html';
    });
  }

  function mountHeader(container, variant, options) {
    var el = typeof container === 'string' ? document.querySelector(container) : container;
    if (!el) return;
    el.innerHTML = renderHeader(variant, options);
    bindGearMenu(el);
    bindLockLink(el);
    ensureDesktopShell();
  }

  function renderBottomNav(active) {
    var items = [
      { href: 'index.html', key: 'home', label: 'Home', icon: Icons.home },
      { href: 'calendar.html', key: 'calendar', label: 'Calendar', icon: Icons.calendar },
      { href: 'results.html', key: 'results', label: 'Results', icon: Icons.clipboard },
      { href: 'survey.html', key: 'survey', label: 'RiskCheck', icon: Icons.survey }
    ];
    var html =
      '<div class="bottom-nav">' +
      items
        .map(function (item) {
          var isActive = active && item.key === active ? ' active' : '';
          return (
            '<a href="' +
            item.href +
            '" class="nav-item' +
            isActive +
            '">' +
            '<span class="nav-item-icon">' +
            item.icon() +
            '</span>' +
            '<span>' +
            item.label +
            '</span>' +
            '</a>'
          );
        })
        .join('') +
      '</div>';
    return html;
  }

  function mountBottomNav(container, active) {
    var el = typeof container === 'string' ? document.querySelector(container) : container;
    if (!el) return;
    el.innerHTML = renderBottomNav(active);
    ensureDesktopShell();
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', ensureDesktopShell);
    } else {
      ensureDesktopShell();
    }
  }

  global.ODYL = {
    STORAGE_KEY: STORAGE_KEY,
    LOCK_RETURN_KEY: LOCK_RETURN_KEY,
    getPersona: getPersona,
    setPersona: setPersona,
    clearPersona: clearPersona,
    requirePersona: requirePersona,
    getPersonaTests: getPersonaTests,
    getStiProfile: getStiProfile,
    normalizeStiKey: normalizeStiKey,
    getPeerHandle: getPeerHandle,
    canLogMenstrualCycle: canLogMenstrualCycle,
    createShareBundle: createShareBundle,
    getShareBundle: getShareBundle,
    appendInboxForUser: appendInboxForUser,
    getInboxForUser: getInboxForUser,
    MAX_INBOX_MS: MAX_INBOX_MS,
    logout: logout,
    goLock: goLock,
    goProfile: goProfile,
    Icons: Icons,
    renderHeader: renderHeader,
    mountHeader: mountHeader,
    renderBottomNav: renderBottomNav,
    mountBottomNav: mountBottomNav,
    bindLogoutButtons: bindLogoutButtons,
    ensureDesktopShell: ensureDesktopShell
  };
})(typeof window !== 'undefined' ? window : this);
