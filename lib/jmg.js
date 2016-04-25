/*
	JMG (Javascript Mini GUI)

	(c) Roberto Lopez <jmg.contact.box *at* gmail.com>

	The MIT License (MIT)

	Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
	documentation files (the "Software"), to deal in the Software without restriction, including without limitation 
	the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, 
	and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all copies or substantial portions 
	of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED 
	TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL 
	THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
	CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
	DEALINGS IN THE SOFTWARE.

*/

//------------------------------------------------------------------------------------------------------------------------
// public variables
//------------------------------------------------------------------------------------------------------------------------
var WIDGETS = [];
var CURRENTPAGE = "";
var STYLE='desktop';
var MAX_DIALOG_WIDTH = 700;

//------------------------------------------------------------------------------------------------------------------------
// showPage( id )
//------------------------------------------------------------------------------------------------------------------------
function showPage( id )
{
	$( ":mobile-pagecontainer" ).pagecontainer( "change", "#" + id );
}

//------------------------------------------------------------------------------------------------------------------------
// setPageStyle( style )
//------------------------------------------------------------------------------------------------------------------------
function setPageStyle( newStyle , width )
{
	STYLE = newStyle;

	if ( newStyle == "auto" || newStyle == "desktop" )
	{
		if ( typeof(width) == "undefined" )
		{
			MAX_DIALOG_WIDTH = 700;
		}
		else
		{
			MAX_DIALOG_WIDTH = width;
		}

	}

}

//------------------------------------------------------------------------------------------------------------------------
// doMethod
//------------------------------------------------------------------------------------------------------------------------
function doMethod( id , method , value )
{

	var string = '';

	var datarole = $('#' + id ).data('role'); 

	if ( method == 'addRow' )
	{

		string += '<tr style="height:1.5em;"  >';

		string += '<td class="column0" style="border: 1px solid rgb(192,192,192); border-collapse: collapse;"> ' +  ''  +  '<input type="checkbox"  onclick="changeColor(this)"  >' + '' + '  </td>';

		for( var n = 0; n < value.length; n++ )
		{	
			string += '<td style="border: 1px solid rgb(192,192,192); border-collapse: collapse;">' + value [n] + '</td>';
		}

		string += '</tr>';

		$('#'+id).append( string );

		if ( datarole == 'table' )
		{
			$("#"+id).table("refresh");
		}

	}
	else if ( method == 'deleteRow' )
	{
		document.getElementById( id ).deleteRow(value);
	}
	else if ( method == 'selectRow' )
	{
		document.getElementById(id).rows[value].cells[0].getElementsByTagName("input")[0].checked = true ;
	}
	else if ( method == 'unSelectRow' )
	{
		document.getElementById(id).rows[value].cells[0].getElementsByTagName("input")[0].checked = false ;
	}
	else if ( method == 'load' )
	{

		doMethod(id,'deleteAllRows');

		if ( typeof( value ) == 'string' )
		{
			var jsonData = value;
			var arr = JSON.parse( jsonData );
		}
		else if ( typeof( value ) == 'object' )
		{
			var arr = value;
		}
		else 
		{
			alert('Error (load method): Invalid Type');
		}

		var l = arr[0].length;

		for( var i=0; i < arr.length; i ++ ) 
		{
			var row = [];
			for ( var j=0 ; j<l ; j++ )
			{
				row.push(arr[i][j]);
			}			

			doMethod(id,'addRow', row )
		}	

		if ( datarole == 'table' )
		{
			$("#"+id).table("refresh");
		}

	}
	else if ( method == 'deleteAllRows' )
	{
		while ( get(id,'rowCount') > 0 )
		{
			doMethod( id, 'deleteRow' , 1 );
		}
	}

}
//------------------------------------------------------------------------------------------------------------------------
// get
//------------------------------------------------------------------------------------------------------------------------
function get( id , property , value1 , value2 )
{

	var datarole = $('#' + id ).data('role'); 
	var retval;

	if ( datarole == 'flipswitch' || datarole == 'text' || datarole == 'textarea' || datarole == 'button' || datarole == 'number'  || datarole == 'date' || datarole == 'select' )
	{
		var string = 'document.getElementById("' + id + '").' + property
		retval = eval(string) ;
	}
	else if ( datarole == 'std-table' || datarole == 'table' )
	{
		if ( property == 'rowCount' )
		{
			retval = document.getElementById(id).rows.length - 1;
		}
		else if ( property == 'selectedRowCount' )
		{
			var i, n ; n = 0 ;

			for ( i=1 ; i < document.getElementById(id).rows.length ; i++ )
			{
				if ( document.getElementById(id).rows[i].cells[0].getElementsByTagName("input")[0].checked == true ) 
				{
					n++ ;
				}			 
			}
			retval = n;
		}
		else if ( property == 'selectedRows' )
		{
			var selectedRows=new Array();
			var i, code, first, last, n ;
			n = 0 ;

			for ( i=1 ; i < document.getElementById(id).rows.length ; i++ )
			{
				if ( document.getElementById(id).rows[i].cells[0].getElementsByTagName("input")[0].checked == true ) 
				{
					selectedRows[n] = i ;
					n++ ;
				}			 
			}
			retval = selectedRows;
		}
		else if ( property == 'cell' )
		{
			retval = document.getElementById(id).rows[value1].cells[value2].childNodes[0].data;
		}
		else
		{
			alert('Property Not Supported');
		}
	}	
	else
	{
		if ( $('#' + id + '0' ).data('role') == 'radio' )
		{
			var radios = document.getElementsByName(id);
			var radios_value;
			for(var i = 0; i < radios.length; i++)
			{
				if(radios[i].checked)
				{
					retval = i;
					break;
				}
			}
		}
		else
		{
			alert('error: widget not supported (01)');
		}
	}

	return retval ;
}

