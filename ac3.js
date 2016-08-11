var ac3 = function (allWordLocations, allWords) {
    for (var wordLocation in allWordLocations) {
        wordLocation.reduceDict(allWords);
    } 

    var worklist = findOverlappingWL(allWordLocations);

    while (worklist.length !== 0) {
        var arc = selectAndRemoveRandomArc(worklist);
        var leftWL = arc[0];
        var rightWL = arc[1];

        if (arcReduce(leftWL, rightWL)) {
            if (leftWL.wordsRemaining.length === 0) { 
                throw new Error('FAILURE!!! 🙄');
            } else {
                var newArcs = expandWL(allWordLocations, leftWL, rightWL);
                worklist.concat(newArcs);
            }
        }
    }
}

var arcReduce = function(leftWL, rightWL) {
    var change = false;
    for (var leftIdx in leftWL.wordsRemaining) {
        var wordRemainingX = leftWL.wordsRemaining[leftIdx];
        var leftWordFits = false;

        for (var rightIdx in rightWL.wordsRemaining) {
            var wordRemainingY = rightWL.wordsRemaining[rightIdx];
            if (/* find a word that works */) {
                leftWordFits = true;
                break;
            }
        }

        if (/* never found a word that fits*/) {
            // Remove wordRemainingX from leftWL.wordsRemainig
            change = true;
        }
    }
    return change;
};

















