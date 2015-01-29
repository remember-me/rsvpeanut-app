import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return {
      "heroButtons":[ 
      {
        "id": 1,
        "class": "button large",
        "attrId": "hero-button1",
        "content": "Get Started",
        "linkToHref": "start"
      }, {
        "id": 2,
        "class":  "button large",
        "attrId": "hero-button2",
        "content": "Learn More",
        "linkToHref": "learn"
      } ]
    };
  }
});
