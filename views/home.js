import { cierreActividadUsuario } from '../firebase/auth.js';

export const home = () => {
  const homeContent = `
  <nav class="nav">
    <img class="logo2"  src="img/travels.svg" width="220px" />
    <button class="nav-toggle"><i class="fa fa-bars"></i></button>
    <ul class="nav-menu">
      <li class="nav-menu-item">
        <a href="#/inicio" class="nav-menu-link nav-link"><img class="iconhead"   width=38px src="img/hogar.png" alt="inicio"></a>
        <p class"textheaderi"> Inicio </p>
      </li>
      <li class="nav-menu-item">
        <a href="#/mochileros" class="nav-menu-link nav-link"><img class="iconhead" width=57px src="img/mochileros.png" alt="viajeros"></a>
        <p class"textheaderi"> Mochileros </p>
      </li>
      <li class="nav-menu-item" id="perfilhead">
        <a href="#/perfil" class="nav-menu-link nav-link"><img class="iconhead"  width=38px src="img/useredit.png" alt="lugares"></a>
        <p class"textheaderi"> Editar Perfil </p>
      </li>
      <li class="nav-menu-item" id="sesionhead">
        <a id="cerrar-sesion" class="nav-menu-link nav-link"><img class="iconhead"  width=38px src="img/logout.png" alt="lugares"></a>
        <p class"textheaderi"> Cerrar Sesión </p>
      </li>
    </ul>
    <div class="burgerMenu">
      <div id='perfilView'>
        <img class="logomenuh"  src="img/user.png"/>
      </div>
      <div id='optionsAccount'>
        <a href="#/perfil">Editar Perfil</a><br><a id="cerrarSesion">Cerrar Sesion</a>
      </div>
    </div>
  </nav>`;
  const homeContainer = document.createElement('div');
  homeContainer.setAttribute('class', 'homeContainer');
  homeContainer.innerHTML = homeContent;

  function cerrado() {
    cierreActividadUsuario()
      .then(() => {
        sessionStorage.clear();
        window.location.hash = '#/signin';
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }
  const btnCerrarSesion1 = homeContainer.querySelector('#cerrarSesion');
  btnCerrarSesion1.addEventListener('click', cerrado);

  const btnCerrarSesion = homeContainer.querySelector('#cerrar-sesion');
  btnCerrarSesion.addEventListener('click', cerrado);
  return homeContainer;
};
