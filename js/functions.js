// 1. Функция для проверки длины строки
function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}

// 2. Функция для проверки, является ли строка палиндромом
function isPalindrome(string) {
  // Приводим к нижнему регистру и удаляем пробелы
  const cleanedString = string.toLowerCase().replace(/\s/g, '');

  // Сравниваем строку с её перевёрнутой версией
  const reversedString = cleanedString.split('').reverse().join('');

  return cleanedString === reversedString;
}

// Тестирование функции проверки длины
console.log(checkStringLength('проверяемая строка', 20)); // true
console.log(checkStringLength('проверяемая строка', 18)); // true
console.log(checkStringLength('проверяемая строка', 10)); // false

// Тестирование функции проверки палиндрома
console.log(isPalindrome('топот')); // true
console.log(isPalindrome('ДовОд')); // true
console.log(isPalindrome('Кекс')); // false
console.log(isPalindrome('Лёша на полке клопа нашёл ')); // true


/**
 * Проверяет, укладывается ли встреча в рамки рабочего дня
 * @param {string} workStart - Начало рабочего дня в формате "часы:минуты"
 * @param {string} workEnd - Конец рабочего дня в формате "часы:минуты"
 * @param {string} meetingStart - Начало встречи в формате "часы:минуты"
 * @param {number} duration - Продолжительность встречи в минутах
 * @returns {boolean} true, если встреча укладывается в рабочий день, иначе false
 */
function isMeetingWithinWorkHours(workStart, workEnd, meetingStart, duration) {
    // Функция для преобразования строки времени в минуты с начала дня
    function timeStringToMinutes(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours * 60 + minutes;
    }

    // Преобразуем все времена в минуты
    const workStartMinutes = timeStringToMinutes(workStart);
    const workEndMinutes = timeStringToMinutes(workEnd);
    const meetingStartMinutes = timeStringToMinutes(meetingStart);
    const meetingEndMinutes = meetingStartMinutes + duration;

    // Проверяем, что начало и конец встречи находятся в пределах рабочего дня
    // При этом встреча может начинаться ровно в начале или заканчиваться ровно в конце рабочего дня
    return meetingStartMinutes >= workStartMinutes &&
           meetingEndMinutes <= workEndMinutes;
}
