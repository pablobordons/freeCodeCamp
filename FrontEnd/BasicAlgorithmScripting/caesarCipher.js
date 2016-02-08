/*

FCC:

"One of the simplest and most widely known ciphers is a Caesar cipher, also known as a shift cipher. 
In a shift cipher the meanings of the letters are shifted by some set amount.

A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places. 
Thus 'A' ↔ 'N', 'B' ↔ 'O' and so on.

Write a function which takes a ROT13 encoded string as input and returns a decoded string.

All letters will be uppercase. 
Do not transform any non-alphabetic character (i.e. spaces, punctuation), but do pass them on."

*/




function rot13(str) { // LBH QVQ VG!
	//get the words 
	var arr = str.split(" ");

	//for every word:
	var newArr = [];

	for(var i in arr){
      
		var newWord="";
		//for every letter:
		for(var j in arr[i]){
          
			var index = parseInt(arr[i][j].charCodeAt());
			
            if(index>=65 && index<=90){
              
				index += 13;
              
				if(index>90){
                  index-=26;
                }
				newWord+=String.fromCharCode(index);
			
            }else{
				newWord+=arr[i][j];
			}
		}

		newArr.push(newWord);
	}
	return newArr.join(" ");

}

