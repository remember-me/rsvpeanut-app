import Ember from 'ember';
import TextField from '../overrides/textfield';

export default Ember.Component.extend({
  classNames: ['filter-section'],

  attributeBindings: ['id'],

  isPopularToggled: false,

  id: "filter-section",

  actions: {
    buildQuery: function() {
      var query = this.get('location');
      console.log(query);
      this.sendAction('search', {address: query} );
    },

  }

});