/*
* EsoFrame : github.com/esocode/esoframe
* v0.0.1 : Feb 2014
* EsoCode : esocode.com
*/

/*
*
*/
var esoframe = esoframe || {
	namespace: {
		define: function(slug, json) {
			var tokens = slug.split('.'), i, parent = window, last = tokens.pop();
			for(i=0; i<tokens.length; i++) {
				parent[tokens[i]] = parent[tokens[i]] || {};
				parent = parent[tokens[i]];
			}
			parent[last] = json;
		},
		extend: function(slug, json) {
			var tokens = slug.split('.'), i, key, parent = window, last = tokens.pop();
			for(i=0; i<tokens.length; i++) {
				parent[tokens[i]] = parent[tokens[i]] || {};
				parent = parent[tokens[i]];
			}
			if(parent[last]) {
				for(key in json) {
					if(json.hasOwnProperty(key)) {
						parent[last][key] = json[key];
					}
				}
			} else {
				parent[last] = json;
			}
		}
	},
	class: {
		define: function(slug, obj) {
			var tokens = slug.split('.'), i, parent = window, last = tokens.pop();
			for(i=0; i<tokens.length; i++) {
				parent[tokens[i]] = parent[tokens[i]] || {};
				parent = parent[tokens[i]];
			}
			parent[last] = obj;
		},
		inherit: function(child, parent) {
			var construct = function(){};
			construct.prototype = parent.prototype;
			for(var key in child.prototype) {
				if(child.prototype.hasOwnProperty(key)) {
					construct.prototype[key] = child.prototype[key];
				}
			}
			child.prototype = new construct;
			child.prototype.constructor = child;
			child.super = parent;
			child.prototype.superConstructor = function() {
				child.super.apply(this, arguments);
			}
			for(var key in parent.prototype) {
				if(!child.prototype.hasOwnProperty(key) && parent.prototype.hasOwnProperty(key)) {
					child.prototype[key] = parent.prototype[key];
				}
			}
			for(var key in parent.prototype.constructor) {
				if(!child.prototype.constructor.hasOwnProperty(key) && parent.prototype.constructor.hasOwnProperty(key)) {
					child.prototype.constructor[key] = parent.prototype.constructor[key];
				}
			}
		} 
	},
	array: {
		each: function(array, callback) {
			for(var i=0; i<array.length; i++) {
				callback(i, array[i]);
			}
		},
		merge: function() {
			var i, j, all = [];
			for(i=0; i<arguments.length; i++) {
				for(j=0; j<arguments[i].length; j++) {
					all.push(arguments[i][j]);
				}
			}
			return all;
		},
		sort: function() {
			var i, j, sorted = [];
			for(i=0; i<arguments.length; i++) {
				for(j=0; j<arguments[i].length; j++) {
					sorted.push(arguments[i][j]);
				}
			}
			return sorted.sort();
		},
		extend: function() {
			var i, j, k, all = [], found;
			for(i=0; i<arguments.length; i++) {
				for(j=0; j<arguments[i].length; j++) {
					found = false;
					for(k=0; k<all.length; k++) {
						if(all[k] === arguments[i][j]) {
							found = true;
							break;
						}
					}
					if(!found) {
						all.push(arguments[i][j]);
					}
				}
			}
			return all;
		},
		extendsort: function() {
			var i, j, lastToken, all = [], sorted = [];
			for(i=0; i<arguments.length; i++) {
				for(j=0; j<arguments[i].length; j++) {
					sorted.push(arguments[i][j]);
				}
			}
			sorted.sort();
			for(i=0; i<sorted.length; i++) {
				if(lastToken != sorted[i]) {
					lastToken = sorted[i];
					all.push(sorted[i]);
				}
			}
			return all;
		},
		indexof: function(array, token) {
			var i;
			for(i=0; i<array.length; i++) {
				if(token === array[i]) {
					return i;
				}
			}
			return -1;
		}
	}
};