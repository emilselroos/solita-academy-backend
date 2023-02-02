describe('Stations list', function () {
	beforeEach(function () {
		cy.visit('http://localhost:3000/journeys');
	});

	it('List of journeys opens', function () {
		cy.get('h1').contains('Journeys');
	});

	it('New journeys button leads to the form page', function () {
		cy.get('button').contains(' New Journey').click();
		cy.get('h1').contains('New journey');
	});

	it('Data shows up', function () {
		cy.get('div').contains('Testiasema I');
	});
});
