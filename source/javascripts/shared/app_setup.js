App = Ember.Application.create();
App.ApplicationSerializer = DS.ActiveModelSerializer;
App.Store = DS.Store.extend({
  adapter: DS.RESTAdapter.extend({
    namespace: 'api/v1'
  })
});
