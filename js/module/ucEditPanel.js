(function ($){
	$.varUCEditTemplate = function(args){
		
		var _editPanel = $(".uc-edit-panel-template");
		var inited=false;
		//var gridVSpinner = _ucEditPanelTemplate.find("#uc-temp-grid-v");
		//var gridHSpinner = _ucEditPanelTemplate.find("#uc-temp-grid-h");
		
		this.getEditPanelTemplate = function() {
			return _editPanel;
		};
		
		this.show = function() {
			if(!inited)
				this.ini();
			_editPanel.toggleClass("element-display-flex element-hide");
			_editPanel.toggleClass("fadeInLeft fadeOutLeft");
		}
		
		this.collect = function() {
			var container = _varDocument.getCanvasContainer();
			
		}
		this.adjust = function(obj) {

			if( obj === this.gridColorPicker ) {
				_varDocument.getCanvasContainer().find(".uc-temp-grid-h,.uc-temp-grid-v").css("borderColor", this.gridColorPicker.getRgbString());
			} else if ( obj === this.templateBgColorPicker ) {
				_varDocument.getCanvasContainer().css("backgroundColor", this.templateBgColorPicker.getRgbString());
			} else if ( obj === this.sizeMode ) {
				_varDocument.getCanvasContainer().attr("sizeMode",this.sizeMode.getSelectValue());
				_editPanel.find(".bgSize-info").find("input[type='text']").toggleClass("uc-text-editable uc-text-disable");
			}
		}
		
		this.fill = function(data) {
			 this.sizeMode.update(data["sizeMode"]);
			 this.gridColorPicker.update(data["gridColor"]);
			 this.templateBgColorPicker.update(data["backgroundColor"]);
			 //this.adjust(this.sizeMode);
			 //this.adjust(this.gridColorPicker);
			 //this.adjust(this.templateBgColorPicker);
			 
			 var w=data["width"];
			 var h=data["height"];
			 _editPanel.find(".bgSize-info").find(".uc-text-editable[csstyle='width']").val(mGetIntValue(w, '') );
			 _editPanel.find(".bgSize-info").find(".uc-text-editable[csstyle='height']").val(mGetIntValue(h, '') );

			 var halign =data["justifyContent"];
			 _editPanel.find(".bgAlign-info").find("svg[align='"+halign+"']").click();
			 
			 var minW=data["minWidth"];
			 var minH = data["minHeight"];
			 var maxW =data["maxWidth"];
			 var maxH =data["maxHeight"];
			 _editPanel.find(".bgRect-info").find("input[name='max-width']").val(mGetIntValue(maxW, '') );
			 _editPanel.find(".bgRect-info").find("input[name='max-height']").val(mGetIntValue(maxH, '') );
			 _editPanel.find(".bgRect-info").find("input[name='min-width']").val(mGetIntValue(minW, '') );
			 _editPanel.find(".bgRect-info").find("input[name='min-height']").val(mGetIntValue(minH, '') );
			 //_editPanel.find(".bgRect-info").find("input[name='max-width']").change();
			 //_editPanel.find(".bgRect-info").find("input[name='max-height']").change();
			 //_editPanel.find(".bgRect-info").find("input[name='min-width']").change();
			 //_editPanel.find(".bgRect-info").find("input[name='min-height']").change();

			 var bgimg = data["backgroundImage"];
			 var gridH = data["gridH"];
			 var gridV = data["gridV"];
			 
			 var bgimgs = _editPanel.find(".uc-bg-image-list").children("div");
			 for(var i=0;i<bgimgs.length;i++){
				 if( bgimgs.get(i).style.backgroundImage == bgimg )
					 $(bgimgs.get(i)).click();
			 }
			 
			 for(var i=0;i<gridH.length;i++){
				 var hr = $("<hr class='uc-temp-grid-h' style='top: "+gridH[i]+";'/>");
					hr.css( "borderTop","1px solid " +  data["gridColor"]);
					hr.on({
						mouseover:function(event){
							var target = $(event.target);
							target.css("boxShadow","0px 0px 5px rgba(238,134,154,1.0)");
						},
						mouseout:function(event){
							var target = $(event.target);
							target.css("boxShadow","");
						},
						dblclick:function(event){
							var target = $(event.target);
							target.remove();
						}
					});
					_varDocument.getCanvasContainer().append(hr);
			 }
			 
			 for(var i=0;i<gridV.length;i++){
				 var hr = $("<hr class='uc-temp-grid-h' style='left: "+gridV[i]+";'/>");
					hr.css( "borderLeft","1px solid " +  data["gridColor"]);
					hr.on({
						mouseover:function(event){
							var target = $(event.target);
							target.css("boxShadow","0px 0px 5px rgba(238,134,154,1.0)");
						},
						mouseout:function(event){
							var target = $(event.target);
							target.css("boxShadow","");
						},
						dblclick:function(event){
							var target = $(event.target);
							target.remove();
						}
					});
					_varDocument.getCanvasContainer().append(hr);
			 }
		}
		
		this.ini = function() {
			//gridVSpinner.spinner();
			//gridHSpinner.spinner();
			
			this.gridColorPicker = new $.varRichColorPicker( _editPanel.find("#in_grid_color_box"), {init:"#ee869a", change:function(color) {
				if( color )
					_varDocument.getCanvasContainer().find(".uc-temp-grid-h").css("borderTop","1px solid "+ color.toRgbString());
		    },alpha:false,input:true,empty:false} );
			
			
			this.templateBgColorPicker = new $.varRichColorPicker( _editPanel.find("#in_tempbgcolor_box"), {init:null, change:function(color) {
		        //color.toHexString(); // #ff0000
				if( color )
					_varDocument.getCanvasContainer().css("backgroundColor", color.toRgbString());
		    },alpha:true,input:true,empty:true} );
			
			this.sizeMode = new $.varRadioBox({"target":_editPanel.find("#uc-template-size-mode"), "callback":function(){
				_varUCEditTemplate.adjust(_varUCEditTemplate.sizeMode);
		
			}});
			
			_editPanel.find(".bgSize-info").find("input[type='text']").on({
				change: function(event) {
					event.stopPropagation();
					var target = $(event.target);
					
					_varDocument.getCanvasContainer().css(target.attr("csstyle"), target.val() + target.siblings(".uc-text").text());
				}
			});
			
			_editPanel.find(".uc-temp-grid-clear-btn").on({
				click:function(event) {
					event.stopPropagation();
					var target = $(event.target);
					if( target.get(0).tagName.toUpperCase() != 'BUTTON' ) {
						target = target.parents("button");
					}
					if( target.hasClass("horizontal") ) {
						_varDocument.getCanvasContainer().find(".uc-temp-grid-h").remove();
					} else if( target.hasClass("vertical") ) {
						_varDocument.getCanvasContainer().find(".uc-temp-grid-v").remove();
					}
				},
				mouseover:function(event) {
					event.stopPropagation();
					event.target.style.cursor="pointer";
				}
			});
			
			_editPanel.find(".uc-temp-grid-btn-add").on({
				click: function(event){
					event.stopPropagation();
					var target = $(event.target);
					var pos = target.siblings(".uc-text-editable").val()+target.siblings(".uc-text").text();
					
					if( target.hasClass("horizontal") ) {
							var hr = $("<hr class='uc-temp-grid-h' style='top: "+pos+";'/>");
							hr.css( "borderTop","1px solid " +  _varUCEditTemplate.gridColorPicker.getRgbString());
							hr.on({
								mouseover:function(event){
									var target = $(event.target);
									target.css("boxShadow","0px 0px 5px rgba(238,134,154,1.0)");
								},
								mouseout:function(event){
									var target = $(event.target);
									target.css("boxShadow","");
								},
								dblclick:function(event){
									var target = $(event.target);
									target.remove();
								}
							});
							_varDocument.getCanvasContainer().append(hr);
							
					} else if( target.hasClass("vertical") ) {
							var hr = $("<hr class='uc-temp-grid-v' style='left: "+pos+";'/>");
							hr.css( "borderLeft","1px solid " + _varUCEditTemplate.gridColorPicker.getRgbString() );

							hr.on({
								mouseover:function(event){
									var target = $(event.target);
									target.css("boxShadow","0px 0px 5px rgba(238,134,154,1.0)");
								},
								mouseout:function(event){
									var target = $(event.target);
									target.css("boxShadow","");
								},
								dblclick:function(event){
									var target = $(event.target);
									target.remove();
								}
							});
							_varDocument.getCanvasContainer().append(hr);
					}
				},
				mouseover: function(event) {
					event.stopPropagation();
					event.target.style.cursor="pointer";
				}
			});
			
			_editPanel.find(".uc-bg-image,.uc-bg-image-sel").on({
				click: function(event){
					event.stopPropagation();
					var target = $(event.target);
					if( target.hasClass("uc-bg-image-sel") )
						return;
					target.parents(".uc-bg-image-list").children(".uc-bg-image-sel").toggleClass("uc-bg-image-sel uc-bg-image");
					target.toggleClass("uc-bg-image-sel uc-bg-image");

					_varDocument.getCanvasContainer().css("backgroundImage", target.css("backgroundImage"));
				},
				mouseover: function(event) {
					event.stopPropagation();
					event.target.style.cursor="pointer";
				}
			});
			
			
			_editPanel.find(".bgRect-info").find("input[type='text']").on({
				change: function(event){
					event.stopPropagation();
					var target = $(event.target);
					if(checkFieldNumber(target.val())){
						_varDocument.getCanvasContainer().css(target.attr("name"), target.val()+"px");

					}
				},
				mouseover: function(event) {
					event.stopPropagation();
					event.target.style.cursor="pointer";
				}
			});

			_editPanel.find("#uc-edit-panel-template-out-button").on({
				 click: function(event){
					 event.stopPropagation();
					 _editPanel.toggleClass("element-display-flex element-hide");
						_editPanel.toggleClass("fadeInLeft fadeOutLeft");
					},
					mouseover:function(event){
						event.target.style.cursor="pointer";
					}
			 });
			
			_editPanel.find(".bgAlign-info").find(".uc-temp-align-items,.uc-temp-justify-content").on({
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
					_varDocument.getCanvasM().css("justify-content", target.attr("align"));
					
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
			inited = true;
		}
	};
})(window.jQuery);
var _varUCEditTemplate = new $.varUCEditTemplate();
//_varUCEditTemplate.ini();

(function ($){
	$.varUCEditPanelBanner = function(args){
		var _editPanel = $(".uc-editSceMaterial-spec-banner-cfg");
		var currentFilled;
		
		var isini = false;
		this.isIni = function() {
			return isini;
		}
		this.getPanel = function(){
			return _editPanel;
		}
		this.show = function(){
			_editPanel.siblings().hide("div[class$='-cfg']");
			_editPanel.css("display","flex");
			if( currentFilled === _varUCEditComponent.getCurrentCompID() ) return;
			currentFilled = _varUCEditComponent.getCurrentCompID();
			
			var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
			comp.fill(this);
		}
		this.ini = function() {
			this.bgColorPicker = new $.varRichColorPicker( _editPanel.find("#uc-banner-bgcolor-box"), {init:null, change:function(color) {
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				if( color )
					comp.adjust(_varUCEditPanelBanner.bgColorPicker);
		    },alpha:true,input:true,empty:true} );
			
			this.borderColorPicker = new $.varRichColorPicker( _editPanel.find("#uc-banner-border-color"), {init:null, change:function(color) {
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				if( color )
					comp.adjust(_varUCEditPanelBanner.borderColorPicker);
		    },alpha:true,input:true,empty:true} );
			
			this.widthSlider = new $.varSliderBar({ target:_editPanel.find("#in_uc-banner-cnt-Weight")[0], "min":0, "max":100, "start":100, "callback":function(val){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varUCEditPanelBanner.widthSlider);
				_editPanel.find("#uc-banner-width-val").val(_varUCEditPanelBanner.widthSlider.getVal());
			}});
			
			this.heightSlider = new $.varSliderBar({ target:_editPanel.find("#in_uc-banner-cnt-high")[0], "min":0, "max":100, "start":100, "callback":function(val){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varUCEditPanelBanner.heightSlider);
				_editPanel.find("#uc-banner-high-val").val(_varUCEditPanelBanner.heightSlider.getVal());

			}});
			
			this.borderWidthSlider = new $.varSliderBar({ target:_editPanel.find("#in_uc-banner-borderWidth")[0], "min":0, "max":10, "start":0, "callback":function(val){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varUCEditPanelBanner.borderWidthSlider);
				_editPanel.find("#uc-banner-border-width-val").val(_varUCEditPanelBanner.borderWidthSlider.getVal());

			}});
			
			this.borderRadiusSlider = new $.varSliderBar({ target:_editPanel.find("#in_uc-banner-borderRadius")[0], "min":0, "max":20, "start":0, "callback":function(val){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varUCEditPanelBanner.borderRadiusSlider);
				_editPanel.find("#uc-banner-border-radius-val").val(_varUCEditPanelBanner.borderRadiusSlider.getVal());

			}});
			
			this.switchBtnOpacity = new $.varSliderBar({ target:_editPanel.find("#in_uc-banner-switch-btn-opacity")[0], "min":0, "max":1, "start":1, "needInt":false,"callback":function(val){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varUCEditPanelBanner.switchBtnOpacity);
				_editPanel.find("#in_uc-banner-switch-btn-opacity-val").val(_varUCEditPanelBanner.switchBtnOpacity.getVal());

			}});
			
			this.picSize = new $.varRadioBox({"target":_editPanel.find(".background-size-info"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varUCEditPanelBanner.picSize);
		
			}});
			
			this.picPositionH = new $.varRadioBox({"target":_editPanel.find(".uc-banner-pic-h-position"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varUCEditPanelBanner.picPositionH);
		
			}});
			
			this.picPositionV = new $.varRadioBox({"target":_editPanel.find(".uc-banner-pic-v-position"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varUCEditPanelBanner.picPositionV);
		
			}});
			
			this.borderStyle = new $.varRadioBox({"target":_editPanel.find("#uc-banner-border-style"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varUCEditPanelBanner.borderStyle);
		
			}});
			
			this.autoPlay = new $.varCheckBox({"target":_editPanel.find(".uc-banner-auto-play"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varUCEditPanelBanner.autoPlay);
		
			}});
			
			this.switchBtn = new $.varCheckBox({"target":_editPanel.find(".uc-banner-switch-btn"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varUCEditPanelBanner.switchBtn);
		
			}});
			
			isini = true;
		}
		
	};
})(window.jQuery);
var _varUCEditPanelBanner= new $.varUCEditPanelBanner();

