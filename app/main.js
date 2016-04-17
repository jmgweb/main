/*
        JMG Main Demo - Roberto Lopez
*/

function main()
{

	/*

	setPageStyle() determines how the page is displayed: 

	If 'desktop' is used as first parameter, the pages are shown as dialogs.

	If 'mobile' is used as first parameter, pages are shown using full width.

	If 'auto' is used as first parameter, the pages are shown using full width when screen size is lower than 700 px
	and as dialogs otherwise.

	For mobile and desktop styles, a second parameter is allowed, determining the mode-switch width and the dialog 
	width respectively.

	In desktop (dialog) mode, labels are shown at widget left.

	In mobile (page) mode, labels are shown above widgets.
	
	*/

	setPageStyle('mobile');

	//////////////////////////////////////////////////////////
	// Main Menu
	//////////////////////////////////////////////////////////

	/*
	All the pages are defined between 'beginPage()' and 'endPage()' functions.
	*/

	beginPage("menu");

		/*
		Header is optional. It is shown on dialogs and pages
		*/ 

		header({
			id	:'hdrmenu' , 
			caption	:'JMG Main Demo'
		}); 

		/*

		- You must specify (at least) 'id', 'caption' and 'action' properties for buttons.
		
		- Buttons uses full width of page (or dialog) except when 'inline' property is set to 'true'.
		  In such case button width is set automatically according its caption.

		- The id must be unique along the app. This allows to univocally identify a widget.

		- 'showPage()' function will show a page with the 'id', specified as first parameter.

		- Grids are used to define layouts for widgets. You can accomodate until five blocks on each 
		  grid. Blocks are shown side by side if the width of the screen device allows that, if not 
		  they are stacked (they are responsive). You can test this easily, playing with the zoom of 
		  your browser, or using the device emulation mode of the Javascript console in desktop Chrome 
		  browser.  

		*/
		
		beginGrid();

			beginBlock();

				button({ 
					id	:'btna' , 
					caption	:"Text Test" , 
					action	:"showPage('page_001')" 
				});

				button({ 
					id	:'btnb' , 
					caption	:"FlipSwitch Test" , 
					action	:"showPage('page_002')" 
				});

				button({ 
					id	:'btnc' , 
					caption	:"Button Test" , 
					action	:"showPage('page_003')" 
					});

				button({ 
					id	:'btnd' , 
					caption	:"Number Test" , 
					action	:"showPage('page_004')" 
					});

				button({ 
					id	:'btne' , 
					caption	:"Date Test" , 
					action	:"showPage('page_005')" 
					});

			endBlock();

			beginBlock();

				button({ 
					id	:'btnf' , 
					caption	:"TextArea Test" , 
					action	:"showPage('page_006')" 
					});

				button({ 
					id	:'btng' , 
					caption	:"Table Test" , 
					action	:"showPage('page_007')" 
					});

				button({ 
					id	:'btnh' , 
					caption	:"AJAX Test" , 
					action	:"showPage('page_008')" 
					});

				button({ 
					id	:'btni' , 
					caption	:"Radio Test" , 
					action	:"showPage('page_009')" 
					});

				button({ 
					id	:'btnj' , 
					caption	:"Select Test" , 
					action	:"showPage('page_010')" 
					});

			endBlock();

		endGrid();

		/*
		Footer is optional. It is shown on dialogs and pages
		*/ 

		footer({
			id	:'ftrmenu', 
			caption	:'JMG Power is Here Too!'
		});

	endPage();

	//////////////////////////////////////////////////////////
	// Textbox Test
	//////////////////////////////////////////////////////////

	beginPage("page_001");

		header({
			id	:'hdr1' , 
			caption	:'TextBox Test'
		});

		/*
		'text' function defines a textbox. 'id' and 'label' properties are required. 'default' is optional.
		*/

		text({
			id	:'txt1', 
			label	:'Input Text:',
			default	:'Hello!'
		});

		text({
			id	    :'txt2', 
			label	    :'Input Text:',
			placeholder :'Write some text here!!!'
		});

		button({
			id	:'btn1' , 
			caption	:"Get Text Value" , 
			action	:"alert(get('txt1','value'))" 
		});

		button({
			id	:'btn2' , 
			caption	:"Set Text Value" , 
			action	:"set('txt1','value','new value')" 
		});


		/*

		'iconType' property valid values are:

		action alert arrow-d arrow-d-l arrow-d-r arrow-l arrow-r arrow-u arrow-u-l 
		arrow-u-r audio back bars bullets calendar camera carat-d carat-l carat-r carat-u check clock cloud 
		comment delete edit eye forbidden forward gear grid heart home info location lock mail minus navigation 
		phone plus power recycle refresh search shop star tag user video

		'iconPos' property valid values are:

		left right top bottom notext

		*/

		button({
			id	:'btn10' , 
			caption	:"Back To Menu" , 
			action	:"showPage('menu')" ,
			iconType:"arrow-l",
			iconPos:"left"
		});

	endPage();

	//////////////////////////////////////////////////////////
	// FlipSwitch Test
	//////////////////////////////////////////////////////////

	beginPage("page_002");

		header({
			id	:'hdr1', 
			caption	:'FlipSwitch Test'
		});

		/*
		'flipswitch' works like a checkbox, but it is more flexible. Properties are self-explanatory (I hope :).
		*/

		flipswitch({
			id	:'flip1' , 
			label	:'FlipSwitch:' , 
			onValue	:'On' , 
			offValue:'Off',
			default	:'On'
		});

		button({
			id	:'btn3' , 
			caption	:"Get Flip Value" , 
			action	:"alert(get('flip1','value'))"
		});

		button({
			id	:'btn4' , 
			caption	:"Set Flip On" ,
			action	:"set('flip1','value','On')"
		});

		button({
			id	:'btn5' , 
			caption	:"Set Flip Off" , 
			action	:"set('flip1','value','Off')"
		});

		button({
			id	:'btn20' , 
			caption	:"Back To Menu" , 
			action	:"showPage('menu')",
			iconType:"arrow-l",
			iconPos:"left"
		});

	endPage();

	//////////////////////////////////////////////////////////
	// Button Test
	//////////////////////////////////////////////////////////

	beginPage("page_003");

		header({
			id	:'hdr1', 
			caption	:'Button Test'
		});

		button({ 
			id	:'btn31' , 
			caption	:"Change Me" , 
			action	:"alert('Change Me!')" 
		});

		button({ 
			id	:'btn32' , 
			caption	:"Set Button Value" , 
			action	:"set('btn31','value', prompt('Please enter new value', 'new value') )" 
		});

		button({
			id	:'btn33' ,
			caption	:"Get Button Value" , 
			action	:"alert(get('btn31','value'))" 
		});

		button({ 
			id	:'btn30' , 
			caption	:"Back To Menu" , 
			action	:"showPage('menu')",
			iconType:"arrow-l",
			iconPos:"left"
		});

	endPage();

	//////////////////////////////////////////////////////////
	// Number Test
	//////////////////////////////////////////////////////////

	beginPage("page_004");

		header({
			id	:'hdr4' , 
			caption	:'Number Test'
		});

		/*
		'number' is equivalent to a spinner and is (obviously) used for numeric inputs :)
		*/

		number({
			id	:'num1', 
			label	:'Input Number:',
			default	: 10
		});

		number({
			id	   :'num2', 
			label	   :'Input Number:',
			placeholder:'Write a number!!!'
		});


		button({
			id	:'btn41' , 
			caption	:"Get Number Value" , 
			action	:"alert(get('num1','value'))" 
		});

		button({
			id	:'btn42' , 
			caption	:"Set Number Value" , 
			action	:"set('num1','value', prompt('Please enter new value', '1000') )" 
		});

		button({
			id	:'btn43' , 
			caption	:"Back To Menu" , 
			action	:"showPage('menu')",
			iconType:"arrow-l",
			iconPos:"left"
		});

	endPage();

	//////////////////////////////////////////////////////////
	// Date Test
	//////////////////////////////////////////////////////////

	beginPage("page_005");

		header({
			id	:'hdr5' , 
			caption	:'Date Test'
		});

		/*
		'date' is used for dates input and is equivalent to a datePicker. The dates are handled 
		 in the yyyy-mm-dd format (as strings).
		*/

		date({
			id	:'date1', 
			label	:'Input Date:',
			default	:'2015-12-31'
		});

		button({
			id	:'btn51' , 
			caption	:"Get Date Value" , 
			action	:"alert(get('date1','value'))" 
		});

		button({
			id	:'btn52' , 
			caption	:"Set Date Value" , 
			action	:"set('date1','value', prompt('Please enter new value', '2016-01-01') )" 
		});

		button({
			id	:'btn53' , 
			caption	:"Back To Menu" , 
			action	:"showPage('menu')",
			iconType:"arrow-l",
			iconPos:"left"
		});

	endPage();

	//////////////////////////////////////////////////////////
	// TextArea Test
	//////////////////////////////////////////////////////////

	beginPage("page_006");

		header({
			id	:'hdr6' , 
			caption	:'TextArea Test'
		});

		/*
		'textArea' is used for large text inputs and is equivalent to a textBox.
		*/

		textArea({
			id	:'textarea1', 
			label	:'Input Text:',
			default	:'Hello!'
		});

		button({
			id	:'btn61' , 
			caption	:"Get TextArea Value" , 
			action	:"alert(get('textarea1','value'))" 
		});

		button({
			id	:'btn62' , 
			caption	:"Set TextArea Value" , 
			action	:"set('textarea1','value', prompt('Please enter new value', 'New Text') )" 
		});

		button({
			id	:'btn63' , 
			caption	:"Back To Menu" , 
			action	:"showPage('menu')",
			iconType:"arrow-l",
			iconPos:"left"
		});

	endPage();

	//////////////////////////////////////////////////////////
	// Table Test
	//////////////////////////////////////////////////////////

	beginPage("page_007");

		header({
			id	:'hdr7' , 
			caption	:'Table Test'
		});

		/*

		- 'table()' function requires only two properties, the 'id' and an array containing the headers.

		- The 'load' method, can fill the table from an array or a JSON string (the type are detected and
		  handled automatically).

		*/

		table({
			id	:'table1', 
			headers	:["First", "Last" ,"Age"]
		});

		beginGrid();

			beginBlock();

				button({
					id	:'btn7l' , 
					caption	:"Load Data From Array" , 
					action	:"loadTest()",
				});

				button({
					id	:'btn71' , 
					caption	:"Add Row" , 
					action	:"doMethod('table1','addRow',['Johm','Doe','21'])" ,
				});

				button({
					id	:'btn73' , 
					caption	:"Delete Row" , 
					action	:"doMethod('table1','deleteRow', prompt('Please enter row number to delete', '1') )" ,
				});

				button({
					id	:'btn72b' , 
					caption	:"Delete All Rows" , 
					action	:"doMethod('table1','deleteAllRows')" ,
				});

			endBlock();

			beginBlock();

				button({
					id	:'btn72' , 
					caption	:"Get Row Count" , 
					action	:"alert(get('table1','rowCount'))" ,
				});

				button({
					id	:'btn74' , 
					caption	:"Select Row 1" , 
					action	:"doMethod('table1','selectRow',1)" ,
				});

				button({
					id	:'btn75' , 
					caption	:"Unselect Row 1" , 
					action	:"doMethod('table1','unSelectRow',1)" ,
				});

				button({
					id	:'btn76' , 
					caption	:"Selected Row Count" , 
					action	:"alert(get('table1','selectedRowCount'))" ,
				});

			endBlock();

			beginBlock();

				button({
					id	:'btn77' , 
					caption	:"Get Selected Rows" , 
					action	:"alert(get('table1','selectedRows'))" ,
				});

				button({
					id	:'btn79' , 
					caption	:"Set Cell Value (1,1)" , 
					action	:"set('table1','cell', 1 , 1 , prompt('Please enter new value', 'new value') )" ,
				});

				button({
					id	:'btn78' , 
					caption	:"Get Cell Value (1,1)" , 
					action	:"alert(get('table1','cell',1,1))" ,
				});

				button({
					id	:'btn70' , 
					caption	:"Back To Menu" , 
					action	:"showPage('menu')",
					iconType:"arrow-l",
					iconPos:"left"
				});

			endBlock()

		endGrid();

	endPage();

	//////////////////////////////////////////////////////////
	// AJAX Test
	//////////////////////////////////////////////////////////

	beginPage("page_008");

		header({
			id	:'hdr8' , 
			caption	:'AJAX Test'
		});

		text({
			id	:'text8', 
			label	:'Server Address:',
			default	:'127.0.0.1'
		});


		table({
			id	:'table2', 
			headers	:["ID", "First" ,"Last"]
		});

		beginGrid();

			beginBlock();

				button({
					id	:'btn81' , 
					caption	:"Load Data From Server" , 
					action	:"ajaxRead()" ,
				});

				button({
					id	:'btn82' , 
					caption	:"Delete Selected Row" , 
					action	:"ajaxDelete()" ,
				});

			endBlock();

			beginBlock();

				button({
					id	:'btn83' , 
					caption	:"Add New Row" , 
					action	:"ajaxNew()" ,
				});

				button({
					id	:'btn84' , 
					caption	:"Edit Selected Row" , 
					action	:"ajaxEdit()" ,
				});

			endBlock();

		endGrid();
        
		button({
			id	:'btn80' , 
			caption	:"Back To Menu" , 
			action	:"showPage('menu')" ,
			iconType:"arrow-l",
			iconPos:"left"
		});

	endPage();


	//////////////////////////////////////////////////////////
	// Radio Test
	//////////////////////////////////////////////////////////

	beginPage("page_009");

		header({
			id	:'hdr9' , 
			caption	:'Radio Test'
		});

		/*
		'radio()' defines a group of radio buttons and only two properties are mandatory ('id' and 'options').
		*/

		radio({
			id	:'radio1', 
			options	:["Option 1", "Option 2" ,"Option 3"],
			label	:'Click any option:',
			default	:1
		});

		button({
			id	:'btn91' , 
			caption	:"Get Value" , 
			action	:"alert(get('radio1','value'))" 
		});

		button({
			id	:'btn92' , 
			caption	:"Set Value" , 
			action	:"set('radio1','value', prompt('Please enter new value (0-2)', '1') )" 
		});

		button({
			id	:'btn80' , 
			caption	:"Back To Menu" , 
			action	:"showPage('menu')",
			iconType:"arrow-l",
			iconPos:"left"
		});


	endPage();

	//////////////////////////////////////////////////////////
	// Select Test
	//////////////////////////////////////////////////////////

	beginPage("page_010");

		header({
			id	:'hdr10' , 
			caption	:'Select Test'
		});

		/*
		'select()' defines a select menu (worls like a combobox). 'id' and 'options' propeties are mandatory.
		*/

		select({
			id	:'select1', 
			options	:["Option 1", "Option 2" ,"Option 3"],
			label	:'Select Something:',
			default	:1
		});

		button({
			id	:'btn91' , 
			caption	:"Get Value" , 
			action	:"alert(get('select1','value'))" 
		});

		button({
			id	:'btn92' , 
			caption	:"Set Value" , 
			action	:"set('select1','value', prompt('Please enter new value (0-2)', '1') )" 
		});

		button({
			id	:'btn90' , 
			caption	:"Back To Menu" , 
			action	:"showPage('menu')",
			iconType:"arrow-l",
			iconPos:"left"
		});


	endPage();

	//////////////////////////////////////////////////////////
	// Show The Menu Page
	//////////////////////////////////////////////////////////

	showPage("menu");

}


