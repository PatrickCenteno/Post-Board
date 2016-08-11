<?php 
	include_once ("database.php");

	if(!isset($_POST['text'])){
		print_r(json_encode(array("success" => "false", "message" => "No text")));
		die();
	}

	$substring = $_POST['text'];

	// TODO: fix the way it returns so its a simple array of ids
	print_r(json_encode(search_by_text($substring)));
	// var_dump(search_by_text($substring));

 ?>