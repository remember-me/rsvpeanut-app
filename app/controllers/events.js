import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    searchLocation: function(query){
      console.log("Searching for " + query);
    },
  }
});


