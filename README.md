
JMG (Javascript Mini GUI) 
-------------------------

JMG is a JavaScript library. 

The main goal of the project is to allow developers, the creation of responsive web applications using the same code 
for desktop and mobile devices.

Another goal is to simplify things, using only Javascript for coding, without the need of deal with HTML and CSS too. 
JMG apps can be contained in only one (Javascript) '.js' file.

Responsiveness (the capability to adapt to any screen sizes and orientations) are achieved using two approaches:

- The application can display itself using full page width on small screens and to display as dialogs on large ones.

- The user can arrange widgets in grids filled with blocks containing the widgets. When there is enough space,
  the blocks are shown side by side. Otherwise they are shown stacked. You can test this, simply using the zoom
  of your desktop browser or using the device mode emulation of the Javascript console on desktop version of 
  Google Chrome.


Files description:

	index.html			Main HTML page (app loader)

	app/main.js			Main JMG demo (the only one so far)

	lib/jmg.js			The JMG library

	lib/jquery.mobile-1.4.5.min.js	jQuery Mobile library (the heart of JMG)

	lib/jquery-1.12.1.min.js	jQuery library (the heart of jQuery Mobile)

	css/jquery.mobile-1.4.5.min.css	jQuery Mobile CSS
	
	php/select.php			server procedure (get a recordset from a table)

	php/insert.php			server procedure (add rows)

	php/delete.php			server procedure (delete rows)

	php/update.php			server procedure (update edited rows)

	data/people.sql			import this file on 'test' database for AJAX demo


Getting Started:
----------------

Simply double click 'index.html' file. Main demo will be open in your default browser.

For testing AJAX demo, you must install an AMP server (I'm using XAMPP) copy all JMG files to web root folder 
(htdocs in the case of XAMPP) and import data/people.sql in the database 'test'. Finally, your app, will be 
ready for testing (including AJAX) at 127.0.0.1.

Of course, you can put your app online in any standard web hosting or use any of the available tools for creating an
Android, IOS, Linux or Windows application with it.

You could use (ie) Apache Cordova for that:

http://cordova.apache.org/#supported_platforms_section

Making, this way JMG multi-platform.

You could use PhoneGap too (it even allows you to build your app with a cloud service): 

https://build.phonegap.com/


Compatibility:
-------------

jQuery Mobile, the wonderful library behind JMG is compatible with a lot of mobile and desktop web browsers, 
making your app, able to run almost anywhere.


Roberto Lopez (http://jmgweb.github.io/main)