function loadTest()
{

	/*
	The 'load' method, can fill the table from an array or a JSON string (the type are detected and
	handled automatically).
	*/

	var arr = [];
	arr.push(['1,1','1,2','1,3']);
	arr.push(['2,1','2,2','2,3']);
	arr.push(['3,1','3,2','3,3']);	
	arr.push(['4,1','4,2','4,3']);	
	arr.push(['5,1','5,2','5,3']);	

	doMethod('table1','load',arr);

}

function ajaxRead()
{	
	// First, we call the select.php server procedure to get our recordset. 
	// The process is ASYNCHRONOUS, meaning that our client program still runing
	// WITHOUT WAIT for request completion.

	var server = get('text8','value');

	var request = $.ajax( { url: "http://" + server + "/php/select.php" ,  crossDomain: true } );

	// Then we define the required callback functions for the events 'done' and 'fail'.
	// One of this will be automatically executed, when our request be succesfully finished
	// or when fail.

	request.done(function( jsonData )
	{
		doMethod('table2','load',jsonData);
	});

	request.fail(function(jqXHR, textStatus)
	{
		alert( "Request failed: " + textStatus );
	});

}

function ajaxDelete()
{	

	// If no rows selected the action will be canceled.

	if ( get('table2','selectedRowCount') == 0 )
	{
		alert('No Row Selected!');
		return;
	}

	// We want that only one row be selected for deletion at a time!

	if ( get('table2','selectedRowCount') > 1 )
	{
		alert('You must select only one row!');
		return;
	}

	// Getting the 'id' (column 1) of the selected row.

	var selectedRows = get('table2','selectedRows');

	var selRowNumber = selectedRows[0];

	var delete_id = get('table2','cell',selRowNumber,1) ;

	// With the 'id' we call the delete.php server procedure.

	var server = get('text8','value');

	var request = $.ajax( { url: "http://" + server + "/php/delete.php" , data: { id: delete_id } } );

	request.done(function( data )
	{
		ajaxRead();
		alert('Selected Row Deleted!');
	});

	request.fail(function(jqXHR, textStatus)
	{
		alert( "Request failed: " + textStatus );
	});

}


