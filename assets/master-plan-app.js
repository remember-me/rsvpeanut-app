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
define('master-plan-app/router', ['exports', 'ember', './config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.resource("user", function () {});
    this.resource("event", function () {});
    this.resource("itinerary", function () {});
  });

  exports['default'] = Router;

});
define('master-plan-app/routes/event', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('master-plan-app/routes/itinerary', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('master-plan-app/routes/user', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('master-plan-app/templates/application', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1;


    data.buffer.push("<h2 id=\"title\">Welcome to Ember.js</h2>\n\n<a href=\"#\" class=\"button\">Button</a>\n\n<a href=\"#\" class=\"button\">2ndButton</a>\n\n");
    stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    return buffer;
    
  });

});
define('master-plan-app/templates/event', ['exports', 'ember'], function (exports, Ember) {

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
define('master-plan-app/templates/itinerary', ['exports', 'ember'], function (exports, Ember) {

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
define('master-plan-app/templates/user', ['exports', 'ember'], function (exports, Ember) {

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
define('master-plan-app/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(true, 'app.js should pass jshint.'); 
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
define('master-plan-app/tests/master-plan-app/tests/unit/routes/event-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/routes');
  test('master-plan-app/tests/unit/routes/event-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/routes/event-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/unit/routes/itinerary-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/routes');
  test('master-plan-app/tests/unit/routes/itinerary-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/routes/itinerary-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/master-plan-app/tests/unit/routes/user-test.jshint', function () {

  'use strict';

  module('JSHint - master-plan-app/tests/unit/routes');
  test('master-plan-app/tests/unit/routes/user-test.js should pass jshint', function() { 
    ok(true, 'master-plan-app/tests/unit/routes/user-test.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/router.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('router.js should pass jshint', function() { 
    ok(true, 'router.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/routes/event.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/event.js should pass jshint', function() { 
    ok(true, 'routes/event.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/routes/itinerary.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/itinerary.js should pass jshint', function() { 
    ok(true, 'routes/itinerary.js should pass jshint.'); 
  });

});
define('master-plan-app/tests/routes/user.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/user.js should pass jshint', function() { 
    ok(true, 'routes/user.js should pass jshint.'); 
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
define('master-plan-app/tests/unit/routes/event-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:event", "EventRoute", {});

  ember_qunit.test("it exists", function () {
    var route = this.subject();
    ok(route);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('master-plan-app/tests/unit/routes/itinerary-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:itinerary", "ItineraryRoute", {});

  ember_qunit.test("it exists", function () {
    var route = this.subject();
    ok(route);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('master-plan-app/tests/unit/routes/user-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:user", "UserRoute", {});

  ember_qunit.test("it exists", function () {
    var route = this.subject();
    ok(route);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

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