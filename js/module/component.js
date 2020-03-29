(function ($){
	$.multiOptionSelector = function(target, opts){
		if( !target || target.length == 0 ) return;
		target.click(function(event){
			$("body").append(con);
			con.css({
                    "top": (event.pageY + 10) + "px",
                    "position": "absolute",
                    "left": (event.pageX + 20) + "px"
                }).show("fast");
		});
		
		var comp=target;
		var con=null;
		
		var optionsUri = opts["options"];
		var entity = opts["entity"];
		var template='<div id="multiOptionSelector" style="position:absolute;left:500px;top:500px;width:370px;height:170px;border: 7px solid #425066;z-index:15;border-radius: 1px;background-color: rgba(255,255,255,1.0); padding: 4px 4px;">'+
								'		<div style="display:flex; width:100%;height:50%;">'+
								'			<div class="selected" style="display:flex; padding: 4px 4px;align-content:flex-start;flex-wrap:wrap;width:100%;height:100%;overflow-x:hidden;overflow-y:auto;">'+
								'			</div>'+
								'			<div style="display:flex;align-items:flex-start;width:10px;height:100%;">'+
								'				<svg class="uc-float-icon close-btn" style=" font-size: 0.87em; font-weight: 400;color: #333;" aria-hidden="true">				    				'+
								'					<use xlink:href="#icon-clear2"></use>'+
								'				</svg>'+
								'			</div>'+
								'		</div>'+
								'		<div class="options" style=" padding: 4px 4px;border-top:1px solid #efefef;display:flex;flex-wrap:wrap; align-content:flex-start;align-items:flex-start;width:100%;height:50%;overflow-x:hidden;overflow-y:auto; justify-content:flex-start;">'+
								'			<div style="width: 55px; display: flex; align-items:  flex-end; white-space : nowrap;"><span class="uc-text cn_block_title">请选择:</span></div>&nbsp;&nbsp;'+
								'			<button style="border:0px;outline:none;background-color:rgba(255,255,255,0.0);"><span class="uc-text cn_input_label" style="color: #c83c23;">新增</span></button>'+
								'		</div>'+
								'	</div>	';
		
		var getSelectedItems = function(){
			var sels = con.find(".selected").children("div");
			var items=[];
			for(var i=0;i<sels.length;i++) {
				var item={};
				item["categoryId"]=sels.attr("categoryId");
				item["label"]=sels.find(".cn_block_title").text();
				items.append(item);
			}
			return items;
		}
		var addNewC = function(item){
			var item = $('<button id="'+item["categoryId"]+'" style="border:0px;outline:none;background-color:rgba(255,255,255,0.0);"><span class="uc-text cn_input_label">'+item["label"]+'</span></button>&nbsp;&nbsp;&nbsp;');
			item.click(function(event){
				var sel = $('<div style="display:flex;align-items:center;white-space : nowrap;">'+
						'<span class="uc-text cn_block_title" style="color: #c83c23;"></span>'+
						'<svg class="uc-float-icon" style=" font-size: 1.07em; font-weight: 400;color: #333;" aria-hidden="true">'+				    				
						'	<use xlink:href="#icon-lajitong3"></use>'+
						'</svg>'+
						'</div>&nbsp;&nbsp;&nbsp;');
				sel.attr("categoryId",item["categoryId"]);
				sel.find(".cn_block_title").text($(this).children(".cn_input_label").text());
				sel.find("svg").click(function(event){
					$(event.target).parents('div').remove();
				});
				con.find(".selected").append(sel);		
			});
			con.find("button:last").before(item);
		};
		this.update = function(items){
			
		};
		this.ini = function(){
			con = $(template);
			
			con.find(".close-btn").click(function(event){
				//$(this).parents("#multiOptionSelector").remove();
				var sels = con.find(".selected").children("div");
				var str="";
				for(var i=0;i<sels.length;i++) {
					str+=sels.find(".cn_block_title").text()+" ";
				}
				target.val(str);
				$(this).parents("#multiOptionSelector").hide();
			});
			
			con.find("button:last").click(function(event){
				var tnew = $('<div style="display:flex;align-items:center;white-space : nowrap;">'+
										'		<input type="text" class="input-category-editor" value="" style="width: 39px;height:20px;border:0px;border-bottom: 1px solid rgb(204,188,138,1.0);outline:none;" />'+
										'			<svg class="uc-float-icon" style=" font-size: 0.91em; font-weight: 400;color: #333;" aria-hidden="true">				    				'+
										'				<use xlink:href="#icon-iconfontyixuancopy2"></use>'+
										'			</svg>'+
										'			<svg class="uc-float-icon" style=" font-size: 0.91em; font-weight: 400;color: #333;" aria-hidden="true">				    		'+		
										'				<use xlink:href="#icon-lajitong3"></use>'+
										'			</svg>'+
										'</div>&nbsp;&nbsp;&nbsp;');
				
				tnew.find("svg").eq(0).click(function(event){
					var body={"label":tnew.find("input[type='text']").val(),"categoryId":null};
					invokeRrequest( "/var/action/find/updateUserCategory", function(data){
						addNewC(body);
						tnew.remove();
					},  body);
				});
				tnew.find("svg").eq(1).click(function(event){
					tnew.remove();
				});
				$(this).before(tnew);
				tnew.find("input[type='text']").focus();
			});
			
			invokeRrequest(optionsUri, function(data){
				var items = data["items"];
				for(var i=0;i<items.length;i++) {
					addNewC(items[i]);
				}
			}, entity);
			
			
		}
		if(con == null)
			ini();
	};
	
	$.varRichColorPicker = function(target, opts){
		if( !target || target.length == 0 ) return;
		
		var comp=target;
		target.spectrum({
		    color: opts["init"],
		    showAlpha: opts["alpha"]?true:false,
		    showInput: opts["input"]?true:false,
		    allowEmpty: opts["empty"]?true:false,
		    change: opts["change"]
		});
		this.getRgbString = function(){
			if( !comp.spectrum("get") )
				return "rgba(255,255,255,0.0)";
			return comp.spectrum("get").toRgbString();
		}
		this.update = function(co) {
			if( !StringUtil.isEmpty(co) && co.toLowerCase() != "none" )
				comp.spectrum("set",co);
		}
	};
	$.varSimpleColorPicker = function(args){
		var id;
		var name;
		
	};
	$.varSliderBar = function(args){
		var target = args["target"];
		var min = args["min"]; 
		var max = args["max"]; 
		var start = args["start"]; 
		var callback = args["callback"];
		//var step = 0;
		if( args.hasOwnProperty('step') )
			step = args["step"];
		
		var val;
		var inied = false;
		var needInt = true;
		if( args["needInt"] === false ) needInt = false;
		
		var setVal = function(v){
			val = v;
		}
		this.getVal = function(){
			return val;
		}
		this.update = function(val){
			target.noUiSlider.set(val);
		}
		var ini = function() {
			if( !target ) return;
			
			noUiSlider.create(target, {
			    start: [start],
			    //step: step,
			    range: {
			        'min': [min],
			        'max': [max]
			    }
			
			});
			target.noUiSlider.on("update", 
					function (values, handle, unencoded, tap, positions) {
				if (handle === 0) {
					if(needInt)
						var val = parseInt(values[handle]);
					else
						var val = values[handle];
					setVal(val);
					if( inied && callback ) {
						try {
							callback(val);
						} catch(err){
						     console.log(err);
						}
					}
				}
			});
			
			inied = true;
		};
		
		ini();
	};
	
	$.varCheckBox = function(args){
		var target = args["target"];
		var cb = args["callback"];
		
		this.isChecked = function() {
			var item = target.find(".uc-float-icon-checked.checked");
			if(item.length>0)
				return true;
			else
				return false;
		};
		this.update = function(checked){
			if(checked&&this.isChecked()) return;
			if(!checked&&!this.isChecked()) return;
			target.find(".uc-float-icon-checked").click();
		}
		var ini = function() {
			var callback = cb;
			target.find(".uc-float-icon-nochecked,.uc-float-icon-checked").on({
				click: function(event) {
					event.stopPropagation();
					var target = $(event.target);
					
					target.parents(".uc-check-box").children(".uc-float-icon-nochecked,.uc-float-icon-checked").toggleClass("uc-float-icon-nochecked uc-float-icon-checked");

					callback();					
				}, 
				mouseover: function(event) {
					event.stopPropagation();
					event.target.style.cursor="pointer";
				}
			});
			
		};
		ini();
	};
	$.varInputTxt = function(args){
		var root = args["target"];
		var cb = args["callback"];
		var event = args["event"];
		var target;
		this.getTarget = function(){
			return target;
		}
		this.setTarget = function(event){
			target = $(event.target);
		}
		var ini = function(){
			root.bind(event, cb);
		};
		this.getVal = function(){
			return root.val();
		}
		this.setVal = function(v){
			root.val(v);
		}
		ini();
	};
	$.varRadioBox = function(args){
		var root = args["target"];
		var cb = args["callback"];
		
		this.getSelectValue = function() {
			var item = root.find(".uc-radio-box.checked");
			return item.attr("item");
		};
		this.update = function(item) {
			var parent = root.find(".uc-radio-box[item='"+item+"']");
			if( parent.hasClass("checked") ) return;
			parent.find(".uc-float-icon-radio-sel").click();
			
		}
		var ini = function() {
			var callback = cb;
			var rt = root;
			root.find(".uc-float-icon-radio-sel,.uc-float-icon-radio-nosel").on({
				click: function(event) {
					event.stopPropagation();
					var target = $(event.target);
					if( target.parents(".uc-radio-box").hasClass("checked") )
						return;
					
					rt.find(".uc-radio-box.checked").children(".uc-float-icon-radio-sel,.uc-float-icon-radio-nosel").toggleClass("uc-float-icon-radio-sel uc-float-icon-radio-nosel");
					rt.find(".uc-radio-box.checked").toggleClass("checked");
					
					target.parents(".uc-radio-box").children(".uc-float-icon-radio-sel,.uc-float-icon-radio-nosel").toggleClass("uc-float-icon-radio-sel uc-float-icon-radio-nosel");
					target.parents(".uc-radio-box").toggleClass("checked");

					callback();					
				}, 
				mouseover: function(event) {
					event.stopPropagation();
					event.target.style.cursor="pointer";
				}
			});
			
		};
		ini();
	};

})(window.jQuery);

