emq.globalize();
App.setupForTesting();
App.injectTestHelpers();
 
module('Integration');
 
test('/', function() {
  visit('/');
  andThen(function() {
    equal(find('ul li').length, 3);
  });
});