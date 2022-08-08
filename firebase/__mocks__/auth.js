export const loginEmailPas = (email, password) => {
  if (email === '' || password === '') {
    return Promise.reject(new Error());
  }
  return Promise.resolve({
    user: {
      emailVerified: true,
    },
  });
};

export const cierreActividadUsuario = () => jest.fn();

export const addUser = (email, password) => {
  if (email === '' || password === '') {
    return Promise.reject(new Error());
  }
  return Promise.resolve({
    user: 'Hola',
  });
};

export const emailVerificationHandler = () => Promise.resolve();

export const signInGoogle = () => Promise.resolve({
  user: 'Hola',
});
// export const actualizarPosts = jest.fn(() => {});
