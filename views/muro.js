export function muroView(primero) {
  const muro = document.createElement('div');
  muro.setAttribute('id', 'muroContainer');
  muro.appendChild(primero);
  return muro;
}
