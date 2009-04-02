/*
 * jQuery UI Colour Parsing @VERSION
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * Depends:
 *  color.core.js
 */
(function($) {

$.extend($.color, {

	// Color string parsing taken from effects.core.js
	parse: function ( color ) {
		var result;
		
		// TODO: Add support for the hsl() syntax of CSS3 - if need arises

		if ( typeof color === 'string' ) {

			// Look for rgb(num,num,num)
			if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color)) {
				return [parseInt(result[1],10), parseInt(result[2],10), parseInt(result[3],10), 1];
			}

			// Look for rgb(num%,num%,num%)
			if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color)) {
				return [parseFloat(result[1])*2.55, parseFloat(result[2])*2.55, parseFloat(result[3])*2.55, 1];
			}

			// Look for rgba(num,num,num, num)
			if (result = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(color)) {
				return [parseInt(result[1],10), parseInt(result[2],10), parseInt(result[3],10), parseFloat(result[4], 10), 1];
			}

			// Look for #a0b1c2
			if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color)) {
				return [parseInt(result[1],16), parseInt(result[2],16), parseInt(result[3],16), 1];
			}

			// Look for #fff
			if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color)) {
				return [parseInt(result[1]+result[1],16), parseInt(result[2]+result[2],16), parseInt(result[3]+result[3],16), 1];
			}

			// Look for transparent
			if ( color == "transparent" ) {
				return [0, 0, 0, 0];
			}

			// Otherwise, we're most likely dealing with a named color
			return $.color.named(color);
		}
		
		// Check if we're already dealing with an array of colors
		if ( color && ( color.length === 3 || color.length === 4 ) ) {
			if ( color.length === 3 ) color.push( 1 );
			return color;
		}
	},
	
	named: function ( color ) {
		var result;
		color = $.trim(color.toLowerCase());
		$.each($.color.palette, function(n, palette) {
			if (palette[color]) {
				result = palette[color];
				return false;
			}
		});
		return result;
	}

});

})(jQuery);

