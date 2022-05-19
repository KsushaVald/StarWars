function createListblock(headerText, list) {
  console.log(list)
  let listblock = document.createElement('div');
  let headerBlock = document.createElement('div');
  let header = document.createElement('h2');
  let ul = document.createElement('ul');
  ul.classList.add('main-container', 'info-container', 'episode-list')

  header.textContent = headerText;
  header.classList.add('header', 'subheadr');
  headerBlock.classList.add('main-container', 'header-container');
  headerBlock.append(header);

  for (let note of list) {
    console.log(note)
    let item = document.createElement('li');
    item.textContent = note.name;
    item.classList.add('episod-list__item')
    ul.append(item);
  }

  listblock.classList.add('list-block');
  listblock.append(headerBlock);
  listblock.append(ul);

  return listblock;
}


export function render(data, planets, species){
  console.log(data, planets, species)
  let container = document.createElement('div');
  let headerContainer = document.createElement('div');
  let header = document.createElement('h1');
  let infoContainer =  document.createElement('div');
  let svg = `<svg width="37.7" height="15.85" viewBox="0 0 754 317" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.2029 172.579C-2.14097 164.131 -2.05625 150.518 6.39211 142.174L144.066 6.2029C152.514 -2.14097 166.127 -2.05625 174.471 6.39211C182.815 14.8405 182.73 28.4533 174.282 36.7971L73.5384 136.295L534.61 139.164C546.484 139.238 556.05 148.923 555.976 160.797C555.902 172.671 546.217 182.237 534.343 182.163L73.2708 179.294L172.768 280.037C181.112 288.485 181.027 302.098 172.579 310.442C164.131 318.786 150.518 318.701 142.174 310.253L6.2029 172.579ZM659.5 158.906C659.5 176.579 645.173 190.906 627.5 190.906C609.827 190.906 595.5 176.579 595.5 158.906C595.5 141.233 609.827 126.906 627.5 126.906C645.173 126.906 659.5 141.233 659.5 158.906ZM721.5 190.906C739.173 190.906 753.5 176.579 753.5 158.906C753.5 141.233 739.173 126.906 721.5 126.906C703.827 126.906 689.5 141.233 689.5 158.906C689.5 176.579 703.827 190.906 721.5 190.906Z" fill="#F5F5F5"/>
  </svg>`
  let mainLink = document.createElement('a');
  mainLink.innerHTML = svg + '   Back to episodes';
  mainLink.classList.add('item-link', 'btn-link', 'js-btn-link');
  mainLink.href = '/';

  let description = document.createElement('p');
  description.textContent = data.opening_crawl;
  description.classList.add('text');

  let containerLists = document.createElement('div');
  containerLists.classList.add('container-lists');

  console.log(planets)
  containerLists.append(createListblock('Planets', planets));
  containerLists.append(createListblock('Species', species));

  container.classList.add('container', 'js-container');
  headerContainer.classList.add('main-container', 'header-container');
  header.classList.add('header', 'js-header');
  header.textContent = `Episode ${data.episode_id} ${data.title}`;

  infoContainer.classList.add('main-container', 'info-container');
  infoContainer.append(mainLink);
  infoContainer.append(description);

  headerContainer.append(header);
  container.append(headerContainer);
  container.append(infoContainer);
  container.append(containerLists)

  return container;

}


