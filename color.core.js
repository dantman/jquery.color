/*
 * jQuery UI Colour @VERSION
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 */
;jQuery.color || (function($) {

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
	
	// Fix the values in a colour tuple to the given range
	// and optionally apply a function first (eg. Math.round)
	fix: function ( tuple, min, max, fn ) {
		if ( typeof min === "string" ) {
			// min is actually a string format
			tuple = tuple.slice(0, min.length);
			while (i--) {
				switch(min.charAt(i)) {
					case 'i': // integer
						tuple = Math.round(tuple[i]);
						break;
					case 'w': // word; integer 0..255
						tuple = Math.min(255, Math.max(0, Math.round(tuple[i])));
						break;
					case '1': // one: float, 0..1
						tuple = Math.min(1, Math.max(0, tuple[i]));
						break;
				}
			}
		} else {
			var i = tuple.length;
			while (i--) {
				tuple[i] = Math.min(max, Math.max(min, fn ? fn(tuple[i]) : tuple[i]));
			}
		}
		return tuple;
	},
	
	// Convert a colour tuple from one representation to another
	convert: function( tuple, srcType, dstType ) {
		var space = $.color[srcType],
			method = 'to'+dstType;
		
		if (space[method]) {
			return space[method](tuple);
		}
		if (space.toRGB && $.color.RGB[method]) {
			return $.color.RGB[method](space.toRGB(tuple));
		}
		
		throw "Cannot convert color type " + fromType + " to " + toType;
	},
	
	// A collection of colour palettes
	palette: {},
	
	// Supported colour spaces
	space: []
};

})(jQuery);

