/**
* Benjamin Vacha : benvacha.com
* KCPO : github.com/benvacha/kcpo
*/

/**
* Creates the GUI.
* Makes an ajax call to /api/scrape/thechive to get
* gallery information and then generates the list of posts.
* When a post title is clicked, it creates a slider with thumbnails.
* When the post image or thumbnail is clicked, the viewer is loaded
* with the gallery images and the selected image is shown full screen.
* The viewer can be controlled with taps and swipes to navigate images
* or hide the viewer. The plus at the bottom of the post list can be used
* to load the next page of posts into the GUI.
*/



var body;

// Runs when the page has fully loaded
// Initializes the base objects and the posts list
$(document).ready(function() {
    
    // the element to contain the app
    body = $('body');
    
    // the full screen viewer
    var viewer = new Viewer();
    viewer.appendTo(body);
    
    // the list of posts
    var galleries = new Galleries(viewer);
    galleries.init();
    galleries.appendTo(body);
    
    // fixes a known bug in mobile safari where orientation
    // changes cause the screen to improperly resize. Without
    // this the viewer is very sad when you rotate the device.
    window.onorientationchange = function() {
        body.scrollTop(body.scrollTop()-1);
    }
    
});



// The list of posts
// Handles page loading and gallery creation
function Galleries(viewer) {
    // basic object attributes
    this.parent = null;
    this.target = $('<div />').addClass('galleries');
    this.target.data('kcpo', {self:this});
    // the index of the next chive page to load
    this.pageOffset = 1;
    // the viewer that should be used
    this.viewer = viewer;
    // the + box at the bottom, used to load next chive page
    this.more = $('<div />').addClass('more').html('+');
    this.target.append(this.more);
    // when the + is clicked, handle it
    this.more.bind('click', {this:this}, function(e) {
        e.data.this.extend();
    });
}
Galleries.prototype.appendTo = function(parent) {
    // attach the gallery dom object to the parent
    this.parent = parent;
    this.parent.append(this.target);
}
Galleries.prototype.init = function() {
    // make the + become an animated loading gif
    this.more.html('<img src="images/loader.gif" />');
    // load the chive homepage
    // when the call succeeds, call processJson
    $.ajax({
        dataType: 'json',
        url: 'api/scrape/thechive',
        context: this,
        success: this.processJson
    });
}
Galleries.prototype.extend = function() {
    // make the + become an animated loading gif
    this.more.html('<img src="images/loader.gif" />');
    // load the next page of the chive
    // when the call succeeds, call processJson
    $.ajax({
        dataType: 'json',
        url: 'api/scrape/thechive/' + this.pageOffset,
        context: this,
        success: this.processJson
    });
}
Galleries.prototype.processJson = function(data) {
    // remove the + from the dom to make room for more posts
    this.more.detach();
    // increment the next page to load
    this.pageOffset += 1;
    // for each post in the JSON, create/add a new gallery
    for(var index in data) {
        // don't show non-image galleries
        // TODO: show all gallery types
        if(data[index].images.length) {
            var gallery = new Gallery(data[index], this.viewer);
            gallery.appendTo(this.target);
        }
    }
    // put the + back at the bottom
    this.more.html('+');
    this.target.append(this.more);
}



// A post
// Handles the thumb scroller and opening the viewer
function Gallery(json, viewer) {
    // basic object attributes
    this.parent = null;
    this.target = $('<div />').addClass('gallery');
    this.target.data('kcpo', {self:this});
    // the data json for this post
    this.json = json;
    // a reference to what viewer to use
    this.viewer = viewer;
    // is the thumb scroller visable
    this.expanded = false;
    // is the thumb scroller populated with thumbs
    this.populated = false;
    // create and add the initial post ui, aka the header and thumb image
    // the size of the thumb image is decided in the css, the ?w=125 should be large enough to overflow
    this.header = $('<div />').addClass('header');
    this.preview = $('<div />').addClass('preview').css('background-image', "url('" + json.images[0].uri + "?w=125')");
    this.title = $('<div />').addClass('title').html(json.title);
    this.header.append(this.preview);
    this.header.append(this.title);
    this.header.append('<div class="clear"></div>');
    // the thumb scroller container, hidden by default in the css
    this.images = $('<div />').addClass('images');
    // 
    this.target.append(this.header);
    this.target.append(this.images);
    // when the preview thumb is clicked, open the viewer to the first gallery image
    this.preview.bind('click', {this:this}, function(e) {
        e.data.this.viewer.show(e.data.this.json.images, 0);
    });
    // when the title is clicked, toggle the visibility of the thumb scroller
    this.title.bind('click', {this:this}, function(e) {
        if(e.data.this.expanded) {
            e.data.this.expanded = false;
            e.data.this.hideImages();
        } else {
            e.data.this.expanded = true;
            e.data.this.showImages();
        }
    });
}
Gallery.prototype.appendTo = function(parent) {
    // attach the gallery dom element to the parent
    this.parent = parent;
    this.parent.append(this.target);
}
Gallery.prototype.populateImages = function() {
    // populate the thumb scroller with thumb images
    for(var index in this.json.images) {
        // add the images to the scroller
        // the size of the images is decided here with the ?h=200 query option
        var image = $('<img />').attr('src', this.json.images[index].uri + '?h=200');
        this.images.append(image);
        // when an image is clicked, open the viewer to that image
        image.bind('click', {this:this, index:index}, function(e) {
            e.data.this.viewer.show(e.data.this.json.images, e.data.index);
        });
    }
    // mark that the thumb scroller has been populated
    this.populated = true;
}
Gallery.prototype.showImages = function() {
    // if the scroller is empty, fill it up
    if(!this.populated) {
        this.populateImages();
    }
    // hide the preview thumb and show the scroller
    this.preview.hide();
    this.images.show();
}
Gallery.prototype.hideImages = function() {
    // show the preview thumb and hide the scroller
    this.preview.show();
    this.images.hide();
}



