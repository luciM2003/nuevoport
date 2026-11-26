import { esc } from './html.mjs';
import { DEVICES, phone } from './device.mjs';

// Fila de pantallas de teléfono. Se puede recorrer con teclado cuando no entra en el ancho.
export function phones(ctx, label, items, { bg = '', fg = '' } = {}) {
  const li = items.map((i) => `<li><figure>${phone(ctx, i.img, { alt: i.alt, sizes: '(min-width: 1100px) 230px, 62vw' })}<figcaption><b>${i.title}</b> <span>${i.text}</span></figcaption></figure></li>`);
  return `<div class="phones${bg ? ' phones-bg' : ''}" role="region" aria-label="${esc(label)}" tabindex="0"${bg ? ` style="background:${bg}${fg ? `;--cap:${fg}` : ''}"` : ''}><ol style="--n:${items.length}">${li.join('')}</ol></div>`;
}

// Un dispositivo grande sobre un fondo con el color del producto.
export function showcase(ctx, kind, img, { title, text = '', alt, bg }) {
  return `<figure class="shw"><div class="shw-b shw-${kind}" style="background:${bg}">${DEVICES[kind](ctx, img, { alt, sizes: '(min-width: 1100px) 820px, 88vw' })}</div><figcaption><b>${title}</b>${text ? ` <span>${text}</span>` : ''}</figcaption></figure>`;
}
