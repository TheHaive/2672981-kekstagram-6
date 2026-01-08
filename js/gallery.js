import {initFormBigItem, showFormBigItem} from './form-big-item.js';

const picturesElement = document.querySelector('.pictures');

export const initGallery = (items) => {
  initFormBigItem();
  const onPictureClick = (evt) => {
    if(evt.target.closest('.picture')) {
      const currentPicture = items.find((item) => item.id === +evt.target.dataset.thumbnailId);
      if (typeof currentPicture !== 'undefined') {
        showFormBigItem(items[currentPicture.id]);
      }
    }
  };
  picturesElement.addEventListener('click', onPictureClick);
};

