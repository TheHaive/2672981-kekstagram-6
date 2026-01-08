import {filterRandom, sortByMostDiscussed} from './filter.js';

const itemsContainerElement = document.querySelector('.pictures');
const itemTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const filterSectionElement = document.querySelector('.img-filters');

const createSmallItem = (item) => {
  const {id, url, description, likes, comments} = item;

  const previewItemElement = itemTemplateElement.cloneNode(true);
  const previewItemImgElement = previewItemElement.querySelector('.picture__img');
  previewItemImgElement.src = url;
  previewItemImgElement.alt = description;
  previewItemImgElement.dataset.thumbnailId = id;

  const previewItemCommentsElement = previewItemElement.querySelector('.picture__comments');
  previewItemCommentsElement.textContent = comments.length;

  const previewItemLikesElement = previewItemElement.querySelector('.picture__likes');
  previewItemLikesElement.textContent = likes;

  return previewItemElement;
};

export const renderSmallItems = (items) => {
  let newItems = items.slice();
  const activeFilterButtonElement = filterSectionElement.querySelector('.img-filters__button--active').id;
  const currentItemsElement = itemsContainerElement.querySelectorAll('.picture');

  if(activeFilterButtonElement === 'filter-random') {
    newItems = filterRandom(newItems);
  } else if(activeFilterButtonElement === 'filter-discussed') {
    newItems = sortByMostDiscussed(newItems);
  }

  currentItemsElement.forEach((item) => item.remove());

  const fragmentSmallItemsElement = document.createDocumentFragment();
  newItems.forEach((item) => {
    const element = createSmallItem(item);
    fragmentSmallItemsElement.append(element);
  });

  itemsContainerElement.append(fragmentSmallItemsElement);
};
