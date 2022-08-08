export function editProfile() {
  const muroProfile = document.createElement('div');
  muroProfile.setAttribute('id', 'divContainerProfile');

  const perfil = document.createElement('div');
  perfil.setAttribute('id', 'perfilUser');
  muroProfile.appendChild(perfil);

  return muroProfile;
}
