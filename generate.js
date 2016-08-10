'use strict';

// var threeLetterWordsArr = require('./threeLetterWords');
//
// var tempArray = ['dog', 'cat', 'crackers', 'frog', 'bottle', 'boot'];

const t = true;
const f = false;

// Define the "word location" class
const ACROSS = 'across';
const DOWN = 'down';

var WordLocations = function(direction, row, column, grid) {
	this.direction = direction;
	this.row = row;
	this.column = column;
	this.length = this.checkLength(grid);
	this.domain = []; //list of words
};

WordLocations.prototype.checkLength = function(grid) {
	//return length of WordLocation
	if (this.direction === ACROSS) {
		return this._checkLengthAcross(grid);
	} else if (this.direction === DOWN) {
		return this._checkLengthDown(grid);
	} else {
		throw new Error('Invalid direction value: ' + this.direction);
	}
};

WordLocations.prototype._checkLengthAcross = function(grid) {
	var currItr = this.column + 1;
	var count = 1;
	while (!grid[this.row][currItr]) {
		count += 1;
		currItr += 1;
	}
	return count;
};

WordLocations.prototype._checkLengthDown = function(grid) {
	var currItr = this.row + 1;
	var count = 1;
	while (!grid[currItr][this.column]) {
		count += 1;
		currItr += 1;
	}
	return count;
};

// Write a function that can reduce the total dictionary 
// to the number of words matching the length of a "word location"
WordLocations.prototype.reduceDict = function(dictArr) {
	var dictionary = [];
	for (var i = 0; i < dictArr.length; i++) {
  		if (dictArr[i].length <= this.length && dictArr[i].length > 1) {
    		dictionary.push(dictArr[i]);
  		}
	}
	return dictionary;
}; 

//function that initialize word locations
//accepts grid as an input
//everytime a location is found, add it to an array
function initializeWordLocations(grid) {
	var wLocations = {};
	wLocations[ACROSS] = [];
	wLocations[DOWN] = [];

	var position = 1;
	for(var r = 0; r < grid.length; r++) {
		for(var c = 0; c < grid[r].length; c++) {
			var square = grid[r][c];
			for(var direction in wLocations) {
				var wallPrior = false;
				var emptyAfter = false;

				if(direction === ACROSS) {
					if(grid[r][c + 1]) {
						emptyAfter = true;
					} else if (grid[r][c - 1]) {
						wallPrior = true;	
				} else {
					if(grid[r + 1][c]) {
						emptyAfter = true;
					} else if (grid[r - 1][c]) {
						wallPrior = true;
					}
				}
				
				if(square && wallPrior && emptyAfter) {
					var currentLoc = new WordLocations(direction, r, c, grid);
					wLocations[direction].push(currentLoc);
				}
			}
		}
	}
	return wLocations;
}
	//for every square in the grid
	  // if it's a valid WL
	  // implies checking direction
	  // new WordLocation(dir, row, col, grid)


// Input:
//    A set of variables X
//    A set of domains D(x) for each variable x in X. D(x) contains vx0, vx1... vxn, the possible values of x
//    A set of unary constraints R1(x) on variable x that must be satisfied
//    A set of binary constraints R2(x, y) on variables x and y that must be satisfied
//
//  Output:
//    Arc consistent domains for each variable.

 // function ac3 (X, D, R1, R2) //X = var, D = domain
 // // Initial domains are made consistent with unary constraints.
 //     for each x in X  //for each values of X
 //         D(x) := { x in D(x) | R1(x) } //for every value in the domain
 //     // 'worklist' contains all arcs we wish to prove consistent or not.
 //     worklist := { (x, y) | there exists a relation R2(x, y) or a relation R2(y, x) }//make worklist a separate function

 //     do
 //         select any arc (x, y) from worklist //select random arc
 //         worklist := worklist - (x, y)
 //         if arc-reduce (x, y)
 //             if D(x) is empty //if the domain of x is empty
 //                 return failure
 //             else
 //                 worklist := worklist + { (z, x) | z != y and there exists a relation R2(x, z) or a relation R2(z, x) }
 //     while worklist not empty

 // function arc-reduce (x, y)
 //     bool change = false //iniitalized to false
 //     for each vx in D(x) //for each value of x in domain
 //         find a value vy in D(y) such that vx and vy satisfy the constraint R2(x, y)
 //         if there is no such vy {
 //             D(x) := D(x) - vx //remove from domain
 //             change := true //and set to true
 //     return change

var aC3 = function() {

}


