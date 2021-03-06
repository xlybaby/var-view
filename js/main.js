var _varInvoker = (function ($){
	$.varInvoker = function(args){
		var map = {"uc":{"material":{"uri":"/d/uc/fetchMaterialByType"}}};
		this.request = function(module, method, core){
			
		}
		this.invoke = function(uri, entity, callback, method, contentType, dt) {
			if( StringUtil.isEmpty(uri) ) {
	        		console.log("Invalid uri");
	        		return;
	        	}
			$.ajax({
		        type: method?method:"POST",
		        url: uri,
		        data: JSON.stringify(entity),
		        dataType: dt?dt:"json",
		        contentType: contentType?contentType:"application/json; charset=utf-8",
		        success: function(data){
						        	var msg = data["retMsg"];
						        	if( !StringUtil.isEmpty(msg) ) {
						        		alert(msg);
						        		return;
						        	}
						        	var result = data["retData"];
						        	if(callback) callback(result);
		        },
		        error: function(XMLHttpRequest, textStatus, errorThrown){
		            console.log(XMLHttpRequest, textStatus, errorThrown);
		         }
		    });
		};
		
	};
	return new $.varInvoker();
})(window.jQuery);


function randomize(from, end){   
    if(!from && from!=0 || !end){return null;}   
    return Math.floor( ( Math.random() * end ) + from );   
} 
function commonAlert(msg) {
	alert(msg);
}
function commonConfirm(msg, ok, cancel) {
	return confirm(msg, ok?ok:"ok", cancel?cancel:"cancel");
}
function checkFieldUrl(event) {
	var target = $(event.target);
	var pattern = new RegExp("(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]");
	//var reg = /(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/;
	if( target.val() && !pattern.exec(target.val()) ) {
		commonAlert("This value is invalid!");
		target.val("");
		target.focus();
		return false;
	}
	return true;
}
function checkFieldNumber(event) {
	var target = $(event.target);
	var reg = /[^0-9]/;
	
	if( target.val() && target.val().match(reg) ) {
		commonAlert("This value is invalid!");
		target.val("");
		target.focus();
		return false;
	}
		
	return true;
}

function popupDiv(target, div) {
	target.on({
		mouseover: function(event) {
			event.stopPropagation();
			event.target.style.cursor="pointer";
			
			$("body").append(div);
			div.css({
                    "top": (event.pageY + 10) + "px",
                    "position": "absolute",
                    "left": (event.pageX + 20) + "px"
                }).show("fast");
		}, 
		mouseout: function(event) {
			div.remove();
		}
	});
}

function checkOnKeyDown(event, codesAry) {
	event.stopPropagation();
	var key = event.keyCode;
	if( key == 8 || key == 9 || key == 13 || key == 37 || key == 39 )
		return true;
	
	for(var i=0;i<codesAry.length;i++){
		var min = codesAry[i]["min"];
		var max = codesAry[i]["max"];
		if( key>=min && key <=max )
			return true;
	}
	return false;
}

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
        },
        getValue: function (str,ret) {
			if(typeof(str)=="undefined" || ""+str =="undefined"  || str == null) {
				return ret?ret:"";
			}
			var t = $.trim(str);
			if(t == "" || t == "null" || t == "undefined") {
				return ret?ret:""; 
			}
			return str;
        }
    } 
    return pub;    
})(window.jQuery);

function mGetStringValue(str, d) {
	if( StringUtil.isEmpty(str) ) return d;
	if( str.trim().toLowerCase() === "none" ) return d;
	return str;
}

