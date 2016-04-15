<?php
		
	$db = mysqli_connect( '127.0.0.1', 'root', '');

	if( ! $db ) :
		die( mysql_error() )	;
	endif;

	if( ! mysqli_select_db($db, 'test')):
		die( mysql_error() );
	endif;
	
	$query = mysqli_query( $db, "select * from people" );

	if( !$query ) :
		die("error SQL");
	endif;
	
	$table = array();

	while( $row = mysqli_fetch_array( $query, MYSQLI_NUM ) ):
		$table[] = $row;
	endwhile;

	$string	= json_encode( $table );
	
	mysqli_free_result( $query );
	mysqli_close($db);

	echo $string;

?>

