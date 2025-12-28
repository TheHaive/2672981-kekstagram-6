const onMessageModalKeydown = (evt) => {
  evt.stopPropagation();
  if (evt.key === 'Escape') {
    closeMessage();
  }
};

const onMessageModalClick = (evt) => {
  if (!evt.target.closest('.success__inner') && !evt.target.closest('.error__inner')) {
    closeMessage();
  }
};

const onMessageButtonClick = () => closeMessage();

const addMessageListeners = (type) => {
  document.querySelector(`.${type}__button`).addEventListener('click', onMessageButtonClick);
  document.querySelector(`.${type}`).addEventListener('click', onMessageModalClick);
  document.querySelector(`.${type}`).addEventListener('keydown', onMessageModalKeydown);
};

const createSuccessMessage = () => document.querySelector('#success').content.querySelector('.success').cloneNode(true);

const renderSuccessMessage = () => {
  document.body.append(createSuccessMessage());
  document.querySelector('.success__button').focus();
  addMessageListeners('success');
};

const createErrorMessage = () => document.querySelector('#error').content.querySelector('.error').cloneNode(true);

const renderErrorMessage = () => {
  document.body.append(createErrorMessage());
  document.querySelector('.error__button').focus();
  addMessageListeners('error');
};

function closeMessage() {
  if (document.querySelector('.success')) {
    document.querySelector('.success').remove();
  }
  if (document.querySelector('.error')) {
    document.querySelector('.error').remove();
  }
}

export { renderSuccessMessage, renderErrorMessage };
