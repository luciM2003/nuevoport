// Utilidades compartidas de los prototipos: guardado local, avisos, hojas inferiores, fechas e íconos.
window.P = (() => {
  const en = () => document.documentElement.lang === 'en';
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
    t.textContent = tr(msg);
    t.classList.toggle('accion', !!accion);
    if (accion) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'toast-btn';
      b.textContent = tr(accion.label);
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
    w.innerHTML = T(`<div class="sheet" role="dialog" aria-modal="true">${html}</div>`);
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
  const fmt = (s, op) => new Intl.DateTimeFormat(en() ? 'en-US' : 'es-AR', op).format(typeof s === 'string' ? desdeYmd(s) : s);
  const plata = (n) => (n < 0 ? '− ' : '') + (en() ? '$' : '$\u00a0') + Math.round(Math.abs(n)).toLocaleString(en() ? 'en-US' : 'es-AR');

  // Número estable a partir de un texto: sirve para que los horarios ocupados no cambien al recargar.
  const hash = (s) => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };

  // Traducción de la interfaz: cada prototipo carga su diccionario con P.textos(). Las claves son
  // los textos en español; las que llevan números o nombres usan expresiones regulares.
  let dic = {};
  let reglas = [];
  const faltan = new Set();
  function textos(d, r) { dic = d; reglas = r || []; }
  function tr(x) {
    if (!en()) return x;
    const m = String(x).match(/^(\s*)([\s\S]*?)(\s*)$/);
    const k = m[2].replace(/\s+/g, ' ');
    if (!k || !/[a-záéíóúñ]|^\d,\d$/i.test(k)) return x;
    if (k in dic) return m[1] + dic[k] + m[3];
    for (const [re, a] of reglas) if (re.test(k)) return m[1] + k.replace(re, (...g) => (typeof a === 'function' ? a(...g) : a.replace(/\$(\d)/g, (_, i) => g[i]))) + m[3];
    faltan.add(k);
    return x;
  }
  function T(html) {
    if (!en()) return html;
    const t = document.createElement('template');
    t.innerHTML = html;
    const w = document.createTreeWalker(t.content, NodeFilter.SHOW_TEXT);
    const nodos = [];
    while (w.nextNode()) nodos.push(w.currentNode);
    nodos.forEach((n) => { const v = tr(n.nodeValue); if (v !== n.nodeValue) n.nodeValue = v; });
    t.content.querySelectorAll('[aria-label], [placeholder]').forEach((e) => ['aria-label', 'placeholder'].forEach((a) => e.hasAttribute(a) && e.setAttribute(a, tr(e.getAttribute(a)))));
    return t.innerHTML;
  }

  // Retratos ilustrados: formas simples, sin usar fotos de personas.
  const PIEL = ['#f2c9a8', '#e0a97e', '#c98a5e', '#f6d7bd'];
  const PELO = ['#2d2119', '#5a3b22', '#8a5a2f', '#1c1c22', '#b9a48c'];
  function avatar(semilla, { fondo = '#dfe9fb', bata = true, cls = '', corte: fijo } = {}) {
    const h = hash(semilla);
    const piel = PIEL[h % PIEL.length];
    const pelo = PELO[(h >>> 3) % PELO.length];
    const corte = fijo != null ? fijo : /^Dr\./.test(semilla) ? 1 : [0, 2, 3][(h >>> 6) % 3];
    const atras = [
      '<path d="M14 25c0-9 4-15 10-15s10 6 10 15v12H14z" fill="P"/>',
      '<path d="M15.500 24c0-8 3.500-12.500 8.500-12.500S32.500 16 32.500 24z" fill="P"/>',
      '<path d="M13.500 27c-1-10 3.500-17 10.500-17s11.500 7 10.500 17l-1.500 8h-18z" fill="P"/>',
      '<circle cx="24" cy="8.500" r="4.200" fill="P"/><path d="M15.500 24c0-8.500 3.500-13 8.500-13s8.500 4.500 8.500 13z" fill="P"/>'
    ][corte].replace(/P/g, pelo);
    const frente = [
      '<path d="M16.500 22c.5-6 3.500-8.500 7.500-8.500s7 2.500 7.500 8.500c-2-3.500-5-4.500-9-4.500-2.500 0-4.500 1.500-6 4.500z" fill="P"/>',
      '<path d="M16.500 21.500c0-6 3-9 7.500-9s7.500 3 7.500 9c-1.500-3-3-4-4.500-4-3 1-7 1-8 .5-1 .5-2 1.500-2.500 3.500z" fill="P"/>',
      '<path d="M16.500 23c.5-6.500 3-9.500 7.500-9.500 4.500 0 7 3 7.500 9.500-2.500-1-5.500-3.500-6.500-6-1.500 3-5 5.500-8.500 6z" fill="P"/>',
      '<path d="M16.500 22c.3-5.500 3-8 7.500-8s7.200 2.500 7.500 8c-3-3.800-12-3.800-15 0z" fill="P"/>'
    ][corte].replace(/P/g, pelo);
    const ropa = bata ? '<path d="M9 48c0-9 6-13.500 15-13.500S39 39 39 48z" fill="#fff"/><path d="M20.500 34.800 24 41l3.500-6.200-3.500-.4z" fill="#8fb4e8"/><path d="M20.500 34.800 17 37l5 7zM27.500 34.800 31 37l-5 7z" fill="#e7edf5"/>' : '<path d="M9 48c0-9 6-13.500 15-13.500S39 39 39 48z" fill="#3b4252"/>';
    return `<span class="av ${cls}" aria-hidden="true"><svg viewBox="0 0 48 48"><rect width="48" height="48" fill="${fondo}"/>${atras}${ropa}<path d="M21 29h6v5.500c0 1.700-1.300 3-3 3s-3-1.300-3-3z" fill="${piel}"/><ellipse cx="24" cy="23" rx="7.200" ry="8.400" fill="${piel}"/>${frente}<circle cx="21.300" cy="23.600" r=".9" fill="#2b211b"/><circle cx="26.700" cy="23.600" r=".9" fill="#2b211b"/><path d="M21.400 27.300c1.600 1.500 3.600 1.500 5.200 0" fill="none" stroke="#9b5a45" stroke-width="1" stroke-linecap="round"/></svg></span>`;
  }

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
    bell: sv('<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>'),
    cup: sv('<path d="M4 9h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM17 10h2a2.500 2.500 0 0 1 0 5h-2M8 3v2M12 3v2"/>'),
    fork: sv('<path d="M7 3v7a2 2 0 0 0 2 2v9M5 3v5M9 3v5M11 3v7a2 2 0 0 1-2 2M17 3c-2 1-3 4-3 7 0 2 1 3 3 3v8"/>'),
    cart: sv('<path d="M3 4h2l2.500 11h10L20 7H6.500"/><circle cx="9" cy="19" r="1.500"/><circle cx="16.500" cy="19" r="1.500"/>'),
    bus: sv('<rect x="4" y="4" width="16" height="13" rx="3"/><path d="M4 11h16M8 17v3M16 17v3M8 14h.01M16 14h.01"/>'),
    spark: sv('<path d="M12 3l1.800 5.200L19 10l-5.200 1.800L12 17l-1.800-5.200L5 10l5.200-1.800zM19 16l.8 2.200L22 19l-2.200.8L19 22l-.8-2.200L16 19l2.200-.8z"/>'),
    bulb: sv('<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.500 10.900c.6.500 1 1.300 1 2.100h5c0-.8.400-1.600 1-2.100A6 6 0 0 0 12 3z"/>'),
    up: sv('<path d="M6 15l6-6 6 6"/>'),
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

  return { en, T, tr, textos, faltan, avatar, esc, store, toast, sheet, cerrarSheet, ymd, desdeYmd, sumarDias, hoy, fmt, plata, hash, I };
})();
