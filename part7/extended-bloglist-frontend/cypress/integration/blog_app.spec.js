describe("Blog app", () => {
  const user = {
    username: "dhatguy",
    password: "qwerty",
    name: "Joseph Odunsi",
  };
  const user2 = {
    username: "johnny",
    password: "qwerty",
    name: "John Doe",
  };
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.createUser(user);
    cy.visit("http://localhost:3000");
  });

  it("should show login form", () => {
    cy.contains("username").find("input[name='Username']");
    cy.contains("password").find("input[name='Password']");
  });

  describe("Login", function () {
    beforeEach(function () {});
    it("succeeds with correct credentials", function () {
      cy.contains("username")
        .find("input[name='Username']")
        .type(user.username);
      cy.contains("password")
        .find("input[name='Password']")
        .type(user.password);
      cy.contains("login").click();
      cy.contains("Joseph Odunsi logged in");
      cy.contains("Login successful").should(
        "have.css",
        "color",
        "rgb(0, 128, 0)"
      );
    });

    it("fails with wrong credentials", function () {
      cy.contains("username").find("input[name='Username']").type("malware");
      cy.contains("password").find("input[name='Password']").type("rootkit");
      cy.contains("login").click();
      cy.contains("invalid username or password").should(
        "have.css",
        "color",
        "rgb(255, 0, 0)"
      );
    });
  });

  describe("When logged in", function () {
    const blog = {
      author: "Joseph Odunsi",
      title: "Testing with Cypress",
      url: "http://localhost/Testing with Cypress",
      likes: 10,
    };
    const blog2 = {
      author: "John Doe",
      title: "React is a library",
      url: "http://localhost/React is a library",
      likes: 12,
    };
    const blog3 = {
      author: "Joseph Odunsi",
      title: "State management with react query",
      url: "http://localhost/State management with react query",
      likes: 4,
    };
    beforeEach(function () {
      cy.login(user.username, user.password);
    });

    it("A blog can be created", function () {
      cy.createBlog(blog);
      cy.contains("Testing with Cypress");
    });

    it("user can like a blog", () => {
      cy.createBlog(blog);
      cy.contains("Testing with Cypress").find("button").click();
      cy.contains("likes").contains("like").click();
      cy.contains("likes").contains("1");
      cy.contains("updated");
    });

    describe("delete blog", function () {
      beforeEach(() => {
        cy.createBlog(blog);
        cy.reload();
      });
      it("user who created a blog can delete it", () => {
        cy.contains(blog.title).contains("view").click();
        cy.contains("remove").click();
        cy.get(".blogs").should("not.contain", blog.title);
      });

      it("check that other users cannot delete the blog", function () {
        cy.createUser(user2);
        cy.login(user2.username, user2.password);
        cy.visit("http://localhost:3000");
        cy.contains(blog.title).contains("view").click();
        cy.get(".blogs").contains(blog.title).should("not.contain", "remove");
      });
    });

    it.only("blogs are sorted with number highest number of likes", function () {
      cy.createBlog(blog);
      cy.createBlog(blog2);
      cy.createBlog(blog3);
      cy.visit("http://localhost:3000");

      cy.get(".blogs")
        .children()
        .should("have.length", 3)
        .then((blogs) => {
          cy.get(blogs[1]).parent().contains(blog2.title);
          cy.get(blogs[0]).parent().contains(blog.title);
          cy.get(blogs[2]).parent().contains(blog3.title);
        });
    });
  });
});
