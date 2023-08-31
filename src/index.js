import { fetchImages } from './js/pixabay-api.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({
  position: 'center-center',
  backOverlay: true,
  clickToClose: true,
});

const form = document.querySelector('.search-form');
const list = document.querySelector('.gallery');
const button = document.querySelector('.load-more');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  list.innerHTML = '';
  addImages(evt);
});

let page = 1;

button.addEventListener('click', () => {
  page += 1;
  addImages();
  
});
const { searchQuery: input } = form.elements;

function addImages() {
  

  fetchImages(input.value, page)
    .then(response => {
      if (response.data.hits.length) {
        list.insertAdjacentHTML('beforeend', createMarcup(response.data));
        button.classList.remove('hidden');
        
      } else {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      console.log(response.data);
    })
    .catch(error => console.log(error));
}

function createMarcup({ hits }) {
  return hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" class="gallery-img" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${downloads}
    </p>
  </div>
</div>`
    )
    .join('');
}
