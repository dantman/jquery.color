PACKAGE = jquery-color

SRC_DIR = src
BUILD_DIR = build

PREFIX = .
DOCS_DIR = ${PREFIX}/docs
TEST_DIR = ${PREFIX}/test
DIST_DIR = ${PREFIX}/dist

MODULES = ${SRC_DIR}/color.core.js\
	${SRC_DIR}/color.rgb.js\
	${SRC_DIR}/color.hsv.js\
	${SRC_DIR}/color.object.js\
	${SRC_DIR}/color.parse.js\
	${SRC_DIR}/color.related.js\
	${SRC_DIR}/color.palette.css3.js

OUT = ${DIST_DIR}/${PACKAGE}.js
OUT_MIN = ${DIST_DIR}/${PACKAGE}.min.js

VERSION = `cat version.txt`
TODAY = `date +%Y%m%d`
SUB = sed "s/@VERSION/${VERSION}/g; s/@DATE/${TODAY}/g"

JAR = java -Dfile.encoding=utf-8 -jar ${BUILD_DIR}/js.jar
MINJAR = java -jar ${BUILD_DIR}/yuicompressor-2.4.2.jar

all: concat
	@@echo ${PACKAGE} "build complete."

${DIST_DIR}:
	@@mkdir -p ${DIST_DIR}

concat: ${DIST_DIR} ${OUT}

${OUT}: ${MODULES}
	@@echo "Building" ${OUT}

	@@mkdir -p ${DIST_DIR}
	@@cat ${MODULES} | \
		${SUB} > ${OUT};

clean:
	@@echo "Removing Distribution directory:" ${DIST_DIR}
	@@rm -rf ${DIST_DIR}

