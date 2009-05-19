PACKAGE = jquery-color

MODULES = \
	color.core.js\
	color.rgb.js\
	color.hsv.js\
	color.object.js\
	color.parse.js\
	color.related.js\
	color.palette.css3.js

OPTIONAL_MODULES = \
	color.palette.websafe.js \
	color.palette.html4.js

include build/rules.mk

