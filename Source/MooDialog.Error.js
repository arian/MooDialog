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
  - [MooDialog.Error]
...
*/

MooDialog.Error = new Class({	
	
	Extends: MooDialog,	
  
	initialize: function(msg,options){
		this.parent(options);
		
		var okButton = new Element('input',{
			type: 'button',
			events: {
				click: function(){
					this.close();
				}.bind(this)
			},
			value: 'Ok'
		});		

		this.setContent(
			new Element('div')
				.adopt(
					new Element('p',{
						'class': 'MooDialogError',
						text: msg
					})
				).adopt(
					new Element('div',{
						'class': 'buttons'
					}).adopt(okButton)
				)
		).open();
		
		if(this.options.focus){
			this.addEvent('show',function(){
				okButton.focus();
			});
		}
	}
});


