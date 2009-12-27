/*
---
description:     MooDialog

authors:
  - Arian Stolwijk

license:
  - MIT-style license

requires:
  core/1.2.4:   '*'
  MooDialog:    '*'

provides:
  - [MooDialog.Iframe]
...
*/

MooDialog.Request = new Class({	
	
	Extends: MooDialog,	
  
	initialize: function(url,reqOptions,options){
		this.parent(options);
		
		this.setContent(
			new Element('div').load(url,reqOptions)
		).open();
    }
});

