import Ember from 'ember';

export default Ember.Component.extend({
  tagName: ['div'],
  attributeBindings: ['id']

  actions: {
    selectCategory: function() {
      // TODO - update the start date and end date
      debugger;
      var categories = this.get('categories');
      this.sendAction('updateCategories', categories);
    },

  }

});

