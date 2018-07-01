'use strict';

(function () {

  var MAX_VISIBLE_PINS = 5;

  var mapPinsContainer = document.querySelector('.map__pins');

  var deletePins = function () {
    var pins = document.querySelector('.map__pins');
    var buttons = pins.querySelectorAll('button');

    for (var j = 1; j < buttons.length; j++) {
      pins.removeChild(buttons[j]);
    }
  };

  var createPins = function (ads) {
    var displayedPins = Math.min(ads.length, MAX_VISIBLE_PINS);
    for (var j = 0; j < displayedPins; j++) {
      var data = ads[j];
      var pinElement = window.pin.createPin(data, data.author.avatar);
      mapPinsElements.push(pinElement);
      mapPinsContainer.appendChild(pinElement);
    }
    mapPinsContainer.addEventListener('click', onMapPinsContainerClick);
  };

  var onMapPinsContainerClick = function (e) {
    if (e.target.hasAttribute('data-id')) {
      var cardData = getDataById(e.target.getAttribute('data-id'));
      window.card.showCard(cardData);
    }
  };

  var getDataById = function (id) {
    return window.data.getAds().find(function (dataItem) {
      return dataItem.author.avatar === id;
    });
  };

  var mapPinsElements = [];

  window.pins = {
    deletePins: deletePins,
    createPins: createPins
  };

})();