'use strict';

(function () {

  var MIN_FILTER_PRICE = 10000;
  var MAX_FILTER_PRICE = 50000;

  var mapFilters = document.querySelector('.map__filters');

  var filterType = function (pin) {
    var housingType = mapFilters.querySelector('#housing-type');

    switch (housingType.value) {
      case 'any':
        return pin;
      default:
        return pin.offer.type === housingType.value;
    }
  };

  var filterPrice = function (pin) {
    var housingPrice = mapFilters.querySelector('#housing-price');

    switch (housingPrice.value) {
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
    var housingRooms = mapFilters.querySelector('#housing-rooms');

    switch (housingRooms.value) {
      case 'any':
        return pin;
      default:
        return pin.offer.rooms === parseInt(housingRooms.value, 10);
    }
  };

  var filterGuests = function (pin) {
    var housingGuests = mapFilters.querySelector('#housing-guests');

    switch (housingGuests.value) {
      case 'any':
        return pin;
      default:
        return pin.offer.guests === parseInt(housingGuests.value, 10);
    }
  };

  var filterFeatures = function (pin) {
    var housingFeatures = mapFilters.querySelectorAll('.map__checkbox');

    for (var i = 0; i < housingFeatures.length; i++) {
      if (housingFeatures[i].checked && pin.offer.features.indexOf(housingFeatures[i].value) < 0) {
        return false;
      }
    }
    return true;
  };

  var deletePins = function () {
    var pins = document.querySelector('.map__pins');
    var buttons = pins.querySelectorAll('button');

    for (var j = 1; j < buttons.length; j++) {
      pins.removeChild(buttons[j]);
    }
  };

  var filteredPins = function () {
    var newPins = window.data.getAds();
    var filters = newPins.filter(filterType).filter(filterPrice).
        filter(filterRooms).filter(filterGuests).filter(filterFeatures);

    deletePins();
    window.card.closeCard();
    window.map.createPins(filters, 5);
  };

  var onFiltersChange = function () {
    window.debounce.debounce(filteredPins, window.debounce.DEBOUNCE_INTERVAL);
  };

  mapFilters.addEventListener('change', onFiltersChange);

})();
