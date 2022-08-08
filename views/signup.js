/* eslint-disable no-param-reassign */
// vista de registro, es SIGNUP
/* <button><a href="#/home">Registrarse</a></button> */

import { createNewUser } from '../firebase/firestore.js';
import { addUser, cierreActividadUsuario, emailVerificationHandler } from '../firebase/auth.js';

export const formSignUp = () => {
  const signUpContent = `
  <section class="back-principal">
    <div id="mobilediv" >
    </div>
    <form id = "signUpForm">
        <div class="imgLogo">
            <img  class="logo1" src="img/viajeros.png" width="200px"/>
        </div>
        <label id="complete"></label>
        <input type= "text" placeholder= " Nombre" id ="name"  Required>
        <label id="nameAlert"></label>
        <input type="email" placeholder="  Correo Electrónico" id = "email" Required>
        <label id="invalidEmail"></label>
        <input type="password" placeholder="  Contraseña" id = "password" Required>
        <label id="invalidPassword"></label>
        <div class="termsConditions">
            <p class="smallText" id="termConditionsP">Acepto los <span>Términos y condiciones</span> de las Políticas de Privacidad.</p>
        </div>
        <button type= "submit" id ="btn-signup">Registrarse</button>
        <p class="smallText">¿Ya tienes una cuenta? <a href="#/signin">Inicia sesión</a></p>
       
    </form>
    </section>
    `;
  const signUpContainer = document.createElement('div');
  signUpContainer.innerHTML = signUpContent;

  // eslint-disable-next-line no-use-before-define
  signUpContainer.querySelector('#btn-signup').addEventListener('click', signUpHandler);

  return signUpContainer;
};

// Limpiar los mensajes de alerta dados al user
export const cleanErrorMsm = (containerMsm) => {
  setTimeout(() => {
    containerMsm.innerHTML = '';
  }, 4000);
};

function verifyCompletedInput(name, email, password) {
  const invalidEmail = document.querySelector('#invalidEmail');
  const complete = document.querySelector('#complete');
  if (name === '' || email === '' || password === '') {
    complete.innerHTML = 'Completa todos los datos';
    cleanErrorMsm(complete);
  }
  if (email !== '') {
    const expressionemail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (expressionemail.test(email) === false) {
      invalidEmail.innerHTML = 'Ingrese un correo válido';
      cleanErrorMsm(invalidEmail);
    }
  }
}

export const signUpHandler = (e) => {
  cierreActividadUsuario();
  // sessionStorage.clear();
  e.preventDefault();

  const invalidPassword = document.querySelector('#invalidPassword');
  const invalidEmail = document.querySelector('#invalidEmail');

  const inputName = document.querySelector('#name');
  const inputEmail = document.querySelector('#email');
  const inputPassword = document.querySelector('#password');

  const name = inputName.value;
  const email = inputEmail.value;
  const password = inputPassword.value;

  verifyCompletedInput(name, email, password);

  addUser(email, password)
    .then((userCredential) => {
      // Agregar nuevo user
      const user = userCredential.user;
      const emailRegister = user.email;
      const userIdRegister = user.uid;

      emailVerificationHandler().then(() => {
        createNewUser(name, emailRegister, userIdRegister, '../img/user.png');
        // pos antigua
      });
      window.location.hash = '#/signin';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      /* Mostrar errores al usuario al momento del registro de su cuenta  */
      if (error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
        invalidPassword.innerHTML = 'La contraseña debe tener al menos 6 caracteres';
        cleanErrorMsm(invalidPassword);
      } else if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
        invalidEmail.innerHTML = 'El correo está asociado a una cuenta existente';
        cleanErrorMsm(invalidEmail);
      } else {
        console.log('error en signup', errorMessage, errorCode);
      }
    });
};
