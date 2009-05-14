/*!
 * jQuery Colour @VERSION
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * Author: Mark Gibson (jollytoad at gmail dot com)
 *
 * http://www.adaptavist.com/display/free/jquery.color
 */
(jQuery.color || (function($) {

$.color = {

	// Compare two colour tuples (must be of the same colour space)
	isEqual: function ( tupleA, tupleB ) {
		if (tupleA.length !== tupleB.length) { return false; }
		var i = tupleA.length;
		while (i--) {
			if (tupleA[i] !== tupleB[i]) { return false; }
		}
		return true;
	},
	
	// Fix the values in a colour tuple
	fix: function ( tuple, format ) {
		var i = format.length;
		while (i--) {
			switch(format.charAt(i)) {
				case 'i': // integer
					tuple[i] = Math.round(tuple[i]);
					break;
				case 'o': // octet; integer 0..255
					tuple[i] = Math.min(255, Math.max(0, Math.round(tuple[i])));
					break;
				case '1': // one: float, 0..1
					tuple[i] = Math.min(1, Math.max(0, tuple[i]));
					break;
			}
		}
		return tuple;
	},
	
	self: function( tuple ) {
		return tuple;
	},
	
	// A collection of colour palettes
	palette: {},
	
	// Registered colour functions
	fns: []
};

})(jQuery)
);

