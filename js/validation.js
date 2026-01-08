import {checkLength, checkRepeats} from './utils.js';

const COMMENT_MAX_LENGTH = 140;
const HASHTAG_MAX_LENGTH = 19;
const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAG_MAX_QUANTITY = 5;
const MESSAGES = {
  hasHash: `Правило: первый символ # далее буквы и числа но не более ${HASHTAG_MAX_LENGTH} шт.`,
  maxQuantity: `Максимально может быть ${HASHTAG_MAX_QUANTITY} хэштегов`,
  noRepetitions: 'Хэштеги не могут повторяться',
  maxLengthComment: `Максимальная длина комментария ${COMMENT_MAX_LENGTH} символов`
};

const uploadFormElement = document.querySelector('#upload-select-image');
const hashtagInputElement = uploadFormElement.querySelector('[name="hashtags"]');
const commentInputElement = uploadFormElement.querySelector('[name="description"]');

const validator = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text__error'
});

const onCheckHasHash = () => hashtagInputElement.value !== '' ? hashtagInputElement.value
  .trim()
  .split(' ')
  .filter(Boolean)
  .every((hashtag) => HASHTAG_REGEX.test(hashtag)) : true;
const onCheckMaxQuantity = () => checkLength(hashtagInputElement.value.split(' ').filter(Boolean), HASHTAG_MAX_QUANTITY);
const onCheckNoRepetitions = () => checkRepeats(hashtagInputElement.value.split(' ').filter(Boolean));
const onCheckMaxLengthComment = () => checkLength(commentInputElement.value, COMMENT_MAX_LENGTH);

export const initValidation = () => {
  validator.addValidator(hashtagInputElement, onCheckHasHash, MESSAGES.hasHash);
  validator.addValidator(hashtagInputElement, onCheckMaxQuantity, MESSAGES.maxQuantity);
  validator.addValidator(hashtagInputElement, onCheckNoRepetitions, MESSAGES.noRepetitions);
  validator.addValidator(commentInputElement, onCheckMaxLengthComment, MESSAGES.maxLengthComment);
};

export const validateValues = () => validator.validate();
export const resetValidator = () => validator.reset();
