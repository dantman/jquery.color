MODULES = color.core.js\
	color.rgb.js\
	color.hsv.js\
	color.object.js\
	color.parse.js\
	color.related.js\
	color.palette.css3.js

COLOR_VER = `cat version.txt`
TODAY = `date +%Y%m%d`
SUB = sed "s/@VERSION/${COLOR_VER}/g; s/@DATE/${TODAY}/g"

all: color.all.js
	@@echo "Color library build complete."

color.all.js: ${MODULES}
	@@cat ${MODULES} | \
		${SUB} > color.all.js

clean:
	rm -rf color.all.js

