var containerOverflowXBoxNum={};
var containerOverflowYBoxNum={};

function cloneDiv(sDiv, type){
	c=$("#"+sDiv).clone(true);
	var cid = sDiv+"_"+guid();
	//var bgcolors=["#0073e6","#00e6ac","#e60073","#e67300","#333333","#669900"];
	c.css('display','flex');
	c.attr('id',cid);
	c.attr('sType',scenarioTypeNames[parseInt(type)]);

	
	//var x = bgcolors.length-1;     
	//var y = 0; 
	//c.css('background-color', bgcolors[parseInt(Math.random() * (x - y + 1) + y)]);
	c.css('background-image','url(/var/images/uc/uc_bg_'+type+'.svg)');
	c.css('background-position','50% 75%');
	c.css('background-size','45% 45%');
	c.css('width','25%');
	c.css('height','20%');
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
				var target = $(".uc_t_box_mask")[0],
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
				if( !$(target).hasClass("uc_t_box"))
					target = $(target).parent(".uc_t_box");
				
				var targetId = $(target).attr("id");
				var draggable = $(".uc_t_box_mask")[0];
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

				var position = $(target).attr("data-position");
				if( position === "absolute" )
					target.style.webkitTransform = target.style.transform = 'translate(' + moveddatax + 'px, ' + moveddatay + 'px)';
				else if( position === "relative" ) {
					target.style.left = (Math.round(parseFloat(moveddatax / container.width() ) *10000)/100)+"%";
					target.style.top = (Math.round(parseFloat(moveddatay / container.height() )*10000)/100)+"%";
				} else 
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
	event.stopPropagation();    //标准   
    event.cancelBubble = true;  //IE  
    
	var draggable = $(".uc_t_box_mask");
	var target = $(event.target);

	if( !target.hasClass("uc_t_box") ) {
		if( target.hasClass("uc_t_boxC") )
			target = target.parent(".uc_t_box");
		else 
			return false;
	}
	
	draggable.attr("current_box_sid", target.attr("scenarioId"));
	draggable.css("width", target.width()+"px");
	draggable.css("height", target.height()+"px");
	draggable.css("left", target.position().left+"px");
	draggable.css("top", target.position().top+"px");
	
	if( down ){
		draggable.css("display","block");
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
	var block = tag.parents(".uc-input-block-table-row");
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
	current.css("font-size","2em");
	current.css("color","#888");
	current.attr("modify","none");
	
	target.css("font-size","2.25em");
	target.css("color","#333");
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

function initTempalePanel() {
		var panel = $(".uc-edit-panel-mid").children(".uc-edit-panel-template");
		var templateBgColorPicker = panel.find("#in_tempbgcolor_box");
		//var tempGridPaddingSlider = panel.find("#in_tempGridPadding");
		var canvas =  $(".uc-canvas-container");
		var hGridInterval = panel.find("#in_hGridInterval");
		
		var gridHColorPicker = panel.find("#uc-temp-grid-h-color");
		var gridVColorPicker = panel.find("#uc-temp-grid-v-color");
		makeupColorPicker(gridHColorPicker, "#ee869a", function(color) {
			if( color )
				canvas.find(".uc-temp-grid-h").css("borderTop","1px solid "+ color.toRgbString());
	    }, false, true, false) ;
		makeupColorPicker(gridVColorPicker, "#ee869a", function(color) {
			if( color )
				canvas.find(".uc-temp-grid-v").css("borderLeft","1px solid "+ color.toRgbString());
	    }, false, true, false) ;
		
		makeupColorPicker(templateBgColorPicker, "#ffffff", function(color) {
	        //color.toHexString(); // #ff0000
			if( color )
				canvas.css("backgroundColor", color.toRgbString());
			else
				canvas.css("backgroundColor", "rgba(255,255,255,0.0)");
	    },true,true,true) ;
		
		panel.find(".uc-temp-grid-btn-add").on({
			click: function(event){
				event.stopPropagation();
				var clicktag = event.target.tagName;
				if(clicktag.toLowerCase()==="button")
					var target = $(event.target);
				else if(clicktag.toLowerCase()==="span")
					var target = $(event.target).parent("button");
				else
					return false;    
				
			},
			mouseover: function(event) {
				event.stopPropagation();
				event.target.style.cursor="pointer";
			}
		});
		
		panel.find(".uc-temp-grid-btn").on({
			click: function(event){
				event.stopPropagation();
				var clicktag = event.target.tagName;
				if(clicktag.toLowerCase()==="button")
					var target = $(event.target);
				else if(clicktag.toLowerCase()==="span")
					var target = $(event.target).parent("button");
				else
					return false;     
				
				var orientation = target.attr("orientation");					
				if(orientation === "horizontal") {
					var canvas = $(".uc-canvas-container");
					var colorpicker = target.parents(".uc-input-block-table").find("#uc-temp-grid-h-color");

					var spinner = target.siblings("#uc-temp-grid-h");
					var num = spinner.children("#uc-temp-grid-h-val");
					for(var i=1; i< parseInt(num.val()); i++) {
						var per = i*parseFloat(100/parseInt(num.val()));
						var hr = $("<hr class='uc-temp-grid-h' style='top: "+per+"%;'/>");
						hr.css( "borderTop","1px solid " + colorpicker.spectrum("get").toRgbString() );
						hr.on({
							mouseover:function(event){
								var target = $(event.target);
								target.css("boxShadow","0px 0px 5px rgba(238,134,154,1.0)");
							},
							mouseout:function(event){
								var target = $(event.target);
								target.css("boxShadow","");
							}
						});
						canvas.append(hr);
					}
					
				} else if(orientation === "vertical") {
					var canvas = $(".uc-canvas-container");
					var colorpicker = target.parents(".uc-input-block-table").find("#uc-temp-grid-v-color");

					var spinner = target.siblings("#uc-temp-grid-v");
					var num = spinner.children("#uc-temp-grid-v-val");
					for(var i=1; i< parseInt(num.val()); i++) {
						var per = i*parseFloat(100/parseInt(num.val()));
						var hr = $("<hr class='uc-temp-grid-v' style='left: "+per+"%;'/>");
						hr.css( "borderLeft","1px solid " + colorpicker.spectrum("get").toRgbString() );

						hr.on({
							mouseover:function(event){
								var target = $(event.target);
								target.css("boxShadow","0px 0px 5px rgba(238,134,154,1.0)");
							},
							mouseout:function(event){
								var target = $(event.target);
								target.css("boxShadow","");
							}
						});
						canvas.append(hr);
					}
					
				}
			},
			mouseover: function(event) {
				event.stopPropagation();
				event.target.style.cursor="pointer";
			}
		});
		
		panel.find("#uc-temp-grid-v").spinner();
		panel.find("#uc-temp-grid-h").spinner();
		
		panel.find(".uc-bg-image,.uc-bg-image-sel").on({
			click: function(event){
				event.stopPropagation();
				var target = $(event.target);
				if( target.hasClass("uc-bg-image-sel") )
					return;
				
				target.attr("selected","selected");
				
				var last = target.siblings("div[selected='selected']");
				last.removeAttr("selected");
				
				target.toggleClass("uc-bg-image-sel uc-bg-image");
				last.toggleClass("uc-bg-image-sel uc-bg-image");
				
				canvas.css("backgroundImage", target.css("backgroundImage"));
			},
			mouseover: function(event) {
				event.stopPropagation();
				event.target.style.cursor="pointer";
			}
		});
		
		panel.find(".uc-bg-color-picker-sel,.uc-bg-color-picker").on({
			click: function(event){
				event.stopPropagation();
				var target = $(event.target);
				if( target.hasClass("uc-bg-color-picker-sel") )
					return;
				
				target.attr("selected","selected");
				
				var last = target.siblings("div[selected='selected']");
				last.removeAttr("selected");
				
				target.toggleClass("uc-bg-color-picker-sel uc-bg-color-picker");
				last.toggleClass("uc-bg-color-picker-sel uc-bg-color-picker");
				
				templateBgColorPicker.spectrum("set", target.css("backgroundColor"));
				canvas.css("backgroundColor", target.css("backgroundColor"));
				//console.log(templateBgColorPicker.spectrum("get").toRgbString());
			},
			mouseover: function(event) {
				event.stopPropagation();
				event.target.style.cursor="pointer";
			}
		});
		
		panel.find(".uc-float-icon-radio-sel,.uc-float-icon-radio-nosel").on({
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
				
				var curseltxt = cursel.siblings("input[type='text']");
				if( curseltxt.length > 0 ) {
					curseltxt.removeAttr("disabled");
					curseltxt.toggleClass("uc-text-disable uc-text-editable");
				}
				var lastseltxt = lastsel.siblings("input[type='text']");
				if( lastseltxt.length > 0 ) {
					lastseltxt.attr("disabled","disabled");
					lastseltxt.toggleClass("uc-text-disable uc-text-editable");
				}
				//
				//var radios = parent.find(".uc-float-icon").toggleClass("uc-float-icon-radio-nosel uc-float-icon-radio-sel flipInX flipOutX uc-zindex-nag");
				lastsel.children(".uc-float-icon").toggleClass("uc-float-icon-radio-nosel uc-float-icon-radio-sel flipInX flipOutX uc-zindex-nag");
				cursel.children(".uc-float-icon").toggleClass("uc-float-icon-radio-nosel uc-float-icon-radio-sel flipInX flipOutX uc-zindex-nag");
			},
			mouseover: function(event) {
				event.stopPropagation();
				event.target.style.cursor="pointer";
			}
		});
		
		panel.find(".uc-float-icon-checkbox-sel,.uc-float-icon-checkbox-nosel").on({
			click: function(event){
				event.stopPropagation();
				var clicktag = event.target.tagName;
				if(clicktag.toLowerCase()==="svg")
					var target = $(event.target);
				else if(clicktag.toLowerCase()==="use")
					var target = $(event.target).parent("svg");
				else
					return false;    
				var parent = target.parent(".uc-check-box");
				var siblings = target.siblings("svg");
				var val = siblings.attr("value");
				parent.attr("value",val);

				siblings.toggleClass("uc-float-icon-radio-nosel uc-float-icon-radio-sel zoomIn zoomOut uc-zindex-nag");
				target.toggleClass("uc-float-icon-radio-nosel uc-float-icon-radio-sel zoomIn zoomOut uc-zindex-nag");
			},
			mouseover: function(event) {
				event.stopPropagation();
				event.target.style.cursor="pointer";
			}
		});
//		noUiSlider.create(tempGridPaddingSlider[0], {
//		    start: [0],
//		    range: {
//		        'min': [0],
//		        'max': [20]
//		    }
//		});
//		tempGridPaddingSlider[0].noUiSlider.on("update", 
//				function (values, handle, unencoded, tap, positions) {
//			if (handle === 0) {
//				var rv = panel.find("#tempGridPadding-val");
//				rv.val(parseInt(values[handle]));
//				//rv.css("border-radius",parseInt(values[handle])+"px");
//				//rv.html(parseInt(values[handle]));
//				//console.log(values[handle]);
//			}
//		});
		$(".uc-temp-align-items,.uc-temp-justify-content").on({
			click: function(event) {
				event.stopPropagation();
				var clicktag = event.target.tagName;
				if(clicktag.toLowerCase()==="svg")
					var target = $(event.target);
				else if(clicktag.toLowerCase()==="use")
					var target = $(event.target).parent("svg");
				else
					return false;           
				
				if( target.hasClass("uc-float-icon-selected") )
					return;
				
				target.siblings(".uc-float-icon-selected").toggleClass("uc-float-icon-selected uc-float-icon");
				target.toggleClass("uc-float-icon-selected uc-float-icon");
			}, 
			mouseover: function(event) {
				event.stopPropagation();
				event.target.style.cursor="pointer";
				
				var clicktag = event.target.tagName;
				if(clicktag.toLowerCase()==="svg")
					var target = $(event.target);
				else if(clicktag.toLowerCase()==="use")
					var target = $(event.target).parent("svg");
				else
					return false;       
				var title = target.attr("title");
				
				$("body").append('<div id="div_toop" style="border: 1px solid #efefef;border-radius: 2px;background-color: rgba(248,248,255,1.0); padding: 0px 2px;"><span class="uc-text cn_input_label">'+ title + '</span></div>');
                $("#div_toop")
                    .css({
                        "top": (event.pageY + 10) + "px",
                        "position": "absolute",
                        "left": (event.pageX + 20) + "px"
                    }).show("fast");
			}, 
			mouseout: function(event) {
				$("#div_toop").remove();
			}
		});
		
		panel.css("display","flex");
}

function popEditPanel(eventTag, clickTag) {
	var panel = $(".uc-edit-panel");
	var panelMid = panel.children(".uc-edit-panel-mid");
	
	if( !panel.find(".uc-edit-panel-tag").data("events") || !panel.find(".uc-edit-panel-tag").data("events")["click"] ){ 
		panel.find(".uc-edit-panel-tag").on({
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
				
				var editPanel;
				var lastdisplaypanel =  panel.find("div[class^='uc-edit-panel'][display='current']");
				
				
				if( target.hasClass("template") ) {
					editPanel = panel.find(".uc-edit-panel-template");
					editPanel.css("display","flex");
					editPanel.attr("display","current");
					if( editPanel.attr("initiated") !== "initiated" ){
						initTempalePanel();
						editPanel.attr("initiated","initiated");
					}
					
				} else if( target.hasClass("scenario") ) {
					var box = eventTag.parents(".uc_t_box");
					var boxContent = box.children(".uc_t_boxC");
					var scenarioId = box.attr("scenarioId");
					
					editPanel = panel.find(".uc-edit-panel-layouts[scenarioId='"+scenarioId+"']");
					if( editPanel.length <= 0 ) {
						//invokeGet( "/var/subview/uc/scenarioEditPanel", function(data){
						//	console.log(data);
						//});
						editPanel = $(".uc-edit-panel-layouts[id='temp']").clone(true);
						editPanel.attr("scenarioId", scenarioId);
						editPanel.attr("display","current");
						editPanel.css("display","flex");
						//editPanel.hide();
						//panel.append(editPanel);
						//editPanel.addClass("fadeInRight animated delay-1s");
						panelMid.append(editPanel);
						
						var canvasContainer = $(".uc-canvas-container");
						var shadowBox = editPanel.find("div[id^='shadow-style']");

//						var scenarioW = editPanel.find(".scenarioW");
//						var scenarioH = editPanel.find(".scenarioH");
//						scenarioW.text(box.css("width"));
//						scenarioH.text(box.css("height"));
						
						var bgColorPicker = editPanel.find("#in_bgcolor_box");
						var fgColorPicker = editPanel.find("#in_fgcolor_box");
						var fntColorPicker = editPanel.find("#in_fntcolor_box");
						var borderColorPicker = editPanel.find("#in_bordercolor_box");
						//var fgborderColorPicker = editPanel.find("#in_fgbordercolor_box");
						var shadowColorPicker = editPanel.find("#in_shadowcolor_box");
						
						var rangeSlider = editPanel.find("#in_borderRadius");
						//var fgBorderRadiusSlider = editPanel.find("#in_fg_borderRadius");
						var weightRangeSlider = editPanel.find("#in_borderWeight");
						//var fgBorderWidthRangeSlider = editPanel.find("#in_fg_borderWeight");
						
						var paddingLeftSlider = editPanel.find("#in_paddingLeft");
						var paddingRightSlider = editPanel.find("#in_paddingRight");
						var paddingTopSlider = editPanel.find("#in_paddingTop");
						var paddingBottomSlider = editPanel.find("#in_paddingBottom");
						var scheduleIntervalSlider = editPanel.find("#in_scheduleInterval");
						var scheduleMinutesIntervalSlider = editPanel.find("#in_scheduleMinutesInterval");
						var shadowWeightSlider = editPanel.find("#in_shadowWeight");
						var shadowHSlider = editPanel.find("#in_Hshadow");
						var shadowVSlider = editPanel.find("#in_Vshadow");
						var shadowSpreadSlider = editPanel.find("#in_shadowSpread");
						
						var delaySpinner = editPanel.find("#in_auto_delay");
						delaySpinner.spinner();
						
						editPanel.find(".mode-info").find(".uc-check-box.sce-mode-val").on({
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
							},
							mouseover: function(event) {
								event.stopPropagation();
								event.target.style.cursor="pointer";
							}
						});
						
						editPanel.find(".uc-sce-bgcolor-options").children(".uc-bg-color-picker-sel,.uc-bg-color-picker").on({
							click: function(event){
								event.stopPropagation();
								var target = $(event.target);
								if( target.hasClass("uc-bg-color-picker-sel") )
									return;
								
								target.attr("selected","selected");
								
								var last = target.siblings("div[selected='selected']");
								last.removeAttr("selected");
								
								target.toggleClass("uc-bg-color-picker-sel uc-bg-color-picker");
								last.toggleClass("uc-bg-color-picker-sel uc-bg-color-picker");
								
								bgColorPicker.spectrum("set", target.css("backgroundColor"));
								box.css("backgroundColor", target.css("backgroundColor"));
								//canvas.css("backgroundColor", target.css("backgroundColor"));
								//console.log(templateBgColorPicker.spectrum("get").toRgbString());
							},
							mouseover: function(event) {
								event.stopPropagation();
								event.target.style.cursor="pointer";
							}
						});
						
						editPanel.find(".uc-sce-fgcolor-options").children(".uc-bg-color-picker-sel,.uc-bg-color-picker").on({
							click: function(event){
								event.stopPropagation();
								var target = $(event.target);
								if( target.hasClass("uc-bg-color-picker-sel") )
									return;
								
								target.attr("selected","selected");
								
								var last = target.siblings("div[selected='selected']");
								last.removeAttr("selected");
								
								target.toggleClass("uc-bg-color-picker-sel uc-bg-color-picker");
								last.toggleClass("uc-bg-color-picker-sel uc-bg-color-picker");
								
								fgColorPicker.spectrum("set", target.css("backgroundColor"));
								boxContent.css("backgroundColor", target.css("backgroundColor"));
								//canvas.css("backgroundColor", target.css("backgroundColor"));
								//console.log(templateBgColorPicker.spectrum("get").toRgbString());
							},
							mouseover: function(event) {
								event.stopPropagation();
								event.target.style.cursor="pointer";
							}
						});
						
						editPanel.find(".uc-sce-fntcolor-options").children(".uc-bg-color-picker-sel,.uc-bg-color-picker").on({
							click: function(event){
								event.stopPropagation();
								var target = $(event.target);
								if( target.hasClass("uc-bg-color-picker-sel") )
									return;
								
								target.attr("selected","selected");
								
								var last = target.siblings("div[selected='selected']");
								last.removeAttr("selected");
								
								target.toggleClass("uc-bg-color-picker-sel uc-bg-color-picker");
								last.toggleClass("uc-bg-color-picker-sel uc-bg-color-picker");
								
								fntColorPicker.spectrum("set", target.css("backgroundColor"));
								box.find(".uc_t_tool_info").find(".uc-text").css("color", target.css("backgroundColor"));

							},
							mouseover: function(event) {
								event.stopPropagation();
								event.target.style.cursor="pointer";
							}
						});
						
						editPanel.find(".layout-shadow-info").find(".uc-float-icon-checkbox-sel,.uc-float-icon-checkbox-nosel").on({
							click: function(event){
								event.stopPropagation();
								var clicktag = event.target.tagName;
								if(clicktag.toLowerCase()==="svg")
									var target = $(event.target);
								else if(clicktag.toLowerCase()==="use")
									var target = $(event.target).parent("svg");
								else
									return false;    
								var parent = target.parent(".uc-check-box");
								var siblings = target.siblings("svg");
								var val = siblings.attr("value");
								parent.attr("value",val);
								
								
								var shadowInfo = shadowBox.parents(".layout-shadow-info");
						        var hshadowval = shadowHSlider[0].noUiSlider.get();
						        var vshadowval = shadowVSlider[0].noUiSlider.get();
						        var shadowblurval = shadowWeightSlider[0].noUiSlider.get();
						        var shadowspreadval = shadowSpreadSlider[0].noUiSlider.get();
						        var shadowinsetval = shadowBox.find("#shadow-inset-val").attr("value");
						         if(!shadowinsetval) shadowinsetval = "";

						        shadowBox.css("shadowBox",hshadowval+"px "+vshadowval+"px "+shadowblurval+"px "+shadowspreadval+"px "+shadowColorPicker.spectrum("get").toRgbString() + " "+shadowinsetval);

								siblings.toggleClass("uc-float-icon-radio-nosel uc-float-icon-radio-sel zoomIn zoomOut uc-zindex-nag");
								target.toggleClass("uc-float-icon-radio-nosel uc-float-icon-radio-sel zoomIn zoomOut uc-zindex-nag");
							},
							mouseover: function(event) {
								event.stopPropagation();
								event.target.style.cursor="pointer";
							}
						});
						
						editPanel.find(".schedule-info").find(".uc-float-icon-radio-sel,.uc-float-icon-radio-nosel").on({
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
								if( cursel.attr("value") === "hour" ) {
									target.parents(".uc-input-block-table-row").siblings(".uc-input-block-table-row.interval-hour").css("display","flex");
									target.parents(".uc-input-block-table-row").siblings(".uc-input-block-table-row.interval-minute").css("display","none");
									
								} else if( cursel.attr("value") === "minute" ) {
									target.parents(".uc-input-block-table-row").siblings(".uc-input-block-table-row.interval-hour").css("display","none");
									target.parents(".uc-input-block-table-row").siblings(".uc-input-block-table-row.interval-minute").css("display","flex");
									
								} 
								var parent = target.parents(".uc-input-block-table-row");
								var lastsel = parent.find(".uc-radio-box[selected='selected']");
								
								cursel.attr("selected", "selected");
								lastsel.removeAttr("selected");
								
								var curseltxt = cursel.siblings("input[type='text']");
								if( curseltxt.length > 0 ) {
									curseltxt.removeAttr("disabled");
									curseltxt.toggleClass("uc-text-disable uc-text-editable");
								}
								var lastseltxt = lastsel.siblings("input[type='text']");
								if( lastseltxt.length > 0 ) {
									lastseltxt.attr("disabled","disabled");
									lastseltxt.toggleClass("uc-text-disable uc-text-editable");
								}
								//
								//var radios = parent.find(".uc-float-icon").toggleClass("uc-float-icon-radio-nosel uc-float-icon-radio-sel flipInX flipOutX uc-zindex-nag");
								lastsel.children(".uc-float-icon").toggleClass("uc-float-icon-radio-nosel uc-float-icon-radio-sel flipInX flipOutX uc-zindex-nag");
								cursel.children(".uc-float-icon").toggleClass("uc-float-icon-radio-nosel uc-float-icon-radio-sel flipInX flipOutX uc-zindex-nag");
							},
							mouseover: function(event) {
								event.stopPropagation();
								event.target.style.cursor="pointer";
							}
						});
						
						shadowBox.on({
							click: function(event){
								var target = $(event.target);
//								if( target.attr("selected") === "selected" )
//									return;
//								target.css("border", "1px solid #1296db");
//								target.attr("selected","selected");
//								target.siblings("div[id^='shadow-style'] [selected='selected']").removeAttr("selected");
//								target.siblings("div[id^='shadow-style'] [selected='selected']").css("border", "1px solid #888888");
								var hshadowval;
							     var vshadowval;
							     var shadowblurval;
							     var shadowspreadval;
							     var shadowinsetval;
						        	if(target.attr("id") === "shadow-style3") {
						        		hshadowval = -2;
									     vshadowval = -2;
									     shadowblurval = 3;
									     shadowspreadval = 0;
									     shadowinsetval="";
						        	} else if(target.attr("id") === "shadow-style2") {
						        		hshadowval = 2;
									     vshadowval = 2;
									     shadowblurval = 3;
									     shadowspreadval = 0;
									     shadowinsetval="";
						        	}  else if(target.attr("id") === "shadow-style1") {
						        		hshadowval = 0;
									     vshadowval = 0;
									     shadowblurval = 3;
									     shadowspreadval = 0;
									     shadowinsetval="";
						        	} else if(target.attr("id") === "shadow-style4") {
						        		hshadowval = 0;
									     vshadowval = 0;
									     shadowblurval = 3;
									     shadowspreadval = 0;
									     shadowinsetval="inset";
									     if( !target.parents(".layout-shadow-info").find(".shadow-inset-val").children("svg[value='inset']").hasClass("zoomIn") )
									    	 target.parents(".layout-shadow-info").find(".shadow-inset-val").children("svg[value='']").trigger("click");
						        	} else if(target.attr("id") === "shadow-style5") {
						        		hshadowval = 2;
									     vshadowval = 2;
									     shadowblurval = 3;
									     shadowspreadval = 0;
									     shadowinsetval="inset";
									     if( !target.parents(".layout-shadow-info").find(".shadow-inset-val").children("svg[value='inset']").hasClass("zoomIn") )
									    	 target.parents(".layout-shadow-info").find(".shadow-inset-val").children("svg[value='']").trigger("click");
						        	} else if(target.attr("id") === "shadow-style6") {
						        		hshadowval = -2;
									     vshadowval = -2;
									     shadowblurval = 3;
									     shadowspreadval = 0;
									     shadowinsetval="inset";
									     if( !target.parents(".layout-shadow-info").find(".shadow-inset-val").children("svg[value='inset']").hasClass("zoomIn") )
									    	 target.parents(".layout-shadow-info").find(".shadow-inset-val").children("svg[value='']").trigger("click");
						        	}
						        	
						        	shadowWeightSlider[0].noUiSlider.set(shadowblurval);
									shadowHSlider[0].noUiSlider.set(hshadowval);
									shadowVSlider[0].noUiSlider.set(vshadowval);
									shadowSpreadSlider[0].noUiSlider.set(shadowspreadval);
									
							     box.css("boxShadow", hshadowval+"px "+vshadowval+"px "+shadowblurval+"px "+shadowspreadval+"px "+ shadowColorPicker.spectrum("get").toRgbString() + " "+shadowinsetval);
							}
						});
						
						var borderBox = editPanel.find(".uc-sce-border-style").children(".uc_layouts_border_nosel,.uc_layouts_border_sel");
						borderBox.on({
							click: function(event){
								event.stopPropagation();
								var tag = $(event.target);
								tag.toggleClass("uc_layouts_border_nosel uc_layouts_border_sel");
								
//								var id = $(event.target).attr("id");
//								if( id === "border-style-top" ) {
//									var borderstyle = editPanel.find("#in-border-style");
//									if( borderstyle.css("border-top").indexOf("dashed") >= 0 ){
//										borderstyle.css("border-top","2px solid #888888");
//										
//									} else {
//										borderstyle.css("border-top","1px dashed #888888");
//									}
//								} else if( id === "border-style-right" ) {
//									var borderstyle = editPanel.find("#in-border-style");
//									if( borderstyle.css("border-right").indexOf("dashed") >= 0 ){
//										borderstyle.css("border-right","2px solid #888888");
//									} else {
//										borderstyle.css("border-right","1px dashed #888888");
//									}
//								} else if( id === "border-style-bottom" ) {
//									var borderstyle = editPanel.find("#in-border-style");
//									if( borderstyle.css("border-bottom").indexOf("dashed") >= 0 ){
//										borderstyle.css("border-bottom","2px solid #888888");
//									} else {
//										borderstyle.css("border-bottom","1px dashed #888888");
//									}
//								} else if( id === "border-style-left" ) {
//									var borderstyle = editPanel.find("#in-border-style");
//									if( borderstyle.css("border-left").indexOf("dashed") >= 0 ){
//										borderstyle.css("border-left","2px solid #888888");
//									} else {
//										borderstyle.css("border-left","1px dashed #888888");
//									}
//								}
							},
							mouseover: function(event) {
								event.stopPropagation();
								event.target.style.cursor="pointer";
							}
						});
						
						console.log(bgColorPicker);
						makeupColorPicker(bgColorPicker, "#ffffff", function(color) {
					    	box.css("backgroundColor", color.toRgbString());
					    },true,true,true) ;
						makeupColorPicker(fgColorPicker, null, function(color) {
							 boxContent.css("backgroundColor", color.toRgbString());
					    },true,true,true) ;
						makeupColorPicker(fntColorPicker, "#000000", function(color) {
							box.find(".uc_t_tool_info").find(".uc-text").css("color", color.toRgbString());
					    },true,true,true) ;
						makeupColorPicker(borderColorPicker, "#888888", function(color) {
					        //color.toHexString(); // #ff0000
							var bs = borderColorPicker.parents(".uc-input-block-table-row").find(".uc_layouts_border_nosel,.uc_layouts_border_sel");
							for(var i = 0; i<bs.length; i++) {
								if( $(bs[i]).attr("border") === "top" )
									$(bs[i]).css("border-top", "2px solid "+color.toRgbString());
								if( $(bs[i]).attr("border") === "left" )
									$(bs[i]).css("border-left", "2px solid "+color.toRgbString());
								if( $(bs[i]).attr("border") === "right" )
									$(bs[i]).css("border-right", "2px solid "+color.toRgbString());
								if( $(bs[i]).attr("border") === "bottom" )
									$(bs[i]).css("border-bottom", "2px solid "+color.toRgbString());
								
							}
							box.css("borderTopColor", color.toRgbString());
							box.css("borderBottomColor", color.toRgbString());
							box.css("borderRightColor", color.toRgbString()); 
							box.css("borderLeftColor", color.toRgbString());
					    },true,true,true) ;
//						makeupColorPicker(fgborderColorPicker, "#ffffff", function(color) {
//					        color.toHexString(); // #ff0000
//					    }) ;
						makeupColorPicker(shadowColorPicker, "#333333", function(color) {
					        //color.toHexString(); // #ff0000
					        //var lastshadow = shadowBox.css("shadowBox");
					        var shadowInfo = shadowBox.parents(".layout-shadow-info");
					        var hshadowval = shadowHSlider[0].noUiSlider.get();
					        var vshadowval = shadowVSlider[0].noUiSlider.get();
					        var shadowblurval = shadowWeightSlider[0].noUiSlider.get();
					        var shadowspreadval = shadowSpreadSlider[0].noUiSlider.get();
					        
					        var shadowinsetval = shadowBox.parents(".layout-shadow-info").find(".shadow-inset-val").attr("value");
					         if(!shadowinsetval) shadowinsetval = "";

					        for(var i=0;i<shadowBox.length;i++){
					        	if($(shadowBox[i]).attr("id") === "shadow-style3") {
					        		$(shadowBox[i]).css("boxShadow","-2px -2px 3px 0px " + color.toRgbString());
					        	} else if($(shadowBox[i]).attr("id") === "shadow-style2") {
					        		$(shadowBox[i]).css("boxShadow","2px 2px 3px 0px " + color.toRgbString());
					        	}  else if($(shadowBox[i]).attr("id") === "shadow-style1") {
					        		$(shadowBox[i]).css("boxShadow","0px 0px 3px 0px " + color.toRgbString());
					        	} else if($(shadowBox[i]).attr("id") === "shadow-style4") {
					        		$(shadowBox[i]).css("boxShadow","0px 0px 3px 0px "+color.toRgbString()+" inset");
					        	} else if($(shadowBox[i]).attr("id") === "shadow-style5") {
					        		$(shadowBox[i]).css("boxShadow","2px 2px 3px 0px "+color.toRgbString()+" inset");
					        	} else if($(shadowBox[i]).attr("id") === "shadow-style6") {
					        		$(shadowBox[i]).css("boxShadow","-2px -2px 3px 0px "+color.toRgbString()+" inset");
					        	}
					        }
					        box.css("boxShadow",parseInt(hshadowval)+"px "+parseInt(vshadowval)+"px "+parseInt(shadowblurval)+"px "+parseInt(shadowspreadval)+"px "+color.toRgbString() + " "+shadowinsetval);
					    },true,true,true) ;
													
//						makeupSlider(fgBorderRadiusSlider[0], 0, 20, 0, function(val){
//							var rv = editPanel.find("#fgborder-radius-val");
//							rv.val(val);
//						});
						makeupSlider(shadowSpreadSlider[0], 0, 20, 0, function(val){
							var rv = editPanel.find("#shadow-spread-val");
							rv.val(val);
							var shadowInfo = shadowBox.parents(".layout-shadow-info");
							var hshadowval = shadowHSlider[0].noUiSlider.get();
					        var vshadowval = shadowVSlider[0].noUiSlider.get();
					        var shadowblurval = shadowWeightSlider[0].noUiSlider.get();
					        //var shadowspreadval = shadowSpreadSlider[0].noUiSlider.get();
					        var shadowinsetval = shadowBox.parents(".layout-shadow-info").find(".shadow-inset-val").attr("value");
					         if(!shadowinsetval) shadowinsetval = "";

					        box.css("boxShadow",parseInt(hshadowval)+"px "+parseInt(vshadowval)+"px "+parseInt(shadowblurval)+"px "+parseInt(val)+"px "+shadowColorPicker.spectrum("get").toRgbString() + " "+shadowinsetval);

						});
						makeupSlider(shadowHSlider[0], -20, 20, 0, function(val){
							var rv = editPanel.find("#h-shadow-val");
							rv.val(val);
							var shadowInfo = shadowBox.parents(".layout-shadow-info");
							//var hshadowval = shadowHSlider[0].noUiSlider.get();
					        var vshadowval = shadowVSlider[0].noUiSlider.get();
					        var shadowblurval = shadowWeightSlider[0].noUiSlider.get();
					        var shadowspreadval = shadowSpreadSlider[0].noUiSlider.get();
					        var shadowinsetval = shadowBox.parents(".layout-shadow-info").find(".shadow-inset-val").attr("value");
					         if(!shadowinsetval) shadowinsetval = "";

					        box.css("boxShadow",parseInt(val)+"px "+parseInt(vshadowval)+"px "+parseInt(shadowblurval)+"px "+parseInt(shadowspreadval)+"px "+shadowColorPicker.spectrum("get").toRgbString()+ " "+shadowinsetval);

						});
						makeupSlider(shadowVSlider[0], -20, 20, 0, function(val){
							var rv = editPanel.find("#v-shadow-val");
							rv.val(val);
							var shadowInfo = shadowBox.parents(".layout-shadow-info");
							var hshadowval = shadowHSlider[0].noUiSlider.get();
					        //var vshadowval = shadowVSlider[0].noUiSlider.get();
					        var shadowblurval = shadowWeightSlider[0].noUiSlider.get();
					        var shadowspreadval = shadowSpreadSlider[0].noUiSlider.get();
					        var shadowinsetval = shadowBox.parents(".layout-shadow-info").find(".shadow-inset-val").attr("value");
					         if(!shadowinsetval) shadowinsetval = "";

					        box.css("boxShadow",parseInt(hshadowval)+"px "+parseInt(val)+"px "+parseInt(shadowblurval)+"px "+parseInt(shadowspreadval)+"px "+shadowColorPicker.spectrum("get").toRgbString() + " "+shadowinsetval);

						});
//						makeupSlider(fgBorderWidthRangeSlider[0], 0, 20, 0, function(val){
//							var rv = editPanel.find("#fgborder-weight-val");
//							rv.val(val);
//						});
						makeupSlider(rangeSlider[0], 0, 20, 0, function(val){
							var rv = editPanel.find("#border-radius-val");
							rv.val(val);
							box.css("borderRadius", val+"px");
						});
						makeupSlider(scheduleIntervalSlider[0], 1, 24, 1, function(val){
							var rv = editPanel.find("#scheduleInterval-val");
							rv.val(val);
						});
						makeupSlider(scheduleMinutesIntervalSlider[0], 1, 60, 5, function(val){
							var rv = editPanel.find("#scheduleMinutesInterval-val");
							rv.val(val);
						});
						
						makeupSlider(weightRangeSlider[0], 0, 20, 0, function(val){
							var rv = editPanel.find("#border-weight-val");
							rv.val(val);
							var selborder = editPanel.find(".uc-sce-border-style").children(".uc_layouts_border_sel");
							for(var i=0; i<selborder.length; i++ ) {
								if( $(selborder[i]).attr("border") === "top" ) {
									box.css("borderTopWidth", val+"px");
								}
								if( $(selborder[i]).attr("border") === "right" ) {
									box.css("borderRightWidth", val+"px");	
								}
								if( $(selborder[i]).attr("border") === "left" ) {
									box.css("borderLeftWidth", val+"px");
								}
								if( $(selborder[i]).attr("border") === "bottom" ) {
									box.css("borderBottomWidth", val+"px");
								}
							}
						});
						makeupSlider(shadowWeightSlider[0], 0, 20, 0, function(val){
							var rv = editPanel.find("#shadow-blur-val");
							rv.val(val);
							var shadowInfo = shadowBox.parents(".layout-shadow-info");
							var hshadowval = shadowHSlider[0].noUiSlider.get();
					        var vshadowval = shadowVSlider[0].noUiSlider.get();
					        //var shadowblurval = shadowWeightSlider[0].noUiSlider.get();
					        var shadowspreadval = shadowSpreadSlider[0].noUiSlider.get();
					        var shadowinsetval = shadowBox.parents(".layout-shadow-info").find(".shadow-inset-val").attr("value");
					         if(!shadowinsetval) shadowinsetval = "";
					         
					        box.css("boxShadow", parseInt(hshadowval)+"px "+parseInt(vshadowval)+"px "+parseInt(val)+"px "+parseInt(shadowspreadval)+"px "+shadowColorPicker.spectrum("get").toRgbString() + " "+shadowinsetval);

						});
						makeupSlider(paddingLeftSlider[0], 0, 20, 0, function(val){
							var rv = editPanel.find("#paddingLeft-val");
							rv.val(val);
							box.css("paddingLeft", val+"px");
						});
						makeupSlider(paddingRightSlider[0], 0, 20, 0, function(val){
							var rv = editPanel.find("#paddingRight-val");
							rv.val(val);
							box.css("paddingRight", val+"px");
						});
						makeupSlider(paddingTopSlider[0], 0, 20, 0, function(val){
							var rv = editPanel.find("#paddingTop-val");
							rv.val(val);
							box.css("paddingTop", val+"px");
						});
						makeupSlider(paddingBottomSlider[0], 0, 20, 0, function(val){
							var rv = editPanel.find("#paddingBottom-val");
							rv.val(val);
							box.css("paddingBottom", val+"px");
						});
						
					}
//					var rect = figureRect(".uc-populate-container");
//					console.log("uc-populate-container's width: " + rect["width"] + ", 30percent: " + (rect["width"]*0.3)+", min-width is 400px.");
//					var mw=400;
//					if( (rect["width"] * 0.3) > mw ) {
//						mw=rect["width"] * 0.3;
//					}
					
					//var blocks = $(".uc-edit-panel-main");
					
				} else if( target.hasClass("material") ) {
					/*
					editPanel = panel.find(".uc-edit-panel-material[scenarioId='"+scenarioId+"']");
					if( editPanel.length <= 0 ) {
						//invokeGet( "/var/subview/uc/scenarioEditPanel", function(data){
						//	console.log(data);
						//});
						editPanel = $(".uc-edit-panel-material[id='temp']").clone(true);
						editPanel.attr("scenarioId", scenarioId);
						editPanel.attr("display","current");
						editPanel.css("display","flex");
						//panelMain.hide();
						//panel.append(panelMain);
						//panelMain.addClass("fadeInRight animated delay-1s");
						panelMid.append(editPanel);
					}
					*/
					editPanel = panel.find(".uc-edit-panel-material");
					editPanel.css("display","flex");
					editPanel.attr("display","current");
					if( editPanel.attr("initiated") !== "initiated" ){
						initMaterialPanel(editPanel);
						editPanel.attr("initiated","initiated");
					}
				} 
				if( editPanel ) {
					editPanel.removeClass("fadeInRight fadeOutRight animated delay-1s");
					editPanel.addClass("fadeInRight animated delay-1s");
					editPanel.attr("display", "current");
				}
				
				if(lastdisplaypanel) {
					lastdisplaypanel.removeClass("fadeInRight fadeOutRight animated delay-1s");
					lastdisplaypanel.addClass("fadeOutRight animated");
					lastdisplaypanel.attr("display", "");
				}
				
			},
			
			mouseover:function(event){
				event.target.style.cursor="pointer";
			}
		});
	} 
