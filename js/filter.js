import { miniaturesRender } from './thumbnails.js';
import { Debounce } from './utils.js';

const COUNT_RANDOM_PICTURES = 10;
const RERENDER_DELAY = 500;

let picturesBox = [];

const filtersElem = document.querySelector('.img-filters');
const filtersElemForm = filtersElem.querySelector('.img-filters__form');

const TypeFilter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};


const showFilters = (loadedPictures) => {
  filtersElem.classList.remove('img-filters--inactive');
  picturesBox = [...loadedPictures];
}

const commentsCompare = (pictureAlpha, pictureBeta) => {
  const rankAlpha = pictureAlpha.comments.length;
  const rankBeta = pictureBeta.comments.length;

  return rankBeta - rankAlpha;
}

const picturesFilter = (typeFilter) => {
  switch (typeFilter) {
    case TypeFilter.RANDOM:
      return [...picturesBox].sort(() => 0.5 - Math.random()).slice(0, COUNT_RANDOM_PICTURES);

    case TypeFilter.DISCUSSED:
      return [...picturesBox].sort(commentsCompare);

    default:
      return [...picturesBox];
  }
}

const setActiveFilterButton = (clickedButton) => {
  const currentActiveButton = filtersElemForm.querySelector('.img-filters__button--active');
  if (currentActiveButton) {
    currentActiveButton.classList.remove('img-filters__button--active');
  }
  clickedButton.classList.add('img-filters__button--active');
}

const renderDebounced = Debounce((filterId) => {
  const filteredPictures = picturesFilter(filterId);
  miniaturesRender(filteredPictures);
}, RERENDER_DELAY);

function onFilterClick(evt) {
  const clickedBtn = evt.target;
  if (!clickedBtn.classList.contains('img-filters__button')) {
    return;
  }

  setActiveFilterButton(clickedBtn);
  renderDebounced(clickedBtn.id);
}

const filtersInit = (loadedPictures) => {
  showFilters(loadedPictures);
  filtersElemForm.addEventListener('click', onFilterClick);
}

export { filtersInit };
