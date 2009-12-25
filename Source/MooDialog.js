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
  - [MooDialog,MooDialog.alert,MooDialog.confirm,MooDialog.prompt,MooDialog.error,Element.MooDialog,String.alert,String.confirm,String.prompt]
...
*/
var MooDialog = new Class({
	
	Implements: [Options,Events],

	options: {
		size: {
			width: 300,
			height: 100
		},
		offset: {
			x: 0,
			y: -100
		},
		duration: 400/*,
		onOpen: $empty,
		onClose: $empty*/
	},

	initialize: function(options){
		this.setOptions(options);
		
		var docSize = $(document.body).getSize(),
			x = this.options.size.width,
			y = this.options.size.height;
		
		this.content = new Element('div', {
			styles: {
				width: x,
				height: y,
				overflow: 'auto'
			}
		});
		
		this.closeButton = new Element('a',{
			'class': 'close',
			styles: {
				position: 'absolute',
				top: -16,
				left: -16,
			},
			events: {
				click: function(){
					this.close();
				}.bind(this)
			}
		});
		
		this.wrapper = new Element('div', {
			'class': 'MooDialog',
			styles: {
				width: x,
				height: y,
				position: 'absolute',
				left: ((docSize.x - x) / 2) + this.options.offset.x,
				top: ((docSize.y - y) / 2) + this.options.offset.y,
				'z-index': 6000,	
				opacity: 0
			},
			tween: {
				duration: this.options.duration
			}
		}).inject(document.body)
			.adopt(this.content)
			.adopt(this.closeButton);
			
		this.wrapper.set('tween',{
			duration: this.options.duration
		});
		
		this.overlay = new Overlay(document.body, {
			onClick: function(){
				this.close();
			}.bind(this),
			duration: this.options.duration
		});
	},

	setContent: function(content){
		this.content.empty();
		switch($type(content)){
			case 'element':
				this.content.adopt(content);
			break;
			case 'string':
			case 'number':
				this.content.set('text',content);
			break;
		}
		return this;
	},

	open: function(){
		this.fireEvent('open');
		this.wrapper.fade('in');
		this.overlay.open();
	},
	
	close: function(){
		this.fireEvent('close');
		this.wrapper.fade('out');
		this.overlay.close();
	},
	
	toElement: function(){
		return this.wrapper;
	}
	
});

MooDialog.alert = new Class({	
	
	Extends: MooDialog,	
  
	initialize: function(msg,options){
		this.parent(options);
		
		this.setContent(
			new Element('div')
				.adopt(
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
		);
		this.open();
    }
});

MooDialog.confirm = new Class({	
	
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
		);
		this.open();
	}
});

MooDialog.promt = new Class({	
	
	Extends: MooDialog,	
  
	initialize: function(msg,fn,options){
		this.parent(options);

		fn = fn ? fn : $empty;

		var textInput = new Element('input',{
			type: 'text',
			size: 30
		});

		this.setContent(
			new Element('div')
				.adopt(
					new Element('p',{
						'class': 'MooDialogPromt',
						text: msg
					})
				).adopt(
					new Element('form',{
						'class': 'buttons',
						events: {
							submit: function(e){
								e.stop();
								fn(textInput.get('value'));
								this.close();
							}.bind(this)
						}
					}).adopt(textInput).adopt(
						new Element('input',{
							type: 'submit',
							value: 'Ok'
						})						
					)
				)
		);
		this.open();
	}
});

MooDialog.error = new Class({	
	
	Extends: MooDialog,	
  
	initialize: function(msg,options){
		this.parent(options);
		
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
		);
		this.open();
    }
});

String.implement({
	alert: function(options){
		new MooDialog.alert(this,options);
	},
	confirm: function(fn,fn1,options){
		new MooDialog.confirm(this,fn,fn1,options);
	},
	promt: function(fn,options){
		new MooDialog.promt(this,fn,options);
	}
});

Element.implement({
	MooDialog: function(options){
		var box = new MooDialog(options);
		box.setContent(this);
		box.open();
		this.store('MooDialog',box);
		return this;
	},
	
	confirmLinkClick: function(msg,options){
		this.addEvent('click',function(e){
			e.stop();
			msg.confirm(function(){
				location.href = this.get('href');
			}.bind(this),null,options)
		});
	}
	
});


