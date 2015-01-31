import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  password: DS.attr('string'),
  first: DS.attr('string'),
  last: DS.attr('string'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date')
});
