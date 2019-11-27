describe('home page', () => {
  it('can see the homepage', () => {
    cy.visit('/')
      .get('.header-module--container--3y9Xm > nav > .nav-module--list--9Und9 > :nth-child(2) > .nav-module--link--3vYnh')
      .click()
  });
})