const ALERT_SHOW_TIME = 5000;

const alertStyles = {
  zIndex : '100',
  position : 'absolute',
  left : '0',
  top : '0',
  right : '0',
  padding : '10px 3px',
  fontSize : '30px',
  lineHeight : '36px',
  textAlign : 'center',
  backgroundColor : '#232321',
  color: '#ffffff',
};

export const checkLength = (array, maxLength) => array.length <= maxLength;

export const checkRepeats = (array) => {
  const itemsInUpperCase = array.map((item) => item.toUpperCase());
  const arrayNoRepeats = new Set(itemsInUpperCase);
  return arrayNoRepeats.size === itemsInUpperCase.length;
};

export const isEscapeKey = (evt) => evt.key === 'Escape';

export const isEnterKey = (evt) => evt.key === 'Enter';

export const removeLastCharacter = (string) => string ? string.slice(0, -1) : string;

export const showAlert = (message) => {
  const alertContainerElement = document.createElement('div');
  Object.assign(alertContainerElement.style, alertStyles);
  alertContainerElement.textContent = message;
  document.body.append(alertContainerElement);

  setTimeout(() => {
    alertContainerElement.remove();
  }, ALERT_SHOW_TIME);
};

export const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

//Следующие 4 функции для работы с муковыми данными

//Функция получения уникального идентификатора (автоинкремент)
export const createIdGenerator = (start = 0) => {
  let lastGeneratedId = start;

  return function() {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

//Функция получения уникального идентификатора (начинает сначала при достижении заданного значения)
export const createCircleGenerator = (maxCount) => {
  let lastGeneratedId = 0;

  return function() {
    if(lastGeneratedId >= maxCount) {
      lastGeneratedId = 0;
      return lastGeneratedId++;
    }
    return lastGeneratedId++;
  };
};

//Функция получения случайного значения в заданных пределах
export const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

//Функция получения случайного элемента массива
export const getRandomArrayElement = (elements) => (
  elements[getRandomInteger(0, elements.length - 1)]
);

