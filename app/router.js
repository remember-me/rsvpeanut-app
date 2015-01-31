import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("events", function() {
    this.route("event", {
      path: ":event_id"
    });
  });
  this.route("users", function() {
    this.route("new");

    this.route("user", {
      path: ":user_id"
    });
  });
  this.route("itineraries", function() {
    this.route("new");

    this.route("itinerary", {
      path: ":itinerary_id"
    });
  });
});

export default Router;
