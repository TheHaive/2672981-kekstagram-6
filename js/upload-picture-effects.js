const EffectSetups = {
  CHROME: {
    range: {
      min: 0,
      max: 1
    },
    step: 0.1,
    filter: 'grayscale',
    unit: ''
  },
  SEPIA: {
    range: {
      min: 0,
      max: 1
    },
    step: 0.1,
    filter: 'sepia',
    unit: ''
  },
  MARVIN: {
    range: {
      min: 0,
      max: 100
    },
    step: 1,
    filter: 'invert',
    unit: '%'
  },
  PHOBOS: {
    range: {
      min: 0,
      max: 3
    },
    step: 0.1,
    filter: 'blur',
    unit: 'px'
  },
  HEAT: {
    range: {
      min: 1,
      max: 3
    },
    step: 0.1,
    filter: 'brightness',
    unit: ''
  }
};

const DefaultSliderValues = {
  MIN: 0,
  MAX: 0,
  CONNECT: 'lower'
};

const DEFAULT_EFFECT_VALUE = 100;

const pictureUploadPreview = document.querySelector('.img-upload__preview img');
const effectLevelSliderContainer = document.querySelector('.img-upload__effect-level');
const effectLevelInput = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');

const onEffectInputClick = (evt) => {
  if (evt.target.closest('.effects__radio')) {
    setupSlider(evt.target.value);
  }
};

const addEffectListener = () => {
  effectsList.addEventListener('change', onEffectInputClick);
};

const updateSlider = (effect) => {
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: effect.range.min,
      max: effect.range.max,
    },
    step: effect.step,
    start: DEFAULT_EFFECT_VALUE,
  });
};

function setupSlider (effect) {
  if (effect === 'none') {
    pictureUploadPreview.style.filter = null;
    effectLevelSliderContainer.classList.add('hidden');
  } else {
    updateSlider(EffectSetups[effect.toUpperCase()]);
    effectLevelSliderContainer.classList.remove('hidden');
    effectLevelSlider.noUiSlider.off();
    effectLevelSlider.noUiSlider.on('update', () => {
      effectLevelInput.value = effectLevelSlider.noUiSlider.get();
      pictureUploadPreview.style.filter = `${EffectSetups[effect.toUpperCase()].filter}(${effectLevelInput.value + EffectSetups[effect.toUpperCase()].unit})`;
    });
  }
}

const createSlider = () => {
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: DefaultSliderValues.MIN,
      max: DefaultSliderValues.MAX,
    },
    start: DEFAULT_EFFECT_VALUE,
    connect: DefaultSliderValues.CONNECT
  });
};

const destroySlider = () => effectLevelSlider.noUiSlider.destroy();

export { createSlider, setupSlider, destroySlider, addEffectListener };
