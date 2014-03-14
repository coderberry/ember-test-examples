// in order to see the app running inside the QUnit runner
App.rootElement = '#ember-testing';

// Common test setup
App.setupForTesting();
App.injectTestHelpers();

// Helper Functions
App.pushToStore = function(modelName, payload) {
  var myStore = App.__container__.lookup('store:main');
  Ember.run(function() {
    myStore.pushPayload(modelName, payload);
  });
};

App.fakeServer = function(method, url, response) {
  var server = sinon.fakeServer.create();
  server.respondWith(method, url, [
    200,
    { "Content-Type": "application/json" },
    JSON.stringify(response)
  ]);
  return server;
};