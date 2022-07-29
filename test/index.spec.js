import { components } from '../src/views';

jest.mock('../src/firebase/auth.js');
jest.mock('../src/firebase/firestore.js');
jest.mock('../src/firebase/firebaseconfig.js');

describe('formSigin', () => {
  it('Deberia mostrar un error si se da click en iniciar sesion sin llenar los campos', () => {
    // DADO
    const mainSection = document.createElement('div');
    mainSection.id = 'container';
    document.body.append(mainSection);
    mainSection.appendChild(components.signin());

    const buttonLogin = document.querySelector('#btn-signin');

    expect(buttonLogin instanceof HTMLElement).toBe(true);
    // obtener el boton
    // const inputEmail = document.querySelector('#email');
    // const inputPassword = document.querySelector('#password');
    // inputEmail.value = '';
    // inputPassword.value = '';
    // CUANDO
    buttonLogin.click();

    const complete = document.querySelector('#complete');
    // ENTONCES
    expect(complete.textContent).toEqual('Completa todos los datos');
    // verificar que el mensaje de error este dentro del documento
  });
  it.only('Deberia pasar', async () => {
    // DADO
    const mainSection = document.createElement('div');
    mainSection.id = 'container';
    document.body.append(mainSection);
    mainSection.appendChild(components.signin());

    const buttonLogin = document.querySelector('#btn-signin');

    // expect(buttonLogin instanceof HTMLElement).toBe(true);
    // obtener el boton
    // global.window = Object.create(window);
    // Object.defineProperty(window, 'location', {
    //   value: {
    //     hash: '',
    //   },
    // });
    // CUANDO
    const inputEmail = document.querySelector('#email');
    const inputPassword = document.querySelector('#password');
    inputEmail.value = 'hola@gmail.com';
    inputPassword.value = 'holamundo';
    // const complete = document.querySelector('#complete');
    buttonLogin.click();

    // ENTONCES
    expect(window.location.hash).toBe('#/inicio');
    // verificar que el mensaje de error este dentro del documento
  });
  // it('Deber', () => {
  //   expect(formSignIn()).toBe('function');
  // });
});
