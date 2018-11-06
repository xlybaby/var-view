var StringUtil = (function ($) {
	
	var pub = {
		isEmpty: function (str) {
			if(typeof(str)=="undefined" || ""+str =="undefined"  || str == null) {
				return true;
			}
			var t = $.trim(str);
			if(t == "" || t == "null" || t == "undefined") {
				return true; 
			}
			return false;
        }
    } 
    return pub;    
})(window.jQuery);

function changPointer(obj) {
	obj.style.cursor="pointer";
}

var _visibleWindowHeight = $(window).height(); //浏览器时下窗口可视区域高度
var _documentHeight = $(document).height(); //浏览器时下窗口文档的高度
var _bodyHeight = $(document.body).height();//浏览器时下窗口文档body的高度
var _bodyOuterHeight = $(document.body).outerHeight(true);//浏览器时下窗口文档body的总高度 包括border padding margin
var _visibleWindowWidth = $(window).width(); //浏览器时下窗口可视区域宽度
var _documentWidth = $(document).width();//浏览器时下窗口文档对于象宽度
var _bodyWidth = $(document.body).width();//浏览器时下窗口文档body的高度
var _bodyOuterWidth = $(document.body).outerWidth(true);//浏览器时下窗口文档body的总宽度 包括border padding margin
  
