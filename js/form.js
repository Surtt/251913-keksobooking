'use strict';

(function () {

  var MIN_PRICES = [0, 1000, 5000, 10000];
  var ROOMS = {
    one: [2],
    two: [2, 1],
    three: [2, 1, 0],
    hundred: [3]
  };

  var adFormElement = document.querySelectorAll('.ad-form fieldset');
  var form = document.querySelector('.ad-form');
  var selectType = document.querySelector('#type');
  var inputPrice = document.querySelector('#price');
  var selectTimein = document.querySelector('#timein');
  var selectTimeout = document.querySelector('#timeout');
  var selectRoomNumber = document.querySelector('#room_number');
  var selectCapacity = document.querySelector('#capacity');
  var messageSuccess = document.querySelector('.success');
  var mapFilters = document.querySelectorAll('.map__filter');
  var mapCheckboxes = document.querySelectorAll('.map__checkbox');
  var formResetButton = document.querySelector('.ad-form__reset');

  // Все поля формы делаем неактивными
  var getDisabledFields = function (input) {
    for (var i = 0; i < adFormElement.length; i++) {
      adFormElement[i].disabled = input;
    }
  };

  getDisabledFields(true);


  // Активация страницы
  var enableForm = function () {
    form.classList.remove('ad-form--disabled');
    for (var i = 0; i < adFormElement.length; i++) {
      adFormElement[i].removeAttribute('disabled');
    }
  };

  // Ввод данных
  var setInputPrice = function () {
    for (var i = 0; i < MIN_PRICES.length; i++) {
      if (selectType.selectedIndex === i) {
        inputPrice.placeholder = MIN_PRICES[i];
        inputPrice.min = MIN_PRICES[i];
      }
    }
  };

  selectType.addEventListener('change', function () {
    setInputPrice();
  });

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

  selectRoomNumber.addEventListener('change', function (evt) {
    for (var i = 0; i < selectCapacity.length; i++) {
      selectCapacity[i].disabled = true;
    }
    var selectRooms = evt.target.selectedIndex;
    var visitors = Object.values(ROOMS)[selectRooms];
    for (var j = 0; j < visitors.length; j++) {
      selectCapacity[visitors[j]].disabled = false;
      selectCapacity.selectedIndex = visitors[0];
    }
  });

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      form.reset();
      resetForm();
      resetFilterForm();
      showSuccessMessage();
    });
    evt.preventDefault();
  });


  var showSuccessMessage = function () {
    messageSuccess.classList.remove('hidden');
    messageSuccess.addEventListener('click', hideMessage);
    document.body.addEventListener('keydown', onKeyDown);
  };

  var hideMessage = function () {
    messageSuccess.classList.add('hidden');
    messageSuccess.removeEventListener('click', hideMessage);
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
    form.classList.add('ad-form--disabled');
    document.querySelector('.map').classList.add('map--faded');
    window.pins.deletePins();
    window.map.resetMap();
    window.map.addCoordsToInput();
    window.card.closeCard();
  };

  var resetFilterForm = function () {
    for (var i = 0; i < mapFilters.length; i++) {
      mapFilters[i].value = 'any';
    }
    for (var j = 0; j < mapCheckboxes.length; j++) {
      mapCheckboxes[j].checked = false;
    }
  };

  formResetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    form.reset();
    resetForm();
    resetFilterForm();
  });

  window.form = {
    enableForm: enableForm
  };
})();
