$(".content_products .productItemBlocos .prod-info-cb").each(function(k, v){
	if($(".prod-info-cb-price", this).text() == "")
	{
		$(".prod-info-cb-price", this).remove();
		$(this).parents(".productItemBlocos").removeClass("info-price");
	}

	if($(".prod-info-cb-pv-price", this).text() == "")
	{
		$(".prod-info-cb-pv-price", this).remove();
		$(this).parents(".productItemBlocos").removeClass("info-pv-price");
	}

	if($(".prod-info-cb-disc-price", this).text() == "")
	{
		$(".prod-info-cb-disc-price", this).remove();
		$(this).parents(".productItemBlocos").removeClass("info-disc-price");
	}
});

$(document).ready(function(){
	$(".content_blocks_tabs").find("a").click(function(){
		if($(this).parent().hasClass("active"))
			return;

		$(this).parents(".content_blocks_tabs_ul").find(".content_blocks_tabs_li.active").removeClass("active");
		$(this).parent().addClass("active");

		var _index = $(this).parent().index();

		$(this).parents(".wrapper-banner").find(".content_products .content_tab").hide();
		$($(this).parents(".wrapper-banner").find(".content_products .content_tab")[_index]).css("display", "table");
	});

	$(".htmlTable.absolute").each(function(){
		if($(this).height() < $(this).parent().height())
			$(this).height($(this).parent().height())
	});

	if($(".wrapper-banner.blog").length > 0)
		$(".wrapper-banner.blog .item-title").ellipsis({type: 'lines',count: 2});

	IE_ajusts();

	setTimeout(function(){
		IE_ajusts();
		createSliders();
	}, 500);

	printInstagram();
});

function createSliders() {
	var options =  {
		autoplay: true,
		infinite: true,
		variableWidth: false,
		adaptiveHeight: false,
		pauseOnHover: true,
		autoplaySpeed: 3000,
		speed: isMobileDevice() ? 400 : 1300,
		draggable: isMobileDevice() ? true : false,
		dots: false,
		arrows: isMobileDevice() ? false : true,
		height: 200
	}

	$(".container-slider-blocos .sliderBlocos").each(function(k, v){
		var template 	= parseInt($(this).attr("template"));
		var autoSlide 	= parseInt($(this).attr("autoSlide"));
		var indexSlide 	= parseInt($(this).attr("indexSlide"));
		var heightSlide = $(this).parents(".container-slider-blocos").height();

		if(heightSlide > 0)
			$(".uni_slider", this).height(heightSlide);
		
		options.autoplay = (autoSlide == 0) ? false : true;

		window['slider_' + indexSlide + template] = $(this).addClass("loaded").slick(options);

		window['slider_' + indexSlide + template].on('beforeChange', function(event, slick, currentSlide, nextSlide){
		  var _parent = $(slick.$slider).parents("._frame");
		  
		  if($(".pagers_multiImagens", _parent).length == 0)
		  {
		  	return false;
		  }

		  var lis = $(".pagers_multiImagens", _parent).children();
		  $(".pagers_multiImagens li.active", _parent).removeClass("active");
		  $(lis[nextSlide]).addClass("active");
		});

		IE_ajusts();
	});

	$(".pagers_multiImagens li a").click(function(ev){
		ev.preventDefault();
		var _parent = $(this).parent();
		var _index = $(this).parent().index();
		var indexSlide = $(this).parents("ul").attr("indexSlide");
		var template = $(this).parents("ul").attr("template");

		$("li.active", $(this).parents(".pagers_multiImagens")).removeClass("active");
		_parent.addClass("active");
		
		if(typeof window['slider_' + indexSlide + template])
		{
			window['slider_' + indexSlide + template].slick("slickGoTo", _index);
		}
		
	});

	$(".playpausevideo").click(function(){
		var parent = $(this).parents(".container-video-mp4");
		var video = parent.find("video")[0];
		if(video.paused)
		{
			parent.find("video").css("opacity", 1);
			parent.find(".primary_image").remove();
			$(".playpausevideo", parent).addClass("iconPause");
			video.play();
		}
		else
		{
			$(".playpausevideo", parent).removeClass("iconPause");
			video.pause();
		}
		
	});
}

