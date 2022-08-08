import { sessionStorageCall } from '../componentes/sessionStorage.js';
import {
  actualizarPosts,
  getUserById,
  updateLikes,
  deletePost,
  updatePost,
} from '../firebase/firestore.js';

import { shareImgPost } from '../firebase/storage.js';

let count = '';
export function templatePostContent(
  idPost,
  photo,
  name,
  date,
  privacy,
  country,
  userId,
  content,
  imgPost,
  likesCount,
) {
  const postContent = `
  <div class="postindividual" id='${idPost}'>

    <div class="postNameImage">
      <img class="iconpost" src="${photo}" width="50px">
      <div class="divtitulopost">
        <h3 class="namepost">${name}  </h3>
        <p class="country">esta en ${country} </p>
        <span class="datepost"> ${date}</span>
        <span class="datepost"> ${privacy}</span>
      </div>
      <div class = "editPostIcon" id = ${userId} data-id = "${idPost}"></div>
    </div>

    <div class="postText">
    <p class="texto" contenteditable = "false"> ${content} </p>

    </div>
    <div class="imgpost">
    <img class="imgposted" src='${imgPost}'>
    </div>

    <div class="postReaction">
      <i class="fa fa-heart like" name="${idPost}"> </i> 
      <h3> ${likesCount} me gusta</h3>
    </div>

    <div id="containerDelete"></div>
  </div>`;

  return postContent;
}

export function templateEditPost(idCurrentPost) {
  const iconOptionsContent = `
    <span class="icon-edit">
      <i class="fa fa-ellipsis-v"></i>
    </span>
    <div class="tooltip hide" style = "position: absolute">
      <span id = "update-post" data-id = ${idCurrentPost}>Editar</span>
      <span id = "delete-post" data-id = ${idCurrentPost}>Eliminar</span>
    </div> 
  `;
  return iconOptionsContent;
}

export const updatePostClick = (divOptions, postContainer) => {
  const updateOpt = divOptions.querySelector('#update-post');

  updateOpt.addEventListener('click', (e) => {
    const idPostBtn = e.target.dataset.id;

    const postindividual = postContainer.querySelectorAll('.postindividual');

    postindividual.forEach(async (post) => {
      if (idPostBtn === post.id) {
        const modalContainerEdit = document.querySelector('#modalEditContainer');

        // Traer los datos actuales del post
        const postData = await getUserById(post.id, 'posts');
        // postData.imgPost,
        // eslint-disable-next-line no-use-before-define
        modalContainerEdit.innerHTML = templateEditModal(
          postData.publication,
          postData.imgPost,
          // postData.country,
          // postData.privacy,
        );

        if (!modalContainerEdit.open) {
          modalContainerEdit.showModal();
        }

        // Capturar los nuevos datos ingresados
        const inputFile = document.querySelector('#inputSelectImg');

        // eslint-disable-next-line no-use-before-define
        let urlImage = postData.imgPost;

        // eslint-disable-next-line no-use-before-define
        inputFile.addEventListener('change', addImage);

        if (postData.imgPost === '') {
          const imgLoad = document.getElementById('oldImgContainer');
          imgLoad.innerHTML = '';
        } else {
          const deleteImage = document.querySelector('#deleteImageOld');
          deleteImage.addEventListener('click', () => {
            urlImage = '';
            const imgLoad = document.getElementById('oldImgContainer');
            imgLoad.innerHTML = '';
          });
        }
        modalContainerEdit.querySelector('#saveUpdate').addEventListener('click', async () => {
          const chargingGif = document.querySelector('#modalCharginEdit');
          const chargingContainer = document.querySelector('#chargingContainer');
          chargingContainer.style.display = 'none';
          chargingGif.style.display = 'block';

          if (inputFile.files.length > 0) {
            if (count === 'changeImage') {
              const file = inputFile.files[0];
              const url = file.name;
              await shareImgPost(url, file);

              /* --------obtener la url del post */
              urlImage = await shareImgPost(url, file);
              count = '';
            }
          }
          const pContentPost = document.querySelector('#inputUpdatedText').value;

          updatePost(post.id, pContentPost, urlImage);

          modalContainerEdit.close();
        });

        // Cerrar modal con boton cancelar
        modalContainerEdit.querySelector('#cancelUpdate').addEventListener('click', () => {
          // updatePost(post.id, pContentPost.textContent, urlImage);
          modalContainerEdit.close();
          count = '';
        });
      }
    });
  });
};

