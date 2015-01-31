import DS from 'ember-data';

export default DS.ActiveModelAdapter.extend({
  host: 'http://rsvpeanut.herokuapp.com',
  headers: {
    'Accept': 'application/json, text/html, text/javascript'
  }
});