function mGetIntValue(str, d) {
	if( StringUtil.isEmpty(str) ) return d;
	var v= str.match(/-?\d+/);
	if(v.length>0) return v[0]-0;
	return d;
}

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
	var callback = resizable.hasOwnProperty("callback")?resizable["callback"] : null;
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
				var target = event.target;
				
				/*
				 * ,x = (parseFloat(target
						.getAttribute('data-x')) || 0), y = (parseFloat(target
								.getAttribute('data-y')) || 0)
						
				var rect = figureRect(".uc-canvas-container");
				var sid = $(target).attr("scenarioId");
				var editPanel = $(".uc-edit-panel-layouts[currentSceId='"+sid+"']");
				var widthUnit = editPanel.find(".uc-input-block-table-row[id='uc_scenario_width']").find(".uc-radio-box[selected='selected']").attr("value");
				var heightUnit = editPanel.find(".uc-input-block-table-row[id='uc_scenario_height']").find(".uc-radio-box[selected='selected']").attr("value");
				
				// update the element's style
				//target.style.width = event.rect.width + 'px';
				//target.style.height = event.rect.height + 'px';
				var widthPer  = (Math.round(event.rect.width/rect["width"]*10000)/100);
				var heightPer = (Math.round(event.rect.height/rect["height"]*10000)/100);
				
				if( widthUnit === "absolute" )
					target.style.width  = event.rect.width + 'px';
				else if( widthUnit === "percent" )
					target.style.width  = widthPer + "%";
				
				if( heightUnit === "absolute" )
					target.style.height  = event.rect.height + 'px';
				else if( heightUnit === "percent" )
					target.style.height  = heightPer + "%";
				
				editPanel.find(".basic-info").find("#sceFixedWidth-val").val(event.rect.width);
				editPanel.find(".basic-info").find("#scePerWidth-val").val(widthPer);
				editPanel.find(".basic-info").find("#sceFixedHeight-val").val(event.rect.height);
				editPanel.find(".basic-info").find("#scePerHeight-val").val(heightPer);
				
				//console.log("current target's width/parent's is "+(Math.round(event.rect.width/rect["width"]*10000)/100)+"%");
				//console.log("current target's height/parent's is "+(Math.round(event.rect.height/rect["height"]*10000)/100)+"%");
				
				
				// translate when resizing from top or left edges
				x += event.deltaRect.left;
				y += event.deltaRect.top;

				//target.style.webkitTransform = target.style.transform = 'translate('+ x + 'px,' + y + 'px)';
				target.style.left = x + 'px';
				target.style.top = y + 'px';
				
				target.setAttribute('data-x', x);
				target.setAttribute('data-y', y);
				*/
				target.style.width  = event.rect.width + 'px';
				target.style.height  = event.rect.height + 'px';
				
				if(callback) callback(event);
				/*target.textContent = Math.round(event.rect.width)
						+ '\u00D7' + Math.round(event.rect.height);*/
			});
}

function getDisplayInfo(){ 
   var s = "";   
    s += " 网页可见区域宽："+ document.body.clientWidth+"\n";    
    s += " 网页可见区域高："+ document.body.clientHeight+"\n";    
    s += " 网页可见区域宽："+ document.body.offsetWidth + " (包括边线和滚动条的宽)"+"\n";    
    s += " 网页可见区域高："+ document.body.offsetHeight + " (包括边线的宽)"+"\n";    
    s += " 网页正文全文宽："+ document.body.scrollWidth+"\n";    
    s += " 网页正文全文高："+ document.body.scrollHeight+"\n";    
    s += " 网页被卷去的高(ff)："+ document.body.scrollTop+"\n";    
    s += " 网页被卷去的高(ie)："+ document.documentElement.scrollTop+"\n";    
    s += " 网页被卷去的左："+ document.body.scrollLeft+"\n";    
    s += " 网页正文部分上："+ window.screenTop+"\n";    
    s += " 网页正文部分左："+ window.screenLeft+"\n";    
    s += " 屏幕分辨率的高："+ window.screen.height+"\n";    
    s += " 屏幕分辨率的宽："+ window.screen.width+"\n";    
    s += " 屏幕可用工作区高度："+ window.screen.availHeight+"\n";    
    s += " 屏幕可用工作区宽度："+ window.screen.availWidth+"\n";    
    s += " 你的屏幕设置是 "+ window.screen.colorDepth +" 位彩色"+"\n";    
    s += " 你的屏幕设置 "+ window.screen.deviceXDPI +" 像素/英寸"+"\n";    
    alert (s);
  }
