emq.globalize();
setResolver(App.__container__);
App.setupForTesting();

var originalAlert; 

moduleFor('route:application', 'Unit: route/application', {
  setup: function() { 
    originalAlert = window.alert;
  },
  teardown: function() {
    window.alert = originalAlert;
  }
});

test('Alert is called on displayAlert', function() {
  expect(1);
  var route = this.subject();
  var expectedText = 'foo';
  window.alert = function(text) {
    equal(text, expectedText, 'expected ' + text + ' to be ' + expectedText);
  }
  route._displayAlert(expectedText);
});
