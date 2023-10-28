/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('displays header with 4 links', () => {
    const header = cy.get('[data-testid="header"]');

    header.should('be.visible');

    header.within(() => {
      cy.get('a').should('have.length', 4);
    });
  });

  it('shows the form to enter data to fetch kline data', () => {
    const form = cy.get('[data-testid="form-symbol-interval-limit"]');

    form.should('be.visible');

    form.within(() => {
      cy.get('[data-testid="input-symbol"]').should('have.value', 'BTCBUSD');
      cy.get('[data-testid="input-interval"]').should('have.value', '4h');
      cy.get('[data-testid="input-limit"]').should('have.value', '100');
      cy.get('[data-testid="submit-button"]').should('have.text', 'Submit');
    });
  });

  it('automatically fetches the klinedata on loading', () => {
    cy.get('[data-testid="dca-info"]').should('be.visible');
    cy.get('[data-testid="kline-chart"]').should('be.visible');
  });

  it('fetches new kline data on demand', () => {
    cy.get('[data-testid="input-symbol"]').clear();
    cy.get('[data-testid="input-symbol"]').type('ETHBUSD');
    cy.get('[data-testid="input-interval"]').clear();
    cy.get('[data-testid="input-interval"]').type('1d');
    cy.get('[data-testid="input-limit"]').clear();
    cy.get('[data-testid="input-limit"]').type('10');
    cy.get('[data-testid="submit-button"]').click();

    cy.get('[data-testid="dca-info"]').should('be.visible');
    cy.get('[data-testid="kline-chart"]').should('be.visible');
  });

  it('displays an error if invalid values were typed into the form inputs', () => {
    cy.get('[data-testid="input-symbol"]').clear();
    cy.get('[data-testid="input-symbol"]').type('blablabla');
    cy.get('[data-testid="submit-button"]').click();
    cy.get('[data-testid="data-container"]').should(
      'contain.text',
      'An error occurred while fetching kline data.',
    );
  });
});
