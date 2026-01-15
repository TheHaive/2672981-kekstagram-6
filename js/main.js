// Точка входа приложения
import { photos } from '.data.js';

// Экспортируем данные для использования в других модулях (если потребуется)
export { photos };

// Для отладки - выводим в консоль
console.log('Массив фотографий успешно сгенерирован:');
console.log(photos);
console.log(`Всего фотографий: ${photos.length}`);
console.log(`Всего комментариев: ${photos.reduce((sum, photo) => sum + photo.comments.length, 0)}`);

// Здесь в дальнейшем можно добавить инициализацию UI, обработчики событий и т.д.
