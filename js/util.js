'use strict';
/**
* @description утилиты
*/
(function () {
  var map = document.querySelector('.map');
  window.util = {
    /**
    * @description функция проверки неактивности формы
    * @return {boolean}  css-селектор
    */
    isFormDisabled: function () {
      return map.classList.contains('map--faded');
    },

    /**
    * @description функция активирования и деактивирования элементов
    * @param {array} array - массив
    */
    toggleAvailabilityFields: function (array) {
      for (var i = 0; i < array.length; i++) {
        var arrayElem = array[i];
        arrayElem.disabled = window.util.isFormDisabled();
      }
    },

    /** Удаление элемента из массива.
    * @param {array} array: массив из которого нужно удалить элемент
    * @param {string} value: значение, которое необходимо найти и удалить.
    * @return {array} массив без удаленного элемента; false в противном случае.
    */
    arrayRemove: function (array, value) {
      var idx = array.indexOf(value);
      if (idx !== -1) {
      // Второй параметр - число элементов, которые необходимо удалить
        return array.splice(idx, 1);
      }
      return false;
    }
  };
})();
