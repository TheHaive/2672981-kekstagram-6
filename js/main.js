// Массив имён для комментаторов
const NAMES = [
  'Артём', 'Мария', 'Иван', 'Анна', 'Дмитрий',
  'Елена', 'Сергей', 'Ольга', 'Алексей', 'Наталья'
];

// Массив сообщений для комментариев
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// Массив описаний для фотографий
const DESCRIPTIONS = [
  'Красивый закат на море',
  'Мой пушистый кот',
  'Горный пейзаж',
  'Вкусный домашний обед',
  'Путешествие по Европе',
  'Зимняя сказка',
  'Летний отдых',
  'Архитектура старого города',
  'Цветущий сад',
  'Ночной город',
  'Море и пальмы',
  'Семейный праздник',
  'Спортивные достижения',
  'Любимая книга',
  'Кофе утром',
  'Прогулка в лесу',
  'Концерт живой музыки',
  'Фестиваль воздушных шаров',
  'Рассвет в горах',
  'Уличное искусство',
  'Традиционная кухня',
  'Исторический памятник',
  'Домашний питомец',
  'Город с высоты',
  'Дружеская встреча'
];

// Генератор случайных чисел в диапазоне
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// Генератор уникальных ID для комментариев
const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};
const generateCommentId = createIdGenerator();

// Получение случайного элемента массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

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
const generatePhotos = () => {
  const photos = [];
  for (let i = 1; i <= 25; i++) {
    photos.push(createPhoto(i));
  }
  return photos;
};

// Создание и экспорт массива фотографий
const photos = generatePhotos();

// Для проверки в консоли (если нужно)
console.log(photos);

// Экспорт для использования в других модулях (если требуется)
export { photos };
