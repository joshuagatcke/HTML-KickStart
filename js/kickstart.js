/*
	99Lime.com HTML KickStart by Joshua Gatcke
	kickstart.js
*/

jQuery(document).ready(function($){

	/*---------------------------------
		MENU Dropdowns
	-----------------------------------*/
	$('ul.menu').each(function(){
		// add the menu toggle
		$(this).prepend('<li class="menu-toggle"><a href="#"><span class="icon" data-icon="Y"></span> Menu</a></li>');

		// find menu items with children.
		$(this).find('li').has('ul').addClass('has-menu')
		.find('a:first').append('<span class="arrow">&nbsp;</span>');
	});

	$('ul.menu li').hover(function(){
		$(this).find('ul:first').stop(true, true).fadeIn('fast');
		$(this).addClass('hover');
	},
	function(){
		$(this).find('ul').stop(true, true).fadeOut('slow');
		$(this).removeClass('hover');
	});

	/*---------------------------------
		Slideshow
	-----------------------------------*/
	$('.slideshow').bxSlider({
		mode: 'horizontal', // 'horizontal', 'vertical', 'fade'
		video: true,
		useCSS: true,
		pager: true,
		speed: 500, // transition time
		startSlide: 0,
		infiniteLoop: true,
		captions: true,
		adaptiveHeight: false,
		touchEnabled: true,
		pause: 4000,
		autoControls: false,
		controls: false,
		autoStart: true,
		auto: true
	});

	/*---------------------------------
		Fancybox Lightbox
	-----------------------------------*/
	$('.gallery').each(function(i){
		$(this).find('a').attr('rel', 'gallery'+i)
		.fancybox({
			overlayOpacity: 0.2,
			overlayColor: '#000'
		});
	});

	// lightbox links
	$('a.lightbox').fancybox({
		overlayOpacity: 0.2,
		overlayColor: '#000'
	});

	/*---------------------------------
		Tabs
	-----------------------------------*/
	// tab setup
	$('.tab-content').addClass('clearfix').not(':first').hide();
	$('ul.tabs').each(function(){
		var current = $(this).find('li.current');
		if(current.length < 1) { $(this).find('li:first').addClass('current'); }
		current = $(this).find('li.current a').attr('href');
		$(current).show();
	});

	// tab click
	$(document).on('click', 'ul.tabs a[href^="#"]', function(e){
		e.preventDefault();
		var tabs = $(this).parents('ul.tabs').find('li');
		var tab_next = $(this).attr('href');
		var tab_current = tabs.filter('.current').find('a').attr('href');
		$(tab_current).hide();
		tabs.removeClass('current');
		$(this).parent().addClass('current');
		$(tab_next).show();
		history.pushState( null, null, window.location.search + $(this).attr('href') );
		return false;
	});

 	// tab hashtag identification and auto-focus
    	var wantedTag = window.location.hash;
    	if (wantedTag != "")
    	{
			// This code can and does fail, hard, killing the entire app.
			// Esp. when used with the jQuery.Address project.
			try {
				var allTabs = $("ul.tabs a[href^=" + wantedTag + "]").parents('ul.tabs').find('li');
				var defaultTab = allTabs.filter('.current').find('a').attr('href');
				$(defaultTab).hide();
				allTabs.removeClass('current');
				$("ul.tabs a[href^=" + wantedTag + "]").parent().addClass('current');
				$("#" + wantedTag.replace('#','')).show();
			} catch(e) {
				// I have no idea what to do here, so I'm leaving this for the maintainer.
			}
    	}

	/*---------------------------------
		Image Caption
	-----------------------------------*/
	$('img.caption').each(function(){
		$(this).wrap('<div class="caption">');
		$(this).parents('div.caption')
			.attr('class', 'img-wrap '+$(this).attr('class'));
		if($(this).attr('title')){
			$(this).parents('div.caption')
			.append('<span>'+$(this).attr('title')+'</span>');
		}
	});

	/*---------------------------------
		Notice
	-----------------------------------*/
	$(document).on('click', '.notice a[class^="icon-remove"]', function(e){
		e.preventDefault();
		var notice = $(this).parents('.notice');
		$(this).hide();
		notice.fadeOut('slow');
	});

	/*---------------------------------
		ToolTip - TipTip
	-----------------------------------*/

	// Standard tooltip
	$('.tooltip, .tooltip-top, .tooltip-bottom, .tooltip-right, .tooltip-left').each(function(){
		// variables
		var tpos = 'top';
		var content = $(this).attr('title');
		var dataContent = $(this).attr('data-content');
		var keepAlive = false;
		var action = 'hover';
		var delay = $(this).attr('data-delay');
		if (delay === undefined) {delay = 1000;}

		// position
		if($(this).hasClass('tooltip-top')) 	{ tpos = 'top'; 	}
		if($(this).hasClass('tooltip-right')) 	{ tpos = 'right'; 	}
		if($(this).hasClass('tooltip-bottom')) 	{ tpos = 'bottom'; 	}
		if($(this).hasClass('tooltip-left')) 	{ tpos = 'left'; 	}

		// content
		$('.tooltip-content').removeClass('hide').wrap('<div class="hide"></div>');
		if(dataContent) { content = $(dataContent).html(); keepAlive = true; }

		// action (hover or click) defaults to hover
		if($(this).attr('data-action') == 'click') { action = 'click'; }

		// tooltip
		$(this).attr('title','')
		.tipTip({defaultPosition: tpos, content: content, keepAlive: keepAlive, activation: action, delay: delay});
	});

	/*---------------------------------
		Table Sort
	-----------------------------------*/
	// init
	var aAsc = [];
	$('table.sortable').each(function(){
		$(this).find('thead th').each(function(index){$(this).attr('rel', index);});
		$(this).find('th,td').each(function(){$(this).attr('value', $(this).text());});
	});

	// table click
	$(document).on('click', 'table.sortable thead th', function(e){
		// update arrow icon
		$(this).parents('table.sortable').find('span.arrow').remove();
		$(this).append('<span class="arrow"></span>');

		// sort direction
		var nr = $(this).attr('rel');
		aAsc[nr] = aAsc[nr]=='asc'?'desc':'asc';
		if(aAsc[nr] == 'desc'){ $(this).find('span.arrow').addClass('up'); }

		// sort rows
		var rows = $(this).parents('table.sortable').find('tbody tr');
		rows.tsort('td:eq('+nr+')',{order:aAsc[nr],attr:'value'});

		// fix row classes
		rows.removeClass('alt first last');
		var table = $(this).parents('table.sortable');
		table.find('tr:even').addClass('alt');
		table.find('tr:first').addClass('first');
		table.find('tr:last').addClass('last');
	});

	/*---------------------------------
		CSS Helpers
	-----------------------------------*/
	$('input[type=checkbox]').addClass('checkbox');
	$('input[type=radio]').addClass('radio');
	$('input[type=file]').addClass('file');
	$('[disabled=disabled]').addClass('disabled');
	$('table').find('tr:even').addClass('alt');
	$('table').find('tr:first-child').addClass('first');
	$('table').find('tr:last-child').addClass('last');
	$('ul').find('li:first-child').addClass('first');
	$('ul').find('li:last-child').addClass('last');
	$('hr').before('<div class="clear">&nbsp;</div>');
	$('[class*="col_"]').addClass('column');
	$('pre').addClass('prettyprint');prettyPrint();

});

