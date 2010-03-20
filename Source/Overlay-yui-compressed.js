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
var Overlay=new Class({Implements:[Options,Events],options:{id:"overlay",color:"#000",duration:500,opacity:0.5,zIndex:5000},initialize:function(a,b){this.setOptions(b);this.container=document.id(a);if(Browser.Engine.trident&&Browser.Engine.version<=6){this.ie6=true;}this.overlay=new Element("div",{id:this.options.id,opacity:0,styles:{position:(this.ie6)?"absolute":"fixed",background:this.options.color,left:0,top:0,"z-index":this.options.zIndex},events:{click:function(){this.fireEvent("click");}.bind(this)}}).inject(this.container);this.tween=new Fx.Tween(this.overlay,{duration:this.options.duration,link:"cancel",property:"opacity",onStart:function(){this.overlay.setStyles({width:"100%",height:this.container.getScrollSize().y});}.bind(this),onComplete:function(){this.fireEvent(this.overlay.get("opacity")==this.options.opacity?"show":"hide");}.bind(this)});window.addEvents({resize:function(){this.resize();}.bind(this),scroll:function(){this.scroll();}.bind(this)});},open:function(){this.fireEvent("open");this.tween.start(this.options.opacity);return this;},close:function(){this.fireEvent("close");this.tween.start(0);return this;},resize:function(){this.fireEvent("resize");this.overlay.setStyle("height",this.container.getScrollSize().y);return this;},scroll:function(){this.fireEvent("scroll");if(this.ie6){this.overlay.setStyle("left",window.getScroll().x);}return this;}});