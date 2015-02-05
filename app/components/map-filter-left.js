import Ember from 'ember';

export default Ember.Component.extend({
  tagName: ['div'],
  attributeBindings: ['id'],
  classNames: ['map-container'],

  actions: {
    selectCategory: function() {
      // TODO - update the start date and end date
      debugger;
      var categories = this.get('categories');
      this.sendAction('updateCategories', categories);
    },

  },


  didInsertElement: function() {
    this.$().foundation(); //or Ember.$(document).foundation();
  }

});





