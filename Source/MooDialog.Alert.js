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
  - [MooDialog.Alert]
...
*/

MooDialog.Alert = new Class({	
	
	Extends: MooDialog,	
  
	initialize: function(msg,options){
		this.parent(options);
		
		this.setContent(
			new Element('div').adopt(
					new Element('p',{
						'class': 'MooDialogAlert',
						text: msg
					})
				).adopt(
					new Element('div',{
						'class': 'buttons'
					}).adopt(
						new Element('input',{
							type: 'button',
							events: {
								click: function(){
									this.close();
								}.bind(this)
							},
							value: 'Ok'
						})
					)
				)
		).open();	

	}
});

