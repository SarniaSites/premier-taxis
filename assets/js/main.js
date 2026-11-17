/* Premier Taxis – site behaviour (vanilla JS) */
(function () {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // hero entrance once fonts are ready
  const go = () => document.documentElement.classList.add('loaded');
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(() => requestAnimationFrame(go));
  setTimeout(go, 1200);

  // header state + active nav
  const hdr = $('#hdr');
  const onScroll = () => hdr.classList.toggle('scrolled', window.scrollY > 24);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
  const navLinks = $$('.nav a');
  const secIO = new IntersectionObserver((es) => {
    es.forEach((e) => {
      if (!e.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['top', 'services', 'accessible', 'tours', 'booking', 'faq', 'contact'].forEach((id) => { const el = document.getElementById(id); if (el) secIO.observe(el); });

  // mobile menu
  const menu = $('#menu'), mBtn = $('#menuBtn');
  const setMenu = (open) => {
    menu.classList.toggle('open', open); mBtn.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) $('#menuClose').focus();
  };
  mBtn.addEventListener('click', () => setMenu(true));
  $('#menuClose').addEventListener('click', () => { setMenu(false); mBtn.focus(); });
  $$('#menu a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.classList.contains('open')) setMenu(false); });

  // scroll reveals
  const revIO = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); revIO.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  $$('.reveal, .reveal-l, .steps, .cut').forEach((el) => revIO.observe(el));

  // pause ambient loops when offscreen
  const pauseIO = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle('paused', !e.isIntersecting)));
  $$('.road, #accessible, #top').forEach((el) => pauseIO.observe(el));

  // hero cursor parallax (desktop only)
  const art = $('#heroArt');
  if (art && !reduce && window.matchMedia('(pointer:fine)').matches) {
    const layers = $$('.parallax', art);
    $('#top').addEventListener('pointermove', (e) => {
      const r = art.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / r.width, y = (e.clientY - (r.top + r.height / 2)) / r.height;
      layers.forEach((l) => { const d = +l.dataset.depth || 8; l.style.translate = `${(-x * d).toFixed(1)}px ${(-y * d).toFixed(1)}px`; });
    });
  }

  // services explorer
  const tabs = $$('[role=tab]');
  const select = (t, focus) => {
    tabs.forEach((x) => {
      const on = x === t; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1;
      const p = document.getElementById(x.getAttribute('aria-controls'));
      if (on) { p.hidden = false; p.classList.toggle('svc-panel', false); void p.offsetWidth; p.classList.add('svc-panel'); } else p.hidden = true;
    });
    if (focus) t.focus();
    if (window.innerWidth < 1024) t.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduce ? 'auto' : 'smooth' });
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', (e) => {
      const k = e.key; let n = null;
      if (k === 'ArrowDown' || k === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
      if (k === 'ArrowUp' || k === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
      if (n) { e.preventDefault(); select(n, true); }
    });
  });
  // "book" links preselect the form
  $$('.svc-book').forEach((a) => a.addEventListener('click', () => { const s = $('#f-service'); if (s && a.dataset.service) s.value = a.dataset.service; }));

  // accessible taxi cutaway
  const notes = [
    ['Wheelchair space', 'Room for a small to medium-sized wheelchair in our Peugeot Horizon.', 'i-wheelchair'],
    ['A seat for a companion', 'One more passenger can travel alongside – a carer, a partner or a friend.', 'i-heart'],
    ['Dogs welcome', 'We’re dog friendly, so assistance dogs and pets can come along too.', 'i-paw'],
    ['Trained, patient drivers', 'Our drivers are fully trained, supportive, caring and patient. We’re autism and dementia friendly.', 'i-infinity'],
    ['Tell us before you travel', 'When you book, let us know anything you feel the driver should know, in case of an emergency.', 'i-text'],
    ['A larger chair?', 'We work closely with other WAV drivers, so we may be able to help through one of our partners.', 'i-wheelchair'],
  ];
  const hots = $$('.hot');
  const dots = $('#noteDots');
  let cur = 0;
  if (dots) {
    notes.forEach(() => { const d = document.createElement('span'); dots.appendChild(d); });
    const show = (i) => {
      cur = (i + notes.length) % notes.length;
      const [t, x, ic] = notes[cur];
      $('#noteNum').textContent = cur + 1; $('#noteTitle').textContent = t; $('#noteText').textContent = x;
      $('#noteIco use').setAttribute('href', '#' + ic);
      hots.forEach((h, j) => h.classList.toggle('on', j === cur));
      $$('span', dots).forEach((d, j) => { d.className = 'h-2 rounded-full transition-all duration-300 ' + (j === cur ? 'w-6 bg-highlight-light' : 'w-2 bg-white/25'); });
    };
    hots.forEach((h) => {
      h.addEventListener('click', () => show(+h.dataset.i));
      h.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(+h.dataset.i); } });
    });
    $('#notePrev').addEventListener('click', () => show(cur - 1));
    $('#noteNext').addEventListener('click', () => show(cur + 1));
    show(0);
  }

  // lightbox
  const items = $$('#gallery [data-full]');
  const lb = $('#lb'), lbImg = $('#lbImg'), lbCap = $('#lbCap');
  let li = 0, lastFocus = null;
  const lbShow = (i) => {
    li = (i + items.length) % items.length; const it = items[li];
    lbImg.style.opacity = 0;
    const img = new Image(); img.onload = () => { lbImg.src = it.dataset.full; lbImg.alt = $('img', it).alt; lbImg.style.opacity = 1; }; img.src = it.dataset.full;
    lbCap.textContent = it.dataset.cap || '';
  };
  const lbOpen = (i) => { lastFocus = document.activeElement; lbShow(i); lb.classList.add('open'); document.body.style.overflow = 'hidden'; $('#lbClose').focus(); };
  const lbClose = () => { lb.classList.toggle('open', false); document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); };
  items.forEach((it, i) => it.addEventListener('click', () => lbOpen(i)));
  $('#lbClose').addEventListener('click', lbClose);
  $('#lbPrev').addEventListener('click', () => lbShow(li - 1));
  $('#lbNext').addEventListener('click', () => lbShow(li + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb) lbClose(); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') lbClose();
    if (e.key === 'ArrowLeft') lbShow(li - 1);
    if (e.key === 'ArrowRight') lbShow(li + 1);
  });
  let sx = null;
  lb.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', (e) => { if (sx === null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) lbShow(li + (dx < 0 ? 1 : -1)); sx = null; });

  // form: inline validation + sending state
  const form = $('#quote');
  if (form) {
    const fields = $$('input:not([type=hidden]):not([name=_honey]), select, textarea', form);
    const check = (f) => {
      const ok = f.checkValidity() && (f.type !== 'email' || !f.value || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.value));
      f.classList.toggle('bad', !ok); f.classList.toggle('ok', ok && !!f.value);
      const err = f.parentElement.querySelector('.err'); if (err) err.classList.toggle('hidden', ok);
      f.setAttribute('aria-invalid', !ok);
      return ok;
    };
    fields.forEach((f) => {
      f.addEventListener('blur', () => { if (f.value || f.classList.contains('bad')) check(f); });
      f.addEventListener('input', () => { if (f.classList.contains('bad')) check(f); });
      f.addEventListener('change', () => { if (f.classList.contains('bad')) check(f); });
    });
    form.addEventListener('submit', (e) => {
      const bad = fields.filter((f) => !check(f));
      if (bad.length) { e.preventDefault(); bad[0].focus(); return; }
      const b = $('button[type=submit]', form);
      b.disabled = true; b.classList.add('opacity-90');
      $('.lbl', b).textContent = 'Sending…'; $('.ico', b).classList.add('hidden'); $('.spin', b).classList.toggle('hidden', false);
    });
  }

  const yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();
})();
