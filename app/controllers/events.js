import Ember from 'ember';
import mapEvents from '../data/data';

export default Ember.Controller.extend({

  isPopular: false,

  catagories: {valid: []},

  dates: function() {
    var currentDate = new Date();
    var nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);
    return { start: currentDate, end: nextWeek };
  }.on('didInsertElement'),

  filterPopularity: function(elements) {
    // var currentDate = new Date();
    // var nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);
    // return { start: currentDate, end: nextWeek }
    debugger;
    return elements;
  },

  filterDates: function(elements) {
    // var currentDate = new Date();
    // var nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);
    // return { start: currentDate, end: nextWeek }
    debugger;
    return elements;
  },

  filterCatagories: function(elements) {
    // var currentDate = new Date();
    // var nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);
    // return { start: currentDate, end: nextWeek }
    debugger;
    return elements;
  },

  // I have to decalre computed property to get events
  filteredEvents: function () {
    var filteredEvents = { events: [] }
    // This is where I put the filtered Functions
    debugger;
    var events = this.get('model.content.events');
    debugger;
    events = filterCatagories(events);
    events = filterDates(events);
    events = filterPopularity(events);
    return events;
  //}.property('model.@each'),
  }.on('didInsertElement'),

  actions: {
    setCatagory: function(cats) {
      var catagories = cats;
      debugger;
      // this.set('catagories', {valid: catagories} )
    },
    setDate: function(date) {
      var startDate = date.start;
      var endDate = date.end;
      debugger;
      // this.set('dates', {start: startDate, end: endDate})
    },
    setPopularity: function(){
      debugger;
      this.toggleProperty('isPopular');
    },
  }


});


