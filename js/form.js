'use strict';
/**
* @description модуль управления формой
*/
(function () {
  var ESC_KEYCODE = 27;
  var main = document.querySelector('main');
  var form = main.querySelector('.ad-form');
  var map = main.querySelector('.map');
  var type = form.querySelector('#type');
  var price = form.querySelector('#price');
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');
  var formAddress = form.querySelector('#address');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var CapacityOptions = capacity.querySelectorAll('option');
  var formFilter = map.querySelector('.map__filters');
  var photoPreview = form.querySelector('.ad-form__photo');
  var inputList = document.querySelectorAll('input');
  var selectList = document.querySelectorAll('select');
  var textAreaList = form.querySelectorAll('textarea');
  var buttonList = form.querySelectorAll('button');
  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');


  main.appendChild(successTemplate);

  var success = document.querySelector('.success');
  success.classList.add('hidden');

  var priceTypes = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  /**
  * @description функция удаления не подходящих опций
  */
  var inputRoomValidateNumber = function () {

    CapacityOptions.forEach(function (element) {
      element.remove();
    });


    /**
    * @description функция проверки соответствия поля гостей и номеров
    * @param {array} elements - элемент
    */
    var insertCapacityOptions = function (elements) {
      elements.forEach(function (element) {
        capacity.appendChild(CapacityOptions[element]);
      });
    };

    switch (roomNumber.selectedIndex) {
      case 0:
        insertCapacityOptions([2]);
        break;
      case 1:
        insertCapacityOptions([1, 2]);
        break;
      case 2:
        insertCapacityOptions([0, 1, 2]);
        break;
      case 3:
        insertCapacityOptions([3]);
        break;
    }
  };

  /**
  * @description функция изменения колчества мест
  */
  var changeRoomNumber = function () {
    inputRoomValidateNumber();
  };

  /**
  * @description функция синхронизации времени в форме
  * @param {event} evt - событие клика
  */
  var onChangeTime = function (evt) {
    timeIn.value = evt.target.value;
    timeOut.value = evt.target.value;
  };

  /**
  * @description функция смены минимальной цены за ночь
  */
  var onChangeType = function () {
    price.min = price.placeholder = priceTypes[type.value];
  };


  /**
  * @description функция действия при успешной отправки данных на сервер
  */
  var onSuccess = function () {
    success.classList.remove('hidden');
    success.addEventListener('click', onSuccessClick);
    document.addEventListener('keydown', onPopupEscPress);
    window.map.onMainDisabled();
  };

  /**
  * @description функция скрывания окна успешной передачи данных
  */
  var onSuccessClick = function () {
    success.classList.add('hidden');
    main.removeEventListener('keydown', onPopupEscPress);
  };

  /**
  * @description функция скрывания окна успешной передачи данных по esc
  * @param {event} evt - событие клика на esc
  */
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      onSuccessClick();
    }
  };

    /**
  * проверка формы на активность
  */
  window.util.toggleAvailabilityFields(inputList);
  window.util.toggleAvailabilityFields(selectList);
  window.util.toggleAvailabilityFields(textAreaList);
  window.util.toggleAvailabilityFields(buttonList);


  onChangeType();
  inputRoomValidateNumber();

  roomNumber.addEventListener('change', changeRoomNumber);
  type.addEventListener('change', onChangeType);
  timeIn.addEventListener('change', onChangeTime);
  timeOut.addEventListener('change', onChangeTime);
  formFilter.addEventListener('change', function () {
    var filtered = window.filters.getFilteredPins(window.data);
    var cardSelector = map.querySelector('.map__card');
    cardSelector.classList.add('hidden');
    window.debounce(function () {
      window.pins.drawPins(filtered);
    });
  });
  form.addEventListener('submit', function (evt) {
    window.backend.request(onSuccess, window.map.errorHandler, new FormData(form));
    evt.preventDefault();
  });

  window.form = {
    /**
    * @description функция получения адреса метки и передачи в input
    * @param {object} elem - элемент
    */
    setAddress: function (elem) {
      var PIN_WIDTH = elem.clientWidth / 2;
      var coordX = Math.round(elem.offsetLeft + PIN_WIDTH);
      var coordY = Math.round(elem.offsetTop + elem.clientHeight);
      formAddress.value = coordX + ', ' + coordY;
    },

    /**
    * @description функция удаления фотографий жилья
    */
    deletePhoto: function () {
      var photoImg = photoPreview.querySelectorAll('img');
      photoImg.forEach(function (it) {
        photoPreview.removeChild(it);
      });
    }
  };
})();