function ajaxNew()
{	

	// We get the 'first' and 'last' values for our bew record and call the insert.php
	// server procedure.

	var new_first = prompt('Please Enter First:','');

	var new_last = prompt('Please Enter Last:','');

	var server = get('text8','value');

	var request = $.ajax( { url: "http://" + server + "/php/insert.php" , data: { first: new_first , last: new_last } } );

	request.done(function()
	{
		alert('New Row Added!');
		ajaxRead();
	});

	request.fail(function(jqXHR, textStatus)
	{
		alert( "Request failed: " + textStatus );
	});

}

function ajaxEdit()
{	

	// We want only one row selected for editing.

	if ( get('table2','selectedRowCount') == 0 )
	{
		alert('No Row Selected!');
		return;
	}

	if ( get('table2','selectedRowCount') > 1 )
	{
		alert('You must select only one row!');
		return;
	}

	// Getting current values from table.

	var selectedRows = get('table2','selectedRows');

	var selRowNumber = selectedRows[0];

	var edit_id = get('table2','cell',selRowNumber,1) ;

	// Prompting users for new values.

	var edit_first = prompt('Please Enter First:',get('table2','cell',selRowNumber,2));

	var edit_last = prompt('Please Enter Last:',get('table2','cell',selRowNumber,3));

	// Calling the update.php server procedure with the required parameters.

	var server = get('text8','value');

	var request = $.ajax( { url: "http://" + server + "/php/update.php" , data: { id: edit_id  , first: edit_first , last: edit_last } } );

	// Finally, we define the callbacks.

	request.done(function()
	{
		alert('Row Edit Complete!');
		ajaxRead();
	});

	request.fail(function(jqXHR, textStatus)
	{
		alert( "Request failed: " + textStatus );
	});

}



