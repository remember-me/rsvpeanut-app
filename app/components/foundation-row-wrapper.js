import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['row'],

  containerSizes: function() {
    return this.get('divSubClassNames');
  }.property('divSubClassNames')
});
