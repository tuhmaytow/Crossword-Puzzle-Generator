#Crossword-Puzzle-Generator

A single page app that generates random words into the grid.

#A Constraint Satisfaction Problem
----------------------------------
A crossword puzzle is perfect real-world example of aconstraint satisfaction problem. A solution to a crossword puzzle, after all, is an assignment of words to a grid such that each meets a number of constraints: a semantic constraint provided by the clue, a length constraint provided by the grid, and constraints on its its letters provided by the words which it overlaps in the grid. Similarly, the construction of a puzzle is based on similar constraints, although the application is somewhat different. 


#Algorithm
###AC-3 Algorithm 
----------------------------------
Arc consistency allows determining whether the grid is consistent or there are word patterns which cannot be instantiated with words. Arc-consistency prevents having to search the entire grid for a word pattern to backtrack to when some word
pattern cannot be instantiated. To implement arc-consistency, a hash table was used which has as keys each element belonging to the “across” and “down” word patterns and as values a list consisting of intersecting word patterns.
<img width="888" alt="screen shot 2016-09-04 at 10 29 24 am" src="https://cloud.githubusercontent.com/assets/16325330/18232703/83a0f1e6-728a-11e6-8b54-363664c569c2.png">

#Word picking strategy
----------------------------------
The word picking strategy chooses a word from our list of dictionary words to fill a pattern with and maximizes the number of choices for the remaining patterns in the grid. 

#Technologies Implemented
----------------------------------
* JavaScript
* AC-3 Algorithm
* HTML
* CSS

#Result and Analysis
----------------------------------
![ezgif com-video-to-gif](https://cloud.githubusercontent.com/assets/16325330/18232659/74d9ec0e-7289-11e6-86fd-db322874d493.gif)
The crossword puzzle grid that we used was a small 5X5 grid. These grids have a lattice-like structure, with a minimal amount of black squares. These grids also have 180-degree rotational symmetry, so that the pattern appears the same even if turned upside down.

#TO-DO
----------------------------------
* Implement on a larger grid
