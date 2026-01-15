// Временные данные для разработки (имитация данных с сервера)
const mockPhotos = [
  {
    id: 1,
    url: 'https://example.com/photo1.jpg',
    description: 'Красивый закат на море',
    likes: 42,
    comments: 5
  },
  {
    id: 2,
    url: 'https://example.com/photo2.jpg',
    description: 'Горный пейзаж',
    likes: 28,
    comments: 3
  },
  {
    id: 3,
    url: 'https://example.com/photo3.jpg',
    description: 'Город ночью',
    likes: 56,
    comments: 12
  },
  {
    id: 4,
    url: 'https://example.com/photo4.jpg',
    description: 'Лесная тропинка',
    likes: 33,
    comments: 7
  }
];

// Функция для получения шаблона picture из DOM
const getPictureTemplate = () => {
  const template = document.querySelector('#picture');
  if (!template) {
    console.error('Шаблон #picture не найден');
    return null;
  }
  return template.content.querySelector('.picture');
};

// Функция для создания DOM-элемента фотографии на основе данных
const createPictureElement = (photoData) => {
  const template = getPictureTemplate();
  if (!template) return null;

  // Клонируем шаблон
  const pictureElement = template.cloneNode(true);

  // Заполняем данными
  const imgElement = pictureElement.querySelector('.picture__img');
  if (imgElement) {
    imgElement.src = photoData.url;
    imgElement.alt = photoData.description;
  }

  const likesElement = pictureElement.querySelector('.picture_likes');
  if (likesElement) {
    likesElement.textContent = photoData.likes;
  }

  const commentsElement = pictureElement.querySelector('.picture_comments');
  if (commentsElement) {
    commentsElement.textContent = photoData.comments;
  }

  // Добавляем data-атрибут для идентификации
  pictureElement.dataset.photoId = photoData.id;

  return pictureElement;
};

// Основная функция для отрисовки всех фотографий
const renderThumbnails = (photos) => {
  const picturesContainer = document.querySelector('.pictures');
  if (!picturesContainer) {
    console.error('Контейнер .pictures не найден');
    return;
  }

  // Очищаем контейнер (если нужно)
  // picturesContainer.innerHTML = '';

  // Создаём DocumentFragment для оптимизации вставки
  const fragment = document.createDocumentFragment();

  // Создаём элементы для каждой фотографии и добавляем во фрагмент
  photos.forEach(photo => {
    const pictureElement = createPictureElement(photo);
    if (pictureElement) {
      fragment.appendChild(pictureElement);
    }
  });

  // Вставляем все элементы за одну операцию
  picturesContainer.appendChild(fragment);
};

// Функция для инициализации модуля
const initThumbnails = () => {
  // Здесь в реальном проекте будет запрос к серверу
  // fetch('/api/photos').then(...)

  // Используем временные данные
  renderThumbnails(mockPhotos);

  console.log('Модуль миниатюр инициализирован');
};

// Экспорт функций для использования в других модулях
export { initThumbnails, renderThumbnails };

// Автоматическая инициализация при загрузке модуля (если нужно)
// initThumbnails();
