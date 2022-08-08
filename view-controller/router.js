import { components } from '../views/index.js';

import { profileView } from '../views/profile.js';

export const changeTmp = (route) => {
  const mainSection = document.getElementById('container');
  mainSection.innerHTML = '';
  switch (route) {
    case '#/signin':
    case '': {
      mainSection.appendChild(components.signin());
      break;
    }

    case '#/signup': {
      mainSection.appendChild(components.signup());
      break;
    }

    case '#/inicio': {
      mainSection.appendChild(components.Home());
      mainSection.appendChild(components.inicio(components.muro(components.muroInicio())));
      // setTimeout(() => {
      // }, 5000);
      break;
    }
    case '#/mochileros': {
      mainSection.appendChild(components.Home());
      mainSection.appendChild(components.inicio(components.muro(components.mochileros())));

      break;
    }
    case '#/lugares': {
      mainSection.appendChild(components.Home());
      break;
    }
    case '#/perfil': {
      mainSection.appendChild(components.Home());
      mainSection.appendChild(components.inicio(components.muro(components.profile())));
      profileView();
      break;
    }
    default:
      mainSection.appendChild(components.error404());
      break;
  }
};
