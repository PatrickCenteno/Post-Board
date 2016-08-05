$(document).ready( function(){
	//$postText = $("submitTextBox").val();

	// Click Handler for 'Go' button
	$("#formSubmitButton").click( function (){
		$postText = $("#submitTextBox").val();

		// initializes moment object and formats date
		$now = $formatDate(moment(new Date(), "YYYY-MM-DD"));

		//ajax call to add post and date to server
		$addPost($postText, $now);
	});

	// Click handler for delete button. Its delegated from the unordered list
	// Its contained within
	$("#listOfPosts").on("click", "button.btn-danger", function(){
		console.log("A delete Button is being clicked");
	});


	$addPost = function($postText, $now){
		$.ajax({
			type:'post',
			url: "http://" + PostBoard.hostname + ":8888/scripts/submit_post.php",
			data:{post_text:$postText, date:$now},
		}).then(function(response) {
			console.log(response);
			// When ajax call goes through and response is received,
			// Display on front end
			$addToFrontList($postText, $now);
		});
	}

	// Ensures that date and month are always two digits
	$formatDate = function($now){
		$year = $now.year();
		$month = $now.month();
		$day = $now.day();

		if ($month < 10)
			$month = "0" + $month;

		if ($day < 10)
			$day = "0" + $day;

		return $year + "-" + $month + "-" + $day;
	}

	// Appends an <li> and <div> tag to the #listOfPosts
	$addToFrontList = function($postText, $now){
		$("#listOfPosts").append(
			"<li class=\"list-group-item postItem\"> " +
			$postText + "</li>" + "<span class=\"dateOfPost\">" +
			$now + "</span>" + "<button id=\"deleteButton\" type=\"button\" class=\"btn btn-danger btn-small\">Delete Post</button>");
	}

});