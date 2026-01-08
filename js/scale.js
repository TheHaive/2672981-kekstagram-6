import {removeLastCharacter} from './utils.js';

const ScaleOptions = {
  MIN: 25,
  MAX: 100,
  BY_DEFAULT: 100,
  STEP: 25
};

const scaleControlsElement = document.querySelector('.scale');
const scaleSmallerElement = scaleControlsElement.querySelector('.scale__control--smaller');
const scaleBiggerElement = scaleControlsElement.querySelector('.scale__control--bigger');
const scaleValueElement = scaleControlsElement.querySelector('.scale__control--value');
const imagePreviewElement = document.querySelector('.img-upload__preview img');

const setValuesScale = (scale) => {
  scaleValueElement.value = `${scale}%`;
  imagePreviewElement.style.transform = `scale(${scale / 100})`;
};

const resetValuesScale = () => {
  imagePreviewElement.style.transform = '';
  scaleValueElement.value = `${ScaleOptions.BY_DEFAULT}%`;
};

const getScale = () => {
  const currentValue = scaleValueElement.value;
  return Number(removeLastCharacter(currentValue));
};

const onScaleSmallerButtonClick = () => {
  const scale = getScale();
  if(scale > ScaleOptions.MIN) {
    const newScale = scale - ScaleOptions.STEP;
    setValuesScale(newScale);
  }
};

const onScaleBiggerButtonClick = () => {
  const scale = getScale();
  if(scale < ScaleOptions.MAX) {
    const newScale = scale + ScaleOptions.STEP;
    setValuesScale(newScale);
  }
};

const addListeners = () => {
  scaleSmallerElement.addEventListener('click', onScaleSmallerButtonClick);
  scaleBiggerElement.addEventListener('click', onScaleBiggerButtonClick);
};

const removeListeners = () => {
  scaleSmallerElement.removeEventListener('click', onScaleSmallerButtonClick);
  scaleBiggerElement.removeEventListener('click', onScaleBiggerButtonClick);
};

export const initScale = () => {
  resetValuesScale();
  addListeners();
};

export const resetScale = () => {
  resetValuesScale();
  removeListeners();
};
