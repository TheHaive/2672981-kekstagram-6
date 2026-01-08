const COMMENT_COUNT = 5;
const AVATAR_SIZE = 35;

const commentListElement = document.querySelector('.social__comments');
const counterRenderedCommentsElement = document.querySelector('.comments-current');

const createComment = (comment) => {
  const {avatar, name, message} = comment;

  const commentLiElement = document.createElement('li');
  commentLiElement.classList.add('social__comment');

  const commentImageElement = document.createElement('img');
  commentImageElement.classList.add('social__picture');
  commentImageElement.src = avatar;
  commentImageElement.alt = name;
  commentImageElement.width = AVATAR_SIZE;
  commentImageElement.height = AVATAR_SIZE;

  const commentParagraphElement = document.createElement('p');
  commentParagraphElement.classList.add('social__text');
  commentParagraphElement.textContent = message;

  commentLiElement.append(commentImageElement);
  commentLiElement.append(commentParagraphElement);

  return commentLiElement;
};

const addComment = (comment) => {
  commentListElement.append(createComment(comment));
};

const calcCounterLoadedComments = (marker, length) => marker > length ? length : marker;

const createLoadMoreButton = () => {
  const loadMoreButtonElement = document.createElement('button');
  loadMoreButtonElement.setAttribute('type', 'button');
  loadMoreButtonElement.classList.add('social__comments-loader');
  loadMoreButtonElement.classList.add('comments-loader');
  loadMoreButtonElement.textContent = 'Загрузить еще';
  commentListElement.after(loadMoreButtonElement);
};

const hideLoadMoreButton = () => {
  if (document.querySelector('.comments-loader') !== null) {
    document.querySelector('.comments-loader').classList.add('hidden');
  }
};

const onLoadMoreButtonClick = (items) => (evt) => {
  evt.preventDefault();

  let marker = commentListElement.childNodes.length;
  items.slice(marker, marker + COMMENT_COUNT).forEach((comment) => {
    addComment(comment);
  });
  marker += COMMENT_COUNT;

  counterRenderedCommentsElement.textContent = calcCounterLoadedComments(marker, items.length);

  if(marker >= items.length) {
    hideLoadMoreButton();
  }
};

const renderVisibleComments = (comments) => {
  comments.forEach((comment) => {
    addComment(comment);
  });
  hideLoadMoreButton();
  counterRenderedCommentsElement.textContent = comments.length;
};

const renderInvisibleComments = (comments) => {
  comments.slice(0, COMMENT_COUNT).forEach((comment) => {
    addComment(comment);
  });
  counterRenderedCommentsElement.textContent = calcCounterLoadedComments(commentListElement.childNodes.length, comments.length);
  if (document.querySelector('.comments-loader') === null) {
    createLoadMoreButton();
  }
  document.querySelector('.comments-loader').addEventListener('click', onLoadMoreButtonClick(comments));
};

const renderComments = (comments) => {
  commentListElement.innerHTML = '';

  if(comments.length <= COMMENT_COUNT) {
    renderVisibleComments(comments);
  } else {
    renderInvisibleComments(comments);
  }
};

export const renderItemDetails = (item, outputContainer) => {
  const {comments, description, likes, url} = item;

  const bigImage = outputContainer.querySelector('.big-picture__img img');
  bigImage.src = url;
  bigImage.alt = description;

  outputContainer.querySelector('.social__caption').textContent = description;
  outputContainer.querySelector('.likes-count').textContent = likes;
  outputContainer.querySelector('.comments-count').textContent = comments.length;

  renderComments(comments);
};