//	
//	if (panel.hasClass("uc-PanelInRight")){
//		
//		var display = panel.finds(".uc-edit-panel-tag[display='current']");
//		if( display.length > 0 ) {
//			display.removeClass("fadeInRight animated delay-1s");
//			display.addClass("fadeOutRight animated");
//		}
//		panel.removeClass("uc-PanelInRight animated delay-1s");
//		panel.addClass("uc-PanelOutRight animated delay-1s");
//		
//		//panel.css("min-width","initial");
//		//panel.animate({width:"55px",minWidth:"0px"},500,"linear");
//		//blocks.animate({display: "none"},500,"linear");
//		//blocks.css("display","none");
//		//panel.css("display","none");
//	} else if(panel.hasClass("uc-PanelOutRight")) {
//		var display = panel.finds(".uc-edit-panel-tag[display='current']");
//		if( display.length > 0 ) {
//			display.removeClass("fadeOutRight animated delay-1s");
//			display.addClass("fadeInRight animated delay-1s");
//		} else {
//			var tagpanel = panel.finds(".uc-edit-panel-tag.scenario");
//			tagpanel.trigger("click");
//		}
//		
//		panel.removeClass("uc-PanelOutRight animated delay-1s");
//		panel.addClass("uc-PanelInRight animated");
//	} 
	panel.toggleClass("uc-PanelOutRight animated delay-1s");
	panel.toggleClass("uc-PanelInRight animated");
	
	if( panel.hasClass("uc-PanelInRight") ) {
		var editPanel = panel.find("div[class^='uc-edit-panel'][display='current']");
		if(editPanel.length>0){
			editPanel.removeClass("fadeInRight fadeOutRight animated delay-1s");
			editPanel.addClass("fadeInRight animated delay-1s");
			
		} else {
			display = panel.find(".uc-edit-panel-tag."+clickTag);
			display.trigger("click");
			//clickTag.trigger("click");
		}
	} else if( panel.hasClass("uc-PanelOutRight") ) {
		var editPanel = panel.find("div[class^='uc-edit-panel'][display='current']");
		
			if(editPanel.length>0 ) {
				editPanel.removeClass("fadeInRight fadeOutRight animated delay-1s");
				editPanel.addClass("fadeOutRight animated");
			}
		
	}
}

