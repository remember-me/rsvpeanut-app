import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    search: function(query){
      var store = this.store;
      store.find('event', { location: query })
      .then(function(){
        alert('Requested Events for ' + query + '!');
      })
      .catch(function(){
        alert('Failed to request Events for ' + query + '!');
      });
    },
  }
});


