var containerOverflowXBoxNum={};
var containerOverflowYBoxNum={};

function cloneDiv(sDiv, type){
	c=$("#"+sDiv).clone(true);
	var cid = sDiv+"_"+guid();
	//var bgcolors=["#0073e6","#00e6ac","#e60073","#e67300","#333333","#669900"];
	c.css('display','flex');
	c.attr('id',cid);
	c.attr('sType',type);

	
	//var x = bgcolors.length-1;     
	//var y = 0; 
	//c.css('background-color', bgcolors[parseInt(Math.random() * (x - y + 1) + y)]);
	c.css('background-image','url(/var/images/uc/uc_bg_'+type+'.svg)');
	c.css('background-position','50% 75%');
	c.css('background-size','45% 45%');
	/*－
	draggable=c.children(sDrag);
	var $draggable = draggable.draggabilly({
		containment: '.uc-canvasM'
	})
	console.log(c);*/
	c.on({
		mousedown:function(event){showmask(event,true);},
		//mouseup:function(event){toolbarclick(event,false);}
	});
	draggabilly("#"+cid,".uc-canvas-container", 
				function (event) {
					var target = $(event.target).children(".uc_t_boxD")[0],
					// keep the dragged position in the data-x/data-y attributes
					x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx, 
					y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
					
					// translate the element
					target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
					
					// update the posiion attributes
					target.setAttribute('data-x', x);
					target.setAttribute('data-y', y);
				}, 
				function(event){
					var container = $(".uc-canvas-container");
					var rect = figureRect(".uc-canvas-container");
					
					var target = event.target;
					var targetId = $(target).attr("id");
					var draggable = $(target).children(".uc_t_boxD")[0];
					//var transformed= draggable.style.transform;
					var datax= parseFloat($(draggable).attr("data-x") || 0);
					var datay= parseFloat($(draggable).attr("data-y") || 0);
					
					var moveddatax=  (parseFloat(target.getAttribute('data-x')) || 0)+datax;
					var moveddatay=  (parseFloat(target.getAttribute('data-y')) || 0)+datay;
					
					//console.log("target moved x:"+moveddatax+",target moved y:"+moveddatay+", target's whole width is "+(moveddatax+$(target).width()));
					//console.log("container position x:"+rect["positionX"]+",container position y:"+rect["positionY"]);
					//console.log("container width:"+rect["width"]+",container height:"+rect["height"]);
					
					if(moveddatax<0) {
						moveddatax = 0;
					}
					if(moveddatay<0){
						moveddatay=0;
					}
					
					target.style.webkitTransform = target.style.transform = 'translate(' + moveddatax + 'px, ' + moveddatay + 'px)';
					// update the posiion attributes
					target.setAttribute('data-x', moveddatax);
					target.setAttribute('data-y', moveddatay);

					// restore draggable's position
					draggable.style.webkitTransform = draggable.style.transform = 'translate(0px, 0px)';
					draggable.setAttribute('data-x', 0);
					draggable.setAttribute('data-y', 0);
					
				}, { "able": true, 
					"edge-left": true,
					"edge-right": true,
					"edge-top": false,
					"edge-bottom": true,
					"min-width": 100,
					"min-height": 50
					}, null);
	//resize(sDiv, ".uc-canvasM");
	$(".uc-canvas-container").append(c);
	return c;
}

function addTemplate(aTemp) {
	switch(aTemp)
	{
	    case 1://corpus
	    	cloneDiv("uc_box_temp","corpus");
	        break;
	    case 2://ranker
	    	cloneDiv("uc_box_temp","ranker");
	        break;
	    case 3://subscriber
	    	cloneDiv("uc_box_temp","subscriber");
	        break;
	    case 4://timeseries
	    	cloneDiv("uc_box_temp","timeseries");
	        break;
	    case 5://banner
	    	cloneDiv("uc_box_temp","banner");
	        break;    
	    default:
	        break;
	}
}

function showmask(event, down) {
	var target = event.target;
	var draggable = $(target).children(".uc_t_boxD");
	
	if( down ){
		draggable.css("display","flex");
		draggable.on({
			mouseup:function(event){
				this.style.display="none";
				$(this).unbind();
			}
		});
	}else{
		draggable.css("display","none");

	}
}

function toolbarClick(type) {
	
}

function showColorPicker(event,id) {
	console.log("show color of "+id);
	document.getElementById(id).jscolor.show();
}

function populateFloatMenu() {
	var menus = $(".uc-float-menu-one");
	var typemenus = $(".uc-float-menu-type");
	for(var i=0;i<typemenus.length;i++) {
		var typemenu = typemenus[i];
		typemenu.style.left = "3px";
		typemenu.style.top = "3px";//Math.round(parseFloat((startTop+padding)/container.height())*10000) / 100 + "%";
		//padding+=10;
		//startTop+=55;
	}
	
	var fmenu = $(".uc-float-menu");

	var menuTotHeight = menus.length * parseInt(menus.css("height")) + (menus.length-1) * 10;
	fmenu.css("height", (menuTotHeight+10)+"px");
	fmenu.css("min-height", menuTotHeight+"px");
	
	var container = $(".uc-canvasM");
	var startTop = parseFloat((container.height() - (menuTotHeight+10))/2);
	fmenu.css("left", "10px");
	fmenu.css("top", Math.round(parseFloat(startTop/container.height())*10000) / 100 + "%");
	
	var padding = 10;
	for(var i=0;i<menus.length;i++) {
		var menu = menus[i];
		menu.style.left = "0px";
		menu.style.top = (padding*i+parseInt(menus.css("height"))*i)+"px";//Math.round(parseFloat((startTop+padding)/container.height())*10000) / 100 + "%";
		//padding+=10;
		//startTop+=55;
		menu.setAttribute("originalY",menu.style.top);
	}
	fmenu.attr("direction-x","left");
}

function deleteInputBlock(event) {
	var tag = $(event.target);
	var block = tag.parents(".uc-edit-comp-r-editor-input-block");
	block.remove();
}

function changePageComponentEditor(event) {
	var target = $(event.target);
	if(event.target.tagName.toUpperCase()==="USE")
		target = $(event.target).parent("svg");
	
	if(target.attr("modify")==="current")
		return;
	var root = target.parents(".uc-edit-components");
	
	var targetIdx = target.index();
	console.log("page "+targetIdx);
	var current = target.siblings("svg[modify='current']");
	current.css("font-size","28px");
	current.css("color","#cfcfcf");
	current.attr("modify","none");
	
	target.css("font-size","31px");
	target.css("color","rgb(149, 69, 138)");
	target.attr("modify","current");
	
	var editor = root.find(".uc-edit-comp-r-editor");
	var pageIdx = targetIdx/2;
	var currentIdx = current.index()/2;
	
	var currentCon = editor.children(".uc-edit-comp-r-editor-con[page='"+currentIdx+"']");
	currentCon.hide();
	
	var newCon = editor.children(".uc-edit-comp-r-editor-con[page='"+pageIdx+"']");
	if( newCon.length <= 0 ) {	
		newCon = currentCon.clone(true);
		newCon.attr("page",pageIdx);
		discardPageComponents(newCon);
		editor.append(newCon);
	} 
	newCon.show();
}

