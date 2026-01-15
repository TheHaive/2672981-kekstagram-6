// Вспомогательные функции

// Генератор случайных чисел в диапазоне
export const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// Получение случайного элемента массива
export const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

// Генератор уникальных ID
export const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};
