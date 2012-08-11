
//
// SERVER STARTUP
//

Meteor.startup(function () {

  // Publish cells on startup to sync initial state
  Meteor.publish("cells", function() {
    return Cells.find();
  });

  // Init Game Of Life in server side
  if (Cells.find().count() !== (Cells.cols*Cells.rows)) {

    // Reset
    Cells.remove({});

    // Reseed
    for (var row = 0; row < Cells.rows; row++) {
      for (var col = 0; col < Cells.cols; col++) {
        random_state = _.shuffle([1, 0])[0];
        Cells.insert({row: row, col: col, alive: random_state});
      }
    }
  }

});
