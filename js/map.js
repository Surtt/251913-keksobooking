'use strict';

var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

var MIN_PRICES = [0, 1000, 5000, 10000];
var ROOMS = {
  one: [2],
  two: [2, 1],
  three: [2, 1, 0],
  hundred: [3]
};

var MAIN_PIN_X = 32;
var MAIN_PIN_Y = 84;

var MAX_TOP_Y = 130;
var MAX_BOTTOM_Y = 630;
var MAX_LEFT_X = 0;
var MAX_RIGHT_X = 1200;


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

var generateRandomData = function (id) {
  return {
    'author': {
      'avatar': 'img/avatars/user0' + (id + 1) + '.png'
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

var templateContent = document.querySelector('template').content;
var pinTemplate = templateContent.querySelector('.map__pin');

// Функция создания метки

function createPin(data) {

  var copy = pinTemplate.cloneNode(true);
  copy.style.left = data.location.x + 'px';
  copy.style.top = data.location.y + 'px';
  copy.querySelector('.map__pin img').src = data.author.avatar;
  copy.querySelector('.map__pin img').alt = data.offer.title;
  return copy;
}

var mapPinsContainer = document.querySelector('.map__pins');
var mapFiltersContainer = document.querySelector('.map__filters-container');

var onMapPinsContainerClick = function (e) {
  var button = tryGetButtonAsTarget(e.target);
  if (button) {
    var pinIndex = mapPinsElements.findIndex(function (element) {
      return element === button;
    });
    if (pinIndex !== -1) {
      showCard(pinIndex);
    }
  }
};

var tryGetButtonAsTarget = function (target) {
  if (target !== mainPinElement && target.tagName === 'BUTTON') {
    return target;
  }
  return undefined;
};

var mapPinsElements = [];

var createPins = function () {
  for (var j = 0; j < 8; j++) {
    var data = ads[j];
    var pinElement = createPin(data);
    mapPinsElements.push(pinElement);
    mapPinsContainer.appendChild(pinElement);
  }
  mapPinsContainer.addEventListener('click', onMapPinsContainerClick);
};

var showCard = function (index) {
  var mapCard = document.querySelector('.map__card');
  if (mapCard) {
    mapCard.parentNode.removeChild(mapCard);
  }
  var data = ads[index];
  var map = document.querySelector('section.map');
  map.insertBefore(createCard(data), mapFiltersContainer);

  var cardClose = document.querySelector('.map__card.popup');
  var closeButton = cardClose.querySelector('.popup__close');

  // Закрытие карточки
  var closeCard = function () {
    cardClose.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeCard();
    }
  };

  closeButton.addEventListener('click', closeCard);
  closeButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closeCard();
    }
    if (evt.keyCode === ESC_KEYCODE) {
      closeCard();
    }
  });
};

var template = document.querySelector('template');
var carTemplate = template.content.querySelector('.map__card');

var translateFlatType = function (typeEn) {
  return typeTranslates[typeEn];
};

// Функция вывода карточки
var createCard = function (card) {

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

showMap.appendChild(fragmentCards);

// Возвращаем карту в исходное состояние, затемняем ее
document.querySelector('.map').classList.add('map--faded');

var adFormElement = document.querySelectorAll('.ad-form fieldset');

// Все поля формы делаем неактивными
var getDisabledFields = function (input) {
  for (var m = 0; m < adFormElement.length; m++) {
    adFormElement[m].disabled = input;
  }
};

getDisabledFields(true);

var mainPinElement = document.querySelector('.map__pin--main');

// Определение координат mainPin
var getMainPinXY = function (pos, gap) {
  return parseInt(pos.split('px', 1), 10) + gap;
};

// Добавление в инпут адреса формы
var inputAddress = document.querySelector('#address');
var addCoordsToInput = function () {
  inputAddress.value = getMainPinXY(mainPinElement.style.left, MAIN_PIN_X) + ', ' + getMainPinXY(mainPinElement.style.top, MAIN_PIN_Y);
};

addCoordsToInput();


// Активация страницы
var form = document.querySelector('.ad-form');

var enableForm = function () {
  form.classList.remove('ad-form--disabled');
  for (var n = 0; n < adFormElement.length; n++) {
    adFormElement[n].removeAttribute('disabled');
  }
};

var pinsCreated = false;

var onMainPinClick = function () {
  showMap.classList.remove('map--faded');
  enableForm();
  if (!pinsCreated) {
    createPins();
    pinsCreated = true;
  }
};

mainPinElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onMainPinClick();
  }
});

mainPinElement.addEventListener('mouseup', function () {
  onMainPinClick();
});

// Ввод данных

var selectType = document.querySelector('#type');
var inputPrice = document.querySelector('#price');

selectType.addEventListener('change', function () {
  var minPrice = MIN_PRICES[selectType.selectedIndex];
  inputPrice.placeholder = minPrice;
  inputPrice.min = minPrice;
});

var selectTimein = document.querySelector('#timein');
var selectTimeout = document.querySelector('#timeout');

var changeTime = function (timein, timeout) {
  if (timein.selectedIndex !== timeout.selectedIndex) {
    timeout.selectedIndex = timein.selectedIndex;
  }
};

selectTimein.addEventListener('change', function () {
  changeTime(selectTimein, selectTimeout);
});

selectTimeout.addEventListener('change', function () {
  changeTime(selectTimeout, selectTimein);
});

var selectRoomNumber = document.querySelector('#room_number');
var selectCapacity = document.querySelector('#capacity');

selectRoomNumber.addEventListener('change', function (evt) {
  for (var r = 0; r < selectCapacity.length; r++) {
    selectCapacity[r].disabled = true;
  }
  var selectRooms = evt.target.selectedIndex;
  var visitors = Object.values(ROOMS)[selectRooms];
  for (var s = 0; s < visitors.length; s++) {
    selectCapacity[visitors[s]].disabled = false;
    selectCapacity.selectedIndex = visitors[0];
  }
});

// Перетаскивание маркера

mainPinElement.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    mainPinElement.style.top = (mainPinElement.offsetTop - shift.y) + 'px';
    mainPinElement.style.left = (mainPinElement.offsetLeft - shift.x) + 'px';

    addCoordsToInput();

    var changeLeftCoord = parseInt(mainPinElement.style.left.split('px')[0], 10);
    var changeTopCoord = parseInt(mainPinElement.style.top.split('px')[0], 10);

    if (changeTopCoord < MAX_TOP_Y - MAIN_PIN_Y) {
      mainPinElement.style.top = MAX_TOP_Y - MAIN_PIN_Y + 'px';
    }

    if (changeTopCoord > MAX_BOTTOM_Y - MAIN_PIN_Y) {
      mainPinElement.style.top = MAX_BOTTOM_Y - MAIN_PIN_Y + 'px';
    }

    if (changeLeftCoord < MAX_LEFT_X - MAIN_PIN_X) {
      mainPinElement.style.left = MAX_LEFT_X - MAIN_PIN_X + 'px';
    }

    if (changeLeftCoord > MAX_RIGHT_X - MAIN_PIN_X) {
      mainPinElement.style.left = MAX_RIGHT_X - MAIN_PIN_X + 'px';
    }

  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

});
