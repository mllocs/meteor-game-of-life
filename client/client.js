
//
// COLLECTIONS
//

Cells = new Meteor.Collection("cells");


//
// CLIENT STARTUP
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


//
// TEMPLATES
//

// > GRID Template
Template.grid.cells = function() {
  return Cells.find({}, {sort: [["row", "asc"], ["col", "asc"]] });
};

// > CELL Template
Template.cell.events = {
  'click' : function () {
    GameOfLife.toggleState(this._id);
  }
};

Template.cell.cssClass = function() {
  return this.alive === 1 ? 'white' : 'black';
};

// > BUTTONS Template
Template.buttons.events = {
  // Step button
  'click #step' : function () {
    GameOfLife.step();
  },
  // Reset button
  'click #reset' : function () {
    GameOfLife.reset();
  }
};

