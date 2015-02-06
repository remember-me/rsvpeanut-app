import Ember from 'ember';

export default Ember.Component.extend({
    tagName: ['div'],
    classNames: ['team-section'],

    attributeBindings: ['team:id'],

    team: "team",

    teamMembers: [ {
      "id": 1,
      "name": "Alex Ford",
      "title": "Front-End",
      "img": 'assets/images/alex.jpg'
    }, {
      "id": 2,
      "name": "Jessica Meyer",
      "title":  "Front-End",
      "img": 'assets/images/jessica.jpg'
    }, {
      "id": 3,
      "name": "John Goldsmith",
      "title":  "Back-End",
      "img": 'assets/images/john.jpg'
    }, {
      "id": 4,
      "name": "Melizza Patterson",
      "title": "Back-End",
      "img": 'assets/images/melissa.jpeg'
    }, {
      "id": 5,
      "name": "Spenser Filler",
      "title":  "Back-End",
      "img": 'assets/images/spenser.jpeg'
    }]
});

