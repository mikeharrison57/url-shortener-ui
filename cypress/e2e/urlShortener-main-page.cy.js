describe('URL Shortener, main page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {fixture: 'urls'})
    cy.visit('http://localhost:3000/')
  })

  it('Should have the page title URL Shortener at the top of the page and existing shortened URLs', () => {
    cy.get('h1').should('have.text', 'URL Shortener')
    cy.get('.url-card').should('have.length', 3)
    cy.get('.url-card').first().find('h3').should('have.text', 'Awesome photo')
    cy.get('.url-card').last().find('a').should('have.text', 'http://localhost:3001/useshorturl/3')
      .should('have.attr', 'href', 'http://localhost:3001/useshorturl/3')
  })

  it('Should')
})

// When a user visits the page, they can view the Form with the proper inputs
// When a user fills out the form, the information is reflected in the input fields
// When a user fills out and submits the form, the new shortened URL is rendered