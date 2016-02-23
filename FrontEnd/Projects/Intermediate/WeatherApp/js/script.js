
// NAVIGATOR:

	//success function:
	function success(position){

		console.log("working");

		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;

		console.log(longitude,latitude);

		weatherAt(longitude,latitude);

	}

	//error function:
	function error(err) {
	  console.warn('ERROR(' + err.code + '): ' + err.message);
	};

	//options:
	var options = {
		  enableHighAccuracy: true,
		  timeout: 5000,
		  maximumAge: 0
		};

	// obtain the location:
	navigator.geolocation.getCurrentPosition(success,error,options);


// OPEN WEATHER MAP API

	function weatherAt(longitude, latitude){

		// get the json object:
		var apiKey = "2ac46e82aa1f11b338a9dfe6e149c7fc";

		// create the XMLHTTP request
		var myXMLHttpRequest = new XMLHttpRequest();

		// create the url:
		var url = "http://api.openweathermap.org/data/2.5/weather?lat="
					+ latitude +"&lon=" + longitude + "&appid=" + apiKey;

		// get the json:
		myXMLHttpRequest.onreadystatechange = function(){

			if(myXMLHttpRequest.readyState === 4 &&
			   myXMLHttpRequest.status === 200){

				var myObject = JSON.parse(myXMLHttpRequest.responseText);
				var myJSON = JSON.stringify(myObject);
        
        var htmlCountry = document.getElementById("country");
        var htmlCity = document.getElementById("city");
        var htmlWeather = document.getElementById("weather");
        var htmlTemperature = document.getElementById("temperature");
        var htmlIcon = document.getElementById("weather-icon");
				// show the JSON -> send it to html / work with it
        
        htmlCountry.innerHTML = myObject["sys"]["country"];
				htmlCity.innerHTML = myObject['name']+", ";
        htmlWeather.innerHTML = myObject["weather"][0]["description"];
        htmlTemperature.innerHTML = (myObject["main"]["temp"] - 273.15).toFixed(1);
        htmlIcon.src="http://openweathermap.org/img/w/"+myObject["weather"][0]["icon"]+".png"
        
			}

		}

		myXMLHttpRequest.open("GET",url, true);
		myXMLHttpRequest.send();

	}

// Engine to change the temperature 
	
	// from celsius to farenheit:
	function celsiusToFarenheit(celsius){
		return (celsius*9/5 + 32).toFixed(1);
	}
	// from farenheit to celsius
	function farenheitToCelsius(farenheit){
		return ((farenheit - 32)*5/9).toFixed(1);
	}
	// change between f and c:
	function tempConvert(temp,celsius){
		//if celsius is true, convert to farenheit. If it's false, convert to celsius:
		return celsius ? celsiusToFarenheit(temp) : farenheitToCelsius(temp);
	}
	// variable to store the unit: 
	var celsius = true;  // farenheit = !celsius

	// function to be called by html and change units:
	function changeTempUnits(){

		// get the temperature and unit html:
		var htmlTemperature = document.getElementById("temperature");
		var htmlTempUnits = document.getElementById("temp-units");
		
		// convert units:
		htmlTemperature.innerHTML = tempConvert(htmlTemperature.innerHTML,celsius);
		htmlTempUnits.innerHTML = celsius ? "ºF" : "ºC";
    htmlTempUnits.title = celsius ? "Convert to Celsius" : "Convert to Farenheit";

		// change value of celsius (true or false):
		celsius = !celsius;

	}

// Engine to change ICON:

	// four different icons:
