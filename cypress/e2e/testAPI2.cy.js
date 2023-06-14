/// <reference types="cypress" />

describe('Test API', () => {
  beforeEach('Sign In', () => {
    cy.login()
  })

  it('verify correct request and response', () => {
    cy.intercept('POST', 'https://api.realworld.io/api/articles/').as('postArticle')

    cy.contains('New Article').click()
    cy.get('input[formcontrolname="title"]').type('new title')
    cy.get('input[formcontrolname="description"]').type('new description')
    cy.get('textarea[formcontrolname="body"]').type('new body')
    cy.get('input[placeholder="Enter tags"]').type('newTags')
    cy.contains('Publish Article').click()

    cy.wait('@postArticle').then(xhr => {
      console.log(xhr);
      cy.wrap(xhr.response.statusCode).should('equal', 200)
      cy.wrap(xhr.response.body.article.body).should('equal', 'new body')
    });
  })

  it('verify popular tags are displayed', () => {
    cy.intercept('GET', '*/tags', { fixture: 'tags.json' }).as('tags')
    cy.fixture('tags.json').then(tags => {
      cy.wrap(tags.tags).each(tag => {
        cy.get('.tag-list').should('contain', tag)
      })
    })
  })

  it('verify global feed and favs count', () => {
    cy.intercept('GET', '*/articles*', { fixture: 'articles.json' }).as('articles')

    cy.contains('Global Feed').click()

    cy.fixture('articles.json').then(articles => {
      const favsCount = articles.articles.map(article => article.favoritesCount)
      cy.get('app-article-list app-article-preview button').each((favButton, index) => {
        expect(favButton).to.contain(favsCount[index])
      })
    })

    cy.fixture('articles.json').then(file => {
      const slug = file.articles[1].slug
      file.articles[1].favoritesCount = 6
      cy.intercept('POST', `*/articles/${slug}/favorite`, file).as('tagUpdated')
    })

    cy.get('app-article-list app-article-preview button').eq(1).click()
    cy.get('app-article-list app-article-preview button').eq(1).should('contain', 6)
  })

  it('login and create an article by api', () => {
    cy.get('@authToken').then(authToken => {

      cy.request({
        method: 'POST',
        url: 'https://api.realworld.io/api/articles/',
        headers: {
          authorization: `Token ${authToken}`
        },
        body: {
          "article": {
            "tagList": [],
            "title": "new article1",
            "description": "test1",
            "body": "test"
          }
        }
      }).then(response => {
        expect(response.status).to.equal(200);
      });
      
      cy.contains('Global Feed').click();
      cy.get('app-article-preview a.preview-link').first().click()
      cy.contains('Delete Article').first().click().then(() => {
        cy.request({
          method: 'GET',
          url: 'https://api.realworld.io/api/articles?limit=10&offset=0',
          headers: {
            authorization: `Token ${authToken}`
          }
        }).then(response => {
          expect(response.status).to.equal(200);
          console.log(response.body.articles);
          expect(response.body.articles[0].title).not.to.equal('new article1')
        })
      })
    });

  })
})