/* Youtube Videos */
var YTiframeReady = false;
if($(".container-blocks .YoutubePlayer").length > 0)
{
	var tag = document.createElement('script');
	tag.src = "//www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	setTimeout(function(){
		if(!YTiframeReady) { onYouTubeIframeAPIReady(); }
	}, 500);
}

function onYouTubeIframeAPIReady() {
	if(typeof YT == "undefined") {
		return false;
	}

	YTiframeReady = true;
	
	onYouTubeBLIframeAPIReady();

	if(typeof productYouTubeVideo == "function")
		productYouTubeVideo();
}

function onYouTubeBLIframeAPIReady() {
	$(".container-blocks .YoutubePlayer").each(function(){
		var template 	= $(this).attr("template");
		var videoID 	= $(this).attr("videoID");
		var auto_play 	= $(this).attr("auto_play");
		var auto_repeat = $(this).attr("auto_repeat");

		window['YT_video_' + template] = new YT.Player($(this)[0], {
			height: '100%',
			width: 	'100%',
			videoId: videoID,
			playerVars : {
				autoplay : auto_play,
				loop : auto_repeat,
				showinfo : 0,
				controls : 1,
				rel: 0,
				modestbranding: 1
			},
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onStateChange
			}
		});
	});
}

function onPlayerReady(state) {
	var auto_play = 1;
	if(state.target.a)
		auto_play = $(state.target.a).attr("auto_play");

	if(auto_play == 1)
		state.target.mute();
}

function onStateChange(state) {
  if (state.data === YT.PlayerState.ENDED) {
  	var auto_repeat = 1;
	if(state.target.a)
		auto_repeat = $(state.target.a).attr("auto_repeat");

	if(auto_repeat == 1)
    	state.target.playVideo();
  }
}

function printInstagram() {
	$(".wrapper-banner.banner28").each(function(k, v){
		var element = $(this);
		var token = element.attr("hash");
		var Instaimages = element.find(".Instaimage");

		if(element.attr("hash") != "")
		{
			var num_photos = 6;

			$.ajax({
		      url: 'https://api.instagram.com/v1/users/self/media/recent',
		      dataType: 'jsonp',
		      type: 'GET',
		      data: {access_token: token, count: num_photos},
		      success: function(data){
		      	if(!data.data)
		      		return;

		      	var total = data.data.length;
		      	
		      	$(".instagramImages", element).css("background", "none");

		         for( x in data.data ){

		         	var HTML  = '<a href="'+data.data[x].link+'" class="instagramLink" target="_blank">';
		         		HTML += '	<div class="instagramImageCover" style="background-image: url(\''+data.data[x].images.low_resolution.url+'\')"><img src="'+sysimageLocation+'/1_1.png" class="cover_image" alt="'+data.data[x].id+'_cover" /></div>';
		         		//HTML += '	<img src="" class="primary_image cover" alt="'+data.data[x].id+'" />';
		         		HTML += '	<div class="icon-instagram"></div>';
		         		HTML += '</a>';

		         	$(Instaimages[x]).append(HTML);

		            if(x == total - 1)
		            {
		            	element.attr("hash", "");
		            }

		         }
		      }
		   });
		}
	});
}

function IE_ajusts() {
	if(document.documentMode || window.navigator.userAgent.indexOf("Edge") > -1)
	{

		setTimeout(function(){
			setTimeout(function(){
				$(".container-video").each(function(){
					$(this).height($(this).parent().height());
				});

				$(".htmlTable").each(function(){
					$(this).height($(this).parent().height());
				});

				$(".htmlTable .contentHTML_TEXT").each(function(){
					$(this).height($(this).parent().height());
				});

				$(".htmlTable .contentHTML_TEXT_CONTENT").each(function(){
					$(this).height($(this).parent().height());
				});
			}, 500);
		}, 200);

		if(document.documentMode < 11)
		{
			$(".wrapper-banner.banner37 table tr td .box-images").each(function(){
				if($(this).parent().height() > $(this).height())
					$(this).height($(this).parent().height());
			});
			
			$(".wrapper-banner.banner16 .dis_table .dis_cell .box-images").each(function(){
				$(this).css("height", $(".cover_image", this).height());
			});

			$(".wrapper-banner.banner37 .dis_table .dis_cell table").each(function(){
				$(this).css("height", $(this).parent().height());
			});

			$(".wrapper-banner.banner37 ._frame").each(function(){
				if($(".cover_image", this).height() != $(this).height())
					$(this).height($(".cover_image", this).height() - 1)

				$(this).parent().height($(this).height())
			});

			$(".wrapper-banner.banner33 .dis_table .dis_cell .box-images").each(function(){
				$(this).css("height", $(this).parent().height());
			});

			$(".wrapper-banner.banner35 .dis_table .dis_cell .box-images").each(function(){
				$(this).css("height", $(this).parent().height());
			});
		}
	}
}

