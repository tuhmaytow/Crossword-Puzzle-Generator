'use strict';

var threeLetterWordsArr = require('./threeLetterWords');

const t = true;
const f = false;

const ACROSS = 'across';
const DOWN = 'down';

var WordLocation = function(direction, row, column, grid) {
	this.direction = direction;
	this.row = row;
	this.column = column;
	this.length = this.checkLength(grid);
	this.domain = []; //list of words
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


// reduce the total dictionaryto the number of words matching the length of a word location
WordLocation.prototype.reduceDict = function(dictArr) {
	var dictionary = [];
	for (var i = 0; i < dictArr.length; i++) {
  		if (dictArr[i].length <= this.length && dictArr[i].length > 1) {
    		dictionary.push(dictArr[i]);
  		}
	}
	this.domain = dictionary;
};

// everytime a location is found, add it to an array
function initializeWordLocations(grid) {
	var wLocations = {};
	wLocations[ACROSS] = [];
	wLocations[DOWN] = [];

	for(var r = 0; r < grid.length; r++) {
		for(var c = 0; c < grid[r].length; c++) {
			var square = grid[r][c];
			for(var direction in wLocations) {
				var wallPrior = false;
				var emptyAfter = false;

				if(direction === ACROSS) {
					if(grid[r][c + 1]) {
						emptyAfter = true;
					}
					if(!grid[r][c - 1]) {
						wallPrior = true;
					}
				} else {
					if(grid[r + 1] !== undefined && grid[r + 1][c] === true) {
						emptyAfter = true;
					}
					if(grid[r - 1] === undefined || grid[r - 1][c] === false) {
						wallPrior = true;
					}
				}

				if(square && wallPrior && emptyAfter) {
					var currentLoc = new WordLocation(direction, r, c, grid);
					wLocations[direction].push(currentLoc);
				}
			}
		}
	}
	return wLocations;
}


var grid = [
	[t, t, t, t, t],
	[t, f, t, f, t],
	[t, t, t, t, t],
	[t, f, t, f, t],
	[t, t, t, t, t]
];

var wLocations = initializeWordLocations(grid);

var findAcrossWL = function(wLocations, row, column) {
	var dirAcross = wLocations.across;
	for (var i = 0; i < dirAcross.length; i++) {
		if (row === dirAcross[i].row && dirAcross[i].column <= column && column < dirAcross[i].column + dirAcross[i].length) {
			return dirAcross[i];
		}
	}
	return false;
};

var findDownWL = function(wLocations, row, column) {
	var dirDown = wLocations.down;
	for (var i = 0; i < dirDown.length; i++) {
		if (column === dirDown[i].column && dirDown[i].row <= row && row < dirDown[i].row + dirDown[i].length) {
			return dirDown[i];
		}
	}
	return false;
};

var r2 = function(wLocations) {
	var result = [];
	var dirAcross = wLocations.across;
	var dirDown = wLocations.down;
	for (var i = 0; i < dirAcross.length; i++) {
		for (var j = 0; j < dirDown.length; j++) {
			var acrossWL = findAcrossWL(wLocations, dirAcross[i].row, dirAcross[i].column);
			var downWL = findDownWL(wLocations, dirDown[j].row, dirDown[j].column);
			if (acrossWL && downWL) {
				result.push({acrossWL, downWL});
			}
		}
	}
	return result;
};

console.log(r2(wLocations));
