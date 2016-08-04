<?php 
	/**
	 * All PDO functions go in here
	 */
	include_once ('defines.php');

	function add_posts($post_text, $date){
		$db_pdo = new PDO(DB_DSN, DB_U, DB_P);

		$query = "INSERT INTO posts (post, postDate) VALUES(?, ?)";
		$stmt = $db_pdo->prepare($query);
		$stmt->execute(array($post_text, $date));
	}

	function get_posts(){
		$db_pdo = new PDO(DB_DSN, DB_U, DB_P);

		$query = "SELECT post, postDate FROM posts";
		$stmt = $db_pdo->prepare($query);
		$stmt->execute();

		return $stmt->fetchall(PDO::FETCH_ASSOC);
	}
 ?>