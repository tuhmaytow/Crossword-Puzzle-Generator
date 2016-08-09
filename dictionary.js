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

 function ac3 (X, D, R1, R2) //X = var, D = domain
 // Initial domains are made consistent with unary constraints.
     for each x in X  //for each values of X
         D(x) := { x in D(x) | R1(x) } //for every value in the domain
     // 'worklist' contains all arcs we wish to prove consistent or not.
     worklist := { (x, y) | there exists a relation R2(x, y) or a relation R2(y, x) }//make worklist a separate function

     do
         select any arc (x, y) from worklist //select random arc
         worklist := worklist - (x, y)
         if arc-reduce (x, y)
             if D(x) is empty //if the domain of x is empty
                 return failure
             else
                 worklist := worklist + { (z, x) | z != y and there exists a relation R2(x, z) or a relation R2(z, x) }
     while worklist not empty

 function arc-reduce (x, y)
     bool change = false //iniitalized to false
     for each vx in D(x) //for each value of x in domain
         find a value vy in D(y) such that vx and vy satisfy the constraint R2(x, y)
         if there is no such vy {
             D(x) := D(x) - vx //remove from domain
             change := true //and set to true
     return change
