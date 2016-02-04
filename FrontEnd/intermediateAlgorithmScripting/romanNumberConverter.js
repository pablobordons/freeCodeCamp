function convert(num) {

	var arr="";

	//thousandth
	for(var i =0; i< parseInt(num/1000);i++){
		arr+="M";	
	}
	num %= 1000;


	//hundredth
	//900th
	if(parseInt(num/100) == 9){
		arr+="CM";
	}
	else{

		//five hundredth
		if(parseInt(num/500)>0){
			arr+="D";
			num %= 500;}

		//400th
		if(parseInt(num/100) == 4){
			arr+= "CD";
		}

		else{

			//hundredth
			for(var i =0; i< parseInt(num/100);i++){
				arr+= "C";	
			}
		}
	}
	num %= 100;


	//tenth
	//90th
	if(parseInt(num/10) == 9){
		arr+="XC";
	}
	else{

		//fiftieth
		if(parseInt(num/50)>0){
			arr+="L";
			num %= 50;
		}

		//40th
		if(parseInt(num/10) == 4){
			arr+="XL";
		}
		else{

			//tenth
			for(var i =0; i< parseInt(num/10);i++){
				arr+="X";	
			}
		}
	}
	num = num%10;



	//units
	//9th
	if(num == 9){
		arr+="IX"
	}
	else{

		//fifteenth
		if(parseInt(num/5)>0){
			arr+="V";
			num %= 5;
		}

		//40th
		if(num == 4){
			arr+="IV";
		}
		else{

			//tenth
			for(var i =0; i< num;i++){
				arr+="I";	
			}
		}
	}

	return arr;
}
