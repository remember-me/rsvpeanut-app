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
    var geojson = { "type": "FeatureCollection", "features": [] };
    
    // Build All Pin Markers for this new layer
    // var markers = [];
    events.forEach( function(event){
      var lat = parseFloat(event.get('lat'));
      var long = parseFloat(event.get('long'));
      var description = event.get('description') || "";
      var category = event.get('category') || "";

      var title_str = event.get('name') || "";

      var description_str = "";
      if (description && category) {
        description_str = description + "\n" + "category: " + category;
      } else if (description) {
        description_str = description;
      } else if (category) {
        description_str = "category: " + category;
      }

      if( lat && long ){
        geojson['features'].push(
          {
            "type": "Feature", 
            "geometry": 
            {
              "type": "Point",
              "coordinates": [long,lat]
            },
            'properties': {
              "title": title_str,
              "description": description_str,
              'marker-color': "#03A9F4"
            }
          });
      }
    });
    
    var featureLayer = this.buildFeatureLayer(geojson);

    this.removeLayer();

    this.set('layer', featureLayer);
    
    map.fitBounds(featureLayer.getBounds());
            
    console.log("Droping " + events.length + " Events!");
/*
    
    var newLayer = L.layerGroup(markers); // Get new Current Layer of markers
    this.removeLayer();                   // Remove Previous Filtered Layer
    newLayer.addTo(map);                  // Add Filtered Layer to Map
    this.set('layer', newLayer);
*/          // Set New Layer in Controller  
  }.observes('events.@each'),
  
  buildFeatureLayer: function(geojson) {
    var map = this.get('map');
    return L.mapbox.featureLayer(geojson).addTo(map);
  },
  
  removeLayer: function() {
    var currentLayer = this.get('layer');
    var map = this.get('map');
    if (currentLayer) {
      map.removeLayer(currentLayer);
    }
  }
});