export const navBar = () => {
  const navContent = `
        <header>
            
          <nav class="nav">
              <div class="container">
                  <div class="logo">
                      <a href="#">YourLogo</a>
                  </div>
                  <div class="main_list" id="mainListDiv">
                      <ul>
                      <li><a href="#/inicio">Inicio</a></li>
                      <li><a href="#/amigos">Amigos</a></li>
                      <li><a href="#/publicar">Publicar</a></li>
                      </ul>
                  </div>
                  <div class="media_button">
                      <button class="main_media_button" id="mediaButton">
                          <span></span>
                          <span></span>
                          <span></span>
                      </button>
                  </div>
              </div>
          </nav>
        </header>
    `;
  const navContainer = document.createElement('div');
  navContainer.innerHTML = navContent;
  return navContainer;
};
