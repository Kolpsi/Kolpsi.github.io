'use strict';
/**
* @description модуль загрузки и отправки данных
*/
(function () {
  var SUCCES = 200;
  var DELAY = 10000;
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var URL = 'https://js.dump.academy/keksobooking/data';

  window.backend = {
    /**
    * @description функция получения данных с сервера и отправки на сервер
    * @param {object} onSuccess - при успешном получении данных
    * @param {object} onError - при ошибке получении данных
    * @param {object} formData - данные которые нужно отправить
    */
    request: function (onSuccess, onError, formData) {
      var xhr = new XMLHttpRequest();

      /**
      * @description функция получения данных с сервера
      */
      var load = function () {
        xhr.open('GET', URL);
        xhr.send();
      };

      /**
      * @description функция отправки данных на сервер
      */
      var save = function () {
        xhr.open('POST', URL_UPLOAD);
        xhr.send(formData);
      };

      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === SUCCES) {
          var data = xhr.response;
          onSuccess(data);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = DELAY;

      if (formData) {
        save();
      } else {
        load();
      }

    }
  };
})();