function makeupCheckBox(target, callback) {
	target.on({
		click: function(event){
			event.stopPropagation();
			var target = $(event.target);
			if( !target.hasClass("uc-check-box") )
				target = target.parents(".uc-check-box");
			var box = target.children(".uc-float-icon-checkbox-sel,.uc-float-icon-checkbox-nosel");
			box.toggleClass("uc-float-icon-checkbox-sel uc-float-icon-checkbox-nosel zoomIn zoomOut uc-zindex-nag");
			//target.toggleClass("uc-float-icon-radio-nosel uc-float-icon-radio-sel zoomIn zoomOut uc-zindex-nag");
			var cur =  target.children(".uc-float-icon-checkbox-sel");
			target.attr("value", cur.attr("value"));
			
			if(callback) {
				try {
					callback(target.attr("value"));
				} catch(err){
				     console.log(err);
				}
			}
				
		},
		mouseover: function(event) {
			event.stopPropagation();
			event.target.style.cursor="pointer";
		}
	});
}
function makeupRadioBox(target, callback) {
	target.find(".uc-float-icon-radio-sel,.uc-float-icon-radio-nosel").on({
		click: function(event){
			event.stopPropagation();
			var clicktag = event.target.tagName;
			if(clicktag.toLowerCase()==="svg")
				var target = $(event.target);
			else if(clicktag.toLowerCase()==="use")
				var target = $(event.target).parent("svg");
			else
				return false;     
			
			var cursel = target.parents(".uc-radio-box");
			if( cursel.attr("selected") === "selected" )
				return;
			var parent = target.parents(".uc-input-block-table-row");
			var lastsel = parent.find(".uc-radio-box[selected='selected']");
			
			cursel.attr("selected", "selected");
			lastsel.removeAttr("selected");
			lastsel.children(".uc-float-icon").toggleClass("uc-float-icon-radio-nosel uc-float-icon-radio-sel flipInX flipOutX uc-zindex-nag");
			cursel.children(".uc-float-icon").toggleClass("uc-float-icon-radio-nosel uc-float-icon-radio-sel flipInX flipOutX uc-zindex-nag");
		
			if(callback) {
				try {
					callback(cursel.attr("value"));
				} catch(err){
				     console.log(err);
				}
			}
		},
		mouseover: function(event) {
			event.stopPropagation();
			event.target.style.cursor="pointer";
		}
	});
}
function makeupColorPicker(target, init, change, alpha, input, empty) {
	
	target.spectrum({
	    color: init,
	    showAlpha: alpha?true:false,
	    showInput: input?true:false,
	    allowEmpty: empty?true:false,
	    change: change
	});
}

function makeupSlider(target, min, max, start, callback) {
	noUiSlider.create(target, {
	    start: [start],
	    range: {
	        'min': [min],
	        'max': [max]
	    }
	});
	target.noUiSlider.on("update", 
			function (values, handle, unencoded, tap, positions) {
		if (handle === 0) {
			var val = parseInt(values[handle]);
			
			if( callback ) {
				try {
					callback(val);
				} catch(err){
				     console.log(err);
				}
			}
		}
	});
}

function draggabilly(sDrag, container, onMove, onEnd, resizable, restrict, snap) {
	// target elements with the "draggable" class
	onMoveListener = function(event){
		dragMoveListener(event);
		if (onMove) onMove(event);
	};
	onEndListener = function(event){
		dragMoveEndListener(event);
		if (onEnd) onEnd(event);
	};
	
	var dragobj = interact(sDrag).draggable({
		// enable inertial throwing
		inertia : true,
		// keep the element within the area of it's parent
		//restrict : restrict,
		
		snap : snap,
	    
		restrict : restrict,
					
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
		//target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
		target.style.left = x + 'px';
		target.style.top = y + 'px';
				
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