//------------------------------------------------------------------------------------------------------------------------
// set( id , property , value , value2 , value3 )
//------------------------------------------------------------------------------------------------------------------------
function set( id , property , value , value2 , value3)
{

	var datarole = $('#' + id ).data('role'); 
	var string;

	if ( datarole == 'flipswitch' )
	{
		if ( property == 'value' )
		{
			$('#'+id ).val( value ).flipswitch( "refresh" ) ;
		}
		else
		{
			setStandard(id , property , value);
		}

	}
	else if ( datarole == 'button' )
	{

		if ( property == 'value')
		{		
			$("#"+id).val(value);
			$("#"+id).button("refresh");
		}
		else
		{		
			setStandard(id , property , value);
		}

	}
	else if ( datarole == 'text' || datarole == 'number' || datarole == 'date' || datarole == 'textarea' )
	{
		setStandard(id , property , value);
	}
	else if ( datarole == 'select'  )
	{
		if ( property == 'value')
		{		
			setStandard(id , 'selectedIndex' , value);
			$("#"+id).selectmenu('refresh');
		}
	}
	else if ( datarole == 'std-table' || datarole == 'table' )
	{
		if ( property == 'cell')
		{		
			document.getElementById(id).rows[value].cells[value2].childNodes[0].data = value3 ;
		}
	}
	else
	{
		if ( $('#' + id + '0' ).data('role') == 'radio' )
		{
			if ( property == 'value')
			{		
				$( '#' + id + value ).prop("checked","checked").checkboxradio("refresh");
				$("input[type='radio']").checkboxradio("refresh");
			}
		}
		else
		{
			alert('error: widget not supported(02)');
		}
	}

}

//------------------------------------------------------------------------------------------------------------------------
// beginGrid
//------------------------------------------------------------------------------------------------------------------------
function beginGrid()
{
	WIDGETS.push( [ "begingrid" ] );
}

//------------------------------------------------------------------------------------------------------------------------
// endGrid
//------------------------------------------------------------------------------------------------------------------------
function endGrid()
{
	WIDGETS.push( [ "endgrid" ] );
}


//------------------------------------------------------------------------------------------------------------------------
// beginBlock
//------------------------------------------------------------------------------------------------------------------------
function beginBlock()
{
	WIDGETS.push( [ "beginblock" ] );
}

//------------------------------------------------------------------------------------------------------------------------
// endBlock
//------------------------------------------------------------------------------------------------------------------------
function endBlock()
{
	WIDGETS.push( [ "endblock" ] );
}

//------------------------------------------------------------------------------------------------------------------------
// text
//------------------------------------------------------------------------------------------------------------------------
function text( prop )
{

	checkDup(prop['id']);

	WIDGETS.push( [ "text" , prop['id' ] , prop['label'] , prop['default'] , prop['placeholder'] ] );

}


