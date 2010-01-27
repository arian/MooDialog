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
		title: null,
		scroll: true,
		useEscKey: true,
		disposeOnClose: true,
		closeButton: true,
		fx: {
			type: 'tween',
			open: 1,
			close: 0,
			options: {
				property: 'opacity',
				duration: 400
			}
		}/*,
		onOpen: $empty,
		onClose: $empty,
		onShow: $empty,
		onHide: $empty*/
	},

	initialize: function(options){
		this.setOptions(options);

		var x = this.options.size.width,
			y = this.options.size.height;
						
		this.wrapper = new Element('div', {
			'class': 'MooDialog',
			styles: {
				width: x,
				height: y,
				position: this.options.scroll ? 'fixed' : 'absolute',
				'z-index': 6000,	
				opacity: 0
			}
		}).inject(document.body);

		this.content = new Element('div', {
			styles: {
				width: x,
				height: y,
				overflow: 'auto'
			}
		}).inject(this.wrapper);

		if(this.options.title){
			this.title = new Element('div',{
				'class': 'title',
				'text': this.options.title
			}).inject(this.wrapper);
			this.wrapper.addClass('MooDialogTitle');
		}
		
		if(this.options.closeButton){
			this.closeButton = new Element('a',{
				'class': 'close',
				events: {
					click: function(){
						this.close();
					}.bind(this)
				}
			}).inject(this.wrapper);
		}

		
		// Set the position of the dialog
		var docSize = document.id(document.body).getSize();
		this.setPosition((docSize.x - x)/2,(docSize.y - y)/2);
		
/*		// IE 6 scroll
		if(this.options.scroll && Browser.Engine.trident && Browser.Engine.version <= 4){
			window.addEvent('scroll',function(e){
				this.setPosition((docSize.x - x)/2,(docSize.y - y)/2,true);
			}.bind(this));
		}
*/
		// Add the fade in/out effects if no other effect is defined
		if(!this.fx){
			this.fx = this.options.fx.type == 'morph' ? 
				new Fx.Morph(this.wrapper,this.options.fx.options) : 
				new Fx.Tween(this.wrapper,this.options.fx.options);
		}
		this.fx.addEvent('complete',function(){
			this.fireEvent(this.open ? 'show' : 'hide');
			if (this.options.disposeOnClose && !this.open) {
				this.dispose();
			}			
		}.bind(this));
		
		this.overlay = new Overlay(document.body, {
			onClick: function(){
				this.close();
			}.bind(this),
			duration: this.options.fx.options.duration
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
		if(this.wrapper.getStyle(relative || 'position') != 'fixed'){
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
		this.open = true;
		this.fireEvent('open');
		this.fx.start(this.options.fx.open);
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
		this.open = false;
		this.fireEvent('close');
		this.fx.start(this.options.fx.close);
		this.overlay.close();
		return this;
	},
	
	dispose: function(){
		this.wrapper.destroy();
		this.overlay.overlay.destroy();
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


