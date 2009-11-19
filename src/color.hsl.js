/*
 * jQuery Colour Hue-Saturation-Lightness @VERSION
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * Depends:
 *	color.core.js
 *  color.rgb.js
 */
(jQuery.color && (function($) {

$.color.HSL = {

	fix: function ( hsl ) {
		hsl[0] = (hsl[0] + 1) % 1;
		return $.color.fix(hsl, '1111');
	},

	toHSL: $.color.self,
	
	toRGB: function ( hsl ) {
		// TODO
	}
};

$.color.RGB.toHSL =
	toHSL: function ( rgb ) {
		// TODO
	}
});

$.color.fns.push('HSL.toHSL', 'HSL.toRGB', 'RGB.toHSL');

})(jQuery)
);

