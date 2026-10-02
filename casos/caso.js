// Comportamiento compartido de los casos de estudio: idioma, barra de progreso y aparición al hacer scroll.
(function () {
  // Idioma: mismo criterio y misma clave que la página principal, así se mantiene al ir y volver.
  function setIdioma(nuevo) {
    const idioma = nuevo === 'en' ? 'en' : 'es';
    document.documentElement.lang = idioma;
    document.querySelectorAll('[data-set-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.setLang === idioma)));
    document.querySelectorAll('[data-href-lang]').forEach((a) => {
      const [ruta, ancla] = a.dataset.hrefLang.split('#');
      a.href = ruta + (idioma === 'en' ? '?lang=en' : '') + (ancla ? '#' + ancla : '');
    });
    const t = document.querySelector('meta[name="title-' + idioma + '"]');
    if (t) document.title = t.content;
    try { localStorage.setItem('language', idioma); } catch (e) {}
  }
  document.querySelectorAll('[data-set-lang]').forEach((b) => b.addEventListener('click', () => setIdioma(b.dataset.setLang)));
  let guardado = null;
  try { guardado = localStorage.getItem('language'); } catch (e) {}
  const pedido = new URLSearchParams(location.search).get('lang');
  setIdioma((pedido === 'en' || pedido === 'es' ? pedido : null) || guardado || ((navigator.language || 'es').toLowerCase().startsWith('es') ? 'es' : 'en'));

  // Barra de progreso de lectura.
  const barra = document.querySelector('.progress');
  if (barra) {
    const actualizar = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      barra.style.width = (max > 0 ? Math.min(100, (scrollY / max) * 100) : 0) + '%';
    };
    addEventListener('scroll', actualizar, { passive: true });
    addEventListener('resize', actualizar);
    actualizar();
  }

  // Aparición suave. Si no hay IntersectionObserver o se pide menos movimiento, todo queda visible.
  const items = document.querySelectorAll('.rv');
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach((el) => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entradas) => {
    entradas.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -8% 0px' });
  items.forEach((el) => io.observe(el));
})();
