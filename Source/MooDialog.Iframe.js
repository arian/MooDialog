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

	initialize: function(url, options){
		this.parent(options);
		options = this.options;
		var optionsSize = options.size;

		this.setContent(
			new Element('iframe', {
				src: url,
				frameborder: 0,
				scrolling: options.useScrollBar ? 'auto' : 'no',
				width: optionsSize.width,
				height: optionsSize.height
			})
		).open();
    }
});
