'use strict';

var dictionary = require('./wordlist');
var arcConsistency = require('./ac3');

const t = true;
const f = false;

var grid = [
	[t, t, t, t, t],
	[t, f, t, f, t],
	[t, t, t, t, t],
	[t, f, t, f, t],
	[t, t, t, t, t]
];

// var grid = [
// 	[t, t, t],
// 	[t, f, t],
// 	[t, f, t]
// ];

// dictionary = ['man', 'mod', 'dog'];

var generatePuzzle = function() {

	var allWordLocations = arcConsistency.initializeWordLocations(grid);

	for (var direction in allWordLocations) {
	        for(var idx in allWordLocations[direction]) {
	            var wordLocation = allWordLocations[direction][idx];
	            wordLocation.reduceDict(dictionary);
	        } 
	    } 

	for (var i = 0; i < allWordLocations.across.length; i++) {
		var randomIdx = Math.floor(arcConsistency.getRandom(0, allWordLocations.across[i].wordsRemaining.length - 1));
		var randomWord = allWordLocations.across[i].wordsRemaining[randomIdx];
		allWordLocations.across[i].wordsRemaining = [randomWord];
		console.log(allWordLocations.across[i].wordsRemaining)
	}

	var wl = arcConsistency.ac3(allWordLocations, dictionary);
	if (wl === 'No Possible Solutions') {
		return generatePuzzle();
	}

	for (var i = 0; i < wl.down.length; i++) {
		//if words remaining > 0
		if (wl.down[i].wordsRemaining.length === 0) {
			return generatePuzzle();
		}
		if (wl.down[i].wordsRemaining.length > 0) {
			var randomIdx = Math.floor(arcConsistency.getRandom(0, wl.down[i].wordsRemaining.length - 1));
			var randomWord = wl.down[i].wordsRemaining[randomIdx];
			wl.down[i].wordsRemaining = [randomWord];
		}
	}
	return wl;
}

var wl = generatePuzzle();

for(var key in wl.across) {
	var oneWL = wl.across[key]
	console.log(oneWL.row, oneWL.column, oneWL.direction);
	for(var idx in wl.across[key].wordsRemaining) {
		console.log(oneWL.wordsRemaining[idx])
	}
}

for(var key in wl.down) {
	var oneWL = wl.down[key]
	console.log(oneWL.row, oneWL.column, oneWL.direction);
	for(var idx in wl.down[key].wordsRemaining) {
		console.log(oneWL.wordsRemaining[idx])
	}
}


