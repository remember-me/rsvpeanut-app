import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("events");
  this.route("users");
  this.route("itinerary");
});

export default Router;