/*
 * FancyBox - jQuery Plugin
 * Simple and fancy lightbox alternative
 *
 * Examples and documentation at: http://fancybox.net
 *
 * Copyright (c) 2008 - 2010 Janis Skarnelis
 * That said, it is hardly a one-person project. Many people have submitted bugs, code, and offered their advice freely. Their support is greatly appreciated.
 *
 * Version: 1.3.4 (11/11/2010)
 * Requires: jQuery v1.3+
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function(a){var p,u,v,e,B,m,C,j,y,z,s=0,d={},q=[],r=0,c={},k=[],E=null,n=new Image,H=/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,S=/[^\.]\.(swf)\s*$/i,I,J=1,x=0,w="",t,g,l=!1,A=a.extend(a("<div/>")[0],{prop:0}),K=navigator.userAgent.match(/msie [6]/i)&&!window.XMLHttpRequest,L=function(){u.hide();n.onerror=n.onload=null;E&&E.abort();p.empty()},M=function(){!1===d.onError(q,s,d)?(u.hide(),l=!1):(d.titleShow=!1,d.width="auto",d.height="auto",p.html('<p id="fancybox-error">The requested content cannot be loaded.<br />Please try again later.</p>'),
D())},G=function(){var b=q[s],c,f,e,g,k,j;L();d=a.extend({},a.fn.fancybox.defaults,"undefined"==typeof a(b).data("fancybox")?d:a(b).data("fancybox"));j=d.onStart(q,s,d);if(!1===j)l=!1;else{"object"==typeof j&&(d=a.extend(d,j));e=d.title||(b.nodeName?a(b).attr("title"):b.title)||"";b.nodeName&&!d.orig&&(d.orig=a(b).children("img:first").length?a(b).children("img:first"):a(b));""===e&&(d.orig&&d.titleFromAlt)&&(e=d.orig.attr("alt"));c=d.href||(b.nodeName?a(b).attr("href"):b.href)||null;if(/^(?:javascript)/i.test(c)||
"#"==c)c=null;d.type?(f=d.type,c||(c=d.content)):d.content?f="html":c&&(f=c.match(H)?"image":c.match(S)?"swf":a(b).hasClass("iframe")?"iframe":0===c.indexOf("#")?"inline":"ajax");if(f)switch("inline"==f&&(b=c.substr(c.indexOf("#")),f=0<a(b).length?"inline":"ajax"),d.type=f,d.href=c,d.title=e,d.autoDimensions&&("html"==d.type||"inline"==d.type||"ajax"==d.type?(d.width="auto",d.height="auto"):d.autoDimensions=!1),d.modal&&(d.overlayShow=!0,d.hideOnOverlayClick=!1,d.hideOnContentClick=!1,d.enableEscapeButton=
!1,d.showCloseButton=!1),d.padding=parseInt(d.padding,10),d.margin=parseInt(d.margin,10),p.css("padding",d.padding+d.margin),a(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change",function(){a(this).replaceWith(m.children())}),f){case "html":p.html(d.content);D();break;case "inline":if(!0===a(b).parent().is("#fancybox-content")){l=!1;break}a('<div class="fancybox-inline-tmp" />').hide().insertBefore(a(b)).bind("fancybox-cleanup",function(){a(this).replaceWith(m.children())}).bind("fancybox-cancel",
function(){a(this).replaceWith(p.children())});a(b).appendTo(p);D();break;case "image":l=!1;a.fancybox.showActivity();n=new Image;n.onerror=function(){M()};n.onload=function(){l=!0;n.onerror=n.onload=null;d.width=n.width;d.height=n.height;a("<img />").attr({id:"fancybox-img",src:n.src,alt:d.title}).appendTo(p);N()};n.src=c;break;case "swf":d.scrolling="no";g='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+d.width+'" height="'+d.height+'"><param name="movie" value="'+c+'"></param>';
k="";a.each(d.swf,function(a,b){g+='<param name="'+a+'" value="'+b+'"></param>';k+=" "+a+'="'+b+'"'});g+='<embed src="'+c+'" type="application/x-shockwave-flash" width="'+d.width+'" height="'+d.height+'"'+k+"></embed></object>";p.html(g);D();break;case "ajax":l=!1;a.fancybox.showActivity();d.ajax.win=d.ajax.success;E=a.ajax(a.extend({},d.ajax,{url:c,data:d.ajax.data||{},error:function(a){0<a.status&&M()},success:function(a,b,f){if(200==("object"==typeof f?f:E).status){if("function"==typeof d.ajax.win){j=
d.ajax.win(c,a,b,f);if(!1===j){u.hide();return}if("string"==typeof j||"object"==typeof j)a=j}p.html(a);D()}}}));break;case "iframe":N()}else M()}},D=function(){var b=d.width,c=d.height,b=-1<b.toString().indexOf("%")?parseInt((a(window).width()-2*d.margin)*parseFloat(b)/100,10)+"px":"auto"==b?"auto":b+"px",c=-1<c.toString().indexOf("%")?parseInt((a(window).height()-2*d.margin)*parseFloat(c)/100,10)+"px":"auto"==c?"auto":c+"px";p.wrapInner('<div style="width:'+b+";height:"+c+";overflow: "+("auto"==
d.scrolling?"auto":"yes"==d.scrolling?"scroll":"hidden")+';position:relative;"></div>');d.width=p.width();d.height=p.height();N()},N=function(){var b,h;u.hide();if(e.is(":visible")&&!1===c.onCleanup(k,r,c))a.event.trigger("fancybox-cancel"),l=!1;else{l=!0;a(m.add(v)).unbind();a(window).unbind("resize.fb scroll.fb");a(document).unbind("keydown.fb");e.is(":visible")&&"outside"!==c.titlePosition&&e.css("height",e.height());k=q;r=s;c=d;if(c.overlayShow){if(v.css({"background-color":c.overlayColor,opacity:c.overlayOpacity,
cursor:c.hideOnOverlayClick?"pointer":"auto",height:a(document).height()}),!v.is(":visible")){if(K)a("select:not(#fancybox-tmp select)").filter(function(){return"hidden"!==this.style.visibility}).css({visibility:"hidden"}).one("fancybox-cleanup",function(){this.style.visibility="inherit"});v.show()}}else v.hide();b=O();var f={},F=c.autoScale,n=2*c.padding;f.width=-1<c.width.toString().indexOf("%")?parseInt(b[0]*parseFloat(c.width)/100,10):c.width+n;f.height=-1<c.height.toString().indexOf("%")?parseInt(b[1]*
parseFloat(c.height)/100,10):c.height+n;if(F&&(f.width>b[0]||f.height>b[1]))"image"==d.type||"swf"==d.type?(F=c.width/c.height,f.width>b[0]&&(f.width=b[0],f.height=parseInt((f.width-n)/F+n,10)),f.height>b[1]&&(f.height=b[1],f.width=parseInt((f.height-n)*F+n,10))):(f.width=Math.min(f.width,b[0]),f.height=Math.min(f.height,b[1]));f.top=parseInt(Math.max(b[3]-20,b[3]+0.5*(b[1]-f.height-40)),10);f.left=parseInt(Math.max(b[2]-20,b[2]+0.5*(b[0]-f.width-40)),10);g=f;w=c.title||"";x=0;j.empty().removeAttr("style").removeClass();
if(!1!==c.titleShow&&(w=a.isFunction(c.titleFormat)?c.titleFormat(w,k,r,c):w&&w.length?"float"==c.titlePosition?'<table id="fancybox-title-float-wrap" cellpadding="0" cellspacing="0"><tr><td id="fancybox-title-float-left"></td><td id="fancybox-title-float-main">'+w+'</td><td id="fancybox-title-float-right"></td></tr></table>':'<div id="fancybox-title-'+c.titlePosition+'">'+w+"</div>":!1)&&""!==w)switch(j.addClass("fancybox-title-"+c.titlePosition).html(w).appendTo("body").show(),c.titlePosition){case "inside":j.css({width:g.width-
2*c.padding,marginLeft:c.padding,marginRight:c.padding});x=j.outerHeight(!0);j.appendTo(B);g.height+=x;break;case "over":j.css({marginLeft:c.padding,width:g.width-2*c.padding,bottom:c.padding}).appendTo(B);break;case "float":j.css("left",-1*parseInt((j.width()-g.width-40)/2,10)).appendTo(e);break;default:j.css({width:g.width-2*c.padding,paddingLeft:c.padding,paddingRight:c.padding}).appendTo(e)}j.hide();e.is(":visible")?(a(C.add(y).add(z)).hide(),b=e.position(),t={top:b.top,left:b.left,width:e.width(),
height:e.height()},h=t.width==g.width&&t.height==g.height,m.fadeTo(c.changeFade,0.3,function(){var b=function(){m.html(p.contents()).fadeTo(c.changeFade,1,P)};a.event.trigger("fancybox-change");m.empty().removeAttr("filter").css({"border-width":c.padding,width:g.width-2*c.padding,height:d.autoDimensions?"auto":g.height-x-2*c.padding});h?b():(A.prop=0,a(A).animate({prop:1},{duration:c.changeSpeed,easing:c.easingChange,step:Q,complete:b}))})):(e.removeAttr("style"),m.css("border-width",c.padding),"elastic"==
c.transitionIn?(t=R(),m.html(p.contents()),e.show(),c.opacity&&(g.opacity=0),A.prop=0,a(A).animate({prop:1},{duration:c.speedIn,easing:c.easingIn,step:Q,complete:P})):("inside"==c.titlePosition&&0<x&&j.show(),m.css({width:g.width-2*c.padding,height:d.autoDimensions?"auto":g.height-x-2*c.padding}).html(p.contents()),e.css(g).fadeIn("none"==c.transitionIn?0:c.speedIn,P)))}},P=function(){a.support.opacity||(m.get(0).style.removeAttribute("filter"),e.get(0).style.removeAttribute("filter"));d.autoDimensions&&
m.css("height","auto");e.css("height","auto");w&&w.length&&j.show();c.showCloseButton&&C.show();(c.enableEscapeButton||c.enableKeyboardNav)&&a(document).bind("keydown.fb",function(b){if(27==b.keyCode&&c.enableEscapeButton)b.preventDefault(),a.fancybox.close();else if((37==b.keyCode||39==b.keyCode)&&c.enableKeyboardNav&&"INPUT"!==b.target.tagName&&"TEXTAREA"!==b.target.tagName&&"SELECT"!==b.target.tagName)b.preventDefault(),a.fancybox[37==b.keyCode?"prev":"next"]()});c.showNavArrows?((c.cyclic&&1<
k.length||0!==r)&&y.show(),(c.cyclic&&1<k.length||r!=k.length-1)&&z.show()):(y.hide(),z.hide());c.hideOnContentClick&&m.bind("click",a.fancybox.close);c.hideOnOverlayClick&&v.bind("click",a.fancybox.close);a(window).bind("resize.fb",a.fancybox.resize);c.centerOnScroll&&a(window).bind("scroll.fb",a.fancybox.center);"iframe"==c.type&&a('<iframe id="fancybox-frame" name="fancybox-frame'+(new Date).getTime()+'" frameborder="0" hspace="0" '+(navigator.userAgent.match(/msie [6]/i)?'allowtransparency="true""':
"")+' scrolling="'+d.scrolling+'" src="'+c.href+'"></iframe>').appendTo(m);e.show();l=!1;a.fancybox.center();c.onComplete(k,r,c);var b,h;k.length-1>r&&(b=k[r+1].href,"undefined"!==typeof b&&b.match(H)&&(h=new Image,h.src=b));0<r&&(b=k[r-1].href,"undefined"!==typeof b&&b.match(H)&&(h=new Image,h.src=b))},Q=function(b){var a={width:parseInt(t.width+(g.width-t.width)*b,10),height:parseInt(t.height+(g.height-t.height)*b,10),top:parseInt(t.top+(g.top-t.top)*b,10),left:parseInt(t.left+(g.left-t.left)*b,
10)};"undefined"!==typeof g.opacity&&(a.opacity=0.5>b?0.5:b);e.css(a);m.css({width:a.width-2*c.padding,height:a.height-x*b-2*c.padding})},O=function(){return[a(window).width()-2*c.margin,a(window).height()-2*c.margin,a(document).scrollLeft()+c.margin,a(document).scrollTop()+c.margin]},R=function(){var b=d.orig?a(d.orig):!1,h={};b&&b.length?(h=b.offset(),h.top+=parseInt(b.css("paddingTop"),10)||0,h.left+=parseInt(b.css("paddingLeft"),10)||0,h.top+=parseInt(b.css("border-top-width"),10)||0,h.left+=
parseInt(b.css("border-left-width"),10)||0,h.width=b.width(),h.height=b.height(),h={width:h.width+2*c.padding,height:h.height+2*c.padding,top:h.top-c.padding-20,left:h.left-c.padding-20}):(b=O(),h={width:2*c.padding,height:2*c.padding,top:parseInt(b[3]+0.5*b[1],10),left:parseInt(b[2]+0.5*b[0],10)});return h},T=function(){u.is(":visible")?(a("div",u).css("top",-40*J+"px"),J=(J+1)%12):clearInterval(I)};a.fn.fancybox=function(b){if(!a(this).length)return this;a(this).data("fancybox",a.extend({},b,a.metadata?
a(this).metadata():{})).unbind("click.fb").bind("click.fb",function(b){b.preventDefault();l||(l=!0,a(this).blur(),q=[],s=0,b=a(this).attr("rel")||"",!b||""==b||"nofollow"===b?q.push(this):(q=a("a[rel="+b+"], area[rel="+b+"], img[rel="+b+"]"),s=q.index(this)),G())});return this};a.fancybox=function(b,c){var d;if(!l){l=!0;d="undefined"!==typeof c?c:{};q=[];s=parseInt(d.index,10)||0;if(a.isArray(b)){for(var e=0,g=b.length;e<g;e++)"object"==typeof b[e]?a(b[e]).data("fancybox",a.extend({},d,b[e])):b[e]=
a({}).data("fancybox",a.extend({content:b[e]},d));q=jQuery.merge(q,b)}else"object"==typeof b?a(b).data("fancybox",a.extend({},d,b)):b=a({}).data("fancybox",a.extend({content:b},d)),q.push(b);if(s>q.length||0>s)s=0;G()}};a.fancybox.showActivity=function(){clearInterval(I);u.show();I=setInterval(T,66)};a.fancybox.hideActivity=function(){u.hide()};a.fancybox.next=function(){return a.fancybox.pos(r+1)};a.fancybox.prev=function(){return a.fancybox.pos(r-1)};a.fancybox.pos=function(b){l||(b=parseInt(b),
q=k,-1<b&&b<k.length?(s=b,G()):c.cyclic&&1<k.length&&(s=b>=k.length?0:k.length-1,G()))};a.fancybox.cancel=function(){l||(l=!0,a.event.trigger("fancybox-cancel"),L(),d.onCancel(q,s,d),l=!1)};a.fancybox.close=function(){function b(){v.fadeOut("fast");j.empty().hide();e.hide();a.event.trigger("fancybox-cleanup");m.empty();c.onClosed(k,r,c);k=d=[];r=s=0;c=d={};l=!1}if(!l&&!e.is(":hidden"))if(l=!0,c&&!1===c.onCleanup(k,r,c))l=!1;else if(L(),a(C.add(y).add(z)).hide(),a(m.add(v)).unbind(),a(window).unbind("resize.fb scroll.fb"),
a(document).unbind("keydown.fb"),m.find("iframe").attr("src",K&&/^https/i.test(window.location.href||"")?"javascript:void(false)":"about:blank"),"inside"!==c.titlePosition&&j.empty(),e.stop(),"elastic"==c.transitionOut){t=R();var h=e.position();g={top:h.top,left:h.left,width:e.width(),height:e.height()};c.opacity&&(g.opacity=1);j.empty().hide();A.prop=1;a(A).animate({prop:0},{duration:c.speedOut,easing:c.easingOut,step:Q,complete:b})}else e.fadeOut("none"==c.transitionOut?0:c.speedOut,b)};a.fancybox.resize=
function(){v.is(":visible")&&v.css("height",a(document).height());a.fancybox.center(!0)};a.fancybox.center=function(b){var a,d;if(!l&&(d=!0===b?1:0,a=O(),d||!(e.width()>a[0]||e.height()>a[1])))e.stop().animate({top:parseInt(Math.max(a[3]-20,a[3]+0.5*(a[1]-m.height()-40)-c.padding)),left:parseInt(Math.max(a[2]-20,a[2]+0.5*(a[0]-m.width()-40)-c.padding))},"number"==typeof b?b:200)};a.fancybox.init=function(){a("#fancybox-wrap").length||(a("body").append(p=a('<div id="fancybox-tmp"></div>'),u=a('<div id="fancybox-loading"><div></div></div>'),
v=a('<div id="fancybox-overlay"></div>'),e=a('<div id="fancybox-wrap"></div>')),B=a('<div id="fancybox-outer"></div>').append('<div class="fancybox-bg" id="fancybox-bg-n"></div><div class="fancybox-bg" id="fancybox-bg-ne"></div><div class="fancybox-bg" id="fancybox-bg-e"></div><div class="fancybox-bg" id="fancybox-bg-se"></div><div class="fancybox-bg" id="fancybox-bg-s"></div><div class="fancybox-bg" id="fancybox-bg-sw"></div><div class="fancybox-bg" id="fancybox-bg-w"></div><div class="fancybox-bg" id="fancybox-bg-nw"></div>').appendTo(e),
B.append(m=a('<div id="fancybox-content"></div>'),C=a('<a id="fancybox-close"></a>'),j=a('<div id="fancybox-title"></div>'),y=a('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'),z=a('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>')),C.click(a.fancybox.close),u.click(a.fancybox.cancel),y.click(function(b){b.preventDefault();a.fancybox.prev()}),z.click(function(b){b.preventDefault();a.fancybox.next()}),
a.fn.mousewheel&&e.bind("mousewheel.fb",function(b,c){if(l)b.preventDefault();else if(0==a(b.target).get(0).clientHeight||a(b.target).get(0).scrollHeight===a(b.target).get(0).clientHeight)b.preventDefault(),a.fancybox[0<c?"prev":"next"]()}),a.support.opacity||e.addClass("fancybox-ie"),K&&(u.addClass("fancybox-ie6"),e.addClass("fancybox-ie6"),a('<iframe id="fancybox-hide-sel-frame" src="'+(/^https/i.test(window.location.href||"")?"javascript:void(false)":"about:blank")+'" scrolling="no" border="0" frameborder="0" tabindex="-1"></iframe>').prependTo(B)))};
a.fn.fancybox.defaults={padding:10,margin:40,opacity:!1,modal:!1,cyclic:!1,scrolling:"auto",width:560,height:340,autoScale:!0,autoDimensions:!0,centerOnScroll:!1,ajax:{},swf:{wmode:"transparent"},hideOnOverlayClick:!0,hideOnContentClick:!1,overlayShow:!0,overlayOpacity:0.7,overlayColor:"#777",titleShow:!0,titlePosition:"float",titleFormat:null,titleFromAlt:!1,transitionIn:"fade",transitionOut:"fade",speedIn:300,speedOut:300,changeSpeed:300,changeFade:"fast",easingIn:"swing",easingOut:"swing",showCloseButton:!0,
showNavArrows:!0,enableEscapeButton:!0,enableKeyboardNav:!0,onStart:function(){},onCancel:function(){},onComplete:function(){},onCleanup:function(){},onClosed:function(){},onError:function(){}};a(document).ready(function(){a.fancybox.init()})})(jQuery);


 /*
 * TipTip
 * Copyright 2010 Drew Wilson
 * www.drewwilson.com
 * code.drewwilson.com/entry/tiptip-jquery-plugin
 *
 * Version 1.3   -   Updated: Mar. 23, 2010
 *
 * This Plug-In will create a custom tooltip to replace the default
 * browser tooltip. It is extremely lightweight and very smart in
 * that it detects the edges of the browser window and will make sure
 * the tooltip stays within the current window size. As a result the
 * tooltip will adjust itself to be displayed above, below, to the left
 * or to the right depending on what is necessary to stay within the
 * browser window. It is completely customizable as well via CSS.
 *
 * This TipTip jQuery plug-in is dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function($){$.fn.tipTip=function(options){var defaults={activation:"hover",keepAlive:false,maxWidth:"200px",edgeOffset:3,defaultPosition:"bottom",delay:400,fadeIn:200,fadeOut:200,attribute:"title",content:false,enter:function(){},exit:function(){}};var opts=$.extend(defaults,options);if($("#tiptip_holder").length<=0){var tiptip_holder=$('<div id="tiptip_holder" style="max-width:'+opts.maxWidth+';"></div>');var tiptip_content=$('<div id="tiptip_content"></div>');var tiptip_arrow=$('<div id="tiptip_arrow"></div>');$("body").append(tiptip_holder.html(tiptip_content).prepend(tiptip_arrow.html('<div id="tiptip_arrow_inner"></div>')))}else{var tiptip_holder=$("#tiptip_holder");var tiptip_content=$("#tiptip_content");var tiptip_arrow=$("#tiptip_arrow")}return this.each(function(){var org_elem=$(this);if(opts.content){var org_title=opts.content}else{var org_title=org_elem.attr(opts.attribute)}if(org_title!=""){if(!opts.content){org_elem.removeAttr(opts.attribute)}var timeout=false;if(opts.activation=="hover"){org_elem.hover(function(){active_tiptip()},function(){if(!opts.keepAlive){deactive_tiptip()}});if(opts.keepAlive){tiptip_holder.hover(function(){},function(){deactive_tiptip()})}}else if(opts.activation=="focus"){org_elem.focus(function(){active_tiptip()}).blur(function(){deactive_tiptip()})}else if(opts.activation=="click"){org_elem.click(function(){active_tiptip();return false}).hover(function(){},function(){if(!opts.keepAlive){deactive_tiptip()}});if(opts.keepAlive){tiptip_holder.hover(function(){},function(){deactive_tiptip()})}}function active_tiptip(){opts.enter.call(this);tiptip_content.html(org_title);tiptip_holder.hide().removeAttr("class").css("margin","0");tiptip_arrow.removeAttr("style");var top=parseInt(org_elem.offset()['top']);var left=parseInt(org_elem.offset()['left']);var org_width=parseInt(org_elem.outerWidth());var org_height=parseInt(org_elem.outerHeight());var tip_w=tiptip_holder.outerWidth();var tip_h=tiptip_holder.outerHeight();var w_compare=Math.round((org_width-tip_w)/2);var h_compare=Math.round((org_height-tip_h)/2);var marg_left=Math.round(left+w_compare);var marg_top=Math.round(top+org_height+opts.edgeOffset);var t_class="";var arrow_top="";var arrow_left=Math.round(tip_w-12)/2;if(opts.defaultPosition=="bottom"){t_class="_bottom"}else if(opts.defaultPosition=="top"){t_class="_top"}else if(opts.defaultPosition=="left"){t_class="_left"}else if(opts.defaultPosition=="right"){t_class="_right"}var right_compare=(w_compare+left)<parseInt($(window).scrollLeft());var left_compare=(tip_w+left)>parseInt($(window).width());if((right_compare&&w_compare<0)||(t_class=="_right"&&!left_compare)||(t_class=="_left"&&left<(tip_w+opts.edgeOffset+5))){t_class="_right";arrow_top=Math.round(tip_h-13)/2;arrow_left=-12;marg_left=Math.round(left+org_width+opts.edgeOffset);marg_top=Math.round(top+h_compare)}else if((left_compare&&w_compare<0)||(t_class=="_left"&&!right_compare)){t_class="_left";arrow_top=Math.round(tip_h-13)/2;arrow_left=Math.round(tip_w);marg_left=Math.round(left-(tip_w+opts.edgeOffset+5));marg_top=Math.round(top+h_compare)}var top_compare=(top+org_height+opts.edgeOffset+tip_h+8)>parseInt($(window).height()+$(window).scrollTop());var bottom_compare=((top+org_height)-(opts.edgeOffset+tip_h+8))<0;if(top_compare||(t_class=="_bottom"&&top_compare)||(t_class=="_top"&&!bottom_compare)){if(t_class=="_top"||t_class=="_bottom"){t_class="_top"}else{t_class=t_class+"_top"}arrow_top=tip_h;marg_top=Math.round(top-(tip_h+5+opts.edgeOffset))}else if(bottom_compare|(t_class=="_top"&&bottom_compare)||(t_class=="_bottom"&&!top_compare)){if(t_class=="_top"||t_class=="_bottom"){t_class="_bottom"}else{t_class=t_class+"_bottom"}arrow_top=-12;marg_top=Math.round(top+org_height+opts.edgeOffset)}if(t_class=="_right_top"||t_class=="_left_top"){marg_top=marg_top+5}else if(t_class=="_right_bottom"||t_class=="_left_bottom"){marg_top=marg_top-5}if(t_class=="_left_top"||t_class=="_left_bottom"){marg_left=marg_left+5}tiptip_arrow.css({"margin-left":arrow_left+"px","margin-top":arrow_top+"px"});tiptip_holder.css({"margin-left":marg_left+"px","margin-top":marg_top+"px"}).attr("class","tip"+t_class);if(timeout){clearTimeout(timeout)}timeout=setTimeout(function(){tiptip_holder.stop(true,true).fadeIn(opts.fadeIn)},opts.delay)}function deactive_tiptip(){opts.exit.call(this);if(timeout){clearTimeout(timeout)}tiptip_holder.fadeOut(opts.fadeOut)}}})}})(jQuery);

/* TINY SORT */
(function(e){var a=false,g=null,f=parseFloat,b=/(\d+\.?\d*)$/g;e.tinysort={id:"TinySort",version:"1.2.18",copyright:"Copyright (c) 2008-2012 Ron Valstar",uri:"http://tinysort.sjeiti.com/",licenced:{MIT:"http://www.opensource.org/licenses/mit-license.php",GPL:"http://www.gnu.org/licenses/gpl.html"},defaults:{order:"asc",attr:g,data:g,useVal:a,place:"start",returns:a,cases:a,forceStrings:a,sortFunction:g}};e.fn.extend({tinysort:function(m,h){if(m&&typeof(m)!="string"){h=m;m=g}var n=e.extend({},e.tinysort.defaults,h),s,B=this,x=e(this).length,C={},p=!(!m||m==""),q=!(n.attr===g||n.attr==""),w=n.data!==g,j=p&&m[0]==":",k=j?B.filter(m):B,r=n.sortFunction,v=n.order=="asc"?1:-1,l=[];if(!r){r=n.order=="rand"?function(){return Math.random()<0.5?1:-1}:function(F,E){var i=!n.cases?d(F.s):F.s,K=!n.cases?d(E.s):E.s;if(!n.forceStrings){var H=i.match(b),G=K.match(b);if(H&&G){var J=i.substr(0,i.length-H[0].length),I=K.substr(0,K.length-G[0].length);if(J==I){i=f(H[0]);K=f(G[0])}}}return v*(i<K?-1:(i>K?1:0))}}B.each(function(G,H){var I=e(H),E=p?(j?k.filter(H):I.find(m)):I,J=w?E.data(n.data):(q?E.attr(n.attr):(n.useVal?E.val():E.text())),F=I.parent();if(!C[F]){C[F]={s:[],n:[]}}if(E.length>0){C[F].s.push({s:J,e:I,n:G})}else{C[F].n.push({e:I,n:G})}});for(s in C){C[s].s.sort(r)}for(s in C){var y=C[s],A=[],D=x,u=[0,0],z;switch(n.place){case"first":e.each(y.s,function(E,F){D=Math.min(D,F.n)});break;case"org":e.each(y.s,function(E,F){A.push(F.n)});break;case"end":D=y.n.length;break;default:D=0}for(z=0;z<x;z++){var o=c(A,z)?!a:z>=D&&z<D+y.s.length,t=(o?y.s:y.n)[u[o?0:1]].e;t.parent().append(t);if(o||!n.returns){l.push(t.get(0))}u[o?0:1]++}}return B.pushStack(l)}});function d(h){return h&&h.toLowerCase?h.toLowerCase():h}function c(j,m){for(var k=0,h=j.length;k<h;k++){if(j[k]==m){return !a}}return a}e.fn.TinySort=e.fn.Tinysort=e.fn.tsort=e.fn.tinysort})(jQuery);

