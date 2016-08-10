$(document).ready( function(){

	// Setting each delete item as global variables so they can 
	// be easily removed from the modal pop-up event handling functions
	$buttonToDelete = null;
	$listItemToDelete = null;
	$dateToDelete = null;
	$hiddenInput = null;
	$maxID = 0;
	$maxIdUsed = false;

	// Click Handler for 'Go' button
	$("#formSubmitButton").click( function (){
		$postText = $("#submitTextBox").val();

		// initializes moment object and formats date
		$now = $formatDate(moment(new Date(), "YYYY-MM-DD"));

		//ajax call to add post and date to server
		$addPost($postText, $now);
		$("#submitTextBox").val("");
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
		console.log($hiddenInput + "maxID " + $maxID);
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
		// on page load when all posts pulled were loaded from db,
		// set the maxID to whatever the SELECT MAX(ID) value is
		// If posts have been dynamically added, increment what the existing value of
		// maxID is
		if ($maxIdUsed)
			$maxID++;
		else
			$maxID = $("#maxID").val();

		console.log("inside of addToFrontList " + $maxID);

		// Add that maxID to the appended html as hidden input just as hidden input
		// is added on page load from php for loop
		$("#listOfPosts").append(
			"<li id=\"postItemId" + $maxID + "\" class=\"list-group-item postItem\"> " +
			$postText + "</li>" + "<span id=\"date" + $maxID +"\" class=\"dateOfPost\">" +
			$now + "</span>" + "<button id=\"" + $maxID +"\" type=\"button\" class=\"btn btn-danger btn-small\">Delete Post</button>" +
			"<input id=\"idNum" + $maxID + "\" type=\"hidden\" value=\"" + $maxID + "\">" );
		$maxIdUsed = true;
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