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
  - [MooDialog,Element.MooDialog]
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
		duration: 400,
		scroll: true,
		useEscKey: true,
		disposeOnClose: true/*,
		onOpen: $empty,
		onClose: $empty,
		onShow: $empty,
		onHide: $empty*/
	},

	initialize: function(options){
		this.setOptions(options);

		var x = this.options.size.width,
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
				'z-index': 6000,	
				opacity: 0
			},
			tween: {
				duration: this.options.duration
			}
		}).inject(document.body)
			.adopt(this.content)
			.adopt(this.closeButton);
		
		// Set the position of the dialog
		var docSize = document.id(document.body).getSize();
		this.setPosition((docSize.x - x)/2,(docSize.y - y)/2,true);
		
		if(this.options.scroll){
			window.addEvent('scroll',function(e){
				this.setPosition((docSize.x - x)/2,(docSize.y - y)/2,true);
			}.bind(this));
		}
		
		// Add the fade in/out effects
		this.wrapper.set('tween',{
			duration: this.options.duration,
			onComplete: function(){
				this.fireEvent(this.wrapper.get('opacity') == 0 ? 'hide' : 'show');
				if (this.options.disposeOnClose && this.wrapper.get('opacity') == 0) {
					this.dispose();
				}
			}.bind(this)
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
	
	setPosition: function(x,y,relative){
		x = x + this.options.offset.x;
		y = y + this.options.offset.y;
		x = x < 10 ? 10 : x;
		y = y < 10 ? 10 : y;
		if(relative){
			var scroll = document.id(document.body).getScroll();
			x = x + scroll.x;
			y = y + scroll.y
		}
		this.wrapper.setStyles({
			left: x,
			top: y
		});
		return this;
	},

	open: function(){
		this.fireEvent('open');
		this.wrapper.fade('in');
		this.overlay.open();
		
		if(this.options.useEscKey){
			// Add event for the esc key
			document.id(document.body).addEvent('keydown', function(e){
				if (e.key == 'esc') this.close();
			}.bind(this));
		}
		return this;
	},
	
	close: function(){
		this.fireEvent('close');
		this.wrapper.fade('out');
		this.overlay.close();
		return this;
	},
	
	dispose: function(){
		this.wrapper.dispose();
		this.overlay.overlay.dispose();
	},
	
	toElement: function(){
		return this.wrapper;
	}
	
});



Element.implement({
	MooDialog: function(options){
		var box = new MooDialog(options)
			.setContent(this)
			.open();
		this.store('MooDialog',box);
		return this;
	}
});


