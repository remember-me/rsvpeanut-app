import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "li",

  classNames: ['user-info'],

  isDisplayed: false,

  actions: {
    toggleBody: function(){
      this.toggleProperty('isDisplayed');
    },
  }
});
