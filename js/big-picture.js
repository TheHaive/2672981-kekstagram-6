import {isEscapeKey} from './utils.js';

const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureCancel = bigPictureContainer.querySelector('.big-picture__cancel');
const socialComments = bigPictureContainer.querySelector('.social__comments');
const socialCommentCount = bigPictureContainer.querySelector('.social__comment-count');
const commentsLoader = bigPictureContainer.querySelector('.comments-loader');
const body = document.body;

let currentComments = [];
let commentsShown = 0;
const COMMENTS_PER_PORTION = 5;

const createComment = (comment) => {
  const li = document.createElement('li');
  li.classList.add('social__comment');
  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = comment.avatar;
  img.alt = comment.name;
  img.width = 35;
  img.height = 35;
  const p = document.createElement('p');
  p.classList.add('social__text');
  p.textContent = comment.message;
  li.appendChild(img);
  li.appendChild(p);
  return li;
};

const renderComments = () => {
  const fragment = document.createDocumentFragment();
  const nextComments = currentComments.slice(commentsShown, commentsShown + COMMENTS_PER_PORTION);
  nextComments.forEach((comment) => {
    fragment.appendChild(createComment(comment));
  });
  socialComments.appendChild(fragment);
  commentsShown += nextComments.length;
  socialCommentCount.innerHTML = `${commentsShown} из <span class="comments-count">${currentComments.length}</span> комментариев`;
  if (commentsShown >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const onCommentsLoaderClick = () => {
  renderComments();
};

const closeBigPicture = () => {
  bigPictureContainer.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
};

const onBigPictureCancelClick = () => {
  closeBigPicture();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const showBigPicture = (photo) => {
  bigPictureContainer.querySelector('.big-picture__img img').src = photo.url;
  bigPictureContainer.querySelector('.social__caption').textContent = photo.description;
  bigPictureContainer.querySelector('.likes-count').textContent = photo.likes;
  currentComments = photo.comments;
  commentsShown = 0;
  socialComments.innerHTML = '';
  renderComments();
  bigPictureContainer.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};

export {showBigPicture};
