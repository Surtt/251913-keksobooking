'use strict';

(function () {

  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 84;

  var MAX_TOP_Y = 130;
  var MAX_BOTTOM_Y = 630;
  var MAX_LEFT_X = 0;
  var MAX_RIGHT_X = 1200;


  var showMap = document.querySelector('.map');
  showMap.classList.remove('map--faded');


  var fragmentCards = document.createDocumentFragment();

  showMap.appendChild(fragmentCards);

  // Возвращаем карту в исходное состояние, затемняем ее
  document.querySelector('.map').classList.add('map--faded');


  var mainPinElement = document.querySelector('.map__pin--main');

  // Определение координат mainPin
  var getMainPinXY = function (pos, gap) {
    return parseInt(pos.split('px', 1), 10) + gap;
  };


  var pinsCreated = false;

  var onMainPinClick = function () {
    var ads = window.data.getAds();
    if (ads) {
      showMap.classList.remove('map--faded');
      window.form.enableForm();
      if (!pinsCreated) {
        window.pins.createPins(ads);
        pinsCreated = true;
      }
    }
  };

  mainPinElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.constants.ENTER_KEYCODE) {
      onMainPinClick();
    }
  });

  mainPinElement.addEventListener('mouseup', function () {
    onMainPinClick();
  });

  // Добавление в инпут адреса формы
  var inputAddress = document.querySelector('#address');
  var addCoordsToInput = function () {
    inputAddress.value = Math.floor(getMainPinXY(mainPinElement.style.left, MAIN_PIN_WIDTH / 2)) + ', ' + getMainPinXY(mainPinElement.style.top, MAIN_PIN_HEIGHT);
  };

  addCoordsToInput();

  // Перетаскивание маркера

  var mouseDownOffset;

  var onMouseDown = function (evt) {
    evt.preventDefault();

    mouseDownOffset = {
      x: document.documentElement.scrollLeft + evt.clientX - mainPinElement.offsetLeft,
      y: document.documentElement.scrollTop + evt.clientY - mainPinElement.offsetTop
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var newTop = document.documentElement.scrollTop + moveEvt.clientY - mouseDownOffset.y;
    var newLeft = document.documentElement.scrollLeft + moveEvt.clientX - mouseDownOffset.x;

    if (newTop < MAX_TOP_Y - MAIN_PIN_HEIGHT) {
      newTop = MAX_TOP_Y - MAIN_PIN_HEIGHT;
    }

    if (newTop > MAX_BOTTOM_Y - MAIN_PIN_HEIGHT) {
      newTop = MAX_BOTTOM_Y - MAIN_PIN_HEIGHT;
    }

    if (newLeft < MAX_LEFT_X - MAIN_PIN_WIDTH / 2) {
      newLeft = MAX_LEFT_X - MAIN_PIN_WIDTH / 2;
    }

    if (newLeft > MAX_RIGHT_X - MAIN_PIN_WIDTH / 2) {
      newLeft = Math.ceil(MAX_RIGHT_X - MAIN_PIN_WIDTH / 2);
    }

    mainPinElement.style.top = newTop + 'px';
    mainPinElement.style.left = newLeft + 'px';

    addCoordsToInput();
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  mainPinElement.addEventListener('mousedown', onMouseDown);

  var resetMap = function () {
    mainPinElement.style.left = '570px';
    mainPinElement.style.top = '375px';
    pinsCreated = false;
  };

  window.map = {
    addCoordsToInput: addCoordsToInput,
    resetMap: resetMap
  };

})();


