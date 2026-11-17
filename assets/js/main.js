/* Premier Taxis – site behaviour (vanilla JS, no dependencies) */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ── Header: solid background once scrolled ───────────── */
  var header = $('[data-header]');
  var menuOpen = false;
  function onScroll() {
    var on = window.scrollY > 10 || menuOpen;
    header.classList.toggle('bg-paper-50/95', on);
    header.classList.toggle('backdrop-blur', on);
    header.classList.toggle('shadow-[0_8px_30px_-18px_rgba(74,1,5,.35)]', on && !menuOpen);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Mobile menu ──────────────────────────────────────── */
  var btn = $('[data-menu-btn]'), menu = $('[data-menu]');
  if (btn && menu) {
    var setMenu = function (open) {
      menuOpen = open;
      btn.setAttribute('aria-expanded', open);
      menu.classList.toggle('opacity-0', !open);
      menu.classList.toggle('pointer-events-none', !open);
      $('[data-bar1]').style.transform = open ? 'translateY(6px) rotate(45deg)' : '';
      var b2 = $('[data-bar2]');
      b2.style.transform = open ? 'translateY(-6px) rotate(-45deg)' : '';
      b2.style.width = open ? '1.5rem' : '';
      document.body.style.overflow = open ? 'hidden' : '';
      onScroll();
    };
    btn.addEventListener('click', function () { setMenu(!menuOpen); });
    $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menuOpen) setMenu(false); });
  }

  /* ── Scroll reveals ───────────────────────────────────── */
  var reveals = $$('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ── Step path: dashed line draws down on scroll ───────── */
  var steps = $('[data-steps]'), line = $('[data-step-line]');
  if (steps && line && !reduce && 'IntersectionObserver' in window) {
    var svg = line.parentNode;
    svg.style.clipPath = 'inset(0 0 100% 0)';
    svg.style.transition = 'clip-path 1.6s cubic-bezier(.6,0,.2,1)';
    var so = new IntersectionObserver(function (en) {
      if (en[0].isIntersecting) { svg.style.clipPath = 'inset(0 0 0 0)'; so.disconnect(); }
    }, { threshold: 0.4 });
    so.observe(steps);
  }

  /* ── Services explorer (tabs) ─────────────────────────── */
  var tabs = $$('[role="tab"]');
  function selectTab(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
      var p = document.getElementById(t.getAttribute('aria-controls'));
      p.hidden = !on;
      p.classList.toggle('is-active', on);
    });
    if (focus) tab.focus();
    if (window.innerWidth < 1024) {
      var list = tab.parentNode;
      list.scrollTo({ left: tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' });
    }
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { selectTab(t); });
    t.addEventListener('keydown', function (e) {
      var k = e.key, n = null;
      if (k === 'ArrowDown' || k === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
      if (k === 'ArrowUp' || k === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
      if (k === 'Home') n = tabs[0];
      if (k === 'End') n = tabs[tabs.length - 1];
      if (n) { e.preventDefault(); selectTab(n, true); }
    });
  });

  /* ── "Book this" buttons pre-select the service ──────── */
  var select = $('#f-service');
  $$('[data-service]').forEach(function (a) {
    a.addEventListener('click', function () { if (select) select.value = a.getAttribute('data-service'); });
  });

  /* ── Lightbox (arrows, Esc, swipe) ─────────────────────── */
  var lb = $('[data-lb]');
  if (lb) {
    var lbImg = $('[data-lb-img]'), lbCap = $('[data-lb-cap]');
    var items = $$('[data-lightbox]'), idx = 0, lastFocus = null;
    var show = function (i) {
      idx = (i + items.length) % items.length;
      var it = items[idx], img = $('img', it);
      lbImg.src = it.getAttribute('data-src');
      lbImg.alt = img ? img.alt : '';
      lbCap.textContent = it.getAttribute('data-caption') || '';
    };
    var openLb = function (i) {
      lastFocus = document.activeElement;
      show(i);
      lb.classList.remove('hidden'); lb.classList.add('flex');
      document.body.style.overflow = 'hidden';
      $('[data-lb-close]').focus();
    };
    var closeLb = function () {
      lb.classList.add('hidden'); lb.classList.remove('flex');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    };
    items.forEach(function (it, i) { it.addEventListener('click', function () { openLb(i); }); });
    $('[data-lb-close]').addEventListener('click', closeLb);
    $('[data-lb-prev]').addEventListener('click', function () { show(idx - 1); });
    $('[data-lb-next]').addEventListener('click', function () { show(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (lb.classList.contains('hidden')) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
      if (e.key === 'Tab') {
        var f = $$('button', lb).filter(function (b) { return b.offsetParent; });
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    var sx = null;
    lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) show(idx + (dx < 0 ? 1 : -1));
      sx = null;
    });
  }

  /* ── Marquee: duplicate the list for a seamless loop ─── */
  var mq = $('[data-marquee]');
  if (mq) { var copy = mq.firstElementChild.cloneNode(true); copy.setAttribute('aria-hidden', 'true'); mq.appendChild(copy); }

  /* ── Form: inline validation + submit state ───────────── */
  var form = $('[data-form]');
  if (form) {
    var fields = $$('.field', form);
    var check = function (field) {
      var input = $('input, select, textarea', field);
      var ok = input.checkValidity() && input.value.trim() !== '';
      field.classList.toggle('invalid', !ok);
      input.setAttribute('aria-invalid', !ok);
      return ok;
    };
    fields.forEach(function (f) {
      var input = $('input, select, textarea', f);
      var err = $('.err', f);
      if (err) { err.id = input.id + '-err'; input.setAttribute('aria-describedby', err.id); }
      input.addEventListener('blur', function () { if (input.value) check(f); });
      input.addEventListener('input', function () { if (f.classList.contains('invalid')) check(f); });
      input.addEventListener('change', function () { if (f.classList.contains('invalid')) check(f); });
    });
    form.addEventListener('submit', function (e) {
      var bad = fields.filter(function (f) { return !check(f); });
      if (bad.length) { e.preventDefault(); $('input, select, textarea', bad[0]).focus(); return; }
      var b = $('[data-submit]', form);
      b.disabled = true; b.classList.add('opacity-80');
      $('[data-submit-label]', form).textContent = 'Sending…';
    });
  }

  var y = $('[data-year]'); if (y) y.textContent = new Date().getFullYear();
})();
