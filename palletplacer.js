/*
	Benjamin Vacha
	Pallet Placer
*/

/* Dock Object
*/
function Dock() {
	this.trucks = new Array();
	this.parent = null;
	this.dom = $('<div />').addClass('dock');
}
Dock.prototype.appendTo = function(parent) {
	this.parent = parent;
	this.parent.append(this.dom);
	return this;
}
Dock.prototype.remove = function() {
	this.parent.remove(this.dom);
	this.parent = null;
	return this;
}
Dock.prototype.addTruck = function(truck) {
	this.trucks.push(truck);
	truck.appendTo(this.dom);
	return this;
}


/* Truck Object
*/
function Truck(width, length, height) {
	this.width = (width!=null) ? width : 0;
	this.length = (length!=null) ? length : 0;
	this.height = (height!=null) ? height : 0;
	this.boxes = new Array();
	this.parent = null;
	this.dom = $('<div />').addClass('truck').css({width:this.length, height:this.width});
}
Truck.prototype.appendTo = function(parent) {
	this.parent = parent;
	this.parent.append(this.dom);
	return this;
}
Truck.prototype.remove = function() {
	this.parent.remove(this.dom);
	this.parent = null;
	return this;
}
Truck.prototype.addBox = function(box) {
	this.boxes.push(box);
	box.appendTo(this.dom);
	return this;
}



/* Box Object
*/
function Box(width, length, height, truck) {
	this.width = (width!=null) ? width : 0;
	this.length = (length!=null) ? length : 0;
	this.height = (height!=null) ? height : 0;
	this.truck = (truck!=null) ? truck : null;
	this.parent = null;
	this.dom = $('<div />').addClass('box').css({width:this.length, height:this.width});
	// minConflict variables
	this.domain = null;
	this.domains = null;
	this.neighbors = null;
	this.tries = 0;
}
Box.prototype.appendTo = function(parent) {
	this.parent = parent;
	this.parent.append(this.dom);
	return this;
}
Box.prototype.remove = function() {
	this.parent.remove(this.dom);
	this.parent = null;
	return this;
}
// minConflict methods
Box.prototype.generateDomains = function() {
	var domains = new Array();
	var domainWidth = this.truck.width - this.width;
	var domainLength = this.truck.length - this.length;
	for(var j=0; j<=domainLength; j++) {
		for(var k=0; k<=domainWidth; k++) {
			domains.push( new Domain(j, k) );
		}
	}
	if(domains.length == 0) { this.modify(); }
	this.domains = domains;
}
Box.prototype.getDomain = function() {
	return this.domain;
}
Box.prototype.setDomain = function(domain) {
	this.domain = domain;
	return this;
}
Box.prototype.clone = function() {
	return new Box(this.width, this.length, this.height);
}
Box.prototype.update = function() {
	this.dom.css({width:this.length, height:this.width, bottom:this.domain.left, left:this.domain.front});
	return this;
}
Box.prototype.modify = function() {
	if(this.width != this.length && this.width <= this.truck.length && this.length <= this.truck.width) {
		var temp = this.width;
		this.width = this.length;
		this.length = temp;
		this.generateDomains();
	}
}
Box.prototype.conflict = function(neighbor) {
	//
	if(neighbor.domain==null) { return false; }
	//
	if(this.domain.left > neighbor.domain.left + neighbor.width) { return false; }
	if(this.domain.left + this.width < neighbor.domain.left) { return false; }
	if(this.domain.front > neighbor.domain.front + neighbor.length) { return false; }
	if(this.domain.front + this.length < neighbor.domain.front) { return false; }
	//
	return true;
}


/* Domain Object
*/
function Domain(front, left) {
	this.front = (front!=null) ? front : 0;
	this.left = (left!=null) ? left : 0;
	this.tries = 0;
}











