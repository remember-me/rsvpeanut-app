import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "div",
  classNames: ['hero'],

  baseUrl: "assets/images",

  heroImage: true,

  heroUrl: function(){
    return this.get('baseUrl') + "/sxsw6.png";
  }.property('baseUrl')

});
