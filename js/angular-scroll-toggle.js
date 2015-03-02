/**
*
* Author:      Ricardo Corrie <https://github.com/rcorrie>
* Version:     scroll-toggle 0.0.1
* Modified:    Ricardo Corrie, 02/25/2015
*
* # ScrollToggle
* ScrollToggle is a small JavaScript component that lets you perform actions on elements depending on which direction the viewport is scrolled.
* 
* [DEMO](http://hiyermedia.com/angular-scroll-toggle/)
* 
* ## How to use
* Include the JS and CSS files, then inject the `angular-scroll-toggle` module into your app.
* 
* ```javascript
* var myApp = angular.module('myApp', ['angular-scroll-toggle']);
* ```
* 
* Now you can apply the directive to any element.
* 
* ```html
* <div scroll-toggle> This is my element! </div>
* ```
* 
* You can conditionally halt the directive by passing a boolean to the `toggle-if` scope attribute, as demonstrated below.
* ```javascript
* app.controller('myController', function($scope, $timeout){
* 	$scope.activateScrollToggle = false;
* 	$timeout(function(){
* 			$scope.activateScrollToggle = true;
* 	}, 5000);
* });
* ```
* ```html
* <div scroll-toggle toggle-if="activateScrollToggle">...</div>
* ```
* 
* ## Callback
* You can define your own callback function like so:
* ```html
* <div ng-controller="myController">
* 	<div scroll-toggle="myCallback">{{scroll.direction}}</div>
* </div>
* ```
* ```JavaScript
* app.controller('myController', function($scope){
* 	$scope.scroll = {};
* 	$scope.scroll.direction;
* 	$scope.myCallback = function(direction, element){
* 		if(direction) $scope.scroll.direction = 'Down';
* 		else $scope.scroll.direction = 'Up';
* 	}
* })
* ```
* 
* ### Option Attributes
* 
* You can add the following attributes to the element on which you applied the
* directive:
* 
* *	`scrollClass`       applies passed class name to element on init
* 
* *	`scrollUpClass`     applies passed class name to element on upwards scroll
* 
* *	`scrollDownClass`   applies passed class name to element on downward scroll
* 
* *	`offset`            ignores scrolling between top margin and offset
* 
* ## TODO
* * ~~Add `halt` option~~
* * ~~Accept callback functions~~
*
*
*/
(function(angular){

  'use strict';

  var scrollToggle = angular.module('angular-scroll-toggle', []);

  scrollToggle.directive('scrollToggle', ['$window', '$timeout', scrollToggleDirective]);

  function scrollToggleDirective($window, $timeout){
    return {
      restrict:   'AC',
      scope:      {
                    scrollToggle: '=',
                    toggleIf:     '='
                  },
      template:   '<div ng-transclude></div>',
      transclude: true,
      link: function(scope, element, attributes){

        var lastScrollTop = 0;
        var elementHalt   = false;

        var scrollOptions = {
          scrollClass:      'scroll-toggle',
          scrollUpClass:    'scroll-toggle-up',
          scrollDownClass:  'scroll-toggle-down',
          offset:           0
        };

        init();

        function init(){
          elementHalt = false;
          setOptions(attributes);
          element.addClass(scrollOptions.scrollClass);
          $timeout(function(){
            angular.element($window).bind('scroll', function(){
              scrollListener();
            });
          }, 500);
        };

        function halt(){
          element.removeClass(scrollOptions.scrollUpClass);
          element.removeClass(scrollOptions.scrollDownClass);
          elementHalt = true;
        };

        function scrollListener(){
          var direction = getScrollDirection(getScrollTop());
          applyToggle(direction);
        };

        function applyToggle(direction){
          if(direction===null || elementHalt) return;
          callback(direction, element);
        };

        function callback(direction, element){
          if(attributes.scrollToggle.length) scope['scrollToggle'](direction, element);
          else defaultAction(direction);
          scope.$apply();
        };

        function defaultAction(direction){
          element.removeClass( ( direction ? scrollOptions.scrollUpClass : scrollOptions.scrollDownClass ) );
          element.addClass( ( direction ? scrollOptions.scrollDownClass : scrollOptions.scrollUpClass ) );
        };

        function setOptions(obj){
          var options = obj;
          for(var key in options){
            scrollOptions[key] = options[key];
          };
        };

        function getScrollDirection(scrollTop){
          if(scrollTop < parseInt(scrollOptions.offset)) return null;
          var direction = scrollTop > lastScrollTop;
          setScrollTop(scrollTop);
          return direction;
        };

        function setScrollTop(scrollTop){
          lastScrollTop = scrollTop;
        };

        function getScrollTop(){
          return document.body.scrollTop;
        };

        scope.$watch('toggleIf', function(active){
          if (!angular.isUndefined(scope.toggleIf) && !active) halt();
        });

      }
    };
  };

})(angular);
