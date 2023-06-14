/// <reference types="cypress" />

describe('Our first test', () => {
  it('first test', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    //by tag name
    cy.get('input');

    //by id
    cy.get('#inputEmail1');

    //by class
    cy.get('.input-full-width');

    //by attribute name
    cy.get('[placeholder]');

    //by attribute value
    cy.get('[placeholder="Email"]');

    //by class value 
    cy.get('input[class="input-full-width size-medium shape-rectangle"]');

    //by tag name and attribute value
    cy.get('input[placeholder="Email"]');

    //by 2 different attributes
    cy.get('[placeholder="Email"][fullwidth]');

    //by tag name attribute with value id and class name
    cy.get('input[placeholder="Email"]#inputEmail1.input-full-width');

    //by the most recommended way by cypress
    cy.get('input[data-cy="imputEmail1"]');
  });

  it('second test', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    cy.get('[data-cy="signInButton"]')
    cy.contains('Sign in')
    cy.contains('[status="warning"]', 'Sign in')

    cy.get('#inputEmail3')
      .parents('form')
      .find('button')
      .should('contain', 'Sign in')
      .parents('form')
      .find('nb-checkbox')
      .click()

    cy.contains('nb-card', 'Horizontal form')
      .find('[type="email"]')
  });

  it('then and wrap methods', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    // cy.contains('nb-card', 'Using the Grid')
    // .find('[for="inputEmail1"]')
    // .should('contain', 'Email')

    // cy.contains('nb-card', 'Using the Grid')
    // .find('[for="inputPassword2"]')
    // .should('contain', 'Password')

    // cy.contains('nb-card', 'Basic form')
    // .find('[for="exampleInputEmail1"]')
    // .should('contain', 'Email address')

    // cy.contains('nb-card', 'Basic form')
    // .find('[for="exampleInputPassword1"]')
    // .should('contain', 'Password')

    cy.contains('nb-card', 'Using the Grid').then(form => {
      const emailLabel = form.find('[for="inputEmail1"]').text();
      const passwordLabel = form.find('[for="inputPassword2"]').text();

      expect(emailLabel).to.equal('Email');
      expect(passwordLabel).to.equal('Password');

      cy.contains('nb-card', 'Basic form').then(secondForm => {
        const passwordLabel2 = secondForm.find('[for="exampleInputPassword1"]').text();
        expect(passwordLabel).to.equal(passwordLabel2);

        cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')

      })
    })
  });

  it('invoke command', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

    cy.get('[for="exampleInputEmail1"]').then(label => {
      expect(label.text()).to.equal('Email address');
    })

    cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
      expect(text).to.equal('Email address');
    });

    cy.contains('nb-card', 'Basic form')
      .find('nb-checkbox')
      .click()
      .find('.custom-checkbox')
      .invoke('attr', 'class')
      // .should('contain', 'checked')
      .then(classValue => {
        expect(classValue).to.contain('checked');
      })
  })

  it('assert property', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Datepicker').click();

    cy.contains('nb-card', 'Common Datepicker')
      .find('input').then(input => {
        cy.wrap(input).click()

        cy.get('nb-calendar-day-picker').contains('17').click()

        cy.wrap(input).invoke('prop', 'value').then(value => {
          expect(value).to.contain('17')
        })
      })
  })

  it('radio button', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    cy.contains('nb-card', 'Using the Grid').find('input[type="radio"]').then(radioButtons => {
      cy.wrap(radioButtons).first().check({ force: true }).should('be.checked');

      cy.wrap(radioButtons).eq(1).check({ force: true }).should('be.checked');
      cy.wrap(radioButtons).first().should('not.be.checked');
      cy.wrap(radioButtons).eq(2).should('be.disabled');
    });
  })

  it('checkbox', () => {
    cy.visit('/');
    cy.contains('Modal & Overlays').click();
    cy.contains('Toastr').click();

    cy.get('input[type="checkbox"]').check({ force: true });
  })

  it('datepickers', () => {
    const selectDateFromCurrentMonth = (day) => {
      let date = new Date();
      date.setDate(date.getDate() + day);
      let futureDay = date.getDate();
      let futureMonth = date.toLocaleString('default', { month: 'short' });
      let assertDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

      cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
        if (!dateAttribute.toLocaleLowerCase().includes(futureMonth)) {
          cy.get('g[data-name="chevron-right"]').click();
          selectDateFromCurrentMonth(day);
        } else {
          cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay, { exact: true }).click()
        }
      })

      return assertDate;
    };

    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Datepicker').click();

    cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
      cy.wrap(input).click()
      const assertDate = selectDateFromCurrentMonth(300);
      cy.wrap(input).invoke('prop', 'value').should('contain', assertDate)
    })
  })

  it('lists and dropdowns', () => {
    const colors = {
      "Light": "rgb(255, 255, 255)",
      "Dark": "rgb(34, 43, 69)",
      "Cosmic": "rgb(50, 50, 89)",
      "Corporate": "rgb(255, 255, 255)"
    }

    const colorsKeys = Object.keys(colors);

    cy.visit('/');

    colorsKeys.forEach(color => {
      cy.get('nav nb-select').click();
      cy.contains('.options-list nb-option', color).click();
      cy.get('nav nb-select').should('contain', color);
      cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[color]);
    })

  })

  it('web tables', () => {
    cy.visit('/');
    cy.contains('Tables & Data').click();
    cy.contains('Smart Table').click();

    cy.contains('tbody tr', 'Larry').then(row => {
      cy.wrap(row).find('i[class="nb-edit"]').click();
      cy.wrap(row).find('input[ng-reflect-name="age"]').clear().type('30').parents('tr').find('i[class="nb-checkmark"]').click();
      cy.wrap(row).find('td').eq(6).should('have.text', '30');
    })

    cy.get('thead i.nb-plus').click();
    cy.get('thead tr').eq(2).then(row => {
      cy.wrap(row).find('input[ng-reflect-name="firstName"]').type('Raul');
      cy.wrap(row).find('input[ng-reflect-name="lastName"]').type('Velasco');
      cy.wrap(row).find('i[class="nb-checkmark"]').click();
    })

    cy.get('tbody tr').first().find('td').then(columns => {
      cy.wrap(columns).eq(2).should('have.text', 'Raul');
      cy.wrap(columns).eq(3).should('have.text', 'Velasco');
    })

    
    cy.get('thead [placeholder="Age"]').type(20);
    cy.wait(500);
    cy.get('tbody tr').each(row => {
      cy.wrap(row).find('td').eq(6).should('have.text', '20');
    })
  })

  it('tooltips', () => {
    cy.visit('/');
    cy.contains('Modal & Overlays').click();
    cy.contains('Tooltip').click();

    cy.contains('nb-card', 'Colored Tooltips').contains('Default').trigger('mouseenter');
    cy.get('nb-tooltip').should('have.text', 'This is a tooltip');
  })


  it.only('alerts', () => {
    cy.visit('/');
    cy.contains('Tables & Data').click();
    cy.contains('Smart Table').click();

    cy.contains('tbody tr', 'Larry').then(row => {
      cy.wrap(row).find('i[class="nb-trash"]').click();
      cy.on('window:confirm', (str) => {
        expect(str).to.equal('Are you sure you want to delete?');
        return true;
      })
    })
  })

})