<?php

	$id	= $_REQUEST["id"];
	$first	= $_REQUEST["first"];
	$last	= $_REQUEST["last"];
	
	$db = mysqli_connect( '127.0.0.1', 'root', '');

	if( ! $db ) :
		die( mysql_error() )	;
	endif;

	if( ! mysqli_select_db($db, 'test')):
		die( mysql_error() );
	endif;

	$sql = "UPDATE people SET first='".$first."', last='".$last."' WHERE id=".$id;

	$query = mysqli_query( $db, $sql );

	if( !$query ) :
		die("error SQL");
	endif;	

	mysqli_close($db);

?>

