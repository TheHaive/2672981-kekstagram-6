import noUiSlider from '/vendor/nouislider/nouislider.min.js';
import '/vendor/nouislider/nouislider.min.css';

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const EFFECTS = {
  none: {
    min: 0,
    max: 100,
    step: 1,
    unit: '',
    filter: 'none'
  },
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
    filter: 'grayscale'
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
    filter: 'sepia'
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
    filter: 'invert'
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
    filter: 'blur'
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
    filter: 'brightness'
  }
};

const form = document.querySelector('.img-upload__form');
const imagePreview = form.querySelector('.img-upload__preview img');
const scaleInput = form.querySelector('.scale__control--value');
const scaleSmallerButton = form.querySelector('.scale__control--smaller');
const scaleBiggerButton = form.querySelector('.scale__control--bigger');
const effectLevelContainer = form.querySelector('.img-upload__effect-level');
const effectLevelSlider = form.querySelector('.effect-level__slider');
const effectLevelValue = form.querySelector('.effect-level__value');
const effectsList = form.querySelector('.effects__list');
const effectNoneInput = form.querySelector('#effect-none');

let currentScale = DEFAULT_SCALE;
let currentEffect = 'none';

// Функция для обновления масштаба изображения
const updateScale = () => {
  // Обновляем значение в поле ввода
  scaleInput.value = `${currentScale}%`;

  // Применяем масштаб к изображению
  imagePreview.style.transform = `scale(${currentScale / 100})`;

  // Записываем значение в скрытое поле для отправки на сервер
  const scaleHiddenInput = form.querySelector('input[name="scale"]') ||
    document.createElement('input');
  if (!form.querySelector('input[name="scale"]')) {
    scaleHiddenInput.type = 'hidden';
    scaleHiddenInput.name = 'scale';
    scaleHiddenInput.value = currentScale;
    form.appendChild(scaleHiddenInput);
  } else {
    scaleHiddenInput.value = currentScale;
  }
};

// Обработчики кнопок масштаба
const onScaleSmallerClick = () => {
  currentScale = Math.max(currentScale - SCALE_STEP, MIN_SCALE);
  updateScale();
};

const onScaleBiggerClick = () => {
  currentScale = Math.min(currentScale + SCALE_STEP, MAX_SCALE);
  updateScale();
};

// Функция для сброса эффектов
const resetEffects = () => {
  currentEffect = 'none';
  imagePreview.style.filter = 'none';
  effectLevelContainer.classList.add('hidden');

  // Выбираем радио-кнопку "Оригинал"
  effectNoneInput.checked = true;

  // Сбрасываем значение слайдера
  if (effectLevelSlider.noUiSlider) {
    effectLevelSlider.noUiSlider.set(EFFECTS.none.max);
  }

  // Очищаем скрытое поле эффекта
  const effectHiddenInput = form.querySelector('input[name="effect"]');
  if (effectHiddenInput) {
    effectHiddenInput.value = 'none';
  }
};

// Функция для инициализации слайдера
const initEffectSlider = () => {
  if (effectLevelSlider.noUiSlider) {
    effectLevelSlider.noUiSlider.destroy();
  }

  const effect = EFFECTS[currentEffect];

  // Скрываем слайдер для эффекта "none"
  if (currentEffect === 'none') {
    effectLevelContainer.classList.add('hidden');
    return;
  }

  effectLevelContainer.classList.remove('hidden');

  noUiSlider.create(effectLevelSlider, {
    range: {
      min: effect.min,
      max: effect.max
    },
    start: effect.max,
    step: effect.step,
    connect: 'lower'
  });

  // Обработчик обновления слайдера
  effectLevelSlider.noUiSlider.on('update', (values, handle) => {
    const value = values[handle];
    effectLevelValue.value = value;

    // Обновляем скрытое поле для отправки на сервер
    const effectValueHiddenInput = form.querySelector('input[name="effect_value"]') ||
      document.createElement('input');
    if (!form.querySelector('input[name="effect_value"]')) {
      effectValueHiddenInput.type = 'hidden';
      effectValueHiddenInput.name = 'effect_value';
      effectValueHiddenInput.value = value;
      form.appendChild(effectValueHiddenInput);
    } else {
      effectValueHiddenInput.value = value;
    }

    // Применяем эффект к изображению
    applyEffect(value);
  });
};

