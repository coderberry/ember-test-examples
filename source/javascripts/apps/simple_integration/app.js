//= require ../../shared/app_setup

App.Router.map(function() {
  this.resource('posts', { path: '/' }, function() {
    this.route('new');
  })
});

App.Post = DS.Model.extend({
  title: DS.attr(),
  author: DS.attr()
});

App.PostsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('post');
  }
});
