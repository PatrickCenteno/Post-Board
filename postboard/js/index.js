$(document).ready( function(){

	// Setting each delete item as global variables so they can 
	// be easily removed from the modal pop-up event handling functions
	$buttonToDelete = null;
	$listItemToDelete = null;
	$dateToDelete = null;
	$hiddenInput = null;
	$maxID = null;

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

		// Get the id number of the button clicked
		$buttonToDelete = $(this).attr("id");
		$listItemToDelete = "postItemId" + $(this).attr("id");
		$dateToDelete = "date" + $(this).attr("id");
		$hiddenInput = "idNum" + $(this).attr("id");

		console.log($buttonToDelete + " " + $listItemToDelete + " " + $dateToDelete + " " + $hiddenInput);

		// Call ajax function when yes is clicked in alert modal
		$showModal();
	});

	//Click Handler for yes button on modal
	$("#yesButton").click( function () {
		// Submit ID in to delete post function and remove all corresponding elements
		$deletePost($("#" + $hiddenInput).val());
		$("#deleteAlertModal").modal("toggle");
	});

	// Ajax call to add a post to database
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

	// Ajax call to delete a post from the databse
	$deletePost = function($ID){
		console.log("inside of deletePost " + $ID);
		$.ajax({
			type:'post',
			url:'http://' + PostBoard.hostname + ":8888/scripts/delete_post.php",
			data:{ID:$ID},
		}).then(function(response) {
			console.log(response);

			// .remove() neccessary elements
			$removePostElements();

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

	// calls .remove on the post elements of the post
	// that was deleted
	$removePostElements = function(){
		$("#" + $buttonToDelete).remove();
		$("#" + $listItemToDelete).remove();
		$("#" + $dateToDelete).remove(); 
		$("#" + $hiddenInput).remove();
	}

	// displays the bootstrap modal
	$showModal = function(){
		$("#deleteAlertModal").modal("show");
	}

	// Appends an <li> and <div> tag to the #listOfPosts
	$addToFrontList = function($postText, $now){
		$("#listOfPosts").append(
			"<li class=\"list-group-item postItem\"> " +
			$postText + "</li>" + "<span class=\"dateOfPost\">" +
			$now + "</span>" + "<button id=\"deleteButton\" type=\"button\" class=\"btn btn-danger btn-small\">Delete Post</button>");
	}

	// ensures that the global variables correspondin to the
	// deleted post elements are null
	$checkDeleteItemsNull = function(){
		if($buttonToDelete === null ||
		   $listItemToDelete === null ||
		   $dateToDelete === null ||
		   $hiddenInput === null)
				return false;
		return true;
	}


});