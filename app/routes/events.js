import Ember from 'ember';
import data from '../data/data';

export default Ember.Route.extend({

  model: function() {
    this.store.pushPayload('event', data);
    return this.store.all('event');
  },

  actions: {
    search: function(query){
      var store = this.store;
      var location = query.location;
      // THE BELOW IS EQUIVALENT BUT SLOWER
      var _this = this;
      store.find('event', query)
      .then(function(result){
        _this.set("model", result);
        alert('Requested Events for ' + location + '!');
      })
      .catch(function(){
        alert('Failed to request Events for ' + location + '!');
      });
      // store.find('event', query)
      // .then(()=>{
      //   this.set("model", result);
      //   alert('Requested Events for ' + location + '!');
      // })
      // .catch(function(){
      //   alert('Failed to request Events for ' + location + '!');
      // });
    }
  }
});
