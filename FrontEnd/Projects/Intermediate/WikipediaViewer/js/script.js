// Obtaining the word to search:

	var initialState = true;

	var searchInput = document.getElementById("search-input");
	
	document.querySelector("form.form-search").addEventListener("submit",searchWiki);
	

// searching in wikipedia:

	function searchWiki(event){
		var word = searchInput.value;
		event.preventDefault();

		var url = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch="
				+ word
				+ "&srwhat=text&srprop=snippet&continue&format=json&callback=?";

		$.getJSON(url, function(data) {
			// get an array with the titles:
			var searchResults = data.query.search;
			addResults(searchResults);
		});		

	}

// adding the search result to the page:
	
	function addResults(results){

		// results = [ Object, Object ...];
		// Object = { title = "...", snippet = "short description..." , ... }


		// the page has two states: initialState and finalState
		// if page in inital State:
		if(initialState){
			// change state
			initialState = false;
			// move nav-bar up
			moveUp();  
		}
		// if page is not in initial state:
		else{
			// clean the previous search results:
			cleanUp();
		}

		if(results.length) addUl(results);
		else showError();
		

	}

// Logic to change elements in the page:
	
	// move the nav bar to the top
	function moveUp(){
		$("#navigator").css("margin-top","0px");
		$("#reference").css("margin-top","0px");
	}

	// remove all the elements inside the "item" div
	function cleanUp(){
		$(".item").html("");
	}

	function addUl(results){

		$(".item").append("<ul>");

		for(var object in results){

			var wikiUrl = "https://en.wikipedia.org/wiki/" + results[object].title;


			var title = "<p><h4>"+results[object].title+"</h4></p>";
			var snippet = "<p>"+results[object].snippet+"</p>";

			var div = "<div>"+title+snippet+"</div>"
			$(".item").append("<a target='_blank' href='"+wikiUrl+"' class='li-link'><li>"+div+"</li></a>");
		}

		$(".item").append("</ul><hr>");


	}

	function showError(){
		var sp = "<br><br><br><br><br>"
		$(".item").append(sp+"<h1>Sorry, no results were found.</h1>"+sp);

	}

// adding random page:

	//function randomPage(event){
		//event.preventDefault();
	//}
