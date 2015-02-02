import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['reveal-modal'],

    attributeBindings: ['modalId:id', 'dataReveal:data-reveal'],

    modalId: "signup",
    dataReveal: ""

});
