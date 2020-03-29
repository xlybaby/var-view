var _varDocument = (function ($){
	$.varDocRoot = function(args){
		
		var _canvasM = $(".uc-canvasM");
		var _div = $(".page-main-div");
		var _canvasCon = $(".uc-canvas-container");
		
		this.getCanvasM = function() {
			return _canvasM;
		};
		this.getCanvasContainer = function() {
			return _canvasCon;
		}
	};
	return new $.varDocRoot();
})(window.jQuery);

(function ($){
	$.varUCNewBox = function(args){
		
		var _ucNewBox = $(".uc_new_box");
		var _addedComps = {};
		this.getNewBox = function() {
			return _ucNewBox;
		};
		this.getAddedComp = function(id) {
			return _addedComps[id];
		}
		 this.show = function() {
			 _ucNewBox.css("left", (($(window).width() - _ucNewBox.width())/2)+"px");
			 _ucNewBox.css("top", (($(window).height() - _ucNewBox.height())/2)+"px");
			 
			 $(".overlay").css("display","block");
			_ucNewBox.css("display","flex");
		 }
		 this.add = function(type, width, height) {
//			 ;
//			 if(type==="timeseries") {
//				 comp = new $.varLineCompBox({"width":width,"height":height});
//			 } else if(type==="subscribe"){
//				 comp = new $.varSubscribeCompBox({"width":width,"height":height});
//			 } else if(type==="banner"){
//				 comp = new $.varBannerCompBox({"width":width,"height":height});
//			 } else if(type==="browser"){
//				 comp = new $.varBrowserCompBox({"width":width,"height":height});
//			 }
//			 comp.append();
			 
			 var opts = {"width":width,"height":height,"type":type};
			 var comp =	_varUCCommonComp.append(opts);
			 _addedComps[_varUCCommonComp.getID(comp)] = comp;
			
			 $(".overlay").hide();
			 _ucNewBox.hide();
		 }
		 
		 this.cancel = function() {
			 $(".overlay").hide();
			 _ucNewBox.hide();
		 }
		 
		 this.ini = function() {
			 
			 _ucNewBox.find(".new-comp-type").find("button").on({
				 click: function(event){
						var target = $(event.target);
						event.stopPropagation(); 
						target.parents(".new-comp-type").find(".new-comp-type-area.new-comp-type-sel").toggleClass("new-comp-type-nosel new-comp-type-sel");
						target.parents(".new-comp-type-area").toggleClass("new-comp-type-nosel new-comp-type-sel");
					},
					mouseover:function(event){
						event.target.style.cursor="pointer";
					}
			 });
			 _ucNewBox.find("button[name='uc_addnew_ok']").on({
				 click: function(event){
						var target = $(event.target);
						event.stopPropagation(); 
						var sel = _ucNewBox.find(".new-comp-type-sel").children(".uc-float-menu-one-btn").attr("value");
						var w = _ucNewBox.find(".new-size").find("input[name='height']").val();
						var h = _ucNewBox.find(".new-size").find("input[name='width']").val();
						_varUCNewBox.add(sel,w,h);
				 },
					mouseover:function(event){
						event.target.style.cursor="pointer";
					}
			 });
			 _ucNewBox.find("button[name='uc_addnew_cancel']").on({
				 click: function(event){
					 $(".overlay").hide();
						_ucNewBox.hide();
					},
					mouseover:function(event){
						event.target.style.cursor="pointer";
					}
			 });
		 }
	};
	
})(window.jQuery);
var _varUCNewBox = new $.varUCNewBox();
_varUCNewBox.ini();

