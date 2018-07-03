'use strict';

(function () {

  var MAX_VISIBLE_PINS = 5;

  var activeClass = 'map__pin--active';

  var mapPinsContainer = document.querySelector('.map__pins');

  var deletePins = function () {
    var buttons = mapPinsContainer.querySelectorAll('button');

    for (var i = 1; i < buttons.length; i++) {
      mapPinsContainer.removeChild(buttons[i]);
    }
  };

  var createPins = function (ads) {
    var displayedPins = Math.min(ads.length, MAX_VISIBLE_PINS);
    for (var i = 0; i < displayedPins; i++) {
      var data = ads[i];
      var pinElement = window.pin.createPin(data, data.author.avatar);
      mapPinsElements.push(pinElement);
      mapPinsContainer.appendChild(pinElement);
    }
    mapPinsContainer.addEventListener('click', onMapPinsContainerClick);
  };

  var onMapPinsContainerClick = function (e) {
    var pinElement = e.target;
    if (pinElement.hasAttribute('data-id')) {
      var dataId = pinElement.getAttribute('data-id');
      var cardData = getDataById(dataId);
      window.card.showCard(cardData);
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

  var mapPinsElements = [];

  window.pins = {
    deletePins: deletePins,
    createPins: createPins,
    deactivateCurrentPin: deactivateCurrentPin
  };
})();
