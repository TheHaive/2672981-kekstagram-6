import { isKeyEsc } from './utils.js';

const COMMENTS_PER_PORTION = 5;

let commentsCounter = 0;
let comments = [];

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCounter = bigPicture.querySelector('.likes-count');
const commentsBox = bigPicture.querySelector('.social__comments');
const pictureDescription = bigPicture.querySelector('.social__caption');
const counterCommentBlock = bigPicture.querySelector('.social__comment-count');
const loaderCommentsBtn = bigPicture.querySelector('.comments-loader');
const closeBtn = bigPicture.querySelector('.big-picture__cancel');

const createCommentElement = (commentData) => {
  const itemComment = document.createElement('li');
  itemComment.classList.add('social__comment');

  const imageComment = document.createElement('img');
  imageComment.classList.add('social__picture');
  imageComment.src = commentData.avatar;
  imageComment.alt = commentData.name;
  imageComment.width = 35;
  imageComment.height = 35;

  const textComment = document.createElement('p');
  textComment.classList.add('social__text');
  textComment.textContent = commentData.message;

  itemComment.appendChild(imageComment);
  itemComment.appendChild(textComment);

  return itemComment;
}

const renderComments = () => {
  commentsCounter += COMMENTS_PER_PORTION;

  if (commentsCounter >= comments.length) {
    loaderCommentsBtn.classList.add('hidden');
    commentsCounter = comments.length;
  }
  else {
    loaderCommentsBtn.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsCounter; i++) {
    const comment = comments[i];
    const commentElement = createCommentElement(comment);
    fragment.append(commentElement);
  }

  commentsBox.innerHTML = '';
  commentsBox.append(fragment);
  counterCommentBlock.innerHTML = `<span class="social__comment-shown-count">${commentsCounter}</span> из <span class="social__comment-total-count">${comments.length}</span> комментариев`;
}

const onCommentsLoaderClick = () => renderComments();

const openModalPicture = (photoData) => {
  bigPictureImg.src = photoData.url;
  bigPictureImg.alt = photoData.description;

  likesCounter.textContent = photoData.likes;
  pictureDescription.textContent = photoData.description;

  comments = photoData.comments;
  if (comments.length > 0) {
    commentsCounter = 0;
    renderComments();
  } else {
    commentsBox.innerHTML = '';
    loaderCommentsBtn.classList.add('hidden');
    counterCommentBlock.innerHTML = '<span class="social__comment-shown-count">0</span> из <span class="social__comment-total-count">0</span> комментариев';
  }

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onEscKeydown);
}


const closeModalPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onEscKeydown);
  commentsCounter = 0;
}

const onEscKeydown = (event) => {
  if (isKeyEsc(event)) {
    closeModalPicture();
  }
}

closeBtn.addEventListener('click', closeModalPicture);
loaderCommentsBtn.addEventListener('click', onCommentsLoaderClick);

export { openModalPicture };
