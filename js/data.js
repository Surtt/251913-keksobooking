'use strict';

(function () {

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

  var translateFlatType = function (typeEn) {
    return typeTranslates[typeEn];
  };

  var ads = [];
  for (var i = 0; i < 8; i++) {
    ads[i] = generateRandomData(i);
  }

  window.data = {
    typeTranslates: typeTranslates,
    translateFlatType: translateFlatType,
    ads: ads
  };

})();
