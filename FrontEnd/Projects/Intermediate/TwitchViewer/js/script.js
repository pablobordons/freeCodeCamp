var streamers = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"]

		// var url = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch="
		// 		+ "whatever"
		// 		+ "&srwhat=text&srprop=snippet&continue&format=json&callback=?";

			var url = "https://api.twitch.tv/kraken/channels/"
					+ streamers[1]
					+ "?callback=?";

		$.getJSON(url, function(data) {
			// get an array with the titles:
			//var searchResults = data.query.search;
			console.log(data.logo);
			// var image = "<img src='"+data.logo+"'>"
			// $(".item").html(image);
			//doSomething(data);

		});		
