import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    var store = this.store;
    var query = {
      location: "Austin, TX",
    };
    return store.find("event", query)
  },

  setupController: function (controller, model) {
    controller.set('events', model.content);
  }

});
