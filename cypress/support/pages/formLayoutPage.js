class FormLayoutPage{
  submitInlineForm(name, email){
    cy.contains('nb-card', 'Inline form').find('form').then(form => {
      cy.wrap(form).find('input[placeholder="Jane Doe"]').type(name)
      cy.wrap(form).find('input[placeholder="Email"]').type(email)
      cy.wrap(form).find('input[type="checkbox"]').check({force: true})
      cy.wrap(form).submit()
    });
  }

  submitBasicForm(email, password) {
    cy.contains('nb-card', 'Basic form').find('form').then(form => {
      cy.wrap(form).find('input[placeholder="Email"]').type(email)
      cy.wrap(form).find('input[placeholder="Password"]').type(password)
      cy.wrap(form).find('input[type="checkbox"]').check({force: true})
      cy.wrap(form).submit()
    });
  }
}

export const onFormLayoutPage = new FormLayoutPage();