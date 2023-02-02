describe('Single station', function () {
	beforeEach(function () {
		cy.visit('http://localhost:3000/journeys/3');
	});

	it('Has correct title', function () {
		cy.get('h1').contains('Journey #3');
	});

	it('Has correct station from', function () {
		cy.get('strong[id="station-from"]').contains('Testiasema I');
	});

	it('Has correct station to', function () {
		cy.get('strong[id="station-to"]').contains('Testiasema II');
	});
});
