import {createIdGenerator, createCircleGenerator, getRandomInteger, getRandomArrayElement} from './utils.js';

const COUNT_ITEMS = 25;
const avatarRange = {
  MIN: 1,
  MAX: 6
};
const likesRange = {
  MIN: 15,
  MAX: 200
};
const commentsRange = {
  MIN: 3,
  MAX: 15
};
const commentMessageRange = {
  MIN: 1,
  MAX: 2
};
const MIN_ID_COMMENT = 100;
const DESCRIPTIONS = [
  'Обвинить можно и невинного, но обличить — только виновного.',
  'Быть крылатым от рожденья лучше всех на свете благ.',
  'Благо отдельного человека или отдельной нации связано с общим благом для всех.',
  'Болтливы те, кто не умеет думать.',
  'Польза-добродетели столь очевидна, что даже дрянные люди поступают добродетельно ради выгоды.',
  'Уметь переносить несовершенство других есть признак высшего достоинства.',
  'Когда посетит тебя горе, взгляни вокруг и утешься: есть люди, доля которых еще тяжелее твоей.',
  'Всякий, кто хочет быть приятным, всегда неприятен тем самым, что хочет быть приятным.',
  'Худший человек из числа людей — это человек без стремлений.',
  'Пристрастие к коллекционированию — первая ступень умственного расстройства.',
  'Книга — коллективный опыт. Тот, кто прочел два десятка великих книг, прожил два десятка великих жизней.',
  'Все приходит в свое время для тех, кто умеет ждать.',
  'Молчание иногда означает самую строгую критику.',
  'Доверие — первое условие дружбы.',
  'Нужно остерегаться доведения скромности до степени унижения.',
  'Ничего не откладывай на после, ибо после тебе легче не будет.',
  'Человек трусливый, потерявший всякий стыд, может согласиться на всякую гадость.',
  'Кто любит, чтобы ему льстили,— стоит льстеца.',
  'Дружба и любовь, два великие чувства, совершенно изменяют человека.',
  'Не было еще случая, чтобы дурак любил умного.'
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = [
  'Александр',
  'Михаил',
  'Артем',
  'Анна',
  'Виктория',
  'Варвара',
  'Борис',
  'Николай',
  'Елена',
  'Наталья'
];

const generateItemId = createIdGenerator();
const generateItemPathId = createIdGenerator();
const generateDescriptionId = createCircleGenerator(DESCRIPTIONS.length);
const generateCommentId = createIdGenerator(MIN_ID_COMMENT);

const getCommentMessage = () => Array.from({length: getRandomInteger(commentMessageRange.MIN, commentMessageRange.MAX)},
  () => getRandomArrayElement(MESSAGES)).join(' ');

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(avatarRange.MIN, avatarRange.MAX)}.svg`,
  message: getCommentMessage(),
  name: getRandomArrayElement(NAMES)
});

const createItem = () => ({
  id: generateItemId(),
  url: `photos/${generateItemPathId()}.jpg`,
  description: DESCRIPTIONS[generateDescriptionId()],
  likes: getRandomInteger(likesRange.MIN, likesRange.MAX),
  comments: Array.from({length: getRandomInteger(commentsRange.MIN, commentsRange.MAX)}, createComment)
});

const getItems = () => Array.from({length: COUNT_ITEMS}, createItem);
export{getItems};
