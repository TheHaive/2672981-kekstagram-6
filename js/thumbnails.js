const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = (photo) => {
  const thumbnail = pictureTemplate.cloneNode(true);
  const imgElement = thumbnail.querySelector('.picture__img');
  imgElement.src = photo.url;
  imgElement.alt = photo.description;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  thumbnail.dataset.id = photo.id;

  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    import('./big-picture.js').then((module) => {
      module.showBigPicture(photo);
    });
  });

  return thumbnail;
};

const renderThumbnails = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    fragment.appendChild(createThumbnail(photo));
  });

  const existingPictures = picturesContainer.querySelectorAll('.picture');
  existingPictures.forEach((picture) => picture.remove());
  picturesContainer.appendChild(fragment);
};

export { renderThumbnails };
