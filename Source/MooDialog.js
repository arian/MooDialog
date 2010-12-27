/*
---
name: MooDialog
description: The base class of MooDialog
authors: Arian Stolwijk
license:  MIT-style license
requires: [Core/Class, Core/Element, Core/Element.Styles, Core/Element.Event]
provides: [MooDialog, Element.MooDialog]
...
*/


var MooDialog = new Class({

	Implements: [Options, Events],

	options: {
		'class':       'MooDialog',
		title:         null,
		scroll:        true, // IE
		forceScroll:   false,
		useEscKey:     true,
		destroyOnHide: true,
		autoOpen:      true,
		closeButton:   true,
    // Autosize options
    autosize:      true,
		offset:        { x: 0, y: 0 },
    scale:         'max', // min, max or a float between 0 and 1
    // Events
		onInitialize: function(){
			this.wrapper.setStyle('display', 'none');
		},
		onBeforeOpen: function(){
			this.wrapper.setStyle('display', 'block');
			this.fireEvent('show');
		},
		onBeforeClose: function(){
			this.wrapper.setStyle('display', 'none');
			this.fireEvent('hide');
		}/*,
		onOpen: function(){},
		onClose: function(){},
		onShow: function(){},
		onHide: function(){},
		onInitialize: function(wrapper){},
		onContentChange: function(content){}*/
	},

	initialize: function(options){
		this.setOptions(options);
		this.options.inject = this.options.inject || document.body;
		options = this.options;
    
    if(this.options.autosize)
    {
      this.size = {};
      // Autosize stuff
      if(this.options.scale == 'max' || this.options.scale > 0.85)
      {
        this.size.x = window.getSize().x * 0.85;
        this.size.y = window.getSize().y * 0.85;
      }
      else if(0 < this.options.scale  && this.options.scale <= 0.85)
      {
        this.size.x = window.getSize().x * this.options.scale;
        this.size.y = window.getSize().y * this.options.scale;
      }
      else if(this.options.scale == 'min' || this.options.scale == 0)
      {
        this.size.x = 'auto';
        this.size.y = 'auto';
      }
    }

		this.wrapper = new Element(
      'div.' + options['class'].replace(' ', '.')
    );
		this.content = new Element('div.content').inject(this.wrapper);

    if(this.options.autosize)
    {
      this.content.setStyles({
        'width': this.size.x, 'height': this.size.y,
        'overflow': 'auto'
      });
      this.wrapper.setStyles({
        'position': 'absolute', 'overflow': 'visible',
        'top': 0, 'left': 0, 'margin': 0,
        'width': this.size.x, 'height': this.size.y
      });
    }

		if (options.title){
			this.title = new Element('div.title').set('text', options.title).inject(this.wrapper);
			this.wrapper.addClass('MooDialogTitle');
		}

		if (options.closeButton){
			this.closeButton = new Element('a.close', {
				events: {click: this.close.bind(this)}
			}).inject(this.wrapper);
		}

    this.wrapper.inject(options.inject);

		/*<ie6>*/// IE 6 scroll
		if ((options.scroll && Browser.ie6) || options.forceScroll){
			this.wrapper.setStyle('position', 'absolute');
			var position = this.wrapper.getPosition(options.inject);
			window.addEvent('scroll', function(){
				var scroll = document.getScroll();
				this.wrapper.setPosition({
					x: position.x + scroll.x,
					y: position.y + scroll.y
				});
			});
		}
		/*</ie6>*/

		if (options.useEscKey){
			// Add event for the esc key
			document.addEvent('keydown', function(e){
				if (e.key == 'esc') this.close();
			}.bind(this));
		}

		this.addEvent('hide', function(){
			if (options.destroyOnHide) this.destroy();
		}.bind(this));

		this.fireEvent('initialize', this.wrapper);
	},

	setContent: function(){
		var content = Array.from(arguments);
		if (content.length == 1) content = content[0];

		this.content.empty();

		var type = typeOf(content);
		if (['string', 'number'].contains(type)) this.content.set('text', content);
		else this.content.adopt(content);

    if (this.options.autosize) this.computePosition();

		this.fireEvent('contentChange', this.content);

		return this;
	},

	open: function(){
		this.fireEvent('beforeOpen', this.wrapper).fireEvent('open');
		this.opened = true;
		return this;
	},

	close: function(){
		this.fireEvent('beforeClose', this.wrapper).fireEvent('close');
		this.opened = false;
		return this;
	},

	destroy: function(){
		this.wrapper.destroy();
	},

	toElement: function(){
		return this.wrapper;
	},

  computePosition: function()
	{
	  var docSize = document.id(document.body).getSize();
	  //console.log(this.wrapper.getStyle('width'));
		if(this.options.scale == 'min')
		{
		  this.setPosition(
		    (docSize.x - this.wrapper.getSize().x)/2,
		    (docSize.y - this.wrapper.getSize().y)/2,
		    true
		  );
		}
		else
		{
		  this.setPosition(
		    (docSize.x - this.size.x)/2,
		    (docSize.y - this.size.y)/2,
		    true
		  );
		}
		//console.log(this.options.size);
	},
	
	setPosition: function(x,y,relative){
		x = x + this.options.offset.x;
		y = y + this.options.offset.y;
		x = x < 20 ? 20 : x;
		y = y < 20 ? 20 : y;
		if(relative){
			var scroll = document.id(document.body).getScroll();
			x = x + scroll.x;
			y = y + scroll.y;
		}
		this.wrapper.setStyles({
      left: x, top: y
		});
		return this;
	},

});


Element.implement({

	MooDialog: function(options){
		this.store('MooDialog',
			new MooDialog(options).setContent(this).open()
		);
		return this;
	}

});
