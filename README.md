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


### Alert

	#JS
	new MooDialog.alert('This is an alert message');
	
	// Or from a string
	('This is an alert message').alert();

### Confirm

	#JS
	new MooDialog.confirm('Are you sure you want to do this?',function(){
		new MooDialog.alert('You are!')
	},function(){
		new MooDialog.alert('You are not');
	});
	
	// Or from a string
	('Are you sure you want to do this?').confirm(fn1,fn2);

### Prompt 

	#JS
	new MooDialog.promt('What is your name?',function(ret){
		new MooDialog.alert('Your name is '+ ret);
	});
	
	// Or from a string
	('What is your name?').prompt(fn);

### Error

	#JS
	new MooDialog.error('O No, What have you done!?');

### Custom from an element

	#JS
	new Element('div',{text: 'This is a custom element'}).MooDialog();
	
	// Or an existing element from the DOM
	$('el').MooDialog();

### Confirm Link

	#JS
	$('confirmDelete').confirmLinkClick('Are you sure you want to click this link');


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
		onOpen: $empty,
		onClose: $empty
	}	


Class: MooDialog
----------------

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

### open
With this method you open the dialog

### close
With this method you close the dialog

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

