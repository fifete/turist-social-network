// Llamar a sessionStorage
export const sessionStorageCall = () => {
  let userObject = sessionStorage.getItem('USER');
  userObject = JSON.parse(sessionStorage.USER);

  return userObject;
};

// export const validateSessionStorage = () => {
//   let userData = sessionStorage.getItem('userSession');
//   // console.log(userData);
//   if (!userData) {
//     userData = {
//       username: '',
//       name: '',
//       corre: '',
//       descripcion: '',
//       ubicacion: '',
//     };
//   } else {
//     userData = JSON.parse(sessionStorage.userSession);
//   }
//   return userData;
// };
