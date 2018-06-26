'use strict';

(function () {

  var typeTranslates = {
    'palace': 'Палас', 'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'
  };

  var translateFlatType = function (typeEn) {
    return typeTranslates[typeEn];
  };

  var ads;

  var getAds = function () {
    return ads;
  };

  var onSuccessLoad = function (dataServer) {
    ads = dataServer;
  };

  var onErrorLoad = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error');
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onSuccessLoad, onErrorLoad);

  window.data = {
    typeTranslates: typeTranslates,
    translateFlatType: translateFlatType,
    getAds: getAds
  };

})();
