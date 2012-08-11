
//
// COLLECTIONS
//

Cells = new Meteor.Collection("cells");


//
// SERVER STARTUP
//

Meteor.startup(function () {

  // Publish cells on startup to sync initial state
  Meteor.publish("cells", function() {
    return Cells.find();
  });

  // Init Game Of Life in server side
  if (Cells.find().count() === 0) {
    for (var row = 0; row < this.rows; row++) {
      for (var col = 0; col < this.cols; col++) {
        random_state = _.shuffle([1, 0])[0];
        Cells.insert({row: row, col: col, alive: random_state});
      }
    }
  }

});
