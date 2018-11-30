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
		load: function(scenarioId, pdata){
			var data = pdata;
			if(!data) {
				//retrieve data from backend
			}
			var body = $(".wrapper_ranklist[scenarioId='"+scenarioId+"']").children(".comp_ranklist").children(".ranklist_body");
			var ranklist = echarts.init(body[0]);
			
			var dataProduct1=[[4.50,30,5]];
			var dataProduct2=[[4.45,270,5]];
			var dataProduct3=[[4.40,90,5]];
			var dataProduct4=[[4.30,63,5]];
			var dataProduct5=[[4.30,14,5]];
			var dataProduct6=[[4.25,60,5]];
			var dataProduct7=[[4.20,7,5]];
			var dataProduct8=[[4.15,30,5]];
			var dataProduct9=[[4.35,60,20]];
			var dataProduct10=[[4.25,30,20]];
			
			
			var schema = [
			    {name: 'rate', index: 0, text: '收益率'},
			    {name: 'investment', index: 1, text: '期限'},
			    {name: 'purchase ', index: 2, text: '起购额'}
			];

			var lineStyle = {
			    normal: {
			        width: 1,
			        opacity: 0.5
			    }
			};

			option = {
			    //backgroundColor: '#333',
			    legend: {
			    	type: 'scroll',
			        bottom: 30,
			        data: ['月成长（净值型）2014年1期', '和盈滚滚添利270天', '和盈滚滚添利90天','和盈63天','双周成长（净值型）2015年1期','和盈滚滚添利60天','周成长（净值型）','和盈滚滚添利30天','智慧滚滚添利60天','智慧滚滚添利30天'],
			        itemGap: 10,
			        textStyle: {
			            color: '#333',
			            fontSize: 10
			        }
			    },
//			    tooltip: {
//			        padding: 10,
//			        backgroundColor: '#222',
//			        borderColor: '#777',
//			        borderWidth: 1,
//			        formatter: function (obj) {
//			            var value = obj[0].value;
//			            return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
//			                + obj[0].seriesName + ' ' + value[0] + '日期：'
//			                + value[7]
//			                + '</div>'
//			                + schema[1].text + '：' + value[1] + '<br>'
//			                + schema[2].text + '：' + value[2] + '<br>'
//			                + schema[3].text + '：' + value[3] + '<br>'
//			                + schema[4].text + '：' + value[4] + '<br>'
//			                + schema[5].text + '：' + value[5] + '<br>'
//			                + schema[6].text + '：' + value[6] + '<br>';
//			        }
//			    },
			    // dataZoom: {
			    //     show: true,
			    //     orient: 'vertical',
			    //     parallelAxisIndex: [0]
			    // },
			    parallelAxis: [
			        {dim: 0, name: schema[0].text},
			        {dim: 1, name: schema[1].text},
			        {dim: 2, name: schema[2].text}
			    ],
			    visualMap: {
			        show: true,
			        min: 0,
			        max: 6,
			        dimension: 0,
			        inRange: {
			            color: ['#d94e5d','#eac736','#50a3ba'].reverse(),
			            // colorAlpha: [0, 1]
			        }
			    },
			    parallel: {
			        left: '5%',
			        right: '18%',
			        //bottom: 100,
			        parallelAxisDefault: {
			            type: 'value',
			            name: 'Pingan Product',
			            nameLocation: 'end',
			            nameGap: 20,
			            nameTextStyle: {
			                color: '#333',
			                fontSize: 12
			            },
			            axisLine: {
			                lineStyle: {
			                    color: '#aaa'
			                }
			            },
			            axisTick: {
			                lineStyle: {
			                    color: '#777'
			                }
			            },
			            splitLine: {
			                show: false
			            },
			            axisLabel: {
			                textStyle: {
			                    color: '#333'
			                }
			            }
			        }
			    },
			    series: [
			        {
			            name: '月成长（净值型）2014年1期',
			            type: 'parallel',
			            lineStyle: lineStyle,
			            data: dataProduct1
			        },
			        {
			            name: '和盈滚滚添利270天',
			            type: 'parallel',
			            lineStyle: lineStyle,
			            data: dataProduct2
			        },
			        {
			            name:  '和盈滚滚添利90天',
			            type: 'parallel',
			            lineStyle: lineStyle,
			            data: dataProduct3
			        },
			        {
			            name: '和盈63天',
			            type: 'parallel',
			            lineStyle: lineStyle,
			            data: dataProduct4
			        },
			        {
			            name: '双周成长（净值型）2015年1期',
			            type: 'parallel',
			            lineStyle: lineStyle,
			            data: dataProduct5
			        },
			        {
			            name: '和盈滚滚添利60天',
			            type: 'parallel',
			            lineStyle: lineStyle,
			            data: dataProduct6
			        },
			        {
			            name: '周成长（净值型）',
			            type: 'parallel',
			            lineStyle: lineStyle,
			            data: dataProduct7
			        },
			        {
			            name: '和盈滚滚添利30天',
			            type: 'parallel',
			            lineStyle: lineStyle,
			            data: dataProduct8
			        },
			        {
			            name: '智慧滚滚添利60天',
			            type: 'parallel',
			            lineStyle: lineStyle,
			            data: dataProduct9
			        },
			        {
			            name: '智慧滚滚添利30天',
			            type: 'parallel',
			            lineStyle: lineStyle,
			            data: dataProduct10
			        }
			    ]
			};
			ranklist.setOption(option);
			
		},
		draw: function(scenario){
			var scenarioId = scenario["scenarioId"];
			
		}
    	
    } 
    return pub;    
})(window.jQuery);

