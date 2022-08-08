import { postView } from './posts.js';
import { publicationView } from './publications.js';

export function muroInicioView() {
  const muroInicio = document.createElement('div');
  muroInicio.setAttribute('id', 'divContainer');
  muroInicio.appendChild(publicationView());

  const postContainer = document.createElement('div');
  postContainer.setAttribute('id', 'postContainer');
  muroInicio.appendChild(postContainer);
  postView();
  return muroInicio;
}
