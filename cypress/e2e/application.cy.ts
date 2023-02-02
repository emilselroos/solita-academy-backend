describe('Solita Academy Application', function () {
	beforeEach(function () {
		cy.visit('http://localhost:3000');
	});

	it('Application opens and dashboard page shows', function () {
		cy.get('h1').contains('Dashboard');
	});

	it('Sidebar has all navigation elements', function () {
		cy.get('ul').find('a').should('have.length', 3);
	});

	it('Sidebar navigation elements are clickable', function () {
		cy.get('ul').find('a').click({ multiple: true });
		cy.contains('Journeys');
	});
});
