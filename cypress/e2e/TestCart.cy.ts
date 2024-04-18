describe('add item to cart', () => {
    it('should add an item to the cart', () => {
        // Handle uncaught exceptions
        cy.on('uncaught:exception', (err) => {
            console.error('Uncaught exception:', err.message);
            return false;
        });

  
        cy.visit('http://localhost:5173/recipe/specificRecipe/66150f975d2cfae26cf6083e');

        cy.wait(2000);

        cy.get('#addButtonToCart').click();

        cy.wait(3000); // Waiting for the add

        cy.get('#cartOpen').click({ force: true });  // as the button is hidden we need to force it

        cy.wait(3000)  // to display the cart 

        cy.get('#addMoreOfSame').click();  // test out the add button for the recipe

        cy.wait(2000)

        cy.get('#confirmOrder').click();  // test out the checkout
    });
});


describe('add item to cart and navigate', () => {
    it('should add an item to the cart and clear the cart', () => {
        // Handle uncaught exceptions
        cy.on('uncaught:exception', (err) => {
            console.error('Uncaught exception:', err.message);
            return false;
        });

  
        cy.visit('http://localhost:5173/recipe/specificRecipe/661f87445d2cfae26cd4df1c');

        cy.wait(2000);

        cy.get('#addButtonToCart').click();

        cy.wait(3000); // Waiting for the add

        cy.get('#cartOpen').click({ force: true });  // as the button is hidden we need to force it

        cy.wait(3000)  // to display the cart 

        for (let i = 0; i <3 ;i++) {
            cy.get('#addButtonToCart').click();
        }

        cy.wait(2000)
        
        cy.get('#clearCart').click();  // removes the one item

        cy.wait(2000);

        cy.get('#cartOpen').click({force: true});  // closes the cart
    });
});


