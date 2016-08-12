'use strict';

var dictionary = require('./wordlist');

const ACROSS = 'across';
const DOWN = 'down';

var WordLocation = function(direction, row, column, grid) {
	this.direction = direction;
	this.row = row;
	this.column = column;
	this.length = this.checkLength(grid);
	this.wordsRemaining = []; //domain
};

//return length of WordLocation
WordLocation.prototype.checkLength = function(grid) {
	if (this.direction === ACROSS) {
		return this._checkLengthAcross(grid);
	} else if (this.direction === DOWN) {
		return this._checkLengthDown(grid);
	} else {
		throw new Error('Invalid direction value: ' + this.direction);
	}
};

WordLocation.prototype._checkLengthAcross = function(grid) {
	var currItr = this.column + 1;
	var count = 1;
	while (grid[this.row][currItr]) {
		count += 1;
		currItr += 1;
	}
	return count;
};

WordLocation.prototype._checkLengthDown = function(grid) {
	var currItr = this.row + 1;
	var count = 1;
	while (grid[currItr] !== undefined && grid[currItr][this.column]) {
		count += 1;
		currItr += 1;
	}
	return count;
};

// reduce the total dictionary to the number of words matching the length of a word location
WordLocation.prototype.reduceDict = function(dictArr) {
	var dictionary = [];
	for (var i = 0; i < dictArr.length; i++) {
  		if (dictArr[i].length === this.length) {
    		dictionary.push(dictArr[i]);
  		}
	}
	this.wordsRemaining = dictionary;
};

WordLocation.ACROSS = ACROSS;
WordLocation.DOWN = DOWN;
module.exports = WordLocation;
