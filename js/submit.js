var unsavedTempaltes = {};
var scenarioTypeNames = ["DEFAULT","BANNER","REFRESHBLOCK","RANKLIST","TIMESERIES","CORPUSCOLLECT"];

var templateInstance = (function ($) {
	
	var _COLLECTPAGES = function(pageComponents){
		var pageAry=[];
//		var scenarioId = target.attr("scenario-id");
//		var scenarioType = target.attr("sType");
//		var componentsRoot = $(".uc-edit-components[scenario-id='"+ scenarioId +"']");
//		if(componentsRoot.length>0) {
		var scenarioId = pageComponents.attr("scenario-id");
			var pages = pageComponents.find(".uc-edit-comp-r-editor-con");
			for(var i=0;i<pages.length;i++){
				var pageJson={};
				var page=$(pages[i]);
				var pageIdx = parseInt(page.attr("page"));
				pageJson["pageId"]=scenarioId+"_page"+pageIdx;
				pageJson["no"]=pageIdx;
//				if( scenarioType == 1 ) {
//	            	//scenario["collect"] = _BANNER;
//					pageJson["pageComponent"] = _BANNER(page);
//	            } else if( scenarioType == 2 ) {
//	            	//scenario["collect"] = _REFRESHBLOCK;
//	            	pageJson["pageComponent"] = _REFRESHBLOCK(page);
//	            } else if( scenarioType == 3 ) {
//	            	//scenario["collect"] = _RANKLIST;
//	            	pageJson["pageComponent"] = _RANKLIST(page);
//	            } else if( scenarioType == 4 ) {
//	            	///scenario["collect"] = _TIMESERIES;
//	            	pageJson["pageComponent"] = _TIMESERIES(page);
//	            } else if( scenarioType == 5 ) {
//	            	//scenario["collect"] = _CORPUSCOLLECT;
//	            	pageJson["pageComponent"] = _CORPUSCOLLECT(page);
//	            }
				pageJson["pageComponent"] = _COMPONENTSINFO(page);
				pageAry.push(pageJson);
			}
		//}
		return pageAry;
	}
	
	var _CORPUSCOLLECT = function(target){
		var scenarioId = target.attr("scenario-id");
		var scenarioType = target.attr("sType");
		var componentsRoot = $(".uc-edit-components[scenario-id='"+ scenarioId +"']");
		if(componentsRoot.length>0) {
			var pageComponent={};
			pageComponent["pages"] = _COLLECTPAGES(componentsRoot);//_COMPONENTSINFO(page);
			pageComponent["properties"] = {};
			return pageComponent;
		} else 
			return null;
	};
	
	var _BANNER = function(page){
		
	};
	
	var _REFRESHBLOCK = function(page){  
		
	};
	
	var _RANKLIST = function(page){
		
	};
	
	var _TIMESERIES = function(page){
		
	};
	
	var _COMPONENTSINFO = function(page){
		var compObj = {};
		
		var containerSel = page.find(".uc-edit-components-selector.container-selector");
		var iteratorSel = page.find(".uc-edit-components-selector.iterator-selector");
		var elementSel = page.find(".uc-edit-components-selector.element-selector");
		var paginationSel = page.find(".uc-edit-components-selector.pagination-selector");
		
		compObj["containers"]={};
		var containerCol = _collectSel(containerSel);
		if(containerCol)
			compObj["containers"]["selector"]=containerCol;
		
		compObj["containers"]["iterators"]={};
		var iteratorCol = _collectSel(iteratorSel);
		if(iteratorCol)
			compObj["containers"]["iterators"]["selector"]=iteratorCol;
		
		compObj["containers"]["iterators"]["items"]={};
		var elementKeySel = elementSel.children(".uc-edit-components-selector-elkey");
		var elementValSel = elementSel.children(".uc-edit-components-selector-elval");
		var elementKeyName = elementKeySel.find("input[name='txtLblName']").val();
		if( !elementKeyName ) elementKeyName = "itemVal";
		compObj["containers"]["iterators"]["items"]["label"] = {};
		compObj["containers"]["iterators"]["items"]["value"] = {};
		compObj["containers"]["iterators"]["items"]["label"]["name"] = elementKeyName;
		var elementKeyCol = _collectSel(elementKeySel); 
		if(elementKeyCol)
			compObj["containers"]["iterators"]["items"]["label"]["selector"]=elementKeyCol;
		var elementValCol = _collectSel(elementValSel); 
		if(elementValCol)
			compObj["containers"]["iterators"]["items"]["value"]["selector"]=elementValCol;
		
		if( elementSel.find("#in_element_hyperlink").hasClass("switch-on") ){
			compObj["containers"]["iterators"]["items"]["link"] = 1;
		} else
			compObj["containers"]["iterators"]["items"]["link"] = 0;
		
		if( elementSel.children("#in_element_expand").hasClass("switch-on") ){
			compObj["containers"]["iterators"]["items"]["extract"] = 1;
		} else
			compObj["containers"]["iterators"]["items"]["extract"] = 0;
		
		if( elementSel.children("#in_element_isimage").hasClass("switch-on") ){
			compObj["containers"]["iterators"]["items"]["img"] = 1;
		} else
			compObj["containers"]["iterators"]["items"]["img"] = 0;
		
		compObj["pagination"]={};
		var paginationCol = _collectSel(paginationSel);
		if(paginationCol)
			compObj["pagination"]["selector"]=paginationCol;
//		if(containerSel.length>0){
//			for(var i=0;i<containerSel.length;i++){
//				var consel=containerSel[i];
//				
//			}
//		}
		//componentArray.push(compObj);
		
		console.log("compObj:");
		console.log(compObj);
		return compObj;
	}
	
	var _collectSel = function( selector ) {
		var nameInput = selector.find(".input_text_hint[name='txtName']");
		var nameVal = null;
		if( nameInput.length>0 && nameInput.val())
			nameVal = nameInput.val();
		
		var tagInput = selector.find(".input_text_hint[name='txtTag']");
		var tagVal = null;
		if( tagInput.length>0 && tagInput.val())
			tagVal = tagInput.val(); 
		
		var classInput = selector.find(".input_text_hint[name='txtClass']");
		var classVal = null;
		if( classInput.length>0 && classInput.val() )
			classVal = classInput.val();
		
		var idInput = selector.find(".input_text_hint[name='txtID']");
		var idVal = null;
		if( idInput.length>0 && idInput.val() )
			idVal = idInput.val();
		
		var xpathInput = selector.find(".input_text_hint[name='txtXPath']");
		var xpathVal = null; 
		if( xpathInput.length>0 && xpathInput.val() )
			xpathVal = xpathInput.val();
		
		var indexInput = selector.find(".input_text_hint[name='txtIndex']");
		var indexVal = null;
		if( indexInput.length>0 && indexInput.val() )
			indexVal = indexInput.val();
		
		var domObject = {};
		var attributes = {};
		if(nameVal!=null)
			domObject["name"]=nameVal;
		if(tagVal!=null)
			domObject["tag"]=tagVal;
		if(classVal!=null)
			domObject["clazz"]=classVal;
		if(idVal!=null)
			domObject["id"]=idVal;
		if(xpathVal!=null)
			domObject["xpath"]=xpathVal;
		if(indexVal!=null)
			domObject["index"]=indexVal;
		
		var attrs = selector.find(".custom-attrs");
		if( attrs.length > 0 ) {
			var attributes = [];
			var inputs = attrs.children(".uc-edit-comp-r-editor-input-block");
			for(var i=0; i<inputs.length; i++) {
				var name=$(inputs[i]).children("input[name='attrName']");
				var val=$(inputs[i]).children("input[name='attrValue']");
				if( name.val() && val.val())
					attributes[name.val()] = val.val();
			}
			if( attributes.length > 0 )
				domObject["attributes"] = attributes;
		}
		if(Object.keys(domObject).length<=0)
			return null;
		
		return domObject;
	}
	
	var _COMMONINFO = function(target){
		//var scenario = editable_template["scenarios"][scenarioId];
		var scenarioId = target.attr("scenario-id");
		var editPanel= $(".uc-edit-panel-main[scenario-id='"+ scenarioId +"']");
		if( editPanel.length>0 ) {
			var baseInfo = editPanel.children(".uc-edit-panel-block.basic-info");
			//var layoutInfo = editPanel.children(".uc-edit-panel-block.layout-info");
			var colorInfo = editPanel.children(".uc-edit-panel-block.layout-color-info");
			var borderInfo = editPanel.children(".uc-edit-panel-block.layout-border-info");
			var paddingInfo = editPanel.children(".uc-edit-panel-block.layout-padding-info");
			
			//var sharingInfo = editPanel.children(".uc-edit-panel-block.sharing-info");
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
			//baseInfoObj["scenarioType"]=baseInfo.children("#in_scenarioType").val();
			//baseInfoObj["scenarioTypeName"]=baseInfo.children("#in_scenarioTypeName").val();
			//baseInfoObj["title"]=baseInfo.children("#in_title").val();
			//baseInfoObj["keywords"]=baseInfo.children("#in_keywords").val();
			//baseInfoObj["delay"]=baseInfo.children("#in_delay").val();
			//baseInfoObj["href"]=baseInfo.children("#in_href").val();
			
			//baseInfoObj["scenelist"]=[];
			
			//sceneObj["delay"]=baseInfo.children("#in_delay").val();
			//sceneObj["href"]=baseInfo.children("#in_href").val();
//			baseInfoObj["scenelist"].push(sceneObj);
//			
//			if( sharingInfo.children("#in_shareTheme").hasClass("switch-on") ) {
//				sharingInfoObj["shareTheme"] = 1;
//			} else
//				sharingInfoObj["shareTheme"] = 0;
//			if( sharingInfo.children("#in_shareWhole").hasClass("switch-on") ) {
//				sharingInfoObj["shareWhole"] = 1;
//			} else
//				sharingInfoObj["shareWhole"] = 0;
			
			
			var bgColorPicker = colorInfo.find("#in_bgcolor_box");
			var fgColorPicker = colorInfo.find("#in_fgcolor_box");
			layoutInfoObj["backgroundColor"] = bgColorPicker.spectrum("get").toRgbString();
			layoutInfoObj["foregroundColor"] = fgColorPicker.spectrum("get").toRgbString();
			
			var borders = borderInfo.find("#border-style");
			if(borders.length>0){
				layoutInfoObj["borderTop"] = borders.children("#in-border-top-style").css("borderTop");
				layoutInfoObj["borderRight"] = borders.children("#in-border-right-style").css("borderRight");
				layoutInfoObj["borderBottom"] = borders.children("#in-border-bottom-style").css("borderBottom");
				layoutInfoObj["borderLeft"] = borders.children("#in-border-left-style").css("borderLeft");
				
			}
			
			var radius = borderInfo.find("#border-radius-val");
			if(radius.length>0)
				layoutInfoObj["borderRadius"] = parseInt(radius.text());
			
			var shadow = borderInfo.find("#shadow-style").children("div[id^='shadow-style'] [selected='selected']");
			if(shadow.length>0){
				layoutInfoObj["borderShadow"] = shadow.css("box-shadow");
			} else
				layoutInfoObj["borderShadow"] = "0px";
			
			layoutInfoObj["paddingTop"] = paddingInfo.find("#sp-padding-top-val").val();
			layoutInfoObj["paddingLeft"] = paddingInfo.find("#sp-padding-left-val").val();
			layoutInfoObj["paddingBottom"] = paddingInfo.find("#sp-padding-down-val").val();
			layoutInfoObj["paddingRight"] = paddingInfo.find("#sp-padding-right-val").val();

				
			scheduleInfoObj["interval"] = scheduleInfo.find("div[id^='in_delay'][selected='selected']").attr("value");
			scheduleInfoObj["unit"]="SECONDS";
			
			//baseInfoObj["sharing"]=sharingInfoObj;
			baseInfoObj["layout"]=layoutInfoObj;
			baseInfoObj["schedule"]=scheduleInfoObj;
			
			return baseInfoObj;
		} else {
			var baseInfoObj = {};
			var layoutInfoObj = {};
			var scheduleInfoObj = {};
			
			baseInfoObj["automation"]=0;
			baseInfoObj["maxDuration"]=7200;
			baseInfoObj["maxThreadNum"]=1;
			
			layoutInfoObj["backgroundColor"] = "#ffffff";
			layoutInfoObj["foregroundColor"] = "#ffffff";
			
			layoutInfoObj["borderTop"] = "0px solid #ffffff";
			layoutInfoObj["borderRight"] = "0px solid #ffffff";
			layoutInfoObj["borderBottom"] = "0px solid #ffffff";
			layoutInfoObj["borderLeft"] = "0px solid #ffffff";
			layoutInfoObj["borderRadius"] = "0px";
			
			layoutInfoObj["paddingTop"] = "0px";
			layoutInfoObj["paddingLeft"] = "0px";
			layoutInfoObj["paddingBottom"] = "0px";
			layoutInfoObj["paddingRight"] = "0px";

				
			scheduleInfoObj["interval"] = 3600;
			scheduleInfoObj["unit"]="SECONDS";
			
			//baseInfoObj["sharing"]=sharingInfoObj;
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
        newScenario: function (target) {
        	var container = $(".uc-canvas-container");
        	var scenarioType = target.attr("sType");
        	var scenarioId = target.attr("scenario-id");
        	var href = target.children(".uc_t_tool_addr").children("input[type='text']").val();
        	
			//scenario[i]["position"] = position;
			//scenario[i]["collect"](scenario[i]["scenarioId"]);
			//scenario["configuration"] = position;
			//scenario["pages"] = position;
			
            var scenario = {};
			scenario["position"] = calcPosition(container, target);

            var schedule = {};
            //var layout = {};
            var sceneList = [];
            
            scenario["scenarioId"] = scenarioId;
            scenario["scenarioType"] = scenarioType;
            scenario["scenarioTypeName"] = scenarioTypeNames[scenarioType];
            scenario["href"] = href;
            
//            scenario["automation"] = 0;
//            scenario["maxDuration"] = 2*60*60;//seconds
//            scenario["maxThreadNum"] = 1;
//            schedule["interval"]=1*60*60;
//            schedule["unit"]="second";
//            //scenario["layout"]=layout;
//            scenario["schedule"]=schedule;
            scenario["configuration"] = _COMMONINFO(target);
            //scenario["pages"] = _COLLECTPAGES(target);
            if( scenarioType == 1 ) {
            	//scenario["collect"] = _BANNER;
            	var actors = _BANNER(target);
            } else if( scenarioType == 2 ) {
            	//scenario["collect"] = _REFRESHBLOCK;
            	var actors = _REFRESHBLOCK(target);
            } else if( scenarioType == 3 ) {
            	//scenario["collect"] = _RANKLIST;
            	var actors = _RANKLIST(target);
            } else if( scenarioType == 4 ) {
            	///scenario["collect"] = _TIMESERIES;
            	var actors = _TIMESERIES(target);
            } else if( scenarioType == 5 ) {
            	//scenario["collect"] = _CORPUSCOLLECT;
            	var actors = _CORPUSCOLLECT(target);
            }
            if(!actors) {
        		console.log("scenario has no actors");
        	}
        	scenario["actors"] = actors;
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

function calcPosition(container, target) {
	var position = {};
	var x = (parseFloat(target.attr("data-x")) || 0);
	var y = (parseFloat(target.attr("data-y")) || 0);
	var w = (parseFloat(target.width()) || 430);
	var h = (parseFloat(target.height()) || 260);
		
	//position["x"] = Math.round(parseFloat(x/container.width())*10000) / 100;
	//position["y"] = Math.round(parseFloat(y/container.height())*10000) / 100;
	position["x"] = parseFloat(x/container.width());
	position["y"] = parseFloat(y/container.height());
	position["width"] = parseFloat(w/container.width());
	position["height"] = parseFloat(h/container.height());
	//position["z-index"] = "10"+index;
	
	return position;
}

function collectAndSubmit(target) {
	var submitbox = $(target).parents(".uc_submit_box");
	var container = $(".uc-canvas-container");
	var scenarioTemplates = container.find(".uc_t_box");
	
	//var scenario = container.children(".uc_t_box");
	//var scenario = editable_template["scenarios"];
	var datas={};
	var template = {};
	if( scenarioTemplates.length > 0 ) {
		var scenarios=[];
		for(var i=0;i<scenarioTemplates.length;i++){
			var scenario = templateInstance.newScenario($(scenarioTemplates[i]));//{};
			
			//console.log("Save scenario: " + type +", position: ("+ x +","+ y + "), rect: " + w +"x"+ h);
			//console.log("Save scenario: " + type +", position: ("+ parseFloat(x/container.width()) +","+ parseFloat(y/container.height()) + "), rect: " + parseFloat(w/container.width()) +"x"+ parseFloat(h/container.height()));
			scenarios.push(scenario);
			
		}
		template["title"] = submitbox.find("#in_title").val();
		template["keywords"] = submitbox.find("#in_keywords").val();
		if( submitbox.find("#in_shareTheme").hasClass("switch-on"))
			template["shareTemplate"] = true;
		else
			template["shareTemplate"] = false;
		
		if( submitbox.find("#in_shareWhole").hasClass("switch-on"))
			template["shareContent"] = true;
		else
			template["shareContent"] = false;
		
		template["scenarios"] = scenarios;
		console.log(JSON.stringify(template));
		//request("post", "/datacenter/", template, callback)
	}
}
var editable_template = templateInstance.newTemplate();