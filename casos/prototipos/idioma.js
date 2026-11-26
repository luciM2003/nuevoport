// Idioma de los prototipos. Comparte la preferencia con el resto del sitio.
(function () {
  function setIdioma(nuevo, guardar) {
    const idioma = nuevo === 'es' ? 'es' : 'en';
    document.documentElement.lang = idioma;
    document.querySelectorAll('[data-set-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.setLang === idioma)));
    document.querySelectorAll('[data-href-en]').forEach((a) => { a.href = a.dataset[idioma === 'es' ? 'hrefEs' : 'hrefEn']; });
    const t = document.querySelector('meta[name="title-' + idioma + '"]');
    if (t) document.title = t.content;
    window.dispatchEvent(new Event('idioma'));
    if (guardar) {
      try {
        localStorage.setItem('lm-lang', idioma);
        localStorage.setItem('language', idioma);
      } catch (e) {}
    }
  }
  document.querySelectorAll('[data-set-lang]').forEach((b) => b.addEventListener('click', () => setIdioma(b.dataset.setLang, true)));
  let previo = null;
  try { previo = localStorage.getItem('lm-lang') || localStorage.getItem('language'); } catch (e) {}
  const parametros = new URLSearchParams(location.search);
  if (parametros.has('embed')) document.documentElement.classList.add('embed');
  const pedido = parametros.get('lang');
  setIdioma(pedido === 'en' || pedido === 'es' ? pedido : previo || ((navigator.language || 'en').toLowerCase().startsWith('es') ? 'es' : 'en'), false);
})();
