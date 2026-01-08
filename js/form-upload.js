import {sendData} from './api.js';
import {validateValues, resetValidator} from './validation.js';
import {isEnterKey, isEscapeKey} from './utils.js';
import {initScale, resetScale} from './scale.js';
import {destroySlider, initSlider, resetSlider} from './slider.js';
import {openMessageBox, checkTypeMessage} from './message.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const SUCCESS_TYPE_MESSAGE = 'success';
const ERROR_TYPE_MESSAGE = 'error';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const uploadButtonElement = document.querySelector('#upload-file');
const modalFormElement = document.querySelector('.img-upload__overlay');
const closeFormButtonElement = document.querySelector('#upload-cancel');
const uploadFormElement = document.querySelector('#upload-select-image');
const hashtagInputElement = uploadFormElement.querySelector('[name="hashtags"]');
const commentInputElement = uploadFormElement.querySelector('[name="description"]');
const submitButtonElement = document.querySelector('.img-upload__submit');
const imagePreviewElement = document.querySelector('.img-upload__preview img');
const effectsPreviewElement = document.querySelectorAll('.effects__preview');

const onInputEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const onInputFocus = (evt) => {
  evt.target.addEventListener('keydown', onInputEscKeydown);
};

const onInputBlur = (evt) => {
  evt.target.removeEventListener('keydown', onInputEscKeydown);
};

const clearInputs = () => {
  uploadButtonElement.value = '';
  hashtagInputElement.value = '';
  commentInputElement.value = '';
};

export const hideFormUpload = () => {
  modalFormElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetScale();
  resetSlider();
  destroySlider();
  deleteListeners();
  clearInputs();
  resetValidator();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !checkTypeMessage()) {
    evt.preventDefault();
    hideFormUpload();
  }
};

const onButtonCloseClick = () => {
  hideFormUpload();
};

const onButtonCloseEnter = (evt) => {
  if (isEnterKey(evt)) {
    hideFormUpload();
  }
};

const addListeners = () => {
  document.addEventListener('keydown', onDocumentKeydown);
  closeFormButtonElement.addEventListener('click', onButtonCloseClick);
  closeFormButtonElement.addEventListener('keydown', onButtonCloseEnter);
  hashtagInputElement.addEventListener('focus', onInputFocus);
  hashtagInputElement.addEventListener('blur', onInputBlur);
  commentInputElement.addEventListener('focus', onInputFocus);
  commentInputElement.addEventListener('blur', onInputBlur);
};

function deleteListeners() {
  document.removeEventListener('keydown', onDocumentKeydown);
  closeFormButtonElement.removeEventListener('click', onButtonCloseClick);
  closeFormButtonElement.removeEventListener('keydown', onButtonCloseEnter);
  hashtagInputElement.removeEventListener('focus', onInputFocus);
  hashtagInputElement.removeEventListener('blur', onInputBlur);
  commentInputElement.removeEventListener('focus', onInputFocus);
  commentInputElement.removeEventListener('blur', onInputBlur);
}

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = SubmitButtonText.IDLE;
};

const showFormUpload = () => {
  modalFormElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  addListeners();
  initScale();
  initSlider();
};

export const initFormUpload = (onStartValidator, onSuccessUpload) => {
  onStartValidator();
  uploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if(validateValues()) {
      blockSubmitButton();
      onSuccessUpload();
      openMessageBox(SUCCESS_TYPE_MESSAGE);
      unblockSubmitButton();


      sendData(new FormData(evt.target))
        .then(onSuccessUpload)
        .then(() => openMessageBox(SUCCESS_TYPE_MESSAGE))
        .catch(
          () => {
            openMessageBox(ERROR_TYPE_MESSAGE);
          }
        )
        .finally(unblockSubmitButton);
    }
  });
  uploadButtonElement.addEventListener('change', () => {
    const file = uploadButtonElement.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((extension) => fileName.endsWith(extension));
    if (matches) {
      imagePreviewElement.src = URL.createObjectURL(file);
      effectsPreviewElement.forEach((effect) => {
        effect.style.backgroundImage = `url('${URL.createObjectURL(file)}')`;
      });
      showFormUpload();
    }
  });
};
