
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
  'click #step' : function() {
    GameOfLife.step();
  },
  // Reset button
  'click #reset' : function() {
    GameOfLife.reset();
  }
};

// > FOOTER Template
Template.footer.online_users = function() {
  oc = Users.find().count();
  return oc + " online users";
}
