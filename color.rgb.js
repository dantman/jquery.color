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
(function($) {

$.color.space.push('RGB');

$.color.RGB = {

	fix: function ( rgb ) {
		return $.color.fix(rgb, 0, 255, Math.round);
	},

	// RGB values must be integers in the range 0-255
	toHEX: function ( rgb ) {
		return '#' + (0x1000000 + rgb[0]*0x10000 + rgb[1]*0x100 + rgb[2]).toString(16).slice(-6);
	},

	toCSS: function ( rgb ) {
		return 'rgb(' + rgb.join(',') + ')';
	}

};

$.color.RGB.toString = $.color.RGB.toHEX;

})(jQuery);

