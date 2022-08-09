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

  it('Should have a form that the user can see, and form should have two inputs and a button', () => {
    cy.get('form').should('be.visible')
      .find('input').should('have.length', 2).should('have.attr', 'type', 'text')
    cy.get('input').first().should('have.attr', 'name', 'title')
    cy.get('input').last().should('have.attr', 'name', 'urlToShorten')
    cy.get('button').should('have.length', 1).should('have.text', 'Shorten Please!')
  })

  
})

// When a user fills out the form, the information is reflected in the input fields
// When a user fills out and submits the form, the new shortened URL is rendered