var _varUCCommonComp = (function ($){
	$.varUCCommonComp = function(args){
		var registeredBox = {};
		this.register = function(type, cls) {
			registeredBox[type] = cls;
		};
		this.updateCompRectInfo = function(event){
			var target = $(event.target);
			if(!target.hasClass("uc-box"))
				target = target.parents(".uc-box");
			
			if( target.attr("scenarioId") == _varUCEditComponent.getCurrentCompID() ){
				var panel = _varComponentLayoutPanel.getEditComponents();
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() ).get();
				
				var con = _varDocument.getCanvasContainer();
				var conWidth = con.width();
				var conHeight = con.height();
				
				var compWidth = comp.outerWidth();
				var compHeight = comp.outerHeight();

				panel.find("#sceWidth-fixed-val").val(compWidth);
				panel.find("#sceWidth-percent-val").val(compWidth/conWidth);
				panel.find("#sceHeight-fixed-val").val(compHeight);
				panel.find("#sceHeight-percent-val").val(compHeight/conHeight);
			}
		};
		this.updateCompPositionInfo = function(event){
			var target = $(event.target);
			if(!target.hasClass("uc-box"))
				target = target.parents(".uc-box");
			
			if( target.attr("scenarioId") == _varUCEditComponent.getCurrentCompID() ){
				var panel = _varComponentLayoutPanel.getEditComponents();
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() ).get();
				
				var con = _varDocument.getCanvasContainer();
				var conWidth = con.width();
				var conHeight = con.height();
				
				var x = mGetIntValue(comp.attr("data-x"),0);
				var y = mGetIntValue(comp.attr("data-y"),0);

				panel.find("#scePositionX-fixed-val").val(x);
				panel.find("#scePositionX-percent-val").val(x/conWidth);
				panel.find("#scePositionY-fixed-val").val(y);
				panel.find("#scePositionY-percent-val").val(y/conHeight);
			}
		}
		
		this.draw = function(obj,data) {
			var scenario_div = obj.get();
			
			data["layout"]["positionX"] = x;
			data["layout"]["positionY"] = y;
			data["layout"]["width"] = compWidth;
			data["layout"]["height"] = compHeight;
			
			var shadow = scenario_div.css("boxShadow");
			if( !StringUtil.isEmpty(shadow) && shadow != "none" )
				data["layout"]["shadow"] = shadow;
			
			var borderTopWidth = mGetIntValue(scenario_div.css("borderTopWidth"),0);
			var borderLeftWidth = mGetIntValue(scenario_div.css("borderLeftWidth"),0);
			var borderBottomWidth = mGetIntValue(scenario_div.css("borderBottomWidth"),0);
			var borderRightWidth = mGetIntValue(scenario_div.css("borderRightWidth"),0);
			data["layout"]["borderTopWidth"] = borderTopWidth;
			data["layout"]["borderLeftWidth"] = borderLeftWidth;
			data["layout"]["borderBottomWidth"] = borderBottomWidth;
			data["layout"]["borderRightWidth"] = borderRightWidth;
			
			var bgColor = mGetStringValue(scenario_div.css("backgroundColor"),null);
			var borderColor = mGetStringValue(scenario_div.css("borderColor"),null);
			var borderStyle = mGetStringValue(scenario_div.css("borderStyle"),null);
			var borderRadius = mGetIntValue(scenario_div.css("borderRadius"),0);
			data["layout"]["bgColor"] = bgColor;
			data["layout"]["borderColor"] = borderColor;
			data["layout"]["borderStyle"] = borderStyle;
			data["layout"]["borderRadius"] = borderRadius;
			
			var paddingLeft = mGetIntValue(scenario_div.css("paddingLeft"),0);
			var paddingRight = mGetIntValue(scenario_div.css("paddingRight"),0);
			var paddingTop = mGetIntValue(scenario_div.css("paddingTop"),0);
			var paddingBottom = mGetIntValue(scenario_div.css("paddingBottom"),0);
			data["layout"]["paddingLeft"] = paddingLeft;
			data["layout"]["paddingRight"] = paddingRight;
			data["layout"]["paddingTop"] = paddingTop;
			data["layout"]["paddingBottom"] = paddingBottom;
			
			var widthMode = scenario_div.attr("widthMode");
			var heightMode = scenario_div.attr("heightMode");
			var positionMode = scenario_div.attr("positionMode");
			data["layout"]["widthMode"] = widthMode;
			data["layout"]["heightMode"] = heightMode;
			data["layout"]["positionMode"] = positionMode;
		}
		this.fillMaterial = function(obj) {
			_varInvoker.request( "UC","material", {id: obj.getID(), type: obj.getType()} );
		}
		
		this.fillLayout = function(obj) {
			var panel = _varComponentLayoutPanel.getEditComponents();
			var comp = obj.get();//_varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() ).get();
			
			var con = _varDocument.getCanvasContainer();
			var conWidth = con.width();
			var conHeight = con.height();
			
			var x = mGetIntValue(comp.attr("data-x"),0);
			var y = mGetIntValue(comp.attr("data-y"),0);
			var compWidth = comp.outerWidth();
			var compHeight = comp.outerHeight();

			panel.find("#sceWidth-fixed-val").val(compWidth);
			panel.find("#sceWidth-percent-val").val(Math.round(compWidth/conWidth*100));
			panel.find("#sceHeight-fixed-val").val(compHeight);
			panel.find("#sceHeight-percent-val").val(Math.round(compHeight/conHeight*100));
			panel.find("#scePositionX-fixed-val").val(x);
			panel.find("#scePositionX-percent-val").val(Math.round(x/conWidth*100));
			panel.find("#scePositionY-fixed-val").val(y);
			panel.find("#scePositionY-percent-val").val(Math.round(y/conHeight*100));
			
			var shadow = comp.css("boxShadow");
			var shadowInfo,shadowH,shadowV,shadowS,shadowB,shadowI=false,shadowC;
			if(shadow) {
				shadowInfo = shadow.split(" ");
				if(shadowInfo.length>=5){
					shadowH = shadowInfo[0];
					shadowV = shadowInfo[1];
					shadowS = shadowInfo[3];
					shadowB = shadowInfo[2];
					if(shadowInfo.length>5){
						if( shadowInfo[6].trim() === 'inset' ) shadowI = true;
					}
					shadowC = shadowInfo[4];
				}
			}
			var borderWidth=0;
			if( mGetIntValue(comp.css("borderTopWidth"),0) > 0 )
				borderWidth = mGetIntValue(comp.css("borderTopWidth"),0);
			else if( mGetIntValue(comp.css("borderLeftWidth"),0) > 0 )
				borderWidth = mGetIntValue(comp.css("borderLeftWidth"),0);
			else if( mGetIntValue(comp.css("borderBottomWidth"),0) > 0 )
				borderWidth = mGetIntValue(comp.css("borderBottomWidth"),0);
			else if( mGetIntValue(comp.css("borderRightWidth"),0) > 0 )
				borderWidth = mGetIntValue(comp.css("borderRightWidth"),0);
			
			_varComponentLayoutPanel.bgColorPicker.update(mGetStringValue(comp.css("backgroundColor"),null));
			_varComponentLayoutPanel.borderColorPicker.update(mGetStringValue(comp.css("borderColor"),null));
			_varComponentLayoutPanel.shadowColorPicker.update(mGetStringValue(shadowC,null));
			
			_varComponentLayoutPanel.rangeSlider.update(mGetIntValue(comp.css("borderRadius"),0));
			_varComponentLayoutPanel.weightRangeSlider.update(borderWidth);		
			
			_varComponentLayoutPanel.paddingLeftSlider.update(mGetIntValue(comp.css("paddingLeft"),0));
			_varComponentLayoutPanel.paddingRightSlider.update(mGetIntValue(comp.css("paddingRight"),0));
			_varComponentLayoutPanel.paddingTopSlider.update(mGetIntValue(comp.css("paddingTop"),0));
			_varComponentLayoutPanel.paddingBottomSlider.update(mGetIntValue(comp.css("paddingBottom"),0));

			_varComponentLayoutPanel.shadowWeightSlider.update(mGetIntValue(shadowB,0));
			_varComponentLayoutPanel.shadowHSlider.update(mGetIntValue(shadowH,0));
			_varComponentLayoutPanel.shadowVSlider.update(mGetIntValue(shadowV,0));
			_varComponentLayoutPanel.shadowSpreadSlider.update(mGetIntValue(shadowS,0));
			
			//compLayoutMode.update(shadowblurval);
			_varComponentLayoutPanel.compshadowMode.update(shadowI);
			
			_varComponentLayoutPanel.compWidthMode.update(comp.attr("widthMode"));
			_varComponentLayoutPanel.compHeightMode.update(comp.attr("heightMode"));
			_varComponentLayoutPanel.compPositionMode.update(comp.attr("positionMode"));
		}
		
		this.collect = function(data) {
			data["layout"] = {};
			var x = mGetIntValue(scenario_div.attr("data-x"),0);
			var y = mGetIntValue(scenario_div.attr("data-y"),0);
			var compWidth = scenario_div.width();
			var compHeight = scenario_div.height();
			data["layout"]["positionX"] = x;
			data["layout"]["positionY"] = y;
			data["layout"]["width"] = compWidth;
			data["layout"]["height"] = compHeight;
			
			var shadow = scenario_div.css("boxShadow");
			if( !StringUtil.isEmpty(shadow) && shadow != "none" )
				data["layout"]["shadow"] = shadow;
			
			var borderTopWidth = mGetIntValue(scenario_div.css("borderTopWidth"),0);
			var borderLeftWidth = mGetIntValue(scenario_div.css("borderLeftWidth"),0);
			var borderBottomWidth = mGetIntValue(scenario_div.css("borderBottomWidth"),0);
			var borderRightWidth = mGetIntValue(scenario_div.css("borderRightWidth"),0);
			data["layout"]["borderTopWidth"] = borderTopWidth;
			data["layout"]["borderLeftWidth"] = borderLeftWidth;
			data["layout"]["borderBottomWidth"] = borderBottomWidth;
			data["layout"]["borderRightWidth"] = borderRightWidth;
			
			var bgColor = mGetStringValue(scenario_div.css("backgroundColor"),null);
			var borderColor = mGetStringValue(scenario_div.css("borderColor"),null);
			var borderStyle = mGetStringValue(scenario_div.css("borderStyle"),null);
			var borderRadius = mGetIntValue(scenario_div.css("borderRadius"),0);
			data["layout"]["bgColor"] = bgColor;
			data["layout"]["borderColor"] = borderColor;
			data["layout"]["borderStyle"] = borderStyle;
			data["layout"]["borderRadius"] = borderRadius;
			
			var paddingLeft = mGetIntValue(scenario_div.css("paddingLeft"),0);
			var paddingRight = mGetIntValue(scenario_div.css("paddingRight"),0);
			var paddingTop = mGetIntValue(scenario_div.css("paddingTop"),0);
			var paddingBottom = mGetIntValue(scenario_div.css("paddingBottom"),0);
			data["layout"]["paddingLeft"] = paddingLeft;
			data["layout"]["paddingRight"] = paddingRight;
			data["layout"]["paddingTop"] = paddingTop;
			data["layout"]["paddingBottom"] = paddingBottom;
			
			var widthMode = scenario_div.attr("widthMode");
			var heightMode = scenario_div.attr("heightMode");
			var positionMode = scenario_div.attr("positionMode");
			data["layout"]["widthMode"] = widthMode;
			data["layout"]["heightMode"] = heightMode;
			data["layout"]["positionMode"] = positionMode;
			
		}
		this.getID = function(comp){
			return comp.get().attr("scenarioId");
		};
		this.append = function(opts){
			
			var scenario_div= $(".uc-box[type='"+opts["type"]+"']").clone(true);
			 _varDocument.getCanvasContainer().append(scenario_div);
			 
			 _id = "uc_sce__"+guid();
				scenario_div.attr("scenarioId",_id);
				scenario_div.attr("id",_id);
				scenario_div.css('display', 'flex');
				scenario_div.css('width', opts["width"]+"px");
				scenario_div.css('height', opts["height"]+"px");
				scenario_div.attr("widthMode","absolute");
				scenario_div.attr("heightMode","absolute");
				scenario_div.attr("positionMode","absolute");
					
			var sid = _id;
			
				scenario_div.on({
					 dblclick: function(event){
							var target = $(event.target);
							event.stopPropagation(); 
							_varUCEditComponent.show(sid);
						}
				 });
				
				draggabilly("#"+_id,".uc-canvas-container", this.updateCompPositionInfo, null,  { "able": true, 
					"edge-left": false,
					"edge-right": true,
					"edge-top": false,
					"edge-bottom": true,
					//"min-width": 100,
					//"min-height": 50
					"callback": this.updateCompRectInfo
					},  {
						restriction : ".uc-canvas-container",
						endOnly : true,
						elementRect : {
							top : 0,
							left : 0,
							bottom : 1,
							right : 1
						}
					},  null);
				var comp = new registeredBox[opts["type"]]({"box":scenario_div});
				comp.append();
				return comp;
		};
		
		this.adjust = function(comp, obj) {
			//var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() ).get();			
			if( obj === _varComponentLayoutPanel.bgColorPicker ){
				comp.css("backgroundColor", _varComponentLayoutPanel.bgColorPicker.getRgbString());
			}
			else if( obj === _varComponentLayoutPanel.fgColorPicker ){}
			else if( obj === _varComponentLayoutPanel.borderColorPicker ){
//				if( comp.css("border-top") && comp.css("border-top").length>0 ){
//					comp.css("borderTopColor", borderColorPicker.getRgbString());
//
//				}
//				if( comp.css("border-left") && comp.css("border-left").length>0 ){
//					comp.css("borderLeftColor", borderColorPicker.getRgbString());
//
//				}
//				if( comp.css("border-right") && comp.css("border-right").length>0 ){
//					comp.css("borderRightColor", borderColorPicker.getRgbString());
//
//				}
//				if( comp.css("border-bottom") && comp.css("border-bottom").length>0 ){
//					comp.css("borderBottomColor", borderColorPicker.getRgbString());
//
//				}
				comp.css("borderColor", _varComponentLayoutPanel.borderColorPicker.getRgbString());
			}
			else if( obj === _varComponentLayoutPanel.shadowColorPicker ){
				var bs = _varComponentLayoutPanel.shadowHSlider.getVal()+"px "+_varComponentLayoutPanel.shadowVSlider.getVal()+"px "+this.shadowWeightSlider.getVal()+"px "+this.shadowSpreadSlider.getVal()+"px "+this.shadowColorPicker.getRgbString()+" ";
				if( _varComponentLayoutPanel.compshadowMode.isChecked() ) {
					bs += "inset";
				}
				comp.css("boxShadow",  bs);
			}
			else if( obj === _varComponentLayoutPanel.rangeSlider ){
				comp.css("borderRadius", _varComponentLayoutPanel.rangeSlider.getVal()+"px");
			}
			else if( obj === _varComponentLayoutPanel.weightRangeSlider ){
				if( _varComponentLayoutPanel.boxBorderTop.isChecked() ){
					comp.css("borderTopWidth", _varComponentLayoutPanel.weightRangeSlider.getVal()+"px");
				}
				if( _varComponentLayoutPanel.boxBorderLeft.isChecked() ){
					comp.css("borderLeftWidth", _varComponentLayoutPanel.weightRangeSlider.getVal()+"px");
				}
				if( _varComponentLayoutPanel.boxBorderRight.isChecked() ){
					comp.css("borderRightWidth", _varComponentLayoutPanel.weightRangeSlider.getVal()+"px");
				}
				if( _varComponentLayoutPanel.boxBorderBottom.isChecked() ){
					comp.css("borderBottomWidth", _varComponentLayoutPanel.weightRangeSlider.getVal()+"px");
				}
			}		
			else if( obj === _varComponentLayoutPanel.paddingLeftSlider ){
				comp.css("paddingLeft", _varComponentLayoutPanel.paddingLeftSlider.getVal()+"px");
			}
			else if( obj === _varComponentLayoutPanel.paddingRightSlider ){
				comp.css("paddingRight", _varComponentLayoutPanel.paddingRightSlider.getVal()+"px");
			}
			else if( obj === _varComponentLayoutPanel.paddingTopSlider ){
				comp.css("paddingTop", _varComponentLayoutPanel.paddingTopSlider.getVal()+"px");
			}
			else if( obj === _varComponentLayoutPanel.paddingBottomSlider ){
				comp.css("paddingBottom", _varComponentLayoutPanel.paddingBottomSlider.getVal()+"px");
			}
			else if( obj === _varComponentLayoutPanel.shadowWeightSlider ){
					var bs = _varComponentLayoutPanel.shadowHSlider.getVal()+"px "+_varComponentLayoutPanel.shadowVSlider.getVal()+"px "+_varComponentLayoutPanel.shadowWeightSlider.getVal()+"px "+_varComponentLayoutPanel.shadowSpreadSlider.getVal()+"px "+_varComponentLayoutPanel.shadowColorPicker.getRgbString()+" ";
					if( _varComponentLayoutPanel.compshadowMode.isChecked() ) {
						bs += "inset";
					}
					comp.css("boxShadow",  bs);
			}
			else if( obj === _varComponentLayoutPanel.shadowHSlider ){
					var bs = _varComponentLayoutPanel.shadowHSlider.getVal()+"px "+_varComponentLayoutPanel.shadowVSlider.getVal()+"px "+_varComponentLayoutPanel.shadowWeightSlider.getVal()+"px "+_varComponentLayoutPanel.shadowSpreadSlider.getVal()+"px "+_varComponentLayoutPanel.shadowColorPicker.getRgbString()+" ";
					if( _varComponentLayoutPanel.compshadowMode.isChecked() ) {
						bs += "inset";
					}
					comp.css("boxShadow",  bs);
			}
			else if( obj === _varComponentLayoutPanel.shadowVSlider ){
					var bs = _varComponentLayoutPanel.shadowHSlider.getVal()+"px "+_varComponentLayoutPanel.shadowVSlider.getVal()+"px "+_varComponentLayoutPanel.shadowWeightSlider.getVal()+"px "+_varComponentLayoutPanel.shadowSpreadSlider.getVal()+"px "+_varComponentLayoutPanel.shadowColorPicker.getRgbString()+" ";
					if( _varComponentLayoutPanel.compshadowMode.isChecked() ) {
						bs += "inset";
					}
					comp.css("boxShadow",  bs);
			}
			else if( obj === _varComponentLayoutPanel.shadowSpreadSlider ){
					var bs = _varComponentLayoutPanel.shadowHSlider.getVal()+"px "+_varComponentLayoutPanel.shadowVSlider.getVal()+"px "+_varComponentLayoutPanel.shadowWeightSlider.getVal()+"px "+_varComponentLayoutPanel.shadowSpreadSlider.getVal()+"px "+_varComponentLayoutPanel.shadowColorPicker.getRgbString()+" ";
					if( _varComponentLayoutPanel.compshadowMode.isChecked() ) {
						bs += "inset";
					}
					comp.css("boxShadow",  bs);
			}
			
			else if( obj === _varComponentLayoutPanel.compLayoutMode ){
				if( _varComponentLayoutPanel.compLayoutMode.getSelectValue() === "absolute" ){
					_editPanel.find("#sceWidth-val").val(comp.outerWidth());
					_editPanel.find("#sceXPosition-val").val(comp.position().left);
					_editPanel.find("#sceHeight-val").val(comp.outerHeight());
					_editPanel.find("#sceYPosition-val").val(comp.position().top);
					
				} else if( _varComponentLayoutPanel.compLayoutMode.getSelectValue() === "relative" ){
					var p = comp.offsetParent();
					_editPanel.find("#sceWidth-val").val(comp.outerWidth()/p.width());
					_editPanel.find("#sceXPosition-val").val(comp.position().left/p.width());
					_editPanel.find("#sceHeight-val").val(comp.outerHeight()/p.height());
					_editPanel.find("#sceYPosition-val").val(comp.position().top/p.height());
					
				}
				_editPanel.find(".basic-info").find(".uc-float-icon-radio-sel,.uc-float-icon-radio-nosel").toggleClass("uc-float-icon-radio-sel uc-float-icon-radio-nosel");
			}
			else if( obj === _varComponentLayoutPanel.compshadowMode ){
				var bs = _varComponentLayoutPanel.shadowHSlider.getVal()+"px "+_varComponentLayoutPanel.shadowVSlider.getVal()+"px "+_varComponentLayoutPanel.shadowWeightSlider.getVal()+"px "+_varComponentLayoutPanel.shadowSpreadSlider.getVal()+"px "+_varComponentLayoutPanel.shadowColorPicker.getRgbString()+" ";
				if( _varComponentLayoutPanel.compshadowMode.isChecked() ) {
					bs += "inset";
				}
				comp.css("boxShadow",  bs);
				
			} else if( obj === _varComponentLayoutPanel.compBorderStyle) {
				comp.css("borderStyle", v.compBorderStyle.getSelectValue() );
			} 
			else if( obj === _varComponentLayoutPanel.compWidthMode) {
				comp.attr("widthMode",_varComponentLayoutPanel.compWidthMode.getSelectValue() );
				
			} else if( obj === _varComponentLayoutPanel.compHeightMode) {
				comp.attr("heightMode",_varComponentLayoutPanel.compHeightMode.getSelectValue() );

			} else if( obj === _varComponentLayoutPanel.compPositionMode) {
				comp.attr("positionMode",_varComponentLayoutPanel.compPositionMode.getSelectValue() );

			} else if( obj === _varComponentLayoutPanel.compRectInfo) {
				var target = _varComponentLayoutPanel.compRectInfo.getTarget();
				var unit = target.siblings(".value_unit").text();
				comp.css( target.attr("csstyle"), target.val()+unit);
				
				if ( _varComponentLayoutPanel.compPositionMode.getSelectValue() === 'absolute' ) {
					comp.attr('data-x', mGetIntValue(comp.css("left"),0));
					comp.attr('data-y', mGetIntValue(comp.css("top"),0));
				} else if ( _varComponentLayoutPanel.compPositionMode.getSelectValue() === 'relative' ) {
					var pl = mGetIntValue(comp.css("left"),0);
					var pt = mGetIntValue(comp.css("top"),0);
					comp.attr('data-x', _varDocument.getCanvasContainer().width()*pl/100);
					comp.attr('data-y', _varDocument.getCanvasContainer().height()*pt/100);
				}
				
			}
		}
	};
	return new $.varUCCommonComp();
})(window.jQuery);