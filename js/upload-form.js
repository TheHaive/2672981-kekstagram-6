import { sendData } from './api.js';
import { classMessageSuccess, classMessageError } from './message.js';
import { isKeyEsc } from './utils.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const elementBody = document.body;
const formUpload = document.querySelector('.img-upload__form');
const inputFile = formUpload.querySelector('.img-upload__input');
const formEdit = formUpload.querySelector('.img-upload__overlay');
const cancelBtn = formUpload.querySelector('.img-upload__cancel');
const submitBtn = formUpload.querySelector('.img-upload__submit');
const inputComment = formUpload.querySelector('.text__description');
const inputHashtag = formUpload.querySelector('.text__hashtags');
const previewPhoto = formUpload.querySelector('.img-upload__preview img');
const previewsEffects = formUpload.querySelectorAll('.effects__preview');

let instanceValidation;
let moduleRefEffects;

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const blockButtonSubmit = () => {
  submitBtn.disabled = true;
  submitBtn.textContent = SubmitButtonText.SENDING;
}

const unblockButtonSubmit = () => {
  submitBtn.disabled = false;
  submitBtn.textContent = SubmitButtonText.IDLE;
}

const showFormEdit = () => {
  formEdit.classList.remove('hidden');
  elementBody.classList.add('modal-open');
  document.addEventListener('keydown', handleDocumentKeydown);
}

const hideFormEdit = () => {
  formEdit.classList.add('hidden');
  elementBody.classList.remove('modal-open');
  document.removeEventListener('keydown', handleDocumentKeydown);
  clearForm();
}

const clearForm = () => {
  formUpload.reset();
  inputFile.value = '';
  if (instanceValidation) {
    instanceValidation.reset();
  }
  if (moduleRefEffects) {
    moduleRefEffects.scaleReset();
    moduleRefEffects.filtersReset();
  }
}

const onFileChange = () => {
  const file = inputFile.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewPhoto.src = URL.createObjectURL(file);
    previewsEffects.forEach((preview) => {
      preview.style.backgroundImage = `url(${previewPhoto.src})`;
    });
  }

  showFormEdit();
}

const onCancelClick = () => {
  hideFormEdit();
}

const onFieldKeydown = (event) => {
  if (event && isKeyEsc(event)) {
    event.stopPropagation();
  }
}

const handleDocumentKeydown = (event) => {
  if (document.querySelector('.error')) {
    return;
  }
  if (event && isKeyEsc(event) && !event.target.matches('.text__description, .text__hashtags')) {
    hideFormEdit();
  }
}

const onFormSubmit = (event) => {
  event.preventDefault();

  if (instanceValidation.validate()) {
    blockButtonSubmit();
    sendData(new FormData(event.target))
      .then(() => {
        hideFormEdit();
        classMessageSuccess();
      })
      .catch(() => {
        classMessageError();
      })
      .finally(unblockButtonSubmit);
  }
}

const formSetup = (validationModule, effectsModule) => {
  instanceValidation = validationModule.validationInit(formUpload);
  moduleRefEffects = effectsModule;

  if (effectsModule) {
    effectsModule.scaleEffectsSetup();
  }
  inputFile.addEventListener('change', onFileChange);
  cancelBtn.addEventListener('click', onCancelClick);
  inputComment.addEventListener('keydown', onFieldKeydown);
  inputHashtag.addEventListener('keydown', onFieldKeydown);
  formUpload.addEventListener('submit', onFormSubmit);
}

export { formSetup };
