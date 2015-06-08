esoGrid
=======

A CSS responsive grid system. Allows for creating complex layouts that adjust automatically to different screen sizes. Includes both a simple (lite) and complex set of classes.

---
### Compatability
esoGrid is tested in all modern desktop browsers, iOS, and android to ensure proper and consistent operation.

#### IE
The CSS behaves as expected with IE7+. Content is still visible and behavior degrades gracefully in all browsers.

---
### Importing

#### Lite
```html
<script type="text/css" rel="stylesheet" href="esogrid.lite.prod.css" />
```

#### Full
```html
<script type="text/css" rel="stylesheet" href="esogrid.prod.css" />
```

---
### Usage
esoGrid classes can be used on any element and with any other custom classes. Consideration only needs to be given to overwriting the specific attributes set by the esoGrid class. Simple and complex examples can be found in the demo directory.

#### Lite VS Full
The full version of esoGrid contains a large number of class definitions and allows for a large amount of responsive behavior customization. esoGrid lite contains only the class definitions that have a defined responsive behavior. All lite definitions are also included in the full esoGrid.

---
### esoGrid Lite Definitions

#### .grid

#### .col

#### .clear

#### .clear-[0, 10, 15, 20, 30]

#### .left

#### .center

#### .right

#### .pos-[l, c, r]

#### .ninesixty

#### .fivefifty

#### .size-[960, 550]

#### .one

#### .half

#### .third

#### .twothird

#### .forth

#### .threeforth

#### .fifth

#### .twofifth

#### .threefifth

#### .fourfifth

#### .size-[100, 50, 33, 66, 25, 75, 20, 40, 60, 80]

#### .pad-[0, 5, 10, 15, 20]

#### .pad-tb-[0, 5, 10, 15, 20]

#### .pad-lr-[0, 5, 10, 15, 20]

#### .pad-t-[0, 5, 10, 15, 20]

#### .pad-r-[0, 5, 10, 15, 20]

#### .pad-b-[0, 5, 10, 15, 20]

#### .pad-l-[0, 5, 10, 15, 20]

#### .push-[0, 5, 10, 15, 20]

#### .push-tb-[0, 5, 10, 15, 20]

#### .push-lr-[0, 5, 10, 15, 20]

#### .push-t-[0, 5, 10, 15, 20]

#### .push-r-[0, 5, 10, 15, 20]

#### .push-b-[0, 5, 10, 15, 20]

#### .push-l-[0, 5, 10, 15, 20]

---
### esoGrid Full Definitions (Additional To Lite Definitions)

#### .clear-d[-t[-p]]
> d, t, p : n, 0, 10, 15, 20, 30

#### .pos-d[-t[-p]]
> d, t, p : l, c, r

#### .size-d[-t[-p]]
> d, t, p : 960, 550, 100

#### .size-d[-t[-p]]
> d, t, p : 100, 50, 33, 66, 25, 75, 20, 40, 60, 80

#### .pad-d[-t[-p]]
> d, t, p : 0, 5, 10, 15, 20

#### .pad-tb-d[-t[-p]]
> d, t, p : 0, 5, 10, 15, 20

#### .pad-lr-d[-t[-p]]
> d, t, p : 0, 5, 10, 15, 20

#### .pad-t-d[-t[-p]]
> d, t, p : 0, 5, 10, 15, 20

#### .pad-r-d[-t[-p]]
> d, t, p : 0, 5, 10, 15, 20

#### .pad-b-d[-t[-p]]
> d, t, p : 0, 5, 10, 15, 20

#### .pad-l-d[-t[-p]]
> d, t, p : 0, 5, 10, 15, 20

#### .push-d[-t[-p]]
> d, t, p : 0, 5, 10, 15, 20

#### .push-tb-d[-t[-p]]
> d, t, p : 0, 5, 10, 15, 20

#### .push-lr-d[-t[-p]]
> d, t, p : 0, 5, 10, 15, 20

#### .push-t-d[-t[-p]]
> d, t, p : 0, 5, 10, 15, 20

#### .push-r-d[-t[-p]]
> d, t, p : 0, 5, 10, 15, 20

#### .push-b-d[-t[-p]]
> d, t, p : 0, 5, 10, 15, 20

#### .push-l-d[-t[-p]]
> d, t, p : 0, 5, 10, 15, 20
