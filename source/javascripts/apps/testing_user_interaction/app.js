App = Ember.Application.create({
  rootElement: '#ember-testing'
});

App.Store = DS.Store.extend({
  adapter: DS.FixtureAdapter
});

App.Post = DS.Model.extend({
  title: DS.attr(),
  body: DS.attr()
});

App.Post.FIXTURES = [
  { id: 0, title: 'Testing Ember Applications', body: 'lorem ipsum dolor...' },
  { id: 1, title: 'Ember Authentication', body: 'lorem ipsum dolor...' },
  { id: 2, title: 'Contributing to Ember', body: 'lorem ipsum dolor...' }
];

App.Router.map(function() {
  this.resource('posts', { path: '/' }, function() {
    this.route('new',  { path: '/new' });
    this.route('show', { path: '/:id' });
    this.route('edit', { path: '/:id/edit' });
  });
});

App.PostsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('post');
  }
});

App.PostsNewController = Ember.Controller.extend({
  clearForm: function() {
    this.set('newTitle', '');
    this.set('newBody', '');
  },

  actions: {
    addPost: function() {
      var post = this.store.createRecord('post', {
        title: this.get('newTitle'),
        body: this.get('newBody')
      });
      post.save();
      this.clearForm();
      this.transitionToRoute('posts');
    }
  }
});