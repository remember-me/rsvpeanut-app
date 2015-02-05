import Ember from 'ember';
// import { L as L } from 'mapbox.js';

export default Ember.Component.extend({
  classNames: ['map'],

  map: {},

  setup: function() {
    L.mapbox.accessToken = 'pk.eyJ1IjoiYWZvcmQiLCJhIjoiZ2RNeFNBMCJ9.Cv94HqHAWfhIuE6vx7QMlw';
    var map = L.mapbox.map('map', 'aford.l4a1dfc2');
    this.set('map', map);
  }.on('didInsertElement'),

  dropMarkers: function() {
    var events = this.get('events.content');
    var map = this.get('map');
    events.forEach( function(event){
      var lat = parseFloat(event.get('lat'));
      var long = parseFloat(event.get('long'));
      if( lat && long ){
        L.marker([lat, long]).addTo(map);
      }
    });
  }.observes('events.@each')
  
});