// The full screen image viewer
// Handles gestures to navigate the image gallery
function Viewer() {
    // basic object attributes
    this.parent = null;
    this.target = $('<div />').addClass('viewer');
    this.target.data('kcpo', {self:this});
    // the current image index being shown
    this.currentIndex = null;
    // the array of images
    this.images = null;
    // handle key events
    var thiss = this;
    $(document).keydown(function(e) {
        if(e.which == 39) thiss.next();
        if(e.which == 38) thiss.hide();
        if(e.which == 37) thiss.back();
    });
    // handle gestures
    this.target.swipe({
        // Note on how this works in a OO way:
        // the Viewer class stores a reference to itself in the jquery data for the DOM object
        // the input events run the callback functions from the scope of the jquery DOM object
        // the reference to the Viewer instance can be obtained from the jquery data and used
        // to make method calls
        swipe: function(event, direction, distance, duration, fingerCount) {
            // swipe left goes to next image
            // swipe right goes back one image
            // swipe up or down hides the viewer
            switch(direction) {
                case 'left': this.data('kcpo').self.next(); break;
                case 'right': this.data('kcpo').self.back(); break;
                default: this.data('kcpo').self.hide(); break;
            }
        },
        doubleTap: function(event, target) {
            // double tapping/clicking hides the viewer
            this.data('kcpo').self.hide();  
        },
        tap: function(event, target) {
            // clicking on the left side of the screen goes to next image
            // clicking on the right side of the screen goes back one image
            // tapping on the screen goes to next image (event.offsetX is undefined for touch events)
            if(typeof event.offsetX == 'undefined' || event.offsetX > this.width()/2) {
                this.data('kcpo').self.next();
            } else {
                this.data('kcpo').self.back();
            }
        },
        threshold: 50,
        fingers: 'all'
    });
};
Viewer.prototype.appendTo = function(parent) {
    // add the viewer dom object to the parent
    this.parent = parent;
    this.parent.append(this.target);
};
Viewer.prototype.show = function(images, startIndex) {
    // start the image viewer at the requested image index
    this.currentIndex = startIndex;
    // remove all the old images from the viewer
    for(var index in this.images) {
        this.images[index].detach();
    }
    this.images = new Array();
    // add all the images for the gallery into the viewer, show the requested image first
    for(var index in images) {
        this.images[index] = $('<div />').addClass('image').css('background-image', "url('" + images[index].uri + "')");
        this.target.append(this.images[index]);
        if(index != this.currentIndex) {
            this.images[index].hide();
        }
    }
    // show the viewer
    this.target.show();
};
Viewer.prototype.hide = function() {
    // hide the viewer
    this.target.hide();
};
Viewer.prototype.next = function() {
    // if there are more images, go to the next one
    if(this.currentIndex < (this.images.length-1)) {
        // hide the current image
        this.images[this.currentIndex].hide();
        // show the next image
        this.currentIndex++;
        this.images[this.currentIndex].show();
    }
};
Viewer.prototype.back = function() {
    // if we aren't at the first image, show the previous image
    if(this.currentIndex > 0) {
        // hide the current image
        this.images[this.currentIndex].hide();
        // show the previous image
        this.currentIndex--;
        this.images[this.currentIndex].show();
    }
};
