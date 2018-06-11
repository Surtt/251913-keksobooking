'use strict';

var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var typesEn = ['palace', 'flat', 'house', 'bungalo'];
var typeTranslates = {
  'palace': 'Палас', 'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'
};

var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var checkinCheckout = ['12:00', '13:00', '14:00'];

var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var generateRandomNumber = function (from, to) {
  return Math.round(Math.random() * (to - from) + from);
};

var generateRandomFeatures = function () {
  var randomLength = Math.floor(Math.random() * features.length);
  return features.slice(0, randomLength);
};

var photosAvatar = [1, 2, 3, 4, 5, 6, 7, 8];


var generateRandomData = function (id) {
  return {
    'author': {
      'avatar': 'img/avatars/user0' + photosAvatar[i] + '.png'
    },

    'offer': {
      'title': titles[generateRandomNumber(0, 7)],
      'address': generateRandomNumber(200, 800) + ',' + generateRandomNumber(200, 800),
      'price': generateRandomNumber(1000, 1000000),
      'type': typesEn[generateRandomNumber(0, 3)],
      'rooms': generateRandomNumber(1, 5),
      'guests': generateRandomNumber(1, 10),
      'checkin': checkinCheckout[generateRandomNumber(0, 2)],
      'checkout': checkinCheckout[generateRandomNumber(0, 2)],
      'features': generateRandomFeatures(),
      'description': '',
      'photos': photos[id]
    },

    'location': {
      'x': generateRandomNumber(300, 900),
      'y': generateRandomNumber(130, 630)
    }
  };
};

var ads = [];
for (var i = 0; i < 8; i++) {
  ads[i] = generateRandomData(i);
}


var showMap = document.querySelector('.map');
showMap.classList.remove('map--faded');

// var mapCard = document.querySelector('template').content.querySelector('.map__card');

// var listMapCard = document.querySelector('.map__pins');
var templateContent = document.querySelector('template').content;
var pinTemplate = templateContent.querySelector('.map__pin');

function createPin(data) {
  // TODO! заменить querySelector('template') -> querySelector('button')
  var copy = pinTemplate.cloneNode(true);
  copy.style.left = data.location.x + 'px';
  copy.style.top = data.location.y + 'px';
  copy.querySelector('.map__pin img').src = data.author.avatar;
  copy.querySelector('.map__pin img').alt = data.offer.title;
  return copy;
}

var mapPins = document.querySelector('.map__pins');

for (var j = 0; j < 8; j++) {
  var data = ads[j];
  var element = createPin(data);
  mapPins.appendChild(element);
}

var Template = document.querySelector('template');
var carTemplate = Template.content.querySelector('.map__card');

var translateFlatType = function (typeEn) {
  return typeTranslates[typeEn];
};

var createCard = function (card) {
// TODO! заменить querySelector('template') -> querySelector('.map__card')
  var cardElement = carTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = translateFlatType(card.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  cardElement.querySelector('.popup__features').innerHTML = '';
  for (var k = 0; k < card.offer.features.length; k++) {
    cardElement.querySelector('.popup__features').innerHTML += '<li class="popup__feature popup__feature--' + card.offer.features[k] + '"></li>';
  }
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.querySelector('.popup__photos').src = card.offer.photos;
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  return cardElement;
};

var fragmentCards = document.createDocumentFragment();

// fragmentCards.appendChild(createCard(data));

showMap.appendChild(fragmentCards);

// На основе первого по порядку элемента из сгенерированного массива и шаблона .map__card создайте DOM-элемент объявления, заполните его данными из объекта и вставьте полученный DOM-элемент в блок .map перед блоком.map__filters-container:
// var advertsTemplate = document.querySelector('template').content.querySelector('article.map__card');
// var advertElement = advertsTemplate.cloneNode(true);
var map = document.querySelector('section.map');
var mapFiltersContainer = document.querySelector('.map__filters-container');
map.insertBefore(createCard(data), mapFiltersContainer);