function discardPageComponents(pageCon) {
	var page = parseInt(pageCon.attr("page"));
	//if( page > 0 ){
		var root = pageCon.parents(".uc-edit-components");
		var cons = root.find(".uc-edit-comp-r-editor-con");
		if( cons.length > (page+1) ) {
			bootbox.confirm("This page has linked pages, discard this page will also discard all linked pages.Do you want to continue?", function(result) {
                console.log("Discard confirm " + result);
            });
		}
	//}
	var comps = pageCon.find(".uc-edit-components-selector");
	for( var i=0; i<comps.length; i++ ) {
		var inputs = comps.find("input[type='text']");
		inputs.val('');
		var switchs = comps.find(".switch-on");
		//switchs.trigger("click");
		for(var si=0;si<switchs.length;si++)
			honeySwitch.showOff(switchs[si]);
	}
	
	var customers = pageCon.find(".uc-edit-comp-add-attr-area");
	var customerBodys = customers.find(".uc-edit-comp-r-editor-input-body");
	customerBodys.empty();
	customerBodys.append($('<div class="uc-edit-comp-r-editor-input-block">'+
							'	<div style="display: flex; width: 90%; height: 100%;">'+
							'	<div class="uc-edit-comp-r-editor-input-title"'+
							'		style="width: 85px;">'+
							'		<input type="text" placeholder="Attr Name" class="input_text_hint" />'+
							'	</div>'+
							'	<div class="uc-edit-comp-r-editor-input">'+
							'		<input type="text" placeholder="    input value here"'+
							'			class="input_text_hint" />'+
							'	</div>'+
							'	<div class="uc-edit-comp-r-editor-input-opr">'+
									
							'		<svg class="icon" onmouseover="this.style.cursor=\'pointer\';" onclick="deleteInputBlock(event);" style="font-size: 20px; color: #000000;"'+
							'			aria-hidden="true">'+
							'							<use xlink:href="#icon-jianhao"></use>'+
							'							</svg>'+
					
							'	</div>'+
							'</div>'+
						'</div>'));
	
	var firstNav = pageCon.find(".uc-edit-comp-nav-bar").eq(0);
	firstNav.trigger('click');
	
	
}

