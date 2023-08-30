import { fetchImages } from './js/pixabay-api.js';

const form = document.querySelector('.search-form');
const list = document.querySelector('.gallery');
form.addEventListener('submit', handlerSubmit);

const { searchQuery: input } = form.elements;

function handlerSubmit(evt) {
  evt.preventDefault();

  fetchImages(input.value)
      .then(response => {
          list.insertAdjacentHTML('beforeend', createMarcup(response.data));
          console.log(response.data);
      })
    .catch(error => console.log(error));
}

function createMarcup({ hits }) {
    return hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => 
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
</div>`).join('');
}