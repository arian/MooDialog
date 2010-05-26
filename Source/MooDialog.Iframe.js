/*
---
description:     MooDialog

authors:
  - Arian Stolwijk

license:
  - MIT-style license

requires:
  core/1.2.4:   '*'

provides:
  - [MooDialog.Iframe]
...
*/

MooDialog.Iframe = new Class({	
	
	Extends: MooDialog,	

	//fix
	options: {
		useScrollBarIFrame: true
	},
	
	initialize: function(url,options){
		this.parent(options);
		
		//fix
		//http://www.htmlcodetutorial.com/frames/_IFRAME_SCROLLING.html
		var scrollingIFrame = "auto";
		if (!this.options.useScrollBarIFrame) {
			scrollingIFrame = "no"; 
		}


		this.setContent(
			new Element('iframe',{
				src: url,
				frameborder: 0,
				scrolling : scrollingIFrame, //fix
				width: this.options.size.width,
				height: this.options.size.height
			})
		).open();
    }
});

