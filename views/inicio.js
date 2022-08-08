// import { muroView } from './muro.js';
import { perfilView } from './perfil.js';

export function inicioView(changeMuro) {
  const mainContent = document.createElement('div');
  mainContent.setAttribute('id', 'mainContent');
  mainContent.appendChild(perfilView());
  mainContent.appendChild(changeMuro);

  /* menu estilos */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('nav-menu_visible');
  });
  return mainContent;
}
