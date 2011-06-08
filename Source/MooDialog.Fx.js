/*
---
name: MooDialog.Fx
description: Overwrite the default events so the Dialogs are using Fx on open and close
authors: Arian Stolwijk
license: MIT-style license
requires: [Cores/Fx.Tween, More/Mask, Mask.Fx]
provides: MooDialog.Fx
...
*/


MooDialog.implement('options', {

	duration: 400,
	closeOnOverlayClick: true,

	onInitialize: function(wrapper){
		this.fx = new Fx.Tween(wrapper, {
			property: 'opacity',
			duration: this.options.duration
		}).set(0);
		this.overlay = new Mask.Fx(document.body, {
			'class': 'MooDialogMask',
			end: 0.75,
			destroyOnHide: this.options.destroyOnHide,
			fx: {
				duration: this.options.duration
			}
		});
		if (this.options.closeOnOverlayClick) this.overlay.addEvent('click', this.close.bind(this));
	},

	onBeforeOpen: function(wrapper){
		this.overlay.show();
		this.fx.start(1).chain(function(){
			this.fireEvent('show');
		}.bind(this));
	},

	onBeforeClose: function(wrapper){
		this.overlay.hide();
		this.fx.start(0).chain(function(){
			this.fireEvent('hide');
		}.bind(this));
	}

});
