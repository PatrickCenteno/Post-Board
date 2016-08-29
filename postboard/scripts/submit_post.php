<?php 
	include_once('database.php');

	// Check that the date and the text from the post were sent as POST methods
	if (!isset($_POST['post_text'])){
		print_r(json_encode(array('success' => 'false', 'message' => 'post body empty')));
		die();
	}

	if (!isset($_POST['date'])){
		print_r(json_encode(array('success' => 'false', 'message' => 'post date empty')));
		die();
	}

	// Get post and date values
	$post_text = $_POST['post_text'];
	$date = $_POST['date'];

	$filtered_post = filter_var($post_text, FILTER_SANITIZE_FULL_SPECIAL_CHARS);

	add_posts($filtered_post, $date);
	print_r(json_encode(array('success' => 'true', 'message' => 'posted', 'post' => $filtered_post)));

 ?>