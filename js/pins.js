'use strict';

(function () {

  var MAX_VISIBLE_PINS = 5;

  var mapPinsElements = [];
  var activeClass = 'map__pin--active';

  var mapPinsContainerElement = document.querySelector('.map__pins');

  var deletePins = function () {
    var buttons = mapPinsContainerElement.querySelectorAll('button');

    for (var i = 1; i < buttons.length; i++) {
      mapPinsContainerElement.removeChild(buttons[i]);
    }
  };

  var createPins = function (ads) {
    var displayedPins = Math.min(ads.length, MAX_VISIBLE_PINS);
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < displayedPins; i++) {
      var data = ads[i];
      var pinElement = window.pin.create(data, data.author.avatar);
      mapPinsElements.push(pinElement);
      fragment.appendChild(pinElement);
    }
    mapPinsContainerElement.appendChild(fragment);
    mapPinsContainerElement.addEventListener('click', onMapPinsContainerClick);
  };

  var onMapPinsContainerClick = function (e) {
    var pinElement = e.target;
    if (pinElement.hasAttribute('data-id')) {
      var dataId = pinElement.getAttribute('data-id');
      var cardData = getDataById(dataId);
      window.card.show(cardData);
      pinElement.classList.add(activeClass);
    }
  };

  var getDataById = function (id) {
    return window.data.getAds().find(function (dataItem) {
      return dataItem.author.avatar === id;
    });
  };

  var deactivateCurrentPin = function () {
    var pins = Array.from(document.querySelectorAll('.map__pin'));
    pins.forEach(function (pin) {
      pin.classList.remove(activeClass);
    });
  };

  window.pins = {
    delete: deletePins,
    create: createPins,
    deactivateCurrentPin: deactivateCurrentPin
  };
})();