function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}
function guid() {
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

//var _visibleWindowHeight = $(document).scrollTop(); //获取滚动条到顶部的垂直高度
//var _visibleWindowHeight = $(document).scrollLeft(); //获取滚动条到左边的垂直宽度
function resize(sDrag, container, resizable) {
	interact(sDrag).resizable({
		// resize from all edges and corners
		edges : {
			left : resizable.hasOwnProperty("edge-left")?resizable["edge-left"] : true,
			right : resizable.hasOwnProperty("edge-right")?resizable["edge-right"] : true,
			bottom : resizable.hasOwnProperty("edge-bottom")?resizable["edge-bottom"] : true,
			top : resizable.hasOwnProperty("edge-top")?resizable["edge-top"] : true
		},

		// keep the edges inside the parent
		restrictEdges : {
			outer : container,
			endOnly : true,
		},

		// minimum size
		restrictSize : {
			min : {
				width : resizable["min-width"] || 100,
				height : resizable["min-height"] || 50
			},
		},

		inertia : true,
	}).on('resizemove',
			function(event) {
				var target = event.target, x = (parseFloat(target
						.getAttribute('data-x')) || 0), y = (parseFloat(target
						.getAttribute('data-y')) || 0);
				var rect = figureRect(".uc-canvas-container");
				
				// update the element's style
				//target.style.width = event.rect.width + 'px';
				//target.style.height = event.rect.height + 'px';
				target.style.width  = (Math.round(event.rect.width/rect["width"]*10000)/100)+"%";
				target.style.height = (Math.round(event.rect.height/rect["height"]*10000)/100)+"%";
				//console.log("current target's width/parent's is "+(Math.round(event.rect.width/rect["width"]*10000)/100)+"%");
				//console.log("current target's height/parent's is "+(Math.round(event.rect.height/rect["height"]*10000)/100)+"%");
				
				// translate when resizing from top or left edges
				x += event.deltaRect.left;
				y += event.deltaRect.top;

				target.style.webkitTransform = target.style.transform = 'translate('
						+ x + 'px,' + y + 'px)';

				target.setAttribute('data-x', x);
				target.setAttribute('data-y', y);
				/*target.textContent = Math.round(event.rect.width)
						+ '\u00D7' + Math.round(event.rect.height);*/
			});
}

function draggabilly(sDrag, container, onMove, onEnd, resizable, restrict) {
	// target elements with the "draggable" class
	onMoveListener = dragMoveListener;
	onEndListener = dragMoveEndListener;
	if (onMove)
		onMoveListener = onMove;
	if (onEnd)
		onEndListener = onEnd;
	
	var dragobj = interact(sDrag).draggable({
		// enable inertial throwing
		inertia : true,
		// keep the element within the area of it's parent
		restrict : restrict,
		/*
		 {
						restriction : container,
						endOnly : true,
						elementRect : {
							top : 0,
							left : 0,
							bottom : 1,
							right : 1
						}
					}
					*/
		// enable autoScroll
		autoScroll : true,

		// call this function on every dragmove event
		onmove : onMoveListener,
		// call this function on every dragend event
		onend : onEndListener
	});

	if ( resizable["able"] || false) {
		resize( sDrag, container, resizable );
	}
	function dragMoveListener(event) {
		//console.log("drag moving...");
		var target = event.target,
		
		// keep the dragged position in the data-x/data-y attributes
		x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx, 
		y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

		// translate the element
		target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

		// update the posiion attributes
		target.setAttribute('data-x', x);
		target.setAttribute('data-y', y);
	}
	function dragMoveEndListener(event) {
		console.log('moved a distance of '
				+ (Math.sqrt(Math.pow(event.pageX - event.x0, 2)
						+ Math.pow(event.pageY - event.y0, 2) | 0)).toFixed(2)
				+ 'px');
		
		/*
		var textEl = event.target.querySelector('p');

		textEl && (textEl.textContent =
		  'moved a distance of '
		  + (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
		               Math.pow(event.pageY - event.y0, 2) | 0))
		      .toFixed(2) + 'px');
		 */
	}
	// this is used later in the resizing and gesture demos
	// window.dragMoveListener = dragMoveListener;
}

function getUrlParam(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");     
    var r=window.location.search.substr(1).match(reg);
    if(r!=null)
    		return unescape(r[2]);
    return null;
}

function figureRect(select) {
	var rect = {};
	rect["offsetX"] = $(select).offset().left;
	rect["offsetY"] = $(select).offset().top;
	rect["positionX"] = $(select).position().left;
	rect["positionY"] = $(select).position().top;
	
	rect["width"] = $(select).width();
	rect["height"] = $(select).height();
	
	rect["outerHeight"] = $(select).outerHeight();
	rect["outerWidth"] = $(select).outerWidth();

	rect["wholeHeight"] = $(select).outerHeight(true);
	rect["wholeWidth"] = $(select).outerWidth(true);

	return rect;
}
function wheel(event) {
    var delta = 0;
    if (!event) /* For IE. */
        event = window.event;
    if (event.wheelDelta) { /* IE/Opera. */
        delta = event.wheelDelta / 120;
    } else if (event.detail) { /* Mozilla. */
        delta = -event.detail / 3;
    }
    if (delta) wheelHandle(delta);
    if (event.preventDefault)
        event.preventDefault();
    event.returnValue = false;
}
function wheelHandle(delta) {
    if (delta < 0) {
        console.log("鼠标滑轮向下滚动：" + delta + "次！"); // 1
        return;
    } else {
        console.log("鼠标滑轮向上滚动：" + delta + "次！"); // -1
        return;
    }
}
function mainInit(){     
	if (window.screen) {              
		var myw = screen.availWidth;   
		var myh = screen.availHeight;  
		window.moveTo(0, 0);           
		window.resizeTo(myw, myh);
    }
	/*
	document.body.parentNode.style.overflowY = "hidden";
	$("body").parent().css("overflow-y","hidden");
	if (window.addEventListener) {
	    // DOMMouseScroll is for mozilla. 
	    window.addEventListener('DOMMouseScroll', wheel, false);
	}
	// IE/Opera. 
	window.onmousewheel = document.onmousewheel = wheel;
	*/
	
	/*
	$(window).resize(function() {
	    alert('pp');
	  });
	
	$(".m-page").css("height", $(window).height());
	*/
	
	$("#signin").on("mouseover",function(){
		this.style.cursor="pointer";
		img = $("#signintop");
		if (img)
			img.addClass("m-title-sign-anim");
		
	});
	
	$("#signin").on("mouseout",function(){
		img = $("#signintop");
		if (img)
			img.removeClass("m-title-sign-anim");
		
	});
}