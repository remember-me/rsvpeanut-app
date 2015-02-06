import Ember from 'ember';

export default Ember.Component.extend({
    tagName: ['div'],
    classNames: ['about-section'],

    aboutTiles:[ {
      "id": 1,
      "text": "create a custom plan of things to do",
      "img": 'assets/images/create.png',
      "attrId": "step-icon"
    }, {
      "id": 2,
      "text":  "filter your events to create a custom map",
      "img": 'assets/images/filter.png',
      "attrId": "step-icon"
    }, {
      "id": 3,
      "text":  "view your plan on a map and explore",
      "img": 'assets/images/map.png',
      "attrId": "step-icon"
    } ]
});
