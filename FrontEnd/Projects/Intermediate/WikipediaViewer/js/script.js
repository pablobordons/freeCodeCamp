

	// PSEUDOCODE:

	/*

	1: obtain the word
	*: request the json
	*: move up the navigator?
	*: clean the li
	*: push li with result
	

	*/



// Obtaining the word
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

// adding the search to the page:
	


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

		addUl(results);

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

			var title = "<p>"+results[object].title+"</p>";
			var snippet = "<p>"+results[object].snippet+"</p>";

			var div = "<div>"+title+snippet+"</div>"
			$(".item").append("<li>"+div+"</li>");
		}

		$(".item").append("</ul>");


	}


// adding random page:

	function randomPage(event){
		event.preventDefault();

		
	}
