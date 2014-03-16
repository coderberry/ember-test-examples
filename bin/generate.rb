require 'fileutils'
require 'pry'

class Generator

  APP_JS = <<-EOS
App = Ember.Application.create({
  rootElement: '#ember-app'
});
 
App.Router.map(function() {
  // put your routes here
});
 
App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});
  EOS

  TEST_JS = <<-EOS
emq.globalize();
App.setupForTesting();
App.injectTestHelpers();
 
module('Integration');
 
test('/', function() {
  visit('/');
  andThen(function() {
    equal(find('ul li').length, 3);
  });
});
  EOS

  def erb_content
    content = <<-EOS
---
title: #{@app_title}
javascripts: #{@app_name}
jsbin: #{@jsbin}
---

<script type="text/x-handlebars">
  <h2> Welcome to Ember.js</h2>

  {{outlet}}
</script>

<script type="text/x-handlebars" data-template-name="index">
  <ul>
  {{#each item in model}}
    <li>{{item}}</li>
  {{/each}}
  </ul>
</script>
    EOS
    content
  end

  def initialize(app_name, app_title)
    @app_name = app_name
    @app_title = app_title
  end

  def generate!
    if !self.exists?
      generate_js!
      generate_erb!
      append_to_index!
      puts "DONE!"
    else
      puts "App already exists!"
    end
  end

  def source_path
    File.expand_path("../../source", __FILE__)
  end

  def exists?
    path = File.expand_path(self.source_path + "/apps/#{@app_name}.html.erb", __FILE__)
    File.exists?(path)
  end

  def generate_js!
    begin
      Dir.mkdir(File.join(source_path, "javascripts", "apps", @app_name), 0700)
      puts "- Created folder: source/javascripts/apps/#{@app_name}"
    rescue
    end
    File.open(source_path + "/javascripts/apps/#{@app_name}/app.js", 'w') {|f| f.write(APP_JS) }
    puts "- Created file: source/javascripts/apps/#{@app_name}/app.js"
    File.open(source_path + "/javascripts/apps/#{@app_name}/tests.js", 'w') {|f| f.write(TEST_JS) }
    puts "- Created file: source/javascripts/apps/#{@app_name}/tests.js"
  end

  def generate_erb!
    content = self.erb_content
    File.open(source_path + "/apps/#{@app_name}.html.erb", 'w') {|f| f.write(content) }
    puts "- Created file: source/apps/#{@app_name}.html.erb"
  end

  def append_to_index!
    File.open(source_path + "/index.html.erb", "a") { |f|
      f.write("\n  <li><a href=\"/apps/#{@app_name}.html\">#{@app_title}</a></li>")
    }
    puts "- Added app to index"
  end
end

prompt = '> '

puts "What is the app name (underscored)?"
print prompt
app_name = STDIN.gets.chomp()

puts "What is the app title?"
print prompt
app_title = STDIN.gets.chomp()

if app_name.length > 0
  generator = Generator.new(app_name, app_title)
  generator.generate!
end
