'use strict';
/**
* @description модуль взаимодействия с картой
*/
(function () {
  var ESC_KEYCODE = 27;
  var main = document.querySelector('main');
  var map = main.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var form = main.querySelector('.ad-form');
  var inputList = document.querySelectorAll('input');
  var selectList = document.querySelectorAll('select');
  var formFilter = map.querySelector('.map__filters');
  var textAreaList = form.querySelectorAll('textarea');
  var buttonList = form.querySelectorAll('button');
  var cardSelector = map.querySelector('.map__card');
  var reset = form.querySelector('.ad-form__reset');
  var preview = form.querySelector('.ad-form-header__preview');
  var avatarImg = preview.querySelector('img');
  var errorTempate = document.querySelector('#error')
    .content
    .querySelector('.error');

  /**
  * Добавление экрана ошибки и скрытие его
  */
  main.appendChild(errorTempate);
  errorTempate.classList.add('hidden');

  /**
  * @description функция первого активирования страницы
  * @param {event} evt - событие
  */
  var onPinClick = function (evt) {
    evt.preventDefault();
    window.backend.request(window.pins.successHandler, window.map.errorHandler);
    onMainPinActivated();
    mainPin.removeEventListener('mousedown', onPinClick);
  };

  /**
  * @description функция активирования страницы
  */
  var onMainPinActivated = function () {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    formFilter.classList.remove('map__filters--disabled');
    window.util.toggleAvailabilityFields(inputList);
    window.util.toggleAvailabilityFields(selectList);
    window.util.toggleAvailabilityFields(textAreaList);
    window.util.toggleAvailabilityFields(buttonList);
  };

  /**
  * событие первого активирвания страницы
  */
  mainPin.addEventListener('mousedown', onPinClick);

  /**
  * событие смены информации карточки по пину
  */
  map.addEventListener('click', function (evt) {
    window.cards.onMainPinActive(evt);
    window.cards.closeCard();
  });


  /**
  * @description функция скрытия ошибки по нажатию на кнопку esc
  * @param {event} evt - событие нажатия
  */
  var onEscCloseError = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      errorTempate.classList.add('hidden');
      document.removeEventListener('keydown', onEscCloseError);
    }
  };

  /**
  *  Повторный запрос данных с сервера при нажатие на кнопку
  */
  var closeError = document.querySelector('.error__button');
  closeError.addEventListener('click', function (evt) {
    evt.preventDefault();
    errorTempate.classList.add('hidden');
  });

  /**
  * Деактивирование страницы при клике на ресет
  */
  reset.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.map.onMainDisabled();
  });

  window.map = {
    /**
    * @description функция вывода сообщения об ошибки
    */
    errorHandler: function () {
      errorTempate.classList.remove('hidden');
      document.addEventListener('keydown', onEscCloseError);
    },

    /**
    * @description функция возвращяющая страницу в неактивное состояние
    */
    onMainDisabled: function () {
      map.classList.add('map--faded');
      form.classList.add('ad-form--disabled');
      formFilter.classList.add('map__filters--disabled');
      form.reset();
      window.util.toggleAvailabilityFields(inputList);
      window.util.toggleAvailabilityFields(selectList);
      window.util.toggleAvailabilityFields(textAreaList);
      window.util.toggleAvailabilityFields(buttonList);
      window.pins.remove();
      window.mainPin.disabled();
      mainPin.addEventListener('mousedown', onPinClick);
      avatarImg.src = '../keksob/img/muffin-grey.svg';
      window.form.deletePhoto();
      cardSelector.classList.add('hidden');
    }
  };
})();
