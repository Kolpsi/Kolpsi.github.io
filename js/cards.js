'use strict';
/**
* @description модуль карточек
*/
(function () {
  var ESC_KEYCODE = 27;
  var TYPES_NAMES = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    palace: 'Дворец',
    house: 'Дом'
  };
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var map = document.querySelector('.map');

  /**
    * @description функция отрисовки карточки
    */
  var renderCard = function () {

    var card = cardTemplate.cloneNode(true);
    map.appendChild(card);
    var cardSelector = map.querySelector('.map__card');
    cardSelector.classList.add('hidden');

  };

  renderCard();
  var cardSelector = map.querySelector('.map__card');


  /**
    * @description функция отображения удобств в карточке
    * @param {array} cardFeatures - массив удобств в карточке
    */
  var showingFeature = function (cardFeatures) {
    var features = document.querySelectorAll('.popup__feature');
    var featuresBlock = cardSelector.querySelector('.popup__features');
    if (cardFeatures.length === 0) {
      featuresBlock.classList.add('hidden');
    } else {
      featuresBlock.classList.remove('hidden');

      features.forEach(function (feature) {
        feature.style.display = (cardFeatures.indexOf(feature.classList[1].replace('popup__feature--', '')) === -1) ? 'none' : 'inline-block';
      });
    }
  };


  /**
    * @description функция перевода объекта в читабельный вид
    * @param {object} type - объект
    * @return {string} typeName - тип жилья
    */
  var changeName = function (type) {
    return TYPES_NAMES[type];
  };

  /**
    * @description функция присваивания адреса изображению
    * @param {string} photos - ссылка на изображение
    * @return {object} image - возвращает изображение
    */
  var getPhotoAdrress = function (photos) {
    var photo = cardTemplate.querySelector('.popup__photo');
    var image = photo.cloneNode(true);

    image.src = photos;

    return image;
  };

  /**
    * @description функция отрсовки изображения
    * @param {array} photos - массив ссылок на картинки
    */
  var renderPhoto = function (photos) {
    var photosBlock = map.querySelector('.popup__photos');
    var fragment = document.createDocumentFragment();
    var photo = Array.from(map.querySelectorAll('.popup__photo'));


    if (photos.length === 0) {
      photosBlock.classList.add('hidden');
      photo.forEach(function (it) {
        it.remove();
      });
    } else {
      photosBlock.classList.remove('hidden');

      for (var i = 0; i < photos.length; i++) {
        fragment.appendChild(getPhotoAdrress(photos[i]));
      }
      photo.forEach(function (it) {
        it.remove();
      });
      photosBlock.appendChild(fragment);
    }
  };

  window.cards = {
    /**
    * @description функция изменения информации в карточки
    * @param {array} cards - объект с информацией о карточке
    */
    changeInformation: function (cards) {
      var title = map.querySelector('.popup__title');
      var address = map.querySelector('.popup__text--address');
      var price = map.querySelector('.popup__text--price');
      var houseType = map.querySelector('.popup__type');
      var guestAndRoom = map.querySelector('.popup__text--capacity');
      var checkTime = map.querySelector('.popup__text--time');
      var description = map.querySelector('.popup__description');
      var avatar = map.querySelector('.popup__avatar');

      if (cards.author.avatar) {
        avatar.classList.remove('hidden');
        avatar.src = cards.author.avatar;
      } else {
        avatar.classList.add('hidden');
      }

      if (cards.offer.title) {
        title.classList.remove('hidden');
        title.textContent = cards.offer.title;
      } else {
        title.classList.add('hidden');
      }

      if (cards.offer.address) {
        address.classList.remove('hidden');
        address.textContent = cards.offer.address;
      } else {
        address.classList.add('hidden');
      }

      if (cards.offer.price) {
        price.classList.remove('hidden');
        price.textContent = cards.offer.price + '₽/ночь';
      } else {
        price.classList.add('hidden');
      }

      if (cards.offer.type) {
        houseType.classList.remove('hidden');
        houseType.textContent = changeName(cards.offer.type);
      } else {
        houseType.classList.add('hidden');
      }

      if (cards.offer.rooms) {
        guestAndRoom.classList.remove('hidden');
        guestAndRoom.textContent = cards.offer.rooms + ' комнаты для ' + cards.offer.guests + ' гостей';
      } else {
        guestAndRoom.classList.add('hidden');
      }

      if (cards.offer.checkin && cards.offer.checkout) {
        checkTime.classList.remove('hidden');
        checkTime.textContent = 'Заезд после ' + cards.offer.checkin + ', ' + 'выезд до ' + cards.offer.checkout;
      } else {
        checkTime.classList.add('hidden');
      }

      if (cards.offer.description) {
        description.classList.remove('hidden');
        description.textContent = cards.offer.description;
      } else {
        description.classList.add('hidden');
      }
      renderPhoto(cards.offer.photos);
      showingFeature(cards.offer.features);
    },

    /**
    * @description функция закрытия карточки
    */
    closeCard: function () {
      var close = cardSelector.querySelector('.popup__close');
      close.addEventListener('click', window.cards.onCloseClick);
      document.addEventListener('keydown', window.cards.onPopupEscPress);
    },

    /**
    * @description функция скрытия карточки по нажатию на кнопку esc
    */
    onCloseClick: function () {
      cardSelector.classList.add('hidden');
      document.removeEventListener('keydown', window.cards.onPopupEscPress);
      window.pins.checkActivated();
    },
    /**
    * @description функция скрытия карточки по нажатию на кнопку esc
    * @param {event} evt - событие нажатия
    */
    onPopupEscPress: function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        window.cards.onCloseClick(evt);
      }
    },

    /**
    * @description функция активирования пина и показ информаци о карточке
    * @param {event} evt - событие нажатия
    */
    onMainPinActive: function (evt) {
      var target = evt.target;
      while (target !== evt.currentTarget) {
        if (target.classList.contains('map__pin')) {
          if (target.matches('.map__pin--main')) {
            return;
          }
          window.pins.checkActivated();
          target.classList.add('map__pin--active');
          window.filtered = window.filters.getFilteredPins(window.data);
          var index = window.filtered[target.value];
          window.cards.changeInformation(index);
          cardSelector.classList.remove('hidden');
        }
        target = target.parentNode;
      }
    }
  };
})();
