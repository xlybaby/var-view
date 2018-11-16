var Corpus = (function ($) {
	
	var pub = {
		expand: function(event){
			
		},
		load: function(scenarioId, offset, limit, level, pData){
			if(!pData) {
				var l = 1;
				if(level) l = level;
				
				 exchange("datacenter", "authorized/uc/s/data", {"scenarioId":scenarioId,"offset":offset,"limit":limit,"level":l}, function(data){
					console.log("Corpus scenario fetch data:");
					console.log(data);
				});
			} else {
				//draw data
			}
				
			
		},
		draw: function(scenario){
			var scenarioId = scenario["scenarioId"];
			console.log(scenario);
			var bg = $(".demo_bg");
			var position = scenario["position"];
			var conf = scenario["configuration"];
			var layout = conf["layout"];
			var sBgcolor = layout["backgroundColor"];
			var sFgcolor = layout["foregroundColor"];
			var sPaddingTop = layout["paddingTop"];
			var sPaddingRight = layout["paddingRight"];
			var sPaddingLeft = layout["paddingLeft"];
			var sPaddingBottom = layout["paddingBottom"];
			var sBorderTop = layout["borderTop"];
			var sBorderLeft = layout["borderLeft"];
			var sBorderRight = layout["borderRight"];
			var sBorderBottom = layout["borderBottom"];
			var sBorderRadius = layout["borderRadius"];
			var sBorderShadow = layout["borderShadow"];
			
			var comp = $('<div class="wrapper_corpus" scenarioId="'+scenarioId+'">'+
										'<div class="comp_corpus">'+
											'<div class="corpus_head"></div>'+
											'<div class="corpus_body">'+
												
											'</div>'+
											'<div class="corpus_foot">'+
												'<div class="corpus_foot_zoom">'+
													'<button class="corpus_foot_zoom_in"><div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:15px;color: #000;">+</div></button>&nbsp;&nbsp;'+
													'<button class="corpus_foot_zoom_out"><div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:15px;color: #000;">-</div></button>&nbsp;&nbsp;'+
												'</div>'+
												'<div class="corpus_foot_pagination" style="display: none;"></div>'+
											'</div>'+
									'</div>'+
								'</div>');
			comp.css("width", (position["width"]*100)+"%");
			comp.css("height", (position["height"]*100)+"%");
			comp.css("left", (position["x"]*100)+"%");
			comp.css("top", (position["y"]*100)+"%");
			
			comp.css("backgroundColor",sBgcolor);
			
			comp.css("paddingTop", sPaddingTop);
			comp.css("paddingLeft", sPaddingLeft);
			comp.css("paddingRight", sPaddingRight);
			comp.css("paddingBottom", sPaddingBottom);
			
			comp.css("borderTop", sBorderTop);
			comp.css("borderLeft", sBorderLeft);
			comp.css("borderRight", sBorderRight);
			comp.css("borderBottom", sBorderBottom);
			
			comp.css("boxShadow", sBorderShadow);
			
			var corpus = comp.children(".comp_corpus");
			corpus.css("backgroundColor", sFgcolor);
			
			bg.append(comp);
		}
    	
    } 
    return pub;    
})(window.jQuery);

var Ranklist = (function ($) {
	
	var pub = {
		load: function(scenarioId, data){
			if(data) {
				
			}
		},
		draw: function(scenario){
			
		}
    	
    } 
    return pub;    
})(window.jQuery);

var Subscribe = (function ($) {
	
	var pub = {
		load: function(scenarioId, data){
			if(data) {
				
			}
		},
		draw: function(scenario){
			
		}
    	
    } 
    return pub;    
})(window.jQuery);

var Timeseries = (function ($) {
	
	var pub = {
		load: function(scenarioId, data){
			if(data) {
				
			}
		},
		draw: function(scenario){
			
		}
    	
    } 
    return pub;    
})(window.jQuery);

var Banner = (function ($) {
	
	var pub = {
		load: function(scenarioId, data){
			if(data) {
				
			}
		},
		draw: function(scenario){
			
		}
    	
    } 
    return pub;    
})(window.jQuery);

