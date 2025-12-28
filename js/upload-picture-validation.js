const HASHTAG_REG_EXP = /^#[\dа-яёa-z]{1,19}$/i;
const MAX_HASHTAGS_COUNT = 5;

const pictureUploadForm = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.img-upload__text .text__hashtags');

const pristineSetup = new Pristine(pictureUploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'form__error'
});

const createHashtagArray = (value) => value.toLowerCase().trim().split(' ').filter((item) => item);

const isValidHashtagText = (value) => {
  if (!value) {
    return true;
  }

  return createHashtagArray(value).every((hashtag) => HASHTAG_REG_EXP.test(hashtag));
};

const isUniqueHashtags = (value) => {
  const hashtags = createHashtagArray(value);
  const uniqueHashtags = new Set(hashtags);

  return hashtags.length === uniqueHashtags.size;
};

const isValidHashtagsCount = (value) => createHashtagArray(value).length <= MAX_HASHTAGS_COUNT;

const addValidators = () => {
  pristineSetup.addValidator(
    hashtagInput,
    isValidHashtagText,
    `Хэш-тег начинается с символа # (решётка), хеш-тег не может состоять только из одной решётки, максимальная длина одного хэш-тега 20 символов, включая решётку;
    строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы, символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.!`
  );

  pristineSetup.addValidator(
    hashtagInput,
    isUniqueHashtags,
    'Один и тот же хэш-тег не может быть использован дважды! (хэш-теги нечувствительны к регистру)'
  );

  pristineSetup.addValidator(
    hashtagInput,
    isValidHashtagsCount,
    'Нельзя указать больше пяти хэш-тегов!'
  );
};

const isValidForm = () => pristineSetup.validate();

const resetPristine = () => pristineSetup.reset();

export { addValidators, isValidForm, resetPristine };
