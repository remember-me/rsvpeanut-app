import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['filter-vertical-left'],

  actions: {
    filterByCatagory: function() {
      var catagories = this.get('catagories');
      debugger;
      console.log(catagories);
      this.sendAction('validCatagory', {catagories: catagories} );
    },

  }

});
