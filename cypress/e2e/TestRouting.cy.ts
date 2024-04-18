describe('check routing', () => {
    it('should be able to press the navbar without test links', () => {
        cy.visit('http://localhost:5173');
        cy.get('#weeklyTips').click({ force: true});
    });
});


describe('check routing', () => {
    it('should be able to press the navbar without test links', () => {
        cy.visit('http://localhost:5173');
        cy.get('#cocktails').click({ force: true});
    });
});

describe('check routing', () => {
    it('should be able to press the navbar without test links', () => {
        cy.visit('http://localhost:5173');
        cy.get('#recipe').click({ force: true});
    });
});