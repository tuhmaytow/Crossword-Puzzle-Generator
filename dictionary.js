function loadDict(callback) {
  var results = [];
  var rl = require('readline').createInterface({
    input: require('fs').createReadStream('/usr/share/dict/words')
  });

  rl.on('line', function (line) {
    results.push(line.toUpperCase());
  });

  rl.on('close', function(){
  	callback(results);
  });
}


//
// Input:
//    A set of variables X
//    A set of domains D(x) for each variable x in X. D(x) contains vx0, vx1... vxn, the possible values of x
//    A set of unary constraints R1(x) on variable x that must be satisfied
//    A set of binary constraints R2(x, y) on variables x and y that must be satisfied
//
//  Output:
//    Arc consistent domains for each variable.

 function ac3 (allWordLocations, allWords) 
    // WordLocation Domains are set to only words of the proper length
     for each wordLocation in allWordLocations 
         wordLocation.reduceDict(allWords)
     
     // 'worklist' contains all arcs we wish to prove consistent or not.
     //var worklist := { (x, y) | there exists a relation R2(x, y) or a relation R2(y, x) } //wordLocations****
     var worklist = findOverlappingWL(allWordLocations)

     do
         // select any arc (x, y) from worklist //select random arc from wordLocations
         // worklist := worklist - (x, y)
         arc = selectAndRemoveRandomArc(worklist);
         var leftWL = arc[0];
         var rightWL = arc[1];

         if arc-reduce (leftWL, rightWL)
             if leftWL.wordsRemaining.length === 0 //if the domain of x is empty
                 return failure
             else
                 var newArcs = expandWL(allWordLocations, leftWL, rightWL);
                 worklist.concat(newArcs);
                 // worklist := worklist + { (otherWL, leftWL) | otherWL != rightWL and otherWL intersects with leftWL } //*****
     while worklist not empty

 function arcReduce (leftWL, rightWL)
     var change = false //iniitalized to false
     for each wordRemainingX in D(x) //for each value of x in domain
         find a value wordRemainingY in D(y) such that wordRemainingX and wordRemainingY satisfy the constraint R2(x, y) *********
         if there is no such wordRemainingY {
             D(x) := D(x) - wordRemainingX //remove from domain
             change := true //and set to true
     return change
