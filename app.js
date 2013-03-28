document.addEventListener('touchmove', function(e){
  e.preventDefault();
});

var angularHammerApp = angular.module('angularHammerApp', ['hmTouchEvents']);