function findLongestWord(str) {
  
  var array = str.split(" ");
  var longest = "";

  for (var i in array){
  	longest = longest.length < array[i].length ? array[i] : longest;
  }
  
  return longest.length;
}
