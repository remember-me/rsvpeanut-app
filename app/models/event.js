import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  event_type: DS.attr('string'),
  location: DS.attr('string'),
  event_start: DS.attr('date'),
  event_end: DS.attr('date'),
  attendees: DS.attr('number'),
  cost: DS.attr('number'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),
  description: DS.attr('string'),
  lat: DS.attr('string'), 
  long: DS.attr('string'), 
  event_url: DS.attr('string'),
  source: DS.attr('string')
});
