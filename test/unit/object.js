module("object");

test("constructor", function() {
	expect(2);
	ok( $.Color.isInstance(new $.Color([0,0,0])), "Construct with 'new'" );
	ok( $.Color.isInstance($.Color([0,0,0])), "Construct without 'new'" );
});

