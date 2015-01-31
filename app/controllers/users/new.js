import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createUser: function() {
      debugger;
      var user = this.store.createRecord('user');
      user.set('first', this.get('first'));
      user.set('last', this.get('last'));
      user.set('email', this.get('email'));
      user.set('password', this.get('password'));

      user.save()
      .then(function(){
        alert('User was saved!');
      })
      .catch(function(){
        alert('User had an error');
      });
    }
  }
});
