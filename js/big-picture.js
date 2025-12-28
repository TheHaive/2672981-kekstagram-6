const COMMENTS_STEP_VALUE = 5;

const pictureContainer = document.querySelector('.big-picture');
const pictureImage = document.querySelector('.big-picture__img img');
const pictureCaption = document.querySelector('.social__caption');
const pictureLikesCount = document.querySelector('.likes-count');
const closeButton = document.querySelector('.big-picture__cancel');

const commentsContainer = document.querySelector('.social__comment-count');
const commentsCount = document.querySelector('.comments-count');
const commentsList = document.querySelector('.social__comments');
const commentItem = document.querySelector('.social__comment');
const commentsLoader = document.querySelector('.comments-loader');

let commentsCounter = 0;
let totalCommentsQuantity = 0;
let commentsData = [];

const onCloseButtonClick = () => {
  closeBigPicture();
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !evt.target.closest('.social__footer-text')) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const onCommentsLoaderButtonClick = () => {
  if (commentsData.length <= COMMENTS_STEP_VALUE) {
    commentsLoader.classList.add('hidden');
  }
  renderComments();
};

const addListeners = () => {
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoader.addEventListener('click', onCommentsLoaderButtonClick);
};

const removeListeners = () => {
  closeButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoader.removeEventListener('click', onCommentsLoaderButtonClick);
};

function fillCommentsCount() {
  commentsContainer.innerHTML = `${commentsCounter} из <span class="comments-count">${totalCommentsQuantity}</span> комментариев`;
}

const createComment = (data) => {
  const newComment = commentItem.cloneNode(true);
  const commentAvatar = newComment.querySelector('.social__picture');
  commentAvatar.src = data.avatar;
  commentAvatar.alt = data.name;
  newComment.querySelector('.social__text').textContent = data.message;
  commentsCounter++;

  return newComment;
};

function renderComments() {
  commentsData.splice(0, COMMENTS_STEP_VALUE).forEach((item) => commentsList.append(createComment(item)));
  fillCommentsCount();
}

const fillBigPicture = (data) => {
  pictureImage.src = data.url;
  pictureLikesCount.textContent = data.likes;
  commentsCount.textContent = data.comments.length;
  pictureCaption.textContent = data.description;
};

const openBigPicture = (data) => {
  commentsList.innerHTML = '';
  totalCommentsQuantity = data.comments.length;
  commentsData.push(...data.comments.slice());
  pictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');

  if (totalCommentsQuantity <= COMMENTS_STEP_VALUE) {
    commentsLoader.classList.add('hidden');
  }

  fillBigPicture(data);
  renderComments();
  addListeners();
};

function closeBigPicture() {
  pictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsLoader.classList.remove('hidden');
  commentsCounter = 0;
  totalCommentsQuantity = 0;
  commentsData = [];
  removeListeners();
}

export { openBigPicture };
