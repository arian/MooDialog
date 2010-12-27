/*
---
name: MooDialog.IFrame
description: Opens an IFrame in a MooDialog
authors: Arian Stolwijk
license:  MIT-style license
requires: MooDialog
provides: MooDialog.IFrame
...
*/


MooDialog.IFrame = new Class({

	Extends: MooDialog,

	options: {
		useScrollBar: true
	},

	initialize: function(url, options){
		this.parent(options);
    
    this.iframe = new IFrame({
      src: url,
      frameborder: 0,
      scrolling: this.options.useScrollBar ? 'auto' : 'no'
    });
    if (this.options.autosize){
      this.iframe.setStyles({
        'width': this.size.x, 'height': this.size.y
      });
    }
		this.setContent(this.iframe);
		if (this.options.autoOpen) this.open();
  }
});
