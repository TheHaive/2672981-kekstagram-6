const PATTERN_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAGS = 5;
const MAX_LENGTH_HASHTAG = 20;
const MAX_LENGTH_COMMENT = 140;

const hashtagsCheck = (value) => {
  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return true;
  }

  const hashtags = trimmedValue.toLowerCase().split(' ').filter(Boolean);

  if (hashtags.length > MAX_HASHTAGS) {
    return false;
  }
  for (let i = 0; i < hashtags.length; i++) {
    const tag = hashtags[i];
    if (tag === '#') {
      return false;
    }
    if (!PATTERN_HASHTAG.test(tag)) {
      return false;
    }
    for (let j = i + 1; j < hashtags.length; j++) {
      if (tag === hashtags[j]) {
        return false;
      }
    }
  }

  return true;
}

const getHashtagError = (value) => {
  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return '';
  }

  const hashtags = trimmedValue.toLowerCase().split(' ').filter(Boolean);

  if (hashtags.length > MAX_HASHTAGS) {
    return `Максимум ${MAX_HASHTAGS} хэш-тегов`;
  }
  for (const tag of hashtags) {
    if (tag === '#') {
      return 'Хэш-тег не может быть только #';
    }
    if (tag.length > MAX_LENGTH_HASHTAG) {
      return `Максимальная длина ${MAX_LENGTH_HASHTAG} символов`;
    }
    if (!PATTERN_HASHTAG.test(tag)) {
      return 'Хэш-тег должен начинаться с # и содержать буквы/цифры';
    }
  }

  const uniqueTags = new Set(hashtags);
  if (uniqueTags.size !== hashtags.length) {
    return 'Хэш-теги не должны повторяться';
  }

  return '';
}

const commentCheck = (value) => {
  return value.length <= MAX_LENGTH_COMMENT;
}

const validationInit = (formElement) => {
  const pristine = new Pristine(formElement, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--invalid',
    successClass: 'img-upload__field-wrapper--valid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'pristine-error'
  });

  pristine.addValidator(
    formElement.querySelector('.text__hashtags'),
    hashtagsCheck,
    getHashtagError
  );

  pristine.addValidator(
    formElement.querySelector('.text__description'),
    commentCheck,
    `Комментарий не должен превышать ${MAX_LENGTH_COMMENT} символов`
  );

  const inputs = formElement.querySelectorAll('.text__hashtags, .text__description');
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      pristine.validate(input);
    });
  });

  return pristine;
}

export { validationInit };