function initMaterialPanel(panel) {
	var listcon = panel.find(".uc-edit-comp-r-list-con");
	var addItem = panel.find(".uc-edit-comp-r-list-con").children(".uc-editSceMaterial-items-b.uc-editSceMaterial-add");
	var addedItems = addItem.siblings(".uc-editSceMaterial-items-b");
	
	addItem.on({
			click: function(event){
				event.stopPropagation();
				var itemid = "imaterial-"+guid() ;
				
				var curitem = listcon.children(".uc-editSceMaterial-items-b-sel");
				curitem.toggleClass("uc-editSceMaterial-items-b-sel");
				panel.find(".uc-edit-comp-r-editor-con[itemId='"+curitem.attr("itemId")+"']").hide();
				
				var itemAdded = $('<div class="uc-editSceMaterial-items-b uc-editSceMaterial-items-text uc-editSceMaterial-items-b-sel" itemId="'+itemid+'"> </div>');
				var itempanel = panel.find(".uc-edit-comp-r-editor-con[itemId='temp']").clone(true);
				listcon.append(itemAdded);

				itemAdded.on({
					click: function(event){
						if( $(event.target).hasClass("uc-editSceMaterial-items-b-sel") ) return;
						var last = $(event.target).siblings(".uc-editSceMaterial-items-b-sel");
						last.toggleClass("uc-editSceMaterial-items-b-sel");
						panel.find(".uc-edit-comp-r-editor-con[itemId='"+last.attr("itemId")+"']").hide();
						
						var itemid = $(event.target).attr("itemId");
						$(event.target).toggleClass("uc-editSceMaterial-items-b-sel");
						panel.find(".uc-edit-comp-r-editor-con[itemId='"+itemid+"']").css("display","flex");
						
						//var itempanel = panel.find(".uc-edit-comp-r-editor-con[itemId='"+itemid+"']");
						//itempanel.css("display","flex");
						
					},
					mouseover:function(event){
						event.stopPropagation();  
						event.target.style.cursor="pointer";
					}
				});
				
				itempanel.find(".uc-float-icon-radio-sel,.uc-float-icon-radio-nosel").on({
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
						
						var listitem = listcon.children(".uc-editSceMaterial-items-b[itemId='"+ itempanel.attr("itemId")+"']");
						listitem.toggleClass("uc-editSceMaterial-items-"+cursel.attr("value")+" uc-editSceMaterial-items-"+lastsel.attr("value"));
						
//						var curseltxt = cursel.siblings("input[type='text']");
//						if( curseltxt.length > 0 ) {
//							curseltxt.removeAttr("disabled");
//							curseltxt.toggleClass("uc-text-disable uc-text-editable");
//						}
//						var lastseltxt = lastsel.siblings("input[type='text']");
//						if( lastseltxt.length > 0 ) {
//							lastseltxt.attr("disabled","disabled");
//							lastseltxt.toggleClass("uc-text-disable uc-text-editable");
//						}
						//
						//var radios = parent.find(".uc-float-icon").toggleClass("uc-float-icon-radio-nosel uc-float-icon-radio-sel flipInX flipOutX uc-zindex-nag");
						lastsel.children(".uc-float-icon").toggleClass("uc-float-icon-radio-nosel uc-float-icon-radio-sel flipInX flipOutX uc-zindex-nag");
						cursel.children(".uc-float-icon").toggleClass("uc-float-icon-radio-nosel uc-float-icon-radio-sel flipInX flipOutX uc-zindex-nag");
					},
					mouseover: function(event) {
						event.stopPropagation();
						event.target.style.cursor="pointer";
					}
				});
				var detBtn = itempanel.find("button[name='uc-edit-comp-r-editor-submit-del']");
				detBtn.on({
					click: function(event) {
						var itemId = itempanel.attr("itemId");
						var itemSelId = listcon.find(".uc-editSceMaterial-items-b[itemId='"+itemId+"']");
						var preItem = itemSelId.prev();
						
						itemSelId.remove();
						itempanel.remove();
						
						if( !preItem.attr("itemId") ) return;
						preItem.toggleClass("uc-editSceMaterial-items-b-sel");
						panel.find(".uc-edit-comp-r-editor-con[itemId='"+preItem.attr("itemId")+"']").css("display","flex");

					}
				})
				itempanel.css("display","flex");
				itempanel.attr("itemId",itemid);
				itempanel.addClass("uc-edit-comp-r-editor-con-sel");
				panel.find(".uc-edit-comp-r-editor").append(itempanel);
			},
			mouseover:function(event){
				event.stopPropagation();  
				event.target.style.cursor="pointer";
			}
	});
	
}
function ucItemUnbinding(event) {
	if( commonConfirm( "是否要解绑元素？" ) ) {
		var target = $(event.target);
		var row = target.parents(".uc-input-block-table-row");
		var bindingItemID = row.attr("bindingItemId");
		var bindingItem = $(".uc-edit-panel-material").find(".uc-edit-comp-r-editor-con[itemId='"+bindingItemID+"']");
		//bindingItem.find("button[name='uc-edit-comp-r-editor-submit-binding']").toggleClass("uc-editSceMaterial-binding-ani");
		bindingItem.removeClass("ucMaterialComponentBeBindinged");
		bindingItem.find("button[name='uc-edit-comp-r-editor-submit-binding']").css("backgroundColor","");
		bindingItem.find("button[name='uc-edit-comp-r-editor-submit-binding']").removeClass("ucMaterialBeBindinged");
		
		row.removeAttr("bindingItemId");
		row.removeClass("uc-input-block-table-row-binded");
		target.hide();
		target.siblings(".eBinding").show();
	}
}
function ucItemBinding(event) {
	var target = $(event.target);
	if( target.attr("name") !== "uc-edit-comp-r-editor-submit-binding" )
		target = target.parents("button[name='uc-edit-comp-r-editor-submit-binding']");
	if( !target.hasClass("uc-editSceMaterial-binding-ani") ) return;
	var parent = target.parents(".uc-edit-comp-r-editor-con");
	
	var editMaterial = $("div[class^='uc-editSceMaterial-spec-'][scenarioId='"+current_ucMaterialScenarioId+"']");
	var editMaterialItem = editMaterial.find(".uc-input-block-table-row[itemId='"+current_ucMaterialItemEditId+"']");
	editMaterialItem.attr("bindingItemId", parent.attr("itemId"));
	editMaterialItem.toggleClass("uc-input-block-table-row-binding uc-input-block-table-row-binded");
	editMaterialItem.find(".eRemoving").show();
	editMaterialItem.find(".eRecieving").hide();
	
	parent.find("button[name='uc-edit-comp-r-editor-submit-binding']").toggleClass("uc-editSceMaterial-binding-ani");
	parent.toggleClass("ucMaterialComponentBeBindinged");
	target.css("backgroundColor","rgba(61,125,83,1.0)");
	target.addClass("ucMaterialBeBindinged");
	$(".uc-edit-panel-material").find("button[name='uc-edit-comp-r-editor-submit-binding']").not(".ucMaterialBeBindinged").toggleClass("uc-editSceMaterial-binding-ani");

}
var current_ucMaterialItemEditId;
var current_ucMaterialScenarioId;
function ucCorpusItemEdit(event, method) {
	var target = $(event.target);
	if( method==="title") {
		
	} else if( method==="binding") {
		var row = target.parents(".uc-input-block-table-row");
		var bindingRow = row.siblings(".uc-input-block-table-row-binding");
		if( bindingRow.length > 0 ) {
			bindingRow.find(".eBinding").show();
			bindingRow.find(".eRecieving").hide();
		}
		
		target.hide();
		target.siblings(".eRecieving").show();
		var id = row.attr("itemId");
		current_ucMaterialItemEditId = id;
		var corpus = target.parents(".uc-editSceMaterial-spec-corpus");
		current_ucMaterialScenarioId = corpus.attr("scenarioId");
		
		$(".uc-edit-panel-material").find("button[name='uc-edit-comp-r-editor-submit-binding']").not(".ucMaterialBeBindinged").toggleClass("uc-editSceMaterial-binding-ani");
		
		row.addClass("uc-input-block-table-row-binding");
		//row.toggleClass("uc-editSceMaterial-binding-ani");
	} else if( method==="link") {
		corpusNextPage(event);
	} else if( method==="delete") {
		deleteInputBlock(event);
	} else
		return;
}

