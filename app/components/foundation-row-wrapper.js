import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "div",
  classNames: ['row'],

  containerSizes: function() {
    return this.get('divSubClassNames');
  }.property('divSubClassNames')
});
