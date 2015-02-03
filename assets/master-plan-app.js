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
define('master-plan-app/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', './config/environment', './overrides/textfield'], function (exports, Ember, Resolver, loadInitializers, config, TextField) {

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
    tagName: ["section"],
    classNames: ["about-section"],

    aboutImageUrl: "http://placehold.it/400x300&text=[img]",

    aboutTiles: [{
      id: 1,
      text: "see all your events on a map",
      img: "http://placehold.it/400x300&text=[img]"
    }, {
      id: 2,
      text: "filter your events to create a custom map",
      img: "http://placehold.it/400x300&text=[img]"
    }, {
      id: 3,
      text: "view your plan",
      img: "http://placehold.it/400x300&text=[img]"
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
define('master-plan-app/components/learn-section', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    tagName: "section",
    classNames: ["learn-section"],

    baseImageUrl: "assets/images",

    learnImageUrl: (function () {
      return this.get("baseImageUrl") + "/strava-ex.jpg";
    }).property("baseImageUrl")

  });

});
define('master-plan-app/components/map-container', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    classNames: ["map"]

  });

});
define('master-plan-app/components/map-filter-bar', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    classNames: ["filter-section"],

    attributeBindings: ["id"],

    id: "filter-section",

    actions: {
      buildQuery: function () {
        var query = this.get("location");
        console.log(query);
        this.sendAction("search", { location: query });
      } }

  });

});
define('master-plan-app/components/map-filter-left', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    classNames: ["filter-vertical-left"]

  });

});
define('master-plan-app/components/map-filter-right', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    classNames: ["filter-vertical-right"]

  });

});
define('master-plan-app/components/map-title', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Component.extend({});

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
    tagName: ["section"],
    classNames: ["team-section"],

    attributeBindings: ["team:id"],

    team: "team",

    teamMembers: [{
      id: 1,
      name: "Alex Ford",
      role: "Front-End",
      img: "assets/images/alex.jpg"
    }, {
      id: 2,
      name: "Jessica Meyer",
      role: "Front-End",
      img: "assets/images/jessica.jpg"
    }, {
      id: 3,
      name: "John Goldsmith",
      role: "Back-End",
      img: "assets/images/john.jpg"
    }, {
      id: 4,
      name: "Melizza Patterson",
      role: "Back-End",
      img: "assets/images/melissa.jpeg"
    }, {
      id: 5,
      name: "Spenser Filler",
      role: "Back-End",
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
    actions: {
      search: function (query) {
        var store = this.store;
        var location = query.location;
        store.find("event", query).then(function () {
          alert("Requested Events for " + location + "!");
        })["catch"](function () {
          alert("Failed to request Events for " + location + "!");
        });
      } }
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
    name: DS['default'].attr("string"),
    event_type: DS['default'].attr("string"),
    location: DS['default'].attr("string"),
    event_start: DS['default'].attr("date"),
    event_end: DS['default'].attr("date"),
    attendees: DS['default'].attr("number"),
    cost: DS['default'].attr("number"),
    created_at: DS['default'].attr("date"),
    updated_at: DS['default'].attr("date"),
    description: DS['default'].attr("string"),
    lat: DS['default'].attr("string"),
    long: DS['default'].attr("string"),
    event_url: DS['default'].attr("string"),
    source: DS['default'].attr("string")
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
define('master-plan-app/routes/events', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('master-plan-app/routes/events/event', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('master-plan-app/routes/index', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

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
define('master-plan-app/routes/plans', ['exports', 'ember'], function (exports, Ember) {

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
      'class': ("events")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "events", options) : helperMissing.call(depth0, "link-to", "events", options));
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n      ");
    stack1 = (helper = helpers['anchor-link'] || (depth0 && depth0['anchor-link']),options={hash:{
      'class': ("events"),
      'customHref': ("team")
    },hashTypes:{'class': "STRING",'customHref': "STRING"},hashContexts:{'class': depth0,'customHref': depth0},inverse:self.noop,fn:self.program(6, program6, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "anchor-link", options));
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n      ");
    stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
      'class': ("events")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "users", options) : helperMissing.call(depth0, "link-to", "users", options));
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n      ");
    stack1 = (helper = helpers['anchor-link'] || (depth0 && depth0['anchor-link']),options={hash:{
      'class': ("events"),
      'modal': ("signup")
    },hashTypes:{'class': "STRING",'modal': "STRING"},hashContexts:{'class': depth0,'modal': depth0},inverse:self.noop,fn:self.program(10, program10, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "anchor-link", options));
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n      ");
    stack1 = helpers._triageMustache.call(depth0, "signup-modal", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n    </div>\n\n  </div>\n");
    return buffer;
    }
  function program2(depth0,data) {
    
    
    data.buffer.push("\n      <img src=\"assets/images/simpletext2.png\" class=\"peanutlogo\"></img>\n    ");
    }

  function program4(depth0,data) {
    
    
    data.buffer.push("EVENTS");
    }

  function program6(depth0,data) {
    
    
    data.buffer.push("TEAM");
    }

  function program8(depth0,data) {
    
    
    data.buffer.push("SIGN IN");
    }

  function program10(depth0,data) {
    
    
    data.buffer.push("SIGN UP");
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
    data.buffer.push("\n\n\n");
    return buffer;
    
  });

});
define('master-plan-app/templates/components/about-section', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = '', stack1;
    data.buffer.push("\n    <div ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":large-4 :columns")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(" >\n      <img ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'src': ("tile.img")
    },hashTypes:{'src': "STRING"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(" />\n      <p ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":step-text")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(">\n      	");
    stack1 = helpers._triageMustache.call(depth0, "tile.text", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n      </p>\n    </div>\n  ");
    return buffer;
    }

    data.buffer.push("<div class=\"row\">\n  ");
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

    data.buffer.push("\n<h1 ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":hero-title")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(">\n  Find Event In Your City </h2>\n<h3 ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":hero-text")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push("> \n  View Events On a Map. Save Your Plan. Explore. </h3>\n\n<div ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":hero-buttons")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(" >\n  ");
    stack1 = helpers.each.call(depth0, "button", "in", "heroButtons", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n</div>\n");
    return buffer;
    
  });

});
define('master-plan-app/templates/components/learn-section', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', escapeExpression=this.escapeExpression;


    data.buffer.push("<!-- learn more section -->\n<h3 ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":section-title")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push("> See All Of Your Events In One Place </h3>\n<center>\n  <img ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'src': ("learnImageUrl")
    },hashTypes:{'src': "ID"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":example-image")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(" />\n</center>\n");
    return buffer;
    
  });

});
define('master-plan-app/templates/components/map-container', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1;


    data.buffer.push("\n<!--mapbox iframe-->\n<div class=\"map\">\n  <iframe width='100%' height='500px' frameBorder='0' src='https://a.tiles.mapbox.com/v4/jessicameyer.l366pfo3/attribution,zoompan,zoomwheel,geocoder,share.html?access_token=pk.eyJ1IjoiamVzc2ljYW1leWVyIiwiYSI6ImhBZDB3a1kifQ._wbp2K1vx0EjLTLlqNtX2g'></iframe>\n</div>\n\n");
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
    var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


    data.buffer.push("<!--map search, date, popular event toggle row-->\n<div class=\"row\">\n  <div class=\"filter-row\">\n    <div class=\"large-1 columns\"></div>\n    <div class=\"large-4 columns\">\n      <div class=\"panel\" id=\"search-panel\">\n        <li class=\"has-form\" id=\"search-row\">\n          <div class=\"row collapse\">\n            <div class=\"large-8 small-9 columns\">\n              ");
    data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
      'value': ("location"),
      'class': ("search"),
      'placeholder': ("Enter City or Zip")
    },hashTypes:{'value': "ID",'class': "STRING",'placeholder': "STRING"},hashContexts:{'value': depth0,'class': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
    data.buffer.push("\n            </div>\n            <div class=\"large-4 small-3 columns\">\n              <button class=\"button small\" id=\"submit-button\" type=\"submit\" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "buildQuery", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
    data.buffer.push(">");
    stack1 = helpers._triageMustache.call(depth0, "searchTitle", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("</button>\n            </div>\n          </div>\n        </li>\n      </div>\n    </div>\n    <div class=\"large-3 columns\">\n      <div class=\"calendar\">\n        <div class=\"panel\">\n          ");
    data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
      'value': ("startDate"),
      'class': ("span2"),
      'data-date-format': ("mm/dd/yy"),
      'id': ("dp2"),
      'placeholder': ("Choose Start Date")
    },hashTypes:{'value': "ID",'class': "STRING",'data-date-format': "STRING",'id': "STRING",'placeholder': "STRING"},hashContexts:{'value': depth0,'class': depth0,'data-date-format': depth0,'id': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
    data.buffer.push("\n        </div>\n      </div>\n    </div>\n    <div class=\"large-3 columns\">\n      <div class=\"panel\">\n        <div class=\"switch\">\n          ");
    data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
      'value': ("false"),
      'id': ("exampleCheckboxSwitch"),
      'type': ("checkbox")
    },hashTypes:{'value': "STRING",'id': "STRING",'type': "STRING"},hashContexts:{'value': depth0,'id': depth0,'type': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
    data.buffer.push("\n          <label for=\"exampleCheckboxSwitch\"></label>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n");
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
    var buffer = '', stack1;


    data.buffer.push("<!--filter-left-->\n<div class=\"icon-bar large-vertical four-up\">\n  <a class=\"item\">\n    <img src=\"assets/images/smallfilter.png\" >\n    <label>Filter</label>\n  </a>\n  <a class=\"item\">\n    <img src=\"assets/images/smallinfo.png\" >\n    <label>Info</label>\n  </a>\n</div>\n");
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


    data.buffer.push("<!--filter-right-->\n<div class=\"icon-bar large-vertical four-up\">\n  <a class=\"item\">\n    <img src=\"assets/images/smallnew.png\" >\n    <label>Create</label>\n  </a>\n  <a class=\"item\">\n    <img src=\"assets/images/smallplan.png\" >\n    <label>Plans</label>\n  </a>\n</div>\n");
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
    var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

  function program1(depth0,data) {
    
    var buffer = '', stack1;
    data.buffer.push("\n\n  <h1 class=\"create-title\"> Create Your Plan </h1>\n  <p class=\"create-text\"> Filter Events by Location, Date and Type. Save Your Plan and Explore. </p> \n\n  ");
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
    var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = '', stack1;
    data.buffer.push("\n      <div class=\"large-2 columns\">\n        <img ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":teampic"),
      'src': ("member.img")
    },hashTypes:{'class': "STRING",'src': "STRING"},hashContexts:{'class': depth0,'src': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(" />\n        <p class=\"about-text\"> ");
    stack1 = helpers._triageMustache.call(depth0, "member.role", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push(" </p>\n      </div>\n    ");
    return buffer;
    }

    data.buffer.push("<h3 class=\"section-title\"> Meet Our Developers </h3>\n<div class=\"team-pad\">\n  <div class=\"row\">\n    <div class=\"large-1 columns\"></div>\n    ");
    stack1 = helpers.each.call(depth0, "member", "in", "teamMembers", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n    <div class=\"large-1 columns\"></div>\n  </div>\n</div>\n");
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
    data.buffer.push("\n\n<!-- Display Map -->\n<div class=\"row\" id=\"map-container\">\n  <!-- Display Top Horizantal Map Filters -->\n  ");
    data.buffer.push(escapeExpression((helper = helpers['map-filter-bar'] || (depth0 && depth0['map-filter-bar']),options={hash:{
      'searchTitle': ("Search"),
      'search': ("search")
    },hashTypes:{'searchTitle': "STRING",'search': "STRING"},hashContexts:{'searchTitle': depth0,'search': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "map-filter-bar", options))));
    data.buffer.push("\n  <div class=\"large-1 columns\">\n    <!-- Display Left Vertical Map Filters -->\n    ");
    stack1 = helpers._triageMustache.call(depth0, "map-filter-left", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n  </div>\n  <div class=\"large-10 columns\">\n    <!-- Display Map -->\n    ");
    stack1 = helpers._triageMustache.call(depth0, "map-container", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n  </div>\n  <div class=\"large-1 columns\">\n    <!-- Display Right Vertical Map Filters -->\n    ");
    stack1 = helpers._triageMustache.call(depth0, "map-filter-right", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n  </div>\n\n</div>\n");
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
    data.buffer.push("\n");
    return buffer;
    }

    data.buffer.push("<!-- index -->\n<div id=\"main\">\n  <section id=\"hero\">\n    ");
    data.buffer.push(escapeExpression((helper = helpers['hero-wrapper'] || (depth0 && depth0['hero-wrapper']),options={hash:{
      'buttons': ("heroButtons")
    },hashTypes:{'buttons': "ID"},hashContexts:{'buttons': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "hero-wrapper", options))));
    data.buffer.push("\n  </section>\n</div>\n");
    stack1 = (helper = helpers['foundation-row-wrapper'] || (depth0 && depth0['foundation-row-wrapper']),options={hash:{
      'divSubClassNames': ("large-12 columns")
    },hashTypes:{'divSubClassNames': "STRING"},hashContexts:{'divSubClassNames': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "foundation-row-wrapper", options));
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    stack1 = helpers._triageMustache.call(depth0, "about-section", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    stack1 = helpers._triageMustache.call(depth0, "team-section", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n\n");
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
define('master-plan-app/templates/plans', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    


    data.buffer.push("<h2>Sign up to customize your itinerary!</h2>\n<p class=\"lead\">Your couch.  It is mine.</p>\n<p>I'm a cool paragraph that lives inside of an even cooler modal. Wins!</p>\n<a class=\"close-reveal-modal\">&#215;</a>}}");
    
  });

});
define('master-plan-app/templates/users', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = '', helper, options;
    data.buffer.push("\n        ");
    data.buffer.push(escapeExpression((helper = helpers['user-info'] || (depth0 && depth0['user-info']),options={hash:{
      'user': ("user")
    },hashTypes:{'user': "ID"},hashContexts:{'user': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "user-info", options))));
    data.buffer.push("\n      ");
    return buffer;
    }

    data.buffer.push("<div class=\"pageClass\">\n  <section class=\"userSection clearfix\">\n    <br>\n    <h2>Users</h2>\n    <div>\n      There are currently <strong><em>");
    stack1 = helpers._triageMustache.call(depth0, "users.length", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("</em></strong> users in our dummy db\n    </div>\n    <ul class=\"singleUserList clearfix\">\n      ");
    stack1 = helpers.each.call(depth0, "user", "in", "users", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n    </ul>\n  </section>\n</div>");
    return buffer;
    
  });

});
define('master-plan-app/templates/users/new', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


    data.buffer.push("<div class=\"container\">\n  <form ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "createUser", "model", {hash:{
      'on': ("submit")
    },hashTypes:{'on': "STRING"},hashContexts:{'on': depth0},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
    data.buffer.push(">\n    <br><br><br>\n    <h2>Create User</h2>\n\n    <h4>First Name<h4>\n    ");
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
    data.buffer.push("\n\n    <button class=\"btn btn-primary btn-block\" type=\"submit\">Submit</button>\n  </form>\n</div>");
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
    ok(false, 'app.js should pass jshint.\napp.js: line 6, col 8, \'TextField\' is defined but never used.\n\n1 error'); 
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
    ok(true, 'components/map-filter-bar.js should pass jshint.'); 
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
define('master-plan-app/tests/controllers/users/new.jshint', function () {

  'use strict';

  module('JSHint - controllers/users');
  test('controllers/users/new.js should pass jshint', function() { 
    ok(true, 'controllers/users/new.js should pass jshint.'); 
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
define('master-plan-app/tests/master-plan-app/tests/unit/routes/plans-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/routes');
  test('master-plan-app/tests/unit/routes/plans-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/routes/plans-test.js should pass jshint.'); 
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
define('master-plan-app/tests/routes/plans.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/plans.js should pass jshint', function() { 
    ok(true, 'routes/plans.js should pass jshint.'); 
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
define('master-plan-app/tests/unit/routes/plans-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:plans", "PlansRoute", {});

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