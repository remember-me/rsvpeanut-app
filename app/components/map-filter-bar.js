import Ember from 'ember';
import TextField from '../overrides/textfield';

export default Ember.Component.extend({
  classNames: ['filter-section'],

  attributeBindings: ['id'],

  isPopularToggled: false,

  dateRange: null,

  id: "filter-section",

  actions: {
    buildQuery: function() {
      var query = this.get('location');
      console.log(query);
      this.sendAction('search', {address: query} );
    },

    selectDate: function() {
      // TODO - update the start date and end date
      debugger;
      var start = new Date(this.get('startDate'));
      var end   = new Date(this.get('endDate'));
      this.sendAction('updateDates', {start: start, end: end});
    }
  }

});