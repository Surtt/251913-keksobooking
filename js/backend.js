'use strict';

(function () {

  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var URL_POST = 'https://js.dump.academy/keksobooking';


  var getData = function (onLoad, onError, method, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    if (method === 'GET') {
      xhr.open('GET', URL_GET);
      xhr.send();
    } else if (method === 'POST') {
      xhr.open('POST', URL_POST);
      xhr.send(data);
    }
  };

  window.backend = {
    load: function (onLoad, onError) {
      getData(onLoad, onError);
    },
    save: function (data, onSave, onError) {
      getData(onSave, onError);
    }
  };

})();
