
//
// CLIENT USERS STARTUP
//

Meteor.startup(function() {

  Meteor.subscribe("users");

  user_id = Users.insert({name: '', last_keepalive: (new Date()).getTime()});
  Session.set('user_id', user_id);

  Meteor.setInterval(function() {
    if (Meteor.status().connected) {
      Meteor.call('keepalive', Session.get('user_id'));
    }
  }, 6*1000);

});

