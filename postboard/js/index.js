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
		if($.trim($postText).length == 0){
			$("#submitAlert").show();
			return;
		}

		// initializes moment object and formats date
		$now = $formatDate(moment(new Date(), "YYYY-MM-DD"));

		//ajax call to add post and date to server
		$addPost($postText, $now);
		$("#submitTextBox").val("");
	});

	// Click handler for delete button. Its delegated from the unordered list
	// Its contained within
	$("#listOfPosts").on("click", "button.btn-danger", function(){

		// Get the id number of the button clicked
		$buttonToDelete = $(this).attr("id");
		$listItemToDelete = "postItemId" + $(this).attr("id");
		$dateToDelete = "date" + $(this).attr("id");
		$hiddenInput = "idNum" + $(this).attr("id");

		// Call ajax function when yes is clicked in alert modal
		$showModal();
	});

	//Click Handler for yes button on modal
	$("#yesButton").click( function () {
		// Submit ID in to delete post function and remove all corresponding elements
		$deletePost($("#" + $hiddenInput).val());
		$("#deleteAlertModal").modal("toggle");
	});

	// Search posts button click handler
	$("#searchBarButton").click(function() {
		if($.trim($("#searchBarText").val()).length === 0 )
			return;
		console.log($("#searchBarText").val());
		$searchPosts($("#searchBarText").val());

		//make ajax call to server to search posts with that specific text
	});

	// Ajax call to add a post to database
	$addPost = function($postText, $now){
		$.ajax({
			type:'post',
			url: "http://" + PostBoard.hostname + ":8888/scripts/submit_post.php",
			data:{post_text:$postText, date:$now},
		}).then(function(response) {
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
			// .remove() neccessary elements
			$removePostElements();

		});
	}

	// Ajax call to search through posts
	$searchPosts = function($string){
		// $arrayOfIDs = [];
		$.ajax({
			type:'post',
			url:"http://" + PostBoard.hostname + ":8888/scripts/search_posts.php",
			data:{text:$string},
		}).then(function(response) {
			console.log(response);
			$responseVar = $.parseJSON(response);
			console.log("parsed response " + $responseVar);
			console.log($responseVar[0] + " " + $responseVar[1]);
			$showSearchResults($responseVar);
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

		return $year + "-" + $m$onth + "-" + $day;
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

	// Display search results modal
	$showSearchResults = function($IDarray) {
		$("#searchBarModal").modal("show");

		// get full text of each post based on the ID
		// since MySql ID starts at 1 and arrays start at 0,
		// ID must be decremented to get the local post ID
		$("#searchModalBody").html("");
		for ($i = 0; $i < $IDarray.length; $i++) {
			// append html to the modal with the text
			// get the post text
			// console.log(parseInt($IDarray[$i]));
			console.log("#postItemId" + parseInt($IDarray[$i]));
			$post = $("#postItemId" + parseInt($IDarray[$i])).val();
			$("#searchModalBody").append("<div>" + $post + " Test Append" + "</div>" );
		};

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
			$maxID = parseInt(($("#maxID").val()) + 1); // must be incremented to match mysql ID

		// Add that maxID to the appended html as hidden input just as hidden input
		// is added on page load from php for loop

		$("#listOfPosts").append(
			"<li id=\"postItemId" + $maxID + "\" class=\"list-group-item postItem\"> " +
			$postText + "</li>" + "<span id=\"date" + $maxID +"\" class=\"dateOfPost\">" +
			$now + "</span>" + "<button id=\"" + $maxID +"\" type=\"button\" class=\"btn btn-danger btn-small\">Delete Post</button>" +
			"<input id=\"idNum" + $maxID + "\" type=\"hidden\" value=\"" + $maxID + "\">" );
		$maxIdUsed = true;
	}

	// $hightLightText = function($string, $IDs){
	// 	// Loop through each element in the array of IDs
	// 	// Locate the substring in each element
	// 	// log for debugging
	// }

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

	$("[data-hide]").click( function(){
        $("#submitAlert").hide();
    });
});