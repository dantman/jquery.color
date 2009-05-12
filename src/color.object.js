/*
 * jQuery UI Colour Object @VERSION
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * Depends:
 *  color.core.js
 *  color.rgb.js
 */
(jQuery.color && jQuery.Color || (function($) {

// Construct a colour object of a given type (eg. 'RGB', 'HSV')
$.Color = function ( color, type, name ) {
	if ( typeof this === 'function' ) {
		return new $.Color(color, type, name);
	}
	
	if ( typeof color === 'string' && $.color.parse ) {
		if (!name) {
			name = color;
		}
		// Attempt to parse the string if the parser is available
		color = $.color.parse(color);
	}
	
	if ( color && color.length ) {
		// Copy channel values
		var i;
		i = this.length = color.length;
		while( i-- ) {
			this[i] = color[i];
		}
	}
	
	if ( color ) {
		this.type = type || color.type || 'RGB';
		this.name = name || color.name;
	}
};

$.Color.fn = $.Color.prototype = {

	color: "@VERSION",
	
	// Get the utility functions for the colour space
	util: function() {
		return $.color[this.type];
	},
	
	// Get a utility method, converting to the most appropriate space if necessary
	method: function( method ) {
		var color = this,
			type = this.type,
			fn = $.color[type][method],
			ret = function() {
					var args = [color];
					Array.prototype.push.apply(args, arguments);
					return new $.Color(fn.apply(color, args), type);
				};
		
		if ($.isFunction(fn)) {
			// Method is supported by the current colour space
			return ret;
		} else {
			// Find another colour space that supports the method
			for (var i=0, l=$.color.space.length; i < l; i++) {
				type = $.color.space[i];
				fn = $.color[type][method];
				if ($.isFunction(fn)) {
					// Convert to the appropriate colour space and call the method
					color = this.to(type);
					return ret;
				}
			}
		}
		// Return a do-nothing function if the method is not found
		return function() {};
	},

	// Convert the colour to different colour space
	to: function( type ) {
		if (type === this.type) { return this; }
		
		if (!this[type]) {
			var result = $.color.convert(this, this.type, type);
			if (typeof result !== 'string') {
				result = new $.Color(result, type, this.name);
				result[this.type] = this;
			}
			// Cache the new representation
			this[type] = result;
		}
		return this[type];
	},

	// Ensure colour channels values are within the valid limits
	fix: function() {
		return this.util().fix(this);
	},
	
	// Modify the individual colour channels, returning a new color object
	modify: function( tuple ) {
		// Ensure the color to be modified is the same type as the argument
		var color = $.Color.isInstance(tuple) && tuple.type !== this.type ?
					this.to(tuple.type) :
					new $.Color(this),
			i = color.length,
			mod = false;
		
		while( i-- ) {
			if ( typeof tuple[i] === 'number' && tuple[i] !== color[i] ) {
				color[i] = tuple[i];
				mod = true;
			}
		}
		
		return mod ? color.setName() : this;
	},
	
	setName: function( newName ) {
		this.name = newName;
		return this;
	},

	toString: function() {
		if ( !this.type ) { return ''; }
		var util = this.util();
		return util.hasOwnProperty('toString') ? util.toString(this) : this.to('RGB').toString();
	},
	
	join: [].join,
	push: [].push
};

// Check whether the given argument is a valid color object
$.Color.isInstance = function( color ) {
	return color && typeof color === 'object' && color.color && color.type;
};

})(jQuery)
);

