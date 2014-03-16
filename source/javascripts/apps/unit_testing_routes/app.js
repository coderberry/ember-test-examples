App = Ember.Application.create({
  rootElement: '#ember-app'
});
 
App.Router.map(function() {
  this.route('about');
  this.route('contact');
});

App.ApplicationRoute = Em.Route.extend({
  _displayAlert: function(text) {
    alert(text);
  },

  actions: {
    displayAlert: function(text) {
      this._displayAlert(text);
    }
  }
});

App.IndexController = Em.Controller.extend({
  text: 'Home'
});

App.AboutController = Em.Controller.extend({
  text: 'About'
});

App.ContactController = Em.Controller.extend({
  text: 'Contact'
});

