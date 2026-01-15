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
