class PostApiPage {
  getAllPosts() {
    return cy.request('GET', '/posts');
  }

  getPostById(id) {
    return cy.request('GET', `/posts/${id}`);
  }

  createPost(postData) {
    return cy.request({
      method: 'POST',
      url: '/posts',
      body: postData,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  }

  deletePost(id) {
    return cy.request('DELETE', `/posts/${id}`);
  }
}

module.exports = new PostApiPage();

