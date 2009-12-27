MooDialog
===============

MooDialog is a MooTools plugin to replace the native alert(), confirm() and promt() javascript functions by more stylish ones.

![Screenshot](http://github.com/arian/MooDialog/raw/master/screenshot.png)

How to use
----------

First you have to include the javascript files and css file in the head of your html document

	#HTML
	<link  href="../Source/css/MooDialog.css" rel="stylesheet" type="text/css" media="screen" />
	<script src="../Source/Overlay.js" type="text/javascript"></script>
	<script src="../Source/MooDialog.js" type="text/javascript"></script>

And whether functionality you want you use, you have to include, for example, the following files

	#HTML
	<script src="../Source/MooDialog.Alert.js" type="text/javascript"></script>
	<script src="../Source/MooDialog.Request.js" type="text/javascript"></script>
	

### Class: MooDialog.Alert

Create a alert dialog, a replacement for alert()

	#HTML
	<script src="../Source/MooDialog.Alert.js" type="text/javascript"></script>

Javascript

	#JS
	new MooDialog.Alert(message[,options]);
	
	// example
	new MooDialog.Alert('Hi there!');

### Class: MooDialog.Confirm

Create a confirm dialog, a replacement for confirm()

	#HTML
	<script src="../Source/MooDialog.Confirm.js" type="text/javascript"></script>

Javascript

	#JS
	new MooDialog.Confirm(message[,fn1,fn2,options]);
	
	// Examaple
	new MooDialog.Confirm('Are you sure you want to do this?',function(){
		new MooDialog.Alert('You are!')
	},function(){
		new MooDialog.Alert('You are not');
	});

#### Element.confirmLinkClick

Create a confirm dialog if the user really want to follow this link

	#JS
	$('confirmDelete').confirmLinkClick('Are you sure you want to click this link');


### Class: MooDialog.Prompt 

Create an prompt dialog, replacement for prompt()

	#HTML
	<script src="../Source/MooDialog.Prompt.js" type="text/javascript"></script>

Javascript

	#JS
	new MooDialog.Prompt(message[,fn,options]);
	
	// Example
	new MooDialog.Prompt('What is your name?',function(ret){
		new MooDialog.Alert('Your name is '+ ret);
	});

### Class: MooDialog.Error

Create an error message

	#HTML
	<script src="../Source/MooDialog.Error.js" type="text/javascript"></script>

Javascript

	#JS
	new MooDialog.Error(message);
	
	// Example
	new MooDialog.Error('O No, What have you done!?');


### Element.MooDialog

Create a dialog from an element

	#JS
	new Element('div',{text: 'This is a custom element'}).MooDialog();
	
	// Or an existing element from the DOM
	$('el').MooDialog();

### Class: MooDialog.Iframe

Create a dialog with an IFrame

	#JS
	new MooDialog.Iframe(url[,options]);
	
	// Example
	new MooDialog.Iframe('http://www.mootools.net');
	
### Class: MooDialog.Request

Get the dialog content by a Ajax Request

	#HTML
	<script src="../Source/MooDialog.Request.js" type="text/javascript"></script>

Javascript

	#JS
	new MooDialog.Request(url[,RequestOptions,options]);
	
	// Example
	new MooDialog.Request('exampleText.html');

### Class: MooDialog.Iframe

Get an IFrame within the dialog

	#HTML
	<script src="../Source/MooDialog.Iframe.js" type="text/javascript"></script>

Javascript

	#JS
	new MooDialog.Iframe(url[,options]);
	
	// Example
	new MooDialog.Iframe('http://www.mootools.net');



Options
-------

In every last parameter you can set the following options.

	#JS
	{
		size: {
			width: 300,
			height: 100
		},
		offset: {
			x: 0,
			y: -100
		},
		duration: 400,
		scroll: true,
		useEscKey: true,
		disposeOnClose: true/*,
		onOpen: $empty,
		onClose: $empty,
		onShow: $empty,
		onHide: $empty*/
	}

1. size: (*object*) The size of the dialog
2. offset: (*object*) Offset of the box
3. duration: (*number*) Duration of the fade effect
4. scroll: (*boolean*) Use the window.onscroll event to keep the dialog on your screen
5. useEscKey: (*boolean*) Use the esc key to close the dialog
6. disposeOnClose: (*boolean*) Fire the MooDialog.dispose() method after closing the dialog to dispose the dialog from the DOM

### Events
1. open: When the dialog gets opend
2. show: When the dialog is totally opened
3. close: When the dialog gets closed
4. hide: When the dialog is totally hidden

Class: MooDialog
----------------

#### Syntax

	#JS
	var dialog = new MooDialog([options]);

#### Arguments

1. options: (*object*) See the options section.

Methods
-------

### setContent

With this method you can set the content of the dialog.

#### Syntax

	#JS
	dialog.setContent(content);

#### Arguments

1. content: (*string*,*element*,*number*) Put some content into the dialog

#### Return 
 - MooDialog instance

### setPosition

Set the position of the dialog

#### Syntax
	
	#JS
	dialog.setPosition(x,y[,relative]);

#### Arguments

1. x: (*number*) The number of pixels from the left of the screen (exlusive the offset, see options)
2. y: (*number*) The number of pixels from the top of the screen (exlusive the offset, see options)
3. relative: (*boolean*, default: true) Are the x and y arguments relative to the scroll position (should the method use Element.getScroll())

### open

With this method you open the dialog

	#JS
	dialog.open();


### close

With this method you close the dialog

	#JS
	dialog.close();

### dispose

Removes the dialog from the DOM

	#JS
	dialog.dispose();


### toElement
This method returns the dialog wrapper element

#### Syntax
	
	#JS
	var myDialog = new MooDialog();
	$(myDialog);



Requirements
------------

* [MooTools Core 1.2.4](http://mootools.net/core)
* [Overlay](http://mootools.net/forge/p/overlay)

