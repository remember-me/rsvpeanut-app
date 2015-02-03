import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['filter-section'],

  attributeBindings: ['id'],

  id: "filter-section",

  actions: {
    searchLocation: function(){
      var query = this.get('location');
      console.log("Searching for " + query);
    },
  }

});