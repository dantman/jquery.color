/*
 * jQuery Colour Hue-Saturation-Value @VERSION
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

$.color.HSV = {

	fix: function ( hsv ) {
		hsv[0] = (hsv[0] + 1) % 1;
		return $.color.fix(hsv, '1111');
	},
	
	toHSV: $.color.self,

	// HSV values are normalized to the range 0..1
	toRGB: function ( hsv ) {
		var ha = hsv[0]*6,
			hb = Math.floor( ha ),
			f = ha - hb,
			s = hsv[1],
			v = hsv[2] * 255,
			p = Math.round(v * ( 1 - s )),
			q = Math.round(v * ( 1 - f * s)),
			t = Math.round(v * ( 1 - ( 1 - f ) * s ));
		v = Math.round(v);
		switch (hb % 6) {
			case 0: return [v,t,p]; case 1: return [q,v,p];
			case 2: return [p,v,t]; case 3: return [p,q,v];
			case 4: return [t,p,v]; case 5: return [v,p,q];
		}
	},
	
	complementary: function ( hsv, offset ) {
		return [(hsv[0] + 0.5 + (offset || 0)) % 1.0, hsv[1], hsv[2]];
	},
	
	analogous: function ( hsv, offset ) {
		return [(hsv[0] + 1.0 + (offset || 0)) % 1.0, hsv[1], hsv[2]];
	}
};

$.color.RGB.toHSV = function ( rgb ) {
	var r = rgb[0]/255,
		g = rgb[1]/255,
		b = rgb[2]/255,
		min = Math.min(r,g,b),
		max = Math.max(r,g,b),
		d = max - min;
	
	return [
		d === 0 ? 0 :
		(g === max ? (b-r)/d/6 + (1/3) :
		 b === max ? (r-g)/d/6 + (2/3) :
		             (g-b)/d/6 + 1) % 1,
		d === 0 ? 0 : d/max,
		max];
};

// Register the colour space methods
$.color.fns.push('HSV.toHSV', 'HSV.toRGB', 'RGB.toHSV', 'HSV.complementary', 'HSV.analogous');

})(jQuery)
);

