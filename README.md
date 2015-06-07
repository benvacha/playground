# Navsponsive

### One Menu, Many Devices
An accessible, responsive CSS menu framework with a jQuery upgrade. *Navsponsive* provides a drop down capable menu bar on desktop browsers, a redacted menu bar and complete slide out menu on tablets, and a minimal menu bar and complete slide out menu on phones. *Navsponsive* uses pure CSS where possible to ensure accessible operation even when JS is disabled.

---

## Usage

#### HTML Structure
``` html
<ul class="navsponsive">
  <li><a href="#">No Drop Linked</a>
  </li>
  <li><a href="#">Top Level Linked Drop</a>
    <ul>
      <li><a href="#">Drop Option</a>
        <ul>
          <li><a href="#">Drop Drop Option</a><li>
          <li><a href="#">Drop Drop Option</a><li>
          <li><a href="#">Drop Drop Option</a><li>
        </ul>
      </li>
      <li><a href="#">Drop Option</a></li>
      <li><a href="#">Drop Option</a></li>
    </ul>
  </li>
  <li><span>Top Level No Link Drop</span>
    <ul>
      <li><a href="#">Drop Option</a></li>
      <li><span>Drop Option Not Linked</span>
        <ul>
          <li><a href="#">Drop Drop Option</a><li>
          <li><a href="#">Drop Drop Option</a><li>
          <li><a href="#">Drop Drop Option</a><li>
        </ul>
      </li>
      <li><a href="#">Drop Option</a></li>
    </ul>
  </li>
</ul>
```

#### Menu Modifications
```html
<!--
  level 1 align left
  level 2 align left drop down
  level 3 drop right and down
  same as class="navsponsive left down" -->
<ul class="navsponsive">
  <!-- menu -->
</ul>

<!-- 
  level 1 align right
  level 2 align right drop down
  level 3 drop left and down 
  same as class="navsponsive right down" -->
<ul class="navsponsive right">
  <!-- menu -->
</ul>

<!-- 
  level 1 align left
  level 2 align left drop up
  level 3 drop right and up
  same as class="navsponsive left up -->
<ul class="navsponsive up">
  <!-- menu -->
</ul>

<!-- 
  level 1 align right
  level 2 align right drop up
  level 3 drop left and up --->
<ul class="navsponsive right up">
  <!-- menu -->
</ul>

<!-- 
  level 1 align left
  level 2 align left drop down
  level 3 drop right and down --->
<ul class="navsponsive left down">
  <!-- menu -->
  <!-- 
    this option align right drop down
    level 3 drop left and down -->
  <li class="right">
    <!-- sub menu -->
  </li>
</ul>

<!-- 
  level 1 align left
  level 2 align left drop up
  level 3 drop right and up --->
<ul class="navsponsive left up">
  <!-- menu -->
  <!-- 
    this option align right drop up
    level 3 drop left and up -->
  <li class="right">
    <!-- sub menu -->
  </li>
</ul>

<!-- 
  level 1 align right
  level 2 align right drop down
  level 3 drop left and down --->
<ul class="navsponsive right down">
  <!-- menu -->
  <!-- 
    this option align left drop down
    level 3 drop right and down -->
  <li class="left">
    <!-- sub menu -->
  </li>
</ul>

<!-- 
  level 1 align right
  level 2 align right drop up
  level 3 drop left and up --->
<ul class="navsponsive right up">
  <!-- menu -->
  <!-- 
    this option align left drop up
    level 3 drop right and up -->
  <li class="left">
    <!-- sub menu -->
  </li>
</ul>

```

---

## Style

#### Coming Soon

---

The MIT License (MIT)

Copyright (c) 2014 Benjamin Vacha

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
