<?php 
	/**
	 * All PDO functions go in here
	 */
	include_once ('defines.php');

	function add_posts($post_text, $date){
		$db_pdo = new PDO(DB_DSN, DB_U, DB_P);

		$query = "INSERT INTO posts WHERE (post, date) VALUES(?, ?)";
		$stmt = $db_pdo->prepare($query);
		$stmt->execute(array($post_text, $date));

		// Need something to determine if the add doesnt work, for now just hardcoded true
		return true;
	}

	function get_posts(){
		$db_pdo = new PDO(DB_DSN, DB_U, DB_P);

		$query = "SELECT post, date FROM posts";
		$stmt = $db_pdo->prepare($query);
		$stmt->execute();

		return $stmt->fetchall(PDO::FETCH_ASSOC);
	}
 ?>