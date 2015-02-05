import Ember from 'ember';

export default Ember.Controller.extend({

  isPopular: false,

  // categories = {
  //   category_name: selected (boolean),
  //   ...
  //   category_name: selected (boolean)
  // }
  categories: function() {
    var events = this.get('model');
    var eventTypes = events
    .map( function(event) {
      return event.get('event_type');
    })
    .filter( function(type,idx,a){
      return idx === a.indexOf(type);
    });

    var categories = {};
    eventTypes.forEach(function(type) {
      categories[type] = true;
    });

    return categories;
    
  }.property('model.@each'),

  // dates = {
  //   utcStartDate: "start" (UTC Date - String),
  //   utcEndDate:   "end"   (UTC Date - String)
  // }
  dates: function() {
    var currentDate = new Date();
    var nextWeek = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    return { utcStartDate: currentDate, utcEndDate: nextWeek };
  }.property('model.@each'),

  popularCnt: 30,

  // If isPopular is true, select only 
  filterPopularity: function(events) {
    var minPopularCount = this.get('popularCnt');
    if (this.get('isPopular')) {
      return events.filter(function(event){
        return event.get('attendees') >= minPopularCount;
      });
    } else {
      return events;
    }
  },

  filterDates: function(events) {
    // TODO - Test startDate and endDate and make sure they are UTC format
    var dates = this.get('dates');
    return events.filter(function(event){
      var start = new Date(event.get('utc_start'));
      var end   = new Date(event.get('utc_start'));
      return dates.utcStartDate <= start && dates.utcEndDate >= end;
    });
  },

  filterCategories: function(events) {
    var categories = this.get('categories');
    return events.filter(function(event){
      return categories[event.get('event_type')];
    });
  },

  // I have to decalre computed property to get events
  filteredEvents: function () {
    var filteredEvents = this.get('model.content');
    if (filteredEvents) {
      filteredEvents = this.filterCategories(filteredEvents);
      filteredEvents = this.filterDates(filteredEvents);
      filteredEvents = this.filterPopularity(filteredEvents);
    }
    return filteredEvents;
  }.property('model', 'isPopular', 'categories', 'dates'),
  // }.property('model.@each'),

  actions: {
    updateDates: function(dates) {
      debugger;
      this.set('dates', {utcStartDate: dates.start, utcEndDate: dates.end});
    },

    updateCategories: function(categories) {
      debugger;
      this.set('categories', categories);
    }
  }


});


