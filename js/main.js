// Точка входа приложения
import { photos } from '.data.js';
// В вашем основном файле (например, main.js)
import { initThumbnails } from './thumbnail-renderer.js';
import { openBigPicture, initBigPicture } from './big-picture.js';
import { initFormValidation } from './js/form-validation.js';
import { initImageEditor, resetEditor } from './js/image-editor.js';
import { closeForm } from './js/form-validation.js';
import { renderPhotos } from './render.js';
import { initFormHandlers } from './form.js';

// Инициализация приложения
const initApp = () => {
  // Загружаем и отрисовываем фотографии
  renderPhotos();

  // Инициализируем обработчики формы
  initFormHandlers();

  // Можно добавить обработку обновления фотографий по таймеру или событию
  // Например, обновлять каждые 30 секунд
  // setInterval(renderPhotos, 30000);
};

// Запускаем приложение после загрузки DOM
document.addEventListener('DOMContentLoaded', initApp);

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  initImageEditor();

  // Интеграция с закрытием формы
  const originalCloseForm = closeForm;
  window.closeForm = () => {
    resetEditor(); // Сбрасываем редактор
    originalCloseForm(); // Вызываем оригинальную функцию
  };

  console.log('Редактор изображения готов к работе');
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  initFormValidation();

  // Дополнительная инициализация, если нужно
  console.log('Форма валидации инициализирована');
});

// Пример массива с данными фотографий (должен приходить с сервера или из другого модуля)
const pictures = [
  {
    id: 1,
    url: 'photos/1.jpg',
    description: 'Прекрасный закат на море',
    likes: 150,
    comments: [
      { id: 1, avatar: 'img/avatar-1.svg', name: 'Анна', message: 'Восхитительно!' },
      { id: 2, avatar: 'img/avatar-2.svg', name: 'Иван', message: 'Какие цвета!' }
    ]
  }
];

// Инициализация модуля полноразмерного просмотра
initBigPicture();

// Пример привязки клика по миниатюрам (предполагается, что у вас уже есть код отрисовки миниатюр)
const thumbnailElements = document.querySelectorAll('.picture'); // или другой селектор миниатюр

thumbnailElements.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', () => {
    // Предполагаем, что порядок миниатюр соответствует порядку в массиве pictures
    const pictureData = pictures[index];
    openBigPicture(pictureData);
  });
});

// Инициализируем отрисовку миниатюр при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  initThumbnails();
});

// Экспортируем данные для использования в других модулях (если потребуется)
export { photos };

// Для отладки - выводим в консоль
console.log('Массив фотографий успешно сгенерирован:');
console.log(photos);
console.log(`Всего фотографий: ${photos.length}`);
console.log(`Всего комментариев: ${photos.reduce((sum, photo) => sum + photo.comments.length, 0)}`);

// Здесь в дальнейшем можно добавить инициализацию UI, обработчики событий и т.д.
