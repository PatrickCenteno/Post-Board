<html>
<head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <link href="css/style.css" rel="stylesheet">


     <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
    <script src="js/moment.min.js"></script>
    <script src="js/local.js"></script>
    <script src="js/index.js"></script>

	<title>Post-Board</title>
</head>
<body>

	<?php
		// post information and data will be in variable in this script
		include_once('scripts/init.php');
	?>

	<!-- Will be a .php file and store some factors that will be hardcoded into this version in a db -->
	<div id="navBarContainer">
		<nav class="navbar navbar-default">
			<div class="row-fluid rowStyleClass">
				<div class="col-md-6 headerClass">
					<span id="headerText">Post-Board</span>
				</div>
				<div class="col-md-6 searchBarContainer">
					<form class="navbar-form">
						<div class="form-group">
				          	<input type="text" class="form-control" placeholder="Search">
				        </div>
				        <button type="submit" class="btn btn-default">Search Posts</button>
				    </form>
				</div>
			</div>
		</nav>
	</div>

	<section id="submitFormSection">
		<div id="submitHeaderContainer">
			<h1>Type It Up!</h1>
		</div>
		<div class="container">
			<div id="inputGroupID" class="input-group">
		      <input id="submitTextBox" type="text" class="form-control" placeholder="Enter your post">
		      <span class="input-group-btn">
		        <button id="formSubmitButton" class="btn btn-default" type="button">Go!</button>
		      </span>
		    </div>
		</div>
	</section>

	<section id="posts">
		<input type="hidden" id="maxID" value="<?php echo $max_id; ?>">
		<ul id="listOfPosts" class="list-group">
			<?php 
				for ($i = 0; $i < $num_of_posts; $i++){
				?> 
					<input id="<?php echo 'idNum' . $i; ?>" type="hidden" value="<?php echo $post_data[$i]['ID']; ?>">
					<li id="<?php echo 'postItemId' . $i; ?>" class="list-group-item postItem"><?php echo $post_data[$i]['post']; ?></li>
					<span id="<?php echo 'date' . $i; ?>" class="dateOfPost"><?php echo $post_data[$i]['postDate']; ?></span>
					<button id="<?php echo $i; ?>" type="button" class="btn btn-danger btn-small">Delete Post</button>
		 <?php  } ?>
		</ul>
	</section>

	<!-- Modal -->
    <div class="modal fade" id="deleteAlertModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="myModalLabel">Delete</h4>
          </div>
          <div class="modal-body">
            Are you sure you want to delete this?
          </div>
          <div class="modal-footer">
            <button id="noButton" type="button" class="btn btn-default" data-dismiss="modal">No</button>
            <button id="yesButton" type="button" class="btn btn-primary" >Yes</button>
          </div>
        </div>
      </div>
    </div>



</body>
</html>