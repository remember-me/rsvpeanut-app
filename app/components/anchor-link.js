import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'a',

  attributeBindings: ['hrefAnchorTag:href'],

  hrefAnchorTag: function() {
    var customHref = this.get('customHref');
    return customHref ? "#" + customHref : "#";
  }.property('customHref')

});