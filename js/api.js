import {API_URL} from './constants.js';

const loadPhotos = async () => {
  const response = await fetch(API_URL.GET);
  if (!response.ok) {
    throw new Error(`Ошибка загрузки данных: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

const uploadPhoto = async (formData) => {
  const response = await fetch(API_URL.POST, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    throw new Error(`Ошибка отправки данных: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

export {loadPhotos, uploadPhoto};
