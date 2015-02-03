import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    search: function(query){
      var store = this.store;
      var location = query.location;
      store.find('event', query)
      .then(function(){
        alert('Requested Events for ' + location + '!');
      })
      .catch(function(){
        alert('Failed to request Events for ' + location + '!');
      });
    },
  }
});


