import Ember from 'ember';
import mapEvents from '../data/data';

export default Ember.Controller.extend({

  isPopularFilter: false,

  // I have to decalre computed property to get events
  filteredEvents: function () {
    // This is where I put the filtered Functions
    return this.get('model');
  }.property('model.@each'),

  actions: {
    
  }
});


