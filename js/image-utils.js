import {FILE_TYPES} from './constants.js';

const isValidFileType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const createImageElement = (src) => {
  const img = document.createElement('img');
  img.src = src;
  return img;
};

export {isValidFileType, createImageElement};
