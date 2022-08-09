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

  it.only('Should not submit form unless user fills out both inputs' , () => {
    cy.get('input').should('have.attr', 'required')
    cy.get('input').first().type('Dog')
    cy.get('button').click()
    cy.get('input').then((input) => {
      expect(input[1].validationMessage).to.eq('Please fill out this field.')
    })
    cy.get('.url-card').should('not.have.length', 4)
  })
})