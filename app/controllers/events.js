import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    search: function(query){
      debugger;
      console.log("Searching for " + query);
    },
  }
});


