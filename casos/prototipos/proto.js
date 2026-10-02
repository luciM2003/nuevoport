// Utilidades compartidas de los prototipos: guardado local, avisos, hojas inferiores, fechas e íconos.
window.P = (() => {
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const copia = (x) => JSON.parse(JSON.stringify(x));

  // El estado de la demo vive en el navegador de quien la prueba. Si no hay almacenamiento, anda igual en memoria.
  function store(clave, inicial) {
    return {
      get() { try { const v = localStorage.getItem(clave); if (v) return JSON.parse(v); } catch (e) {} return copia(inicial); },
      set(v) { try { localStorage.setItem(clave, JSON.stringify(v)); } catch (e) {} },
      clear() { try { localStorage.removeItem(clave); } catch (e) {} }
    };
  }

  // Aviso breve. Con `accion` ({ label, fn }) suma un botón, por ejemplo "Deshacer".
  let tt;
  function toast(msg, accion) {
    const t = document.querySelector('.toast');
    t.textContent = msg;
    t.classList.toggle('accion', !!accion);
    if (accion) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'toast-btn';
      b.textContent = accion.label;
      b.addEventListener('click', () => { t.classList.remove('show'); accion.fn(); });
      t.appendChild(b);
    }
    t.classList.add('show');
    clearTimeout(tt);
    tt = setTimeout(() => t.classList.remove('show'), accion ? 5000 : 2600);
  }

  function cerrarSheet() { document.querySelectorAll('.sheet-wrap').forEach((x) => x.remove()); }
  function sheet(html) {
    cerrarSheet();
    const w = document.createElement('div');
    w.className = 'sheet-wrap';
    w.innerHTML = `<div class="sheet" role="dialog" aria-modal="true">${html}</div>`;
    w.addEventListener('click', (e) => { if (e.target === w) cerrarSheet(); });
    document.querySelector('.app').appendChild(w);
    const f = w.querySelector('input, button');
    if (f) f.focus({ preventScroll: true });
    return w;
  }
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') cerrarSheet(); });

  // Fechas en local, sin horas, como 'aaaa-mm-dd'.
  const ymd = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const desdeYmd = (s) => { const [a, m, d] = s.split('-').map(Number); return new Date(a, m - 1, d); };
  const sumarDias = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const hoy = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
  const fmt = (s, op) => new Intl.DateTimeFormat('es-AR', op).format(typeof s === 'string' ? desdeYmd(s) : s);
  const plata = (n) => (n < 0 ? '− ' : '') + '$ ' + Math.round(Math.abs(n)).toLocaleString('es-AR');

  // Número estable a partir de un texto: sirve para que los horarios ocupados no cambien al recargar.
  const hash = (s) => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };

  const sv = (d, extra = '') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${d}</svg>`;
  const I = {
    back: sv('<path d="M15 5l-7 7 7 7"/>'),
    close: sv('<path d="M6 6l12 12M18 6L6 18"/>'),
    home: sv('<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>'),
    cal: sv('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>'),
    file: sv('<path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4"/>'),
    user: sv('<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>'),
    search: sv('<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>'),
    plus: sv('<path d="M12 5v14M5 12h14"/>'),
    check: sv('<path d="M5 12l5 5 9-10"/>'),
    map: sv('<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>'),
    ticket: sv('<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M14 6v12" stroke-dasharray="2 2"/>'),
    chart: sv('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'),
    target: sv('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/>'),
    trash: sv('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),
    pin: sv('<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>'),
    clock: sv('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    card: sv('<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>'),
    heart: sv('<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>'),
    list: sv('<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>'),
    star: sv('<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" fill="currentColor" stroke="none"/>'),
    car: sv('<path d="M5 17h14M6 17l1.5-6h9L18 17M7 17v2M17 17v2"/><circle cx="8" cy="14" r=".5"/><circle cx="16" cy="14" r=".5"/>'),
    wifi: sv('<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 19.5h.01"/>'),
    del: sv('<path d="M21 5H9l-6 7 6 7h12z"/><path d="M17 9l-6 6M11 9l6 6"/>'),
    arrow: sv('<path d="M7 17L17 7M8 7h9v9"/>')
  };

  // Hora real en la barra de estado del marco.
  function reloj() {
    const s = document.querySelector('.status');
    if (!s) return;
    const f = () => { s.firstChild ? (s.firstChild.textContent = fmt(new Date(), { hour: '2-digit', minute: '2-digit', hour12: false })) : null; };
    s.prepend(document.createTextNode(''));
    f(); setInterval(f, 20000);
  }
  reloj();

  return { esc, store, toast, sheet, cerrarSheet, ymd, desdeYmd, sumarDias, hoy, fmt, plata, hash, I };
})();
