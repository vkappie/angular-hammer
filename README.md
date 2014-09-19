# Angular Hammer v2

An [Angular.js](https://angularjs.org/) module that enables you to bind custom behavior to [Hammer.js](http://hammerjs.github.io/) touch events. It was derived from the [Angular Hammer](https://github.com/monospaced/angular-hammer) project by [Monospaced](https://github.com/monospaced).

## Installation 

Install using the [Bower](http://bower.io/) package manager.

```bash
$ bower install RyanMullins/AngularHammer
```

Add `hmTouchEvents` to your app or module's dependencies. This module is designed to work with Angular.js v1.2.0+, and Hammer.js v2.0.0+. 

## Usage

The `hmTouchEvents` module provides a series of attribute [directives](https://docs.angularjs.org/guide/directive) for hooking into the standard Hammer.js events. The following list shows the Hammer event and corresponding Angular directive (format: &lt;eventName&gt; : &lt;directiveName&gt;). Events on the top level are fired every time a gesture of that class happens. The second-level events are more specific to the gesture state, but that interaction also triggers a top level event. 

* pan : hmPan
    - panstart : hmPanStart
    - panmove : hmPanMove
    - panend : hmPanEnd
    - pancancel : hmPanCancel
    - panleft : hmPanLeft
    - panright : hmPanRight
    - panup : hmPanUp
    - pandown : hmPanDown
* pinch : hmPinch
    - pinchstart : hmPinchStart
    - pinchmove : hmPinchMove
    - pinchend : hmPinchEnd
    - pinchcancel : hmPinchCancel
    - pinchin : hmPinchIn
    - pinchout : hmPinchOut
* press : hmPress
* rotate : hmRotate
    - rotatestart : hmRoatetStart
    - rotatemove : hmRotateMove
    - rotateend : hmRotateEnd
    - rotatecancel : hmRotateCancel
* swipe : hmSwipe
    - swipeleft : hmSwipeLeft
    - swiperight : hmSwipeRight
    - swipeup : hmSwipeUp
    - swipedown : hmSwipeDown
* tap : hmTap
* doubletap : hmDoubleTap 

Behaviors to be executed on an event are defined as values of the attribute. The directives first try to resolve the value to a function available on the scope; if that function is found the event is passed to it, otherwise the value is parsed as an [Angular expression](https://docs.angularjs.org/guide/expression). Beware, invalid Angular expressions will cause an error. 

```
[data-]hm-tap="onHammer"            // Using a function available in the scope
[data-]hm-tap="model.name='Ryan'"   // Using an Angular expression
```

You can set the options of the [manager](http://hammerjs.github.io/api/#hammer.manager) via the `hm-options` attribute. Values for this should be specified as a stringified JSON object with the properties specified in the [Manager defaults](http://hammerjs.github.io/api/#hammer.defaults) documentation.

```
[data-]hm-options="{'touchAction':'auto','domEvents':false}" 
```

### Custom Gesture Recognizers 

You can add custom gesture recognizers using the `hmCustom` directive. Custom gestures are defined as a stringified JSON array of objects. Each object must contain three properties: 

* `type`: the base recognizer that you are extending
* `event` : the name of the custom event you are defining
* `val` : the function of expression to be triggered

These definitions may also include any of the properties in the [Pan](http://hammerjs.github.io/recognizer-pan), [Pinch](http://hammerjs.github.io/recognizer-pinch), [Press](http://hammerjs.github.io/recognizer-press), [Rotate](http://hammerjs.github.io/recognizer-rotate), [Swipe](http://hammerjs.github.io/recognizer-swipe), or [Tap](http://hammerjs.github.io/recognizer-tap) gesture recognizers. For those recognizers that take a `directions` option, please specify this as a string of the DIRECTION_* values separated by a `|` and containing no spaces. 

```
[data-]hm-custom="[{'type':'pan','event':'rightTap','val':'onRightTap','pointers':2,'directions':'DIRECTION_LEFT|DIRECTION_RIGHT'}]"
```

## Demo

Coming soon...