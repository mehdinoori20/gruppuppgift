describe('Category Navigation', () => {
    it('should navigate to the "Fish" category page when clicked', () => {
        cy.visit('http://localhost:5173/recipe');

        cy.contains('.grid .rounded', 'Fish').click();


        cy.url().should('include', '/recipe/category/Fish');
    });
});


describe('Category Navigation', () => {
    it('should navigate to the "Meat" category page when clicked', () => {
        cy.visit('http://localhost:5173/recipe');


        cy.contains('.grid .rounded', 'Meat').click();

        // Verify the URL
        cy.url().should('include', '/recipe/category/Meat');
    });
});
