/**
*
* Author:      Ricardo Corrie <https://github.com/rcorrie>
* Version:     scroll-toggle 0.0.1
* Modified:    Ricardo Corrie, 02/25/2015
*
* # ScrollToggle
* ScrollToggle is a small JavaScript component that lets you perform actions on elements depending on which direction the viewport is scrolled.
* 
* [DEMO](http://hiyermedia.com/scroll-toggle/)
* 
* ## How to use
* Include the JS and CSS files, then inject the `angular-scroll-toggle` module into your app.
* 
* ```javascript
* var myApp = angular.module('myApp', ['count-to']);
* ```
* 
* Now you can apply the directive to any element.
* 
* ```html
* <div scroll-toggle> This is my element! </div>
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
*
*/
(function(angular){

  'use strict';

  var scrollToggle = angular.module('angular-scroll-toggle', []);

  scrollToggle.directive('scrollToggle', ['$window', '$timeout', scrollToggleDirective]);

  function scrollToggleDirective($window, $timeout){
    return {
      restrict:   'AC',
      template:   '<div ng-transclude></div>',
      transclude: true,
      link: function(scope, element, attributes){

        var lastScrollTop = 0;

        var scrollOptions = {
          scrollClass:      'scroll-toggle',
          scrollUpClass:    'scroll-toggle-up',
          scrollDownClass:  'scroll-toggle-down',
          offset:           0
        };

        init();

        function init(){
          setOptions(attributes);
          element.addClass(scrollOptions.scrollClass);
          $timeout(function(){
            angular.element($window).bind('scroll', function(){
              scrollListener();
            });
          }, 500)
        };

        function scrollListener(){
          var direction = getScrollDirection(getScrollTop());
          applyToggle(direction);
        }

        function applyToggle(direction){
          if(direction===null) return;
          callback(direction, element);
        }

        function callback(direction, element){
          if(attributes.scrollToggle.length) scope[attributes.scrollToggle](direction, element);
          else defaultAction(direction);
          scope.$apply();
        }

        function defaultAction(direction){
          element.removeClass( ( direction ? scrollOptions.scrollUpClass : scrollOptions.scrollDownClass ) );
          element.addClass( ( direction ? scrollOptions.scrollDownClass : scrollOptions.scrollUpClass ) );
        }

        function setOptions(obj){
          var options = obj;
          for(var key in options){
            scrollOptions[key] = options[key];
          };
        }

        function getScrollDirection(scrollTop){
          if(scrollTop < parseInt(scrollOptions.offset)) return null;
          var direction = scrollTop > lastScrollTop;
          setScrollTop(scrollTop);
          return direction;
        }

        function setScrollTop(scrollTop){
          lastScrollTop = scrollTop;
        }

        function getScrollTop(){
          return document.body.scrollTop;
        }

      }
    }
  };

})(angular);
