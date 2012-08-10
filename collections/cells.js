Cells = new Meteor.Collection("cells");

Cells.rows = 10;
Cells.cols = 10;

Cells.init = function() {
  var states = [true, false];
  for (row = 0; row < Cells.rows; row++) {
    for (col = 0; col < Cells.cols; col++) {
      random_state = _.shuffle(states)[0];
      Cells.insert({row: row, col: col, alive: random_state});
    }
  }
};

Cells.reset = function() {
  for (row = 0; row < Cells.rows; row++) {
    for (col = 0; col < Cells.cols; col++) {
      Cells.update({row: row, col: col}, {$set: {alive: false}});
    }
  }
};

Cells.toggleState = function(id) {
  if (Cells.findOne(id).alive === false) {
    Cells.update(id, {$set: {alive: true}});

  } else if (Cells.findOne(id).alive === true) {
    Cells.update(id, {$set: {alive: false}});
  }
};

// Game of life implementation
Cells.gol = {

  cellAlive: function(row, col) {
    return Cells.findOne({ col: col, row: row }).alive
  },

  neighboursAlive: function(row, col) {
    return Cells.find( {
      $or: [
        {alive: true, row: row - 1, col: col - 1 },
        {alive: true, row: row - 1, col: col     },
        {alive: true, row: row - 1, col: col + 1 },
        {alive: true, row: row,     col: col - 1 },
        {alive: true, row: row,     col: col + 1 },
        {alive: true, row: row + 1, col: col - 1 },
        {alive: true, row: row + 1, col: col     },
        {alive: true, row: row + 1, col: col + 1 }
      ]
    }).count();
  },

  updateTempValue: function(row, col) {

    na        = this.neighboursAlive(row, col);
    alive     = this.cellAlive(row, col);
    tmp_alive = alive;

    if ((na < 2) && (alive === true)) {

      // Any live cell with fewer than two live neighbours dies
      // , as if caused by under-population
      tmp_alive = false;

    } else if ((na > 3) && (alive === true)) {

      // Any live cell with two or three live neighbours 
      // lives on to the next generation.
      tmp_alive = false;

    } else if ((na === 3) && (alive === false)) {

      // Any dead cell with exactly three live neighbours becomes 
      // a live cell, as if by reproduction.
      tmp_alive = true;

    }

    Cells.update({row: row, col: col}, {$set: {tmp_alive: tmp_alive}})
  },

  updateValue: function(row, col) {
    tmp_alive = Cells.findOne({row: row, col: col}).tmp_alive;
    Cells.update({row: row, col: col}, {$set: {alive: tmp_alive}});
  },

  step: function() {

    for (row = 0; row < Cells.rows; row++) {
      for (col = 0; col < Cells.cols; col++) {
        this.updateTempValue(row, col);
      }
    }

    for (row = 0; row < Cells.rows; row++) {
      for (col = 0; col < Cells.cols; col++) {
        this.updateValue(row, col);
      }
    }
  }
};
