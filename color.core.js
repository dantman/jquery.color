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
		var i = tuple.length;
		while (i--) {
			tuple[i] = Math.min(max, Math.max(min, fn ? fn(tuple[i]) : tuple[i]));
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

