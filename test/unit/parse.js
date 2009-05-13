module("parse");

test("module", function() {
	ok( $.color.parse, "Check for existence of parse() function" );
	ok( $.color.named, "Check for existence of named() function" );
});

test("hex notation", function() {
	same( $.color.parse('#18F'), [17,136,255,1], "Short hex" );
	same( $.color.parse('#1188FF'), [17,136,255,1], "Long hex" );
	same( $.color.parse('#22FFAA'), $.color.parse('#2FA'), "Short == Long" );
	same( $.color.parse('#FfFfFf'), $.color.parse('#ffFFfF'), "Case insensitive" );
	same( $.color.parse('  #123'), $.color.parse('#123 '), "Whitespace ignored" );
	equals( $.color.parse('#01'), undefined, "Invalid hex" );
	equals( $.color.parse('#abcd'), undefined, "Invalid hex" );
});

test("rgb/rgba notation", function() {
	same( $.color.parse('rgb(30,40,120)'), [30,40,120,1], "rgb() with integers" );
	same( $.color.parse(' rgb( 30 ,  40 , 120 ) '), $.color.parse('rgb(30,40,120)'), "whitespace ignored, integers" );
	same( $.color.parse('rgb(100%,0%,15%)'), [255,0,38.25,1], "rgb() with percentages" );
	same( $.color.parse('rgb(100.00%,0.0%,33.3%)'), [255,0,84.915,1], "rgb() with float percentages" );
	same( $.color.parse(' rgb( 0% , 100% , 100% ) '), $.color.parse('rgb(0%,100%,100%)'), "whitespace ignored, percent" );
	equals( $.color.parse('rgb(100%,0,120)'), undefined, "rgb() with mixed values (invalid)" );
	equals( $.color.parse('rgb(100%,100%,100%,0.5)'), undefined, "rgb() with alpha (invalid)" );
	same( $.color.parse('rgba(0,50,255,0.5)'), [0,50,255,0.5], "rgba() with integers" );
	same( $.color.parse('rgba(100%,0%,100%,0.8)'), [255,0,255,0.8], "rgba() with percentages" );
	equals( $.color.parse('rgba(100%,100%,100%)'), undefined, "rgba() without alpha (invalid)" );
	same( $.color.parse('rgb(100%,0%,15%)'), [255,0,38.25,1], "rgb() with percentages" );
});

test("named colours", function() {
	same( $.color.parse('transparent'), [0,0,0,0], "transparent" );
	same( $.color.parse('red'), [255,0,0], "red (3 letter name)" );
	same( $.color.parse('blue'), [0,0,255], "blue (4 letter name)" );
	same( $.color.parse('yellow'), [255,255,0], "yellow" );
	equals( $.color.parse('invalid-non-existent-name'), undefined, "Non-existent name" );
	same( $.color.parse('PurPle'), $.color.parse('purple'), "Case insensitive" );
});

