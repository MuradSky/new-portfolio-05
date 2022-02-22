/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/blocks/modules/anchor/anchor.js":
/*!*********************************************!*\
  !*** ./src/blocks/modules/anchor/anchor.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {$(function () {
  $(".js-anchor").on("click", "a", function (event) {
    event.preventDefault();
    var id = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({
      scrollTop: top
    }, 1000);
  });
  var $anchorLinks = $('.js-anhor__links'),
      $window = $(window),
      $anchorLinksOffset,
      isFixed = false;
  $window.on('load resize', function () {
    $anchorLinksOffset = $anchorLinks.offset().top;
    var $anchorLinksH = $anchorLinks.height();
    $anchorLinks.parent().height($anchorLinksH);
  });
  $window.on('load scroll', function () {
    var $windowTop = $window.scrollTop();

    if ($windowTop > $anchorLinksOffset) {
      if (!isFixed) {
        $anchorLinks.addClass('anchor__links_fidex');
        isFixed = true;
      }
    } else {
      if (isFixed) {
        $anchorLinks.removeClass('anchor__links_fidex');
        isFixed = false;
      }
    }
  });
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/blocks/modules/form/form.js":
/*!*****************************************!*\
  !*** ./src/blocks/modules/form/form.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {$(function () {
  $.fn.setCursorPosition = function (pos) {
    if ($(this).get(0).setSelectionRange) {
      $(this).get(0).setSelectionRange(pos, pos);
    } else if ($(this).get(0).createTextRange) {
      var range = $(this).get(0).createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  };

  $('input[name="phone"]').mask("+7 (999) 999-9999").click(function () {
    $(this).setCursorPosition(4);
  });
  initForm();

  function initForm() {
    $('body').on('submit', 'form', function (e) {
      var t = $(this);

      if (!isFormValidate(t)) {
        e.preventDefault();
        e.stopPropagation();
        $('.has-error', t).first().focus();
      } else if (t.hasClass('ajax-form')) {
        e.preventDefault();
        t.closest('.ajax-form');
        t.addClass('load');
        sendFormAjax(t, function (data) {
          formSendResult(t, data);
          t.removeClass('load');
        });
      }
    });
    $('body').on('change', '.has-error', function () {
      var t = $(this);

      if (isFieldValidate(t)) {
        t.closest('.has-error').removeClass('has-error');
      }
    });
  }
  /**
   * Валидация E-mail адреса
   * @param {string} emailAddress - e-mail для проверки
   * @returns {Boolean}
   */


  function isValidEmail(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
  }
  /**
   * Валидация всей формы
   * @param {object} form jQuery объект формы
   * @param {string} error_class класс ошибки
   * @returns {Boolean}
   */


  function isFormValidate(form, error_class) {
    var result = true,
        rq = $('.required', form).length,
        check = ['input[type="text"]', 'input[type="login"]', 'input[type="password"]', 'input[type="number"]', 'input[type="checkbox"]', 'input[type="tel"]', 'input[type="email"]', 'input[type="textarea"]', 'input[type="select"]', 'textarea', 'select'],
        parent;
    error_class = error_class || 'has-error';
    $('.required, input, textarea, select').removeClass(error_class);

    if (rq < 1) {
      return result;
    }

    for (var i = 0; i < rq; i++) {
      parent = $('.required', form).eq(i);
      $(check.join(','), parent).each(function () {
        if (!isFieldValidate($(this), error_class)) {
          return result = false;
        }
      });
    }

    return result;
  }
  /**
   * Проверка валидации поля
   * @param {object} field jQuery объект поля формы
   * @param {string} error_class класс ошибки
   * @returns {Boolean}
   */


  function isFieldValidate(field, error_class) {
    var result = true;

    if (notNull(field) && notNull(field.attr('name')) && field.attr('name') !== '') {
      var val = (field.val() + '').trim();

      if (field.hasClass('valid_email') && !isValidEmail(val)) {
        result = false;
      } else if (field.attr('type') === 'checkbox' && !field.is(':checked')) {
        result = false;
      } else if (!notNull(val) || val === '' || val === field.data('mask')) {
        field.val('');
        result = false;
      }
    }

    if (!result) {
      field.addClass(error_class);
    } else {
      field.removeClass(error_class);
    }

    return result;
  }
  /**
   * Проверяем значение на null и undefined
   * @param {mixed} val значение
   * @returns {Boolean}
   */


  function notNull(val) {
    return val !== null && val !== undefined;
  }
  /**
   * Отправляем форму ajax
   * @param {object} form jQuery объект формы
   * @param {function} callback функция обратного вызова
   */


  function sendFormAjax(form, callback) {
    sendAjax(form.attr('action') || '/', form.serialize(), callback);
  }
  /**
   * Отправляем ajax запрос
   * @param {string} url ссылка
   * @param {object} data данные
   * @param {function} callback функция обратного вызова
   */


  function sendAjax(url, data, callback) {
    callback = callback || function () {};

    $.ajax({
      url: url,
      dataType: 'json',
      type: 'POST',
      data: data,
      success: function success(data) {
        callback(data);
      },
      error: function error(data) {
        callback({
          'type': 'error',
          'class': 'danger',
          'text': data['responseText']
        });
      }
    });
  }
  /**
   * Обработка отправки формы
   * @param {object} form jQuery объект формы
   * @param {object} data данные полученные от сервера
   */


  function formSendResult(form, data) {
    form.after('<div class="form__text"><p>Мы скоро свяжемся с Вами!</p><p>Ваша заявка успешно отправлена!<p></div>');
    form.remove(); //цель отправка формы

    reachGoal(form.data('goal'), '');
  }
  /**
   * Достижение цели
   * @param {string} goal название цели
   * @param {string} added дополнительная информация
   */


  function reachGoal(goal, added) {
    reachGoalYM(goal, added);
    reachGoalGA(goal);
  }
  /**
   * Отправка цели в Метрику
   * @param {string} goal название цели
   * @param {string} added дополнительная информация
   */


  function reachGoalYM(goal, added) {
    if (window.yaCounter000) {
      window.yaCounter000.reachGoal(goal, added || {});
    }
  }
  /**
   * Отправка цели в Аналитику
   * @param {string} goal название цели
   */


  function reachGoalGA(goal) {
    if (window.gtag) {
      gtag('event', 'event_name', {
        'event_category': goal
      });
    }
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/blocks/modules/map/map.js":
/*!***************************************!*\
  !*** ./src/blocks/modules/map/map.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {$(function () {
  var audiMap;
  ymaps.ready(function () {
    audiMap = new ymaps.Map('map', {
      center: [55.90820965015344, 37.5982041925033],
      zoom: 16
    });
    audiPlacemark = new ymaps.Placemark(audiMap.getCenter(), {
      hintContent: 'Собственный значок метки',
      balloonContent: 'Это красивая метка'
    }, {
      iconLayout: 'default#image',
      iconImageHref: '/dist/img/content/pin.png',
      iconImageSize: [36, 40],
      iconImageOffset: [-10, -30]
    }), audiMap.geoObjects.add(audiPlacemark);
    audiMap.behaviors.disable('drag');
  });
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/blocks/modules/model/model.js":
/*!*******************************************!*\
  !*** ./src/blocks/modules/model/model.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {$(function () {
  var $modelSlider = $('.js-model-slider');
  $modelSlider.slick({
    arrows: false,
    autoplay: true,
    dots: true,
    slidesToShow: 1,
    dotsClass: 'model__slider-dots'
  });
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/blocks/modules/video/video.js":
/*!*******************************************!*\
  !*** ./src/blocks/modules/video/video.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var video = document.querySelector(".js-video");
var isMove = false;
window.addEventListener('load', function () {
  if (!isMove) {
    setTimeout(function () {
      video.play();
      isMove = true;
    }, 500);
  }
});

/***/ }),

/***/ "./src/js/import/modules.js":
/*!**********************************!*\
  !*** ./src/js/import/modules.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_video_video__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! %modules%/video/video */ "./src/blocks/modules/video/video.js");
/* harmony import */ var _modules_video_video__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_video_video__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_model_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! %modules%/model/model */ "./src/blocks/modules/model/model.js");
/* harmony import */ var _modules_model_model__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_model_model__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _modules_anchor_anchor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! %modules%/anchor/anchor */ "./src/blocks/modules/anchor/anchor.js");
/* harmony import */ var _modules_anchor_anchor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_modules_anchor_anchor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _modules_form_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! %modules%/form/form */ "./src/blocks/modules/form/form.js");
/* harmony import */ var _modules_form_form__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_modules_form_form__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _modules_map_map__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! %modules%/map/map */ "./src/blocks/modules/map/map.js");
/* harmony import */ var _modules_map_map__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_modules_map_map__WEBPACK_IMPORTED_MODULE_4__);
// import "%modules%/header/header";
// import "%modules%/footer/footer";






/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _import_modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./import/modules */ "./src/js/import/modules.js");


/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ })

/******/ });
//# sourceMappingURL=main.js.map