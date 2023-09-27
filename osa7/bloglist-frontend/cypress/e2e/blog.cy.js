describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const testUser = {
      name: "sample",
      username: "test",
      password: "1234",
      blogs: [],
    };
    cy.request("POST", "http://localhost:3003/api/users", testUser);
    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
    cy.contains("Login");
  });

  describe("Login", () => {
    it("succeeds with correct credentials", () => {
      cy.get("#username").type("test");
      cy.get("#password").type("1234");
      cy.contains("Log in").click();
      cy.contains("sample logged in");
    });

    it("fails with wrong credentials", () => {
      cy.get("#username").type("test");
      cy.get("#password").type("12345");
      cy.contains("Log in").click();
      cy.contains("Wrong username or password");
    });
  });

  describe("Posting blog logged in", () => {
    beforeEach(() => {
      cy.get("#username").type("test");
      cy.get("#password").type("1234");
      cy.contains("Log in").click();
    });

    it("blog can be created", () => {
      cy.contains("New Blog").click();
      cy.get("#title").type("test title");
      cy.get("#author").type("test author");
      cy.get("#url").type("test url");
      cy.get("#submitForm").click();
      cy.contains("test title by test author");
    });

    it("blog can be liked", () => {
      cy.contains("New Blog").click();
      cy.get("#title").type("test title");
      cy.get("#author").type("test author");
      cy.get("#url").type("test url");
      cy.get("#submitForm").click();
      cy.contains("View").click();
      cy.contains("Like").click();
      cy.contains("1");
    });
  });

  describe("Deleting blogs", () => {
    beforeEach(() => {
      cy.get("#username").type("test");
      cy.get("#password").type("1234");
      cy.contains("Log in").click();
      cy.contains("New Blog").click();
      cy.get("#title").type("test title");
      cy.get("#author").type("test author");
      cy.get("#url").type("test url");
      cy.get("#submitForm").click();
      cy.contains("View").click();
    });
    it("User can remove blog", () => {
      cy.contains("Remove").click();
      cy.contains("test title").should("not.exist");
    });
    it("User can delete only ones own posts", () => {
      const secondUser = {
        name: "sample2",
        username: "test2",
        password: "1234",
        blogs: [],
      };
      cy.request("POST", "http://localhost:3003/api/users", secondUser);
      cy.contains("Log out").click();
      cy.get("#username").type("test2");
      cy.get("#password").type("1234");
      cy.contains("Log in").click();
      cy.contains("View").click();
      cy.contains("Remove").should("not.exist");
    });
  });

  describe("Post order correct", () => {
    it("Most liked post on top", () => {
      cy.get("#username").type("test");
      cy.get("#password").type("1234");
      cy.contains("Log in").click();
      cy.contains("New Blog").click();
      cy.get("#title").type("test title");
      cy.get("#author").type("test author");
      cy.get("#url").type("test url");
      cy.get("#submitForm").click();
      cy.contains("View").click();
      cy.contains("Like").click();

      cy.contains("New Blog").click();
      cy.get("#title").type("testtitle2");
      cy.get("#author").type("test author2");
      cy.get("#url").type("test url2");
      cy.get("#submitForm").click();
      cy.wait(100);
      cy.get("#testtitle2").contains("View").click();
      cy.get("#testtitle2").contains("Like").click();
      cy.get("#testtitle2").contains("Like").click();
      cy.wait(100);
      cy.contains("Like").click();
      cy.get("#testtitle2").contains("3");
    });
  });
});
