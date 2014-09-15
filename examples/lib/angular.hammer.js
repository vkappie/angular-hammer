/*
 * angular-hammer v1.1.3
 * (c) 2013 Monospaced http://monospaced.com
 * License: MIT
 */

(function (window, angular, Hammer) {
  'use strict';

  // ---- Default Hammer Directive Definitions ----

  var gestureTypes = [
    'hmmrPan:pan',
    'hmmrPanStart:panstart',
    'hmmrPanMove:panmove',
    'hmmrPanEnd:panend',
    'hmmrPanCancel:pancancel',
    'hmmrPanLeft:panleft',
    'hmmrPanRight:panright',
    'hmmrPanUp:panup',
    'hmmrPanDown:pandown',
    'hmmrPinch:pinch',
    'hmmrPinchStart:pinchstart',
    'hmmrPinchMove:pinchmove',
    'hmmrPinchEnd:pinchend',
    'hmmrPinchCancel:pinchcancel',
    'hmmrPinchIn:pinchin',
    'hmmrPinchOut:pinchout',
    'hmmrPress:press',
    'hmmrRotate:rotate',
    'hmmrRotateStart:rotatestart',
    'hmmrRotateMove:rotatemove',
    'hmmrRotateEnd:rotateend',
    'hmmrRotateCancel:rotatecancel',
    'hmmrSwipe:swipe',
    'hmmrSwipeLeft:swipeleft',
    'hmmrSwipeRight:swiperight',
    'hmmrSwipeUp:swipeup',
    'hmmrSwipeDown:swipedown',
    'hmmrTap:tap'
  ];

  // ---- Module Definition ----

  /**
   * @ngInject
   */
  angular.module('hmmrTouchEvents', [])
    .directive('hmmrCustom', hammerCustomDirective);

  angular.forEach(gestureTypes, function (type) {
    var directive = type.split(':'),
        directiveName = directive[0],
        eventName = directive[1];

    /**
     * @ngInject
     */
    angular.module('hmmrTouchEvents')
      .directive(directiveName, function ($parse, $window) {
        return {
          'restrict' : 'A',
          'link' : function (scope, element, attrs) {
            var apply = scope.safeApply || scope.$apply,
                expr = $parse(attrs[directiveName]),
                handler = window[attrs[directiveName]] || function (event) {
                  apply(function () {
                    expr(scope, {$event: event});
                  });
                },
                opts = $parse(attrs.hmmrOptions)(scope, {}),
                hammer = element.data('hammer');

            if (!Hammer || !$window.addEventListener) {
              if (directiveName === 'hmmrTap') {
                element.bind('click', handler);
              }

              return;
            }

            if (!hammer) {
              hammer = new Hammer(element[0], opts);
              element.data('hammer', hammer);
            }

            hammer.on(eventName, handler);
            scope.$on('$destroy', function () {
              hammer.off(eventName, handler);
            });
          }
        };
      });
  });

  // ---- Hammer Custom Recognizer Directive Implementation ----

  function hammerCustomDirective ($parse) {
    return {
      'restrict' : 'A',
      'link' : function (scope, element, attrs) {
        var apply = scope.safeApply || scope.$apply,
            hammer = element.data('hammer'),
            opts = $parse(attrs.hmmrOptions)(scope, {}),
            recognizerString = attrs.hmmrCustom,
            recognizerList = recognizerString.split('; ');

        if (!hammer) {
          hammer = Hammer.Manager(element[0], opts);
          element.data('hammer', hammer);
        }

        angular.forEach(recognizerList, function (paramString) {
          var paramList = paramString.split(' '),
              options = {},
              expression,
              handler,
              recognizer;

          angular.forEach(paramList, function (param) {
            var parameter = param.split(':'),
                key = parameter[0],
                value = parameter[1];

            options[key] = parseParameterValue(key, value);
          });

          recognizer = hammer.get(options.event);

          if (recognizer) {
            recognizer.set(options);
          } else {
            addRecognizer(hammer, options);
          }

          if (options.recognizeWith) {
            recognizer.recognizeWith(options.recognizeWith);
          }

          if (options.requireFailure) {
            recognizer.requireFailure(options.requireFailure);
          }

          expression = $parse(options.expr);
          handler = function (event) {
            apply(function () {
              expression(scope, {'$event' : event});
            });
          };

          hammer.on(options.event, handler);
          scope.$on('$destroy', function () {
            hammer.off(options.event, handler);
          });
        });
      }
    };
  }

  // ---- Private Functions -----

  function addRecognizer (manager, options) {
    var recognizer;

    if (options && options.type && options.event) {
      if (options.type === 'pan') {
        recognizer = new Hammer.Pan(options);
      }

      if (options.type === 'pinch') {
        recognizer = new Hammer.Pinch(options);
      }

      if (options.type === 'press') {
        recognizer = new Hammer.Press(options);
      }

      if (options.type === 'rotate') {
        recognizer = new Hammer.Rotate(options);
      }

      if (options.type === 'swipe') {
        recognizer = new Hammer.Swipe(options);
      }

      if (options.type === 'tap') {
        recognizer = new Hammer.Tap(options);
      }
    }

    if (manager && recognizer) {
      manager.add(recognizer);
    }
  }

  function parseParameterValue (key, value) {
    if (key === 'direction') {
      var directions = value.split('|'),
          directionValue = 0;

      angular.forEach(directions, function (direction) {
        if (Hammer.hasOwnProperty(direction)) {
          directionValue = directionValue | Hammer[direction];
        }
      });

      return directionValue;
    } else if (key === 'interval' ||
               key === 'pointers' ||
               key === 'posThreshold' ||
               key === 'taps' ||
               key === 'threshold' ||
               key === 'time' ||
               key === 'velocity') {
      return +value;
    } else {
      return value;
    }
  }
})(window, window.angular, window.Hammer);
