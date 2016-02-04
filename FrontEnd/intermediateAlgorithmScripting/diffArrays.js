function diff(arr1, arr2) {
  

  var newArr1 = arr2.filter(function(a){
  	
		  	if(arr1.indexOf(a)<0){return 1;}
		  	else{return 0;}
	 	
	  	});
  	//debug("arr1 : "+newArr1);
  var newArr2 = arr1.filter(function(a){
  	
		  	if(arr2.indexOf(a)<0){return 1;}
		  	else{return 0;}
	 	
	  	});
  	//debug("arr2 : "+newArr2);
  // Same, same; but different.
  return newArr1.concat(newArr2);
}
