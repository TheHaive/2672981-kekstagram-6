// Модуль для работы с удалённым сервером
const API_URL = 'https://up.htmlacademy.ru'; // Замените на актуальный адрес из техзадания

// Получение данных с сервера
const getData = async () => {
  try {
    const response = await fetch(`${API_URL}/data`);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
    throw error; // Пробрасываем ошибку дальше для обработки
  }
};

// Отправка данных на сервер
const sendData = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Ошибка при отправке данных:', error);
    throw error;
  }
};

export { getData, sendData };
