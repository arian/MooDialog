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
		closeOnOverlayClick: false,
		useScrollBar: true,
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
		this.ie6 = Browser.Engine.trident && Browser.Engine.version <= 4;
		
		var options = this.options, 
			optionsSize = options.size,
			x = optionsSize.width,
			y = optionsSize.height,
			
		wrapper = this.wrapper = new Element('div', {
			'class': 'MooDialog',
			styles: {
				width: x,
				height: y,
				position: options.scroll && !this.ie6 ? 'fixed' : 'absolute',
				'z-index': 6000,	
				opacity: 0
			}
		}).inject(document.body);

		this.content = new Element('div', {
			styles: {
				width: x,
				height: y,
				overflow: options.useScrollBar ? 'auto' : 'hidden'
			}
		}).inject(wrapper);

		if(options.title){
			this.title = new Element('div',{
				'class': 'title',
				'text': options.title
			}).inject(wrapper);
			wrapper.addClass('MooDialogTitle');
		}
		
		if(options.closeButton){
			this.closeButton = new Element('a',{
				'class': 'close',
				events: {
					click: this.close.bind(this)
				}
			}).inject(wrapper);
		}

		
		// Set the position of the dialog
		var docSize = document.id(document.body).getSize();
		this.setPosition((docSize.x - x)/2,(docSize.y - y)/2);
		
		// IE 6 scroll
		if(options.scroll && this.ie6){
			window.addEvent('scroll',function(e){
				this.setPosition((docSize.x - x)/2,(docSize.y - y)/2);
			}.bind(this));
		}

		// Add the fade in/out effects if no other effect is defined
		if(!this.fx){
			this.fx = options.fx.type == 'morph' ? 
				new Fx.Morph(wrapper,options.fx.options) : 
				new Fx.Tween(wrapper,options.fx.options);
		}
		this.fx.addEvent('complete',function(){
			this.fireEvent(this.open ? 'show' : 'hide');
			if (options.disposeOnClose && !this.open) {
				this.dispose();
			}			
		}.bind(this));
		
		this.overlay = new Overlay(document.body, {
			duration: this.options.fx.options.duration
		});
		if (!this.options.closeOnOverlayClick) {
			this.overlay.addEvent('click', this.close.bind(this));
		}
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
	
	setPosition: function(x,y){
		var options = this.options, wrapper = this.wrapper;
		x += options.offset.x;
		y += options.offset.y;
		x = x < 10 ? 10 : x;
		y = y < 10 ? 10 : y;
		if(wrapper.getStyle('position') != 'fixed'){
			var scroll = document.id(document.body).getScroll();
			x += scroll.x;
			y += scroll.y
		}
		wrapper.setStyles({
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


