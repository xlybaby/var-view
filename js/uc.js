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
            var layout = {};
            var sceneList = [];
            
            var id = "uc_sce__"+guid();
            scenario["scenarioId"] = id;
            scenario["scenarioType"] = scenarioType;
            scenario["scenarioTypeName"] = scenarioTypeNames[scenarioType];
            scenario["title"] = null;
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
            layout["positionX"]=null;
            layout["positionY"]=null;
            layout["relativeW"]=null;
            layout["relativeH"]=null;
            layout["backgroundColor"]="#FFFFFF";
            
            layout["borderRadius"]=0;
            layout["borderStyle"]=1;//预定义的边框样式
            layout["border"]=0;
            layout["borderColor"]="#000000";
            layout["shadowStyle"]=1;//预定义的阴影样式
            layout["shadow"]=0;
            layout["shadowColor"]="#000000";
            
            layout["contentHeight"]=null;
            layout["contentWidth"]=null;
            layout["marginBottom"]=0;
            layout["marginLeft"]=0;
            layout["marginRight"]=0;
            layout["marginTop"]=0;
            layout["offsetParentLeft"]=null;
            layout["offsetParentTop"]=null;
            layout["opacity"]=1;
            layout["paddingBottom"]=0;
            layout["paddingLeft"]=0;
            layout["paddingRight"]=0;
            layout["paddingTop"]=0;
            layout["zindex"]=1;
            
            schedule["interval"]="1*60*60";
            schedule["unit"]="second";
            
            scenario["layout"]=layout;
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
	var scenario = container.children(".uc_t_box");
	var datas={};
	if( scenario.length > 0 ) {
		var scenarios=[];
		for(var i=0;i<scenario.length;i++){
			var x = (parseFloat(scenario[i].getAttribute("data-x")) || 0);
			var y = (parseFloat(scenario[i].getAttribute("data-y")) || 0);
			var w = (parseFloat($(scenario[i]).width()) || 400);
			var h = (parseFloat($(scenario[i]).height()) || 250);
			var type = scenario[i].getAttribute("sType");
			
			//console.log("Save scenario: " + type +", position: ("+ x +","+ y + "), rect: " + w +"x"+ h);
			//console.log("Save scenario: " + type +", position: ("+ parseFloat(x/container.width()) +","+ parseFloat(y/container.height()) + "), rect: " + parseFloat(w/container.width()) +"x"+ parseFloat(h/container.height()));
			scenarios.push({	"width": parseFloat(w/container.width()),
								"height": parseFloat(h/container.height()),
								"x": Math.round(parseFloat(x/container.width())*10000) / 100,
								"y": Math.round(parseFloat(y/container.height())*10000) / 100
							  });
			
		}
		console.log(scenarios);
		//request("post", "/datacenter/", entity, callback)
	}
}

var containerOverflowXBoxNum={};
var containerOverflowYBoxNum={};

function cloneDiv(sDiv, type){
	c=$("#"+sDiv).clone(true);
	var cid = sDiv+"_"+guid();
	var bgcolors=["#0073e6","#00e6ac","#e60073","#e67300","#333333","#669900"];
	c.css('display','flex');
	c.attr('id',cid);
	c.attr('sType',type);
	
	var x = bgcolors.length-1;     
	var y = 0; 
	c.css('background-color', bgcolors[parseInt(Math.random() * (x - y + 1) + y)]);
	c.css('background-image','url(/var/images/uc/uc_bg_'+type+'.svg)');
	c.css('background-position','center center');
	c.css('background-size','45% 45%');
	/*
	draggable=c.children(sDrag);
	var $draggable = draggable.draggabilly({
		containment: '.uc-canvasM'
	})
	console.log(c);*/
	c.on({
		mousedown:function(event){showmask(event,true);},
		//mouseup:function(event){toolbarclick(event,false);}
	});
	draggabilly("#"+cid,".uc-canvas-container", 
				function (event) {
					var target = $(event.target).children(".uc_t_boxD")[0],
					// keep the dragged position in the data-x/data-y attributes
					x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx, 
					y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
					
					// translate the element
					target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
					
					// update the posiion attributes
					target.setAttribute('data-x', x);
					target.setAttribute('data-y', y);
				}, 
				function(event){
					var container = $(".uc-canvas-container");
					var rect = figureRect(".uc-canvas-container");
					
					var target = event.target;
					var targetId = $(target).attr("id");
					var draggable = $(target).children(".uc_t_boxD")[0];
					//var transformed= draggable.style.transform;
					var datax= parseFloat($(draggable).attr("data-x") || 0);
					var datay= parseFloat($(draggable).attr("data-y") || 0);
					
					var moveddatax=  (parseFloat(target.getAttribute('data-x')) || 0)+datax;
					var moveddatay=  (parseFloat(target.getAttribute('data-y')) || 0)+datay;
					
					//console.log("target moved x:"+moveddatax+",target moved y:"+moveddatay+", target's whole width is "+(moveddatax+$(target).width()));
					//console.log("container position x:"+rect["positionX"]+",container position y:"+rect["positionY"]);
					//console.log("container width:"+rect["width"]+",container height:"+rect["height"]);
					
					if(moveddatax<0) {
						moveddatax = 0;
					}
					if(moveddatay<0){
						moveddatay=0;
					}
					
					target.style.webkitTransform = target.style.transform = 'translate(' + moveddatax + 'px, ' + moveddatay + 'px)';
					// update the posiion attributes
					target.setAttribute('data-x', moveddatax);
					target.setAttribute('data-y', moveddatay);

					// restore draggable's position
					draggable.style.webkitTransform = draggable.style.transform = 'translate(0px, 0px)';
					draggable.setAttribute('data-x', 0);
					draggable.setAttribute('data-y', 0);
					
				}, { "able": true, 
					"edge-left": true,
					"edge-right": true,
					"edge-top": false,
					"edge-bottom": true,
					"min-width": 100,
					"min-height": 50
					}, null);
	//resize(sDiv, ".uc-canvasM");
	$(".uc-canvas-container").append(c);
}

