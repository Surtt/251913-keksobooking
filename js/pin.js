'use strict';

(function () {

  var templateContent = document.querySelector('template').content;
  var pinTemplate = templateContent.querySelector('.map__pin');

  // Функция создания метки

  function createPin(data) {

    var copy = pinTemplate.cloneNode(true);
    copy.style.left = data.location.x + 'px';
    copy.style.top = data.location.y + 'px';
    copy.querySelector('.map__pin img').src = data.author.avatar;
    copy.querySelector('.map__pin img').alt = data.offer.title;
    return copy;
  }

  window.pin = {
    createPin: createPin
  };
})();