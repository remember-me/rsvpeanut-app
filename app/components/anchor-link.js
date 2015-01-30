import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'a',

  attributeBindings: ['customLink:href'],
  
  customLink: "#"

});