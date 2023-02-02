describe('Stations list', function () {
	beforeEach(function () {
		cy.visit('http://localhost:3000/stations');
	});

	it('List of stations opens', function () {
		cy.get('h1').contains('Stations');
	});

	it('New stations button leads to the form page', function () {
		cy.get('button').contains(' New Station').click();
		cy.get('h1').contains('New station');
	});

	it('Data shows up', function () {
		cy.get('div').contains('Testikatu 17');
	});
});
