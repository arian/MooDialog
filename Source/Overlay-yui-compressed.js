/*
---
description:     Overlay

authors:
  - David Walsh (http://davidwalsh.name)

license:
  - MIT-style license

requires:
  core/1.2.1:   '*'

provides:
  - Overlay
...
*/
var Overlay=new Class({Implements:[Options,Events],options:{id:"overlay",color:"#000",duration:500,opacity:0.5},initialize:function(a,b){this.setOptions(b);this.container=document.id(a);this.overlay=new Element("div",{id:this.options.id,opacity:0,styles:{position:"absolute",background:this.options.color,left:0,top:0,"z-index":5000},events:{click:function(){this.fireEvent("click");}.bind(this)}}).inject(this.container);this.tween=new Fx.Tween(this.overlay,{duration:this.options.duration,link:"cancel",property:"opacity",onStart:function(){var c=this.container.getScrollSize();this.overlay.setStyles({width:c.x,height:c.y});}.bind(this),onComplete:function(){this.fireEvent(this.overlay.get("opacity")==this.options.opacity?"show":"hide");}.bind(this)});},open:function(){this.fireEvent("open");this.tween.start(this.options.opacity);},close:function(){this.fireEvent("close");this.tween.start(0);}});