'use strict';

(function () {

  var MAIN_PIN_X = 32;
  var MAIN_PIN_Y = 84;

  var MAX_TOP_Y = 130;
  var MAX_BOTTOM_Y = 630;
  var MAX_LEFT_X = 0;
  var MAX_RIGHT_X = 1200;


  var showMap = document.querySelector('.map');
  showMap.classList.remove('map--faded');

  var mapPinsContainer = document.querySelector('.map__pins');


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
    if (target !== mainPinElement && target.tagName === 'BUTTON') {
      return target;
    }
    return undefined;
  };

  var mapPinsElements = [];

  var createPins = function () {
    for (var j = 0; j < 8; j++) {
      var data = window.data.ads[j];
      var pinElement = window.pin.createPin(data);
      mapPinsElements.push(pinElement);
      mapPinsContainer.appendChild(pinElement);
    }
    mapPinsContainer.addEventListener('click', onMapPinsContainerClick);
  };


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
    showMap.classList.remove('map--faded');
    window.form.enableForm();
    if (!pinsCreated) {
      createPins();
      pinsCreated = true;
    }
  };

  mainPinElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.card.ENTER_KEYCODE) {
      onMainPinClick();
    }
  });

  mainPinElement.addEventListener('mouseup', function () {
    onMainPinClick();
  });

  // Добавление в инпут адреса формы
  var inputAddress = document.querySelector('#address');
  var addCoordsToInput = function () {
    inputAddress.value = getMainPinXY(mainPinElement.style.left, MAIN_PIN_X) + ', ' + getMainPinXY(mainPinElement.style.top, MAIN_PIN_Y);
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

    if (newTop < MAX_TOP_Y - MAIN_PIN_Y) {
      newTop = MAX_TOP_Y - MAIN_PIN_Y;
    }

    if (newTop > MAX_BOTTOM_Y - MAIN_PIN_Y) {
      newTop = MAX_BOTTOM_Y - MAIN_PIN_Y;
    }

    if (newLeft < MAX_LEFT_X - MAIN_PIN_X) {
      newLeft = MAX_LEFT_X - MAIN_PIN_X;
    }

    if (newLeft > MAX_RIGHT_X - MAIN_PIN_X) {
      newLeft = MAX_RIGHT_X - MAIN_PIN_X;
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

})();


