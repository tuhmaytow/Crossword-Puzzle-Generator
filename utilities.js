util.loadDict(bootstrapSearch);

function bootstrapSearch(wordList) {
  // create the set of winnable single word sets
  const COMPACT_DICT = util.createCompactDictionary(wordList);
  console.log("created winnable sets");
}
