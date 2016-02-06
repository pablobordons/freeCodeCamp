/*
FCC:
"Translate the provided string to pig latin.

Pig Latin takes the first consonant (or consonant cluster) of an English word, 
moves it to the end of the word and suffixes an "ay".

If a word begins with a vowel you just add "way" to the end."
*/

function translate(str) {
  //to iterate through the string:
	var arr=str.split("");
	//to check when is the first vowel
	var index = 0;
	
	for(var i in arr){
    //to find if arr[0] is a vowel:
		if(["a","e","i","o","u"].indexOf(arr[i])>-1){
			index = i;
			break;  //stop the loop
		}
	}
    var end = "";
    
    //determines if the string starts with a vowel or not
    if(index == 0){end="way";}  //started with a vowel (the first vowel at 0 index)
    else{end = "ay";}           //started with consonant
  
 
 
  // concat the original array with the first "index" elements. join it into a string and add the end.
	return arr.concat(arr.splice(0,index)).join("")+end;

  
}
