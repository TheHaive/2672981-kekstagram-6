// Точка входа приложения
import { photos } from '.data.js';
// В вашем основном файле (например, main.js)
import { initThumbnails } from './thumbnail-renderer.js';
import { openBigPicture, initBigPicture } from './big-picture.js';

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