function addImage() {
  count = 'changeImage';

  const divAddImage = document.getElementById('addImageContainer');

  const imageContainer = '<div class=\'imageContainer\' id="imageContainer"></div>';

  divAddImage.innerHTML = imageContainer;

  const imagen = document.createElement('img');

  const iconX = document.createElement('span');
  iconX.setAttribute('id', 'deleteBtnImg');
  iconX.innerHTML = '✖';
  iconX.classList.add('closeImg');

  const read = new FileReader();
  const file = this.files;

  // eslint-disable-next-line func-names
  read.onload = function () {
    const result = this.result;
    const url = result;
    imagen.src = url;
    const newImageContainer = document.querySelector('#imageContainer');
    newImageContainer.appendChild(imagen);
    newImageContainer.appendChild(iconX);
    // eslint-disable-next-line no-use-before-define
    deleteBtnPreviewImg();
  };

  // Reemplazar la imagen del post por la nueva seleccionada
  if (document.getElementById('oldImgContainer')) {
    const oldImgContainer = document.getElementById('oldImgContainer');
    oldImgContainer.style.display = 'none';
  }
  read.readAsDataURL(file[0]);
}

function deleteBtnPreviewImg() {
  /* Borrando la imagen del modal */
  const deleteBtnImage = document.getElementById('deleteBtnImg');
  deleteBtnImage.addEventListener('click', () => {
    const imgContainer = document.getElementById('addImageContainer');
    imgContainer.innerHTML = '';
    const cleanInputFile = document.getElementById('inputSelectImg');
    cleanInputFile.value = '';
  });
}

export const templateDeleteModal = () => {
  const deleteModalContent = `<div id="modalDeletePost" class="modalDeletePost">
    <img class="gatitoWarning" src="img/triste.png">
    <p class="modalTitleDelete">¿Estás seguro que deseas eliminar?</p>
    <div class= "btnsDeleteCancel">
      <button type="button" class="btnPost" id="deletePost">Eliminar</button>
      <button type="button" class="buttonPublication2" id="closeModal">Cancelar</button>
    </div>
  </div>`;

  return deleteModalContent;
};

export const deletePostClick = (divOptions) => {
  const deleteOpt = divOptions.querySelector('#delete-post');
  deleteOpt.addEventListener('click', (e) => {
    const idPostBtn = e.target.dataset.id;

    // Crear modal

    const modalContainer = document.querySelector('#modalContainer');
    modalContainer.innerHTML = templateDeleteModal();

    if (!modalContainer.open) {
      modalContainer.showModal();
    }
    // Seleccionar btn cancelar y eliminar post
    modalContainer.querySelector('#closeModal').addEventListener('click', () => {
      modalContainer.close();
    });
    modalContainer.querySelector('#deletePost').addEventListener('click', () => {
      deletePost(idPostBtn);
      modalContainer.close();
    });
  });
};

