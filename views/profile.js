import { sessionStorageCall } from '../componentes/sessionStorage.js';

import {
  getPosts, getUserById, updateCreatorName, updateUser,
} from '../firebase/firestore.js';
import { shareImgPost } from '../firebase/storage.js';

let imagen = '';
export const profileView = async () => {
  const perfil = document.querySelector('#firstPerfil');
  perfil.style.display = 'none';

  const userObject = sessionStorageCall();

  // eslint-disable-next-line no-use-before-define
  tenplateEditProfile(userObject);
};

export function tenplateEditProfile(userObject) {
  const perfilContainer = document.getElementById('perfilUser');

  const perfilContent = `
    <div class="firstDivPerfil2">
      <div class="photoPerfil">
        <img id="imagenPerfil" class='imgPerfil' src="${userObject.profilePhoto}">
      </div>
      <h2 class="nombreuser">${userObject.name}</h2> 
      <div class="divPerfil">
    <div class="divPerfil">
      <h3><i class="fa fa-user"></i> Descripción</h3>
      <p>${userObject.description}</p>
    </div>
    <div class="divPerfil">
      <h3><i class="fa fa-globe"></i> País</h3>
      <p>${userObject.country}</p>
    </div>
    <div class="divPerfil">
      <h3><i class="fa fa-gratipay"></i> Intereses</h3>
      <p>${userObject.interest}</p>
    </div>
  </div>
      <button id='editPerfil'><i class="fa fa-pencil"></i> Editar perfil  </button>
      <dialog id='modalEdit'><dialog>
    </div>

      `;

  perfilContainer.innerHTML = perfilContent;

  const editPeril = perfilContainer.querySelector('#editPerfil');
  // eslint-disable-next-line no-use-before-define
  editPeril.addEventListener('click', editPerfilUser);
  return perfilContainer;
}

function addImage() {
  imagen = 'changeImage';

  const photo = document.querySelector('#imgPerfilModal');

  const read = new FileReader();
  const file = this.files;

  // eslint-disable-next-line func-names
  read.onload = function () {
    const result = this.result;
    const url = result;

    photo.src = url;
    // eslint-disable-next-line no-use-before-define
    // deleteBtnPreviewImg();
  };

  read.readAsDataURL(file[0]);
}

async function editPerfilUser() {
  const modalEdit = document.querySelector('#modalEdit');
  const userObject = sessionStorageCall();

  const perfilData = await getUserById(userObject.id, 'users');

  // eslint-disable-next-line no-use-before-define
  modalEdit.innerHTML = modalEditPerfil(
    perfilData.name,
    perfilData.description,
    perfilData.country,
    perfilData.interest,
    perfilData.profilePhoto,

  );

  if (!modalEdit.open) {
    modalEdit.showModal();
  }
  const cancelButton = document.querySelector('#cancelButton');
  cancelButton.addEventListener('click', () => {
    modalEdit.close();
  });

  // cambiar imagen
  const inputFile = document.querySelector('#inputImage');
  inputFile.addEventListener('change', addImage);

  const guardarButton = document.querySelector('#guardarButton');
  guardarButton.addEventListener('click', async () => {
    const chargingGif = document.querySelector('#modalCharginEdit');
    chargingGif.style.display = 'block';
    const chargingContainer = document.querySelector('#contentModal');
    chargingContainer.style.display = 'none';

    const namepefil = document.querySelector('#namepefil').value;
    const descriptionpefil = document.querySelector('#descriptionpefil').value;
    const paispefil = document.querySelector('#paispefil').value;
    const interesespefil = document.querySelector('#interesespefil').value;
    let photo = document.querySelector('#imagenPerfil').src;

    if (imagen === 'changeImage') {
      const file = inputFile.files[0];
      const url = file.name;
      await shareImgPost(url, file);
      /* --------obtener la url del post */
      photo = await shareImgPost(url, file);
      imagen = '';
    }
    const userStorage = {
      country: paispefil,
      description: descriptionpefil,
      id: userObject.id,
      interest: interesespefil,
      name: namepefil,
      profilePhoto: photo,
    };
    // llama otra vez a la funcion
    sessionStorage.setItem('USER', JSON.stringify(userStorage));
    const userObj = sessionStorageCall();
    tenplateEditProfile(userObj);

    updateUser(userObject.id, namepefil, descriptionpefil, paispefil, interesespefil, photo);
    modalEdit.close();

    const postsUser = await getPosts(userObj.id);
    postsUser.forEach((doc) => {
      updateCreatorName(doc.id, namepefil, photo);
    });
  });
}
export function modalEditPerfil(name, description, pais, intereses, photo) {
  const editModalContent = `
  <div id = "modalCharginEdit" style = "display:none">
    <p>Cargando ...</p>
    <img width="150px" height="100px" src="http://iepingenieria.edu.pe/images/Admision/cargando.gif"/>
  </div>
  <div id='contentModal'>
    <div >
      <div class="photoPerfil">
        <img id="imgPerfilModal" class='imgPerfil' src="${photo}">
      </div>
      <div class="inputFiles relative">
          <label for="compartirImg"></label>
          <input type="file"  id="inputImage" >
      </div>
      <input class="" id='namepefil' value='${name}'>
    </div>
    <div class="divPerfil">
      <div class="divPerfil">
        <h3><i class="fa fa-user"></i> Descripción</h3>
        <input id='descriptionpefil' value='${description}'>
      </div>
      <div class="divPerfil">
        <h3><i class="fa fa-globe"></i> País</h3>
        <input id='paispefil' value='${pais}'>
      </div>
      <div class="divPerfil">
        <h3><i class="fa fa-gratipay"></i> Intereses</h3>
        <input id='interesespefil' value='${intereses}'>
      </div>
    </div> 
    <div class="botonesProfile">
      <button id='guardarButton'>Guardar </button>
      <button id='cancelButton'>Cancelar</button>
    </div>
  </div>`;

  return editModalContent;
}
