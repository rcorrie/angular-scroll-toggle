# ScrollToggle
ScrollToggle is a small JavaScript component that lets you perform actions on elements depending on which direction the viewport is scrolled.

[DEMO](http://hiyermedia.com/angular-scroll-toggle/)

## How to use
Include the JS and CSS files, then inject the `angular-scroll-toggle` module into your app.

```javascript
var myApp = angular.module('myApp', ['count-to']);
```

Now you can apply the directive to any element.

```html
<div scroll-toggle> This is my element! </div>
```

### Option Attributes

You can add the following attributes to the element on which you applied the
directive:

*	`scrollClass`       applies passed class name to element on init

*	`scrollUpClass`     applies passed class name to element on upwards scroll

*	`scrollDownClass`   applies passed class name to element on downward scroll

*	`offset`            ignores scrolling between top margin and offset

## TODO
* Watch attributes
* Add `halt` option
* Accept callback functions
