App.setupForTesting();

// register custom helper
Ember.Test.registerHelper('shouldHaveText', 
  function(app, selector, txt, context) {
    var el = findWithAssert(selector, context);
    var text = el.text();
    equal(txt, text, 'expected ' + txt + ' but was ' + text);
  }
);

// register custom async helper
Ember.Test.registerAsyncHelper('dblclick', 
  function(app, selector, context) {
    triggerEvent(selector, 'dblclick');
  }
);

// must be called after the helpers are registered
App.injectTestHelpers();

module('Custom Test Helpers', {
  setup: function() {
    Ember.run(App, App.advanceReadiness);
  },
  teardown: function() {
    App.reset();
  }
});

test('dblClick link increments count', function() {
  expect(2);
  
  visit('/');
  andThen(function() {
    shouldHaveText('#double-clicks', '0');
  });
    
  dblclick('a.btn');
  dblclick('a.btn');
  dblclick('a.btn');
  dblclick('a.btn');
  dblclick('a.btn');
  andThen(function() {
    shouldHaveText('#double-clicks', '5');
  });
});