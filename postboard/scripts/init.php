<?php 
	include_once ("database.php");

	$has_posts = false;
	$post_data = get_posts();
	$num_of_posts = count($post_data);

	if ($num_of_posts > 0)
		$has_posts = true;

 ?>