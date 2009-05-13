module("object");

test("module", function() {
	ok( $.Color, "Check jQuery.Color exists" );
});

test("constructor", function() {
	ok( $.Color.isInstance(new $.Color([0,0,0])), "Construct with 'new'" );
	ok( $.Color.isInstance($.Color([0,0,0])), "Construct without 'new'" );
});

test("to", function() {
	var blue = $.Color('blue');
	
	equals( blue.toHSV(), blue.to('HSV'), "Converted colour cache" );
	equals( blue.toHSV().type, "HSV", "Colour space" );
	equals( blue.toHSV()[0], 2/3, "Hue" );
	equals( blue.toHSV()[1], 1, "Saturation" );
	equals( blue.toHSV()[2], 1, "Value" );
	
	same( blue.toHEX(), '#0000ff', "Convert to HEX" );
	equals( blue, blue.toHSV().toRGB(), "Round trip RGB->HSV->RGB" );
});

test("methods", function() {
	var blue = $.Color('blue');

	same( blue.to('HEX'), blue.complementary().complementary().to('HEX'), "Complementary" );

});
