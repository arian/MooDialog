MooDialog
===============

MooDialog is a MooTools plugin to replace the native alert(), confirm() and promt() javascript functions by more stylish ones.
You can use it also for other DOM elements, create an IFrame dialog or even create an Ajax Dialog

As of version 0.7 MooDialog uses MooTools 1.3 and is not compatible with MooTools 1.2.

![Screenshot](https://github.com/arian/MooDialog/raw/master/screenshot.png)

How to use
----------

First you have to include the javascript files and css file in the head of your html document.

	#HTML
	<link  href="../Source/css/MooDialog.css" rel="stylesheet" type="text/css" media="screen" />
	<script src="../Source/MooDialog.js" type="text/javascript"></script>

And depending on the functionality you want you use, you have to include, for example, the following files

	#HTML
	<script src="../Source/MooDialog.Alert.js" type="text/javascript"></script>
	<script src="../Source/MooDialog.Request.js" type="text/javascript"></script>

If you want to use the standard fancy fade-in and fade-out effects, you should include Overlay.js and MooDialog.Fx.js in your page:

	#HTML
	<script src="../Source/Overlay.js" type="text/javascript"></script>
	<script src="../Source/MooDialog.Fx" type="text/javascript"></script>

### Packager

MooDialog is packager ready. This means you can build MooDialog to a single file with

Build via [Packager](http://github.com/kamicane/packager) (ty cpojer)

	./packager register /path/to/MooDialog
	./packager build MooDialog/* > MooDialog.js

To build this plugin without external dependencies use

	./packager build MooDialog/* +use-only MooDialog > MooDialog.js

### CSS

MooDialog does not style any element with JavaScript, but only uses CSS.
The `Element.setStyle` method is only used to show and hide the dialog.

You can use the `class` option to use your own styles, or change the MooDialog.css file.

Class: MooDialog
----------------

### Constructor

	#JS
	var dialog = new MooDialog([options]);

#### Arguments

1. options: (*object*) See the options section.

#### Options

In every last parameter you can set the following options.

- class: (*string*, defaults to `MooDialog`) A CSS classname which you can set to style the dialog
- title: (*string*, optional) The title of the Dialog. This will appear at the top of the dialog
- scroll: (*boolean*, defaults to `true`) This will use the `scroll` event to simulate the `position: fixed` css property in IE6
- forceScroll: (*boolean*, defaults to `false`) This will force other browsers to use the `scroll` window event.
- useEscKey: (*boolean*, defaults to `true`) Use the esc key to close the dialog
- destroyOnClose: (*boolean*, defaults to `true`) Fire the MooDialog.dispose() method after closing the dialog to dispose the dialog from the DOM
- autoOpen: (*boolean*, defaults to `false`) This will automatically open the dialog for the Alert, Confirm, Error, IFrame, Prompt and Request subclasses
- closeButton: (*boolean*, defaults to `true`) Should it diplay a close button


#### Events

- initialize: Fires when MooDialog has initialize. This event is usefull when you want to create your own effects for the dialog, in combination with the beforeOpen and beforeClose events.
- beforeOpen: Fires before the dialog opens. You can overwrite this default event to change the behavior how the dialog opens.
- open: When the dialog gets opend
- show: When the dialog is totally opened
- beforeClose: Fires before the dialog closes. You can overwrite this default event to change the behavior how the dialog closes.
- close: When the dialog gets closed
- hide: When the dialog is totally hidden
- contentChange: Fires when the content has changed. Especially useful with the MooDialog.Request class.


### MooDialog method: setContent

With this method you can set the content of the dialog.

#### Syntax

	#JS
	dialog.setContent(arg1[, arg2, arg3, ...]);

#### Arguments

1. content: (*string*, *number*, *element*, *elements*, *array*) If a string or number is passed as first argument, it will set the text of the dialog. If (multiple) elements are passed, it will adopt them into the dialog

#### Return

 - MooDialog instance

### MooDialog method: open

With this method you open the dialog. It will fire the `beforeOpen` and `open` events.
It will fire the `show` event if the dialog is actually opened.

	#JS
	dialog.open();


### MooDialog method: close

With this method you close the dialog. It will fire the `beforeClos` and `close` events.
If the dialog is actually closed, it will fire the `hide` event.

	#JS
	dialog.close();

### MooDialog method: destroy

Removes the dialog from the DOM

	#JS
	dialog.destroy();


### MooDialog method: toElement

This method returns the dialog wrapper element

	#JS
	var myDialog = new MooDialog();
	$(myDialog);


### Element method: MooDialog

Create a dialog from an element

	#JS
	new Element('div',{text: 'This is a custom element'}).MooDialog([options]);

	// Or an existing element from the DOM
	$('el').MooDialog();


Class: MooDialog.Alert
----------------------

Create a alert dialog, a replacement for alert()

	#HTML
	<script src="../Source/MooDialog.Alert.js" type="text/javascript"></script>

Javascript

	#JS
	new MooDialog.Alert(message[, options]);

	// example
	new MooDialog.Alert('Hi there!');


### Options

1. okText: (*string*, defaults to `Ok`) The text for the OK button
2. focus: (*boolean*, defaults to `true`) If true, the OK button will focus when the dialog shows.
3. textPClass: (*string*, defaults to `MooDialogAlert`) The CSS Classname of the paragraph element containing the text


Class: MooDialog.Confirm
-------------------------

Create a confirm dialog, a replacement for confirm()

	#HTML
	<script src="../Source/MooDialog.Confirm.js" type="text/javascript"></script>

Javascript

	#JS
	new MooDialog.Confirm(message[, fn1, fn2, options]);

	// Examaple
	new MooDialog.Confirm('Are you sure you want to do this?', function(){
		new MooDialog.Alert('You are!')
	}, function(){
		new MooDialog.Alert('You are not');
	});

### Options

1. okText: (*string*, defaults to `Ok`) The text for the OK button
2. cancelText: (*string*, defaults to `Cancel`) The text of the Cancel button
3. focus: (*boolean*, defaults to `true`) If true, the Cancel button will focus when the dialog shows.
4. textPClass: (*string*, defaults to `MooDialogConfirm`) The CSS Classname of the paragraph element containing the text


### Element method: confirmLinkClick

Create a confirm dialog if the user really want to follow this link

	#JS
	$('confirmDelete').confirmLinkClick('Are you sure you want to click this link');


### Element method: confirmFormSubmit

Create a confirm dialog if the user try to submit a form

	#JS
	document.getElement('form#myForm').confirmFormSubmit('Do you want to submit this form');'


Class: MooDialog.Prompt
------------------------

Create an prompt dialog, replacement for prompt()

	#HTML
	<script src="../Source/MooDialog.Prompt.js" type="text/javascript"></script>

Javascript

	#JS
	new MooDialog.Prompt(message[, fn, options]);

	// Example
	new MooDialog.Prompt('What is your name?', function(ret){
		new MooDialog.Alert('Your name is ' + ret);
	});

### Options

1. okText: (*string*, defaults to `Ok`) The text for the OK button
2. focus: (*boolean*, defaults to `true`) If true, the input field will focus when the dialog shows.
3. textPClass: (*string*, defaults to `MooDialogPrompt`) The CSS Classname of the paragraph element containing the text
4. defaultValue: (*string*) The default value of the input field

Class: MooDialog.Error
----------------------

Create an error message

	#HTML
	<script src="../Source/MooDialog.Error.js" type="text/javascript"></script>

Javascript

	#JS
	new MooDialog.Error(message);

	// Example
	new MooDialog.Error('O No, What have you done!?');

### Options

1. okText: (*string*, defaults to `Ok`) The text for the OK button
2. focus: (*boolean*, defaults to `true`) If true, the OK button will focus when the dialog shows.
3. textPClass: (*string*, defaults to `MooDialogError`) The CSS Classname of the paragraph element containing the text



Class: MooDialog.IFrame
-----------------------

Create a dialog with an IFrame

	#JS
	new MooDialog.IFrame(url[, options]);

	// Example
	new MooDialog.IFrame('http://www.mootools.net');

### Options

1. useScrollBar: (*boolean*, defaults to `true`) If the `scrolling` attribute of the IFrame should be `auto` or `no`


Class: MooDialog.Request
------------------------

Get the dialog content by a Ajax Request

	#HTML
	<script src="../Source/MooDialog.Request.js" type="text/javascript"></script>

Javascript

	#JS
	new MooDialog.Request(url[, RequestOptions, options]);

	// Example
	new MooDialog.Request('exampleText.html');


### MooDialog.Request method: setRequestOptions

Because you cannot refer to the dialog instance if you put the requestopions as second argument, this is a separate method to set them.
This helps you to change the content of the dialog on for example the `onRequest` event of Request.

	#JS
	var dialog = new MooDialog.Request('exampleText.html');
	dialog.setRequestOptions({
		onRequest: function(){
			dialog.setContent('loading...');
		}
	});


Requirements
------------

* [MooTools Core 1.3](http://mootools.net/core)
* [Overlay](http://mootools.net/forge/p/overlay) (included by default)

