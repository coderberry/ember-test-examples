emq.globalize();
setResolver(App.__container__);
Ember.setupForTesting();

var data;

moduleFor('controller:index', 'Unit: controller/index', {
  setup: function() {
    data = [
      { title: 'Eloquent JavaScript', author: 'Marijn Haverbecke' },
      { title: 'The Book of JavaScript, 2nd Edition', author: 'Dave Thau!' },
      { title: 'JavaScript, The Definitive Guide, 6th Ed.', author: 'David Flanagan' },
      { title: 'Effective JavaScript', author: 'David Herman' },
      { title: 'Pro JavaScript Performance', author: 'Tom Barker' },
      { title: 'High-Performance JavaScript', author: 'Nicholas Zakas' }
    ];
  }
});
 
test('filteredBooks with empty search text returns full list', function() {
  var controller = this.subject({ content: data });
  equal(controller.get('filteredBooks'), data);
  Ember.run(function() {
    controller.set('searchText', 'performance');
  });
  equal(controller.get('filteredBooks.length'), 2);
  equal(controller.get('filteredBooks.firstObject.author'), 'Tom Barker');
});
