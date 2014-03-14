var server;

module("Integration tests", {
  setup: function() {
    Ember.run(App, App.advanceReadiness);
    server = App.fakeServer('GET', '/api/v1/posts', {
      'posts': [
        { id: 1, title: 'Eloquent Javascript', author: 'Marijn Haverbecke' },
        { id: 2, title: 'Javascript, The Good Parts', author: 'Douglas Crockford' },
        { id: 3, title: 'Effective Javascript', author: 'David Herman' }
      ]
    });
  },
  teardown: function() { 
    server.restore();
    App.reset();
  }
});

test("/", function() {
  visit("/");
  andThen(function() {
    equal(find("li").length, 3, "There are three items in the list");
    server.respond();
  });
});