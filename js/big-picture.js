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
const commentsShownElement = bigPictureElement.querySelector('.comments-shown');

// Переменные для управления комментариями
let currentComments = [];
let commentsShown = 0;
const COMMENTS_PER_PAGE = 5;

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
 * Показывает следующую порцию комментариев
 */
const showMoreComments = () => {
  const commentsToShow = currentComments.slice(commentsShown, commentsShown + COMMENTS_PER_PAGE);

  commentsToShow.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    socialCommentsElement.appendChild(commentElement);
  });

  commentsShown += commentsToShow.length;

  // Обновляем текст счетчика
  commentCountElement.innerHTML = `${commentsShown} из <span class="comments-count">${currentComments.length}</span> комментариев`;

  // Скрываем кнопку "Загрузить ещё", если все комментарии показаны
  if (commentsShown >= currentComments.length) {
    commentsLoaderElement.classList.add('hidden');
  }
};

/**
 * Обработчик клика по кнопке "Загрузить ещё"
 */
const onCommentsLoaderClick = () => {
  showMoreComments();
};

/**
 * Сбрасывает состояние комментариев
 */
const resetComments = () => {
  currentComments = [];
  commentsShown = 0;
  socialCommentsElement.innerHTML = '';
  commentCountElement.innerHTML = '0 из <span class="comments-count">0</span> комментариев';
  commentsLoaderElement.classList.remove('hidden');
};

/**
 * Инициализирует отображение комментариев с пагинацией
 * @param {Array} comments - массив комментариев
 */
const initComments = (comments) => {
  resetComments();
  currentComments = comments;

  // Показываем первые комментарии
  showMoreComments();

  // Обновляем счетчик комментариев
  commentsCountElement.textContent = comments.length;
  commentsShownElement.textContent = Math.min(commentsShown, comments.length);
};

/**
 * Заполняет модальное окно данными о фотографии
 * @param {Object} pictureData - объект с данными о фотографии
 */
const fillBigPicture = (pictureData) => {
  bigPictureImgElement.src = pictureData.url;
  likesCountElement.textContent = pictureData.likes;
  socialCaptionElement.textContent = pictureData.description;

  // Показываем блоки счётчика комментариев и кнопки загрузки
  commentCountElement.classList.remove('hidden');
  commentsLoaderElement.classList.remove('hidden');

  // Инициализируем комментарии с пагинацией
  initComments(pictureData.comments);
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
  commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);
};

/**
 * Закрывает модальное окно с полноразмерным изображением
 */
const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  // Удаляем обработчики событий
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoaderElement.removeEventListener('click', onCommentsLoaderClick);

  // Сбрасываем состояние комментариев
  resetComments();
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
