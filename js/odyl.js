/**
 * ODYL Health — shared UI helpers (Phase 1 prototype)
 * No backend; persona data in localStorage only.
 */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'odyl_persona';

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
    window.location.href = 'lock.html';
  }

  function goProfile() {
    window.location.href = 'profile.html';
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

  /**
   * @param {'home'|'sub'|'login'} variant — home: gear; sub: logout; login: no right action
   * @param {{ right?: 'gear'|'door'|'none' }} options
   */
  function renderHeader(variant, options) {
    variant = variant || 'sub';
    options = options || {};
    var right =
      options.right ||
      (variant === 'home' ? 'gear' : variant === 'login' ? 'none' : 'door');
    var rightHtml = '';
    if (right === 'gear') {
      rightHtml =
        '<a href="profile.html" class="header-icon-btn" aria-label="Settings">' + Icons.gear() + '</a>';
    } else if (right === 'door') {
      rightHtml =
        '<button type="button" class="header-icon-btn" aria-label="Sign out" data-odyl-logout>' +
        Icons.doorExit() +
        '</button>';
    } else {
      rightHtml = '<span class="header-icon-btn" style="visibility:hidden" aria-hidden="true"></span>';
    }

    return (
      '<div class="app-header">' +
      '<a href="lock.html" class="header-icon-btn" aria-label="Lock screen">' +
      Icons.lock() +
      '</a>' +
      '<span class="logo">ODYL</span>' +
      rightHtml +
      '</div>'
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

  function mountHeader(container, variant, options) {
    var el = typeof container === 'string' ? document.querySelector(container) : container;
    if (!el) return;
    el.innerHTML = renderHeader(variant, options);
    bindLogoutButtons(el);
  }

  function renderBottomNav(active) {
    var items = [
      { href: 'index.html', key: 'home', label: 'Home', icon: Icons.home },
      { href: 'calendar.html', key: 'calendar', label: 'Calendar', icon: Icons.calendar },
      { href: 'results.html', key: 'results', label: 'Results', icon: Icons.clipboard },
      { href: 'survey.html', key: 'survey', label: 'Survey', icon: Icons.survey }
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
  }

  global.ODYL = {
    STORAGE_KEY: STORAGE_KEY,
    getPersona: getPersona,
    setPersona: setPersona,
    clearPersona: clearPersona,
    requirePersona: requirePersona,
    logout: logout,
    goLock: goLock,
    goProfile: goProfile,
    Icons: Icons,
    renderHeader: renderHeader,
    mountHeader: mountHeader,
    renderBottomNav: renderBottomNav,
    mountBottomNav: mountBottomNav,
    bindLogoutButtons: bindLogoutButtons
  };
})(typeof window !== 'undefined' ? window : this);
