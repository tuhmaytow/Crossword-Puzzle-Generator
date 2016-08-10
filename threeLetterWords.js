var wordlist = require('./wordlist');

var wordlist3 = [];
for (var i = 0; i < wordlist.length; i++) {
  if (wordlist[i].length === 3) {
    wordlist3.push(wordlist[i]);
  }
}

module.exports = wordlist3;
