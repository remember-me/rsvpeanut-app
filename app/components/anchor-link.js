import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'a',

  attributeBindings: ['hrefAnchorTag:href',
    'customModal:data-reveal-id',
    'id'],


  customModal: function() {
    var customModal = this.get('modal');
    return customModal ? customModal : null;
  }.property('modal'),

  hrefAnchorTag: function() {
    var customHref = this.get('customHref');
    return customHref ? "#" + customHref : "#";
  }.property('customHref')

});