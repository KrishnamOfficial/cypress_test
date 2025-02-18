const postApiPage = require('../APIPages/postApiPage');
const OrderData = require('../../fixtures/data.json');

describe('Post API Tests', () => {
  before(() => {
    // This will run once before all tests
    cy.log('Setting up environment for Post API tests...');
    // Add any setup tasks here if necessary
  });

  // after(() => {
  //   cy.log("✅ All tests finished! Sending report...");
  //   cy.task("sendTestReportEmail");
  // });
  afterEach(function () {
    if (this.currentTest.state === 'failed') {
      // Logic to rerun failed test
      cy.log('Test failed, retrying...');
      // Example: retry test by invoking the test again
    }
  });
  it('Should get all posts successfully', () => {
    postApiPage.getAllPosts().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });

  it('Should fail to get a post with invalid ID', () => {
    postApiPage.getPostById(OrderData.postId).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('Should create a post successfully', () => {
    postApiPage.createPost(OrderData.newPost).then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  it('Should delete a post successfully', () => {
    postApiPage.deletePost(OrderData.postIdToDelete).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('Should fail a test to capture video', () => {
    postApiPage.getAllPosts().then((response) => {
      expect(response.status).to.eq(200);
    });
  });



});
