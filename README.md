Game of Life - Meteor implemetation
===================================

This is my first application using Meteor framework. It's a simple
implementation of [Conway's Game of Life](http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life). It's just a divertimento to
take a look at Meteor. 

It's execution is very slow since there are hundreds of MongoDB queries
in each step. I want to improve the performance in the future using
an aliveNeighbours count.
