App.setupForTesting();

// must be called after the helpers are registered
App.injectTestHelpers();

module('Posts', {
  setup: function() {
    Ember.run(App, App.advanceReadiness);
  },
  teardown: function() {
    App.reset();
  }
});

test('post list shows', function() {
  visit('/');
  andThen(function() {
    equal(find('ul li').length, 3, 'should have 3 posts');
  });
});

test('add post', function() {
  visit('/new');
  fillIn('input[placeholder="title"]', 'My New Post');
  fillIn('input[placeholder="body"]', 'lorem ipsum dolor...');
  click('button.submit');
  andThen(function() {
    equal(find('ul li').length, 4, 'should have 4 posts');
  });
});