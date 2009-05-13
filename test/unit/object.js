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
	equals( blue.toHSV().space, "HSV", "Colour space" );
	equals( blue.toHSV()[0], 2/3, "Hue" );
	equals( blue.toHSV()[1], 1, "Saturation" );
	equals( blue.toHSV()[2], 1, "Value" );
	same( blue.toHSV().name, blue.name, "Name remains intact" );
	same( blue.toHEX(), '#0000ff', "Convert to HEX" );
	same( blue.toCSS(), 'rgb(0,0,255)', "Convert to CSS" );
	equals( blue, blue.toHSV().toRGB(), "Round trip RGB->HSV->RGB" );
});

test("methods", function() {
	var blue = $.Color('blue');

	same( blue.complementary(2/3).toHEX(), '#ff00ff', "Complementary +2/3" );
	same( blue.complementary().complementary().toHEX(), blue.toHEX(), "Complementary roundtrip" );
	same( blue.analogous(2/3).toHEX(), '#00ff00', "Analogous +2/3" );
	same( blue.analogous(2/3).analogous(-1/3).toHEX(), blue.analogous(1/3).toHEX(), "Analogous chain" );
});
