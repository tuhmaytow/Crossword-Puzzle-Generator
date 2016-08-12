var WordLocation = require('./generate.js')


var ac3 = function (allWordLocations, allWords) { //(grid, allWords)

    // var allWordLocations = initializeWordLocations(grid);
    
    // for (var direction in allWordLocations) {
    //     for(var idx in allWordLocations[direction]) {
    //         var wordLocation = allWordLocations[direction][idx];
    //         wordLocation.reduceDict(allWords);
    //     } 
    // } 

    var worklist = findOverlappingWL(allWordLocations);

    while (worklist.length !== 0) {
        var arc = selectAndRemoveRandomArc(worklist);
        var leftWL = arc[0];
        var rightWL = arc[1];

        if (arcReduce(leftWL, rightWL)) {
            if (leftWL.wordsRemaining.length === 0) { 
                return "No Possible Solutions";
            } else {
                var newArcs = expandWL(allWordLocations, leftWL, rightWL);
                worklist = worklist.concat(newArcs);
            }
        }
    }
    return allWordLocations;
}

var arcReduce = function(leftWL, rightWL) {
    var change = false;

    // Find the proper indexes that overlap
    if (leftWL.direction === WordLocation.ACROSS) {
        var leftWordIdx = rightWL.column - leftWL.column; 
        var rightWordIdx = leftWL.row - rightWL.row;
    }
    else {
        var leftWordIdx = rightWL.row - leftWL.row; 
        var rightWordIdx = leftWL.column - rightWL.column;
    }
    // console.log('Remaining Words: ',leftWL.wordsRemaining)
    for (var leftIdx = 0; leftIdx < leftWL.wordsRemaining.length; leftIdx++) {
        var leftWord = leftWL.wordsRemaining[leftIdx];
        var leftWordFits = false;
        // console.log('Trying ', leftWord)
        for (var rightIdx = 0; rightIdx < rightWL.wordsRemaining.length; rightIdx++) {
            var rightWord = rightWL.wordsRemaining[rightIdx];
            
            if (leftWord[leftWordIdx] === rightWord[rightWordIdx]) { /* find a word that works */
                leftWordFits = true;
                break;
            }
        }

        if (!leftWordFits) { /* never found a word that fits*/
            // console.log('Removing word', leftWL.wordsRemaining[leftIdx])
            leftWL.wordsRemaining.splice(leftIdx, 1);
            leftIdx--; // if you don't do this, you'll skip a word b/c we spliced a word out above
            change = true;
        }
    }
    return change;
};

// everytime a location is found, add it to an array
function initializeWordLocations(grid) {
    var wLocations = {};
    wLocations[WordLocation.ACROSS] = [];
    wLocations[WordLocation.DOWN] = [];

    for (var row = 0; row < grid.length; row++) {
        for (var col = 0; col < grid[row].length; col++) {
            var square = grid[row][col];
            for (var direction in wLocations) {
                var wallPrior = false;
                var emptyAfter = false;

                if (direction === WordLocation.ACROSS) {
                    if (grid[row][col + 1]) {
                        emptyAfter = true;
                    }
                    if (!grid[row][col - 1]) {
                        wallPrior = true;
                    }
                } else {
                    if (grid[row + 1] !== undefined && grid[row + 1][col] === true) {
                        emptyAfter = true;
                    }
                    if (grid[row - 1] === undefined || grid[row - 1][col] === false) {
                        wallPrior = true;
                    }
                }

                if (square && wallPrior && emptyAfter) {
                    var currentLoc = new WordLocation(direction, row, col, grid);
                    wLocations[direction].push(currentLoc);
                }
            }
        }
    }
    return wLocations;
}

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

var findOverlappingWL = function(wLocations) {
    var result = [];
    var dirAcross = wLocations.across;
    var dirDown = wLocations.down;
    // console.log(wLocations)
    for (var i = 0; i < dirAcross.length; i++) {
        for (var j = 0; j < dirDown.length; j++) {
            var acrossWL = findAcrossWL(wLocations, dirAcross[i].row, dirAcross[i].column);
            var downWL = findDownWL(wLocations, dirDown[j].row, dirDown[j].column);
            if (acrossWL && downWL) {
                // Arcs are not order independent, but constraints are symmetrical
                result.push([acrossWL, downWL]);
                result.push([downWL, acrossWL]);
            }
        }
    }
    return result;
};

//  { (otherWL, leftWL) | otherWL != rightWL and otherWL intersects with leftWL }
var expandWL = function(wLocations, leftWL, rightWL) {
    var result = [];
    var dirAcross = wLocations.across;
    var dirDown = wLocations.down;
    for (var i = 0; i < dirAcross.length; i++) {
        for (var j = 0; j < dirDown.length; j++) {
            var acrossWL = findAcrossWL(wLocations, dirAcross[i].row, dirAcross[i].column);
            var downWL = findDownWL(wLocations, dirDown[j].row, dirDown[j].column);
            if (acrossWL && downWL) {

                if(acrossWL === leftWL && downWL !== rightWL) {
                    result.push([downWL, leftWL])
                }
                else if(downWL === leftWL && acrossWL !== rightWL) {
                    result.push([acrossWL, leftWL])
                }
            }
        }
    }
    return result;
};

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

var selectAndRemoveRandomArc = function(intersectingWLs) {
    var random = Math.floor(getRandom(0, intersectingWLs.length - 1));
    var randomArc = intersectingWLs[random];

    intersectingWLs.splice(random, 1);

    return randomArc;
}

module.exports = {
    ac3: ac3,
    initializeWordLocations: initializeWordLocations,
    getRandom: getRandom
}















