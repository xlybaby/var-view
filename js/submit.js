var unsavedTempaltes = {};
var scenarioTypeNames = ["DEFAULT","BANNER","REFRESHBLOCK","RANKLIST","TIMESERIES","CORPUSCOLLECT"];

var templateInstance = (function ($) {
	
	var _COLLECTPAGES = function(pageComponents){
		var pageAry=[];
//		var scenarioId = target.attr("scenarioId");
//		var scenarioType = target.attr("sType");
//		var componentsRoot = $(".uc-edit-components[scenarioId='"+ scenarioId +"']");
//		if(componentsRoot.length>0) {
		var scenarioId = pageComponents.attr("scenarioId");
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
		var scenarioId = target.attr("scenarioId");
		var scenarioType = target.attr("sType");
		var componentsRoot = $(".uc-edit-components[scenarioId='"+ scenarioId +"']");
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
		var scenarioId = target.attr("scenarioId");
		var editPanel= $(".uc-edit-panel-mid").children(".uc-edit-panel-layouts[scenarioId='"+ scenarioId +"']");
		if( editPanel.length>0 ) {
			var baseInfo = editPanel.children(".uc-edit-panel-block.basic-info");
			//var layoutInfo = editPanel.children(".uc-edit-panel-block.layout-info");
			var colorInfo = editPanel.children(".uc-edit-panel-block.layout-color-info");
			var borderInfo = editPanel.children(".uc-edit-panel-block.layout-border-info");
			var shadowInfo = editPanel.children(".uc-edit-panel-block.layout-shadow-info");
			var paddingInfo = editPanel.children(".uc-edit-panel-block.layout-padding-info");
			//var sharingInfo = editPanel.children(".uc-edit-panel-block.sharing-info");
			var scheduleInfo = editPanel.children(".uc-edit-panel-block.schedule-info");
			var modeInfo = editPanel.children(".uc-edit-panel-block.mode-info");
			
			var sceneObj = {};
	
			var container = $(".uc-canvas-container");
			sceneObj["position"]=baseInfo.find("#uc_scenario_position").find(".uc-radio-box[selected='selected']").attr("value");
			var x=parseFloat(target.attr("data-x"));
			var y=parseFloat(target.attr("data-y"));
			if( sceneObj["position"] === "absolute" ){
				sceneObj["left"]=( x || 0)+"px";
				sceneObj["top"]=( y || 0)+"px";
			} else if( sceneObj["position"] === "relative" ) {
				sceneObj["left"]=(Math.round(parseFloat(x/container.width())*10000) / 100)+"%";
				sceneObj["top"]=(Math.round(parseFloat(y/container.height())*10000) / 100)+"%";
			}
			
			sceneObj["width"]=baseInfo.find("#uc_scenario_width").find(".uc-radio-box[selected='selected']").siblings("input[type='text']").val() + baseInfo.find("#uc_scenario_width").find(".uc-radio-box[selected='selected']").siblings(".value_unit").text();
			sceneObj["height"]=baseInfo.find("#uc_scenario_height").find(".uc-radio-box[selected='selected']").siblings("input[type='text']").val() + baseInfo.find("#uc_scenario_width").find(".uc-radio-box[selected='selected']").siblings(".value_unit").text();
			
			sceneObj["mode"]=modeInfo.find(".uc-check-box.sce-mode-val").attr("value");
			sceneObj["delay"]=parseInt(modeInfo.find("#in_auto_delay_val").val());
			//baseInfoObj["maxDuration"]=baseInfo.children("#in_maxDuration").val();
			//baseInfoObj["maxThreadNum"]=baseInfo.children("#in_maxThreadNum").val();
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
			var fntColorPicker = colorInfo.find("#in_fntcolor_box");
			var borderColorPicker = borderInfo.find("#in_bordercolor_box");
			var shadowColorPicker = shadowInfo.find("#in_shadowcolor_box");

			var shadowHSlider = shadowInfo.find("#in_Hshadow");
			var shadowVSlider = shadowInfo.find("#in_Vshadow");
			var shadowSpreadSlider = shadowInfo.find("#in_shadowSpread");
			var shadowWeightSlider = shadowInfo.find("#in_shadowWeight");

			var rangeSlider = borderInfo.find("#in_borderRadius");
			var weightRangeSlider = borderInfo.find("#in_borderWeight");
			var paddingLeftSlider = paddingInfo.find("#in_paddingLeft");
			var paddingRightSlider = paddingInfo.find("#in_paddingRight");
			var paddingTopSlider = paddingInfo.find("#in_paddingTop");
			var paddingBottomSlider = paddingInfo.find("#in_paddingBottom");
			
			var scheduleIntervalSlider = scheduleInfo.find("#in_scheduleInterval");
			var scheduleMinutesSlider = scheduleInfo.find("#in_scheduleMinutesInterval");
			
			if(bgColorPicker.spectrum("get"))
				sceneObj["backgroundColor"] = bgColorPicker.spectrum("get").toRgbString();
			if(fgColorPicker.spectrum("get"))
				sceneObj["foregroundColor"] = fgColorPicker.spectrum("get").toRgbString();
			if(fntColorPicker.spectrum("get"))
				sceneObj["fontColor"] = fntColorPicker.spectrum("get").toRgbString();

			var borders = borderInfo.find(".uc_layouts_border_sel");
			if(borders.length>0){
				for(var i=0; i<borders.length; i++ ) {
					if( $(borders[i]).attr("border") === "top" ) {
						sceneObj["borderTop"] = {};
						sceneObj["borderTop"]["style"] = "solid";
						sceneObj["borderTop"]["color"] = borderColorPicker.spectrum("get").toRgbString();
						sceneObj["borderTop"]["width"] = parseInt(weightRangeSlider[0].noUiSlider.get());
						sceneObj["borderTop"]["radius"] = parseInt(rangeSlider[0].noUiSlider.get());
					}
					if( $(borders[i]).attr("border") === "right" ) {
						sceneObj["borderRight"] = {};
						sceneObj["borderRight"]["style"] = "solid";
						sceneObj["borderRight"]["color"] = borderColorPicker.spectrum("get").toRgbString();
						sceneObj["borderRight"]["width"] = parseInt(weightRangeSlider[0].noUiSlider.get());
						sceneObj["borderRight"]["radius"] = parseInt(rangeSlider[0].noUiSlider.get());
					}
					if( $(borders[i]).attr("border") === "left" ) {
						sceneObj["borderLeft"] = {};
						sceneObj["borderLeft"]["style"] = "solid";
						sceneObj["borderLeft"]["color"] = borderColorPicker.spectrum("get").toRgbString();
						sceneObj["borderLeft"]["width"] = parseInt(weightRangeSlider[0].noUiSlider.get());
						sceneObj["borderLeft"]["radius"] = parseInt(rangeSlider[0].noUiSlider.get());
					}
					if( $(borders[i]).attr("border") === "bottom" ) {
						sceneObj["borderBottom"] = {};
						sceneObj["borderBottom"]["style"] = "solid";
						sceneObj["borderBottom"]["color"] = borderColorPicker.spectrum("get").toRgbString();
						sceneObj["borderBottom"]["width"] = parseInt(weightRangeSlider[0].noUiSlider.get());
						sceneObj["borderBottom"]["radius"] = parseInt(rangeSlider[0].noUiSlider.get());
					}
				}
			}
			
	        var hshadowval = shadowHSlider[0].noUiSlider.get();
	        var vshadowval = shadowVSlider[0].noUiSlider.get();
	        var shadowblurval = shadowWeightSlider[0].noUiSlider.get();
	        var shadowspreadval = shadowSpreadSlider[0].noUiSlider.get();
	        var shadowinsetval = shadowInfo.find("#shadow-inset-val").attr("value");
	        if(!shadowinsetval) shadowinsetval = "";
	        sceneObj["shadowBox"] = hshadowval+"px "+vshadowval+"px "+shadowblurval+"px "+shadowspreadval+"px "+shadowColorPicker.spectrum("get").toRgbString() + " "+shadowinsetval;

	        sceneObj["paddingLeft"] = parseInt(paddingLeftSlider[0].noUiSlider.get());
	        sceneObj["paddingRight"] = parseInt(paddingRightSlider[0].noUiSlider.get());
	        sceneObj["paddingTop"] = parseInt(paddingTopSlider[0].noUiSlider.get());
	        sceneObj["paddingBottom"] = parseInt(paddingBottomSlider[0].noUiSlider.get());

			var selSchedule = 	scheduleInfo.find(".uc-radio-box[selected='selected']");
			if( selSchedule.attr("value") === "minute" )
				sceneObj["period"] = parseInt(scheduleMinutesSlider[0].noUiSlider.get());
			else if( selSchedule.attr("value") === "hour" )
				sceneObj["period"] = parseInt(scheduleIntervalSlider[0].noUiSlider.get());
			sceneObj["periodlyUnit"]=selSchedule.attr("value");
			
			
			return sceneObj;
		} else {
		}
	}
	
	var pub = {
        newTemplate: function () {
            var temp = {};
            var timestamp = Date.parse(new Date()) / 1000;
            var id = "uc_temp__"+guid()+"_"+timestamp;
            var scenarios = {};
            temp["id"] = id;
            //temp["scenarios"] = scenarios;
            
            var tempPanel = $(".uc-edit-panel-mid").children(".uc-edit-panel-template");
            if( tempPanel.attr("initiated") !== "initiated" ){
            		temp["alignItems"] = "center";
            		temp["backgroundColor"] = "rgba(255, 255, 255, 1.0)";
            		temp["backgroundImage"] = "";
            		temp["height"] = "calc(100vh)";
            		temp["justifyContent"] = "center";
            
            		temp["shareTemplate"] =  false;
            		temp["shareTemplateContent"] = false;
            		temp["width"] =  "100%";
            		return temp;
			}
            
            var tempWidth =  tempPanel.find("#uc_template_width");
            var tempWidthSel = tempWidth.find(".uc-radio-box[selected='selected']");
            if( tempWidthSel.attr("value") === "auto" ) {
            	temp["width"] = "auto";
            } else if( tempWidthSel.attr("value") === "percent" ) {
            	var input = tempWidthSel.siblings("input[type='text']");
            	temp["width"] = input.val()+"%";
            } else if( tempWidthSel.attr("value") === "absolute" ) {
            	var input = tempWidthSel.siblings("input[type='text']");
            	temp["width"] = input.val()+"px";
            } 
            
            var tempHeight =  tempPanel.find("#uc_template_height");
            var tempHeightSel = tempHeight.find(".uc-radio-box[selected='selected']");
            if( tempHeightSel.attr("value") === "auto" ) {
            	temp["height"] = "auto";
            } else if( tempHeightSel.attr("value") === "percent" ) {
            	var input = tempHeightSel.siblings("input[type='text']");
            	//temp["height"] = input.val()+"%";
            	temp["height"] = "calc("+input.val()+"vh)";
            } else if( tempHeightSel.attr("value") === "absolute" ) {
            	var input = tempHeightSel.siblings("input[type='text']");
            	temp["height"] = input.val()+"px";
            } 
            
            var tempWidthMax = tempPanel.find(".tempWidthMax-val");
            if( tempWidthMax.length >0 )
            	temp["maxWidth"] = tempWidthMax.val()+"px";

            var tempHeightMax = tempPanel.find(".tempHeightMax-val");
            if( tempHeightMax.length >0 )
            	temp["maxHeight"] = tempHeightMax.val()+"px";
            
            var tempWidthMin = tempPanel.find(".tempWidthMin-val");
            if( tempWidthMin.length >0 )
            	temp["minWidth"] = tempWidthMin.val()+"px";
            
            var tempHeightMin = tempPanel.find(".tempHeightMin-val");
            if( tempHeightMin.length >0 )
            	temp["minHeight"] = tempHeightMin.val()+"px";
            
            var tempAlign = tempPanel.find(".uc-float-icon-selected.uc-temp-align-items");
            if( tempAlign.length > 0 )
            	temp["alignItems"] = tempAlign.attr("align");
            var tempJustify = tempPanel.find(".uc-float-icon-selected.uc-temp-justify-content");
            if( tempJustify.length > 0 )
            	temp["justifyContent"] = tempJustify.attr("align");
            
            var templateBgColorPicker = tempPanel.find("#in_tempbgcolor_box");
            if( templateBgColorPicker.spectrum("get") )
            	temp["backgroundColor"] = templateBgColorPicker.spectrum("get").toRgbString();
            
            var tempBgImg = tempPanel.find(".uc-bg-image-sel");
            if( tempBgImg.css("backgroundImage") ) {
            	temp["backgroundImage"] = tempBgImg.css("backgroundImage");
            }
            
            var tempShare = tempPanel.find(".uc-check-box.uc-temp-share");
            if( tempShare.length > 0 ) {
            	temp["shareTemplate"] = tempShare.attr("value");
            }
            var tempCntShare = tempPanel.find(".uc-check-box.uc-temp-content-share");
            if( tempCntShare.length > 0 ) {
            	temp["shareTemplateContent"] = tempCntShare.attr("value");
            }
            
            return temp;
        },
        newScenario: function (target) {
        	var container = $(".uc-canvas-container");
        	var scenarioType = target.attr("sType");
        	var scenarioId = target.attr("scenarioId");
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
            
            //scenario["scenarioId"] = scenarioId;
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
//            if( scenarioType == 1 ) {
//            	//scenario["collect"] = _BANNER;
//            	var actors = _BANNER(target);
//            } else if( scenarioType == 2 ) {
//            	//scenario["collect"] = _REFRESHBLOCK;
//            	var actors = _REFRESHBLOCK(target);
//            } else if( scenarioType == 3 ) {
//            	//scenario["collect"] = _RANKLIST;
//            	var actors = _RANKLIST(target);
//            } else if( scenarioType == 4 ) {
//            	///scenario["collect"] = _TIMESERIES;
//            	var actors = _TIMESERIES(target);
//            } else if( scenarioType == 5 ) {
//            	//scenario["collect"] = _CORPUSCOLLECT;
//            	var actors = _CORPUSCOLLECT(target);
//            }
//            if(!actors) {
//        		console.log("scenario has no actors");
//        	}
//        	scenario["actors"] = actors;
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

function getMaterialBlockValues(con) {
	var conval = {};
	if( !StringUtil.isEmpty(con.find("input[name='txtTag']").val()) ) 
		conval["tag"] = con.find("input[name='txtTag']").val();
	if( !StringUtil.isEmpty(con.find("input[name='txtID']").val()) ) 
		conval["id"] = con.find("input[name='txtID']").val();
	if( !StringUtil.isEmpty(con.find("input[name='txtClass']").val()) ) 
		conval["class"] = con.find("input[name='txtClass']").val();
	if( !StringUtil.isEmpty(con.find("input[name='txtName']").val()) ) 
		conval["name"] = con.find("input[name='txtName']").val();
	if( !StringUtil.isEmpty(con.find("input[name='txtXPath']").val()) ) 
		conval["xpath"] = con.find("input[name='txtXPath']").val();
	if( !StringUtil.isEmpty(con.find("input[name='txtIndex']").val()) ) 
		conval["index"] = con.find("input[name='txtIndex']").val();
	var concustomattrs = con.find(".container-custom-info");
	var concustomattrsrows = concustomattrs.find(".uc-input-block-table-row.custom-rows");
	var concustomattrsary = [];
	for(var i=0;i<concustomattrsrows.length;i++){
		var row = $(concustomattrsrows[i]);
		var rowval = {};
		if( !StringUtil.isEmpty(row.find("input[name='txtAttrName']").val()) && !StringUtil.isEmpty(row.find("input[name='txtAttrVal']" ).val()) ) {
			rowval["attr"]=row.find("input[name='txtAttrName']").val();
			rowval["val"]=row.find("input[name='txtAttrVal']" ).val();
		}
		if(JSON.stringify(rowval) != "{}")	
			concustomattrsary.push(rowval);
	}
	if(concustomattrsary.length>0)	
		conval["custom-attrs"] = concustomattrsary;
	return conval;
}

function checkMaterial(itemPanel, vMap) {
	var con = itemPanel.find(".container-selector");
	var iter = itemPanel.find(".iterator-selector");
	var item = itemPanel.find(".element-selector");
	
	var conval = getMaterialBlockValues(con) ;
	if(JSON.stringify(conval) != "{}"){
		vMap["container-selector"] = conval;
	}
	
	var iterval = getMaterialBlockValues(iter) ;
	if(JSON.stringify(iterval) != "{}"){
		vMap["iterator-selector"] = iterval;
	}
	
	var itemval = getMaterialBlockValues(item) ;
	if(JSON.stringify(itemval) != "{}"){
		vMap["element-selector"] = itemval;
	}
	
	if(JSON.stringify(vMap) != "{}") return true;
	
	return false;
}

function collectMaterial(templateId) {
	var oMaterial = {};
    var mPanel = $(".uc-edit-panel-mid").children(".uc-edit-panel-material");
    var itemPanels = mPanel.find(".uc-edit-comp-r-editor-con");
    var vList = {};
    for(var i = 0; i < itemPanels.length; i++ ) {
    	var vMap = {};
    	var info= {};
    	if(checkMaterial($(itemPanels[i]), vMap)) {
    		info["selector"] = vMap;
    		info["src"] = $(itemPanels[i]).find(".item-basic-info").find("#itemSrc").val();
    		info["name"] = $(itemPanels[i]).find(".item-basic-info").find("#itemName").val();
    		info["code"] = $(itemPanels[i]).find(".item-basic-info").find("#itemCode").val();
    		info["summary"] = $(itemPanels[i]).find(".item-basic-info").find("#itemSummary").val();
    		info["type"] = $(itemPanels[i]).find(".item-basic-info").find(".uc-radio-box[selected='selected']").attr("value");
    		//vList.push(info);
    	}
    	vList[$(itemPanels[i]).attr("itemId")] = info;
    }
    oMaterial["items"] = vList;
    oMaterial["templateId"] = templateId;
    
    return oMaterial;
}

function collectBannerInfo(panel, btype) {
	var banner = {};
	banner["type"] = btype;
	if( btype === "classic" ){
		var valueInfo = panel.find(".value-info");
		banner["binding"] = valueInfo.find( ".uc-input-block-table-row[itemId]").attr("bindingitemid");
		
		var themeInfo = panel.find(".theme-info");
		banner["backgroundColor"] = themeInfo.find("#uc-banner-bgcolor-box").spectrum("get").toRgbString();
		
		var posInfo = panel.find(".position-info");
		banner["position"] = posInfo.find(".uc-bg-image-sel").attr("value");
		
		var operInfo = panel.find(".operation-info");
		banner["manual"] = operInfo.find(".uc-banner-manual-val").attr("value");
		banner["automation"] = operInfo.find(".uc-banner-automation-val").attr("value");
	}
	return banner;

}
function collectTimeseriesChartInfo(panel, ctype) {
	var chart = {};
	chart["type"] = ctype;
	if( ctype === "ts-line" ) {
		var xaxis = panel.find(".x-axis-info");
		chart["xAxisLabel"] = xaxis.find("#specXAxisLabel").val();
		var unit = xaxis.find(".uc-radio-box[selected='selected']").attr("value");
		chart["xAxisUnit"] = unit;
		chart["xAxisInterval"] = xaxis.find("#ts-axis-interval-val-"+unit).val();
		
		var yaxis = panel.find(".y-axis-info");
		chart["yAxisLabel"] = yaxis.find("#specYAxisLabel").val();

		var values = panel.find(".value-info");
		var rowlist = {};
		values.find( ".uc-input-block-table-row[itemId]").each( function(index, element){
			var bindedItemId = $(element).attr("bindingitemid");
			var row={};
			row["bindedItemId"] = bindedItemId;
			rowlist["row"+index] = row;
		});
		chart["lines"] = rowlist;
		
		var theme = panel.find(".theme-info");
		chart["backgroundColor"] = theme.find("#uc-timeseries-bgcolor-box").spectrum("get").toRgbString();
		chart["axisColor"] = theme.find("#uc-timeseries-axis-color-box").spectrum("get").toRgbString();
		chart["fontColor"] = theme.find("#uc-timeseries-fonts-color-box").spectrum("get").toRgbString();
		
		var layouts = panel.find(".layouts-info");
		chart["grid"] = layouts.find("#uc-timeseries-grid-val").attr("value");
		
	}
	return chart;
}
function collectUCScenarioComponents(template) {
	var editSceMaterial = $(".uc-editSceMaterial");
	var scenarios = {};
	template.children(".uc_t_box").each( function(index, element) {
		var stype = $(element).attr("sType");
		var sid = $(element).attr("scenarioId");
		var componentsEditPanel = editSceMaterial.find("div[class^='uc-editSceMaterial-spec-'][scenarioId='"+sid+"']");
		var scenario = {};
		scenario["type"] = stype;
		scenario["component"] = {};
		
		if( componentsEditPanel.length > 0 ) {
			if( stype.toUpperCase() === "CORPUSCOLLECT" ) {
				//scenario["component"] = {};
				componentsEditPanel.children(".uc-editSceMaterial-corpus-p").each( function(index, element){
					var page = {};
					var rowlist = {};
					$(element).find("#uc_corpus_item_def_table").find(".uc-input-block-table-row-binded").each( function(index, element){
						var bindedItemId = $(element).attr("bindingitemid");
						var row={};
						row["bindedItemId"] = bindedItemId;
						if( $(element).hasClass("uc-input-block-table-row-extract") )
							row["isExtracted"] = true;
						rowlist["row"+index] = row;
					});
					page["rows"] = rowlist;
					pattr = $(element).children(".uc-editSceMaterial-corpus-p-attr");
					
					page["width"] = StringUtil.isEmpty(pattr.find("#pageWidth-val").val())?"auto":( pattr.find("#pageWidth-val").val() + "%");
					page["height"] = StringUtil.isEmpty(pattr.find("#pageHeight-val").val())?"100%":( pattr.find("#pageHeight-val").val() + "%");
					scenario["component"]["pages"+index] = page;
				});
			} else if( stype.toUpperCase() === "BANNER" ) {
				var banner = componentsEditPanel.find(".uc-editSceMaterial-spec-banner-type");
				var selBanner = banner.find(".uc-bg-image-sel");
				var bannerType = selBanner.attr("btype");
				var comp = collectBannerInfo(componentsEditPanel, bannerType);
				scenario["component"] = comp;
				
				
			}  else if( stype.toUpperCase() === "TIMESERIES" ) {
				var charts = componentsEditPanel.find(".uc-editSceMaterial-spec-ts-charts");
				var selChart = charts.find(".uc-bg-image-sel");
				var chartType = selChart.attr("ctype");
				var comp = collectTimeseriesChartInfo(componentsEditPanel, chartType);
				scenario["component"] = comp;
				
			}  else if( stype.toUpperCase() === "REFRESHBLOCK" ) {
				var subscribe = {};
				var  valueInfo = componentsEditPanel.find(".value-info");
				var  listInfo = componentsEditPanel.find(".list-info");
				
				subscribe["binding"] = valueInfo.find( ".uc-input-block-table-row[itemId]").attr("bindingitemid");
				subscribe["limit"] = listInfo.find( "#uc-spec-subscribe-limit-val").val();
				subscribe["keyWords"] = listInfo.find( "#uc-spec-subscribe-catch-val").val();
				scenario["component"] = subscribe;
			} 
		}
		scenarios[sid] = scenario;
	} );
	return scenarios;
}

function collectAndSubmit(target) {
	var submitbox = $(target).parents(".uc_submit_box");
	var container = $(".uc-canvas-container");
	var scenarioTemplates = container.find(".uc_t_box");
	
	//var scenario = container.children(".uc_t_box");
	//var scenario = editable_template["scenarios"];
	var datas={};
	var template = templateInstance.newTemplate();
	console.log("Template: ");
	console.log(template);
	var oMaterial = collectMaterial( template["id"]);
	console.log("Material: ");
	console.log(oMaterial);
	
	
	if( scenarioTemplates.length > 0 ) {
		var oScenarios = {};
		var scenarios={};
		for(var i=0;i<scenarioTemplates.length;i++){
			var scenario = templateInstance.newScenario($(scenarioTemplates[i]));//{};
			var scenarioId = $(scenarioTemplates[i]).attr("scenarioId");
			//console.log("Save scenario: " + type +", position: ("+ x +","+ y + "), rect: " + w +"x"+ h);
			//console.log("Save scenario: " + type +", position: ("+ parseFloat(x/container.width()) +","+ parseFloat(y/container.height()) + "), rect: " + parseFloat(w/container.width()) +"x"+ parseFloat(h/container.height()));
			//scenarios.push(scenario);
			scenarios[scenarioId]=scenario;
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
		
		//template["scenarios"] = scenarios;
		oScenarios["templateId"] =  template["id"];
		oScenarios["scenarios"] = scenarios;
		console.log("Scenarios: ");
		console.log(oScenarios);
		//console.log(JSON.stringify(template));
		//request("post", "/datacenter/", template, callback)
		var oComponents = {};
		var components = collectUCScenarioComponents($(".uc-canvas-container"));
		oComponents["templateId"] =  template["id"];
		oComponents["scenarios"] = components;
		console.log("Scenario binding components: ");
		console.log(oComponents);
		
	}
}
//var editable_template = templateInstance.newTemplate();