import { openModalPicture } from './big-picture.js';

const containerPicturesElement = document.querySelector('.pictures');
const templatePicture = document.querySelector('#picture').content.querySelector('.picture');

const miniaturesRender = (photos) => {
  const picturesExiting = containerPicturesElement.querySelectorAll('.picture');
  picturesExiting.forEach((picture) => picture.remove());

  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const pictureElem = templatePicture.cloneNode(true);

    const pictureImage = pictureElem.querySelector('.picture__img');
    pictureImage.src = photo.url;
    pictureImage.alt = photo.description;
    pictureElem.querySelector('.picture__likes').textContent = photo.likes;
    pictureElem.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElem.addEventListener('click', () => {
      openModalPicture(photo);
    });

    fragment.appendChild(pictureElem);
  });

  containerPicturesElement.appendChild(fragment);
}

export { miniaturesRender };
