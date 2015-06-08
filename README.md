esoFooter
=========

A CSS sticky footer with a jQuery kicker. Using only CSS, creates a static height footer that "sticks" to the bottom of the page no matter the height of the content. Using the jQuery kicker, the height of the footer is dynamically monitored and kept sticky through page orientation and footer content changes.

This is a pure CSS sticky footer. The optional JS is only used to extend the functionality of the footer.

---
### Compatability
esoFooter is tested in all modern desktop browsers, iOS, and android to ensure proper and consistent operation.

#### IE
The CSS behaves as expected with IE7+. The JS behaves as expected with IE9+. Content is still visible and behavior degrades gracefully in all browsers.

---
### Importing

#### CSS Only
```html
<script type="text/css" rel="stylesheet" href="esofooter.prod.css" />
```

#### CSS and JS
```html
<link type="text/css" rel="stylesheet" href="esofooter.prod.css" />
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
<script type="text/javascript" src="esofooter.prod.js"></script>
```

---
### Usage
esoFooter is designed to be children of the body element. It uses the .body, .footer, and .footer-spacer classes.

```html
<body>
  <div class="body">
    
    body content here
    
    <div class="footer-spacer"></div>
  </div>
  <div class="footer">
    footer content here
  </div>
</body>
```

---
### Customization
By default the footer is 30px tall and has a #CCC background color. These values can be overwritten by adding custom CSS in a file imported after esoFooter.

```css
.footer, .footer-spacer {
  height: (newHeight)px;
}
.footer {
  margin-top:-(newHeight)px;
  background-color:(newColor);
}
```

---
### Javascript
The included JS file is optional. If your footer does not dynamically change heights, add content, or respond to orientation changes, you do not need the JS.

The JS works by monitoring the window for orientation changes, and the footer for content mutilations. If an event is detected, the height and margin-top of the .footer and the height of the .footer-spacer are adjusted to match the height of the content in the footer.