(function ($){
	$.varUCSubmitBox = function(args){
		var _ucSubmitBox = $(".uc_new_submit");
		
		this.getSubmitBox = function() {
			return _ucSubmitBox;
		};
		
		this.submit = function() {
			
		}
		
		this.hide = function() {
			 $(".overlay").hide();
			 _ucSubmitBox.hide();
		 }
		
		this.ini = function() {
			_ucSubmitBox.find("button[name='uc_submit_ok']").on({
				 click: function(event){
					 //TODO
					 $(".overlay").hide();
					 _varUCSubmitBox.hide();
					 _varUCSubmitBox.submit();
					},
					mouseover:function(event){
						event.target.style.cursor="pointer";
					}
			 });
			
			_ucSubmitBox.find("button[name='uc_submit_cancel']").on({
				 click: function(event){
					 $(".overlay").hide();
					 _varUCSubmitBox.hide();
					},
					mouseover:function(event){
						event.target.style.cursor="pointer";
					}
			 });
			
			_ucSubmitBox.find(".cn_link_label").on({
				 click: function(event){
					 var target = $(event.target);
					 var inputVal = target.parents(".uc-input-area").find("input[type='text']").val();
					 if(!StringUtil.isEmpty(inputVal)) {
						 inputVal+=' ';
						 if(inputVal.indexOf(target.text())>=0) return;
					 }
					 target.parents(".uc-input-area").find("input[type='text']").val(inputVal+target.text());
				}
			 });
			
			this.shareTemp = new $.varCheckBox({"target":_editPanel.find(".uc-submit-share-template"), "callback":function(){
			}});
		};
		this.show = function() {
			_ucSubmitBox.css("left", (($(window).width() - _ucSubmitBox.width())/2)+"px");
			_ucSubmitBox.css("top", (($(window).height() - _ucSubmitBox.height())/2)+"px");
			 
			 $(".overlay").css("display","block");
			 _ucSubmitBox.css("display","flex");
		};
		this.ini();
	};
	
})(window.jQuery);
var _varUCSubmitBox = new $.varUCSubmitBox();



(function ($){
	$.varUCEditComponent = function(args){
		
		var _editPanel = $(".uc-edit-panel");
		var _compPanel;
		var _id;
		var _materialPanel;
		var isini=false;
		this.getEditComponents = function() {
			return _editPanel;
		};
		
		this.getCurrentCompID = function() {
			return _id;
		}
		this.show = function(sid) {
			if(_editPanel.hasClass("element-display-flex")) return;
			_editPanel.toggleClass("element-display-flex element-hide fadeInRight fadeOutRight");
			
			if( sid === _id ) return;
			_id = sid;
			
			if(!isini) {
				this.ini();
				_editPanel.find(".uc-edit-panel-tag.component").click();
				isini = true;
			}
		}
		this.ini = function() {
			_editPanel.css("display","flex");
			_editPanel.find(".uc-edit-panel-tag").on({
				click: function(event) {
					event.stopPropagation();
					var target = $(event.target);
					if(!target.hasClass("uc-edit-panel-tag"))        
						target = target.parents(".uc-edit-panel-tag");
					var tab = target.attr("target");
					_editPanel.find(".uc-edit-panel-mid").find("."+tab).css("display", "flex");
					_editPanel.find(".uc-edit-panel-mid").children(":not(."+tab+")").hide();
					
					target.siblings(".uc-edit-panel-tag").css({"borderTop":"0px solid #fff","borderRight":"0px solid #fff","backgroundColor":"rgb(213,213,213,0.0)","borderLeft":"0px solid #fff"});
					
					target.css("backgroundColor","rgb(213,213,213,1.0)");
					target.css("borderLeft","1px solid #fff");
					target.css("borderRight","1px solid #fff");
					target.css("borderTop","1px solid #fff");
					
					if( target.hasClass("component") ) {
						if( !_varComponentLayoutPanel.isIni() )
							_varComponentLayoutPanel.ini();
						
						_varComponentLayoutPanel.show();
					} else if( target.hasClass("custom") ) {
							var type = _varUCNewBox.getAddedComp(_varUCEditComponent.getCurrentCompID()).getType();
							if( type === "browser" ){
								if( !_varUCEditPanelBrowser.isIni() )
									_varUCEditPanelBrowser.ini();
								
								_varUCEditPanelBrowser.show();
							} else if( type === "timeseries" ){
								if( !_varUCEditPanelTS.isIni() )
									_varUCEditPanelTS.ini();
								
								_varUCEditPanelTS.show();
							} else if( type === "banner" ){
								if( !_varUCEditPanelBanner.isIni() )
									_varUCEditPanelBanner.ini();
								
								_varUCEditPanelBanner.show();
							} else if( type === "subscribe" ){
								if( !_varUCEditPanelSubscribe.isIni() )
									_varUCEditPanelSubscribe.ini();
								
								_varUCEditPanelSubscribe.show();
							}
						
					}  else if( target.hasClass("material") ) {
						if( !_varComponentMaterialPanel.isIni() )
							_varComponentMaterialPanel.ini();
						
						_varComponentMaterialPanel.show();
					} 
				},
				
				mouseover:function(event){
					event.target.style.cursor="pointer";
				}
			});
			_editPanel.find("#uc-edit-panel-out-button").on({
				click: function(event) {
					event.stopPropagation();
					_editPanel.toggleClass("element-display-flex element-hide fadeInRight fadeOutRight");

				},
				
				mouseover:function(event){
					event.target.style.cursor="pointer";
				}
			});
			
		}
	};
	
})(window.jQuery);
var _varUCEditComponent = new $.varUCEditComponent();

