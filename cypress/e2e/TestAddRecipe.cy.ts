describe('open website', () => {
  it('Should open the homepage', () => {
    cy.visit('http://localhost:5173/')
  })
})


describe('open add', () => {
  it('Should open /add', () => {
    cy.visit('http://localhost:5173/add')
  })
})


describe('Add Recipe Page', () => {
  beforeEach(() => {
    // Visit the add recipe page before each test
    cy.visit('http://localhost:5173/add');
  });

  it('should add recipe with valid data', () => {
    // Input valid recipe data
    cy.get('#title-input').type('Test Recipe');
    cy.get('#description').type('This is a test recipe description');
    cy.get('#time-in-mins').type('30');
    cy.get('#url-add').type('https://as2.ftcdn.net/v2/jpg/00/49/22/63/1000_F_49226343_zrW0Mlu6hqxzgN2gUBwW8EGaHmD5GZU6.jpg');
    cy.get('#price').type('10');

    // Submit the form
    cy.get('button').contains('Add your recipe').click();

  });
 
});


// describe('test title recipe', () => {
//   beforeEach(() => {
//     cy.visit('http://localhost:5173/add');
//   });
  
//   it('should display an error message for empty title', () => {
//     cy.get('#title-input').should('have.value', '');
//     cy.contains('button', 'Add your recipe').click();
//     cy.on('window:alert', (str) => {
//       expect(str).to.equal('You need to add a Title, Description and a image Url');
//     });
//     // cy.contains('You need to add a Title, Description and a image Url').should('exist').should('be.visible');
//   });
// });



// describe('test price recipe', () => {
//   beforeEach(() => {
//     cy.visit('http://localhost:5173/add');
//   });
  
//   it('should display an error message for minus price', () => {
//     cy.get('#title-input').type('test');
//     cy.get('#description').type('desc');
//     cy.get('#url-add').type('http');
//     cy.get('#price').clear().type('-5')
//     cy.contains('button', 'Add your recipe').click();
//     //cy.contains('Time and price cannot be negative').should('exist').should('be.visible');
//     cy.on('window:alert', (str) => {
//       expect(str).to.equal('Time and price cannot be negative');
//     });

//   });
// });

