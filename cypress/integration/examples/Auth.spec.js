describe('The Home Page', function() {
    it('successfully loads', function() {
        cy.visit('/');
        cy.get('input.nickname').type('natanfs07');
        cy.get('input.pass').type('123654789');
        cy.get('button.login').click();


    });
});