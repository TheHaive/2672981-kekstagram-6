const STEP_SCALE = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const FILTERS = {
  none: {
    name: 'none',
    unit: '',
    min: 0,
    max: 100,
    step: 1,
    start: 100
  },
  chrome: {
    name: 'grayscale',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1
  },
  sepia: {
    name: 'sepia',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1
  },
  marvin: {
    name: 'invert',
    unit: '%',
    min: 0,
    max: 100,
    step: 1,
    start: 100
  },
  phobos: {
    name: 'blur',
    unit: 'px',
    min: 0,
    max: 3,
    step: 0.1,
    start: 3
  },
  heat: {
    name: 'brightness',
    unit: '',
    min: 1,
    max: 3,
    step: 0.1,
    start: 3
  }
};

const scaleValue = document.querySelector('.scale__control--value');
const scaleBtnDown = document.querySelector('.scale__control--smaller');
const scaleBtnUp = document.querySelector('.scale__control--bigger');
const imageElem = document.querySelector('.img-upload__preview img');
const effectsBox = document.querySelector('.effects__list');
const effectSliderBox = document.querySelector('.effect-level');
const effectValueInput = document.querySelector('.effect-level__value');
const effectSliderElem = document.querySelector('.effect-level__slider');

let scaleCurrent = DEFAULT_SCALE;
let selectedFilter = 'none';
let instanceSlider = null;

const scaleDisplayUpdate = () => {
  scaleValue.value = `${scaleCurrent}%`;
  const scaleFactor = scaleCurrent / 100;
  imageElem.style.transform = `scale(${scaleFactor})`;
}

const decreaseScale = () => {
  if (scaleCurrent > MIN_SCALE) {
    scaleCurrent -= STEP_SCALE;
    scaleDisplayUpdate();
  }
}

const increaseScale = () => {
  if (scaleCurrent < MAX_SCALE) {
    scaleCurrent += STEP_SCALE;
    scaleDisplayUpdate();
  }
}

const scaleReset = ()  => {
  scaleCurrent = DEFAULT_SCALE;
  scaleDisplayUpdate();
}

const sliderInitialize = () => {
  if (instanceSlider) {
    instanceSlider.destroy();
  }

  if (selectedFilter === 'none') {
    effectSliderBox.classList.add('hidden');
    imageElem.style.filter = 'none';
    return;
  }

  effectSliderBox.classList.remove('hidden');

  const { min, max, step, start } = FILTERS[selectedFilter];

  instanceSlider = noUiSlider.create(effectSliderElem, {
    range: {
      min,
      max
    },
    start,
    step,
    connect: 'lower',
    format: {
      to: (value) => Number.isInteger(value) ? value : value.toFixed(1),
      from: (value) => parseFloat(value)
    }
  });

  instanceSlider.on('update', () => {
    const sliderValue = instanceSlider.get();
    effectValueInput.value = sliderValue;
    filterEffectApply(sliderValue);
  });
}

const filterEffectApply = (value) => {
  const { name, unit } = FILTERS[selectedFilter];

  if (selectedFilter === 'none') {
    imageElem.style.filter = 'none';
  } else {
    imageElem.style.filter = `${name}(${value}${unit})`;
  }
}

const handleEffectChange = (event) => {
  if (event.target.type === 'radio') {
    selectedFilter = event.target.value;
    sliderInitialize();
  }
}

const filtersReset = () => {
  selectedFilter = 'none';
  const originalEffect = effectsBox.querySelector('#effect-none');
  if (originalEffect) {
    originalEffect.checked = true;
  }
  sliderInitialize();
}

const scaleEffectsSetup = () => {
  scaleDisplayUpdate();

  scaleBtnDown.addEventListener('click', decreaseScale);
  scaleBtnUp.addEventListener('click', increaseScale);

  effectsBox.addEventListener('change', handleEffectChange);

  sliderInitialize();
}

const scaleEffectsCleanup = () => {
  scaleBtnDown.removeEventListener('click', decreaseScale);
  scaleBtnUp.removeEventListener('click', increaseScale);
  effectsBox.removeEventListener('change', handleEffectChange);

  if (instanceSlider) {
    instanceSlider.destroy();
    instanceSlider = null;
  }

  scaleReset();
  filtersReset();
}

export { scaleEffectsSetup, scaleEffectsCleanup, scaleReset, filtersReset };
