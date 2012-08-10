if (Meteor.is_client) {

  Template.grid.cells = function() {
    //return Cells.find({ sort: { row: 1 }});
    return Cells.find({}, {sort: [["row", "asc"], ["col", "asc"]] });
  };

  Template.cell.events = {
    'click' : function () {
      // template data, if any, is available in 'this'
      Cells.toggleState(this._id);
    }
  };

  Template.cell.cssClass = function() {
    return this.alive === true ? 'white' : 'black';
  };

  Template.buttons.events = {
    'click #step' : function () {
      Cells.gol.step();
    },
    'click #reset' : function () {
      Cells.reset();
    }
  };

}


if (Meteor.is_server) {

  Meteor.startup(function () {
    // Set data values if not present
    if (Cells.find().count() === 0) { Cells.init(); }
  });
}