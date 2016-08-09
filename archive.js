// function getRandomArbitrary(min, max) {
//   return Math.random() * (max - min) + min;
// }

// function isWord(word) {
// 	var result = false;
// 	for (var i = 0; i < threeLetterWordsArr.length; i++) {
// 		if (word === threeLetterWordsArr[i]) {
// 			result = true;
// 		}
// 	}
// 	return result;
// }

// var words = ['ono', 'dog', 'cod', 'tog', 'ano', 'cat']

// function generateRandomPuzzle(arr) {
// 	// returns Puzzle in the form of an array of arrays (like testArr below)
// 	var randoPuzzle = [];	
// 	for (var i = 0; i < 3; i++) {
// 		var random = Math.floor(getRandomArbitrary(0, arr.length - 1));
// 		randoPuzzle.push(arr[random]);
// 	}
// 	var downZero = randoPuzzle[0][0] + randoPuzzle[1][0] + randoPuzzle[2][0];
// 	var downOne = randoPuzzle[0][1] + randoPuzzle[1][1] + randoPuzzle[2][1];
// 	var downTwo = randoPuzzle[0][2] + randoPuzzle[1][2] + randoPuzzle[2][2];	
// 	if (isWord(downZero) && isWord(downOne) && isWord(downTwo)) {
// 		return randoPuzzle;
// 	} else {
// 		return generateRandomPuzzle(arr);
// 	}
// }

// var puzzle = generateRandomPuzzle(words)

// var testArr = [
// 	['C', 'A', 'T'],
// 	['O', 'N', 'O'],
// 	['D', 'O', 'G'],
// ];

// var testArray = ['cat', 'ono', 'dog']

//build html up with string
//append innerhtml

// function renderPuzzle(arr) {
// 	var html = '';
// 	for (var i = 0; i < arr.length; i++) {
			
// 	}
// }

// console.log(renderPuzzle(testArray))