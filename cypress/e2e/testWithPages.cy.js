/// <reference types="cypress" />

import { onDatePickerPage } from "../support/pages/datePickerPage"
import { onFormLayoutPage } from "../support/pages/formLayoutPage"
import { onSidebarPage } from "../support/pages/sidebarPage"
import { onSmartTablePage } from "../support/pages/smartTablePage"

describe('Test with page object models', () => {
  beforeEach('Open the application', () => {
    cy.visit('/')
  })

  it('verify navigation accross pages', () => {
    onSidebarPage.formsLayoutPage()
    onSidebarPage.formsDatepickerPage()
    onSidebarPage.smartTablePage()
    onSidebarPage.toasterPage()
    onSidebarPage.tooltipPage()
  })

  it.only('submit Inline and Basic forms and select tomorrow date in the calendar', () => {
    onSidebarPage.formsLayoutPage()
    onFormLayoutPage.submitInlineForm('Raul Velasco', 'test@test.com')
    onFormLayoutPage.submitBasicForm('test@test.com', 'password')
    onSidebarPage.formsDatepickerPage()
    onDatePickerPage.selectDateFromToday(23)
    onDatePickerPage.selectRangeDateFromToday(3, 30)
    onSidebarPage.smartTablePage()
    onSmartTablePage.addRow('raul', 'velasco')
    onSmartTablePage.editAgeColumnByFirstName('raul', 40)
    onSmartTablePage.deleteColumnByFirstName('raul')
  })
})