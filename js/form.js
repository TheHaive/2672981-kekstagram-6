import { sendData } from './api.js';

// Элементы формы
const uploadForm = document.querySelector('.img-upload__form');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const successMessage = document.querySelector('.success-message');
const errorMessage = document.querySelector('.error-message');
const closeButton = uploadForm.querySelector('.img-upload__cancel');
const resetButton = uploadForm.querySelector('.img-upload__reset');

// Функция для блокировки/разблокировки кнопки отправки
const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled ? 'Отправка...' : 'Опубликовать';
};

// Функция для сброса формы в исходное состояние
const resetForm = () => {
  uploadForm.reset();

  // Скрываем сообщения
  if (successMessage) {
    successMessage.classList.add('hidden');
  }
  if (errorMessage) {
    errorMessage.classList.add('hidden');
  }

  // Возвращаем форму в исходное состояние
  const preview = uploadForm.querySelector('.img-upload__preview img');
  if (preview) {
    preview.src = '';
  }

  // Сбрасываем эффекты и хэштеги, если они есть
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

// Обработчик отправки формы
const onFormSubmit = async (evt) => {
  evt.preventDefault();

  // Блокируем кнопку отправки
  toggleSubmitButton(true);

  // Скрываем предыдущие сообщения
  if (successMessage) successMessage.classList.add('hidden');
  if (errorMessage) errorMessage.classList.add('hidden');

  // Собираем данные формы
  const formData = new FormData(uploadForm);

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
};

// Обработчик сброса формы
const onResetButtonClick = () => {
  resetForm();
};

// Инициализация обработчиков
const initFormHandlers = () => {
  if (uploadForm) {
    uploadForm.addEventListener('submit', onFormSubmit);
  }

  if (closeButton) {
    closeButton.addEventListener('click', onCloseButtonClick);
  }

  if (resetButton) {
    resetButton.addEventListener('click', onResetButtonClick);
  }
};

export { initFormHandlers, resetForm };