function corpusNextPage(event) {
	var panel = $(event.target).parents(".uc-editSceMaterial-spec-corpus");
	var newPage = panel.children(".uc-editSceMaterial-corpus-p").clone();
	panel.append($('<div class="uc-editSceMaterial-p-link">'+
								'	<svg class="uc-float-icon" style="font-size: 1.95em; color: #888;" aria-hidden="true">'+
					    		'			<use xlink:href="#icon-changlianjie"></use>'+
								'	</svg>'+
								'</div>'));
	panel.append(newPage);
}

$(document).ready(function(){ 
	mainInit();
	
//	var canvas = $(".uc-canvasM");
//	//console.log("Canvas width: %d, height: %d", canvas.width(), canvas.height());
//	canvas.css("minWidth", (window.screen.availWidth * 0.9)+"px");
//	canvas.css("minHeight", (window.screen.availHeight * 0.85) + "px");
//	canvas.css("width", (window.screen.availWidth * 0.9)+"px");
//	canvas.css("height", (window.screen.availHeight * 0.85) + "px");
	
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
	
	$(".deleteScenarioBox").on({
		click: function(event){
			event.stopPropagation();
			var tbox = $(event.target).parents(".uc_t_box");
			var sid = tbox.attr("scenarioId");
			
			var panel = $(".uc-edit-panel").children(".uc-edit-panel-mid");
			var editPanel = panel.children(".uc-edit-panel-layouts[scenarioId='"+sid+"']");
			var editMaterial = panel.children(".uc-edit-panel-material[scenarioId='"+sid+"']");
			editPanel.remove();
			editMaterial.remove();
			
			tbox.remove();
		},
		mouseover:function(event){
			event.target.style.cursor="pointer";
		}
	});
//	$(".icon.editManually").on({
//		click: function(event){
//			var clicktag = event.target.tagName;
//			if(clicktag==="svg")
//				var tag = $(event.target).children("use");
//			else if(clicktag==="use")
//				var tag = $(event.target);
//			else
//				return false;
//			
//			var overlay = $(".overlay");
//			overlay.css("display","block");
//			overlay.on({
//				click: function(event){
//					$(event.target).hide();
//					var compEditor = $(".page-main-div").find(".uc-edit-components[status='modify']");
//					compEditor.hide();
//					compEditor.attr("status","hide");
//				}
//			});
//			var main = $(".page-main-div");
//			var box = tag.parents(".uc_t_box");
//			var scenarioId = box.attr("scenarioId");
//			var compEditor = $(".uc-edit-components[scenarioId='"+scenarioId+"']");
//			if(compEditor.length <= 0){
//				compEditor = $(".uc-edit-components[id='_temp']").clone(true);
//				compEditor.attr("scenarioId",scenarioId);
//				main.append(compEditor);
//			}
//			var compEditorRight=compEditor.children(".uc-edit-comp-l");
//			compEditorRight.css("display","none");
//			
//			compEditor.css("display","flex");
//			compEditor.attr("status","modify");
//			
//		},
//		mouseover:function(event){
//			event.target.style.cursor="pointer";
//			
//			//event.target.setAttribute('onIcon', true);
//			//event.stopPropagation();    //标准   
//	        //event.cancelBubble = true;  //IE  
//		}
//	});
	
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
	/*
	$(".uc-bg-fg-chg").on({
		click: function(event){
			event.stopPropagation(); 
			var block = $(event.target).parents(".uc-edit-panel-block");
			var areas = block.find(".uc-input-area");
			
			var chg1 = block.find(".uc-bg-fg-chg1");
			var chg2 = block.find(".uc-bg-fg-chg2");
			chg1.toggleClass("uc-bg-fg-chg1 uc-bg-fg-chg2");
			chg2.toggleClass("uc-bg-fg-chg1 uc-bg-fg-chg2");

			areas.toggleClass("flipInX uc-input-area-z6 flipOutX uc-input-area-z5");
			areas.removeClass("animated");
			areas.addClass("animated");
		},
		mouseover:function(event){
			event.target.style.cursor="pointer";
		}
	});*/
	
	$(".editSceLayouts").on({
		click: function(event){
			event.stopPropagation(); 
			popEditPanel($(event.target), "scenario") ;
		},
		mouseover:function(event){
			event.target.style.cursor="pointer";
		}
	});
	$(".quickSceTemplate").on({
		click: function(event){
			event.stopPropagation(); 
		},
		mouseover:function(event){
			event.target.style.cursor="pointer";
		}
	});
	$(".editSceMaterial").on({
		click: function(event){
			event.stopPropagation(); 
			var box = $(event.target).parents(".uc_t_box");
			var boxContent = box.children(".uc_t_boxC");
			var scenarioId = box.attr("scenarioId");
			var stype  = box.attr("sType");
			
			var editSceMaterial = $(".uc-editSceMaterial");
			//TODO: refresh items
			var items = editSceMaterial.children(".uc-editSceMaterial-items").children(".uc-editSceMaterial-items-b");
			for( var i=0; i<items.length; i++ ) {
				
			}
			var temp = editSceMaterial.children("div[class^='uc-editSceMaterial-spec'][stype='"+stype+"'][scenarioId='"+scenarioId+"']");
			if( temp.length > 0 ) {
				temp.css("display","flex");
				
			} else {
				temp = editSceMaterial.children("div[class^='uc-editSceMaterial-spec'][stype='"+stype+"'][scenarioId='temp']").clone(true);
				temp.css("display","flex");
				temp.attr("scenarioId",scenarioId);
				editSceMaterial.append(temp);
			}
			
			$(".uc-canvas-overlay").show();
			editSceMaterial.css("display","flex");
			$(".uc-canvasM").css("filter","blur(2px)");
		},
		mouseover:function(event){
			event.target.style.cursor="pointer";
		}
	});
	$(".uc-editSceMaterial-close-btn").on({
		click: function(event){
			event.stopPropagation(); 
			$(".uc-canvas-overlay").hide();
			$(".uc-editSceMaterial").css("display","none");
			$(".uc-editSceMaterial").children("div[class^='uc-editSceMaterial-spec']").hide();
			$(".uc-canvasM").css("filter","blur(0px)");
		},
		mouseover:function(event){
			event.target.style.cursor="pointer";
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
	
	$(".uc-float-menu-one.icon-beijing").on({
		click: function(event){
			event.stopPropagation(); 
			popEditPanel($(event.target), "template") ;
		},
		mouseover:function(event){
			event.target.style.cursor="pointer";
		}
	});
	
	$(".uc-float-menu-one.icon-zujian").on({
		click: function(event){
			event.stopPropagation(); 
			popEditPanel($(event.target), "material") ;
		},
		mouseover:function(event){
			event.target.style.cursor="pointer";
		}
	});
	
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
	$(".uc-editSceMaterial-add-item").on({
		click: function(event){
			var clicktag = event.target.tagName;
			if(clicktag.toLowerCase()==="svg")
				var target = $(event.target).children("use");
			else if(clicktag.toLowerCase()==="use")
				var target = $(event.target);
			else
				return false;
			event.stopPropagation(); 
			
			//var area = target.parents(".uc-input-block-table");
			var areaBody = target.parents(".uc-edit-panel-block").find("#uc_corpus_item_def_table");
			var itemid = guid();
			areaBody.append($('<div class="uc-input-block-table-row" itemId="'+itemid+'" style="height: 25px; align-items:center; justify-content: space-around;">'+
										'			<div style="width: 35%; display: flex; align-items: center; justify-content: center; text-align:right;white-space : nowrap; ">'+
										'			<img src="/var/images/uc_icon_edit.png" style="height: 20px;" onclick="ucCorpusItemEdit(event, \'title\');" onmouseover="this.style.cursor=\'pointer\';" />'+
										'			<input type="text" style="width: 0%; background-color: rgb(213,213,213,0.0);border-bottom: 1px solid rgb(204,188,138,1.0); border-top:0px; border-right:0px; border-left:0px;" />'+
										'		</div>'+
										'		<div style="width: 25%;  display: flex; align-items: center; justify-content: center; ">'+
										'			<img src="/var/images/uc_icon_connecting.png" style="height: 20px;" onclick="ucCorpusItemEdit(event, \'binding\');" onmouseover="this.style.cursor=\'pointer\';" />'+
										'		</div>'+
										'		<div style="width: 20%;  display: flex; align-items: center; justify-content: center; text-align:right;white-space : nowrap; ">'+
										'			<img src="/var/images/uc_icon_data_connect_arrow.png" style="height: 20px;" onclick="ucCorpusItemEdit(event,\'link\');" onmouseover="this.style.cursor=\'pointer\';" />'+
										'		</div>'+
										'		<div style="width: 20%; display:flex; align-items: center; justify-content: space-around; white-space : nowrap; ">'+
										'			<img src="/var/images/uc_icon_garbage_box.png" style="height: 20px;" onclick="ucCorpusItemEdit(event, \'delete\');" onmouseover="this.style.cursor=\'pointer\';" />'+
										'		</div>'+
										'	</div>'));
		},
		mouseover:function(event){
			event.target.style.cursor="pointer";
		}
	});
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
			
			//var area = target.parents(".uc-input-block-table");
			var areaBody = target.parents(".uc-input-block-table");
			areaBody.append($('<div class="uc-input-block-table-row custom-rows">'+
												'	<div style="width: 20%; ">'+
												'	<span class="uc-text cn_input_label">属性</span>'+
												'</div>'+
												'<div style="width: 30%; ">'+
												'	<input type="text" style="width: 95%; background-color: rgb(213,213,213,0.0);border-bottom: 1px solid rgb(204,188,138,1.0); border-top:0px; border-right:0px; border-left:0px;" />'+
												'</div>'+
												'<div style="width: 20%; ">'+
												'	<span class="uc-text cn_input_label">值</span>'+
												'</div>'+
												'<div style="width: 30%; ">'+
												'	<input type="text" style="width: 95%; background-color: rgb(213,213,213,0.0);border-bottom: 1px solid rgb(204,188,138,1.0); border-top:0px; border-right:0px; border-left:0px;" />'+
												'</div>'+
												'<svg class="icon" onmouseover="this.style.cursor=\'pointer\';" onclick="deleteInputBlock(event);" style="font-size: 20px; color: #000000;" aria-hidden="true">'+
												'					<use xlink:href="#icon-jianhao"></use>'+
												'					</svg>'+
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
			
			//var mask = target.parents(".uc-edit-comp-r-editor-nav").siblings("#uc-edit-comp-nav-bar-mask");
			//var maskIdx = mask.attr("index");
			//console.log(mask.width());
			//var move = targetIdx*mask.width();
			//console.log("move: "+move);
			//mask.animate({ left:move+"px"}, 400,"linear");
			//mask.attr("index",targetIdx);
			var selector = target.parent(".uc-edit-comp-r-editor-nav").siblings(".uc-edit-comp-r-editor-content").children(".uc-edit-components-selector[index='"+targetIdx+"']");
			
			var cur = target.parent(".uc-edit-comp-r-editor-nav").children(".uc-edit-comp-nav-bar.selected");
			target.find(".cn_input_label").css({"font-size": "1.15em","color": "#000"});
			cur.find(".cn_input_label").css({"font-size": "1em","color": "#888"});
			
			var displaySel = target.parent(".uc-edit-comp-r-editor-nav").siblings(".uc-edit-comp-r-editor-content").children(".uc-edit-components-selector[index='"+cur.attr("index")+"']");
			//displaySel.hide();
			displaySel.css("display","none");
			//selector.show();
			selector.css("display","flex");
			
			target.toggleClass("selected");
			cur.toggleClass("selected");
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
							'	style="font-size: 1.92em; color: #888;"'+
							'	aria-hidden="true">'+
	    					'<use xlink:href="#icon-lianjiexian2"></use>'+
							'</svg>'+
							'<svg onmouseover="this.style.cursor=\'pointer\';" onclick="changePageComponentEditor(event)" class="icon"'+
								'style="font-size: 2em; color: #888;"'+
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
			//selectorKey.show();
			//selectorVal.hide();
			selectorKey.css("display","flex");
			selectorVal.css("display","none");
			
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
			//selectorKey.hide();
			//selectorVal.show();
			selectorKey.css("display","none");
			selectorVal.css("display","flex");
			
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
	
	//getDisplayInfo();
//	$(".uc-edit-components").on({
//		click: function(event){
//			
//		}
//	});
});