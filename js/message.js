import {isEscapeKey} from './utils.js';

const successMessageTemplateElement = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplateElement = document.querySelector('#error').content.querySelector('.error');

export const checkTypeMessage = () => document.querySelector('.success, .error');

const onMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt) && checkTypeMessage()) {
    evt.preventDefault();
    closeMessageBox();
  }
};

const onMessageOutsideClick = (evt) => {
  const messageElement = checkTypeMessage();
  if (evt.target === messageElement) {
    closeMessageBox();
  }
};

function closeMessageBox () {
  document.removeEventListener('keydown', onMessageEscKeydown);
  document.removeEventListener('click', onMessageOutsideClick);

  const messageElement = checkTypeMessage();
  if (messageElement) {
    messageElement.remove();
  }
}

export const openMessageBox = (typeMessage) => {
  const message = typeMessage === 'success' ? successMessageTemplateElement.cloneNode(true) : errorMessageTemplateElement.cloneNode(true);
  const messageButton = message.querySelector(`.${typeMessage}__button`);
  document.body.append(message);

  messageButton.addEventListener('click', () => {
    closeMessageBox();
  });

  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', onMessageOutsideClick);
};
