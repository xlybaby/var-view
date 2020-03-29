(function($){
	$.varBannerCompBox = function(args){
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
			return "banner";
		};
		
		this.append = function(){
			
		};
		this.draw = function(data) {
			//TODO
		};
		this.collect = function(obj) {
			var data={};
			_varUCCommonComp.collect(data);
			data["ucBox"]={};
			var bgColor  = mGetStringValue(scenario_div.find(".uc-editSceMaterial-spec-banner-cnt").css("backgroundColor"),null);
			data["ucBox"]["backgroundColor"] = bgColor;
			var borderColor = mGetStringValue(scenario_div.find(".uc-editSceMaterial-spec-banner-body").css("borderColor"),null);
			data["ucBox"]["borderColor"] = borderColor;
			var cntWidth = mGetStringValue(scenario_div.find(".uc-editSceMaterial-spec-banner-body").css("width"),null);
			data["ucBox"]["width"] = cntWidth;
			var cntHeight = mGetStringValue(scenario_div.find(".uc-editSceMaterial-spec-banner-body").css("height"),null);
			data["ucBox"]["height"] = cntHeight;
			var borderWidth = mGetStringValue(scenario_div.find(".uc-editSceMaterial-spec-banner-body").css("borderWidth"),null);
			data["ucBox"]["borderWidth"] = borderWidth;
			var borderRadius = mGetStringValue(scenario_div.find(".uc-editSceMaterial-spec-banner-body").css("borderRadius"),null);
			data["ucBox"]["borderRadius"] = borderRadius;
			var borderStyle = mGetStringValue(scenario_div.find(".uc-editSceMaterial-spec-banner-body").css("borderStyle"),null);
			data["ucBox"]["borderStyle"] = borderStyle;
			var footer = _varUCEditPanelBanner.switchBtn.isChecked();
			data["ucBox"]["footer"] = footer;
			var bgSize = mGetStringValue(scenario_div.find(".uc-editSceMaterial-spec-banner-bg").css("backgroundSize"),null) ;
			data["ucBox"]["backgroundSize"] = bgSize;
			var bgPos = mGetStringValue(scenario_div.find(".uc-editSceMaterial-spec-banner-bg").css("backgroundPosition"),null);
			data["ucBox"]["backgroundPosition"] = bgPos;
			
			data["material"] = _materialID;
			return data;
		};
		this.fill = function(obj) {
			var panel = _varUCEditPanelBanner.getPanel();
			if( obj === _varComponentLayoutPanel) {
				_varUCCommonComp.fillLayout(this);

			} else if( obj === _varUCEditPanelBanner) {
				_varUCEditPanelBanner.bgColorPicker.update(scenario_div.find(".uc-editSceMaterial-spec-banner-cnt").css("backgroundColor"));
				_varUCEditPanelBanner.borderColorPicker.update(scenario_div.find(".uc-editSceMaterial-spec-banner-body").css("borderColor"));

				_varUCEditPanelBanner.widthSlider.update(scenario_div.find(".uc-editSceMaterial-spec-banner-body").css("width"));
				panel.find("#uc-banner-width-val").val(_varUCEditPanelBanner.widthSlider.getVal());

				_varUCEditPanelBanner.heightSlider .update(scenario_div.find(".uc-editSceMaterial-spec-banner-body").css("height"));
				panel.find("#uc-banner-high-val").val(_varUCEditPanelBanner.heightSlider.getVal());

				
				_varUCEditPanelBanner.borderWidthSlider.update(scenario_div.find(".uc-editSceMaterial-spec-banner-body").css("borderWidth"));
				panel.find("#uc-banner-border-width-val").val(_varUCEditPanelBanner.borderWidthSlider.getVal());

				_varUCEditPanelBanner.borderRadiusSlider.update(scenario_div.find(".uc-editSceMaterial-spec-banner-body").css("borderRadius"));
				panel.find("#uc-banner-border-radius-val").val(_varUCEditPanelBanner.borderRadiusSlider.getVal());

				_varUCEditPanelBanner.borderStyle.update(scenario_div.find(".uc-editSceMaterial-spec-banner-body").css("borderStyle"));

				if(scenario_div.find(".uc-editSceMaterial-spec-banner-footer").css("display")!="none" )
					_varUCEditPanelBanner.switchBtn.update(true);
				else
					_varUCEditPanelBanner.switchBtn.update(false);

					if(scenario_div.find(".uc-editSceMaterial-spec-banner-bg").css("backgroundSize") === "auto auto"
						|| scenario_div.find(".uc-editSceMaterial-spec-banner-bg").css("backgroundSize") === "auto") {
						_varUCEditPanelBanner.picSize.update("auto");
					} else if( scenario_div.find(".uc-editSceMaterial-spec-banner-bg").css("backgroundSize") ===  "100% 100%") {
						_varUCEditPanelBanner.picSize.update("hfit-wfit");
					}  else if( scenario_div.find(".uc-editSceMaterial-spec-banner-bg").css("backgroundSize") === "100% auto"
						||  scenario_div.find(".uc-editSceMaterial-spec-banner-bg").css("backgroundSize") === "100%") {
						_varUCEditPanelBanner.picSize.update("width-fit");
					}  else if( scenario_div.find(".uc-editSceMaterial-spec-banner-bg").css("backgroundSize") === "auto 100%") {
						_varUCEditPanelBanner.picSize.update("height-fit" );
					}  else if(  scenario_div.find(".uc-editSceMaterial-spec-banner-bg").css("backgroundSize") === "cover") {
						_varUCEditPanelBanner.picSize.update("cover");
					}   else if(scenario_div.find(".uc-editSceMaterial-spec-banner-bg").css("backgroundSize")==="contain") {
						_varUCEditPanelBanner.picSize.update( "contain");
					} 

				if( !StringUtil.isEmpty(scenario_div.find(".uc-editSceMaterial-spec-banner-bg").css("backgroundPosition")) 
						&&  scenario_div.find(".uc-editSceMaterial-spec-banner-bg").css("backgroundPosition").toLowerCase() != "none") {
					var pos = scenario_div.find(".uc-editSceMaterial-spec-banner-bg").css("backgroundPosition").toLowerCase();
					var posHV = pos.match(/[a-z0-9%]+/g);
					if(posHV.length>1){
						_varUCEditPanelBanner.picPositionH.update(posHV[0]);
						_varUCEditPanelBanner.picPositionV.update(posHV[1]);
					}
				}
				
				_varUCEditPanelBanner.switchBtnOpacity.update(scenario_div.find(".uc-editSceMaterial-spec-banner-footer").css("opacity"));
				
			}  else if( obj === _varComponentMaterialPanel) {
				_varUCCommonComp.fillMaterial(this);
			}
		};
		this.adjust = function(obj) {

			if( obj === _varUCEditPanelBanner.bgColorPicker ) {
				scenario_div.find(".uc-editSceMaterial-spec-banner-cnt").css("backgroundColor", _varUCEditPanelBanner.bgColorPicker.getRgbString());
			}
			else if( obj === _varUCEditPanelBanner.borderColorPicker ) {
				scenario_div.find(".uc-editSceMaterial-spec-banner-body").css("borderColor", _varUCEditPanelBanner.borderColorPicker.getRgbString());

			}
			else if( obj === _varUCEditPanelBanner.widthSlider ) {
				scenario_div.find(".uc-editSceMaterial-spec-banner-body").css("width", _varUCEditPanelBanner.widthSlider.getVal()+"%");

			}
			else if( obj === _varUCEditPanelBanner.heightSlider ) {
				scenario_div.find(".uc-editSceMaterial-spec-banner-body").css("height", _varUCEditPanelBanner.heightSlider.getVal()+"%");

			}
			else if( obj === _varUCEditPanelBanner.borderWidthSlider ) {
				scenario_div.find(".uc-editSceMaterial-spec-banner-body").css("borderWidth", _varUCEditPanelBanner.borderWidthSlider.getVal()+"px");

			}
			else if( obj === _varUCEditPanelBanner.borderRadiusSlider ) {
				scenario_div.find(".uc-editSceMaterial-spec-banner-body").css("borderRadius", _varUCEditPanelBanner.borderRadiusSlider.getVal()+"px");

			}
			else if( obj === _varUCEditPanelBanner.borderStyle ) {
				scenario_div.find(".uc-editSceMaterial-spec-banner-body").css("borderStyle", _varUCEditPanelBanner.borderRadiusSlider.borderStyle.getSelectValue());

			}
			else if( obj === _varUCEditPanelBanner.autoPlay ) {
			}
			else if( obj === _varUCEditPanelBanner.switchBtn ) {
				if( _varUCEditPanelBanner.switchBtn.isChecked() )
					scenario_div.find(".uc-editSceMaterial-spec-banner-footer").css("display", "flex");
				else
					scenario_div.find(".uc-editSceMaterial-spec-banner-footer").hide();

			}
			
			else if( obj === _varUCEditPanelBanner.picSize ) {
				if( _varUCEditPanelBanner.picSize.getSelectValue() === "auto" ) {
					scenario_div.find(".uc-editSceMaterial-spec-banner-bg").css("backgroundSize", "auto auto");

				} else if( _varUCEditPanelBanner.picSize.getSelectValue() === "hfit-wfit" ) {
					scenario_div.find(".uc-editSceMaterial-spec-banner-bg").css("backgroundSize", "100% 100%");

				}  else if( _varUCEditPanelBanner.picSize.getSelectValue() === "width-fit" ) {
					scenario_div.find(".uc-editSceMaterial-spec-banner-bg").css("backgroundSize", "100% auto");

				}  else if( _varUCEditPanelBanner.picSize.getSelectValue() === "height-fit" ) {
					scenario_div.find(".uc-editSceMaterial-spec-banner-bg").css("backgroundSize", "auto 100%");

				}  else if( _varUCEditPanelBanner.picSize.getSelectValue() === "cover" ) {
					scenario_div.find(".uc-editSceMaterial-spec-banner-bg").css("backgroundSize", "cover");

				}   else if( _varUCEditPanelBanner.picSize.getSelectValue() === "contain" ) {
					scenario_div.find(".uc-editSceMaterial-spec-banner-bg").css("backgroundSize", "contain");

				} 

			}
			else if( obj === _varUCEditPanelBanner.picPositionH ) {
				scenario_div.find(".uc-editSceMaterial-spec-banner-bg").css("backgroundPosition", _varUCEditPanelBanner.picPositionH.getSelectValue()+" "+_varUCEditPanelBanner.picPositionV.getSelectValue());
			}
			else if( obj === _varUCEditPanelBanner.picPositionV ) {
				scenario_div.find(".uc-editSceMaterial-spec-banner-bg").css("backgroundPosition", _varUCEditPanelBanner.picPositionH.getSelectValue()+" "+_varUCEditPanelBanner.picPositionV.getSelectValue());
			}
			else if( obj === _varUCEditPanelBanner.switchBtnOpacity ) {
				scenario_div.find(".uc-editSceMaterial-spec-banner-footer").css("opacity", _varUCEditPanelBanner.switchBtnOpacity.getVal() );
			}
			else {
				_varUCCommonComp.adjust(scenario_div, obj);
			}

		}
	};
	_varUCCommonComp.register("banner", $.varBannerCompBox);
})(window.jQuery);