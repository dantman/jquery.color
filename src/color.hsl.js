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
		var h = hsl[0],
			s = hsl[1],
			l = hsl[2],
			q = l < .5 ? l*(1+s) : l + s - (l *s),
			p = 2*l-q,
			tr = (h + 1/3) % 1,
			tg = (h) % 1,
			tb = (h - 1/3) % 1,
			k = (q - p) * 6,
			j = function(a){
				return  a < 1/6 ? p + (k * a) :
					a < 1/2 ? q :
					a < 2/3 ? p + (k * (2/3 - a)) :
					p;
			};
			return [j(tr),j(tg),j(tb)];
	}
};

var j = ["hue","saturation","lightness","alpha"],
	i = j.length;
while (i--){
	$.color.HSL[j[i]] = (function(){
		var c = i;
		return function(hsl){
			return !!hsl[c] ? hsl[c] : 0;
    	};
	})();
	$.color.fns.push('HSL.'+j[i]);
}

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
};

$.color.fns.push('HSL.toHSL', 'HSL.toRGB', 'RGB.toHSL');

})(jQuery)
);

