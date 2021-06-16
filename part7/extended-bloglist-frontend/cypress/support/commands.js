// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("login", (username, password) => {
  cy.request({
    method: "POST",
    url: "http://localhost:3003/api/login",
    body: { username, password },
  }).then(({ body }) => {
    localStorage.setItem("bloglistUser", JSON.stringify(body));
  });
});

Cypress.Commands.add("createBlog", (blog) => {
  const { title, author, url, likes } = blog;
  cy.request({
    method: "POST",
    url: "http://localhost:3003/api/blogs",
    body: { title, url, author, likes },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem("bloglistUser")).token
      }`,
    },
  });
});
Cypress.Commands.add("deleteBlog", (id) => {
  cy.request({
    method: "DELETE",
    url: `http://localhost:3003/api/blogs/${id}`,
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem("bloglistUser")).token
      }`,
    },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("createUser", (user) => {
  const { username, password, name } = user;
  cy.request({
    method: "POST",
    url: "http://localhost:3003/api/users",
    body: { username, name, password },
  });
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
