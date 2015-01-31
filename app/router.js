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
    this.route("user", {
      path: ":user_id"
    });
    this.route("new");
  });
  this.route("itinerary");
});

export default Router;
