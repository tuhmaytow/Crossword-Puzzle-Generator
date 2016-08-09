var threeLetterWordsArr = require('./threeLetterWords');

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function isWord(word) {
	var result = false;
	for (var i = 0; i < threeLetterWordsArr.length; i++) {
		if (word === threeLetterWordsArr[i]) {
			result = true;
		}
	}
	return result;
}

var words = ['cat', 'ono', 'dog', 'cod', 'ano', 'tog'];

function generateRandomPuzzle(arr) {
	// returns Puzzle in the form of an array of arrays (like testArr below)
	var randoPuzzle = [];
	for (var i = 0; i < 3; i++) {
		var random = Math.floor(getRandomArbitrary(0, arr.length - 1));
		randoPuzzle.push(arr[random]);
	}
	var downZero = randoPuzzle[0][0] + randoPuzzle[1][0] + randoPuzzle[2][0];
	var downOne = randoPuzzle[0][1] + randoPuzzle[1][1] + randoPuzzle[2][1];
	var downTwo = randoPuzzle[0][2] + randoPuzzle[1][2] + randoPuzzle[2][2];
	if (isWord(downZero) && isWord(downOne) && isWord(downTwo)) {
		return randoPuzzle;
	} else {
		return generateRandomPuzzle(arr);
	}
}

console.log(generateRandomPuzzle(words));

// var testArr = [
// 	['C', 'A', 'T'],
// 	['O', 'N', 'O'],
// 	['D', 'O', 'G'],
// ];


//build html up with string
//append innerhtml
//
// function renderPuzzle(arr) {
// 	var html = '';
// 	for (var i = 0; i < arr[0].length; i++) {
//
//   }
//  }
var temp = ['crackers', 'frog', 'bottle', 'dog', 'pen', 'bag'];
function wordSearch(arr) {

}
