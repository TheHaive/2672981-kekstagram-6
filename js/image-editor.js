import {SCALE, EFFECTS, HASHTAG, COMMENT} from './constants.js';
import {isEscapeKey} from './utils.js';
import {isValidFileType} from './image-utils.js';
import {uploadPhoto} from './api.js';
import {showSuccessMessage, showErrorMessage} from './messages.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview img');
const scaleControlValue = imgUploadForm.querySelector('.scale__control--value');
const scaleControlSmaller = imgUploadForm.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadForm.querySelector('.scale__control--bigger');
const effectsList = imgUploadForm.querySelector('.effects__list');
const effectLevelContainer = imgUploadForm.querySelector('.img-upload__effect-level');
const effectLevelValue = imgUploadForm.querySelector('.effect-level__value');
const effectLevelSlider = imgUploadForm.querySelector('.effect-level__slider');
const hashtagsInput = imgUploadForm.querySelector('.text__hashtags');
const commentInput = imgUploadForm.querySelector('.text__description');
const imgUploadSubmit = imgUploadForm.querySelector('.img-upload__submit');
const body = document.body;

let scale = SCALE.DEFAULT;
let currentEffect = 'none';
let pristine;

// Масштаб
const updateScale = () => {
  scaleControlValue.value = `${scale}%`;
  imgUploadPreview.style.transform = `scale(${scale / 100})`;
};

const onScaleControlSmallerClick = () => {
  if (scale > SCALE.MIN) {
    scale -= SCALE.STEP;
    updateScale();
  }
};

const onScaleControlBiggerClick = () => {
  if (scale < SCALE.MAX) {
    scale += SCALE.STEP;
    updateScale();
  }
};

// Эффекты - инициализация слайдера
let slider;

const initSlider = () => {
  slider = noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  });
};

const hideSlider = () => {
  effectLevelContainer.classList.add('hidden');
  imgUploadPreview.style.filter = 'none';
};

const showSlider = () => {
  effectLevelContainer.classList.remove('hidden');
};

const updateEffect = () => {
  if (currentEffect === 'none') {
    hideSlider();
    return;
  }

  showSlider();
  const effect = EFFECTS[currentEffect];

  slider.updateOptions({
    range: {
      min: effect.min,
      max: effect.max,
    },
    start: effect.max,
    step: effect.step,
  });

  const onSliderUpdate = () => {
    const value = slider.get();
    effectLevelValue.value = value;
    imgUploadPreview.style.filter = `${effect.filter}(${value}${effect.unit})`;
  };

  slider.off('update');
  slider.on('update', onSliderUpdate);
  onSliderUpdate();
};

const onEffectsListChange = (evt) => {
  if (evt.target.name === 'effect') {
    currentEffect = evt.target.value;
    updateEffect();
  }
};

// Валидация хэш-тегов
const validateHashtags = (value) => {
  if (value.trim() === '') {
    return true;
  }
  const hashtags = value.trim().split(/\s+/);
  if (hashtags.length > HASHTAG.MAX_COUNT) {
    return false;
  }
  const seen = new Set();
  for (const tag of hashtags) {
    if (!HASHTAG.REGEX.test(tag)) {
      return false;
    }
    const lowerTag = tag.toLowerCase();
    if (seen.has(lowerTag)) {
      return false;
    }
    seen.add(lowerTag);
  }
  return true;
};

// Валидация комментария
const validateComment = (value) => value.length <= COMMENT.MAX_LENGTH;

// Pristine
const initPristine = () => {
  pristine = new Pristine(imgUploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__error-text',
  });

  pristine.addValidator(hashtagsInput, validateHashtags, 'Некорректные хэш-теги');
  pristine.addValidator(commentInput, validateComment, `Длина комментария не более ${COMMENT.MAX_LENGTH} символов`);
};

// Открытие/закрытие формы
const openImageEditor = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  scale = SCALE.DEFAULT;
  updateScale();
  currentEffect = 'none';
  updateEffect();
  initPristine();
};

const closeImageEditor = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  imgUploadForm.reset();
  if (pristine) {
    pristine.reset();
  }
};

const onImgUploadInputChange = () => {
  const file = imgUploadInput.files[0];
  if (file && isValidFileType(file)) {
    const url = URL.createObjectURL(file);
    imgUploadPreview.src = url;

    // Инициализируем слайдер только при первом открытии
    if (!slider) {
      initSlider();
    }

    openImageEditor();
  }
};

const onImgUploadCancelClick = () => {
  closeImageEditor();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !evt.target.closest('.text__hashtags') && !evt.target.closest('.text__description')) {
    evt.preventDefault();
    closeImageEditor();
  }
};

// Отправка формы
const blockSubmitButton = () => {
  imgUploadSubmit.disabled = true;
  imgUploadSubmit.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  imgUploadSubmit.disabled = false;
  imgUploadSubmit.textContent = 'Опубликовать';
};

const onImgUploadFormSubmit = async (evt) => {
  evt.preventDefault();
  if (!pristine.validate()) {
    return;
  }
  blockSubmitButton();
  try {
    const formData = new FormData(imgUploadForm);
    await uploadPhoto(formData);
    closeImageEditor();
    showSuccessMessage();
  } catch (error) {
    showErrorMessage();
  } finally {
    unblockSubmitButton();
  }
};

// Инициализация
const initImageEditor = () => {
  imgUploadInput.addEventListener('change', onImgUploadInputChange);
  imgUploadCancel.addEventListener('click', onImgUploadCancelClick);
  scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);
  effectsList.addEventListener('change', onEffectsListChange);
  imgUploadForm.addEventListener('submit', onImgUploadFormSubmit);
};

export {initImageEditor};
