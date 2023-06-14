class SmartTablePage {
  addRow(firstName, lastName) {
    cy.get('thead i.nb-plus').click();
    cy.get('thead tr').eq(2).then(row => {
      cy.wrap(row).find('input[ng-reflect-name="firstName"]').type(firstName);
      cy.wrap(row).find('input[ng-reflect-name="lastName"]').type(lastName);
      cy.wrap(row).find('i[class="nb-checkmark"]').click();
    })

    cy.get('tbody tr').first().find('td').then(columns => {
      cy.wrap(columns).eq(2).should('have.text', firstName);
      cy.wrap(columns).eq(3).should('have.text', lastName); 
    })
  }

  editAgeColumnByFirstName(firstName, age) {
    cy.contains('tbody tr', firstName).then(row => {
      cy.wrap(row).find('i[class="nb-edit"]').click();
      cy.wrap(row).find('input[ng-reflect-name="age"]').clear().type(age).parents('tr').find('i[class="nb-checkmark"]').click();
      cy.wrap(row).find('td').eq(6).should('have.text', age);
    })
  }

  deleteColumnByFirstName(firstName) {
    cy.contains('tbody tr', firstName).then(row => {
      cy.wrap(row).find('i[class="nb-trash"]').click();
      cy.on('window:confirm', (str) => {
        expect(str).to.equal('Are you sure you want to delete?');
        return true;
      })
    })
  }
}

export const onSmartTablePage = new SmartTablePage();