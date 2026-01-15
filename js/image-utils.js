// Функция для загрузки изображения в предпросмотр
const loadImagePreview = (file) => {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Файл не является изображением'));
      return;
    }

    const reader = new FileReader();

    reader.onload = (evt) => {
      const imagePreview = document.querySelector('.img-upload__preview img');
      imagePreview.src = evt.target.result;
      imagePreview.onload = () => {
        // Сбрасываем трансформации при загрузке нового изображения
        imagePreview.style.transform = 'scale(1)';
        imagePreview.style.filter = 'none';
        resolve();
      };
    };

    reader.onerror = () => {
      reject(new Error('Ошибка чтения файла'));
    };

    reader.readAsDataURL(file);
  });
};

// Функция для получения текущих настроек редактора
const getEditorSettings = () => {
  const form = document.querySelector('.img-upload__form');
  const scaleInput = form.querySelector('.scale__control--value');
  const effectInput = form.querySelector('input[name="effect"]:checked');
  const effectValueInput = form.querySelector('.effect-level__value');

  return {
    scale: parseInt(scaleInput.value) || 100,
    effect: effectInput ? effectInput.value : 'none',
    effectValue: effectValueInput ? parseFloat(effectValueInput.value) : null
  };
};

export { loadImagePreview, getEditorSettings };