var Subscribe = (function ($) {
	
	var pub = {
		addFooterMouseover: function(footer) {
			footer.on({
				mouseover: function(event) {
					event.stopPropagation(); 
					console.log("footer on mouseover");
					var target = $(event.target);
					var body = target.siblings(".subscribe_body");
					var items = body.children(".subscribe_item");
					var bodyHeight = body.height();
					var allheight = items.outerHeight(true) * items.length;
					console.log("footer move top: "+(bodyHeight-allheight)+"px");
					body.animate({ top: (bodyHeight-allheight)+"px"}, 2000,"linear");
				},
				mouseout: function(event) {
					event.stopPropagation(); 
					var target = $(event.target);
					target.hide();
				}
			})
		},
		addCompMouseover: function(comp) {
			comp.on({
				mousemove: function(event) {
					//event.stopPropagation(); 
					var target = $(event.target);
					if( target.hasClass("subscribe_footer") ) {
						event.stopPropagation(); 
						return false;
					}
						
					if( !target.hasClass("comp_subscribe") ){
						event.stopPropagation(); 
						target =  $(event.target).parents(".comp_subscribe");
					}

					var compHeight = target.height();
					var body = target.children(".subscribe_body");
					var bodyHeight = body.height();
					var bodyoffsetHeight = bodyHeight+Math.abs(body.position().top);
					//var offsetX = event.clientX - target.offset().left;
					var offsetY = event.clientY - target.offset().top;
					//console.log(offsetX,offsetY);
					if( (compHeight-offsetY) < 7 ) {
						//console.log("body goes down");
						var items = body.children(".subscribe_item");
						var allheight = items.outerHeight(true) * items.length;
						//console.log("all items' height: " + allheight);
						//console.log("body Height: " + bodyHeight);
						if( allheight > bodyoffsetHeight ) {
							var footer = body.siblings(".subscribe_footer");
							footer.css("top", (compHeight-footer.height())+"px");
							footer.show();
						} else {
							console.log("body already goes down");
						}
					}
					
				}
			});
		},	
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
						var item = $('<div class="subscribe_item bounce animated faster" sign-id="" style="-webkit-animation-delay: '+(i*0.1)+'s; animation-delay: '+(i*0.1)+'s;">'+
								'	<div class="subscribe_new_left">'+
								'	<span class="subscribe_label" title="'+data[i]["subject"]+'"><a>'+data[i]["subject"]+'</a></span>'+
								'</div>'+
								'<div class="subscribe_new_right">'+
									
								'</div>'+
							'</div>');
						body.append(item);
					} else {
						var item = $('<div class="subscribe_item bounce animated faster" sign-id="" style="-webkit-animation-delay: '+(i*0.1)+'s; animation-delay: '+(i*0.1)+'s;">'+
								'	<span class="subscribe_label" title="'+data[i]["subject"]+'"><a>'+data[i]["subject"]+'</a></span>'+
						'</div>');
						body.append(item);
					}
					//item.delay(i*350).animate({ left: "0px"}, 400,"linear");
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
											'<div class="subscribe_footer">'+			
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
			
			var compsub = comp.children(".comp_subscribe");
			Subscribe.addCompMouseover(compsub);
			
			var footer = comp.children(".comp_subscribe").children(".subscribe_footer");
			Subscribe.addFooterMouseover(footer);
		}
    	
    } 
    return pub;    
})(window.jQuery);

