/*
 * jQuery Colour Web-Safe Palette @VERSION
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * Depends:
 *  color.core.js
 */
(jQuery.color && (function($) {

var x,y,z,p=[];

for (x=0;x<256;x+=51) {
	for (y=0;y<256;y+=51) {
		for (z=0;z<256;z+=51) {
			p.push([x,y,z]);
		}
	}
}

$.color.palette.websafe = p;

})(jQuery)
);

