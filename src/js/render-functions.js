import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const galleryContainer = document.querySelector('.gallery');
const loaderBackdrop = document.querySelector('.loader-backdrop'); 
const loadMoreBtn = document.querySelector('.load-more-btn');


const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
        <li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img
              class="gallery-image"
              src="${webformatURL}"
              alt="${tags}"
            />
          </a>
          <div class="image-info">
            <p class="info-item"><b>Likes</b><span>${likes}</span></p>
            <p class="info-item"><b>Views</b><span>${views}</span></p>
            <p class="info-item"><b>Comments</b><span>${comments}</span></p>
            <p class="info-item"><b>Downloads</b><span>${downloads}</span></p>
          </div>
        </li>
      `;
      }
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}


export function showLoader() {
  loaderBackdrop.classList.remove('is-hidden');
}

export function hideLoader() {
  loaderBackdrop.classList.add('is-hidden');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('is-hidden');
}