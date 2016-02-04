function largestOfFour(arr) {
  var maxArray = [];
  for(var i in arr){
    var max = 0;
    for(var j in arr[i]){
      max = max < arr[i][j] ? arr[i][j] : max;
    }
    maxArray.push(max);
  }
  // You can do this!
  return maxArray;
}
