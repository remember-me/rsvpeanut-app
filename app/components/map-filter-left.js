import Ember from 'ember';

export default Ember.Component.extend({
  tagName: ['div'],
  attributeBindings: ['id'],
  classNames: ['map-container'],

  isDisplayed: false,

  actions: {
    toggleBody: function(){
      this.toggleProperty('isDisplayed');
    },

  },

  didInsertElement: function() {
    this.$().foundation(); //or Ember.$(document).foundation();
  }

});





