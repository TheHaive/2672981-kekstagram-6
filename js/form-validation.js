import Pristine from '/vendor/pristine/pristine.min.js';

const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

const form = document.querySelector('.img-upload__form');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');
const fileInput = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');

// Функция для проверки хэштегов
const validateHashtags = (value) => {
  if (value.trim() === '') {
    return true; // Пустое поле допустимо
  }

  const hashtags = value.trim().split(/\s+/);

  // Проверка на максимальное количество
  if (hashtags.length > MAX_HASHTAGS) {
    return false;
  }

  // Проверка каждого хэштега
  for (let i = 0; i < hashtags.length; i++) {
    const hashtag = hashtags[i];

    // Проверка формата
    if (!HASHTAG_REGEX.test(hashtag)) {
      return false;
    }

    // Проверка на уникальность (без учета регистра)
    for (let j = i + 1; j < hashtags.length; j++) {
      if (hashtag.toLowerCase() === hashtags[j].toLowerCase()) {
        return false;
      }
    }
  }

  return true;
};

// Функция для проверки комментария
const validateComment = (value) => {
  return value.length <= MAX_COMMENT_LENGTH;
};

// Создание экземпляра Pristine
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

// Добавление валидаторов
pristine.addValidator(
  hashtagInput,
  validateHashtags,
  `Максимум ${MAX_HASHTAGS} хэштегов, каждый должен начинаться с # и содержать только буквы и цифры (1-19 символов после #). Хэштеги должны быть уникальными.`,
  2,
  true
);

pristine.addValidator(
  commentInput,
  validateComment,
  `Комментарий не может быть длиннее ${MAX_COMMENT_LENGTH} символов.`,
  2,
  true
);

// Блокировка кнопки отправки при невалидной форме
const updateSubmitButtonState = () => {
  submitButton.disabled = !pristine.validate();
};

// Обработчики ввода для валидации "на лету"
hashtagInput.addEventListener('input', () => {
  pristine.validate(hashtagInput);
  updateSubmitButtonState();
});

commentInput.addEventListener('input', () => {
  pristine.validate(commentInput);
  updateSubmitButtonState();
});

// Обработчик отправки формы
const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (!pristine.validate()) {
    // Показываем все ошибки
    pristine.validate();
    updateSubmitButtonState();
    return;
  }

  // Форма валидна, можно отправлять
  const formData = new FormData(form);

  // В будущем здесь будет отправка на сервер
  console.log('Форма отправлена:', Object.fromEntries(formData.entries()));

  // Закрываем форму после успешной отправки
  closeForm();
};

// Функция закрытия формы
const closeForm = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  form.reset();
  fileInput.value = '';
  pristine.reset();
  updateSubmitButtonState();

  // Удаляем обработчик Esc
  document.removeEventListener('keydown', onDocumentKeydown);
};

// Функция открытия формы
const openForm = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  // Добавляем обработчик Esc
  document.addEventListener('keydown', onDocumentKeydown);
};

// Обработчик клавиши Esc
const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    // Не закрываем форму, если фокус в полях ввода
    if (document.activeElement === hashtagInput || document.activeElement === commentInput) {
      return;
    }
    evt.preventDefault();
    closeForm();
  }
};

// Обработчик изменения файла
const onFileInputChange = () => {
  const file = fileInput.files[0];

  if (file) {
    // Проверка типа файла
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Пожалуйста, выберите изображение в формате JPEG, PNG, GIF или WebP.');
      fileInput.value = '';
      return;
    }

    // Проверка размера файла (максимум 5 МБ)
    const maxSize = 5 * 1024 * 1024; // 5 МБ в байтах
    if (file.size > maxSize) {
      alert('Файл слишком большой. Максимальный размер - 5 МБ.');
      fileInput.value = '';
      return;
    }

    openForm();
  }
};

// Обработчик клика по кнопке отмены
const onCancelButtonClick = (evt) => {
  evt.preventDefault();
  closeForm();
};

// Инициализация
const initFormValidation = () => {
  // Начальная блокировка кнопки
  updateSubmitButtonState();

  // Добавляем обработчики
  form.addEventListener('submit', onFormSubmit);
  fileInput.addEventListener('change', onFileInputChange);
  cancelButton.addEventListener('click', onCancelButtonClick);

  // Обработчики для управления Esc при фокусе
  hashtagInput.addEventListener('focus', () => {
    document.removeEventListener('keydown', onDocumentKeydown);
  });

  hashtagInput.addEventListener('blur', () => {
    document.addEventListener('keydown', onDocumentKeydown);
  });

  commentInput.addEventListener('focus', () => {
    document.removeEventListener('keydown', onDocumentKeydown);
  });

  commentInput.addEventListener('blur', () => {
    document.addEventListener('keydown', onDocumentKeydown);
  });
};

export { initFormValidation, closeForm };
