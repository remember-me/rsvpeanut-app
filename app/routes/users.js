import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('user');
  },

  setupController: function (controller, model) {
    controller.set('users', model.content);
  },

  renderTemplate: function () {
    this._super();
    this.render('users/new', {
      into: 'users',
      controller: 'users.new'
    });
  }
});