/*global jQuery */
/*jshint multistr:true browser:true */
/*!
* FitVids 1.0
*
* Copyright 2011, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
* Date: Thu Sept 01 18:00:00 2011 -0500
*/

(function( $ ){

  "use strict";

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null
    };

    var div = document.createElement('div'),
        ref = document.getElementsByTagName('base')[0] || document.getElementsByTagName('script')[0];

    div.className = 'fit-vids-style';
    div.innerHTML = '&shy;<style>         \
      .fluid-width-video-wrapper {        \
         width: 100%;                     \
         position: relative;              \
         padding: 0;                      \
      }                                   \
                                          \
      .fluid-width-video-wrapper iframe,  \
      .fluid-width-video-wrapper object,  \
      .fluid-width-video-wrapper embed {  \
         position: absolute;              \
         top: 0;                          \
         left: 0;                         \
         width: 100%;                     \
         height: 100%;                    \
      }                                   \
    </style>';

    ref.parentNode.insertBefore(div,ref);

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        "iframe[src*='player.vimeo.com']",
        "iframe[src*='www.youtube.com']",
        "iframe[src*='www.kickstarter.com']",
        "object",
        "embed"
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var $allVideos = $(this).find(selectors.join(','));

      $allVideos.each(function(){
        var $this = $(this);
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('id')){
          var videoID = 'fitvid' + Math.floor(Math.random()*999999);
          $this.attr('id', videoID);
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };
})( jQuery );


