const NUMBER_SYSTEM = 10;
const PERCENT_DIVIDER = 100;
const SCALE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;

const pictureUploadPreview = document.querySelector('.img-upload__preview img');
const pictureScaleInput = document.querySelector('.scale__control--value');
const pictureScaleDownButton = document.querySelector('.scale__control--smaller');
const pictureScaleUpButton = document.querySelector('.scale__control--bigger');

const changeScale = (scaleValue) => {
  pictureUploadPreview.style.transform = `scale(${parseInt(scaleValue, NUMBER_SYSTEM) / PERCENT_DIVIDER})`;
};

const onScaleDownButtonClick = () => {
  if (parseInt(pictureScaleInput.value, NUMBER_SYSTEM) > MIN_SCALE_VALUE) {
    pictureScaleInput.value = `${parseInt(pictureScaleInput.value, NUMBER_SYSTEM) - SCALE_STEP}%`;
    changeScale(pictureScaleInput.value);
  }
};

const onScaleUpButtonClick = () => {
  if (parseInt(pictureScaleInput.value, NUMBER_SYSTEM) < MAX_SCALE_VALUE) {
    pictureScaleInput.value = `${parseInt(pictureScaleInput.value, NUMBER_SYSTEM) + SCALE_STEP}%`;
    changeScale(pictureScaleInput.value);
  }
};

const addScaleListeners = () => {
  pictureScaleDownButton.addEventListener('click', onScaleDownButtonClick);
  pictureScaleUpButton.addEventListener('click', onScaleUpButtonClick);
};

export { addScaleListeners };
