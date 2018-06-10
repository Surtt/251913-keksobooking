var showMap = document.querySelector('.map');
showMap.classList.remove('map--faded');

var mapCard = document.querySelector('template').content.querySelector('.map__card');

var listMapCard = document.querySelector('.map__pins');

function createPin (data) {
  var copy = document.querySelector('template').content.cloneNode(true)
  copy.querySelector('.map__pin').style.left = data.location.x + 'px';
  copy.querySelector('.map__pin').style.top = data.location.y + 'px';
  copy.querySelector('.map__pin img').src = data.author.avatar;
  copy.querySelector('.map__pin img').alt = data.offer.title;
  return copy;
};

var mapPins = document.querySelector('.map__pins')

for (var i = 0; i < 8; i++) {
  var data = ads[i]
  var element = createPin(data)
  mapPins.appendChild(element)
}

var Template = document.querySelector('template');
var carTemplate = Template.content.querySelector('.map__card');

var createCard = function (card) {

    var cardElement = carTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = card.offer.type;
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__features').innerHTML = '';
    for (var f = 0; f < card.offer.features.length; f++) {
      cardElement.querySelector('.popup__features').innerHTML += '<li class="popup__feature popup__feature--' + card.offer.features[f] + '"></li>';
    }
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__photos').src = card.offer.photos;
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;


  return cardElement;
};



var fragmentCards = document.createDocumentFragment();

fragmentCards.appendChild(createCard(ads[0]));

showMap.appendChild(fragmentCards);