(function ($){
	$.varUCFloatMenu = function(args){
		
		var menus = $(".uc-float-menu-one");
		var typemenus = $(".uc-float-menu-type");
		var fmenu = $(".uc-float-menu");
		
		this.getFmenu = function() {
			return fmenu;
		};
		this.getTypemenus = function() {
			return typemenus;
		};
		this.getFloatmenus = function() {
			return menus;
		};
		
		this.onclick = function(oMenu) {
			console.log(oMenu);
			if( !oMenu.hasClass("uc-float-menu-one-btn") )
				oMenu = oMenu.parents(".uc-float-menu-one-btn");
			
			if(oMenu.hasClass("editTempalte")) {
				_varUCEditTemplate.show();
				
			} else if(oMenu.hasClass("addComponent")) {
				_varUCNewBox.show();
				
			}  else if(oMenu.hasClass("submit")) {
				_varUCSubmitBox.show();
				
			}  else if(oMenu.hasClass("exit")) {
				
			} 
		}
		
		this.ini = function() {
			
			for(var i=0;i<typemenus.length;i++) {
				var typemenu = typemenus[i];
				typemenu.style.left = "3px";
				typemenu.style.top = "3px";//Math.round(parseFloat((startTop+padding)/container.height())*10000) / 100 + "%";
				//padding+=10;
				//startTop+=55;
			}
			
			var menuTotHeight = menus.length * parseInt(menus.css("height")) + (menus.length-1) * 10;
			fmenu.css("height", (menuTotHeight+10)+"px");
			fmenu.css("min-height", menuTotHeight+"px");
			
			
			var startTop = parseFloat((_varDocument.getCanvasM().height() - (menuTotHeight+10))/2);
			fmenu.css("left", "10px");
			fmenu.css("top", Math.round(parseFloat(startTop/_varDocument.getCanvasM().height())*10000) / 100 + "%");
			
			var padding = 10;
			var callback = this.onclick;

			for(var i=0;i<menus.length;i++) {
				var menu = menus[i];
				menu.style.left = "0px";
				menu.style.top = (padding*i+parseInt(menus.css("height"))*i)+"px";//Math.round(parseFloat((startTop+padding)/container.height())*10000) / 100 + "%";
				//padding+=10;
				//startTop+=55;
				menu.setAttribute("originalY",menu.style.top);
				$(menu).children(".uc-float-menu-one-btn").on({
					click: function(event){
						event.stopPropagation(); 
						callback($(event.target)) ;
					},
					mouseover:function(event){
						event.target.style.cursor="pointer";
					}
				});
			}
			fmenu.attr("direction-x","left");
		};
	};
	
})(window.jQuery);
var _varUCFloatMenu = new $.varUCFloatMenu();
_varUCFloatMenu.ini();

$(".uc-editSceMaterial-spec-corpus-demo").find(".uc-corpus-list-txt").on({
	click:function(event){
		var rowIdx = $(event.target).parents(".uc-corpus-browser-contents-list-row").index();
		$(".uc-editSceMaterial-spec-corpus-demo").find(".uc-corpus-browser-article").eq(rowIdx).siblings(".uc-corpus-browser-article").hide();
		$(".uc-editSceMaterial-spec-corpus-demo").find(".uc-corpus-browser-article").eq(rowIdx).css("display","flex");
	},
	mouseover:function(event){
		event.target.style.cursor="pointer";
	}
});