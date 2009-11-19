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

$.color.RGB.toHSL =function ( rgb ) {
	var r = rgb[0]/255,
		g = rgb[1]/255,
		b = rgb[2]/255,
		min = Math.min(r,g,b),
		max = Math.max(r,g,b),
		d = max - min,
		t = max + min,
		l = t/2;
 
	return [
		d === 0 ? 0 :
		(g === max ? (b-r)/d/6 + (1/3) :
		 b === max ? (r-g)/d/6 + (2/3) :
		             (g-b)/d/6 + 1) % 1,
		d === 0 ? 0 : 
                l <= .5 ? d/t :
                d/(2-t),
		l];
	}
});

$.color.fns.push('HSL.toHSL', 'HSL.toRGB', 'RGB.toHSL');

})(jQuery)
);

