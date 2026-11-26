// Mejora progresiva: sin JavaScript el sitio se lee y se navega igual.
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;

  // ------------------------------------------------------------ idioma
  // Se guarda sólo si la persona lo elige. `language` es la clave que usan los prototipos.
  $$('a[data-lang]').forEach((a) =>
    a.addEventListener('click', () => {
      try {
        localStorage.setItem('lm-lang', a.dataset.lang);
        localStorage.setItem('language', a.dataset.lang);
      } catch (e) { /* sin almacenamiento disponible */ }
    })
  );

  // ------------------------------------------------------------ menú y grupos plegables en celular
  const menu = $('.mn');
  if (menu) {
    const close = (focus) => { if (menu.open) { menu.open = false; if (focus) $('summary', menu).focus(); } };
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) close(); });
    document.addEventListener('click', (e) => { if (!menu.contains(e.target)) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(true); });
  }
  const groups = $$('details.sk');
  if (groups.length) {
    const small = matchMedia('(max-width: 700px)');
    const fold = () => groups.forEach((d, i) => {
      d.open = !small.matches || i === 0;
      $('summary', d).tabIndex = small.matches ? 0 : -1;
    });
    fold();
    small.addEventListener('change', fold);
  }

  // ------------------------------------------------------------ movimiento
  // Las portadas cuentan una historia en pasos. Se reproducen sólo a la vista, se pueden pausar
  // (la elección queda guardada) y arrancan quietas si el sistema pide menos movimiento o datos.
  let motion = null;
  try { motion = localStorage.getItem('lm-motion'); } catch (e) { /* sin almacenamiento */ }
  if (!motion) motion = matchMedia('(prefers-reduced-motion: reduce)').matches || (navigator.connection && navigator.connection.saveData) ? 'off' : 'on';
  const scenes = [];
  const toggles = $$('button[data-motion]');
  const setMotion = (m, keep) => {
    motion = m;
    root.dataset.motion = m;
    toggles.forEach((b) => b.setAttribute('aria-label', m === 'on' ? b.dataset.lOn : b.dataset.lOff));
    if (keep) try { localStorage.setItem('lm-motion', m); } catch (e) { /* sin almacenamiento */ }
    scenes.forEach((sync) => sync());
  };
  toggles.forEach((b) => b.addEventListener('click', () => setMotion(motion === 'on' ? 'off' : 'on', true)));
  if ('IntersectionObserver' in window)
    $$('[data-play]').forEach((el) => {
      const total = Number(el.dataset.play);
      const steps = $$('.stp li', el.closest('.ft-md, .cp-md') || el);
      let frames = null;
      let hot = [];
      let k = 0;
      let seen = false;
      let timer;
      const prepare = () => {
        if (frames) return;
        $$('template[data-frames]', el).forEach((t) => t.replaceWith(t.content));
        frames = $$('.fr[data-on]', el);
        hot = $$('[data-hot]', el);
      };
      const has = (list) => list.split(' ').includes(String(k));
      const show = (i) => {
        k = i % total;
        frames.forEach((x) => x.classList.toggle('on', has(x.dataset.on)));
        hot.forEach((x) => x.classList.toggle('hot', has(x.dataset.hot)));
        steps.forEach((x, n) => x.classList.toggle('on', n === k));
      };
      const sync = () => {
        clearInterval(timer);
        if (!seen || motion !== 'on') return;
        prepare();
        show(k);
        timer = setInterval(() => show(k + 1), Number(el.dataset.ms));
      };
      scenes.push(sync);
      new IntersectionObserver(([e]) => { seen = e.isIntersecting; sync(); }, { threshold: 0.35 }).observe(el);
    });
  setMotion(motion);

  // ------------------------------------------------------------ prototipos dentro del sitio
  // En pantallas grandes se abren en un teléfono, sin salir de la página. En el celular, a pantalla completa.
  const lives = $$('a[data-live]');
  if (lives.length && window.HTMLDialogElement) {
    const roomy = matchMedia('(min-width: 821px) and (min-height: 600px)');
    const L = $('.toast').dataset;
    let lv;
    const open = (a) => {
      if (!lv) {
        lv = document.createElement('dialog');
        lv.className = 'lv';
        lv.innerHTML = '<div class="lv-in"><div class="lv-a"><h2></h2><p></p><a target="_blank" rel="noopener"></a></div><span class="dv dv-ph"><span class="dv-b"><span class="dv-s"><span class="dv-f" style="--ar:390/844"><iframe></iframe></span><i class="dv-c"></i></span></span></span><button type="button" class="lv-x"><span></span><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>';
        document.body.append(lv);
        lv.addEventListener('click', (e) => { if (e.target.closest('.lv-x') || e.target.classList.contains('lv-in') || e.target === lv) lv.close(); });
        lv.addEventListener('close', () => { $('iframe', lv).src = 'about:blank'; });
        $('.lv-x span', lv).textContent = L.close;
        $('.lv-a p', lv).textContent = L.note;
        $('.lv-a a', lv).textContent = L.full;
      }
      lv.setAttribute('aria-label', a.dataset.live);
      $('h2', lv).textContent = a.dataset.live;
      $('.lv-a a', lv).href = a.href;
      $('iframe', lv).title = a.dataset.live;
      $('iframe', lv).src = a.href + (a.href.includes('?') ? '&' : '?') + 'embed=1';
      lv.showModal();
    };
    lives.forEach((a) => a.addEventListener('click', (e) => {
      if (!roomy.matches || e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      open(a);
    }));
  }

  // ------------------------------------------------------------ copiar correo
  const toast = $('.toast');
  let timer;
  const say = (msg) => {
    toast.textContent = msg;
    toast.classList.add('on');
    clearTimeout(timer);
    timer = setTimeout(() => toast.classList.remove('on'), 2400);
  };
  $$('[data-copy]').forEach((b) =>
    b.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(b.dataset.copy);
        say(b.dataset.ok);
      } catch (e) {
        say(b.dataset.copy);
      }
    })
  );

  // ------------------------------------------------------------ horas en común
  $$('[data-overlap]').forEach((el) => {
    const now = new Date();
    const time = new Intl.DateTimeFormat(root.lang === 'es' ? 'es-AR' : 'en-GB', { timeZone: 'America/Argentina/Mendoza', hour: '2-digit', minute: '2-digit', hour12: false }).format(now);
    const diff = Math.abs(-now.getTimezoneOffset() + 180) / 60;
    const gap = Math.min(diff, 24 - diff);
    const shared = Math.round(9 - gap);
    if (shared < 1) return;
    el.textContent = (gap === 0 ? el.dataset.same : el.dataset.one).replace('{time}', time).replace('{h}', shared);
  });

  // ------------------------------------------------------------ componente con estados
  $$('[data-demo]').forEach((box) => {
    const ui = $('.sd-ui', box);
    const input = $('input[type="text"]', box);
    const cells = $$('.sd-f i', box);
    const hint = $('.sd-h', box);
    const btn = $('.sd-b', box);
    const radios = $$('input[type="radio"]', box);
    const notes = $$('[data-for]', box);
    const data = JSON.parse(box.dataset.states);
    const L = box.dataset;
    let state = L.start;
    let wait;

    const paint = () => {
      const v = input.value;
      cells.forEach((c, i) => {
        c.textContent = v[i] || '';
        c.classList.toggle('on', i === v.length && state !== 'checking' && state !== 'delivered');
      });
    };
    const set = (next, { fill = false } = {}) => {
      clearTimeout(wait);
      state = next;
      ui.dataset.state = next;
      if (fill) input.value = data[next].code;
      const left = 4 - input.value.length;
      hint.textContent = next === 'incomplete' ? (left === 1 ? L.leftOne : L.leftMany.replace('{n}', left)) : data[next].hint;
      const active = next === 'ready' || next === 'wrong' || next === 'offline';
      btn.setAttribute('aria-disabled', String(!active));
      btn.textContent = next === 'checking' ? L.lChecking : next === 'delivered' ? L.lDone : next === 'wrong' || next === 'offline' ? L.lRetry : L.lConfirm;
      input.readOnly = next === 'checking' || next === 'delivered';
      if (next === 'wrong') input.setAttribute('aria-invalid', 'true');
      else input.removeAttribute('aria-invalid');
      radios.forEach((r) => { r.checked = r.value === next; });
      notes.forEach((n) => { n.hidden = n.dataset.for !== next; });
      paint();
    };

    input.addEventListener('input', () => {
      input.value = input.value.replace(/\D/g, '').slice(0, 4);
      set(input.value.length === 0 ? 'empty' : input.value.length < 4 ? 'incomplete' : 'ready');
    });
    btn.addEventListener('click', () => {
      if (btn.getAttribute('aria-disabled') === 'true') {
        input.focus();
        return;
      }
      if (input.value.length < 4) return set('incomplete');
      set('checking');
      wait = setTimeout(() => set(input.value === '2748' ? 'delivered' : 'wrong'), 900);
    });
    radios.forEach((r) => r.addEventListener('change', () => set(r.value, { fill: true })));
    set(state, { fill: true });
  });

  // ------------------------------------------------------------ casos: índice y avance
  const bar = $('.cb');
  if (bar) {
    const details = $('.cb-d', bar);
    const now = $('[data-current]', bar);
    const fill = $('.cb-p i', bar);
    const secs = $$('.cs[data-label]');
    const links = new Map($$('.cb-d a', bar).map((a) => [a.getAttribute('href').slice(1), a]));
    const idle = now.textContent;
    let ticking = false;
    const update = () => {
      ticking = false;
      const max = root.scrollHeight - innerHeight;
      fill.style.setProperty('--p', max > 0 ? Math.min(1, scrollY / max).toFixed(4) : 0);
      let cur = null;
      for (const s of secs) if (s.getBoundingClientRect().top < innerHeight * 0.35) cur = s;
      now.textContent = cur ? cur.dataset.label : idle;
      links.forEach((a, id) => (cur && cur.id === id ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')));
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    addEventListener('resize', update);
    (window.requestIdleCallback || ((f) => setTimeout(f, 200)))(update);
    details.addEventListener('click', (e) => { if (e.target.closest('a')) details.open = false; });
    document.addEventListener('click', (e) => { if (details.open && !details.contains(e.target)) details.open = false; });
    details.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && details.open) {
        details.open = false;
        $('summary', details).focus();
      }
    });
  }

  // ------------------------------------------------------------ ampliar capturas
  const zooms = $$('[data-zoom]');
  if (zooms.length && window.HTMLDialogElement) {
    const es = root.lang === 'es';
    const dlg = document.createElement('dialog');
    dlg.className = 'zoom';
    dlg.setAttribute('aria-label', es ? 'Imagen ampliada' : 'Enlarged image');
    dlg.innerHTML = `<button type="button" class="zoom-x" aria-label="${es ? 'Cerrar' : 'Close'}"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button><img alt=""/>`;
    document.body.append(dlg);
    const img = $('img', dlg);
    zooms.forEach((a) =>
      a.addEventListener('click', (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        img.src = a.href;
        img.alt = $('img', a).alt;
        dlg.showModal();
      })
    );
    dlg.addEventListener('click', (e) => { if (e.target === dlg || e.target.closest('.zoom-x')) dlg.close(); });
    dlg.addEventListener('close', () => img.removeAttribute('src'));
  }
})();
