
//
// SERVER USERS STARTUP
//

Meteor.startup(function () {

  // Publish cells on startup to sync initial state
  Meteor.publish("users", function() {
    var now = (new Date()).getTime();
    var idle_threshold = now - 7*1000;
    return Users.find({ 'last_keepalive': { $gt: idle_threshold } });
  });

});

Meteor.methods({
  keepalive: function (user_id) {
    var now = (new Date()).getTime();
    var remove_threshold = now - 8*1000;
    Users.update({_id: user_id }, { $set: { last_keepalive: now } });
    Users.remove({ 'last_keepalive': { $lt: remove_threshold }});
  }
});

