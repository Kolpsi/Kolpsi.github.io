'use strict';
/**
* @description модуль второстепенных пинов
*/
(function () {
  var map = document.querySelector('.map');
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');


  window.pins = {
  /**
  * @description функция отрисовки одного пина
  * @param {object} pins - объект
  * @return {object} pin - возвращает пин
  */
    render: function (pins) {
      var pin = pinTemplate.cloneNode(true);

      if (pins.offer) {
        pin.value = window.pinIndex;
        pin.style.left = pins.location.x + 'px';
        pin.style.top = pins.location.y + 'px';
        pin.querySelector('img').src = pins.author.avatar;
        pin.querySelector('img').alt = pins.offer.title;

        return pin;
      } else {
        return null;
      }
    },
    /**
    * @description функция отрисовки всех пинов
    * @param {array} pins - массив минов
    */
    drawPins: function (pins) {
      window.pins.remove();

      var fragment = document.createDocumentFragment();

      for (var i = 0; i < pins.length; i++) {
        window.pinIndex = i;
        fragment.appendChild(window.pins.render(pins[i]));
      }

      map.appendChild(fragment);
    },

    /**
    * @description удаляет лишние пины
    */
    remove: function () {
      var obj = document.querySelectorAll('.map__pin');
      for (var i = 1; i < obj.length; i++) {
        obj[i].remove();
      }
    },

    /**
    * @description функция проверки наличия активированных пинов
    */
    checkActivated: function () {
      var pinActive = document.querySelector('.map__pin--active');
      if (pinActive) {
        pinActive.classList.remove('map__pin--active');
      }
    },

    /**
    * @description функция отрисовки пинов при успешном получении данных с сервера
    * @param {array} data - массив
    */
    successHandler: function (data) {
      window.data = data;
      window.filtered = window.filters.getFilteredPins(data);
      window.pins.drawPins(window.filtered);
    }
  };
})();
