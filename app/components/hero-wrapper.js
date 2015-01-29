import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "div",
  classNames: ['hero'],

  baseImageUrl: "assets/images",

  heroImage: true,

  heroUrl: function(){
    return this.get('baseImageUrl') + "/sxsw6.png";
  }.property('baseImageUrl')

});
