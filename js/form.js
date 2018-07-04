'use strict';

(function () {

  var MIN_PRICES = [0, 1000, 5000, 10000];
  var ROOMS = {
    one: [2],
    two: [2, 1],
    three: [2, 1, 0],
    hundred: [3]
  };

  var fieldsetElements = document.querySelectorAll('.ad-form fieldset');
  var adFormElement = document.querySelector('.ad-form');
  var selectTypeElement = document.querySelector('#type');
  var inputPriceElement = document.querySelector('#price');
  var selectTimeinElement = document.querySelector('#timein');
  var selectTimeoutElement = document.querySelector('#timeout');
  var selectRoomNumberElement = document.querySelector('#room_number');
  var selectCapacityElement = document.querySelector('#capacity');
  var messageSuccessElement = document.querySelector('.success');
  var mapFiltersElements = document.querySelectorAll('.map__filter');
  var mapCheckboxesElements = document.querySelectorAll('.map__checkbox');
  var adFormResetElement = document.querySelector('.ad-form__reset');

  // Все поля формы делаем неактивными
  var getDisabledFields = function (input) {
    fieldsetElements.forEach(function (fieldsetElement) {
      fieldsetElement.disabled = input;
    });
  };

  getDisabledFields(true);


  // Активация страницы
  var enableForm = function () {
    adFormElement.classList.remove('ad-form--disabled');
    fieldsetElements.forEach(function (fieldsetElement) {
      fieldsetElement.removeAttribute('disabled');
    });
  };

  // Ввод данных
  var setInputPrice = function () {
    for (var i = 0; i < MIN_PRICES.length; i++) {
      if (selectTypeElement.selectedIndex === i) {
        inputPriceElement.placeholder = MIN_PRICES[i];
        inputPriceElement.min = MIN_PRICES[i];
      }
    }
  };

  selectTypeElement.addEventListener('change', function () {
    setInputPrice();
  });

  var changeTime = function (timein, timeout) {
    if (timein.selectedIndex !== timeout.selectedIndex) {
      timeout.selectedIndex = timein.selectedIndex;
    }
  };

  selectTimeinElement.addEventListener('change', function () {
    changeTime(selectTimeinElement, selectTimeoutElement);
  });

  selectTimeoutElement.addEventListener('change', function () {
    changeTime(selectTimeoutElement, selectTimeinElement);
  });

  selectRoomNumberElement.addEventListener('change', function (evt) {
    for (var i = 0; i < selectCapacityElement.length; i++) {
      selectCapacityElement[i].disabled = true;
    }
    var selectRooms = evt.target.selectedIndex;
    var visitors = Object.values(ROOMS)[selectRooms];
    for (var j = 0; j < visitors.length; j++) {
      selectCapacityElement[visitors[j]].disabled = false;
      selectCapacityElement.selectedIndex = visitors[0];
    }
  });

  adFormElement.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adFormElement), function () {
      adFormElement.reset();
      resetForm();
      resetFilterForm();
      showSuccessMessage();
    });
    evt.preventDefault();
  });


  var showSuccessMessage = function () {
    messageSuccessElement.classList.remove('hidden');
    messageSuccessElement.addEventListener('click', hideMessage);
    document.body.addEventListener('keydown', onKeyDown);
  };

  var hideMessage = function () {
    messageSuccessElement.classList.add('hidden');
    messageSuccessElement.removeEventListener('click', hideMessage);
    document.body.removeEventListener('keydown', onKeyDown);
  };

  var onKeyDown = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
      hideMessage();
    }
  };

  // Сброс формы
  var resetForm = function () {
    getDisabledFields(true);
    adFormElement.classList.add('ad-form--disabled');
    document.querySelector('.map').classList.add('map--faded');
    window.pins.delete();
    window.map.reset();
    window.map.addCoordsToInput();
    window.card.close();
  };

  var resetFilterForm = function () {
    mapFiltersElements.forEach(function (mapFiltersElement) {
      mapFiltersElement.value = 'any';
    });
    mapCheckboxesElements.forEach(function (mapCheckboxesElement) {
      mapCheckboxesElement.checked = false;
    });
  };

  adFormResetElement.addEventListener('click', function (evt) {
    evt.preventDefault();
    adFormElement.reset();
    resetForm();
    resetFilterForm();
  });

  window.form = {
    enable: enableForm
  };
})();
