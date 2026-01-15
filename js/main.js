import {loadPhotos} from './api.js';
import {setPhotos, getPhotos} from './data.js';
import {renderThumbnails} from './thumbnails.js';
import {initFilters} from './filters.js';
import {initImageEditor} from './image-editor.js';
import {showErrorMessage} from './messages.js';

const loadAndRenderPhotos = async () => {
  try {
    const photos = await loadPhotos();
    setPhotos(photos);
    renderThumbnails(getPhotos());
    initFilters();
  } catch (error) {
    showErrorMessage('Не удалось загрузить фотографии. Попробуйте обновить страницу.');
  }
};

const init = () => {
  loadAndRenderPhotos();
  initImageEditor();
};

init();
