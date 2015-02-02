import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "nav",
  classNames: ['fixed-nav-bar'],

  didInsertElement: function() {
    this.$().foundation(); //or Ember.$(document).foundation();
  }
});
