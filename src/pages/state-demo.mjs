// Componente con todos sus estados: el código de entrega de MODO YA, reconstruido en HTML y CSS.
// Sin JavaScript se ve el estado "incompleto" con su explicación.
import { esc } from '../lib/html.mjs';

export function stateDemo(ctx) {
  const { t } = ctx;
  const states = [
    {
      id: 'empty', name: t('Empty', 'Vacío'), hint: t('Ask the customer for the 4-digit code.', 'Pedile al cliente el código de 4 dígitos.'),
      why: t('The button is visible but clearly unavailable, and the hint says what is missing.', 'El botón se ve, pero claramente no está disponible, y la ayuda dice qué falta.'),
      code: `<Button disabled={code.length < 4}>`
    },
    {
      id: 'incomplete', name: t('Incomplete', 'Incompleto'), hint: t('2 digits to go.', 'Faltan 2 dígitos.'),
      why: t('This was the finding: with one to three digits the button looked active and did nothing. Now the hint counts what is left.', 'Este era el hallazgo: con uno a tres dígitos el botón se veía activo y no hacía nada. Ahora la ayuda cuenta lo que falta.'),
      code: `hint = t('digitsLeft', { n: 4 - code.length })`
    },
    {
      id: 'ready', name: t('Ready', 'Listo'), hint: t('Ready to confirm.', 'Listo para confirmar.'),
      why: t('Only here does the action become primary. One decision per screen.', 'Recién acá la acción pasa a ser la principal. Una decisión por pantalla.'),
      code: `status = code.length === 4 ? 'ready' : 'incomplete'`
    },
    {
      id: 'checking', name: t('Checking', 'Verificando'), hint: t('Checking the code…', 'Verificando el código…'),
      why: t('The field locks, so the same delivery can’t be confirmed twice.', 'El campo se bloquea para que la misma entrega no se confirme dos veces.'),
      code: `<input readOnly={status === 'checking'} />`
    },
    {
      id: 'wrong', name: t('Wrong code', 'Código incorrecto'), hint: t('That code doesn’t match this order. Ask the customer to read it again.', 'Ese código no es de este pedido. Pedile al cliente que lo lea otra vez.'),
      why: t('It says what happened and what to do next. The digits stay, so they can be corrected.', 'Dice qué pasó y qué hacer. Los dígitos quedan, para poder corregirlos.'),
      code: `<input aria-invalid aria-describedby="hint" />`
    },
    {
      id: 'offline', name: t('Offline', 'Sin conexión'), hint: t('No connection. The delivery isn’t confirmed yet. The code stays here so you can retry.', 'Sin conexión. La entrega todavía no está confirmada. El código queda acá para reintentar.'),
      why: t('A second finding: with no network, a panel showed zeros and a green banner. An unknown result is never shown as a success.', 'Un segundo hallazgo: sin red, un panel mostraba ceros y un cartel verde. Un resultado desconocido nunca se muestra como éxito.'),
      code: `catch { setStatus(navigator.onLine ? 'wrong' : 'offline') }`
    },
    {
      id: 'delivered', name: t('Delivered', 'Entregado'), hint: t('Delivery confirmed.', 'Entrega confirmada.'),
      why: t('Only a confirmed response reaches this state.', 'A este estado sólo se llega con una respuesta confirmada.'),
      code: `if (res.ok) setStatus('delivered')`
    }
  ];
  const digits = { empty: '', incomplete: '27', ready: '2748', checking: '2748', wrong: '1234', offline: '2748', delivered: '2748' };
  const data = Object.fromEntries(states.map((s) => [s.id, { hint: s.hint, code: digits[s.id] }]));
  const start = 'incomplete';
  return `<div class="sd" data-demo data-start="${start}" data-states="${esc(JSON.stringify(data))}" data-left-one="${t('1 digit to go.', 'Falta 1 dígito.')}" data-left-many="${t('{n} digits to go.', 'Faltan {n} dígitos.')}" data-l-confirm="${t('Confirm delivery', 'Confirmar entrega')}" data-l-checking="${t('Checking', 'Verificando')}" data-l-retry="${t('Try again', 'Reintentar')}" data-l-done="${t('Delivered', 'Entregado')}">
<div class="sd-hd"><h3>${t('One component, seven states', 'Un componente, siete estados')}</h3><p>${t('Rebuilt for this page from a finding in MODO YA’s pre-launch review. Type a code (2748 is the right one) or choose a state.', 'Reconstruido para esta página a partir de un hallazgo en la revisión previa de MODO YA. Escribe un código (el correcto es 2748) o elige un estado.')}</p></div>
<div class="sd-g">
<fieldset class="sd-st"><legend>${t('State', 'Estado')}</legend>${states.map((s) => `<label><input type="radio" name="sd" value="${s.id}"${s.id === start ? ' checked' : ''}/><span>${s.name}</span></label>`).join('')}</fieldset>
<div class="sd-ui" data-state="${start}"><p class="sd-k">MODO YA Rider</p><p class="sd-t" id="sd-title">${t('Delivery code', 'Código de entrega')}</p>
<div class="sd-f"><input id="sd-code" type="text" inputmode="numeric" autocomplete="off" maxlength="4" pattern="[0-9]*" value="${digits[start]}" aria-labelledby="sd-title" aria-describedby="sd-hint"/><span aria-hidden="true"><i></i><i></i><i></i><i></i></span></div>
<p class="sd-h" id="sd-hint" role="status">${data[start].hint}</p>
<button type="button" class="sd-b" aria-disabled="true">${t('Confirm delivery', 'Confirmar entrega')}</button></div>
<div class="sd-in">${states.map((s) => `<div data-for="${s.id}"${s.id === start ? '' : ' hidden'}><p class="sd-l">${t('Decision', 'Decisión')}</p><p class="sd-w">${s.why}</p><p class="sd-l">${t('In code', 'En código')}</p><pre><code>${esc(s.code)}</code></pre></div>`).join('')}</div>
</div></div>`;
}
