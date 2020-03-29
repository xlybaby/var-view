(function($){
	$.varSubscribeCompBox = function(args){
		var scenario_div = args["box"];

		var _materialID;
		this.setMaterial = function(id){
			_materialID = id;
		};
		this.getMaterial = function(){
			return _materialID;
		};
		this.getCSStyle = function(css){
			return scenario_div.css(css);
		};
		
		this.get = function(){
			return scenario_div;
		};
		
		this.getType=function(){
			return "subscribe";
		};
		this.append = function(){
			
		};
		this.draw = function(data) {
			//TODO
		};
		this.collect = function(obj) {
			var data={};
			_varUCCommonComp.collect(data);
			
			var cntBgColor = scenario_div.find(".uc-editSceMaterial-subscribe-block").css("backgroundColor");
			data["ucBox"]["backgroundColor"] = cntBgColor;
			var cntFntColor = scenario_div.find(".uc-editSceMaterial-subscribe-block").find("uc-text").css("color");
			data["ucBox"]["fntColor"] = cntFntColor;
			var cntBorderColor = scenario_div.find(".uc-editSceMaterial-subscribe-block").css("borderColor");
			data["ucBox"]["borderColor"] = cntBorderColor;
			var cntBorderWidth = scenario_div.find(".uc-editSceMaterial-subscribe-block").css("borderWidth");
			data["ucBox"]["borderWidth"] = cntBorderWidth;
			var cntWidth = scenario_div.find(".uc-editSceMaterial-subscribe-block").css("width");
			data["ucBox"]["width"] = cntWidth;
			var cntHeight = scenario_div.find(".uc-editSceMaterial-subscribe-block").css("height");
			data["ucBox"]["height"] = cntHeight;
			var cntBorderRadius = scenario_div.find(".uc-editSceMaterial-subscribe-block").css("borderRadius");
			data["ucBox"]["borderRadius"] = cntBorderRadius;
			var cntRowHeight = scenario_div.find(".uc-editSceMaterial-subscribe-block").find(".uc-input-block-table-row").css("height");
			data["ucBox"]["rowHeight"] = cntRowHeight;
			var cntLetterSpacing = scenario_div.find(".uc-editSceMaterial-subscribe-block").find(".uc-text").css("letterSpacing");
			data["ucBox"]["letterSpacing"] = cntLetterSpacing;
			var cntFntSize = scenario_div.find(".uc-editSceMaterial-subscribe-block").find(".uc-text").css("fontSize");
			data["ucBox"]["fontSize"] = cntFntSize;
			var cntFntStyle = scenario_div.find(".uc-editSceMaterial-subscribe-block").find(".uc-text").css("fontStyle");
			data["ucBox"]["fontStyle"] = cntFntStyle;
			var cntRowBorderColor = scenario_div.find(".uc-editSceMaterial-subscribe-block-row").css("borderColor");
			data["ucBox"]["rowBorderColor"] = cntRowBorderColor;
			var cntRowBgColor = scenario_div.find(".uc-editSceMaterial-subscribe-block-row").css("backgroundColor");
			data["ucBox"]["rowBackgroundColor"] = cntRowBgColor;
			var cntRowWidth = scenario_div.find(".uc-editSceMaterial-subscribe-block-row").css("width");
			data["ucBox"]["rowWidth"] = cntRowWidth;
			var cntRowBorderRadius = scenario_div.find(".uc-editSceMaterial-subscribe-block-row").css("borderRadius");
			data["ucBox"]["rowBorderRadius"] = cntRowBorderRadius;
			var cntRowBorderStyle = scenario_div.find(".uc-editSceMaterial-subscribe-block-row").css("borderStyle");
			data["ucBox"]["rowBorderStyle"] = cntRowBorderStyle;
			var listAlign = scenario_div.find(".uc-editSceMaterial-subscribe-block-row").css("justify-content");
			data["ucBox"]["rowAlignH"] = listAlign;
			var cntBorderStyle = scenario_div.find(".uc-editSceMaterial-subscribe-block").css("borderStyle");
			data["ucBox"]["borderStyle"] = cntBorderStyle;
			var listAlignV = scenario_div.find(".uc-editSceMaterial-subscribe-block").css("align-items");
			data["ucBox"]["listAlignV"] = listAlignV;
			var listAlignH = scenario_div.find(".uc-editSceMaterial-subscribe-block").css("justify-content");
			data["ucBox"]["listAlignH"] = listAlignH;
			var listNum = scenario_div.attr("listNum");
			data["ucBox"]["listNum"] = listNum;
			var keyWords = scenario_div.attr("keyWords");
			data["ucBox"]["keyWords"] = keyWords;
			
			data["material"] = _materialID;
			return data;
		}
		this.fill = function(obj) {
			var panel = _varUCEditPanelBrowser.getPanel();

			if( obj === _varComponentLayoutPanel) {
				_varUCCommonComp.fillLayout(this);
			} else if( obj === _varUCEditPanelSubscribe) {
				_varUCEditPanelSubscribe.listBgColorPicker.update(scenario_div.find(".uc-editSceMaterial-subscribe-block").css("backgroundColor"));
				_varUCEditPanelSubscribe.fntColorPicker.update(scenario_div.find(".uc-editSceMaterial-subscribe-block").find("uc-text").css("color"));
				_varUCEditPanelSubscribe.borderColorPicker.update(scenario_div.find(".uc-editSceMaterial-subscribe-block").css("borderColor"));
				_varUCEditPanelSubscribe.listRowBorderColorPicker.update(scenario_div.find(".uc-editSceMaterial-subscribe-block-row").css("borderColor"));
				_varUCEditPanelSubscribe.listRowBgColorPicker.update(scenario_div.find(".uc-editSceMaterial-subscribe-block-row").css("backgroundColor"));

				_varUCEditPanelSubscribe.borderWidthSlider.update(scenario_div.find(".uc-editSceMaterial-subscribe-block").css("borderWidth"));

				_varUCEditPanelSubscribe.listWidthSlider.update(scenario_div.find(".uc-editSceMaterial-subscribe-block").css("width"));

				_varUCEditPanelSubscribe.listHeightSlider.update(scenario_div.find(".uc-editSceMaterial-subscribe-block").css("height"));

				_varUCEditPanelSubscribe.listBorderRadiusSlider.update(scenario_div.find(".uc-editSceMaterial-subscribe-block").css("borderRadius"));

				_varUCEditPanelSubscribe.listFntSpacingSlider.update(scenario_div.find(".uc-editSceMaterial-subscribe-block").find(".uc-text").css("letterSpacing"));

				_varUCEditPanelSubscribe.listFntSizeSlider.update(mGetIntValue(scenario_div.find(".uc-editSceMaterial-subscribe-block").find(".uc-subscribe-title").css("font-size"),0));

				_varUCEditPanelSubscribe.lsitFntStyle.update(scenario_div.find(".uc-editSceMaterial-subscribe-block").find(".uc-text").css("fontStyle"));

				
					_varUCEditPanelSubscribe.listRowWidthSlider.update(scenario_div.find(".uc-editSceMaterial-subscribe-block-row").css("width"));

					_varUCEditPanelSubscribe.listRowRadiusSlider.update(scenario_div.find(".uc-editSceMaterial-subscribe-block-row").css("borderRadius"));

					_varUCEditPanelSubscribe.listRowHeightSlider.update(scenario_div.find(".uc-editSceMaterial-subscribe-block-row").css("height"));

					_varUCEditPanelSubscribe.listRowBorderWidthSlider.update(scenario_div.find(".uc-editSceMaterial-subscribe-block-row").css("borderRadius"));

					_varUCEditPanelSubscribe.lsitRowBorderStyle.update(scenario_div.find(".uc-editSceMaterial-subscribe-block-row").css("borderStyle"));
			
					_varUCEditPanelSubscribe.lsitBorderStyle.update(scenario_div.find(".uc-editSceMaterial-subscribe-block").css("borderStyle"));
					_varUCEditPanelSubscribe.lsitFntAlign.update(scenario_div.find(".uc-editSceMaterial-subscribe-block-row").css("justify-content"));
					
					_varUCEditPanelSubscribe.listNumSlider.update(mGetIntValue(scenario_div.attr("listNum"),10));

					_varUCEditPanelSubscribe.lsitAlignH.update(scenario_div.find(".uc-editSceMaterial-subscribe-block").css("justify-content") ) ;
					_varUCEditPanelSubscribe.lsitAlignV.update(scenario_div.find(".uc-editSceMaterial-subscribe-block").css("align-items") ) ;
					
					panel.find("#uc-spec-subscribe-catch-val").val(mGetStringValue(scenario_div.attr("keyWords"),''));
			}  else if( obj === _varComponentMaterialPanel) {
				_varUCCommonComp.fillMaterial(this);
				
			}
		};
		this.adjust = function(obj) {
			//var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() ).get();
			var panel = _varUCEditPanelSubscribe.getPanel();
			
			if( obj === _varUCEditPanelSubscribe.listBgColorPicker ) {
				scenario_div.find(".uc-editSceMaterial-subscribe-block").css("backgroundColor",_varUCEditPanelSubscribe.listBgColorPicker.getRgbString());
			}
			else if( obj === _varUCEditPanelSubscribe.fntColorPicker ) {
				scenario_div.find(".uc-editSceMaterial-subscribe-block-row").find("uc-text").css("color",_varUCEditPanelSubscribe.fntColorPicker.getRgbString());

			}
			else if( obj === _varUCEditPanelSubscribe.borderColorPicker ){
				scenario_div.find(".uc-editSceMaterial-subscribe-block").css("borderColor",_varUCEditPanelSubscribe.borderColorPicker.getRgbString());
			}
			else if( obj === _varUCEditPanelSubscribe.borderWidthSlider ){
				panel.find("#uc-subscribe-border-width-val").val(_varUCEditPanelSubscribe.borderWidthSlider.getVal());
				scenario_div.find(".uc-editSceMaterial-subscribe-block").css("borderWidth",_varUCEditPanelSubscribe.borderWidthSlider.getVal()+"px");
			}
			
			else if( obj === _varUCEditPanelSubscribe.listWidthSlider ) {
				panel.find("#uc-subscribe-width-val").val(_varUCEditPanelSubscribe.listWidthSlider.getVal());
				scenario_div.find(".uc-editSceMaterial-subscribe-block").css("width",_varUCEditPanelSubscribe.listWidthSlider.getVal()+"%");

			}
			else if( obj === _varUCEditPanelSubscribe.listHeightSlider ) {
				panel.find("#uc-subscribe-high-val").val(_varUCEditPanelSubscribe.listHeightSlider.getVal());
				scenario_div.find(".uc-editSceMaterial-subscribe-block").css("height",_varUCEditPanelSubscribe.listHeightSlider.getVal()+"%");

			}
			else if( obj === _varUCEditPanelSubscribe.listBorderRadiusSlider ) {
				panel.find("#uc-subscribe-border-radius-val").val(_varUCEditPanelSubscribe.listBorderRadiusSlider.getVal());
				scenario_div.find(".uc-editSceMaterial-subscribe-block").css("borderRadius",_varUCEditPanelSubscribe.listBorderRadiusSlider.getVal()+"px");

			}
			else if( obj === _varUCEditPanelSubscribe.listFntMarginTopSlider ) {
				panel.find("#uc-subscribe-fnt-margin-top-val").val(_varUCEditPanelSubscribe.listFntMarginTopSlider.getVal());
				scenario_div.find(".uc-editSceMaterial-subscribe-block").find(".uc-input-block-table-row").css("height",_varUCEditPanelSubscribe.listFntMarginTopSlider.getVal()+"px");

			}
			else if( obj === _varUCEditPanelSubscribe.listFntSpacingSlider ) {
				panel.find("#uc-subscribe-fnt-spacing-val").val(_varUCEditPanelSubscribe.listFntSpacingSlider.getVal());
				scenario_div.find(".uc-editSceMaterial-subscribe-block-row").find(".uc-text").css("letterSpacing",_varUCEditPanelSubscribe.listFntSpacingSlider.getVal()+"px");

			}
			else if( obj === _varUCEditPanelSubscribe.listFntSizeSlider ) {
				panel.find("#uc-subscribe-fnt-size-val").val(_varUCEditPanelSubscribe.listFntSizeSlider.getVal());
				scenario_div.find(".uc-editSceMaterial-subscribe-block-row").find(".uc-text").css("fontSize",_varUCEditPanelSubscribe.listFntSizeSlider.getVal()+"px");

			}
			else if( obj ===_varUCEditPanelSubscribe.lsitFntStyle ) {				
				scenario_div.find(".uc-editSceMaterial-subscribe-block-row").find(".uc-text").css("fontStyle",_varUCEditPanelSubscribe.lsitFntStyle.getSelectValue());
			}
			
			else if( obj === _varUCEditPanelSubscribe.listRowBorderColorPicker ) {
				scenario_div.find(".uc-editSceMaterial-subscribe-block-row").css("borderColor",_varUCEditPanelSubscribe.listRowBorderColorPicker.getRgbString());

			}
				else if( obj === _varUCEditPanelSubscribe.listRowBgColorPicker ) {
					scenario_div.find(".uc-editSceMaterial-subscribe-block-row").css("backgroundColor",_varUCEditPanelSubscribe.listRowBgColorPicker.getRgbString());

				}
				
				else if( obj === _varUCEditPanelSubscribe.listRowWidthSlider ) {
					panel.find("#in_subscribe-row-width-val").val(_varUCEditPanelSubscribe.listRowWidthSlider.getVal());
					scenario_div.find(".uc-editSceMaterial-subscribe-block-row").css("width",_varUCEditPanelSubscribe.listRowWidthSlider.getVal()+"%");
				}
				else if( obj === _varUCEditPanelSubscribe.listRowRadiusSlider ) {
					panel.find("#uc-subscribe-row-borderRadius-val").val(_varUCEditPanelSubscribe.listRowRadiusSlider.getVal());
					scenario_div.find(".uc-editSceMaterial-subscribe-block-row").css("borderRadius",_varUCEditPanelSubscribe.listRowRadiusSlider.getVal()+"px");
				}
				else if( obj === _varUCEditPanelSubscribe.listRowBorderWidthSlider ) {
					panel.find("#uc-subscribe-row-borderWidth-val").val(_varUCEditPanelSubscribe.listRowBorderWidthSlider.getVal());
					scenario_div.find(".uc-editSceMaterial-subscribe-block-row").css("borderWidth",_varUCEditPanelSubscribe.listRowBorderWidthSlider.getVal()+"px");
				}
			
				else if( obj === _varUCEditPanelSubscribe.listRowHeightSlider ) {
					panel.find("#uc-subscribe-row-height-val").val(_varUCEditPanelSubscribe.listRowHeightSlider.getVal());
					scenario_div.find(".uc-editSceMaterial-subscribe-block-row").css("height",_varUCEditPanelSubscribe.listRowHeightSlider.getVal()+"px");
				}
				else if( obj === _varUCEditPanelSubscribe.listNumSlider ) {
					panel.find("#in_uc-subscribe-listnum-val").val(_varUCEditPanelSubscribe.listNumSlider.getVal());
					scenario_div.attr("listNum",_varUCEditPanelSubscribe.listNumSlider.getVal());
				}
				
				else if( obj === _varUCEditPanelSubscribe.lsitRowBorderStyle ) {
					scenario_div.find(".uc-editSceMaterial-subscribe-block-row").css("borderStyle",_varUCEditPanelSubscribe.lsitRowBorderStyle.getSelectValue());
				}
				else if( obj === _varUCEditPanelSubscribe.lsitBorderStyle ) {
					scenario_div.find(".uc-editSceMaterial-subscribe-block").css("borderStyle",_varUCEditPanelSubscribe.lsitBorderStyle.getSelectValue());

				}
				else if( obj === _varUCEditPanelSubscribe.lsitFntAlign ) {
					scenario_div.find(".uc-editSceMaterial-subscribe-block-row").css("justify-content",_varUCEditPanelSubscribe.lsitFntAlign.getSelectValue());

				}
				else if( obj === _varUCEditPanelSubscribe.lsitAlignH ) {
					scenario_div.find(".uc-editSceMaterial-subscribe-block").css("justify-content",_varUCEditPanelSubscribe.lsitAlignH.getSelectValue());

				}
				else if( obj === _varUCEditPanelSubscribe.lsitAlignV ) {
					scenario_div.find(".uc-editSceMaterial-subscribe-block").css("align-items",_varUCEditPanelSubscribe.lsitAlignV.getSelectValue());

				}
				else {
					_varUCCommonComp.adjust(scenario_div, obj);
				}
		}
	};
	_varUCCommonComp.register("subscribe", $.varSubscribeCompBox);
})(window.jQuery);