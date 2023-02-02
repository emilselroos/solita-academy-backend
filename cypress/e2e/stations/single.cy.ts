describe('Single station', function () {
	beforeEach(function () {
		cy.visit('http://localhost:3000/stations/100');
	});

	it('Has correct title', function () {
		cy.get('h1').contains('100 - Testiasema I');
	});

	it('Has correct address', function () {
		cy.get('small').contains('Testikatu 17');
	});

	it('Has correct capasity', function () {
		cy.get('div[id="station-capasity"]').contains('21');
	});

	it('Has correct departuring journeys count', function () {
		cy.get('div[id="departuring-count"]').contains('5');
	});

	it('Has correct incoming journeys count', function () {
		cy.get('div[id="incoming-count"]').contains('3');
	});

	it('Has correct average distances', function () {
		cy.get('div[id="departuring-average-distance"]').contains('2442');
		cy.get('div[id="incoming-average-distance"]').contains('2442');
	});
});