$(document).ready(function(){ 
	mainInit();
	
	$(".uc-sample-template-icon").on("click",function(){
		temp = $(".uc-template-sample");
		if (temp.hasClass("uc-template-sample-slideDownRight")){
			temp.removeClass("uc-template-sample-slideDownRight");
			temp.addClass("uc-template-sample-slideUpRight");
	
		} else if(temp.hasClass("uc-template-sample-slideUpRight")) {
			temp.removeClass("uc-template-sample-slideUpRight");
			temp.addClass("uc-template-sample-slideDownRight");
			
		} else {
			temp.addClass("uc-template-sample-slideDownRight");
		}
	});
	
	/*
	$(".uc_t_tool_bar").on({
		//mousedown:function(event){toolbarclick(event,true);},
		//mouseup:function(event){toolbarclick(event,false);},
		
		mouseover:function(event){event.target.style.filter="alpha(opacity:100)";event.target.style.opacity="1";},  
	    mouseout:function(event){
//	    	var child = $(event.target).children("[onIcon=true]")[0];
//	    	console.log(child);
//	    	if( !child ) {
//	    		event.target.style.filter="alpha(opacity:0)";
//	    		event.target.style.opacity="0";
//	    	}
	    	var x = event.pageX;
	        var y = event.pageY; 
	        var target = $(event.target);
	    	//var icons = $(event.target).children(".icon");
	        var y1 = target.offset().top;  //div上面两个的点的y值
	        var y2 = y1 + target.height();//div下面两个点的y值
	        var x1 = target.offset().left;  //div左边两个的点的x值
	        var x2 = x1 + target.width();  //div右边两个点的x的值
	        //console.log("pageX: "+x+", pageY: "+y);
	        //console.log("tool bar rect[ ("+x1+","+y1+") ("+x2+","+y2+") ]");
	        if( x < x1 || x > x2 || y < y1 || y > y2) {
	        	event.target.style.filter="alpha(opacity:0)";
	    		event.target.style.opacity="0";
	        }
	    }
	});*/
	
	$(".uc-float-menu-item-mask").on({
			//mousedown:function(event){toolbarclick(event,true);},
			//mouseup:function(event){toolbarclick(event,false);},
			click: function(event){
				var name = $(event.target).attr("name");
				if( name === "menuAddSce" ) {
					cloneDiv("uc_box_temp","unknown");
				}
			},
			mouseover:function(event){
				event.target.style.cursor="pointer";
				//console.log(event.target);
				
				var icon = $(event.target).siblings(".uc-float-menu-item-icon");
				var block = $(event.target).siblings(".uc-float-menu-block").children(".uc-float-menu-block-c");
				icon.animate({left:"0px"},500,"linear");
				block.animate({left:"0px"},500,"linear");

				event.stopPropagation();    //标准   
		        event.cancelBubble = true;  //IE  
			},  
		    mouseout:function(event){
		    	var icon = $(event.target).siblings(".uc-float-menu-item-icon");
				var block = $(event.target).siblings(".uc-float-menu-block").children(".uc-float-menu-block-c");
				var blockw = 0-block.width();
				//console.log("current block's width: "+blockw);
				icon.animate({left:blockw+"px"},500,"linear");
				block.animate({left:"-100%"},500,"linear");
				
		    	event.stopPropagation();    //标准   
		        event.cancelBubble = true;  //IE 
		    }
		});
	
	$(document).on('click',':not(.uc-edit-panel-layout)',function(){
        $(".uc-edit-panel-layout").hide();
        return;
    });
	
	$(document).on('click',':not(.uc-float-icon-input)',function(){
        $(".uc-float-icon-input").hide();
        return;
    });
	
//	$(document).on('click','.uc-edit-components',function(event){
//        $(event.target).hide();
//        $(".overlay").hide();
//        return;
//    });
	$(".uc_edit_components_cancel").on({
		mouseover:function(event){
    		event.target.style.cursor="pointer";
    		event.stopPropagation();
    	},
    	click:function(event){
    		event.stopPropagation();
    		$(event.target).parents(".uc-edit-components").hide();
            $(".overlay").hide();
    	}
	});
	
    $(".uc-float-icon.icon-lajitong").on({
    	mouseover:function(event){
    		event.target.style.cursor="pointer";
    		event.stopPropagation();
    	},
    	click:function(event){
    		var clicktag = event.target.tagName;
			if(clicktag==="svg")
				var tag = $(event.target);
			else if(clicktag==="use")
				var tag = $(event.target).parent("svg");
			else
				return false;
			var box=tag.parents(".uc_t_box");
			if( box.length > 0 ){
				box.remove();
			}
    		event.stopPropagation();
    	}
    });
    
	$(".uc-float-icon-mask").on({
		//mousedown:function(event){toolbarclick(event,true);},
		//mouseup:function(event){toolbarclick(event,false);},
		
		mouseover:function(event){
			event.target.style.cursor="pointer";
			//$("#in_bgcolor").trigger("mousedown");
			
			var box = $(event.target).parents(".uc_t_box");
			var icon = $(event.target).parent(".uc-float-icon-con");
			var input = $(event.target).siblings(".uc-float-icon-input");
			console.log(box);
			console.log(icon);
			console.log(input);
			
			var iconrect = figureRect(icon[0]);
			
			var cinput = box.children("#cinput_"+$(event.target).attr("id"));
			if( cinput.length <= 0 )
				cinput = input.clone(true);
			
			
			var cinputW = (box.width()-iconrect["width"]) > 250 ? 250 : (box.width()-iconrect["width"]);
			var inputID = "cinput_"+$(event.target).attr("id");
			var cp = cinput.children("#cp-flat");
			cp.attr("id",inputID);
			cp.spectrum({
			    color: "#e67300"
			});
			
			cinput.css("height", iconrect["height"]+"px");
			cinput.css("width", cinputW+"px");
			cinput.css("left", (iconrect["positionX"]+iconrect["width"])+"px");
			cinput.css("top", iconrect["positionY"]+"px");
			cinput.css("display", "flex");
			cinput.attr("id","cinput_"+$(event.target).attr("id"));
			//cinput.html('<input id="in_bgcolor" style="width: 100%; height: 100%; border: 0px solid #ffffff;" class="jscolor" value="#ffffff">');
//			cinput.on({
//				mouseout:function(event){
//					var box = $(event.target).parents(".uc_t_box");
//					var input = box.children("#"+inputID);
//					input.css("display","none");
//					event.stopPropagation();    //标准   
//			        event.cancelBubble = true;  //IE 
//				}
//			});
			
			console.log("cinput height: "+iconrect["height"]+"px");
			console.log("cinput width: "+cinputW+"px");
			console.log("cinput left: "+(iconrect["positionX"]+iconrect["width"])+"px");
			console.log("cinput top: "+iconrect["positionY"]+"px");
			
			box.append(cinput);
			
			//cinput.animate({width:cinputW+"px"},500,"linear");
			
			//event.target.setAttribute('onIcon', true);
			event.stopPropagation();    //标准   
	        event.cancelBubble = true;  //IE  
		},  
	    mouseout:function(event){
	    	var id = $(event.target).attr("id");
			var box = $(event.target).parents(".uc_t_box");
			
			
	        
			var input = box.children("#cinput_"+id);
			var inputID = "#cinput_"+id;
			if( input.length > 0 ) {
				var x = event.pageX;
		        var y = event.pageY; 
		    	//var icons = $(event.target).children(".icon");
		        var y1 = input.offset().top;  //div上面两个的点的y值
		        var y2 = y1 + input.height();//div下面两个点的y值
		        var x1 = input.offset().left;  //div左边两个的点的x值
		        var x2 = x1 + input.width();  //div右边两个点的x的值
		        console.log("pageX: "+x+", pageY: "+y);
		        console.log("tool bar rect[ ("+x1+","+y1+") ("+x2+","+y2+") ]");
		        if( x < x1 || x > x2 || y < y1 || y > y2) {
		        	//input.animate({width:"0px"},500,"linear", function(){
		        		//box.remove(inputID);
		        	//	input.css("display","none");
		        	//});
					//input.animate({display:"none"},500,"linear");
		        	input.css("display","none");
		        }
		        
			}
	    	event.stopPropagation();    //标准   
	        event.cancelBubble = true;  //IE 
	    }
	});
	
	$(".icon.editManually").on({
		click: function(event){
			var clicktag = event.target.tagName;
			if(clicktag==="svg")
				var tag = $(event.target).children("use");
			else if(clicktag==="use")
				var tag = $(event.target);
			else
				return false;
			
			var overlay = $(".overlay");
			overlay.css("display","block");
			overlay.on({
				click: function(event){
					$(event.target).hide();
					var compEditor = $(".page-main-div").find(".uc-edit-components[status='modify']");
					compEditor.hide();
					compEditor.attr("status","hide");
				}
			});
			var main = $(".page-main-div");
			var box = tag.parents(".uc_t_box");
			var scenarioId = box.attr("scenarioId");
			var compEditor = $(".uc-edit-components[scenarioId='"+scenarioId+"']");
			if(compEditor.length <= 0){
				compEditor = $(".uc-edit-components[id='_temp']").clone(true);
				compEditor.attr("scenarioId",scenarioId);
				main.append(compEditor);
			}
			var compEditorRight=compEditor.children(".uc-edit-comp-l");
			compEditorRight.css("display","none");
			
			compEditor.css("display","flex");
			compEditor.attr("status","modify");
			
		},
		mouseover:function(event){
			event.target.style.cursor="pointer";
			
			//event.target.setAttribute('onIcon', true);
			//event.stopPropagation();    //标准   
	        //event.cancelBubble = true;  //IE  
		}
	});
	
	$(".icon.editCompInfo").on({
		click: function(event){
			var clicktag = event.target.tagName;
			if(clicktag==="svg")
				var tag = $(event.target).children("use");
			else if(clicktag==="use")
				var tag = $(event.target);
			else
				return false;
			
			var overlay = $(".overlay");
			overlay.css("display","block");
			overlay.on({
				click: function(event){
					$(event.target).hide();
					var compEditor = $(".page-main-div").find(".uc-edit-components[status='modify']");
					compEditor.hide();
					compEditor.attr("status","hide");
				}
			});
			var main = $(".page-main-div");
			var box = tag.parents(".uc_t_box");
			var scenarioId = box.attr("scenarioId");
			var compEditor = $(".uc-edit-components[scenarioId='"+scenarioId+"']");
			if(compEditor.length <= 0){
				compEditor = $(".uc-edit-components[id='_temp']").clone(true);
				compEditor.attr("scenarioId",scenarioId);
				main.append(compEditor);
			}
			var compEditorRight=compEditor.children(".uc-edit-comp-l");
			compEditorRight.css("display","flex");
			
			compEditor.css("display","flex");
			compEditor.attr("status","modify");
			
		},
		mouseover:function(event){
			event.target.style.cursor="pointer";
			
			//event.target.setAttribute('onIcon', true);
			//event.stopPropagation();    //标准   
	        //event.cancelBubble = true;  //IE  
		}
	});
	
	$(".icon.editCommonInfo").on({
		click: function(event){
			var clicktag = event.target.tagName;
			if(clicktag==="svg")
				var tag = $(event.target).children("use");
			else if(clicktag==="use")
				var tag = $(event.target);
			else
				return false;
			
			var panel = $(".uc-edit-panel");
			var topBtn = panel.children(".uc-edit-panel-top");
			var botBtn = panel.children(".uc-edit-panel-bot");
			topBtn.on({
				click: function(event){
					var mid = panel.children(".uc-edit-panel-mid");
					var main = mid.children(".uc-edit-panel-main");
					
					var ph = panel.height();
					var mh = mid.height();
					var x = main.position().left;
					var y = main.position().top;
					
					if(y>=0)
						return;
					
					var movey = (y+100)>=0?0:(y+100);
					main.animate({top:movey+"px"},500,"linear");
				}
			});
			botBtn.on({
				click: function(event){
					var mid = panel.children(".uc-edit-panel-mid");
					var main = mid.children(".uc-edit-panel-main");

					var ph = panel.height();
					var mh = mid.height();
					var x = main.position().left;
					var y = main.position().top;
					
					var blocks = main.children(".uc-edit-panel-block");
					var totalHeight = 0;
					for(var i=0;i<blocks.length;i++){
						totalHeight+=$(blocks[i]).outerHeight(true);
						console.log($(blocks[i]).attr("class")+": "+$(blocks[i]).outerHeight(true));
					}
					console.log("Total height: "+totalHeight);
					if(totalHeight<=Math.abs(y)+mh)
						return;
					
					var movey = Math.abs(y-100)+mh<totalHeight?(y-100):(mh-totalHeight);
					var scaley = Math.abs(movey) + main.height();
					main.animate({top:movey+"px",height:scaley+"px"},500,"linear");
	
				}
			});
			
			var panelMid = panel.children(".uc-edit-panel-mid");
			
			var box = tag.parents(".uc_t_box");
			var scenarioId = box.attr("scenarioId");
			var editPanel = $(".uc-edit-panel-layouts[scenarioId='"+scenarioId+"']");
			if( editPanel.length <= 0 ) {
				//invokeGet( "/var/subview/uc/scenarioEditPanel", function(data){
				//	console.log(data);
				//});
				var panelMain = $(".uc-edit-panel-layouts[id='temp']").clone(true);
				panelMain.attr("scenarioId", scenarioId);
				panelMain.css("display","flex");
				//panelMain.hide();
				//panel.append(panelMain);
				//panelMain.addClass("fadeInRight animated delay-1s");
				panelMid.append(panelMain);
				
				var bgColorPicker = panelMain.find("#in_bgcolor_box");
				var fgColorPicker = panelMain.find("#in_fgcolor_box");
				var rangeSlider = panelMain.find("#in_borderRadius");
				var delaySpinner = panelMain.find("#in_auto_delay");
				
				var shadowBox = panelMain.find("div[id^='shadow-style']");
				shadowBox.on({
					click: function(event){
						var lastSelected = panelMain.find("div[id^='shadow-style'] [selected='selected']");
						if(lastSelected.length>0) {
							lastSelected.children("svg").css("display","none");
							lastSelected.attr("selected","none");
						}
						
						var selected = $(event.target).children("svg");
						selected.css("display","block");
						$(event.target).attr("selected","selected");
					}
				});
				var delayBtn = panelMain.find("div[id^='in_delay_']");
				delayBtn.on({
					click: function(event){
						event.stopPropagation();
						var clicktag = event.target.tagName;
						if(clicktag.toUpperCase()==="SPAN")
							var tag = $(event.target).parent("div");
						else 
							var tag = $(event.target);
						
						var lastSelected = panelMain.find("div[id^='in_delay_'][selected='selected']");
						if(lastSelected.length>0) {
							//lastSelected.children("svg").css("display","none");
							lastSelected.css("border","0px solid #888888");
							lastSelected.attr("selected","none");
						}
						
						///var selected = $(event.target).children("svg");
						//selected.css("display","block");
						tag.attr("selected","selected");
						tag.css("border","1px solid #888888");
					}
				});
				var borderBox = panelMain.find("svg[id^='border-style']");
				borderBox.on({
					click: function(event){
						var id = $(event.target).attr("id");
						if( id === "border-style-top" ) {
							var borderstyle = panelMain.find("#in-border-style");
							if( borderstyle.css("border-top").indexOf("dashed") >= 0 ){
								borderstyle.css("border-top","2px solid #888888");
								
							} else {
								borderstyle.css("border-top","1px dashed #888888");
							}
						} else if( id === "border-style-right" ) {
							var borderstyle = panelMain.find("#in-border-style");
							if( borderstyle.css("border-right").indexOf("dashed") >= 0 ){
								borderstyle.css("border-right","2px solid #888888");
							} else {
								borderstyle.css("border-right","1px dashed #888888");
							}
						} else if( id === "border-style-bottom" ) {
							var borderstyle = panelMain.find("#in-border-style");
							if( borderstyle.css("border-bottom").indexOf("dashed") >= 0 ){
								borderstyle.css("border-bottom","2px solid #888888");
							} else {
								borderstyle.css("border-bottom","1px dashed #888888");
							}
						} else if( id === "border-style-left" ) {
							var borderstyle = panelMain.find("#in-border-style");
							if( borderstyle.css("border-left").indexOf("dashed") >= 0 ){
								borderstyle.css("border-left","2px solid #888888");
							} else {
								borderstyle.css("border-left","1px dashed #888888");
							}
						}
					}
				});
				
				console.log(bgColorPicker);
				bgColorPicker.spectrum({
				    color: "#333333"
				});
				fgColorPicker.spectrum({
				    color: "#ffffff"
				});
				
				console.log(rangeSlider);
				noUiSlider.create(rangeSlider[0], {
				    start: [0],
				    range: {
				        'min': [0],
				        'max': [20]
				    }
				});
				rangeSlider[0].noUiSlider.on("update", 
						function (values, handle, unencoded, tap, positions) {
					if (handle === 0) {
						var rv = panelMain.find("#border-radius-val");
						rv.css("border-radius",parseInt(values[handle])+"px");
						rv.html(parseInt(values[handle]));
						console.log(values[handle]);
					}
				});
				
				
				console.log(delaySpinner);
				delaySpinner.spinner();
				
				var paddingLeft = panelMain.find("#sp-padding-left");
				paddingLeft.spinner();
				var paddingLeftVal = panelMain.find("#sp-padding-left-val");
				paddingLeftVal.spinner("changing",function(e, newVal, oldVal){
					paddingLeftVal.val(newVal);
				});
				
				var paddingRight = panelMain.find("#sp-padding-right");
				paddingRight.spinner();
				var paddingRightVal = panelMain.find("#sp-padding-right-val");
				paddingRightVal.spinner("changing",function(e, newVal, oldVal){
					paddingRightVal.val(newVal);
				});
				
				var paddingTop = panelMain.find("#sp-padding-top");
				paddingTop.spinner();
				var paddingTopVal = panelMain.find("#sp-padding-top-val");
				paddingTopVal.spinner("changing",function(e, newVal, oldVal){
					paddingTopVal.val(newVal);
				});
				
				var paddingDown = panelMain.find("#sp-padding-down");
				paddingDown.spinner();
				var paddingDownVal = panelMain.find("#sp-padding-down-val");
				paddingDownVal.spinner("changing",function(e, newVal, oldVal){
					paddingDownVal.val(newVal);
				});
			}
//			var rect = figureRect(".uc-populate-container");
//			console.log("uc-populate-container's width: " + rect["width"] + ", 30percent: " + (rect["width"]*0.3)+", min-width is 400px.");
//			var mw=400;
//			if( (rect["width"] * 0.3) > mw ) {
//				mw=rect["width"] * 0.3;
//			}
			
			//var blocks = $(".uc-edit-panel-main");
			if (panel.hasClass("uc-PanelInRight")){
				var panelMain = panel.children(".uc-edit-panel-mid").children(".uc-edit-panel-layouts");
				panelMain.removeClass("fadeInRight animated delay-1s");
				panelMain.addClass("fadeOutRight animated");
				
				panel.removeClass("uc-PanelInRight animated delay-1s");
				panel.addClass("uc-PanelOutRight animated delay-1s");
				
				//panel.css("min-width","initial");
				//panel.animate({width:"55px",minWidth:"0px"},500,"linear");
				//blocks.animate({display: "none"},500,"linear");
				//blocks.css("display","none");
				//panel.css("display","none");
			} else if(panel.hasClass("uc-PanelOutRight")) {
				var panelMain = panel.children(".uc-edit-panel-mid").children(".uc-edit-panel-layouts");
				panelMain.removeClass("fadeOutRight animated delay-1s");
				panelMain.addClass("fadeInRight animated delay-1s");
				
				panel.removeClass("uc-PanelOutRight animated delay-1s");
				panel.addClass("uc-PanelInRight animated");
				
				//panel.css("min-width","350px");
				//panel.animate({width:"30%",minWidth:mw+"px"},500,"linear");
				//blocks.animate({display: "block"},500,"linear");
				//blocks.css("display","flex");
				//panel.css("display","flex");
			} else {
				panel.addClass("uc-PanelInRight animated");
				var panelMain = panel.children(".uc-edit-panel-mid").children(".uc-edit-panel-layouts");
				panelMain.addClass("fadeInRight animated delay-1s");
				//panel.css("min-width","350px");
				//panel.animate({width:"350px"},500,"linear",function(){
					//blocks.css("display","flex");
				//	});
				//blocks.animate({display: "block"},500,"linear");
				//panel.css("display","flex");
			}
		},
		mouseover:function(event){
			event.target.style.cursor="pointer";
			
			//event.target.setAttribute('onIcon', true);
			//event.stopPropagation();    //标准   
	        //event.cancelBubble = true;  //IE  
		}
	});
	
	$(".scenarioTypeIcon").on({
		//mousedown:function(event){toolbarclick(event,true);},
		//mouseup:function(event){toolbarclick(event,false);},
		click: function(event){
			var clicktag = event.target.tagName;
			if(clicktag==="svg")
				var tag = $(event.target).children("use");
			else if(clicktag==="use")
				var tag = $(event.target);
			else
				return false;
			
			var box = tag.parents(".uc_t_box");
			var scenarioId = box.attr("scenarioId");
			var scenario = editable_template["scenarios"][scenarioId];
			var type = tag.attr("type");
			console.log("type "+type+" clicked.");
			scenario["scenarioType"] = type;
            scenario["scenarioTypeName"] = scenarioTypeNames[type];
            if( scenarioType == 1 ) {
            	scenario["collect"] = _BANNER;
            } else if( scenarioType == 2 ) {
            	scenario["collect"] = _REFRESHBLOCK;
            } else if( scenarioType == 3 ) {
            	scenario["collect"] = _RANKLIST;
            } else if( scenarioType == 4 ) {
            	scenario["collect"] = _TIMESERIES;
            } else if( scenarioType == 5 ) {
            	scenario["collect"] = _CORPUSCOLLECT;
            }
            
		},
		mouseover:function(event){
			event.target.style.cursor="pointer";
			
			//event.target.setAttribute('onIcon', true);
			//event.stopPropagation();    //标准   
	        //event.cancelBubble = true;  //IE  
		},  
	    mouseout:function(event){
	    	event.target.removeAttribute('onIcon');
	    	event.stopPropagation();    //标准   
	        event.cancelBubble = true;  //IE 
	    }
	});
	
	$(".uc_i_corpus").on("click",function(){
		addTemplate(1);
	});
	$(".uc_i_ranker").on("click",function(){
		addTemplate(2);
	});
	$(".uc_i_subscriber").on("click",function(){
		addTemplate(3);
	});
	$(".uc_i_timeseries").on("click",function(){
		addTemplate(4);
	});
	$(".uc_i_banner").on("click",function(){
		addTemplate(5);
	});
			
	$(".uc_i_help").on("click",function(){
		overlay = $(".overlay");
		mainDiv = $(".page-main-div");
		overlay.css('display','block');
		mainDiv.css('filter','blur(3px)');
	});
	
//	$(".overlay").on("click",function(){
//		overlay = $(".overlay");
//		mainDiv = $(".page-main-div");
//		overlay.css('display','none');
//		mainDiv.css('filter','');
//	});
	
	$("#btn_sScenario").on("click",function(){
		collectAndSubmit();
	});
//	      var rule;
//	      var ss = document.styleSheets;
//	      for (var i = 0; i < ss.length; ++i) {
//	          // loop through all the rules!
//	          for (var x = 0; x < ss[i].cssRules.length; ++x) {
//	              rule = ss[i].cssRules[x];
//	              if (rule.type == CSSRule.KEYFRAMES_RULE && rule.name==="uc-panelIn-frm") {
//	                  
//	                  if(ss[i].insertRule){
//	                	  ss[i].insertRule("100% {width:350px;}",1);
//
//	                  }else{
//	                	  ss[i].addRule("100% {width:350px;}",1);
//	                  }
//	                  console.log(rule);
//	              }
//	          }
//	      }
	populateFloatMenu();
	
	$(".uc-float-menu-one.icon-iconwangyesheji").on({
		click: function(event){
			$(".overlay").css("display","block");
			//$(".uc_addnew_box").css("display","flex");
			var div=$(".page-main-div");
			//$(".uc_addnew_box").css("left", (($(window).width()-$(".uc_addnew_box").width())/2)+"px");
			//$(".uc_addnew_box").css("top", (($(window).height()-$(".uc_addnew_box").height())/2)+"px");
			var newbox = $(".uc_addnew_box").clone(true);
			newbox.css("left", (($(window).width()-$(".uc_addnew_box").width())/2)+"px");
			newbox.css("top", (($(window).height()-$(".uc_addnew_box").height())/2)+"px");
			div.append(newbox);
			newbox.show();
		},
		mouseover:function(event){
			event.target.style.cursor="pointer";
			
		}
	});
	
	$(".uc-float-menu-one.icon-tijiao").on({
		click: function(event){
			$(".overlay").css("display","block");
			$(".uc_submit_box").css("display","flex");
			var div=$(".page-main-div");
			$(".uc_submit_box").css("left", (($(window).width()-$(".uc_submit_box").width())/2)+"px");
			$(".uc_submit_box").css("top", (($(window).height()-$(".uc_submit_box").height())/2)+"px");
		},
		mouseover:function(event){
			event.target.style.cursor="pointer";
		}
	});
	$("input[name='uc_submit_ok']").on({
		click: function(event){
			collectAndSubmit(event.target);
		},
		mouseover:function(event){
			event.target.style.cursor="pointer";
		}
	});
	$("input[name='uc_submit_cancel']").on({
		click: function(event){
			$(".overlay").css("display","none");
			$(".uc_submit_box").css("display","none");
		},
		mouseover:function(event){
			event.target.style.cursor="pointer";
		}
	});
	$("input[name='uc_addnew_ok']").on({
		click: function(event){
			var box = $(event.target).parents(".uc_addnew_box");
			var scenarioTypeInput = box.find("#uc_addnew_type_select");
			var addr = box.find("#in_addr").val();
			
			var scenarioType = scenarioTypeInput.val();
			if( !scenarioType || scenarioType === 'hide' ) {
				var block = scenarioTypeInput.parents(".uc-input-block");
				var hint = block.find(".uc-input-hint-icon");
				var alert = block.find(".en_input_hint");
				hint.show();
				alert.show();
				return;
			}
			var scenario_div = cloneDiv("uc_box_temp",scenarioType);
            var id = "uc_sce__"+guid();

			//var scenario = templateInstance.newScenario();
			//editable_template["scenarios"][scenario["scenarioId"]] = scenario;
			//console.log("Add new scenario: ");
			//console.log(scenario);
			scenario_div.attr("scenarioId",id);
			if(addr) {
				var addrInput = scenario_div.children(".uc_t_tool_addr").children("input[type='text']");
				addrInput.val(addr);
			}
			$(".overlay").css("display","none");
			$(".uc_addnew_box").css("display","none");
		},
		mouseover:function(event){
			event.target.style.cursor="pointer";
		}
	});
	$("input[name='uc_addnew_cancel']").on({
		click: function(event){
			$(".overlay").css("display","none");
			//$(".uc_addnew_box").css("display","none");
			var box = $(event.target).parents(".uc_addnew_box");
			box.remove();
		},
		mouseover:function(event){
			event.target.style.cursor="pointer";
		}
	});
	
	$(".uc-float-menu-one.icon-guaniu01").on({
		click: function(event){
			event.stopPropagation(); 
			var clicktag = event.target.tagName;

			if(clicktag.toLowerCase()==="svg" || clicktag.toLowerCase()==="use")
				var target = $(event.target).parents(".uc-float-menu-one.icon-guaniu01");
			else 
				var target = $(event.target);
			
			var container = target.parents(".uc-float-menu");
			var conH = container.height();

			if( target.hasClass("hideMenu") ){
				container.children(".uc-float-menu-one").animate({left:"0px"}, 400,"linear", function(){
					var menus = container.children(".uc-float-menu-one");
					for(var i=0;i<menus.length;i++)
						$(menus[i]).animate({top: $(menus[i]).attr("originaly")}, 400,"linear");
				});
				target.removeClass("hideMenu");
			} else {
				//var siblings = target.siblings(".uc-float-menu-one");
				
				var movey = (conH -( target.height()-2) )/2;
				var movex = 0-parseInt(container.css("left"))-( target.height()-2)/2;
				container.children(".uc-float-menu-one").animate({top:movey+"px"}, 400,"linear").delay(400).animate({left:movex+"px"}, 400,"linear");
				target.addClass("hideMenu");
			}
			
		},
		mouseover:function(event){
			event.target.style.cursor="pointer";
			
		}
	});
	/*
	$(".uc-float-menu-one.icon-guaniu01").on("click",function(){
		var menus = $(".uc-float-menu-one");
		var fmenu = $(".uc-float-menu");
		var menuTotHeight = menus.length * parseInt(menus.css("height")) + (menus.length-1) * 10;
		var menuTotWidth = menus.length * parseInt(menus.css("width")) + (menus.length-1) * 10;

		var container = $(".uc-canvasM");
		var startTop = parseFloat((container.height() - menuTotHeight)/2);
		var startLeft = parseFloat((container.width() - menuTotWidth)/2);

		var padding = 10;
		if( fmenu.attr("direction-x")==="left"){
			var targetTop = 0-fmenu.position().top+10;//0-startTop+10;
			for(var i=0;i<menus.length;i++) {
				var menu = menus[i];
				$(menu).animate({left:startLeft+padding*i+parseInt(menus.css("height"))*i+"px",
								top:targetTop+"px"}, 400+(115*i),"linear");
			}
			fmenu.attr("direction-x","top");
		} else if( fmenu.attr("direction-x")==="top"){
			for(var i=0;i<menus.length;i++) {
				var menu = menus[i];
				$(menu).animate({left:(container.width()-parseInt(menus.css("width"))-20)+"px",
								top:(padding*i+parseInt(menus.css("height"))*i)+"px"}, 400+(115*i),"linear");
			}
			fmenu.attr("direction-x","right");
		} else if( fmenu.attr("direction-x")==="right"){
			var targetTop = container.height()-fmenu.position().top-parseInt(menus.css("height"))-10;
			console.log(container.height());
			console.log(fmenu.position().top);
			console.log(parseInt(menus.css("height")));
			for(var i=0;i<menus.length;i++) {
				var menu = menus[i];
				$(menu).animate({left:startLeft+padding*i+parseInt(menus.css("height"))*i+"px",
								top:targetTop+"px"}, 400+(115*i),"linear");
			}
			fmenu.attr("direction-x","bottom");
		} else if( fmenu.attr("direction-x")==="bottom"){
//			for(var i=0;i<menus.length;i++) {
//				var menu = menus[i];
//				$(menu).animate({left:(container.width()-parseInt(menus.css("width"))-20)+"px",
//								top:(padding*i+parseInt(menus.css("height"))*i)+"px"}, 400+(115*i),"linear");
//			}
//			fmenu.attr("direction-x","left");
			for(var i=0;i<menus.length;i++) {
				var menu = menus[i];
				//menu.style.left = "0px";
				//menu.style.top = (padding*i+parseInt(menus.css("height"))*i)+"px";//Math.round(parseFloat((startTop+padding)/container.height())*10000) / 100 + "%";
				$(menu).animate({ left:"0px",
								  top:(padding*i+parseInt(menus.css("height"))*i)+"px"}, 400+(115*i),"linear");
			}
			fmenu.attr("direction-x","left");
		} else {
			
		}

	});*/
	
	$(".uc-edit-comp-add-attr").on({
		click: function(event){
			var clicktag = event.target.tagName;
			if(clicktag.toLowerCase()==="svg")
				var target = $(event.target).children("use");
			else if(clicktag.toLowerCase()==="use")
				var target = $(event.target);
			else
				return false;
			event.stopPropagation(); 
			
			var area = target.parents(".uc-edit-comp-add-attr-area");
			var areaBody = area.children(".uc-edit-comp-r-editor-input-body");
			areaBody.append($('<div class="uc-edit-comp-r-editor-input-block">'+
											'<div style="display: flex; width: 90%; height: 100%;">'+
											'	<div class="uc-edit-comp-r-editor-input-title" style="width: 85px;">'+
											'		<input type="text" name="attrName" placeholder="Attr name" class="input_text_hint" />'+
											'	</div>'+
											'	<div class="uc-edit-comp-r-editor-input">'+
											'		<input type="text" name="attrValue" placeholder="    input value here" class="input_text_hint" />'+
											'	</div>'+
											'	<div class="uc-edit-comp-r-editor-input-opr">'+	
											'		<svg class="icon" onmouseover="this.style.cursor=\'pointer\';" onclick="deleteInputBlock(event);" style="font-size: 20px; color: #000000;" aria-hidden="true">'+
		    								'			<use xlink:href="#icon-jianhao"></use>'+
											'		</svg>'+
											'	</div>'+
										'	</div>'+
										'</div>'));
		},
		mouseover:function(event){
			event.target.style.cursor="pointer";
		}
	});
	
	$(".uc-edit-comp-nav-bar").on({
		click: function(event){
			var target = $(event.target);
			if(target.attr("class")!=="uc-edit-comp-nav-bar") {
				target = target.parents(".uc-edit-comp-nav-bar");
			}
			event.stopPropagation(); 
			var targetIdx = target.attr("index");
			
			var mask = target.parents(".uc-edit-comp-r-editor-nav").siblings("#uc-edit-comp-nav-bar-mask");
			var maskIdx = mask.attr("index");
			console.log(mask.width());
			var move = targetIdx*mask.width();
			console.log("move: "+move);
			mask.animate({ left:move+"px"}, 400,"linear");
			
			var selector = mask.siblings(".uc-edit-comp-r-editor-content").children(".uc-edit-components-selector[index='"+targetIdx+"']");
			var displaySel = mask.siblings(".uc-edit-comp-r-editor-content").children(".uc-edit-components-selector[index='"+maskIdx+"']");
			displaySel.hide();
			selector.show();
			
			mask.attr("index",targetIdx);

		},
		mouseover:function(event){
			event.target.style.cursor="pointer";
		}
	});
	
	switchEvent("#in_element_expand",function(target){
		console.log("switch on");
		console.log(target);
		var components = target.parents(".uc-edit-components");
		var parentCon = target.parents(".uc-edit-comp-r-editor-con");
		var targetPage = parseInt(parentCon.attr("page"));
		var linkedPageCon = parentCon.siblings(".uc-edit-comp-r-editor-con[page='"+(targetPage+1)+"']");
		if( linkedPageCon.length > 0 ){
			console.log("Find linked page, do nothing.");
			return;
		}
		var pageList = components.find(".uc-edit-comp-r-list-con");
		pageList.append($('<svg class="icon"'+
							'	style="font-size: 34px; color: #cfcfcf;"'+
							'	aria-hidden="true">'+
	    					'<use xlink:href="#icon-lianjiexian2"></use>'+
							'</svg>'+
							'<svg onmouseover="this.style.cursor=\'pointer\';" onclick="changePageComponentEditor(event)" class="icon"'+
								'style="font-size: 28px; color: #cfcfcf;"'+
								'aria-hidden="true">'+
							'<use xlink:href="#icon-yemianzujian"></use>'+
							'</svg>'))
	},
	function(target){
		console.log("switch off");
		console.log(target);
		var components = target.parents(".uc-edit-components");
		var listcon = components.find(".uc-edit-comp-r-list-con");
		var pages = listcon.children("svg");
		
		var parentCon = target.parents(".uc-edit-comp-r-editor-con");
		var targetPage = parseInt(parentCon.attr("page"));
		if( ((pages.length-1)/2) > targetPage ) {
			bootbox.confirm({message: "Disable extraction will also discard linked page.Do you want to continue?", 
							buttons: {
						        confirm: {
						            label: 'Yes',
						            className: 'btn-success'
						        },
						        cancel: {
						            label: 'No',
						            className: 'btn-danger'
						        }
						    },
						    callback:function(result) {
				              console.log("Discard confirm " + result);
				              if(result) {
				            	  for(var i=(targetPage*2+1);i<pages.length;i++){
				      				$(pages[i]).remove();
				      				if(i%2==0){
				      					var pageCon = components.find(".uc-edit-comp-r-editor-con[page='"+(i/2)+"']");
				      					if(pageCon.length>0)
				      						pageCon.remove();
				      				}
				      			}
				              }else{
				            	  honeySwitch.showOn(target);
				              }
						    }
						    });
		}
//		var linkedPageCon = parentCon.siblings(".uc-edit-comp-r-editor-con[page='"+(targetPage+1)+"']");
//		if( linkedPageCon.length > 0 ){
//			console.log("Find linked page, discard it.");
//			bootbox.confirm("Disable extraction will also discard linked page.Do you want to continue?", function(result) {
//                console.log("Discard confirm " + result);
//            });
//		}
		
	});
	
	$(".uc-edit-comp-discard-btn").on({
		click:function(event){
			var target = $(event.target);
			var root = target.parents(".uc-edit-components");
			var currentPg = root.find(".uc-edit-comp-r-list-con").children("svg[modify='current']");
			var currentPgIdx = currentPg.index()/2;
			
			var pageCon = root.find(".uc-edit-comp-r-editor-con[page='"+currentPgIdx+"']");
			discardPageComponents(pageCon);
		},
		mouseover:function(event){
			event.target.style.cursor="pointer";
		}
	});
	
	$("#uc_addnew_type_select").each(function(){
	    var $this = $(this), numberOfOptions = $(this).children('option').length;
	  
	    $this.addClass('select-hidden'); 
	    $this.wrap('<div class="select"></div>');
	    $this.after('<div class="select-styled"></div>');

	    var $styledSelect = $this.next('div.select-styled');
	    //$styledSelect.text($this.children('option').eq(0).text());
	    $styledSelect.html('<svg class="uc-float-icon" style="font-size: 14px; font-weight: 400;color: #888888;" aria-hidden="true">'
				+'<use xlink:href="#'+$this.children('option').eq(0).text()+'"></use>'+
				'</svg>&nbsp;<span class="en_input_label" style="color:#666666;font-size:10px;">'+$this.children('option').eq(0).attr("label")+'</span>');
	    var $list = $('<ul />', {
	        'class': 'select-options'
	    }).insertAfter($styledSelect);
	  
	    for (var i = 0; i < numberOfOptions; i++) {
	        $('<li />', {
	            //text: $this.children('option').eq(i).text(),
	        	html: '<svg class="uc-float-icon" style="font-size: 14px; font-weight: 400;color: #888888;" aria-hidden="true">'
				+'<use xlink:href="#'+$this.children('option').eq(i).text()+'"></use>'+
				'</svg>&nbsp;<span class="en_input_label" style="color:#666666;font-size:10px;">'+$this.children('option').eq(i).attr("label")+'</span>',
	            rel: $this.children('option').eq(i).val(),
	            icon: $this.children('option').eq(i).text(),
	            label: $this.children('option').eq(i).attr("label")
	        }).appendTo($list);
	    }
	  
	    var $listItems = $list.children('li');
	  
	    $styledSelect.click(function(e) {
	        e.stopPropagation();
	        $('div.select-styled.active').not(this).each(function(){
	            $(this).removeClass('active').next('ul.select-options').hide();
	        });
	        $(this).toggleClass('active').next('ul.select-options').toggle();
	    });
	  
	    $listItems.click(function(e) {
	        e.stopPropagation();
	        //$styledSelect.text($(this).text()).removeClass('active');
	        //c.find(".select-styled").text($(this).text()).removeClass('active');
	        $(".uc_addnew_box").find(".select-styled").html('<svg class="uc-float-icon" style="font-size: 14px; font-weight: 400;color: #888888;" aria-hidden="true">'
					+'<use xlink:href="#'+$(this).attr('icon')+'"></use>'+
					'</svg>&nbsp;<span class="en_input_label" style="color:#666666;font-size:10px;">'+$(this).attr('label')+'</span>').removeClass('active');
	        
	        //$this.val($(this).attr('rel'));
	        $(".uc_addnew_box").find("#uc_addnew_type_select").val($(this).attr('rel'));
	        //$list.hide();
	        $(".uc_addnew_box").find(".select-options").hide();
	        //console.log($this.val());
	    });
	  
	    $(document).click(function() {
	        $styledSelect.removeClass('active');
	        $list.hide();
	    });

	});
	
	$(".element-selector .labelon").on({
		click: function(event){
			var target = $(event.target);
			if( target.hasClass("uc-edit-components-selector-opton") )
				return;
			
			var selector = target.parents(".element-selector");
			var selectorOn = selector.find(".valueon");
			
			var selectorKey = selector.children(".uc-edit-components-selector-elkey");
			var selectorVal = selector.children(".uc-edit-components-selector-elval");
			selectorKey.show();
			selectorVal.hide();
			
			target.removeClass("uc-edit-components-selector-optoff");
			selectorOn.removeClass("uc-edit-components-selector-opton");
			target.addClass("uc-edit-components-selector-opton");
			selectorOn.addClass("uc-edit-components-selector-optoff");
		}
	});
	
	$(".element-selector .valueon").on({
		click: function(event){
			var target = $(event.target);
			if( target.hasClass("uc-edit-components-selector-opton") )
				return;
			var selector = target.parents(".element-selector");
			var selectorOff = selector.find(".labelon");
			
			var selectorKey = selector.children(".uc-edit-components-selector-elkey");
			var selectorVal = selector.children(".uc-edit-components-selector-elval");
			selectorKey.hide();
			selectorVal.show();
			
			target.removeClass("uc-edit-components-selector-optoff");
			selectorOff.removeClass("uc-edit-components-selector-opton");
			target.addClass("uc-edit-components-selector-opton");
			selectorOff.addClass("uc-edit-components-selector-optoff");
		}
	});
	
	$(".element-selector #btn_elmtLabel_detail").on({
		click: function(event){
			var target = $(event.target);
			var state = target.attr("status");
			var selector = target.parents(".uc-edit-components-selector-elkey");
			var editarea = selector.find(".uc-edit-comp-r-editor-input-area:gt(0)");
			
			if( state === "up" ) {
				editarea.show();
				target.text("-");
				target.attr("status","expand");
			} else if( state === "expand" ) {
				editarea.hide();
				target.text("+");
				target.attr("status","up");
			}
			
		}
	});
	
	
	
	$(".uc-edit-panel-layout-bg > svg").on({
		click: function(event) {
			
		},
		mouseover:function(event){
			event.target.style.cursor="pointer";
			event.stopPropagation();
			var clicktag = event.target.tagName;
			if(clicktag.toLowerCase()==="svg")
				var tag = $(event.target).children("use");
			else if(clicktag.toLowerCase()==="use")
				var tag = $(event.target);
			else
				return false;               
			var parent = tag.parents(".uc-edit-panel-layout-bg").siblings(".uc-edit-panel-layout");
			//parent.show();
			parent.css("display","flex");
			
		}
	});
	
	$(".uc-edit-panel-tag").on({
		click: function(event) {
			event.stopPropagation();
			var clicktag = event.target.tagName;
			if(clicktag.toLowerCase()==="div")
				var target = $(event.target);
			else if(clicktag.toLowerCase()==="span")
				var target = $(event.target).parent(".uc-edit-panel-tag");
			else
				return false;           
			
			var cur = target.siblings(".uc-edit-panel-tag[selected='selected']");
			if( cur.length > 0 ) {
				cur.attr("selected","");
				cur.css("backgroundColor","rgb(213,213,213,0.0)");
				cur.css("borderLeft","0px solid #fff");
				cur.css("borderRight","0px solid #fff");
				cur.css("borderTop","0px solid #fff");
			}
			
			target.css("backgroundColor","rgb(213,213,213,1.0)");
			target.css("borderLeft","1px solid #fff");
			target.css("borderRight","1px solid #fff");
			target.css("borderTop","1px solid #fff");
			
			target.attr("selected","selected");
		},
		mouseover:function(event){
			event.target.style.cursor="pointer";
		}
	});
//	$(".uc-edit-components").on({
//		click: function(event){
//			
//		}
//	});
});