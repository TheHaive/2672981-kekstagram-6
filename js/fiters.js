// 1. Показать блок фильтров после загрузки изображений
const imgFilters = document.querySelector('.img-filters');
imgFilters.classList.remove('img-filters--inactive');

// 2. Элементы фильтров
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');

// Массив с фотографиями (заполняется после загрузки с сервера)
let photos = [];

// Текущий активный фильтр
let currentFilter = 'default';

// Функция для отрисовки фотографий
const renderPhotos = (photosToRender) => {
  // Удаляем все текущие фотографии
  const photoContainer = document.querySelector('.pictures');
  const currentPhotos = photoContainer.querySelectorAll('.picture');
  currentPhotos.forEach(photo => photo.remove());

  // Создаём и добавляем новые фотографии
  // (здесь должен быть код создания DOM-элементов для каждой фотографии)
  photosToRender.forEach(photo => {
    const photoElement = createPhotoElement(photo); // Предполагаемая функция
    photoContainer.appendChild(photoElement);
  });
};

// 3. Функции фильтрации
const getDefaultPhotos = () => photos;

const getRandomPhotos = () => {
  // Создаём копию массива, чтобы не менять оригинал
  const shuffled = [...photos].sort(() => Math.random() - 0.5);
  // Возвращаем первые 10 уникальных фотографий
  return shuffled.slice(0, 10);
};

const getDiscussedPhotos = () => {
  // Создаём копию массива для сортировки
  const sorted = [...photos].sort((a, b) => b.comments.length - a.comments.length);
  return sorted;
};

// 4. Основная функция фильтрации с устранением дребезга
const applyFilter = (filterType) => {
  let filteredPhotos;

  switch (filterType) {
    case 'random':
      filteredPhotos = getRandomPhotos();
      break;
    case 'discussed':
      filteredPhotos = getDiscussedPhotos();
      break;
    default:
      filteredPhotos = getDefaultPhotos();
  }

  renderPhotos(filteredPhotos);
};

// Debounce функция
const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

// Функция-обработчик переключения фильтров с debounce
const onFilterChange = debounce((filterType) => {
  if (currentFilter === filterType) {
    return;
  }

  // Обновляем активный фильтр в UI
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  document.querySelector(`#filter-${filterType}`).classList.add('img-filters__button--active');

  currentFilter = filterType;
  applyFilter(filterType);
});

// Обработчики событий для фильтров
filterDefault.addEventListener('click', () => onFilterChange('default'));
filterRandom.addEventListener('click', () => onFilterChange('random'));
filterDiscussed.addEventListener('click', () => onFilterChange('discussed'));

// Инициализация после загрузки данных с сервера
// Предполагается, что функция fetchPhotos загружает массив photos
fetchPhotos().then((loadedPhotos) => {
  photos = loadedPhotos;
  // Первоначальная отрисовка
  applyFilter('default');
});
