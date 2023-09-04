import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './js/pixabay-api.js';
import { createMarkup } from './js/createMarkup.js';

const form = document.querySelector('.search-form');
const list = document.querySelector('.gallery');
const button = document.querySelector('.load-more');
const { searchQuery: input } = form.elements;

const lightbox = new SimpleLightbox('.gallery a');

let page;
const per_page = 40;

form.addEventListener('submit', evt => {
  evt.preventDefault();
  button.classList.add('hidden');
  list.innerHTML = '';
  page = 1;
  addImages();
});

button.addEventListener('click', () => {
  page += 1;
  addImages();
});

function addImages() {
  fetchImages(input.value, page, per_page)
    .then(response => {
      if (!response.data.hits.length) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      list.insertAdjacentHTML('beforeend', createMarkup(response.data));
      lightbox.refresh();

      const { height: cardHeight } =
        list.firstElementChild.getBoundingClientRect();

      if (page === 1) {
        Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
      } else {
        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });
      }

      if (response.data.totalHits <= page * per_page) {
        button.classList.add('hidden');
        Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
        return;
      }

      button.classList.remove('hidden');
    })
    .catch(error => console.log(error));
}
