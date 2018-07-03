'use strict';

(function () {

  var template = document.querySelector('template');
  var cardTemplate = template.content.querySelector('.map__card');
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  // Закрытие карточки
  var closeCard = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.parentNode.removeChild(mapCard);
    }
    window.pins.deactivateCurrentPin();

    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
      closeCard();
    }
  };

  var showCard = function (cardData) {
    closeCard();
    var map = document.querySelector('section.map');
    map.insertBefore(createCard(cardData), mapFiltersContainer);

    var closeButton = document.querySelector('.popup__close');

    closeButton.addEventListener('click', closeCard);
    closeButton.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.constants.ENTER_KEYCODE) {
        closeCard();
      }
      if (evt.keyCode === window.constants.ESC_KEYCODE) {
        closeCard();
      }
    });
    closeButton.removeEventListener('keydown', closeCard);
  };

  // Функция вывода карточки
  var createCard = function (card) {

    var cardElement = cardTemplate.cloneNode(true);

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
    showCard: showCard,
    closeCard: closeCard
  };
})();
