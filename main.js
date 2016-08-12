'use strict';

var dictionary = require('./wordlist');
var arcConsistency = require('./ac3');

const t = true;
const f = false;

// var grid = [
// 	[t, t, t, t, t],
// 	[t, f, t, f, t],
// 	[t, t, t, t, t],
// 	[t, f, t, f, t],
// 	[t, t, t, t, t]
// ];

var grid = [
	[t, t, t],
	[t, f, t],
	[t, f, t]
];

dictionary = ['man', 'mod', 'dog'];

var wl = arcConsistency.ac3(grid, dictionary);

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


