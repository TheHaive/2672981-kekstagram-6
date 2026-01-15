import {
  getRandomInteger,
  getRandomArrayElement,
  createIdGenerator
} from '.utils.js';

import {
  NAMES,
  MESSAGES,
  DESCRIPTIONS
} from '.constants.js';

// Генератор ID для комментариев
const generateCommentId = createIdGenerator();

// Генерация одного комментария
const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

// Генерация массива комментариев (от 0 до 30)
const createComments = () => {
  const commentsCount = getRandomInteger(0, 30);
  return Array.from({ length: commentsCount }, createComment);
};

// Генерация одного объекта-фотографии
const createPhoto = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: DESCRIPTIONS[index - 1] || `Описание фотографии ${index}`,
  likes: getRandomInteger(15, 200),
  comments: createComments()
});

// Генерация массива из 25 фотографий
export const generatePhotos = () => {
  const photos = [];
  for (let i = 1; i <= 25; i++) {
    photos.push(createPhoto(i));
  }
  return photos;
};

// Создание и экспорт массива фотографий
export const photos = generatePhotos();
