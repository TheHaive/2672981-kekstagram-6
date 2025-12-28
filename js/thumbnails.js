import { openBigPicture } from './big-picture.js';
import { initSortFiltersModule } from './sort-filters.js';
import { getData } from './server-data.js';

const GET_DATA_URL = 'https://28.javascript.pages.academy/kekstagram/data';
const ERROR_MESSAGE_SHOW_TIME = 5000;
const ERROR_MESSAGE = 'Не удалось загрузить данные!';

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailsList = document.querySelector('.pictures');

const createThumbnail = (data) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = data.url;
  thumbnail.querySelector('.picture__comments').textContent = data.comments.length;
  thumbnail.querySelector('.picture__likes').textContent = data.likes;

  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(data);
  });

  return thumbnail;
};

const renderThumbnails = (data) => data.forEach((item) => thumbnailsList.append(createThumbnail(item)));

const onSuccessGetData = (data) => {
  renderThumbnails(data);
  initSortFiltersModule(data);
};

const onFailGetData = () => {
  const errorMessage = document.createElement('div');
  errorMessage.style.zIndex = '100';
  errorMessage.style.position = 'absolute';
  errorMessage.style.left = '0';
  errorMessage.style.top = '0';
  errorMessage.style.right = '0';
  errorMessage.style.padding = '10px';
  errorMessage.style.fontSize = '20px';
  errorMessage.style.textAlign = 'center';
  errorMessage.style.backgroundColor = 'red';
  errorMessage.textContent = ERROR_MESSAGE;

  document.body.append(errorMessage);

  setTimeout(() => errorMessage.remove(), ERROR_MESSAGE_SHOW_TIME);
};

const getPostsData = () => getData(GET_DATA_URL, onSuccessGetData, onFailGetData);

export { getPostsData, renderThumbnails };
