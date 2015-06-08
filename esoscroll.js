/*	esoScroll : github.com/esocode/esoscroll
**	v1.0.0 : Jan 2014
**	esoCode : esocode.com
*/

(function( $ ){

	var methods = {
		/*	
		*/
		init : function( options ) { return this.each(function(){
			var $this = $(this);
			$this.data('esoScroll', $.extend( {
				//
				onAtTop: null,
				onAtBottom: null,
				//
				onStart: null,
				onMove: null,
				onStop: null,
				onStopDelay: 100,
				//
				onUnder: null,
				underOffset: 0,
				underOffsetter: null,
				//
				onOver: null,
				overOffset: 0,
				overOffsetter: null,
				//
				startOffset: null,
				startOffsetter: null
			}, options, $this.data('esoScroll')));
			var data = $this.data('esoScroll');
			// 
			if(this == document || this == window) {
				data.scrollingPage = true;
				data.scrollingElement = false;
				data.document = $(document);
				data.window = $(window);
			}
			// 
			data.underScroll = 0;
			data.overScroll = 0;
			//
			if(data.startOffset && data.startOffsetter) {
				$this.scrollTop(data.startOffset + data.startOffsetter.height());
			} else if(data.startOffset) {
				$this.scrollTop(data.startOffset);
			} else if(data.startOffsetter) {
				$this.scrollTop(data.startOffsetter.height());
			}
			//
			data.touches = 0;
			$this.on('touchstart', methods._onTouchStart);
			$this.on('touchend', methods._onTouchEnd);
			//
			$this.on('scroll touchmove', methods._onScroll);
			//
			methods._refreshScrollData.apply(this); 
		}); },
		/*	
		*/
		_refreshScrollData : function() {
			var $this = $(this), data = $this.data('esoScroll');
			//
			var scrollTop = $this.scrollTop();
			var contentHeight, viewHeight;
			if(data.scrollingPage) {
				contentHeight = data.document.height();
				viewHeight = data.window.height();
			} else {
				contentHeight = this.scrollHeight;
				viewHeight = $this.height();
			}
			//
			data.prevUnderScroll = data.underScroll;
			data.prevOverScroll = data.overScroll;
			//
			data.underScroll = 0 + data.underOffset - scrollTop;
			if(data.underOffsetter) {
				data.underScroll += data.underOffsetter.height();
			}
			//
			data.overScroll = scrollTop + viewHeight + data.overOffset - contentHeight;
			if(data.overOffsetter) {
				data.overScroll += data.overOffsetter.height();
			}
		},
		/*	
		*/
		_checkStart : function() {
			var $this = $(this), data = $this.data('esoScroll');
			//
			if(data.onStart || data.onStop) {
				//
				if(data.onStart && !data.scrollTimeout) {
					data.onStart.apply(this, [-data.underScroll, -data.overScroll]);
				}
				//
				clearTimeout(data.scrollTimeout);
				//
				data.scrollTimeout = setTimeout(methods._checkStop, data.onStopDelay, $this);
			}
		},
		/*	
		*/
		_checkMove : function() {
			var $this = $(this), data = $this.data('esoScroll');
			//
			if(data.onMove) {
				data.onMove.apply(this, [-data.underScroll, -data.overScroll]);
			}
		},
		/*	
		*/
		_checkStop : function($this) {
			var data = $this.data('esoScroll');
			//
			clearTimeout(data.scrollTimeout);
			//
			if(data.touches == 0) {
				//
				data.scrollTimeout = null;
				//
				if(data.onStop) {
					data.onStop.apply(this, [-data.underScroll, -data.overScroll]);
				}
			} else {
				//
				data.scrollTimeout = setTimeout(methods._checkStop, data.onStopDelay, $this);
			}
		},
		/*	
		*/
		_checkAtTop : function() {
			var $this = $(this), data = $this.data('esoScroll');
			//
			if(data.onAtTop && data.underScroll>=0 && data.prevUnderScroll < 0) {
				data.onAtTop.apply(this, [-data.underScroll, -data.overScroll]);
			}
		},
		/*
		*/
		_checkAtBottom : function() {
			var $this = $(this), data = $this.data('esoScroll');
			//
			if(data.onAtBottom && data.overScroll>=0 && data.prevOverScroll < 0) {
				data.onAtBottom.apply(this, [-data.underScroll, -data.overScroll]);
			}
		},
		/*
		*/
		_checkUnder : function() {
			var $this = $(this), data = $this.data('esoScroll');
			//
			if(data.onUnder && data.underScroll > 0) {
				data.onUnder.apply(this, [-data.underScroll, -data.overScroll]);
			}
		},
		/*
		*/
		_checkOver : function() {
			var $this = $(this), data = $this.data('esoScroll');
			//
			if(data.onOver && data.overScroll > 0) {
				data.onOver.apply(this, [-data.underScroll, -data.overScroll]);
			}
		},
		/*
		*/
		_onTouchStart : function(event) {
			var $this = $(this), data = $this.data('esoScroll');
			//
			data.touches += 1;
		},
		/*
		*/
		_onTouchEnd : function(event) {
			var $this = $(this), data = $this.data('esoScroll');
			//
			data.touches -= 1;
		},
		/*
		*/
		_onScroll : function(event) {
			var $this = $(this), data = $this.data('esoScroll');
			//
			methods._refreshScrollData.apply(this);
			//
			methods._checkStart.apply(this);
			//
			methods._checkMove.apply(this);
			//
			methods._checkAtTop.apply(this);
			//
			methods._checkAtBottom.apply(this);
			//
			methods._checkUnder.apply(this);
			//
			methods._checkOver.apply(this);
		}
	};

	$.fn.esoScroll = function( method ) {
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.esoScroll' );
		}    
	};
	
})( jQuery );