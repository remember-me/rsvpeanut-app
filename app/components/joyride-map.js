import Ember from 'ember';

export default Ember.Component.extend({
   
 didInsertElement: function() {

    this.$("#joyrideDiv").foundation('joyride', 'start');
  }
 // also have the button action in map-filter.hbs.
});

