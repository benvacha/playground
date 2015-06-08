/*
* EsoFrame : github.com/esocode/esoframe
* v0.0.1 : Feb 2014
* EsoCode : esocode.com
*/

/*
*
*/
(function() {
	
	/* private class variable */
	var privCV = 'private class variable';
	
	/* private class method */
	var privCM = function() {
		return privCV;
	}
	
	/* constructor */
	var cls = function(arg1, arg2) {
		/* private instance variable */
		var privIV = 'private instance variable';
		/* public instance variable : private instance variable access */
		this.pubIV1 = 'public instance variable';
		/* private instance method */
		var privIM = function() {
			return arg1 + arg2;
		}
		/* public instance method : private instance variable access */
		this.pubIM1 = function() {
			return arg1 + arg2;
		}
	}
	
	/* public static variable */
	cls.pubSV = 'public static variable';
	
	/* public static method */
	cls.pubSM = function() {
		return privCV;
	}
	
	/* public instance variable : no private instance variable access */
	cls.prototype.pubIV2 = 'public instance variable';
	
	/* public intance method : no private instance variable access */
	cls.prototype.pubIM2 = function() {
		return this.pubIV1;
	}
	
	/* define the class at the namespace */
	esoframe.class.define('path.classParent', cls);
	
})();

/*
*
*/
(function() {
	
	/* private class variable */
	var privCV = 'private class variable';
	
	/* private class method */
	var privCM = function() {
		return privCV;
	}
	
	/* constructor */
	var cls = function(arg1, arg2) {
		/* private instance variable */
		var privIV = 'private instance variable';
		/* public instance variable : private instance variable access */
		this.pubIV1 = 'public instance variable';
		/* private instance method */
		var privIM = function() {
			return arg1 + arg2;
		}
		/* public instance method : private instance variable access */
		this.pubIM1 = function() {
			return arg1 + arg2;
		}
	}
	
	/* public static variable */
	cls.pubSV = 'public static variable';
	
	/* public static method */
	cls.pubSM = function() {
		return privCV;
	}
	
	/* public instance variable : no private instance variable access */
	cls.prototype.pubIV2 = 'public instance variable';
	
	/* public intance method : no private instance variable access */
	cls.prototype.pubIM2 = function() {
		return this.pubIV1;
	}
	
	/* inherit from path.classParent */
	esoframe.class.define(cls, path.classParent);
	/* define the class at the namespace */
	esoframe.class.define('path.classChild', cls);
	
})();
