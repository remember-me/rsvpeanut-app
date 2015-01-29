import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'a',

  attributeBindings: ['href'],
  
  href: "#",

  customizeHref: function() {
    this.set('href', this.get('customHref') );
  }.property('customHref')
});