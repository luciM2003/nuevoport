// Dispositivos dibujados en CSS con pantallas reales adentro. Todas las medidas internas van en
// unidades del propio dispositivo (cqw), así se ven igual en una miniatura y a pantalla completa.
//
// Un dispositivo puede tener varios cuadros (frames). Se muestra el primero; los demás viajan en un
// <template> y el reproductor (site.js) los carga recién cuando la escena está a la vista.
import { IMAGES, picture } from './html.mjs';

const STATUS = '<svg viewBox="0 0 62 14" aria-hidden="true" focusable="false"><path fill="currentColor" fill-rule="evenodd" d="M0 10.5h2.600V13H0zM4 8h2.600v5H4zM8 5h2.600v8H8zM12 2h2.600v11H12zM25 3.200c2.700 0 5.200 1 7.100 2.700l-1.500 1.600A8.300 8.300 0 0 0 25 5.400c-2.100 0-4.100.8-5.600 2.100l-1.500-1.600A10.500 10.500 0 0 1 25 3.200zm0 3.900c1.600 0 3.100.6 4.200 1.700l-1.500 1.600a4 4 0 0 0-5.400 0l-1.500-1.600A6.200 6.200 0 0 1 25 7.100zm0 3.800c.7 0 1.300.3 1.700.7L25 13.300l-1.700-1.700c.4-.4 1-.7 1.700-.7zM39.500 2h17A2.500 2.500 0 0 1 59 4.500v6a2.500 2.500 0 0 1-2.500 2.500h-17A2.500 2.500 0 0 1 37 10.500v-6A2.500 2.500 0 0 1 39.500 2zm0 1.200c-.7 0-1.300.6-1.300 1.300v6c0 .7.6 1.300 1.300 1.300h17c.7 0 1.300-.6 1.300-1.300v-6c0-.7-.6-1.300-1.300-1.300zM39.600 4.500h12.800v6H39.600zM60.200 5.700c.8.3 1.300 1 1.300 1.800s-.5 1.500-1.300 1.800z"/></svg>';

// Cómo se comporta la barra de estado de cada captura de teléfono:
// over: la captura ya dejó el espacio; own: la captura la trae; strip: va una franja propia arriba.
const BAR = [
  [/^modoya-[cr]-/, { mode: 'over', fg: '#111214', time: '20:14' }],
  [/^byd-m-/, { mode: 'strip', fg: '#fff', bg: 'linear-gradient(90deg,#17528a,#2266ac 50%,#3a9ee7)', time: '10:32' }],
  [/^padel-m-/, { mode: 'strip', fg: '#0d0e10', bg: '#f9f9f9', time: '18:05' }],
  [/^(turno|vino|alcancia)-/, { mode: 'own' }],
  [/^uco-/, { mode: 'own', island: true }]
];
const barOf = (img) => (BAR.find(([re]) => re.test(img)) || [0, { mode: 'own' }])[1];

const frames = (ctx, list, { sizes, eager, alt = '' }) => {
  const fr = (f, i) => {
    const on = f.on ? ` data-on="${f.on.join(' ')}"` : '';
    const scroll = f.scroll ? `;--sc:${f.scroll}` : '';
    return picture(ctx, f.img, { sizes, eager: eager && i === 0, alt: i === 0 ? alt : '', cls: `fr${i === 0 ? ' on' : ''}${f.scroll ? ' fr-sc' : ''}`, style: `--fa:${IMAGES[f.img].w}/${IMAGES[f.img].h}${scroll}`, data: on });
  };
  const [first, ...rest] = list;
  return fr(first, 0) + (rest.length ? `<template data-frames>${rest.map((f, i) => fr(f, i + 1)).join('')}</template>` : '');
};
const norm = (f) => (Array.isArray(f) ? f : [f]).map((x) => (typeof x === 'string' ? { img: x } : x));

export function phone(ctx, img, { sizes, cls = '', style = '', eager = false, alt = '' }) {
  const list = norm(img);
  const im = IMAGES[list[0].img];
  const bar = barOf(list[0].img);
  const ratio = list[0].crop || `${im.w}/${im.h}`;
  const st = bar.mode === 'own' ? '' : `<span class="dv-st dv-${bar.mode}" style="color:${bar.fg}${bar.bg ? `;background:${bar.bg}` : ''}"><b>${bar.time}</b>${STATUS}</span>`;
  return `<span class="dv dv-ph ${cls}"${style ? ` style="${style}"` : ''}><span class="dv-b"><span class="dv-s"${bar.mode === 'strip' ? ' data-strip' : ''}>${st}<span class="dv-f" style="--ar:${ratio}">${frames(ctx, list, { sizes, eager, alt })}</span>${bar.island ? '' : '<i class="dv-c"></i>'}<i class="dv-g"></i></span></span></span>`;
}

export function tablet(ctx, img, { sizes, cls = '', style = '', eager = false, alt = '' }) {
  const list = norm(img);
  const im = IMAGES[list[0].img];
  return `<span class="dv dv-tb ${cls}"${style ? ` style="${style}"` : ''}><span class="dv-b"><span class="dv-s"><span class="dv-f" style="--ar:${im.w}/${im.h}">${frames(ctx, list, { sizes, eager, alt })}</span><i class="dv-g"></i></span></span></span>`;
}

export function laptop(ctx, img, { sizes, cls = '', style = '', eager = false, alt = '' }) {
  const list = norm(img);
  return `<span class="dv dv-lt ${cls}"${style ? ` style="${style}"` : ''}><span class="dv-b"><span class="dv-s"><span class="dv-f" style="--ar:16/10">${frames(ctx, list, { sizes, eager, alt })}</span><i class="dv-g"></i></span></span><span class="dv-k"></span></span>`;
}

// Ventana de navegador. `url` es la dirección real del producto (o su nombre si no es pública).
export function browser(ctx, img, { sizes, cls = '', style = '', eager = false, alt = '', url = '', ratio }) {
  const list = norm(img);
  const im = IMAGES[list[0].img];
  return `<span class="dv dv-br ${cls}"${style ? ` style="${style}"` : ''}><span class="dv-bar"><i></i><i></i><i></i>${url ? `<b>${url}</b>` : ''}</span><span class="dv-s"><span class="dv-f" style="--ar:${ratio || `${im.w}/${im.h}`}">${frames(ctx, list, { sizes, eager, alt })}</span></span></span>`;
}

export const DEVICES = { ph: phone, tb: tablet, lt: laptop, br: browser };
