emq.globalize();
setResolver(App.__container__);
App.setupForTesting();

 
moduleForModel('person', 'Unit: models/person');
 
test('fullName', function() {
  var model = this.subject();
  Ember.run(function() {
    model.set('firstName', 'Deric');
    model.set('lastName', 'Abel');
  });
  equal(model.get('fullName'), 'Deric Abel');
});