function addTemplate(aTemp) {
	switch(aTemp)
	{
	    case 1://corpus
	    	cloneDiv("uc_box_temp","corpus");
	        break;
	    case 2://ranker
	    	cloneDiv("uc_box_temp","ranker");
	        break;
	    case 3://subscriber
	    	cloneDiv("uc_box_temp","subscriber");
	        break;
	    case 4://timeseries
	    	cloneDiv("uc_box_temp","timeseries");
	        break;
	    case 5://banner
	    	cloneDiv("uc_box_temp","banner");
	        break;    
	    default:
	        break;
	}
}

function showmask(event, down) {
	var target = event.target;
	var draggable = $(target).children(".uc_t_boxD");
	
	if( down ){
		draggable.css("display","flex");
		draggable.on({
			mouseup:function(event){
				this.style.display="none";
				$(this).unbind();
			}
		});
	}else{
		draggable.css("display","none");

	}
}

function toolbarClick(type) {
	
}

$(document).ready(function(){ 
	mainInit();
	
	$(".uc-float-button").on("click",function(){
		var rect = figureRect(".uc-populate-container");
		console.log("uc-populate-container's width: " + rect["width"] + ", 30percent: " + (rect["width"]*0.3)+", min-width is 350px.");
		var mw=350;
		if( (rect["width"] * 0.3) > mw ) {
			mw=rect["width"] * 0.3;
		}
		
		var panel = $(".uc-edit-panel");
		var blocks = $(".uc-edit-panel-main");
		if (panel.hasClass("uc-panelIn")){
			panel.removeClass("uc-panelIn");
			panel.addClass("uc-panelOut");
			//panel.css("min-width","initial");
			panel.animate({width:"55px",minWidth:"0px"},500,"linear");
			//blocks.animate({display: "none"},500,"linear");
			blocks.css("display","none");
		} else if(panel.hasClass("uc-panelOut")) {
			panel.removeClass("uc-panelOut");
			panel.addClass("uc-panelIn");
			//panel.css("min-width","350px");
			panel.animate({width:"30%",minWidth:mw+"px"},500,"linear");
			//blocks.animate({display: "block"},500,"linear");
			blocks.css("display","flex");
		} else {
			panel.addClass("uc-panelIn");
			//panel.css("min-width","350px");
			panel.animate({width:"30%",minWidth:mw+"px"},500,"linear",function(){blocks.css("display","flex");});
			//blocks.animate({display: "block"},500,"linear");
			
		}
		
	});
	
	$(".uc-sample-template-icon").on("click",function(){
		temp = $(".uc-template-sample");
		if (temp.hasClass("uc-template-sample-slideDownRight")){
			temp.removeClass("uc-template-sample-slideDownRight");
			temp.addClass("uc-template-sample-slideUpRight");
	
		} else if(temp.hasClass("uc-template-sample-slideUpRight")) {
			temp.removeClass("uc-template-sample-slideUpRight");
			temp.addClass("uc-template-sample-slideDownRight");
			
		} else {
			temp.addClass("uc-template-sample-slideDownRight");
		}
	});
	
	
	$(".uc_t_tool_bar").on({
		//mousedown:function(event){toolbarclick(event,true);},
		//mouseup:function(event){toolbarclick(event,false);},
		
		mouseover:function(event){event.target.style.filter="alpha(opacity:100)";event.target.style.opacity="1";},  
	    mouseout:function(event){
//	    	var child = $(event.target).children("[onIcon=true]")[0];
//	    	console.log(child);
//	    	if( !child ) {
//	    		event.target.style.filter="alpha(opacity:0)";
//	    		event.target.style.opacity="0";
//	    	}
	    	var x = event.pageX;
	        var y = event.pageY; 
	        var target = $(event.target);
	    	//var icons = $(event.target).children(".icon");
	        var y1 = target.offset().top;  //div上面两个的点的y值
	        var y2 = y1 + target.height();//div下面两个点的y值
	        var x1 = target.offset().left;  //div左边两个的点的x值
	        var x2 = x1 + target.width();  //div右边两个点的x的值
	        //console.log("pageX: "+x+", pageY: "+y);
	        //console.log("tool bar rect[ ("+x1+","+y1+") ("+x2+","+y2+") ]");
	        if( x < x1 || x > x2 || y < y1 || y > y2) {
	        	event.target.style.filter="alpha(opacity:0)";
	    		event.target.style.opacity="0";
	        }
	    }
	});
	$(".uc-float-menu-item-mask").on({
			//mousedown:function(event){toolbarclick(event,true);},
			//mouseup:function(event){toolbarclick(event,false);},
			click: function(event){
				var name = $(event.target).attr("name");
				if( name === "menuAddSce" ) {
					cloneDiv("uc_box_temp","unknown");
				}
			},
			mouseover:function(event){
				event.target.style.cursor="pointer";
				//console.log(event.target);
				
				var icon = $(event.target).siblings(".uc-float-menu-item-icon");
				var block = $(event.target).siblings(".uc-float-menu-block").children(".uc-float-menu-block-c");
				icon.animate({left:"0px"},500,"linear");
				block.animate({left:"0px"},500,"linear");

				event.stopPropagation();    //标准   
		        event.cancelBubble = true;  //IE  
			},  
		    mouseout:function(event){
		    	var icon = $(event.target).siblings(".uc-float-menu-item-icon");
				var block = $(event.target).siblings(".uc-float-menu-block").children(".uc-float-menu-block-c");
				var blockw = 0-block.width();
				//console.log("current block's width: "+blockw);
				icon.animate({left:blockw+"px"},500,"linear");
				block.animate({left:"-100%"},500,"linear");
				
		    	event.stopPropagation();    //标准   
		        event.cancelBubble = true;  //IE 
		    }
		});
	
	
	$(".icon").on({
		//mousedown:function(event){toolbarclick(event,true);},
		//mouseup:function(event){toolbarclick(event,false);},
		click: function(event){
			var clicktag = event.target.tagName;
			if(clicktag==="svg")
				var tag = $(event.target).children("use");
			else if(clicktag==="use")
				var tag = $(event.target);
			else
				return false;
			
			var type = tag.attr("xlink:href");
			console.log(type+" clicked.");
		},
		mouseover:function(event){
			event.target.style.cursor="pointer";
			
			//event.target.setAttribute('onIcon', true);
			//event.stopPropagation();    //标准   
	        //event.cancelBubble = true;  //IE  
		},  
	    mouseout:function(event){
	    	event.target.removeAttribute('onIcon');
	    	event.stopPropagation();    //标准   
	        event.cancelBubble = true;  //IE 
	    }
	});
	
	$(".uc_i_corpus").on("click",function(){
		addTemplate(1);
	});
	$(".uc_i_ranker").on("click",function(){
		addTemplate(2);
	});
	$(".uc_i_subscriber").on("click",function(){
		addTemplate(3);
	});
	$(".uc_i_timeseries").on("click",function(){
		addTemplate(4);
	});
	$(".uc_i_banner").on("click",function(){
		addTemplate(5);
	});
			
	$(".uc_i_help").on("click",function(){
		overlay = $(".overlay");
		mainDiv = $(".page-main-div");
		overlay.css('display','block');
		mainDiv.css('filter','blur(3px)');
	});
	
	$(".overlay").on("click",function(){
		overlay = $(".overlay");
		mainDiv = $(".page-main-div");
		overlay.css('display','none');
		mainDiv.css('filter','');
	});
	
	$("#btn_sScenario").on("click",function(){
		collectAndSubmit();
	});
	
//	      var rule;
//	      var ss = document.styleSheets;
//	      for (var i = 0; i < ss.length; ++i) {
//	          // loop through all the rules!
//	          for (var x = 0; x < ss[i].cssRules.length; ++x) {
//	              rule = ss[i].cssRules[x];
//	              if (rule.type == CSSRule.KEYFRAMES_RULE && rule.name==="uc-panelIn-frm") {
//	                  
//	                  if(ss[i].insertRule){
//	                	  ss[i].insertRule("100% {width:350px;}",1);
//
//	                  }else{
//	                	  ss[i].addRule("100% {width:350px;}",1);
//	                  }
//	                  console.log(rule);
//	              }
//	          }
//	      }
	  
});