/*
---

name: MooDialog.Request

authors:
  - Arian Stolwijk

license:
  - MIT-style license

requires: [MooDialog, Core/Request.HTML]

provides: MooDialog.Request

...
*/

MooDialog.Request = new Class({

	Extends: MooDialog,

	initialize: function(url, reqOptions, options){
		this.parent(options);

		this.setContent(
			new Element('div').set('load', reqOptions).load(url)
		).open();
    }
});
