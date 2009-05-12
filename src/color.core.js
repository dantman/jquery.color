/*!
 * jQuery Colour @VERSION
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
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
	
	// Supported colour spaces, in order or preferrence
	space: []
};

})(jQuery)
);

