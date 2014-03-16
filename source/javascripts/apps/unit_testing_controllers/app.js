App = Ember.Application.create({
  rootElement: '#ember-testing'
});

App.Router.map(function() {});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return [
      { title: 'Eloquent JavaScript', author: 'Marijn Haverbecke' },
      { title: 'The Book of JavaScript, 2nd Edition', author: 'Dave Thau!' },
      { title: 'JavaScript, The Definitive Guide, 6th Ed.', author: 'David Flanagan' },
      { title: 'Effective JavaScript', author: 'David Herman' },
      { title: 'Pro JavaScript Performance', author: 'Tom Barker' },
      { title: 'High-Performance JavaScript', author: 'Nicholas Zakas' }
    ];
  }
});

App.IndexController = Ember.ArrayController.extend({
  searchText: null,
  
  filteredBooks: function() {
    var searchText  = this.get('searchText');
    if (Em.isEmpty(searchText)) {
      return this.get('content');
    } else {
      return this.get('content').filter(function(book) {
        var title = book.title.toLowerCase();
        console.log(title);
        return title.match(searchText.toLowerCase());
      });
    }
  }.property('content.@each', 'searchText')
});