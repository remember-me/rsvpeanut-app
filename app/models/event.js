import DS from 'ember-data';

export default DS.Model.extend({
  attendees: DS.attr('number'),
  description: DS.attr('string'),
  event_type: DS.attr('string'),
  event_url: DS.attr('string'),
  location: DS.attr('string'),
  lat: DS.attr('number'),
  long: DS.attr('number'),
  name: DS.attr('string'),
  source: DS.attr('string'),
  utc_start: DS.attr('date'),
  utc_end: DS.attr('date'),
  // venue: DS.attr('string')
});
