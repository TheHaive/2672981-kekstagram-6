import {isEscapeKey} from './utils.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const body = document.body;

const closeMessage = () => {
  const message = body.querySelector('.success') || body.querySelector('.error');
  if (message) {
    message.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  }
};

const onCloseButtonClick = () => {
  closeMessage();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
};

const onDocumentClick = (evt) => {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }
  closeMessage();
};

const showMessage = (template) => {
  const message = template.cloneNode(true);
  body.appendChild(message);
  message.querySelector('button').addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

const showSuccessMessage = () => showMessage(successTemplate);
const showErrorMessage = () => showMessage(errorTemplate);

export {showSuccessMessage, showErrorMessage};
