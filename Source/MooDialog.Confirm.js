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
  - [MooDialog.Confirm,Element.confirmLinkClick,Element.confirmFormSubmit]
...
*/

MooDialog.Confirm = new Class({

	Extends: MooDialog,

	options: {
		okText: 'Ok',
		cancelText: 'Cancel',
		focus: true
	},

	initialize: function(msg, fn, fn1, options){
		this.parent(options);

		fn = fn ? fn : function(){};
		fn1 = fn1 ? fn1 : function(){};

		var cancelButton = new Element('input', {
			type: 'button',
			events: {
				click: function(){
					fn1();
					this.close();
				}.bind(this)
			},
			value: this.options.cancelText
		});

		this.setContent(
			new Element('div')
				.adopt(
					new Element('p', {
						'class': 'MooDialogConfirm',
						text: msg
					})
				).adopt(
					new Element('div', {
						'class': 'buttons'
					}).adopt(cancelButton).adopt(
						new Element('input', {
							type: 'button',
							events: {
								click: function(){
									fn();
									this.close();
								}.bind(this)
							},
							value: this.options.okText
						})
					)
				)
		).open();

		if(this.options.focus){
			this.addEvent('show', function(){
				cancelButton.focus();
			});
		}
	}
});


Element.implement({
	confirmLinkClick: function(msg, options){
		this.addEvent('click', function(e){
			e.stop();
			new MooDialog.Confirm(msg, function(){
				location.href = this.get('href');
			}.bind(this), null, options)
		});
		return this;
	},
	confirmFormSubmit: function(msg, options){
		this.addEvent('submit', function(e){
			e.stop();
			new MooDialog.Confirm(msg, function(){
				this.submit();
			}.bind(this), null, options)
		}.bind(this));
		return this;
	}
});
