describe('Station form', function () {
	beforeEach(function () {
		cy.visit('http://localhost:3000/stations/create');
	});

	it('Submission passes with correct data', function () {
		cy.get('input[id="input-station-number"]').type(
			`${Math.floor(Math.random() * 10000)}`,
		);
		cy.get('input[id="input-name"]').type('Testiasema IV');
		cy.get('input[id="input-city"]').type('Espoo');
		cy.get('input[id="input-address"]').type('Testikatu 47');
		cy.get('input[id="input-capasity"]').type('21');
		cy.get('input[id="input-x"]').type('61.4955653');
		cy.get('input[id="input-y"]').type('23.7454209');
		cy.get('button[type="submit"]').click();
		cy.get('div[type="success"]').contains('New station created!');
	});

	it('Submission fails with already existing station_number', function () {
		cy.get('input[id="input-station-number"]').type('200');
		cy.get('input[id="input-name"]').type('Testiasema III');
		cy.get('input[id="input-city"]').type('Espoo');
		cy.get('input[id="input-address"]').type('Testikatu 37');
		cy.get('input[id="input-capasity"]').type('21');
		cy.get('input[id="input-x"]').type('61.4955653');
		cy.get('input[id="input-y"]').type('23.7454209');
		cy.get('button[type="submit"]').click();
		cy.get('div[type="error"]').contains('station_number must be unique');
	});

	it('Submission is not possible with deficient input', function () {
		cy.get('input[id="input-station-number"]').type('100');
		cy.get('input[id="input-city"]').type('Espoo');
		cy.get('input[id="input-address"]').type('Testikatu 37');
		cy.get('input[id="input-capasity"]').type('21');
		cy.get('input[id="input-x"]').type('61.4955653');
		cy.get('input[id="input-y"]').type('23.7454209');
		cy.get('button[type="submit"]').click();
		cy.get('p[id="input-name-helper-text"]').contains('* Required');
	});
});
