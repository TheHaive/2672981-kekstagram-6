import { renderThumbnails } from './thumbnails.js';
import { removeElements, shuffleElements, debounce } from './utils.js';

const RANDOM_THUMBNAILS_COUNT = 10;
const RERENDER_DELAY = 500;
const RANDOM_THUMBNAILS_BUTTON_ID = 'filter-random';
const DISCUSSED_THUMBNAILS_BUTTON_ID = 'filter-discussed';

const thumbnailsFilter = document.querySelector('.img-filters');

const sortDescThumbnails = (first, second) => second.comments.length - first.comments.length;

const rerenderThumbnails = (data, id) => {
  removeElements(document.querySelectorAll('.picture'));

  let dataCopy = data.slice();
  if (id === RANDOM_THUMBNAILS_BUTTON_ID) {
    dataCopy = shuffleElements(dataCopy).slice(0, RANDOM_THUMBNAILS_COUNT);
  }
  if (id === DISCUSSED_THUMBNAILS_BUTTON_ID) {
    dataCopy.sort(sortDescThumbnails);
  }

  renderThumbnails(dataCopy);
};

const rerenderTimeout = debounce((data, id) => rerenderThumbnails(data, id), RERENDER_DELAY);

const onThumbnailsFilterClick = (evt, data) => {
  if (evt.target.closest('.img-filters__button') && !evt.target.closest('.img-filters__button--active')) {
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    rerenderTimeout(data, evt.target.id);
  }
};

const initSortFiltersModule = (data) => {
  thumbnailsFilter.classList.remove('img-filters--inactive');
  thumbnailsFilter.addEventListener('click', (evt) => onThumbnailsFilterClick(evt, data));
};

export { initSortFiltersModule };
