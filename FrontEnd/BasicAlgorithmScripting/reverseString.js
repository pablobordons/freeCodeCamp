function reverseString(str) {
  
  var array = str.split("");
  
  var newArray = [];
  
  for (var i=array.length-1;i>-1;i--){
    newArray.push(array[i]);
  }
  
  str = newArray.join("");
  
  return str;
  
}
