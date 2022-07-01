/// <reference types="Cypress" />
describe('Perxtech Task', () => {
    var Button = '.ant-btn.ant-btn-primary.ant-btn-lg'
    it('Verify Creating a reward', () => {
        cy.visit('/')
        cy.get(Cypress.env('email')).click().type('thao+test-qa-interview@perxtech.com')
        cy.get(Cypress.env('password')).click().type('admin1234')
        cy.get(Button).click()
        cy.get('.ant-message-notice-content div span').contains('Login Success').should('exist')
        cy.contains('Rewards').click()
        cy.get(Button).click()
        cy.get('.ant-form-item-control').eq(1).click().type('TestPerxtech')
        cy.contains('button', 'Next').click()
        cy.get('.ant-calendar-picker-input.ant-input').last().click()
        cy.get('.ant-calendar-date').eq(7).contains(3).click()
        cy.contains('button', 'Next').click()
        cy.get(Button).click()
        cy.get('.ant-message-notice-content div span').should('exist')
        cy.wait(3000)
        cy.contains('Rewards').click()
        cy.get('a >div').contains('TestPerxtech').should('exist')
    })
    it('Verify Upload a file in bulk list', () => {
        var counts = []
        cy.intercept('GET', '**/v4/dash/file_imports**').as('count1')
        cy.contains('Bulk Actions').click()
        cy.wait('@count1').then((res) => {
            cy.log(res.response.body.meta.count)
            counts.push(res.response.body.meta.count)
        })
        cy.get(Button).click()
        cy.get('input[type="file"]').attachFile('sample_issue_vouchers.csv')
        cy.get('.ant-modal-footer > .ant-btn-primary').click()
        cy.get('.ant-btn.ant-btn-primary').last().click({ force: true })
        cy.get('.ant-message-notice-content div span').should('exist')
        cy.contains('Bulk Actions').click({ force: true })
        cy.wait('@count1').then((res) => {
            cy.log(res.response.body.meta.count)
            cy.log(counts)
            expect(res.response.body.meta.count).greaterThan(counts[0])
        })
    })

})