//------------------------------------------------------------------------------------------------------------------------
// textArea
//------------------------------------------------------------------------------------------------------------------------
function textArea( prop )
{

	checkDup(prop['id']);

	WIDGETS.push( [ "textarea" , prop['id' ] , prop['label'] , prop['default'] ] );

}

//------------------------------------------------------------------------------------------------------------------------
// date
//------------------------------------------------------------------------------------------------------------------------
function date( prop )
{

	checkDup(prop['id']);

	WIDGETS.push( [ "date" , prop['id' ] , prop['label'] , prop['default'] ] );

}

//------------------------------------------------------------------------------------------------------------------------
// number
//------------------------------------------------------------------------------------------------------------------------
function number( prop )
{

	checkDup(prop['id']);

	WIDGETS.push( [ "number" , prop['id' ] , prop['label'] , prop['default'] , prop['placeholder'] ] );

}

//------------------------------------------------------------------------------------------------------------------------
// table
//------------------------------------------------------------------------------------------------------------------------
function table( prop )
{

	checkDup(prop['id']);

	WIDGETS.push( [ "table" , prop['id' ] , prop['headers'] , prop['style'] , prop['height'] ] );

}

//------------------------------------------------------------------------------------------------------------------------
// button
//------------------------------------------------------------------------------------------------------------------------
function button( prop )
{

	checkDup(prop['id']);

	WIDGETS.push( [ "button" , prop["id"] , prop["caption"] , prop["action"] , prop["inline"] , prop["iconType"] , prop["iconPos"] ] );

}

//------------------------------------------------------------------------------------------------------------------------
// flipswitch
//------------------------------------------------------------------------------------------------------------------------
function flipswitch ( prop )
{

	checkDup(prop['id']);

	WIDGETS.push( ["flipswitch" , prop['id'] , prop['label'] , prop['onValue'] , prop['offValue'] , prop['default'] ] );

}

//------------------------------------------------------------------------------------------------------------------------
// radio
//------------------------------------------------------------------------------------------------------------------------
function radio ( prop )
{

	checkDup(prop['id']);

	WIDGETS.push( ["radio" , prop['id'] , prop['options'] , prop['default'] , prop['label'] ] );

}

//------------------------------------------------------------------------------------------------------------------------
// select
//------------------------------------------------------------------------------------------------------------------------
function select ( prop )
{

	checkDup(prop['id']);

	WIDGETS.push( ["select" , prop['id'] , prop['options'] , prop['label'] , prop['default'] ] );

}

//------------------------------------------------------------------------------------------------------------------------
// header
//------------------------------------------------------------------------------------------------------------------------
function header( prop )
{

	checkDup(prop['id']);

	WIDGETS.push( [ "header" , prop['id'] , prop['caption'] ] );

}

//------------------------------------------------------------------------------------------------------------------------
// footer
//------------------------------------------------------------------------------------------------------------------------
function footer( prop )
{

	checkDup(prop['id']);

	WIDGETS.push( [ "header" , prop['id'] , prop['caption'] ] );

}

//------------------------------------------------------------------------------------------------------------------------
// beginPage
//------------------------------------------------------------------------------------------------------------------------
function beginPage( id )
{

	checkDup(id);

	CURRENTPAGE = id;

}

