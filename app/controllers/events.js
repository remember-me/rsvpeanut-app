import Ember from 'ember';

export default Ember.Controller.extend({

  isPopular: false,

  catagories: {valid: []},

  dates: function() {
    var currentDate = new Date();
    var nextWeek = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    return { start: currentDate, end: nextWeek };
  },

  filterPopularity: function(contents) {
    if (this.get('isPopular')) {
      return contents.filter(function(content){
        return content.get('attendees') >= 30
      })
    } else {
      return contents
    }
  },

  filterDates: function(contents) {
    // var currentDate = new Date();
    // var nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);
    // return { start: currentDate, end: nextWeek }
    debugger;
    return contents.filter(function(content){
      return content.get('attendees') >= 20
    })
  },

  filterCatagories: function(contents) {
    // var currentDate = new Date();
    // var nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);
    // return { start: currentDate, end: nextWeek }
    debugger;
    return contents.filter(function(content){
      return content.get('attendees') >= 20
    })
  },

  // I have to decalre computed property to get events
  filteredEvents: function () {
    debugger;
    var filteredEvents = this.get('model.content');
    //filteredEvents = filterCatagories(filteredEvents);
    //filteredEvents = filterDates(filteredEvents);
    filteredEvents = this.filterPopularity(filteredEvents);
    return filteredEvents;
  }.property('model.@each', 'isPopular', 'catagories', 'dates'),

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
  }


});


