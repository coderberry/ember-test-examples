App = Ember.Application.create({
  rootElement: '#ember-app'
});
 
App.Router.map(function() {
  
});
 
App.Person = DS.Model.extend({
  firstName: DS.attr(),
  lastName: DS.attr(),
  fullName: function() {
    return this.get('firstName') + ' ' + this.get('lastName');
  }.property('firstName', 'lastName')
});

