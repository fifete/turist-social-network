export const getUserById = jest.fn(() => Promise.resolve({}));

// Subir publicaciones del usuario a firestore
export const loadPublications = jest.fn(() => {});
export const deletePost = jest.fn(() => {});
export const updatePost = jest.fn(() => {});
// eslint-disable-next-line max-len
// preguntar el querysnapshot
export const actualizarPosts = jest.fn((callback) => {
  callback([{
    data: () => ({
      likes: [],
    }),
    id: '123',
  }]);
});
export const usersView = jest.fn((callback) => {
  callback([{
    data: () => ({
      likes: [],
    }),
    id: '123',
  }]);
});

export const createNewUser = () => Promise.resolve();
export const updateUser = jest.fn(() => {});
