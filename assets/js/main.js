/* ==========================================================================
   Premier Taxis — main.js (vanilla, no dependencies)
   menu · header · hero load · route explorer · reveals · lightbox · FAQ · form
   ========================================================================== */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- hero: one choreographed entrance ---------- */
  const hero = $('[data-hero]');
  const start = () => requestAnimationFrame(() => document.body.classList.add('is-loaded'));
  if (document.fonts && document.fonts.ready) {
    Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 900))]).then(start);
  } else start();

  // pause the hero loops when it's off screen
  if (hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => hero.classList.toggle('paused', !e.isIntersecting)).observe(hero);
  }

  // the taxi drifts very slightly with a fine pointer
  const vanWrap = $('[data-parallax]');
  if (vanWrap && !reduced && matchMedia('(hover:hover) and (pointer:fine)').matches) {
    let raf;
    hero.addEventListener('pointermove', e => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / innerWidth - 0.5) * 14;
        vanWrap.style.translate = `${x}px 0`;
      });
    });
  }

  /* ---------- header ---------- */
  const header = $('[data-header]');
  const onScroll = () => header.classList.toggle('scrolled', scrollY > (hero ? hero.offsetHeight - 80 : 40));
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // active nav link
  const navLinks = $$('.nav-link');
  const sections = navLinks.map(a => $(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) navLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => io.observe(s));
  }

  /* ---------- mobile menu ---------- */
  const menuBtn = $('[data-menu-btn]');
  const setMenu = open => {
    document.documentElement.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) $('[data-menu-close]').focus(); else menuBtn.focus({ preventScroll: true });
  };
  menuBtn && menuBtn.addEventListener('click', () => setMenu(true));
  $('[data-menu-close]') && $('[data-menu-close]').addEventListener('click', () => setMenu(false));
  $$('[data-menu-link]').forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape' && document.documentElement.classList.contains('menu-open')) setMenu(false); });

  /* ---------- the day's runs: the taxi drives the route stop to stop ---------- */
  const route = $('[data-route]');
  const car = $('[data-car]');
  const carRot = $('[data-car-rot]');
  const stops = $$('[data-stop]');
  const dots = $$('[data-stop-dot]');
  if (route && car && stops.length) {
    const len = route.getTotalLength();
    let progress = 0, anim;
    route.style.strokeDasharray = `${len} ${len}`;
    const place = p => {
      route.style.strokeDashoffset = len * (1 - p);
      const at = Math.max(0.001, Math.min(len - 0.5, len * p));
      const a = route.getPointAtLength(at - 0.5), b = route.getPointAtLength(at + 0.5);
      const pt = route.getPointAtLength(len * p);
      car.setAttribute('transform', `translate(${pt.x} ${pt.y})`);
      carRot.setAttribute('transform', `rotate(${Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI})`);
    };
    const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const driveTo = target => {
      cancelAnimationFrame(anim);
      if (reduced) { progress = target; return place(target); }
      const from = progress, dur = Math.min(1600, 500 + Math.abs(target - from) * 2200), t0 = performance.now();
      const step = now => {
        const t = Math.min(1, (now - t0) / dur);
        progress = from + (target - from) * ease(t);
        place(progress);
        if (t < 1) anim = requestAnimationFrame(step);
      };
      anim = requestAnimationFrame(step);
    };
    let current = -1;
    const activate = i => {
      if (i === current) return;
      current = i;
      stops.forEach((s, j) => s.classList.toggle('is-active', j === i));
      dots.forEach((d, j) => d.classList.toggle('is-active', j === i));
      driveTo(parseFloat(stops[i].dataset.at));
    };
    place(0);
    activate(0);

    if ('IntersectionObserver' in window) {
      const mobile = matchMedia('(max-width: 1023px)');
      let io;
      const watch = () => {
        io && io.disconnect();
        const band = mobile.matches ? '-55% 0px -35% 0px' : '-48% 0px -48% 0px';
        io = new IntersectionObserver(entries => {
          entries.forEach(e => { if (e.isIntersecting) activate(stops.indexOf(e.target)); });
        }, { rootMargin: band });
        stops.forEach(s => io.observe(s));
      };
      watch();
      mobile.addEventListener && mobile.addEventListener('change', watch);
    }

    // tap a stop on the map → scroll to it
    dots.forEach((d, i) => {
      const go = () => {
        activate(i);
        const mapH = $('[data-map-wrap]').offsetHeight;
        const top = stops[i].getBoundingClientRect().top + scrollY - (innerWidth < 1024 ? mapH + 90 : innerHeight * 0.3);
        scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
      };
      d.addEventListener('click', go);
      d.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    });
  }

  /* ---------- reveals (few, varied) ---------- */
  const revealEls = $$('[data-reveal], [data-ramp]');
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -12% 0px' });
    revealEls.forEach(el => io.observe(el));
  } else revealEls.forEach(el => el.classList.add('in'));

  /* ---------- tour button preselects the form ---------- */
  $$('[data-service-pick]').forEach(a => a.addEventListener('click', () => {
    const sel = $('#f-service');
    if (sel) sel.value = a.dataset.servicePick;
  }));

  /* ---------- lightbox ---------- */
  const lb = $('[data-lightbox]');
  const shots = $$('[data-lb]');
  if (lb && shots.length) {
    const img = $('[data-lb-img]', lb), cap = $('[data-lb-cap]', lb);
    let idx = 0, lastFocus;
    const show = i => {
      idx = (i + shots.length) % shots.length;
      const s = $('img', shots[idx]);
      img.style.opacity = 0;
      img.onload = () => { img.style.opacity = 1; };
      img.src = s.currentSrc.replace('-sm.webp', '.webp') || s.src;
      img.alt = s.alt;
      cap.textContent = shots[idx].closest('figure').querySelector('figcaption').textContent;
    };
    const open = i => { lastFocus = document.activeElement; show(i); lb.hidden = false; document.body.style.overflow = 'hidden'; $('[data-lb-close]', lb).focus(); };
    const close = () => { lb.hidden = true; document.body.style.overflow = ''; lastFocus && lastFocus.focus(); };
    shots.forEach((b, i) => b.addEventListener('click', () => open(i)));
    $('[data-lb-close]', lb).addEventListener('click', close);
    $('[data-lb-prev]', lb).addEventListener('click', () => show(idx - 1));
    $('[data-lb-next]', lb).addEventListener('click', () => show(idx + 1));
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    addEventListener('keydown', e => {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
    let x0 = null;
    lb.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 45) show(idx + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  }

  /* ---------- FAQ ---------- */
  $$('[data-faq] .faq-item').forEach(item => {
    const btn = $('button', item);
    btn.addEventListener('click', () => {
      const open = !item.classList.contains('open');
      item.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open);
    });
  });

  /* ---------- form: inline validation, sending state, the taxi arrives ---------- */
  const form = $('[data-form]');
  if (form) {
    const rules = {
      'f-name': v => v.trim().length > 1,
      'f-phone': v => v.replace(/[^\d+]/g, '').length >= 6,
      'f-email': v => !v || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
      'f-service': v => !!v,
      'f-msg': v => v.trim().length > 3,
    };
    const check = el => {
      const ok = rules[el.id] ? rules[el.id](el.value) : true;
      el.setAttribute('aria-invalid', ok ? 'false' : 'true');
      const err = $(`[data-err-for="${el.id}"]`, form);
      err && err.classList.toggle('show', !ok);
      return ok;
    };
    Object.keys(rules).forEach(id => {
      const el = $('#' + id);
      el.addEventListener('blur', () => { if (el.value) check(el); });
      el.addEventListener('input', () => { if (el.getAttribute('aria-invalid') === 'true') check(el); });
    });
    form.addEventListener('submit', e => {
      const bad = Object.keys(rules).map(id => $('#' + id)).filter(el => !check(el));
      if (bad.length) { e.preventDefault(); bad[0].focus(); return; }
      const btn = $('[data-submit]', form);
      btn.disabled = true;
      $('[data-label]', btn).textContent = 'Sending…';
      $('[data-ico]', btn).innerHTML = '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2.4" stroke-dasharray="36 50" stroke-linecap="round"/>';
      $('[data-ico]', btn).setAttribute('viewBox', '0 0 24 24');
      $('[data-ico]', btn).classList.add('spin');
      const arrive = $('[data-arrive]');
      arrive && arrive.classList.add('arrived');
    });
  }

  // the taxi pulls up at "your stop" when the quote section comes into view
  const arrive = $('[data-arrive]');
  if (arrive && 'IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { arrive.classList.add('arrived'); io.disconnect(); } }, { threshold: 0.6 });
    io.observe(arrive);
  } else arrive && arrive.classList.add('arrived');
})();
