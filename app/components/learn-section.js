import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "section",
  classNames: ['learn-section'],

  baseImageUrl: "assets/images",

  learnImageUrl: function(){
    return this.get('baseImageUrl') + "/strava-ex.jpg";
  }.property('baseImageUrl')

});
