/*
---
description: Extends MooTools official Mask plugin to add fading functionality

license: MIT-style

authors:
- Amitay Horwitz
- Niccolò Olivieri

requires:
- more/1.3.1.1: [Mask]

provides:
- Mask.Fx

...
*/

Mask.Fx = new Class({

    Extends: Mask,

    options: {
        start: 0,
        end: 1,
        fx: {
            property: 'opacity',
            link: 'cancel'
        }
    },

	destroyOnHide: false,

    initialize: function(target, options){
		this.destroyOnHide = options.destroyOnHide;
        options.destroyOnHide = false;
        this.parent(target, options);
        this.element.set('tween', this.options.fx);
        this.element.get('tween').set(this.options.fx.property, this.options.start);
        this.element.setStyle('display', 'block');
    },

    showMask: function(){
        this.hidden = false;
        this.fireEvent('show');
        this.element.get('tween').start(this.options.end).chain(function() {
            this.fireEvent('showEnd');
        }.bind(this));
    },

    hideMask: function(){
        this.hidden = true;
        this.fireEvent('hide');
        this.element.get('tween').start(this.options.start).chain(function() {
            if(this.destroyOnHide)
                this.destroy();
            this.fireEvent('hideEnd');
        }.bind(this));
    }

});