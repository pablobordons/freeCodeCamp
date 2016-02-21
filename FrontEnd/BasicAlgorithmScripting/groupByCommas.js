/*

CodeWars:

"Finish the solution so that it takes an input 'n' (integer) 
and returns a string that is the decimal representation 
of the number grouped by commas after every 3 digits."

*/

function groupByCommas(str){
  //turn the int into a string:
  str = str.toString();
  //reverse the string:
	var rStr = reverse(str);
  //obtain the first three digits:
	var nStr = rStr.slice(0,3);
  
  //starting fromt he forth digit, 
  //attatch the remaining digits in groups of three 
	for(var i = 3; i<str.length; i+=3){
		nStr += ","+rStr.slice(i,i+3);		
	}
  // return the reverse 
	return reverse(nStr);
}

function reverse(str){
	var nStr = "";
	for(var i = str.length-1;i>=0; i--){
		nStr+=str[i];
	}
	return nStr;
}
