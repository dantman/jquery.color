/*
 * jQuery Colour Parsing @VERSION
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * Depends:
 *  color.core.js
 */
(jQuery.color && (function($) {

$.extend($.color, {

	// Color string parsing taken from effects.core.js
	parse: function ( color ) {
		var m;

		// TODO: Add support for the hsl() syntax of CSS3 - if need arises

		if ( typeof color === 'string' ) {

			// Look for rgb(int,int,int) or rgba(int,int,int,float)
			if ( (m = /^\s*rgb(a)?\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*(?:,\s*([0-9]+(?:\.[0-9]+)?)\s*)?\)\s*$/.exec(color)) && !m[1] === !m[5] ) {
				return [parseInt(m[2],10), parseInt(m[3],10), parseInt(m[4],10), m[5] ? parseFloat(m[5]) : 1];
			}

			// Look for rgb(float%,float%,float%) or rgba(float%,float%,float%,float)
			if ( (m = /^\s*rgb(a)?\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*(?:,\s*([0-9]+(?:\.[0-9]+)?)\s*)?\)\s*$/.exec(color)) && !m[1] === !m[5] ) {
				return [parseFloat(m[2])*255/100, parseFloat(m[3])*255/100, parseFloat(m[4])*255/100, m[5] ? parseFloat(m[5]) : 1];
			}

			// Look for #a0b1c2
			if ( (m = /^\s*#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})\s*$/.exec(color)) ) {
				return [parseInt(m[1],16), parseInt(m[2],16), parseInt(m[3],16), 1];
			}

			// Look for #fff
			if ( (m = /^\s*#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])\s*$/.exec(color)) ) {
				return [parseInt(m[1]+m[1],16), parseInt(m[2]+m[2],16), parseInt(m[3]+m[3],16), 1];
			}

			// Otherwise, we're most likely dealing with a named color
			return $.color.named(color);
		}

		// Check if we're already dealing with a color tuple
		if ( color && ( color.length === 3 || color.length === 4 ) ) {
			if ( color.length === 3 ) {
				color.push( 1 );
			}
			return color;
		}
	},

	named: function ( color ) {
		var result;
		color = $.trim(color.toLowerCase());

		// Check for transparent
		if ( color === "transparent" ) {
			return [0, 0, 0, 0];
		}

		$.each($.color.palette, function(n, palette) {
			if (palette[color]) {
				result = palette[color];
				return false;
			}
		});
		return result;
	}

});

})(jQuery)
);

