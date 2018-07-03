'use strict';

(function () {

  var templateElement = document.querySelector('template');
  var cardTemplateElement = templateElement.content.querySelector('.map__card');
  var mapFiltersContainerElement = document.querySelector('.map__filters-container');

  // Закрытие карточки
  var closeCard = function () {
    var mapCardElement = document.querySelector('.map__card');
    if (mapCardElement) {
      mapCardElement.parentNode.removeChild(mapCardElement);
    }
    window.pins.deactivateCurrentPin();

    document.removeEventListener('keydown', onPopupPress);
    document.removeEventListener('click', closeCard);
  };

  var onPopupPress = function (evt) {
    if (evt.keyCode === window.constants.ENTER_KEYCODE) {
      closeCard();
    }
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
      closeCard();
    }
  };


  var showCard = function (cardData) {
    closeCard();
    var mapElement = document.querySelector('section.map');
    mapElement.insertBefore(createCard(cardData), mapFiltersContainerElement);

    var closeButtonElement = document.querySelector('.popup__close');

    closeButtonElement.addEventListener('click', closeCard);
    closeButtonElement.addEventListener('keydown', onPopupPress);
  };


  // Функция вывода карточки
  var createCard = function (card) {

    var cardElement = cardTemplateElement.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = window.data.translateFlatType(card.offer.type);
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__features').innerHTML = '';
    for (var i = 0; i < card.offer.features.length; i++) {
      cardElement.querySelector('.popup__features').innerHTML += '<li class="popup__feature popup__feature--' + card.offer.features[i] + '"></li>';
    }
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    for (var j = 0; j < card.offer.photos.length; j++) {
      var images = card.offer.photos.map(function (photo) {
        return '<img src="' + photo + '"  class="popup__photo" width="45" height="40">';
      });
      cardElement.querySelector('.popup__photos').innerHTML = images.join('');
    }
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;

    return cardElement;
  };

  window.card = {
    show: showCard,
    close: closeCard
  };
})();
