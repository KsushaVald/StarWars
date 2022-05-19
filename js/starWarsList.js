
export function render (data) {
  let container = document.createElement('div');
  let headerContainer = document.createElement('div');
  let header = document.createElement('h1');
  let infoContainer =  document.createElement('div');
  let list = document.createElement('ul');

  container.classList.add('container', 'js-container');
  headerContainer.classList.add('main-container', 'header-container', 'subheader-container');
  header.classList.add('header', 'js-header');
  header.textContent = 'Star Wars';
  infoContainer.classList.add('main-container', 'info-container');

  let id=0;
  for (let note of data.results) {
    let item = document.createElement('li');
    let link = document.createElement('a');
    console.log(note);
    link.textContent = `Episode ${note.episode_id} ${note.title}`;
    link.href=`/episode.html?id=${++id}`;
    link.classList.add('item-link', 'js-link');
    item.classList.add('list-item')
    item.append(link);
    list.append(item);
  }

  headerContainer.append(header);
  infoContainer.append(list);
  container.append(headerContainer);
  container.append(infoContainer);

  return container;
}
