/*
 * jQuery UI Colour Object @VERSION
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * Depends:
 *  color.object.js
 */
(function($) {

// Generate a palette of related colours
$.Color.fn.related = function( offset ) {
	var i18n = $.Color.fn.related.i18n,
		off = offset || $.Color.fn.related.offset,
		offD = Math.round(off * 360) + i18n.deg,
		comp = this.method('complementary'),
		anal = this.method('analogous');
	
	return {
		'anal-': anal(-off).setName(i18n.anal + ' -' + offD),
		'anal0': anal().setName(i18n.orig),
		'anal+': anal(off).setName(i18n.anal + ' +' + offD),
		
		'comp-': comp(-off).setName(i18n.split + ' -' + offD),
		'comp0': comp().setName(i18n.comp),
		'comp+': comp(off).setName(i18n.split + ' +' + offD),
		
		'triad-': anal(-1/3).setName(i18n.triad + ' -120' + i18n.deg),
		'triad0': anal().setName(i18n.orig),
		'triad+': anal(1/3).setName(i18n.triad + ' +120' + i18n.deg)
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

})(jQuery);

