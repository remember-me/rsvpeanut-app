import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "div",
  classNames: ['learn-section'],

  baseImageUrl: "assets/images",

  learnImageUrl: function(){
    return this.get('baseImageUrl') + "/mapboxphoto.png";
  }.property('baseImageUrl')

});
