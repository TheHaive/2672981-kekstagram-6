import {getPhotos} from './data.js';
import {renderThumbnails} from './thumbnails.js';
import {RANDOM_PHOTOS_COUNT, DEBOUNCE_DELAY} from './constants.js';
import {debounce} from './utils.js';

const imgFiltersContainer = document.querySelector('.img-filters');
const imgFiltersForm = imgFiltersContainer.querySelector('.img-filters__form');
const filterButtons = imgFiltersForm.querySelectorAll('.img-filters__button');

let currentFilter = 'filter-default';

const getRandomPhotos = (photos) => {
  const shuffled = photos.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(0, RANDOM_PHOTOS_COUNT);
};

const getDiscussedPhotos = (photos) => {
  return photos.slice().sort((a, b) => b.comments.length - a.comments.length);
};

const applyFilter = (filter, photos) => {
  switch (filter) {
    case 'filter-random':
      return getRandomPhotos(photos);
    case 'filter-discussed':
      return getDiscussedPhotos(photos);
    default:
      return photos;
  }
};

const updateThumbnails = debounce((filter) => {
  const filteredPhotos = applyFilter(filter, getPhotos());
  renderThumbnails(filteredPhotos);
}, DEBOUNCE_DELAY);

const onFilterButtonClick = (evt) => {
  if (evt.target.tagName === 'BUTTON') {
    const selectedFilter = evt.target.id;
    if (selectedFilter !== currentFilter) {
      filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
      evt.target.classList.add('img-filters__button--active');
      currentFilter = selectedFilter;
      updateThumbnails(selectedFilter);
    }
  }
};

const initFilters = () => {
  imgFiltersContainer.classList.remove('img-filters--inactive');
  imgFiltersForm.addEventListener('click', onFilterButtonClick);
};

export {initFilters};
