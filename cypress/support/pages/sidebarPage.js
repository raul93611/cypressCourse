class SidebarPage {
  clickGroupMenuItem(groupName){
    cy.contains(groupName).parent().find('ul').invoke('hasClass', 'collapsed').then(isCollapsed => {
      if (isCollapsed) cy.contains(groupName).click();
    }) 
  }

  formsLayoutPage() {
    this.clickGroupMenuItem('Forms')
    cy.contains('Form Layouts').click();
  }

  formsDatepickerPage() {
    this.clickGroupMenuItem('Forms')
    cy.contains('Datepicker').click();
  }

  toasterPage() {
    this.clickGroupMenuItem('Modal & Overlays')
    cy.contains('Toastr').click();
  }

  smartTablePage() {
    this.clickGroupMenuItem('Tables & Data')
    cy.contains('Smart Table').click();
  }

  tooltipPage() {
    this.clickGroupMenuItem('Modal & Overlays')
    cy.contains('Tooltip').click();
  }
}

export const onSidebarPage = new SidebarPage();