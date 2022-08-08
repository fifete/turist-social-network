import {
  ref, storage, uploadBytes,
  getDownloadURL,
} from './firebaseconfig.js';

export const shareImgPost = async (imagen, file) => {
  const storageRef = ref(storage, `postsImagen/${imagen}`);
  // 'file' comes from the Blob or File API
  await uploadBytes(storageRef, file);

  const traerFile = getDownloadURL(storageRef);
  return traerFile;
};
