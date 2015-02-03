import Ember from 'ember';

export default Ember.TextField.reopen({
  attributeBindings: ['data-toggle', 'data-placement', 'data-date-format', 'placeholder']
});