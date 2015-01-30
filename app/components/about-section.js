import Ember from 'ember';

export default Ember.Component.extend({
    tagName: ['section'],
    classNames: ['about-section'],

    aboutImageUrl: 'http://placehold.it/400x300&text=[img]',

    aboutTiles:[ {
      "id": 1,
      "text": "see all your events on a map",
      "img": 'http://placehold.it/400x300&text=[img]'
    }, {
      "id": 2,
      "text":  "filter your events to create a custom map",
      "img": 'http://placehold.it/400x300&text=[img]'
    }, {
      "id": 3,
      "text":  "view your plan",
      "img": 'http://placehold.it/400x300&text=[img]'
    } ]
});
