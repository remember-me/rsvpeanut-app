import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['filter-section'],

  attributeBindings: ['id'],

  id: "filter-section",

  actions: {
    buildQuery: function() {
      var query = this.get('location');
      console.log(query);
      this.sendAction('action', query);
    },
  }

});