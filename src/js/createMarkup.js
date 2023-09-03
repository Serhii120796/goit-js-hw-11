export function createMarkup({ hits }) {
  return hits
    .map(
      ({
        webformatURL, largeImageURL, tags, likes, views, comments, downloads,
      }) => `<div class="photo-card">
        <a href="${largeImageURL}" sourceAttr class="card-link">
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
</a>
</div>`
    )
    .join('');
}
