function collectAndSubmit() {
	var canvasM = $(".uc-canvasM");
	var scenario = canvasM.children(".uc_t_box");
	if( scenario.length > 0 ) {
		for(var i=0;i<scenario.length;i++){
			var x = (parseFloat(scenario[i].getAttribute("data-x")) || 0);
			var y = (parseFloat(scenario[i].getAttribute("data-y")) || 0);
			var w = (parseFloat(scenario[i].style.width) || 400);
			var h = (parseFloat(scenario[i].style.height) || 250);
			var type = scenario[i].getAttribute("sType");
			
			console.log("Save scenario: " + type +", position: ("+ x +","+ y + "), rect: " + w +"x"+ h);
			
		}
	}
}

function cloneDiv(sDiv, type){
	c=$("#"+sDiv).clone(true);
	var cid = sDiv+"_"+guid();
	c.css('display','flex');
	c.attr('id',cid);
	c.attr('sType',type);
	c.css('background-image','url(../images/uc/uc_bg_'+type+'.svg)');

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
	draggabilly("#"+cid,".uc-canvasM", 
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
					var target = event.target;
					var draggable = $(target).children(".uc_t_boxD")[0];
					//var transformed= draggable.style.transform;
					var datax= parseFloat($(draggable).attr("data-x") || 0);
					var datay= parseFloat($(draggable).attr("data-y") || 0);
					
					var moveddatax=  (parseFloat(target.getAttribute('data-x')) || 0)+datax;
					var moveddatay=  (parseFloat(target.getAttribute('data-y')) || 0)+datay;
					
					//console.log(target);
					//var parent = $(target).parent(".uc_t_corpus")[0];
					// translate the element
					target.style.webkitTransform = target.style.transform = 'translate(' + moveddatax + 'px, ' + moveddatay + 'px)';
	
					// update the posiion attributes
					target.setAttribute('data-x', moveddatax);
					target.setAttribute('data-y', moveddatay);
					
					// restore draggable's position
					draggable.style.webkitTransform = draggable.style.transform = 'translate(0px, 0px)';;
					draggable.setAttribute('data-x', 0);
					draggable.setAttribute('data-y', 0);
					
				}, { "able": true, 
					"edge-left": true,
					"edge-right": true,
					"edge-top": false,
					"edge-bottom": true,
					"min-width": 100,
					"min-height": 50
					});
	//resize(sDiv, ".uc-canvasM");
	$(".uc-canvasM").append(c);
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
			
		},
		mouseover:function(event){
			event.target.style.cursor="pointer";
			
			
			event.target.setAttribute('onIcon', true);
			event.stopPropagation();    //标准   
	        event.cancelBubble = true;  //IE  
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