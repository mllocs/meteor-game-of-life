
//
// CLIENT USERS STARTUP
//

Meteor.startup(function() {

  // Subscribe to users Collection
  Meteor.subscribe("users");

  // Create new user (since I'm not using any cookie I cannot identify retourning visitors)
  user_id = Users.insert({name: '', last_keepalive: (new Date()).getTime()});
  Session.set('user_id', user_id);

  // Keep the user alive
  Meteor.setInterval(function() {
    if (Meteor.status().connected) {
      Meteor.call('keepalive', Session.get('user_id'));
    }
  }, 6*1000);

});

