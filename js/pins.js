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
      var pinElement = window.pin.createPin(data);
      mapPinsElements.push(pinElement);
      mapPinsContainer.appendChild(pinElement);
    }
    mapPinsContainer.addEventListener('click', onMapPinsContainerClick);
  };

  var onMapPinsContainerClick = function (e) {
    var button = tryGetButtonAsTarget(e.target);
    if (button) {
      var pinIndex = mapPinsElements.findIndex(function (element) {
        return element === button;
      });
      if (pinIndex !== -1) {
        window.card.showCard(pinIndex);
      }
    }
  };

  var tryGetButtonAsTarget = function (target) {
    if (target !== window.map.mainPinElement && target.tagName === 'BUTTON') {
      return target;
    }
    return undefined;
  };

  var mapPinsElements = [];

  window.pins = {
    deletePins: deletePins,
    createPins: createPins
  };

})();