/**
 * Ellipsis Plugin - Blog
 * @Project     Ellipsis plugin
 * @Description jquery plugin that excerpt the text at dedecated lines or
 *              dedicated number of chars
 *
 * @Author      Mohamed Hassan
 * @Author_url  http://mohamedhassan.me
 * @License     MIT
 */
function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_createClass=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}();!function(t,e,i,n){"use strict";var s="ellipsis",o={type:"lines",count:3},r={namespace:"ellispsis",initialize:"initialize.ellipsis",initialized:"initialized.ellipsis",update:"update.ellipsis",updated:"updated.ellipsis",excerpt:"excerpt.ellipsis",excerpted:"excerpted.ellipsis"},l=function(){function i(e){var s=arguments.length>1&&arguments[1]!==n?arguments[1]:{};_classCallCheck(this,i),this.element=t(e),this.options=Object.assign({},i.DEFAULTS,s),this.text=this.element.text(),this._resizeTimeout=null,this._resizeHandler=this._updateOnResize.bind(this),this.init()}return _createClass(i,[{key:"init",value:function(){this.element.trigger(r.initialize),this.element.trigger(r.excerpt),"lines"===this.options.type?this._excerptLines(this.options.count):this._excerptChars(this.options.count),"lines"===this.options.type&&t(e).on("resize",this.element.selector,this._resizeHandler),this.element.trigger(r.initialized)}},{key:"update",value:function(){return this.element.trigger(r.update),"lines"===this.options.type?this._excerptLines(this.options.count):this._excerptChars(this.options.count),this.element.trigger(r.updated),!0}},{key:"reset",value:function(t){t.text&&(this.text=t.text),t.type&&(this.options.type=t.type),t.count&&(this.options.count=t.count),Object.keys(t).length>0&&(this.element.text(this.text),this.update())}},{key:"destroy",value:function(){t(e).off("resize",this._resizeHandler),this.element.text(this.text),this.element.off(r.namespace)}},{key:"_excerptChars",value:function(t){return t<=0?new Error("Number of chars to be shown is equal to or less than zero !!"):t>=this.text.length?null:(this.element.html(this.text.slice(0,t)+"..."),this.element.trigger(r.excerpted),!0)}},{key:"_excerptLines",value:function(t){var e=void 0,i=this.element.text(this.text).height(),n=void 0,s=0,o=this.text.length-1,l=void 0;if(e=this.element.text("w").height(),n=e*t,i<=n)return this.element.text(this.text),!1;for(;s<=o;)l=Math.floor((s+o)/2),this.element.text(this.text.slice(0,l)),this.element.height()<=n?s=l+1:o=l-1;return this.element.text(this.text.slice(0,l-3)+"..."),this.element.trigger(r.excerpted),!0}},{key:"_updateOnResize",value:function(){var t=this;clearTimeout(this._resizeTimeout),this._resizeTimeout=setTimeout(function(){t.update()},300)}}],[{key:"DEFAULTS",get:function(){return Object.freeze(o)}}]),i}();t.fn[s]=function(e){var i=arguments;if(e===n||"object"===("undefined"==typeof e?"undefined":_typeof(e)))return this.each(function(){t.data(this,"plugin_"+s)||t.data(this,"plugin_"+s,new l(this,e))});if("string"==typeof e&&"_"!==e[0]&&"init"!==e){var o;return this.each(function(){var n=t.data(this,"plugin_"+s);n instanceof l&&"function"==typeof n[e]&&(o=n[e].apply(n,Array.prototype.slice.call(i,1))),"destroy"===e&&t.data(this,"plugin_"+s,null)}),o!==n?o:this}},t(i).ready(function(){var e=t('[data-toggle="ellipsis"]');e.each(function(e,i){var s=t(i),o={};s.data("type")!==n&&(o.type=s.data("type")),s.data("count")!==n&&(o.count=s.data("count")),s.ellipsis(o)})})}(jQuery,window,document);