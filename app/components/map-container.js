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
    var events = this.get('events');
    var map = this.get('map');
    
    // Build All Pin Markers for this new layer
    var markers = [];
    events.forEach( function(event){
      var lat = parseFloat(event.get('lat'));
      var long = parseFloat(event.get('long'));
      if( lat && long ){
        markers.push(L.marker([lat, long]));
      }
    });

    console.log("Droping " + events.length + " Events!");

    var newLayer = L.layerGroup(markers); // Get new Current Layer of markers
    this.removeLayer();                   // Remove Previous Filtered Layer
    newLayer.addTo(map);                  // Add Filtered Layer to Map
    this.set('layer', newLayer);          // Set New Layer in Controller 
  }.observes('events.@each'),

  removeLayer: function() {
    var currentLayer = this.get('layer');
    var map = this.get('map');
    if (currentLayer) {
      map.removeLayer(currentLayer);
    }
  }
});