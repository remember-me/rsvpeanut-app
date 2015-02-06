import Ember from 'ember';

export default Ember.Component.extend({
  tagName: ['div'],
  attributeBindings: ['id'],
  classNames: ['map-container'],

  isDisplayed: false,

  didInsertElement: function() {
    this.$().foundation(); //or Ember.$(document).foundation();
  }

});





