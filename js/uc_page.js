var default_timeseries_option = 
{
	title: {
	        text: '',
	        textAlign: 'center',
	        textVerticalAlign: 'center',
	        left: 'center'
	},
    backgroundColor: 'rgb(255,255,255)',
    grid: {
        show: false
    },
    xAxis: {
        boundaryGap: false,
        name: '日期',
        nameLocation: 'end',
        nameTextStyle: {
            color: '#888888',
            fontStyle: 'normal',
            fontSize: 15,
            fontWeight: 'bold'
        },
        axisLine: {
            lineStyle: {
                color: 'rgb(157,137,157)',
                type: 'solid'
            }
        },
        axisTick: {
            lineStyle: {
                color: 'rgb(56,66,106)',
                width: 3
            }
        },
        axisLabel: {
            color: '#888888'
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: ['#efefef', '#dfdfdf'],
                type: 'dashed'
            }
        },
        type: 'category',
        //data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value',
        boundaryGap: false,
        name: '数据值',
        nameLocation: 'end',
        nameTextStyle: {
            color: '#888888',
            fontStyle: 'normal',
            fontSize: 15,
            fontWeight: 'bold'
        },
        axisLine: {
            lineStyle: {
                color: 'rgb(157,137,157)',
                type: 'solid'
            }
        },
        axisTick: {
            lineStyle: {
                color: 'rgb(56,66,106)',
                width: 3
            }
        },
        axisLabel: {
            color: '#888888'
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: ['#efefef', '#dfdfdf'],
                type: 'dashed'
            }
        }
    },
    series: [{
        name: '时间序列图',
        //data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        symbol: 'circle',
        symbolSize: 5,
        lineStyle: {
            color: '#888888',
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowBlur: 10
        }
    }]
};

function initChart(target) {
	var chart = echarts.init(document.getElementById(target["id"]));
	var chartOpts = target["options"];
	if(chartOpts)
		chart.setOption(chartOpts);
	else
		chart.setOption(default_timeseries_option);
	
	//load data
	chart.setOption({
        xAxis: {
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        series: [{
        	name: '时间序列图',
        	data: [820, 932, 901, 934, 1290, 1330, 1320]
        }]
    });
}

function showBannerTool(event) {
	if($(event.target).hasClass("banner_tool"))
		$(event.target).css("opacity","1.0");
	else
		$(event.target).parents(".banner_tool").css("opacity","1.0");
}

function hideBannerTool(event) {
	if($(event.target).hasClass("banner_tool"))
		$(event.target).css("opacity","0.2");
	else
		$(event.target).parents(".banner_tool").css("opacity","0.2");
}

function initBanner(target) {
	var images = target["images"];
	var display = target["display"];
	var id = target["id"];
	$(".uc-banner[id='"+id+"']").attr("display", display);
	
	for(var i=0;i<images.length;i++) {
		var img = images[i];
		var imgW = img["width"];
		var imgH = img["height"];
		if( (i+1) == images.length )
			var bannerbg = $("<div class=\"banner_bg fadeIn animated\" display=\"display\" imgW=\""+imgW+"\" imgH=\""+imgH+"\" style=\"background-image: url("+img["url"]+");\"></div>");
		else
			var bannerbg = $("<div class=\"banner_bg fadeOut animated\" imgW=\""+imgW+"\" imgH=\""+imgH+"\" style=\"background-image: url("+img["url"]+");\"></div>");
		$(".uc-banner[id='"+id+"']").find(".banner_body").append(bannerbg);
		changBG(display, imgW, imgH, bannerbg, $(".uc-banner[id='"+id+"']"));

		var nav = $('<div class="banner_nav" style="background-color: rgb('+randomize(1, 255)+','+randomize(1, 255)+','+randomize(1, 255)+',1.0);"></div>');
		$(".uc-banner[id='"+id+"']").find(".banner_footer").append(nav);
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
				changBG($(".uc-banner[id='"+id+"']").attr("display"), parseInt(img.attr("imgW")), parseInt(img.attr("imgH")), img, $(".uc-banner[id='"+id+"']"));
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
	}
//	var first = $(".uc-banner[id='"+id+"']").find(".banner_footer").children(".banner_nav:eq(0)");
//	first.trigger("click");
		
	var loop = setInterval(function(){
		//var banner = $(".wrapper_banner[scenarioId='"+scenarioId+"']");
		//var footer = banner.children(".comp_banner").children(".banner_footer");
		var clickedNav =  $(".uc-banner[id='"+id+"']").find(".banner_footer").children(".banner_nav[clicked='clicked']");
		var next;
		if(clickedNav.length>0){
			next = clickedNav.next(".banner_nav");
		} 
		if( !next || next.length ==0 ) {
			next = $(".uc-banner[id='"+id+"']").find(".banner_footer").children(".banner_nav:eq(0)");
		} 
		next.trigger("click");
		
	}, 3500);	
}
	
	
function changBGMode(event, mode) {
	$(event.target).parents(".uc-banner").attr("display",mode);
}

function changBG(mode, imgW, imgH, bg, banner) {
	//var bg = banner.find(".banner_bg");
	var width = banner.width();
	var height = banner.height();
	//var imgW = 850;
	//var imgH = 500;
	console.log("div width: "+ width+", div height: "+height);
	
	if(mode=="fillfull") {
		if( parseFloat( imgH / parseFloat(imgW/width) ) >= height ) {
			bg.css("backgroundRepeat","no-repeat");
			bg.css("backgroundPosition","center center");
			bg.css("backgroundSize","100% auto");
		} else {
			bg.css("backgroundRepeat","no-repeat");
			bg.css("backgroundPosition","center center");
			bg.css("backgroundSize","auto 100%");
		}
		
	} else if(mode=="fitness") {
		if( parseFloat( imgH / parseFloat(imgW/width) ) >= height ) {
			bg.css("backgroundRepeat","no-repeat");
			bg.css("backgroundPosition","center center");
			bg.css("backgroundSize","auto 100%");
		} else {
			bg.css("backgroundRepeat","no-repeat");
			bg.css("backgroundPosition","center center");
			bg.css("backgroundSize","100% auto");
		}
	} else if(mode=="stretching") {
		bg.css("backgroundRepeat","no-repeat");
		bg.css("backgroundPosition","center center");
		bg.css("backgroundSize","100% 100%");
		
	} else if(mode=="repeating") {
		bg.css("backgroundRepeat","repeat");
		bg.css("backgroundPosition","top left");
		bg.css("backgroundSize","auto");
		
	} else if(mode=="centric") {
		bg.css("backgroundRepeat","no-repeat");
		bg.css("backgroundPosition","center center");
		bg.css("backgroundSize","auto");
	} 
}