describe('test title recipe', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/add');
  });
  
  it('should trigger an error message for empty title', () => {
    cy.get('#title-input').should('have.value', '');
    cy.contains('button', 'Add your recipe').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('You need to add a Title, Description and a image Url');
    });
    // cy.contains('You need to add a Title, Description and a image Url').should('exist').should('be.visible');
  });
});



describe('test price recipe', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/add');
  });
  
  it('should trigger an error message for minus price', () => {
    cy.get('#title-input').type('test');
    cy.get('#description').type('desc');
    cy.get('#url-add').type('http');
    cy.get('#price').clear().type('-5')
    cy.contains('button', 'Add your recipe').click();
    //cy.contains('Time and price cannot be negative').should('exist').should('be.visible');
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Time and price cannot be negative');
    });

  });
});