var Corpus = (function ($) {
	
	var pub = {
		addNavListener: function(item) {
			item.on({
				click: function(event) {
					event.stopPropagation(); 
					var clicktag = event.target.tagName;
					if(clicktag.toLowerCase()==="span")
						var target = $(event.target).parent("a");
					else if(clicktag.toLowerCase()==="a")
						var target = $(event.target);
					else
						return false;
					var wrapper = target.parents(".wrapper_corpus");
					var header = target.parent(".corpus_head");
					var nextNav = target.nextAll();
					if( nextNav.length == 0 )
						return;
					for(var i=0;i<nextNav.length;i++){
						$(nextNav[i]).remove();
					}
					var level = parseInt(target.attr("level"));
					Corpus.load(wrapper.attr("scenarioId"),0,0,level);
				},
				mouseover: function(event) {
					event.target.style.cursor="pointer";
				}
			});
		},
		addItemListener: function(item) {
			item.on({
				click: function(event){
					event.stopPropagation(); 
					var clicktag = event.target.tagName;
					if(clicktag.toLowerCase()==="span")
						var target = $(event.target).parent("div");
					else if(clicktag.toLowerCase()==="div")
						var target = $(event.target);
					else
						return false;
					
					var wrapper = target.parents(".wrapper_corpus");
					var level = parseInt(target.attr("level"));
					var parentId = target.attr("id");
					Corpus.load(wrapper.attr("scenarioId"),0,0,parentId,level+1);
					
					var head = wrapper.children(".comp_corpus").children(".corpus_head");
					head.css("display","flex");
					if( head.children().length > 0 )
						head.append($("<span>&nbsp;>&nbsp;</span>"));
					var navItem = $("<a level='"+level+"'>"+target.text()+"</a>");
					Corpus.addNavListener(navItem);
					head.append(navItem);
				},
				mouseover: function(event){
					event.target.style.cursor="pointer";
				}
			});
		},
		expand: function(event){
			
		},
		load: function(scenarioId, offset, limit, parentId, level, pData){
			if(!pData) {
				var l = 1;
				if(level) l = level;
				
				 exchange("datacenter", "authorized/uc/s/data/corpus", {"scenarioId":scenarioId,"offset":offset,"limit":limit,"level":l, "parentId":parentId}, function(data){
					//console.log("Corpus scenario fetch data:");
					//console.log(JSON.parse(data));
					
					var corpus = $(".wrapper_corpus[scenarioId='"+scenarioId+"']");	
					var corpusBody  = corpus.children(".comp_corpus").children(".corpus_body");
					corpusBody.empty();
					
					if( !data ) return false;
					var items = JSON.parse(data);
					if(items.length>0) {
						for(var i=0; i<items.length; i++) {
							var item = items[i];
							var key="";
							var value="";
							if(item["key"])
								key=item["key"]+': ';
							if(item["value"])
								value=item["value"];
							var oItem = $('<div class="corpus_item" expand="cascade" id="'+item["id"]+'" level="'+item["level"]+'"><span class="corpus_item_label">'+key+value+'</span></div>');
							corpusBody.append(oItem);
							Corpus.addItemListener(oItem);
						}
					}
					
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
	        	setTimeout( Corpus.load(scenario["scenarioId"], 0, 0, "root"), 500 );
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