(function ($){
	$.varUCEditPanelTS = function(args){
		var _editPanel = $(".uc-editSceMaterial-spec-ts-cfg");
		var currentFilled;
		
		var isini = false;
		this.isIni = function() {
			return isini;
		}
		this.getPanel = function(){
			return _editPanel;
		}
		this.show = function(){
			_editPanel.siblings().hide("div[class$='-cfg']");
			_editPanel.css("display","flex");
			if( currentFilled === _varUCEditComponent.getCurrentCompID() ) return;
			currentFilled = _varUCEditComponent.getCurrentCompID();
			
			var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
			comp.fill(this);
		}
		this.ini = function() { 
			this.specXAxisLabel = new $.varInputTxt({target:_editPanel.find("#uc-ts-specXAxisLabel"),event:"change",callback:function(event){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				_varUCEditPanelTS.specXAxisLabel.setTarget(event);
				comp.adjust(_varUCEditPanelTS.specXAxisLabel);

			}});
			this.specYAxisLabel = new $.varInputTxt({target:_editPanel.find("#uc-ts-specYAxisLabel"),event:"change",callback:function(event){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				_varUCEditPanelTS.specYAxisLabel.setTarget(event);
				comp.adjust(_varUCEditPanelTS.specYAxisLabel);

			}});
			
			this.bgColorPicker = new $.varRichColorPicker( _editPanel.find("#uc-ts-bgcolor-box"), {init:null, change:function(color) {
				if( color ){
					var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
					comp.adjust(_varUCEditPanelTS.bgColorPicker);
				}
		    },alpha:true,input:true,empty:true} );
		
//			this.borderColorPicker = new $.varRichColorPicker( _editPanel.find("#uc-ts-border-color"), {init:null, change:function(color) {
//				if( color )
//					comp.adjust(_varUCEditPanelTS.borderColorPicker);
//		    },alpha:true,input:true,empty:true} );
			
			this.xAxisColorPicker = new $.varRichColorPicker( _editPanel.find("#uc-timeseries-xaxis-color-box"), {init:"#000000", change:function(color) {
				if( color ){
					var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
					comp.adjust(_varUCEditPanelTS.xAxisColorPicker);
				}
		    },alpha:true,input:true,empty:true} );
			
			this.xAxisNameColorPicker = new $.varRichColorPicker( _editPanel.find("#uc-timeseries-xaxis-name-color-box"), {init:"#000000", change:function(color) {
				if( color ){
					var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
					comp.adjust(_varUCEditPanelTS.xAxisNameColorPicker);
				}
		    },alpha:true,input:true,empty:true} );
			
			this.yAxisColorPicker = new $.varRichColorPicker( _editPanel.find("#uc-timeseries-yaxis-color-box"), {init:"#000000", change:function(color) {
				if( color ){
					var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
					comp.adjust(_varUCEditPanelTS.yAxisColorPicker);
				}
		    },alpha:true,input:true,empty:true} );
			
			this.yAxisNameColorPicker = new $.varRichColorPicker( _editPanel.find("#uc-timeseries-yaxis-name-color-box"), {init:"#000000", change:function(color) {
				if( color ){
					var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
					comp.adjust(_varUCEditPanelTS.yAxisNameColorPicker);
				}
		    },alpha:true,input:true,empty:true} );
			
			this.dataAreaColorPicker = new $.varRichColorPicker( _editPanel.find("#uc-ts-series-area-color"), {init:"#fa5a5a", change:function(color) {
				if( color ){
					var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
					comp.adjust(_varUCEditPanelTS.dataAreaColorPicker);
				}
		    },alpha:true,input:true,empty:true} );
			
			this.dataAreaLineColorPicker = new $.varRichColorPicker( _editPanel.find("#uc-ts-series-area-line-color"), {init:"#751b13", change:function(color) {
				if( color ){
					var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
					comp.adjust(_varUCEditPanelTS.dataAreaLineColorPicker);
				}
		    },alpha:true,input:true,empty:true} );
			
			this.tsWidthSlider = new $.varSliderBar({ target:_editPanel.find("#in_uc-ts-cnt-Weight")[0], "min":0, "max":100, "start":100, "callback":function(val){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varUCEditPanelTS.tsWidthSlider);
				_editPanel.find("#uc-ts-width-val").val(_varUCEditPanelTS.tsWidthSlider.getVal());

			}});
			
			this.tsHeightSlider = new $.varSliderBar({ target:_editPanel.find("#in_uc-ts-cnt-high")[0], "min":0, "max":100, "start":100, "callback":function(val){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varUCEditPanelTS.tsHeightSlider);
				_editPanel.find("#uc-ts-high-val").val(_varUCEditPanelTS.tsHeightSlider.getVal());

			}});
			
//			this.tsBorderWidthSlider = new $.varSliderBar({ target:_editPanel.find("#in_uc-ts-borderWidth")[0], "min":0, "max":10, "start":0, "callback":function(val){
//				comp.adjust(_varUCEditPanelTS.tsBorderWidthSlider);
//				_editPanel.find("#uc-ts-border-width-val").val(_varUCEditPanelTS.tsBorderWidthSlider.getVal());
//
//			}});
			
			this.xAxisLblRotatedSlider = new $.varSliderBar({ target:_editPanel.find("#uc-timeseries-xaxis-label-rotate")[0], "min":-90, "max":90, "start":0, "callback":function(val){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varUCEditPanelTS.xAxisLblRotatedSlider);
				_editPanel.find("#uc-timeseries-xaxis-label-rotate-val").val(_varUCEditPanelTS.xAxisLblRotatedSlider.getVal());

			}});
			
			this.yAxisLblRotatedSlider = new $.varSliderBar({ target:_editPanel.find("#uc-timeseries-yaxis-label-rotate")[0], "min":-90, "max":90, "start":0, "callback":function(val){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varUCEditPanelTS.yAxisLblRotatedSlider);
				_editPanel.find("#uc-timeseries-yaxis-label-rotate-val").val(_varUCEditPanelTS.yAxisLblRotatedSlider.getVal());

			}});
			
			this.chartType = new $.varRadioBox({"target":_editPanel.find("#uc-ts-chart-type"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varUCEditPanelTS.chartType);
		
			}});
			
			this.xAxisTick = new $.varCheckBox({"target":_editPanel.find(".uc-ts-xaxis-tick"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varUCEditPanelTS.xAxisTick);
		
			}});
			
			this.xAxisSplitline = new $.varCheckBox({"target":_editPanel.find(".uc-ts-xaxis-splitline"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varUCEditPanelTS.xAxisSplitline);
		
			}});
			
			this.xAxisLine = new $.varCheckBox({"target":_editPanel.find(".uc-ts-xaxis-line"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varUCEditPanelTS.xAxisLine);
		
			}});
			
			this.xAxisLable = new $.varCheckBox({"target":_editPanel.find(".uc-ts-xaxis-label"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varUCEditPanelTS.xAxisLable);
		
			}});
			
			this.yAxisLable = new $.varCheckBox({"target":_editPanel.find(".uc-ts-yaxis-label"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varUCEditPanelTS.yAxisLable);
		
			}});
			
			this.yAxisTick = new $.varCheckBox({"target":_editPanel.find(".uc-ts-yaxis-tick"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varUCEditPanelTS.yAxisTick);
		
			}});
			
			this.yAxisSplitline = new $.varCheckBox({"target":_editPanel.find(".uc-ts-yaxis-splitline"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varUCEditPanelTS.yAxisSplitline);
		
			}});
			
			this.yAxisLine = new $.varCheckBox({"target":_editPanel.find(".uc-ts-yaxis-line"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varUCEditPanelTS.yAxisLine);
		
			}});
			
			this.dataAreaLbl = new $.varCheckBox({"target":_editPanel.find(".uc-ts-series-label"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varUCEditPanelTS.dataAreaLbl);
		
			}});
			
			this.dataAreaCover = new $.varCheckBox({"target":_editPanel.find(".uc-ts-series-area"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varUCEditPanelTS.dataAreaCover);
		
			}});
			
			this.tooltipTrigger = new $.varCheckBox({"target":_editPanel.find(".uc-ts-tooltip-trigger-axis"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varUCEditPanelTS.tooltipTrigger);
		
			}});
			
			this.areaSymbolDisplay = new $.varCheckBox({"target":_editPanel.find(".uc-ts-series-symbol"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varUCEditPanelTS.areaSymbolDisplay);
		
			}});
			
			isini = true;
		}
		
	};
})(window.jQuery);
var _varUCEditPanelTS= new $.varUCEditPanelTS();

