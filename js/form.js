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

  selectType.addEventListener('change', function () {
    var minPrice = MIN_PRICES[selectType.selectedIndex];
    inputPrice.placeholder = minPrice;
    inputPrice.min = minPrice;
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

  window.form = {
    MIN_PRICES: MIN_PRICES,
    ROOMS: ROOMS,
    getDisabledFields: getDisabledFields,
    enableForm: enableForm
  };

})();