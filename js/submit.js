var unsavedTempaltes = {};
var scenarioTypeNames = ["DEFAULT","BANNER","REFRESHBLOCK","RANKLIST","TIMESERIES","CORPUSCOLLECT"];

var templateInstance = (function ($) {
	
	var _CORPUSCOLLECT = function(scenarioId){
		
	};
	var _BANNER = function(scenarioId){
		
	};
	var _REFRESHBLOCK = function(scenarioId){  
		
	};
	var _RANKLIST = function(scenarioId){
		
	};
	var _TIMESERIES = function(scenarioId){
		
	};
	var _COMPONENTSINFO = function(scenarioId){
		var componentArray = [];
		
		var componentsRoot = $(".uc-edit-components[id='"+ scenarioId +"']");
		if( componentsRoot.length>0 ) {
			var components = componentsRoot.children(".uc-edit-comp-r-editor-con");
			if( components.length>0 ) {
				for(var ci=0;ci<components.length;ci++ ) {
					var compObj = {};
					var comp = components[ci];
					var containerSel = comp.children(".uc-edit-components-selector.container-selector");
					var iteratorSel = comp.children(".uc-edit-components-selector.iterator-selector");
					var elementSel = comp.children(".uc-edit-components-selector.element-selector");
					var paginationSel = comp.children(".uc-edit-components-selector.pagination-selector");
					compObj["containers"]={};
					compObj["containers"]["selector"]=_collectSel(containerSel);
					compObj["containers"]["iterators"]={};
					compObj["containers"]["iterators"]["selector"]=_collectSel(iteratorSel);
					
					compObj["containers"]["iterators"]["items"]={};
					compObj["containers"]["iterators"]["items"]["selector"]=_collectSel(elementSel);
					if( elementSel.children("#in_hyperlink").hasClass("switch-on") ){
						compObj["containers"]["iterators"]["items"]["link"] = 1;
					} else
						compObj["containers"]["iterators"]["items"]["link"] = 0;
					
					if( elementSel.children("#in_expand").hasClass("switch-on") ){
						compObj["containers"]["iterators"]["items"]["extract"] = 1;
					} else
						compObj["containers"]["iterators"]["items"]["extract"] = 0;
					
					if( elementSel.children("#in_isimage").hasClass("switch-on") ){
						compObj["containers"]["iterators"]["items"]["img"] = 1;
					} else
						compObj["containers"]["iterators"]["items"]["img"] = 0;
					
					compObj["pagination"]={};
					compObj["pagination"]["selector"]=_collectSel(paginationSel);
//					if(containerSel.length>0){
//						for(var i=0;i<containerSel.length;i++){
//							var consel=containerSel[i];
//							
//						}
//					}
					componentArray.push(compObj);
				}
				
			}
		}
		return componentArray;
	}
	
	var _collectSel = function( selector ) {
		var nameInput = selector.children(".input_text_hint[name='txtName']");
		var nameVal = null;
		if( nameInput.length>0 )
			nameVal = nameInput.val();
		
		var tagInput = selector.children(".input_text_hint[name='txtTag']");
		var tagVal = null;
		if( tagInput.length>0 )
			tagVal = tagInput.val();
		
		var classInput = selector.children(".input_text_hint[name='txtClass']");
		var classVal = null;
		if( classInput.length>0 )
			classVal = classInput.val();
		
		var idInput = selector.children(".input_text_hint[name='txtID']");
		var idVal = null;
		if( idInput.length>0 )
			idVal = idInput.val();
		
		var xpathInput = selector.children(".input_text_hint[name='txtXPath']");
		var xpathVal = null;
		if( xpathInput.length>0 )
			xpathVal = xpathInput.val();
		
		var indexInput = selector.children(".input_text_hint[name='txtIndex']");
		var indexVal = null;
		if( indexInput.length>0 )
			indexVal = indexInput.val();
		
		var selector = {};
		var attributes = {};
		if(nameVal!=null)
			selector["name"]=nameVal;
		if(tagVal!=null)
			selector["tag"]=tagVal;
		if(classVal!=null)
			selector["clazz"]=classVal;
		if(idVal!=null)
			selector["id"]=idVal;
		if(xpathVal!=null)
			selector["xpath"]=xpathVal;
		if(indexVal!=null)
			selector["index"]=indexVal;
		
		var attrs = selector.children(".custom-attrs");
		if( attrs.length > 0 ) {
			var inputs = attrs.children(".uc-edit-comp-r-editor-input-block");
			for(var i=0; i<inputs.length; i++) {
				var name=inputs[i].children("input[name='attrName']");
				var val=inputs[i].children("input[name='attrValue']");
				attributes[name.val()] = val.val();
			}
			if( inputs.length > 0 )
				selector["attributes"] = attributes;
		}
		return selector;
	}
	
	var _COMMONINFO = function(scenarioId){
		var scenario = editable_template["scenarios"][scenarioId];
		var editPanel= $(".uc-edit-panel-main[id='"+ scenarioId +"']");
		if( editPanel.length>0 ) {
			var baseInfo = editPanel.children(".uc-edit-panel-block.basic-info");
			var layoutInfo = editPanel.children(".uc-edit-panel-block.layout-info");
			var sharingInfo = editPanel.children(".uc-edit-panel-block.sharing-info");
			var scheduleInfo = editPanel.children(".uc-edit-panel-block.schedule-info");
			var modeInfo = editPanel.children(".uc-edit-panel-block.mode-info");
			
			var baseInfoObj = {};
			var layoutInfoObj = {};
			var sharingInfoObj = {};
			var scheduleInfoObj = {};
			var sceneObj = {};
			
			if(modeInfo.children("#in_headless").hasClass("switch-on"))
				baseInfoObj["automation"]=1;//0:no auto,1:auto
			else
				baseInfoObj["automation"]=0;
			
			baseInfoObj["maxDuration"]=baseInfo.children("#in_maxDuration").val();
			baseInfoObj["maxThreadNum"]=baseInfo.children("#in_maxThreadNum").val();
			baseInfoObj["scenarioType"]=baseInfo.children("#in_scenarioType").val();
			baseInfoObj["scenarioTypeName"]=baseInfo.children("#in_scenarioTypeName").val();
			baseInfoObj["title"]=baseInfo.children("#in_title").val();
			baseInfoObj["keywords"]=baseInfo.children("#in_keywords").val();
			baseInfoObj["delay"]=baseInfo.children("#in_delay").val();
			baseInfoObj["href"]=baseInfo.children("#in_href").val();
			
			baseInfoObj["scenelist"]=[];
			
			//sceneObj["delay"]=baseInfo.children("#in_delay").val();
			//sceneObj["href"]=baseInfo.children("#in_href").val();
			baseInfoObj["scenelist"].push(sceneObj);
			
			if( sharingInfo.children("#in_shareTheme").hasClass("switch-on") ) {
				sharingInfoObj["shareTheme"] = 1;
			} else
				sharingInfoObj["shareTheme"] = 0;
			if( sharingInfo.children("#in_shareWhole").hasClass("switch-on") ) {
				sharingInfoObj["shareWhole"] = 1;
			} else
				sharingInfoObj["shareWhole"] = 0;
			
			layoutInfoObj["backgroundColor"] = layoutInfo.children("#in_bgcolor").val();
			var borders = layoutInfo.children("#border-style");
			if(borders.length>0){
				var top = borders.children("#border-top");
				var bottom = borders.children("#border-bottom");
				var left = borders.children("#border-left");
				var right = borders.children("#border-right");
				
				if(top.attr("clicked")==="true") {
					layoutInfoObj["borderTop"] = "1px solid #333333";
				}
				if(bottom.attr("clicked")==="true") {
					layoutInfoObj["borderBottom"] = "1px solid #333333";
				}
				if(left.attr("clicked")==="true") {
					layoutInfoObj["borderLeft"] = "1px solid #333333";
				}
				if(right.attr("clicked")==="true") {
					layoutInfoObj["borderRight"] = "1px solid #333333";
				}
				
			}
			
			var radius = layoutInfo.children("#in_borderRadius");
			if(radius.length>0)
				layoutInfoObj["borderRadius"] = radius.val();
			
			var shadow = layoutInfo.children("#shadow-style");
			if(shadow.length>0){
				if( borders.children("#style1").attr("clicked")==="true" ) {
					layoutInfoObj["borderShadow"] = "0 0 3px #888888";
					
				}else if( borders.children("#style2").attr("clicked")==="true" ) {
					layoutInfoObj["borderShadow"] = "2px 2px 3px #888888";
					
				}else if( borders.children("#style3").attr("clicked")==="true" ) {
					layoutInfoObj["borderShadow"] = "-2px -2px 3px #888888";
					
				}else if( borders.children("#style4").attr("clicked")==="true" ) {
					layoutInfoObj["borderShadow"] = "0 0 3px #888888 inset";
					
				}else if( borders.children("#style5").attr("clicked")==="true" ) {
					layoutInfoObj["borderShadow"] = "2px 2px 3px #888888 inset";
					
				}else if( borders.children("#style6").attr("clicked")==="true" ) {
					layoutInfoObj["borderShadow"] = "-2px -2px 3px #888888 inset";
					
				}
			}
			
			scheduleInfoObj["interval"] = scheduleInfo.children("#in_schedule").val();
			scheduleInfoObj["unit"]="SECONDS";
			
			baseInfoObj["sharing"]=sharingInfoObj;
			baseInfoObj["layout"]=layoutInfoObj;
			baseInfoObj["schedule"]=scheduleInfoObj;
			
			return baseInfoObj;
		}
	}
	
	var pub = {
        newTemplate: function () {
            var temp = {};
            var id = "uc_temp__"+guid();
            var scenarios = {};
            temp["id"] = id;
            temp["scenarios"] = scenarios;
            
            return temp;
        },
        newScenario: function (scenarioType) {
            var scenario = {};
            var schedule = {};
            //var layout = {};
            var sceneList = [];
            
            var id = "uc_sce__"+guid();
            scenario["scenarioId"] = id;
            scenario["scenarioType"] = scenarioType;
            scenario["scenarioTypeName"] = scenarioTypeNames[scenarioType];
            scenario["automation"] = 0;
            scenario["maxDuration"] = 2*60*60;//seconds
            scenario["maxThreadNum"] = 1;
            
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
            
            schedule["interval"]=1*60*60;
            schedule["unit"]="second";
            //scenario["layout"]=layout;
            scenario["schedule"]=schedule;
            
            return scenario;
        }
    	
    } 
    return pub;    
})(window.jQuery);

