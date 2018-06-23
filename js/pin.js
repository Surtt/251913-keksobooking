'use strict';

(function () {

  var templateContent = document.querySelector('template').content;
  var pinTemplate = templateContent.querySelector('.map__pin');
  var ads;

  // Функция создания метки

  function createPin(data) {

    var copy = pinTemplate.cloneNode(true);
    copy.style.left = data.location.x + 'px';
    copy.style.top = data.location.y + 'px';
    copy.querySelector('.map__pin img').src = data.author.avatar;
    copy.querySelector('.map__pin img').alt = data.offer.title;
    return copy;
  }

  var onSuccessLoad = function (dataServer) {
    ads = dataServer;
  };

  var onErrorLoad = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error');
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onSuccessLoad, onErrorLoad);


  window.pin = {
    createPin: createPin,
    ads: ads
  };
})();