//------------------------------------------------------------------------------------------------------------------------
// endPage
//------------------------------------------------------------------------------------------------------------------------
function endPage()
{

	var currentRole = '';
	var blockCount = 0;
	var closedBlocks = 0;

	//----------------------------------------------------------------------
	// Page Style Parser
	//----------------------------------------------------------------------

	if ( STYLE == 'desktop' )
	{
	        var styleString = 'data-dialog="true"  ';
		currentRole = 'dialog';
	}
	else if ( STYLE == 'mobile' )
	{
	        var styleString = 'data-dialog="false"';
		currentRole = 'page';
	}
	else if ( STYLE == 'auto' )
	{
		if (window.screen.availWidth > MAX_DIALOG_WIDTH )
		{
		        var styleString = 'data-dialog="true"';
			currentRole = 'dialog';
		}	
		else
		{
		        var styleString = 'data-dialog="false"';
			currentRole = 'page';
		}
	}
	else
	{
		alert('error: Invalid Style');
		return;
	}


	//----------------------------------------------------------------------
	// Widget Parser
	//----------------------------------------------------------------------

	var contentString = '';

	for ( var i = 0 ; i < WIDGETS.length ; i++ )
	{

		//----------------------------
		// flipswitch
		//----------------------------
		// 0 -> Widget Type ('flipswitch')
		// 1 -> id
		// 2 -> Label
		// 3 -> On Value
		// 4 -> Off Value
		// 5 -> Default
		//----------------------------

		if ( WIDGETS[i][0] == 'flipswitch' )
		{

			var selected1 = '';
			var selected2 = '';

			if ( WIDGETS[i][4] == WIDGETS[i][5] )
			{
				selected1 = 'selected';
			}
			else if ( WIDGETS[i][3] == WIDGETS[i][5] )
			{
				selected2 = 'selected';
			}
			else 
			{
				if ( typeof( WIDGETS[i][5] ) == 'string' )
				{
					alert('Error (FlipSwitch): Invalid default value');
					return;
				}
				else
				{
					selected1 = 'selected';
				}			
			}


			if ( typeof( WIDGETS[i][2] ) == 'string' )
			{
				contentString += '<label for="' + WIDGETS[i][1] + '">' + WIDGETS[i][2] + '</label>';
			}

			contentString += '<select id="' + WIDGETS[i][1] +'" data-role="flipswitch">';
			contentString += '<option ' + selected1 + ' value="' + WIDGETS[i][4] + '">' + WIDGETS[i][4] + '</option>';
			contentString += '<option ' + selected2 + ' value="' + WIDGETS[i][3] + '">' + WIDGETS[i][3] + '</option>';
			contentString += '</select>';

		}

		//----------------------------
		// button
		//----------------------------
		// 0 -> Widget Type ('button')
		// 1 -> id
		// 2 -> Caption
		// 3 -> Action
		// 4 -> Inline
		// 5 -> Icon Type
		// 6 -> Icon Position
		//----------------------------

		else if ( WIDGETS[i][0] == 'button' )
		{

			if ( WIDGETS[i][4] == true )
			{
				var inline = ' data-inline="true" ';
			}
			else
			{
				var inline = '';
			}

			if ( typeof(WIDGETS[i][5]) == 'string' )
			{
				var iconType = ' data-icon="' + WIDGETS[i][5] + '"' ;
			}
			else
			{
				var iconType = '';
			}

			if ( typeof(WIDGETS[i][6]) == 'string' )
			{
				var iconPos = ' data-iconpos="' + WIDGETS[i][6] + '"' ;
			}
			else
			{
				var iconPos = '';
			}

			contentString += '<input type="button" data-role="button" ' + iconType + iconPos + ' value="' + WIDGETS[i][2] + '" onclick="' +  WIDGETS[i][3] + '" id="' + WIDGETS[i][1] + '"' + inline + '>' ;

		}

		//----------------------------
		// beginGrid
		//----------------------------
		// 0 -> Widget Type ('begingrid')
		//----------------------------

		else if ( WIDGETS[i][0] == 'begingrid' )
		{
			contentString += '_JMG_BEGIN_GRID_PLACEHOLDER_' ;
		}

		//----------------------------
		// endGrid
		//----------------------------
		// 0 -> Widget Type ('endgrid')
		//----------------------------

		else if ( WIDGETS[i][0] == 'endgrid' )
		{
			contentString += '</div>' ;

			if ( blockCount == 1 )
			{
				contentString = contentString.replace( '_JMG_BEGIN_GRID_PLACEHOLDER_' , '<div class="ui-grid-solo ui-responsive">' );
			}
			else if ( blockCount == 2 )
			{
				contentString = contentString.replace( '_JMG_BEGIN_GRID_PLACEHOLDER_' , '<div class="ui-grid-a ui-responsive">' );
			}
			else if ( blockCount == 3 )
			{
				contentString = contentString.replace( '_JMG_BEGIN_GRID_PLACEHOLDER_' , '<div class="ui-grid-b ui-responsive">' );
			}
			else if ( blockCount == 4 )
			{
				contentString = contentString.replace( '_JMG_BEGIN_GRID_PLACEHOLDER_' , '<div class="ui-grid-c ui-responsive">' );
			}
			else if ( blockCount == 5 )
			{
				contentString = contentString.replace( '_JMG_BEGIN_GRID_PLACEHOLDER_' , '<div class="ui-grid-d ui-responsive">' );
			}
			else 
			{
				alert('ERROR: Maximun number of blocks!');
				return;
			}

		}

		//----------------------------
		// beginBlock
		//----------------------------
		// 0 -> Widget Type ('beginblock')
		//----------------------------

		else if ( WIDGETS[i][0] == 'beginblock' )
		{

			blockCount++;

			if ( blockCount == 1 )
			{
				contentString += '<div class="ui-block-a">' ;
			}
			else if ( blockCount == 2 )
			{
				contentString += '<div class="ui-block-b">' ;
			}
			else if ( blockCount == 3 )
			{
				contentString += '<div class="ui-block-c">' ;
			}
			else if ( blockCount == 4 )
			{
				contentString += '<div class="ui-block-d">' ;
			}
			else if ( blockCount == 5 )
			{
				contentString += '<div class="ui-block-e">' ;
			}
			else 
			{
				alert('ERROR: Maximun number of blocks!');
				return;
			}

		}

		//----------------------------
		// endBlock
		//----------------------------
		// 0 -> Widget Type ('endblock')
		//----------------------------

		else if ( WIDGETS[i][0] == 'endblock' )
		{
			contentString += '</div>' ;
		}

		//----------------------------
		// header
		//----------------------------
		// 0 -> Widget Type ('header')
		// 1 -> id
		// 2 -> Caption
		//----------------------------

		else if ( WIDGETS[i][0] == 'header' )
		{
			contentString += '<div data-role="header" id="' + WIDGETS[i][1] + '"> ' ;
			contentString += '<h1>' + WIDGETS[i][2] + '</h1>';
			contentString += '</div>' ;
		}

		//----------------------------
		// footer
		//----------------------------
		// 0 -> Widget Type ('footer')
		// 1 -> id
		// 2 -> Caption
		//----------------------------

		else if ( WIDGETS[i][0] == 'footer' )
		{
			contentString += '<div data-role="footer" id="' + WIDGETS[i][1] + '"> ' ;
			contentString += '<h1>' + WIDGETS[i][2] + '</h1>';
			contentString += '</div>' ;
		}

		//----------------------------
		// text
		//----------------------------
		// 0 -> Widget Type ('text')
		// 1 -> id
		// 2 -> Label
		// 3 -> Default
		// 4 -> Placeholder
		//----------------------------

		else if ( WIDGETS[i][0] == 'text' )
		{

			if ( typeof( WIDGETS[i][3])  == 'string' )
			{
				var value = 'value="' + WIDGETS[i][3] + '"';
			}
			else
			{			
				var value = '';	
			}

			if ( typeof( WIDGETS[i][4])  == 'string' )
			{
				var placeholder = 'placeholder="' + WIDGETS[i][4] + '"';
			}
			else
			{			
				var placeholder = '';	
			}


			if ( typeof( WIDGETS[i][2])  == 'string' )
			{
				contentString += '<label for="' + WIDGETS[i][1] + '">' + WIDGETS[i][2] + '</label>' ;
			}

			contentString += '<input type="text"  data-role="text" data-clear-btn="true" ' + placeholder + ' id="' + WIDGETS[i][1] + '" ' + value +  ' >';

		}

		//----------------------------
		// textArea
		//----------------------------
		// 0 -> Widget Type ('textarea')
		// 1 -> id
		// 2 -> Label
		// 3 -> Default
		//----------------------------

		else if ( WIDGETS[i][0] == 'textarea' )
		{

			if ( typeof( WIDGETS[i][2])  == 'string' )
			{
				contentString += '<label for="' + WIDGETS[i][1] + '">' + WIDGETS[i][2] + '</label>' ;
			}

			contentString += '<textarea  data-role="textarea" id="' + WIDGETS[i][1] + '" >';

			if ( typeof( WIDGETS[i][3]) == 'string' )
			{
				contentString += WIDGETS[i][3];
			}

			contentString += '</textarea>';

		}
	
		//----------------------------
		// number
		//----------------------------
		// 0 -> Widget Type ('number')
		// 1 -> id
		// 2 -> Label
		// 3 -> default
		// 4 -> placeholder
		//----------------------------

		else if ( WIDGETS[i][0] == 'number' )
		{

			if ( typeof( WIDGETS[i][3]) == 'string' || typeof( WIDGETS[i][3]) == 'number' )
			{
				var value = 'value="' + WIDGETS[i][3] + '"';
			}
			else
			{			
				var value = '';	
			}

			if ( typeof( WIDGETS[i][4])  == 'string' )
			{
				var placeholder = 'placeholder="' + WIDGETS[i][4] + '"';
			}
			else
			{			
				var placeholder = '';	
			}

			if ( typeof( WIDGETS[i][2])  == 'string' )
			{
				contentString += '<label for="' + WIDGETS[i][1] + '">' + WIDGETS[i][2] + '</label>' ;
			}

			contentString += '<input type="number" data-clear-btn="true" data-role="number" ' + placeholder +  ' id="' + WIDGETS[i][1] + '" ' + value + ' >';

		}

		//----------------------------
		// date
		//----------------------------
		// 0 -> Widget Type ('date')
		// 1 -> id
		// 2 -> Label
		// 3 -> Default
		//----------------------------

		else if ( WIDGETS[i][0] == 'date' )
		{

			if ( typeof( WIDGETS[i][2])  == 'string' )
			{
				contentString += '<label for="' + WIDGETS[i][1] + '">' + WIDGETS[i][2] + '</label>' ;
			}

			if ( typeof( WIDGETS[i][3])  == 'string' )
			{
				var value = ' value="' + WIDGETS[i][3] + '" ' ;
			}
			else
			{
				var value = '' ;
			}

			contentString += '<input type="date" data-clear-btn="true" data-role="date" id="' + WIDGETS[i][1] + '" ' + value + ' >';

		}

		//----------------------------
		// radio
		//----------------------------
		// 0 -> Widget Type ('radio')
		// 1 -> id
		// 2 -> Options Array
		// 3 -> Default
		// 4 -> Label
		//----------------------------

		else if ( WIDGETS[i][0] == 'radio' )
		{

			var checked = '';

			var options = WIDGETS[i][2];

			if ( typeof( WIDGETS[i][4])  == 'string' )
			{
				contentString += '<label for="' + WIDGETS[i][1]+'L' + '">' + WIDGETS[i][4] + '</label>';
			}

			contentString += '<fieldset data-role="controlgroup" id="' + WIDGETS[i][1]+'L' + '" >';

			for( var n = 0; n < options.length; n++ )
			{	

				if ( WIDGETS[i][3] == n )
				{					
					checked = 'checked="checked"';					
				}
				else
				{					
					checked = '';					
				}

				contentString += '<input type="radio"  value="' + options[n] + '" name="' + WIDGETS[i][1] + '" id="' + WIDGETS[i][1]+n + '" data-role="radio" ' + checked + ' >';
				contentString += '<label for="' + WIDGETS[i][1]+n + '">' + options[n] + '</label>';
 
			}

                        contentString += '</fieldset>';

		}


		//----------------------------
		// select
		//----------------------------
		// 0 -> Widget Type ('select')
		// 1 -> id
		// 2 -> Options Array
		// 3 -> Label
		// 4 -> Default
		//----------------------------

		else if ( WIDGETS[i][0] == 'select' )
		{

			var selected = '';

			var options = WIDGETS[i][2];

			if ( typeof( WIDGETS[i][3])  == 'string' )
			{
				contentString += '<label for="' + WIDGETS[i][1] + '" class="select">' + WIDGETS[i][3] + '</label>';
			}

			contentString += '<select name="' + WIDGETS[i][1] + '" id="' + WIDGETS[i][1]  + '"'  + ' data-role="select" ' + '>';

			for( var n = 0; n < options.length; n++ )
			{	

				if ( WIDGETS[i][4] == n )
				{					
					selected = 'selected';					
				}
				else
				{					
					selected = '';					
				}

				contentString += '<option ' + selected + ' value="' + n + '">' + options[n] + '</option>';

			}

                        contentString += '</select>';

		}


		//----------------------------
		// table
		//----------------------------
		// 0 -> Widget Type ('table')
		// 1 -> id
		// 2 -> headers
		// 3 -> style
		// 4 -> height
		//----------------------------

		else if ( WIDGETS[i][0] == 'table' )
		{

			if ( typeof( WIDGETS[i][3]) == 'string' )
			{

				if ( WIDGETS[i][3] == 'standard' )
				{
					var rolemode = ' data-role="std-table" ';

				}
				else if ( WIDGETS[i][3] == 'columntoggle' )
				{
					var rolemode = ' data-role="table" data-mode="columntoggle" class="ui-responsive" ';
				}
				else if ( WIDGETS[i][3] == 'reflow' )
				{
					var rolemode = ' data-role="table" ';
				}
				else 
				{
					alert('error: Invalid table style');
					return;
				}
			}
			else
			{
				var rolemode = ' data-role="std-table" ';
			}

			if ( typeof( WIDGETS[i][4]) == 'string' )
			{
				var tableHeight = 'height: ' + WIDGETS[i][4] + ';'
			}
			else
			{
				var tableHeight = 'height: 16em;'
			}

			var headers = WIDGETS[i][2];

			var tableStyle = 'style="' + tableHeight + 'overflow-y:scroll;border:1px solid rgb(192,192,192);border: 1px solid rgb(192,192,192); border-collapse: collapse;"';

			contentString += '<div ' + tableStyle + ' >';

			contentString += '<table '  + ' style="border: 1px solid rgb(192,192,192);" ' + rolemode + ' width="100%"  id="' + WIDGETS[i][1] + '" >' ;

			contentString += '<thead style="height:2em;">';

			contentString += '<tr>';

			contentString += '<th class="column0" style="border: 1px solid rgb(192,192,192); border-collapse: collapse;" >' + '' + '</th>';

			for( var n = 0; n < headers.length; n++ )
			{	
				contentString += '<th data-priority="' + n+1 + '" style="border: 1px solid rgb(192,192,192); border-collapse: collapse;"  >' + headers [n] + '</th>';
			}

			contentString += '</tr>';

			contentString += '</thead>';

			contentString += '<tbody>';

			contentString += '</tbody>';

			contentString += '</table>' ;

			contentString += '</div>'

		}

	}

	//----------------------------------------------------------------------
	// add dialog width css to header
	//----------------------------------------------------------------------

	var dialogStyle = '';

	dialogStyle += '<style>';
	dialogStyle += '.ui-dialog-contain {';
	dialogStyle += 'width: 92.5%;';
	dialogStyle += 'max-width: ' + MAX_DIALOG_WIDTH.toString() + 'px;' ;
	dialogStyle += 'margin: 10% auto 15px auto;';
	dialogStyle += 'padding: 0;';
	dialogStyle += 'position: relative;';
	dialogStyle += 'top: -50px;';

	dialogStyle += '}';


	dialogStyle += 'input[type="checkbox"] {'

	dialogStyle += '    width: 1.5em;'
	dialogStyle += '    height:1.5em;'

	dialogStyle += '    padding: 0.5em;'
	dialogStyle += '    border: 1px solid #369;'
	dialogStyle += '}'




	dialogStyle += '.column0 {'

	dialogStyle += 'width: 2em;'

	dialogStyle += '}'







	dialogStyle += '.grid tr.selected'
	dialogStyle += '{'
	dialogStyle += '   color: rgb(255,255,255);'
	dialogStyle += '   background-color: rgb(100,100,100);'
	dialogStyle += '}'

	dialogStyle += '.grid tr.unselected'
	dialogStyle += '{'
	dialogStyle += '   color: rgb(0,0,0);'
	dialogStyle += '   background-color: rgb(255,255,255);'
	dialogStyle += '}'













	$('head').append( dialogStyle );

	//----------------------------------------------------------------------
	// add page to body
	//----------------------------------------------------------------------

	$('#main_body').append('<div data-role="page" id="' + CURRENTPAGE + '" ' + styleString + '><div data-role="content">' + contentString + '</div></div>');

	CURRENTPAGE = "";
	WIDGETS = [];

}

//////////////////////////////////////////////////////////////////////////////////
// INTERNAL FUNCTIONS
//////////////////////////////////////////////////////////////////////////////////

function setStandard(id , property , value)
{

	if ( typeof(value) == "string" )
	{
		var string = 'document.getElementById("' + id + '").' + property + ' = ' + '"' + value + '"'
	}
	else
	{
		var string = 'document.getElementById("' + id + '").' + property + ' = ' + value 
	}

	eval(string);

}

//------------------------------------------------------------------------------------------------------------------------

function checkDup( id )
{

	var l = len = WIDGETS.length;

	for ( var i = 0, l ; i < len ; i++ )
	{
		if ( WIDGETS[i][1] === id )
		{
			alert('warning: id duplicated (' + id + ')' );
			return;			
		}
	}

}

//------------------------------------------------------------------------------------------------------------------------

function changeColor(o)
{

	if( o.checked )
	{
		o.parentNode.parentNode.style.backgroundColor='darkgray';
	}
	else
	{
		o.parentNode.parentNode.style.backgroundColor='transparent';
	}

}