// Модуль для работы с полноразмерным изображением
const bigPictureElement = document.querySelector('.big-picture');
const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentsCountElement = bigPictureElement.querySelector('.comments-count');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');

/**
 * Создает элемент комментария
 * @param {Object} comment - объект комментария
 * @returns {HTMLElement} элемент комментария
 */
const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const imgElement = document.createElement('img');
  imgElement.classList.add('social__picture');
  imgElement.src = comment.avatar;
  imgElement.alt = comment.name;
  imgElement.width = 35;
  imgElement.height = 35;

  const textElement = document.createElement('p');
  textElement.classList.add('social__text');
  textElement.textContent = comment.message;

  commentElement.appendChild(imgElement);
  commentElement.appendChild(textElement);

  return commentElement;
};

/**
 * Заполняет модальное окно данными о фотографии
 * @param {Object} pictureData - объект с данными о фотографии
 */
const fillBigPicture = (pictureData) => {
  bigPictureImgElement.src = pictureData.url;
  likesCountElement.textContent = pictureData.likes;
  commentsCountElement.textContent = pictureData.comments.length;
  socialCaptionElement.textContent = pictureData.description;

  // Очищаем список комментариев
  socialCommentsElement.innerHTML = '';

  // Добавляем комментарии
  pictureData.comments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    socialCommentsElement.appendChild(commentElement);
  });

  // Скрываем элементы для пагинации комментариев
  commentCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');
};

/**
 * Открывает модальное окно с полноразмерным изображением
 * @param {Object} pictureData - объект с данными о фотографии
 */
const openBigPicture = (pictureData) => {
  fillBigPicture(pictureData);
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  // Фокусировка на кнопке закрытия для доступности
  closeButtonElement.focus();

  // Добавляем обработчики событий
  document.addEventListener('keydown', onDocumentKeydown);
};

/**
 * Закрывает модальное окно с полноразмерным изображением
 */
const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  // Удаляем обработчики событий
  document.removeEventListener('keydown', onDocumentKeydown);
};

/**
 * Обработчик нажатия клавиши Esc
 * @param {KeyboardEvent} evt - событие клавиатуры
 */
const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

/**
 * Инициализация модуля
 */
const initBigPicture = () => {
  // Обработчик клика по кнопке закрытия
  closeButtonElement.addEventListener('click', () => {
    closeBigPicture();
  });
};

export { openBigPicture, initBigPicture };