(function ($){
	$.varUCEditPanelSubscribe = function(args){
		var _editPanel = $(".uc-editSceMaterial-spec-subscribe-cfg");
		var currentFilled;
		var isini = false;
		this.isIni = function() {
			return isini;
		}
		this.getPanel = function(){
			return _editPanel;
		}
		this.show = function(){
			_editPanel.siblings().hide("div[class$='-cfg']");
			_editPanel.css("display","flex");
			
			if( currentFilled === _varUCEditComponent.getCurrentCompID() ) return;
			currentFilled = _varUCEditComponent.getCurrentCompID();
			
			var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
			comp.fill(this);
		}
		this.ini = function() {
			
			_editPanel.find("#uc-spec-subscribe-catch-val").on({
				change:function(event){  
					var target = $(event.target);
					var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() ).get();
					comp.attr("keyWords",target.val());
				}
		    }); 
			
			_editPanel.find("#uc-subscribe-align-h,#uc-subscrib-align-v").find("svg").on({
				
				mouseover: function(event) {
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
			
			this.listBgColorPicker = new $.varRichColorPicker( _editPanel.find("#uc-subscribe-bgcolor-box"), {init:null, change:function(color) {
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				if( color )
					comp.adjust(_varUCEditPanelSubscribe.listBgColorPicker);
		    },alpha:true,input:true,empty:true} );
			
			this.fntColorPicker = new $.varRichColorPicker( _editPanel.find("#uc-subscribe-fntcolor-box"), {init:"#000000", change:function(color) {
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				if( color )
					comp.adjust(_varUCEditPanelSubscribe.fntColorPicker);
		    },alpha:false,input:true,empty:false} );
			
			this.borderColorPicker = new $.varRichColorPicker( _editPanel.find("#uc-subscribe-border-color"), {init:null, change:function(color) {
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				if( color )
					comp.adjust(_varUCEditPanelSubscribe.borderColorPicker);
		    },alpha:true,input:true,empty:true} );
			
			this.listRowBorderColorPicker = new $.varRichColorPicker( _editPanel.find("#uc-subscribe-row-border-color"), {init:null, change:function(color) {
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				if( color )
					comp.adjust(_varUCEditPanelSubscribe.listRowBorderColorPicker);
		    },alpha:true,input:true,empty:true} );
			
			this.listRowBgColorPicker = new $.varRichColorPicker( _editPanel.find("#uc-subscribe-row-bgcolor-box"), {init:null, change:function(color) {
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				if( color )
					comp.adjust(_varUCEditPanelSubscribe.listRowBgColorPicker);
		    },alpha:true,input:true,empty:true} );
			
			
			this.borderWidthSlider = new $.varSliderBar({ target:_editPanel.find("#in_uc-subscribe-borderWidth")[0], "min":0, "max":10, "start":0, "callback":function(val){
				//_varUCEditPanelSubscribe.borderWidthSlider.setVal(val);
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				comp.adjust(_varUCEditPanelSubscribe.borderWidthSlider);
				_editPanel.find("#uc-subscribe-border-width-val").val(_varUCEditPanelSubscribe.borderWidthSlider.getVal());

			}});
			this.listNumSlider = new $.varSliderBar({ target:_editPanel.find("#in_uc-subscribe-listnum")[0], "min":1, "max":100, "start":10, "callback":function(val){
				//_varUCEditPanelSubscribe.borderWidthSlider.setVal(val);
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				comp.adjust(_varUCEditPanelSubscribe.listNumSlider);
				_editPanel.find("#in_uc-subscribe-listnum-val").val(_varUCEditPanelSubscribe.listNumSlider.getVal());

			}});
			this.listWidthSlider = new $.varSliderBar({ target:_editPanel.find("#in_uc-subscribe-cnt-Weight")[0], "min":0, "max":100, "start":100, "callback":function(val){
				//_varUCEditPanelSubscribe.listWidthSlider.setVal(val);
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				comp.adjust(_varUCEditPanelSubscribe.listWidthSlider);
				_editPanel.find("#uc-subscribe-width-val").val(_varUCEditPanelSubscribe.listWidthSlider.getVal());

			}});
			
			this.listHeightSlider = new $.varSliderBar({ target:_editPanel.find("#in_uc-subscribe-cnt-high")[0], "min":0, "max":100, "start":100, "callback":function(val){
				//_varUCEditPanelSubscribe.listHeightSlider.setVal(val);
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				comp.adjust(_varUCEditPanelSubscribe.listHeightSlider);
				_editPanel.find("#uc-subscribe-high-val").val(_varUCEditPanelSubscribe.listHeightSlider.getVal());

			}});
			
			this.listBorderRadiusSlider = new $.varSliderBar({ target:_editPanel.find("#in_uc-subscribe-borderRadius")[0], "min":0, "max":20, "start":0, "callback":function(val){
				//_varUCEditPanelSubscribe.listBorderRadiusSlider.setVal(val);
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				comp.adjust(_varUCEditPanelSubscribe.listBorderRadiusSlider);
				_editPanel.find("#uc-subscribe-border-radius-val").val(_varUCEditPanelSubscribe.listBorderRadiusSlider.getVal());

			}});
			
			this.listFntSpacingSlider = new $.varSliderBar({ target:_editPanel.find("#in_uc-subscribe-fnt-spacing")[0], "min":0, "max":10, "start":0, "callback":function(val){
				//_varUCEditPanelSubscribe.listFntSpacingSlider.setVal(val);
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				comp.adjust(_varUCEditPanelSubscribe.listFntSpacingSlider);
				_editPanel.find("#uc-subscribe-fnt-spacing-val").val(_varUCEditPanelSubscribe.listFntSpacingSlider.getVal());

			}});
			
			this.listFntSizeSlider = new $.varSliderBar({ target:_editPanel.find("#in_uc-subscribe-fnt-size")[0], "min":0, "max":30, "start":14, "callback":function(val){
				//_varUCEditPanelSubscribe.listFntSizeSlider.setVal(val);
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				comp.adjust(_varUCEditPanelSubscribe.listFntSizeSlider);
				_editPanel.find("#uc-subscribe-fnt-size-val").val(_varUCEditPanelSubscribe.listFntSizeSlider.getVal());

			}});
			
			this.lsitFntStyle = new $.varRadioBox({"target":_editPanel.find("#uc-subscribe-list-fnt-style"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				comp.adjust(_varUCEditPanelSubscribe.lsitFntStyle);

			}});
			
			this.listRowWidthSlider = new $.varSliderBar({ target:_editPanel.find("#in_subscribe-row-width")[0], "min":0, "max":100, "start":100, "callback":function(val){
				//_varUCEditPanelSubscribe.listRowWidthSlider.setVal(val);
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				comp.adjust(_varUCEditPanelSubscribe.listRowWidthSlider);
				_editPanel.find("#in_subscribe-row-width-val").val(_varUCEditPanelSubscribe.listRowWidthSlider.getVal());

			}});
			this.listRowRadiusSlider = new $.varSliderBar({ target:_editPanel.find("#in_uc-subscribe-row-borderRadius")[0], "min":0, "max":20, "start":0, "callback":function(val){
				//_varUCEditPanelSubscribe.listRowRadiusSlider.setVal(val);
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				comp.adjust(_varUCEditPanelSubscribe.listRowRadiusSlider);
				_editPanel.find("#uc-subscribe-row-borderRadius-val").val(_varUCEditPanelSubscribe.listRowRadiusSlider.getVal());

			}});
			this.listRowHeightSlider = new $.varSliderBar({ target:_editPanel.find("#in_subscribe-row-height")[0], "min":0, "max":50, "start":24, "callback":function(val){
				//_varUCEditPanelSubscribe.listRowHeightSlider.setVal(val);
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				comp.adjust(_varUCEditPanelSubscribe.listRowHeightSlider);
				_editPanel.find("#uc-subscribe-row-height-val").val(_varUCEditPanelSubscribe.listRowHeightSlider.getVal());

			}});
			this.listRowBorderWidthSlider = new $.varSliderBar({ target:_editPanel.find("#in_uc-subscribe-row-borderWidth")[0], "min":0, "max":20, "start":0, "callback":function(val){
				//_varUCEditPanelSubscribe.listRowBorderWidthSlider.setVal(val);
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				comp.adjust(_varUCEditPanelSubscribe.listRowBorderWidthSlider);
				_editPanel.find("#uc-subscribe-row-borderWidth-val").val(_varUCEditPanelSubscribe.listRowBorderWidthSlider.getVal());

			}});
			
			this.lsitRowBorderStyle = new $.varRadioBox({"target":_editPanel.find("#uc-subscribe-row-border-style"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				comp.adjust(_varUCEditPanelSubscribe.lsitRowBorderStyle);

			}});
			this.lsitBorderStyle = new $.varRadioBox({"target":_editPanel.find("#uc-subscribe-border-style"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				comp.adjust(_varUCEditPanelSubscribe.lsitBorderStyle);

			}});
			this.lsitFntAlign = new $.varRadioBox({"target":_editPanel.find("#uc-subscribe-list-fnt-align"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				comp.adjust(_varUCEditPanelSubscribe.lsitFntAlign);

			}});

			this.lsitAlignH = new $.varRadioBox({"target":_editPanel.find("#uc-subscribe-align-h"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				comp.adjust(_varUCEditPanelSubscribe.lsitAlignH);

			}});
			this.lsitAlignV = new $.varRadioBox({"target":_editPanel.find("#uc-subscrib-align-v"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				comp.adjust(_varUCEditPanelSubscribe.lsitAlignV);

			}});
			isini = true;
		}
		
	};
})(window.jQuery);
var _varUCEditPanelSubscribe= new $.varUCEditPanelSubscribe();

(function ($){
	$.varUCEditPanelBrowser = function(args){
		var _editPanel = $(".uc-editSceMaterial-spec-corpus-cfg");
		
		var isini = false;
		this.isIni = function() {
			return isini;
		}
		this.getPanel = function(){
			return _editPanel;
		}
		var currentFilled;
		
		this.show = function(){
			//if(!isini)
			//	this.ini();
			_editPanel.siblings().hide("div[class$='-cfg']");
			_editPanel.css("display","flex");
			if( currentFilled === _varUCEditComponent.getCurrentCompID() ) return;
			currentFilled = _varUCEditComponent.getCurrentCompID();
			
			var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
			comp.fill(this);
		}
		this.ini = function() {
			this.listFntColorPicker = new $.varRichColorPicker( _editPanel.find("#uc-corpus-tbl-fntcolor-box"), {init:"#000000", change:function(color) {
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				if( color )
					comp.adjust(_varUCEditPanelBrowser.listFntColorPicker);
		    },alpha:false,input:true,empty:false} );
			
			this.articleFntColorPicker = new $.varRichColorPicker( _editPanel.find("#uc-corpus-cnt-fntcolor-box"), {init:"#000000", change:function(color) {
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				if( color )
					comp.adjust(_varUCEditPanelBrowser.articleFntColorPicker);
		    },alpha:false,input:true,empty:false} );
			
			this.articleBgColorPicker = new $.varRichColorPicker( _editPanel.find("#uc-corpus-cnt-bgcolor-box"), {init:"#ffffff", change:function(color) {
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				if( color )
					comp.adjust(_varUCEditPanelBrowser.articleBgColorPicker);
		    },alpha:true,input:true,empty:true} );
			
			this.listBgColorPicker = new $.varRichColorPicker( _editPanel.find("#uc-corpus-tbl-bgcolor-box"), {init:"#ffffff", change:function(color) {
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				if( color )
					comp.adjust(_varUCEditPanelBrowser.listBgColorPicker);
		    },alpha:true,input:true,empty:true} );
			
			
			this.tblWidth = new $.varSliderBar({ target:_editPanel.find("#in_uc-corpus-tbl-width")[0], "min":0, "max":100, "start":100, "callback":function(val){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				comp.adjust(_varUCEditPanelBrowser.tblWidth);
				_editPanel.find("#uc-corpus-tbl-width-val").val(_varUCEditPanelBrowser.tblWidth.getVal());
			}});
			
			this.tblHeight = new $.varSliderBar({ target:_editPanel.find("#in_uc-corpus-tbl-height")[0], "min":0, "max":100, "start":100, "callback":function(val){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				comp.adjust(_varUCEditPanelBrowser.tblHeight);
				_editPanel.find("#uc-corpus-tbl-high-val").val(_varUCEditPanelBrowser.tblHeight.getVal());

			}});
			
			this.articleWidth = new $.varSliderBar({ target:_editPanel.find("#in_uc-corpus-cnt-width")[0], "min":0, "max":100, "start":100, "callback":function(val){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				comp.adjust(_varUCEditPanelBrowser.articleWidth);
				_editPanel.find("#uc-corpus-width-val").val(_varUCEditPanelBrowser.articleWidth.getVal());

			}});
			this.articleHeight = new $.varSliderBar({ target:_editPanel.find("#in_uc-corpus-cnt-height")[0], "min":0, "max":100, "start":100, "callback":function(val){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				comp.adjust(_varUCEditPanelBrowser.articleHeight);
				_editPanel.find("#uc-corpus-high-val").val(_varUCEditPanelBrowser.articleHeight.getVal());

			}});
			this.articleFntIndentHeight = new $.varSliderBar({ target:_editPanel.find("#in_uc-corpus-cnt-fnt-indent")[0], "min":0, "max":40, "start":20, "callback":function(val){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				comp.adjust(_varUCEditPanelBrowser.articleFntIndentHeight);
				_editPanel.find("#uc-corpus-cnt-fnt-indent-val").val(_varUCEditPanelBrowser.articleFntIndentHeight.getVal());

			}});
			this.articleFntSpacingHeight = new $.varSliderBar({ target:_editPanel.find("#in_uc-corpus-cnt-fnt-spacing")[0], "min":0, "max":20, "start":8, "callback":function(val){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				comp.adjust(_varUCEditPanelBrowser.articleFntSpacingHeight);
				_editPanel.find("#uc-corpus-cnt-fnt-spacing-val").val(_varUCEditPanelBrowser.articleFntSpacingHeight.getVal());

			}});
			
			this.listFntMarginTopHeight = new $.varSliderBar({ target:_editPanel.find("#in_corpus-tbl-fnt-marginTop")[0], "min":0, "max":40, "start":20, "callback":function(val){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				comp.adjust(_varUCEditPanelBrowser.listFntMarginTopHeight);
				_editPanel.find("#uc-corpus-tbl-fnt-margin-top-val").val(_varUCEditPanelBrowser.listFntMarginTopHeight.getVal());

			}});
			
			this.listFntMarginBottomHeight = new $.varSliderBar({ target:_editPanel.find("#in_corpus-tbl-fnt-marginBottom")[0], "min":0, "max":40, "start":20, "callback":function(val){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				comp.adjust(_varUCEditPanelBrowser.listFntMarginBottomHeight);
				_editPanel.find("#uc-corpus-tbl-fnt-margin-bottom-val").val(_varUCEditPanelBrowser.listFntMarginBottomHeight.getVal());

			}});
			
			this.listFntSpacingHeight = new $.varSliderBar({ target:_editPanel.find("#in_uc-corpus-tbl-fnt-spacing")[0], "min":0, "max":20, "start":0, "callback":function(val){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				comp.adjust(_varUCEditPanelBrowser.listFntSpacingHeight);
				_editPanel.find("#uc-corpus-tbl-fnt-spacing-val").val(_varUCEditPanelBrowser.listFntSpacingHeight.getVal());
			}});
			this.listFntSize = new $.varSliderBar({ target:_editPanel.find("#in_uc-corpus-tbl-fnt-size")[0], "min":0, "max":20, "start":12, "needInt":false, "callback":function(val){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				comp.adjust(_varUCEditPanelBrowser.listFntSize);
				_editPanel.find("#uc-corpus-tbl-fnt-size-val").val(_varUCEditPanelBrowser.listFntSize.getVal());

			}});
			this.articleFntSize = new $.varSliderBar({ target:_editPanel.find("#in_uc-corpus-cnt-fnt-size")[0], "min":0, "max":20, "start":12.6, "needInt":false, "callback":function(val){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				comp.adjust(_varUCEditPanelBrowser.articleFntSize);
				_editPanel.find("#uc-corpus-cnt-fnt-size-val").val(_varUCEditPanelBrowser.articleFntSize.getVal());

			}});
			this.cntLineHeight = new $.varSliderBar({ target:_editPanel.find("#in_uc-corpus-cnt-lineHeight")[0], "min":0, "max":30, "start":18,  "callback":function(val){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				comp.adjust(_varUCEditPanelBrowser.cntLineHeight);
				_editPanel.find("#uc-corpus-cnt-lineHeight-val").val(_varUCEditPanelBrowser.cntLineHeight.getVal());

			}});
			
			this.listHAlign = new $.varRadioBox({"target":_editPanel.find("#uc-corpus-tbl-halign"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				comp.adjust(_varUCEditPanelBrowser.listHAlign);

			}});
			
			this.cntVAlign = new $.varRadioBox({"target":_editPanel.find("#uc-corpus-cnt-alignV"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				comp.adjust(_varUCEditPanelBrowser.cntVAlign);

			}});
			
			this.listFntStyle = new $.varRadioBox({"target":_editPanel.find("#uc-corpus-tbl-fnt-style"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				comp.adjust(_varUCEditPanelBrowser.listFntStyle);

			}});
			
			this.articleFntHeight = new $.varRadioBox({"target":_editPanel.find("#uc-corpus-cnt-fnt-line-high"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				comp.adjust(_varUCEditPanelBrowser.articleFntHeight);

			}});
			
			this.articleFntStyle = new $.varRadioBox({"target":_editPanel.find("#uc-corpus-cnt-fnt-style"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				comp.adjust(_varUCEditPanelBrowser.articleFntStyle);

			}});
			this.splitLineStyle = new $.varRadioBox({"target":_editPanel.find("#uc-corpus-splitting-line"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
				comp.adjust(_varUCEditPanelBrowser.splitLineStyle);

			}});
			this.navBarDisplay = new $.varCheckBox({"target":_editPanel.find(".uc-browser-nav-display"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varUCEditPanelBrowser.navBarDisplay);
		
			}});
			isIni = true;
		}
		
	};
})(window.jQuery);
var _varUCEditPanelBrowser= new $.varUCEditPanelBrowser();

(function ($){
	$.varComponentLayoutPanel = function(args){
		
		var _editPanel = $(".uc-edit-panel-layouts");
		
		var borderStyle = function() {
			this.adjust = function(tag) {
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() ).get();
				var border = $(event.target).attr("border");

				tag.toggleClass("uc_layouts_border_nosel uc_layouts_border_sel");
				if(tag.hasClass("uc_layouts_border_nosel")) {
					if( border === "top" ) {
						comp.css( "border-top-width", "0px" );
					} else if( border === "right" ) {
						comp.css( "border-right-width", "0px" );
					} else if( border === "bottom" ) {
						comp.css( "border-bottom-width", "0px" );
					} else if( border === "left" ) {
						comp.css( "border-left-width", "0px" );
					}
				}else if(tag.hasClass("uc_layouts_border_sel")) {
					if( border === "top" ) {
						comp.css( "border-top-width", _varComponentLayoutPanel.weightRangeSlider.getVal()+"px" );
					} else if( border === "right" ) {
						comp.css( "border-right-width", _varComponentLayoutPanel.weightRangeSlider.getVal()+"px" );
					} else if( border === "bottom" ) {
						comp.css( "border-bottom-width", _varComponentLayoutPanel.weightRangeSlider.getVal()+"px" );
					} else if( border === "left" ) {
						comp.css( "border-left-width", _varComponentLayoutPanel.weightRangeSlider.getVal()+"px" );
					}
					comp.css("borderRadius", _varComponentLayoutPanel.rangeSlider.getVal()+"px");
					comp.css("borderStyle", _varComponentLayoutPanel.compBorderStyle.getSelectValue() );
					comp.css("borderColor", _varComponentLayoutPanel.borderColorPicker.getRgbString() );
				}
				
				
			}
		}
		var isini = false;
		
		this.getEditComponents = function() {
			return _editPanel;
		};
		this.isIni = function() {
			return isini;
		}
		var currentFilled;
		this.setCurrentFilled = function(id){
			currentFilled=id;
		};
		this.show = function() {
			if( currentFilled === _varUCEditComponent.getCurrentCompID() ) return;
			currentFilled = _varUCEditComponent.getCurrentCompID();
			
			var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
			comp.fill(this);
		}
		this.ini = function() {
			this.bgColorPicker = new $.varRichColorPicker( _editPanel.find("#in_bgcolor_box"), {init:"#ffffff", change:function(color) {
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				if( color )
							comp.adjust(_varComponentLayoutPanel.bgColorPicker);
				    },alpha:true,input:true,empty:true} );
				 
			this.fgColorPicker = new $.varRichColorPicker( _editPanel.find("#in_fgcolor_box"), {init:"#ffffff", change:function(color) {
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				if( color )
							comp.adjust(_varComponentLayoutPanel.fgColorPicker);
				    },alpha:true,input:true,empty:true} );
				 
			this.borderColorPicker = new $.varRichColorPicker( _editPanel.find("#in_bordercolor_box"), {init:"#efefef", change:function(color) {
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				if( color )
							comp.adjust(_varComponentLayoutPanel.borderColorPicker);
				    },alpha:true,input:true,empty:true} );
				 
			this.shadowColorPicker = new $.varRichColorPicker( _editPanel.find("#in_shadowcolor_box"), {init:"#888888", change:function(color) {
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				if( color )
							comp.adjust(_varComponentLayoutPanel.shadowColorPicker);
				    },alpha:true,input:true,empty:true} );
				
			this.rangeSlider = new $.varSliderBar({ target:_editPanel.find("#in_borderRadius")[0], "min":0, "max":20, "start":0, "callback":function(val){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varComponentLayoutPanel.rangeSlider);
				_editPanel.find("#border-radius-val").val(_varComponentLayoutPanel.rangeSlider.getVal());

				}});
			this.weightRangeSlider = new $.varSliderBar({ target:_editPanel.find("#in_borderWeight")[0], "min":0, "max":20, "start":0, "callback":function(val){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varComponentLayoutPanel.weightRangeSlider);
				_editPanel.find("#border-weight-val").val(_varComponentLayoutPanel.weightRangeSlider.getVal());

				}});
			this.paddingLeftSlider = new $.varSliderBar({ target:_editPanel.find("#in_paddingLeft")[0], "min":0, "max":20, "start":0, "callback":function(val){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varComponentLayoutPanel.paddingLeftSlider);
				_editPanel.find("#paddingLeft-val").val(_varComponentLayoutPanel.paddingLeftSlider.getVal());

				}});
			this.paddingRightSlider = new $.varSliderBar({ target:_editPanel.find("#in_paddingRight")[0], "min":0, "max":20, "start":0, "callback":function(val){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varComponentLayoutPanel.paddingRightSlider);
				_editPanel.find("#paddingRight-val").val(_varComponentLayoutPanel.paddingRightSlider.getVal());

				}});
			this.paddingTopSlider = new $.varSliderBar({ target:_editPanel.find("#in_paddingTop")[0], "min":0, "max":20, "start":0, "callback":function(val){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varComponentLayoutPanel.paddingTopSlider);
				_editPanel.find("#paddingTop-val").val(_varComponentLayoutPanel.paddingTopSlider.getVal());

				}});
			this.paddingBottomSlider = new $.varSliderBar({ target:_editPanel.find("#in_paddingBottom")[0], "min":0, "max":20, "start":0, "callback":function(val){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varComponentLayoutPanel.paddingBottomSlider);
				_editPanel.find("#paddingBottom-val").val(_varComponentLayoutPanel.paddingBottomSlider.getVal());

				}});
				
			this.shadowWeightSlider= new $.varSliderBar({ target:_editPanel.find("#in_shadowWeight")[0], "min":0, "max":20, "start":0, "callback":function(val){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varComponentLayoutPanel.shadowWeightSlider);
				_editPanel.find("#shadow-blur-val").val(_varComponentLayoutPanel.shadowWeightSlider.getVal());

				}});
			this.shadowHSlider = new $.varSliderBar({ target:_editPanel.find("#in_Hshadow")[0], "min":-20, "max":20, "start":0, "callback":function(val){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varComponentLayoutPanel.shadowHSlider);
				_editPanel.find("#h-shadow-val").val(_varComponentLayoutPanel.shadowHSlider.getVal());

				}});
			this.shadowVSlider = new $.varSliderBar({ target:_editPanel.find("#in_Vshadow")[0], "min":-20, "max":20, "start":0, "callback":function(val){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varComponentLayoutPanel.shadowVSlider);
				_editPanel.find("#v-shadow-val").val(_varComponentLayoutPanel.shadowVSlider.getVal());

				}});
			this.shadowSpreadSlider = new $.varSliderBar({ target:_editPanel.find("#in_shadowSpread")[0], "min":0, "max":20, "start":0, "callback":function(val){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varComponentLayoutPanel.shadowSpreadSlider);
				_editPanel.find("#shadow-spread-val").val(_varComponentLayoutPanel.shadowSpreadSlider.getVal());

				}});
					
			this.compWidthMode = new $.varRadioBox({"target":_editPanel.find("#uc-component-width-size-mode"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varComponentLayoutPanel.compWidthMode);
				_editPanel.find("#uc-component-width-size-mode").find("#sceWidth-fixed-val,#sceWidth-percent-val").toggleClass("uc-text-disable uc-text-editable");

				}});
				
			this.compHeightMode = new $.varRadioBox({"target":_editPanel.find("#uc-component-height-size-mode"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varComponentLayoutPanel.compHeightMode);
				_editPanel.find("#uc-component-height-size-mode").find("#sceHeight-fixed-val,#sceHeight-percent-val").toggleClass("uc-text-disable uc-text-editable");

				}});
				
			this.compPositionMode = new $.varRadioBox({"target":_editPanel.find("#uc-component-position-mode"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varComponentLayoutPanel.compPositionMode);
				_editPanel.find(".position-info").find("#scePositionX-fixed-val,#scePositionX-percent-val,#scePositionY-fixed-val,#scePositionY-percent-val").toggleClass("uc-text-disable uc-text-editable");

				}});
				
			this.compBorderStyle = new $.varRadioBox({"target":_editPanel.find("#uc-component-border-style"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varComponentLayoutPanel.compBorderStyle);

				}});
				
			this.compshadowMode = new $.varCheckBox({"target":_editPanel.find("#uc-shadow-mode-checkbox"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varComponentLayoutPanel.compshadowMode);

				}});
			
			this.compRectInfo = new $.varInputTxt({"event":"change","target":_editPanel.find("#sceWidth-fixed-val,#sceWidth-percent-val,#sceHeight-fixed-val,#sceHeight-percent-va,#scePositionX-fixed-val,#scePositionX-percent-val,#scePositionY-fixed-val,#scePositionY-percent-val"), "callback":function(event){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				_varComponentLayoutPanel.compRectInfo.setTarget(event);
				comp.adjust(_varComponentLayoutPanel.compRectInfo);

			}});
			
			this.boxBorderTop = new $.varCheckBox({"target":_editPanel.find("#uc-sce-has-border-top"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varComponentLayoutPanel.boxBorderTop);

				}});
			this.boxBorderRight = new $.varCheckBox({"target":_editPanel.find("#uc-sce-has-border-right"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varComponentLayoutPanel.boxBorderRight);

				}});
			this.boxBorderBottom = new $.varCheckBox({"target":_editPanel.find("#uc-sce-has-border-bottom"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varComponentLayoutPanel.boxBorderBottom);

				}});
			this.boxBorderLeft = new $.varCheckBox({"target":_editPanel.find("#uc-sce-has-border-left"), "callback":function(){
				var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );	
				comp.adjust(_varComponentLayoutPanel.boxBorderLeft);

				}});
			
			isini = true;
			//_editPanel.css("display","flex");
		}
		
		
	};
	
})(window.jQuery);
var _varComponentLayoutPanel = new $.varComponentLayoutPanel();

(function ($){
	$.varComponentMaterialPanel = function(args){
		
		var _editPanel = $(".uc-edit-panel-material");
		var isini = false;
		var currentFilled;
		
		this.getEditComponents = function() {
			return _editPanel;
		};
		this.isIni = function() {
			return isini;
		}
		this.ini = function() {
			isini = true;
		}
		this.show = function() {
			if( currentFilled === _varUCEditComponent.getCurrentCompID() ) return;
			currentFilled = _varUCEditComponent.getCurrentCompID();
			
			var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );
			comp.fill(this);
		}
		this.fill = function(data) {
			
		}
	};
	
})(window.jQuery);
var _varComponentMaterialPanel = new $.varComponentMaterialPanel();
