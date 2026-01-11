import { isKeyEsc } from './utils.js';

const bodyPage = document.body;

const modalOpen = (modalElem) => {
  modalElem.classList.remove('hidden');
  bodyPage.classList.add('modal-open');

  document.addEventListener('keydown', handleKeydown);
}

const modalClose = (modalElem) => {
  modalElem.classList.add('hidden');
  bodyPage.classList.remove('modal-open');

  document.removeEventListener('keydown', handleKeydown);
}

const handleKeydown = (event) => {
  if (isKeyEsc(event)) {
    const modalOpenElem = document.querySelector('.modal:not(.hidden)');
    if (modalOpenElem) {
      modalClose(modalOpenElem);
    }
  }
}

export { modalClose, modalOpen };
