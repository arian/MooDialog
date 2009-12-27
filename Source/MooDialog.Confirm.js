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
  - [MooDialog.Confirm,Element.confirmLinkClick]
...
*/

MooDialog.Confirm = new Class({	
	
	Extends: MooDialog,	
  
	initialize: function(msg,fn,fn1,options){
		this.parent(options);
		
		fn = fn ? fn : $empty;
		fn1 = fn1 ? fn1 : $empty;
		
		this.setContent(
			new Element('div')
				.adopt(
					new Element('p',{
						'class': 'MooDialogConfirm',
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
									fn1();
									this.close();
								}.bind(this)
							},
							value: 'Cancel'
						})
					).adopt(
						new Element('input',{
							type: 'button',
							events: {
								click: function(){
									fn();
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


Element.implement({
	confirmLinkClick: function(msg,options){
		this.addEvent('click',function(e){
			e.stop();
			new MooDialog.Confirm(msg,function(){
				location.href = this.get('href');
			}.bind(this),null,options)
		});
	}
	
});


