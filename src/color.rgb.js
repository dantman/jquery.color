/*
 * jQuery UI Colour Red-Green-Blue @VERSION
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * Depends:
 *	color.core.js
 */
(jQuery.color && (function($) {

$.color.RGB = {

	fix: function ( rgb ) {
		if( rgb.length === 3 ) { rgb.push( 1 ); }
		rgb = $.color.fix(rgb, 'ooo1');
		return rgb;
	},
	
	toRGB: $.color.self,

	// RGB values must be integers in the range 0-255
	toHEX: function ( rgb ) {
		return '#' + (0x1000000 + rgb[0]*0x10000 + rgb[1]*0x100 + rgb[2]).toString(16).slice(-6);
	},

	toCSS: function ( rgb ) {
		if( rgb.length === 4 && rgb[3] === 0 ) {
			// Completely transparent, use the universally supported name
			return 'transparent';
		}
		if( rgb.length === 4 && rgb[3] < 1 ) {
			// Color is not opaque - according to the CSS3 working draft we should
			// not simply treat an RGBA value as an RGB value with opacity ignored.
			return 'rgba(' + rgb.join(',') + ')';
		}
		return 'rgb(' + Array.prototype.slice.call(rgb,0,3).join(',') + ')';
	}
};

$.color.RGB.toString = $.color.RGB.toHEX;

// Register the colour space methods
$.color.fns.push('RGB.toRGB', 'RGB.toHEX', 'RGB.toCSS');

})(jQuery)
);

