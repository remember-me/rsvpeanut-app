define('master-plan-app/adapters/application', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].ActiveModelAdapter.extend({
    host: "http://rsvpeanut.herokuapp.com",
    headers: {
      Accept: "application/json, text/html, text/javascript"
    }
  });

});
define('master-plan-app/adapters/event', ['exports', './application'], function (exports, ApplicationAdapter) {

	'use strict';

	exports['default'] = ApplicationAdapter['default'].extend({});

});
define('master-plan-app/adapters/user', ['exports', './application'], function (exports, ApplicationAdapter) {

	'use strict';

	exports['default'] = ApplicationAdapter['default'].extend({});

});
define('master-plan-app/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', './config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  var App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('master-plan-app/components/about-section', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    tagName: ["div"],
    classNames: ["about-section"],

    aboutTiles: [{
      id: 1,
      text: "create a custom plan of things to do",
      img: "assets/images/create.png",
      attrId: "step-icon"
    }, {
      id: 2,
      text: "filter your events to create a custom map",
      img: "assets/images/filter.png",
      attrId: "step-icon"
    }, {
      id: 3,
      text: "view your plan on a map and explore",
      img: "assets/images/map.png",
      attrId: "step-icon"
    }]
  });

});
define('master-plan-app/components/anchor-link', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    tagName: "a",

    attributeBindings: ["hrefAnchorTag:href", "customModal:data-reveal-id", "id"],


    customModal: (function () {
      var customModal = this.get("modal");
      return customModal ? customModal : null;
    }).property("modal"),

    hrefAnchorTag: (function () {
      var customHref = this.get("customHref");
      return customHref ? "#" + customHref : "#";
    }).property("customHref")

  });

});
define('master-plan-app/components/fixed-nav-bar', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    tagName: "nav",
    classNames: ["fixed-nav-bar"],

    didInsertElement: function () {
      this.$().foundation(); //or Ember.$(document).foundation();
    }
  });

});
define('master-plan-app/components/footer-wrap', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    classNames: ["footer-section"]

  });

});
define('master-plan-app/components/foundation-row-wrapper', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    classNames: ["row"],

    containerSizes: (function () {
      return this.get("divSubClassNames");
    }).property("divSubClassNames")
  });

});
define('master-plan-app/components/hero-wrapper', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    tagName: "div",
    classNames: ["hero-words"],

    baseImageUrl: "assets/images",

    heroImage: true,

    heroButtons: [{
      id: 1,
      "class": "button radius",
      attrId: "hero-button1",
      content: "Get Started",
      anchor: "start"
    }, {
      id: 2,
      "class": "button radius",
      attrId: "hero-button2",
      content: "Learn More",
      anchor: "learn"
    }],

    heroUrl: (function () {
      return this.get("baseImageUrl") + "/sxsw6.png";
    }).property("baseImageUrl")

  });

});
define('master-plan-app/components/joyride-map', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Component.extend({});


	// didInsertElement: function() {

	//   this.$("#joyrideDiv").foundation('joyride', 'start');
	// }

});
define('master-plan-app/components/learn-section', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    tagName: "div",
    classNames: ["learn-section"],

    baseImageUrl: "assets/images",

    learnImageUrl: (function () {
      return this.get("baseImageUrl") + "/mapboxphoto.png";
    }).property("baseImageUrl")

  });

});
define('master-plan-app/components/map-container', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    classNames: ["map"],

    map: {},

    setup: (function () {
      L.mapbox.accessToken = "pk.eyJ1IjoiYWZvcmQiLCJhIjoiZ2RNeFNBMCJ9.Cv94HqHAWfhIuE6vx7QMlw";
      var map = L.mapbox.map("map", "aford.l4a1dfc2");
      this.set("map", map);
    }).on("didInsertElement"),

    dropMarkers: (function () {
      var events = this.get("events");
      var map = this.get("map");
      var geojson = { type: "FeatureCollection", features: [] };

      // Build All Pin Markers for this new layer
      // var markers = [];
      events.forEach(function (event) {
        var lat = parseFloat(event.get("lat"));
        var long = parseFloat(event.get("long"));
        var description = event.get("description") || "";
        var category = event.get("category") || "";

        var title_str = event.get("name") || "";

        var description_str = "";
        if (description && category) {
          description_str = description + "\n" + "category: " + category;
        } else if (description) {
          description_str = description;
        } else if (category) {
          description_str = "category: " + category;
        }

        if (lat && long) {
          geojson.features.push({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [long, lat]
            },
            properties: {
              title: title_str,
              description: description_str,
              "marker-color": "#03A9F4"
            }
          });
        }
      });

      var featureLayer = this.buildFeatureLayer(geojson);

      this.removeLayer();

      this.set("layer", featureLayer);

      map.fitBounds(featureLayer.getBounds());

      console.log("Droping " + events.length + " Events!");
      /*
          
          var newLayer = L.layerGroup(markers); // Get new Current Layer of markers
          this.removeLayer();                   // Remove Previous Filtered Layer
          newLayer.addTo(map);                  // Add Filtered Layer to Map
          this.set('layer', newLayer);
      */ // Set New Layer in Controller
    }).observes("events.@each"),

    buildFeatureLayer: function (geojson) {
      var map = this.get("map");
      return L.mapbox.featureLayer(geojson).addTo(map);
    },

    removeLayer: function () {
      var currentLayer = this.get("layer");
      var map = this.get("map");
      if (currentLayer) {
        map.removeLayer(currentLayer);
      }
    }
  });

});
define('master-plan-app/components/map-filter-bar', ['exports', 'ember', '../overrides/textfield'], function (exports, Ember, TextField) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    classNames: ["filter-section"],

    attributeBindings: ["id"],

    isPopularToggled: false,

    dateRange: null,

    id: "filter-section",

    actions: {
      buildQuery: function () {
        var query = this.get("location");
        console.log(query);
        this.sendAction("search", { address: query });
      } }

  });

});
define('master-plan-app/components/map-filter-left', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    tagName: ["div"],
    attributeBindings: ["id"],
    classNames: ["map-container"],

    isDisplayed: false,

    didInsertElement: function () {
      this.$().foundation(); //or Ember.$(document).foundation();
    }

  });

});
define('master-plan-app/components/map-filter-right', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Component.extend({});

});
define('master-plan-app/components/map-title', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Component.extend({});

});
define('master-plan-app/components/signin-modal', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    classNames: ["reveal-modal"],

    attributeBindings: ["modalId:id", "dataReveal:data-reveal"],

    modalId: "signin",
    dataReveal: ""

  });

});
define('master-plan-app/components/signup-modal', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    classNames: ["reveal-modal"],

    attributeBindings: ["modalId:id", "dataReveal:data-reveal"],

    modalId: "signup",
    dataReveal: ""

  });

});
define('master-plan-app/components/team-section', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    tagName: ["div"],
    classNames: ["team-section"],

    attributeBindings: ["team:id"],

    team: "team",

    teamMembers: [{
      id: 1,
      name: "Alex Ford",
      title: "Front-End",
      img: "assets/images/alex.jpg"
    }, {
      id: 2,
      name: "Jessica Meyer",
      title: "Front-End",
      img: "assets/images/jessica.jpg"
    }, {
      id: 3,
      name: "John Goldsmith",
      title: "Back-End",
      img: "assets/images/john.jpg"
    }, {
      id: 4,
      name: "Melizza Patterson",
      title: "Back-End",
      img: "assets/images/melissa.jpeg"
    }, {
      id: 5,
      name: "Spenser Filler",
      title: "Back-End",
      img: "assets/images/spenser.jpeg"
    }]
  });

});
define('master-plan-app/components/user-info', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    tagName: "li",

    classNames: ["user-info"],

    isDisplayed: false,

    actions: {
      toggleBody: function () {
        this.toggleProperty("isDisplayed");
      } }
  });

});
define('master-plan-app/controllers/events', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({

    isPopular: false,

    categories: null,

    dates: null,

    // categories = {
    //   category_name: selected (boolean),
    //   ...
    //   category_name: selected (boolean)
    // }
    buildCategories: (function () {
      var events = this.get("model.content");
      var eventTypes = events.map(function (event) {
        return event.get("event_type");
      }).filter(function (type, idx, a) {
        return idx === a.indexOf(type);
      });

      var categories = [];
      eventTypes.forEach(function (type) {
        categories[type] = true;
        categories.push({ name: type, selected: true });
      });

      this.set("categories", categories);
    }).observes("model.content.@each"),

    // dates = {
    //   utcStartDate: "start" (UTC Date - String),
    //   utcEndDate:   "end"   (UTC Date - String)
    // }
    buildDates: (function () {
      var currentDate = new Date();
      var nextWeek = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
      this.set("dates", { utcStartDate: currentDate, utcEndDate: nextWeek });
    }).observes("model.content.@each"),

    popularCnt: 30,

    // If isPopular is true, select only
    filterPopularity: function (events) {
      var minPopularCount = this.get("popularCnt");
      if (this.get("isPopular")) {
        return events.filter(function (event) {
          return event.get("attendees") >= minPopularCount;
        });
      } else {
        return events;
      }
    },

    filterDates: function (events) {
      // TODO - Test startDate and endDate and make sure they are UTC format
      var dates = this.get("dates");
      return events.filter(function (event) {
        var start = new Date(event.get("utc_start"));
        var end = new Date(event.get("utc_start"));
        return dates.utcStartDate <= start && dates.utcEndDate >= end;
      });
    },

    filterCategories: function (events) {
      var categories = this.get("categories");
      events.forEach(function (event) {
        if (!event.get("event_type")) {
          event.set("event_type", "Unknown");
        }
      });
      return events.filter(function (event) {
        var category = categories.find(function (c) {
          return event.get("event_type") === c.name;
        });
        return category && category.selected;
      });
    },

    // I have to decalre computed property to get events
    filteredEvents: (function () {
      var filteredEvents = this.get("model.content");
      filteredEvents = filteredEvents.filter(function (event) {
        var lat = parseFloat(event.get("lat"));
        var long = parseFloat(event.get("long"));
        return lat && long;
      });
      if (filteredEvents) {
        filteredEvents = this.filterCategories(filteredEvents);
        filteredEvents = this.filterDates(filteredEvents);
        filteredEvents = this.filterPopularity(filteredEvents);
      }
      return filteredEvents;
    }).property("isPopular", "categories.@each.selected", "dates")

  });

});
define('master-plan-app/controllers/users', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({

    currentUser: null,

    actions: {
      signInUser: function () {
        var users = this.get("users");
        var email = this.get("email");
        var password = this.get("password");

        // Find User
        var user = users.find(function (u) {
          var e = u.get("email");
          var p = u.get("password");
          return email === e && password === p;
        });

        if (!user) {
          // user undefined / not found
          alert("User does not exist");
        } else {
          this.set("currentUser", user);
        }
      }
    }
  });

});
define('master-plan-app/controllers/users/new', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    actions: {
      createUser: function () {
        var user = this.store.createRecord("user");
        user.set("first", this.get("first"));
        user.set("last", this.get("last"));
        user.set("email", this.get("email"));
        user.set("password", this.get("password"));

        user.save().then(function () {
          alert("User was saved!");
        })["catch"](function () {
          alert("User had an error");
        });
      }
    }
  });

});
define('master-plan-app/data/data', ['exports'], function (exports) {

  'use strict';

  var data = {

    events: [{
      attendees: null,
      description: null,
      event_type: "Concert",
      event_url: "http://www.songkick.com/concerts/22662488-randy-rogers-at-cheatham-street-warehouse?utm_source=32298&utm_medium=partner",
      location: "Cheatham Street Warehouse",
      lat: 29.8766787,
      long: -97.9396435,
      name: "Randy Rogers at Cheatham Street Warehouse (February 4, 2015)",
      source: "songkick",
      date_start: "2015-02-04",
      date_end: null,
      time_start: "21:00:00",
      time_end: null,
      utc_start: "2015-02-04T21:00:00.000-06:00",
      utc_end: null,
      venue: "Cheatham Street Warehouse",
      id: 1
    }, {
      attendees: 11,
      description: "<p>Source: Austin Polyamory Facebook group.</p> <p>Hello Everyone!</p> <p>Please join us at Central Market for the biggest poly dinner of the month! Parent with kids will start congregating at 5:30, many others at 7 and dinner lasts until 9PM. We usually meet on the patio. There are generally greeters for people who are new to the community (the Newbie Nest). Look for the large party of happily chatting people (and hopefully some form of parrot symbol) and join us!</p> <p>Text Matt[masked] with any questions or if you can't find us.</p>",
      event_type: "Lifestyle",
      event_url: "http://www.meetup.com/The-Metro-Austin-Polyamory-Positive-Relationships-Group/events/220037994/",
      location: "4100 Lamar",
      lat: 30.309303,
      long: -97.740845,
      name: "Facebook: Poly 1st Wednesday (big dinner) Central Market",
      source: "meetup",
      date_start: null,
      date_end: null,
      time_start: null,
      time_end: null,
      utc_start: 1423076400,
      utc_end: null,
      venue: "Central Market",
      id: 51
    }, {
      attendees: 8,
      description: null,
      event_type: "Education & Learning",
      event_url: "http://www.meetup.com/philosophy-31/events/220048663/",
      location: "1301 Shoal Creek ",
      lat: 30.277543,
      long: -97.750221,
      name: "Saturday lecture and forum",
      source: "meetup",
      date_start: null,
      date_end: null,
      time_start: null,
      time_end: null,
      utc_start: 1423306800,
      utc_end: null,
      venue: "Austin Recreation Center",
      id: 56
    }, {
      attendees: null,
      description: "Join Hayley, Bill and Caitlin for a Book Signing in Austin, TX!  \nWe will kick things off with a brief talk and Q&A, then stick around to meet you, answer your questions about any of our books, and (of course) sign copies! \nHope to see you there! \n  \n  \n  \nWe encourage you to support our event host by purchasing a copy of the book at the store. That said, you are also welcome to bring previously purchased books to this event. We are happy to sign as many copies of our books as you wish. You are welcome to bring along your children to the event. They do not need a separate event ticket.",
      event_type: "Food & Drink",
      event_url: "http://www.eventbrite.com/e/austin-book-signing-tickets-15377985970?aff=ebapi",
      location: "4301 West William Cannon Drive",
      lat: 30.2190832,
      long: -97.84262460000002,
      name: "Austin - Book Signing",
      source: "eventbrite",
      date_start: null,
      date_end: null,
      time_start: null,
      time_end: null,
      utc_start: "2015-02-27T16:00:00.000+00:00",
      utc_end: "2015-02-27T18:00:00.000+00:00",
      venue: null,
      id: 484
    }, {
      attendees: null,
      description: "The Austin Modern Home Tour is back!   Created by GoodLife Realty and produced by Modern Home Tours LLC, the 2015 event will again feature cutting edge designs for modern living as well as expanded offerings before and after Tour hours!",
      event_type: "Home & Lifestyle",
      event_url: "http://2015austinmodernhometour.eventbrite.com/?aff=ebapi",
      location: null,
      lat: 30.267153,
      long: -97.74306079999997,
      name: "2015 Austin Modern Home Tour",
      source: "eventbrite",
      date_start: null,
      date_end: null,
      time_start: null,
      time_end: null,
      utc_start: "2015-02-07T10:00:00.000+00:00",
      utc_end: "2015-02-07T17:00:00.000+00:00",
      venue: null,
      id: 488
    }, {
      attendees: null,
      description: "Previous OM Training Required to Attend - How to OM Class or Private Training.)    Set up a partner for your first OM, bring your nest and lube arrive at 6:00pm! Door locks at 6:10pm!",
      event_type: "Other",
      event_url: "http://www.eventbrite.com/e/austin-om-circle-training-required-2-11-2015-tickets-15449058550?aff=ebapi",
      location: "916 Springdale Rd",
      lat: 30.267153,
      long: -97.74306079999997,
      name: "Austin: OM Circle (training required) 2-11-2015",
      source: "eventbrite",
      date_start: null,
      date_end: null,
      time_start: null,
      time_end: null,
      utc_start: "2015-02-11T18:00:00.000+00:00",
      utc_end: "2015-02-11T19:00:00.000+00:00",
      venue: null,
      id: 490
    }, {
      attendees: null,
      description: "Join Us for a selective 15-spot only coaching circle with OneTaste co-founder and senior coach Rob Kandell, a 10+ years Orgasmic Meditation practitioner, trainer, and instructor for a journey through orgasm, relationships, and ignition. Rob excels at seeing people deeply and bringing out their brilliance, he penetrates through internal programs with precision, and wakes people up. Each participant will receive intense individual coaching in a small group setting, and will leave with creative and customized homework that will help them live their purpose in the world.   Robert Kandell has spent the last 10+ years working with literally thousands of people on the charged topics of love, sex, and intimacy with the international company he co-founded, OneTaste. Specializing in communication and interpersonal dynamics, Robert also has extensive acumen in setting up businesses, technology, and customer service and building and inspiring teams.",
      event_type: "Other",
      event_url: "http://www.eventbrite.com/e/austin-robert-kandell-coaching-circle-tickets-14822730185?aff=ebapi",
      location: "916 Springdale Rd",
      lat: 30.267153,
      long: -97.74306079999997,
      name: "Austin: Robert Kandell Coaching Circle",
      source: "eventbrite",
      date_start: null,
      date_end: null,
      time_start: null,
      time_end: null,
      utc_start: "2015-01-30T19:30:00.000+00:00",
      utc_end: "2015-01-30T21:30:00.000+00:00",
      venue: null,
      id: 496
    }, {
      attendees: null,
      description: "On April 25, join us at Shadow Runs around the world.  \nThrough a partnership with the ASU Alumni Association, you can Run/Walk and raise money to support Tillman Military Scholars, the same as you would in Tempe. Shadow Runs will bolster our awareness and fundraising efforts. So if you can’t make the big Tempe event, we’d love you participate in the Shadow Run hosted by the ASU Alumni Association's Austin Chapter, and join others who are passionate about our mission at this casual and fun run.",
      event_type: "Sports & Fitness",
      event_url: "http://www.eventbrite.com/e/austin-tx-pats-run-shadow-run-registration-15034519653?aff=ebapi",
      location: null,
      lat: 30.267153,
      long: -97.74306079999997,
      name: "Austin, TX: Pat's Run Shadow Run",
      source: "eventbrite",
      date_start: null,
      date_end: null,
      time_start: null,
      time_end: null,
      utc_start: "2015-04-25T09:00:00.000+00:00",
      utc_end: "2015-04-25T12:00:00.000+00:00",
      venue: null,
      id: 502
    }]
  };

  exports['default'] = data;

});
define('master-plan-app/initializers/export-application-global', ['exports', 'ember', '../config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    var classifiedName = Ember['default'].String.classify(config['default'].modulePrefix);

    if (config['default'].exportApplicationGlobal) {
      window[classifiedName] = application;
    }
  };

  exports['default'] = {
    name: "export-application-global",

    initialize: initialize
  };

});
define('master-plan-app/models/event', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    attendees: DS['default'].attr("number"),
    description: DS['default'].attr("string"),
    event_type: DS['default'].attr("string"),
    event_url: DS['default'].attr("string"),
    location: DS['default'].attr("string"),
    lat: DS['default'].attr("number"),
    long: DS['default'].attr("number"),
    name: DS['default'].attr("string"),
    cost: DS['default'].attr("number"),
    source: DS['default'].attr("string"),
    date_start: DS['default'].attr("date"),
    date_end: DS['default'].attr("date"),
    time_start: DS['default'].attr("date"),
    time_end: DS['default'].attr("date"),
    utc_start: DS['default'].attr("date"),
    utc_end: DS['default'].attr("date"),
    venue: DS['default'].attr("string")
  });

});
define('master-plan-app/models/itinerary', ['exports', 'ember-data'], function (exports, DS) {

	'use strict';

	exports['default'] = DS['default'].Model.extend({});

});
define('master-plan-app/models/user', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    email: DS['default'].attr("string"),
    password: DS['default'].attr("string"),
    first: DS['default'].attr("string"),
    last: DS['default'].attr("string"),
    created_at: DS['default'].attr("date"),
    updated_at: DS['default'].attr("date")
  });

});
define('master-plan-app/overrides/textfield', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].TextField.reopen({
    attributeBindings: ["data-toggle", "data-placement", "data-date-format", "placeholder"]
  });

});
define('master-plan-app/router', ['exports', 'ember', './config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route("events", function () {
      this.route("event", {
        path: ":event_id"
      });
    });
    this.route("users", function () {
      this.route("new");

      this.route("user", {
        path: ":user_id"
      });
    });
    this.route("itineraries", function () {
      this.route("new");

      this.route("itinerary", {
        path: ":itinerary_id"
      });
    });
  });

  exports['default'] = Router;

});
define('master-plan-app/routes/application', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});


	// activateFoundation: function() {
	//   this.$(document).foundation({
	//   	joyride: {
	//   		template: {
	//   			button: "<a href='#'>XXX</a>"
	//   		},
	//   		autoStart: true
	//     }
	//   });
	// }.on("activate")

});
define('master-plan-app/routes/events', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({

    model: function () {
      // this.store.pushPayload('event', data);
      return this.store.all("event");
    },

    actions: {
      search: function (query) {
        var store = this.store;
        // THE BELOW IS EQUIVALENT BUT SLOWER
        var _this = this;
        store.find("event", query).then(function (result) {
          _this.set("model", result);
          var location = query.address;
          alert("Requested Events for " + location + "!");
        })["catch"](function () {
          var location = query.address;
          alert("Failed to request Events for " + location + "!");
        });
        // store.find('event', query)
        // .then(()=>{
        //   this.set("model", result);
        //   alert('Requested Events for ' + location + '!');
        // })
        // .catch(function(){
        //   alert('Failed to request Events for ' + location + '!');
        // });
      }
    }
  });

});
define('master-plan-app/routes/events/event', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('master-plan-app/routes/index', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function () {
      return this.store.find("user");
    },

    setupController: function (controller, model) {
      // Call _super for default behavior
      this._super(controller, model);
      // Implement your custom setup after
      this.controllerFor("users").set("users", model.content);
    }

  });

});
define('master-plan-app/routes/itineraries', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('master-plan-app/routes/itineraries/itinerary', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('master-plan-app/routes/itineraries/new', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('master-plan-app/routes/users', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function () {
      return this.store.find("user");
    },

    setupController: function (controller, model) {
      controller.set("users", model.content);
    }

    // renderTemplate: function () {
    //   this._super();
    //   this.render('users/new', {
    //     into: 'users',
    //     controller: 'users.new'
    //   });
    // }
  });

});
define('master-plan-app/routes/users/new', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function () {}
  });

});
define('master-plan-app/routes/users/user', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function (params) {
      return this.store.find("user", params.event_id);
    },

    actions: {
      update: function () {
        this.get("currentModel").save();
      }
    }
  });

});
define('master-plan-app/serializers/application', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].ActiveModelSerializer.extend({
    attrs: {
      created_at: { serialize: false },
      updated_at: { serialize: false }
    }
  });

});
define('master-plan-app/templates/application', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

  function program1(depth0,data) {
    
    var buffer = '', stack1, helper, options;
    data.buffer.push("\n  <div class=\"logo-section\"> \n\n    ");
    stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "index", options) : helperMissing.call(depth0, "link-to", "index", options));
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n\n    <div class=\"nav-buttons\">\n      ");
    stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
      'class': ("team")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "events", options) : helperMissing.call(depth0, "link-to", "events", options));
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n      ");
    stack1 = (helper = helpers['anchor-link'] || (depth0 && depth0['anchor-link']),options={hash:{
      'class': ("team"),
      'customHref': ("team")
    },hashTypes:{'class': "STRING",'customHref': "STRING"},hashContexts:{'class': depth0,'customHref': depth0},inverse:self.noop,fn:self.program(6, program6, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "anchor-link", options));
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n      ");
    stack1 = (helper = helpers['anchor-link'] || (depth0 && depth0['anchor-link']),options={hash:{
      'class': ("events signinbutton"),
      'modal': ("signin")
    },hashTypes:{'class': "STRING",'modal': "STRING"},hashContexts:{'class': depth0,'modal': depth0},inverse:self.noop,fn:self.program(8, program8, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "anchor-link", options));
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n      ");
    stack1 = (helper = helpers['anchor-link'] || (depth0 && depth0['anchor-link']),options={hash:{
      'class': ("events signinbutton"),
      'modal': ("signup")
    },hashTypes:{'class': "STRING",'modal': "STRING"},hashContexts:{'class': depth0,'modal': depth0},inverse:self.noop,fn:self.program(10, program10, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "anchor-link", options));
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n      ");
    stack1 = helpers._triageMustache.call(depth0, "signin-modal", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n      ");
    stack1 = helpers._triageMustache.call(depth0, "signup-modal", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n    </div>\n\n  </div>\n");
    return buffer;
    }
  function program2(depth0,data) {
    
    
    data.buffer.push("\n      <img src=\"assets/images/simpletext2.png\" class=\"logo-image\"></img>\n    ");
    }

  function program4(depth0,data) {
    
    
    data.buffer.push("Events");
    }

  function program6(depth0,data) {
    
    
    data.buffer.push("Team");
    }

  function program8(depth0,data) {
    
    
    data.buffer.push("Sign In");
    }

  function program10(depth0,data) {
    
    
    data.buffer.push("Sign Up");
    }

    options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],data:data}
    if (helper = helpers['fixed-nav-bar']) { stack1 = helper.call(depth0, options); }
    else { helper = (depth0 && depth0['fixed-nav-bar']); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
    if (!helpers['fixed-nav-bar']) { stack1 = blockHelperMissing.call(depth0, 'fixed-nav-bar', {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],data:data}); }
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n\n");
    stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n\n");
    stack1 = helpers._triageMustache.call(depth0, "footer-wrap", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n\n\n ");
    return buffer;
    
  });

});
define('master-plan-app/templates/components/about-section', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

  function program1(depth0,data) {
    
    var buffer = '', stack1, helper, options;
    data.buffer.push("\n   \n  <div ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":large-4 :columns :text-center")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(" >\n     <img ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'src': ("tile.img")
    },hashTypes:{'src': "STRING"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression((helper = helpers.bindAttr || (depth0 && depth0.bindAttr),options={hash:{
      'id': ("tile.attrId")
    },hashTypes:{'id': "STRING"},hashContexts:{'id': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bindAttr", options))));
    data.buffer.push(" />\n      <p ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":step-text")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(">\n      	");
    stack1 = helpers._triageMustache.call(depth0, "tile.text", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n      </p>\n    \n  </div>\n  ");
    return buffer;
    }

    data.buffer.push("<!-- about section-->\n<div class=\"row\">\n  ");
    stack1 = helpers.each.call(depth0, "tile", "in", "aboutTiles", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n</div>\n");
    return buffer;
    
  });

});
define('master-plan-app/templates/components/anchor-link', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var stack1;


    stack1 = helpers._triageMustache.call(depth0, "yield", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    else { data.buffer.push(''); }
    
  });

});
define('master-plan-app/templates/components/fixed-nav-bar', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1;


    stack1 = helpers._triageMustache.call(depth0, "yield", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    return buffer;
    
  });

});
define('master-plan-app/templates/components/footer-wrap', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

  function program1(depth0,data) {
    
    
    data.buffer.push("\n\n  <div class=\"footer-wrap\">\n    <span class=\"copyright-text\"> © Copyright RSVPeanut </span>\n    <span class=\"groupgithub\">\n      <a href=\"https://github.com/remember-me\">\n        <img src=\"assets/images/groupgithub.png\"/>\n      </a>\n    </span>\n  </div>\n  \n");
    }

    data.buffer.push("<!--footer-->\n");
    stack1 = (helper = helpers['foundation-row-wrapper'] || (depth0 && depth0['foundation-row-wrapper']),options={hash:{
      'tagName': ("footer"),
      'divSubClassNames': ("large-12 columns")
    },hashTypes:{'tagName': "STRING",'divSubClassNames': "STRING"},hashContexts:{'tagName': depth0,'divSubClassNames': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "foundation-row-wrapper", options));
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    return buffer;
    
  });

});
define('master-plan-app/templates/components/form-field', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


    data.buffer.push("<div class=\"form-group\">\n  <label ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'for': ("label")
    },hashTypes:{'for': "ID"},hashContexts:{'for': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(">");
    stack1 = helpers._triageMustache.call(depth0, "label", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("</label>\n  ");
    data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
      'type': ("type"),
      'value': ("value"),
      'id': ("label"),
      'class': ("form-control")
    },hashTypes:{'type': "ID",'value': "ID",'id': "ID",'class': "STRING"},hashContexts:{'type': depth0,'value': depth0,'id': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
    data.buffer.push("\n</div>");
    return buffer;
    
  });

});
define('master-plan-app/templates/components/foundation-row-wrapper', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1, escapeExpression=this.escapeExpression;


    data.buffer.push("<div ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': ("containerSizes")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(" >\n  ");
    stack1 = helpers._triageMustache.call(depth0, "yield", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n<div>\n");
    return buffer;
    
  });

});
define('master-plan-app/templates/components/hero-wrapper', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

  function program1(depth0,data) {
    
    var buffer = '', stack1, helper, options;
    data.buffer.push("\n    ");
    stack1 = (helper = helpers['anchor-link'] || (depth0 && depth0['anchor-link']),options={hash:{
      'class': ("button.class"),
      'id': ("button.attrId"),
      'customHref': ("button.anchor")
    },hashTypes:{'class': "ID",'id': "ID",'customHref': "ID"},hashContexts:{'class': depth0,'id': depth0,'customHref': depth0},inverse:self.noop,fn:self.program(2, program2, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "anchor-link", options));
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n  ");
    return buffer;
    }
  function program2(depth0,data) {
    
    var buffer = '', stack1;
    data.buffer.push("\n      ");
    stack1 = helpers._triageMustache.call(depth0, "button.content", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n    ");
    return buffer;
    }

    data.buffer.push("<!--hero section-->\n<div id=\"hero-image\">\n  <div class=\"words\">\n	 \n	  <h1 ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":hero-title")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push("> \n		 Find Events In Your City </h1>\n	  <h3 ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":hero-text")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push("> \n		 View Events On a Map. Save Your Plan. Explore. </h3>\n </div>\n\n<div ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":hero-buttons")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(">\n  ");
    stack1 = helpers.each.call(depth0, "button", "in", "heroButtons", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n </div>\n</div>\n\n  ");
    return buffer;
    
  });

});
define('master-plan-app/templates/components/joyride-map', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1;


    data.buffer.push("<div id=\"joyrideDiv\">\n  <div class=\"joyride-wrapper\">\n     <ol class=\"joyride-list\" data-joyride>\n       <li data-id=\"firstStop\" data-text=\"Next\" data-options=\"tip_location: top; prev_button: false;\">\n<!--   <li data-id=\"firstStop\" data-text=\"Next\" data-options=\"tip_location: top; prev_button: false; template:{button: '<h1>hihii</h1>'}\"> -->\n    <p class=\"headline-text\"> Getting Started with RSVPeanut </p>\n    <p class=\"headline-title\"> RSVPeanut uses event data from popular event sites to create a map view of all your events. Let's get started in creating a customized itinerary. </p>\n  </li>\n\n  <li data-id=\"numero1\" data-class=\"custom so-awesome\" data-text=\"Next\" data-prev-text=\"Prev\">\n    <p class=\"headline-text\"> Popular Events </p>\n    <p class=\"headline-title\"> View the event heatmap and see the popular events near you. </p>\n  </li>\n\n  <li data-id=\"numero2\" data-button=\"Next\" data-prev-text=\"Prev\" data-options=\"tip_location:top;tip_animation:fade\">\n    <p class=\"headline-text\"> Create Your Plan in 5 Simple Steps </p>\n    <p class=\"headline-title\"> Enter your city. Select your date. Filter by the type of events you want to go to. Save your plan by adding a title and description. </p>\n  </li>\n\n  <li data-id=\"numero3\" data-button=\"Next\" data-prev-text=\"Prev\" data-options=\"tip_location:top;tip_animation:fade\">\n    <p class=\"headline-text\"> Filter Events </p>\n    <p class=\"headline-title\"> Select what types of events you would like to attend, and watch them filter out on the map! </p>\n  </li>\n\n   <li data-id=\"numero4\" data-button=\"Next\" data-prev-text=\"Prev\" data-options=\"tip_location:top;tip_animation:fade\">\n    <p class=\"headline-text\"> View Past Plans </p>\n    <p class=\"headline-title\"> Select the Plans button to view the past plans you have created and saved. </p>\n  </li>\n\n  <li data-button=\"End\" data-prev-text=\"Prev\">\n    <p class=\"headline-text\"> Map Based Events </p>\n    <p class=\"headline-title\"> RSVPeanut helps you create customized plans of things to do around town. </p>\n  </li>\n</ol>\n  </div>\n </div>\n</div>\n\n");
    stack1 = helpers._triageMustache.call(depth0, "yield", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    return buffer;
    
  });

});
define('master-plan-app/templates/components/learn-section', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', escapeExpression=this.escapeExpression;


    data.buffer.push("<!-- learn more section -->\n<div class=\"row\">\n<div ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":large-12 :columns")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(" >\n\n	<p ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":section-title-learn")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push("> see all your events in one place </p>\n	<p ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":section-text")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push("> Filter Events by Location, Date and Type. Save Your Plan and Explore. </hp>\n<center>\n  <img ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'src': ("learnImageUrl")
    },hashTypes:{'src': "ID"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":example-image")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(" />\n</center>\n\n </div>\n</div>\n\n\n\n");
    return buffer;
    
  });

});
define('master-plan-app/templates/components/map-container', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1;


    data.buffer.push("\n<!-- mapbox -->\n<div id=\"map\"></div>\n\n");
    stack1 = helpers._triageMustache.call(depth0, "yield", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    return buffer;
    
  });

});
define('master-plan-app/templates/components/map-filter-bar', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


    data.buffer.push("<!--map search, date, popular event toggle row-->\n\n<div class=\"row\">\n  <div class=\"filter-row\">\n    <div ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":large-1 :columns")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(" ></div>\n    <div ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":large-4 :columns")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(">\n      <div class=\"panel\" id=\"search-panel\">\n        <li class=\"has-form\" id=\"search-row\">\n          <div class=\"row collapse\">\n            <div ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":large-8 :small-9 :columns")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(">\n              ");
    data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
      'value': ("location"),
      'class': ("search"),
      'placeholder': ("Enter City or Zip")
    },hashTypes:{'value': "ID",'class': "STRING",'placeholder': "STRING"},hashContexts:{'value': depth0,'class': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
    data.buffer.push("\n            </div>\n            <div ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":large-4 :small-3 :columns")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(">\n              <button class=\"button small\" id=\"submit-button\" type=\"submit\" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "buildQuery", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
    data.buffer.push(">");
    stack1 = helpers._triageMustache.call(depth0, "searchTitle", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("</button>\n            </div>\n          </div>\n        </li>\n      </div>\n    </div>\n    <div ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":large-3 :columns")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(">\n      <div class=\"calendar\" id=\"firstStop\">\n        <div class=\"panel\" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "selectDate", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
    data.buffer.push(">\n          ");
    data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
      'value': ("startDate"),
      'class': ("span2"),
      'data-date-format': ("mm/dd/yy"),
      'id': ("dp2"),
      'placeholder': ("Choose Start Date")
    },hashTypes:{'value': "ID",'class': "STRING",'data-date-format': "STRING",'id': "STRING",'placeholder': "STRING"},hashContexts:{'value': depth0,'class': depth0,'data-date-format': depth0,'id': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
    data.buffer.push("\n        </div>\n      </div>\n    </div>\n    <div ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":large-5 :columns")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(">\n      <div class=\"panel\" id=\"switch-panel\">\n        <div class=\"switch\" id=\"numero1\">\n          ");
    data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
      'checked': ("isPopularToggled"),
      'id': ("exampleCheckboxSwitch"),
      'type': ("checkbox")
    },hashTypes:{'checked': "ID",'id': "STRING",'type': "STRING"},hashContexts:{'checked': depth0,'id': depth0,'type': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
    data.buffer.push("\n          <label for=\"exampleCheckboxSwitch\"></label>\n          <p class=\"switch-text\" id=\"switch-text2\">  Popular Events </p>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n");
    stack1 = helpers._triageMustache.call(depth0, "yield", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    return buffer;
    
  });

});
define('master-plan-app/templates/components/map-filter-left', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = '', stack1, helper, options;
    data.buffer.push("\n          ");
    data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
      'checked': ("category.selected"),
      'id': ("category.name"),
      'type': ("checkbox"),
      'name': ("testGroup")
    },hashTypes:{'checked': "ID",'id': "ID",'type': "STRING",'name': "STRING"},hashContexts:{'checked': depth0,'id': depth0,'type': depth0,'name': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
    data.buffer.push("\n          <label for=");
    stack1 = helpers._triageMustache.call(depth0, "category.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("></label><br>\n        ");
    return buffer;
    }

    data.buffer.push("<!--map filter left-->\n\n<div class=\"row\">\n  <div ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":filter-left")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(" >\n    <div ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":large-4 :columns")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(" >\n      <div class=\"icon-bar large-vertical four-up\">\n \n	  <a data-dropdown=\"drop2\" aria-controls=\"drop2\" aria-expanded=\"false\" class=\"item\" id=\"numero2\"> \n        <img src=\"assets/images/smallnew.png\" >\n          <label>Create</label>\n      </a>\n        \n      <div id=\"drop2\" data-dropdown-content class=\"f-dropdown content\" aria-hidden=\"true\" tabindex=\"-1\">\n          <form>\n            <div class=\"row\">\n              <div ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":large-12 :columns")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(" >\n                  ");
    data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
      'type': ("text"),
      'placeholder': ("Austin, TX")
    },hashTypes:{'type': "STRING",'placeholder': "STRING"},hashContexts:{'type': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
    data.buffer.push("\n              </div>\n            </div>\n            <div class=\"row\">\n               <div ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":large-12 :columns")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(" >\n                  ");
    data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
      'type': ("text"),
      'placeholder': ("Select Date")
    },hashTypes:{'type': "STRING",'placeholder': "STRING"},hashContexts:{'type': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
    data.buffer.push("\n              </div>\n            </div>\n            <div class=\"row\">\n               <div ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":large-12 :columns")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(" >\n                  ");
    data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
      'type': ("text"),
      'placeholder': ("Select Event Type")
    },hashTypes:{'type': "STRING",'placeholder': "STRING"},hashContexts:{'type': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
    data.buffer.push("\n              </div>\n            </div>\n             <div class=\"row\">\n               <div ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":large-12 :columns")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(" >\n                  ");
    data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
      'type': ("text"),
      'placeholder': ("Plan Name")
    },hashTypes:{'type': "STRING",'placeholder': "STRING"},hashContexts:{'type': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
    data.buffer.push("\n              </div>\n            </div>\n             <div class=\"row\">\n               <div ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":large-12 :columns")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(" >\n                  ");
    data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
      'type': ("text"),
      'placeholder': ("Description")
    },hashTypes:{'type': "STRING",'placeholder': "STRING"},hashContexts:{'type': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
    data.buffer.push("\n              </div>\n            </div>\n            <div class=\"row\">\n               <div ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":large-12 :columns")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(" >\n            <a href=\"#\" class=\"tiny button\"> Create Plan </a>  \n          </div>\n        </div>\n        </form>\n      </div> \n\n	    <a data-dropdown=\"drop4\" aria-controls=\"drop4\" aria-expanded=\"false\" class=\"item\" id=\"numero3\"> \n        <img src=\"assets/images/smallfilter.png\" >\n          <label>Filter</label>\n      </a>\n        \n      <div id=\"drop4\" data-dropdown-content class=\"f-dropdown content\" aria-hidden=\"true\" tabindex=\"-1\">\n   \n        ");
    stack1 = helpers.each.call(depth0, "category", "in", "categories", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n     </div>\n\n      <!-- if click on this button, display joyride-->\n  \n      <a class=\"item\" id=\"info-button\" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "joyRide", "start", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data})));
    data.buffer.push(">\n        <img src=\"assets/images/smallinfo.png\">\n        <label>Info</label>\n      </a>\n\n      <a data-dropdown=\"drop3\" aria-controls=\"drop3\" aria-expanded=\"false\" class=\"item\" id=\"numero4\"> \n        <img src=\"assets/images/smallplan.png\" >\n          <label>Plans</label>\n      </a>\n        \n      <div id=\"drop3\" data-dropdown-content class=\"f-dropdown content\" aria-hidden=\"true\" tabindex=\"-1\">\n        \n      </div>\n    </div>\n  </div>\n</div>\n\n\n\n");
    stack1 = helpers._triageMustache.call(depth0, "yield", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    return buffer;
    
  });

});
define('master-plan-app/templates/components/map-filter-right', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1;


    stack1 = helpers._triageMustache.call(depth0, "yield", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    return buffer;
    
  });

});
define('master-plan-app/templates/components/map-title', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

  function program1(depth0,data) {
    
    var buffer = '', stack1;
    data.buffer.push("\n\n  <h1 ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":create-title")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push("> Create Your Plan </h1>\n  <p ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":create-text")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push("> Filter Events by Location, Date and Type. Save Your Plan and Explore. </p> \n\n  ");
    stack1 = helpers._triageMustache.call(depth0, "yield", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n  \n");
    return buffer;
    }

    data.buffer.push("<!--footer-->\n");
    stack1 = (helper = helpers['foundation-row-wrapper'] || (depth0 && depth0['foundation-row-wrapper']),options={hash:{
      'divSubClassNames': ("large-12 columns")
    },hashTypes:{'divSubClassNames': "STRING"},hashContexts:{'divSubClassNames': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "foundation-row-wrapper", options));
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n\n");
    return buffer;
    
  });

});
define('master-plan-app/templates/components/signin-modal', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


    data.buffer.push(escapeExpression((helper = helpers.render || (depth0 && depth0.render),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "users", options) : helperMissing.call(depth0, "render", "users", options))));
    data.buffer.push("\n");
    return buffer;
    
  });

});
define('master-plan-app/templates/components/signup-modal', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


    data.buffer.push(escapeExpression((helper = helpers.render || (depth0 && depth0.render),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "users.new", options) : helperMissing.call(depth0, "render", "users.new", options))));
    data.buffer.push("\n");
    return buffer;
    
  });

});
define('master-plan-app/templates/components/team-section', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

  function program1(depth0,data) {
    
    var buffer = '', stack1;
    data.buffer.push("\n      <div ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":large-4 :small-6 :columns")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(" >\n        <img ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":teampic"),
      'src': ("member.img")
    },hashTypes:{'class': "STRING",'src': "STRING"},hashContexts:{'class': depth0,'src': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(" />\n        <p ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":person-name")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push("> ");
    stack1 = helpers._triageMustache.call(depth0, "member.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push(" </p>\n        <p ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":team-title")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(" > ");
    stack1 = helpers._triageMustache.call(depth0, "member.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push(" </p>\n              <img src=\"assets/images/personallinkedin.png\" class=\"team-icons\"/></a>\n              <img src=\"assets/images/personalgithub.png\" class=\"team-icons\"/></a>\n              <img src=\"assets/images/personaltwitter.png\" class=\"team-icons\"/></a>\n      </div>\n    ");
    return buffer;
    }

    data.buffer.push("<p class=\"section-title\"> meet our developers </hp>\n<div class=\"team-photos\">\n\n  <div class=\"row\">\n\n    <div ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":large-12 :show-for-small :columns")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(" ></div>\n\n    <div ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":large-2 :columns")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(" >\n       <p ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': ("teampic")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression((helper = helpers.bindAttr || (depth0 && depth0.bindAttr),options={hash:{
      'id': ("testimage")
    },hashTypes:{'id': "STRING"},hashContexts:{'id': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bindAttr", options))));
    data.buffer.push("></p>\n    </div>\n\n    ");
    stack1 = helpers.each.call(depth0, "member", "in", "teamMembers", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n    <div class=\"large-2 columns\" class\"teampic\"></div>\n  </div>\n</div>\n\n\n");
    return buffer;
    
  });

});
define('master-plan-app/templates/components/user-info', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = '', stack1;
    data.buffer.push("\n    <span><em><strong>");
    stack1 = helpers._triageMustache.call(depth0, "user.email", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("</strong></em></span>\n  ");
    return buffer;
    }

    data.buffer.push("<a ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleBody", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
    data.buffer.push(">\n  <h3>");
    stack1 = helpers._triageMustache.call(depth0, "user.first", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("</h3>\n  ");
    stack1 = helpers['if'].call(depth0, "isDisplayed", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n</a>");
    return buffer;
    
  });

});
define('master-plan-app/templates/events', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


    data.buffer.push("<!--create your plan title section-->\n");
    stack1 = helpers._triageMustache.call(depth0, "map-title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n\n<!-- Display Map -->\n<div class=\"row\" id=\"map-container\">\n  <!-- Display Top Horizantal Map Filters -->\n  <!--                             | compAct = \"CtrlAct\" compAttr = CtrlAttr | -->\n  ");
    data.buffer.push(escapeExpression((helper = helpers['map-filter-bar'] || (depth0 && depth0['map-filter-bar']),options={hash:{
      'searchTitle': ("Search"),
      'search': ("search"),
      'selectDate': ("updateDates"),
      'isPopularToggled': ("isPopular"),
      'dateRange': ("dates")
    },hashTypes:{'searchTitle': "STRING",'search': "STRING",'selectDate': "STRING",'isPopularToggled': "ID",'dateRange': "ID"},hashContexts:{'searchTitle': depth0,'search': depth0,'selectDate': depth0,'isPopularToggled': depth0,'dateRange': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "map-filter-bar", options))));
    data.buffer.push("\n  <div class=\"large-1 columns\">\n    <!-- Display Left Vertical Map Filters -->\n    ");
    data.buffer.push(escapeExpression((helper = helpers['map-filter-left'] || (depth0 && depth0['map-filter-left']),options={hash:{
      'categories': ("categories")
    },hashTypes:{'categories': "ID"},hashContexts:{'categories': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "map-filter-left", options))));
    data.buffer.push("\n  </div>\n  <div class=\"large-10 columns\">\n    <!-- Display Map -->\n    ");
    data.buffer.push(escapeExpression((helper = helpers['map-container'] || (depth0 && depth0['map-container']),options={hash:{
      'events': ("filteredEvents")
    },hashTypes:{'events': "ID"},hashContexts:{'events': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "map-container", options))));
    data.buffer.push("\n  </div>\n  <div class=\"large-1 columns\">\n    <!-- Display Right Vertical Map Filters -->\n    ");
    stack1 = helpers._triageMustache.call(depth0, "map-filter-right", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n  </div>\n    ");
    stack1 = helpers._triageMustache.call(depth0, "joyride-map", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n</div>\n");
    return buffer;
    
  });

});
define('master-plan-app/templates/events/event', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1;


    data.buffer.push("<article class=\"singleEventContent\">\n  <span><em>itza <strong>");
    stack1 = helpers._triageMustache.call(depth0, "event.event_type", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("</strong> at ");
    stack1 = helpers._triageMustache.call(depth0, "event.location", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("</em></span>\n</article>");
    return buffer;
    
  });

});
define('master-plan-app/templates/index', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = '', stack1;
    data.buffer.push("    \n  ");
    stack1 = helpers._triageMustache.call(depth0, "learn-section", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n  ");
    stack1 = helpers._triageMustache.call(depth0, "about-section", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    return buffer;
    }

    data.buffer.push("<!-- index -->\n\n");
    data.buffer.push(escapeExpression((helper = helpers['hero-wrapper'] || (depth0 && depth0['hero-wrapper']),options={hash:{
      'buttons': ("heroButtons")
    },hashTypes:{'buttons': "ID"},hashContexts:{'buttons': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "hero-wrapper", options))));
    data.buffer.push("\n\n");
    stack1 = (helper = helpers['foundation-row-wrapper'] || (depth0 && depth0['foundation-row-wrapper']),options={hash:{
      'divSubClassNames': ("large-12 columns")
    },hashTypes:{'divSubClassNames': "STRING"},hashContexts:{'divSubClassNames': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "foundation-row-wrapper", options));
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    stack1 = helpers._triageMustache.call(depth0, "team-section", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n\n\n");
    return buffer;
    
  });

});
define('master-plan-app/templates/itineraries', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1;


    stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    return buffer;
    
  });

});
define('master-plan-app/templates/itineraries/itinerary', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1;


    stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    return buffer;
    
  });

});
define('master-plan-app/templates/itineraries/new', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1;


    stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    return buffer;
    
  });

});
define('master-plan-app/templates/users', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


    data.buffer.push("  <form ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "signInUser", "model", {hash:{
      'on': ("submit")
    },hashTypes:{'on': "STRING"},hashContexts:{'on': depth0},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
    data.buffer.push(">\n    <h2>User Sign In</h2>\n\n    <h4>Email<h4>\n    ");
    data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
      'type': ("text"),
      'value': ("email"),
      'id': ("user-email"),
      'class': ("form-control")
    },hashTypes:{'type': "STRING",'value': "ID",'id': "STRING",'class': "STRING"},hashContexts:{'type': depth0,'value': depth0,'id': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
    data.buffer.push("\n    <h4>Password<h4>\n    ");
    data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
      'type': ("password"),
      'value': ("password"),
      'id': ("user-password"),
      'class': ("form-control")
    },hashTypes:{'type': "STRING",'value': "ID",'id': "STRING",'class': "STRING"},hashContexts:{'type': depth0,'value': depth0,'id': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
    data.buffer.push("\n\n    <button class=\"btn btn-primary btn-block\" type=\"submit\">Sign In</button>\n  </form>\n  <a class=\"close-reveal-modal\">&#215;</a>\n");
    return buffer;
    
  });

});
define('master-plan-app/templates/users/new', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


    data.buffer.push("\n  <form ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "createUser", "model", {hash:{
      'on': ("submit")
    },hashTypes:{'on': "STRING"},hashContexts:{'on': depth0},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
    data.buffer.push(">\n    <h2>Create User</h2>\n\n    <h4>First Name<h4>\n    ");
    data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
      'type': ("text"),
      'value': ("first"),
      'id': ("First Name"),
      'class': ("form-control")
    },hashTypes:{'type': "STRING",'value': "ID",'id': "STRING",'class': "STRING"},hashContexts:{'type': depth0,'value': depth0,'id': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
    data.buffer.push("\n    <h4>Last Name<h4>\n    ");
    data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
      'type': ("text"),
      'value': ("last"),
      'id': ("Last Name"),
      'class': ("form-control")
    },hashTypes:{'type': "STRING",'value': "ID",'id': "STRING",'class': "STRING"},hashContexts:{'type': depth0,'value': depth0,'id': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
    data.buffer.push("\n    <h4>Email<h4>\n    ");
    data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
      'type': ("text"),
      'value': ("email"),
      'id': ("Email"),
      'class': ("form-control")
    },hashTypes:{'type': "STRING",'value': "ID",'id': "STRING",'class': "STRING"},hashContexts:{'type': depth0,'value': depth0,'id': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
    data.buffer.push("\n    <h4>Password<h4>\n    ");
    data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
      'type': ("password"),
      'value': ("password"),
      'id': ("Password"),
      'class': ("form-control")
    },hashTypes:{'type': "STRING",'value': "ID",'id': "STRING",'class': "STRING"},hashContexts:{'type': depth0,'value': depth0,'id': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
    data.buffer.push("\n\n    <button class=\"btn btn-primary btn-block\" type=\"submit\">Submit</button>\n  </form>\n  <a class=\"close-reveal-modal\">&#215;</a>\n");
    return buffer;
    
  });

});
define('master-plan-app/templates/users/user', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1;


    data.buffer.push("<article class=\"singleUserContent\">\n  <span><em><strong>");
    stack1 = helpers._triageMustache.call(depth0, "email", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("</strong></em></span>\n</article>\n");
    return buffer;
    
  });

});
define('master-plan-app/tests/acceptance/index-test', ['ember', '../helpers/start-app'], function (Ember, startApp) {

  'use strict';

  var application;

  module("Acceptance: Index", {
    setup: function () {
      application = startApp['default']();
    },
    teardown: function () {
      Ember['default'].run(application, "destroy");
    }
  });

  test("visiting /index", function () {
    visit("/index");

    andThen(function () {
      equal(currentPath(), "index");
    });
  });

});
define('master-plan-app/tests/adapters/application.jshint', function () {

  'use strict';

  module('JSHint - adapters');
  test('adapters/application.js should pass jshint', function() { 
    ok(true, 'adapters/application.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/adapters/event.jshint', function () {

  'use strict';

  module('JSHint - adapters');
  test('adapters/event.js should pass jshint', function() { 
    ok(true, 'adapters/event.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/adapters/user.jshint', function () {

  'use strict';

  module('JSHint - adapters');
  test('adapters/user.js should pass jshint', function() { 
    ok(true, 'adapters/user.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(true, 'app.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/components/about-section.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/about-section.js should pass jshint', function() { 
    ok(true, 'components/about-section.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/components/anchor-link.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/anchor-link.js should pass jshint', function() { 
    ok(true, 'components/anchor-link.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/components/fixed-nav-bar.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/fixed-nav-bar.js should pass jshint', function() { 
    ok(true, 'components/fixed-nav-bar.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/components/footer-wrap.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/footer-wrap.js should pass jshint', function() { 
    ok(true, 'components/footer-wrap.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/components/foundation-row-wrapper.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/foundation-row-wrapper.js should pass jshint', function() { 
    ok(true, 'components/foundation-row-wrapper.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/components/hero-wrapper.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/hero-wrapper.js should pass jshint', function() { 
    ok(true, 'components/hero-wrapper.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/components/joyride-map.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/joyride-map.js should pass jshint', function() { 
    ok(true, 'components/joyride-map.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/components/learn-section.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/learn-section.js should pass jshint', function() { 
    ok(true, 'components/learn-section.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/components/map-container.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/map-container.js should pass jshint', function() { 
    ok(true, 'components/map-container.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/components/map-filter-bar.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/map-filter-bar.js should pass jshint', function() { 
    ok(false, 'components/map-filter-bar.js should pass jshint.\ncomponents/map-filter-bar.js: line 2, col 8, \'TextField\' is defined but never used.\n\n1 error'); 
  });

});
define('master-plan-app/tests/components/map-filter-left.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/map-filter-left.js should pass jshint', function() { 
    ok(true, 'components/map-filter-left.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/components/map-filter-right.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/map-filter-right.js should pass jshint', function() { 
    ok(true, 'components/map-filter-right.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/components/map-title.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/map-title.js should pass jshint', function() { 
    ok(true, 'components/map-title.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/components/signin-modal.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/signin-modal.js should pass jshint', function() { 
    ok(true, 'components/signin-modal.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/components/signup-modal.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/signup-modal.js should pass jshint', function() { 
    ok(true, 'components/signup-modal.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/components/team-section.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/team-section.js should pass jshint', function() { 
    ok(true, 'components/team-section.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/components/user-info.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/user-info.js should pass jshint', function() { 
    ok(true, 'components/user-info.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/controllers/events.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/events.js should pass jshint', function() { 
    ok(true, 'controllers/events.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/controllers/users.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/users.js should pass jshint', function() { 
    ok(true, 'controllers/users.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/controllers/users/new.jshint', function () {

  'use strict';

  module('JSHint - controllers/users');
  test('controllers/users/new.js should pass jshint', function() { 
    ok(true, 'controllers/users/new.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/data/data.jshint', function () {

  'use strict';

  module('JSHint - data');
  test('data/data.js should pass jshint', function() { 
    ok(true, 'data/data.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/helpers/resolver', ['exports', 'ember/resolver', '../../config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('master-plan-app/tests/helpers/start-app', ['exports', 'ember', '../../app', '../../router', '../../config/environment'], function (exports, Ember, Application, Router, config) {

  'use strict';

  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
  exports['default'] = startApp;

});
define('master-plan-app/tests/master-plan-app/tests/acceptance/index-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/acceptance');
  test('master-plan-app/tests/acceptance/index-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/acceptance/index-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/helpers/resolver.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/helpers');
  test('master-plan-app/tests/helpers/resolver.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/helpers/resolver.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/helpers/start-app.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/helpers');
  test('master-plan-app/tests/helpers/start-app.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/helpers/start-app.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/test-helper.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests');
  test('master-plan-app/tests/test-helper.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/test-helper.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/unit/adapters/application-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/adapters');
  test('master-plan-app/tests/unit/adapters/application-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/adapters/application-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/unit/adapters/event-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/adapters');
  test('master-plan-app/tests/unit/adapters/event-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/adapters/event-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/unit/adapters/user-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/adapters');
  test('master-plan-app/tests/unit/adapters/user-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/adapters/user-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/unit/components/about-section-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/components');
  test('master-plan-app/tests/unit/components/about-section-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/components/about-section-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/unit/components/anchor-link-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/components');
  test('master-plan-app/tests/unit/components/anchor-link-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/components/anchor-link-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/unit/components/fixed-nav-bar-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/components');
  test('master-plan-app/tests/unit/components/fixed-nav-bar-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/components/fixed-nav-bar-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/unit/components/footer-wrap-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/components');
  test('master-plan-app/tests/unit/components/footer-wrap-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/components/footer-wrap-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/unit/components/foundation-row-wrapper-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/components');
  test('master-plan-app/tests/unit/components/foundation-row-wrapper-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/components/foundation-row-wrapper-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/unit/components/hero-wrapper-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/components');
  test('master-plan-app/tests/unit/components/hero-wrapper-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/components/hero-wrapper-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/unit/components/joyride-map-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/components');
  test('master-plan-app/tests/unit/components/joyride-map-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/components/joyride-map-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/unit/components/learn-section-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/components');
  test('master-plan-app/tests/unit/components/learn-section-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/components/learn-section-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/unit/components/map-container-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/components');
  test('master-plan-app/tests/unit/components/map-container-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/components/map-container-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/unit/components/map-filter-bar-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/components');
  test('master-plan-app/tests/unit/components/map-filter-bar-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/components/map-filter-bar-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/unit/components/map-filter-left-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/components');
  test('master-plan-app/tests/unit/components/map-filter-left-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/components/map-filter-left-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/unit/components/map-filter-right-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/components');
  test('master-plan-app/tests/unit/components/map-filter-right-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/components/map-filter-right-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/unit/components/map-title-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/components');
  test('master-plan-app/tests/unit/components/map-title-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/components/map-title-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/unit/components/signin-modal-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/components');
  test('master-plan-app/tests/unit/components/signin-modal-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/components/signin-modal-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/unit/components/signup-modal-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/components');
  test('master-plan-app/tests/unit/components/signup-modal-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/components/signup-modal-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/unit/components/team-section-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/components');
  test('master-plan-app/tests/unit/components/team-section-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/components/team-section-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/unit/components/user-info-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/components');
  test('master-plan-app/tests/unit/components/user-info-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/components/user-info-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/unit/controllers/events-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/controllers');
  test('master-plan-app/tests/unit/controllers/events-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/controllers/events-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/unit/controllers/users-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/controllers');
  test('master-plan-app/tests/unit/controllers/users-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/controllers/users-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/unit/controllers/users/new-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/controllers/users');
  test('master-plan-app/tests/unit/controllers/users/new-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/controllers/users/new-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/unit/models/event-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/models');
  test('master-plan-app/tests/unit/models/event-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/models/event-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/unit/models/itinerary-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/models');
  test('master-plan-app/tests/unit/models/itinerary-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/models/itinerary-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/unit/models/user-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/models');
  test('master-plan-app/tests/unit/models/user-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/models/user-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/unit/routes/application-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/routes');
  test('master-plan-app/tests/unit/routes/application-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/routes/application-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/unit/routes/events-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/routes');
  test('master-plan-app/tests/unit/routes/events-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/routes/events-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/unit/routes/events/event-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/routes/events');
  test('master-plan-app/tests/unit/routes/events/event-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/routes/events/event-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/unit/routes/index-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/routes');
  test('master-plan-app/tests/unit/routes/index-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/routes/index-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/unit/routes/itineraries-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/routes');
  test('master-plan-app/tests/unit/routes/itineraries-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/routes/itineraries-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/unit/routes/itineraries/itinerary-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/routes/itineraries');
  test('master-plan-app/tests/unit/routes/itineraries/itinerary-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/routes/itineraries/itinerary-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/unit/routes/itineraries/new-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/routes/itineraries');
  test('master-plan-app/tests/unit/routes/itineraries/new-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/routes/itineraries/new-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/unit/routes/users-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/routes');
  test('master-plan-app/tests/unit/routes/users-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/routes/users-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/unit/routes/users/new-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/routes/users');
  test('master-plan-app/tests/unit/routes/users/new-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/routes/users/new-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/unit/routes/users/user-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/routes/users');
  test('master-plan-app/tests/unit/routes/users/user-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/routes/users/user-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/unit/serializers/application-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/serializers');
  test('master-plan-app/tests/unit/serializers/application-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/serializers/application-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/models/event.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/event.js should pass jshint', function() { 
    ok(true, 'models/event.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/models/itinerary.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/itinerary.js should pass jshint', function() { 
    ok(true, 'models/itinerary.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/models/user.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/user.js should pass jshint', function() { 
    ok(true, 'models/user.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/overrides/textfield.jshint', function () {

  'use strict';

  module('JSHint - overrides');
  test('overrides/textfield.js should pass jshint', function() { 
    ok(true, 'overrides/textfield.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/router.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('router.js should pass jshint', function() { 
    ok(true, 'router.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/routes/application.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/application.js should pass jshint', function() { 
    ok(true, 'routes/application.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/routes/events.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/events.js should pass jshint', function() { 
    ok(true, 'routes/events.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/routes/events/event.jshint', function () {

  'use strict';

  module('JSHint - routes/events');
  test('routes/events/event.js should pass jshint', function() { 
    ok(true, 'routes/events/event.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/routes/index.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/index.js should pass jshint', function() { 
    ok(true, 'routes/index.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/routes/itineraries.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/itineraries.js should pass jshint', function() { 
    ok(true, 'routes/itineraries.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/routes/itineraries/itinerary.jshint', function () {

  'use strict';

  module('JSHint - routes/itineraries');
  test('routes/itineraries/itinerary.js should pass jshint', function() { 
    ok(true, 'routes/itineraries/itinerary.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/routes/itineraries/new.jshint', function () {

  'use strict';

  module('JSHint - routes/itineraries');
  test('routes/itineraries/new.js should pass jshint', function() { 
    ok(true, 'routes/itineraries/new.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/routes/users.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/users.js should pass jshint', function() { 
    ok(true, 'routes/users.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/routes/users/new.jshint', function () {

  'use strict';

  module('JSHint - routes/users');
  test('routes/users/new.js should pass jshint', function() { 
    ok(true, 'routes/users/new.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/routes/users/user.jshint', function () {

  'use strict';

  module('JSHint - routes/users');
  test('routes/users/user.js should pass jshint', function() { 
    ok(true, 'routes/users/user.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/serializers/application.jshint', function () {

  'use strict';

  module('JSHint - serializers');
  test('serializers/application.js should pass jshint', function() { 
    ok(true, 'serializers/application.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/test-helper', ['./helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

	document.write("<div id=\"ember-testing-container\"><div id=\"ember-testing\"></div></div>");

	QUnit.config.urlConfig.push({ id: "nocontainer", label: "Hide container" });
	var containerVisibility = QUnit.urlParams.nocontainer ? "hidden" : "visible";
	document.getElementById("ember-testing-container").style.visibility = containerVisibility;

});
define('master-plan-app/tests/unit/adapters/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("adapter:application", "ApplicationAdapter", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function () {
    var adapter = this.subject();
    ok(adapter);
  });
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']

});
define('master-plan-app/tests/unit/adapters/event-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("adapter:event", "EventAdapter", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function () {
    var adapter = this.subject();
    ok(adapter);
  });
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']

});
define('master-plan-app/tests/unit/adapters/user-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("adapter:user", "UserAdapter", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function () {
    var adapter = this.subject();
    ok(adapter);
  });
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']

});
define('master-plan-app/tests/unit/components/about-section-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent("about-section", "AboutSectionComponent", {});

  ember_qunit.test("it renders", function () {
    expect(2);

    // creates the component instance
    var component = this.subject();
    equal(component._state, "preRender");

    // appends the component to the page
    this.append();
    equal(component._state, "inDOM");
  });
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('master-plan-app/tests/unit/components/anchor-link-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent("anchor-link", "AnchorLinkComponent", {});

  ember_qunit.test("it renders", function () {
    expect(2);

    // creates the component instance
    var component = this.subject();
    equal(component._state, "preRender");

    // appends the component to the page
    this.append();
    equal(component._state, "inDOM");
  });
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('master-plan-app/tests/unit/components/fixed-nav-bar-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent("fixed-nav-bar", "FixedNavBarComponent", {});

  ember_qunit.test("it renders", function () {
    expect(2);

    // creates the component instance
    var component = this.subject();
    equal(component._state, "preRender");

    // appends the component to the page
    this.append();
    equal(component._state, "inDOM");
  });
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('master-plan-app/tests/unit/components/footer-wrap-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent("footer-wrap", "FooterWrapComponent", {});

  ember_qunit.test("it renders", function () {
    expect(2);

    // creates the component instance
    var component = this.subject();
    equal(component._state, "preRender");

    // appends the component to the page
    this.append();
    equal(component._state, "inDOM");
  });
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('master-plan-app/tests/unit/components/foundation-row-wrapper-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent("foundation-row-wrapper", "FoundationRowWrapperComponent", {});

  ember_qunit.test("it renders", function () {
    expect(2);

    // creates the component instance
    var component = this.subject();
    equal(component._state, "preRender");

    // appends the component to the page
    this.append();
    equal(component._state, "inDOM");
  });
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('master-plan-app/tests/unit/components/hero-wrapper-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent("hero-wrapper", "HeroWrapperComponent", {});

  ember_qunit.test("it renders", function () {
    expect(2);

    // creates the component instance
    var component = this.subject();
    equal(component._state, "preRender");

    // appends the component to the page
    this.append();
    equal(component._state, "inDOM");
  });
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('master-plan-app/tests/unit/components/joyride-map-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent("joyride-map", "JoyrideMapComponent", {});

  ember_qunit.test("it renders", function () {
    expect(2);

    // creates the component instance
    var component = this.subject();
    equal(component._state, "preRender");

    // appends the component to the page
    this.append();
    equal(component._state, "inDOM");
  });
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('master-plan-app/tests/unit/components/learn-section-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent("learn-section", "LearnSectionComponent", {});

  ember_qunit.test("it renders", function () {
    expect(2);

    // creates the component instance
    var component = this.subject();
    equal(component._state, "preRender");

    // appends the component to the page
    this.append();
    equal(component._state, "inDOM");
  });
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('master-plan-app/tests/unit/components/map-container-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent("map-container", "MapContainerComponent", {});

  ember_qunit.test("it renders", function () {
    expect(2);

    // creates the component instance
    var component = this.subject();
    equal(component._state, "preRender");

    // appends the component to the page
    this.append();
    equal(component._state, "inDOM");
  });
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('master-plan-app/tests/unit/components/map-filter-bar-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent("map-filter-bar", "MapFilterBarComponent", {});

  ember_qunit.test("it renders", function () {
    expect(2);

    // creates the component instance
    var component = this.subject();
    equal(component._state, "preRender");

    // appends the component to the page
    this.append();
    equal(component._state, "inDOM");
  });
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('master-plan-app/tests/unit/components/map-filter-left-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent("map-filter-left", "MapFilterLeftComponent", {});

  ember_qunit.test("it renders", function () {
    expect(2);

    // creates the component instance
    var component = this.subject();
    equal(component._state, "preRender");

    // appends the component to the page
    this.append();
    equal(component._state, "inDOM");
  });
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('master-plan-app/tests/unit/components/map-filter-right-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent("map-filter-right", "MapFilterRightComponent", {});

  ember_qunit.test("it renders", function () {
    expect(2);

    // creates the component instance
    var component = this.subject();
    equal(component._state, "preRender");

    // appends the component to the page
    this.append();
    equal(component._state, "inDOM");
  });
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('master-plan-app/tests/unit/components/map-title-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent("map-title", "MapTitleComponent", {});

  ember_qunit.test("it renders", function () {
    expect(2);

    // creates the component instance
    var component = this.subject();
    equal(component._state, "preRender");

    // appends the component to the page
    this.append();
    equal(component._state, "inDOM");
  });
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('master-plan-app/tests/unit/components/signin-modal-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent("signin-modal", "SigninModalComponent", {});

  ember_qunit.test("it renders", function () {
    expect(2);

    // creates the component instance
    var component = this.subject();
    equal(component._state, "preRender");

    // appends the component to the page
    this.append();
    equal(component._state, "inDOM");
  });
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('master-plan-app/tests/unit/components/signup-modal-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent("signup-modal", "SignupModalComponent", {});

  ember_qunit.test("it renders", function () {
    expect(2);

    // creates the component instance
    var component = this.subject();
    equal(component._state, "preRender");

    // appends the component to the page
    this.append();
    equal(component._state, "inDOM");
  });
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('master-plan-app/tests/unit/components/team-section-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent("team-section", "TeamSectionComponent", {});

  ember_qunit.test("it renders", function () {
    expect(2);

    // creates the component instance
    var component = this.subject();
    equal(component._state, "preRender");

    // appends the component to the page
    this.append();
    equal(component._state, "inDOM");
  });
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('master-plan-app/tests/unit/components/user-info-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent("user-info", "UserInfoComponent", {});

  ember_qunit.test("it renders", function () {
    expect(2);

    // creates the component instance
    var component = this.subject();
    equal(component._state, "preRender");

    // appends the component to the page
    this.append();
    equal(component._state, "inDOM");
  });
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('master-plan-app/tests/unit/controllers/events-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("controller:events", "EventsController", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function () {
    var controller = this.subject();
    ok(controller);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('master-plan-app/tests/unit/controllers/users-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("controller:users", "UsersController", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function () {
    var controller = this.subject();
    ok(controller);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('master-plan-app/tests/unit/controllers/users/new-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("controller:users/new", "UsersNewController", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function () {
    var controller = this.subject();
    ok(controller);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('master-plan-app/tests/unit/models/event-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel("event", "Event", {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test("it exists", function () {
    var model = this.subject();
    // var store = this.store();
    ok(!!model);
  });

});
define('master-plan-app/tests/unit/models/itinerary-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel("itinerary", "Itinerary", {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test("it exists", function () {
    var model = this.subject();
    // var store = this.store();
    ok(!!model);
  });

});
define('master-plan-app/tests/unit/models/user-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel("user", "User", {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test("it exists", function () {
    var model = this.subject();
    // var store = this.store();
    ok(!!model);
  });

});
define('master-plan-app/tests/unit/routes/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:application", "ApplicationRoute", {});

  ember_qunit.test("it exists", function () {
    var route = this.subject();
    ok(route);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('master-plan-app/tests/unit/routes/events-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:events", "EventsRoute", {});

  ember_qunit.test("it exists", function () {
    var route = this.subject();
    ok(route);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('master-plan-app/tests/unit/routes/events/event-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:events/event", "EventsEventRoute", {});

  ember_qunit.test("it exists", function () {
    var route = this.subject();
    ok(route);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('master-plan-app/tests/unit/routes/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:index", "IndexRoute", {});

  ember_qunit.test("it exists", function () {
    var route = this.subject();
    ok(route);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('master-plan-app/tests/unit/routes/itineraries-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:itineraries", "ItinerariesRoute", {});

  ember_qunit.test("it exists", function () {
    var route = this.subject();
    ok(route);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('master-plan-app/tests/unit/routes/itineraries/itinerary-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:itineraries/itinerary", "ItinerariesItineraryRoute", {});

  ember_qunit.test("it exists", function () {
    var route = this.subject();
    ok(route);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('master-plan-app/tests/unit/routes/itineraries/new-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:itineraries/new", "ItinerariesNewRoute", {});

  ember_qunit.test("it exists", function () {
    var route = this.subject();
    ok(route);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('master-plan-app/tests/unit/routes/users-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:users", "UsersRoute", {});

  ember_qunit.test("it exists", function () {
    var route = this.subject();
    ok(route);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('master-plan-app/tests/unit/routes/users/new-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:users/new", "UsersNewRoute", {});

  ember_qunit.test("it exists", function () {
    var route = this.subject();
    ok(route);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('master-plan-app/tests/unit/routes/users/user-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:users/user", "UsersUserRoute", {});

  ember_qunit.test("it exists", function () {
    var route = this.subject();
    ok(route);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('master-plan-app/tests/unit/serializers/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("serializer:application", "ApplicationSerializer", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function () {
    var serializer = this.subject();
    ok(serializer);
  });
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']

});
/* jshint ignore:start */

define('master-plan-app/config/environment', ['ember'], function(Ember) {
  var prefix = 'master-plan-app';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("master-plan-app/tests/test-helper");
} else {
  require("master-plan-app/app")["default"].create({});
}

/* jshint ignore:end */
//# sourceMappingURL=master-plan-app.map