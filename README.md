The extension disables **lock orientation** JavaScript functions on web pages. So **no more an auto screen rotation** on web pages.
 
**WARNING!** The extension does not disable **auto rotation** made by CSS page styles!
So simple page transformation through a CSS style can still rotate web pages. See [transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)

# Installation

# How can I check if the extension works?
You can build the extension with `npm run watch`. It will enable a debug mode.  
After that you can call function below in **console** (press `F12` key) on a page.
```js
window.screen.orientation.lock("portrait"); // will print 'A try to execute disableLock'
screen.mozLockOrientation('landscape'); // will print 'A try to execute disableMozLockOrientation'
```

# How to build
To build for production use
```
npm run prod
```
To build and watch for development use
```
npm run watch
```

# How the extension works?
It replaces `ScreenOrientation.prototype.lock` and `Screen.prototype.mozLockOrientation` by fake functions
those change passed parameters to default values.  
In other words it disable **lock orientation** JavaScript API.

# Known issues
- There are some warnings on some pages of some sites about a violation of
[Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) but the extension works anyway.
- The extension does not prevent screen rotation that was made by CSS.
To prevent that it needs to set an inline CSS `style` attribute of `<html>` and `<body>` to a `initial` value.
And prevent its changes by using [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver).
Using [tabs.insertCSS()](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/insertCSS)
is not sufficient here!
Also it needs to parse CSS rule with third party libraries like [csstree](https://github.com/csstree/csstree)
because there is no an easy way to get a value of `transform: ...` CSS property.

# Documentation about orientation

- https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Managing_screen_orientation
- https://developer.mozilla.org/ru/docs/Web/API/Screen/lockOrientation
- https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation/lock
- https://stackoverflow.com/a/62254533
