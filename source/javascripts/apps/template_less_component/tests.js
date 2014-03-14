App.setupForTesting();
App.injectTestHelpers();
emq.globalize();
setResolver(App.__container__);

moduleForComponent('template-less');

test("template", function() {
  var component = this.subject();
  ok(this.$());
  equal(this.$().html(), '<span class="look-ma-no-template"></span>');
});
