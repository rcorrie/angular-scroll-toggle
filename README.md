# ScrollToggle
ScrollToggle is a small JavaScript component that lets you perform actions on elements depending on which direction the viewport is scrolled.

[DEMO](http://hiyermedia.com/angular-scroll-toggle/)

## How to use
Include the JS and CSS files, then inject the `angular-scroll-toggle` module into your app.

```javascript
var myApp = angular.module('myApp', ['angular-scroll-toggle']);
```

Now you can apply the directive to any element.

```html
<div scroll-toggle> This is my element! </div>
```

## Callback
You can define your own callback function like so:
```html
<div ng-controller="myController">
	<div scroll-toggle="myCallback">{{scroll.direction}}</div>
</div>
```
```JavaScript
app.controller('myController', function($scope){
	$scope.scroll = {};
	$scope.scroll.direction;
	$scope.myCallback = function(direction, element){
		if(direction) $scope.scroll.direction = 'Down';
		else $scope.scroll.direction = 'Up';
	}
})
```

### Option Attributes

You can add the following attributes to the element on which you applied the
directive:

*	`scrollClass`       applies passed class name to element on init

*	`scrollUpClass`     applies passed class name to element on upwards scroll

*	`scrollDownClass`   applies passed class name to element on downward scroll

*	`offset`            ignores scrolling between top margin and offset

## TODO
* Add `halt` option
* ~~Accept callback functions~~
