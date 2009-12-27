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

MooDialog.Iframe = new Class({	
	
	Extends: MooDialog,	
  
	initialize: function(url,options){
		this.parent(options);
		
		this.setContent(
			new Element('iframe',{
				src: url,
				frameborder: 0,
				width: this.options.size.width,
				height: this.options.size.height
			})
		).open();
    }
});

