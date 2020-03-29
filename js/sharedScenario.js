function overColumn(event) {
	var target=event.target;
	var parent = $(target).parent(".view-col");
	parent.css("box-shadow", "0 0 8px #222222");
}

function populateData(data, type) { 
	
}

var reciever = (function ($) {
	var pub = {
		openPageView:function(page) {
			invokeRedirect(page);
		},
		addFavorite:function(body,callback) {
			invokeRrequest( "/var/action/find/addF", callback,  body);
		}
        fetchSharedScenarios: function (keywords, type, num,callback) {
            try{
            	var body={keywords:keywords,type:type,num:num};
             //invokeRrequest( "/var/action/find/getShared", callback,  body);
            	
            	//for test only:
            	var data={"items":[{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"}]};
            	callback(data);
            }catch(e){
	            	console.log(e);
	            	return false;
            }
            return true;
        },
        fetchUserScenarios: function (keywords, type, num) {
            try{
            }catch(e){
	            	console.log(e);
	            	return false;
            }
            return true;
        }
    } 
    return pub;    
})(window.jQuery);

(function ($){
	$.documentRoot = function(type){
		var _type = "global";
		var num = 20;
		
		if( !StringUtil.isEmpty(type) ) {
			_type = type;
		};
		var populate = function(data){
			var items = data["items"];
			var container = $(".main-container");
			var row = container.children(".view-row:last");
			var re = row.children(".view-col-wide").length;
			for(var i=0;i<items.length;i++) {
				if(re%4==0){
					row = $("<div class='view-row'></div>");
					container.append(row);
				}
				var item = new $.itemBlock(items[i]);
				row.append(item);
				re++;
			}
			var mpage = $(".m-page");
			var mHeight = mpage.find(".page-main-div").height();
			var searchBoxH = $(".shared-search-box").outerHeight();
			var bottomH =  $(".shared-scroll-hint").outerHeight();
			var titleH =  mpage.find(".m-title").outerHeight();
			
			var row = container.children(".view-row");
			var rows = row.length;
			var height = mGetIntValue(row.css("height"),245);
			if( (mHeight-searchBoxH-bottomH) < (rows*(20+height)) )
				mpage.css("height", (rows*(20+height)+searchBoxH+bottomH+40)+"px");
		};
		
		this.retrieve = function(){
			var keywords = $(".shared-search-box").find("#global-search-input").val();
			if(StringUtil.isEmpty(keywords)) keywords="";
			var category = $(".shared-search-box").find(".search-type").attr("c");
			if(_type==="global") {
				reciever.fetchSharedScenarios(keywords,category,num,populate);
			} else if(_type==="user") {
				reciever.fetchUserScenarios(keywords,category,num,populate);
			}
		};
		
	};
	
	$.itemBlock = function(data){
		var _data = data;
		var template = '<div class="view-col-wide">'+
									'<div class="view-col-img">'+
									'	<img src="" style="width: 100%;" />'+
									'</div>'+
									'<div class="view-col-txt">'+
									'		<div class="view-col-txt-left">'+
									'		<svg class="uc-float-icon add-favorite" style=" font-size: 1em; font-weight: 400;color: #c83c23;" aria-hidden="true">		'+		    				
									'			<use xlink:href="#icon-shoucang"></use>'+
									'		</svg>'+
									'		<svg class="uc-float-icon" style=" font-size: 1.17em; font-weight: 400;color: #efefef;" aria-hidden="true">		'+		    				
									'			<use xlink:href="#icon-tuijian1"></use>'+
									'		</svg>'+
									'		<svg class="uc-float-icon" style=" font-size: 1.17em; font-weight: 400;color: #efefef;" aria-hidden="true">	'+			    				
									'			<use xlink:href="#icon-jubao3"></use>'+
									'		</svg>'+
									'	</div>'+
									'	<div class="view-col-txt-right">'+
									'		<span class="view-col-label">By&nbsp;</span>'+
									'		<span class="view-col-label author"></span>'+
									'	</div>'+
										
									'</div>'+
									'<div class="view-col-mask"></div>'+
									'</div>';
		var templateM = '<div class="view-col-wide">'+
										'<div class="view-col-img">'+
										'	<div style="width: 100%; height: auto;">'+
											'<img src="" style="width:32px;height:32px;float:left;"/>'+
										'	<span class="uc-text cn_material_label"><p></p></span>'+
											'</div>'+
										'</div>'+
										'<div class="view-col-txt">'+
										'		<div class="view-col-txt-left">'+
										'		<svg class="uc-float-icon add-favorite" style=" font-size: 1em; font-weight: 400;color: #c83c23;" aria-hidden="true">		'+		    				
										'			<use xlink:href="#icon-shoucang"></use>'+
										'		</svg>'+
										'		<svg class="uc-float-icon" style=" font-size: 1.17em; font-weight: 400;color: #efefef;" aria-hidden="true">		'+		    				
										'			<use xlink:href="#icon-tuijian1"></use>'+
										'		</svg>'+
										'		<svg class="uc-float-icon" style=" font-size: 1.17em; font-weight: 400;color: #efefef;" aria-hidden="true">	'+			    				
										'			<use xlink:href="#icon-jubao3"></use>'+
										'		</svg>'+
										'	</div>'+
										'	<div class="view-col-txt-right">'+
										'		<span class="view-col-label">By&nbsp;</span>'+
										'		<span class="view-col-label author"></span>'+
										'	</div>'+
											
										'</div>'+
										'<div class="view-col-mask"></div>'+
										'</div>';
		var comp;
		
		var addF = function(){
			console.log("add this to user favorite...");
			var body={};
			body["itemId"] = _data["itemId"];
			reciever.addFavorite(body);
		};
		this.append = function(parent){
			if(_data["type"] == "template") {
				comp = $(template);
				comp.find(".view-col-img").children("img").attr("src", _data["src"]);
				comp.find(".view-col-img").click(function(event){
					event.stopPropagation();
					reciever.openPageView("/var/view/singleton/pageView?itemid="+_data["itemId"]);
				});
			} else if(_data["type"] == "material") {
				comp = $(templateM);
				comp.find(".view-col-img").children("img").attr("src", _data["favicon"]);
				comp.find(".view-col-img").children("p").text(_data["description"]);
				comp.find(".view-col-img").click(function(event){
					event.stopPropagation();
					reciever.openPageView("/var/view/singleton/materialView?itemid="+_data["itemId"]);
				});
			} 
			comp.find(".view-col-label.author").text(data["author"]);
			
			comp.find(".add-favorite").click(function(event){
				event.stopPropagation();
				addF();
			});
			comp.find(".add-favorite").on({
				mouseover:function(event){
					event.stopPropagation();
					event.target.style.cursor="pointer";
				}
			});
			
			parent.append(comp);
		}
		
	};
	
})(window.jQuery);

$(document).ready(function(){ 
	mainInit();
	var iniRowNum = 40;
	var root = new $.documentRoot();
//	var mpage = $(".m-page");
//	
//	var rowHeight = 360;
//	var container = $(".main-container");
//	console.log("container height: "+container.height());
//	console.log("mpage height: "+mpage.height());
//	var iniRowNum = Math.ceil(container.height()/rowHeight);
//	//alert(iniRowNum);
//	//var mpageinitheight = iniRowNum*(360+20)+65*2+70;
//	var long = iniRowNum*(360+20) - container.height() + 100;
//	console.log("init row large: "+long);
//	mpage.css("height", (mpage.height()+long)+"px");
//	console.log("new mpage height: "+mpage.css("height"));
//	
	$("#global-search-input").keypress(function(e) {
		　　if (e.ctrlKey && e.which == 13)
					root.retrieve();
		});
	$("#search-type-none").click(function(e) {
		　　event.stopPropagation();
			var target = $(e.target);
			var div = target.parents("div");
			div.children("a").toggleClass("search-type search-type-none");
		});	
	$(window).scroll(function () {
		var a = $("#shared-scroll-hint-recv").offset().top;
        console.log(a);
        console.log($(window).scrollTop());
        console.log($(window).height());
        if (a >= $(window).scrollTop() && a < ($(window).scrollTop() + $(window).height())) {
            console.log("div在可视范围");
        }
	});
	
	root.retrieve();
	
});