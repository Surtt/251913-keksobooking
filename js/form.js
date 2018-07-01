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

  // Все поля формы делаем неактивными
  var getDisabledFields = function (input) {
    for (var m = 0; m < adFormElement.length; m++) {
      adFormElement[m].disabled = input;
    }
  };

  getDisabledFields(true);


  // Активация страницы
  var form = document.querySelector('.ad-form');

  var enableForm = function () {
    form.classList.remove('ad-form--disabled');
    for (var n = 0; n < adFormElement.length; n++) {
      adFormElement[n].removeAttribute('disabled');
    }
  };

  // Ввод данных

  var selectType = document.querySelector('#type');
  var inputPrice = document.querySelector('#price');

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

  var selectTimein = document.querySelector('#timein');
  var selectTimeout = document.querySelector('#timeout');

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

  var selectRoomNumber = document.querySelector('#room_number');
  var selectCapacity = document.querySelector('#capacity');

  selectRoomNumber.addEventListener('change', function (evt) {
    for (var r = 0; r < selectCapacity.length; r++) {
      selectCapacity[r].disabled = true;
    }
    var selectRooms = evt.target.selectedIndex;
    var visitors = Object.values(ROOMS)[selectRooms];
    for (var s = 0; s < visitors.length; s++) {
      selectCapacity[visitors[s]].disabled = false;
      selectCapacity.selectedIndex = visitors[0];
    }
  });

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      form.reset();
      resetForm();
      resetFilterForm();
      setMessageSuccess();
    });
    evt.preventDefault();
  });

  var setMessageSuccess = function () {
    var messageSuccess = document.querySelector('.success');
    messageSuccess.classList.remove('hidden');
    messageSuccess.addEventListener('click', function () {
      messageSuccess.classList.add('hidden');
    });
  };

  // Сброс формы
  var resetForm = function () {
    getDisabledFields(true);
    form.classList.add('ad-form--disabled');
    document.querySelector('.map').classList.add('map--faded');
    window.pins.deletePins();
    window.map.mainPinElement.style.left = '570px';
    window.map.mainPinElement.style.top = '375px';
    window.map.addCoordsToInput();
    window.card.deleteMapCard();
  };

  var resetFilterForm = function () {
    var mapFilters = document.querySelectorAll('.map__filter');
    var mapCheckboxes = document.querySelectorAll('.map__checkbox');

    for (var i = 0; i < mapFilters.length; i++) {
      mapFilters[i].value = 'any';
    }
    for (var j = 0; j < mapCheckboxes.length; j++) {
      mapCheckboxes[j].checked = false;
    }
  };

  var formResetButton = document.querySelector('.ad-form__reset');
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
