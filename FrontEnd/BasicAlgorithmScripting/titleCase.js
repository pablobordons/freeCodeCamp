function titleCase(str) {
  
  str = str.toLowerCase();
  
  var array = str.split(" ");
  
  for (var i in array){
    var subArray = array[i].split("");
    subArray[0] = subArray[0].toUpperCase();
    array[i] = subArray.join("");
  }
  
  return array.join(" ");
}
