<?php

	$first	= $_REQUEST["first"];
	$last	= $_REQUEST["last"];
	
	$db = mysqli_connect( '127.0.0.1', 'root', '');

	if( ! $db ) :
		die( mysql_error() );
	endif;

	if( ! mysqli_select_db($db, 'test')):
		die( mysql_error() );
	endif;

	$sql = "INSERT INTO people (first,last) VALUES ( '".$first."','".$last."')";

	$query = mysqli_query( $db, $sql );

	if( !$query ) :
		die("error SQL");
	endif;	
		
	mysqli_close($db);

	echo $first;

?>

