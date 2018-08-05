function cloneDiv(sDiv, sDrag){
	c=$(sDiv).clone(true);
	c.css('display','block');
	draggable=c.children(sDrag);
	var $draggable = draggable.draggabilly({
		containment: '.uc-canvasM'
	})
	$(".uc-canvasM").append(c);
}

function addTemplate(aTemp) {
	switch(aTemp)
	{
	    case 1://corpus
	    	cloneDiv("uc_t_corpus", "uc_t_corpusD");
	        break;
	    case 2://ranker
	    	cloneDiv("uc_t_ranker", "uc_t_rankerD");
	        break;
	    case 3://subscriber
	    	cloneDiv("uc_t_subscriber", "uc_t_subscriberD");
	        break;
	    case 4://timeseries
	    	cloneDiv("uc_t_timeseries", "uc_t_timeseriesD");
	        break;
	    case 5://banner
	    	cloneDiv("uc_t_banner", "uc_t_bannerD");
	        break;    
	    default:
	        break;
	}
}

$(".uc-float-button").on("click",function(){
	browser = $(".uc-edit-panel");
	if (browser.hasClass("uc-browser-slideInRight")){
		browser.removeClass("uc-browser-slideInRight");
		browser.addClass("uc-browser-slideOutRight");

	} else if(browser.hasClass("uc-browser-slideOutRight")) {
		browser.removeClass("uc-browser-slideOutRight");
		browser.addClass("uc-browser-slideInRight");
		
	} else {
		browser.addClass("uc-browser-slideInRight");
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