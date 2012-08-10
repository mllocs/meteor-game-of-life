
// Syncronizes DB and cache matrix
Meteor.startup(function() {
  Cells.find().observe({
    changed: function(nd, ind, od) {
      GameOfLife.cell_states[nd.row][nd.col] = nd.alive;
    }
  });
});

//
// TEMPLATES
//

Template.grid.cells = function() {
  //return Cells.find({ sort: { row: 1 }});
  return Cells.find({}, {sort: [["row", "asc"], ["col", "asc"]] });
};

Template.cell.events = {
  'click' : function () {
    // template data, if any, is available in 'this'
    GameOfLife.toggleState(this._id);
  }
};

Template.cell.cssClass = function() {
  return this.alive === 1 ? 'white' : 'black';
};

Template.buttons.events = {
  'click #step' : function () {
    GameOfLife.step();
  },
  'click #reset' : function () {
    GameOfLife.reset();
  }
};