export const templateEditModal = (
  textPost,
  imgUrl,
) => {
  const editModalContent = `
  <div id = "modalCharginEdit" style = "display:none">
    <p>Cargando ...</p>
    <img width="150px" height="100px" src="http://iepingenieria.edu.pe/images/Admision/cargando.gif"/>
  </div>
  <div id='chargingContainer'>
    <div id="postForm2">
      <textarea placeholder="Escribe Algo ..." id='inputUpdatedText'>${textPost}</textarea>
    
      <div class="divcameraUpdate">
        <div class="inputFiles relative">
          <label for="compartirImg"></label>
          <input type="file"  id="inputSelectImg" >
        </div>
        <div class="textimgUp"><h4 > Cambia tu imagen </h4></div>
      </div>

      <div id="addImageContainer" class = "containerPreviewImg">
        <div id="oldImgContainer" class = "imageContainer">
          <img src = ${imgUrl}/>
          <span id = "deleteImageOld" class='closeImg'>✖</span>
        </div>
      </div>

      <div class="buttonGeneralPublicationUpdate">
        <button id = "saveUpdate" class="buttonPublication" type="submit">Guardar</button>
        <button id = "cancelUpdate" class="buttonPublication">Cancelar</button>
      </div>
    </div>
  </div>`;

  return editModalContent;
};

// Al apretar los ... el usuario puede seleccionar editar o eliminar su post
export function editPostOptions(postContainer) {
  const iconEditPost = document.querySelectorAll('.editPostIcon');
  iconEditPost.forEach((iconOptions) => {
    const idCurrentPost = iconOptions.dataset.id;
    if (iconOptions.id === sessionStorageCall().id) {
      // const iconEditOptions = document.querySelector('.icon')
      // eslint-disable-next-line no-param-reassign
      iconOptions.innerHTML = templateEditPost(idCurrentPost);
      iconOptions.addEventListener('click', () => {
        const tooltip = iconOptions.querySelector('.tooltip');
        tooltip.classList.toggle('hide');
        deletePostClick(tooltip);
        updatePostClick(tooltip, postContainer);
      });
    }
  });
}

async function likesHandler(e) {
  const btnLike = e.target;
  const idUser = sessionStorageCall().id;
  const idPost = btnLike.getAttribute('name');
  const dataPost = await getUserById(idPost, 'posts');

  if (await dataPost.likes.includes(idUser)) {
    // esto es para quitar el like por usuario
    await updateLikes(
      idPost,
      await dataPost.likes.filter((item) => item !== idUser),
    );
  } else {
    // esto es para agregar like por usuario
    await updateLikes(idPost, [...dataPost.likes, idUser]);
  }
}
export const postView = async () => {
  actualizarPosts((querySnapshoot) => {
    /** Seleccionamos al container para añadir el post */

    const postContainer = document.querySelector('#postContainer');
    console.log(postContainer);
    /** Creamos un div para el modal */
    const modalContainer = `<dialog id="modalContainer">
     </dialog><dialog id="modalEditContainer"></dialog>`;
    if (postContainer != null) {
      postContainer.innerHTML = modalContainer;
    }

    /** Creamos un div post content */
    const postContainerGeneral = document.createElement('div');
    postContainerGeneral.setAttribute('class', 'postsContent');
    postContainerGeneral.innerHTML = '';

    querySnapshoot.forEach((element) => {
      const dato = element.data();

      const idPost = element.id;

      const likesCount = dato.likes.length;

      const postContent = templatePostContent(
        idPost,
        dato.photoCreator,
        dato.nameCreator,
        dato.dateTime,
        dato.privacy,
        dato.country,
        dato.userId,
        dato.publication,
        dato.imgPost,
        likesCount,
      );
      postContainerGeneral.innerHTML += postContent;
      if (postContainer != null) {
        postContainer.appendChild(postContainerGeneral);

        // eslint-disable-next-line no-use-before-define
        verifyLike(dato.likes, element.id);
      }

      // eslint-disable-next-line no-use-before-define
    });
    editPostOptions(postContainer);

    const buttonLikes = document.querySelectorAll('.like');
    buttonLikes.forEach((likeIcon) => {
      likeIcon.addEventListener('click', likesHandler);
    });
  });
};

const verifyLike = (arrLikesPost, idPost) => {
  const idUser = sessionStorageCall().id;
  const containerPost = document.getElementById(`${idPost}`);
  if (arrLikesPost.includes(idUser)) {
    containerPost.childNodes[7].classList.add('clickeado');
  } else {
    containerPost.childNodes[7].classList.add('noclickeado');
  }
};
