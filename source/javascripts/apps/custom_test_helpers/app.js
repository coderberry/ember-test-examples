App = Ember.Application.create({
  rootElement: '#ember-testing'
});

App.Router.map(function() {});

App.IndexController = Ember.Controller.extend({
  doubleClicks: null,
  
  resetCount: function() {
    this.set('doubleClicks', 0);
  }.on('init'),
  
  actions: {
    addDblClick: function() {
      this.incrementProperty ('doubleClicks');
    }
  }
});

App.ClickableButtonComponent = Ember.Component.extend({
  tagName: 'button',
  
  respondToDblClick: function() {
    this.sendAction('dbl-click-action');
  }.on('dblclick ')  
});