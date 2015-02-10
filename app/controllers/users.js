import Ember from 'ember';

export default Ember.Controller.extend({

  currentUser: null,

  actions: {
    signInUser: function() {

      var users = this.get('users');
      var email = this.get('email');
      var password = this.get('password');

      // Find User
      var user = users.find( function(u) {
        var e = u.get('email');
        var p = u.get('password');
        return (email === e && password === p);
      });

      if (!user) {  // user undefined / not found
        alert('User does not exist');
      } else {
        this.set('currentUser', user);
      }
    }
  }
});
