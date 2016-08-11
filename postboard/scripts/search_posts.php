<?php 
	include_once ("database.php");

	if(!isset($_POST['text'])){
		print_r(json_encode(array("success" => "false", "message" => "No text")));
		die();
	}

	$substring = $_POST['text'];
	print_r(json_encode(search_by_text($substring)));
	// var_dump(search_by_text($substring));

 ?>