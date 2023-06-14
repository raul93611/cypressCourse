class DatePickerPage{
  selectDateFromCurrentMonth(day) {
    let date = new Date();
    date.setDate(date.getDate() + day);
    let futureDay = date.getDate();
    let futureMonth = date.toLocaleString('default', { month: 'short' });
    let assertDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

    cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
      if (!dateAttribute.toLocaleLowerCase().includes(futureMonth)) {
        cy.get('g[data-name="chevron-right"]').click();
        this.selectDateFromCurrentMonth(day);
      } else {
        cy.get('nb-calendar-day-picker .ng-star-inserted').contains(futureDay, { exact: true }).click()
      }
    })

    return assertDate;
  }

  selectDateFromToday(day){
    cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
      cy.wrap(input).click()
      const assertDate = this.selectDateFromCurrentMonth(day);
      cy.wrap(input).invoke('prop', 'value').should('contain', assertDate)
    })
  }

  selectRangeDateFromToday(initialDate, endDate) {
    cy.contains('nb-card', 'Datepicker With Range').find('input').then(input => {
      cy.wrap(input).click()
      const initialDateFormatted = this.selectDateFromCurrentMonth(initialDate);
      const endDateFormated = this.selectDateFromCurrentMonth(endDate);
      
      cy.wrap(input).invoke('prop', 'value').should('contain', `${initialDateFormatted} - ${endDateFormated}`);
    })
  }

}

export const onDatePickerPage = new DatePickerPage();