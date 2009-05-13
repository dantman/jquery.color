/*
 * jQuery Colour Related Palette Generator @VERSION
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * Depends:
 *  color.object.js
 */
(jQuery.Color && (function($) {

// Generate a palette of related colours
$.Color.fn.related = function( offset ) {
	var i18n = $.Color.fn.related.i18n,
		off = offset || $.Color.fn.related.offset,
		offD = Math.round(off * 360) + i18n.deg;
	
	return {
		'anal-': this.analogous(-off).setName(i18n.anal + ' -' + offD),
		'anal0': this.analogous().setName(i18n.orig),
		'anal+': this.analogous(off).setName(i18n.anal + ' +' + offD),
		
		'comp-': this.complementary(-off).setName(i18n.split + ' -' + offD),
		'comp0': this.complementary().setName(i18n.comp),
		'comp+': this.complementary(off).setName(i18n.split + ' +' + offD),
		
		'triad-': this.analogous(-1/3).setName(i18n.triad + ' -120' + i18n.deg),
		'triad0': this.analogous().setName(i18n.orig),
		'triad+': this.analogous(1/3).setName(i18n.triad + ' +120' + i18n.deg)
	};
};

$.Color.fn.related.offset = 30/360;

$.Color.fn.related.i18n = {
	'deg': '°',
	'anal': 'Analogous',
	'orig': 'Original',
	'split': 'Split Complementary',
	'comp': 'Complementary',
	'triad': 'Triadic'
};

})(jQuery)
);

