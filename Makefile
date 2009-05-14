PACKAGE = jquery-color

SRC_DIR = src
BUILD_DIR = build
DIST_DIR = dist

MODULES = ${SRC_DIR}/color.core.js\
	${SRC_DIR}/color.rgb.js\
	${SRC_DIR}/color.hsv.js\
	${SRC_DIR}/color.object.js\
	${SRC_DIR}/color.parse.js\
	${SRC_DIR}/color.related.js\
	${SRC_DIR}/color.palette.css3.js

include ${BUILD_DIR}/rules.mk

