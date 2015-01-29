import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return {
      "users":[ 
      {
        "id": 1,
        "username": "AveryWashington",
        "email": "avery@washington.com"
      }, {
        "id": 2,
        "username": "PaulShellington",
        "email": "paul@shellington.com"
      }, {
        "id": 3,
        "username":  "JacobMars",
        "email": "jacob@mars.com"
      } ]
    };
  }
});
