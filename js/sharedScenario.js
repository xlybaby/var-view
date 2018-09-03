function overColumn(event) {
	var target=event.target;
	var parent = $(target).parent(".view-col");
	parent.css("box-shadow", "0 0 8px #222222");
}

var reciever = (function ($) {
	var pub = {
        fetchRow: function (num) {
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

$(document).ready(function(){ 
	mainInit();
	var mpage = $(".m-page");
	
	var rowHeight = 360;
	var container = $(".main-container");
	console.log("container height: "+container.height());
	console.log("mpage height: "+mpage.height());
	var iniRowNum = Math.ceil(container.height()/rowHeight);
	//alert(iniRowNum);
	//var mpageinitheight = iniRowNum*(360+20)+65*2+70;
	var long = iniRowNum*(360+20) - container.height() + 100;
	console.log("init row large: "+long);
	mpage.css("height", (mpage.height()+long)+"px");
	console.log("new mpage height: "+mpage.css("height"));
	
	reciever.fetchRow(iniRowNum);
	
	$(window).scroll(function () {
		var a = $("#shared-scroll-hint-recv").offset().top;
        console.log(a);
        console.log($(window).scrollTop());
        console.log($(window).height());
        if (a >= $(window).scrollTop() && a < ($(window).scrollTop() + $(window).height())) {
            console.log("div在可视范围");
        }
	});
});