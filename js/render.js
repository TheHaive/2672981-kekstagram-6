import { getData } from './api.js';

// Элементы для отображения
const photosContainer = document.querySelector('.pictures');
const errorMessage = document.querySelector('.error-message');
const loadingIndicator = document.querySelector('.loading-indicator');

// Функция для создания элемента фотографии
const createPhotoElement = (photoData) => {
  const template = document.querySelector('#picture-template').content;
  const element = template.cloneNode(true);

  const img = element.querySelector('.picture__img');
  const likes = element.querySelector('.picture__likes');
  const comments = element.querySelector('.picture__comments');

  img.src = photoData.url;
  img.alt = photoData.description;
  likes.textContent = photoData.likes;
  comments.textContent = photoData.comments.length;

  return element;
};

// Функция для отрисовки фотографий
const renderPhotos = async () => {
  // Показываем индикатор загрузки
  if (loadingIndicator) {
    loadingIndicator.classList.remove('hidden');
  }

  try {
    // Получаем данные с сервера вместо моковых данных
    const photos = await getData();

    // Очищаем контейнер
    photosContainer.innerHTML = '';

    // Создаём и добавляем элементы фотографий
    photos.forEach(photoData => {
      const photoElement = createPhotoElement(photoData);
      photosContainer.appendChild(photoElement);
    });

    // Скрываем сообщение об ошибке, если оно было показано
    if (errorMessage) {
      errorMessage.classList.add('hidden');
    }

  } catch (error) {
    // Показываем сообщение об ошибке
    console.error('Ошибка при загрузке фотографий:', error);

    if (errorMessage) {
      errorMessage.textContent = 'Не удалось загрузить фотографии. Пожалуйста, попробуйте позже.';
      errorMessage.classList.remove('hidden');
    }
  } finally {
    // Скрываем индикатор загрузки
    if (loadingIndicator) {
      loadingIndicator.classList.add('hidden');
    }
  }
};

export { renderPhotos };
