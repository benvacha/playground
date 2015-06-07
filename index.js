/*
	Benjamin Vacha
	Pallet Placer
*/

/* global variables used for referencing dom elements
*/
var _controlForm, _truckWidth, _truckLength, _boxList, _checkBigSmall, _checkRandom, _bay, _message;

/* When the page has loaded, find the elements and initialize them
*/
$('document').ready( function() {
	
	// get the dom elements
	_controlForm = $('#controlForm');
	_controlSubmit = $('#controlForm [type="submit"]');
	_truckWidth = $('#truckWidth');
	_truckLength = $('#truckLength');
	_boxList = $('#boxList');
	_checkBigSmall = $('#checkBigSmall');
	_checkRandom = $('#checkRandom');
	_bay = $('#bay');
	_message = $('#message');
	
	// initialize the elements
	_truckWidth.val('250');
	_truckLength.val('400');
	_boxList.val('20:20, 30:30, 40:40, 50:50, 60:60, 70:70, 80:80, 90:90, 100:100, 20:150, 35:200, 89:345, 23:78, 78:89');
	
	// watch for user to submit
	_controlForm.submit( function(e) {
		e.preventDefault();
		_bay.children('.dock').remove();
		_controlSubmit.blur().val('.  .  .');
		draw();
	} );
	
} );

/* Read the input, draw the dom, then pack
*/
function draw() {

	// create the dock
	var dock = new Dock();
	
	// create the truck
	var truck = new Truck( parseInt(_truckWidth.val()), parseInt(_truckLength.val()) );
	
	// create the boxes
	var boxes = new Array();
	var tokens = _boxList.val().split(',')
	for(var i=0; i<tokens.length; i++) {
		var subtokens = tokens[i].trim().split(':');
		boxes.push( new Box( parseInt(subtokens[0]), parseInt(subtokens[1]), 0, truck ) );
	}
	
	// if its checked, apply a filter to the box order
	if(_checkBigSmall.attr('checked')) {
		minConflictBigSmall(boxes);
	} else if(_checkRandom.attr('checked')) {
		minConflictFisherYates(boxes);
	}
	
	// add everything together and to the dom
	dock.appendTo(_bay);
	dock.addTruck(truck);
	for(var i=0; i<boxes.length; i++) {
		truck.addBox(boxes[i]);
	}
	
	setTimeout(pack, 10, dock, truck, boxes);
}

/* Pack the truck?
*/
function pack(dock, truck, boxes) {

	// find the viable domains and neighbors
	for(var i=0; i<boxes.length; i++) {
		/*
		var domains = new Array();
		var domainWidth = truck.width - boxes[i].width;
		var domainLength = truck.length - boxes[i].length;
		for(var j=0; j<=domainLength; j++) {
			for(var k=0; k<=domainWidth; k++) {
				domains.push( new Domain(j, k) );
			}
		}
		boxes[i].domains = domains;
		*/
		var neighbors = new Array();
		for(var j=0; j<boxes.length; j++) {
			if(i!=j) { neighbors.push( boxes[j] ); }
		}
		boxes[i].neighbors = neighbors;
		boxes[i].generateDomains();
	}
	
	// pack the truck
	var steps = minConflicts(boxes, setMessage, setComplete);
	
}

function setMessage(message) {
	_message.html(message);
}

function setComplete(message) {
	_controlSubmit.val('Pack');
}









