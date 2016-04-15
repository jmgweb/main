<?php
	
	$id = $_REQUEST["id"];

	$db = mysqli_connect( '127.0.0.1', 'root', '');

	if( ! $db ) :
		die( mysql_error() );
	endif;

	if( ! mysqli_select_db($db, 'test')):
		die( mysql_error() );
	endif;

	$sql = "DELETE FROM people WHERE Id=".$id;
		
	$query = mysqli_query( $db, $sql );

	if( !$query ) :
		die("error SQL");
	endif;	

	mysqli_close($db);
	
?>