/**
 * BxSlider v4.1.2 - Fully loaded, responsive content slider
 * http://bxslider.com
 *
 * Copyright 2014, Steven Wanderski - http://stevenwanderski.com - http://bxcreative.com
 * Written while drinking Belgian ales and listening to jazz
 *
 * Released under the MIT license - http://opensource.org/licenses/MIT
 */
!function(t){var e={},s={mode:"horizontal",slideSelector:"",infiniteLoop:!0,hideControlOnEnd:!1,speed:500,easing:null,slideMargin:0,startSlide:0,randomStart:!1,captions:!1,ticker:!1,tickerHover:!1,adaptiveHeight:!1,adaptiveHeightSpeed:500,video:!1,useCSS:!0,preloadImages:"visible",responsive:!0,slideZIndex:50,touchEnabled:!0,swipeThreshold:50,oneToOneTouch:!0,preventDefaultSwipeX:!0,preventDefaultSwipeY:!1,pager:!0,pagerType:"full",pagerShortSeparator:" / ",pagerSelector:null,buildPager:null,pagerCustom:null,controls:!0,nextText:"Next",prevText:"Prev",nextSelector:null,prevSelector:null,autoControls:!1,startText:"Start",stopText:"Stop",autoControlsCombine:!1,autoControlsSelector:null,auto:!1,pause:4e3,autoStart:!0,autoDirection:"next",autoHover:!1,autoDelay:0,minSlides:1,maxSlides:1,moveSlides:0,slideWidth:0,onSliderLoad:function(){},onSlideBefore:function(){},onSlideAfter:function(){},onSlideNext:function(){},onSlidePrev:function(){},onSliderResize:function(){}};t.fn.bxSlider=function(n){if(0==this.length)return this;if(this.length>1)return this.each(function(){t(this).bxSlider(n)}),this;var o={},r=this;e.el=this;var a=t(window).width(),l=t(window).height(),d=function(){o.settings=t.extend({},s,n),o.settings.slideWidth=parseInt(o.settings.slideWidth),o.children=r.children(o.settings.slideSelector),o.children.length<o.settings.minSlides&&(o.settings.minSlides=o.children.length),o.children.length<o.settings.maxSlides&&(o.settings.maxSlides=o.children.length),o.settings.randomStart&&(o.settings.startSlide=Math.floor(Math.random()*o.children.length)),o.active={index:o.settings.startSlide},o.carousel=o.settings.minSlides>1||o.settings.maxSlides>1,o.carousel&&(o.settings.preloadImages="all"),o.minThreshold=o.settings.minSlides*o.settings.slideWidth+(o.settings.minSlides-1)*o.settings.slideMargin,o.maxThreshold=o.settings.maxSlides*o.settings.slideWidth+(o.settings.maxSlides-1)*o.settings.slideMargin,o.working=!1,o.controls={},o.interval=null,o.animProp="vertical"==o.settings.mode?"top":"left",o.usingCSS=o.settings.useCSS&&"fade"!=o.settings.mode&&function(){var t=document.createElement("div"),e=["WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var i in e)if(void 0!==t.style[e[i]])return o.cssPrefix=e[i].replace("Perspective","").toLowerCase(),o.animProp="-"+o.cssPrefix+"-transform",!0;return!1}(),"vertical"==o.settings.mode&&(o.settings.maxSlides=o.settings.minSlides),r.data("origStyle",r.attr("style")),r.children(o.settings.slideSelector).each(function(){t(this).data("origStyle",t(this).attr("style"))}),c()},c=function(){r.wrap('<div class="bx-wrapper"><div class="bx-viewport"></div></div>'),o.viewport=r.parent(),o.loader=t('<div class="bx-loading" />'),o.viewport.prepend(o.loader),r.css({width:"horizontal"==o.settings.mode?100*o.children.length+215+"%":"auto",position:"relative"}),o.usingCSS&&o.settings.easing?r.css("-"+o.cssPrefix+"-transition-timing-function",o.settings.easing):o.settings.easing||(o.settings.easing="swing"),f(),o.viewport.css({width:"100%",overflow:"hidden",position:"relative"}),o.viewport.parent().css({maxWidth:p()}),o.settings.pager||o.viewport.parent().css({margin:"0 auto 0px"}),o.children.css({"float":"horizontal"==o.settings.mode?"left":"none",listStyle:"none",position:"relative"}),o.children.css("width",u()),"horizontal"==o.settings.mode&&o.settings.slideMargin>0&&o.children.css("marginRight",o.settings.slideMargin),"vertical"==o.settings.mode&&o.settings.slideMargin>0&&o.children.css("marginBottom",o.settings.slideMargin),"fade"==o.settings.mode&&(o.children.css({position:"absolute",zIndex:0,display:"none"}),o.children.eq(o.settings.startSlide).css({zIndex:o.settings.slideZIndex,display:"block"})),o.controls.el=t('<div class="bx-controls" />'),o.settings.captions&&P(),o.active.last=o.settings.startSlide==x()-1,o.settings.video&&r.fitVids();var e=o.children.eq(o.settings.startSlide);"all"==o.settings.preloadImages&&(e=o.children),o.settings.ticker?o.settings.pager=!1:(o.settings.pager&&T(),o.settings.controls&&C(),o.settings.auto&&o.settings.autoControls&&E(),(o.settings.controls||o.settings.autoControls||o.settings.pager)&&o.viewport.after(o.controls.el)),g(e,h)},g=function(e,i){var s=e.find("img, iframe").length;if(0==s)return i(),void 0;var n=0;e.find("img, iframe").each(function(){t(this).one("load",function(){++n==s&&i()}).each(function(){this.complete&&t(this).load()})})},h=function(){if(o.settings.infiniteLoop&&"fade"!=o.settings.mode&&!o.settings.ticker){var e="vertical"==o.settings.mode?o.settings.minSlides:o.settings.maxSlides,i=o.children.slice(0,e).clone().addClass("bx-clone"),s=o.children.slice(-e).clone().addClass("bx-clone");r.append(i).prepend(s)}o.loader.remove(),S(),"vertical"==o.settings.mode&&(o.settings.adaptiveHeight=!0),o.viewport.height(v()),r.redrawSlider(),o.settings.onSliderLoad(o.active.index),o.initialized=!0,o.settings.responsive&&t(window).bind("resize",Z),o.settings.auto&&o.settings.autoStart&&H(),o.settings.ticker&&L(),o.settings.pager&&q(o.settings.startSlide),o.settings.controls&&W(),o.settings.touchEnabled&&!o.settings.ticker&&O()},v=function(){var e=0,s=t();if("vertical"==o.settings.mode||o.settings.adaptiveHeight)if(o.carousel){var n=1==o.settings.moveSlides?o.active.index:o.active.index*m();for(s=o.children.eq(n),i=1;i<=o.settings.maxSlides-1;i++)s=n+i>=o.children.length?s.add(o.children.eq(i-1)):s.add(o.children.eq(n+i))}else s=o.children.eq(o.active.index);else s=o.children;return"vertical"==o.settings.mode?(s.each(function(){e+=t(this).outerHeight()}),o.settings.slideMargin>0&&(e+=o.settings.slideMargin*(o.settings.minSlides-1))):e=Math.max.apply(Math,s.map(function(){return t(this).outerHeight(!1)}).get()),e},p=function(){var t="100%";return o.settings.slideWidth>0&&(t="horizontal"==o.settings.mode?o.settings.maxSlides*o.settings.slideWidth+(o.settings.maxSlides-1)*o.settings.slideMargin:o.settings.slideWidth),t},u=function(){var t=o.settings.slideWidth,e=o.viewport.width();return 0==o.settings.slideWidth||o.settings.slideWidth>e&&!o.carousel||"vertical"==o.settings.mode?t=e:o.settings.maxSlides>1&&"horizontal"==o.settings.mode&&(e>o.maxThreshold||e<o.minThreshold&&(t=(e-o.settings.slideMargin*(o.settings.minSlides-1))/o.settings.minSlides)),t},f=function(){var t=1;if("horizontal"==o.settings.mode&&o.settings.slideWidth>0)if(o.viewport.width()<o.minThreshold)t=o.settings.minSlides;else if(o.viewport.width()>o.maxThreshold)t=o.settings.maxSlides;else{var e=o.children.first().width();t=Math.floor(o.viewport.width()/e)}else"vertical"==o.settings.mode&&(t=o.settings.minSlides);return t},x=function(){var t=0;if(o.settings.moveSlides>0)if(o.settings.infiniteLoop)t=o.children.length/m();else for(var e=0,i=0;e<o.children.length;)++t,e=i+f(),i+=o.settings.moveSlides<=f()?o.settings.moveSlides:f();else t=Math.ceil(o.children.length/f());return t},m=function(){return o.settings.moveSlides>0&&o.settings.moveSlides<=f()?o.settings.moveSlides:f()},S=function(){if(o.children.length>o.settings.maxSlides&&o.active.last&&!o.settings.infiniteLoop){if("horizontal"==o.settings.mode){var t=o.children.last(),e=t.position();b(-(e.left-(o.viewport.width()-t.width())),"reset",0)}else if("vertical"==o.settings.mode){var i=o.children.length-o.settings.minSlides,e=o.children.eq(i).position();b(-e.top,"reset",0)}}else{var e=o.children.eq(o.active.index*m()).position();o.active.index==x()-1&&(o.active.last=!0),void 0!=e&&("horizontal"==o.settings.mode?b(-e.left,"reset",0):"vertical"==o.settings.mode&&b(-e.top,"reset",0))}},b=function(t,e,i,s){if(o.usingCSS){var n="vertical"==o.settings.mode?"translate3d(0, "+t+"px, 0)":"translate3d("+t+"px, 0, 0)";r.css("-"+o.cssPrefix+"-transition-duration",i/1e3+"s"),"slide"==e?(r.css(o.animProp,n),r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),D()})):"reset"==e?r.css(o.animProp,n):"ticker"==e&&(r.css("-"+o.cssPrefix+"-transition-timing-function","linear"),r.css(o.animProp,n),r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),b(s.resetValue,"reset",0),N()}))}else{var a={};a[o.animProp]=t,"slide"==e?r.animate(a,i,o.settings.easing,function(){D()}):"reset"==e?r.css(o.animProp,t):"ticker"==e&&r.animate(a,speed,"linear",function(){b(s.resetValue,"reset",0),N()})}},w=function(){for(var e="",i=x(),s=0;i>s;s++){var n="";o.settings.buildPager&&t.isFunction(o.settings.buildPager)?(n=o.settings.buildPager(s),o.pagerEl.addClass("bx-custom-pager")):(n=s+1,o.pagerEl.addClass("bx-default-pager")),e+='<div class="bx-pager-item"><a href="" data-slide-index="'+s+'" class="bx-pager-link">'+n+"</a></div>"}o.pagerEl.html(e)},T=function(){o.settings.pagerCustom?o.pagerEl=t(o.settings.pagerCustom):(o.pagerEl=t('<div class="bx-pager" />'),o.settings.pagerSelector?t(o.settings.pagerSelector).html(o.pagerEl):o.controls.el.addClass("bx-has-pager").append(o.pagerEl),w()),o.pagerEl.on("click","a",I)},C=function(){o.controls.next=t('<a class="bx-next" href="">'+o.settings.nextText+"</a>"),o.controls.prev=t('<a class="bx-prev" href="">'+o.settings.prevText+"</a>"),o.controls.next.bind("click",y),o.controls.prev.bind("click",z),o.settings.nextSelector&&t(o.settings.nextSelector).append(o.controls.next),o.settings.prevSelector&&t(o.settings.prevSelector).append(o.controls.prev),o.settings.nextSelector||o.settings.prevSelector||(o.controls.directionEl=t('<div class="bx-controls-direction" />'),o.controls.directionEl.append(o.controls.prev).append(o.controls.next),o.controls.el.addClass("bx-has-controls-direction").append(o.controls.directionEl))},E=function(){o.controls.start=t('<div class="bx-controls-auto-item"><a class="bx-start" href="">'+o.settings.startText+"</a></div>"),o.controls.stop=t('<div class="bx-controls-auto-item"><a class="bx-stop" href="">'+o.settings.stopText+"</a></div>"),o.controls.autoEl=t('<div class="bx-controls-auto" />'),o.controls.autoEl.on("click",".bx-start",k),o.controls.autoEl.on("click",".bx-stop",M),o.settings.autoControlsCombine?o.controls.autoEl.append(o.controls.start):o.controls.autoEl.append(o.controls.start).append(o.controls.stop),o.settings.autoControlsSelector?t(o.settings.autoControlsSelector).html(o.controls.autoEl):o.controls.el.addClass("bx-has-controls-auto").append(o.controls.autoEl),A(o.settings.autoStart?"stop":"start")},P=function(){o.children.each(function(){var e=t(this).find("img:first").attr("title");void 0!=e&&(""+e).length&&t(this).append('<div class="bx-caption"><span>'+e+"</span></div>")})},y=function(t){o.settings.auto&&r.stopAuto(),r.goToNextSlide(),t.preventDefault()},z=function(t){o.settings.auto&&r.stopAuto(),r.goToPrevSlide(),t.preventDefault()},k=function(t){r.startAuto(),t.preventDefault()},M=function(t){r.stopAuto(),t.preventDefault()},I=function(e){o.settings.auto&&r.stopAuto();var i=t(e.currentTarget),s=parseInt(i.attr("data-slide-index"));s!=o.active.index&&r.goToSlide(s),e.preventDefault()},q=function(e){var i=o.children.length;return"short"==o.settings.pagerType?(o.settings.maxSlides>1&&(i=Math.ceil(o.children.length/o.settings.maxSlides)),o.pagerEl.html(e+1+o.settings.pagerShortSeparator+i),void 0):(o.pagerEl.find("a").removeClass("active"),o.pagerEl.each(function(i,s){t(s).find("a").eq(e).addClass("active")}),void 0)},D=function(){if(o.settings.infiniteLoop){var t="";0==o.active.index?t=o.children.eq(0).position():o.active.index==x()-1&&o.carousel?t=o.children.eq((x()-1)*m()).position():o.active.index==o.children.length-1&&(t=o.children.eq(o.children.length-1).position()),t&&("horizontal"==o.settings.mode?b(-t.left,"reset",0):"vertical"==o.settings.mode&&b(-t.top,"reset",0))}o.working=!1,o.settings.onSlideAfter(o.children.eq(o.active.index),o.oldIndex,o.active.index)},A=function(t){o.settings.autoControlsCombine?o.controls.autoEl.html(o.controls[t]):(o.controls.autoEl.find("a").removeClass("active"),o.controls.autoEl.find("a:not(.bx-"+t+")").addClass("active"))},W=function(){1==x()?(o.controls.prev.addClass("disabled"),o.controls.next.addClass("disabled")):!o.settings.infiniteLoop&&o.settings.hideControlOnEnd&&(0==o.active.index?(o.controls.prev.addClass("disabled"),o.controls.next.removeClass("disabled")):o.active.index==x()-1?(o.controls.next.addClass("disabled"),o.controls.prev.removeClass("disabled")):(o.controls.prev.removeClass("disabled"),o.controls.next.removeClass("disabled")))},H=function(){o.settings.autoDelay>0?setTimeout(r.startAuto,o.settings.autoDelay):r.startAuto(),o.settings.autoHover&&r.hover(function(){o.interval&&(r.stopAuto(!0),o.autoPaused=!0)},function(){o.autoPaused&&(r.startAuto(!0),o.autoPaused=null)})},L=function(){var e=0;if("next"==o.settings.autoDirection)r.append(o.children.clone().addClass("bx-clone"));else{r.prepend(o.children.clone().addClass("bx-clone"));var i=o.children.first().position();e="horizontal"==o.settings.mode?-i.left:-i.top}b(e,"reset",0),o.settings.pager=!1,o.settings.controls=!1,o.settings.autoControls=!1,o.settings.tickerHover&&!o.usingCSS&&o.viewport.hover(function(){r.stop()},function(){var e=0;o.children.each(function(){e+="horizontal"==o.settings.mode?t(this).outerWidth(!0):t(this).outerHeight(!0)});var i=o.settings.speed/e,s="horizontal"==o.settings.mode?"left":"top",n=i*(e-Math.abs(parseInt(r.css(s))));N(n)}),N()},N=function(t){speed=t?t:o.settings.speed;var e={left:0,top:0},i={left:0,top:0};"next"==o.settings.autoDirection?e=r.find(".bx-clone").first().position():i=o.children.first().position();var s="horizontal"==o.settings.mode?-e.left:-e.top,n="horizontal"==o.settings.mode?-i.left:-i.top,a={resetValue:n};b(s,"ticker",speed,a)},O=function(){o.touch={start:{x:0,y:0},end:{x:0,y:0}},o.viewport.bind("touchstart",X)},X=function(t){if(o.working)t.preventDefault();else{o.touch.originalPos=r.position();var e=t.originalEvent;o.touch.start.x=e.changedTouches[0].pageX,o.touch.start.y=e.changedTouches[0].pageY,o.viewport.bind("touchmove",Y),o.viewport.bind("touchend",V)}},Y=function(t){var e=t.originalEvent,i=Math.abs(e.changedTouches[0].pageX-o.touch.start.x),s=Math.abs(e.changedTouches[0].pageY-o.touch.start.y);if(3*i>s&&o.settings.preventDefaultSwipeX?t.preventDefault():3*s>i&&o.settings.preventDefaultSwipeY&&t.preventDefault(),"fade"!=o.settings.mode&&o.settings.oneToOneTouch){var n=0;if("horizontal"==o.settings.mode){var r=e.changedTouches[0].pageX-o.touch.start.x;n=o.touch.originalPos.left+r}else{var r=e.changedTouches[0].pageY-o.touch.start.y;n=o.touch.originalPos.top+r}b(n,"reset",0)}},V=function(t){o.viewport.unbind("touchmove",Y);var e=t.originalEvent,i=0;if(o.touch.end.x=e.changedTouches[0].pageX,o.touch.end.y=e.changedTouches[0].pageY,"fade"==o.settings.mode){var s=Math.abs(o.touch.start.x-o.touch.end.x);s>=o.settings.swipeThreshold&&(o.touch.start.x>o.touch.end.x?r.goToNextSlide():r.goToPrevSlide(),r.stopAuto())}else{var s=0;"horizontal"==o.settings.mode?(s=o.touch.end.x-o.touch.start.x,i=o.touch.originalPos.left):(s=o.touch.end.y-o.touch.start.y,i=o.touch.originalPos.top),!o.settings.infiniteLoop&&(0==o.active.index&&s>0||o.active.last&&0>s)?b(i,"reset",200):Math.abs(s)>=o.settings.swipeThreshold?(0>s?r.goToNextSlide():r.goToPrevSlide(),r.stopAuto()):b(i,"reset",200)}o.viewport.unbind("touchend",V)},Z=function(){var e=t(window).width(),i=t(window).height();(a!=e||l!=i)&&(a=e,l=i,r.redrawSlider(),o.settings.onSliderResize.call(r,o.active.index))};return r.goToSlide=function(e,i){if(!o.working&&o.active.index!=e)if(o.working=!0,o.oldIndex=o.active.index,o.active.index=0>e?x()-1:e>=x()?0:e,o.settings.onSlideBefore(o.children.eq(o.active.index),o.oldIndex,o.active.index),"next"==i?o.settings.onSlideNext(o.children.eq(o.active.index),o.oldIndex,o.active.index):"prev"==i&&o.settings.onSlidePrev(o.children.eq(o.active.index),o.oldIndex,o.active.index),o.active.last=o.active.index>=x()-1,o.settings.pager&&q(o.active.index),o.settings.controls&&W(),"fade"==o.settings.mode)o.settings.adaptiveHeight&&o.viewport.height()!=v()&&o.viewport.animate({height:v()},o.settings.adaptiveHeightSpeed),o.children.filter(":visible").fadeOut(o.settings.speed).css({zIndex:0}),o.children.eq(o.active.index).css("zIndex",o.settings.slideZIndex+1).fadeIn(o.settings.speed,function(){t(this).css("zIndex",o.settings.slideZIndex),D()});else{o.settings.adaptiveHeight&&o.viewport.height()!=v()&&o.viewport.animate({height:v()},o.settings.adaptiveHeightSpeed);var s=0,n={left:0,top:0};if(!o.settings.infiniteLoop&&o.carousel&&o.active.last)if("horizontal"==o.settings.mode){var a=o.children.eq(o.children.length-1);n=a.position(),s=o.viewport.width()-a.outerWidth()}else{var l=o.children.length-o.settings.minSlides;n=o.children.eq(l).position()}else if(o.carousel&&o.active.last&&"prev"==i){var d=1==o.settings.moveSlides?o.settings.maxSlides-m():(x()-1)*m()-(o.children.length-o.settings.maxSlides),a=r.children(".bx-clone").eq(d);n=a.position()}else if("next"==i&&0==o.active.index)n=r.find("> .bx-clone").eq(o.settings.maxSlides).position(),o.active.last=!1;else if(e>=0){var c=e*m();n=o.children.eq(c).position()}if("undefined"!=typeof n){var g="horizontal"==o.settings.mode?-(n.left-s):-n.top;b(g,"slide",o.settings.speed)}}},r.goToNextSlide=function(){if(o.settings.infiniteLoop||!o.active.last){var t=parseInt(o.active.index)+1;r.goToSlide(t,"next")}},r.goToPrevSlide=function(){if(o.settings.infiniteLoop||0!=o.active.index){var t=parseInt(o.active.index)-1;r.goToSlide(t,"prev")}},r.startAuto=function(t){o.interval||(o.interval=setInterval(function(){"next"==o.settings.autoDirection?r.goToNextSlide():r.goToPrevSlide()},o.settings.pause),o.settings.autoControls&&1!=t&&A("stop"))},r.stopAuto=function(t){o.interval&&(clearInterval(o.interval),o.interval=null,o.settings.autoControls&&1!=t&&A("start"))},r.getCurrentSlide=function(){return o.active.index},r.getCurrentSlideElement=function(){return o.children.eq(o.active.index)},r.getSlideCount=function(){return o.children.length},r.redrawSlider=function(){o.children.add(r.find(".bx-clone")).outerWidth(u()),o.viewport.css("height",v()),o.settings.ticker||S(),o.active.last&&(o.active.index=x()-1),o.active.index>=x()&&(o.active.last=!0),o.settings.pager&&!o.settings.pagerCustom&&(w(),q(o.active.index))},r.destroySlider=function(){o.initialized&&(o.initialized=!1,t(".bx-clone",this).remove(),o.children.each(function(){void 0!=t(this).data("origStyle")?t(this).attr("style",t(this).data("origStyle")):t(this).removeAttr("style")}),void 0!=t(this).data("origStyle")?this.attr("style",t(this).data("origStyle")):t(this).removeAttr("style"),t(this).unwrap().unwrap(),o.controls.el&&o.controls.el.remove(),o.controls.next&&o.controls.next.remove(),o.controls.prev&&o.controls.prev.remove(),o.pagerEl&&o.settings.controls&&o.pagerEl.remove(),t(".bx-caption",this).remove(),o.controls.autoEl&&o.controls.autoEl.remove(),clearInterval(o.interval),o.settings.responsive&&t(window).unbind("resize",Z))},r.reloadSlider=function(t){void 0!=t&&(n=t),r.destroySlider(),d()},d(),this}}(jQuery);

/*
 HTML5 Shiv v3.6.2pre | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
 Uncompressed source: https://github.com/aFarkas/html5shiv
*/
(function(l,f){function m(){var a=e.elements;return"string"==typeof a?a.split(" "):a}function i(a){var b=n[a[o]];b||(b={},h++,a[o]=h,n[h]=b);return b}function p(a,b,c){b||(b=f);if(g)return b.createElement(a);c||(c=i(b));b=c.cache[a]?c.cache[a].cloneNode():r.test(a)?(c.cache[a]=c.createElem(a)).cloneNode():c.createElem(a);return b.canHaveChildren&&!s.test(a)?c.frag.appendChild(b):b}function t(a,b){if(!b.cache)b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag();
a.createElement=function(c){return!e.shivMethods?b.createElem(c):p(c,a,b)};a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/\w+/g,function(a){b.createElem(a);b.frag.createElement(a);return'c("'+a+'")'})+");return n}")(e,b.frag)}function q(a){a||(a=f);var b=i(a);if(e.shivCSS&&!j&&!b.hasCSS){var c,d=a;c=d.createElement("p");d=d.getElementsByTagName("head")[0]||d.documentElement;c.innerHTML="x<style>article,aside,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}</style>";
c=d.insertBefore(c.lastChild,d.firstChild);b.hasCSS=!!c}g||t(a,b);return a}var k=l.html5||{},s=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,r=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,j,o="_html5shiv",h=0,n={},g;(function(){try{var a=f.createElement("a");a.innerHTML="<xyz></xyz>";j="hidden"in a;var b;if(!(b=1==a.childNodes.length)){f.createElement("a");var c=f.createDocumentFragment();b="undefined"==typeof c.cloneNode||
"undefined"==typeof c.createDocumentFragment||"undefined"==typeof c.createElement}g=b}catch(d){g=j=!0}})();var e={elements:k.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup main mark meter nav output progress section summary time video",version:"3.6.2pre",shivCSS:!1!==k.shivCSS,supportsUnknownElements:g,shivMethods:!1!==k.shivMethods,type:"default",shivDocument:q,createElement:p,createDocumentFragment:function(a,b){a||(a=f);if(g)return a.createDocumentFragment();
for(var b=b||i(a),c=b.frag.cloneNode(),d=0,e=m(),h=e.length;d<h;d++)c.createElement(e[d]);return c}};l.html5=e;q(f)})(this,document);
