<?php 

	include_once ('database.php');

	if(!isset($_POST['ID'])){
		print_r(json_encode(array("success" => "false", "message" => "No ID")));
		die();
	}

	$ID = $_POST['ID'];
	delete_post($ID);
	print_r(json_encode(array("success" => "true", "message" => "Post Deleted")));

 ?>