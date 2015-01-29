import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return {  
      "events":[  
      {  
        "id":1,
        "name":"Good ole Hodown",
        "event_type":"Party",
        "location":"123 Austin St",
        "event_start":null,
        "event_end":null,
        "attendees":50,
        "cost":3.4,
        "created_at":"2015-01-28T16:35:54.233Z",
        "updated_at":"2015-01-28T16:35:54.233Z",
        "description":"old fashioned fun",
        "lat":"30.269873",
        "long":"-97.742105",
        "event_url":"http://www.meetup.com/austinrb/events/219854095/",
        "source":"meetup"
      },
      {  
        "id":2,
        "name":"Good ole Hodown",
        "event_type":"Party",
        "location":"123 Austin St",
        "event_start":null,
        "event_end":null,
        "attendees":50,
        "cost":3.4,
        "created_at":"2015-01-28T19:06:42.418Z",
        "updated_at":"2015-01-28T19:06:42.418Z",
        "description":"old fashioned fun",
        "lat":"30.269873",
        "long":"-97.742105",
        "event_url":"http://www.meetup.com/austinrb/events/219854095/",
        "source":"meetup"
      },
      {  
        "id":3,
        "name":"Bad ole Hodown",
        "event_type":"Party",
        "location":"125 Austin St",
        "event_start":null,
        "event_end":null,
        "attendees":35,
        "cost":5.0,
        "created_at":"2015-01-28T19:06:42.424Z",
        "updated_at":"2015-01-28T19:06:42.424Z",
        "description":"bad fashioned fun",
        "lat":"30.269873",
        "long":"-97.742105",
        "event_url":"http://www.meetup.com/austinrb/events/219854095/",
        "source":"eventbrite"
      },
      {  
        "id":4,
        "name":"Super awesome drunk stuff",
        "event_type":"Art show",
        "location":"127 Austin St",
        "event_start":null,
        "event_end":null,
        "attendees":37,
        "cost":5.0,
        "created_at":"2015-01-28T19:06:42.427Z",
        "updated_at":"2015-01-28T19:06:42.427Z",
        "description":"bad fashioned fun",
        "lat":"30.269873",
        "long":"-97.742105",
        "event_url":"http://www.meetup.com/austinrb/events/219854095/",
        "source":"songkick"
      },
      {  
        "id":5,
        "name":"Super awesome drunk stuff part 2",
        "event_type":"Art show",
        "location":"127 Austin St",
        "event_start":null,
        "event_end":null,
        "attendees":37,
        "cost":5.0,
        "created_at":"2015-01-28T19:06:42.429Z",
        "updated_at":"2015-01-28T19:06:42.429Z",
        "description":"bad fashioned fun",
        "lat":"30.269873",
        "long":"-97.742105",
        "event_url":"http://www.meetup.com/austinrb/events/219854095/",
        "source":"songkick"
      } ]
    };
  }
});
