function sumAll(arr) {
  arr = arr.sort(function(a,b){return a-b;});
  var res = 0;
  for(var i = arr[0]; i<=arr[1]; i++){
    res+=i;
  }
  return res;
}
