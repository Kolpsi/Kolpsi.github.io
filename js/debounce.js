'use strict';
/**
* @description модуль устранения дребезга
*/
(function () {
  window.debounce = function (cb) {
    var DEBOUNCE_INTERVAL = 500; // ms

    var lastTimeout;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };
})();
