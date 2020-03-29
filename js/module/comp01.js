(function($){
	$.varBrowserCompBox = function(args){
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
			return "browser";
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
			
			var listFntColor = scenario_div.find(".uc-corpus-list-txt").css("color");
			data["ucBox"]["listFntColor"] = mGetStringValue(listFntColor,null);
			
			var articleFntColor = scenario_div.find(".uc-corpus-article-txt").css("color");
			data["ucBox"]["articleFntColor"] = mGetStringValue(articleFntColor,null);

			var articleBgColor = scenario_div.find(".uc-corpus-browser-article").css("backgroundColor");
			data["ucBox"]["articleBgColor"] = mGetStringValue(articleBgColor,null);

			var listBgColor = scenario_div.find(".uc-corpus-browser-contents").css("backgroundColor");
			data["ucBox"]["listBgColor"] = mGetStringValue(listBgColor,null);

			var listWidth = scenario_div.find(".uc-corpus-browser-contents-list").css("width");
			data["ucBox"]["listWidth"] = listWidth;

			var listHeight = scenario_div.find(".uc-corpus-browser-contents-list").css("height");
			data["ucBox"]["listHeight"] = listHeight;
			var articleWidth = scenario_div.find(".uc-corpus-browser-article-body").css("width");
			data["ucBox"]["articleWidth"] = articleWidth;
			var articleheight = scenario_div.find(".uc-corpus-browser-article-body").css("height");
			data["ucBox"]["articleheight"] = articleheight;
			var articleTxtIndent = scenario_div.find(".uc-corpus-article-txt").css("textIndent");
			data["ucBox"]["articleTxtIndent"] = articleTxtIndent;
			var articleTxtSpacing = scenario_div.find(".uc-corpus-article-txt").css("letterSpacing");
			data["ucBox"]["articleTxtSpacing"] = articleTxtSpacing;
			var listMarginTop = scenario_div.find(".uc-corpus-browser-contents-list-row").css("marginTop");
			data["ucBox"]["listMarginTop"] = listMarginTop;
			var listMarginBottom = scenario_div.find(".uc-corpus-browser-contents-list-row").css("marginBottom");
			data["ucBox"]["listMarginBottom"] = listMarginBottom;
			var listTxtSpacing = scenario_div.find(".uc-corpus-list-txt").css("letterSpacing");
			data["ucBox"]["listTxtSpacing"] = listTxtSpacing;
			var listFntSize = scenario_div.find(".uc-corpus-list-txt").css("fontSize");
			data["ucBox"]["listFntSize"] = listFntSize;
			var articleFntSize = scenario_div.find(".uc-corpus-article-txt").css("fontSize");
			data["ucBox"]["articleFntSize"] = articleFntSize;
			var listAlignV = scenario_div.find(".uc-corpus-browser-contents-list").css("justifyContent");
			data["ucBox"]["listAlignV"] = listAlignV;
			var articleAlignV = scenario_div.find(".uc-corpus-browser-article-body").css("alignItems");
			data["ucBox"]["articleAlignV"] = articleAlignV;
			var listFntStyle = scenario_div.find(".uc-corpus-list-txt").css("fontStyle");
			data["ucBox"]["listFntStyle"] = listFntStyle;
			var articleLineHeight = scenario_div.find(".uc-corpus-article-txt").css("lineHeight");
			data["ucBox"]["articleLineHeight"] = articleLineHeight;
			//var articleLineHeight = scenario_div.find(".uc-corpus-article-txt").css("lineHeight");
			var articleFntStyle = scenario_div.find(".uc-corpus-article-txt").css("fontStyle");
			data["ucBox"]["articleFntStyle"] = articleFntStyle;
			var navDisplay = _varUCEditPanelTS.navBarDisplay.isChecked();
			data["ucBox"]["navDisplay"] = navDisplay;
			data["material"] = _materialID;
			return data;
		};
		this.fill = function(obj) {
			var panel = _varUCEditPanelBanner.getPanel();

			if( obj === _varComponentLayoutPanel) {
				_varUCCommonComp.fillLayout(this);

			} else if( obj === _varUCEditPanelBrowser) {
				_varUCEditPanelBrowser.listFntColorPicker.update(scenario_div.find(".uc-corpus-list-txt").css("color"));
			
				_varUCEditPanelBrowser.articleFntColorPicker.update(scenario_div.find(".uc-corpus-article-txt").css("color"));
			
				_varUCEditPanelBrowser.articleBgColorPicker.update(scenario_div.find(".uc-corpus-browser-article").css("backgroundColor"));
			
				_varUCEditPanelBrowser.listBgColorPicker.update(scenario_div.find(".uc-corpus-browser-contents").css("backgroundColor"));
			
				_varUCEditPanelBrowser.tblWidth.update(scenario_div.find(".uc-corpus-browser-contents-list").css("width"));
				panel.find("#uc-corpus-tbl-width-val").val(_varUCEditPanelBrowser.tblWidth.getVal());

				_varUCEditPanelBrowser.tblHeight.update(scenario_div.find(".uc-corpus-browser-contents-list").css("height"));
				panel.find("#uc-corpus-tbl-high-val").val(_varUCEditPanelBrowser.tblHeight.getVal());

				_varUCEditPanelBrowser.articleWidth.update(scenario_div.find(".uc-corpus-browser-article-body").css("width"));
				panel.find("#uc-corpus-width-val").val(_varUCEditPanelBrowser.articleWidth.getVal());

				_varUCEditPanelBrowser.articleHeight.update(scenario_div.find(".uc-corpus-browser-article-body").css("height"));
				panel.find("#uc-corpus-high-val").val(_varUCEditPanelBrowser.articleHeight.getVal());

				_varUCEditPanelBrowser.articleFntIndentHeight.update(scenario_div.find(".uc-corpus-article-txt").css("textIndent"));
				panel.find("#uc-corpus-cnt-fnt-indent-val").val(_varUCEditPanelBrowser.articleFntIndentHeight.getVal());

				_varUCEditPanelBrowser.articleFntSpacingHeight.update(scenario_div.find(".uc-corpus-article-txt").css("letterSpacing"));
				panel.find("#uc-corpus-cnt-fnt-spacing-val").val(_varUCEditPanelBrowser.articleFntSpacingHeight.getVal());

				_varUCEditPanelBrowser.listFntMarginTopHeight.update(scenario_div.find(".uc-corpus-browser-contents-list-row").css("marginTop"));
				panel.find("#uc-corpus-tbl-fnt-margin-top-val").val(_varUCEditPanelBrowser.listFntMarginTopHeight.getVal());

				_varUCEditPanelBrowser.listFntMarginBottomHeight.update(scenario_div.find(".uc-corpus-browser-contents-list-row").css("marginBottom"));
				panel.find("#uc-corpus-tbl-fnt-margin-bottom-val").val(_varUCEditPanelBrowser.listFntMarginBottomHeight.getVal());

				_varUCEditPanelBrowser.listFntSpacingHeight.update(scenario_div.find(".uc-corpus-list-txt").css("letterSpacing"));
				panel.find("#uc-corpus-tbl-fnt-spacing-val").val(_varUCEditPanelBrowser.listFntSpacingHeight.getVal());

				_varUCEditPanelBrowser.listFntSize.update(scenario_div.find(".uc-corpus-list-txt").css("fontSize"));
				panel.find("#uc-corpus-tbl-fnt-size-val").val(_varUCEditPanelBrowser.listFntSize.getVal());

				_varUCEditPanelBrowser.articleFntSize.update(scenario_div.find(".uc-corpus-article-txt").css("fontSize"));
				panel.find("#uc-corpus-cnt-fnt-size-val").val(_varUCEditPanelBrowser.articleFntSize.getVal());

				_varUCEditPanelBrowser.cntLineHeight.update(scenario_div.find(".uc-corpus-article-txt").css("lineHeight") );
				panel.find("#uc-corpus-cnt-lineHeight-val").val(_varUCEditPanelBrowser.cntLineHeight.getVal());

				_varUCEditPanelBrowser.listHAlign.update(scenario_div.find(".uc-corpus-browser-contents-list").css("justifyContent"));
				_varUCEditPanelBrowser.cntVAlign.update(scenario_div.find(".uc-corpus-browser-article-body").css("alignItems"));

				_varUCEditPanelBrowser.listFntStyle.update(scenario_div.find(".uc-corpus-list-txt").css("fontStyle"));
			
				_varUCEditPanelBrowser.articleFntHeight.update(scenario_div.find(".uc-corpus-article-txt").css("lineHeight"));

				_varUCEditPanelBrowser.articleFntStyle.update(scenario_div.find(".uc-corpus-article-txt").css("fontStyle"));

				if( scenario_div.find(".uc-corpus-browser-contents").css("display")!="none" ) 
					_varUCEditPanelBrowser.navBarDisplay.update(true);
				else
					_varUCEditPanelBrowser.navBarDisplay.update(false);
			
			}  else if( obj === _varComponentMaterialPanel) {
				_varUCCommonComp.fillMaterial(this);

			}
		};
		this.adjust = function(obj) {			
			if( obj === _varUCEditPanelBrowser.listFntColorPicker ){ 
				scenario_div.find(".uc-corpus-list-txt").css("color", _varUCEditPanelBrowser.listFntColorPicker.getRgbString());
			}
			else if( obj === _varUCEditPanelBrowser.articleFntColorPicker ){ 
				scenario_div.find(".uc-corpus-article-txt").css("color", _varUCEditPanelBrowser.articleFntColorPicker.getRgbString());
			}
			else if( obj === _varUCEditPanelBrowser.articleBgColorPicker ){ 
				scenario_div.find(".uc-corpus-browser-article").css("backgroundColor", _varUCEditPanelBrowser.articleBgColorPicker.getRgbString());
			}
			else if( obj === _varUCEditPanelBrowser.listBgColorPicker ){ 
				scenario_div.find(".uc-corpus-browser-contents").css("backgroundColor", _varUCEditPanelBrowser.listBgColorPicker.getRgbString());
			}
			
			else if( obj === _varUCEditPanelBrowser.tblWidth ){ 
				scenario_div.find(".uc-corpus-browser-contents-list").css("width", _varUCEditPanelBrowser.tblWidth.getVal()+"%");
			}
			else if( obj === _varUCEditPanelBrowser.tblHeight ){ 
				scenario_div.find(".uc-corpus-browser-contents-list").css("height", _varUCEditPanelBrowser.tblHeight.getVal()+"%");

			}
			else if( obj === _varUCEditPanelBrowser.articleWidth ){ 
				scenario_div.find(".uc-corpus-browser-article-body").css("width", _varUCEditPanelBrowser.articleWidth.getVal()+"%");

			}
			else if( obj === _varUCEditPanelBrowser.articleHeight ){
				scenario_div.find(".uc-corpus-browser-article-body").css("height", _varUCEditPanelBrowser.articleHeight.getVal()+"%");

			}
			else if( obj === _varUCEditPanelBrowser.articleFntIndentHeight ){ 
				scenario_div.find(".uc-corpus-article-txt").css("textIndent", _varUCEditPanelBrowser.articleFntIndentHeight.getVal()+"px");

			}
			else if( obj === _varUCEditPanelBrowser.articleFntSpacingHeight ){ 
				scenario_div.find(".uc-corpus-article-txt").css("letterSpacing", _varUCEditPanelBrowser.articleFntSpacingHeight.getVal()+"px");

			}
			else if( obj === _varUCEditPanelBrowser.listFntMarginTopHeight ){ 
				scenario_div.find(".uc-corpus-browser-contents-list-row").css("marginTop", _varUCEditPanelBrowser.listFntMarginTopHeight.getVal()+"px");

			}
			else if( obj === _varUCEditPanelBrowser.listFntMarginBottomHeight ){ 
				scenario_div.find(".uc-corpus-browser-contents-list-row").css("marginBottom", _varUCEditPanelBrowser.listFntMarginBottomHeight.getVal()+"px");

			}
			else if( obj === _varUCEditPanelBrowser.listFntSpacingHeight ){ 
				scenario_div.find(".uc-corpus-list-txt").css("letterSpacing", _varUCEditPanelBrowser.listFntSpacingHeight.getVal()+"px");

			}
			else if( obj === _varUCEditPanelBrowser.listFntSize ){
				scenario_div.find(".uc-corpus-list-txt").css("fontSize", _varUCEditPanelBrowser.listFntSize.getVal()+"px");

			}
			else if( obj === _varUCEditPanelBrowser.articleFntSize ){ 
				scenario_div.find(".uc-corpus-article-txt").css("fontSize", _varUCEditPanelBrowser.articleFntSize.getVal()+"px");

			}
			else if( obj === _varUCEditPanelBrowser.listHAlign ){ 
				var sv = _varUCEditPanelBrowser.listHAlign.getSelectValue();
				scenario_div.find(".uc-corpus-browser-contents-list").css("justifyContent", sv);

			}
			else if( obj === _varUCEditPanelBrowser.cntVAlign ){ 
				var sv = _varUCEditPanelBrowser.cntVAlign.getSelectValue();
				scenario_div.find(".uc-corpus-browser-article-body").css("alignItems", sv);

			}
			else if( obj === _varUCEditPanelBrowser.cntLineHeight ){ 
				scenario_div.find(".uc-corpus-article-txt").css("lineHeight", _varUCEditPanelBrowser.cntLineHeight.getVal()+"px");

			}
			else if( obj === _varUCEditPanelBrowser.listFntStyle ){ 
				var sv = _varUCEditPanelBrowser.listFntStyle.getSelectValue();
				scenario_div.find(".uc-corpus-list-txt").css("fontStyle", sv);
			}
			else if( obj === _varUCEditPanelBrowser.articleFntHeight ){ 
				var sv = _varUCEditPanelBrowser.articleFntHeight.getSelectValue();
				scenario_div.find(".uc-corpus-article-txt").css("lineHeight", sv);

			}
			else if( obj === _varUCEditPanelBrowser.articleFntStyle ){ 
				var sv = _varUCEditPanelBrowser.articleFntStyle.getSelectValue();
				scenario_div.find(".uc-corpus-article-txt").css("fontStyle", sv);

			}
			else if( obj === _varUCEditPanelBrowser.splitLineStyle ){ 
				var sv = _varUCEditPanelBrowser.splitLineStyle.getSelectValue();
				scenario_div.find(".uc-corpus-browser-split-line ").toggleClass("display");

			}
			else if( obj === _varUCEditPanelBrowser.navBarDisplay ) {
				if(_varUCEditPanelBrowser.navBarDisplay.isChecked() ) {
					scenario_div.find(".uc-corpus-browser-contents").css("display","flex");
				}else{
					scenario_div.find(".uc-corpus-browser-contents").hide();
				}
			}
			else {
				_varUCCommonComp.adjust(scenario_div, obj);
			}
		}
	};
	_varUCCommonComp.register("browser", $.varBrowserCompBox);
})(window.jQuery);