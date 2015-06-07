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
function Box(width, length, height) {
	this.width = (width!=null) ? width : 0;
	this.length = (length!=null) ? length : 0;
	this.height = (height!=null) ? height : 0;
	this.parent = null;
	this.dom = $('<div />').addClass('box').css({width:this.length, height:this.width});
	// minConflict variables
	this.domain = null;
	this.domains = null;
	this.neighbors = null;
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
	this.dom.css({bottom:this.domain.left, left:this.domain.front});
	return this;
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
}











