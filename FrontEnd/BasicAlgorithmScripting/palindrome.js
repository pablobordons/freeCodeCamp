function palindrome(str) {
  //The string is set into an array and clean up:
  var array = str.toLowerCase().split("").filter(function(a){
    return /[a-zA-Z0-9]/.test(a) ;});
  
  //The element's order is reversed:
  var newArray = []; 
  
  for (var i=array.length-1;i>-1;i--){
    newArray.push(array[i]);
  }

  return newArray.join("") == array.join("");
}
