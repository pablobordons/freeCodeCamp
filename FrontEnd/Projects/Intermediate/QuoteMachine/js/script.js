
$(document).ready(function(){

// background color list:

	var color = [

				"#79A850", //olive
				"#BDBB97", //clay
				"#7EB1A9", //green-blue
				"#975AB9", //purple
				"#2E3E51", //dark-blue
				"#F26961", //red
				"#38A084", //turquoise
				"#452E32", //brown
				"#7EB1A9"  //gulf

				];

	// set random color:
	function setColor(){

		var colorIndex = Math.floor(Math.random()*color.length);

		//body
		$("body").css("background-color",color[colorIndex]);
		$("body").css("color",color[colorIndex]);

		//buttons
		$(".btn-left").css("background-color",color[colorIndex]);
		$(".btn-right").css("background-color",color[colorIndex]);

		//quote
		$("#quote-cite").css("color",color[colorIndex]);



	};

	setColor();
//	quotes list
	var quotes = [];

	quotes.push({

		content: "Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo.",
		cite: "Mattis Ligula"

				},
				{

		content: "Curabitur blandit tempus porttitor. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.",
		cite: "Malesuada Elit Vulputate Ligula"

				},
				{
					
		content: "Vestibulum id ligula porta felis euismod semper. Donec id elit non mi porta gravida at eget metus.",
		cite: "Mattis Sit"

				},
				{
					
		content: "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum id ligula porta felis euismod semper.",
		cite: "Fringilla Sem"

				},
				{
					
		content: "Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.",
		cite: "Ultricies Pellentesque"

				}

		);


	var index = Math.floor(Math.random()*quotes.length);

	$("#quote-cite").html(quotes[index]["cite"]);
	$("#quote-content").html(quotes[index]["content"]);



// new quote
	$("#btn-new").click(function(){

		setColor();
		index = Math.floor(Math.random()*quotes.length);

		$("#quote-cite").html(quotes[index]["cite"]);
		$("#quote-content").html(quotes[index]["content"]);

	});

// tweet
	$("#btn-tweet").click(function(){

		console.log("building --- tweet this: \n" + quotes[index]["content"] + " \nby: "+quotes[index]["cite"] );
	});

// tumblt
	$("#btn-tumblr").click(function(){

		console.log("building --- post this on tumblr: \n" + quotes[index]["content"] + " \nby: "+quotes[index]["cite"] );
	});

});


