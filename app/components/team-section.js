import Ember from 'ember';

export default Ember.Component.extend({
    tagName: ['section'],
    classNames: ['about-section'],

    teamMembers: [ {
      "id": 1,
      "name": "Alex Ford",
      "role": "Front-End",
      "img": 'assets/images/alex.jpg'
    }, {
      "id": 2,
      "name": "Jessica Meyer",
      "role":  "Front-End",
      "img": 'assets/images/jessica.jpg'
    }, {
      "id": 3,
      "name": "John Goldsmith",
      "role":  "Back-End",
      "img": 'assets/images/john.jpg'
    }, {
      "id": 4,
      "name": "Melizza Patterson",
      "role": "Back-End",
      "img": 'assets/images/melissa.jpeg'
    }, {
      "id": 5,
      "name": "Spenser Filler",
      "role":  "Back-End",
      "img": 'assets/images/spenser.jpeg'
    }]
});
