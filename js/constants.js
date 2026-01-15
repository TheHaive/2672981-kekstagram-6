const API_URL = {
  GET: 'https://29.javascript.htmlacademy.pro/kekstagram/data',
  POST: 'https://29.javascript.htmlacademy.pro/kekstagram',
};

const SCALE = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
  DEFAULT: 100,
};

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const EFFECTS = {
  none: { filter: 'none', unit: '', min: 0, max: 100, step: 1 },
  chrome: { filter: 'grayscale', unit: '', min: 0, max: 1, step: 0.1 },
  sepia: { filter: 'sepia', unit: '', min: 0, max: 1, step: 0.1 },
  marvin: { filter: 'invert', unit: '%', min: 0, max: 100, step: 1 },
  phobos: { filter: 'blur', unit: 'px', min: 0, max: 3, step: 0.1 },
  heat: { filter: 'brightness', unit: '', min: 1, max: 3, step: 0.1 },
};

const HASHTAG = {
  MAX_COUNT: 5,
  MAX_LENGTH: 20,
  REGEX: /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/,
};

const COMMENT = {
  MAX_LENGTH: 140,
};

const RANDOM_PHOTOS_COUNT = 10;

const DEBOUNCE_DELAY = 500;

const RENDER_DELAY = 500;

export {
  API_URL,
  SCALE,
  FILE_TYPES,
  EFFECTS,
  HASHTAG,
  COMMENT,
  RANDOM_PHOTOS_COUNT,
  DEBOUNCE_DELAY,
  RENDER_DELAY,
};