var templateCollect = (function ($) {
	var pub = {
        save: function () {
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

function collectAndSubmit() {
	var container = $(".uc-canvas-container");
	//var scenario = container.children(".uc_t_box");
	var scenario = editable_template["scenarios"];
	var datas={};
	var template = {};
	if( scenario.length > 0 ) {
		var scenarios=[];
		for(var i=0;i<scenario.length;i++){
			var position = {};
			var x = (parseFloat(scenario[i].getAttribute("data-x")) || 0);
			var y = (parseFloat(scenario[i].getAttribute("data-y")) || 0);
			var w = (parseFloat($(scenario[i]).width()) || 400);
			var h = (parseFloat($(scenario[i]).height()) || 250);
			var type = scenario[i].getAttribute("sType");
			position["x"]=Math.round(parseFloat(x/container.width())*10000) / 100;
			position["y"]=Math.round(parseFloat(y/container.height())*10000) / 100;
			position["width"]=parseFloat(w/container.width());
			position["height"]=parseFloat(h/container.height());
			
			scenario[i]["position"] = position;
			scenario[i]["collect"](scenario[i]["scenarioId"]);
			
			//console.log("Save scenario: " + type +", position: ("+ x +","+ y + "), rect: " + w +"x"+ h);
			//console.log("Save scenario: " + type +", position: ("+ parseFloat(x/container.width()) +","+ parseFloat(y/container.height()) + "), rect: " + parseFloat(w/container.width()) +"x"+ parseFloat(h/container.height()));
			scenarios.push(scenario[i]);
			
		}
		template["scenarios"] = scenarios;
		console.log(scenarios);
		//request("post", "/datacenter/", template, callback)
	}
}
var editable_template = templateInstance.newTemplate();