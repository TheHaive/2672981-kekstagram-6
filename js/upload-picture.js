import { addScaleListeners } from './upload-picture-scale.js';
import { createSlider, setupSlider, destroySlider, addEffectListener} from './upload-picture-effects.js';
import { addValidators, isValidForm, resetPristine } from './upload-picture-validation.js';
import { renderSuccessMessage, renderErrorMessage } from './upload-picture-send-messages.js';
import { sendData } from './server-data.js';

const SEND_DATA_URL = 'https://28.javascript.pages.academy/kekstagram';

const pictureUploadForm = document.querySelector('.img-upload__form');
const pictureUploadInput = document.querySelector('#upload-file');
const pictureUploadPreview = document.querySelector('.img-upload__preview img');
const pictureEdit = document.querySelector('.img-upload__overlay');
const submitButton = document.querySelector('.img-upload__submit');
const closeButton = document.querySelector('.img-upload__cancel');
const checkedEffectInput = document.querySelector('.effects__radio[checked]');

const onSuccessSendData = () => {
  renderSuccessMessage();
  closePictureUpload();
  unblockSubmitButton();
};

const onFailSendData = () => {
  renderErrorMessage();
  unblockSubmitButton();
};

const onUploadPictureFormSubmit = (evt) => {
  evt.preventDefault();
  if (isValidForm()) {
    blockSubmitButton();
    sendData(SEND_DATA_URL, onSuccessSendData, onFailSendData, new FormData(evt.target));
  }
};

const onCloseButtonClick = () => closePictureUpload();

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !evt.target.closest('.text__hashtags') && !evt.target.closest('.text__description')) {
    closePictureUpload();
  }
};

const addFormBaseListeners = () => {
  pictureUploadForm.addEventListener('submit', onUploadPictureFormSubmit);
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

function blockSubmitButton() {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
}

function unblockSubmitButton() {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
}

function defaultSetupPictureUpload() {
  pictureUploadForm.reset();
  pictureUploadPreview.style = null;
}

function openPictureUpload() {
  createSlider();
  setupSlider(checkedEffectInput.value);
  pictureUploadPreview.src = URL.createObjectURL(pictureUploadInput.files[0]);
  document.body.classList.add('modal-open');
  pictureEdit.classList.remove('hidden');
}

function closePictureUpload() {
  destroySlider();
  resetPristine();
  defaultSetupPictureUpload();
  document.body.classList.remove('modal-open');
  pictureEdit.classList.add('hidden');
}

const initUploadPictureModule = () => {
  pictureUploadInput.addEventListener('change', openPictureUpload);
  addFormBaseListeners();
  addScaleListeners();
  addEffectListener();
  addValidators();
};

export { initUploadPictureModule };
