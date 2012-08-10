Game of Life on Meteor
======================

This is my first application using Meteor framework.

It's a simple implementation of [Conway's Game of Life](http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life), a divertimento to
take a look at Meteor. 

*It's execution is very slow* since there are hundreds of MongoDB queries
in each step. I would like to improve the performance in the future using
an aliveNeighbours count.

You can try it at [http://game-of-life.meteor.com/](http://game-of-life.meteor.com/).
