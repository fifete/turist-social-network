import { sessionStorageCall } from '../componentes/sessionStorage.js';

export const perfilView = () => {
  const userObject = sessionStorageCall();
  const perfilContent = `
    
    <div class="firstDivPerfil">
      <div class="photoPerfil">
        <img id="imgPerfil" src="${userObject.profilePhoto}">
      </div>
      <h2 class="nombreuser">${userObject.name}</h2> 
    </div>
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

      `;
  const perfilContainer = document.createElement('section');
  perfilContainer.setAttribute('class', 'sectionPerfil');
  perfilContainer.setAttribute('id', 'firstPerfil');
  perfilContainer.innerHTML = perfilContent;

  return perfilContainer;
};