// Функция для применения эффекта к изображению
const applyEffect = (value) => {
  const effect = EFFECTS[currentEffect];

  if (currentEffect === 'none') {
    imagePreview.style.filter = 'none';
    return;
  }

  let filterValue;
  switch (currentEffect) {
    case 'chrome':
      filterValue = `grayscale(${value})`;
      break;
    case 'sepia':
      filterValue = `sepia(${value})`;
      break;
    case 'marvin':
      filterValue = `invert(${value}%)`;
      break;
    case 'phobos':
      filterValue = `blur(${value}px)`;
      break;
    case 'heat':
      filterValue = `brightness(${value})`;
      break;
    default:
      filterValue = 'none';
  }

  imagePreview.style.filter = filterValue;

  // Обновляем скрытое поле эффекта
  const effectHiddenInput = form.querySelector('input[name="effect"]') ||
    document.createElement('input');
  if (!form.querySelector('input[name="effect"]')) {
    effectHiddenInput.type = 'hidden';
    effectHiddenInput.name = 'effect';
    effectHiddenInput.value = currentEffect;
    form.appendChild(effectHiddenInput);
  } else {
    effectHiddenInput.value = currentEffect;
  }
};

// Обработчик изменения эффекта
const onEffectChange = (evt) => {
  if (evt.target.matches('input[type="radio"][name="effect"]')) {
    currentEffect = evt.target.value;

    // Сбрасываем слайдер к начальному значению
    const effect = EFFECTS[currentEffect];

    // Инициализируем или обновляем слайдер
    if (currentEffect === 'none') {
      effectLevelContainer.classList.add('hidden');
      imagePreview.style.filter = 'none';

      // Обновляем скрытые поля
      const effectHiddenInput = form.querySelector('input[name="effect"]');
      const effectValueHiddenInput = form.querySelector('input[name="effect_value"]');

      if (effectHiddenInput) {
        effectHiddenInput.value = 'none';
      }
      if (effectValueHiddenInput) {
        effectValueHiddenInput.value = '';
      }
    } else {
      effectLevelContainer.classList.remove('hidden');

      // Если слайдер уже создан, обновляем его настройки
      if (effectLevelSlider.noUiSlider) {
        effectLevelSlider.noUiSlider.updateOptions({
          range: {
            min: effect.min,
            max: effect.max
          },
          start: effect.max,
          step: effect.step
        });
      } else {
        initEffectSlider();
      }

      // Применяем эффект с максимальным значением
      applyEffect(effect.max);
    }
  }
};

// Функция для сброса всех настроек редактора
const resetEditor = () => {
  // Сбрасываем масштаб
  currentScale = DEFAULT_SCALE;
  updateScale();

  // Сбрасываем эффекты
  resetEffects();

  // Сбрасываем скрытые поля
  const scaleHiddenInput = form.querySelector('input[name="scale"]');
  const effectHiddenInput = form.querySelector('input[name="effect"]');
  const effectValueHiddenInput = form.querySelector('input[name="effect_value"]');

  if (scaleHiddenInput) {
    scaleHiddenInput.value = '';
  }
  if (effectHiddenInput) {
    effectHiddenInput.value = '';
  }
  if (effectValueHiddenInput) {
    effectValueHiddenInput.value = '';
  }
};

// Инициализация редактора изображения
const initImageEditor = () => {
  // Инициализируем масштаб
  updateScale();

  // Добавляем обработчики для кнопок масштаба
  scaleSmallerButton.addEventListener('click', onScaleSmallerClick);
  scaleBiggerButton.addEventListener('click', onScaleBiggerClick);

  // Инициализируем слайдер эффектов
  initEffectSlider();

  // Добавляем обработчик изменения эффекта
  effectsList.addEventListener('change', onEffectChange);

  // Скрываем контейнер слайдера по умолчанию
  effectLevelContainer.classList.add('hidden');

  console.log('Редактор изображения инициализирован');
};

export { initImageEditor, resetEditor };
