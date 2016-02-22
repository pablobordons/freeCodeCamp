
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


				// show the JSON -> send it to html / work with it
				console.log(myJSON);
			}

		}

		myXMLHttpRequest.open("GET",url, true);
		myXMLHttpRequest.send();

	}


