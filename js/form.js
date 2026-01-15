import { sendData } from './api.js';

// Элементы формы
const uploadForm = document.querySelector('.img-upload__form');
const fileInput = uploadForm.querySelector('.img-upload__input');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const successMessage = document.querySelector('.success-message');
const errorMessage = document.querySelector('.error-message');
const closeButton = uploadForm.querySelector('.img-upload__cancel');
const resetButton = uploadForm.querySelector('.img-upload__reset');
const previewContainer = uploadForm.querySelector('.img-upload__preview');
const previewImage = previewContainer.querySelector('img');
const effectLevelSlider = uploadForm.querySelector('.effect-level__slider');
const effectLevelValue = uploadForm.querySelector('.effect-level__value');
const effectsList = uploadForm.querySelector('.effects__list');
const scaleControlSmaller = uploadForm.querySelector('.scale__control--smaller');
const scaleControlBigger = uploadForm.querySelector('.scale__control--bigger');
const scaleControlValue = uploadForm.querySelector('.scale__control--value');

// Переменные для управления состоянием
let currentScale = 100;
let currentEffect = 'none';
let uploadedFile = null;

// Функция для блокировки/разблокировки кнопки отправки
const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled ? 'Отправка...' : 'Опубликовать';
};

// Функция для сброса формы в исходное состояние
const resetForm = () => {
  uploadForm.reset();

  // Сбрасываем масштаб
  currentScale = 100;
  scaleControlValue.value = '100%';
  if (previewImage) {
    previewImage.style.transform = 'scale(1)';
  }

  // Сбрасываем эффекты
  currentEffect = 'none';
  if (previewImage) {
    previewImage.style.filter = 'none';
    previewImage.className = '';
  }

  // Сбрасываем слайдер эффектов
  if (effectLevelSlider) {
    effectLevelSlider.classList.add('hidden');
  }

  // Сбрасываем превью
  if (previewImage) {
    previewImage.src = '';
  }

  // Сбрасываем загруженный файл
  uploadedFile = null;

  // Скрываем сообщения
  if (successMessage) {
    successMessage.classList.add('hidden');
  }
  if (errorMessage) {
    errorMessage.classList.add('hidden');
  }

  // Сбрасываем хэштеги и описание
  const hashtagsInput = uploadForm.querySelector('.text__hashtags');
  const descriptionInput = uploadForm.querySelector('.text__description');

  if (hashtagsInput) hashtagsInput.value = '';
  if (descriptionInput) descriptionInput.value = '';
};

// Функция для показа сообщения об успехе
const showSuccessMessage = () => {
  if (successMessage) {
    successMessage.textContent = 'Фотография успешно опубликована!';
    successMessage.classList.remove('hidden');
  }
};

// Функция для показа сообщения об ошибке
const showErrorMessage = (message) => {
  if (errorMessage) {
    errorMessage.textContent = message || 'Произошла ошибка при отправке. Пожалуйста, попробуйте ещё раз.';
    errorMessage.classList.remove('hidden');
  }
};

// Функция для обновления масштаба изображения
const updateImageScale = () => {
  scaleControlValue.value = `${currentScale}%`;
  const scale = currentScale / 100;
  previewImage.style.transform = `scale(${scale})`;
};

// Функция для загрузки и отображения фотографии
const loadImagePreview = (file) => {
  if (!file || !file.type.startsWith('image/')) {
    showErrorMessage('Пожалуйста, выберите файл изображения');
    return;
  }

  const reader = new FileReader();

  reader.onload = (evt) => {
    previewImage.src = evt.target.result;
    uploadedFile = file;
  };

  reader.onerror = () => {
    showErrorMessage('Не удалось загрузить изображение');
  };

  reader.readAsDataURL(file);
};

// Функция для обновления эффекта
const updateEffect = (effect, value = null) => {
  let filterValue = '';

  switch (effect) {
    case 'chrome':
      filterValue = `grayscale(${value})`;
      break;
    case 'sepia':
      filterValue = `sepia(${value})`;
      break;
    case 'marvin':
      filterValue = `invert(${value * 100}%)`;
      break;
    case 'phobos':
      filterValue = `blur(${value * 3}px)`;
      break;
    case 'heat':
      filterValue = `brightness(${1 + value * 2})`;
      break;
    case 'none':
    default:
      filterValue = 'none';
  }

  previewImage.style.filter = filterValue;
  previewImage.className = `effects__preview--${effect}`;

  // Сохраняем текущий эффект
  currentEffect = effect;
};

// Функция для инициализации слайдера эффектов
const initEffectSlider = () => {
  if (!window.noUiSlider) {
    console.warn('noUiSlider не загружен');
    return;
  }

  if (!effectLevelSlider || !effectLevelValue) {
    return;
  }

  // Создаём слайдер
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
    format: {
      to: (value) => Number(value).toFixed(0),
      from: (value) => Number(value),
    },
  });

  // Скрываем слайдер по умолчанию
  effectLevelSlider.classList.add('hidden');

  // Обработчик изменения слайдера
  effectLevelSlider.noUiSlider.on('update', (values, handle) => {
    const value = parseFloat(values[handle]) / 100;
    effectLevelValue.value = value;
    updateEffect(currentEffect, value);
  });
};

// Функция для обновления слайдера при смене эффекта
const updateEffectSlider = (effect) => {
  if (!effectLevelSlider || !effectLevelSlider.noUiSlider) {
    return;
  }

  switch (effect) {
    case 'chrome':
    case 'sepia':
      effectLevelSlider.noUiSlider.updateOptions({
        range: { min: 0, max: 1 },
        start: 1,
        step: 0.1,
      });
      effectLevelSlider.classList.remove('hidden');
      break;
    case 'marvin':
      effectLevelSlider.noUiSlider.updateOptions({
        range: { min: 0, max: 100 },
        start: 100,
        step: 1,
      });
      effectLevelSlider.classList.remove('hidden');
      break;
    case 'phobos':
      effectLevelSlider.noUiSlider.updateOptions({
        range: { min: 0, max: 3 },
        start: 3,
        step: 0.1,
      });
      effectLevelSlider.classList.remove('hidden');
      break;
    case 'heat':
      effectLevelSlider.noUiSlider.updateOptions({
        range: { min: 1, max: 3 },
        start: 3,
        step: 0.1,
      });
      effectLevelSlider.classList.remove('hidden');
      break;
    case 'none':
    default:
      effectLevelSlider.classList.add('hidden');
      break;
  }
};

// Обработчик изменения файла
const onFileInputChange = (evt) => {
  const file = evt.target.files[0];
  if (file) {
    loadImagePreview(file);

    // Показываем форму редактирования (если она скрыта)
    const editForm = uploadForm.querySelector('.img-upload__overlay');
    if (editForm) {
      editForm.classList.remove('hidden');
    }
  }
};

// Обработчик уменьшения масштаба
const onScaleSmallerClick = () => {
  if (currentScale > 25) {
    currentScale -= 25;
    updateImageScale();
  }
};

// Обработчик увеличения масштаба
const onScaleBiggerClick = () => {
  if (currentScale < 100) {
    currentScale += 25;
    updateImageScale();
  }
};

// Обработчик выбора эффекта
const onEffectChange = (evt) => {
  if (evt.target.type === 'radio') {
    const effect = evt.target.value;
    updateEffectSlider(effect);

    if (effect === 'none') {
      updateEffect('none');
    } else if (effectLevelSlider && effectLevelSlider.noUiSlider) {
      const currentValue = parseFloat(effectLevelSlider.noUiSlider.get()) / 100;
      updateEffect(effect, currentValue);
    }
  }
};

// Обработчик отправки формы
const onFormSubmit = async (evt) => {
  evt.preventDefault();

  // Проверяем, загружено ли изображение
  if (!uploadedFile) {
    showErrorMessage('Пожалуйста, выберите изображение для загрузки');
    return;
  }

  // Блокируем кнопку отправки
  toggleSubmitButton(true);

  // Скрываем предыдущие сообщения
  if (successMessage) successMessage.classList.add('hidden');
  if (errorMessage) errorMessage.classList.add('hidden');

  // Собираем данные формы
  const formData = new FormData(uploadForm);

  // Добавляем данные о масштабе и эффекте
  formData.append('scale', currentScale);
  formData.append('effect', currentEffect);

  if (currentEffect !== 'none' && effectLevelValue) {
    formData.append('effectLevel', effectLevelValue.value);
  }

  try {
    // Отправляем данные на сервер
    await sendData(formData);

    // Показываем сообщение об успехе
    showSuccessMessage();

    // Сбрасываем форму
    resetForm();

    // Закрываем форму (если есть модальное окно)
    const modal = uploadForm.closest('.modal');
    if (modal) {
      modal.classList.add('hidden');
    }

  } catch (error) {
    // Показываем сообщение об ошибке
    showErrorMessage(error.message);

  } finally {
    // Разблокируем кнопку отправки
    toggleSubmitButton(false);
  }
};

// Обработчик закрытия формы
const onCloseButtonClick = () => {
  resetForm();

  // Закрываем форму (если есть модальное окно)
  const modal = uploadForm.closest('.modal');
  if (modal) {
    modal.classList.add('hidden');
  }

  // Закрываем форму редактирования
  const editForm = uploadForm.querySelector('.img-upload__overlay');
  if (editForm) {
    editForm.classList.add('hidden');
  }
};

// Обработчик сброса формы
const onResetButtonClick = () => {
  resetForm();

  // Закрываем форму редактирования
  const editForm = uploadForm.querySelector('.img-upload__overlay');
  if (editForm) {
    editForm.classList.add('hidden');
  }
};

// Инициализация обработчиков
const initFormHandlers = () => {
  if (!uploadForm) return;

  // Основные обработчики
  uploadForm.addEventListener('submit', onFormSubmit);

  if (closeButton) {
    closeButton.addEventListener('click', onCloseButtonClick);
  }

  if (resetButton) {
    resetButton.addEventListener('click', onResetButtonClick);
  }

  // Обработчики для загрузки файла
  if (fileInput) {
    fileInput.addEventListener('change', onFileInputChange);
  }

  // Обработчики масштаба
  if (scaleControlSmaller) {
    scaleControlSmaller.addEventListener('click', onScaleSmallerClick);
  }

  if (scaleControlBigger) {
    scaleControlBigger.addEventListener('click', onScaleBiggerClick);
  }

  // Обработчики эффектов
  if (effectsList) {
    effectsList.addEventListener('change', onEffectChange);
  }

  // Инициализация слайдера эффектов (отложенная, после загрузки noUiSlider)
  if (effectLevelSlider) {
    if (window.noUiSlider) {
      initEffectSlider();
    } else {
      // Ждём загрузки noUiSlider
      document.addEventListener('noUiSliderLoaded', initEffectSlider);
    }
  }

  // Инициализация масштаба
  updateImageScale();
};

export { initFormHandlers, resetForm };
