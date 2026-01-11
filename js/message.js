import { isKeyEsc } from './utils.js';

const templateSuccess = document.querySelector('#success').content.querySelector('.success');
const templateError = document.querySelector('#error').content.querySelector('.error');

function showMessage(template, classButtonClose) {
  const elementMessage = template.cloneNode(true);
  document.body.append(elementMessage);

  const closeButton = elementMessage.querySelector(classButtonClose);

  const closeMessage = () => {
    elementMessage.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  }

  const onDocumentClick = (evt) => {
    if (evt.target === elementMessage || evt.target === closeButton) {
      closeMessage();
    }
  }

  const onDocumentKeydown = (evt) => {
    if (isKeyEsc(evt)) {
      evt.preventDefault();
      closeMessage();
    }
  }

  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
}

const classMessageSuccess = () => {
  showMessage(templateSuccess, '.success__button');
}

const classMessageError = () => {
  showMessage(templateError, '.error__button');
}

export { classMessageSuccess, classMessageError };
