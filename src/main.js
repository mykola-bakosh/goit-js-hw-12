import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton, 
} from './js/render-functions.js';

const searchForm = document.querySelector('.form');
const searchInput = searchForm.elements.searchQuery;
const loadMoreBtn = document.querySelector('.load-more-btn');
const galleryContainer = document.querySelector('.gallery');

let currentQuery = '';
let currentPage = 1;  
const perPage = 15;   
let totalHits = 0; 

searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  
  currentQuery = searchInput.value.trim(); 
  currentPage = 1;                        
  totalHits = 0;   

    if (!currentQuery) {
      iziToast.error({
        message: 'Search field cannot be empty!',
        position: 'topRight',
      });
      clearGallery();
      hideLoadMoreButton();
      return;
    }
  
    clearGallery(); 
    hideLoadMoreButton();
    showLoader(); 
  
    try {
      const data = await getImagesByQuery(currentQuery, currentPage);

      if (data.hits.length === 0) {
        iziToast.info({
          message: 'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
      } else {
        createGallery(data.hits);
        totalHits = data.totalHits; 
        
        
        if (data.hits.length < totalHits) {
          showLoadMoreButton(); 
        } else {
          iziToast.info({
            message: "We're sorry, but you've reached the end of search results.",
            position: 'topRight',
          });
        }
      }
    } catch (error) {
      console.error('Error during image search:', error);
      iziToast.error({
        message: 'Something went wrong! Please try again later.',
        position: 'topRight',
      });
    } finally {
      hideLoader(); 
      searchForm.reset(); 
    }
  });
  
  loadMoreBtn.addEventListener('click', async () => {
    currentPage += 1; 
    showLoader();    
    hideLoadMoreButton(); 
  
    try {
      const data = await getImagesByQuery(currentQuery, currentPage);
      createGallery(data.hits);
  
     
      const { height: cardHeight } = galleryContainer.firstElementChild.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2, 
        behavior: 'smooth',
      });
  
      
      if (currentPage * perPage >= totalHits) {
        hideLoadMoreButton();
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
      } else {
        showLoadMoreButton(); 
      }
    } catch (error) {
      console.error('Error loading more images:', error);
      iziToast.error({
        message: 'Failed to load more images. Please try again.',
        position: 'topRight',
      });
    } finally {
      hideLoader(); 
    }
  });


  

   