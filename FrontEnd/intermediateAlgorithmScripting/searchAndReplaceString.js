function myReplace(str, before, after) {
  
  if(before[0] == before[0].toUpperCase()){
  	after = after[0].toUpperCase() + after.split("").splice(1).join("");
  	
  	}
  var arr = str.split(" ");
  
  for(var i in arr){
    if(arr[i]==before){
      arr[i] = after;
    }
  }
  
  return arr.join(" ");
}
