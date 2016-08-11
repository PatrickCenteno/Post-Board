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

		$query = "SELECT post, postDate, ID FROM posts";
		$stmt = $db_pdo->prepare($query);
		$stmt->execute();

		return $stmt->fetchall(PDO::FETCH_ASSOC);
	}

	function delete_post($ID){
		$db_pdo = new PDO(DB_DSN, DB_U, DB_P);

		$query = "DELETE FROM posts WHERE ID = ?";
		$stmt = $db_pdo->prepare($query);
		$stmt->execute(array($ID));
	}

	function get_max_ID(){
		$db_pdo = new PDO(DB_DSN, DB_U, DB_P);

		$query= "SELECT MAX(ID) from posts";
		$stmt = $db_pdo->prepare($query);
		$stmt->execute();

		$temp = $stmt->fetch();

		if($temp[0] === NULL){
			$query2 = "TRUNCATE posts";
			$stmt2 = $db_pdo->prepare($query2);
			$stmt2->execute();
			return 0;
		}
		else
			return $temp[0];
	}

	function search_by_text($string){
		$db_pdo = new PDO(DB_DSN, DB_U, DB_P);

		// add neccessary search characters to param string
		$substring  = '%' . $string . '%';

		$query = "SELECT ID FROM posts WHERE post LIKE ?";

		$stmt = $db_pdo->prepare($query);
		$stmt->execute(array($substring));

		return $stmt->fetchall(PDO::FETCH_NUM);
	}
 ?>