var DrawComponent = (function ($) {
	
	var pub = {
		drawRanklist: function (scenario) {
			//draw
			Ranklist.draw(scenario);
			
	        	//load
	        	setTimeout( Ranklist.load(scenario["scenarioId"]), 500 );
        },
        
        drawSubscribe: function (scenario) {
	        	//draw
        		Subscribe.draw(scenario);
	        	
	        	//load
	        	setTimeout( Subscribe.load(scenario["scenarioId"]), 500 );
        },
        
        drawTimeseries: function (scenario) {
	        	//draw
        		Timeseries.draw(scenario);
	        	
	        	//load
	        	setTimeout( Timeseries.load(scenario["scenarioId"]), 500 );
        },
        
        drawBanner: function (scenario) {
	        	//draw
        		Banner.draw(scenario);
	        	
	        	//load
	        	setTimeout( Banner.load(scenario["scenarioId"]), 500 );
        },
        
        drawCorpus: function (scenario) {
	        	//draw
	        	Corpus.draw(scenario);
	        	
	        	//load
	        	setTimeout( Corpus.load(scenario["scenarioId"], 0, 0), 500 );
        }
    	
    } 
    return pub;    
})(window.jQuery);

var PopulateTemplate = (function ($) {
	
	var pub = {
		populate: function (template) {
            var scenarios = template["scenarios"];
            for(var i=0;i<scenarios.length;i++) {
            	var scenario = scenarios[i];
            	var scenarioType = parseInt(scenario["scenarioType"]);
            	switch(scenarioType){
            	case 1:
            		DrawComponent.drawBanner(scenario);
            		break;
            	case 2:
            		DrawComponent.drawSubscribe(scenario);
            		break;
            	case 3:
            		DrawComponent.drawRanklist(scenario);
            		break;
            	case 4:
            		DrawComponent.drawTimeseries(scenario);
            		break;
            	case 5:
            		DrawComponent.drawCorpus(scenario);
            		break;
            	default:
            		break;
            	}
            }
        }
    } 
    return pub;    
})(window.jQuery);

$(document).ready(function(){ 
	mainInit();
	//get parameter: template_id
	var tid = getUrlParam('tid');
	if( !StringUtil.isEmpty() ){
	//invoke api getting template
		var params={};
		params["templateID"] = tid;
		var callback = function(data){
			var template = data["template"];
			//starts drawing
			PopulateTemplate.populate(template);
			//ends drawing
		};
		//request("post", "/datacenter/", data, callback);
	
	}
	
	//test 
	var templateTest = {"title":"test020","keywords":"","shareTemplate":true,"shareContent":true,"scenarios":[{"position":{"x":0.3,"y":0.73,"width":0.65,"height":0.22},"scenarioId":"uc_sce__bf6be19f-59fe-7958-57ac-fe4c5f83f505","scenarioType":"5","scenarioTypeName":"CORPUSCOLLECT","href":"http://drugs.dxy.cn/","configuration":{"automation":0,"maxDuration":7200,"maxThreadNum":1,"layout":{"backgroundColor":"#ffffff","foregroundColor":"#ffffff","borderTop":"0px solid #ffffff","borderRight":"0px solid #ffffff","borderBottom":"0px solid #ffffff","borderLeft":"0px solid #ffffff","borderRadius":"0px","paddingTop":"0px","paddingLeft":"0px","paddingBottom":"0px","paddingRight":"0px"},"schedule":{"interval":3600,"unit":"SECONDS"}},"actors":{"pages":[{"pageId":"uc_sce__bf6be19f-59fe-7958-57ac-fe4c5f83f505_page0","no":0,"pageComponent":{"containers":{"selector":{"tag":"div","id":"common_main"},"iterators":{"selector":{"tag":"li"},"items":{"label":{"name":"itemVal"},"value":{"selector":{"tag":"a","index":"1"}},"link":0,"extract":0,"img":0}}},"pagination":{}}}],"properties":{}}}]};
	PopulateTemplate.populate(templateTest);
});