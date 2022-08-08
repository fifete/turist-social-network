import { sessionStorageCall } from '../componentes/sessionStorage.js';
import { usersView } from '../firebase/firestore.js';

function templateUsersContent(name, description, interest, profilePhoto, country) {
  const userContent = `
      <div class="firstDivPerfil3">
            <div class="divperfilUser">
                <h2 class="nombreuser">${name}</h2> 
            </div>
            <div class="segDivPerfil">
              <div class="photoPerfil">
                <img id="imagenPerfil" class='imgPerfil' src="${profilePhoto}">
              </div>

              <div class="infoUser">
                
                <div class="divperfilUser">
                  <h4><i class="fa fa-user"></i> Descripción</h4>
                  <p class="infoDescription">${description}</p>
                </div>
                <div class="divperfilUser">
                  <h4><i class="fa fa-globe"></i> País</h4>
                  <p class="infoDescription">${country}</p>
                </div>
                <div class="divperfilUser">
                  <h4><i class="fa fa-gratipay"></i> Intereses</h4>
                  <p class="infoDescription">${interest}</p>
                </div>
              </div>
            </div>
      </div>
  
        `;
  return userContent;
}

function back() {
  usersView((querySnapshoot) => {
    /** Seleccionamos al container para añadir el usuario */
    const usersContainerGeneral = document.getElementById('divBackpackers');

    /** Creamos un div post content */
   /*  const userContainer = document.createElement('div');
    userContainer.setAttribute('class', 'userContainer');
    userContainer.innerHTML = ''; */
    usersContainerGeneral.innerHTML = '';

    querySnapshoot.forEach((element) => {
      const dato = element.data();
      const idUsuario = sessionStorageCall().id;
      const idUser = element.id;

      if (idUser !== idUsuario) {
        const postContent = templateUsersContent(
          dato.name,
          dato.description,
          dato.interest,
          dato.profilePhoto,
          dato.country,
        );
        usersContainerGeneral.innerHTML += postContent;
        // usersContainerGeneral.appendChild(userContainer);
      }

      // eslint-disable-next-line no-use-before-define
    });
  });
}

export function backpackersView() {
  const backpackers = document.createElement('div');
  backpackers.setAttribute('id', 'divBackpackers');

  back();
  return backpackers;
}
