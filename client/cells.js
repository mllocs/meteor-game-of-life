
//
// CLIENT CELLS STARTUP
//

Meteor.startup(function() {

  // Once received the initial cell states from
  // the server, create the GameOfLife object
  Meteor.subscribe("cells", function() {
    GameOfLife.init();
  });

  // Update server changes to local cache matrices to
  // enable multiple users
  Cells.find().observe({
    changed: function(nd, ind, od) {
      GameOfLife.cell_states[nd.row][nd.col] = nd.alive;
    }
  });
});