var Timeseries = (function ($) {
	
	var pub = {
		load: function(scenarioId, pdata){
			var data = pdata;
			if(!data) {
				//retrieve data from backend
			}
			var body = $(".wrapper_timeseries[scenarioId='"+scenarioId+"']").children(".comp_timeseries").children(".timeseries_body");
			var timeseries = echarts.init(body[0]);
			
			var dateList = data.map(function (item) {
			    return item[0];
			});
			var valueList = data.map(function (item) {
			    return item[1];
			});

			option = {

			    // Make gradient line here
			    visualMap: [{
			        show: false,
			        type: 'continuous',
			        seriesIndex: 0,
			        min: 0,
			        max: 35
			    }],


			    title: [{
			        left: 'center',
			        text: '华夏幸福(600340)'
			    }],
			    tooltip: {
			        trigger: 'axis'
			    },
			    xAxis: [{
			        data: dateList
			    }],
			    yAxis: [{
			    	min: 25,
			    	max: 26,
			        splitLine: {show: false}
			    }],
			    grid: [{
			        bottom: '20%',
			        left: '10%'
			    }],
			    series: [{
			        type: 'line',
			        showSymbol: false,
			        data: valueList
			    }]
			};
			
			timeseries.setOption(option);
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
						//lastimg.fadeOut(700);
						//lastimg.hide(1000);
						lastimg.removeClass("fadeIn animated");
						lastimg.addClass("fadeOut animated");
					}
					img.attr("display","display");
					img.removeClass("fadeOut animated");
					img.addClass("fadeIn animated");
					//img.animate({ opacity:100, filter:"alpha(opacity=100)"}, 400,"linear");
					//img.fadeIn(700);
					//img.show(1000);
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
				var nav = $('<div class="banner_nav" style="background-color: rgb('+randomize(1, 255)+','+randomize(1, 255)+','+randomize(1, 255)+',1.0);"></div>');
				footer.append(nav);
				Banner.addNavClickListener(nav);
			}
			var first = footer.children(".banner_nav:eq(0)");
			first.trigger("click");
			
			var loop = setInterval(function(scenarioId){
				//var banner = $(".wrapper_banner[scenarioId='"+scenarioId+"']");
				//var footer = banner.children(".comp_banner").children(".banner_footer");
				var clickedNav =  footer.children(".banner_nav[clicked='clicked']");
				var next;
				if(clickedNav.length>0){
					next = clickedNav.next(".banner_nav");
				} 
				if( !next || next.length ==0 ) {
					next = footer.children(".banner_nav:eq(0)");
				} 
				next.trigger("click");
				
			}, 3500);
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
	//PopulateTemplate.populate(templateTest);
	
	var testsub = [{"subject":"testtesttesttest", "isNew":true, "href":"https://www.libaclub.com/t_13_10154528_1.htm"},
		{"subject":"听说某三也混篱笆，那你知道男人住的所谓的豪宅是女方家买的女方家名字吗？", "isNew":true, "href":"https://www.libaclub.com/t_13_10154805_1.htm"},
		{"subject":"大班英语读什么，请各位指点一下", "isNew":false, "href":"https://www.libaclub.com/t_302_9841909_1.htm"},
		{"subject":"现在的阿姨真的看不懂， 吃顿饭气死人", "isNew":false, "href":"https://www.libaclub.com/t_13_10149659_1.htm"},
		{"subject":"单位里刚进来的小姑娘，开了一辆100多万的豪车上下班，一个月也就赚6000多元", "isNew":false, "href":"https://www.libaclub.com/t_13_10154334_1.htm"},
		{"subject":"共青森林公园被盗", "isNew":false, "href":"https://www.libaclub.com/t_13_10153773_1.htm"},
		{"subject":"朋友，婚后的你幸福吗？", "isNew":false, "href":"https://www.libaclub.com/t_49_7395685_1.htm"},
		{"subject":"图中阳台上的空调管如何遮挡，求教各路大神", "isNew":false, "href":"https://www.libaclub.com/t_4_10024694_1.htm"},
		{"subject":"流感疫苗来了，有人带娃去打了吗？华兰生物疫苗有限公司的", "isNew":false, "href":"https://www.libaclub.com/t_13_10154718_1.htm"},
		{"subject":"我一定是进了假的欧美外企，根本不像电视上演的…", "isNew":false, "href":"https://www.libaclub.com/t_13_10156298_1.htm"},
		{"subject":"在市重点以上名校高中或者鸡血初中里面，真的那么多人抑郁症吗？", "isNew":false, "href":"https://www.libaclub.com/t_13_10155454_1.htm"},
		{"subject":"最近的空气质量，我快抑郁了", "isNew":false, "href":"https://www.libaclub.com/t_13_10155516_1.htm"},
		{"subject":"胡歌发声蒋劲夫家暴事件。娜扎孙艺洲紧跟节奏。", "isNew":false, "href":"https://www.libaclub.com/t_13_10156161_1.htm"},
		{"subject":"呵呵，本人硕士，今天正式开启全职生活", "isNew":false, "href":"https://www.libaclub.com/t_13_10156156_1.htm"}
];
	Subscribe.load("test-subscribe-001", testsub);
	//$('.comp_banner').bxSlider({
	//   mode: 'fade',
	//    captions: true
	//  });
	Banner.populateNavigation("test-banner-001");
	var series = [["09:25:03",	25.43],
	["09:30:02",	25.30],
	["09:30:05",	25.36],
	["09:30:08",	25.39],
	["09:30:11",	25.36],
	["09:30:14",	25.28],
	["09:30:17",	25.30],
	["09:30:20",	25.29],
	["09:30:23",	25.29],
	["09:30:26",	25.26],
	["09:30:29",	25.29],
	["09:30:32",	25.29],
	["09:30:35",	25.27],
	["09:30:38",	25.29],
	["09:30:41",	25.30],
	["09:30:44",	25.36],
	["09:30:47",	25.30],
	["09:30:50",	25.36],
	["09:30:53",	25.30],
	["09:30:56",	25.36],
	["09:30:59",	25.30],
	["09:31:02",	25.30],
	["09:31:05",	25.30],
	["09:31:08",	25.30],
	["09:31:11",	25.30],
	["09:31:14",	25.30],
	["09:31:20",	25.30],
	["09:31:26",	25.29],
	["09:31:29",	25.28],
	["09:31:32",	25.29],
	["09:31:35",	25.26],
	["09:31:38",	25.27],
	["09:31:41",	25.26],
	["09:31:44",	25.27],
	["09:31:47",	25.26],
	["09:31:50",	25.26],
	["09:31:53",	25.26],
	["09:31:56",	25.26],
	["09:31:59",	25.25],
	["09:32:02",	25.24],
	["09:32:05",	25.22],
	["09:32:08",	25.22],
	["09:32:11",	25.24],
	["09:32:14",	25.22],
	["09:32:17",	25.23],
	["09:32:20",	25.22],
	["09:32:23",	25.20],
	["09:32:26",	25.20],
	["09:32:29",	25.18],
	["09:32:32",	25.22],
	["09:32:35",	25.22],
	["09:32:38",	25.20],
	["09:32:41",	25.20],
	["09:32:44",	25.20],
	["09:32:47",	25.22],
	["09:32:50",	25.22],
	["09:32:53",	25.18],
	["09:32:56",	25.19],
	["09:32:59",	25.22],
	["09:33:05",	25.23],
	["09:33:08",	25.22]];
	
	Timeseries.load("test-timeseries-001", series);
	
	Ranklist.load("test-ranklist-001");
});