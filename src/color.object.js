/*
 * jQuery Colour Object @VERSION
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

// Construct a colour object of a given space (eg. 'RGB', 'HSV')
$.Color = function ( color, space, name ) {
	if ( typeof this === 'function' ) {
		return new $.Color(color, space, name);
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
		this.space = space || color.space || 'RGB';
		this.name = name || color.name;
	}
};

$.Color.fn = $.Color.prototype = {

	color: "@VERSION",
	
	// Get the utility functions for the colour space
	util: function() {
		return $.color[this.space];
	},
	
	// Convert the colour to a different colour space
	to: function( space ) {
		return this['to'+space]();
	},

	// Ensure colour channels values are within the valid limits
	fix: function() {
		return this.util().fix(this);
	},
	
	// Modify the individual colour channels, returning a new color object
	modify: function( tuple ) {
		// Ensure the color to be modified is the same space as the argument
		var color = $.Color.isInstance(tuple) && tuple.space !== this.space ?
					this.to(tuple.space) :
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
		if ( !this.space ) { return ''; }
		var util = this.util();
		return util.hasOwnProperty('toString') ? util.toString(this) : this.to('RGB').toString();
	},
	
	join: [].join,
	push: [].push
};

// Check whether the given argument is a valid color object
$.Color.isInstance = function( color ) {
	return color && typeof color === 'object' && color.color === $.Color.fn.color && color.space;
};

// Hold the default colour space for each method
$.Color.fnspace = {};

// Generate the wrapper for colour methods calls
function wrapper( color, subject, fn, space, copyName ) {
	return function() {
		var args = [color];
		Array.prototype.push.apply(args, arguments);
		var result = fn.apply(subject, args);
		return $.isArray(result) ? new $.Color(result, space, copyName ? color.name : undefined) : result;
	};
}

// Generate the prototype for method calls
function method( color, name ) {
	var toSpace = /^to/.test(name) ? name.substring(2) : false;
	
	return function() {
		var color = this,
			util = color.util();
		
		if ( !util[name] ) {
			// Convert to the appropriate colour space
			color = color.to($.Color.fnspace[name]);
			util = color.util();
		}
		
		var fn = wrapper(color, util, util[name], toSpace || color.space, !!toSpace),
			result = fn.apply(color, arguments);
		
		// Override the function for this instance so it can be reused
		// without the overhead of another lookup or conversion.
		if ( toSpace ) {
			// The function will return the same result every time, so cache the result
			this[name] = function() {
				return result;
			};
			if ( $.Color.isInstance(result) ) {
				color = this;
				result['to'+this.space] = function() {
					return color;
				};
			}
		} else {
			this[name] = fn;
		}
		
		return result;
	};
}

// Add colour function to the prototype
function addfn() {
	var s = this.split('.'),
		name = s[1],
		space = s[0];
	
	if ( !$.Color.fnspace[name] ) {
		$.Color.fnspace[name] = space;
	}
	
	if ( !$.Color.fn[name] ) {
		$.Color.fn[name] = method(this, name);
	}
}

// Add existing functions
$.each($.color.fns, addfn);

// Override push to catch new functions
$.color.fns.push = function() {
	$.each(arguments, addfn);
	return Array.prototype.push.apply(this, arguments);
};

})(jQuery)
);

