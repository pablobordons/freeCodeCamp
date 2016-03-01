

var streamers = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff","OgamingSC2","comster404","brunofin"]
				//["freecodecamp","OgamingSC2","comster404","brunofin"];


getChannels(streamers);



function sayHi(){console.log("Hi")}
////

function cleanUl(){
	$("#channel-list").html("");
}

function addLi(name,description,img,status,link){

	var divImg = "<div class='col-xs-3 channel-img'>"
			   + "<img src='" + img + "'>"
			   + "</div>";

	var externalLink = status == "This user doesn't exists." 
					 ? ""
					 : "<a href='"+link+"'><i class='fa fa-external-link'></i></a>"

	var pName = "<p class='channel-name'>" + name + "&nbsp;&nbsp;" + externalLink + "</p>";

	var pDescription = status == "online"
					 ? "<p class='channel-description'>" + description + "</p>"
					 : "<p class='channel-description'>" + status + "</p>";

	var divText = "<div class='col-xs-9 channel-text'>"
			    + pName 
			    + pDescription
			    + "</div>"; 

	var liClass = status == "This user doesn't exists." 
				? "no-exist"
				: status;  


	var liElement = "<li class='channel-element "+liClass+"'>"
				  + divImg
				  + divText
				  + "</li>";
	var goButton = ""
	// var aElement = status == "This user doesn't exists."
	// 			 ? liElement
	// 			 : "<a href='"+link+"'>"+liElement+"</a>";
 	
	$("#channel-list").append(liElement);

}

function getChannels(array,options){

	cleanUl();

	for(var channel in array){
		setChannel(array[channel],options);
	}

}

function setChannel(channel,options){

	// options: 1 online, 0 offline

	var url1 = "https://api.twitch.tv/kraken/channels/"
			+ channel
			+ "?callback=?";

	$.getJSON(url1, function(data) {

		var name = data.display_name ? data.display_name : channel;

		var description = data.status ? data.status : "error loading status";

		var img = data.logo ? data.logo : "img/error.png";

		var channelURL = data.url ? data.url : "http://www.twitch.tv/" + channel;
		
		// second call to check if it's online or not
		var url2 = "https://api.twitch.tv/kraken/streams/"
			+ channel
			+ "?callback=?";

		$.getJSON(url2, function(data) {
			// console.log(data);
			// var online = data.stream ? true : false;
			var status = !data.error
					   ? data.stream ? "online" : "Offline"
					   : "This user doesn't exists.";

			switch(options){

				// only offline channels
				case 0:
					if(status !== "online") 
						addLi(name,description,img,status,channelURL);
					break;
				// only online channels
				case 1:
					if(status == "online") 
						addLi(name,description,img,status,channelURL);
					break;
				// all channels
				default:
					addLi(name,description,img,status,channelURL);

			}
			

		});

	});	

}


$("#online-btn").click(function(){
	getChannels(streamers,1);
});

$("#offline-btn").click(function(){
	getChannels(streamers,0);
});

$("#all-btn").click(function(){
	getChannels(streamers);
});





