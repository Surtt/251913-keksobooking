'use strict';

(function () {

  var MIN_FILTER_PRICE = 10000;
  var MAX_FILTER_PRICE = 50000;

  var mapFiltersElement = document.querySelector('.map__filters');
  var housingTypeElement = mapFiltersElement.querySelector('#housing-type');
  var housingPriceElement = mapFiltersElement.querySelector('#housing-price');
  var housingRoomsElement = mapFiltersElement.querySelector('#housing-rooms');
  var housingGuestsElement = mapFiltersElement.querySelector('#housing-guests');
  var housingFeaturesElement = mapFiltersElement.querySelectorAll('.map__checkbox');

  var filterType = function (pin) {
    return housingTypeElement.value === 'any' || pin.offer.type === housingTypeElement.value;
  };

  var filterPrice = function (pin) {

    switch (housingPriceElement.value) {
      case 'low':
        return pin.offer.price <= MIN_FILTER_PRICE;
      case 'middle':
        return pin.offer.price >= MIN_FILTER_PRICE && pin.offer.price <= MAX_FILTER_PRICE;
      case 'high':
        return pin.offer.price >= MAX_FILTER_PRICE;
      default:
        return pin;
    }
  };

  var filterRooms = function (pin) {
    return housingRoomsElement.value === 'any' || pin.offer.rooms === parseInt(housingRoomsElement.value, 10);
  };

  var filterGuests = function (pin) {
    return housingGuestsElement.value === 'any' || pin.offer.guests === parseInt(housingGuestsElement.value, 10);
  };

  var filterFeatures = function (pin) {

    for (var i = 0; i < housingFeaturesElement.length; i++) {
      if (housingFeaturesElement[i].checked && pin.offer.features.indexOf(housingFeaturesElement[i].value) < 0) {
        return false;
      }
    }
    return true;
  };

  var filteredPins = function () {
    var newPins = window.data.getAds();
    var filters = newPins.filter(function (pin) {
      return filterType(pin) && filterPrice(pin) && filterRooms(pin) && filterGuests(pin) && filterFeatures(pin);
    });

    window.pins.delete();
    window.card.close();
    window.pins.create(filters);
  };

  var onFiltersChange = function () {
    window.util.debounce(filteredPins, window.util.DEBOUNCE_INTERVAL);
  };

  mapFiltersElement.addEventListener('change', onFiltersChange);
})();
