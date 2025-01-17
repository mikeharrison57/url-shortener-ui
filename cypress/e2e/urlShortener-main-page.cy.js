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

  it('Should allow the user to input information into the form, and the values of the inputs should be the user input', () => {
    cy.get('input').first().type('City').should('have.value', 'City')
    cy.get('input').last().type('https://source.unsplash.com/random/?city,night').should('have.value', 'https://source.unsplash.com/random/?city,night')
  })

  it('Should submit user input, and user input should be reflected in new URL card on the DOM', () => {
    cy.get('input').first().type('Fruit')
    cy.get('input').last().type('https://source.unsplash.com/random/900×700/?fruit')
    cy.get('button').click()
    cy.get('.url-card').last().find('a').should('exist').should('be.visible')
    cy.get('.url-card').last().find('h3').should('have.text', 'Fruit')
  })

  it('Should not submit form unless user fills out both inputs' , () => {
    cy.get('input').should('have.attr', 'required')
    cy.get('input').first().type('Dog')
    cy.get('button').click()
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(`Please fill out both fields`)
    })
    cy.get('.url-card').should('not.have.length', 4)
    cy.get('input').first().clear()
    cy.get('input').last().type('https://source.unsplash.com/random/300×300')
    cy.get('button').click()
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(`Please fill out both fields`)
    })
    cy.get('.url-card').should('not.have.length', 4)
  })

  it('Should display an error message if network request fails' , () => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 404,
      body: {
        error: 'Cannont GET /api/v1/urls'
      }
    })
    cy.visit('http://localhost:3000/')
    cy.get('.error-message').should('have.text', 'Sorry, were having some Techical Difficulties right now. Please come visit us later!')
  })
  
  it('Should display an error message if and internal server error occurs' , () => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 500,
      body: {
        error: 'Cypress forced 500'
      }
    })
    cy.visit('http://localhost:3000/')
    cy.get('.error-message').should('have.text', 'Sorry, were having some Techical Difficulties right now. Please come visit us later!')
  })
})