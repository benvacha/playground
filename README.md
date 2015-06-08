esoScroll
=========

A jQuery plugin to extend scrolling response. Allows methods to be triggered when scrolling starts, happens, ends, hits the top, hits the bottom, goes past the top, or goes past the bottom. The top boundry, bottom boundry, and start position can be offset by a static integer value or dynamically by an element height. 

---
### Overview and Usage
esoScroll is tested on all modern desktop browsers, iOS, and android to ensure proper and consistent operation.

#### Document or Window
esoScroll is fully functional when used on the document or window elements; body is not fully supported. Overflow is handled by the native browser scrolling. No special consideration is needed when elements within the document change sizes.
```javascript
$(document).esoScroll({options});
```

#### Element
esoScroll is fully functional when used on elements within the body. Elements can be selected like any other jquery object. Groups of elements are each handled independently. Elements should have their css overflow values set to auto or scroll. Scrolling is handled by the native browser element scrolling. No special consideration is need when sub elements within the element change sizes. 
```javascript
$('element').esoScroll({options});
```

#### Mobile Safari Behavior
Mobile Safari on iOS requires special consideration. When scrolling the document or window, iOS automatically caches all DOM updates until the scroll has completed. This means that events are still triggered as expected, but any visual updates to the DOM will not appear until after scrolling has fully stopped.

However, esoScroll bypasses the DOM caching behavior when scrolling an element. This means that events are triggered and the DOM visually updated as expected when scrolling elements. 

The document or window caching behavior can be bypassed by scrolling instead on a wrapper element around everything in the body. The wrapper element can be given css to set the width and height to 100%, overflow to auto, and -webkit-overflow-scrolling to touch. -webkit-overflow-scrolling tells iOS to use inertial scrolling in the element.

---
### Options
All options are optional and can be used in any combination you require.
```javascript
$('element').esoScroll({
  startOffset: integer,
  startOffsetter: $('element'),
  //
  onAtTop: function(fromTop, fromBottom),
  onAtBottom: function(fromTop, fromBottom),
  //
  onStart: function(fromTop, fromBottom),
  onMove: function(fromTop, fromBottom),
  onStop: function(fromTop, fromBottom),
  onStopDelay: integer,
  //
  onUnder: function(fromTop, fromBottom),
  underOffset: integer,
  underOffsetter: $('element'),
  //
  onOver: function(fromTop, fromBottom),
  overOffset: integer,
  overOffsetter: $('element'),
});
```










