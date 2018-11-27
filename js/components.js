var Corpus = (function ($) {
	
	var pub = {
		addZoomInOutListener: function(obj){
			obj.on({
				click: function(event) {
					event.stopPropagation(); 
					var clicktag = event.target.tagName;
					if(clicktag.toLowerCase()==="div")
						var target = $(event.target).parent("button");
					else if(clicktag.toLowerCase()==="button")
						var target = $(event.target);
					else
						return false;
					
					var foot =  target.parents(".corpus_foot");
					var corpusbody = foot.siblings(".corpus_body");
					var elements = corpusbody.children(":not(#addMore)");
					if( target.hasClass("corpus_foot_zoom_in") ) {
						if( (elements.width() + elements.width()*0.5) < corpusbody.width() * 0.5 ) {
							elements.css("width", (elements.width() + elements.width()*0.5) + "px");
						}
					} else if( target.hasClass("corpus_foot_zoom_out") ) {
						var width = parseInt(elements.css("width"));
						if( (elements.width() - elements.width()*0.5) >= corpusbody.width() * 0.05 ) {
							elements.css("width", (elements.width() - elements.width()*0.5) + "px");
						}
					}
				}
			});
			
		},
		addMoreListener: function(obj) {
			obj.on({
				click: function(event) {
					event.stopPropagation(); 
					var clicktag = event.target.tagName;
					if(clicktag.toLowerCase()==="span")
						var target = $(event.target).parent("div");
					else if(clicktag.toLowerCase()==="div")
						var target = $(event.target);
					else
						return false;
					
					var curOffset = target.attr("offset");
					var curLimit = target.attr("limit");
					var wrapper = target.parents(".wrapper_corpus");
					Corpus.load(wrapper.attr("scenarioId"),curOffset+curLimit,curLimit,parentId);
					
				}, 
				mouseover: function(event) {
					event.target.style.cursor="pointer";
				}
			});
		},
		addBodyScrollListener: function(body) {
			body.scroll(function (event) {
				var target = $(event.target);
				console.log(target);
                var addMore = body.children("#addMore").offset().top;
                console.log(a);
                console.log(body.scrollTop());
                console.log(body.height());
                if (addMore >= body.scrollTop() && addMore < (body.scrollTop() + body.height())) {
                    console.log("addMore在可视范围");
                }
            });
		},
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
					var parentId = target.attr("id");
					
					var nextNav = target.nextAll();
					if( nextNav.length == 0 )
						return;
					for(var i=0;i<nextNav.length;i++){
						$(nextNav[i]).remove();
					}
					Corpus.load(wrapper.attr("scenarioId"),0,10,parentId);
					var head = target.parent(".corpus_head");
					if( target.attr("id").toLowerCase()==="root" ){
						head.animate({ height:"0px"}, 500,"linear");
					}
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
					var parentId = target.attr("id");
					Corpus.load(wrapper.attr("scenarioId"),0,10,parentId);
					
					var head = wrapper.children(".comp_corpus").children(".corpus_head");
					if( head.height() == 0 ){
						head.animate({ height:"35px"}, 500,"linear");
					}
					
					if( head.children().length > 0 )
						head.append($("<span>&nbsp;>&nbsp;</span>"));
					var navItem = $("<a id='"+target.attr("id")+"'>"+target.text()+"</a>");
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
		load: function(scenarioId, offset, limit, parentId, pData){
			if(!pData) {
				var corpus = $(".wrapper_corpus[scenarioId='"+scenarioId+"']");	
				var corpusBody  = corpus.children(".comp_corpus").children(".corpus_body");
				var addMore = corpusBody.children("#addMore");
				//corpusBody.empty();
				var elements = corpusBody.children(":not(#addMore)");
				if(elements.length>0)
					elements.remove();
				
				 exchange("datacenter", "authorized/uc/s/data/corpus", {"scenarioId":scenarioId,"offset":offset,"limit":limit, "parentId":parentId}, function(data){	
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
							var oItem = $('<div class="corpus_item" expand="cascade" id="'+item["id"]+'"><span class="corpus_item_label" title="'+value+'">'+key+value+'</span></div>');
							//corpusBody.append(oItem);
							addMore.before(oItem);
							Corpus.addItemListener(oItem);
						}
						addMore.attr( "offset", offset );
						addMore.attr( "limit", limit );
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
											'<div class="corpus_head">'+
												'<a id="root" style="cursor: pointer;">Home</a>'+
										    '</div>'+
											'<div class="corpus_body">'+
											 '<div id="addMore" class="corpus_item"><span class="corpus_item_label">+</span></div>'+
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
			var homeNav = corpus.children(".corpus_head").children("#root");
			var addMore =  corpus.children(".corpus_body").children("#addMore");
			Corpus.addNavListener(homeNav);
			//Corpus.addBodyScrollListener(addMore);
			Corpus.addZoomInOutListener(corpus.children(".corpus_foot").children(".corpus_foot_zoom").children(".corpus_foot_zoom_in"));
			Corpus.addZoomInOutListener(corpus.children(".corpus_foot").children(".corpus_foot_zoom").children(".corpus_foot_zoom_out"));

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
		load: function(scenarioId, pdata){
			var data = pdata;
			if(!data) {
				
			}
			var subscribe = $(".wrapper_subscribe[scenarioId='"+scenarioId+"']");
			if( subscribe.length > 0 ) {
				var body = subscribe.children(".comp_subscribe").children(".subscribe_body");
				for( var i = 0; i < data.length; i++ ) {
					var isnew = data[i]["isNew"];
					if( isnew ) {
						var item = $('<div class="subscribe_item" sign-id="" style="left: 100%;">'+
								'	<div class="subscribe_new_left">'+
								'	<span class="subscribe_label" title="'+data[i]["subject"]+'"><a>'+data[i]["subject"]+'</a></span>'+
								'</div>'+
								'<div class="subscribe_new_right">'+
									
								'</div>'+
							'</div>');
						body.append(item);
					} else {
						var item = $('<div class="subscribe_item" sign-id="" style="left: 100%;">'+
								'	<span class="subscribe_label" title="'+data[i]["subject"]+'"><a>'+data[i]["subject"]+'</a></span>'+
						'</div>');
						body.append(item);
					}
					item.delay(i*350).animate({ left: "0px"}, 400,"linear");
				}
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
			
			var comp = $('<div class="wrapper_subscribe" scenarioId="test-subscribe-001">'+
											'<div class="comp_subscribe">'+
											'<div class="subscribe_body" list-size="">'+			
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
			
			bg.append(comp);
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
		addNavClickListener: function(nav) {
			nav.on({
				click: function(event){
					var target = $(event.target);
					if(target.attr("clicked") === "clicked")
						return false;
					
					var footer = target.parent(".banner_footer");
					var body = footer.siblings(".banner_body");
					var clicked = footer.children(".banner_nav[clicked='clicked']");
					clicked.attr("clicked","");
					clicked.css("width","18px");
					clicked.css("height","18px");
					
					target.attr("clicked","clicked");
					target.css("width","22px");
					target.css("height","22px");
					
					var index = target.index();
					var img = body.children(".banner_bg:eq("+index+")");
					var lastimg = body.children(".banner_bg[display='display']");
					if( lastimg.length > 0 ) {
						lastimg.attr("display","");
						//lastimg.animate({ opacity:0, filter:"alpha(opacity=0)"}, 400,"linear");
						lastimg.fadeOut(400);
					}
					img.attr("display","display");
					//img.animate({ { opacity:100, filter:"alpha(opacity=100)"}}, 400,"linear");
					img.fadeIn(400);
				},
				mouseover: function(event){
					event.target.style.cursor="pointer";
				}
			});
		},
		populateNavigation: function(scenarioId) {
			var banner = $(".wrapper_banner[scenarioId='"+scenarioId+"']");
			var body = banner.children(".comp_banner").children(".banner_body");
			var footer = banner.children(".comp_banner").children(".banner_footer");
			var bgs = body.children(".banner_bg");
			for(var i=0; i<bgs.length; i++) {
				var nav = $('<div class="banner_nav" style="background-color: rgb(1.0);"></div>');
				footer.append(nav);
				Banner.addNavClickListener(nav);
			}
			var loop = setInterval(function(scenarioId){
				var banner = $(".wrapper_banner[scenarioId='"+scenarioId+"']");
				var footer = banner.children(".comp_banner").children(".banner_footer");
				var clickedNav =  footer.children(".banner_nav[clicked='clicked']");
				var next;
				if(clickedNav.length>0){
					next = clickedNav.next(".banner_nav");
				} 
				if( !next || next.length ==0 ) {
					next = footer.children(".banner_nav:eq(0)");
				} 
				next.trigger("click");
				
			}, 2000);
		},
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
	        	setTimeout( Corpus.load(scenario["scenarioId"], 0, 10, "root"), 500 );
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
	var templateTest = {"title":"test020","keywords":"","shareTemplate":true,"shareContent":true,"scenarios":[{"position":{"x":0.3,"y":0.73,"width":0.65,"height":0.22},"scenarioId":"uc_sce__bf6be19f-59fe-7958-57ac-fe4c5f83f505","scenarioType":"5","scenarioTypeName":"CORPUSCOLLECT","href":"http://drugs.dxy.cn/","configuration":{"automation":0,"maxDuration":7200,"maxThreadNum":1,"layout":{"backgroundColor":"#ffffff","foregroundColor":"#ffffff","borderTop":"0px solid #ffffff","borderRight":"0px solid #ffffff","borderBottom":"0px solid #ffffff","borderLeft":"0px solid #ffffff","borderRadius":"0px","paddingTop":"0px","paddingLeft":"0px","paddingBottom":"0px","paddingRight":"0px"},"schedule":{"interval":3600,"unit":"SECONDS"}},"actors":{"pages":[{"pageId":"uc_sce__bf6be19f-59fe-7958-57ac-fe4c5f83f505_page0","no":0,"pageComponent":{"containers":{"selector":{"tag":"div","id":"common_main"},"iterators":{"selector":{"tag":"li"},"items":{"label":{"name":"itemVal"},"value":{"selector":{"tag":"a","index":"1"}},"link":0,"extract":0,"img":0}}},"pagination":{}}}],"properties":{}}},{"position":{"x":0.05,"y":0.5,"width":0.2,"height":0.45},"scenarioId":"uc_sce__bf6be19f-59fe-7958-57ac-fe4c45jf8505","scenarioType":"2","scenarioTypeName":"REFRESHBLOCK","href":"https://www.libaclub.com/","configuration":{"automation":0,"maxDuration":7200,"maxThreadNum":1,"layout":{"backgroundColor":"#ffffff","foregroundColor":"#ffffff","borderTop":"0px solid #ffffff","borderRight":"0px solid #ffffff","borderBottom":"0px solid #ffffff","borderLeft":"0px solid #ffffff","borderRadius":"0px","paddingTop":"0px","paddingLeft":"0px","paddingBottom":"0px","paddingRight":"0px"},"schedule":{"interval":3600,"unit":"SECONDS"}},"actors":{"pages":[{"pageId":"uc_sce__bf6be19f-59fe-7958-57ac-fe4c45jf8505_page0","no":0,"pageComponent":{"containers":{"selector":{"tag":"ul","clazz":"ui-list"},"iterators":{"selector":{"xpath":"//li[@class='ui-list-item']/div[@class='ui-list-item-title']"},"items":{"label":{"name":"subject"},"value":{"selector":{"tag":"a","index":"2"}},"link":1,"extract":0,"img":0}}},"pagination":{}}}],"properties":{"listSize": 10}}}]};
	PopulateTemplate.populate(templateTest);
	
	var testsub = [{"subject":"昨晚收到请帖，八年抗战的小情侣还是被丈母娘拆散了，寒门难出贵子", "isNew":true, "href":"https://www.libaclub.com/t_13_10154528_1.htm"},
		{"subject":"听说某三也混篱笆，那你知道男人住的所谓的豪宅是女方家买的女方家名字吗？", "isNew":true, "href":"https://www.libaclub.com/t_13_10154805_1.htm"},
		{"subject":"大班英语读什么，请各位指点一下", "isNew":false, "href":"https://www.libaclub.com/t_302_9841909_1.htm"},
		{"subject":"现在的阿姨真的看不懂， 吃顿饭气死人", "isNew":false, "href":"https://www.libaclub.com/t_13_10149659_1.htm"},
		{"subject":"单位里刚进来的小姑娘，开了一辆100多万的豪车上下班，一个月也就赚6000多元", "isNew":false, "href":"https://www.libaclub.com/t_13_10154334_1.htm"},
		{"subject":"共青森林公园被盗", "isNew":false, "href":"https://www.libaclub.com/t_13_10153773_1.htm"},
		{"subject":"朋友，婚后的你幸福吗？", "isNew":false, "href":"https://www.libaclub.com/t_49_7395685_1.htm"},
		{"subject":"图中阳台上的空调管如何遮挡，求教各路大神", "isNew":false, "href":"https://www.libaclub.com/t_4_10024694_1.htm"},
		{"subject":"流感疫苗来了，有人带娃去打了吗？华兰生物疫苗有限公司的", "isNew":false, "href":"https://www.libaclub.com/t_13_10154718_1.htm"},
		];
	//Subscribe.load("test-subscribe-001", testsub);
	//$('.comp_banner').bxSlider({
	//   mode: 'fade',
	//    captions: true
	//  });
	
});