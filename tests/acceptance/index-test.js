import Ember from 'ember';
import startApp from '../helpers/start-app';

var application;

module('Acceptance: Index', {
  setup: function() {
    application = startApp();
  },
  teardown: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /index', function() {
  visit('/index');

  andThen(function() {
    equal(currentPath(), 'index');
  });
});
