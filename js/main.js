
const cssPromises = {};
const appContainer = document.querySelector('.js-app');

function loadResorce(src) {
  console.log(src)
  if (src.endsWith('.js')) {
    return import(src);
  }
  if (src.endsWith('.css')){
    if (!cssPromises[src]) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;
      cssPromises[src] = new Promise (resolve => {
        link.addEventListener('load', () => resolve());
      });
      document.head.append(link);
    }
    return cssPromises[src];
  }
  return fetch(src).then(res => res.json());
}


function createPreloadr() {
  let svg = `<svg width="289" height="274" viewBox="0 0 289 274" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M162 38C172.493 38 181 29.4934 181 19C181 8.50659 172.493 0 162 0C151.507 0 143 8.50659 143 19C143 29.4934 151.507 38 162 38ZM233 42C233 53.598 223.598 63 212 63C200.402 63 191 53.598 191 42C191 30.402 200.402 21 212 21C223.598 21 233 30.402 233 42ZM249 105C261.703 105 272 94.7026 272 82C272 69.2975 261.703 59 249 59C236.297 59 226 69.2975 226 82C226 94.7026 236.297 105 249 105ZM264 160C277.807 160 289 148.807 289 135C289 121.193 277.807 110 264 110C250.193 110 239 121.193 239 135C239 148.807 250.193 160 264 160ZM124 21C124 30.3888 116.389 38 107 38C97.6111 38 90 30.3888 90 21C90 11.6112 97.6111 4 107 4C116.389 4 124 11.6112 124 21ZM58 61C66.2843 61 73 54.2843 73 46C73 37.7157 66.2843 31 58 31C49.7157 31 43 37.7157 43 46C43 54.2843 49.7157 61 58 61ZM37 89C37 96.1797 31.1797 102 24 102C16.8203 102 11 96.1797 11 89C11 81.8203 16.8203 76 24 76C31.1797 76 37 81.8203 37 89ZM11 153C17.0751 153 22 148.075 22 142C22 135.925 17.0751 131 11 131C4.92487 131 0 135.925 0 142C0 148.075 4.92487 153 11 153ZM31 196C31 200.971 26.9706 205 22 205C17.0294 205 13 200.971 13 196C13 191.029 17.0294 187 22 187C26.9706 187 31 191.029 31 196ZM56 247C59.866 247 63 243.866 63 240C63 236.134 59.866 233 56 233C52.134 233 49 236.134 49 240C49 243.866 52.134 247 56 247ZM214 247C214 249.209 212.209 251 210 251C207.791 251 206 249.209 206 247C206 244.791 207.791 243 210 243C212.209 243 214 244.791 214 247ZM159 274C161.761 274 164 271.761 164 269C164 266.239 161.761 264 159 264C156.239 264 154 266.239 154 269C154 271.761 156.239 274 159 274ZM109 266C109 268.761 106.761 271 104 271C101.239 271 99 268.761 99 266C99 263.239 101.239 261 104 261C106.761 261 109 263.239 109 266ZM248 211C249.657 211 251 209.657 251 208C251 206.343 249.657 205 248 205C246.343 205 245 206.343 245 208C245 209.657 246.343 211 248 211Z" fill="#323232"/>
  </svg>`
  let preloderContainer = document.createElement('div');
  let preloder = document.createElement('div');
  preloderContainer.classList.add('preloader-container')
  preloder.classList.add('preloader');
  preloder.innerHTML = svg;
  preloderContainer.append(preloder);
  appContainer.append(preloderContainer);
}

function cssLoad(cssList) {
  Promise.all(
    cssList.map(src=>loadResorce(src))).then(() => {
      createPreloadr();
    })
}

function mainPage(){
  appContainer.innerHTML=''
  cssLoad(['/css/style.css']);
  Promise.all ([
    './starWarsList.js',
    'https://swapi.dev/api/films/',
  ].map(src => loadResorce(src))).then(([pageModule, data]) => {
    appContainer.innerHTML = '';
    appContainer.append(pageModule.render(data));
    let links = document.querySelectorAll('.js-link');
    links.forEach((link) => {
      link.addEventListener('click', function(event){
        event.preventDefault();
        history.pushState(null, '', link.href);
        appContainer.innerHTML='';
        episodePage();
      })
    })
  });
}


function episodePage(){
  appContainer.innerHTML=''
  cssLoad(['/css/style.css', '/css/episodeStyle.css']);
  let pageParams = new URLSearchParams(window.location.search);
  let episodeNumber = pageParams.get('id');
  Promise.all ([
    './episode.js',
    `https://swapi.dev/api/films/${episodeNumber}`,
  ].map(src => loadResorce(src))).then(([pageModule, data])=>{
    let detail = data.planets.concat(data.species);
    Promise.all(detail.map(src => loadResorce(src))).then(res => {
      console.log(res)
        let planse = res.slice(0, data.planets.length);
        let speceies = res.slice(data.planets.length+1);
        console.log(planse, speceies);
        appContainer.innerHTML = '';
        appContainer.append(pageModule.render(data, planse, speceies));
        let btn = document.querySelector('.js-btn-link');
        btn.addEventListener('click', function(event){
          event.preventDefault();
          history.pushState(null, '', btn.href);
          appContainer.innerHTML='';
          mainPage();
        })
    });
  });
}

export function main() {
  console.log(window.location.pathname)
  if (window.location.pathname === '/') {
    mainPage();
  }
  if (window.location.pathname === '/episode.html') {
    episodePage();
  }
  window.addEventListener('popstate', function(){
    if (window.location.pathname === '/') {
      mainPage();
    }
    if (window.location.pathname === '/episode.html') {
      episodePage();
    }
  })
}


